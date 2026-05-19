import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/self-study-guide")({
  head: () => ({
    meta: [
      { title: "Self-Study Guide — APCalcExamPrep" },
      { name: "description", content: "A 12-week, week-by-week roadmap to prepare for AP Calculus AB & BC on your own." },
      { property: "og:title", content: "Self-Study Guide — APCalcExamPrep" },
      { property: "og:description", content: "A week-by-week roadmap for independent AP Calculus learners." },
    ],
  }),
  component: Page,
});

const weeks = [
  { week: "Weeks 1–2", title: "Limits & Continuity", desc: "Build intuition for limits, one-sided behavior, and the IVT." },
  { week: "Weeks 3–4", title: "Derivatives — Foundations", desc: "Power, product, quotient, chain rule. Implicit differentiation." },
  { week: "Weeks 5–6", title: "Applications of Derivatives", desc: "Related rates, optimization, motion, and the MVT." },
  { week: "Weeks 7–8", title: "Integrals & the FTC", desc: "Riemann sums, anti-derivatives, and the Fundamental Theorem." },
  { week: "Weeks 9–10", title: "Applications of Integration", desc: "Area, volume, accumulation. BC: integration by parts & partial fractions." },
  { week: "Week 11 (BC)", title: "Sequences, Series & Polar", desc: "Convergence tests, Taylor & Maclaurin, parametric and polar." },
  { week: "Week 12", title: "Full-Length Practice & Review", desc: "Two full exams under timed conditions. Review FRQs by type." },
];

function Page() {
  return (
    <PageShell
      eyebrow="Self-Study Guide"
      title={<>A 12-week plan to <span className="text-primary">a 5</span>.</>}
      description="Independent learners — this is your map. Each week stacks on the last, with clear targets, recommended problem sets, and checkpoints."
    >
      <ol className="space-y-4">
        {weeks.map((w, i) => (
          <li key={w.week} className="bg-card p-6 lg:p-8 rounded-3xl border border-border flex gap-6 items-start hover:border-primary/30 transition-colors">
            <div className="shrink-0 w-12 h-12 rounded-2xl bg-primary/10 text-primary font-display font-extrabold grid place-items-center">
              {i + 1}
            </div>
            <div className="space-y-2 flex-1">
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{w.week}</div>
              <h2 className="font-display text-2xl font-bold">{w.title}</h2>
              <p className="text-muted-foreground">{w.desc}</p>
            </div>
            <CheckCircle2 className="w-6 h-6 text-accent shrink-0 hidden sm:block" />
          </li>
        ))}
      </ol>
    </PageShell>
  );
}
