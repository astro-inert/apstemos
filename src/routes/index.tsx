import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "APCalcExamPrep — AP Calculus AB/BC Exam Prep (2026+)" },
      { name: "description", content: "AP Calculus AB/BC Exam Prep (2026+). Self-Study Guide, Topic Rundown, 108 Points Breakdown, and FRQs by Type." },
    ],
  }),
  component: HomePage,
});

const features = [
  { to: "/self-study-guide", eyebrow: "Guide", title: "Self-Study Guide" },
  { to: "/topic-rundown", eyebrow: "Topics", title: "Topic Rundown" },
  { to: "/108-points-breakdown", eyebrow: "Scoring", title: "108 Points Breakdown" },
  { to: "/frqs-by-type", eyebrow: "FRQs", title: "FRQs by Type" },
] as const;

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <div className="px-6 pt-8 pb-16">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Hero panel */}
          <section className="rounded-xl bg-[oklch(0.28_0.09_260)] px-8 sm:px-12 py-14">
            <div className="max-w-3xl space-y-5">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/70">
                Free Exam Prep — 2026+
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-primary-foreground leading-tight">
                AP Calculus AB/BC Exam Prep (2026+)
              </h1>
              <p className="text-base sm:text-lg text-primary-foreground/80 leading-relaxed">
                Abandon your Princeton Review book. This site is all you need for a 5 on your AP Calc exam this year.
              </p>
            </div>
          </section>

          {/* Feature cards */}
          <section className="grid sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <Link
                key={f.to}
                to={f.to}
                className="block p-6 bg-card rounded-lg border border-border hover:border-primary transition-colors"
              >
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary mb-2">
                  {f.eyebrow}
                </div>
                <h2 className="font-display text-lg font-semibold text-foreground">
                  {f.title}
                </h2>
              </Link>
            ))}
          </section>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
