import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { HOME_DEMO } from "@/lib/home-demo";
import type { SubjectConfig } from "@/lib/subjects";
import { MicroLabel, Reveal, Section, SectionHeading } from "./primitives";

export function MistakesSection({ subject }: { subject: SubjectConfig }) {
  const m = HOME_DEMO[subject.id].mistake;
  return (
    <Section className="border-t border-border">
      <SectionHeading
        label="04 · mistake intelligence"
        title="Your mistakes shouldn't disappear."
        sub="Every wrong answer can be tagged to a mistake — so the same error stops being a surprise."
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-6">
        <Reveal className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-9">
          <MicroLabel>Common mistake</MicroLabel>
          <h3 className="mt-3 max-w-lg font-display text-xl font-semibold leading-tight sm:text-2xl">{m.title}</h3>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <MicroLabel>What happens</MicroLabel>
              <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{m.whatHappens}</p>
            </div>
            <div>
              <MicroLabel>How to avoid it</MicroLabel>
              <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
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
            <Link
              to="/common-mistakes"
              className="group inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary"
            >
              Open the database
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="rounded-3xl border border-border bg-elevated/50 p-6 shadow-card sm:p-9">
          <MicroLabel>Not in the database?</MicroLabel>
          <h3 className="mt-3 font-display text-lg font-semibold leading-tight">Can't find your mistake?</h3>
          <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
            Describe what went wrong in plain language. It gets structured into an entry only you can see, taggable from
            your answer log.
          </p>
          <Link
            to="/common-mistakes"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40"
          >
            Describe it
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <div className="mt-8 rounded-2xl border border-border bg-background p-4">
            <div className="micro-label">draft entry</div>
            <div className="mt-2 space-y-2 text-[12px] text-muted-foreground">
              <div className="rounded-lg border border-border px-2.5 py-1.5">Title · auto-drafted</div>
              <div className="rounded-lg border border-border px-2.5 py-1.5">Why it happens</div>
              <div className="rounded-lg border border-border px-2.5 py-1.5">How to avoid it</div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
