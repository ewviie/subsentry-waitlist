import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { redis, redisConfigured } from "@/lib/redis";
import { waitlistSchema, WAITLIST_KEY } from "@/lib/waitlist";

export const runtime = "nodejs";

// 5 signups per IP per 10 minutes. Generous for a real visitor (the form
// only needs one submission to succeed) but enough to blunt a naive script
// hammering the endpoint. Constructed once per cold start, not per request.
const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      prefix: "ratelimit:waitlist",
    })
  : null;

function clientIp(request: Request): string {
  // Vercel sets x-forwarded-for on every request; the first entry is the
  // original client. Falls back to a constant bucket outside Vercel (local
  // dev) rather than throwing.
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "local";
}

export async function POST(request: Request) {
  // Validate first: a malformed request should get a real 400 regardless of
  // whether the store happens to be reachable, not a misleading 503.
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ status: "error", message: "Invalid request." }, { status: 400 });
  }

  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Enter a valid email address.";
    return NextResponse.json({ status: "invalid", message }, { status: 400 });
  }

  if (!redis || !redisConfigured) {
    console.error("Waitlist signup attempted without Upstash Redis configured.");
    return NextResponse.json(
      { status: "error", message: "Signups are temporarily unavailable. Please try again shortly." },
      { status: 503 }
    );
  }

  // Honeypot tripped: report success without writing anything, so the bot
  // gets no signal that it was caught.
  if (parsed.data.company) {
    return NextResponse.json({ status: "success" });
  }

  const ip = clientIp(request);
  if (ratelimit) {
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        { status: "error", message: "Too many attempts. Please try again in a few minutes." },
        { status: 429 }
      );
    }
  }

  const { email } = parsed.data;

  try {
    const added = await redis.zadd(WAITLIST_KEY, { nx: true }, { score: Date.now(), member: email });
    if (!added) {
      return NextResponse.json({ status: "duplicate", message: "You're already on the list." });
    }
    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("Waitlist signup failed:", error);
    return NextResponse.json(
      { status: "error", message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
