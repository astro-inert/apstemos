import { TEMPLATES, makeRng, shuffle, type Difficulty } from "./question-templates";

/** Variants generated per template. 60 templates × 30 variants = 1,800 original questions. */
export const VARIANTS_PER_TEMPLATE = 30;

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
  if (!tpl || !Number.isInteger(variant) || variant < 0 || variant >= VARIANTS_PER_TEMPLATE) return null;

  const r = makeRng(`${templateId}::${variant}`);
  const built = tpl.build(r);

  const seen = new Set([built.correct]);
  const options: string[] = [built.correct];
  for (const d of [...built.distractors, ...FALLBACK_DISTRACTORS]) {
    if (options.length >= 4) break;
    if (seen.has(d)) continue;
    seen.add(d);
    options.push(d);
  }
  const ordered = shuffle(makeRng(`${key}::order`), options);
  const choices = ordered.map((text, i) => ({ label: LABELS[i], text }));
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
    choices,
    answer_label: answer.label,
    answer_text: answer.text,
    explanation: built.explanation,
    common_mistake_codes: tpl.mistakes ?? [],
  };
}

/** Cheap index of every generated question key without building the math. */
export function bankKeys(filter?: { unit_slug?: string; topic_slug?: string }): string[] {
  const keys: string[] = [];
  for (const t of TEMPLATES) {
    if (filter?.unit_slug && t.unit !== filter.unit_slug) continue;
    if (filter?.topic_slug && t.topic !== filter.topic_slug) continue;
    for (let v = 0; v < VARIANTS_PER_TEMPLATE; v++) keys.push(`${t.id}::${v}`);
  }
  return keys;
}

export const BANK_SIZE = TEMPLATES.length * VARIANTS_PER_TEMPLATE;

export function bankCount(filter?: { unit_slug?: string; topic_slug?: string }): number {
  return bankKeys(filter).length;
}
