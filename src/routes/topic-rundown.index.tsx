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
      eyebrow="topic rundowns"
      title={
        <>
          Every unit, <span className="text-primary">condensed</span>.
        </>
      }
      description="A concise, exam-focused guide to every core concept tested on the AP exam. Open a unit for its rundown."
    >
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
        {QN_UNITS.map((u) => (
          <Link
            key={u.slug}
            to="/topic-rundown/$unitId"
            params={{ unitId: u.slug }}
            className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 border-b border-border px-5 py-4 transition-colors last:border-b-0 hover:bg-elevated/60 sm:px-6 sm:py-5"
          >
            <span className="num w-9 shrink-0 font-display text-lg font-semibold text-primary">
              {u.number.toString().padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <h2 className="truncate font-display text-[15px] font-semibold leading-tight">{u.title}</h2>
              <p className="mt-1 truncate text-[13px] text-muted-foreground">{u.blurb}</p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span className="num hidden rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground sm:inline-block">
                {u.weight}
              </span>
              <ArrowRight className="h-4 w-4 text-subtle transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
            </div>
          </Link>
        ))}
      </div>
      
    </PageShell>
  );
}
