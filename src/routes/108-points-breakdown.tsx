import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { MicroLabel, Reveal } from "@/components/home/primitives";
import { SubjectContentGate } from "@/components/SubjectContentGate";

export const Route = createFileRoute("/108-points-breakdown")({
  head: () => ({
    meta: [
      { title: "108 Points Breakdown — AP STEM OS" },
      { name: "description", content: "How the 108 raw points on the AP Calculus exam are distributed — and where to aim for a 5." },
      { property: "og:title", content: "108 Points Breakdown — AP STEM OS" },
      { property: "og:description", content: "The full scoring map of the AP Calculus exam." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <SubjectContentGate>
      <Page />
    </SubjectContentGate>
  ),
});

const sections = [
  {
    name: "Section I — Multiple Choice",
    points: 54,
    parts: [
      { label: "Part A (no calculator)", points: 30, count: "30 questions · 60 min" },
      { label: "Part B (calculator)", points: 24, count: "15 questions · 45 min" },
    ],
  },
  {
    name: "Section II — Free Response",
    points: 54,
    parts: [
      { label: "Part A (calculator)", points: 18, count: "2 questions · 30 min" },
      { label: "Part B (no calculator)", points: 36, count: "4 questions · 60 min" },
    ],
  },
];

/** Heatmap: 5 = deep green, 4 = green, 3 = amber, 2 = orange, 1 = red. */
const cutoffs = [
  { score: "5", range: "72+ raw points", tone: "border-emerald-500/40 bg-emerald-500/10 text-emerald-600" },
  { score: "4", range: "58 – 71 raw points", tone: "border-lime-500/40 bg-lime-500/10 text-lime-600" },
  { score: "3", range: "46 – 57 raw points", tone: "border-amber-500/40 bg-amber-500/10 text-amber-600" },
  { score: "2", range: "32 – 45 raw points", tone: "border-orange-500/40 bg-orange-500/10 text-orange-600" },
  { score: "1", range: "0 – 31 raw points", tone: "border-red-500/40 bg-red-500/10 text-red-600" },
] as const;

function Page() {
  return (
    <PageShell
      eyebrow="108 points"
      title={
        <>
          Where the <span className="text-primary">points</span> live.
        </>
      }
      description="The AP Calculus exam is scored out of 108 raw points. Here's how every one of them is earned, and the cutoffs for each AP score."
    >
      <div className="grid gap-4 lg:gap-6">
        {sections.map((s, i) => (
          <Reveal
            key={s.name}
            delay={i * 0.07}
            className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8"
          >
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4">
              <h2 className="min-w-0 font-display text-xl font-semibold leading-tight sm:text-2xl">{s.name}</h2>
              <span className="num shrink-0 font-display text-3xl font-semibold text-primary sm:text-4xl">
                {s.points}
                <span className="ml-1 text-[13px] font-normal text-muted-foreground">pts</span>
              </span>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {s.parts.map((p) => (
                <div key={p.label} className="rounded-2xl border border-border bg-background p-5">
                  <div className="text-[14px] font-medium">{p.label}</div>
                  <div className="num mt-1 text-[12px] text-muted-foreground">{p.count}</div>
                  <div className="num mt-4 font-display text-2xl font-semibold">{p.points} pts</div>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-16">
        <Reveal>
          <MicroLabel>score cutoffs</MicroLabel>
          <h2 className="mt-4 font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
            Approximate score cutoffs
          </h2>
          <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-muted-foreground">
            Read it like a heatmap — red is danger, green is a 5.
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {cutoffs.map((c, i) => (
            <Reveal key={c.score} delay={i * 0.05} className={`rounded-2xl border p-5 text-center ${c.tone}`}>
              <div className="micro-label opacity-80">AP score</div>
              <div className="num my-2 font-display text-4xl font-semibold">{c.score}</div>
              <div className="num text-[12px] font-medium">{c.range}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
