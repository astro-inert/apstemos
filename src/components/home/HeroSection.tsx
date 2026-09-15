import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { isSubjectLive, type SubjectConfig } from "@/lib/subjects";
import type { InstrumentData } from "@/lib/use-home-instrument";
import { ComingSoon, CountUp, ExampleBadge, MasteryBar, MicroLabel } from "./primitives";

export function HeroSection({ subject, data }: { subject: SubjectConfig; data: InstrumentData }) {
  const reduced = useReducedMotion();
  const calculus = subject.id === "calc-bc";
  const course = subject.navLabel.replace("AP ", "");
  return (
    <section className="relative px-5 pt-16 sm:px-8 sm:pt-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 110, damping: 20 }}
          className="max-w-3xl"
        >
          <MicroLabel className="mb-6">{calculus ? "AP Calculus AB & BC" : subject.navLabel}</MicroLabel>
          <h1 className="font-display text-[2.6rem] font-semibold leading-[0.98] sm:text-[4.6rem]">
            Stop studying.<br />Start <span className="text-primary">optimizing.</span>
          </h1>
          <p className="mt-7 max-w-xl text-[16px] leading-7 text-secondary-foreground sm:text-[17px]">
            {calculus
              ? "2,000+ AP-style questions connected to subtopic-level performance tracking, mistake analysis, and MCQ and FRQ guidance for every AP Calculus topic."
              : `AP-style ${course} questions connected to subtopic-level performance tracking, mistake analysis, and MCQ and FRQ guidance for every topic.`}
          </p>
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            {isSubjectLive(subject.id) ? (
              <MagneticLink to="/practice" className="min-h-12">
                Start Practicing
                <ArrowRight className="h-4 w-4" />
              </MagneticLink>
            ) : (
              <div className="flex flex-col items-start gap-3">
                <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-md border border-dashed border-border bg-card px-6 py-3 text-sm font-semibold text-muted-foreground">
                  {subject.navLabel} question bank
                  <ArrowRight className="h-4 w-4" />
                </span>
                <ComingSoon />
              </div>
            )}
            <a
              href="#the-system"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              Explore AP STEM OS
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
          <p className="num mt-7 text-[12px] text-muted-foreground">
            {calculus ? "2,000+ questions · AB & BC · MCQ + FRQ guidance" : `${subject.navLabel} content coming soon`}
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
  className = "",
}: {
  to: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
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
            ? `inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 ${className}`
            : `inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold transition-colors hover:border-primary/40 ${className}`
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
      className="min-w-0 max-w-full overflow-hidden rounded-lg border border-border bg-card shadow-instrument"
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
        <div className="min-w-0 border-b border-border p-6 sm:p-7 lg:border-b-0 lg:border-r">
          <MicroLabel>MCQ-based score estimate</MicroLabel>
          {data.predicted === null ? (
            <>
              <div className="mt-5 font-display text-2xl font-semibold leading-tight tracking-tight">
                Not enough evidence yet
              </div>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                We only show an estimate once your first-attempt answers cover enough of the course to support one.
              </p>
            </>
          ) : (
            <>
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
                    className={`h-1 flex-1 rounded-full ${i <= (data.predicted ?? 0) ? "bg-primary" : "bg-elevated"}`}
                  />
                ))}
              </div>
            </>
          )}
          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
            Estimated from multiple-choice evidence only — free-response performance is not modeled.
          </p>
          <p className="num mt-3 text-[11px] text-muted-foreground">
            {data.completedQuestions} completed questions
          </p>
        </div>

        {/* Subtopic mastery */}
        <div className="min-w-0 border-b border-border p-6 sm:p-7 lg:border-b-0 lg:border-r">
          <MicroLabel>Topic mastery</MicroLabel>
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
        <div className="min-w-0 p-6 sm:p-7">
          <MicroLabel>Your next moves</MicroLabel>
          <ol className="mt-5 space-y-2">
            {data.moves.map((m, i) => {
              const live = isSubjectLive(subject.id);
              const Row: React.ElementType = live ? Link : "div";
              return (
              <li key={m.name}>
                <Row
                  {...(live ? ({ to: "/practice" } as never) : {})}
                  className={`group flex items-center gap-3 rounded-xl border border-transparent px-3 py-3 transition-all ${live ? "hover:border-primary/25 hover:bg-accent/40" : ""}`}
                >
                  <span className="num text-[11px] text-subtle">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-medium">{m.name}</span>
                    <span className="num block text-[11px] text-muted-foreground">{m.mastery}% mastery</span>
                  </span>
                  {live ? (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[11px] font-medium transition-colors group-hover:border-primary/40 group-hover:text-primary">
                      {m.cta}
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  ) : (
                    <span className="num shrink-0 text-[10px] uppercase tracking-[0.16em] text-subtle">soon</span>
                  )}
                </Row>
              </li>
              );
            })}
          </ol>
        </div>
      </div>
    </motion.div>
  );
}
