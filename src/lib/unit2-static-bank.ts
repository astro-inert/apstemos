import { expandChunk, type StaticUnit2Question } from "./unit2-bank-types";
import { chunk as d1 } from "./unit2-bank-definition-1";
import { chunk as d2 } from "./unit2-bank-definition-2";
import { chunk as d3 } from "./unit2-bank-definition-3";
import { chunk as d4 } from "./unit2-bank-definition-4";
import { chunk as d5 } from "./unit2-bank-definition-5";
import { chunk as d6 } from "./unit2-bank-definition-6";
import { chunk as p1 } from "./unit2-bank-power-a";
import { chunk as p2 } from "./unit2-bank-power-b";
import { chunk as pq1 } from "./unit2-bank-product-a";
import { chunk as pq2 } from "./unit2-bank-product-b";
import { chunk as t1 } from "./unit2-bank-trig-a";
import { chunk as t2 } from "./unit2-bank-trig-b";
import { chunk as c1 } from "./unit2-bank-diffcont-1";
import { chunk as c2 } from "./unit2-bank-diffcont-2";
import { chunk as c3 } from "./unit2-bank-diffcont-3";
import { chunk as c4 } from "./unit2-bank-diffcont-4";
import { chunk as c5 } from "./unit2-bank-diffcont-5";
import { chunk as c6 } from "./unit2-bank-diffcont-6";

export const UNIT2_STATIC_BANK: StaticUnit2Question[] = [
  d1,d2,d3,d4,d5,d6,p1,p2,pq1,pq2,t1,t2,c1,c2,c3,c4,c5,c6,
].flatMap(expandChunk);

if (UNIT2_STATIC_BANK.length !== 210) {
  throw new Error(`Unit 2 bank audit failed: expected 210 questions, found ${UNIT2_STATIC_BANK.length}.`);
}

export const UNIT2_STATIC_BY_KEY = new Map(UNIT2_STATIC_BANK.map((q) => [q.key, q]));
