import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/home/primitives";
import { findUnit, type UnitEntry } from "@/lib/question-navigator-data";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { SubjectContentGate } from "@/components/SubjectContentGate";

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
  component: () => (
    <SubjectContentGate>
      <Page />
    </SubjectContentGate>
  ),
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

      <div className="border-y border-border">
        {unit.topics.map((t, i) => (
          <Reveal key={t.slug} delay={Math.min(i, 6) * 0.04}>
            <Link
              to="/question-navigator/$unitId/$topicId"
              params={{ unitId: unit.slug, topicId: t.slug }}
              className="group grid h-full grid-cols-[3rem_minmax(0,1fr)_auto] gap-4 border-b border-border bg-card px-2 py-6 transition-colors hover:bg-elevated/60 sm:grid-cols-[4rem_minmax(0,1fr)_auto] sm:px-4"
            >
              <div className="num text-lg font-semibold text-primary">{String(i + 1).padStart(2, "0")}</div>
              <div>
                <div className="font-display text-[16px] font-semibold leading-tight">{t.title}</div>
                <div className="mt-2 text-[14px] leading-relaxed text-secondary-foreground">{t.blurb}</div>
              </div>
              <ChevronRight className="mt-1 h-4 w-4 text-subtle transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
