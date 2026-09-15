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

/**
 * Canonical Practice bank.
 *
 * APSTEMOS is currently publishing Unit 1 only while the remaining units are
 * rebuilt against the Navigator. The bank intentionally contains 242 Unit 1
 * MCQs. Repeated exposure to the same legitimate AP structure is allowed, but
 * each exposure is independently parameterized rather than copied verbatim.
 */
const ACTIVE_BANK_UNIT = "unit-1-limits-and-continuity";
const ACTIVE_BANK_SIZE = 242;

/** Exact APSTEMOS Unit 1 Navigator topic order. */
const UNIT_1_TOPICS = [
  "evaluating-limits-algebraically",
  "limits-from-graphs-and-tables",
  "squeeze-theorem",
  "continuity-and-discontinuity",
  "intermediate-value-theorem",
  "limits-at-infinity",
] as const;

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
    signature: taxonomySignature({ topic: t.topic, manifestation: id, representation, reasoning, algebra }),
  };
}

const BC_ONLY_TOPICS = new Set(["integration-by-parts", "partial-fractions", "improper-integrals", "eulers-method", "logistic-growth", "arc-length"]);
const BC_ONLY_UNITS = new Set(["unit-9-parametric-polar-vector", "unit-10-infinite-sequences-and-series"]);

export function templateTrack(t: QuestionTemplate): Track {
  if (t.track) return t.track;
  if (BC_ONLY_UNITS.has(t.unit) || BC_ONLY_TOPICS.has(t.topic)) return "BC";
  return "both";
}
function inTrack(t: QuestionTemplate, track?: "AB" | "BC"): boolean {
  if (!track) return true;
  const tt = templateTrack(t);
  return tt === "both" || tt === track;
}

/**
 * We deliberately permit several near-duplicate exposures per question family.
 * The generator changes the actual mathematical parameters, answer, distractors,
 * and (when present) figure data for every variant.
 */
export const VARIANTS_PER_TEMPLATE = 24;
export type GeneratedChoice = { label: string; text: string };
export type GeneratedQuestion = {
  key: string; id: string; template_id: string; variant: number; type: "MCQ";
  unit_slug: string; topic_slug: string; ced_topic: string; manifestation: string;
  representation: Representation; reasoning: ReasoningType; algebra: AlgebraicStructure;
  structural_signature: string; difficulty: Difficulty; track: Track; calculator: boolean;
  ap_value: number; prompt: string; figure?: Figure; choices: GeneratedChoice[];
  answer_label: string; answer_text: string; explanation: string; common_mistake_codes: string[];
};
const LABELS = ["A", "B", "C", "D"];
function asMath(text: string): string {
  const t = text.trim();
  if (!t) return t;
  if (/^\$[\s\S]*\$$/.test(t)) return t;
  return `$${t}$`;
}
const FALLBACK_DISTRACTORS = ["0", "1", "-1", "\\text{None of these}", "2", "\\text{The limit does not exist.}"];
export function uuidFromKey(key: string): string {
  let hex = "";
  for (let i = 0; i < 4; i++) {
    let h = 2166136261 >>> 0;
    const s = `${key}#${i}`;
    for (let j = 0; j < s.length; j++) { h ^= s.charCodeAt(j); h = Math.imul(h, 16777619) >>> 0; }
    hex += h.toString(16).padStart(8, "0");
  }
  return [hex.slice(0,8), hex.slice(8,12), `5${hex.slice(13,16)}`, `8${hex.slice(17,20)}`, hex.slice(20,32)].join("-");
}
export function buildQuestion(key: string): GeneratedQuestion | null {
  const sep = key.lastIndexOf("::"); if (sep < 0) return null;
  const templateId = key.slice(0, sep); const variant = Number(key.slice(sep + 2));
  const tpl = TEMPLATES.find((t) => t.id === templateId);
  if (!tpl || tpl.unit !== ACTIVE_BANK_UNIT || !Number.isInteger(variant) || variant < 0 || variant >= 240) return null;
  const r = makeRng(`${templateId}::${variant}`); const raw = tpl.build(r);
  const built = { prompt: tidyTex(raw.prompt), correct: tidyTex(raw.correct), distractors: raw.distractors.map(tidyTex), explanation: tidyTex(raw.explanation) };
  const seen = new Set([built.correct]); const options: string[] = [built.correct];
  for (const d of [...built.distractors, ...FALLBACK_DISTRACTORS]) { if (options.length >= 4) break; if (!seen.has(d)) { seen.add(d); options.push(d); } }
  const ordered = shuffle(makeRng(`${key}::order`), options); const choices = ordered.map((text,i)=>({label:LABELS[i],text,tex:asMath(text)}));
  const answer = choices.find((c)=>c.text===built.correct)!; const tax = templateTaxonomy(tpl);
  return { key, id:uuidFromKey(key), template_id:templateId, variant, type:"MCQ", unit_slug:tpl.unit, topic_slug:tpl.topic,
    ced_topic:tax.ced_topic, manifestation:tax.manifestation, representation:tax.representation, reasoning:tax.reasoning,
    algebra:tax.algebra, structural_signature:tax.signature, track:templateTrack(tpl), difficulty:tpl.difficulty,
    calculator:tpl.calculator??false, ap_value:1, prompt:built.prompt, figure:raw.figure,
    choices:choices.map((c)=>({label:c.label,text:c.tex})), answer_label:answer.label, answer_text:answer.tex,
    explanation:built.explanation, common_mistake_codes:tpl.mistakes??[] };
}

