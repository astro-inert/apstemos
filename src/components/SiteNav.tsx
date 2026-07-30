import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { SubjectSwitcher } from "./SubjectSwitcher";
import { supabase } from "@/integrations/supabase/client";
import type { SubjectId } from "@/lib/subjects";

const resources = [
  { to: "/108-points-breakdown", label: "108-Point Map" },
  { to: "/common-mistakes", label: "Common Mistakes" },
  { to: "/topic-rundown", label: "Topic Rundowns" },
  { to: "/frqs-by-type", label: "FRQ Library" },
  { to: "/exam-strategy", label: "Exam Strategy" },
  { to: "/question-navigator", label: "Question Navigator" },
  { to: "/latex-master-sheet", label: "Formula Sheet" },
] as const;

export function SiteNav({ subject = "calc-bc" }: { subject?: SubjectId }) {
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setSignedIn(!!data.user));
    const { data: sub } = supabase.auth.onAuthStateChange((_, session) => setSignedIn(!!session?.user));
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <nav className="sticky top-0 z-50 glass px-6 py-3 border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-8 min-w-0">
          <SubjectSwitcher current={subject} />
          <div className="hidden md:flex items-center gap-1 text-sm">
            <div className="group relative">
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-elevated transition-colors">
                Resources
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-60 glass rounded-lg shadow-elevated opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-1.5 flex flex-col">
                {resources.map((r) => (
                  <Link key={r.to} to={r.to} className="px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-elevated transition-colors">
                    {r.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/common-mistakes" className="px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-elevated transition-colors">
              Common Mistakes
            </Link>
            <Link to="/108-points-breakdown" className="px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-elevated transition-colors">
              108-Point Map
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle />
          {signedIn ? (
            <Link to="/command-center" className="inline-flex items-center px-3.5 py-1.5 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
              Open dashboard
            </Link>
          ) : (
            <>
              <Link to="/auth" className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground">
                Sign in
              </Link>
              <Link to="/auth" className="inline-flex items-center px-3.5 py-1.5 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                Start free
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
