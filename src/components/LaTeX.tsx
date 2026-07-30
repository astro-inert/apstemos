import { useMemo } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

function render(tex: string, displayMode: boolean) {
  try {
    return katex.renderToString(tex, {
      displayMode,
      throwOnError: false,
      output: "html",
      strict: "ignore",
    });
  } catch {
    return tex;
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Renders a run of text containing `$…$`, `$$…$$`, `\(…\)` and `\[…\]` to HTML. */
function renderInline(source: string): string {
  const tokens: Array<{ type: "text" | "inline" | "block"; value: string }> = [];
  const re = /(\$\$[\s\S]+?\$\$)|(\\\[[\s\S]+?\\\])|(\\\([\s\S]+?\\\))|(\$[^$\n]+?\$)/g;
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(source)) !== null) {
    if (m.index > lastIndex) tokens.push({ type: "text", value: source.slice(lastIndex, m.index) });
    const match = m[0];
    if (match.startsWith("$$")) tokens.push({ type: "block", value: match.slice(2, -2) });
    else if (match.startsWith("\\[")) tokens.push({ type: "block", value: match.slice(2, -2) });
    else if (match.startsWith("\\(")) tokens.push({ type: "inline", value: match.slice(2, -2) });
    else tokens.push({ type: "inline", value: match.slice(1, -1) });
    lastIndex = m.index + match.length;
  }
  if (lastIndex < source.length) tokens.push({ type: "text", value: source.slice(lastIndex) });
  return tokens
    .map((t) => (t.type === "text" ? escapeHtml(t.value) : render(t.value.trim(), t.type === "block")))
    .join("");
}

const isTableRow = (line: string) => /^\s*\|.*\|\s*$/.test(line);
const isDivider = (line: string) => /^\s*\|(\s*:?-{2,}:?\s*\|)+\s*$/.test(line);

function splitCells(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());
}

/** Markdown pipe table → styled HTML table with every cell math-rendered. */
function renderTable(lines: string[]): string {
  const rows = lines.filter((l) => !isDivider(l)).map(splitCells);
  if (rows.length === 0) return "";
  const hasHeader = lines.length > 1 && isDivider(lines[1]);
  const head = hasHeader ? rows[0] : null;
  const body = hasHeader ? rows.slice(1) : rows;

  const cell = (c: string, tag: "th" | "td") =>
    `<${tag} class="border border-border px-2.5 py-1.5 text-center whitespace-nowrap ${
      tag === "th" ? "bg-elevated/60 font-medium" : ""
    }">${renderInline(c)}</${tag}>`;

  return (
    `<span class="block my-3 overflow-x-auto"><table class="w-auto border-collapse text-sm">` +
    (head ? `<thead><tr>${head.map((c) => cell(c, "th")).join("")}</tr></thead>` : "") +
    `<tbody>${body.map((r) => `<tr>${r.map((c) => cell(c, "td")).join("")}</tr>`).join("")}</tbody>` +
    `</table></span>`
  );
}

/**
 * Renders text containing inline `$...$`, block `$$...$$`, `\(...\)` / `\[...\]`
 * LaTeX expressions and markdown pipe tables. Non-math text passes through unchanged.
 */
export function LaTeX({ children, className }: { children: string; className?: string }) {
  const html = useMemo(() => {
    if (!children) return "";
    const lines = children.split("\n");
    const out: string[] = [];
    let buffer: string[] = [];
    let table: string[] = [];

    const flushText = () => {
      if (buffer.length) {
        out.push(renderInline(buffer.join("\n")));
        buffer = [];
      }
    };
    const flushTable = () => {
      if (table.length) {
        out.push(renderTable(table));
        table = [];
      }
    };

    for (const line of lines) {
      if (isTableRow(line)) {
        flushText();
        table.push(line);
      } else {
        flushTable();
        buffer.push(line);
      }
    }
    flushText();
    flushTable();
    return out.join("");
  }, [children]);

  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
