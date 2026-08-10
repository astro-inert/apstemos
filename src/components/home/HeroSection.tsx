import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { SubjectConfig } from "@/lib/subjects";
import type { InstrumentData } from "@/lib/use-home-instrument";
import { CountUp, ExampleBadge, MasteryBar, MicroLabel, Reveal } from "./primitives";

export function HeroSection({ subject, data }: { subject: SubjectConfig; data: InstrumentData }) {
  const reduced = useReducedMotion();
  return (
    <section className="relative px-5 pt-16 sm:px-8 sm:pt-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 110, damping: 20 }}
          className="max-w-3xl"
        >
          <MicroLabel className="mb-6">{subject.navLabel} · score optimization</MicroLabel>
          <h1 className="font-display text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-[4.6rem]">
            Know exactly what
            <br />
            to study to get a <span className="text-primary">5</span>.
          </h1>
          <p className="mt-7 max-w-xl text-[16px] leading-relaxed text-muted-foreground sm:text-[17px]">
            AP STEM OS turns every question you answer into a personalized study plan — showing you what you know, what
            you're missing, and what to work on next.
          </p>
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <MagneticLink to="/practice">
              Start optimizing my score
              <ArrowRight className="h-4 w-4" />
            </MagneticLink>
            <a
              href="#the-system"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              Explore the system
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
          <p className="num mt-7 text-[11px] uppercase tracking-[0.16em] text-subtle">
            Free forever · No credit card · Built for the AP exam
          </p>
        </motion.div>
      </div>

      <div className="mx-auto mt-14 max-w-6xl sm:mt-20">
        <Instrument subject={subject} data={data} />
      </div>
    </section>
  );
}

export function MagneticLink({
  to,
  children,
  variant = "primary",
}: {
  to: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      whileHover={reduced ? undefined : { y: -2 }}
      whileTap={reduced ? undefined : { y: 0, scale: 0.99 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="inline-flex"
    >
      <Link
        to={to}
        className={
          variant === "primary"
            ? "inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-shadow hover:shadow-elevated"
            : "inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition-colors hover:border-primary/40"
        }
      >
        {children}
      </Link>
    </motion.div>
  );
}

function Instrument({ subject, data }: { subject: SubjectConfig; data: InstrumentData }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 90, damping: 22, delay: 0.12 }}
      className="overflow-hidden rounded-3xl border border-border bg-card shadow-instrument"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4 sm:px-7">
        <div className="min-w-0">
          <MicroLabel>{subject.navLabel}</MicroLabel>
          <div className="mt-1 font-display text-sm font-semibold">Score Command Center</div>
        </div>
        <ExampleBadge live={data.live} />
      </div>

      <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)_minmax(0,1fr)]">
        {/* Predicted score */}
        <div className="border-b border-border p-6 sm:p-7 lg:border-b-0 lg:border-r">
          <MicroLabel>Predicted score</MicroLabel>
          <div className="mt-5 flex items-end gap-2">
            <span className="num font-display text-[4.5rem] font-semibold leading-none tracking-tight">
              <CountUp to={data.predicted} />
            </span>
            <span className="num pb-3 text-lg text-muted-foreground">/ 5</span>
          </div>
          <div className="mt-6 flex gap-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full ${i <= data.predicted ? "bg-primary" : "bg-elevated"}`}
              />
            ))}
          </div>
          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
            Mastery is measured against AP STEM OS's operational 70% threshold. Every answer you log moves it.
          </p>
        </div>

        {/* Subtopic mastery */}
        <div className="border-b border-border p-6 sm:p-7 lg:border-b-0 lg:border-r">
          <MicroLabel>Subtopic mastery</MicroLabel>
          <ul className="mt-5 space-y-4">
            {data.subtopics.map((s, i) => (
              <li key={s.name} className="group">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="truncate text-[13px] font-medium">{s.name}</span>
                  <span
                    className={`num text-[13px] ${s.mastery >= 70 ? "text-foreground" : "text-primary"}`}
                  >
                    <CountUp to={s.mastery} suffix="%" />
                  </span>
                </div>
                <div className="mt-2">
                  <MasteryBar value={s.mastery} delay={i * 0.06} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Next moves */}
        <div className="p-6 sm:p-7">
          <MicroLabel>Your next moves</MicroLabel>
          <ol className="mt-5 space-y-2">
            {data.moves.map((m, i) => (
              <li key={m.name}>
                <Link
                  to="/practice"
                  className="group flex items-center gap-3 rounded-xl border border-transparent px-3 py-3 transition-all hover:border-primary/25 hover:bg-accent/40"
                >
                  <span className="num text-[11px] text-subtle">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-medium">{m.name}</span>
                    <span className="num block text-[11px] text-muted-foreground">{m.mastery}% mastery</span>
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[11px] font-medium transition-colors group-hover:border-primary/40 group-hover:text-primary">
                    {m.cta}
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </motion.div>
  );
}
