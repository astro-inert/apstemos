import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { QN_UNITS } from "@/lib/question-navigator-data";
import { ChevronRight, Compass } from "lucide-react";

export const Route = createFileRoute("/question-navigator/")({
  head: () => ({
    meta: [
      { title: "Question Type Navigator — APCalcExamPrep" },
      { name: "description", content: "Browse AP Calculus BC by unit, topic, and exactly the question types College Board asks." },
      { property: "og:title", content: "Question Type Navigator — APCalcExamPrep" },
      { property: "og:description", content: "Unit → Topic → Question Type. How the exam is actually tested." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell
      eyebrow="Question Type Navigator"
      title={<>How the exam is <span className="text-violet-400">actually tested</span>.</>}
      description="Pick the unit you're studying. Drill into topics, then into the exact MCQ and FRQ patterns College Board uses — including typical wording and common mistakes."
    >
      <div className="mb-6 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
        <Compass className="h-3.5 w-3.5" />
        <span>Unit → Topic → Question Type</span>
      </div>

      <ol className="divide-y divide-border rounded-2xl border border-border bg-card overflow-hidden">
        {QN_UNITS.map((u) => (
          <li key={u.slug}>
            <Link
              to="/question-navigator/$unitId"
              params={{ unitId: u.slug }}
              className="group flex items-center gap-5 p-5 hover:bg-muted/40 transition"
            >
              <div className="shrink-0 grid place-items-center h-12 w-12 rounded-xl bg-violet-500/10 text-violet-400 ring-1 ring-violet-500/20 font-display font-bold">
                {u.number}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <div className="font-display font-semibold truncate">Unit {u.number}: {u.title}</div>
                  <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-wider text-muted-foreground px-2 py-0.5 rounded-full border border-border">
                    {u.weight}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground mt-1 truncate">{u.blurb}</div>
              </div>
              <div className="hidden md:block text-xs text-muted-foreground tabular-nums">
                {u.topics.length} topics
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition" />
            </Link>
          </li>
        ))}
      </ol>
    </PageShell>
  );
}
