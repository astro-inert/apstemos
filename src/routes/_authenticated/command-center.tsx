import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useSuspenseQuery, useQuery, queryOptions } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Suspense, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { AnswerLogPanel } from "@/components/command/AnswerLogPanel";
import { QuestionBankPanel } from "@/components/command/QuestionBankPanel";
import { SubtopicPanel } from "@/components/command/SubtopicPanel";
import { getPerformanceSnapshot, UNIT_MASTERY_THRESHOLD, type PerformanceSnapshot } from "@/lib/performance.functions";
import { getBankAccess } from "@/lib/question-bank.functions";
import { QN_UNITS } from "@/lib/question-navigator-data";
import { useCurrentSubject } from "@/lib/use-subject";
import { LaTeX } from "@/components/LaTeX";
import { SUBJECTS, type SubjectId } from "@/lib/subjects";

export const Route = createFileRoute("/_authenticated/command-center")({
  head: () => ({ meta: [{ title: "Score Command Center — AP Calc OS" }] }),
  component: CommandCenter,
  errorComponent: ErrorView,
  pendingComponent: () => (
    <AppShell><div className="p-6 text-sm text-muted-foreground">Loading your performance data…</div></AppShell>
  ),
});

function ErrorView({ error }: { error: Error }) {
  const router = useRouter();
  return (
    <AppShell>
      <div className="p-6 max-w-md">
        <h2 className="font-display text-xl font-bold">Couldn't load your data</h2>
        <p className="text-sm text-muted-foreground mt-2">{error.message}</p>
        <button onClick={() => router.invalidate()} className="mt-4 px-3 py-1.5 rounded bg-primary text-primary-foreground text-sm">Try again</button>
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
  if (subjectId !== "calc-bc") {
    return <OtherSubjectCommandCenter subjectId={subjectId} />;
  }
  return <CalcCommandCenter />;
}

function CalcCommandCenter() {
  const fn = useServerFn(getPerformanceSnapshot);
  const accessFn = useServerFn(getBankAccess);
  const [tab, setTab] = useState<"overview" | "log" | "bank">("overview");
  const { data } = useSuspenseQuery(
    queryOptions({ queryKey: snapshotKey, queryFn: () => fn() })
  );
  const access = useQuery({ queryKey: ["bank-access"], queryFn: () => accessFn() });
  const isAdmin = access.data?.is_admin === true;

  const targetRaw =
    data.profile?.target_score === 5 ? 75 :
    data.profile?.target_score === 4 ? 60 :
    data.profile?.target_score === 3 ? 45 : 30;
  const gap = Math.max(0, targetRaw - data.predicted_raw_score);
  const daysToExam = Math.max(0, Math.ceil(
    (new Date(data.profile?.exam_date ?? "2026-05-12").getTime() - Date.now()) / 86400000
  ));

  const tabs = [
    { id: "overview" as const, label: "Overview" },
    { id: "log" as const, label: "Answer Log" },
    ...(isAdmin ? [{ id: "bank" as const, label: "Question Bank" }] : []),
  ];

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-1">// score command center</div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold tracking-tight">
            {data.profile?.display_name ? `Welcome back, ${data.profile.display_name}.` : "Welcome back."}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {data.attempts_count === 0
              ? "No attempts yet — your dashboard updates as you practice."
              : `${data.attempts_count} questions logged · ${Math.round(data.accuracy * 100)}% overall accuracy`}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Link to="/practice" className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary text-primary-foreground font-medium">
            Practice <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full glass">
            <Calendar className="h-3.5 w-3.5" /> {daysToExam} days to exam
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-3 py-2 text-sm -mb-px border-b-2 transition ${
              tab === t.id
                ? "border-primary text-foreground font-medium"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="space-y-6">
          {/* Top row: Predicted score + 108-pt + Path */}
          <div className="grid lg:grid-cols-3 gap-4">
            <PredictedScoreCard data={data} />
            <PointsCard current={data.predicted_raw_score} target={targetRaw} gap={gap} />
            <FastestPathCard actions={data.recommended_actions} />
          </div>

          {/* Subtopic diagnostics (3-question threshold) */}
          <SubtopicPanel subtopics={data.subtopics} />

          {/* Performance Diagnostics — strengths/weaknesses/topic-level */}
          <PerformanceDiagnostics units={data.unit_mastery} />

          {/* Bottom row: Top mistakes + Confidence/insights */}
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <TopMistakesPanel mistakes={data.top_mistakes} />
            </div>
            <InsightsPanel data={data} />
          </div>
        </div>
      )}

      {tab === "log" && <AnswerLogPanel />}
      {tab === "bank" && isAdmin && <QuestionBankPanel />}
    </div>
  );
}

