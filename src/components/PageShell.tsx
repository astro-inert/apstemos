import type { ReactNode } from "react";
import { AppShell } from "./AppShell";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
}

export function PageShell({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <AppShell>
      <div className="px-4 py-6 sm:px-6 lg:px-10 lg:py-10 max-w-6xl">
        <div className="mb-8">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">// {eyebrow}</div>
          <h1 className="font-display text-3xl lg:text-4xl font-bold tracking-tight leading-tight">{title}</h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-2xl">{description}</p>
        </div>
        {children}
      </div>
    </AppShell>
  );
}
