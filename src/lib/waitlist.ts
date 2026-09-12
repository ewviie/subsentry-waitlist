import { z } from "zod";

// Deliberately conservative: RFC-5322-adjacent, not the full spec. Waitlist
// signups don't need to accept every technically-legal address — they need
// to reject junk (missing "@", no TLD, embedded whitespace) before it ever
// reaches Redis.
export const waitlistSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(5, "Enter a valid email address.")
    .max(254, "Enter a valid email address.")
    .email("Enter a valid email address."),
  // Honeypot: a real visitor never fills this in (it's visually hidden and
  // skipped in tab order). A non-empty value is a near-certain bot.
  company: z.string().max(200).optional().default(""),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

// Redis key layout:
// - "waitlist:signups" — a sorted set, member = email, score = unix ms.
//   ZADD with NX makes "already on the list" a single atomic check: NX
//   refuses to touch an existing member, and the SDK reports how many
//   elements it actually added (0 = duplicate, 1 = new).
export const WAITLIST_KEY = "waitlist:signups";
