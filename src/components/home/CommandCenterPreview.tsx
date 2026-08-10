import { AlertTriangle, ArrowUpRight, Sparkles, Target, TrendingUp } from "lucide-react";
import type { SubjectConfig } from "@/lib/subjects";

/**
 * A realistic, static preview of the Score Command Center used as visual
 * evidence on the landing page. Purely presentational.
 */
export function CommandCenterPreview({
  subject,
  size = "lg",
}: {
  subject: SubjectConfig;
  size?: "lg" | "md";
}) {
  const { predicted, raw, total, target, engineLabel } = subject.score;
  const display = Math.min(5, predicted + 0.2).toFixed(1);
  const pct = Math.round((raw / total) * 100);
  const targetPct = Math.round((target / total) * 100);
  const units = subject.units ?? [];
  const strong = units.slice(0, 2);
  const weak = units.slice(-2).reverse();
  const rec = subject.recommendations[0];
  const dense = size === "lg";

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-x-6 -top-10 bottom-0 -z-10 rounded-[2rem] bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--color-primary)_18%,transparent),transparent_65%)] blur-2xl" />
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-card shadow-elevated">
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-elevated/60 px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">
            score command center
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] text-subtle">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> live
          </span>
        </div>

        <div className={`grid gap-3 p-4 sm:grid-cols-5 ${dense ? "sm:p-5" : ""}`}>
          {/* predicted score */}
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-elevated/40 p-4 sm:col-span-2">
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/25 blur-3xl" />
            <div className="relative flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
              <TrendingUp className="h-3 w-3" /> predicted score
            </div>
            <div className="relative mt-2 flex items-baseline gap-1.5">
              <span className="font-display text-5xl font-bold tabular-nums leading-none">{display}</span>
              <span className="text-sm text-muted-foreground">/ 5</span>
            </div>
            <div className="relative mt-4 flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full ${i <= predicted ? "bg-primary" : "bg-white/10"}`}
                />
              ))}
            </div>
            <div className="relative mt-3 text-[11px] text-muted-foreground">
              Progress toward a 5 · <span className="font-medium text-foreground tabular-nums">{pct}%</span>
            </div>
          </div>

          {/* 108-point engine */}
          <div className="rounded-xl border border-white/10 bg-elevated/40 p-4 sm:col-span-3">
            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
              <Target className="h-3 w-3" /> {engineLabel}
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold tabular-nums leading-none">{raw}</span>
              <span className="text-sm text-muted-foreground">/ {total}</span>
              <span className="ml-auto font-mono text-[10px] text-subtle">target {target}</span>
            </div>
            <div className="relative mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="absolute inset-y-0 left-0 rounded-full bg-primary" style={{ width: `${pct}%` }} />
              <div className="absolute inset-y-0 w-0.5 bg-foreground/60" style={{ left: `${targetPct}%` }} />
            </div>
            <div className="mt-3 grid grid-cols-6 items-end gap-1">
              {units.slice(0, 6).map((u, i) => (
                <div key={u.number} className="flex flex-col items-center gap-1">
                  <div className="flex h-10 w-full items-end rounded-sm bg-white/5">
                    <div
                      className={`w-full rounded-sm ${i % 3 === 2 ? "bg-primary/70" : "bg-foreground/25"}`}
                      style={{ height: `${35 + ((i * 23) % 60)}%` }}
                    />
                  </div>
                  <span className="font-mono text-[9px] text-subtle">U{u.number}</span>
                </div>
              ))}
            </div>
          </div>

          {/* strongest / weakest */}
          <div className="rounded-xl border border-white/10 bg-elevated/40 p-4 sm:col-span-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-400/90">strongest</div>
                <ul className="mt-2 space-y-1.5">
                  {strong.map((u) => (
                    <li key={u.number} className="flex items-center gap-2 text-[11px] text-muted-foreground">
                      <span className="h-1 w-1 rounded-full bg-emerald-400" />
                      <span className="truncate">{u.name}</span>
                      <span className="ml-auto font-mono tabular-nums text-emerald-400">
                        {84 + (u.number % 9)}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-rose-400/90">weakest</div>
                <ul className="mt-2 space-y-1.5">
                  {weak.map((u) => (
                    <li key={u.number} className="flex items-center gap-2 text-[11px] text-muted-foreground">
                      <AlertTriangle className="h-2.5 w-2.5 text-rose-400" />
                      <span className="truncate">{u.name}</span>
                      <span className="ml-auto font-mono tabular-nums text-rose-400">
                        {41 + (u.number % 12)}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* next recommendation */}
          <div className="rounded-xl border border-primary/25 bg-primary/[0.06] p-4 sm:col-span-2">
            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
              <Sparkles className="h-3 w-3" /> next recommendation
            </div>
            <div className="mt-2 font-display text-sm font-semibold leading-snug">{rec?.t}</div>
            <div className="mt-2 flex items-center gap-2 text-[11px] text-muted-foreground">
              <span className="rounded bg-emerald-500/12 px-1.5 py-0.5 font-mono font-semibold text-emerald-400">
                +{rec?.g} pts
              </span>
              highest projected gain
            </div>
            <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-primary">
              Start this set <ArrowUpRight className="h-3 w-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
