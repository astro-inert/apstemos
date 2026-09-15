import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { HOME_DEMO } from "@/lib/home-demo";
import { isSubjectLive, type SubjectConfig } from "@/lib/subjects";
import { ComingSoon, MicroLabel, Reveal, Section, SectionHeading } from "./primitives";

export function MistakesSection({ subject }: { subject: SubjectConfig }) {
  const m = HOME_DEMO[subject.id].mistake;
  const live = isSubjectLive(subject.id);
  return (
    <Section className="border-t border-border">
      <SectionHeading
        label="Answer Log + Common Mistakes Database"
        title="Don't just see what you got wrong. Understand why."
        sub="The Answer Log preserves each result. For a missed question, the Common Mistakes Database helps you name the underlying error, see its consequence, and remember how to avoid it."
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-6">
        <Reveal className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-9">
            <MicroLabel>Question missed → Find the mistake → Tag it</MicroLabel>
          <h3 className="mt-3 max-w-lg font-display text-xl font-semibold leading-tight sm:text-2xl">{m.title}</h3>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
                <MicroLabel>Example and AP consequence</MicroLabel>
              <p className="mt-3 text-[14px] leading-relaxed text-secondary-foreground">{m.whatHappens}</p>
            </div>
            <div>
               <MicroLabel>How to avoid it</MicroLabel>
              <p className="mt-3 text-[14px] leading-relaxed text-secondary-foreground">
                Before calculating, identify whether the question asks for:
              </p>
              <ul className="mt-3 space-y-1.5">
                {m.howToAvoid.map((x) => (
                  <li key={x} className="num flex items-center gap-2 text-[12px] text-foreground/80">
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
            <div>
              <MicroLabel>Your history</MicroLabel>
              <div className="num mt-1.5 text-[13px]">Tagged {m.tagged} times</div>
            </div>
            {live ? (
              <Link
                to="/common-mistakes"
                className="group inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary"
              >
                Open the database
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ) : (
              <ComingSoon />
            )}
          </div>
        </Reveal>

        <Reveal delay={0.08} className="rounded-2xl border border-border bg-elevated/50 p-6 sm:p-9">
            <MicroLabel>Can't find your mistake?</MicroLabel>
            <h3 className="mt-3 font-display text-lg font-semibold leading-tight">Describe it to the built-in AI.</h3>
          <p className="mt-3 text-[14px] leading-relaxed text-secondary-foreground">
            Describe what went wrong and add a reviewed draft to your own mistake history.
          </p>
          {live ? (
            <Link
              to="/common-mistakes"
               className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40"
            >
              Explore Common Mistakes
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <div className="mt-6">
              <ComingSoon />
            </div>
          )}
          <div className="mt-8 border-t border-border bg-background p-4">
            <div className="micro-label">draft entry</div>
            <div className="mt-2 space-y-2 text-[12px] text-muted-foreground">
              <div className="rounded-lg border border-border px-2.5 py-2">Title · auto-drafted</div>
              <div className="rounded-lg border border-border px-2.5 py-2">Why it happens</div>
              <div className="rounded-lg border border-border px-2.5 py-2">How to avoid it</div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
