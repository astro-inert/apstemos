import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { findUnit, type UnitEntry } from "@/lib/question-navigator-data";
import { ArrowLeft, ChevronRight, FileText } from "lucide-react";

export const Route = createFileRoute("/question-navigator/$unitId")({
  loader: ({ params }): { unit: UnitEntry } => {
    const unit = findUnit(params.unitId);
    if (!unit) throw notFound();
    return { unit };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `Unit ${loaderData.unit.number}: ${loaderData.unit.title} — Question Type Navigator` },
          { name: "description", content: `MCQ and FRQ patterns for Unit ${loaderData.unit.number}: ${loaderData.unit.title}.` },
        ]
      : [{ title: "Question Type Navigator" }],
  }),
  notFoundComponent: () => (
    <PageShell eyebrow="Not Found" title="Unknown unit" description="That unit isn't in the navigator.">
      <Link to="/question-navigator" className="text-primary hover:underline text-sm">← Back to all units</Link>
    </PageShell>
  ),
  component: Page,
});

function Page() {
  const { unit } = Route.useLoaderData() as { unit: UnitEntry };

  return (
    <PageShell
      eyebrow={`Unit ${unit.number} · ${unit.weight} of the exam`}
      title={<><span className="text-violet-400">{unit.title}</span></>}
      description={unit.blurb}
    >
      <div className="mb-6">
        <Link
          to="/question-navigator"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All units
        </Link>
      </div>

      <div className="mb-4 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
        // Topics · click for question-type breakdown
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {unit.topics.map((t) => (
          <Link
            key={t.slug}
            to="/question-navigator/$unitId/$topicId"
            params={{ unitId: unit.slug, topicId: t.slug }}
            className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 hover-lift transition hover:border-violet-500/40"
          >
            <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full blur-3xl opacity-60 bg-gradient-to-br from-violet-500/20 to-transparent" />
            <div className="relative flex items-start justify-between">
              <div className="grid place-items-center h-10 w-10 rounded-lg bg-violet-500/10 text-violet-400 ring-1 ring-violet-500/20">
                <FileText className="h-5 w-5" />
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition" />
            </div>
            <div className="relative font-display font-semibold mt-4">{t.title}</div>
            <div className="relative text-sm text-muted-foreground mt-1">{t.blurb}</div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
