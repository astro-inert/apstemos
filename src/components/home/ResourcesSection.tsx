import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { isSubjectLive, type SubjectConfig } from "@/lib/subjects";
import { ComingSoon, Reveal, Section, SectionHeading, MicroLabel } from "./primitives";

const FORMULA_GUIDE = "/latex-master-sheet";

export function ResourcesSection({ subject }: { subject: SubjectConfig }) {
  const live = isSubjectLive(subject.id);
  const course = subject.navLabel.replace("AP ", "");
  const resources = [
    { n: "01", title: "FRQ Library", copy: live ? "26 years of released AP Calculus FRQs organized by the topics they test, so you can quickly find real exam questions for what you're studying." : `Released ${subject.navLabel} FRQs organized by the topics they test.`, to: "/frqs-by-type" },
    { n: "02", title: "Topic Rundowns", copy: "Concise, exam-focused guides covering the essential concepts from every unit.", to: "/topic-rundown" },
    { n: "03", title: "Formula & Strategy Guide", copy: live ? "A printable, 10-page reference covering the formulas you need and the strategies for using them correctly." : `A focused reference for the formulas and strategies used in ${course}.`, to: FORMULA_GUIDE },
    { n: "04", title: "Exam Strategy", copy: `Detailed guidance on calculator use, timing, and approaching ${subject.navLabel} questions efficiently.`, to: "/exam-strategy" },
  ];

  return (
    <Section className="border-t border-border">
      <SectionHeading
        label={`Your ${subject.navLabel} toolkit`}
        title="Everything else you need for the exam."
        sub={live ? undefined : `${subject.navLabel} resources are being written now.`}
      />
       <div className="mt-14 grid gap-px overflow-hidden border-y border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
         {resources.map((r, i) => {
          const body = (
            <>
              <div className="flex items-start justify-between">
                <MicroLabel>{r.n}</MicroLabel>
                {live ? (
                  <ArrowUpRight className="h-3.5 w-3.5 text-subtle transition-all group-hover:-translate-y-0.5 group-hover:text-primary" />
                ) : null}
              </div>
              <h3 className="mt-6 font-display text-[15px] font-semibold leading-tight">{r.title}</h3>
               <p className="mt-2 text-[13px] leading-relaxed text-secondary-foreground">{r.copy}</p>
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