const VARIANT_SCAN = 240;
let KEY_CACHE: string[] | null = null;

/**
 * Builds the 242-question bank in a topic-balanced round robin. This avoids the
 * old behavior where easy-to-parameterize families could crowd out graphical,
 * tabular, theorem-condition, or conceptual questions.
 */
function allKeys(): string[] {
  if (KEY_CACHE) return KEY_CACHE;

  const unitTemplates = TEMPLATES.filter(
    (t) => t.unit === ACTIVE_BANK_UNIT && UNIT_1_TOPICS.includes(t.topic as (typeof UNIT_1_TOPICS)[number]),
  );
  const byTopic = new Map<string, string[]>(UNIT_1_TOPICS.map((topic) => [topic, []]));

  for (const t of unitTemplates) {
    const bucket = byTopic.get(t.topic);
    if (!bucket) continue;
    const seenPrompts = new Set<string>();
    for (let v = 0; v < VARIANT_SCAN && seenPrompts.size < VARIANTS_PER_TEMPLATE; v++) {
      const key = `${t.id}::${v}`;
      const q = buildQuestion(key);
      if (!q || seenPrompts.has(q.prompt)) continue;
      // A valid item must have exactly four distinct choices and one keyed answer.
      if (q.choices.length !== 4 || new Set(q.choices.map((c) => c.text)).size !== 4) continue;
      if (!q.choices.some((c) => c.label === q.answer_label)) continue;
      seenPrompts.add(q.prompt);
      bucket.push(key);
    }
  }

  // Interleave families within each topic so one template cannot dominate.
  for (const topic of UNIT_1_TOPICS) {
    const bucket = byTopic.get(topic)!;
    bucket.sort((a, b) => {
      const [ta, va] = a.split("::");
      const [tb, vb] = b.split("::");
      const variantDelta = Number(va) - Number(vb);
      return variantDelta || ta.localeCompare(tb);
    });
  }

  const keys: string[] = [];
  let row = 0;
  while (keys.length < ACTIVE_BANK_SIZE) {
    let added = false;
    for (const topic of UNIT_1_TOPICS) {
      const bucket = byTopic.get(topic)!;
      if (row < bucket.length && keys.length < ACTIVE_BANK_SIZE) {
        keys.push(bucket[row]);
        added = true;
      }
    }
    if (!added) break;
    row++;
  }

  if (keys.length < ACTIVE_BANK_SIZE) {
    throw new Error(`Unit 1 bank audit failed: expected ${ACTIVE_BANK_SIZE} valid questions, found ${keys.length}.`);
  }

  KEY_CACHE = keys;
  return keys;
}

export type BankFilter={unit_slug?:string;topic_slug?:string;track?:"AB"|"BC";calculator?:boolean;difficulty?:Difficulty};
export function bankKeys(filter?:BankFilter):string[]{
  const templateById=new Map(TEMPLATES.map((t)=>[t.id,t]));
  return allKeys().filter((k)=>{const t=templateById.get(k.slice(0,k.lastIndexOf("::")));if(!t)return false;
    if(filter?.unit_slug&&t.unit!==filter.unit_slug)return false;if(filter?.topic_slug&&t.topic!==filter.topic_slug)return false;
    if(filter?.calculator!==undefined&&(t.calculator??false)!==filter.calculator)return false;if(filter?.difficulty&&t.difficulty!==filter.difficulty)return false;
    return inTrack(t,filter?.track);});
}
export function questionKeyInTrack(key:string,track:"AB"|"BC"):boolean{const templateId=key.slice(0,key.lastIndexOf("::"));const t=TEMPLATES.find((c)=>c.id===templateId);return t?inTrack(t,track):false;}
export function bankCount(filter?:BankFilter):number{return bankKeys(filter).length;}
