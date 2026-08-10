import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { SubjectConfig } from "@/lib/subjects";
import type { InstrumentData } from "@/lib/use-home-instrument";
import { CountUp, ExampleBadge, MasteryBar, MicroLabel, Reveal, Section, SectionHeading } from "./primitives";

export function CommandCenterSection({
  subject,
  data,
}: {
  subject: SubjectConfig;
  data: InstrumentData;
}) {
  const reduced = useReducedMotion();
  return (
    <Section className="border-t border-border">
      <SectionHeading
        label="03 · score command center"
        title="Stop guessing what to study."
        sub="Your Score Command Center turns practice into a prioritized study plan."
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-6">
        {/* Unit mastery */}
        <Reveal className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <MicroLabel>{subject.navLabel}</MicroLabel>
              <div className="mt-1 font-display text-sm font-semibold">Unit mastery</div>
            </div>
            <ExampleBadge live={data.live} />
          </div>
          <ul className="mt-7 space-y-4">
            {data.units.map((u, i) => (
              <li key={u.label}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="num text-[12px] text-muted-foreground">{u.label}</span>
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
          <p className="num mt-7 text-[10px] uppercase tracking-[0.16em] text-subtle">
            70% is AP STEM OS's operational mastery threshold
          </p>
        </Reveal>

        {/* Recommendations — visually dominant */}
        <Reveal delay={0.08} className="relative">
          <div className="relative h-full overflow-hidden rounded-3xl border border-primary/25 bg-card p-6 shadow-instrument sm:p-8">
            <div className="pointer-events-none absolute inset-0 opacity-80 atmosphere" />
            <div className="relative">
              <MicroLabel>Highest-priority recommendations</MicroLabel>
              <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-muted-foreground">
                The score tells you where you are. These tell you what to do.
              </p>
              <ol className="mt-7 space-y-3">
                {data.moves.map((m, i) => (
                  <motion.li
                    key={m.name}
                    whileHover={reduced ? undefined : { y: -2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  >
                    <Link
                      to="/practice"
                      className="group flex items-start gap-4 rounded-2xl border border-border bg-background/70 px-4 py-4 transition-colors hover:border-primary/40"
                    >
                      <span className="num text-[13px] text-primary">{i + 1}.</span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-[15px] font-semibold leading-tight">{m.name}</span>
                        <span className="num mt-1 block text-[11px] text-muted-foreground">{m.mastery}% mastery</span>
                        <span className="mt-2 block text-[13px] text-muted-foreground">{m.action}</span>
                      </span>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-subtle transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
                    </Link>
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
