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
    <div data-subject={subjectId} className="subject-theme flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground">
      <SiteNav subject={subjectId} />
      <main className="min-w-0 flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
