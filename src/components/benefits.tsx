import { CalendarClock, LayoutGrid, SearchX } from "lucide-react";
import { RevealOnScroll } from "@/components/motion/reveal";

const BENEFITS = [
  {
    icon: LayoutGrid,
    title: "Track everything",
    description: "See your recurring subscriptions in one place.",
  },
  {
    icon: SearchX,
    title: "Spot wasted spending",
    description: "Find duplicates, unused subscriptions, and opportunities to save.",
  },
  {
    icon: CalendarClock,
    title: "Stay ahead",
    description: "Know what's renewing and what deserves your attention.",
  },
];

export function Benefits() {
  return (
    <section className="border-t border-border/60 bg-muted/40">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
          {BENEFITS.map(({ icon: Icon, title, description }, index) => (
            <RevealOnScroll key={title} delay={index * 0.1} className="flex flex-col items-start gap-3 text-left">
              <span className="flex size-10 items-center justify-center rounded-full bg-emerald-muted text-emerald">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="font-heading text-base font-semibold text-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
