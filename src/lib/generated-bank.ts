import { TEMPLATES, makeRng, shuffle, tidyTex, type Difficulty } from "./question-templates";

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
  calculator: boolean;
  ap_value: number;
  prompt: string;
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
  for (const d of [...built.distractors, ...FALLBACK_DISTRACTORS]) {
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
    difficulty: tpl.difficulty,
    calculator: tpl.calculator ?? false,
    ap_value: 1,
    prompt: built.prompt,
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

/** Distinct generated question keys — duplicates from RNG collisions are dropped. */
function allKeys(): string[] {
  if (KEY_CACHE) return KEY_CACHE;
  const keys: string[] = [];
  for (const t of TEMPLATES) {
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

/** Index of every generated question key, optionally filtered by unit/subtopic. */
export function bankKeys(filter?: { unit_slug?: string; topic_slug?: string }): string[] {
  const templateById = new Map(TEMPLATES.map((t) => [t.id, t]));
  return allKeys().filter((k) => {
    const t = templateById.get(k.slice(0, k.lastIndexOf("::")));
    if (!t) return false;
    if (filter?.unit_slug && t.unit !== filter.unit_slug) return false;
    if (filter?.topic_slug && t.topic !== filter.topic_slug) return false;
    return true;
  });
}

export function bankCount(filter?: { unit_slug?: string; topic_slug?: string }): number {
  return bankKeys(filter).length;
}

