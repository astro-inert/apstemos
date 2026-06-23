import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Suspense } from "react";
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
import { getPerformanceSnapshot } from "@/lib/performance.functions";

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
  const fn = useServerFn(getPerformanceSnapshot);
  const { data } = useSuspenseQuery(
    queryOptions({ queryKey: snapshotKey, queryFn: () => fn() })
  );

  const targetRaw =
    data.profile?.target_score === 5 ? 75 :
    data.profile?.target_score === 4 ? 60 :
    data.profile?.target_score === 3 ? 45 : 30;
  const gap = Math.max(0, targetRaw - data.predicted_raw_score);
  const daysToExam = Math.max(0, Math.ceil(
    (new Date(data.profile?.exam_date ?? "2026-05-12").getTime() - Date.now()) / 86400000
  ));

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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full glass">
            <Calendar className="h-3.5 w-3.5" /> {daysToExam} days to exam
          </span>
        </div>
      </div>

      {/* Top row: Predicted score + 108-pt + Path */}
      <div className="grid lg:grid-cols-3 gap-4">
        <PredictedScoreCard data={data} />
        <PointsCard current={data.predicted_raw_score} target={targetRaw} gap={gap} />
        <FastestPathCard actions={data.recommended_actions} />
      </div>

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

function UnitMasteryHeatmap({ units }: { units: Array<{ unit_id: string; number: number; name: string; ap_points: number; ap_weight_pct: number; mastery: number; attempts: number }> }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1.5"><Activity className="h-3.5 w-3.5" /> Unit mastery</div>
          <h3 className="font-display font-semibold mt-1">10 units · scaled by AP weight</h3>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[10px] text-muted-foreground">
          <span>0%</span>
          <div className="h-1.5 w-24 rounded-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400" />
          <span>100%</span>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {units.map((u) => {
          const colorClass =
            u.mastery < 0 ? "bg-elevated text-muted-foreground border-dashed" :
            u.mastery >= 80 ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" :
            u.mastery >= 60 ? "bg-amber-500/15 text-amber-300 border-amber-500/30" :
            u.mastery >= 40 ? "bg-orange-500/15 text-orange-300 border-orange-500/30" :
            "bg-rose-500/15 text-rose-300 border-rose-500/30";
          return (
            <div key={u.unit_id} className={`rounded-lg border p-3 ${colorClass}`}>
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider opacity-80">
                <span>U{u.number}</span>
                <span>{u.ap_points}p</span>
              </div>
              <div className="font-display text-lg font-bold tabular-nums mt-1">
                {u.mastery < 0 ? "—" : `${u.mastery}%`}
              </div>
              <div className="text-[10px] leading-tight mt-0.5 line-clamp-2 opacity-80">{u.name}</div>
            </div>
          );
        })}
      </div>
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
                <div className="text-sm font-medium truncate">{m.title}</div>
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
      <div className="text-xs uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5 text-violet-400" /> Insights</div>
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
