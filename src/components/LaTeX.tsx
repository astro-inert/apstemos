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

/**
 * Renders text containing inline `$...$`, block `$$...$$`, and `\(...\)` / `\[...\]`
 * LaTeX expressions using KaTeX. Non-math text is passed through unchanged.
 */
export function LaTeX({ children, className }: { children: string; className?: string }) {
  const html = useMemo(() => {
    if (!children) return "";
    // Order matters: $$, then \[..\], then $, then \(..\)
    const tokens: Array<{ type: "text" | "inline" | "block"; value: string }> = [];
    const re = /(\$\$[\s\S]+?\$\$)|(\\\[[\s\S]+?\\\])|(\\\([\s\S]+?\\\))|(\$[^$\n]+?\$)/g;
    let lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(children)) !== null) {
      if (m.index > lastIndex) tokens.push({ type: "text", value: children.slice(lastIndex, m.index) });
      const match = m[0];
      if (match.startsWith("$$")) tokens.push({ type: "block", value: match.slice(2, -2) });
      else if (match.startsWith("\\[")) tokens.push({ type: "block", value: match.slice(2, -2) });
      else if (match.startsWith("\\(")) tokens.push({ type: "inline", value: match.slice(2, -2) });
      else tokens.push({ type: "inline", value: match.slice(1, -1) });
      lastIndex = m.index + match.length;
    }
    if (lastIndex < children.length) tokens.push({ type: "text", value: children.slice(lastIndex) });
    return tokens
      .map((t) => {
        if (t.type === "text") return escapeHtml(t.value);
        return render(t.value.trim(), t.type === "block");
      })
      .join("");
  }, [children]);

  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
