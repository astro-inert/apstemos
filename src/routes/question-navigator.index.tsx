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

      <ol className="border-y border-border bg-card">
        {QN_UNITS.map((u) => (
          <li key={u.slug}>
            <Link
              to="/question-navigator/$unitId"
              params={{ unitId: u.slug }}
               className="group grid grid-cols-[3rem_minmax(0,1fr)_auto] items-center gap-4 border-b border-border px-2 py-5 transition-colors last:border-b-0 hover:bg-elevated/60 sm:grid-cols-[4.5rem_minmax(0,1fr)_auto] sm:px-4 sm:py-6"
            >
              <div className="num text-2xl font-semibold text-primary sm:text-3xl">
                {String(u.number).padStart(2, "0")}
              </div>
              <div className="min-w-0">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="truncate font-display text-[15px] font-semibold leading-tight">
                    Unit {u.number}: {u.title}
                  </div>
                   <span className="num hidden shrink-0 border-l border-border pl-3 text-[11px] text-muted-foreground sm:inline-block">
                    {u.weight}
                  </span>
                </div>
                <div className="mt-1 truncate text-[13px] text-secondary-foreground">{u.blurb}</div>
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
