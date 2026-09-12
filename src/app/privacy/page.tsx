import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How SubSentry handles the email address you share when joining the waitlist.",
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Nav />
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-16 sm:px-8">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">Privacy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated September 2026</p>

        <div className="mt-8 space-y-6 text-base leading-relaxed text-foreground">
          <p>
            This page covers the SubSentry waitlist at this pre-launch site only. It does not cover the SubSentry
            product itself, which will have its own privacy policy at launch.
          </p>
          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground">What we collect</h2>
            <p className="mt-2 text-muted-foreground">
              Just the email address you submit through the waitlist form. We don&rsquo;t ask for a password, payment
              details, or any other personal information here.
            </p>
          </section>
          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground">How we use it</h2>
            <p className="mt-2 text-muted-foreground">
              To let you know when SubSentry is ready and to send occasional updates about the beta. We don&rsquo;t
              sell or share your email with third parties.
            </p>
          </section>
          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground">Removing your email</h2>
            <p className="mt-2 text-muted-foreground">
              DM{" "}
              <a
                href="https://www.instagram.com/subsentryapp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-2"
              >
                @subsentryapp on Instagram
              </a>{" "}
              and we&rsquo;ll remove it from the waitlist.
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
