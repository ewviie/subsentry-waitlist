import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Benefits } from "@/components/benefits";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Nav />
      <main className="flex-1">
        <Hero />
        <Benefits />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
