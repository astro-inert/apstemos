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
               {calculus ? <>Don't let practice end at<br /><span className="text-primary">“correct” or “incorrect.”</span></> : <>Stop studying.<br />Start <span className="text-primary">optimizing</span>.</>}
            </h2>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-secondary-foreground">
              {isSubjectLive(subject.id)
                 ? calculus
                   ? "Make every question useful. Practice. See where you stand. Understand what went wrong. Learn how the question type works. Fix the weakness. Do it again."
                   : "Answer your first question and let AP STEM OS start building your study plan."
                : `The ${subject.navLabel} question bank is being built now — the loop above is exactly how it will work.`}
            </p>
            <div className="mt-9">
              {isSubjectLive(subject.id) ? (
                <MagneticLink to="/practice">
                  Start practicing
                  <ArrowRight className="h-4 w-4" />
                </MagneticLink>
              ) : (
                <ComingSoon />
              )}
            </div>
            <p className="num mt-7 text-[12px] text-muted-foreground">
               {calculus ? "2,000+ AP-style questions waiting." : "Free forever · No credit card · Built for the AP exam"}
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
