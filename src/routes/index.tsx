import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Calculator,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  Flame,
  GraduationCap,
  LineChart,
  ListChecks,
  Sigma,
  Sparkles,
  Target,
  Timer,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "APCalcExamPrep — Everything you need for a 5 on AP Calc AB/BC" },
      {
        name: "description",
        content:
          "The AP Calculus operating system. Topic rundowns, FRQs by type, timed practice, formula sheet, and exam strategy — built by students who scored 5s.",
      },
    ],
  }),
  component: HomePage,
});

const LATEX_PDF_URL =
  "https://www.overleaf.com/download/project/69da90d931d1b909a9d09491/build/19ea2640ea6-92bb352f97e666fa/output/output.pdf?compileGroup=standard&clsiserverid=clsi-pre-emp-c3d-b-f-15kq&enable_pdf_caching=true&popupDownload=true&editorId=9fff4a11-61ca-4aef-a499-3d3445bc08f6";

// AP Calculus 2026 exam — May 12, 2026, 8:00 AM local
const EXAM_DATE = new Date("2026-05-12T08:00:00");

type Tone = "blue" | "violet" | "emerald" | "amber" | "rose" | "cyan";
const toneStyles: Record<Tone, { icon: string; ring: string; chip: string }> = {
  blue:    { icon: "text-sky-400 bg-sky-500/10",       ring: "ring-sky-500/20",      chip: "text-sky-400" },
  violet:  { icon: "text-violet-400 bg-violet-500/10", ring: "ring-violet-500/20",   chip: "text-violet-400" },
  emerald: { icon: "text-emerald-400 bg-emerald-500/10", ring: "ring-emerald-500/20", chip: "text-emerald-400" },
  amber:   { icon: "text-amber-400 bg-amber-500/10",   ring: "ring-amber-500/20",    chip: "text-amber-400" },
  rose:    { icon: "text-rose-400 bg-rose-500/10",     ring: "ring-rose-500/20",     chip: "text-rose-400" },
  cyan:    { icon: "text-cyan-400 bg-cyan-500/10",     ring: "ring-cyan-500/20",     chip: "text-cyan-400" },
};

interface CardItem {
  to?: string;
  href?: string;
  icon: typeof BookOpen;
  title: string;
  desc: string;
  time: string;
  difficulty: "Foundational" | "Core" | "Advanced";
  tone: Tone;
}

