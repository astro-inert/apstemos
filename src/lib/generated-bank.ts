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
import { UNIT2_STATIC_BANK, UNIT2_STATIC_BY_KEY } from "./unit2-static-bank";

/** Canonical Practice bank: 242 Unit 1 items + 210 audited Unit 2 items. */
const UNIT1 = "unit-1-limits-and-continuity";
const UNIT1_SIZE = 242;
const UNIT2 = "unit-2-differentiation-definition-and-properties";

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
  if (/^[+-]?(?:\d+(?:\.\d+)?|\d+\/\d+)$/.test(t)) return `$${t}$`;
  return t;
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

function representationFromLabel(label: string): Representation {
  const x = label.toLowerCase();
  if (x.includes("graph")) return "graphical";
  if (x.includes("tabular")) return "tabular";
  if (x.includes("verbal")) return "verbal";
  if (x.includes("mixed")) return "mixed";
  if (x.includes("context")) return "contextual";
  return "symbolic";
}

function buildStaticUnit2(key: string): GeneratedQuestion | null {
  const q = UNIT2_STATIC_BY_KEY.get(key);
  if (!q) return null;
  const representation = representationFromLabel(q.representation);
  const manifestation = `unit2-static:${q.key}`;
  const choices = q.choices.map((c) => ({ label: c.label, text: asMath(c.text) }));
  const answer = choices.find((c) => c.label === q.answer_label);
  if (!answer || choices.length !== 4 || new Set(choices.map((c) => c.text)).size !== 4) return null;
  return {
    key:q.key,
    id:uuidFromKey(`static::${q.key}`),
    template_id:"unit2-audited-static",
    variant:0,
    type:"MCQ",
    unit_slug:UNIT2,
    topic_slug:q.topic_slug,
    ced_topic:q.ced_topic,
    manifestation,
    representation,
    reasoning:"computation",
    algebra:"plain",
    structural_signature:`${q.topic_slug}|${q.ced_topic}|${representation}|${q.key}`,
    difficulty:q.difficulty,
    track:"both",
    calculator:q.calculator,
    ap_value:1,
    prompt:q.prompt,
    figure:q.figure,
    choices,
    answer_label:q.answer_label,
    answer_text:answer.text,
    explanation:q.explanation,
    common_mistake_codes:[],
  };
}

function buildUnit1(key: string): GeneratedQuestion | null {
  const sep = key.lastIndexOf("::"); if (sep < 0) return null;
  const templateId = key.slice(0, sep); const variant = Number(key.slice(sep + 2));
  const tpl = TEMPLATES.find((t) => t.id === templateId);
  if (!tpl || tpl.unit !== UNIT1 || !Number.isInteger(variant) || variant < 0 || variant >= 240) return null;
  const r = makeRng(`${templateId}::${variant}`); const raw = tpl.build(r);
  const built = { prompt: tidyTex(raw.prompt), correct: tidyTex(raw.correct), distractors: raw.distractors.map(tidyTex), explanation: tidyTex(raw.explanation) };
  const seen = new Set([built.correct]); const options: string[] = [built.correct];
  for (const d of [...built.distractors, ...FALLBACK_DISTRACTORS]) { if (options.length >= 4) break; if (!seen.has(d)) { seen.add(d); options.push(d); } }
  const ordered = shuffle(makeRng(`${key}::order`), options); const choices = ordered.map((text,i)=>({label:LABELS[i],text,tex:`$${text}$`}));
  const answer = choices.find((c)=>c.text===built.correct)!; const tax = templateTaxonomy(tpl);
  return { key, id:uuidFromKey(key), template_id:templateId, variant, type:"MCQ", unit_slug:tpl.unit, topic_slug:tpl.topic,
    ced_topic:tax.ced_topic, manifestation:tax.manifestation, representation:tax.representation, reasoning:tax.reasoning,
    algebra:tax.algebra, structural_signature:tax.signature, track:templateTrack(tpl), difficulty:tpl.difficulty,
    calculator:tpl.calculator??false, ap_value:1, prompt:built.prompt, figure:raw.figure,
    choices:choices.map((c)=>({label:c.label,text:c.tex})), answer_label:answer.label, answer_text:answer.tex,
    explanation:built.explanation, common_mistake_codes:tpl.mistakes??[] };
}

export function buildQuestion(key: string): GeneratedQuestion | null {
  return buildStaticUnit2(key) ?? buildUnit1(key);
}

const VARIANT_SCAN = 240;
let UNIT1_KEY_CACHE: string[] | null = null;
function unit1Keys(): string[] {
  if (UNIT1_KEY_CACHE) return UNIT1_KEY_CACHE;
  const unitTemplates = TEMPLATES.filter((t) => t.unit === UNIT1 && UNIT_1_TOPICS.includes(t.topic as (typeof UNIT_1_TOPICS)[number]));
  const byTopic = new Map<string, string[]>(UNIT_1_TOPICS.map((topic) => [topic, []]));
  for (const t of unitTemplates) {
    const bucket = byTopic.get(t.topic); if (!bucket) continue;
    const seenPrompts = new Set<string>();
    for (let v=0; v<VARIANT_SCAN && seenPrompts.size<VARIANTS_PER_TEMPLATE; v++) {
      const key=`${t.id}::${v}`; const q=buildUnit1(key);
      if (!q || seenPrompts.has(q.prompt)) continue;
      if (q.choices.length!==4 || new Set(q.choices.map((c)=>c.text)).size!==4) continue;
      if (!q.choices.some((c)=>c.label===q.answer_label)) continue;
      seenPrompts.add(q.prompt); bucket.push(key);
    }
  }
  for (const topic of UNIT_1_TOPICS) byTopic.get(topic)!.sort((a,b)=>{const [ta,va]=a.split("::");const [tb,vb]=b.split("::");return Number(va)-Number(vb)||ta.localeCompare(tb);});
  const keys:string[]=[]; let row=0;
  while(keys.length<UNIT1_SIZE){let added=false;for(const topic of UNIT_1_TOPICS){const bucket=byTopic.get(topic)!;if(row<bucket.length&&keys.length<UNIT1_SIZE){keys.push(bucket[row]);added=true;}}if(!added)break;row++;}
  if(keys.length<UNIT1_SIZE) throw new Error(`Unit 1 bank audit failed: expected ${UNIT1_SIZE} valid questions, found ${keys.length}.`);
  UNIT1_KEY_CACHE=keys; return keys;
}

function allKeys(): string[] { return [...unit1Keys(), ...UNIT2_STATIC_BANK.map((q)=>q.key)]; }

export type BankFilter={unit_slug?:string;topic_slug?:string;track?:"AB"|"BC";calculator?:boolean;difficulty?:Difficulty};
export function bankKeys(filter?:BankFilter):string[]{
  return allKeys().filter((key)=>{
    const q=buildQuestion(key); if(!q)return false;
    if(filter?.unit_slug&&q.unit_slug!==filter.unit_slug)return false;
    if(filter?.topic_slug&&q.topic_slug!==filter.topic_slug)return false;
    if(filter?.calculator!==undefined&&q.calculator!==filter.calculator)return false;
    if(filter?.difficulty&&q.difficulty!==filter.difficulty)return false;
    if(filter?.track&&q.track!=="both"&&q.track!==filter.track)return false;
    return true;
  });
}
export function questionKeyInTrack(key:string,track:"AB"|"BC"):boolean{const q=buildQuestion(key);return !!q&&(q.track==="both"||q.track===track);}
export function bankCount(filter?:BankFilter):number{return bankKeys(filter).length;}
