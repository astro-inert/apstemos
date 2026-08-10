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
  Sparkles,
} from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { CommandCenterPreview } from "@/components/home/CommandCenterPreview";
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
const accentMap: Record<Accent, { icon: string; ring: string; hover: string }> = {
  primary: { icon: "bg-primary/10 text-primary", ring: "ring-primary/25", hover: "hover:border-primary/50" },
  emerald: { icon: "bg-emerald-500/10 text-emerald-400", ring: "ring-emerald-500/20", hover: "hover:border-emerald-500/40" },
  amber: { icon: "bg-amber-500/10 text-amber-400", ring: "ring-amber-500/20", hover: "hover:border-amber-500/40" },
  rose: { icon: "bg-red-500/10 text-red-400", ring: "ring-red-500/25", hover: "hover:border-red-500/50" },
  violet: { icon: "bg-indigo-500/10 text-indigo-400", ring: "ring-indigo-500/25", hover: "hover:border-indigo-500/50" },
  sky: { icon: "bg-cyan-500/10 text-cyan-400", ring: "ring-cyan-500/25", hover: "hover:border-cyan-500/50" },
  blue: { icon: "bg-cyan-500/10 text-cyan-400", ring: "ring-cyan-500/25", hover: "hover:border-cyan-500/50" },
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
        <div className="absolute -top-48 right-0 h-[620px] w-[900px] rounded-full blur-3xl opacity-20 bg-[radial-gradient(ellipse_at_center,var(--color-primary),transparent_60%)]" />
      </div>
      <SiteNav subject={subject.id} />
      <Hero subject={subject} />
      <ProofStrip subject={subject} />
      <TheLoop />
      <TheSystem subject={subject} />
      <FinalCTA subject={subject} />
      <SiteFooter />
    </div>
  );
}

/* ─────────────────────────────── HERO ─────────────────────────────── */

function Hero({ subject }: { subject: SubjectConfig }) {
  const target = useMemo(() => new Date(subject.examDate), [subject.examDate]);
  const { d } = useCountdown(target);
  return (
    <section className="px-6 pt-14 sm:pt-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
        <div className="animate-fade-in">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">{subject.navLabel}</div>
          <h1 className="mt-5 font-display text-[2.75rem] font-bold leading-[1.02] tracking-tight sm:text-6xl">
            Everything you need
            <br />
            <span className="text-primary">for a 5.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Practice AP-style questions. Find exactly where you're losing points. Get a smarter next question.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/auth"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95"
            >
              Start optimizing my score
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/topic-rundown"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-card/50 px-5 py-3 text-sm font-semibold transition hover:bg-elevated"
            >
              Explore free resources
            </Link>
          </div>
          <div className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] text-subtle">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            {d} days until the {subject.examLabel}
          </div>
        </div>

        <div className="relative lg:translate-y-6">
          <CommandCenterPreview subject={subject} />
        </div>
      </div>
    </section>
  );
}

