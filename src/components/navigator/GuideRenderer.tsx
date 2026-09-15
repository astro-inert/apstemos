import { useState } from "react";
import { AlertTriangle, Check, ChevronRight, RotateCcw, ScrollText, Sparkles } from "lucide-react";
import { LaTeX } from "@/components/LaTeX";
import { Reveal } from "@/components/home/primitives";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { GuideBlock, GuideSection, GuideTreeNode, TopicGuide } from "@/lib/navigator-guides";

/* ---------------------------------- table --------------------------------- */

function GuideTable({ columns, rows }: { columns: string[]; rows: string[][] }) {
  return (
    <div className="-mx-1 w-full min-w-0 max-w-full overflow-x-auto px-1">
      <table className="w-full min-w-[34rem] border-collapse text-left text-[13px]">
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c}
                className="border-b border-border bg-elevated/50 px-3 py-2.5 align-bottom font-display text-[12px] font-semibold"
              >
                <LaTeX>{c}</LaTeX>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="align-top">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={cn(
                    "border-b border-border px-3 py-3 leading-relaxed",
                    j === 0 ? "font-medium text-foreground" : "text-secondary-foreground",
                  )}
                >
                  <LaTeX>{cell}</LaTeX>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* --------------------------------- callout -------------------------------- */

const TONES = {
  info: "border-border bg-elevated/40",
  rule: "border-primary/30 bg-primary/[0.06]",
  warn: "border-destructive/30 bg-destructive/[0.06]",
} as const;

function Callout({ block }: { block: Extract<GuideBlock, { kind: "callout" }> }) {
  const tone = block.tone ?? "info";
  const Icon = tone === "warn" ? AlertTriangle : tone === "rule" ? Sparkles : ScrollText;
  return (
    <aside className={cn("border-l-[3px] px-4 py-4 sm:px-5", TONES[tone])}>
      <div
        className={cn(
          "flex items-center gap-2 font-display text-[13px] font-semibold",
          tone === "warn" ? "text-destructive" : tone === "rule" ? "text-primary" : "text-foreground",
        )}
      >
        <Icon className="h-3.5 w-3.5 shrink-0" />
        <LaTeX>{block.title}</LaTeX>
      </div>
      {block.body ? (
        <div className="mt-2.5 text-[14px] leading-6 text-secondary-foreground">
          <LaTeX>{block.body}</LaTeX>
        </div>
      ) : null}
      {block.items?.length ? (
        <ul className="mt-2.5 space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2.5 text-[14px] leading-6 text-secondary-foreground">
              <span aria-hidden className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-current opacity-50" />
              <LaTeX>{item}</LaTeX>
            </li>
          ))}
        </ul>
      ) : null}
    </aside>
  );
}

/* -------------------------------- checklist ------------------------------- */

