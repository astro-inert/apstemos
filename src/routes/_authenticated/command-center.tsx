import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import {
  useSuspenseQuery,
  useQuery,
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Suspense, useState } from "react";
import { Activity, AlertTriangle, ArrowRight, Calendar, Sparkles } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { AnswerLogPanel } from "@/components/command/AnswerLogPanel";
import { QuestionBankPanel } from "@/components/command/QuestionBankPanel";
import { SubtopicPanel } from "@/components/command/SubtopicPanel";
import { ScoreEstimateCard } from "@/components/command/ScoreEstimateCard";
import {
  getPerformanceSnapshot,
  UNIT_MASTERY_THRESHOLD,
  type PerformanceSnapshot,
} from "@/lib/performance.functions";
import { getBankAccess } from "@/lib/question-bank.functions";
import { setExamTrack } from "@/lib/profile.functions";
import { QN_UNITS } from "@/lib/question-navigator-data";
import { useCurrentSubject } from "@/lib/use-subject";
import { LaTeX } from "@/components/LaTeX";
import { SUBJECTS, type SubjectId } from "@/lib/subjects";

export const Route = createFileRoute("/_authenticated/command-center")({
  head: () => ({
    meta: [
      { title: "Score Command Center — AP STEM OS" },
      {
        name: "description",
        content:
          "Practice accuracy, topic strengths and weaknesses, coverage, mistake patterns, and a diagnostic-based AP score estimate.",
      },
      { property: "og:title", content: "Score Command Center — AP STEM OS" },
      {
        property: "og:description",
        content:
          "Practice diagnostics, mistake intelligence, and a separate MCQ diagnostic score estimate.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CommandCenter,
  errorComponent: ErrorView,
  pendingComponent: () => (
    <AppShell>
      <div className="mx-auto max-w-6xl px-5 py-16 text-[14px] text-muted-foreground sm:px-8">
        Loading your performance data…
      </div>
    </AppShell>
  ),
});

function ErrorView({ error }: { error: Error }) {
  const router = useRouter();
  return (
    <AppShell>
      <div className="mx-auto max-w-md px-5 py-20 sm:px-8">
        <h2 className="font-display text-xl font-semibold">Couldn't load your data</h2>
        <p className="mt-2 text-[14px] text-muted-foreground">{error.message}</p>
        <button
          onClick={() => router.invalidate()}
          className="mt-6 rounded-md bg-primary px-5 py-2.5 text-[14px] font-semibold text-primary-foreground"
        >
          Try again
        </button>
      </div>
    </AppShell>
  );
}

function CommandCenter() {
  return (
    <AppShell>
      <Suspense fallback={null}>
        <Inner />
      </Suspense>
    </AppShell>
  );
}

const snapshotKey = ["performance-snapshot"] as const;

function Inner() {
  const subjectId = useCurrentSubject();
  if (subjectId !== "calc-bc") return <OtherSubjectCommandCenter subjectId={subjectId} />;
  return <CalcCommandCenter />;
}

function CalcCommandCenter() {
  const fn = useServerFn(getPerformanceSnapshot);
  const accessFn = useServerFn(getBankAccess);
  const [tab, setTab] = useState<"overview" | "log" | "bank">("overview");
  const { data } = useSuspenseQuery(queryOptions({ queryKey: snapshotKey, queryFn: () => fn() }));
  const access = useQuery({ queryKey: ["bank-access"], queryFn: () => accessFn() });
  const isAdmin = access.data?.is_admin === true;
  const daysToExam = Math.max(
    0,
    Math.ceil(
      (new Date(data.profile?.exam_date ?? "2027-05-10").getTime() - Date.now()) / 86400000,
    ),
  );
  const tabs = [
    { id: "overview" as const, label: "Overview" },
    { id: "log" as const, label: "Answer Log" },
    ...(isAdmin ? [{ id: "bank" as const, label: "Question Bank" }] : []),
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-5 pb-24 pt-12 sm:px-8 sm:pt-16">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-8">
        <div className="min-w-0">
          <div className="micro-label">score command center</div>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.06] sm:text-5xl">
            {data.profile?.display_name
              ? `Welcome back, ${data.profile.display_name}.`
              : "Welcome back."}
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-secondary-foreground">
            {data.attempts_count === 0
              ? "No attempts yet — your dashboard updates as you practice."
              : `${data.attempts_count} questions logged · ${Math.round(data.accuracy * 100)}% practice accuracy`}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/practice"
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-[13px] font-semibold text-primary-foreground"
          >
            Practice <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            to="/predict"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-4 py-2 text-[13px] font-medium transition-colors hover:border-primary/40"
          >
            MCQ diagnostic
          </Link>
          {isAdmin && (
            <Link
              to="/admin/predictions"
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-4 py-2 text-[13px] font-medium transition-colors hover:border-primary/40"
            >
              Prediction analytics
            </Link>
          )}
          <TrackSwitcher track={data.profile?.track === "AB" ? "AB" : "BC"} />
          <span className="num inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 text-[12px] text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" /> {daysToExam} days to exam
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1 overflow-x-auto border-b border-border">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`-mb-px shrink-0 border-b-2 px-3.5 py-2.5 text-[13px] transition-colors ${tab === t.id ? "border-primary font-semibold text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <ScoreEstimateCard />
            </div>
            <InsightsPanel data={data} />
          </div>
          <SubtopicPanel subtopics={data.subtopics} />
          <PerformanceDiagnostics units={data.unit_mastery} />
          <TopMistakesPanel mistakes={data.top_mistakes} />
        </div>
      )}
      {tab === "log" && <AnswerLogPanel />}
      {tab === "bank" && isAdmin && <QuestionBankPanel />}
    </div>
  );
}

function OtherSubjectCommandCenter({ subjectId }: { subjectId: SubjectId }) {
  const subject = SUBJECTS[subjectId];
  const daysToExam = Math.max(
    0,
    Math.ceil((new Date(subject.examDate).getTime() - Date.now()) / 86400000),
  );
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-5 pb-24 pt-12 sm:px-8 sm:pt-16">
      <div className="border-b border-border pb-8">
        <div className="micro-label">score command center</div>
        <h1 className="mt-4 font-display text-4xl font-semibold">
          {subject.navLabel} Command Center
        </h1>
        <p className="mt-3 text-[15px] text-secondary-foreground">
          The {subject.navLabel} question bank is coming soon. No performance metrics are generated
          until real attempts exist.
        </p>
        <span className="mt-4 num inline-flex items-center gap-1.5 text-[12px] text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" /> {daysToExam} days to exam
        </span>
      </div>
      <div className="border-t-2 border-border bg-card p-6">
        <div className="micro-label">Coming soon</div>
        <p className="mt-2 text-sm text-muted-foreground">
          Practice analytics for {subject.navLabel} will appear here after its question bank
          launches.
        </p>
      </div>
    </div>
  );
}

