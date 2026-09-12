import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

// The logo lives inline in the Hero's left column now (matches the
// split-layout reference), so this is just the small top-right account
// link — no bordered header bar, no background, so it doesn't compete with
// the hero for attention.
export function Nav() {
  return (
    <div className="mx-auto flex max-w-6xl justify-end px-5 pt-6 sm:px-8 sm:pt-8">
      <Reveal>
        {/* Pre-launch: no /login route exists yet, so this is deliberately
            not a link — it sets expectation without pointing at unfinished
            functionality. */}
        <span className="flex items-center gap-1 text-[13px] text-muted-foreground sm:gap-1.5 sm:text-sm">
          Already have an account?
          <ArrowRight className="size-3.5 shrink-0" aria-hidden="true" />
        </span>
      </Reveal>
    </div>
  );
}
