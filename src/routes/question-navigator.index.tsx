import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { QN_UNITS } from "@/lib/question-navigator-data";
import { ChevronRight, Compass } from "lucide-react";
import { SubjectContentGate } from "@/components/SubjectContentGate";

export const Route = createFileRoute("/question-navigator/")({
  head: () => ({
    meta: [
      { title: "Question Type Navigator — AP STEM OS" },
      { name: "description", content: "Browse AP Calculus BC by unit, topic, and exactly the question types College Board asks." },
      { property: "og:title", content: "Question Type Navigator — AP STEM OS" },
      { property: "og:description", content: "Unit → Topic → Question Type. How the exam is actually tested." },
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

function Page() {
  return (
    <PageShell
      eyebrow="question type navigator"
      title={
        <>
          How the exam is <span className="text-primary">actually tested</span>.
        </>
      }
      description="Pick the unit you're studying. Drill into topics, then into the exact MCQ and FRQ patterns College Board uses — including typical wording and common mistakes."
    >
      <div className="micro-label mb-6 flex items-center gap-2">
        <Compass className="h-3.5 w-3.5" />
        <span>unit → topic → question type</span>
      </div>

      <ol className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
        {QN_UNITS.map((u) => (
          <li key={u.slug}>
            <Link
              to="/question-navigator/$unitId"
              params={{ unitId: u.slug }}
              className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 border-b border-border px-5 py-4 transition-colors last:border-b-0 hover:bg-elevated/60 sm:px-6 sm:py-5"
            >
              <div className="num grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-[13px] font-semibold text-primary ring-1 ring-primary/20">
                {u.number}
              </div>
              <div className="min-w-0">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="truncate font-display text-[15px] font-semibold leading-tight">
                    Unit {u.number}: {u.title}
                  </div>
                  <span className="num hidden shrink-0 rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground sm:inline-block">
                    {u.weight}
                  </span>
                </div>
                <div className="mt-1 truncate text-[13px] text-muted-foreground">{u.blurb}</div>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="num hidden text-[11px] text-subtle md:inline">{u.topics.length} topics</span>
                <ChevronRight className="h-4 w-4 text-subtle transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </PageShell>
  );
}
