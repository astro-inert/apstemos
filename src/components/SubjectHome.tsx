import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Compass,
  Gauge,
  PencilLine,
  RefreshCw,
  ScanSearch,
  Sigma,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import type { SubjectConfig, SubjectTool } from "@/lib/subjects";
import { persistCurrentSubject } from "@/lib/use-subject";


function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return useMemo(() => {
    const diff = Math.max(0, target.getTime() - now);
    return { d: Math.floor(diff / 86400000) };
  }, [now, target]);
}

type Accent = SubjectTool["accent"];
const accentMap: Record<Accent, { icon: string; ring: string; glow: string; hover: string }> = {
  primary: { icon: "bg-primary/10 text-primary", ring: "ring-primary/25", glow: "from-primary/25", hover: "hover:border-primary/50" },
  emerald: { icon: "bg-emerald-500/10 text-emerald-400", ring: "ring-emerald-500/20", glow: "from-emerald-500/20", hover: "hover:border-emerald-500/40" },
  amber: { icon: "bg-amber-500/10 text-amber-400", ring: "ring-amber-500/20", glow: "from-amber-500/20", hover: "hover:border-amber-500/40" },
  rose: { icon: "bg-red-500/10 text-red-400", ring: "ring-red-500/25", glow: "from-red-500/25", hover: "hover:border-red-500/50" },
  violet: { icon: "bg-indigo-500/10 text-indigo-400", ring: "ring-indigo-500/25", glow: "from-indigo-500/25", hover: "hover:border-indigo-500/50" },
  sky: { icon: "bg-cyan-500/10 text-cyan-400", ring: "ring-cyan-500/25", glow: "from-cyan-500/25", hover: "hover:border-cyan-500/50" },
  blue: { icon: "bg-cyan-500/10 text-cyan-400", ring: "ring-cyan-500/25", glow: "from-cyan-500/25", hover: "hover:border-cyan-500/50" },
};

export function SubjectHome({ subject }: { subject: SubjectConfig }) {
  useEffect(() => {
    persistCurrentSubject(subject.id);
  }, [subject.id]);
  return (
    <div
      data-subject={subject.id}
      className="min-h-screen bg-background text-foreground relative overflow-hidden subject-theme"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[1100px] rounded-full blur-3xl opacity-25 bg-[radial-gradient(ellipse_at_center,var(--color-primary),transparent_60%)]" />
      </div>
      <SiteNav subject={subject.id} />
      <Hero subject={subject} />
      <PositioningBand />
      <HowItWorks subject={subject} />
      <ScoreCommandPreview subject={subject} />
      <SystemMap subject={subject} />

      <FinalCTA subject={subject} />
      <SiteFooter />
    </div>
  );
}

