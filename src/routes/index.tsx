import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Calculator,
  ChevronRight,
  Compass,
  FileText,
  Gauge,
  LineChart as LineChartIcon,
  ListChecks,
  Map as MapIcon,
  Sigma,
  Sparkles,
  Target,
  Timer,
  TrendingUp,
  Zap,
} from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AP Calc Performance OS — Everything you need for a 5" },
      { name: "description", content: "Diagnose weaknesses, drill what matters, and watch your predicted AP score climb. The performance OS for AP Calculus BC and AB." },
      { property: "og:title", content: "AP Calc Performance OS — Everything you need for a 5" },
      { property: "og:description", content: "Predicted AP score, 108-point optimization engine, common-mistake tracking, and adaptive practice." },
    ],
  }),
  component: HomePage,
});

const EXAM_DATE = new Date("2026-05-12T08:00:00");

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return useMemo(() => {
    const diff = Math.max(0, target.getTime() - now);
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff / 3600000) % 24),
      m: Math.floor((diff / 60000) % 60),
      s: Math.floor((diff / 1000) % 60),
    };
  }, [now, target]);
}

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[1100px] rounded-full blur-3xl opacity-25 bg-[radial-gradient(ellipse_at_center,var(--color-primary),transparent_60%)]" />
      </div>
      <SiteNav />
      <Hero />
      <ScoreCommandPreview />
      <PointsEngine />
      <MistakesPreview />
      <SystemMap />
      <FinalCTA />
      <SiteFooter />
    </div>
  );
}

