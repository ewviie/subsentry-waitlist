import Image from "next/image";
import { PhoneFrame } from "@/components/phone-frame";
import { SentryRing } from "@/components/sentry-ring";
import { WaitlistForm } from "@/components/waitlist-form";
import { SocialLink } from "@/components/social-link";
import { Reveal } from "@/components/motion/reveal";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-16 pt-6 sm:px-8 sm:pb-24 sm:pt-8 lg:pb-28">
      <div className="grid gap-16 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div className="lg:pt-16">
          <Reveal>
            <div className="inline-flex items-center gap-3 font-heading text-lg font-bold text-foreground">
              <span aria-hidden="true" className="relative flex size-9 items-center justify-center">
                <SentryRing />
                <Image
                  src="/logo-mark.png"
                  alt=""
                  width={36}
                  height={36}
                  priority
                  // unoptimized: this is a tiny (36px), already-sized-for-
                  // its-one-use-case static asset — routing it through
                  // Vercel's on-demand Image Optimization function buys
                  // nothing but exposes a public, unauthenticated endpoint
                  // that accepts arbitrary width/quality combinations, each
                  // a fresh billable Function Invocation (see next.config.ts's
                  // own comment on the incident this fixes).
                  unoptimized
                  className="size-full rounded-full object-cover"
                />
              </span>
              SubSentry
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-10 text-balance font-heading text-[2.75rem] font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.15rem]">
              Know exactly what you&rsquo;re paying for.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-md text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
              SubSentry helps you track recurring subscriptions, spot wasted spending, and take back control of your
              monthly costs.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 max-w-md">
              <WaitlistForm />
              <SocialLink />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="mx-auto w-[280px] sm:w-[300px] lg:mx-0 lg:ml-auto lg:w-[320px]">
          <PhoneFrame />
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Your subscriptions. One clear picture.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
