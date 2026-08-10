import { Sigma, Github } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="px-6 py-12 border-t border-border mt-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="flex items-center gap-2 text-sm">
              <span className="grid place-items-center h-6 w-6 rounded-md bg-primary text-primary-foreground">
                <Sigma className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
              <span className="font-display font-bold">AP STEM OS</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground max-w-xl leading-relaxed">
              An open-source, forever-free score optimization system for AP Calculus AB/BC, AP Physics 1, 2, C: Mechanics
              and C: E&amp;M, and AP Statistics. It isn't built to teach you everything deeply — it's built for the express
              purpose of earning a 5.
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-elevated transition"
            >
              <Github className="h-3.5 w-3.5" />
              Source on GitHub
            </a>
          </div>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground md:items-end">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            <span className="text-muted-foreground/60 md:text-right">© 2026 · Not affiliated with College Board</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
