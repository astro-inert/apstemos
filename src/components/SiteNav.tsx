import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronDown, LogOut, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { SubjectSwitcher } from "./SubjectSwitcher";
import { supabase } from "@/integrations/supabase/client";
import type { SubjectId } from "@/lib/subjects";

const resources = [
  { to: "/frqs-by-type", label: "FRQ Library" },
  { to: "/topic-rundown", label: "Topic Rundowns" },
  { to: "/question-navigator", label: "Question Type Navigator" },
  { to: "/common-mistakes", label: "Common Mistakes" },
  { to: "/latex-master-sheet", label: "Formula & Strategy Guide" },
  { to: "/exam-strategy", label: "Exam Strategy" },
  { to: "/108-points-breakdown", label: "108-Point Map" },
] as const;

export function SiteNav({ subject = "calc-bc" }: { subject?: SubjectId }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let alive = true;
    supabase.auth.getSession().then(({ data }) => {
      if (alive) setSignedIn(Boolean(data.session));
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => setSignedIn(Boolean(session)));
    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  async function signOut() {
    setOpen(false);
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "glass border-b border-border" : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3.5 sm:px-8">
        <div className="flex min-w-0 items-center gap-4">
          <Link to="/" className="shrink-0 font-display text-[15px] font-semibold tracking-[-0.03em]">
            AP STEM OS
          </Link>
          <span className="hidden h-4 w-px bg-border sm:block" />
          <div className="hidden min-w-0 sm:block">
            <SubjectSwitcher current={subject} />
          </div>
        </div>

        <div className="ml-auto hidden items-center gap-1 md:flex">
          <NavLink to="/practice">Practice</NavLink>
          <NavLink to="/command-center">Score Command Center</NavLink>
          <div className="group relative">
            <button className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground">
              Resources
              <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
            </button>
            <div className="invisible absolute right-0 top-full mt-1 w-64 rounded-2xl border border-border bg-popover p-1.5 opacity-0 shadow-elevated transition-all group-hover:visible group-hover:opacity-100">
              {resources.map((r) => (
                <Link
                  key={r.to}
                  to={r.to}
                  className="block rounded-xl px-3 py-2 text-[13px] text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground"
                >
                  {r.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2 md:ml-0">
          <ThemeToggle />
          {signedIn ? (
            <button
              onClick={signOut}
              className="hidden items-center gap-1.5 rounded-full border border-border px-4 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          ) : (
            <Link
              to="/practice"
              className="hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[13px] font-semibold text-primary-foreground transition-shadow hover:shadow-glow sm:inline-flex"
            >
              Start practicing →
            </Link>
          )}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-border bg-background px-5 pb-6 pt-4 md:hidden">
          <div className="sm:hidden">
            <SubjectSwitcher current={subject} />
          </div>
          <div className="mt-4 flex flex-col gap-1">
            <MobileLink to="/practice" onClick={() => setOpen(false)}>
              Practice
            </MobileLink>
            <MobileLink to="/command-center" onClick={() => setOpen(false)}>
              Score Command Center
            </MobileLink>
            <div className="micro-label mb-1 mt-4 px-3">resources</div>
            {resources.map((r) => (
              <MobileLink key={r.to} to={r.to} onClick={() => setOpen(false)}>
                {r.label}
              </MobileLink>
            ))}
          </div>
          {signedIn ? (
            <button
              onClick={signOut}
              className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-full border border-border px-4 py-3 text-[13px] font-medium text-muted-foreground"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          ) : (
            <Link
              to="/practice"
              onClick={() => setOpen(false)}
              className="mt-5 flex items-center justify-center rounded-full bg-primary px-4 py-3 text-[13px] font-semibold text-primary-foreground"
            >
              Start practicing →
            </Link>
          )}
        </div>
      ) : null}
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="rounded-full px-3.5 py-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      activeProps={{ className: "rounded-full px-3.5 py-1.5 text-[13px] text-foreground" }}
    >
      {children}
    </Link>
  );
}

function MobileLink({ to, children, onClick }: { to: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="rounded-xl px-3 py-3 text-[14px] text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground"
    >
      {children}
    </Link>
  );
}
