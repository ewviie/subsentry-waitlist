import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SentryRing } from "@/components/sentry-ring";

export function Nav() {
  return (
    <header className="border-b border-border/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5 font-heading text-lg font-semibold tracking-tight">
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
        </Link>
        {/* Pre-launch: no /login route exists yet, so this is deliberately
            not a link — it sets expectation without pointing at unfinished
            functionality. */}
        <span className="flex items-center gap-1 text-[13px] text-muted-foreground sm:gap-1.5 sm:text-sm">
          Already have an account?
          <ArrowRight className="size-3.5 shrink-0" aria-hidden="true" />
        </span>
      </div>
    </header>
  );
}
