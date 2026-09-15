import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/home/primitives";
import { findTopic, type UnitEntry, type TopicEntry } from "@/lib/question-navigator-data";
import { ArrowLeft, FileText, ListChecks, MessageSquareQuote, AlertTriangle, Sparkles } from "lucide-react";
import { SubjectContentGate } from "@/components/SubjectContentGate";
import { getTopicGuide } from "@/lib/navigator-guides";
import { getUnit2TopicGuide } from "@/lib/navigator-guides-unit2";
import { GuideRenderer } from "@/components/navigator/GuideRenderer";

export const Route = createFileRoute("/question-navigator/$unitId/$topicId")({
  loader: ({ params }): { unit: UnitEntry; topic: TopicEntry } => {
    const found = findTopic(params.unitId, params.topicId);
    if (!found) throw notFound();
    return found;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.topic.title} — Unit ${loaderData.unit.number} — Question Type Navigator` },
          { name: "description", content: `Question-type breakdown for ${loaderData.topic.title}: recognition, MCQ strategy, FRQ strategy, worked examples, and common mistakes.` },
          { property: "og:title", content: `${loaderData.topic.title} — question types` },
          { property: "og:description", content: `How to recognize and execute AP Calculus questions testing ${loaderData.topic.title}.` },
        ]
      : [{ title: "Question Type Navigator" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <PageShell eyebrow="not found" title="Unknown topic" description="That topic isn't in the navigator yet.">
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

const sections = [
  { icon: ListChecks, title: "How to answer MCQs on this topic", desc: "Recognition cues, decision rules, and recurring multiple-choice structures." },
  { icon: FileText, title: "How to answer FRQs on this topic", desc: "Setup, notation, justification, interpretation, and execution for free response." },
  { icon: MessageSquareQuote, title: "Recognition patterns", desc: "What the prompt is really asking and the first mathematical move to make." },
  { icon: AlertTriangle, title: "Common mistakes", desc: "How to detect and prevent the errors that derail otherwise-correct work." },
  { icon: Sparkles, title: "Representative examples", desc: "Original worked examples that model the recognition → method → execution workflow." },
] as const;

function Page() {
  const { unit, topic } = Route.useLoaderData() as { unit: UnitEntry; topic: TopicEntry };
  const guide = getTopicGuide(topic.slug) ?? getUnit2TopicGuide(topic.slug);

  return (
    <PageShell
      eyebrow={`unit ${unit.number} · ${unit.title.toLowerCase()}`}
      title={topic.title}
      description={guide ? undefined : topic.blurb}
    >
      <div className="mb-8 flex flex-wrap items-center gap-5">
        <Link
          to="/question-navigator/$unitId"
          params={{ unitId: unit.slug }}
          className="micro-label inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Unit {unit.number} topics
        </Link>
        <Link to="/question-navigator" className="micro-label transition-colors hover:text-foreground">
          All units
        </Link>
      </div>

      {guide ? <GuideRenderer guide={guide} /> : (
        <div className="grid gap-4">
          {sections.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={Math.min(i, 6) * 0.04}>
                <section className="border-t-2 border-border bg-card p-6 sm:p-7">
                  <div className="flex items-start gap-4">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-display text-[15px] font-semibold leading-tight">{s.title}</div>
                      <div className="mt-2 text-[13px] leading-relaxed text-secondary-foreground">{s.desc}</div>
                      <div className="mt-5 border-l-2 border-dashed border-border bg-elevated/40 px-4 py-5 text-[13px] text-muted-foreground">
                        Content coming soon.
                      </div>
                    </div>
                  </div>
                </section>
              </Reveal>
            );
          })}
        </div>
      )}
    </PageShell>
  );
}
