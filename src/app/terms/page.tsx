import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms for joining the SubSentry pre-launch waitlist.",
};

export default function TermsPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Nav />
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-16 sm:px-8">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">Terms</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated September 2026</p>

        <div className="mt-8 space-y-6 text-base leading-relaxed text-foreground">
          <p>
            These terms cover only the SubSentry waitlist at this pre-launch site. The SubSentry product itself will
            have its own terms of service at launch.
          </p>
          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground">Joining the waitlist</h2>
            <p className="mt-2 text-muted-foreground">
              Joining is free and doesn&rsquo;t require a card. It doesn&rsquo;t guarantee access, a launch date, or
              any particular pricing — it only means we&rsquo;ll email you when SubSentry is ready.
            </p>
          </section>
          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground">No obligation</h2>
            <p className="mt-2 text-muted-foreground">
              You can ask to be removed from the waitlist at any time — see the{" "}
              <Link href="/privacy" className="text-foreground underline underline-offset-2">
                Privacy
              </Link>{" "}
              page for how.
            </p>
          </section>
        </div>

        <Link href="/" className="mt-10 inline-block text-sm font-medium text-foreground underline underline-offset-2">
          ← Back home
        </Link>
      </main>
      <Footer />
    </div>
  );
}
