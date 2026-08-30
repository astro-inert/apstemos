import {
  TEMPLATES,
  makeRng,
  shuffle,
  tidyTex,
  type Difficulty,
  type Figure,
  type QuestionTemplate,
  type Track,
} from "./question-templates";

/** Topics that only appear on the BC exam. */
const BC_ONLY_TOPICS = new Set([
  "integration-by-parts",
  "partial-fractions",
  "improper-integrals",
  "eulers-method",
  "logistic-growth",
  "arc-length",
]);

/** Units that only appear on the BC exam. */
const BC_ONLY_UNITS = new Set(["unit-9-parametric-polar-vector", "unit-10-infinite-sequences-and-series"]);

/** Which exam a template belongs to, from its own tag or its unit/topic. */
export function templateTrack(t: QuestionTemplate): Track {
  if (t.track) return t.track;
  if (BC_ONLY_UNITS.has(t.unit) || BC_ONLY_TOPICS.has(t.topic)) return "BC";
  return "both";
}

/** A BC student sees everything; an AB student never sees BC-only material. */
function inTrack(t: QuestionTemplate, track?: "AB" | "BC"): boolean {
  if (!track) return true;
  const tt = templateTrack(t);
  return tt === "both" || tt === track;
}

/** Variants generated per template. 60 templates × 30 variants = 1,800 original questions. */
export const VARIANTS_PER_TEMPLATE = 27;

export type GeneratedChoice = { label: string; text: string };

export type GeneratedQuestion = {
  key: string;
  id: string;
  template_id: string;
  variant: number;
  type: "MCQ";
  unit_slug: string;
  topic_slug: string;
  difficulty: Difficulty;
  track: Track;
  calculator: boolean;
  ap_value: number;
  prompt: string;
  figure?: Figure;
  choices: GeneratedChoice[];
  answer_label: string;
  answer_text: string;
  explanation: string;
  common_mistake_codes: string[];
};


const LABELS = ["A", "B", "C", "D"];

/**
 * Choice bodies are raw LaTeX that may mix math with `\text{…}` prose.
 * Convert them into the mixed markup our renderer understands: prose stays
 * plain, math islands get wrapped in `$…$`. Without this, choices containing
 * `\text{…}` were emitted verbatim and displayed as literal "\text{...}".
 */
function asMath(text: string): string {
  const t = text.trim();
  if (!t) return t;
  if (/^\$[\s\S]*\$$/.test(t)) return t;
  if (!t.includes("\\text{")) return `$${t}$`;

  const wrapMath = (chunk: string): string => {
    const trimmed = chunk.trim();
    if (!trimmed) return chunk.includes(" ") ? " " : "";
    // keep trailing sentence punctuation outside of math mode
    const m = /^([\s\S]*?)([.,;:]?)$/.exec(trimmed)!;
    const body = m[1].trim();
    const tail = m[2];
    const lead = chunk.startsWith(" ") ? " " : "";
    const trail = chunk.endsWith(" ") ? " " : "";
    return body ? `${lead}$${body}$${tail}${trail}` : `${lead}${tail}${trail}`;
  };

  let out = "";
  let i = 0;
  let pending = "";
  while (i < t.length) {
    const start = t.indexOf("\\text{", i);
    if (start < 0) {
      pending += t.slice(i);
      break;
    }
    pending += t.slice(i, start);
    // find the matching closing brace
    let depth = 1;
    let j = start + 6;
    for (; j < t.length && depth > 0; j++) {
      if (t[j] === "{") depth++;
      else if (t[j] === "}") depth--;
    }
    out += wrapMath(pending);
    pending = "";
    out += t.slice(start + 6, j - 1);
    i = j;
  }
  out += wrapMath(pending);
  return out;
}


/**
 * Keeps the correct answer from standing out by shape. If the answer is a
 * fraction but every distractor is a bare integer, the answer is visually
 * obvious, so we mint plausible same-shape fractions (reciprocal, negation,
 * off-by-one denominator) before falling back to generic options.
 */
function shapeMatchedDistractors(correct: string, distractors: string[]): string[] {
  const isFrac = (t: string) => /\\d?frac\{/.test(t.replace("\\dfrac", "\\frac"));
  if (!isFrac(correct) || distractors.some(isFrac)) return [];
  const m = /^(-?)\\d?frac\{(\d+)\}\{(\d+)\}$/.exec(correct.replace("\\dfrac", "\\frac"));
  if (!m) return [];
  const neg = m[1] === "-";
  const n = Number(m[2]);
  const d = Number(m[3]);
  const f = (a: number, b: number, negative: boolean) =>
    b === 0 || a === 0 ? null : `${negative ? "-" : ""}\\frac{${a}}{${b}}`;
  return [f(d, n, neg), f(n, d, !neg), f(n + 1, d, neg), f(n, d + 1, neg)]
    .filter((x): x is string => Boolean(x) && x !== correct);
}

const FALLBACK_DISTRACTORS = ["0", "1", "-1", "\\text{None of these}", "2", "\\text{The limit does not exist.}"];

/** Deterministic UUID derived from a question key, so attempts stay stable across sessions. */
export function uuidFromKey(key: string): string {
  let hex = "";
  for (let i = 0; i < 4; i++) {
    let h = 2166136261 >>> 0;
    const s = `${key}#${i}`;
    for (let j = 0; j < s.length; j++) {
      h ^= s.charCodeAt(j);
      h = Math.imul(h, 16777619) >>> 0;
    }
    hex += h.toString(16).padStart(8, "0");
  }
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    `5${hex.slice(13, 16)}`,
    `8${hex.slice(17, 20)}`,
    hex.slice(20, 32),
  ].join("-");
}

