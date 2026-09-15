import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { isSubjectLive, type SubjectConfig } from "@/lib/subjects";
import type { InstrumentData } from "@/lib/use-home-instrument";
import { ComingSoon, CountUp, ExampleBadge, MasteryBar, MicroLabel, Reveal, Section, SectionHeading } from "./primitives";

export function CommandCenterSection({
  subject,
  data,
}: {
  subject: SubjectConfig;
  data: InstrumentData;
}) {
  const reduced = useReducedMotion();
  const live = isSubjectLive(subject.id);
  const calculus = subject.id === "calc-bc";
  return (
    <Section className="border-t border-border">
      <SectionHeading
        label="03 · score command center"
        title={calculus ? "From answers to action." : "Stop guessing what to study."}
        sub={calculus ? "See exactly where you're strong—and where you're not. Every Practice result updates your unit mastery, topic strengths and weaknesses, and highest-ROI study suggestions." : "Your Score Command Center turns practice into a prioritized study plan."}
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-6">
        {/* Unit mastery */}
        <Reveal className="min-w-0 max-w-full border-t-2 border-foreground bg-card p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <MicroLabel>{subject.navLabel}</MicroLabel>
              <div className="mt-1 font-display text-sm font-semibold">Unit mastery</div>
            </div>
            <ExampleBadge live={data.live} />
          </div>
          <ul className="mt-7 min-w-0 space-y-4">
            {data.units.map((u, i) => (
              <li key={u.label}>
                <div className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-2 sm:gap-4">
                  <span className="num shrink-0 text-[12px] text-muted-foreground">{u.label}</span>
                  <span className="min-w-0 flex-1 truncate text-[12px] text-subtle">{u.name}</span>
                  <span className={`num text-[12px] ${u.mastery >= 70 ? "text-foreground" : "text-primary"}`}>
                    <CountUp to={u.mastery} suffix="%" />
                  </span>
                </div>
                <div className="mt-2">
                  <MasteryBar value={u.mastery} delay={i * 0.04} />
                </div>
              </li>
            ))}
          </ul>
           <p className="num mt-7 text-[11px] text-muted-foreground">
            70% is AP STEM OS's operational mastery threshold
          </p>
        </Reveal>

        {/* Recommendations — visually dominant */}
        <Reveal delay={0.08} className="relative min-w-0 max-w-full">
           <div className="relative h-full overflow-hidden border-t-2 border-primary bg-card p-6 sm:p-8">
            <div className="relative">
              <MicroLabel>Highest-priority recommendations</MicroLabel>
               <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-secondary-foreground">
                 {calculus ? "Prioritize the weaknesses where additional practice can have the greatest value." : "The score tells you where you are. These tell you what to do."}
              </p>
              <ol className="mt-7 space-y-3">
                {data.moves.map((m, i) => (
                  <motion.li
                    key={m.name}
                    whileHover={reduced ? undefined : { y: -2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  >
                    {live ? (
                    <Link
                      to="/practice"
                       className="group flex min-w-0 items-start gap-3 border-t border-border bg-background/70 px-3 py-4 transition-colors hover:bg-elevated/60 sm:gap-4 sm:px-4"
                    >
                      <span className="num text-[13px] text-primary">{i + 1}.</span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-[15px] font-semibold leading-tight">{m.name}</span>
                        <span className="num mt-1 block text-[11px] text-muted-foreground">{m.mastery}% mastery</span>
                        <span className="mt-2 block text-[13px] text-muted-foreground">{m.action}</span>
                      </span>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-subtle transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
                    </Link>
                    ) : (
                      <div className="flex items-start gap-4 rounded-2xl border border-border bg-background/70 px-4 py-4">
                        <span className="num text-[13px] text-primary">{i + 1}.</span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-display text-[15px] font-semibold leading-tight">{m.name}</span>
                          <span className="num mt-1 block text-[11px] text-muted-foreground">{m.mastery}% mastery</span>
                          <ComingSoon className="mt-2" />
                        </span>
                      </div>
                    )}
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
