import { Link } from "@tanstack/react-router";
import { ChevronDown, Sigma } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const resources = [
  { to: "/self-study-guide", label: "Self-Study Guide" },
  { to: "/topic-rundown", label: "Topic Rundown" },
  { to: "/108-points-breakdown", label: "108 Points Breakdown" },
  { to: "/frqs-by-type", label: "FRQs by Type" },
] as const;

export function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 glass px-6 py-3 border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-8 min-w-0">
          <Link to="/" className="flex items-center gap-2 font-display text-base font-bold tracking-tight shrink-0">
            <span className="grid place-items-center h-7 w-7 rounded-md bg-primary text-primary-foreground">
              <Sigma className="h-4 w-4" strokeWidth={2.5} />
            </span>
            <span>APCalc<span className="text-muted-foreground font-medium">/ExamPrep</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-1 text-sm">
            <div className="group relative">
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-elevated transition-colors">
                Resources
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-60 glass rounded-lg shadow-elevated opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-1.5 flex flex-col">
                {resources.map((r) => (
                  <Link
                    key={r.to}
                    to={r.to}
                    className="px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-elevated transition-colors"
                  >
                    {r.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/ab-track" className="px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-elevated transition-colors">
              AB Track
            </Link>
            <Link to="/bc-track" className="px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-elevated transition-colors">
              BC Track
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle />
          <Link
            to="/self-study-guide"
            className="hidden sm:inline-flex items-center px-3.5 py-1.5 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Start studying
          </Link>
        </div>
      </div>
    </nav>
  );
}