export function buildQuestion(key: string): GeneratedQuestion | null {
  const sep = key.lastIndexOf("::");
  if (sep < 0) return null;
  const templateId = key.slice(0, sep);
  const variant = Number(key.slice(sep + 2));
  const tpl = TEMPLATES.find((t) => t.id === templateId);
  if (!tpl || !Number.isInteger(variant) || variant < 0 || variant >= 240) return null;

  const r = makeRng(`${templateId}::${variant}`);
  const raw = tpl.build(r);
  const built = {
    prompt: tidyTex(raw.prompt),
    correct: tidyTex(raw.correct),
    distractors: raw.distractors.map(tidyTex),
    explanation: tidyTex(raw.explanation),
  };

  const seen = new Set([built.correct]);
  const options: string[] = [built.correct];
  // Shape-matched options come first when the answer would otherwise be the
  // only fraction on the list; two of the original distractors still survive.
  const extras = shapeMatchedDistractors(built.correct, built.distractors);
  const pool = extras.length
    ? [extras[0]!, built.distractors[0] ?? "", extras[1] ?? "", ...built.distractors.slice(1), ...extras.slice(2)]
    : built.distractors;
  for (const d of [...pool.filter(Boolean), ...FALLBACK_DISTRACTORS]) {
    if (options.length >= 4) break;
    if (seen.has(d)) continue;
    seen.add(d);
    options.push(d);
  }
  const ordered = shuffle(makeRng(`${key}::order`), options);
  const choices = ordered.map((text, i) => ({ label: LABELS[i], text, tex: asMath(text) }));
  const answer = choices.find((c) => c.text === built.correct)!;

  return {
    key,
    id: uuidFromKey(key),
    template_id: templateId,
    variant,
    type: "MCQ",
    unit_slug: tpl.unit,
    topic_slug: tpl.topic,
    track: templateTrack(tpl),
    difficulty: tpl.difficulty,
    calculator: tpl.calculator ?? false,
    ap_value: 1,
    prompt: built.prompt,
    figure: raw.figure,

    choices: choices.map((c) => ({ label: c.label, text: c.tex })),
    answer_label: answer.label,
    answer_text: answer.tex,
    explanation: built.explanation,
    common_mistake_codes: tpl.mistakes ?? [],
  };
}

/** Widest variant index scanned when collecting distinct questions per template. */
const VARIANT_SCAN = 240;

let KEY_CACHE: string[] | null = null;

/**
 * Structural signature of a prompt: numbers collapsed so two *families* that
 * only differ by their constants are recognised as the same question, while
 * variants inside a family stay distinct (those are deduplicated by exact text).
 */
function structuralSignature(prompt: string): string {
  return prompt.replace(/-?\d+(\.\d+)?/g, "#").replace(/\s+/g, " ").trim();
}

/** Distinct generated question keys — duplicates from RNG collisions are dropped. */
function allKeys(): string[] {
  if (KEY_CACHE) return KEY_CACHE;
  const keys: string[] = [];
  const familySignatures = new Set<string>();
  for (const t of TEMPLATES) {
    const probe = buildQuestion(`${t.id}::0`);
    if (probe) {
      const sig = `${t.topic}|${structuralSignature(probe.prompt)}`;
      if (familySignatures.has(sig)) continue; // same question asked twice — skip the family
      familySignatures.add(sig);
    }
    const seen = new Set<string>();
    for (let v = 0; v < VARIANT_SCAN && seen.size < VARIANTS_PER_TEMPLATE; v++) {
      const key = `${t.id}::${v}`;
      const q = buildQuestion(key);
      if (!q) continue;
      const sig = q.prompt;
      if (seen.has(sig)) continue;
      seen.add(sig);
      keys.push(key);
    }
  }
  KEY_CACHE = keys;
  return keys;
}

export type BankFilter = {
  unit_slug?: string;
  topic_slug?: string;
  track?: "AB" | "BC";
  calculator?: boolean;
};

/** Index of every generated question key, optionally filtered. */
export function bankKeys(filter?: BankFilter): string[] {
  const templateById = new Map(TEMPLATES.map((t) => [t.id, t]));
  return allKeys().filter((k) => {
    const t = templateById.get(k.slice(0, k.lastIndexOf("::")));
    if (!t) return false;
    if (filter?.unit_slug && t.unit !== filter.unit_slug) return false;
    if (filter?.topic_slug && t.topic !== filter.topic_slug) return false;
    if (filter?.calculator !== undefined && (t.calculator ?? false) !== filter.calculator) return false;
    return inTrack(t, filter?.track);
  });
}

export function bankCount(filter?: BankFilter): number {
  return bankKeys(filter).length;
}

