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
      eyebrow="bc track"
      title={<>Calculus <span className="text-primary">BC</span>.</>}
      description="Two semesters of college calculus. Includes the entire AB syllabus plus advanced integration, parametric, polar, vector functions, and infinite series."
    >
      <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
        <p className="text-[14px] leading-relaxed text-muted-foreground">BC builds on AB — start with the Self-Study Guide, then layer in Units 9 and 10 for full BC coverage.</p>
      </div>
    </PageShell>
  ),
});
