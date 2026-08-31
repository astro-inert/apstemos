/**
 * Full-bank stress test.
 *
 * Renders every generated question through KaTeX and checks for the failure
 * modes that make a question un-AP-like: duplicate or degenerate choices, a
 * missing correct answer, an answer that stands out structurally (the only
 * fraction, the only text option, much longer than the rest), lopsided answer
 * positions, and malformed LaTeX.
 *
 * Run: bun scripts/stress-bank.ts
 */
import katex from "katex";
import { bankKeys, buildQuestion } from "@/lib/generated-bank";
import { QN_UNITS } from "@/lib/question-navigator-data";

type Issue = { key: string; kind: string; detail: string };

const issues: Issue[] = [];
const add = (key: string, kind: string, detail: string) => issues.push({ key, kind, detail });

const TOPICS = new Set(QN_UNITS.flatMap((u) => u.topics.map((t) => t.slug)));
const UNITS = new Set(QN_UNITS.map((u) => u.slug));

/** Renders every `$…$` island; returns the first KaTeX error, if any. */
function katexErrors(source: string): string | null {
  const parts = source.split("$");
  if (parts.length % 2 === 0) return "unbalanced $ delimiters";
  for (let i = 1; i < parts.length; i += 2) {
    try {
      katex.renderToString(parts[i]!, { throwOnError: true, strict: false });
    } catch (e) {
      return `${(e as Error).message} in "${parts[i]}"`;
    }
  }
  return null;
}

const positions = new Map<string, number>();
const keys = bankKeys();

for (const key of keys) {
  const q = buildQuestion(key);
  if (!q) {
    add(key, "build-failed", "buildQuestion returned null");
    continue;
  }

  if (!UNITS.has(q.unit_slug)) add(key, "unmapped-unit", q.unit_slug);
  if (!TOPICS.has(q.topic_slug)) add(key, "unmapped-topic", q.topic_slug);

  // LaTeX
  for (const [label, text] of [["prompt", q.prompt], ["explanation", q.explanation], ...q.choices.map((c) => [`choice ${c.label}`, c.text])] as Array<[string, string]>) {
    const err = katexErrors(text);
    if (err) add(key, "latex", `${label}: ${err}`);
    if (/\\text\{[^}]*$/.test(text)) add(key, "latex", `${label}: unterminated \\text{`);
  }

  // Redundant coefficient / exponent artifacts such as "1x", "1\\pi", "x^{1}".
  const ONE_ARTIFACT = /(^|[^\d.\w])1\s*(\\pi|\\sin|\\cos|\\tan|\\sec|\\csc|\\cot|\\ln|\\sqrt|\\theta|\\left|[a-zA-Z]\()/;
  for (const [label, text] of [["prompt", q.prompt], ...q.choices.map((c) => [`choice ${c.label}`, c.text])] as Array<[string, string]>) {
    if (ONE_ARTIFACT.test(text)) add(key, "redundant-one", `${label}: ${text}`);
    if (/([a-zA-Z)]|\\right\))\^\{1\}/.test(text)) add(key, "redundant-exponent", `${label}: ${text}`);
  }

  // Choices
  if (q.choices.length !== 4) add(key, "choice-count", `${q.choices.length} choices`);
  const texts = q.choices.map((c) => c.text.replace(/\s+/g, ""));
  if (new Set(texts).size !== texts.length) add(key, "duplicate-choices", texts.join(" | "));
  const answer = q.choices.find((c) => c.label === q.answer_label);
  if (!answer) add(key, "missing-answer", q.answer_label);
  if (answer && answer.text.replace(/\s+/g, "") !== q.answer_text.replace(/\s+/g, "")) {
    add(key, "answer-mismatch", `${answer.text} vs ${q.answer_text}`);
  }
  if (texts.some((t) => t === "" || t === "$$")) add(key, "empty-choice", texts.join(" | "));

  if (answer) {
    // Obvious-answer heuristics: the answer must not be the only option of its shape.
    const others = q.choices.filter((c) => c.label !== q.answer_label).map((c) => c.text);
    const shape = (t: string) => ({
      text: t.includes("\\text{"),
      frac: t.includes("\\frac") || t.includes("\\dfrac"),
      neg: /(^|[^\w])-/.test(t),
      len: t.replace(/\s+/g, "").length,
    });
    const a = shape(answer.text);
    const o = others.map(shape);
    if (a.text && o.every((s) => !s.text)) add(key, "obvious-only-text-answer", answer.text);
    if (!a.text && o.every((s) => s.text)) add(key, "obvious-only-math-answer", answer.text);
    if (a.frac && o.every((s) => !s.frac)) add(key, "obvious-only-fraction-answer", answer.text);
    const maxOther = Math.max(...o.map((s) => s.len));
    if (a.len > 2.2 * maxOther + 4) add(key, "obvious-longest-answer", `${a.len} vs ${maxOther}`);
    positions.set(q.answer_label, (positions.get(q.answer_label) ?? 0) + 1);
  }
}

