import Image from "next/image";
import { PhoneFrame } from "@/components/phone-frame";
import { SentryRing } from "@/components/sentry-ring";
import { WaitlistForm } from "@/components/waitlist-form";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-16 pt-6 sm:px-8 sm:pb-24 sm:pt-8 lg:pb-28">
      <div className="grid gap-16 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div>
          <div className="inline-flex items-center gap-3 font-heading text-lg font-bold text-foreground">
            <span aria-hidden="true" className="relative flex size-9 items-center justify-center">
              <SentryRing />
              <Image
                src="/logo-mark.png"
                alt=""
                width={36}
                height={36}
                priority
                className="size-full rounded-full object-cover"
              />
            </span>
            SubSentry
          </div>

          <h1 className="mt-10 text-balance font-heading text-[2.75rem] font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.15rem]">
            Know exactly what you&rsquo;re paying for.
          </h1>
          <p className="mt-6 max-w-md text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            SubSentry helps you track recurring subscriptions, spot wasted spending, and take back control of your
            monthly costs.
          </p>

          <div className="mt-9 max-w-md">
            <WaitlistForm />
            <p className="mt-3 text-sm text-muted-foreground">Free during beta · No card required</p>
          </div>
        </div>

        <div className="mx-auto w-[280px] sm:w-[300px] lg:mx-0 lg:ml-auto lg:w-[320px]">
          <PhoneFrame />
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Your subscriptions. One clear picture.
          </p>
        </div>
      </div>
    </section>
  );
}
