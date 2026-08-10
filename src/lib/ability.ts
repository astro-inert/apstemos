/**
 * Pure ability-estimation math for the MCQ-based AP score estimate.
 *
 * No I/O, no framework imports — safe to unit test and to run on either side of
 * the wire. Everything statistical happens here; server functions only load
 * data and call these functions.
 */

import {
  ABILITY_PRIOR,
  COVERAGE,
  CONFIDENCE_GATES,
  EVIDENCE_WEIGHTS,
  PROVISIONAL_DIFFICULTY,
  SCORE_CUTS,
  type ConfidenceState,
} from "./predictor-config";

export type ResponseKind = keyof typeof EVIDENCE_WEIGHTS;

export type ScoredResponse = {
  question_key: string;
  correct: boolean;
  kind: ResponseKind;
  difficulty_label: "easy" | "medium" | "hard";
  /** Empirical difficulty in logits when the item is calibrated. */
  empirical_difficulty?: number | null;
  /** Empirically estimated discrimination; ignored when absent (fixed at 1). */
  discrimination?: number | null;
  calibrated?: boolean;
  unit_slug?: string | null;
  topic_slug?: string | null;
};

export type AbilityEstimate = {
  theta: number;
  se: number;
  /** Distinct items contributing any evidence. */
  itemsUsed: number;
  /** Sum of evidence weights — the sample size the model actually "believes". */
  effectiveItems: number;
  /** Share of contributing items whose difficulty is provisional, not calibrated. */
  provisionalShare: number;
};

function itemParams(r: ScoredResponse): { b: number; a: number; provisional: boolean } {
  const calibrated = !!r.calibrated && typeof r.empirical_difficulty === "number";
  const b = calibrated
    ? (r.empirical_difficulty as number)
    : (PROVISIONAL_DIFFICULTY[r.difficulty_label] ?? 0);
  // Discrimination is only used where it was actually estimated (2PL);
  // otherwise Rasch/1PL with a = 1.
  const a = calibrated && typeof r.discrimination === "number" && r.discrimination > 0
    ? Math.min(2.5, Math.max(0.4, r.discrimination))
    : 1;
  return { b, a, provisional: !calibrated };
}

function prob(theta: number, a: number, b: number): number {
  const z = a * (theta - b);
  return 1 / (1 + Math.exp(-z));
}

/**
 * Weighted MAP ability estimate under a 1PL/2PL model with a weak normal prior.
 * Responses are weighted by provenance so repeats cannot move the estimate.
 */
export function estimateAbility(responses: ScoredResponse[]): AbilityEstimate {
  const items = responses.map((r) => ({ r, w: EVIDENCE_WEIGHTS[r.kind] ?? 0, ...itemParams(r) }))
    .filter((i) => i.w > 0);

  const effectiveItems = items.reduce((s, i) => s + i.w, 0);
  const provisionalShare = items.length ? items.filter((i) => i.provisional).length / items.length : 1;

  if (!items.length) {
    return { theta: ABILITY_PRIOR.mean, se: ABILITY_PRIOR.sd, itemsUsed: 0, effectiveItems: 0, provisionalShare: 1 };
  }

  // Grid + local refinement on the weighted log-posterior (well behaved, no
  // divergence on all-correct / all-wrong response patterns thanks to the prior).
  const logPost = (theta: number) => {
    let ll = 0;
    for (const i of items) {
      const p = Math.min(1 - 1e-9, Math.max(1e-9, prob(theta, i.a, i.b)));
      ll += i.w * (i.r.correct ? Math.log(p) : Math.log(1 - p));
    }
    const d = theta - ABILITY_PRIOR.mean;
    return ll - (d * d) / (2 * ABILITY_PRIOR.sd * ABILITY_PRIOR.sd);
  };

  let best = -4;
  let bestVal = -Infinity;
  for (let t = -4; t <= 4.0001; t += 0.02) {
    const v = logPost(t);
    if (v > bestVal) {
      bestVal = v;
      best = t;
    }
  }
  for (let t = best - 0.02; t <= best + 0.02; t += 0.002) {
    const v = logPost(t);
    if (v > bestVal) {
      bestVal = v;
      best = t;
    }
  }
  const theta = Math.round(best * 1000) / 1000;

  // Fisher information + prior precision -> posterior SE.
  let info = 1 / (ABILITY_PRIOR.sd * ABILITY_PRIOR.sd);
  for (const i of items) {
    const p = prob(theta, i.a, i.b);
    info += i.w * i.a * i.a * p * (1 - p);
  }
  const se = Math.round((1 / Math.sqrt(info)) * 1000) / 1000;

  return {
    theta,
    se,
    itemsUsed: items.length,
    effectiveItems: Math.round(effectiveItems * 100) / 100,
    provisionalShare: Math.round(provisionalShare * 1000) / 1000,
  };
}

