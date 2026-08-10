import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, RefreshCw, XCircle } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { LaTeX } from "@/components/LaTeX";
import { SlopeField } from "@/components/SlopeField";

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
    <PageShell
      eyebrow="practice"
      title={unit ? `Unit ${unit.number} drill` : "Question bank"}
      description={`${data ? `${data.total.toLocaleString()} original questions in this filter. ` : ""}Every answer logs to your Score Command Center and updates unit mastery and subtopic accuracy.`}
    >
      <div className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
        <select
          value={unitSlug}
          onChange={(e) => setFilter({ unit: e.target.value || undefined, topic: undefined })}
          className="rounded-full border border-border bg-card px-4 py-2.5 text-[13px] outline-none transition-colors focus:border-primary/50"
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
          className="rounded-full border border-border bg-card px-4 py-2.5 text-[13px] outline-none transition-colors focus:border-primary/50"
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
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-card px-4 py-2.5 text-[13px] font-medium transition-colors hover:border-primary/40"
        >
          <RefreshCw className="h-3.5 w-3.5" /> New set
        </button>
      </div>

      <div className="mt-6">
        {isLoading ? (
          <div className="rounded-3xl border border-dashed border-border py-16 text-center text-[14px] text-muted-foreground">
            Generating questions…
          </div>
        ) : !q ? (
          <div className="rounded-3xl border border-dashed border-border p-12 text-center text-[14px] text-muted-foreground">
            {questions.length === 0
              ? "No questions match this filter yet."
              : "You've finished this set — hit “New set” for 20 freshly generated questions."}
          </div>
        ) : (
          <div className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
            <div className="micro-label flex items-center gap-3">
              <span className="rounded-full border border-border bg-elevated/60 px-2 py-0.5 text-primary">MCQ</span>
              <span>{q.difficulty}</span>
              {q.calculator && <span>calculator</span>}
              <span className="num ml-auto text-subtle">
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
                    className={`flex w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left text-[14px] transition-colors ${
                      isAnswer
                        ? "border-emerald-500/60 bg-emerald-500/10"
                        : isWrongPick
                          ? "border-destructive/60 bg-destructive/10"
                          : choice === c.label
                            ? "border-primary bg-primary/5"
                            : "border-border hover:bg-elevated/60"
                    }`}
                  >
                    <span className="num shrink-0 text-subtle">{c.label}.</span>
                    <LaTeX>{c.text}</LaTeX>
                  </button>
                );
              })}
            </div>

            {!feedback ? (
              <button
                onClick={() => submit.mutate()}
                disabled={submit.isPending || !choice}
                className="rounded-full bg-primary px-5 py-2.5 text-[14px] font-semibold text-primary-foreground transition-opacity disabled:opacity-50"
              >
                {submit.isPending ? "Logging…" : "Submit answer"}
              </button>
            ) : (
              <div className="space-y-4 border-t border-border pt-5">
                <div
                  className={`inline-flex items-center gap-2 text-[14px] font-semibold ${feedback.correct ? "text-emerald-500" : "text-destructive"}`}
                >
                  {feedback.correct ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  <span className="num">
                    {feedback.points_earned}/{feedback.points_possible} points · answer {feedback.answer_label}
                  </span>
                </div>
                {feedback.explanation && (
                  <div className="text-[14px] leading-relaxed text-muted-foreground">
                    <LaTeX>{feedback.explanation}</LaTeX>
                  </div>
                )}
                {feedback.related_mistakes.length > 0 && (
                  <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4">
                    <div className="micro-label text-destructive">likely point loss</div>
                    <ul className="mt-3 space-y-2 text-[13px]">
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
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-[13px] font-medium transition-colors hover:border-primary/40"
                >
                  Next question <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </PageShell>
  );
}

