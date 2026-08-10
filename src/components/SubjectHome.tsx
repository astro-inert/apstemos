import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Compass,
  Crosshair,
  Gauge,
  GitBranch,
  ListChecks,
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
      <TheLoop subject={subject} />
      <ScoreCommandPreview subject={subject} />
      <TheSystem subject={subject} />
      <SupportingResources subject={subject} />
      <FinalCTA subject={subject} />
      <SiteFooter />
    </div>
  );
}

/* ── the loop, shared by hero + loop section ───────────────────────── */

const loopStages = [
  {
    key: "practice",
    label: "Practice",
    icon: PencilLine,
    detail: "Answer AP-style MCQs by unit, subtopic, and difficulty.",
    outcome: "reveals your weaknesses",
  },
  {
    key: "diagnose",
    label: "Diagnose",
    icon: ScanSearch,
    detail: "Every answer updates subtopic accuracy and unit mastery against the 70% line.",
    outcome: "separates strengths from weaknesses",
  },
  {
    key: "prioritize",
    label: "Prioritize",
    icon: Zap,
    detail: "The score model ranks the weaknesses with the highest expected point gain.",
    outcome: "finds your highest-ROI moves",
  },
  {
    key: "target",
    label: "Target",
    icon: Crosshair,
    detail: "Drill exactly those subtopics — mistakes explained, question patterns mapped.",
    outcome: "turns weaknesses into strengths",
  },
  {
    key: "score",
    label: "Score ↑",
    icon: TrendingUp,
    detail: "Your predicted AP score moves, and the next question set changes with it.",
    outcome: "moves you closer to a 5",
  },
] as const;

function useLoopCursor(count: number) {
  const [i, setI] = useState(0);
  const [held, setHeld] = useState<number | null>(null);
  useEffect(() => {
    if (held !== null) return;
    const id = setInterval(() => setI((v) => (v + 1) % count), 2200);
    return () => clearInterval(id);
  }, [count, held]);
  const active = held ?? i;
  return { active, setHeld };
}

