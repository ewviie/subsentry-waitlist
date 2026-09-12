import { cn } from "@/lib/utils";

// Brand motif carried over from the main SubSentry app: a quiet, slow pulse
// behind the mark rather than a busy rotating sweep. Pure CSS since it's a
// passive ambient loop, not a triggered interaction; `motion-reduce:` covers
// the reduced-motion case.
export function SentryRing({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -inset-2 rounded-full",
        "before:absolute before:inset-0 before:rounded-full before:border before:border-emerald/25 before:content-['']",
        "after:absolute after:inset-0 after:animate-ping after:rounded-full after:border after:border-emerald/30 after:![animation-duration:2.8s] after:motion-reduce:hidden after:content-['']",
        className
      )}
    />
  );
}