function OtherSubjectCommandCenter({ subjectId }: { subjectId: SubjectId }) {
  const subject = SUBJECTS[subjectId];
  const daysToExam = Math.max(0, Math.ceil((new Date(subject.examDate).getTime() - Date.now()) / 86400000));
  const { raw, total, target, engineLabel } = subject.score;
  const gap = Math.max(0, target - raw);
  const pct = Math.min(100, (raw / total) * 100);
  const targetPct = Math.min(100, (target / total) * 100);

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-1">// score command center</div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold tracking-tight">{subject.navLabel} Command Center</h1>
          <p className="text-sm text-muted-foreground mt-1">
            The {subject.navLabel} question bank is coming soon — this dashboard will populate with your real attempts once it launches.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full glass">
            <Calendar className="h-3.5 w-3.5" /> {daysToExam} days to exam
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-dashed border-border bg-card/50 p-4 text-sm text-muted-foreground flex items-start gap-2">
        <Sparkles className="h-4 w-4 text-pink-400 shrink-0 mt-0.5" />
        <span>
          No attempt data yet for {subject.navLabel}. The unit-mastery table below shows the real exam units so you can see what's ahead —
          practice questions for this subject aren't live yet, so nothing here is estimated or invented.
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1.5"><Target className="h-3.5 w-3.5" /> {engineLabel}</div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-4xl font-bold tabular-nums">{raw}</span>
            <span className="text-muted-foreground text-sm">/ {total}</span>
            <span className="ml-auto text-xs text-muted-foreground">target {target}</span>
          </div>
          <div className="mt-4 relative h-2.5 rounded-full bg-elevated overflow-hidden">
            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-emerald-400 rounded-full" style={{ width: `${pct}%` }} />
            <div className="absolute inset-y-0 w-0.5 bg-foreground/70" style={{ left: `${targetPct}%` }} />
          </div>
          <div className="mt-3 text-xs text-muted-foreground">Illustrative target based on the {subject.navLabel} exam structure — {gap}-point gap to target.</div>
        </div>
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-amber-400" /> Recommendations</div>
          <ol className="mt-4 space-y-2.5 text-sm">
            {subject.recommendations.map((a, i) => (
              <li key={a.t} className="flex items-center gap-3">
                <span className="font-mono text-xs text-muted-foreground w-4">{i + 1}</span>
                <span className="flex-1 truncate">{a.t}</span>
                <span className="font-mono text-xs text-emerald-400">+{a.g}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Unit mastery — untouched state */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5" /> Unit performance
            </div>
            <h3 className="font-display font-semibold mt-1">All {subject.units.length} units · no data yet</h3>
          </div>
          <div className="text-[10px] text-muted-foreground hidden sm:block">Question bank for {subject.navLabel} is coming soon.</div>
        </div>
        <div className="divide-y divide-border">
          {subject.units.map((u) => (
            <div key={u.number} className="grid grid-cols-12 items-center gap-3 px-5 py-3 text-sm">
              <div className="col-span-7 sm:col-span-6 min-w-0">
                <div className="font-medium truncate">Unit {u.number} · {u.name}</div>
                <div className="text-[10px] text-muted-foreground">{u.points}p · {u.weightPct}% of exam</div>
              </div>
              <div className="col-span-3 sm:col-span-4">
                <div className="h-2 rounded-full bg-elevated overflow-hidden">
                  <div className="h-full bg-muted" style={{ width: "0%" }} />
                </div>
              </div>
              <div className="col-span-2 text-right">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Untouched</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Common mistakes for this subject */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1.5"><AlertTriangle className="h-3.5 w-3.5 text-rose-400" /> Common mistakes to watch for</div>
            <h3 className="font-display font-semibold mt-1">{subject.mistakesHeading}</h3>
          </div>
          <Link to="/common-mistakes" className="text-xs text-primary hover:underline inline-flex items-center gap-1">All mistakes <ArrowRight className="h-3 w-3" /></Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-2">
          {subject.mistakes.map((m) => (
            <div key={m.title} className="flex items-center gap-3 p-3 rounded-lg bg-elevated/50 border border-border">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{m.title}</div>
                <div className="text-xs text-muted-foreground">{m.category}</div>
              </div>
              <div className="text-rose-400 font-mono text-sm font-semibold shrink-0">−{m.points}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PredictedScoreCard({ data }: { data: ReturnType<typeof useFakeData> }) {
  const conf = data.confidence;
  const dots = [1, 2, 3, 4, 5];
  return (
    <div className="rounded-xl border border-border bg-card p-5 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full blur-3xl opacity-30 bg-primary" />
      <div className="relative">
        <div className="flex items-center justify-between text-xs">
          <span className="uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1.5"><TrendingUp className="h-3.5 w-3.5" /> Predicted AP score</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${conf === "high" ? "bg-emerald-500/10 text-emerald-400" : conf === "medium" ? "bg-amber-500/10 text-amber-400" : "bg-muted text-muted-foreground"}`}>
            {conf} confidence
          </span>
        </div>
        <div className="mt-4 flex items-baseline gap-3">
          <span className="font-display text-6xl font-bold tracking-tight tabular-nums">{data.predicted_ap_score}</span>
          <span className="text-sm text-muted-foreground">/ 5</span>
        </div>
        <div className="mt-3 flex items-center gap-1.5">
          {dots.map((d) => (
            <div key={d} className={`h-1.5 flex-1 rounded-full ${d <= data.predicted_ap_score ? "bg-primary" : "bg-elevated"}`} />
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
          Based on {data.attempts_count} attempts · raw score est. <span className="text-foreground font-medium tabular-nums">{data.predicted_raw_score} / 108</span>
        </div>
      </div>
    </div>
  );
}

// helper type
function useFakeData() { return null as unknown as Awaited<ReturnType<typeof getPerformanceSnapshot>>; }

function PointsCard({ current, target, gap }: { current: number; target: number; gap: number }) {
  const pct = Math.min(100, (current / 108) * 100);
  const targetPct = Math.min(100, (target / 108) * 100);
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between text-xs">
        <span className="uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1.5"><Target className="h-3.5 w-3.5" /> 108-point engine</span>
        <Link to="/108-points-breakdown" className="text-primary inline-flex items-center gap-1 hover:underline">View map <ArrowUpRight className="h-3 w-3" /></Link>
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="font-display text-4xl font-bold tabular-nums">{current}</span>
        <span className="text-muted-foreground text-sm">/ 108</span>
        <span className="ml-auto text-xs text-muted-foreground">target {target}</span>
      </div>
      <div className="mt-4 relative h-2.5 rounded-full bg-elevated overflow-hidden">
        <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-emerald-400 rounded-full" style={{ width: `${pct}%` }} />
        <div className="absolute inset-y-0 w-0.5 bg-foreground/70" style={{ left: `${targetPct}%` }} />
      </div>
      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Current</span>
        {gap > 0 ? (
          <span className="text-amber-400 font-medium">{gap}-point gap to {target}</span>
        ) : (
          <span className="text-emerald-400 font-medium">On target ✓</span>
        )}
      </div>
    </div>
  );
}

function FastestPathCard({ actions }: { actions: { title: string; detail: string; estimated_gain: number; target: string }[] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between text-xs">
        <span className="uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-amber-400" /> Fastest path</span>
        <span className="text-muted-foreground">Ranked by ROI</span>
      </div>
      <ol className="mt-4 space-y-2.5">
        {actions.slice(0, 4).map((a, i) => (
          <li key={a.target} className="flex items-start gap-3">
            <span className="font-mono text-xs text-muted-foreground w-4 mt-0.5">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium leading-tight truncate">{a.title}</div>
              <div className="text-xs text-muted-foreground truncate">{a.detail}</div>
            </div>
            <span className="text-xs font-mono text-emerald-400 shrink-0">+{a.estimated_gain}</span>
          </li>
        ))}
        {actions.length === 0 && (
          <li className="text-xs text-muted-foreground">All units mastered. Start mock exams.</li>
        )}
      </ol>
    </div>
  );
}

type UnitRow = PerformanceSnapshot["unit_mastery"][number];

function PerformanceDiagnostics({ units }: { units: UnitRow[] }) {
  const touched = units.filter((u) => u.mastery >= 0);
  const strengths = [...touched].filter((u) => u.mastery >= 75).sort((a, b) => b.mastery - a.mastery).slice(0, 4);
  const weaknesses = [...touched].filter((u) => u.mastery < 60).sort((a, b) => a.mastery - b.mastery).slice(0, 4);
  const untouched = units.filter((u) => u.mastery < 0);

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      {/* Strengths */}
      <DiagnosticColumn
        title="Strengths"
        sub="Units at 75% mastery or above."
        accent="emerald"
        empty="Log more attempts to surface what you're strongest at."
        rows={strengths.map((u) => ({ id: u.unit_id, label: `Unit ${u.number} · ${u.name}`, value: `${u.mastery}%`, meta: `${u.attempts} attempts`, pct: u.mastery }))}
      />
      {/* Needs improvement */}
      <DiagnosticColumn
        title="Needs improvement"
        sub="Below 60% mastery — biggest score leaks."
        accent="rose"
        empty="No weak units yet. Keep drilling to push everything above 80%."
        rows={weaknesses.map((u) => ({ id: u.unit_id, label: `Unit ${u.number} · ${u.name}`, value: `${u.mastery}%`, meta: `${u.attempts} attempts · worth ${u.ap_points}p`, pct: u.mastery }))}
      />
      {/* Untouched / projected lift */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="text-xs uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-pink-400" /> Untouched units
        </div>
        <h3 className="font-display font-semibold mt-1">Highest ROI to start</h3>
        {untouched.length === 0 ? (
          <div className="mt-4 text-sm text-muted-foreground">Every unit has data — focus on the weaknesses column.</div>
        ) : (
          <ul className="mt-4 space-y-2">
            {untouched.slice(0, 5).map((u) => (
              <li key={u.unit_id} className="flex items-center justify-between gap-3 p-2 rounded-md bg-elevated/40 border border-dashed border-border">
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">Unit {u.number} · {u.name}</div>
                  <div className="text-[10px] text-muted-foreground">{u.ap_weight_pct}% of exam</div>
                </div>
                <span className="font-mono text-xs text-pink-300 shrink-0">+{u.ap_points}p</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Full unit performance table — topic-level placeholder */}
      <div className="lg:col-span-3 rounded-xl border border-border bg-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5" /> Unit performance
            </div>
            <h3 className="font-display font-semibold mt-1">All 10 units · ranked by mastery</h3>
          </div>
          <div className="text-[10px] text-muted-foreground hidden sm:block">Topic-level breakdown unlocks after your first 10 attempts per unit.</div>
        </div>
        <div className="divide-y divide-border">
          {[...units].sort((a, b) => (b.mastery < 0 ? -1 : a.mastery < 0 ? 1 : b.mastery - a.mastery)).map((u) => {
            // Mastery % only shows with 10+ questions AND every subtopic touched.
            const m = u.mastery_unlocked ? u.mastery : -1;
            const bar = m < 0 ? 0 : m;
            const color =
              m < 0 ? "bg-muted" :
              m >= 80 ? "bg-emerald-500" :
              m >= 60 ? "bg-amber-500" :
              m >= 40 ? "bg-orange-500" : "bg-rose-500";
            const label =
              u.attempts === 0 ? "Untouched" :
              m < 0 ? "Building" :
              m >= 80 ? "Strong" :
              m >= 60 ? "Steady" :
              m >= 40 ? "Shaky" : "Weak";
            return (
              <div key={u.unit_id} className="grid grid-cols-12 items-center gap-3 px-5 py-3 text-sm">
                <div className="col-span-5 sm:col-span-4 min-w-0">
                  <div className="font-medium truncate">Unit {u.number} · {u.name}</div>
                  <div className="text-[10px] text-muted-foreground">
                    {u.ap_points}p · {u.ap_weight_pct}% of exam
                    {!u.mastery_unlocked && u.attempts > 0 && u.subtopics_total > 0 ? (
                      <> · {Math.min(u.attempts, UNIT_MASTERY_THRESHOLD)}/{UNIT_MASTERY_THRESHOLD} questions · {u.subtopics_covered}/{u.subtopics_total} subtopics</>
                    ) : null}
                  </div>
                </div>
                <div className="col-span-3 sm:col-span-4">
                  <div className="h-2 rounded-full bg-elevated overflow-hidden">
                    <div className={`h-full ${color} transition-all`} style={{ width: `${bar}%` }} />
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-2 text-right tabular-nums font-mono text-xs">
                  {m < 0 ? "—" : `${m}%`}
                </div>
                <div className="col-span-1 sm:col-span-1 text-right">
                  <span className={`text-[10px] uppercase tracking-wider ${
                    m < 0 ? "text-muted-foreground" :
                    m >= 80 ? "text-emerald-400" :
                    m >= 60 ? "text-amber-400" :
                    m >= 40 ? "text-orange-400" : "text-rose-400"
                  }`}>{label}</span>
                </div>

                <div className="col-span-1 text-right">
                  {QN_UNITS.find((qu) => qu.number === u.number) ? (
                    <Link
                      to="/practice"
                      search={{ unit: QN_UNITS.find((qu) => qu.number === u.number)!.slug }}
                      title={`Practice only Unit ${u.number} questions`}
                      aria-label={`Practice only Unit ${u.number} questions`}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-elevated hover:text-foreground"
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

function DiagnosticColumn({
  title, sub, accent, rows, empty,
}: {
  title: string; sub: string; accent: "emerald" | "rose";
  rows: { id: string; label: string; value: string; meta: string; pct: number }[];
  empty: string;
}) {
  const tone = accent === "emerald"
    ? { dot: "bg-emerald-400", value: "text-emerald-300", bar: "bg-emerald-500" }
    : { dot: "bg-rose-400",    value: "text-rose-300",    bar: "bg-rose-500" };
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
        <span className={`h-1.5 w-1.5 rounded-full ${tone.dot}`} /> {title}
      </div>
      <div className="text-xs text-muted-foreground mt-1">{sub}</div>
      {rows.length === 0 ? (
        <div className="mt-4 text-sm text-muted-foreground">{empty}</div>
      ) : (
        <ul className="mt-4 space-y-3">
          {rows.map((r) => (
            <li key={r.id}>
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium truncate">{r.label}</span>
                <span className={`text-xs font-mono tabular-nums ${tone.value}`}>{r.value}</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-elevated overflow-hidden">
                <div className={`h-full ${tone.bar}`} style={{ width: `${Math.max(4, r.pct)}%` }} />
              </div>
              <div className="text-[10px] text-muted-foreground mt-1">{r.meta}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function TopMistakesPanel({ mistakes }: { mistakes: Array<{ code: string; title: string; category: string; occurrences: number; est_point_loss: number }> }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1.5"><AlertTriangle className="h-3.5 w-3.5 text-rose-400" /> Where you're losing points</div>
          <h3 className="font-display font-semibold mt-1">Your top mistakes</h3>
        </div>
        <Link to="/common-mistakes" className="text-xs text-primary hover:underline inline-flex items-center gap-1">All mistakes <ArrowRight className="h-3 w-3" /></Link>
      </div>
      {mistakes.length === 0 ? (
        <div className="text-sm text-muted-foreground py-8 text-center border border-dashed border-border rounded-lg">
          Log practice attempts and tag mistakes to see your pattern.
        </div>
      ) : (
        <div className="space-y-2">
          {mistakes.map((m) => (
            <div key={m.code} className="flex items-center gap-3 p-3 rounded-lg bg-elevated/50 border border-border">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate"><LaTeX>{m.title}</LaTeX></div>

                <div className="text-xs text-muted-foreground">{m.category} · {m.occurrences}× occurrences</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-rose-400 font-mono text-sm font-semibold">−{m.est_point_loss.toFixed(1)}</div>
                <div className="text-[10px] text-muted-foreground">est. pts lost</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function InsightsPanel({ data }: { data: Awaited<ReturnType<typeof getPerformanceSnapshot>> }) {
  const untouched = data.unit_mastery.filter((u) => u.mastery < 0).length;
  const weak = data.unit_mastery.filter((u) => u.mastery >= 0 && u.mastery < 60).length;
  return (
    <div className="rounded-xl border border-border bg-card p-5 h-full">
      <div className="text-xs uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5 text-pink-400" /> Insights</div>
      <ul className="mt-4 space-y-3 text-sm">
        <li className="flex items-start gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
          <span>{untouched > 0 ? <><span className="font-semibold">{untouched} units</span> have no logged attempts. Start there — biggest score lift per minute.</> : "Every unit has data. Now focus on weakest performers."}</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
          <span>{weak > 0 ? <><span className="font-semibold">{weak} weak units</span> below 60% mastery. Focus drilling here.</> : "No weak units — push toward 80%+ across the board."}</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
          <span>Predictions stabilize after ~50 attempts. You have {data.attempts_count}.</span>
        </li>
      </ul>
    </div>
  );
}
