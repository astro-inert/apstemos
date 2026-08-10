import { createFileRoute } from "@tanstack/react-router";
import { Calculator, Clock, Route as RouteIcon, type LucideIcon } from "lucide-react";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/exam-strategy")({
  head: () => ({
    meta: [
      { title: "Exam Strategy — AP STEM OS" },
      {
        name: "description",
        content:
          "Calculator usage, timing plans, and efficient approaches to recurring AP question types — the exam-day playbook.",
      },
      { property: "og:title", content: "Exam Strategy — AP STEM OS" },
      { property: "og:description", content: "Calculator tips, timing triage, and efficient question-type approaches." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExamStrategy,
});

const sections: { icon: LucideIcon; eyebrow: string; title: string; sub: string }[] = [
  {
    icon: Calculator,
    eyebrow: "01",
    title: "Calculator usage",
    sub: "Which tasks the graphing calculator is for, and worked examples of each.",
  },
  {
    icon: Clock,
    eyebrow: "02",
    title: "Timing",
    sub: "Per-section pacing and point-per-minute triage so you never leave points on the table.",
  },
  {
    icon: RouteIcon,
    eyebrow: "03",
    title: "Efficient approaches",
    sub: "How to attack the recurring question types in the fewest steps.",
  },
];

function ExamStrategy() {
  return (
    <PageShell
      eyebrow="strategy"
      title={<>Convert what you know into <span className="text-primary">points</span>.</>}
      description="Calculator usage, timing, and efficient approaches to recurring question types — how to convert what you know into the maximum number of points."
    >
      <div className="grid gap-4">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <section key={s.title} className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-7">
              <div className="flex items-start gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="micro-label">{s.eyebrow}</div>
                  <h2 className="mt-2 font-display text-[16px] font-semibold leading-tight">{s.title}</h2>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{s.sub}</p>
                  <div className="mt-5 rounded-2xl border border-dashed border-border bg-elevated/40 px-4 py-5 text-[13px] text-muted-foreground">
                    Content coming soon.
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </PageShell>
  );
}
