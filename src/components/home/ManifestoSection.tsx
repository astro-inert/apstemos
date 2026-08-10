import { Reveal, Section, MicroLabel } from "./primitives";

export function ManifestoSection() {
  return (
    <Section className="border-t border-border">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <MicroLabel className="mb-6">08 · free forever</MicroLabel>
          <h2 className="font-display text-3xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">
            Built for students. Free forever.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            AP STEM OS exists for one reason: to give AP students the tools to prepare intelligently for a 5 without
            putting them behind a paywall.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
            {["Free forever", "No credit card", "No premium tier"].map((t) => (
              <div key={t} className="num bg-card px-5 py-6 text-[11px] uppercase tracking-[0.18em] text-foreground/80">
                {t}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
