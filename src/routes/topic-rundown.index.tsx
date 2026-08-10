import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { QN_UNITS } from "@/lib/question-navigator-data";

export const Route = createFileRoute("/topic-rundown/")({
  head: () => ({
    meta: [
      { title: "Topic Rundowns — AP STEM OS" },
      {
        name: "description",
        content: "A concise, exam-focused rundown of every core concept in each unit of AP Calculus AB and BC.",
      },
      { property: "og:title", content: "Topic Rundowns — AP STEM OS" },
      { property: "og:description", content: "Unit-by-unit, exam-focused rundowns of every core AP Calculus concept." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell
      eyebrow="Topic Rundowns"
      title={<>Every unit, <span className="text-primary">condensed</span>.</>}
      description="A concise, exam-focused guide to every core concept tested on the AP exam. Open a unit for its rundown."
    >
      <div className="grid gap-3">
        {QN_UNITS.map((u) => (
          <Link
            key={u.slug}
            to="/topic-rundown/$unitId"
            params={{ unitId: u.slug }}
            className="group rounded-2xl border border-border bg-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary/40 transition"
          >
            <div className="flex items-start gap-5 min-w-0">
              <span className="font-display font-extrabold text-2xl text-primary w-16 shrink-0 tabular-nums">
                {u.number.toString().padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h2 className="font-display text-lg font-bold">{u.title}</h2>
                <p className="text-sm text-muted-foreground mt-0.5">{u.blurb}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-elevated text-muted-foreground">
                {u.weight}
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
