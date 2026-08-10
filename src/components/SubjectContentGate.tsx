import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { SUBJECTS, isSubjectLive } from "@/lib/subjects";
import { useCurrentSubject } from "@/lib/use-subject";

/**
 * Calculus-only tools are shared routes. When a student is browsing another AP
 * subject, show a "content coming soon" page instead of Calculus content.
 */
export function SubjectContentGate({ children }: { children: React.ReactNode }) {
  const subjectId = useCurrentSubject();
  if (isSubjectLive(subjectId)) return <>{children}</>;

  const subject = SUBJECTS[subjectId];
  return (
    <PageShell
      eyebrow={`${subject.navLabel} · in development`}
      title="Content coming soon"
      description={`This tool is live for AP Calculus BC/AB today. The ${subject.navLabel} version is being written now — your Score Command Center already shows the real exam structure in the meantime.`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <Link
          to="/command-center"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[14px] font-semibold text-primary-foreground"
        >
          Open the Score Command Center <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-[14px] font-semibold transition-colors hover:border-primary/40"
        >
          Switch to AP Calculus
        </Link>
      </div>
    </PageShell>
  );
}
