import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/frqs-by-type")({
  head: () => ({
    meta: [
      { title: "FRQs by Type — APCalcExamPrep" },
      { name: "description", content: "A detailed rundown of AP Calculus FRQs #1–6 with past examples from 2010–2026, for both AB and BC." },
    ],
  }),
  component: FRQsByType,
});

const frqs = [1, 2, 3, 4, 5, 6] as const;

function FRQsByType() {
  return (
    <PageShell
      eyebrow="FRQs by Type"
      title="FRQs by Type"
      description="Good news: AP Calc FRQs are one of the most predictable. Master FRQs #1–6 by using this detailed rundown of the question types asked for each one, including past examples from 2010–2026, whether you're taking AB or BC."
    >
      <div className="space-y-5">
        {frqs.map((n) => (
          <section
            key={n}
            className="p-8 bg-card rounded-lg border border-border"
          >
            <h2 className="font-display text-2xl font-bold text-primary mb-4">
              FRQ #{n}
            </h2>

            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold text-foreground mb-1">Description</h3>
                <p className="text-muted-foreground">
                  [Add a short description of the question types typically asked in FRQ #{n}.]
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-1">AB notes</h3>
                <p className="text-muted-foreground">
                  [Add AB-specific notes for FRQ #{n}.]
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-1">BC notes</h3>
                <p className="text-muted-foreground">
                  [Add BC-specific notes for FRQ #{n}.]
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Past examples (2010–2026)
                </h3>
                <ul className="text-muted-foreground list-disc pl-5 space-y-1">
                  <li>[Year] — [topic / brief note]</li>
                  <li>[Year] — [topic / brief note]</li>
                  <li>[Year] — [topic / brief note]</li>
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
