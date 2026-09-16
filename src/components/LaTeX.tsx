import { useMemo } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function render(tex: string, displayMode: boolean) {
  try {
    return katex.renderToString(tex, { displayMode, throwOnError: false, output: "html", strict: "ignore" });
  } catch {
    return `<span class="latex-error">${escapeHtml(tex)}</span>`;
  }
}

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
  return tokens.map((t) => {
    if (t.type === "text") return escapeHtml(t.value).replace(/\n/g, "<br />");
    const math = render(t.value.trim(), t.type === "block");
    return t.type === "block" ? `<span class="latex-display">${math}</span>` : `<span class="latex-inline">${math}</span>`;
  }).join("");
}

const isTableRow = (line: string) => /^\s*\|.*\|\s*$/.test(line);
const isDivider = (line: string) => /^\s*\|(\s*:?-{2,}:?\s*\|)+\s*$/.test(line);
function splitCells(line: string): string[] {
  const source = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  const cells: string[] = [];
  let current = "", math = false, escaped = false;
  for (const ch of source) {
    if (escaped) { current += ch; escaped = false; continue; }
    if (ch === "\\") { current += ch; escaped = true; continue; }
    if (ch === "$") { math = !math; current += ch; continue; }
    if (ch === "|" && !math) { cells.push(current.trim()); current = ""; continue; }
    current += ch;
  }
  cells.push(current.trim());
  return cells;
}
function renderTable(lines: string[]): string {
  const rows = lines.filter((l) => !isDivider(l)).map(splitCells);
  if (!rows.length) return "";
  const hasHeader = lines.length > 1 && isDivider(lines[1]);
  const head = hasHeader ? rows[0] : null;
  const body = hasHeader ? rows.slice(1) : rows;
  const cell = (c: string, tag: "th" | "td") => `<${tag} class="border border-border px-2.5 py-1.5 text-center ${tag === "th" ? "bg-elevated/60 font-medium" : ""}">${renderInline(c)}</${tag}>`;
  return `<span class="latex-table-wrap"><table class="latex-table">${head ? `<thead><tr>${head.map((c) => cell(c,"th")).join("")}</tr></thead>` : ""}<tbody>${body.map((r) => `<tr>${r.map((c) => cell(c,"td")).join("")}</tr>`).join("")}</tbody></table></span>`;
}

export function LaTeX({ children, className }: { children: string; className?: string }) {
  const html = useMemo(() => {
    if (!children) return "";
    const lines = children.split("\n");
    const out: string[] = [], buffer: string[] = [], table: string[] = [];
    const flushText = () => { if (buffer.length) { out.push(renderInline(buffer.join("\n"))); buffer.splice(0); } };
    const flushTable = () => { if (table.length) { out.push(renderTable(table)); table.splice(0); } };
    for (const line of lines) { if (isTableRow(line)) { flushText(); table.push(line); } else { flushTable(); buffer.push(line); } }
    flushText(); flushTable();
    return out.join("");
  }, [children]);

  /* The outer viewport is deliberately the scroll owner. This matches the Navigator's
     mobile behavior: the entire rendered content can be dragged horizontally instead
     of relying on KaTeX's nested display spans to receive the gesture. */
  return (
    <span className={`latex-swipe-viewport ${className ?? ""}`}>
      <span className="latex-content" dangerouslySetInnerHTML={{ __html: html }} />
    </span>
  );
}
