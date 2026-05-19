import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/latex-master-sheet")({
  head: () => ({
    meta: [
      { title: "LaTeX 10-Page Master Sheet — APCalcExamPrep" },
      { name: "description", content: "A condensed 10-page LaTeX master sheet covering everything on the AP Calculus AB/BC exam." },
    ],
  }),
  component: LatexMasterSheet,
});

function LatexMasterSheet() {
  return (
    <PageShell
      eyebrow="Cram"
      title="LaTeX 10-Page Master Sheet"
      description="A condensed 10-page LaTeX master sheet covering everything on the AP Calculus AB/BC exam."
    >
      <p className="text-muted-foreground">[Content coming soon.]</p>
    </PageShell>
  );
}
