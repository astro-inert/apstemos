import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { Section, SectionHeading, MicroLabel } from "./primitives";

const STAGES = [
  {
    name: "Practice",
    caption: "You answer an AP-style question.",
    fragment: (
      <div className="space-y-1.5">
        {["Interpretation", "Chain rule", "Accumulation"].map((c, i) => (
          <div
            key={c}
            className={`flex items-center justify-between rounded-lg border px-2.5 py-1.5 text-[11px] ${
              i === 1 ? "border-primary/40 bg-accent/50 text-primary" : "border-border text-muted-foreground"
            }`}
          >
            {c}
            {i === 1 ? <span className="num">selected</span> : null}
          </div>
        ))}
      </div>
    ),
  },
  {
    name: "Diagnose",
    caption: "Your mastery updates immediately.",
    fragment: (
      <div>
        <div className="flex items-baseline justify-between text-[11px]">
          <span className="text-muted-foreground">Chain Rule</span>
          <span className="num text-primary">
            <span className="text-subtle line-through">68%</span> 74%
          </span>
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-elevated">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: "68%" }}
            whileInView={{ width: "74%" }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 70, damping: 18, delay: 0.2 }}
          />
        </div>
      </div>
    ),
  },
  {
    name: "Understand",
    caption: "The mistake behind the miss is named.",
    fragment: (
      <div className="rounded-lg border border-border px-2.5 py-2">
        <div className="micro-label">mistake</div>
        <div className="mt-1 text-[11px] font-medium">Forgot the inner derivative</div>
        <div className="num mt-1 text-[10px] text-muted-foreground">tagged · 3rd time</div>
      </div>
    ),
  },
  {
    name: "Target",
    caption: "A recommendation appears at the top of your plan.",
    fragment: (
      <div className="rounded-lg border border-primary/30 bg-accent/40 px-2.5 py-2">
        <div className="num text-[10px] text-primary">01</div>
        <div className="mt-0.5 text-[11px] font-medium">Composite functions</div>
        <div className="num text-[10px] text-muted-foreground">targeted practice · 8 questions</div>
      </div>
    ),
  },
  {
    name: "Repeat",
    caption: "The next question is chosen from your weakest points.",
    fragment: (
      <div className="space-y-1.5">
        <div className="num text-[10px] text-subtle">next question</div>
        <div className="rounded-lg border border-border px-2.5 py-2 text-[11px]">
          MCQ · Unit 3 · Hard
          <span className="num mt-1 block text-[10px] text-muted-foreground">chosen from 2 weak subtopics</span>
        </div>
      </div>
    ),
  },
];

export function PipelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 45%"] });
  const raw = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const signal = useSpring(raw, { stiffness: 60, damping: 20 });

  return (
    <Section id="the-system">
      <SectionHeading
        label="01 · the loop"
        title="Every answer changes what comes next."
        sub="One continuous system: practice feeds diagnosis, diagnosis feeds targeting, targeting decides the next question you see."
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

        <ol className="grid gap-10 lg:grid-cols-5 lg:gap-5">
          {STAGES.map((s, i) => (
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
                className="mt-4 rounded-2xl border border-border bg-card p-3.5 shadow-card"
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
