import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, ArrowLeft, ArrowRight, Clock, Timer } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { LaTeX } from "@/components/LaTeX";
import { SlopeField } from "@/components/SlopeField";
import { SubjectContentGate } from "@/components/SubjectContentGate";
import { startDiagnostic, submitDiagnostic, type DiagnosticSession } from "@/lib/diagnostic.functions";

export const Route = createFileRoute("/_authenticated/predict")({
  head: () => ({
    meta: [
      { title: "MCQ Diagnostic — AP STEM OS" },
      {
        name: "description",
        content:
          "A timed, blueprint-sampled multiple-choice diagnostic that produces an evidence-based estimate of your AP score range.",
      },
      { property: "og:title", content: "MCQ Diagnostic — AP STEM OS" },
      { property: "og:description", content: "Timed MCQ diagnostic that drives your AP score estimate." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <SubjectContentGate>
      <PredictPage />
    </SubjectContentGate>
  ),
});

type Result = Awaited<ReturnType<typeof submitDiagnostic>>;

function PredictPage() {
  const qc = useQueryClient();
  const startFn = useServerFn(startDiagnostic);
  const submitFn = useServerFn(submitDiagnostic);

  const [session, setSession] = useState<DiagnosticSession | null>(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [times, setTimes] = useState<Record<string, number>>({});
  const [remaining, setRemaining] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  const itemStart = useRef<number>(Date.now());

  const start = useMutation({
    mutationFn: () => startFn(),
    onSuccess: (s) => {
      setSession(s);
      setIndex(0);
      setAnswers({});
      setTimes({});
      setResult(null);
      setRemaining(s.time_limit_seconds);
      itemStart.current = Date.now();
    },
  });

  const submit = useMutation({
    mutationFn: async () => {
      if (!session) throw new Error("No diagnostic in progress.");
      return submitFn({
        data: {
          diagnostic_id: session.id,
          responses: session.items.map((q) => ({
            key: q.key,
            ...(answers[q.key] ? { selected_label: answers[q.key]! } : {}),
            ...(times[q.key] ? { time_spent_ms: times[q.key]! } : {}),
          })),
        },
      });
    },
    onSuccess: (res) => {
      setResult(res);
      setSession(null);
      qc.invalidateQueries({ queryKey: ["score-estimate"] });
      qc.invalidateQueries({ queryKey: ["performance-snapshot"] });
      qc.invalidateQueries({ queryKey: ["answer-log"] });
    },
  });

  // Countdown; auto-submits once when time runs out.
  useEffect(() => {
    if (!session || result) return;
    const t = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(t);
  }, [session, result]);

  useEffect(() => {
    if (session && remaining === 0 && !submit.isPending && !result) submit.mutate();
  }, [remaining, session, result]);

  const q = session?.items[index];
  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);

  function recordTime(key: string) {
    const spent = Date.now() - itemStart.current;
    setTimes((prev) => ({ ...prev, [key]: (prev[key] ?? 0) + spent }));
    itemStart.current = Date.now();
  }

  function go(delta: number) {
    if (!session || !q) return;
    recordTime(q.key);
    setIndex((i) => Math.min(session.items.length - 1, Math.max(0, i + delta)));
  }

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  return (
    <PageShell
      eyebrow="mcq diagnostic"
      title="Predict my AP score"
      description="A timed, blueprint-sampled multiple-choice diagnostic. It weighs your first-attempt performance on questions you haven't seen against each item's difficulty. Multiple choice only — free-response performance is not modeled."
    >
      {!session && !result && (
        <div className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
          <div className="grid gap-3 sm:grid-cols-3">
            <Fact label="Questions" value="30" />
            <Fact label="Time limit" value="45 min" />
            <Fact label="Sampling" value="AP-weighted" />
          </div>
          <ul className="space-y-2 text-[13px] leading-relaxed text-muted-foreground">
            <li>· Items are spread across units by AP exam weight with a fixed easy/medium/hard mix.</li>
            <li>· Questions you haven't seen are used first, so nothing is inflated by repetition.</li>
            <li>· Answers lock when you submit. You can't change them afterward.</li>
            <li>· The result is an MCQ-based estimate with an explicit range, not a promised score.</li>
          </ul>
          <button
            onClick={() => start.mutate()}
            disabled={start.isPending}
            className="rounded-full bg-primary px-5 py-2.5 text-[14px] font-semibold text-primary-foreground disabled:opacity-50"
          >
            {start.isPending ? "Building your diagnostic…" : "Start timed diagnostic"}
          </button>
          {start.error && <p className="text-[13px] text-destructive">{(start.error as Error).message}</p>}
        </div>
      )}

      {session && q && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-[12px]">
            <span className="num inline-flex items-center gap-1.5 font-medium">
              <Timer className="h-3.5 w-3.5" /> {mm}:{ss}
            </span>
            <span className="num text-muted-foreground">
              {index + 1} / {session.items.length} · {answeredCount} answered
            </span>
            {session.unseen_share < 1 && (
              <span className="inline-flex items-center gap-1.5 text-amber-500">
                <AlertTriangle className="h-3.5 w-3.5" />
                {Math.round(session.unseen_share * 100)}% unseen — the pool of new questions is partly exhausted
              </span>
            )}
            <button
              onClick={() => {
                recordTime(q.key);
                submit.mutate();
              }}
              disabled={submit.isPending}
              className="ml-auto rounded-full bg-primary px-4 py-1.5 text-[12px] font-semibold text-primary-foreground disabled:opacity-50"
            >
              {submit.isPending ? "Scoring…" : "Submit & lock"}
            </button>
          </div>

          <div className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
            <div className="micro-label flex items-center gap-3">
              <span className="rounded-full border border-border bg-elevated/60 px-2 py-0.5 text-primary">MCQ</span>
              <span>{q.difficulty}</span>
              {q.calculator && <span>calculator</span>}
            </div>
            <div className="text-[15px] leading-relaxed">
              <LaTeX>{q.prompt}</LaTeX>
            </div>
            {q.figure ? <SlopeField figure={q.figure} /> : null}
            <div className="space-y-2">
              {q.choices.map((c) => (
                <button
                  key={c.label}
                  onClick={() => setAnswers((prev) => ({ ...prev, [q.key]: c.label }))}
                  className={`flex w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left text-[14px] transition-colors ${
                    answers[q.key] === c.label ? "border-primary bg-primary/5" : "border-border hover:bg-elevated/60"
                  }`}
                >
                  <span className="num shrink-0 text-subtle">{c.label}.</span>
                  <LaTeX>{c.text}</LaTeX>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 border-t border-border pt-5">
              <button
                onClick={() => go(-1)}
                disabled={index === 0}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-[13px] disabled:opacity-40"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Previous
              </button>
              <button
                onClick={() => go(1)}
                disabled={index === session.items.length - 1}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-[13px] disabled:opacity-40"
              >
                Next <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          {submit.error && <p className="text-[13px] text-destructive">{(submit.error as Error).message}</p>}
        </div>
      )}

      {result && (
        <div className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
          <div className="micro-label">diagnostic submitted · answers locked</div>
          <div className="num text-[14px]">
            {result.correct} / {result.answered} correct
          </div>
          {result.estimate.estimated_score === null ? (
            <p className="text-[14px] leading-relaxed text-muted-foreground">
              This diagnostic alone doesn't clear our evidence bar yet
              {result.estimate.missing.length ? ` — still need ${result.estimate.missing.join(", ")}` : ""}. Keep
              practicing new questions and check back.
            </p>
          ) : (
            <>
              <div className="flex items-baseline gap-3">
                <span className="num font-display text-5xl font-bold tracking-tight">
                  {result.estimate.estimated_score}
                </span>
                <span className="num text-[13px] text-muted-foreground">
                  range {result.estimate.range?.low}–{result.estimate.range?.high} ·{" "}
                  {result.estimate.confidence_state.replace("_", " ")}
                </span>
              </div>
              <p className="text-[12px] leading-relaxed text-muted-foreground">
                Your current multiple-choice performance is most consistent with a{" "}
                {result.estimate.estimated_score}. Model estimate only; free-response performance is not included.
              </p>
            </>
          )}
          <div className="flex flex-wrap gap-2">
            <Link
              to="/command-center"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[13px] font-semibold text-primary-foreground"
            >
              Open Score Command Center <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <button
              onClick={() => start.mutate()}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-[13px]"
            >
              <Clock className="h-3.5 w-3.5" /> New diagnostic
            </button>
          </div>
        </div>
      )}
    </PageShell>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-elevated/50 px-4 py-3">
      <div className="micro-label">{label}</div>
      <div className="num mt-1.5 text-[18px] font-semibold">{value}</div>
    </div>
  );
}
