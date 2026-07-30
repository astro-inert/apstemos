import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/108-points-breakdown")({
  head: () => ({
    meta: [
      { title: "108 Points Breakdown — APCalcExamPrep" },
      { name: "description", content: "How the 108 raw points on the AP Calculus exam are distributed — and where to aim for a 5." },
      { property: "og:title", content: "108 Points Breakdown — APCalcExamPrep" },
      { property: "og:description", content: "The full scoring map of the AP Calculus exam." },
    ],
  }),
  component: Page,
});

const sections = [
  { name: "Section I — Multiple Choice", points: 54, parts: [
    { label: "Part A (no calculator)", points: 30, count: "30 questions · 60 min" },
    { label: "Part B (calculator)", points: 24, count: "15 questions · 45 min" },
  ]},
  { name: "Section II — Free Response", points: 54, parts: [
    { label: "Part A (calculator)", points: 18, count: "2 questions · 30 min" },
    { label: "Part B (no calculator)", points: 36, count: "4 questions · 60 min" },
  ]},
];

/** Heatmap: 5 = deep green, 4 = green, 3 = amber, 2 = orange, 1 = red. */
const cutoffs = [
  { score: "5", range: "72+ raw points", tone: "bg-emerald-500/15 text-emerald-500 border-emerald-500/40" },
  { score: "4", range: "58 – 71 raw points", tone: "bg-lime-500/15 text-lime-600 border-lime-500/40" },
  { score: "3", range: "46 – 57 raw points", tone: "bg-amber-500/15 text-amber-600 border-amber-500/40" },
  { score: "2", range: "32 – 45 raw points", tone: "bg-orange-500/15 text-orange-600 border-orange-500/40" },
  { score: "1", range: "0 – 31 raw points", tone: "bg-red-500/15 text-red-600 border-red-500/40" },
] as const;


function Page() {
  return (
    <PageShell
      eyebrow="108 Points Breakdown"
      title={<>Where the <span className="text-primary">points</span> live.</>}
      description="The AP Calculus exam is scored out of 108 raw points. Here's how every one of them is earned, and the cutoffs for each AP score."
    >
      <div className="grid gap-6">
        {sections.map((s) => (
          <div key={s.name} className="bg-card p-8 rounded-3xl border border-border">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="font-display text-2xl font-bold">{s.name}</h2>
              <span className="font-display text-4xl font-extrabold text-primary">{s.points}<span className="text-base text-muted-foreground"> pts</span></span>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {s.parts.map((p) => (
                <div key={p.label} className="p-5 bg-background rounded-2xl border border-border">
                  <div className="font-bold mb-1">{p.label}</div>
                  <div className="text-sm text-muted-foreground mb-3">{p.count}</div>
                  <div className="font-display text-2xl font-extrabold text-secondary">{p.points} pts</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="font-display text-3xl font-extrabold mb-2">Approximate score cutoffs</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Read it like a heatmap — red is danger, green is a 5.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {cutoffs.map((c) => (
            <div key={c.score} className={`p-6 rounded-2xl text-center border ${c.tone}`}>
              <div className="text-xs font-bold uppercase tracking-widest opacity-70">AP Score</div>
              <div className="font-display text-5xl font-extrabold my-2">{c.score}</div>
              <div className="text-sm font-semibold">{c.range}</div>
            </div>
          ))}
        </div>
      </div>

    </PageShell>
  );
}
