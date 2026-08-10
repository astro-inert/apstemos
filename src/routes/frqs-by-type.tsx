import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/frqs-by-type")({
  head: () => ({
    meta: [
      { title: "FRQ Library — AP STEM OS" },
      {
        name: "description",
        content:
          "AP Calc FRQs #1–6 organized by topic, with links to every past FRQ from 2000–2025 for AB and BC.",
      },
    ],
  }),
  component: FRQsByType,
});

// Years 2000-2025, excluding 2020 (no exam)
const ALL_YEARS = Array.from({ length: 26 }, (_, i) => 2000 + i).filter((y) => y !== 2020);

function frqLink(year: number, track: "AB" | "BC", num: number) {
  const q = encodeURIComponent(
    `${year} AP Calculus ${track} FRQ #${num} collegeboard pdf`,
  );
  return `https://www.google.com/search?q=${q}`;
}

function YearGrid({ years, track, num }: { years: number[]; track: "AB" | "BC"; num: number }) {
  if (years.length === 0) {
    return <p className="text-sm text-muted-foreground italic">No years.</p>;
  }
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-px bg-border border border-border">
      {years.map((y) => (
        <a
          key={y}
          href={frqLink(y, track, num)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center px-2 py-2 bg-card hover:bg-primary hover:text-primary-foreground text-sm font-mono font-medium transition-colors"
        >
          {y}
        </a>
      ))}
    </div>
  );
}

function TypeHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-foreground border-b border-foreground/30 pb-2 mb-3">
      {children}
    </h3>
  );
}

function TrackLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground mb-4">
      {children}
    </div>
  );
}

// ---- Data: BC FRQ #2 split by topic ----
const BC_Q2_PARAMETRIC = [2000, 2003, 2011, 2012, 2015, 2016, 2018, 2021, 2022, 2023, 2024];
const BC_Q2_POLAR = [2005, 2010, 2013, 2014, 2017, 2019, 2025];
// Years where #2 was neither (rate/table/area) — show for completeness
const BC_Q2_OTHER = ALL_YEARS.filter(
  (y) => !BC_Q2_PARAMETRIC.includes(y) && !BC_Q2_POLAR.includes(y),
);

function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="p-6 sm:p-8 bg-card border border-border">{children}</section>
  );
}

function SectionTitle({ num }: { num: number }) {
  return (
    <h2 className="font-display text-2xl font-bold text-foreground mb-1">FRQ #{num}</h2>
  );
}

function FRQsByType() {
  return (
    <PageShell
      eyebrow="FRQs by Type"
      title="FRQs by Type"
      description="FRQs 1, 3, and 4 are shared between AB and BC; FRQs 2, 5, and 6 differ between the two exams. Click any year to open that FRQ on College Board."
    >
      <Tabs defaultValue="1" className="w-full">
        <TabsList className="grid grid-cols-6 w-full mb-8 rounded-none border border-border bg-card p-0 h-auto">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <TabsTrigger
              key={n}
              value={String(n)}
              className="font-bold rounded-none border-r border-border last:border-r-0 py-3 data-[state=active]:bg-foreground data-[state=active]:text-background"
            >
              FRQ #{n}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="1">
          <Section>
            <SectionTitle num={1} />
            <p className="text-sm text-muted-foreground mb-6">Shared between AB &amp; BC.</p>
            <TypeHeading>Interpretation</TypeHeading>
            <YearGrid years={ALL_YEARS} track="AB" num={1} />
          </Section>
        </TabsContent>

        <TabsContent value="2">
          <Section>
            <SectionTitle num={2} />
            <p className="text-sm text-muted-foreground mb-6">Differs between AB and BC.</p>
            <div className="space-y-8">
              <div>
                <TrackLabel>AB</TrackLabel>
                <TypeHeading>Interpretation / Mixed Topics</TypeHeading>
                <YearGrid years={ALL_YEARS} track="AB" num={2} />
              </div>
              <div>
                <TrackLabel>BC</TrackLabel>
                <div className="space-y-6">
                  <div>
                    <TypeHeading>Parametric</TypeHeading>
                    <YearGrid years={BC_Q2_PARAMETRIC} track="BC" num={2} />
                  </div>
                  <div>
                    <TypeHeading>Polar</TypeHeading>
                    <YearGrid years={BC_Q2_POLAR} track="BC" num={2} />
                  </div>
                  <div>
                    <TypeHeading>Other (Pre-2012 — Rate / Table / Area)</TypeHeading>
                    <YearGrid years={BC_Q2_OTHER} track="BC" num={2} />
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="3">
          <Section>
            <SectionTitle num={3} />
            <p className="text-sm text-muted-foreground mb-6">Shared between AB &amp; BC.</p>
            <TypeHeading>Miscellaneous</TypeHeading>
            <YearGrid years={ALL_YEARS} track="AB" num={3} />
          </Section>
        </TabsContent>

        <TabsContent value="4">
          <Section>
            <SectionTitle num={4} />
            <p className="text-sm text-muted-foreground mb-6">Shared between AB &amp; BC.</p>
            <TypeHeading>Extrema and Derivative Tests</TypeHeading>
            <YearGrid years={ALL_YEARS} track="AB" num={4} />
          </Section>
        </TabsContent>

        <TabsContent value="5">
          <Section>
            <SectionTitle num={5} />
            <p className="text-sm text-muted-foreground mb-6">Differs between AB and BC.</p>
            <div className="space-y-8">
              <div>
                <TrackLabel>AB</TrackLabel>
                <TypeHeading>Miscellaneous</TypeHeading>
                <YearGrid years={ALL_YEARS} track="AB" num={5} />
              </div>
              <div>
                <TrackLabel>BC</TrackLabel>
                <TypeHeading>Miscellaneous</TypeHeading>
                <YearGrid years={ALL_YEARS} track="BC" num={5} />
              </div>
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="6">
          <Section>
            <SectionTitle num={6} />
            <p className="text-sm text-muted-foreground mb-6">Differs between AB and BC.</p>
            <div className="space-y-8">
              <div>
                <TrackLabel>AB</TrackLabel>
                <TypeHeading>Miscellaneous</TypeHeading>
                <YearGrid years={ALL_YEARS} track="AB" num={6} />
              </div>
              <div>
                <TrackLabel>BC</TrackLabel>
                <TypeHeading>Series</TypeHeading>
                <YearGrid years={ALL_YEARS} track="BC" num={6} />
              </div>
            </div>
          </Section>
        </TabsContent>
      </Tabs>
    </PageShell>
  );
}
