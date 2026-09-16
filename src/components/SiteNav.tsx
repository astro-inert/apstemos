import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronDown, LogOut, Menu, X } from "lucide-react";

import { SubjectSwitcher } from "./SubjectSwitcher";
import { supabase } from "@/integrations/supabase/client";
import { SUBJECTS, type SubjectId } from "@/lib/subjects";
import logoAsset from "@/assets/ap-stem-os-logo.png.asset.json";

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
    navigate({ to: "/auth", search: { next: undefined }, replace: true });
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "glass border-b border-border" : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-3 py-2.5 min-[380px]:px-4 sm:gap-3 sm:px-8 sm:py-3 md:flex md:gap-4">
        <div className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-center gap-1.5 min-[380px]:gap-2 sm:gap-3 lg:flex lg:flex-initial lg:gap-4">
          <Link
            to={SUBJECTS[subject].path}
            aria-label="AP STEM OS home"
            className="inline-flex shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <img src={logoAsset.url} alt="AP STEM OS" className="h-7 w-auto max-w-[5.5rem] object-contain min-[380px]:max-w-[6.5rem] sm:h-9 sm:max-w-none" />
          </Link>
          <span className="hidden h-4 w-px shrink-0 bg-border min-[420px]:block" />
          <div className="min-w-0 flex-1 lg:flex-initial">
            <SubjectSwitcher current={subject} />
          </div>
        </div>

        <div className="ml-auto hidden items-center gap-1 md:flex">
          <NavLink to="/practice">Practice</NavLink>
          <NavLink to="/predict">Diagnostic</NavLink>
          <NavLink to="/command-center">Score Command Center</NavLink>
          <div className="group relative">
            <button className="inline-flex min-h-10 items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] font-medium text-secondary-foreground transition-colors hover:bg-elevated hover:text-foreground">
              Resources
              <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
            </button>
            <div className="invisible absolute right-0 top-full mt-1 w-64 rounded-md border border-border bg-popover p-1.5 opacity-0 shadow-elevated transition-all group-hover:visible group-hover:opacity-100">
              {resources.map((r) => (
                <Link
                  key={r.to}
                  to={r.to}
                  className="block rounded-sm px-3 py-2 text-[13px] text-secondary-foreground transition-colors hover:bg-elevated hover:text-foreground"
                >
                  {r.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 md:ml-0">
          
          {signedIn ? (
            <button
              onClick={signOut}
              className="hidden min-h-10 items-center gap-1.5 rounded-full border border-border px-4 py-2 text-[13px] font-medium text-secondary-foreground transition-colors hover:border-primary/40 hover:text-foreground md:inline-flex"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          ) : (
            <Link
              to="/practice"
              className="hidden min-h-10 items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-[13px] font-semibold text-primary-foreground shadow-card transition-colors hover:bg-primary/90 md:inline-flex"
            >
              Start practicing →
            </Link>
          )}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-card md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-navigation" className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background px-5 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-1">
            <MobileLink to="/practice" onClick={() => setOpen(false)}>
              Practice
            </MobileLink>
            <MobileLink to="/predict" onClick={() => setOpen(false)}>
              Diagnostic
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
              className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-md border border-border px-4 py-3 text-[13px] font-medium text-secondary-foreground"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          ) : (
            <Link
              to="/practice"
              onClick={() => setOpen(false)}
              className="mt-5 flex items-center justify-center rounded-md bg-primary px-4 py-3 text-[13px] font-semibold text-primary-foreground"
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
      className="rounded-full px-3.5 py-2 text-[13px] font-medium text-secondary-foreground transition-colors hover:bg-elevated hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      activeProps={{ className: "rounded-full bg-elevated px-3.5 py-2 text-[13px] font-semibold text-foreground" }}
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
      className="rounded-md px-3 py-3 text-[14px] text-secondary-foreground transition-colors hover:bg-elevated hover:text-foreground"
    >
      {children}
    </Link>
  );
}
