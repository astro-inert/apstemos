import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/exam-strategy")({
  head: () => ({
    meta: [
      { title: "Exam Strategy — APCalcExamPrep" },
      { name: "description", content: "Section-by-section strategy for maximizing your AP Calculus AB/BC score on exam day." },
    ],
  }),
  component: ExamStrategy,
});

function ExamStrategy() {
  return (
    <PageShell
      eyebrow="Strategy"
      title="Exam Strategy"
      description="Section-by-section strategy for maximizing your AP Calculus AB/BC score on exam day."
    >
      <p className="text-muted-foreground">[Content coming soon.]</p>
    </PageShell>
  );
}
