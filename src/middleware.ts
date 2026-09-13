import { NextResponse, type NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/redis-edge";

// Site-wide guardrail (Vercel usage-limit incident — see next.config.ts's
// own comment for the image-optimization angle, and this file's second
// limiter below for the confirmed actual cause). Edge Middleware runs on
// Vercel's Edge Network, not as a regular serverless Function — shedding
// abusive traffic here, before it ever reaches a route handler, is what
// actually stops it from generating billable Function Invocations, not
// just rate-limiting after the fact inside a route that's already running.
//
// Generous on purpose: this is a small marketing/waitlist site, not an app
// with legitimate high-frequency per-user traffic — 120 requests/minute
// comfortably covers a real visitor loading every asset on the page
// multiple times over, while still bounding a single IP hammering the site.
const LIMIT = 120;
const WINDOW = "1 m";

const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(LIMIT, WINDOW),
      prefix: "ratelimit:middleware",
    })
  : null;

// Global circuit breaker for /api/waitlist specifically — confirmed the
// actual cause of the usage-limit incident: Vercel's own dashboard showed
// Image Optimization Transformations at 8 (not the culprit, despite that
// being this file's original justification), which by elimination leaves
// /api/waitlist as the only other function-invoking route in this entire
// app, against 3.4M Function Invocations. A many-distinct-IP bot/scanner
// flood defeats BOTH this file's per-IP limiter above AND the route's own
// per-IP limiter (api/waitlist/route.ts) — each new IP just gets its own
// fresh allowance. This is keyed on ONE fixed string, not the caller's IP,
// specifically to cap TOTAL traffic to this route regardless of how many
// distinct IPs it's spread across. 500/hour is deliberately generous for
// any real waitlist's actual signup volume (a genuinely viral day for a
// pre-launch waitlist is nowhere near this) while capping a runaway flood
// at ~12,000/day worst case instead of the millions that triggered the
// pause — tune down further if real usage data ever shows legitimate
// traffic anywhere near this ceiling.
const GLOBAL_WAITLIST_LIMIT = 500;
const GLOBAL_WAITLIST_WINDOW = "1 h";
const GLOBAL_WAITLIST_KEY = "global:api-waitlist";

const globalWaitlistLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(GLOBAL_WAITLIST_LIMIT, GLOBAL_WAITLIST_WINDOW),
      prefix: "ratelimit:middleware-global",
    })
  : null;

function clientIp(request: NextRequest): string {
  // Same extraction api/waitlist/route.ts already uses — Vercel's edge
  // appends the real client IP as the first entry it sets on
  // x-forwarded-for for a request reaching this deployment directly.
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "unknown";
}

function tooManyRequests(limit: number, remaining: number, reset: number): NextResponse {
  return NextResponse.json(
    { status: "error", message: "Too many requests. Please slow down." },
    {
      status: 429,
      headers: {
        "Retry-After": Math.max(0, Math.ceil((reset - Date.now()) / 1000)).toString(),
        "X-RateLimit-Limit": limit.toString(),
        "X-RateLimit-Remaining": remaining.toString(),
      },
    },
  );
}

export async function middleware(request: NextRequest) {
  // The global circuit breaker runs FIRST and is checked independently of
  // the per-IP one below — a distributed flood across thousands of IPs
  // must trip this regardless of whether any single IP ever crosses its
  // own per-IP threshold. Scoped to the exact path, not a prefix match:
  // /api/waitlist has no sub-routes, so this can't accidentally widen.
  if (globalWaitlistLimit && request.nextUrl.pathname === "/api/waitlist") {
    const { success, limit, remaining, reset } = await globalWaitlistLimit.limit(GLOBAL_WAITLIST_KEY);
    if (!success) return tooManyRequests(limit, remaining, reset);
  }

  // Fail OPEN, not closed: if Upstash isn't configured (e.g. a fresh
  // checkout before the integration is added), this must never take the
  // whole site down — same convention lib/redis.ts's own redisConfigured
  // already establishes for api/waitlist.
  if (!ratelimit) return NextResponse.next();

  const ip = clientIp(request);
  const { success, limit, remaining, reset } = await ratelimit.limit(ip);
  if (!success) return tooManyRequests(limit, remaining, reset);

  return NextResponse.next();
}

export const config = {
  // Deliberately DOES include /_next/image (that's the whole point — see
  // this file's own header comment) and every page/API route. Excludes
  // only what can never be part of an abuse pattern worth this check's
  // Redis round-trip cost: /_next/static (immutable, content-hashed,
  // already free to cache-hit at the CDN layer with no origin/function
  // work at all) and the handful of top-level static icon files.
  matcher: ["/((?!_next/static|favicon.ico|icon.png|apple-icon.png).*)"],
};