const categories: { name: string; eyebrow: string; items: CardItem[] }[] = [
  {
    eyebrow: "01",
    name: "Learn",
    items: [
      { to: "/topic-rundown", icon: BookOpen, title: "Topic Rundown", desc: "All 10 units distilled — limits to series.", time: "4–6 hrs", difficulty: "Foundational", tone: "blue" },
      { to: "/self-study-guide", icon: Compass, title: "Study Guide", desc: "Week-by-week roadmap from January to May.", time: "Ongoing", difficulty: "Core", tone: "violet" },
    ],
  },
  {
    eyebrow: "02",
    name: "Practice",
    items: [
      { to: "/frqs-by-type", icon: ListChecks, title: "FRQs by Type", desc: "Every FRQ 2000–2026, organized by topic.", time: "2 hr / set", difficulty: "Core", tone: "emerald" },
      { to: "/frqs-by-type", icon: Brain, title: "MCQ Sets", desc: "Targeted multiple choice by unit.", time: "30 min", difficulty: "Core", tone: "cyan" },
      { to: "/frqs-by-type", icon: Timer, title: "Timed Practice", desc: "Full 3hr 15min mock exams with scoring.", time: "3h 15m", difficulty: "Advanced", tone: "amber" },
    ],
  },
  {
    eyebrow: "03",
    name: "Review",
    items: [
      { href: LATEX_PDF_URL, icon: Calculator, title: "Formula Sheet", desc: "10-page LaTeX master sheet. Print it.", time: "Cram", difficulty: "Foundational", tone: "blue" },
      { to: "/108-points-breakdown", icon: Target, title: "Common Mistakes", desc: "108-point breakdown — where you lose points.", time: "1 hr", difficulty: "Core", tone: "rose" },
    ],
  },
  {
    eyebrow: "04",
    name: "Strategy",
    items: [
      { to: "/exam-strategy", icon: Trophy, title: "Exam Strategy", desc: "Section pacing, calculator tricks, time triage.", time: "45 min", difficulty: "Advanced", tone: "violet" },
      { to: "/108-points-breakdown", icon: LineChart, title: "Score Breakdown", desc: "Reverse-engineered: what a 5 actually requires.", time: "30 min", difficulty: "Core", tone: "emerald" },
    ],
  },
];

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return useMemo(() => {
    const diff = Math.max(0, target.getTime() - now);
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff / 3600000) % 24);
    const m = Math.floor((diff / 60000) % 60);
    const s = Math.floor((diff / 1000) % 60);
    return { d, h, m, s };
  }, [now, target]);
}

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[1100px] rounded-full blur-3xl opacity-30 bg-[radial-gradient(ellipse_at_center,var(--color-primary),transparent_60%)]" />
      </div>

      <SiteNav />
      <Hero />
      <Stats />
      <Dashboard />
      <SocialProof />
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="px-6 pt-20 pb-16 relative">
      <div className="max-w-5xl mx-auto text-center animate-bounce-in">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium text-muted-foreground mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Built for the 2026 exam · AB + BC
        </div>
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] gradient-text">
          Everything you need<br />for a 5 on AP Calculus
        </h1>
        <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Not another textbook. A focused operating system for the exam — topic rundowns, every FRQ since 2000 organized by type, timed mocks, and a strategy that actually scales to a 5.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/self-study-guide"
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold shadow-glow hover:opacity-95 transition"
          >
            Start studying
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href={LATEX_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-border bg-card/50 text-sm font-semibold hover:bg-elevated transition"
          >
            <Calculator className="h-4 w-4" />
            View formula sheet
          </a>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { label: "Topics covered", value: "20+" },
    { label: "Practice problems", value: "100+" },
    { label: "FRQs (2000–2026)", value: "150+" },
    { label: "Coverage", value: "AB + BC" },
  ];
  return (
    <section className="px-6 pb-16">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
        {stats.map((s) => (
          <div key={s.label} className="bg-card px-5 py-6 text-center">
            <div className="font-display text-2xl sm:text-3xl font-bold tracking-tight">{s.value}</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Dashboard() {
  return (
    <section className="px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">// dashboard</div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Your exam prep, in one surface</h2>
          </div>
          <div className="text-sm text-muted-foreground">Pick a track and start the next session.</div>
        </div>

        {/* Bento grid: top row = progress + countdown + daily */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <ProgressCard />
          <CountdownCard />
          <DailyQuestionCard />
        </div>

        {/* Category sections */}
        <div className="space-y-10 mt-12">
          {categories.map((cat) => (
            <div key={cat.name}>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-muted-foreground">{cat.eyebrow}</span>
                <h3 className="font-display text-xl font-semibold">{cat.name}</h3>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.items.map((item) => (
                  <FeatureCard key={item.title} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ item }: { item: CardItem }) {
  const tone = toneStyles[item.tone];
  const Icon = item.icon;
  const inner = (
    <div className="group relative h-full rounded-xl border border-border bg-card p-5 hover-lift shadow-card overflow-hidden">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_top_right,var(--color-primary),transparent_60%)] pointer-events-none" style={{ opacity: 0 }} />
      <div className="flex items-start justify-between gap-3">
        <div className={`grid place-items-center h-10 w-10 rounded-lg ${tone.icon} ring-1 ${tone.ring}`}>
          <Icon className="h-5 w-5" />
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition" />
      </div>
      <h4 className="font-display text-base font-semibold mt-4">{item.title}</h4>
      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{item.time}</span>
        <span className="h-1 w-1 rounded-full bg-border" />
        <span className={tone.chip}>{item.difficulty}</span>
      </div>
    </div>
  );
  if (item.href) {
    return <a href={item.href} target="_blank" rel="noopener noreferrer">{inner}</a>;
  }
  return <Link to={item.to!}>{inner}</Link>;
}

function ProgressCard() {
  const topics = 12;
  const total = 20;
  const pct = Math.round((topics / total) * 100);
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
          <TrendingUp className="h-3.5 w-3.5" /> Exam readiness
        </div>
        <span className="text-xs text-emerald-400 font-medium">On track</span>
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="font-display text-4xl font-bold tracking-tight">{pct}%</span>
        <span className="text-sm text-muted-foreground">ready</span>
      </div>
      <div className="mt-3 h-2 rounded-full bg-elevated overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-400" style={{ width: `${pct}%` }} />
      </div>
      <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-border">
        <div>
          <div className="text-xs text-muted-foreground">Topics</div>
          <div className="font-display font-semibold mt-0.5">{topics}/{total}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground inline-flex items-center gap-1"><Flame className="h-3 w-3 text-amber-400" /> Streak</div>
          <div className="font-display font-semibold mt-0.5">7 days</div>
        </div>
      </div>
    </div>
  );
}

function CountdownCard() {
  const { d, h, m, s } = useCountdown(EXAM_DATE);
  const blocks = [
    { v: d, l: "days" },
    { v: h, l: "hrs" },
    { v: m, l: "min" },
    { v: s, l: "sec" },
  ];
  return (
    <div className="relative rounded-xl border border-border p-5 shadow-card overflow-hidden bg-gradient-to-br from-card via-card to-accent">
      <div className="absolute inset-0 bg-grid-animated opacity-30 pointer-events-none" />
      <div className="relative">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
          <Timer className="h-3.5 w-3.5" /> Exam countdown
        </div>
        <div className="text-xs text-muted-foreground mt-1">May 12, 2026 · 8:00 AM</div>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {blocks.map((b) => (
            <div key={b.l} className="rounded-lg bg-background/60 backdrop-blur border border-border py-2 text-center">
              <div className="font-mono font-bold text-lg tabular-nums">{String(b.v).padStart(2, "0")}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{b.l}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">Don't panic. You have a plan.</p>
      </div>
    </div>
  );
}

function DailyQuestionCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-card flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-violet-400" /> Daily question
        </div>
        <span className="text-[10px] font-mono text-muted-foreground">FRQ · BC</span>
      </div>
      <div className="mt-4 rounded-lg bg-elevated/60 border border-border p-3 font-mono text-sm leading-relaxed">
        Evaluate <span className="text-foreground font-semibold">∫₀^π/4 sec²(x) tan(x) dx</span>
      </div>
      <p className="text-xs text-muted-foreground mt-3 flex-1">
        u-substitution territory. Try it without the formula sheet first.
      </p>
      <button className="mt-4 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md bg-foreground text-background text-xs font-semibold hover:opacity-90 transition">
        <Zap className="h-3.5 w-3.5" /> Try it now
      </button>
    </div>
  );
}

function SocialProof() {
  const testimonials = [
    { name: "Maya R.", score: "5", track: "BC", quote: "FRQs by type was the unlock. I stopped re-doing 2018 #6 and actually drilled series." },
    { name: "Jordan T.", score: "5", track: "AB", quote: "The formula sheet alone saved my exam morning. Cleaner than anything my teacher gave us." },
    { name: "Priya S.", score: "5", track: "BC", quote: "Built like a real product, not a PDF dump. The strategy section is genuinely different." },
  ];
  return (
    <section className="px-6 py-20 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">// outcomes</div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Built by students who scored 5s</h2>
            <p className="text-muted-foreground mt-2 max-w-xl">Real results, not stock photos. Here's what the people who shipped this site say worked.</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs">
            <GraduationCap className="h-3.5 w-3.5 text-emerald-400" />
            <span className="font-medium">5/5</span>
            <span className="text-muted-foreground">average from beta cohort</span>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-xl border border-border bg-card p-5 hover-lift">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-violet-400 grid place-items-center text-primary-foreground font-display font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">Scored {t.score} · Calc {t.track}</div>
                </div>
                <CheckCircle2 className="h-4 w-4 text-emerald-400 ml-auto" />
              </div>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">"{t.quote}"</p>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="mt-12 relative rounded-2xl border border-border overflow-hidden bg-gradient-to-br from-card via-card to-accent p-8 sm:p-12 text-center">
          <div className="absolute inset-0 bg-grid-animated opacity-20 pointer-events-none" />
          <div className="relative">
            <Sigma className="h-8 w-8 mx-auto text-primary" />
            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mt-4">Stop reading. Start scoring.</h3>
            <p className="text-muted-foreground mt-2 max-w-lg mx-auto">One focused session beats a week of passive review. Pick a topic and go.</p>
            <Link
              to="/self-study-guide"
              className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold shadow-glow hover:opacity-95 transition"
            >
              Open the study guide <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
