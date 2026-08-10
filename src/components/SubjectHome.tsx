import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Plus,
  Sparkles,
} from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import type { SubjectConfig, SubjectTool } from "@/lib/subjects";
import { persistCurrentSubject } from "@/lib/use-subject";

/* ────────────────────────────────────────────────────────────────────
   AP STEM OS landing page.
   Editorial, dark, restrained. Pink = action / priority / change only.
   ──────────────────────────────────────────────────────────────────── */

export function SubjectHome({ subject }: { subject: SubjectConfig }) {
  useEffect(() => {
    persistCurrentSubject(subject.id);
  }, [subject.id]);

  return (
    <div data-subject={subject.id} className="min-h-screen bg-background text-foreground subject-theme">
      <SiteNav subject={subject.id} />
      <Hero subject={subject} />
      <CommandCenterMini subject={subject} />
      <TheLoop />
      <CommandCenterFull subject={subject} />
      <TheSystem />
      <MistakeIntelligence />
      <NavigatorShowcase subject={subject} />
      <TargetedPractice subject={subject} />
      <Toolkit subject={subject} />
      <FinalCTA />
      <SiteFooter />
    </div>
  );
}

/* ── primitives ───────────────────────────────────────────────────── */

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`border-t border-white/[0.07] px-6 py-20 sm:py-28 scroll-mt-16 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-subtle">{children}</div>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-4 font-display text-3xl sm:text-[2.6rem] font-semibold leading-[1.1] tracking-tight max-w-3xl">
      {children}
    </h2>
  );
}

function Lede({ children }: { children: React.ReactNode }) {
  return <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground">{children}</p>;
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`border border-white/[0.09] bg-card/60 ${className}`}>{children}</div>;
}

function PanelBar({ left, right }: { left: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/[0.09] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">
      <span>{left}</span>
      {right ? <span className="text-right">{right}</span> : null}
    </div>
  );
}

function PrimaryCTA({ children, to = "/auth" }: { children: React.ReactNode; to?: string }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-2 bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

/* ── hero ─────────────────────────────────────────────────────────── */

function Hero({ subject }: { subject: SubjectConfig }) {
  return (
    <section className="relative overflow-hidden px-6 pt-20 pb-16 sm:pt-28">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] bg-grid" />
      <div className="mx-auto max-w-6xl">
        <Eyebrow>AP STEM OS · open source · forever free</Eyebrow>
        <h1 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          An operating system for earning a 5.
        </h1>
        <p className="mt-6 font-display text-xl sm:text-2xl text-foreground/90">
          Practice. <span className="text-subtle">/</span> Diagnose. <span className="text-subtle">/</span> Prioritize.{" "}
          <span className="text-subtle">/</span> Fix. <span className="text-subtle">/</span>{" "}
          <span className="text-primary">Repeat.</span>
        </p>
        <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground">
          Every question updates your mastery model, identifies your highest-ROI weaknesses, and changes what you should
          practice next — for {subject.label} and every other AP STEM exam on the platform.
        </p>
        <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <PrimaryCTA>Start optimizing my score</PrimaryCTA>
          <a
            href="#the-loop"
            className="inline-flex items-center gap-2 border-b border-white/20 pb-0.5 text-sm text-muted-foreground transition hover:border-foreground/50 hover:text-foreground"
          >
            Explore the system <span aria-hidden>↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── mini command center, directly under the hero ─────────────────── */

function CommandCenterMini({ subject }: { subject: SubjectConfig }) {
  const { predicted, raw, total, target } = subject.score;
  const gap = Math.max(0, target - raw);
  return (
    <section className="px-6 pb-20 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        <Panel>
          <PanelBar
            left={
              <span className="inline-flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                score command center
              </span>
            }
            right="updated just now"
          />
          <div className="grid divide-y divide-white/[0.09] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)] lg:divide-y-0 lg:divide-x">
            <div className="p-6">
              <Eyebrow>predicted AP score</Eyebrow>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-7xl font-semibold tabular-nums leading-none">{predicted}</span>
                <span className="font-display text-2xl text-subtle">/ 5</span>
              </div>
            </div>
            <div className="p-6">
              <Eyebrow>score model</Eyebrow>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-5xl font-semibold tabular-nums leading-none">{raw}</span>
                <span className="font-display text-xl text-subtle">/ {total}</span>
              </div>
              <div className="mt-4 h-[3px] w-full bg-white/10">
                <div className="h-full bg-foreground/70" style={{ width: `${(raw / total) * 100}%` }} />
              </div>
              <div className="mt-3 text-sm text-primary">+{gap} points to target</div>
            </div>
            <div className="p-6">
              <Eyebrow>highest-ROI opportunities</Eyebrow>
              <ol className="mt-4 divide-y divide-white/[0.07]">
                {subject.recommendations.slice(0, 4).map((r, i) => (
                  <li key={r.t} className="flex items-baseline gap-4 py-2.5 text-sm">
                    <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1 text-foreground/90">{r.t}</span>
                    <span className="font-mono text-sm font-semibold text-primary tabular-nums">+{r.g}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Panel>
      </div>
    </section>
  );
}

/* ── the loop ─────────────────────────────────────────────────────── */

const LOOP = [
  { n: "01", label: "PRACTICE", body: "Answer AP-style questions organized by unit, subtopic, and difficulty." },
  { n: "02", label: "DIAGNOSE", body: "Every answer updates subtopic and unit mastery." },
  { n: "03", label: "PRIORITIZE", body: "Rank weaknesses by expected score impact." },
  { n: "04", label: "TARGET", body: "Generate practice around the weaknesses worth fixing." },
  { n: "05", label: "SCORE", body: "Update the predicted AP score and determine the next move." },
];

function TheLoop() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((v) => (v + 1) % LOOP.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <Section id="the-loop">
      <Eyebrow>the loop</Eyebrow>
      <Heading>Every question changes what you should do next.</Heading>
      <Lede>
        Nothing in AP STEM OS is a dead end. Every answer becomes data that updates your score model, identifies
        weaknesses, and determines your next best move.
      </Lede>

      {/* mechanism */}
      <div className="mt-14 border-y border-white/[0.09] py-10">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-5 font-display text-lg sm:text-xl">
          {LOOP.map((s, i) => (
            <span key={s.label} className="flex items-center gap-4">
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`tracking-tight transition ${
                  i === active ? "text-primary" : "text-foreground/45 hover:text-foreground/80"
                }`}
              >
                {s.label}
              </button>
              {i < LOOP.length - 1 ? <span className="text-subtle">→</span> : null}
            </span>
          ))}
        </div>
        {/* feedback rail */}
        <div className="relative mt-6 h-10">
          <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
          <div className="absolute left-0 top-0 h-10 w-px bg-white/10" />
          <div className="absolute right-0 top-0 h-10 w-px bg-white/10" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
          <div
            className="absolute bottom-0 h-px bg-primary transition-all duration-700"
            style={{ left: 0, width: `${((active + 1) / LOOP.length) * 100}%` }}
          />
          <div className="absolute -bottom-3 left-0 font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">
            ↺ score feeds back into practice
          </div>
        </div>
      </div>

      <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
        {LOOP.map((s, i) => (
          <div key={s.label} className={i === active ? "" : ""}>
            <dt className="flex items-baseline gap-3">
              <span className={`font-mono text-xs ${i === active ? "text-primary" : "text-subtle"}`}>{s.n}</span>
              <span className="font-display text-sm font-semibold tracking-[0.08em]">{s.label}</span>
            </dt>
            <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

/* ── command center showcase ──────────────────────────────────────── */

const MASTERY = [
  { name: "Integration by Parts", pct: 82 },
  { name: "Taylor Series", pct: 76 },
  { name: "Polar Area", pct: 63 },
  { name: "Related Rates", pct: 48 },
];

const ROI = [
  { n: "01", name: "Polar FRQs", pct: "54%", pts: "+3 pts" },
  { n: "02", name: "Series Convergence", pct: "61%", pts: "+3 pts" },
  { n: "03", name: "Unit-Context Mistakes", pct: "—", pts: "+2 pts" },
  { n: "04", name: "Differential Equations", pct: "68%", pts: "+1 pt" },
];

function masteryLabel(pct: number) {
  if (pct >= 70) return { text: "MASTERED", cls: "text-emerald-400" };
  if (pct >= 55) return { text: "DEVELOPING", cls: "text-amber-400" };
  return { text: "WEAK", cls: "text-primary" };
}

function CommandCenterFull({ subject }: { subject: SubjectConfig }) {
  const { predicted, raw, total, target } = subject.score;
  return (
    <Section>
      <Eyebrow>score command center</Eyebrow>
      <Heading>Know exactly where you stand.</Heading>
      <Lede>
        The Score Command Center turns your practice history into a constantly updated picture of your AP readiness.
      </Lede>

      <div className="mt-14 grid gap-px bg-white/[0.09] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        {/* score block */}
        <div className="bg-background px-6 py-10 sm:px-10">
          <Eyebrow>predicted AP score</Eyebrow>
          <div className="mt-6 flex items-end gap-4">
            <span className="font-display text-[7rem] font-semibold leading-[0.8] tabular-nums">{predicted}</span>
            <span className="font-display text-3xl text-subtle">/ 5</span>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/[0.09] pt-6">
            <div>
              <div className="font-display text-3xl font-semibold tabular-nums">
                {raw}
                <span className="text-lg text-subtle"> / {total}</span>
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">score model</div>
            </div>
            <div>
              <div className="font-display text-3xl font-semibold tabular-nums">{target}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">target</div>
            </div>
            <div>
              <div className="font-display text-3xl font-semibold tabular-nums text-primary">
                +{Math.max(0, target - raw)}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">points needed</div>
            </div>
          </div>
        </div>

        {/* mastery + ROI */}
        <div className="bg-background px-6 py-10 sm:px-10">
          <div className="flex items-baseline justify-between">
            <Eyebrow>subtopic mastery</Eyebrow>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">
              70% = mastery threshold
            </span>
          </div>
          <ul className="mt-5">
            {MASTERY.map((m) => {
              const l = masteryLabel(m.pct);
              return (
                <li key={m.name} className="border-b border-white/[0.07] py-3.5">
                  <div className="flex items-baseline gap-4">
                    <span className="flex-1 text-sm text-foreground/90">{m.name}</span>
                    <span className="font-display text-lg font-semibold tabular-nums">{m.pct}%</span>
                    <span className={`w-24 text-right font-mono text-[10px] tracking-[0.15em] ${l.cls}`}>{l.text}</span>
                  </div>
                  <div className="relative mt-2.5 h-[3px] w-full bg-white/[0.08]">
                    <div
                      className={`h-full ${m.pct >= 70 ? "bg-emerald-400/80" : "bg-foreground/50"}`}
                      style={{ width: `${m.pct}%` }}
                    />
                    <div className="absolute inset-y-[-3px] w-px bg-white/40" style={{ left: "70%" }} />
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-10">
            <Eyebrow>highest-ROI opportunities</Eyebrow>
            <ol className="mt-4">
              {ROI.map((r) => (
                <li key={r.n} className="flex items-baseline gap-4 border-b border-white/[0.07] py-3 text-sm">
                  <span className="font-mono text-xs text-subtle">{r.n}</span>
                  <span className="flex-1 text-foreground/90">{r.name}</span>
                  <span className="font-mono text-xs text-muted-foreground tabular-nums">{r.pct}</span>
                  <span className="w-16 text-right font-display text-base font-semibold text-primary tabular-nums">
                    {r.pts}
                  </span>
                </li>
              ))}
            </ol>
            <Link
              to="/practice"
              className="group mt-7 inline-flex items-center gap-2 border border-primary/50 px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
            >
              Practice highest-ROI weakness
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ── the system architecture ──────────────────────────────────────── */

const COMPONENTS: Record<string, { body: string; to: string }> = {
  PRACTICE: {
    body: "1,700+ AP-style questions organized by unit, subtopic, and difficulty.",
    to: "/practice",
  },
  "ANSWER LOG": {
    body: "Review everything you've answered and quickly revisit incorrect questions.",
    to: "/command-center",
  },
  "SCORE COMMAND CENTER": {
    body: "Track unit mastery, subtopic mastery, predicted score, and highest-ROI opportunities.",
    to: "/command-center",
  },
  "MISTAKE DATABASE": {
    body: "Find recurring mistakes, see examples and prevention strategies, and track your own errors.",
    to: "/common-mistakes",
  },
  "QUESTION TYPE NAVIGATOR": {
    body: "Learn exactly how to approach MCQs and FRQs for every unit and subtopic.",
    to: "/question-navigator",
  },
  "TARGETED PRACTICE": {
    body: "Generate question sets around the weaknesses with the highest expected score impact.",
    to: "/practice",
  },
};

function Node({ name, wide = false }: { name: keyof typeof COMPONENTS | string; wide?: boolean }) {
  const c = COMPONENTS[name]!;
  return (
    <Link
      to={c.to}
      className={`group block border border-white/[0.09] bg-card/50 px-5 py-4 transition hover:border-primary/40 hover:bg-card ${
        wide ? "" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-display text-sm font-semibold tracking-[0.08em]">{name}</span>
        <ArrowUpRight className="h-3.5 w-3.5 text-subtle transition group-hover:text-primary" />
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
    </Link>
  );
}

