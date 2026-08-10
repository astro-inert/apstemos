import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/home/primitives";
import { findUnit, type UnitEntry } from "@/lib/question-navigator-data";
import { ArrowLeft, ChevronRight, FileText } from "lucide-react";

export const Route = createFileRoute("/question-navigator/$unitId/")({
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
          { property: "og:title", content: `Unit ${loaderData.unit.number}: ${loaderData.unit.title}` },
          { property: "og:description", content: `MCQ and FRQ patterns for ${loaderData.unit.title}.` },
        ]
      : [{ title: "Question Type Navigator" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <PageShell eyebrow="not found" title="Unknown unit" description="That unit isn't in the navigator.">
      <Link to="/question-navigator" className="text-[14px] text-primary hover:underline">
        ← Back to all units
      </Link>
    </PageShell>
  ),
  component: Page,
});

function Page() {
  const { unit } = Route.useLoaderData() as { unit: UnitEntry };

  return (
    <PageShell
      eyebrow={`unit ${unit.number} · ${unit.weight} of the exam`}
      title={unit.title}
      description={unit.blurb}
    >
      <div className="mb-8">
        <Link
          to="/question-navigator"
          className="micro-label inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All units
        </Link>
      </div>

      <div className="micro-label mb-5">topics · click for question-type breakdown</div>

      <div className="grid gap-4 sm:grid-cols-2">
        {unit.topics.map((t, i) => (
          <Reveal key={t.slug} delay={Math.min(i, 6) * 0.04}>
            <Link
              to="/question-navigator/$unitId/$topicId"
              params={{ unitId: unit.slug, topicId: t.slug }}
              className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-card transition-all hover:border-primary/35 hover:shadow-elevated"
            >
              <div className="flex items-start justify-between">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                  <FileText className="h-4.5 w-4.5" />
                </div>
                <ChevronRight className="h-4 w-4 text-subtle transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
              <div className="mt-5 font-display text-[15px] font-semibold leading-tight">{t.title}</div>
              <div className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{t.blurb}</div>
            </Link>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
