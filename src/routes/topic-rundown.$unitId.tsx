import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/PageShell";
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
    <PageShell
      eyebrow={`Topic Rundown · Unit ${unit.number}`}
      title={unit.title}
      description={unit.blurb}
    >
      <div className="mb-6">
        <Link
          to="/topic-rundown"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All units
        </Link>
      </div>

      <div className="grid gap-3">
        {unit.topics.map((t: TopicEntry) => (
          <section key={t.slug} className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-display font-semibold">{t.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{t.blurb}</p>
            <div className="mt-4 rounded-lg border border-dashed border-border bg-elevated/40 px-4 py-5 text-sm text-muted-foreground">
              Content coming soon.
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
