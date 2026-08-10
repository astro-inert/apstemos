import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { isSubjectLive, type SubjectConfig } from "@/lib/subjects";
import { ComingSoon, Reveal, Section, SectionHeading, MicroLabel } from "./primitives";

const FORMULA_GUIDE = "/latex-master-sheet";

const RESOURCES = [
  { n: "01", title: "FRQ Library", copy: "Past AP FRQs organized by topic and question.", to: "/frqs-by-type" },
  { n: "02", title: "Topic Rundowns", copy: "Concise, exam-focused concept reviews.", to: "/topic-rundown" },
  {
    n: "03",
    title: "Formula & Strategy Guide",
    copy: "A beautiful LaTeX-rendered last-minute review.",
    to: FORMULA_GUIDE,
  },
  {
    n: "04",
    title: "Exam Strategy",
    copy: "Calculator techniques, timing, and exam-specific tactics.",
    to: "/exam-strategy",
  },
];

export function ResourcesSection({ subject }: { subject: SubjectConfig }) {
  const live = isSubjectLive(subject.id);

  return (
    <Section className="border-t border-border">
      <SectionHeading
        label="07 · resources"
        title="Everything else you need for exam day."
        sub={live ? undefined : `${subject.navLabel} resources are being written now.`}
      />
      <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {RESOURCES.map((r, i) => {
          const body = (
            <>
              <div className="flex items-start justify-between">
                <MicroLabel>{r.n}</MicroLabel>
                {live ? (
                  <ArrowUpRight className="h-3.5 w-3.5 text-subtle transition-all group-hover:-translate-y-0.5 group-hover:text-primary" />
                ) : null}
              </div>
              <h3 className="mt-6 font-display text-[15px] font-semibold leading-tight">{r.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{r.copy}</p>
              {live ? null : <ComingSoon className="mt-5 self-start" />}
            </>
          );
          return (
            <Reveal key={r.title} delay={i * 0.05}>
              {live ? (
                <Link
                  to={r.to}
                  className="group flex h-full flex-col bg-card p-6 transition-colors hover:bg-elevated/60 sm:p-7"
                >
                  {body}
                </Link>
              ) : (
                <div
                  aria-disabled
                  className="flex h-full flex-col bg-card p-6 opacity-70 sm:p-7"
                >
                  {body}
                </div>
              )}
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
