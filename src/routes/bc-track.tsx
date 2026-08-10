import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/bc-track")({
  head: () => ({
    meta: [
      { title: "BC Track — AP STEM OS" },
      { name: "description", content: "The AP Calculus BC track: everything in AB plus series, parametric, polar, and vector functions." },
      { property: "og:title", content: "BC Track — AP STEM OS" },
      { property: "og:description", content: "AP Calculus BC curriculum overview." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="BC Track"
      title={<>Calculus <span className="text-primary">BC</span>.</>}
      description="Two semesters of college calculus. Includes the entire AB syllabus plus advanced integration, parametric, polar, vector functions, and infinite series."
    >
      <div className="bg-card p-8 rounded-3xl border border-border">
        <p className="text-muted-foreground">BC builds on AB — start with the Self-Study Guide, then layer in Units 9 and 10 for full BC coverage.</p>
      </div>
    </PageShell>
  ),
});
