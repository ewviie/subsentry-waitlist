// Edge-runtime variant of lib/redis.ts, for middleware.ts specifically.
// `@upstash/redis`'s default export (`@upstash/redis` / `@upstash/redis/node`)
// touches `process.version` for its own telemetry header — a genuine
// Node.js-only API that doesn't exist in Vercel's Edge Runtime, which is
// what middleware.ts always runs under regardless of any `runtime` export
// (Next.js Middleware has no other option). `@upstash/redis/cloudflare` is
// Upstash's own edge-safe build — despite the name, it's the documented
// choice for any Web-standard edge runtime (Cloudflare Workers, Vercel
// Edge, Deno Deploy), not literally Cloudflare-only: same REST-over-fetch
// client, just without the Node-specific branch. api/waitlist/route.ts
// keeps using lib/redis.ts's Node build since that route explicitly runs
// `export const runtime = "nodejs"`.
import { Redis } from "@upstash/redis/cloudflare";

const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

export const redisConfigured = Boolean(url && token);

export const redis = redisConfigured ? new Redis({ url: url!, token: token! }) : null;