function LoopVisual() {
  const { active, setHeld } = useLoopCursor(loopStages.length);
  const stage = loopStages[active]!;
  return (
    <div className="relative rounded-2xl border border-white/10 bg-card/70 backdrop-blur-sm p-4 sm:p-6 overflow-hidden text-left">
      <div className="pointer-events-none absolute inset-0 bg-grid-animated opacity-[0.12]" />
      <div className="relative flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
        adaptive score loop · running
      </div>

      <div className="relative mt-5">
        {/* connective rail */}
        <div className="pointer-events-none absolute left-0 right-0 top-6 hidden lg:block">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
          <svg className="absolute -top-px left-0 h-px w-full overflow-visible" viewBox="0 0 1000 1" preserveAspectRatio="none">
            <line
              x1="0"
              y1="0.5"
              x2="1000"
              y2="0.5"
              stroke="var(--color-primary)"
              strokeWidth="2"
              className="loop-trace"
            />
          </svg>
        </div>

        <ol className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {loopStages.map((s, i) => {
            const Icon = s.icon;
            const on = i === active;
            return (
              <li key={s.key}>
                <button
                  type="button"
                  onMouseEnter={() => setHeld(i)}
                  onMouseLeave={() => setHeld(null)}
                  onFocus={() => setHeld(i)}
                  onBlur={() => setHeld(null)}
                  onClick={() => setHeld(i)}
                  className={`w-full text-left rounded-xl border p-3 transition ${
                    on
                      ? "border-primary/50 bg-primary/[0.07]"
                      : "border-white/10 bg-background/40 hover:border-primary/30"
                  }`}
                >
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-lg ring-1 transition ${
                      on ? "bg-primary/15 text-primary ring-primary/40" : "bg-white/5 text-muted-foreground ring-white/10"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="mt-2.5 block font-display text-sm font-semibold">{s.label}</span>
                  <span className="mt-0.5 block font-mono text-[10px] text-subtle">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="relative mt-4 flex items-start gap-3 rounded-xl border border-white/10 bg-background/50 px-4 py-3">
        <RefreshCw className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          <span className="font-medium text-foreground">{stage.label}:</span> {stage.detail}{" "}
          <span className="text-primary/80">→ {stage.outcome}</span>
        </p>
      </div>
    </div>
  );
}

/* ── hero ─────────────────────────────────────────────────────────── */

function Hero({ subject }: { subject: SubjectConfig }) {
  const target = useMemo(() => new Date(subject.examDate), [subject.examDate]);
  const { d } = useCountdown(target);
  return (
    <section className="px-6 pt-14 pb-14 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium text-muted-foreground mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono uppercase tracking-[0.16em] text-[10px] text-primary">AP STEM OS</span>
            <span className="text-subtle">·</span>
            open source · forever free · {d} days to the {subject.examLabel}
          </div>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] gradient-text">
            An operating system<br />for earning a 5.
          </h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Practice. Diagnose your weaknesses. Fix your mistakes. Get targeted practice. Repeat — until your
            predicted {subject.label} score says you're ready.
          </p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
            AP STEM score optimization · Calculus AB/BC · Physics 1, 2, C · Statistics
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/auth"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold shadow-glow hover:opacity-95 transition"
            >
              Start optimizing my score
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#the-loop"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition"
            >
              Explore the system <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-12">
          <LoopVisual />
        </div>

        <div className="mt-6 grid grid-cols-3 max-w-2xl mx-auto rounded-xl overflow-hidden border border-white/10 bg-card/40">
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

/* ── the loop, in full ────────────────────────────────────────────── */

function TheLoop({ subject }: { subject: SubjectConfig }) {
  return (
    <section id="the-loop" className="px-6 py-16 border-t border-white/10 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="01 · the loop"
          title="Every question changes what you should do next"
          sub={`Nothing in ${subject.label} is a dead end. Every answer is written into one score model that decides your next move.`}
        />
        <div className="mt-10 grid gap-3 lg:grid-cols-5 sm:grid-cols-2">
          {loopStages.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.key}
                className="group relative rounded-2xl border border-white/10 bg-card/70 p-5 hover-lift transition hover:border-primary/40"
              >
                <div className="flex items-center gap-2">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/25">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-mono text-[10px] text-subtle">{String(i + 1).padStart(2, "0")}</span>
                  {i < loopStages.length - 1 ? (
                    <ChevronRight className="ml-auto h-4 w-4 text-primary/50 transition-transform group-hover:translate-x-0.5" />
                  ) : (
                    <RefreshCw className="ml-auto h-4 w-4 text-primary/50 transition-transform group-hover:rotate-90" />
                  )}
                </div>
                <div className="mt-4 font-display text-base font-semibold">{s.label}</div>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{s.detail}</p>
                <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-primary/80">→ {s.outcome}</div>
              </div>
            );
          })}
        </div>
        <div className="mt-6 text-center">
          <Link to="/practice" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
            Enter the loop <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── command center as proof ──────────────────────────────────────── */

function ScoreCommandPreview({ subject }: { subject: SubjectConfig }) {
  const { predicted, confidence, raw, total, target, engineLabel } = subject.score;
  const pct = Math.round((raw / total) * 100);
  const targetPct = Math.round((target / total) * 100);
  return (
    <section className="px-6 py-16 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="02 · the proof"
          title="Know exactly where you stand"
          sub="Your Score Command Center is the feedback mechanism: predicted score, mastery, and the ranked moves worth the most points."
        />
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
            <div className="mt-4 pt-4 border-t border-white/10 text-xs text-muted-foreground">
              Subtopics at or above 70% count as mastered. Everything below is a weakness the system can price.
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-card p-5 flex flex-col">
            <div className="text-xs uppercase tracking-wider text-subtle inline-flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-amber-400" /> Your highest-ROI opportunities</div>
            <ol className="mt-4 space-y-2.5 text-sm">
              {subject.recommendations.map((a, i) => (
                <li key={a.t} className="flex items-center gap-3">
                  <span className="font-mono text-xs text-muted-foreground w-5">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 truncate">{a.t}</span>
                  <span className="font-mono text-xs font-semibold text-emerald-500">+{a.g}</span>
                </li>
              ))}
            </ol>
            <Link
              to="/practice"
              className="group mt-5 inline-flex items-center justify-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-4 py-2.5 text-xs font-semibold text-primary transition hover:bg-primary/15"
            >
              Practice my highest-ROI weakness
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
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

/* ── the system ───────────────────────────────────────────────────── */

const systemParts = [
  {
    icon: PencilLine,
    title: "Practice",
    to: "/practice",
    body: "1700+ original AP-style questions organized by unit, subtopic, and difficulty.",
    outcome: "reveals your weaknesses",
    accent: "primary" as Accent,
  },
  {
    icon: Gauge,
    title: "Score Command Center",
    to: "/command-center",
    body: "Tracks subtopic strength, unit mastery, and overall performance after every answer.",
    outcome: "identifies highest-ROI opportunities",
    accent: "violet" as Accent,
  },
  {
    icon: ListChecks,
    title: "Answer Log",
    to: "/command-center",
    body: "Everything you've answered, in one place, with fast review of what you missed.",
    outcome: "makes every miss reviewable",
    accent: "sky" as Accent,
  },
  {
    icon: AlertTriangle,
    title: "Mistake Database",
    to: "/common-mistakes",
    body: "Name the error behind a wrong answer — example, how to avoid it, average point loss. Missing one? Describe it and the built-in AI adds it.",
    outcome: "prevents repeated point loss",
    accent: "rose" as Accent,
  },
  {
    icon: Compass,
    title: "Question Type Navigator",
    to: "/question-navigator",
    body: "Go from unit → subtopic to how to approach that exact question type on MCQs and FRQs.",
    outcome: "turns weaknesses into strengths",
    accent: "blue" as Accent,
  },
  {
    icon: Crosshair,
    title: "Targeted Practice",
    to: "/practice",
    body: "Sends you back into drills built around the weaknesses with the highest expected score impact.",
    outcome: "improves your score",
    accent: "primary" as Accent,
  },
] as const;

function TheSystem({ subject }: { subject: SubjectConfig }) {
  return (
    <section className="px-6 py-16 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="03 · the system"
          title="One workflow, not eight tools"
          sub={`Practice, the Answer Log, the Mistake Database, and the Navigator are stages of the same ${subject.label} workflow — each hands off to the next.`}
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {systemParts.map((p, i) => {
            const Icon = p.icon;
            const a = accentMap[p.accent];
            return (
              <Link
                key={p.title}
                to={p.to}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-card p-5 hover-lift transition ${a.hover}`}
              >
                <div className={`pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full blur-3xl opacity-50 bg-gradient-to-br ${a.glow} to-transparent`} />
                <div className="relative flex items-start justify-between">
                  <span className={`grid h-11 w-11 place-items-center rounded-xl ring-1 ${a.icon} ${a.ring}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-[10px] text-subtle">stage {String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="relative mt-4 font-display text-base font-semibold">{p.title}</div>
                <p className="relative mt-1.5 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                <div className="relative mt-4 pt-3 border-t border-white/10 text-[11px] text-primary/80">→ {p.outcome}</div>
              </Link>
            );
          })}
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
          <GitBranch className="h-3.5 w-3.5 text-primary/70" />
          Every stage writes back into the same score model — the loop closes and tightens on each pass.
        </div>
      </div>
    </section>
  );
}

/* ── supporting resources ─────────────────────────────────────────── */

const LOOP_TITLES = new Set(["Score Command Center", "Question Type Navigator"]);
const resourceCopy: Record<string, string> = {
  "FRQ Library": "26 years of past FRQs organized by topic and FRQ number.",
  "Topic Rundowns": "Concise, exam-focused summaries of the concepts each unit demands.",
  "Formula Sheet": "A 10-page LaTeX-rendered, printable last-minute formula and strategy guide.",
  "Exam Strategy": "Calculator techniques, timing, point-maximization, and question walkthroughs.",
};

function SupportingResources({ subject }: { subject: SubjectConfig }) {
  const resources = subject.tools.filter((t) => !LOOP_TITLES.has(t.title));
  return (
    <section className="px-6 py-16 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="04 · supporting resources"
          title="The inventory around the system"
          sub="Reference material you pull in when the loop points you somewhere — not a substitute for it."
        />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {resources.map((i) => {
            const Icon = i.icon;
            const a = accentMap[i.accent];
            const inner = (
              <>
                <div className="relative flex items-start justify-between">
                  <div className={`grid place-items-center h-9 w-9 rounded-lg ring-1 ${a.icon} ${a.ring}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition" />
                </div>
                <div className="relative font-display font-semibold text-sm mt-3">{i.title}</div>
                <div className="relative text-xs text-muted-foreground mt-1 leading-relaxed">
                  {resourceCopy[i.title] ?? i.description}
                </div>
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
    </section>
  );
}

/* ── final CTA ────────────────────────────────────────────────────── */

function FinalCTA({ subject }: { subject: SubjectConfig }) {
  const Icon = subject.icon ?? Sigma;
  return (
    <section className="px-6 py-20 border-t border-white/10">
      <div className="max-w-4xl mx-auto relative rounded-2xl border border-border overflow-hidden bg-gradient-to-br from-card via-card to-accent p-8 sm:p-12 text-center">
        <div className="absolute inset-0 bg-grid-animated opacity-20 pointer-events-none" />
        <div className="relative">
          <Icon className="h-8 w-8 mx-auto text-primary" />
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mt-4">
            Stop guessing what to study next.
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Start optimizing for your 5. Open source, forever free — every answer you give makes the system sharper.
          </p>
          <Link to="/auth" className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold shadow-glow hover:opacity-95 transition">
            Start practicing <ArrowRight className="h-4 w-4" />
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
