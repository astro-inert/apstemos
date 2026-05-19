import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/ab-track")({
  head: () => ({
    meta: [
      { title: "AB Track — APCalcExamPrep" },
      { name: "description", content: "The AP Calculus AB track: foundations of differential and integral calculus." },
      { property: "og:title", content: "AB Track — APCalcExamPrep" },
      { property: "og:description", content: "AP Calculus AB curriculum overview." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="AB Track"
      title={<>Calculus <span className="text-primary">AB</span>.</>}
      description="A first-semester college calculus course. Eight units covering limits, derivatives, integrals, differential equations, and their applications."
    >
      <div className="bg-card p-8 rounded-3xl border border-border">
        <p className="text-muted-foreground">Pair the AB track with the Self-Study Guide and the Topic Rundown to build a complete preparation path.</p>
      </div>
    </PageShell>
  ),
});
