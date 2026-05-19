import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/frqs-by-type")({
  head: () => ({
    meta: [
      { title: "FRQs by Type — APCalcExamPrep" },
      { name: "description", content: "The six recurring AP Calculus free response question types — and how to attack each." },
      { property: "og:title", content: "FRQs by Type — APCalcExamPrep" },
      { property: "og:description", content: "Master the six AP Calculus FRQ archetypes." },
    ],
  }),
  component: Page,
});

const types = [
  { name: "Rate-In / Rate-Out", desc: "Tanks filling and draining. Use the FTC to track net accumulation over an interval." },
  { name: "Particle Motion", desc: "Position, velocity, and acceleration. Watch for direction changes and total distance traveled." },
  { name: "Area & Volume", desc: "Regions between curves and solids of revolution. Disk, washer, and known cross-section setups." },
  { name: "Table / Riemann Sums", desc: "Estimate integrals from discrete data using left, right, midpoint, and trapezoidal sums." },
  { name: "Differential Equations", desc: "Slope fields, separable equations, and Euler's method (BC). State your domain." },
  { name: "Series (BC)", desc: "Taylor & Maclaurin series, convergence tests, and the Lagrange error bound." },
];

function Page() {
  return (
    <PageShell
      eyebrow="FRQs by Type"
      title={<>The <span className="text-primary">six archetypes</span>.</>}
      description="Every AP Calculus free response question is a remix of one of these six patterns. Learn the moves, and you'll recognize them on test day."
    >
      <div className="grid sm:grid-cols-2 gap-5">
        {types.map((t, i) => (
          <div key={t.name} className="bg-card p-7 rounded-3xl border border-border hover:border-primary/40 transition-colors space-y-3">
            <div className="font-display text-5xl font-extrabold text-primary/30">{String(i + 1).padStart(2, "0")}</div>
            <h2 className="font-display text-xl font-bold">{t.name}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
