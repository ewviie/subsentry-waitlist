import { Redis } from "@upstash/redis";

// Server-only. Never import this from a client component — the Upstash
// token is a full read/write credential, not a publishable key.
const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

export const redisConfigured = Boolean(url && token);

// Constructed lazily and only when both env vars are present, so importing
// this module never throws in an environment where Redis hasn't been
// provisioned yet (e.g. a first local `next build` before the Vercel
// integration is added) — callers check `redisConfigured` and return a
// clear 503 instead of a crash.
export const redis = redisConfigured ? new Redis({ url: url!, token: token! }) : null;