/* ------------------------------------------------------------------ coverage */

export type CoverageInput = {
  responses: ScoredResponse[];
  /** unit_slug -> AP exam weight (percent). */
  unitWeights: Record<string, number>;
  /** Total topics in the curriculum. */
  totalTopics: number;
};

export type CoverageResult = {
  score: number; // 0-1
  unitCoverage: number;
  topicCoverage: number;
  difficultyMix: number;
  spread: number;
  unitsCovered: number;
  unitsTotal: number;
  topicsCovered: number;
  topicsTotal: number;
};

/** Herfindahl-based concentration penalty: many items from one unit is not breadth. */
function spreadScore(counts: number[]): number {
  const total = counts.reduce((s, c) => s + c, 0);
  if (total === 0 || counts.length < 2) return 0;
  const h = counts.reduce((s, c) => s + (c / total) ** 2, 0);
  const min = 1 / counts.length;
  return Math.max(0, Math.min(1, (1 - h) / (1 - min)));
}

export function computeCoverage({ responses, unitWeights, totalTopics }: CoverageInput): CoverageResult {
  // Only first-time evidence counts toward coverage.
  const firsts = responses.filter((r) => r.kind === "diagnostic" || r.kind === "first_attempt");

  const unitCounts = new Map<string, number>();
  const topicCounts = new Map<string, number>();
  const diffCounts = { easy: 0, medium: 0, hard: 0 };
  for (const r of firsts) {
    if (r.unit_slug) unitCounts.set(r.unit_slug, (unitCounts.get(r.unit_slug) ?? 0) + 1);
    if (r.topic_slug) topicCounts.set(r.topic_slug, (topicCounts.get(r.topic_slug) ?? 0) + 1);
    diffCounts[r.difficulty_label] += 1;
  }

  const unitSlugs = Object.keys(unitWeights);
  const totalWeight = unitSlugs.reduce((s, u) => s + (unitWeights[u] ?? 0), 0) || 1;
  let coveredWeight = 0;
  let unitsCovered = 0;
  for (const u of unitSlugs) {
    if ((unitCounts.get(u) ?? 0) >= COVERAGE.itemsPerUnit) {
      coveredWeight += unitWeights[u] ?? 0;
      unitsCovered += 1;
    }
  }
  const unitCoverage = coveredWeight / totalWeight;

  const topicsCovered = [...topicCounts.values()].filter((n) => n >= COVERAGE.itemsPerTopic).length;
  const topicCoverage = totalTopics > 0 ? Math.min(1, topicsCovered / totalTopics) : 0;

  // Difficulty mix: how close the item mix is to touching all three bands evenly.
  const dTotal = diffCounts.easy + diffCounts.medium + diffCounts.hard;
  const difficultyMix = dTotal === 0
    ? 0
    : 1 - (Math.abs(diffCounts.easy / dTotal - 1 / 3) + Math.abs(diffCounts.medium / dTotal - 1 / 3) + Math.abs(diffCounts.hard / dTotal - 1 / 3)) / (4 / 3);

  const spread = spreadScore(unitSlugs.map((u) => unitCounts.get(u) ?? 0));

  const w = COVERAGE.weights;
  const score = Math.max(
    0,
    Math.min(1, unitCoverage * w.unit + topicCoverage * w.topic + difficultyMix * w.difficultyMix + spread * w.spread),
  );

  return {
    score: Math.round(score * 1000) / 1000,
    unitCoverage: Math.round(unitCoverage * 1000) / 1000,
    topicCoverage: Math.round(topicCoverage * 1000) / 1000,
    difficultyMix: Math.round(Math.max(0, difficultyMix) * 1000) / 1000,
    spread: Math.round(spread * 1000) / 1000,
    unitsCovered,
    unitsTotal: unitSlugs.length,
    topicsCovered,
    topicsTotal: totalTopics,
  };
}

/* -------------------------------------------------------------- distribution */

const SQRT2 = Math.sqrt(2);

function erf(x: number): number {
  // Abramowitz & Stegun 7.1.26
  const s = x < 0 ? -1 : 1;
  const ax = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * ax);
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) *
      t *
      Math.exp(-ax * ax);
  return s * y;
}

function normalCdf(x: number, mean: number, sd: number): number {
  if (sd <= 0) return x >= mean ? 1 : 0;
  return 0.5 * (1 + erf((x - mean) / (sd * SQRT2)));
}

