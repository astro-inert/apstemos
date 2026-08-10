import { ArrowRight } from "lucide-react";
import { isSubjectLive, type SubjectConfig } from "@/lib/subjects";
import { MagneticLink } from "./HeroSection";
import { ComingSoon, Reveal, Section } from "./primitives";

export function FinalCTASection({ subject }: { subject: SubjectConfig }) {
  return (
    <Section className="border-t border-border">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 shadow-instrument sm:px-12 sm:py-24">
        <div className="pointer-events-none absolute inset-0 opacity-90 atmosphere" />
        <div className="relative">
          <Reveal>
            <h2 className="max-w-2xl font-display text-4xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
              Stop studying.
              <br />
              Start <span className="text-primary">optimizing</span>.
            </h2>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
              {isSubjectLive(subject.id)
                ? "Answer your first question and let AP STEM OS start building your study plan."
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
            <p className="num mt-7 text-[11px] uppercase tracking-[0.16em] text-subtle">
              Free forever · No credit card · Built for the AP exam
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
