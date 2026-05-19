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

const cutoffs = [
  { score: "5", min: 72, color: "primary" },
  { score: "4", min: 58, color: "secondary" },
  { score: "3", min: 46, color: "accent" },
  { score: "2", min: 32, color: "muted" },
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
        <h2 className="font-display text-3xl font-extrabold mb-6">Approximate score cutoffs</h2>
        <div className="grid sm:grid-cols-4 gap-4">
          {cutoffs.map((c) => {
            const map: Record<string, string> = {
              primary: "bg-primary/10 text-primary",
              secondary: "bg-secondary/10 text-secondary",
              accent: "bg-accent/20 text-foreground",
              muted: "bg-muted text-muted-foreground",
            };
            return (
              <div key={c.score} className={`p-6 rounded-2xl text-center ${map[c.color]}`}>
                <div className="text-xs font-bold uppercase tracking-widest opacity-70">AP Score</div>
                <div className="font-display text-5xl font-extrabold my-2">{c.score}</div>
                <div className="text-sm font-semibold">{c.min}+ raw points</div>
              </div>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}
