import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, X } from "lucide-react";
import { LaTeX } from "@/components/LaTeX";
import { HOME_DEMO } from "@/lib/home-demo";
import { isSubjectLive, type SubjectConfig } from "@/lib/subjects";
import { ComingSoon, Section, SectionHeading, MicroLabel } from "./primitives";

export function DiagnosisSection({ subject }: { subject: SubjectConfig }) {
  const q = HOME_DEMO[subject.id].question;
  const [picked, setPicked] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const revealed = picked !== null;

  return (
    <Section className="border-t border-border">
      <SectionHeading
        label="02 · the magic moment"
        title={
          <>
            Don't just see that you're wrong.
            <br />
            Understand why.
          </>
        }
        sub="Select an answer below. The diagnosis is the information already hidden inside your choice."
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-2 lg:gap-6">
        {/* Question */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <MicroLabel>{q.id}</MicroLabel>
            <span className="num text-[10px] text-subtle">{q.meta}</span>
          </div>
          <div className="mt-6 text-[15px] leading-relaxed">
            <LaTeX>{q.prompt}</LaTeX>
          </div>
          <div className="mt-7 space-y-2.5">
            {q.choices.map((c, i) => {
              const isPicked = picked === i;
              const isCorrect = i === q.correct;
              const state = !revealed
                ? "border-border hover:border-primary/40 hover:bg-accent/30"
                : isPicked && !isCorrect
                  ? "border-destructive/50 bg-destructive/5"
                  : isCorrect
                    ? "border-primary/50 bg-accent/50"
                    : "border-border opacity-60";
              return (
                <button
                  key={i}
                  onClick={() => setPicked(i)}
                  className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition-all ${state}`}
                >
                  <span className="num text-[11px] text-subtle">{String.fromCharCode(65 + i)}</span>
                  <span className="min-w-0 flex-1">
                    <LaTeX>{c}</LaTeX>
                  </span>
                  {revealed && isCorrect ? <Check className="h-4 w-4 shrink-0 text-primary" /> : null}
                  {revealed && isPicked && !isCorrect ? (
                    <X className="h-4 w-4 shrink-0 text-destructive" />
                  ) : null}
                </button>
              );
            })}
          </div>
          {revealed ? (
            <button
              onClick={() => setPicked(null)}
              className="num mt-6 text-[11px] uppercase tracking-[0.16em] text-subtle transition-colors hover:text-foreground"
            >
              Reset question
            </button>
          ) : (
            <p className="num mt-6 text-[11px] uppercase tracking-[0.16em] text-subtle">Choose an answer</p>
          )}
        </div>

        {/* Diagnosis */}
        <div className="relative min-h-[22rem] overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
          <div className="pointer-events-none absolute inset-0 opacity-70 atmosphere" />
          <AnimatePresence mode="wait">
            {!revealed ? (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative grid h-full min-h-[18rem] place-items-center"
              >
                <p className="num max-w-[16rem] text-center text-[11px] uppercase leading-relaxed tracking-[0.16em] text-subtle">
                  Diagnosis appears here the instant you answer
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="diagnosis"
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 160, damping: 20 }}
                className="relative"
              >
                <div
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[12px] font-semibold ${
                    picked === q.correct
                      ? "border-primary/40 bg-accent/60 text-primary"
                      : "border-destructive/40 bg-destructive/5 text-destructive"
                  }`}
                >
                  {picked === q.correct ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                  {picked === q.correct ? "Correct" : "Incorrect"}
                </div>

                <dl className="mt-7 divide-y divide-border">
                  {[
                    { k: "Concept", v: q.concept },
                    {
                      k: "Mistake",
                      v: picked === q.correct ? "None on this question" : q.mistake,
                    },
                    { k: "Pattern", v: picked === q.correct ? "No repeat pattern" : q.pattern },
                    { k: "Next", v: q.next },
                  ].map((row, i) => (
                    <motion.div
                      key={row.k}
                      initial={reduced ? { opacity: 1 } : { opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 24, delay: 0.06 * i }}
                      className="flex items-baseline justify-between gap-4 py-3.5"
                    >
                      <dt className="micro-label">{row.k}</dt>
                      <dd className="text-right text-[14px] font-medium">{row.v}</dd>
                    </motion.div>
                  ))}
                </dl>

                {isSubjectLive(subject.id) ? (
                  <Link
                    to="/practice"
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-shadow hover:shadow-glow"
                  >
                    Practice this weakness
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <div className="mt-7">
                    <ComingSoon />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
