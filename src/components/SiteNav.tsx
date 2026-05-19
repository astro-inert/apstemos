import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";

const resources = [
  { to: "/self-study-guide", label: "Self-Study Guide" },
  { to: "/topic-rundown", label: "Topic Rundown" },
  { to: "/108-points-breakdown", label: "108 Points Breakdown" },
  { to: "/frqs-by-type", label: "FRQs by Type" },
] as const;

export function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 bg-primary text-primary-foreground px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-display text-xl font-bold tracking-tight text-primary-foreground">
            AP<span style={{ color: "var(--primary-light)" }}>Calc</span>ExamPrep
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <div className="group relative cursor-pointer">
              <div className="flex items-center gap-1 hover:text-white/80 transition-colors py-2">
                Resources
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </div>
              <div className="absolute top-full left-0 mt-1 w-60 bg-card text-foreground rounded-lg shadow-xl ring-1 ring-black/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2 flex flex-col gap-1">
                {resources.map((r) => (
                  <Link
                    key={r.to}
                    to={r.to}
                    className="px-4 py-2 hover:bg-muted rounded-md text-sm transition-colors"
                    activeProps={{ className: "px-4 py-2 bg-muted rounded-md text-sm text-primary font-semibold" }}
                  >
                    {r.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/ab-track" className="hover:text-white/80 transition-colors">
              AB Track
            </Link>
            <Link to="/bc-track" className="hover:text-white/80 transition-colors">
              BC Track
            </Link>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 rounded-full text-sm font-semibold bg-white text-primary hover:bg-white/90 transition-colors">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}