export type ScoreDistribution = {
  /** Probability mass for scores 1..5, summing to 1. */
  probabilities: Record<1 | 2 | 3 | 4 | 5, number>;
  mostLikely: 1 | 2 | 3 | 4 | 5;
  /** Narrowest contiguous band holding >= 80% of the mass. */
  low: 1 | 2 | 3 | 4 | 5;
  high: 1 | 2 | 3 | 4 | 5;
};

/**
 * Convolves the ability posterior with the score cut points. The result is a
 * model estimate of where this ability sits, not a calibrated probability.
 */
export function scoreDistribution(theta: number, se: number): ScoreDistribution {
  const sd = Math.max(0.12, se);
  const cdfs = SCORE_CUTS.map((c) => normalCdf(c, theta, sd));
  const raw = [
    cdfs[0]!,
    cdfs[1]! - cdfs[0]!,
    cdfs[2]! - cdfs[1]!,
    cdfs[3]! - cdfs[2]!,
    1 - cdfs[3]!,
  ].map((p) => Math.max(0, p));
  const total = raw.reduce((s, p) => s + p, 0) || 1;
  const p = raw.map((v) => v / total);

  const probabilities = {
    1: Math.round(p[0]! * 1000) / 1000,
    2: Math.round(p[1]! * 1000) / 1000,
    3: Math.round(p[2]! * 1000) / 1000,
    4: Math.round(p[3]! * 1000) / 1000,
    5: Math.round(p[4]! * 1000) / 1000,
  } as Record<1 | 2 | 3 | 4 | 5, number>;

  let mostLikely: 1 | 2 | 3 | 4 | 5 = 1;
  for (const k of [2, 3, 4, 5] as const) if (probabilities[k] > probabilities[mostLikely]) mostLikely = k;

  // Narrowest window covering 80% of the mass.
  let bestLo = 1;
  let bestHi = 5;
  let bestWidth = 5;
  for (let lo = 0; lo < 5; lo++) {
    let mass = 0;
    for (let hi = lo; hi < 5; hi++) {
      mass += p[hi]!;
      if (mass >= 0.8) {
        const width = hi - lo + 1;
        if (width < bestWidth) {
          bestWidth = width;
          bestLo = lo + 1;
          bestHi = hi + 1;
        }
        break;
      }
    }
  }

  return { probabilities, mostLikely, low: bestLo as 1, high: bestHi as 5 };
}

/* ----------------------------------------------------------------- confidence */

export function resolveConfidence(input: {
  effectiveItems: number;
  uniqueItems: number;
  coverage: number;
  se: number;
  hasFreshDiagnostic: boolean;
}): { state: ConfidenceState; missing: string[] } {
  const order: Array<Exclude<ConfidenceState, "insufficient_data">> = ["high", "moderate", "preliminary"];
  for (const state of order) {
    const g = CONFIDENCE_GATES[state];
    if (
      input.effectiveItems >= g.minEffectiveItems &&
      input.uniqueItems >= g.minUniqueItems &&
      input.coverage >= g.minCoverage &&
      input.se <= g.maxStandardError &&
      (!g.requiresDiagnostic || input.hasFreshDiagnostic)
    ) {
      return { state, missing: [] };
    }
  }

  const g = CONFIDENCE_GATES.preliminary;
  const missing: string[] = [];
  if (input.uniqueItems < g.minUniqueItems) {
    missing.push(`${g.minUniqueItems - input.uniqueItems} more questions you haven't seen before`);
  }
  if (input.coverage < g.minCoverage) missing.push("questions from more units and topics");
  if (input.se > g.maxStandardError) missing.push("more consistent evidence to narrow the range");
  return { state: "insufficient_data", missing: missing.length ? missing : ["more first-attempt questions"] };
}

/** Next best action to tighten the estimate, given the current evidence. */
export function nextStepFor(input: {
  state: ConfidenceState;
  uniqueItems: number;
  coverage: number;
  hasFreshDiagnostic: boolean;
}): string {
  if (input.state === "insufficient_data") {
    return "Answer more new practice questions, or take the timed MCQ diagnostic.";
  }
  if (!input.hasFreshDiagnostic) return "Take the timed MCQ diagnostic — it is the strongest single source of evidence.";
  if (input.coverage < CONFIDENCE_GATES.high.minCoverage) return "Practice units and topics you have barely touched to widen coverage.";
  if (input.uniqueItems < CONFIDENCE_GATES.high.minUniqueItems) return "Keep answering questions you have not seen before.";
  return "Keep practicing new questions; the estimate updates as evidence accumulates.";
}