function Checklist({ block }: { block: Extract<GuideBlock, { kind: "checklist" }> }) {
  const [done, setDone] = useState<Record<number, boolean>>({});
  return (
    <div className="border-y border-border bg-elevated/30 px-4 py-4 sm:px-5">
      {block.title ? (
        <div className="font-display text-[13px] font-semibold">
          <LaTeX>{block.title}</LaTeX>
        </div>
      ) : null}
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {block.items.map((item, i) => (
          <li key={i}>
            <button
              type="button"
              aria-pressed={!!done[i]}
              onClick={() => setDone((d) => ({ ...d, [i]: !d[i] }))}
              className="group flex w-full items-start gap-2.5 rounded-sm px-2 py-2 text-left transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <span
                className={cn(
                  "mt-[0.1rem] grid h-4 w-4 shrink-0 place-items-center rounded-[5px] border transition-colors",
                  done[i] ? "border-primary bg-primary text-primary-foreground" : "border-border",
                )}
              >
                {done[i] ? <Check className="h-3 w-3" /> : null}
              </span>
              <span
                className={cn(
                  "text-[13px] leading-relaxed transition-colors",
                  done[i] ? "text-subtle line-through" : "text-secondary-foreground",
                )}
              >
                <LaTeX>{item}</LaTeX>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------ decision tree ----------------------------- */

type Visited = { node: GuideTreeNode; chosen: number };

function FlowConnector({ split = false }: { split?: boolean }) {
  return (
    <div aria-hidden className="relative mx-auto h-8 w-full max-w-2xl">
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-primary/55" />
      {split ? <span className="absolute inset-x-[12%] bottom-0 h-px bg-primary/55" /> : null}
    </div>
  );
}

const flowGridClass = (count: number) => {
  if (count >= 4) return "sm:grid-cols-2 xl:grid-cols-4";
  if (count === 3) return "sm:grid-cols-3";
  if (count === 2) return "sm:grid-cols-2";
  return "sm:grid-cols-1";
};

function DecisionTree({ block }: { block: Extract<GuideBlock, { kind: "tree" }> }) {
  const byId = new Map(block.nodes.map((n) => [n.id, n]));
  const [path, setPath] = useState<Visited[]>([]);

  let currentId: string | undefined = block.start;
  let outcome: string | undefined;
  for (const step of path) {
    const opt = step.node.options[step.chosen];
    if (opt?.outcome) {
      outcome = opt.outcome;
      currentId = undefined;
      break;
    }
    currentId = opt?.next;
  }
  const current = currentId ? byId.get(currentId) : undefined;

  return (
    <div role="region" aria-label="Interactive strategy flowchart" className="min-w-0 border-y border-border bg-card px-3 py-6 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mx-auto w-fit max-w-full border border-primary bg-primary px-4 py-2 text-center text-[11px] font-semibold text-primary-foreground">
          Start
        </div>
        <FlowConnector />

        {path.map((step, i) => {
          const opt = step.node.options[step.chosen];
          return (
            <div key={`${step.node.id}-${i}`}>
              <div className="mx-auto max-w-xl border border-border bg-elevated/45 px-4 py-4 text-center">
                <div className="text-[13px] font-medium leading-relaxed"><LaTeX>{step.node.prompt}</LaTeX></div>
              </div>
              <FlowConnector />
              <div className="mx-auto flex w-fit max-w-full items-center gap-1.5 border border-primary/40 bg-accent px-3 py-2 text-center text-[12px] font-semibold text-accent-foreground">
                <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                <LaTeX>{opt?.label ?? ""}</LaTeX>
              </div>
              <FlowConnector />
            </div>
          );
        })}

        {current ? (
          <div>
            <div className="mx-auto max-w-xl border-2 border-primary/45 bg-primary/[0.05] px-4 py-4 text-center">
              <div className="micro-label mb-2 text-primary">Decision</div>
              <div className="text-[13.5px] font-medium leading-relaxed"><LaTeX>{current.prompt}</LaTeX></div>
            </div>
            <FlowConnector split={current.options.length > 1} />
            <div className={cn("grid min-w-0 gap-2", flowGridClass(current.options.length))}>
              {current.options.map((option, i) => (
                <div key={i} className="relative min-w-0 pt-3 before:absolute before:left-1/2 before:top-0 before:h-3 before:w-px before:-translate-x-1/2 before:bg-primary/55">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setPath((previous) => [...previous, { node: current, chosen: i }])}
                    className="h-auto min-h-11 w-full min-w-0 whitespace-normal px-3 py-2.5 text-center text-[12px] leading-snug hover:border-primary/50 hover:text-primary"
                  >
                    <LaTeX>{option.label}</LaTeX>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {outcome ? (
          <div>
            <div className="mx-auto max-w-xl border-2 border-primary bg-accent px-4 py-4 text-center">
              <div className="micro-label text-primary">Outcome</div>
              <div className="mt-1.5 text-[13.5px] font-medium leading-relaxed text-accent-foreground"><LaTeX>{outcome}</LaTeX></div>
            </div>
          </div>
        ) : null}

        {path.length ? (
          <div className="mt-5 flex justify-center">
            <Button type="button" variant="ghost" size="sm" onClick={() => setPath([])} className="text-muted-foreground hover:text-foreground">
              <RotateCcw className="h-3 w-3" />
              Start over
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* --------------------------------- blocks --------------------------------- */

function Block({ block }: { block: GuideBlock }) {
  switch (block.kind) {
    case "prose":
      return (
        <p className="text-[15px] leading-7 text-secondary-foreground">
          <LaTeX>{block.text}</LaTeX>
        </p>
      );
    case "callout":
      return <Callout block={block} />;
    case "formula":
      return (
        <figure className="border-y border-border bg-elevated/40 px-4 py-5 text-center sm:px-5">
          {block.label ? <div className="micro-label mb-2">{block.label}</div> : null}
          <div className="min-w-0 max-w-full overflow-x-auto text-[14px]">
            <LaTeX>{`$$${block.tex}$$`}</LaTeX>
          </div>
        </figure>
      );
    case "table":
      return <GuideTable columns={block.columns} rows={block.rows} />;
    case "list":
      return (
        <div>
          {block.title ? (
            <div className="mb-2.5 font-display text-[13px] font-semibold">
              <LaTeX>{block.title}</LaTeX>
            </div>
          ) : null}
          {block.ordered ? (
            <ol className="space-y-2.5">
              {block.items.map((item, i) => (
                <li key={i} className="flex gap-3 text-[14px] leading-6 text-secondary-foreground">
                  <span className="num shrink-0 text-[11px] text-subtle">{i + 1}.</span>
                  <LaTeX>{item}</LaTeX>
                </li>
              ))}
            </ol>
          ) : (
            <ul className="space-y-2.5">
              {block.items.map((item, i) => (
                <li key={i} className="flex gap-2.5 text-[14px] leading-6 text-secondary-foreground">
                  <span aria-hidden className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-current opacity-50" />
                  <LaTeX>{item}</LaTeX>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    case "example":
      return (
        <div className="border-l-[3px] border-primary bg-card py-1 pl-5 sm:pl-6">
          <div className="font-display text-[15px] font-semibold">
            <LaTeX>{block.title}</LaTeX>
          </div>
          <div className="mt-2 overflow-x-auto text-[13.5px] leading-relaxed">
            <LaTeX>{block.problem}</LaTeX>
          </div>
          <ol className="mt-4 space-y-3">
            {block.steps.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="num mt-[0.15rem] grid h-5 w-5 shrink-0 place-items-center rounded-md bg-primary/10 text-[11px] font-semibold text-primary">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <div className="text-[13px] font-medium">
                    <LaTeX>{s.label}</LaTeX>
                  </div>
                  {s.body ? (
                    <div className="mt-1 overflow-x-auto text-[13px] leading-relaxed text-secondary-foreground">
                      <LaTeX>{s.body}</LaTeX>
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
          {block.conclusion ? (
            <div className="mt-4 border-y border-primary/30 bg-primary/[0.06] px-3.5 py-3 text-[13px] leading-relaxed">
              <LaTeX>{block.conclusion}</LaTeX>
            </div>
          ) : null}
          {block.note ? (
            <div className="mt-3 text-[12.5px] leading-relaxed text-subtle">
              <LaTeX>{block.note}</LaTeX>
            </div>
          ) : null}
        </div>
      );
    case "checklist":
      return <Checklist block={block} />;
    case "tree":
      return <DecisionTree block={block} />;
  }
}

/* --------------------------------- guide ---------------------------------- */

function SectionCard({ section, index }: { section: GuideSection; index: number }) {
  return (
    <Reveal className="min-w-0" delay={Math.min(index, 6) * 0.04}>
      <section id={section.id} className="min-w-0 scroll-mt-24 border-t border-border py-8 first:border-t-0 first:pt-0 sm:py-11">
        <div className="grid gap-2 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-5">
          <span className="num text-[13px] font-semibold text-primary">{String(index + 1).padStart(2, "0")}</span>
          <h2 className="font-display text-xl font-semibold leading-tight sm:text-2xl">
            <LaTeX>{section.title}</LaTeX>
          </h2>
        </div>
        <div className="mt-6 min-w-0 max-w-full space-y-6 sm:ml-[5.25rem]">
          {section.blocks.map((b, i) => (
            <Block key={i} block={b} />
          ))}
        </div>
      </section>
    </Reveal>
  );
}

export function GuideRenderer({ guide }: { guide: TopicGuide }) {
  return (
    <div className="grid min-w-0 gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:items-start">
      <nav aria-label="Sections" className="border-y border-border py-4 lg:sticky lg:top-24 lg:border-y-0 lg:border-r lg:py-0 lg:pr-6">
        <div className="micro-label mb-3 text-primary">On this page</div>
        {guide.sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="block border-t border-border py-2.5 text-[12px] font-medium leading-snug text-secondary-foreground transition-colors first:border-t-0 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <LaTeX>{s.title}</LaTeX>
          </a>
        ))}
      </nav>
      <div className="grid min-w-0">
        {guide.sections.map((s, i) => (
          <SectionCard key={s.id} section={s} index={i} />
        ))}
      </div>
    </div>
  );
}
