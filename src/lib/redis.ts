import { Redis } from "@upstash/redis";

// Server-only. Never import this from a client component — the Upstash
// token is a full read/write credential, not a publishable key.
//
// Accepts either naming: UPSTASH_REDIS_REST_URL/TOKEN (a standalone Upstash
// database, or a manually-added pair) or KV_REST_API_URL/TOKEN (what the
// Vercel Marketplace "Upstash for Redis" integration actually injects — it's
// the same kind of REST credential, just under Vercel's own KV naming). This
// way whichever one Vercel gives you just works, with nothing to copy
// between variables by hand.
const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

export const redisConfigured = Boolean(url && token);

// Constructed lazily and only when both env vars are present, so importing
// this module never throws in an environment where Redis hasn't been
// provisioned yet (e.g. a first local `next build` before the Vercel
// integration is added) — callers check `redisConfigured` and return a
// clear 503 instead of a crash.
export const redis = redisConfigured ? new Redis({ url: url!, token: token! }) : null;
