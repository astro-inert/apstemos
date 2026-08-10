import type { ReactNode } from "react";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import { useCurrentSubject } from "@/lib/use-subject";

/**
 * Shared chrome for every page: atmospheric background, top nav, footer.
 * Identical framework to the subject home pages.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const subjectId = useCurrentSubject();

  return (
    <div
      data-subject={subjectId}
      className="subject-theme relative flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem]">
        <div className="absolute inset-0 atmosphere opacity-70" />
        <div className="absolute inset-0 bg-grid opacity-40" />
      </div>

      <SiteNav subject={subjectId} />
      <main className="min-w-0 flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
