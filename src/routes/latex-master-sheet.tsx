import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/home/primitives";
import { SubjectContentGate } from "@/components/SubjectContentGate";

const PDF_URL = "https://drive.google.com/file/d/1O6iD6MP3R_p4NZzZ4vt-7kVAHrUBYtdJ/view?usp=drive_open";

export const Route = createFileRoute("/latex-master-sheet")({
  head: () => ({
    meta: [
      { title: "Formula and Strategy Guide — AP STEM OS" },
      {
        name: "description",
        content:
          "A printable 10-page LaTeX-rendered summary of every AP Calculus formula plus the strategies to apply them correctly on the exam.",
      },
      { property: "og:title", content: "Formula and Strategy Guide — AP STEM OS" },
      { property: "og:description", content: "10 printable pages: every formula, and how to use it on the AP exam." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <SubjectContentGate>
      <FormulaGuide />
    </SubjectContentGate>
  ),
});

function FormulaGuide() {
  return (
    <PageShell
      eyebrow="cram"
      title="Formula and Strategy Guide"
      description="Ten LaTeX-rendered pages covering every formula the AP exam expects, plus the strategies to apply them correctly. Built as a last-minute review tool you can print and keep."
    >
      <Reveal>
        <a
          href={PDF_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-4 rounded-3xl border border-primary/30 bg-primary/5 p-6 shadow-card transition-colors hover:border-primary/60 sm:p-8"
        >
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/25">
            <Download className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="font-display text-[16px] font-semibold">Open the printable PDF</div>
            <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
              The full 10-page guide, typeset in LaTeX. Print it and keep it in your inventory for the week before the
              exam.
            </p>
          </div>
        </a>
      </Reveal>

      <Reveal delay={0.07} className="mt-4">
        <section className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
          <div className="flex items-start gap-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-elevated text-muted-foreground ring-1 ring-border">
              <FileText className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="font-display text-[16px] font-semibold">Read it in the app</div>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                The same ten pages, rendered in-app so you can use the guide without downloading anything.
              </p>
              <div className="mt-5 rounded-2xl border border-dashed border-border bg-elevated/40 px-4 py-5 text-[13px] text-muted-foreground">
                Content coming soon.
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </PageShell>
  );
}
