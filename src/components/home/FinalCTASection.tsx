import { ArrowRight } from "lucide-react";
import { isSubjectLive, type SubjectConfig } from "@/lib/subjects";
import { MagneticLink } from "./HeroSection";
import { ComingSoon, Reveal, Section } from "./primitives";

export function FinalCTASection({ subject }: { subject: SubjectConfig }) {
  const calculus = subject.id === "calc-bc";
  return (
    <Section className="border-t border-border">
      <div className="relative overflow-hidden border-y border-border bg-card px-6 py-16 sm:px-12 sm:py-24">
        <div className="relative">
          <Reveal>
            <h2 className="max-w-2xl font-display text-4xl font-semibold leading-[0.98] sm:text-6xl">
               Stop studying.<br />Start <span className="text-primary">optimizing.</span>
            </h2>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-secondary-foreground">
              {isSubjectLive(subject.id)
                  ? "Choose a unit and subtopic, answer a question, and start building a clearer picture of what you know."
                : `The ${subject.navLabel} question bank is being built now — the loop above is exactly how it will work.`}
            </p>
            <div className="mt-9">
              {isSubjectLive(subject.id) ? (
                <MagneticLink to="/practice">
                  Start Practicing
                  <ArrowRight className="h-4 w-4" />
                </MagneticLink>
              ) : (
                <ComingSoon />
              )}
            </div>
            <p className="num mt-7 text-[12px] text-muted-foreground">
                {calculus ? "Choose a unit, subtopic, and difficulty to begin." : `${subject.navLabel} content coming soon.`}
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
