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
  { to: "/self-study-guide", title: "Self-Study Guide" },
  { to: "/topic-rundown", title: "Topic Rundown" },
  { to: "/108-points-breakdown", title: "108 Points Breakdown" },
  { to: "/frqs-by-type", title: "FRQs by Type" },
] as const;

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <section className="px-6 pt-24 pb-16 math-grid">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary text-balance">
            AP Calculus AB/BC Exam Prep (2026+)
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Abandon your Princeton Review book. This site is all you need for a 5 on your AP Calc exam this year.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-5">
          {features.map((f) => (
            <Link
              key={f.to}
              to={f.to}
              className="p-8 bg-card rounded-lg border border-border hover:border-primary transition-colors"
            >
              <h2 className="font-display text-xl font-semibold text-foreground">
                {f.title}
              </h2>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
