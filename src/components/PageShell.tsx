import type { ReactNode } from "react";
import { AppShell } from "./AppShell";
import { Reveal } from "./home/primitives";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}

export function PageShell({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <AppShell>
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-12 sm:px-8 sm:pt-16">
        <Reveal className="mb-12 sm:mb-14">
          <div className="micro-label">{eyebrow}</div>
          <h1 className="mt-5 max-w-3xl font-display text-3xl font-semibold leading-[1.06] tracking-[-0.035em] sm:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">{description}</p>
          ) : null}
        </Reveal>
        {children}
      </div>
    </AppShell>
  );
}
