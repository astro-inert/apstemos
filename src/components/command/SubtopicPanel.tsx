import { Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import type { PerformanceSnapshot } from "@/lib/performance.functions";
import { STRENGTH_CUTOFF, SUBTOPIC_THRESHOLD } from "@/lib/performance.functions";

type Sub = PerformanceSnapshot["subtopics"][number];

export function SubtopicPanel({ subtopics }: { subtopics: Sub[] }) {
  const unlocked = subtopics.filter((s) => s.unlocked);
  const building = subtopics.filter((s) => !s.unlocked);
  // A topic is either a strength or a weakness — never both.
  const strengths = unlocked
    .filter((s) => s.accuracy >= STRENGTH_CUTOFF)
    .sort((a, b) => b.accuracy - a.accuracy)
    .slice(0, 6);
  const weaknesses = unlocked
    .filter((s) => s.accuracy < STRENGTH_CUTOFF)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 6);

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <Column
        title="Topic strengths"
        sub={`At or above ${STRENGTH_CUTOFF}% accuracy, unlocked at ${SUBTOPIC_THRESHOLD}+ questions.`}
        rows={strengths}
        tone="emerald"
        empty={`No topic is at ${STRENGTH_CUTOFF}%+ yet with ${SUBTOPIC_THRESHOLD}+ questions logged.`}
      />
      <Column
        title="Topic weaknesses"
        sub={`Below ${STRENGTH_CUTOFF}% accuracy — drill these first.`}
        rows={weaknesses}
        tone="rose"
        empty={`Nothing below ${STRENGTH_CUTOFF}% with ${SUBTOPIC_THRESHOLD}+ questions logged.`}
      />

      <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
        <div className="text-xs uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1.5">
          <Lock className="h-3.5 w-3.5" /> Building data
        </div>
        <h3 className="font-display font-semibold mt-1">Almost enough evidence</h3>
        {building.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            No partial topics.{" "}
            <Link to="/practice" className="text-primary hover:underline">
              Practice more
            </Link>{" "}
            to open topic diagnostics.
          </p>
        ) : (
          <ul className="mt-4 space-y-2">
            {building.slice(0, 6).map((s) => (
              <li key={s.topic_slug} className="flex items-center justify-between gap-3 text-sm">
                <span className="truncate">{s.topic_title}</span>
                <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                  {s.attempts}/{SUBTOPIC_THRESHOLD}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Column({
  title,
  sub,
  rows,
  tone,
  empty,
}: {
  title: string;
  sub: string;
  rows: Sub[];
  tone: "emerald" | "rose";
  empty: string;
}) {
  const c = tone === "emerald" ? { dot: "bg-emerald-400", txt: "text-emerald-300", bar: "bg-emerald-500" } : { dot: "bg-rose-400", txt: "text-rose-300", bar: "bg-rose-500" };
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
        <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} /> {title}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
      {rows.length === 0 ? (
        <div className="mt-4 text-sm text-muted-foreground">{empty}</div>
      ) : (
        <ul className="mt-4 space-y-3">
          {rows.map((s) => (
            <li key={s.topic_slug}>
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-sm font-medium">{s.topic_title}</span>
                <span className={`shrink-0 font-mono text-xs tabular-nums ${c.txt}`}>{s.accuracy}%</span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-elevated">
                <div className={`h-full ${c.bar}`} style={{ width: `${Math.max(4, s.accuracy)}%` }} />
              </div>
              <div className="mt-1 text-[10px] text-muted-foreground">
                Unit {s.unit_number} · {s.attempts} questions
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