// Answer position balance: no label should hold more than 32% of the bank.
for (const [label, n] of positions) {
  const share = n / keys.length;
  if (share > 0.32 || share < 0.18) add("(bank)", "answer-position-skew", `${label}: ${(share * 100).toFixed(1)}%`);
}

/* ------------------------------------------------------------------ */
/* Bank-level structural checks                                        */
/* ------------------------------------------------------------------ */

const built = keys.map((k) => ({ key: k, q: buildQuestion(k)! })).filter((x) => x.q);

// Figures are mandatory for graphical and tabular items, and a tabular item
// must actually carry a table.
for (const { key, q } of built) {
  if ((q.representation === "graphical" || q.representation === "tabular") && !q.figure) {
    add(key, "missing-figure", `${q.representation} item without a figure (${q.manifestation})`);
  }
  if (q.representation === "tabular" && q.figure && q.figure.kind !== "table") {
    add(key, "wrong-figure-kind", `tabular item rendered as ${q.figure.kind}`);
  }
}

/** Collapses numbers and whitespace so two variants of one skeleton collide. */
const skeleton = (s: string) => s.replace(/-?\d+(\.\d+)?/g, "#").replace(/\s+/g, " ").trim();

// Near-duplicate prompts across the whole bank (same skeleton AND same answer set).
const nearDupes = new Map<string, string[]>();
for (const { key, q } of built) {
  const fp = `${skeleton(q.prompt)}||${q.choices.map((c) => c.text.replace(/\s+/g, "")).sort().join("~")}`;
  nearDupes.set(fp, [...(nearDupes.get(fp) ?? []), key]);
}
for (const [, group] of nearDupes) {
  if (group.length > 1) add(group[1]!, "near-duplicate", `same prompt skeleton and answer set as ${group[0]}`);
}

// Per-manifestation depth: every manifestation present in the bank needs >= 3 items.
const perManifestation = new Map<string, number>();
for (const { q } of built) perManifestation.set(q.manifestation, (perManifestation.get(q.manifestation) ?? 0) + 1);
for (const [m, n] of perManifestation) {
  if (n < 3) add("(bank)", "thin-manifestation", `${m}: ${n}`);
}

// Reasoning balance: pure computation must not dominate the bank.
const compute = built.filter((b) => b.q.reasoning === "computation").length;
if (compute / built.length > 0.32) {
  add("(bank)", "computation-heavy", `${((compute / built.length) * 100).toFixed(1)}% computation`);
}

// Representation floors.
const repShare = (name: string) => built.filter((b) => b.q.representation === name).length / built.length;
for (const [name, floor] of [["graphical", 0.12], ["tabular", 0.08], ["verbal", 0.06], ["contextual", 0.12]] as const) {
  const share = repShare(name);
  if (share < floor) add("(bank)", "representation-floor", `${name}: ${(share * 100).toFixed(1)}% < ${(floor * 100).toFixed(0)}%`);
}

const byKind = new Map<string, Issue[]>();
for (const i of issues) byKind.set(i.kind, [...(byKind.get(i.kind) ?? []), i]);

console.log(`questions checked: ${keys.length}`);
console.log(`issues: ${issues.length}`);
for (const [kind, list] of [...byKind.entries()].sort((a, b) => b[1].length - a[1].length)) {
  console.log(`\n== ${kind} (${list.length})`);
  for (const i of list.slice(0, 8)) console.log(`   ${i.key} :: ${i.detail}`);
}
if (issues.length) process.exitCode = 1;

