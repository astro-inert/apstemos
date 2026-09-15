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
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-10 sm:px-8 sm:pt-14">
        <Reveal className="mb-12 border-b border-border pb-9 sm:mb-14 sm:pb-11">
          <div className="micro-label text-primary">{eyebrow}</div>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-[1.04] sm:text-6xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-2xl text-[16px] leading-7 text-secondary-foreground">{description}</p>
          ) : null}
        </Reveal>
        {children}
      </div>
    </AppShell>
  );
}
