import { Reveal, Section, MicroLabel } from "./primitives";

export function ManifestoSection() {
  return (
    <Section className="border-t border-border">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <MicroLabel className="mb-6">Putting it together · one complete feedback loop</MicroLabel>
          <h2 className="font-display text-3xl font-semibold leading-[1.05] sm:text-5xl">
            One question can change what you study next.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-secondary-foreground">
            A missed answer updates the relevant topic, enters your Answer Log, connects to the mistake behind it, opens targeted Navigator guidance, and informs what you practice next.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-12 grid gap-px overflow-hidden border-y border-border bg-border sm:grid-cols-3">
            {["Find the gap", "Understand the mistake", "Return with a target"].map((t) => (
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
