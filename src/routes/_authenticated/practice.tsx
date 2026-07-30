import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, RefreshCw, XCircle } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { LaTeX } from "@/components/LaTeX";
import { QN_UNITS } from "@/lib/question-navigator-data";
import { getDrillSet, submitDrillAttempt, type DrillQuestion } from "@/lib/drill.functions";

type Search = { unit?: string; topic?: string };

export const Route = createFileRoute("/_authenticated/practice")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    unit: typeof search.unit === "string" ? search.unit : undefined,
    topic: typeof search.topic === "string" ? search.topic : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Practice Questions — AP Calc OS" },
      {
        name: "description",
        content:
          "Drill 1,800+ original, auto-generated AP Calculus multiple choice questions by unit and subtopic — every answer logs to your Score Command Center.",
      },
      { property: "og:title", content: "Practice Questions — AP Calc OS" },
      { property: "og:description", content: "Original parameterized AP Calculus MCQs; every answer feeds your predicted score." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PracticePage,
});

type Feedback = Awaited<ReturnType<typeof submitDrillAttempt>>;

function PracticePage() {
  const qc = useQueryClient();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const unitSlug = search.unit ?? "";
  const topicSlug = search.topic ?? "";
  const [seed, setSeed] = useState("set-1");
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const fetchFn = useServerFn(getDrillSet);
  const submitFn = useServerFn(submitDrillAttempt);

  const unit = QN_UNITS.find((u) => u.slug === unitSlug);

  useEffect(() => {
    setIndex(0);
    setChoice("");
    setFeedback(null);
  }, [unitSlug, topicSlug, seed]);

  const { data, isLoading } = useQuery({
    queryKey: ["drill", unitSlug, topicSlug, seed],
    queryFn: () =>
      fetchFn({
        data: {
          limit: 20,
          seed,
          ...(unitSlug ? { unit_slug: unitSlug } : {}),
          ...(topicSlug ? { topic_slug: topicSlug } : {}),
        },
      }),
  });

  const questions = data?.questions ?? [];
  const q: DrillQuestion | undefined = questions[index];

  const submit = useMutation({
    mutationFn: async () => {
      if (!q) throw new Error("No question loaded.");
      return submitFn({ data: { key: q.key, selected_label: choice } });
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
    setIndex((i) => i + 1);
  }

  function setFilter(patch: Search) {
    navigate({ search: (prev: Search) => ({ ...prev, ...patch }), replace: true });
  }

  return (
    <AppShell>
      <div className="p-4 lg:p-8 max-w-4xl space-y-6">
        <div>
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-1">// practice</div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold tracking-tight">
            {unit ? `Unit ${unit.number} drill` : "Question bank"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {data ? `${data.total.toLocaleString()} original questions in this filter. ` : ""}
            Every answer logs to your Score Command Center and updates unit mastery and subtopic accuracy.
          </p>
        </div>

        <div className="grid sm:grid-cols-[1fr_1fr_auto] gap-2">
          <select
            value={unitSlug}
            onChange={(e) => setFilter({ unit: e.target.value || undefined, topic: undefined })}
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
            onChange={(e) => setFilter({ topic: e.target.value || undefined })}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          >
            <option value="">All subtopics</option>
            {(unit?.topics ?? []).map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.title}
              </option>
            ))}
          </select>
          <button
            onClick={() => setSeed(`set-${Date.now()}`)}
            className="inline-flex items-center justify-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm hover:bg-elevated"
          >
            <RefreshCw className="h-3.5 w-3.5" /> New set
          </button>
        </div>

        {isLoading ? (
          <div className="text-sm text-muted-foreground">Generating questions…</div>
        ) : !q ? (
          <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            {questions.length === 0
              ? "No questions match this filter yet."
              : "You've finished this set — hit “New set” for 20 freshly generated questions."}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
              <span className="rounded bg-elevated px-1.5 py-0.5">MCQ</span>
              <span>{q.difficulty}</span>
              {q.calculator && <span>calculator</span>}
              <span className="ml-auto">
                {index + 1} / {questions.length}
              </span>
            </div>

            <div className="text-[15px] leading-relaxed">
              <LaTeX>{q.prompt}</LaTeX>
            </div>

            {q.figure ? <SlopeField figure={q.figure} /> : null}


            <div className="space-y-2">
              {q.choices.map((c) => {
                const isAnswer = feedback && feedback.answer_label === c.label;
                const isWrongPick = feedback && !feedback.correct && choice === c.label;
                return (
                  <button
                    key={c.label}
                    disabled={!!feedback}
                    onClick={() => setChoice(c.label)}
                    className={`flex w-full items-start gap-3 rounded-md border px-3 py-2 text-left text-sm transition ${
                      isAnswer
                        ? "border-emerald-500/60 bg-emerald-500/10"
                        : isWrongPick
                          ? "border-rose-500/60 bg-rose-500/10"
                          : choice === c.label
                            ? "border-primary bg-primary/5"
                            : "border-border hover:bg-elevated/60"
                    }`}
                  >
                    <span className="font-mono text-muted-foreground">{c.label}.</span>
                    <LaTeX>{c.text}</LaTeX>
                  </button>
                );
              })}
            </div>

            {!feedback ? (
              <button
                onClick={() => submit.mutate()}
                disabled={submit.isPending || !choice}
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
                  {feedback.points_earned}/{feedback.points_possible} points · answer {feedback.answer_label}
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
                          <span className="text-muted-foreground">
                            {" "}
                            — <LaTeX>{m.how_to_avoid}</LaTeX>
                          </span>
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
