import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, XCircle } from "lucide-react";
import { LaTeX } from "@/components/LaTeX";
import { getAnswerLog } from "@/lib/practice.functions";
import { QN_UNITS } from "@/lib/question-navigator-data";
import { MistakeTagger } from "@/components/mistakes/MistakeTagger";

const topicTitle = (slug: string | null) =>
  slug ? (QN_UNITS.flatMap((u) => u.topics).find((t) => t.slug === slug)?.title ?? slug) : "Untagged";

export function AnswerLogPanel() {
  const fn = useServerFn(getAnswerLog);
  const { data, isLoading } = useQuery({ queryKey: ["answer-log"], queryFn: () => fn({ data: { limit: 100 } }) });

  const rows = data ?? [];

  return (
    <div className="border-y border-border bg-card">
      <div className="px-5 py-4 border-b border-border">
        <div className="micro-label text-primary">Answer log</div>
        <h3 className="font-display font-semibold mt-1">Your recent answers</h3>
        <p className="mt-1 text-sm text-secondary-foreground">
          Correct and incorrect attempts are logged here. Missed questions link to the mistakes behind them.
        </p>
      </div>
      {isLoading ? (
        <div className="p-5 text-sm text-muted-foreground">Loading your log…</div>
      ) : rows.length === 0 ? (
        <div className="p-5 text-sm text-muted-foreground">
          No attempts yet.{" "}
          <Link to="/practice" className="text-primary hover:underline">
            Start practicing
          </Link>{" "}
          to build your log.
        </div>
      ) : (
        <div className="divide-y divide-border">
          {rows.map((r) => (
            <div key={r.id} className="flex items-start gap-3 px-5 py-3">
              <span className="mt-0.5 shrink-0">
                {r.correct ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ) : (
                  <XCircle className="h-4 w-4 text-rose-400" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm line-clamp-2">
                  <LaTeX>{r.prompt}</LaTeX>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="font-mono">{r.type}</span>
                  <span>{topicTitle(r.topic_slug)}</span>
                  <span>{new Date(r.created_at).toLocaleDateString()}</span>
                  {r.mistake_codes.map((c) => (
                    <Link
                      key={c}
                      to="/common-mistakes"
                      hash={c}
                      className="rounded-sm bg-destructive/10 px-1.5 py-0.5 font-mono text-destructive hover:underline"
                    >
                      {c}
                    </Link>
                  ))}
                  {!r.correct && (
                    <MistakeTagger
                      attemptId={r.id}
                      questionPrompt={r.prompt}
                      topic={topicTitle(r.topic_slug)}
                    />
                  )}
                </div>
              </div>
              <div
                className={`shrink-0 font-mono text-[11px] font-medium ${r.correct ? "text-emerald-400" : "text-rose-400"}`}
              >
                {r.correct ? "Correct" : "Incorrect"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
