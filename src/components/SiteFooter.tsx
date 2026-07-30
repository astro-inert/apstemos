import { Sigma } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="px-6 py-12 border-t border-border mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-2 text-sm">
          <span className="grid place-items-center h-6 w-6 rounded-md bg-primary text-primary-foreground">
            <Sigma className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
          <span className="font-display font-bold">AP STEM PerformanceOS</span>
          <span className="text-muted-foreground/70">— the performance OS for every AP STEM exam.</span>
        </div>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          <span className="text-muted-foreground/60">© 2026 · Not affiliated with College Board</span>
        </div>
      </div>
    </footer>
  );
}