function Hero() {
  const { d } = useCountdown(EXAM_DATE);
  return (
    <section className="px-6 pt-16 pb-12 relative">
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium text-muted-foreground mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {d} days to the 2026 AP Calculus exam · AB + BC
        </div>
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] gradient-text">
          Everything you need<br />for a 5 in AP Calculus
        </h1>
        <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Master every unit, drill categorized FRQs and MCQs, eliminate score-killing mistakes, and watch your predicted AP score climb in real time.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/auth" className="group inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold shadow-glow hover:opacity-95 transition">
            Start optimizing my score
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link to="/common-mistakes" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-border bg-card/50 text-sm font-semibold hover:bg-elevated transition">
            Explore free resources
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-3 max-w-2xl mx-auto rounded-xl overflow-hidden border border-border bg-card/40">
          {[
            { v: "108", l: "exam points modeled" },
            { v: "10/10", l: "BC units covered" },
            { v: "22+", l: "tracked mistakes" },
          ].map((s, i) => (
            <div key={s.l} className={`px-4 py-4 text-center ${i < 2 ? "border-r border-border" : ""}`}>
              <div className="font-display text-xl sm:text-2xl font-bold tabular-nums">{s.v}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScoreCommandPreview() {
  return (
    <section className="px-6 pb-16">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="01 · the dashboard" title="The Score Command Center" sub="Predicted AP score, point gap, and ranked recommendations — updated every time you practice." />
        <div className="grid lg:grid-cols-3 gap-4 mt-8">
          {/* Predicted */}
          <div className="rounded-xl border border-border bg-card p-5 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full blur-3xl opacity-30 bg-primary" />
            <div className="relative">
              <div className="text-xs uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1.5"><TrendingUp className="h-3.5 w-3.5" /> Predicted AP score</div>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-display text-6xl font-bold tabular-nums">4</span>
                <span className="text-sm text-muted-foreground">/ 5</span>
                <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-medium">medium conf.</span>
              </div>
              <div className="mt-3 flex gap-1">
                {[1,2,3,4,5].map(i => <div key={i} className={`h-1.5 flex-1 rounded-full ${i<=4 ? "bg-primary" : "bg-elevated"}`} />)}
              </div>
              <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                Raw estimate: <span className="text-foreground font-medium tabular-nums">62 / 108</span>
              </div>
            </div>
          </div>
          {/* Gap */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1.5"><Target className="h-3.5 w-3.5" /> 108-point engine</div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-4xl font-bold tabular-nums">62</span>
              <span className="text-muted-foreground text-sm">/ 108</span>
              <span className="ml-auto text-xs text-muted-foreground">target 75</span>
            </div>
            <div className="mt-4 relative h-2.5 rounded-full bg-elevated overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-emerald-400 rounded-full" style={{ width: "57%" }} />
              <div className="absolute inset-y-0 w-0.5 bg-foreground/70" style={{ left: "69%" }} />
            </div>
            <div className="mt-3 text-xs text-amber-400 font-medium">13-point gap to a 5</div>
          </div>
          {/* Path */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-amber-400" /> Fastest path to your target</div>
            <ol className="mt-4 space-y-2.5 text-sm">
              {[
                { t: "Master Polar FRQs", g: 3 },
                { t: "Drill Series convergence", g: 3 },
                { t: "Fix unit-context mistakes", g: 2 },
                { t: "Review differential equations", g: 1 },
              ].map((a, i) => (
                <li key={a.t} className="flex items-center gap-3">
                  <span className="font-mono text-xs text-muted-foreground w-4">{i + 1}</span>
                  <span className="flex-1 truncate">{a.t}</span>
                  <span className="font-mono text-xs text-emerald-400">+{a.g}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Heatmap preview */}
        <div className="mt-4 rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1.5"><Activity className="h-3.5 w-3.5" /> Unit mastery heatmap</div>
              <h3 className="font-display font-semibold mt-1">All 10 BC units · scaled by exam weight</h3>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-[10px] text-muted-foreground">
              <span>0%</span>
              <div className="h-1.5 w-24 rounded-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400" />
              <span>100%</span>
            </div>
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {[78, 84, 71, 56, 49, 73, 62, 58, 41, 39].map((v, i) => {
              const cls = v >= 80 ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" : v >= 60 ? "bg-amber-500/15 text-amber-300 border-amber-500/30" : v >= 40 ? "bg-orange-500/15 text-orange-300 border-orange-500/30" : "bg-rose-500/15 text-rose-300 border-rose-500/30";
              return (
                <div key={i} className={`rounded-lg border p-2 ${cls}`}>
                  <div className="text-[9px] font-mono uppercase opacity-80">U{i + 1}</div>
                  <div className="font-display text-base font-bold tabular-nums mt-0.5">{v}%</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function PointsEngine() {
  return (
    <section className="px-6 py-16 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="02 · the engine" title="The 108-Point Optimization Engine" sub="Every point on the AP exam is mapped. We tell you which ones to chase first." />
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Section I · MCQ</div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold">45 questions</span>
              <span className="text-muted-foreground">= 54 raw pts</span>
            </div>
            <div className="mt-4 space-y-2">
              {[
                { l: "Part A · No calc · 30Q", w: "60min", pts: 36 },
                { l: "Part B · Calc · 15Q", w: "45min", pts: 18 },
              ].map(r => (
                <div key={r.l} className="flex items-center justify-between text-sm py-2 border-t border-border">
                  <span>{r.l}</span>
                  <span className="text-muted-foreground text-xs">{r.w} · {r.pts}p</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Section II · FRQ</div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold">6 questions</span>
              <span className="text-muted-foreground">= 54 raw pts</span>
            </div>
            <div className="mt-4 space-y-2">
              {[
                { l: "Part A · Calc · 2Q", w: "30min", pts: 18 },
                { l: "Part B · No calc · 4Q", w: "60min", pts: 36 },
              ].map(r => (
                <div key={r.l} className="flex items-center justify-between text-sm py-2 border-t border-border">
                  <span>{r.l}</span>
                  <span className="text-muted-foreground text-xs">{r.w} · {r.pts}p</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Link to="/108-points-breakdown" className="mt-6 inline-flex items-center gap-2 text-sm text-primary hover:underline">
          See the full 108-point map <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function MistakesPreview() {
  const items = [
    { t: "Calculator in degree mode", c: "Calculator", p: 4 },
    { t: "Missing units in context", c: "Context", p: 1 },
    { t: "Wrong polar area formula", c: "Polar", p: 2 },
    { t: "Sign error in derivative", c: "Algebra", p: 1.5 },
  ];
  return (
    <section className="px-6 py-16 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="03 · the database" title="The Common Mistakes Database" sub="22+ ways AP Calc students lose points — described, exampled, and fixed." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
          {items.map((m) => (
            <div key={m.t} className="rounded-xl border border-border bg-card p-4">
              <div className="grid place-items-center h-8 w-8 rounded-md bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div className="mt-3 font-display font-semibold text-sm leading-tight">{m.t}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">{m.c}</div>
              <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">avg. lost</span>
                <span className="font-mono text-sm font-bold text-rose-400">−{m.p}</span>
              </div>
            </div>
          ))}
        </div>
        <Link to="/common-mistakes" className="mt-6 inline-flex items-center gap-2 text-sm text-primary hover:underline">
          Browse the full mistake database <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function SystemMap() {
  const items = [
    { to: "/topic-rundown", icon: MapIcon, t: "Topic Rundowns", d: "All 10 units distilled — limits through series." },
    { to: "/frqs-by-type", icon: ListChecks, t: "FRQ Library", d: "Every FRQ since 2000, organized by topic and year." },
    { to: "/exam-strategy", icon: Gauge, t: "Exam Strategy", d: "Pacing, calculator tricks, time triage." },
    { to: "/self-study-guide", icon: Compass, t: "Self-Study Roadmap", d: "1-, 3-, 6-, and 9-month plans to exam day." },
    { to: "/latex-master-sheet", icon: Calculator, t: "Formula Sheet", d: "10-page LaTeX master sheet. Print it." },
    { to: "/108-points-breakdown", icon: Target, t: "108-Point Map", d: "Reverse-engineered: what a 5 actually requires." },
  ];
  return (
    <section className="px-6 py-16 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="04 · the platform" title="Every tool, one system" sub="From first principles to exam morning. Everything you need is here." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-8">
          {items.map((i) => {
            const Icon = i.icon;
            return (
              <Link key={i.t} to={i.to} className="group rounded-xl border border-border bg-card p-5 hover-lift">
                <div className="flex items-start justify-between">
                  <div className="grid place-items-center h-10 w-10 rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition" />
                </div>
                <div className="font-display font-semibold mt-4">{i.t}</div>
                <div className="text-sm text-muted-foreground mt-1">{i.d}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="px-6 py-20 border-t border-border">
      <div className="max-w-4xl mx-auto relative rounded-2xl border border-border overflow-hidden bg-gradient-to-br from-card via-card to-accent p-8 sm:p-12 text-center">
        <div className="absolute inset-0 bg-grid-animated opacity-20 pointer-events-none" />
        <div className="relative">
          <Sigma className="h-8 w-8 mx-auto text-primary" />
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mt-4">Stop studying. Start optimizing.</h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Free to start. No credit card. Your predicted AP score updates with every question you answer.
          </p>
          <Link to="/auth" className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold shadow-glow hover:opacity-95 transition">
            Create my account <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">{`// ${eyebrow}`}</div>
      <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">{title}</h2>
      <p className="text-muted-foreground mt-3">{sub}</p>
    </div>
  );
}
