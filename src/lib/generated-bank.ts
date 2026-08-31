import {
  getManifestation,
  structuralSignature as taxonomySignature,
  type AlgebraicStructure,
  type ReasoningType,
  type Representation,
} from "./ced-taxonomy";
import { TEMPLATE_MANIFESTATION } from "./template-classification";
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

/** Taxonomy classification for a template, with sensible fallbacks. */
export function templateTaxonomy(t: QuestionTemplate) {
  const id = t.manifestation ?? TEMPLATE_MANIFESTATION[t.id];
  const m = id ? getManifestation(id) : undefined;
  const representation: Representation = t.representation ?? m?.representation ?? "symbolic";
  const reasoning: ReasoningType = t.reasoning ?? m?.reasoning ?? "computation";
  const algebra: AlgebraicStructure = t.algebra ?? m?.algebra ?? "plain";

  return {
    manifestation: id ?? `${t.topic}:unclassified`,
    ced_topic: m?.ced ?? "unmapped",
    representation,
    reasoning,
    algebra,
    signature: taxonomySignature({
      topic: t.topic,
      manifestation: id,

      representation,
      reasoning,
      algebra,
    }),
  };
}


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

/**
 * Variant budget. Coverage, not volume, defines this bank: a manifestation gets
 * at most `MAX_VARIANTS_PER_MANIFESTATION` questions no matter how many template
 * families implement it, so no single form of a concept can be over-farmed while
 * thinner forms stay thin.
 */
export const VARIANTS_PER_TEMPLATE = 18;
export const MAX_VARIANTS_PER_MANIFESTATION = 36;

export type GeneratedChoice = { label: string; text: string };

export type GeneratedQuestion = {
  key: string;
  id: string;
  template_id: string;
  variant: number;
  type: "MCQ";
  unit_slug: string;
  topic_slug: string;
  /** internal CED topic label, from the taxonomy */
  ced_topic: string;
  manifestation: string;
  representation: Representation;
  reasoning: ReasoningType;
  algebra: AlgebraicStructure;
  structural_signature: string;
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
  const norm = (t: string) => t.replace(/\\dfrac/g, "\\frac");
  const isFrac = (t: string) => norm(t).includes("\\frac{");
  if (!isFrac(correct) || distractors.some(isFrac)) return [];
  const c = norm(correct);
  const m = /\\frac\{(\d+)\}\{(\d+)\}/.exec(c);
  if (!m) return [];
  const n = Number(m[1]);
  const d = Number(m[2]);
  const swap = (a: number, b: number) =>
    a === 0 || b === 0 || (a === n && b === d)
      ? null
      : c.slice(0, m.index) + `\\frac{${a}}{${b}}` + c.slice(m.index + m[0].length);
  return [swap(d, n), swap(n + 1, d), swap(n, d + 1), swap(n + 1, d + 1)].filter(
    (x): x is string => Boolean(x) && x !== correct,
  );
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
  // Only distractors that survive de-duplication count toward the shape check;
  // a distractor equal to the answer is discarded below.
  const usable = built.distractors.filter((d) => d !== built.correct);
  const extras = shapeMatchedDistractors(built.correct, usable);
  const pool = extras.length
    ? [extras[0]!, usable[0] ?? "", extras[1] ?? "", ...usable.slice(1), ...extras.slice(2)]
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

  const tax = templateTaxonomy(tpl);

  return {
    key,
    id: uuidFromKey(key),
    template_id: templateId,
    variant,
    type: "MCQ",
    unit_slug: tpl.unit,
    topic_slug: tpl.topic,
    ced_topic: tax.ced_topic,
    manifestation: tax.manifestation,
    representation: tax.representation,
    reasoning: tax.reasoning,
    algebra: tax.algebra,
    structural_signature: tax.signature,
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
 * only differ by their constants are recognised as the same question.
 */
function promptSignature(prompt: string): string {
  return prompt.replace(/-?\d+(\.\d+)?/g, "#").replace(/\s+/g, " ").trim();
}

/** Prompt skeleton used for near-duplicate detection inside a topic. */
function promptSkeleton(prompt: string): string {
  return prompt
    .replace(/\$[^$]*\$/g, " ⟨math⟩ ")
    .replace(/-?\d+(\.\d+)?/g, "#")
    .replace(/[^\p{L}#⟨⟩ ]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

/** How many questions may share one prompt skeleton within a topic. */
const MAX_PER_SKELETON = 8;

/**
 * Computation-only families are deliberately rationed: without a cap the bank
 * fills up with "compute this" items because they are the easiest form to
 * parameterize. Richer reasoning types get a larger budget.
 */
function variantBudget(reasoning: ReasoningType, representation: string): number {
  const base = reasoning === "computation" ? 5 : 24;
  // Table- and graph-reading items are the forms the exam leans on most and the
  // hardest to parameterize, so they get extra room.
  if (representation === "tabular") return Math.max(base, 14);
  if (representation === "graphical") return Math.max(base, 12);
  return base;
}

/**
 * Distinct generated question keys.
 *
 * Filters, in order: identical prompt families are dropped, each manifestation
 * is capped, computation-heavy families get a smaller budget, exact-duplicate
 * variants are skipped, near-duplicate skeletons are limited per topic, and
 * items whose skeleton *and* full choice set match an earlier item are removed.
 */
function allKeys(): string[] {
  if (KEY_CACHE) return KEY_CACHE;
  const keys: string[] = [];
  const familySignatures = new Set<string>();
  const perManifestation = new Map<string, number>();
  const perSkeleton = new Map<string, number>();
  const answerSets = new Set<string>();
  for (const t of TEMPLATES) {
    const probe = buildQuestion(`${t.id}::0`);
    if (probe) {
      const sig = `${t.topic}|${promptSignature(probe.prompt)}`;
      if (familySignatures.has(sig)) continue; // same question asked twice — skip the family
      familySignatures.add(sig);
    }
    const tax = templateTaxonomy(t);
    const mid = tax.manifestation;
    const used = perManifestation.get(mid) ?? 0;
    const budget = Math.min(
      variantBudget(tax.reasoning, tax.representation),
      VARIANTS_PER_TEMPLATE,
      MAX_VARIANTS_PER_MANIFESTATION - used,
    );
    if (budget <= 0) continue;
    const seen = new Set<string>();
    for (let v = 0; v < VARIANT_SCAN && seen.size < budget; v++) {
      const key = `${t.id}::${v}`;
      const q = buildQuestion(key);
      if (!q) continue;
      if (seen.has(q.prompt)) continue;

      const skeleton = `${t.topic}|${promptSkeleton(q.prompt)}`;
      if ((perSkeleton.get(skeleton) ?? 0) >= MAX_PER_SKELETON) continue;

      const fingerprint = `${skeleton}|${q.choices
        .map((c) => c.text.replace(/\s+/g, ""))
        .sort()
        .join("~")}`;
      if (answerSets.has(fingerprint)) continue;

      seen.add(q.prompt);
      answerSets.add(fingerprint);
      perSkeleton.set(skeleton, (perSkeleton.get(skeleton) ?? 0) + 1);
      keys.push(key);
    }
    perManifestation.set(mid, used + seen.size);
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

