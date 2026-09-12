import Image from "next/image";
import { SentryRing } from "@/components/sentry-ring";
import { WaitlistForm } from "@/components/waitlist-form";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-16 pt-6 sm:px-8 sm:pb-24 sm:pt-8 lg:pb-28">
      <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <div className="inline-flex items-center gap-2.5 font-heading text-base font-semibold text-foreground">
            <span aria-hidden="true" className="relative flex size-8 items-center justify-center">
              <SentryRing />
              <Image
                src="/logo-mark.png"
                alt=""
                width={32}
                height={32}
                priority
                className="size-full rounded-full object-cover"
              />
            </span>
            SubSentry
          </div>

          <h1 className="mt-8 text-balance font-heading text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.15rem]">
            Know exactly what you&rsquo;re paying for.
          </h1>
          <p className="mt-5 max-w-md text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            SubSentry helps you track recurring subscriptions, spot wasted spending, and take back control of your
            monthly costs.
          </p>

          <div className="mt-8 max-w-md">
            <WaitlistForm />
            <p className="mt-3 text-sm text-muted-foreground">Free during beta · No card required</p>
          </div>
        </div>

        <div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/10">
            <Image
              src="/dashboard-screenshot.jpg"
              alt="The SubSentry subscriptions list, showing tracked subscriptions with cost, category, and renewal date, and a high-cost flag on the largest one"
              width={1568}
              height={634}
              priority
              className="w-full"
            />
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">Your subscriptions. One clear picture.</p>
        </div>
      </div>
    </section>
  );
}