function ProofStrip({ subject }: { subject: SubjectConfig }) {
  const items = [
    `${subject.score.total} points modeled`,
    `${subject.units?.length ?? 10}/${subject.units?.length ?? 10} ${subject.label.replace("AP ", "")} units`,
    "1,700+ AP-style questions",
    "Adaptive mistake tracking",
  ];
  return (
    <section className="px-6 pt-14 sm:pt-20">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-3 border-y border-white/10 py-4">
        {items.map((i) => (
          <div key={i} className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">
            <span className="h-1 w-1 rounded-full bg-primary/70" />
            {i}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────────── THE LOOP ───────────────────────────── */

const loopStages = [
  { n: "01", label: "Practice", copy: "Answer an AP-style question.", icon: PencilLine },
  {
    n: "02",
    label: "Diagnose",
    copy: "Your response updates your score, mastery profile, and mistake patterns.",
    icon: ScanSearch,
  },
  { n: "03", label: "Target", copy: "The system identifies what will improve your score most.", icon: Target },
  { n: "04", label: "Improve", copy: "Your next questions are selected around your weaknesses.", icon: RefreshCw },
] as const;

function TheLoop() {
  return (
    <section className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-subtle">// the loop</div>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-[2.6rem] sm:leading-[1.1]">
            Every answer changes what comes next.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            AP STEM OS continuously uses your responses to identify weaknesses, update your predicted score, and choose
            what you should practice next.
          </p>
        </div>

        <div className="relative mt-16">
          {/* continuous loop path */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
            preserveAspectRatio="none"
            viewBox="0 0 1000 520"
          >
            <rect
              x="60"
              y="40"
              width="880"
              height="440"
              rx="180"
              fill="none"
              stroke="color-mix(in oklab, var(--color-primary) 22%, transparent)"
              strokeWidth="1"
            />
            <circle r="4" fill="var(--color-primary)" opacity="0.9">
              <animateMotion
                dur="16s"
                repeatCount="indefinite"
                path="M240,40 H760 A180,180 0 0 1 940,220 V300 A180,180 0 0 1 760,480 H240 A180,180 0 0 1 60,300 V220 A180,180 0 0 1 240,40 Z"
              />
            </circle>
          </svg>

          <ol className="relative grid gap-4 sm:grid-cols-2">
            {loopStages.map((s, i) => {
              const Icon = s.icon;
              const offset = i === 0 || i === 3 ? "lg:ml-10" : "lg:mr-10";
              return (
                <li
                  key={s.n}
                  className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-card/80 p-7 backdrop-blur-sm transition hover:border-primary/40 sm:p-8 ${offset}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm text-primary">{s.n}</span>
                    <span className="h-px flex-1 bg-white/10" />
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold tracking-tight sm:text-2xl">{s.label}</h3>
                  <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-muted-foreground">{s.copy}</p>
                </li>
              );
            })}
          </ol>
        </div>

        <p className="mt-10 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
          practice → diagnose → target → improve → repeat
        </p>
      </div>
    </section>
  );
}

/* ──────────────────────────── THE SYSTEM ──────────────────────────── */

const inputs = [
  { title: "Practice", icon: PencilLine, to: "/practice" },
  { title: "Mistake Database", icon: AlertTriangle, to: "/common-mistakes" },
  { title: "Question Type Navigator", icon: Compass, to: "/question-navigator" },
  { title: "Topic Mastery", icon: Gauge, to: "/command-center" },
] as const;

const outputs = ["Next question", "Predicted score", "Targeted recommendation"] as const;

function TheSystem({ subject }: { subject: SubjectConfig }) {
  const secondaryTitles = ["Topic Rundowns", "FRQ Library", "Exam Strategy", "Formula and Strategy Guide"];
  const secondary = secondaryTitles
    .map((t) => subject.tools.find((x) => x.title === t))
    .filter((x): x is SubjectTool => Boolean(x));

  return (
    <section className="border-t border-white/10 px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-subtle">// the system</div>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-[2.6rem] sm:leading-[1.1]">
            One system. Every answer.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Practice, mistakes, mastery, and question types aren't separate tools. They all feed the same model of how
            you're performing.
          </p>
        </div>

        {/* inputs */}
        <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {inputs.map((i) => {
            const Icon = i.icon;
            return (
              <Link
                key={i.title}
                to={i.to}
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-card/50 px-4 py-3.5 transition hover:border-primary/40"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="font-display text-sm font-semibold leading-tight">{i.title}</span>
              </Link>
            );
          })}
        </div>

        {/* inputs → engine connector */}
        <div className="relative mx-auto hidden h-14 max-w-4xl lg:block" aria-hidden>
          <svg className="h-full w-full" viewBox="0 0 800 56" preserveAspectRatio="none">
            <path
              d="M100,0 C100,34 400,22 400,56 M300,0 C300,34 400,26 400,56 M500,0 C500,34 400,26 400,56 M700,0 C700,34 400,22 400,56"
              fill="none"
              stroke="color-mix(in oklab, var(--color-primary) 20%, transparent)"
              strokeWidth="1"
            />
          </svg>
        </div>
        <div className="mx-auto my-6 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-subtle lg:hidden">
          feeds into
        </div>

        {/* the engine */}
        <div className="mx-auto max-w-4xl">
          <CommandCenterPreview subject={subject} size="md" />
        </div>

        {/* outputs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {outputs.map((o) => (
            <span
              key={o}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-card/50 px-4 py-2 text-xs text-muted-foreground"
            >
              <Sparkles className="h-3 w-3 text-primary" />
              {o}
            </span>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link to="/command-center" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
            Open my Command Center <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* secondary resources */}
        <div className="mt-20">
          <div className="mb-5 flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">supporting resources</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {secondary.map((i) => {
              const Icon = i.icon;
              const a = accentMap[i.accent];
              const inner = (
                <>
                  <div className="flex items-start justify-between">
                    <div className={`grid h-8 w-8 place-items-center rounded-lg ring-1 ${a.icon} ${a.ring}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </div>
                  <div className="mt-3 font-display text-sm font-semibold">{i.title}</div>
                  <div className="mt-1 text-xs leading-relaxed text-muted-foreground">{i.description}</div>
                </>
              );
              const cls = `group rounded-xl border border-white/10 bg-card/40 p-4 transition ${a.hover}`;
              if (i.href) {
                return (
                  <a key={i.title} href={i.href} target="_blank" rel="noopener noreferrer" className={cls}>
                    {inner}
                  </a>
                );
              }
              if (i.to) {
                return (
                  <Link key={i.title} to={i.to} className={cls}>
                    {inner}
                  </Link>
                );
              }
              return (
                <div key={i.title} className={cls}>
                  {inner}
                </div>
              );
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
          <Link
            to="/auth"
            className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold shadow-glow hover:opacity-95 transition"
          >
            Create my account <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
