import type { Figure } from "./figures";
import type { Difficulty } from "./question-templates";

export type RawQuestion = [string,string,Difficulty,0|1,string,string[],number,string,string,Figure|null];
export type RawBankChunk = { t:string; e:string; q:RawQuestion[] };

export type StaticUnit2Question = {
  key:string;
  unit_slug:string;
  topic_slug:string;
  ced_topic:string;
  difficulty:Difficulty;
  calculator:boolean;
  prompt:string;
  choices:Array<{label:string;text:string}>;
  answer_label:string;
  explanation:string;
  representation:string;
  figure?:Figure;
};

const LABELS=["A","B","C","D"] as const;
export function expandChunk(chunk:RawBankChunk):StaticUnit2Question[]{
  return chunk.q.map(([key,ced,difficulty,calculator,prompt,choiceTexts,answerIndex,explanation,representation,figure])=>({
    key,
    unit_slug:"unit-2-differentiation-definition-and-properties",
    topic_slug:chunk.t,
    ced_topic:ced,
    difficulty,
    calculator:Boolean(calculator),
    prompt,
    choices:choiceTexts.map((text,i)=>({label:LABELS[i],text})),
    answer_label:LABELS[answerIndex],
    explanation:explanation||chunk.e,
    representation,
    figure:figure??undefined,
  }));
}