function Down() {
  return <div className="mx-auto h-8 w-px bg-white/15" />;
}

function TheSystem() {
  return (
    <Section>
      <Eyebrow>the system</Eyebrow>
      <Heading>One workflow. Every component feeds the next.</Heading>
      <Lede>
        Practice, answer history, mistake analysis, question strategy, and targeted practice all operate on the same
        score model.
      </Lede>

      <div className="mx-auto mt-14 max-w-3xl">
        <Node name="PRACTICE" />
        <Down />
        <Node name="ANSWER LOG" />
        <Down />
        <Node name="SCORE COMMAND CENTER" />
        <Down />
        {/* fork */}
        <div className="relative h-8">
          <div className="absolute left-1/4 right-1/4 top-0 h-px bg-white/15" />
          <div className="absolute left-1/4 top-0 h-8 w-px bg-white/15" />
          <div className="absolute right-1/4 top-0 h-8 w-px bg-white/15" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Node name="MISTAKE DATABASE" />
          <Node name="QUESTION TYPE NAVIGATOR" />
        </div>
        <div className="relative h-8">
          <div className="absolute left-1/4 top-0 h-8 w-px bg-white/15" />
          <div className="absolute right-1/4 top-0 h-8 w-px bg-white/15" />
          <div className="absolute left-1/4 right-1/4 bottom-0 h-px bg-white/15" />
        </div>
        <Down />
        <Node name="TARGETED PRACTICE" />
        <div className="mt-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">
          <span className="text-primary">↺</span> new data returns to practice
          <span className="h-px flex-1 bg-white/10" />
        </div>
      </div>
    </Section>
  );
}

