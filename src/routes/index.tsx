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
  { to: "/self-study-guide", eyebrow: "Guide", title: "Self-Study Guide", color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe" },
  { to: "/topic-rundown", eyebrow: "Topics", title: "Topic Rundown", color: "#ca8a04", bg: "#fefce8", border: "#fde68a" },
  { to: "/108-points-breakdown", eyebrow: "Scoring", title: "108 Points Breakdown", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
  { to: "/frqs-by-type", eyebrow: "FRQs", title: "FRQs by Type", color: "#7e22ce", bg: "#faf5ff", border: "#e9d5ff" },
  { to: "/latex-master-sheet", eyebrow: "Cram", title: "LaTeX 10-Page Master Sheet", color: "#ea580c", bg: "#fff7ed", border: "#fed7aa" },
  { to: "/exam-strategy", eyebrow: "Strategy", title: "Exam Strategy", color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
] as const;

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <div className="px-6 pt-12 pb-16">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Hero */}
          <section className="max-w-3xl space-y-5">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Free Exam Prep — 2026+
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              AP Calculus AB/BC Exam Prep (2026+)
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Abandon your Princeton Review book. This site is all you need for a 5 on your AP Calc exam this year.
            </p>
          </section>

          {/* Feature cards */}
          <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <Link
                key={f.to}
                to={f.to}
                className="block p-6 rounded-lg border transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: f.bg, borderColor: f.border }}
              >
                <div
                  className="text-[11px] font-bold uppercase tracking-[0.18em] mb-2"
                  style={{ color: f.color }}
                >
                  {f.eyebrow}
                </div>
                <h2 className="font-display text-lg font-semibold" style={{ color: f.color }}>
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
