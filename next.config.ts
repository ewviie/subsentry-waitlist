import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // This project lives inside ~/subsentry-waitlist, a sibling of other
  // unrelated local directories that happen to carry their own lockfiles.
  // Pin the trace root explicitly so Next doesn't guess a workspace root
  // one level up from a stray lockfile that isn't part of this project.
  outputFileTracingRoot: path.join(import.meta.dirname),
};

export default nextConfig;