/* ── mistake intelligence ─────────────────────────────────────────── */

function MistakeIntelligence() {
  return (
    <Section>
      <Eyebrow>mistake intelligence</Eyebrow>
      <Heading>Don't just get questions wrong. Understand why.</Heading>
      <Lede>
        Each wrong answer is classified against a database of the specific errors that cost AP students points — with
        the average loss, a worked example, and a procedure for preventing it.
      </Lede>

      <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
        <Panel>
          <PanelBar left="common mistake" right="avg. point loss −1.4" />
          <div className="p-6 sm:p-8">
            <h3 className="font-display text-2xl font-semibold leading-snug tracking-tight">
              Applying a theorem without verifying its conditions
            </h3>

            <div className="mt-8">
              <Eyebrow>example</Eyebrow>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                A student applies the Intermediate Value Theorem without first establishing continuity.
              </p>
            </div>

            <div className="mt-8">
              <Eyebrow>how to avoid</Eyebrow>
              <ul className="mt-3 space-y-2.5 text-sm text-foreground/90">
                {[
                  "Identify the required conditions",
                  "Verify each condition",
                  "Only then apply the theorem",
                ].map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center border border-white/25">
                      <Check className="h-3 w-3 text-emerald-400" />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-white/[0.09] pt-6">
              <div className="font-mono text-xs text-subtle">#continuity #IVT #FRQ</div>
              <Link
                to="/common-mistakes"
                className="ml-auto inline-flex items-center gap-2 border border-white/20 px-4 py-2 text-xs font-semibold transition hover:border-primary/50 hover:text-primary"
              >
                <Plus className="h-3.5 w-3.5" /> Add to my mistakes
              </Link>
            </div>
          </div>
        </Panel>

        <div className="lg:pt-4">
          <div className="border-l-2 border-primary/50 pl-6">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              <Sparkles className="h-3.5 w-3.5" /> built-in classifier
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">Can't find your mistake?</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Describe what happened in plain language. The built-in AI classifies the error, estimates its point cost,
              and files it into the database and your own mistake profile.
            </p>
          </div>
          <div className="mt-8 border border-white/[0.09] bg-card/40 p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">your input</div>
            <p className="mt-3 text-sm italic text-foreground/80">
              "I set up the integral right but forgot to include units in my final answer."
            </p>
            <div className="mt-5 border-t border-white/[0.09] pt-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">classified as</div>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="font-display text-sm font-semibold">Missing units in contextual answer</span>
                <span className="ml-auto font-mono text-sm font-semibold text-primary">−1.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ── question type navigator ──────────────────────────────────────── */

const MCQ_STEPS = [
  "Identify the correct polar area formula",
  "Determine bounds",
  "Check whether symmetry can simplify the integral",
  "Evaluate and verify the result",
];
const FRQ_STEPS = [
  "Identify what quantity is requested",
  "Write the required integral",
  "State bounds clearly",
  "Evaluate or justify appropriately",
];

function StepList({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div>
      <Eyebrow>{title}</Eyebrow>
      <ol className="mt-4">
        {steps.map((s, i) => (
          <li key={s} className="flex gap-4 border-b border-white/[0.07] py-3 text-sm text-foreground/90">
            <span className="font-mono text-xs text-subtle">{i + 1}</span>
            <span>{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function NavigatorShowcase({ subject }: { subject: SubjectConfig }) {
  return (
    <Section>
      <Eyebrow>question type navigator</Eyebrow>
      <Heading>Miss a question? Learn how the question type is meant to be answered.</Heading>
      <Lede>
        After a wrong answer you can either fix the underlying mistake or learn the procedure. The Navigator maps every
        unit and subtopic to the exact steps College Board rewards on MCQs and FRQs.
      </Lede>

      <Panel className="mt-14">
        <PanelBar left={subject.label} right="unit → subtopic → approach" />
        <div className="border-b border-white/[0.09] px-6 py-6 sm:px-8">
          <div className="font-display text-lg font-semibold tracking-tight">
            Unit 9 · Parametric Equations, Polar Coordinates &amp; Vector-Valued Functions
          </div>
          <div className="mt-4 flex items-baseline gap-4">
            <Eyebrow>subtopic</Eyebrow>
            <span className="font-display text-xl">Polar Area</span>
          </div>
        </div>
        <div className="grid gap-10 px-6 py-8 sm:px-8 lg:grid-cols-2 lg:gap-14">
          <StepList title="MCQ approach" steps={MCQ_STEPS} />
          <StepList title="FRQ approach" steps={FRQ_STEPS} />
        </div>
        <div className="border-t border-white/[0.09] px-6 py-5 sm:px-8">
          <Link
            to="/question-navigator"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            View targeted practice
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Panel>
    </Section>
  );
}

/* ── targeted practice ────────────────────────────────────────────── */

function TargetedPractice({ subject }: { subject: SubjectConfig }) {
  const priority = subject.recommendations[1]?.t ?? "Series Convergence";
  return (
    <Section>
      <Eyebrow>targeted practice</Eyebrow>
      <Heading>Turn weaknesses into your next question set.</Heading>
      <Lede>
        The system doesn't just identify weaknesses — it acts on them, assembling a set sized and weighted for the
        weakness worth the most points right now.
      </Lede>

      <div className="mt-14 grid gap-px bg-white/[0.09] sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-background p-6">
          <Eyebrow>current priority</Eyebrow>
          <div className="mt-4 font-display text-2xl font-semibold leading-snug tracking-tight">{priority}</div>
          <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-primary">
            below mastery threshold
          </div>
        </div>
        <div className="bg-background p-6">
          <Eyebrow>mastery</Eyebrow>
          <div className="mt-4 font-display text-5xl font-semibold tabular-nums leading-none">61%</div>
          <div className="mt-4 h-[3px] w-full bg-white/[0.08]">
            <div className="h-full bg-foreground/50" style={{ width: "61%" }} />
          </div>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">threshold 70%</div>
        </div>
        <div className="bg-background p-6">
          <Eyebrow>expected score impact</Eyebrow>
          <div className="mt-4 font-display text-5xl font-semibold tabular-nums leading-none text-primary">+3</div>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">points</div>
        </div>
        <div className="flex flex-col bg-background p-6">
          <Eyebrow>recommended set</Eyebrow>
          <div className="mt-4 font-display text-5xl font-semibold tabular-nums leading-none">12</div>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">questions</div>
          <div className="mt-4 text-sm text-muted-foreground">2 easy · 6 medium · 4 hard</div>
          <Link
            to="/practice"
            className="group mt-6 inline-flex items-center gap-2 bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Start targeted practice
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </Section>
  );
}

/* ── AP exam toolkit ──────────────────────────────────────────────── */

const TOOLKIT_COPY: Record<string, { title: string; body: string }> = {
  "FRQ Library": {
    title: "FRQ LIBRARY",
    body: "Every AP FRQ from the past 26 years, organized by question number and topic.",
  },
  "Topic Rundowns": {
    title: "TOPIC RUNDOWNS",
    body: "Concise, exam-focused summaries of every core concept needed for the AP exam.",
  },
  "Formula Sheet": {
    title: "FORMULA & STRATEGY GUIDE",
    body: "A 10-page LaTeX-rendered printable reference covering essential formulas and the strategies needed to apply them correctly.",
  },
  "Exam Strategy": {
    title: "EXAM STRATEGY",
    body: "Calculator tips, timing strategies, point-maximizing techniques, and walkthroughs for approaching common question types efficiently.",
  },
};

const EXCLUDED = new Set(["Score Command Center", "Question Type Navigator", "Practice", "Common Mistakes"]);

function Toolkit({ subject }: { subject: SubjectConfig }) {
  const items = subject.tools.filter((t: SubjectTool) => !EXCLUDED.has(t.title));
  return (
    <Section>
      <Eyebrow>AP exam toolkit</Eyebrow>
      <Heading>Reference material, when the loop points you to it.</Heading>
      <Lede>
        Resources for the moments when you need to review, understand, or strategize — without interrupting the
        score-optimization loop.
      </Lede>

      <div className="mt-14 grid gap-px bg-white/[0.09] sm:grid-cols-2 lg:grid-cols-4">
        {items.map((t) => {
          const copy = TOOLKIT_COPY[t.title];
          const inner = (
            <>
              <div className="flex items-start justify-between">
                <span className="font-display text-sm font-semibold tracking-[0.08em]">
                  {copy?.title ?? t.title.toUpperCase()}
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-subtle transition group-hover:text-primary" />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{copy?.body ?? t.description}</p>
            </>
          );
          const cls = "group block bg-background p-6 transition hover:bg-card/60";
          if (t.href) {
            return (
              <a key={t.title} href={t.href} target="_blank" rel="noopener noreferrer" className={cls}>
                {inner}
              </a>
            );
          }
          if (t.to) {
            return (
              <Link key={t.title} to={t.to} className={cls}>
                {inner}
              </Link>
            );
          }
          return (
            <div key={t.title} className={cls}>
              {inner}
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* ── final CTA ────────────────────────────────────────────────────── */

function FinalCTA() {
  return (
    <Section className="py-24 sm:py-32">
      <h2 className="max-w-3xl font-display text-4xl sm:text-5xl font-semibold leading-[1.08] tracking-tight">
        Stop guessing what to study next.
        <br />
        <span className="text-primary">Let the score model tell you.</span>
      </h2>
      <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <PrimaryCTA>Start optimizing my score</PrimaryCTA>
        <a
          href="#the-loop"
          className="inline-flex items-center gap-2 border-b border-white/20 pb-0.5 text-sm text-muted-foreground transition hover:border-foreground/50 hover:text-foreground"
        >
          Explore the system <span aria-hidden>→</span>
        </a>
      </div>
      <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.22em] text-subtle">
        open source · forever free · Calculus AB/BC · Physics 1, 2, C · Statistics
      </p>
    </Section>
  );
}
