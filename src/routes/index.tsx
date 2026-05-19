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
  { to: "/self-study-guide", eyebrow: "Guide", title: "Self-Study Guide", desc: "Just because you're not in a class doesn't mean you have to do it all by yourself — here's a full guide so you can get started and keep that momentum till May", color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe" },
  { to: "/topic-rundown", eyebrow: "Topics", title: "Topic Rundown", desc: "Need a quick refresher on sum to integral notation? This topic rundown will succinctly breakdown essential concepts and topics — from derivatives to integrals to series", color: "#ca8a04", bg: "#fefce8", border: "#fde68a" },
  { to: "/108-points-breakdown", eyebrow: "Scoring", title: "108 Points Breakdown", desc: "Maximize your score by leveraging exam focus and scoring guidelines", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
  { to: "/frqs-by-type", eyebrow: "FRQs", title: "FRQs by Type", desc: "Know exactly what you'll see in May, including possibilities for each question type, whether AB or BC", color: "#7e22ce", bg: "#faf5ff", border: "#e9d5ff" },
  { to: "/latex-master-sheet", eyebrow: "Cram", title: "Master Sheet", desc: "Save this 10-page LaTeX-formatted comprehensive, topic-organized to review all the important formulas you need a week before your exam", color: "#ea580c", bg: "#fff7ed", border: "#fed7aa" },
  { to: "/exam-strategy", eyebrow: "Strategy", title: "Exam Strategy", desc: "You don't need to be 100% on all the concepts — know exactly how to optimize your execution on exam day", color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
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
