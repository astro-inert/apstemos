import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  Calculator,
  Compass,
  FileText,
  LayoutGrid,
  ListChecks,
  LogOut,
  Sigma,
  Target,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { ThemeToggle } from "./ThemeToggle";

const nav = [
  { to: "/command-center", icon: Activity, label: "Command Center" },
  { to: "/108-points-breakdown", icon: Target, label: "108-Point Map" },
  { to: "/common-mistakes", icon: AlertTriangle, label: "Common Mistakes" },
  { to: "/frqs-by-type", icon: ListChecks, label: "FRQ Library" },
  { to: "/topic-rundown", icon: LayoutGrid, label: "Topic Rundowns" },
  { to: "/question-navigator", icon: Compass, label: "Question Navigator" },
  { to: "/exam-strategy", icon: FileText, label: "Exam Strategy" },
  { to: "/latex-master-sheet", icon: Calculator, label: "Formula Sheet" },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r border-border bg-card/40 h-screen sticky top-0">
          <div className="p-4 border-b border-border">
            <Link to="/" className="flex items-center gap-2 font-display text-sm font-bold">
              <span className="grid place-items-center h-7 w-7 rounded-md bg-primary text-primary-foreground">
                <Sigma className="h-4 w-4" strokeWidth={2.5} />
              </span>
              <span>APCalc<span className="text-muted-foreground font-medium">/OS</span></span>
            </Link>
          </div>
          <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
            {nav.map((item) => {
              const active = pathname === item.to;
              const Icon = item.icon;
              return (
                <Link
                  key={item.to} to={item.to}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition ${
                    active
                      ? "bg-elevated text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-elevated/60"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="p-2 border-t border-border flex items-center justify-between">
            <ThemeToggle />
            <button
              onClick={signOut}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </aside>

        {/* Mobile top bar */}
        <div className="lg:hidden fixed top-0 inset-x-0 z-40 flex items-center justify-between px-4 py-3 border-b border-border bg-card/80 backdrop-blur">
          <Link to="/" className="flex items-center gap-2 font-display text-sm font-bold">
            <span className="grid place-items-center h-6 w-6 rounded-md bg-primary text-primary-foreground">
              <Sigma className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
            APCalc/OS
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button onClick={signOut} className="text-xs text-muted-foreground"><LogOut className="h-4 w-4" /></button>
          </div>
        </div>

        <main className="flex-1 min-w-0 lg:pl-0 pt-14 lg:pt-0">
          {/* Mobile bottom nav */}
          <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-card/95 backdrop-blur grid grid-cols-5">
            {nav.slice(0, 5).map((item) => {
              const active = pathname === item.to;
              const Icon = item.icon;
              return (
                <Link key={item.to} to={item.to} className={`flex flex-col items-center gap-0.5 py-2 text-[10px] ${active ? "text-primary" : "text-muted-foreground"}`}>
                  <Icon className="h-4 w-4" />
                  {item.label.split(" ")[0]}
                </Link>
              );
            })}
          </nav>
          <div className="pb-20 lg:pb-0">{children}</div>
        </main>
      </div>
    </div>
  );
}
