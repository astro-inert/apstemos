import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/topic-rundown")({
  head: () => ({
    meta: [
      { title: "Topic Rundown — APCalcExamPrep" },
      { name: "description", content: "Concise cheat sheets for every unit in the AP Calculus AB & BC CED." },
      { property: "og:title", content: "Topic Rundown — APCalcExamPrep" },
      { property: "og:description", content: "Unit-by-unit cheat sheets for AP Calculus AB & BC." },
    ],
  }),
  component: Page,
});

const units = [
  { unit: "Unit 1", name: "Limits & Continuity", track: "AB / BC", weight: "10–12%" },
  { unit: "Unit 2", name: "Differentiation: Definition & Basic Rules", track: "AB / BC", weight: "10–12%" },
  { unit: "Unit 3", name: "Differentiation: Composite, Implicit & Inverse", track: "AB / BC", weight: "9–13%" },
  { unit: "Unit 4", name: "Contextual Applications of Differentiation", track: "AB / BC", weight: "10–15%" },
  { unit: "Unit 5", name: "Analytical Applications of Differentiation", track: "AB / BC", weight: "15–18%" },
  { unit: "Unit 6", name: "Integration & Accumulation of Change", track: "AB / BC", weight: "17–20%" },
  { unit: "Unit 7", name: "Differential Equations", track: "AB / BC", weight: "6–12%" },
  { unit: "Unit 8", name: "Applications of Integration", track: "AB / BC", weight: "10–15%" },
  { unit: "Unit 9", name: "Parametric, Polar & Vector Functions", track: "BC only", weight: "11–12%" },
  { unit: "Unit 10", name: "Infinite Sequences & Series", track: "BC only", weight: "17–18%" },
];

function Page() {
  return (
    <PageShell
      eyebrow="Topic Rundown"
      title={<>Every unit, <span className="text-primary">condensed</span>.</>}
      description="The full College Board CED, organized so you can find what you need in under ten seconds. Click any unit for the cheat sheet."
    >
      <div className="grid gap-4">
        {units.map((u) => (
          <div key={u.unit} className="bg-card p-6 rounded-2xl border border-border hover:border-primary/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer">
            <div className="flex items-center gap-5">
              <span className="font-display font-extrabold text-2xl text-primary w-20">{u.unit}</span>
              <div>
                <h3 className="font-display text-lg font-bold">{u.name}</h3>
                <p className="text-sm text-muted-foreground">{u.track}</p>
              </div>
            </div>
            <span className="text-sm font-semibold px-3 py-1.5 bg-accent/20 text-foreground rounded-full self-start sm:self-auto">
              {u.weight} of exam
            </span>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
