import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/home/primitives";
import { QN_UNITS, type TopicEntry, type UnitEntry } from "@/lib/question-navigator-data";

export const Route = createFileRoute("/topic-rundown/$unitId")({
  loader: ({ params }) => {
    const unit = QN_UNITS.find((u) => u.slug === params.unitId);
    if (!unit) throw notFound();
    return { unit };
  },
  head: ({ loaderData }) => {
    const title = loaderData?.unit
      ? `Unit ${loaderData.unit.number}: ${loaderData.unit.title} — Topic Rundown`
      : "Topic Rundown — AP STEM OS";
    const description = loaderData?.unit
      ? `Exam-focused rundown of every core concept in ${loaderData.unit.title}.`
      : "Exam-focused unit rundowns for AP Calculus.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: Page,
});

function Page() {
  const { unit } = Route.useLoaderData() as { unit: UnitEntry };

  return (
    <PageShell eyebrow={`topic rundown · unit ${unit.number}`} title={unit.title} description={unit.blurb}>
      <div className="mb-8">
        <Link
          to="/topic-rundown"
          className="micro-label inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All units
        </Link>
      </div>

      <div className="grid gap-4">
        {unit.topics.map((t: TopicEntry, i: number) => (
          <Reveal key={t.slug} delay={Math.min(i, 6) * 0.04}>
            <section className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-7">
              <h2 className="font-display text-[16px] font-semibold leading-tight">{t.title}</h2>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{t.blurb}</p>
              <div className="mt-5 rounded-2xl border border-dashed border-border bg-elevated/40 px-4 py-5 text-[13px] text-muted-foreground">
                Content coming soon.
              </div>
            </section>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
