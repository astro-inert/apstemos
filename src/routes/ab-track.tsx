import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/ab-track")({
  head: () => ({
    meta: [
      { title: "AB Track — AP STEM OS" },
      { name: "description", content: "The AP Calculus AB track: foundations of differential and integral calculus." },
      { property: "og:title", content: "AB Track — AP STEM OS" },
      { property: "og:description", content: "AP Calculus AB curriculum overview." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="ab track"
      title={<>Calculus <span className="text-primary">AB</span>.</>}
      description="A first-semester college calculus course. Eight units covering limits, derivatives, integrals, differential equations, and their applications."
    >
      <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
        <p className="text-[14px] leading-relaxed text-muted-foreground">Pair the AB track with the Topic Rundowns and the Question Type Navigator to build a complete preparation path.</p>
      </div>
    </PageShell>
  ),
});
