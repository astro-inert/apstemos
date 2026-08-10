import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { findTopic, type UnitEntry, type TopicEntry } from "@/lib/question-navigator-data";
import { ArrowLeft, FileText, ListChecks, MessageSquareQuote, AlertTriangle, Sparkles} from "lucide-react";

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
          { name: "description", content: `Question-type breakdown for ${loaderData.topic.title}: MCQ patterns, FRQ patterns, common mistakes.` },
        ]
      : [{ title: "Question Type Navigator" }],
  }),
  notFoundComponent: () => (
    <PageShell eyebrow="Not Found" title="Unknown topic" description="That topic isn't in the navigator yet.">
      <Link to="/question-navigator" className="text-primary hover:underline text-sm">← Back to all units</Link>
    </PageShell>
  ),
  component: Page,
});

const sections = [
  { icon: ListChecks, title: "How to answer MCQs on this topic", desc: "The recurring multiple-choice setups College Board reuses on this topic — calc and no-calc." },
  { icon: FileText, title: "How to answer FRQs on this topic", desc: "Free-response prompts and sub-part chains that show up year after year." },
  { icon: MessageSquareQuote, title: "Typical College Board Wording", desc: "Stem phrasing and verb choices (justify, explain, interpret) used in released exams." },
  { icon: AlertTriangle, title: "Common Mistakes", desc: "Where students lose points — unit slips, sign errors, missing justifications." },
  { icon: Sparkles, title: "Representative Examples", desc: "Worked exemplars that capture the canonical version of this question type." },
] as const;

function Page() {
  const { unit, topic } = Route.useLoaderData() as { unit: UnitEntry; topic: TopicEntry };

  return (
    <PageShell
      eyebrow={`Unit ${unit.number} · ${topic.title}`}
      title={<>How College Board tests <span className="text-pink-400">{topic.title}</span></>}
      description={topic.blurb}
    >
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <Link
          to="/question-navigator/$unitId"
          params={{ unitId: unit.slug }}
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Unit {unit.number} topics
        </Link>
        <Link
          to="/question-navigator"
          className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition"
        >
          All units
        </Link>
      </div>

      <div className="mb-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
        // how to answer this topic
      </div>
      <div className="grid gap-3">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <section key={s.title} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-start gap-4">
                <div className="grid place-items-center h-9 w-9 shrink-0 rounded-lg bg-pink-500/10 text-pink-400 ring-1 ring-pink-500/20">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-display font-semibold">{s.title}</div>
                  <div className="text-sm text-muted-foreground mt-1">{s.desc}</div>
                  <div className="mt-4 rounded-lg border border-dashed border-border bg-elevated/40 px-4 py-5 text-sm text-muted-foreground">
                    Content coming soon.
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </PageShell>
  ),
  component: Page,
});

const sections = [
  { icon: ListChecks, title: "How to answer MCQs on this topic", desc: "The recurring multiple-choice setups College Board reuses on this topic — calc and no-calc." },
  { icon: FileText, title: "How to answer FRQs on this topic", desc: "Free-response prompts and sub-part chains that show up year after year." },
  { icon: MessageSquareQuote, title: "Typical College Board Wording", desc: "Stem phrasing and verb choices (justify, explain, interpret) used in released exams." },
  { icon: AlertTriangle, title: "Common Mistakes", desc: "Where students lose points — unit slips, sign errors, missing justifications." },
  { icon: Sparkles, title: "Representative Examples", desc: "Worked exemplars that capture the canonical version of this question type." },
] as const;

function Page() {
  const { unit, topic } = Route.useLoaderData() as { unit: UnitEntry; topic: TopicEntry };

  return (
    <PageShell
      eyebrow={`Unit ${unit.number} · ${topic.title}`}
      title={<>How College Board tests <span className="text-pink-400">{topic.title}</span></>}
      description={topic.blurb}
    >
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <Link
          to="/question-navigator/$unitId"
          params={{ unitId: unit.slug }}
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Unit {unit.number} topics
        </Link>
        <Link
          to="/question-navigator"
          className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition"
        >
          All units
        </Link>
      </div>

      <div className="rounded-2xl border border-dashed border-pink-500/30 bg-pink-500/5 p-5 mb-8 flex items-start gap-4">
        <div className="grid place-items-center h-10 w-10 rounded-lg bg-pink-500/10 text-pink-400 ring-1 ring-pink-500/20 shrink-0">
          <Download className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="font-display font-semibold">Question-type PDF · coming soon</div>
          <div className="text-sm text-muted-foreground mt-1">
            A dedicated PDF for <span className="text-foreground font-medium">{topic.title}</span> — MCQ patterns, FRQ patterns, typical wording, common mistakes, and representative examples — will live here. The navigation is ready; the resource is being authored.
          </div>
        </div>
      </div>

      <div className="mb-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
        // what the PDF will cover
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.title} className="rounded-xl border border-border bg-card p-5">
              <div className="grid place-items-center h-9 w-9 rounded-lg bg-pink-500/10 text-pink-400 ring-1 ring-pink-500/20">
                <Icon className="h-4.5 w-4.5" />
              </div>
              <div className="font-display font-semibold mt-3">{s.title}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.desc}</div>
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}
