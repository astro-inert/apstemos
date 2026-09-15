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
  const calculus = subject.id === "calc-bc";

  return (
    <Section className="border-t border-border">
      <SectionHeading
        label={`Practice · ${subject.navLabel}`}
        title={
          <>
             {calculus ? <>Choose exactly what<br />you need to practice.</> : <>See how practice<br />will work.</>}
          </>
        }
        sub={calculus ? `Filter 2,000+ original ${subject.navLabel}-style questions by unit, subtopic, and difficulty. Each answer includes a concise explanation and updates your performance data.` : `Preview an original ${subject.navLabel}-style question with an immediate explanation. The complete practice bank is coming soon.`}
      />

      <div className="mt-14 grid overflow-hidden rounded-2xl border border-border bg-card shadow-card lg:grid-cols-2">
        {/* Question */}
        <div className="min-w-0 max-w-full p-6 sm:p-8 lg:border-r lg:border-border">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <MicroLabel>{q.id}</MicroLabel>
            <span className="num text-[10px] text-subtle">{q.meta}</span>
          </div>
          <div className="mt-6 text-[15px] leading-relaxed">
            <span className="block min-w-0 max-w-full overflow-x-auto"><LaTeX>{q.prompt}</LaTeX></span>
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
                    className={`flex min-h-12 w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all ${state}`}
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
          <div className="relative min-w-0 max-w-full overflow-hidden border-t border-border bg-elevated/35 p-6 sm:min-h-[22rem] sm:p-8 lg:border-l-0 lg:border-t-0">
          <AnimatePresence mode="wait">
            {!revealed ? (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative grid h-full min-h-[11rem] place-items-center sm:min-h-[18rem]"
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
                     className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-card transition-colors hover:bg-primary/90"
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
