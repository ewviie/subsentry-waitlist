import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // This project lives inside ~/subsentry-waitlist, a sibling of other
  // unrelated local directories that happen to carry their own lockfiles.
  // Pin the trace root explicitly so Next doesn't guess a workspace root
  // one level up from a stray lockfile that isn't part of this project.
  outputFileTracingRoot: path.join(import.meta.dirname),
  // Cost/abuse hardening (Vercel usage-limit incident, see git history
  // around this date): the public, unauthenticated `/_next/image`
  // endpoint accepts ANY `w` value from `deviceSizes`/`imageSizes` below
  // combined with ANY `q` (quality) 1-100 by default — every distinct
  // (url, w, q, format) combination is a genuinely new cache key, so it's
  // a fresh serverless Function Invocation the first time anyone requests
  // it, regardless of whether a real `<Image>` in this app ever asked for
  // that combination. A trivial script iterating query params against our
  // own 3 real images can multiply invocations by 100x+ for near-zero
  // bandwidth (small images stay small) — exactly the "requests/invocations
  // way over, data transfer fine" signature this incident showed. Two
  // layers of defense: `qualities` collapses quality to the one value this
  // app's `<Image>` components actually use (cuts the combinatorial space
  // by ~100x on its own), and `minimumCacheTTL` makes whatever variants DO
  // get generated stay cached far longer before a repeat request can
  // trigger regeneration. The three `<Image>` usages in this app additionally
  // set `unoptimized` directly (hero.tsx, phone-frame.tsx, footer.tsx) —
  // belt-and-suspenders: even a `w`/`q` scan against those exact URLs can't
  // reach the optimizer function at all once the images they render are
  // marked unoptimized, but this config still protects any image anyone
  // adds later without remembering that convention.
  images: {
    qualities: [75],
    minimumCacheTTL: 31536000, // 1 year — these are static build-time assets, never dynamically regenerated content.
  },
  async headers() {
    // Vercel sets VERCEL_ENV to "preview" for every preview deployment
    // (branch/PR builds) and "production" for the one promoted to the real
    // domain — this never needs its own env var. Preview URLs are real,
    // reachable, unauthenticated deployments of this same app; without
    // this they're indexable, and a crawler that finds one (linked from a
    // PR, a Slack message, a Vercel dashboard screenshot) has no reason to
    // treat it differently from the production site, multiplying crawl
    // traffic across however many previews exist. Conditionally omitting
    // the whole rule (not returning one with an empty `headers` array,
    // which Next.js's config validation rejects at build time) outside
    // preview.
    if (process.env.VERCEL_ENV !== "preview") return [];
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
