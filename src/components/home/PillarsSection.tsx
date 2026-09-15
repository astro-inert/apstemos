import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { isSubjectLive, type SubjectConfig } from "@/lib/subjects";
import { ComingSoon, MicroLabel, Reveal, Section, SectionHeading } from "./primitives";

export function PillarsSection({ subject }: { subject: SubjectConfig }) {
  const reduced = useReducedMotion();
  const live = isSubjectLive(subject.id);
  const calculus = subject.id === "calc-bc";

  const pillars = [
    {
      n: "01",
      title: "Practice",
       copy: calculus ? "Practice gives you 2,000+ AP-style questions and builds your performance history." : `Practice builds your ${subject.navLabel} performance history from AP-style questions.`,
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
       title: "Understand your performance",
       copy: "Score Command Center shows your strengths, weaknesses, and unit mastery. Answer Log keeps a record of what you've answered and what you've missed. Common Mistakes Database helps you identify, understand, and remember the mistakes behind your wrong answers.",
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
       title: "Learn how to improve",
       copy: "Question Type Navigator teaches you how to approach MCQs and FRQs for the same subtopics you're practicing.",
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
         label="One connected workflow"
         title="Everything works together."
      />
      <div className="mt-14 grid gap-4 md:grid-cols-3 lg:gap-6">
        {pillars.map((p, i) => {
          const clickable = live || p.to === "/command-center";
          const Card: React.ElementType = clickable ? Link : "div";
          return (
          <Reveal key={p.title} delay={i * 0.07}>
            <Card
              {...(clickable ? ({ to: p.to } as never) : {})}
             className={`group flex h-full flex-col border-t-2 border-border bg-card p-6 sm:p-8 ${
                 clickable ? "transition-colors hover:border-primary" : "opacity-80"
              }`}
            >
              <MicroLabel>{p.n}</MicroLabel>
              <h3 className="mt-4 font-display text-xl font-semibold leading-tight">{p.title}</h3>
               <p className="mt-3 text-[14px] leading-relaxed text-secondary-foreground">{p.copy}</p>
              {clickable ? null : <ComingSoon className="mt-4 self-start" />}
               <div className="mt-8 flex min-h-[6.5rem] items-end border-t border-border bg-background p-4">
                <div className="w-full">{p.preview}</div>
              </div>
            </Card>
          </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
