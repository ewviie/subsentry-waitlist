# SubSentry — waitlist

A standalone, deployable-today pre-launch waitlist site for SubSentry. Separate from the main app repo on purpose, so
it can go live on a `vercel.app` URL before the product itself launches.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4 — same monochrome + emerald palette and Space Grotesk / Plus Jakarta Sans typography as the main
  SubSentry app
- Framer Motion for the two intentionally subtle motion touches (nav entrance, button tap)
- Upstash Redis for waitlist storage + rate limiting (`@upstash/redis`, `@upstash/ratelimit`)

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in the Upstash values (see below)
npm run dev
```

Without Upstash configured, the page renders fine but `/api/waitlist` returns a 503 — there's no local fallback
"pretend" store, so what you test locally is the same code path that runs in production.

## Waitlist storage

Emails are stored in Upstash Redis as a sorted set (`waitlist:signups`, member = email, score = signup time). No
schema/migration step. To export the list later:

```bash
curl "$UPSTASH_REDIS_REST_URL/zrange/waitlist:signups/0/-1" -H "Authorization: Bearer $UPSTASH_REDIS_REST_TOKEN"
```

or browse it in the Upstash console's Data Browser.

## Environment variables

| Variable | Required | Notes |
|---|---|---|
| `UPSTASH_REDIS_REST_URL` | Yes | From the Upstash Redis database (or the Vercel Upstash integration). |
| `UPSTASH_REDIS_REST_TOKEN` | Yes | Same as above. Server-only — never sent to the browser. |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Full deployed URL, no trailing slash. Used for canonical/OG tags and the sitemap. |

## Deploying to Vercel

1. Push this directory to its own GitHub repo (or import it directly from your local folder with the Vercel CLI).
2. In the Vercel dashboard: **Add New → Project**, import the repo. Framework preset auto-detects as Next.js — no
   build command changes needed.
3. **Storage → Marketplace Database Providers → Upstash → Redis**, create a database, and connect it to this
   project. Vercel injects `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` (or `KV_REST_API_URL` /
   `KV_REST_API_TOKEN` depending on the integration version — if you get the `KV_*` names, add
   `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN` project env vars pointing to the same values).
4. **Settings → Environment Variables**, add `NEXT_PUBLIC_SITE_URL` set to your `*.vercel.app` URL (you'll know it
   after the first deploy — redeploy once after setting it).
5. Deploy. First deploy can happen before step 3/4 are done; the page works, only the form submission needs Redis.

## Brand assets

- `public/logo-mark.png` and `public/dashboard-screenshot.jpg` are copied from the main SubSentry repo
  (`SubSentry/public/logo-mark.png`, `SubSentry/public/dashboard-screenshot-v2.jpg`) so this stays a real product
  screenshot, not a mockup.
- `src/app/icon.png` / `apple-icon.png` are the same logo mark, used by Next.js's automatic favicon convention.
