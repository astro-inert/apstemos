import { Reveal, Section, MicroLabel } from "./primitives";
import type { SubjectConfig } from "@/lib/subjects";

export function ManifestoSection({ subject }: { subject: SubjectConfig }) {
  return (
    <Section className="border-t border-border">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <MicroLabel className="mb-6">The complete loop</MicroLabel>
          <h2 className="font-display text-3xl font-semibold leading-[1.05] sm:text-5xl">
            Practice again—with a better target.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-secondary-foreground">
            Your {subject.navLabel} units and subtopics stay consistent from the first answer through mastery data, mistake analysis, and question-type guidance.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-12 grid gap-px overflow-hidden border-y border-border bg-border sm:grid-cols-3">
            {["Practice → mastery data", "Weak areas → repeated mistakes", "Question-type guidance → practice again"].map((t) => (
              <div key={t} className="num bg-card px-5 py-6 text-[12px] font-medium text-foreground/80">
                {t}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
