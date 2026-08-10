import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubjectContentGate } from "@/components/SubjectContentGate";

export const Route = createFileRoute("/frqs-by-type")({
  head: () => ({
    meta: [
      { title: "FRQ Library — AP STEM OS" },
      {
        name: "description",
        content:
          "AP Calc FRQs #1–6 organized by topic, with links to every past FRQ from 2000–2025 for AB and BC.",
      },
      { property: "og:title", content: "FRQ Library — AP STEM OS" },
      { property: "og:description", content: "Every past AP Calculus FRQ #1–6, organized by question type." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],

  }),
  component: () => (
    <SubjectContentGate>
      <FRQsByType />
    </SubjectContentGate>
  ),
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
    return <p className="text-[13px] italic text-muted-foreground">No years.</p>;
  }
  return (
    <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
      {years.map((y) => (
        <a
          key={y}
          href={frqLink(y, track, num)}
          target="_blank"
          rel="noopener noreferrer"
          className="num rounded-lg border border-border bg-card px-2 py-2 text-center text-[12px] font-medium transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
        >
          {y}
        </a>
      ))}
    </div>
  );
}

function TypeHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="micro-label mb-3 border-b border-border pb-2 text-foreground">
      {children}
    </h3>
  );
}

function TrackLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="num mb-4 inline-block rounded-full border border-border bg-elevated/60 px-2.5 py-0.5 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
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
    <section className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">{children}</section>
  );
}

function SectionTitle({ num }: { num: number }) {
  return (
    <h2 className="font-display text-xl font-semibold tracking-[-0.02em] sm:text-2xl">FRQ #{num}</h2>
  );
}

function FRQsByType() {
  return (
    <PageShell
      eyebrow="frq library"
      title={<>FRQs by <span className="text-primary">type</span>.</>}
      description="FRQs 1, 3, and 4 are shared between AB and BC; FRQs 2, 5, and 6 differ between the two exams. Click any year to open that FRQ on College Board."
    >
      <Tabs defaultValue="1" className="w-full">
        <TabsList className="mb-8 grid h-auto w-full grid-cols-3 gap-1 rounded-2xl border border-border bg-card p-1 sm:grid-cols-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <TabsTrigger
              key={n}
              value={String(n)}
              className="num rounded-xl py-2.5 text-[12px] font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              FRQ #{n}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="1">
          <Section>
            <SectionTitle num={1} />
            <p className="mt-2 mb-6 text-[13px] text-muted-foreground">Shared between AB &amp; BC.</p>
            <TypeHeading>Interpretation</TypeHeading>
            <YearGrid years={ALL_YEARS} track="AB" num={1} />
          </Section>
        </TabsContent>

        <TabsContent value="2">
          <Section>
            <SectionTitle num={2} />
            <p className="mt-2 mb-6 text-[13px] text-muted-foreground">Differs between AB and BC.</p>
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
            <p className="mt-2 mb-6 text-[13px] text-muted-foreground">Shared between AB &amp; BC.</p>
            <TypeHeading>Miscellaneous</TypeHeading>
            <YearGrid years={ALL_YEARS} track="AB" num={3} />
          </Section>
        </TabsContent>

        <TabsContent value="4">
          <Section>
            <SectionTitle num={4} />
            <p className="mt-2 mb-6 text-[13px] text-muted-foreground">Shared between AB &amp; BC.</p>
            <TypeHeading>Extrema and Derivative Tests</TypeHeading>
            <YearGrid years={ALL_YEARS} track="AB" num={4} />
          </Section>
        </TabsContent>

        <TabsContent value="5">
          <Section>
            <SectionTitle num={5} />
            <p className="mt-2 mb-6 text-[13px] text-muted-foreground">Differs between AB and BC.</p>
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
            <p className="mt-2 mb-6 text-[13px] text-muted-foreground">Differs between AB and BC.</p>
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
