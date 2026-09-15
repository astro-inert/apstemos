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
 * IMPORTANT: Practice is intentionally scoped to Unit 1 while APSTEMOS moves
 * from the legacy generated bank to the audited Navigator-aligned Unit 1 bank.
 * This prevents legacy Unit 2–10 generated items from appearing during the
 * replacement. The canonical Unit 1 bank is wired in separately.
 */
const ACTIVE_BANK_UNIT = "unit-1-limits-and-continuity";

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

export const VARIANTS_PER_TEMPLATE = 18;
export const MAX_VARIANTS_PER_MANIFESTATION = 36;
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
  if (!t.includes("\\text{")) return `$${t}$`;
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
const VARIANT_SCAN = 240; let KEY_CACHE: string[] | null = null;
function promptSignature(prompt:string){return prompt.replace(/-?\d+(\.\d+)?/g,"#").replace(/\s+/g," ").trim();}
function allKeys(): string[] {
  if (KEY_CACHE) return KEY_CACHE; const keys:string[]=[]; const familySignatures=new Set<string>();
  for (const t of TEMPLATES) {
    if (t.unit !== ACTIVE_BANK_UNIT) continue;
    const probe=buildQuestion(`${t.id}::0`); if(probe){const sig=`${t.topic}|${promptSignature(probe.prompt)}`; if(familySignatures.has(sig)) continue; familySignatures.add(sig);}
    const seen=new Set<string>();
    for(let v=0;v<VARIANT_SCAN && seen.size<VARIANTS_PER_TEMPLATE;v++){const key=`${t.id}::${v}`;const q=buildQuestion(key);if(!q||seen.has(q.prompt))continue;seen.add(q.prompt);keys.push(key);}
  }
  KEY_CACHE=keys; return keys;
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
