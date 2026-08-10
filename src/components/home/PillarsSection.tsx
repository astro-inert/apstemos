import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { HOME_DEMO } from "@/lib/home-demo";
import type { SubjectConfig } from "@/lib/subjects";
import { MicroLabel, Reveal, Section, SectionHeading } from "./primitives";

export function PillarsSection({ subject }: { subject: SubjectConfig }) {
  const demo = HOME_DEMO[subject.id];
  const reduced = useReducedMotion();

  const pillars = [
    {
      n: "01",
      title: "Practice",
      copy: `${demo.questionCount} AP-style questions. Organized by unit, subtopic, and difficulty.`,
      to: "/practice",
      preview: (
        <div className="space-y-1.5">
          {["Easy", "Medium", "Hard"].map((d, i) => (
            <div key={d} className="flex items-center gap-2">
              <span className="num w-14 text-[10px] text-subtle">{d}</span>
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-elevated">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={reduced ? { width: "100%" } : { width: 0 }}
                  whileInView={{ width: ["82%", "58%", "40%"][i] }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 60, damping: 18, delay: 0.08 * i }}
                />
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      n: "02",
      title: "Mistake intelligence",
      copy: "Turn wrong answers into a searchable history of the mistakes you actually make.",
      to: "/common-mistakes",
      preview: (
        <div className="space-y-1.5">
          {["Forgot the inner derivative", "Missing units in context", "Wrong interval of integration"].map((t, i) => (
            <motion.div
              key={t}
              initial={reduced ? { opacity: 1 } : { opacity: 0, x: 8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 24, delay: 0.07 * i }}
              className="truncate rounded-lg border border-border px-2.5 py-1.5 text-[11px] text-muted-foreground"
            >
              {t}
            </motion.div>
          ))}
        </div>
      ),
    },
    {
      n: "03",
      title: "Score optimization",
      copy: "See your mastery and know exactly what deserves your study time next.",
      to: "/command-center",
      preview: (
        <div className="flex items-end gap-1.5">
          {[44, 58, 66, 72, 81, 86].map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-sm bg-primary/70"
              initial={reduced ? { height: h } : { height: 4 }}
              whileInView={{ height: h }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 70, damping: 18, delay: 0.05 * i }}
              style={{ maxHeight: 86 }}
            />
          ))}
        </div>
      ),
    },
  ];

  return (
    <Section className="border-t border-border">
      <SectionHeading
        label="06 · three pillars"
        title="Built around what actually moves your preparation forward."
      />
      <div className="mt-14 grid gap-4 md:grid-cols-3 lg:gap-6">
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.07}>
            <Link
              to={p.to}
              className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-card transition-all hover:border-primary/35 hover:shadow-elevated sm:p-8"
            >
              <MicroLabel>{p.n}</MicroLabel>
              <h3 className="mt-4 font-display text-xl font-semibold leading-tight">{p.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{p.copy}</p>
              <div className="mt-8 flex min-h-[6.5rem] items-end rounded-2xl border border-border bg-background p-4">
                <div className="w-full">{p.preview}</div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
