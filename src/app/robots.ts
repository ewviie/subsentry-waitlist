import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    // /api/ has nothing worth indexing (a single POST-only signup
    // endpoint) and no reason to ever be crawled — a compliant crawler
    // hitting it repeatedly just wastes a Function Invocation on every
    // visit for a route that always 405s a GET anyway.
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