type UnitRow = PerformanceSnapshot["unit_mastery"][number];

function PerformanceDiagnostics({ units }: { units: UnitRow[] }) {
  const untouched = units.filter((u) => u.attempts === 0);
  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="border-t-2 border-border bg-card p-6">
        <div className="micro-label inline-flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> Coverage gaps
        </div>
        <h3 className="font-display font-semibold mt-1">Units without evidence</h3>
        {untouched.length === 0 ? (
          <div className="mt-4 text-sm text-muted-foreground">
            Every unit has at least one logged attempt.
          </div>
        ) : (
          <ul className="mt-4 space-y-2">
            {untouched.slice(0, 5).map((u) => (
              <li
                key={u.unit_id}
                className="p-2 rounded-md bg-elevated/40 border border-dashed border-border"
              >
                <div className="text-sm font-medium">
                  Unit {u.number} · {u.name}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  {u.ap_weight_pct}% of exam · no practice evidence yet
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="overflow-hidden border-y border-border bg-card lg:col-span-3">
        <div className="px-5 py-4 border-b border-border">
          <div className="micro-label inline-flex items-center gap-1.5">
            <Activity className="h-3.5 w-3.5" /> Unit performance
          </div>
          <h3 className="font-display font-semibold mt-1">
            Accuracy and coverage are tracked separately
          </h3>
          <div className="mt-1 text-[10px] text-muted-foreground">
            Accuracy becomes established after {UNIT_MASTERY_THRESHOLD}+ attempts and at least one
            attempt in every topic.
          </div>
        </div>
        <div className="divide-y divide-border">
          {[...units]
            .sort((a, b) => b.coverage - a.coverage || b.mastery - a.mastery)
            .map((u) => {
              const established = u.mastery_unlocked;
              const accuracy = u.mastery < 0 ? 0 : u.mastery;
              const practiceUnit = QN_UNITS.find((qu) => qu.number === u.number);
              return (
                <div
                  key={u.unit_id}
                  className="grid grid-cols-12 items-center gap-3 px-5 py-3 text-sm"
                >
                  <div className="col-span-5 sm:col-span-4 min-w-0">
                    <div className="font-medium truncate">
                      Unit {u.number} · {u.name}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      {u.attempts} attempts · {u.subtopics_covered}/{u.subtopics_total} topics
                      covered
                    </div>
                  </div>
                  <div className="col-span-3 sm:col-span-4">
                    <div className="h-2 rounded-full bg-elevated overflow-hidden">
                      <div
                        className="h-full bg-primary/70"
                        style={{ width: `${Math.round(u.coverage * 100)}%` }}
                      />
                    </div>
                    <div className="mt-1 text-[9px] text-muted-foreground">
                      {Math.round(u.coverage * 100)}% coverage
                    </div>
                  </div>
                  <div className="col-span-2 text-right font-mono text-xs">
                    {u.attempts === 0 ? "—" : `${accuracy}%`}
                  </div>
                  <div className="col-span-1 text-right">
                    <span className="num text-[10px] text-muted-foreground">
                      {u.attempts === 0 ? "Untouched" : established ? "Established" : "Building"}
                    </span>
                  </div>
                  <div className="col-span-1 text-right">
                    {practiceUnit ? (
                      <Link
                        to="/practice"
                        search={{ unit: practiceUnit.slug }}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground"
                      >
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    ) : null}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

function TopMistakesPanel({
  mistakes,
}: {
  mistakes: Array<{ code: string; title: string; category: string; occurrences: number }>;
}) {
  return (
    <div className="h-full border-t-2 border-border bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="micro-label inline-flex items-center gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5 text-destructive" /> Ranked by occurrences
          </div>
          <h3 className="font-display font-semibold mt-1">Your top mistakes</h3>
        </div>
        <Link
          to="/common-mistakes"
          className="text-xs text-primary hover:underline inline-flex items-center gap-1"
        >
          All mistakes <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      {mistakes.length === 0 ? (
        <div className="text-sm text-muted-foreground py-8 text-center border border-dashed border-border rounded-lg">
          Log practice attempts and tag mistakes to see your pattern.
        </div>
      ) : (
        <div className="space-y-2">
          {mistakes.map((m) => (
            <div
              key={m.code}
              className="flex items-center gap-3 border-t border-border bg-elevated/50 p-3"
            >
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">
                  <LaTeX>{m.title}</LaTeX>
                </div>
                <div className="text-xs text-muted-foreground">{m.category}</div>
              </div>
              <div className="font-mono text-sm font-semibold">{m.occurrences}×</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function InsightsPanel({ data }: { data: Awaited<ReturnType<typeof getPerformanceSnapshot>> }) {
  const untouched = data.unit_mastery.filter((u) => u.attempts === 0).length;
  const weakTopics = data.subtopics.filter((s) => s.unlocked && s.accuracy < 70).length;
  return (
    <div className="h-full border-t-2 border-border bg-card p-6">
      <div className="micro-label inline-flex items-center gap-1.5">
        <Sparkles className="h-3.5 w-3.5 text-primary" /> Insights
      </div>
      <ul className="mt-4 space-y-3 text-sm">
        <li>
          {untouched > 0 ? (
            <>
              <span className="font-semibold">{untouched} units</span> have no practice evidence
              yet.
            </>
          ) : (
            "Every unit has at least some practice evidence."
          )}
        </li>
        <li>
          {weakTopics > 0 ? (
            <>
              <span className="font-semibold">{weakTopics} measured topics</span> are below 70%
              accuracy. Use these weaknesses to choose what to practice next.
            </>
          ) : (
            "No measured topic is currently below the 70% weakness threshold."
          )}
        </li>
        <li>
          AP score estimates come from the timed MCQ diagnostic; Practice updates mastery,
          weaknesses, coverage, and mistake patterns.
        </li>
      </ul>
    </div>
  );
}

function TrackSwitcher({ track }: { track: "AB" | "BC" }) {
  const save = useServerFn(setExamTrack);
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: (next: "AB" | "BC") => save({ data: { track: next } }),
    onSuccess: () => {
      qc.invalidateQueries();
    },
  });
  const active = mutation.isPending ? (mutation.variables as "AB" | "BC") : track;
  return (
    <div
      className="inline-flex shrink-0 items-center rounded-md border border-border bg-card p-0.5"
      role="group"
      aria-label="Exam track"
    >
      {(["AB", "BC"] as const).map((t) => (
        <button
          key={t}
          onClick={() => t !== active && mutation.mutate(t)}
          aria-pressed={active === t}
          className={`rounded-sm px-3 py-1.5 text-[12px] font-semibold transition-colors ${active === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
