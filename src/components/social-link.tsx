import { ExternalLink } from "lucide-react";

// Reassurance-line replacement under the waitlist form — same treatment as
// the "Follow @x for updates ↗" pattern: a quiet, muted link, not a CTA.
export function SocialLink({ className }: { className?: string }) {
  return (
    <a
      href="https://www.instagram.com/subsentryapp"
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ??
        "mt-3 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      }
    >
      Follow @subsentryapp for updates
      <ExternalLink className="size-3.5" aria-hidden="true" />
    </a>
  );
}
