import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { LaTeX } from "@/components/LaTeX";
import { QN_UNITS } from "@/lib/question-navigator-data";
import { getPracticeQuestions, submitAttempt, type PracticeQuestion } from "@/lib/practice.functions";

export const Route = createFileRoute("/_authenticated/practice")({
  head: () => ({
    meta: [
      { title: "Practice Questions — AP Calc OS" },
      { name: "description", content: "Answer AP Calculus questions from the question bank and log every result to your Score Command Center." },
      { property: "og:title", content: "Practice Questions — AP Calc OS" },
      { property: "og:description", content: "Drill AP Calculus MCQs and FRQs; every answer feeds your predicted score." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PracticePage,
});

type Feedback = Awaited<ReturnType<typeof submitAttempt>>;

function PracticePage() {
  const qc = useQueryClient();
  const [unitSlug, setUnitSlug] = useState("");
  const [topicSlug, setTopicSlug] = useState("");
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState("");
  const [selfScore, setSelfScore] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const fetchFn = useServerFn(getPracticeQuestions);
  const submitFn = useServerFn(submitAttempt);

  const unit = QN_UNITS.find((u) => u.slug === unitSlug);

  const { data, isLoading } = useQuery({
    queryKey: ["practice", unitSlug, topicSlug],
    queryFn: () =>
      fetchFn({
        data: {
          limit: 20,
          ...(unitSlug ? { unit_slug: unitSlug } : {}),
          ...(topicSlug ? { topic_slug: topicSlug } : {}),
        },
      }),
  });

  const questions = data ?? [];
  const q: PracticeQuestion | undefined = questions[index];

  const submit = useMutation({
    mutationFn: async () => {
      if (!q) throw new Error("No question loaded.");
      return submitFn({
        data: {
          question_id: q.id,
          selected_answer: q.type === "FRQ" ? `self-scored ${selfScore || 0}` : choice,
          mistake_codes: [],
          ...(q.type === "FRQ" ? { self_scored_points: Number(selfScore || 0) } : {}),
        },
      });
    },
    onSuccess: (res) => {
      setFeedback(res);
      qc.invalidateQueries({ queryKey: ["performance-snapshot"] });
      qc.invalidateQueries({ queryKey: ["answer-log"] });
    },
  });

  function next() {
    setFeedback(null);
    setChoice("");
    setSelfScore("");
    setIndex((i) => i + 1);
  }

  return (
    <AppShell>
      <div className="p-4 lg:p-8 max-w-4xl space-y-6">
        <div>
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-1">// practice</div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold tracking-tight">Question bank</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Every answer logs to your Score Command Center and updates unit mastery and subtopic accuracy.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-2">
          <select
            value={unitSlug}
            onChange={(e) => {
              setUnitSlug(e.target.value);
              setTopicSlug("");
              setIndex(0);
              setFeedback(null);
            }}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          >
            <option value="">All units</option>
            {QN_UNITS.map((u) => (
              <option key={u.slug} value={u.slug}>
                Unit {u.number} · {u.title}
              </option>
            ))}
          </select>
          <select
            value={topicSlug}
            onChange={(e) => {
              setTopicSlug(e.target.value);
              setIndex(0);
              setFeedback(null);
            }}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          >
            <option value="">All subtopics</option>
            {(unit?.topics ?? []).map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.title}
              </option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <div className="text-sm text-muted-foreground">Loading questions…</div>
        ) : !q ? (
          <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            {questions.length === 0
              ? "No published questions match this filter yet. Admins can add them from the Question Bank tab in the Command Center."
              : "You've reached the end of this set."}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
              <span className="rounded bg-elevated px-1.5 py-0.5">{q.type}</span>
              <span>{q.ap_value} pt</span>
              {q.calculator && <span>calculator</span>}
              {q.source && <span className="truncate">{q.source}</span>}
              <span className="ml-auto">
                {index + 1} / {questions.length}
              </span>
            </div>

            <div className="text-[15px] leading-relaxed">
              <LaTeX>{q.prompt}</LaTeX>
            </div>

            {q.type === "MCQ" ? (
              <div className="space-y-2">
                {q.choices.map((c) => (
                  <button
                    key={c.label}
                    disabled={!!feedback}
                    onClick={() => setChoice(c.label)}
                    className={`flex w-full items-start gap-3 rounded-md border px-3 py-2 text-left text-sm transition ${
                      choice === c.label ? "border-primary bg-primary/5" : "border-border hover:bg-elevated/60"
                    }`}
                  >
                    <span className="font-mono text-muted-foreground">{c.label}.</span>
                    <LaTeX>{c.text}</LaTeX>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {q.rubric.length > 0 && (
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {q.rubric.map((r, i) => (
                      <li key={i}>
                        <span className="font-mono">{r.points}pt</span> — <LaTeX>{r.criterion}</LaTeX>
                      </li>
                    ))}
                  </ul>
                )}
                <label className="block text-xs text-muted-foreground">
                  Score your own work out of {q.ap_value}
                  <input
                    type="number"
                    min={0}
                    max={q.ap_value}
                    value={selfScore}
                    disabled={!!feedback}
                    onChange={(e) => setSelfScore(e.target.value)}
                    className="mt-1 block w-28 rounded-md border border-border bg-background px-2 py-1.5 text-sm text-foreground"
                  />
                </label>
              </div>
            )}

            {!feedback ? (
              <button
                onClick={() => submit.mutate()}
                disabled={submit.isPending || (q.type === "MCQ" ? !choice : selfScore === "")}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
              >
                {submit.isPending ? "Logging…" : "Submit answer"}
              </button>
            ) : (
              <div className="space-y-3 border-t border-border pt-4">
                <div
                  className={`inline-flex items-center gap-2 text-sm font-medium ${feedback.correct ? "text-emerald-400" : "text-rose-400"}`}
                >
                  {feedback.correct ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  {feedback.points_earned}/{feedback.points_possible} points
                  {feedback.answer && !feedback.correct ? ` · answer: ${feedback.answer}` : ""}
                </div>
                {feedback.explanation && (
                  <div className="text-sm text-muted-foreground">
                    <LaTeX>{feedback.explanation}</LaTeX>
                  </div>
                )}
                {feedback.related_mistakes.length > 0 && (
                  <div className="rounded-md border border-rose-500/30 bg-rose-500/5 p-3">
                    <div className="text-xs uppercase tracking-wider text-rose-300">Likely point loss</div>
                    <ul className="mt-2 space-y-1 text-sm">
                      {feedback.related_mistakes.map((m) => (
                        <li key={m.code}>
                          <Link to="/common-mistakes" hash={m.code} className="font-medium hover:underline">
                            {m.title}
                          </Link>
                          <span className="text-muted-foreground"> — <LaTeX>{m.how_to_avoid}</LaTeX></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <button
                  onClick={next}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm hover:bg-elevated"
                >
                  Next question <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </AppShell>
  );
}
