import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/frqs-by-type")({
  head: () => ({
    meta: [
      { title: "FRQs by Type — APCalcExamPrep" },
      {
        name: "description",
        content:
          "AP Calc FRQs #1–6 by type, with links to every past FRQ from 2000–2026 for AB and BC.",
      },
    ],
  }),
  component: FRQsByType,
});

const YEARS = Array.from({ length: 27 }, (_, i) => 2000 + i); // 2000..2026

function frqLink(year: number, track: "AB" | "BC", num: number) {
  const q = encodeURIComponent(
    `${year} AP Calculus ${track} FRQ #${num} collegeboard pdf`,
  );
  return `https://www.google.com/search?q=${q}`;
}

function SharedYearGrid({ num }: { num: number }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-2">
      {YEARS.map((y) => (
        <a
          key={y}
          href={frqLink(y, "AB", num)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center px-3 py-2 rounded-md border border-border bg-card hover:bg-primary/10 hover:border-primary text-sm font-medium transition-colors"
        >
          {y}
        </a>
      ))}
    </div>
  );
}

function TrackYearGrid({ num, track }: { num: number; track: "AB" | "BC" }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-2">
      {YEARS.map((y) => (
        <a
          key={y}
          href={frqLink(y, track, num)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center px-3 py-2 rounded-md border border-border bg-card hover:bg-primary/10 hover:border-primary text-sm font-medium transition-colors"
        >
          {y}
        </a>
      ))}
    </div>
  );
}

function TypeTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
      {children}
    </span>
  );
}

function SharedSection({ num, type }: { num: number; type: string }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <TypeTag>{type}</TypeTag>
        <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
          Shared • AB &amp; BC
        </span>
      </div>
      <p className="text-sm text-muted-foreground">
        Click a year to open that FRQ on College Board.
      </p>
      <SharedYearGrid num={num} />
    </div>
  );
}

function SplitSection({
  num,
  ab,
  bc,
}: {
  num: number;
  ab: { type: string; note?: string }[];
  bc: { type: string; note?: string }[];
}) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-display text-xl font-bold text-foreground">AB</span>
          {ab.map((t) => (
            <TypeTag key={t.type}>{t.type}</TypeTag>
          ))}
        </div>
        <TrackYearGrid num={num} track="AB" />
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-display text-xl font-bold text-foreground">BC</span>
          {bc.map((t) => (
            <TypeTag key={t.type}>{t.type}</TypeTag>
          ))}
        </div>
        <TrackYearGrid num={num} track="BC" />
      </div>
    </div>
  );
}

function FRQsByType() {
  return (
    <PageShell
      eyebrow="FRQs by Type"
      title="FRQs by Type"
      description="FRQs 1, 3, and 4 are shared between AB and BC; FRQs 2, 5, and 6 differ between the two exams."
    >
      <Tabs defaultValue="1" className="w-full">
        <TabsList className="grid grid-cols-6 w-full mb-8">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <TabsTrigger key={n} value={String(n)} className="font-bold">
              FRQ #{n}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="1">
          <section className="p-8 bg-card rounded-lg border border-border">
            <h2 className="font-display text-2xl font-bold text-primary mb-6">FRQ #1</h2>
            <SharedSection num={1} type="Interpretation" />
          </section>
        </TabsContent>

        <TabsContent value="2">
          <section className="p-8 bg-card rounded-lg border border-border">
            <h2 className="font-display text-2xl font-bold text-primary mb-6">FRQ #2</h2>
            <SplitSection
              num={2}
              ab={[{ type: "Interpretation" }]}
              bc={[{ type: "Parametric" }, { type: "Polar" }]}
            />
          </section>
        </TabsContent>

        <TabsContent value="3">
          <section className="p-8 bg-card rounded-lg border border-border">
            <h2 className="font-display text-2xl font-bold text-primary mb-6">FRQ #3</h2>
            <SharedSection num={3} type="Miscellaneous" />
          </section>
        </TabsContent>

        <TabsContent value="4">
          <section className="p-8 bg-card rounded-lg border border-border">
            <h2 className="font-display text-2xl font-bold text-primary mb-6">FRQ #4</h2>
            <SharedSection num={4} type="Extrema and Derivative Tests" />
          </section>
        </TabsContent>

        <TabsContent value="5">
          <section className="p-8 bg-card rounded-lg border border-border">
            <h2 className="font-display text-2xl font-bold text-primary mb-6">FRQ #5</h2>
            <SplitSection
              num={5}
              ab={[{ type: "Miscellaneous" }]}
              bc={[{ type: "Miscellaneous" }]}
            />
          </section>
        </TabsContent>

        <TabsContent value="6">
          <section className="p-8 bg-card rounded-lg border border-border">
            <h2 className="font-display text-2xl font-bold text-primary mb-6">FRQ #6</h2>
            <SplitSection
              num={6}
              ab={[{ type: "Miscellaneous" }]}
              bc={[{ type: "Series" }]}
            />
          </section>
        </TabsContent>
      </Tabs>
    </PageShell>
  );
}
