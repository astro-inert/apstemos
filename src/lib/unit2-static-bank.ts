import type { Figure } from "./figures";
import type { Difficulty } from "./question-templates";

export type StaticUnit2Question = {
  key:string; unit_slug:string; topic_slug:string; ced_topic:string; difficulty:Difficulty; calculator:boolean;
  prompt:string; choices:Array<{label:string;text:string}>; answer_label:string; explanation:string; representation:string; figure?:Figure;
};

export const UNIT2_STATIC_BANK: StaticUnit2Question[] = [];