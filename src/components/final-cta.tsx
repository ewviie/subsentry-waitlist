import { WaitlistForm } from "@/components/waitlist-form";
import { RevealOnScroll } from "@/components/motion/reveal";

export function FinalCta() {
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <RevealOnScroll className="mx-auto max-w-xl text-center">
          <h2 className="text-balance font-heading text-3xl font-bold tracking-tight text-foreground sm:text-h1">
            Spend less time tracking subscriptions.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-balance text-base leading-relaxed text-muted-foreground">
            Join the SubSentry beta and be first to know when we launch.
          </p>
          <div className="mx-auto mt-8 max-w-md">
            <WaitlistForm />
            <p className="mt-3 text-sm text-muted-foreground">Free during beta · No card required</p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