function Hero({ subject }: { subject: SubjectConfig }) {
  const target = useMemo(() => new Date(subject.examDate), [subject.examDate]);
  const { d } = useCountdown(target);
  return (
    <section className="px-6 pt-16 pb-12 relative">
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium text-muted-foreground mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {d} days until the {subject.examLabel}
        </div>
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] gradient-text">
          {subject.heroTitle[0]}<br />{subject.heroTitle[1]}
        </h1>
        <p className="mt-6 font-display text-lg sm:text-2xl font-semibold tracking-tight text-foreground">
          Every answer makes the platform smarter.
        </p>
        <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">{subject.heroSub}</p>
        <p className="mt-3 text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Answer original AP-style questions and every response updates your predicted score, subtopic mastery, mistake
          profile, and next recommendation.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">

          <Link to="/auth" className="group inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold shadow-glow hover:opacity-95 transition">
            Start optimizing my score
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link to="/common-mistakes" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/10 bg-card/50 text-sm font-semibold hover:bg-elevated transition">
            Explore free resources
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-3 max-w-2xl mx-auto rounded-xl overflow-hidden border border-white/10 bg-card/40">
          {subject.stats.map((s, i) => (
            <div key={s.l} className={`px-4 py-4 text-center ${i < 2 ? "border-r border-border" : ""}`}>
              <div className="font-display text-xl sm:text-2xl font-bold tabular-nums">{s.v}</div>
              <div className="text-[10px] uppercase tracking-wider text-subtle mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const flowSteps = [
  { icon: PencilLine, title: "Practice", copy: "Answer original AP-style questions built from real exam patterns." },
  { icon: Gauge, title: "Score Command Center", copy: "Receive a live AP score prediction after every response." },
  { icon: ScanSearch, title: "Weak subtopics", copy: "Discover exactly which subtopics are holding your score down." },
  { icon: AlertTriangle, title: "Common mistakes", copy: "Identify the recurring AP mistakes costing you points." },
  { icon: Compass, title: "Question Type Navigator", copy: "Learn the exact College Board question patterns behind them." },
  { icon: RefreshCw, title: "Targeted practice", copy: "Return to practice that is rebuilt around your weakest points." },
] as const;

function HowItWorks({ subject }: { subject: SubjectConfig }) {
  return (
    <section className="px-6 pb-16 pt-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="00 · the loop"
          title="How it works"
          sub={`One closed loop, not six separate tools. Each step in ${subject.label} feeds the next.`}
        />
        <div className="relative mt-10">
          <div className="pointer-events-none absolute left-0 right-0 top-11 hidden lg:block">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          </div>
          <ol className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {flowSteps.map((s, i) => {
              const Icon = s.icon;
              return (
                <li
                  key={s.title}
                  style={{ animationDelay: `${i * 70}ms` }}
                  className="group relative rounded-2xl border border-white/10 bg-card/70 backdrop-blur-sm p-4 hover-lift transition hover:border-primary/40"
                >
                  <div className="flex items-center gap-2">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <span className="font-mono text-[10px] text-subtle">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {i < flowSteps.length - 1 && (
                      <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground/60 transition-transform group-hover:translate-x-0.5 lg:text-primary/50" />
                    )}
                    {i === flowSteps.length - 1 && (
                      <RefreshCw className="ml-auto h-4 w-4 text-primary/50 transition-transform group-hover:rotate-90" />
                    )}
                  </div>
                  <div className="mt-3 font-display text-sm font-semibold leading-tight">{s.title}</div>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{s.copy}</p>
                </li>
              );
            })}
          </ol>
          <div className="mt-6 flex flex-col items-center gap-2 text-center">
            <p className="text-xs text-muted-foreground">
              The loop never resets — each pass sharpens the prediction, the diagnosis, and the next question you see.
            </p>
            <Link to="/practice" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
              Start the loop <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


function ScoreCommandPreview({ subject }: { subject: SubjectConfig }) {
  const { predicted, confidence, raw, total, target, engineLabel } = subject.score;
  const pct = Math.round((raw / total) * 100);
  const targetPct = Math.round((target / total) * 100);
  return (
    <section className="px-6 pb-16">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="01 · the dashboard" title="The Score Command Center" sub="Predicted AP score, point gap, and ranked recommendations — updated every time you practice." />
        <div className="grid lg:grid-cols-3 gap-4 mt-8">
          <div className="rounded-xl border border-white/10 bg-card p-5 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full blur-3xl opacity-30 bg-primary" />
            <div className="relative">
              <div className="text-xs uppercase tracking-wider text-subtle inline-flex items-center gap-1.5"><TrendingUp className="h-3.5 w-3.5" /> Predicted AP score</div>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-display text-6xl font-bold tabular-nums">{predicted}</span>
                <span className="text-sm text-muted-foreground">/ 5</span>
                <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-medium">{confidence}</span>
              </div>
              <div className="mt-3 flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= predicted ? "bg-primary" : "bg-elevated"}`} />)}
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 text-xs text-muted-foreground">
                Raw estimate: <span className="text-foreground font-medium tabular-nums">{raw} / {total}</span>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-card p-5">
            <div className="text-xs uppercase tracking-wider text-subtle inline-flex items-center gap-1.5"><Target className="h-3.5 w-3.5" /> {engineLabel}</div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-4xl font-bold tabular-nums">{raw}</span>
              <span className="text-muted-foreground text-sm">/ {total}</span>
              <span className="ml-auto text-xs text-muted-foreground">target {target}</span>
            </div>
            <div className="mt-4 relative h-2.5 rounded-full bg-elevated overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-emerald-400 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
              <div className="absolute inset-y-0 w-0.5 bg-foreground/70" style={{ left: `${targetPct}%` }} />
            </div>
            <div className="mt-3 text-xs text-amber-400 font-medium">{target - raw}-point gap to a 5</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-card p-5">
            <div className="text-xs uppercase tracking-wider text-subtle inline-flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-amber-400" /> Fastest path to your target</div>
            <ol className="mt-4 space-y-2.5 text-sm">
              {subject.recommendations.map((a, i) => (
                <li key={a.t} className="flex items-center gap-3">
                  <span className="font-mono text-xs text-muted-foreground w-4">{i + 1}</span>
                  <span className="flex-1 truncate">{a.t}</span>
                  <span className="font-mono text-xs font-semibold text-emerald-500">+{a.g}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="mt-4">
          <Link to="/command-center" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
            Open my Command Center <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function SystemMap({ subject }: { subject: SubjectConfig }) {
  const byTitle = (t: string) => subject.tools.find((x) => x.title === t);
  const commandCenter = byTitle("Score Command Center");
  const navigator = byTitle("Question Type Navigator");

  const primary: { tool: SubjectTool; caption: string }[] = [
    {
      tool: {
        icon: PencilLine,
        title: "Practice",
        description: "Original AP-style questions generated from real exam patterns.",
        accent: "primary",
        to: "/practice",
      },
      caption: "Every answer is written into your performance model →",
    },
    {
      tool:
        commandCenter ?? {
          icon: Gauge,
          title: "Score Command Center",
          description: "Predicted score, point gap, and ranked next moves.",
          accent: "primary",
          to: "/command-center",
        },
      caption: "Your weakest subtopics surface the mistakes behind them →",
    },
    {
      tool: {
        icon: AlertTriangle,
        title: "Mistake Database",
        description: "The recurring errors costing you points, diagnosed and fixed.",
        accent: "rose",
        to: "/common-mistakes",
      },
      caption: "Each mistake maps to the question patterns that trigger it →",
    },
    {
      tool:
        navigator ?? {
          icon: Compass,
          title: "Question Type Navigator",
          description: "Unit → topic → the exact patterns College Board asks.",
          accent: "blue",
          to: "/question-navigator",
        },
      caption: "Sends you back into targeted practice ↻",
    },
  ];

  const stepAccents: Accent[] = ["primary", "violet", "rose", "blue"];
  const primaryTitles = new Set(primary.map((p) => p.tool.title));
  const secondary = subject.tools.filter((t) => !primaryTitles.has(t.title));

  return (
    <section className="px-6 py-16 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="02 · the system"
          title={subject.toolsHeading}
          sub="Not six independent tools — one adaptive loop with supporting reference layers underneath."
        />

        <div className="mt-10">
          <div className="flex items-center gap-3 justify-center mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">
              the adaptive loop
            </span>
            <span className="h-px w-16 bg-gradient-to-r from-primary/50 to-transparent" />
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute left-0 right-0 top-20 hidden lg:block">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            </div>
            <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {primary.map(({ tool, caption }, idx) => {
                const Icon = tool.icon;
                const a = accentMap[stepAccents[idx] ?? tool.accent];
                const inner = (
                  <>
                    <div className={`pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full blur-3xl opacity-60 bg-gradient-to-br ${a.glow} to-transparent`} />
                    <div className="relative flex items-start justify-between">
                      <div className={`grid place-items-center h-12 w-12 rounded-xl ring-1 shadow-[0_0_24px_-6px_currentColor] ${a.icon} ${a.ring}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="font-mono text-[10px] text-subtle">
                        step {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="relative font-display text-lg font-semibold mt-5">{tool.title}</div>
                    <div className="relative text-sm text-muted-foreground mt-1.5 leading-relaxed">{tool.description}</div>
                    <div className="relative mt-5 pt-4 border-t border-white/10 text-[11px] leading-relaxed text-primary/80">
                      {caption}
                    </div>
                  </>
                );
                const cls = `group relative overflow-hidden rounded-2xl border border-white/10 bg-card p-6 min-h-[15rem] hover-lift transition ${a.hover}`;
                return (
                  <li key={tool.title} className="relative">
                    {tool.to ? (
                      <Link to={tool.to} className={cls}>{inner}</Link>
                    ) : (
                      <div className={cls}>{inner}</div>
                    )}
                    {idx < primary.length - 1 ? (
                      <span className="pointer-events-none absolute top-1/2 -right-3.5 z-10 hidden lg:grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full border border-border bg-background text-primary">
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    ) : (
                      <span className="pointer-events-none absolute top-1/2 -right-3.5 z-10 hidden lg:grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full border border-border bg-background text-primary">
                        <RefreshCw className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
            <div className="mt-4 hidden lg:flex items-center gap-3 justify-center text-[11px] text-muted-foreground">
              <RefreshCw className="h-3.5 w-3.5 text-primary/70" />
              The Navigator feeds straight back into Practice — the loop closes and tightens on every pass.
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center mt-14 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">
              supporting resources
            </span>
            <span className="h-px w-16 bg-gradient-to-r from-border to-transparent" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {secondary.map((i) => {
              const Icon = i.icon;
              const a = accentMap[i.accent];
              const inner = (
                <>
                  <div className="relative flex items-start justify-between">
                    <div className={`grid place-items-center h-9 w-9 rounded-lg ring-1 ${a.icon} ${a.ring}`}>
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition" />
                  </div>
                  <div className="relative font-display font-semibold text-sm mt-3">{i.title}</div>
                  <div className="relative text-xs text-muted-foreground mt-1 leading-relaxed">{i.description}</div>
                </>
              );
              const cls = `group relative overflow-hidden rounded-xl border border-white/10 bg-card/60 p-4 hover-lift transition ${a.hover}`;
              if (i.href) {
                return <a key={i.title} href={i.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>;
              }
              if (i.to) {
                return <Link key={i.title} to={i.to} className={cls}>{inner}</Link>;
              }
              return <div key={i.title} className={cls}>{inner}</div>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


function FinalCTA({ subject }: { subject: SubjectConfig }) {
  const Icon = subject.icon ?? Sigma;
  return (
    <section className="px-6 py-20 border-t border-white/10">
      <div className="max-w-4xl mx-auto relative rounded-2xl border border-border overflow-hidden bg-gradient-to-br from-card via-card to-accent p-8 sm:p-12 text-center">
        <div className="absolute inset-0 bg-grid-animated opacity-20 pointer-events-none" />
        <div className="relative">
          <Icon className="h-8 w-8 mx-auto text-primary" />
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mt-4">{subject.ctaTitle}</h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">{subject.ctaSub}</p>
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
      <div className="text-xs font-mono uppercase tracking-[0.2em] text-subtle mb-3">{`// ${eyebrow}`}</div>
      <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">{title}</h2>
      <p className="text-muted-foreground mt-3">{sub}</p>
    </div>
  );
}
