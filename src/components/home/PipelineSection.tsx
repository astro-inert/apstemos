import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { LaTeX } from "@/components/LaTeX";
import { HOME_DEMO } from "@/lib/home-demo";
import type { SubjectConfig } from "@/lib/subjects";
import { Section, SectionHeading, MicroLabel } from "./primitives";

export function PipelineSection({ subject }: { subject: SubjectConfig }) {
  const loop = HOME_DEMO[subject.id].loop;
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 45%"] });
  const raw = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const signal = useSpring(raw, { stiffness: 60, damping: 20 });

  const calculus = subject.id === "calc-bc";
  const stages = [
    {
      name: "Practice",
      caption: `You answer an AP ${subject.navLabel.replace("AP ", "")}-style question.`,
      fragment: (
        <div className="space-y-1.5">
          {loop.practiceTopics.map((c, i) => (
            <div
              key={c}
              className={`flex items-center justify-between gap-2 rounded-lg border px-2.5 py-1.5 text-[11px] ${
                i === 1 ? "border-primary/40 bg-accent/50 text-primary" : "border-border text-muted-foreground"
              }`}
            >
              <span className="min-w-0 truncate">{c}</span>
              {i === 1 ? <span className="num shrink-0">selected</span> : null}
            </div>
          ))}
        </div>
      ),
    },
    {
       name: "Score Command Center",
       caption: "Every answer updates your strengths, weaknesses, and unit mastery by subtopic.",
      fragment: (
        <div>
          <div className="flex items-baseline justify-between gap-2 text-[11px]">
            <span className="min-w-0 truncate text-muted-foreground">{loop.diagnose.topic}</span>
            <span className="num shrink-0 text-primary">
              <span className="text-subtle line-through">{loop.diagnose.from}%</span> {loop.diagnose.to}%
            </span>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-elevated">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: `${loop.diagnose.from}%` }}
              whileInView={{ width: `${loop.diagnose.to}%` }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 70, damping: 18, delay: 0.2 }}
            />
          </div>
        </div>
      ),
    },
    {
       name: "Common Mistakes",
       caption: "Return to missed questions and identify the mistake behind each wrong answer.",
      fragment: (
        <div className="rounded-lg border border-border px-2.5 py-2">
          <div className="micro-label">mistake</div>
          <div className="mt-1 text-[11px] font-medium">
            <LaTeX>{loop.mistake.label}</LaTeX>
          </div>
          <div className="num mt-1 text-[10px] text-muted-foreground">
            tagged · {loop.mistake.count}rd time
          </div>
        </div>
      ),
    },
    {
       name: "Question Type Navigator",
       caption: "Open the same subtopic for MCQ and FRQ guidance, methods, conditions, and common traps.",
      fragment: (
        <div className="rounded-lg border border-primary/30 bg-accent/40 px-2.5 py-2">
          <div className="num text-[10px] text-primary">01</div>
          <div className="mt-0.5 text-[11px] font-medium">{loop.target.topic}</div>
          <div className="num text-[10px] text-muted-foreground">
            targeted practice · {loop.target.questions} questions
          </div>
        </div>
      ),
    },
    {
       name: "Return to Practice",
       caption: "Use what you learned to choose what to practice next.",
      fragment: (
        <div className="space-y-1.5">
          <div className="num text-[10px] text-subtle">next question</div>
          <div className="rounded-lg border border-border px-2.5 py-2 text-[11px]">
            {loop.next.label}
            <span className="num mt-1 block text-[10px] text-muted-foreground">{loop.next.note}</span>
          </div>
        </div>
      ),
    },
  ];
  if (calculus) {
    stages.push({
      name: "Repeat",
       caption: "Keep building a clearer picture of what you know and what still needs work.",
      fragment: (
        <div className="space-y-1.5">
          <div className="num text-[10px] text-subtle">next question</div>
           <div className="rounded-lg border border-border px-2.5 py-2 text-[11px]">{loop.next.label}<span className="num mt-1 block text-[10px] text-muted-foreground">Practice → Score Command Center → Common Mistakes → Question Type Navigator</span></div>
        </div>
      ),
    });
  }

  return (
    <Section id="the-system">
      <SectionHeading
         label="Practice → Score Command Center → Common Mistakes → Question Type Navigator"
         title="Every answer gives you more than a score."
         sub={`Each question you answer updates your Score Command Center, giving you a clearer picture of your strengths and weaknesses by unit and subtopic. When you miss a question, return to it in your Answer Log, identify what went wrong in the Common Mistakes Database, and use the Question Type Navigator to learn how to approach that subtopic on both MCQs and FRQs for ${subject.navLabel}.`}
      />

      <div ref={ref} className="relative mt-16">
        {/* the rail */}
        <div className="pointer-events-none absolute left-[13px] top-2 bottom-2 w-px bg-border lg:left-0 lg:right-0 lg:top-[13px] lg:bottom-auto lg:h-px lg:w-auto">
          <motion.div
            className="absolute left-0 top-0 w-px bg-primary lg:h-px lg:w-auto"
            style={
              reduced
                ? { height: "100%", width: "100%" }
                : ({ height: signal, width: signal } as never)
            }
          />
        </div>

        <ol className={`grid gap-10 lg:gap-5 ${calculus ? "lg:grid-cols-6" : "lg:grid-cols-5"}`}>
          {stages.map((s, i) => (
            <li key={s.name} className="relative pl-10 lg:pl-0 lg:pt-10">
              <span className="absolute left-0 top-1 grid h-[27px] w-[27px] place-items-center rounded-full border border-border bg-background lg:left-0 lg:top-0">
                <span className="num text-[10px] text-primary">{i + 1}</span>
              </span>
              <MicroLabel>{s.name}</MicroLabel>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{s.caption}</p>
              <motion.div
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ type: "spring", stiffness: 110, damping: 20, delay: 0.08 * i }}
               className="mt-4 border-t border-border bg-card p-3.5"
              >
                {s.fragment}
              </motion.div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
