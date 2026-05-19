import type { ReactNode } from "react";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
}

export function PageShell({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <header className="px-6 pt-16 pb-12 math-grid">
        <div className="max-w-5xl mx-auto space-y-5 animate-bounce-in">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            {eyebrow}
          </div>
          <h1 className="font-display text-5xl lg:text-6xl font-extrabold tracking-tight leading-[0.95]">{title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{description}</p>
        </div>
      </header>
      <main className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}
