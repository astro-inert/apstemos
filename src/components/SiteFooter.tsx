import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="px-6 py-12 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-8 text-sm font-semibold text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Use</a>
          <a href="#" className="hover:text-primary transition-colors">Contact</a>
        </div>
        <p className="text-sm text-muted-foreground/70">© 2026 APCalcExamPrep. Not affiliated with College Board.</p>
      </div>
    </footer>
  );
}
