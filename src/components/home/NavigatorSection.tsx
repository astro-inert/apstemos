import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { HOME_DEMO } from "@/lib/home-demo";
import { isSubjectLive, type SubjectConfig } from "@/lib/subjects";
import { ComingSoon, MicroLabel, Reveal, Section, SectionHeading } from "./primitives";

export function NavigatorSection({ subject }: { subject: SubjectConfig }) {
  const nav = HOME_DEMO[subject.id].navigator;
  const [active, setActive] = useState(nav.activeIndex);
  const reduced = useReducedMotion();
  const activeSubtopic = nav.subtopics[active] ?? nav.subtopics[nav.activeIndex] ?? "";
  const activeGuidance = nav.guidanceBySubtopic?.[activeSubtopic] ?? { mcq: nav.mcq, frq: nav.frq };
  return (
    <Section className="border-t border-border">
      <SectionHeading
        label="05 · question type navigator"
        title="Know how every topic can be tested."
        sub={`For each ${subject.navLabel} subtopic, learn how to recognize and approach its MCQs and FRQs, which methods and conditions matter, and what the exam expects from your work.`}
      />

       <div className="mt-14 overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border px-5 py-5 sm:px-6">
          <div className="min-w-0">
            <MicroLabel>{subject.navLabel}</MicroLabel>
            <div className="num mt-1.5 text-[12px] tracking-[0.08em]">{nav.unitLabel}</div>
          </div>
          {isSubjectLive(subject.id) ? (
            <Link
              to="/question-navigator"
              className="group inline-flex max-w-[9rem] items-center justify-end gap-1.5 text-right text-sm font-medium leading-tight transition-colors hover:text-primary sm:max-w-none"
            >
              Explore the Question Type Navigator
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ) : (
            <ComingSoon />
          )}
        </div>

        <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <ul className="border-b border-border lg:border-b-0 lg:border-r">
            {nav.subtopics.map((s, i) => (
              <li key={s}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`flex min-h-12 w-full items-center justify-between gap-3 border-b border-border px-5 py-3.5 text-left text-[14px] transition-colors last:border-b-0 sm:px-6 ${
                    active === i ? "bg-accent/50 text-primary" : "hover:bg-elevated/60"
                  }`}
                >
                  <span className="min-w-0 truncate font-medium">{s}</span>
                  <ChevronRight
                    className={`h-4 w-4 shrink-0 transition-transform ${active === i ? "translate-x-0.5 text-primary" : "text-subtle"}`}
                  />
                </button>
              </li>
            ))}
          </ul>

          <div className="p-6 sm:p-8">
            <MicroLabel>How this subtopic appears on the AP exam</MicroLabel>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 1 } : { opacity: 0, y: -6 }}
                transition={{ type: "spring", stiffness: 200, damping: 24 }}
                className="mt-6 grid gap-8 sm:grid-cols-2"
              >
                {[
                  { k: "MCQ", steps: activeGuidance.mcq },
                  { k: "FRQ", steps: activeGuidance.frq },
                ].map((col) => (
                  <div key={col.k}>
                    <div className="num text-[11px] font-semibold tracking-[0.18em] text-primary">{col.k}</div>
                    <ol className="mt-4 space-y-3">
                      {col.steps.map((s, i) => (
                        <li key={s} className="flex gap-3 text-[13px] leading-relaxed">
                          <span className="num shrink-0 text-[11px] text-subtle">{i + 1}.</span>
                           <span className="text-secondary-foreground">{s}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
            <Reveal delay={0.1}>
              <p className="num mt-8 text-[10px] text-subtle">
                {activeSubtopic}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
