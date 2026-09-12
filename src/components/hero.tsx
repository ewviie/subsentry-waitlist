import Image from "next/image";
import { WaitlistForm } from "@/components/waitlist-form";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20 lg:pt-24">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-balance font-heading text-4xl font-bold tracking-tight text-foreground sm:text-display">
          Know exactly what you&rsquo;re paying for.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
          SubSentry helps you track recurring subscriptions, spot wasted spending, and take back control of your
          monthly costs.
        </p>

        <div className="mx-auto mt-8 max-w-md">
          <WaitlistForm />
          <p className="mt-3 text-sm text-muted-foreground">Free during beta · No card required</p>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-5xl sm:mt-20">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/10">
          <Image
            src="/dashboard-screenshot.jpg"
            alt="The SubSentry dashboard showing monthly spend, subscription health score, and the largest recurring expense"
            width={1512}
            height={794}
            priority
            className="w-full"
          />
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">Your subscriptions. One clear picture.</p>
      </div>
    </section>
  );
}
