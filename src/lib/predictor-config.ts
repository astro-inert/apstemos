/**
 * Configuration for the MCQ-Based AP Score Estimate.
 *
 * Everything tunable lives here so thresholds are never hardcoded across the
 * app. Values marked MODEL ASSUMPTION are AP STEM OS modeling choices, NOT
 * official College Board scoring information.
 */

export const MODEL_VERSION = "mcq_predictor_v1";

/** Provisional (author-assigned) item difficulty on the logit scale.
 *  MODEL ASSUMPTION — these are not empirically calibrated. */
export const PROVISIONAL_DIFFICULTY: Record<"easy" | "medium" | "hard", number> = {
  easy: -0.9,
  medium: 0.0,
  hard: 1.0,
};

/** First-attempt responses required on an item before its empirical difficulty
 *  may be used in place of the provisional value. */
export const ITEM_CALIBRATION_MIN_RESPONSES = 200;

/** Evidence weights by response provenance. First-time performance on unseen
 *  items dominates; repeats contribute almost nothing. */
export const EVIDENCE_WEIGHTS = {
  diagnostic: 1,
  first_attempt: 0.55,
  previously_seen: 0.15,
  previously_answered: 0.05,
  repeat_attempt: 0.05,
} as const;

/** Ability-scale cut points separating estimated AP scores 1|2, 2|3, 3|4, 4|5.
 *  MODEL ASSUMPTION — derived from our own item difficulty scale, not from any
 *  published College Board MCQ-to-score mapping. */
export const SCORE_CUTS = [-1.55, -0.6, 0.25, 1.15];

/** Prior mean/SD for ability, used to regularize small samples. */
export const ABILITY_PRIOR = { mean: -0.15, sd: 1.2 };

export type ConfidenceState = "insufficient_data" | "preliminary" | "moderate" | "high";

/** Evidence gates per confidence state. A state applies when every gate is met. */
export const CONFIDENCE_GATES: Record<Exclude<ConfidenceState, "insufficient_data">, {
  minEffectiveItems: number;
  minUniqueItems: number;
  minCoverage: number;
  maxStandardError: number;
  requiresDiagnostic: boolean;
}> = {
  preliminary: {
    minEffectiveItems: 12,
    minUniqueItems: 15,
    minCoverage: 0.15,
    maxStandardError: 1.2,
    requiresDiagnostic: false,
  },
  moderate: {
    minEffectiveItems: 30,
    minUniqueItems: 40,
    minCoverage: 0.45,
    maxStandardError: 0.55,
    requiresDiagnostic: false,
  },
  high: {
    minEffectiveItems: 65,
    minUniqueItems: 80,
    minCoverage: 0.7,
    maxStandardError: 0.38,
    requiresDiagnostic: true,
  },
};

/** Coverage scoring. */
export const COVERAGE = {
  /** First-attempt items in a unit for that unit to count as covered. */
  itemsPerUnit: 4,
  /** First-attempt items in a topic for that topic to count as covered. */
  itemsPerTopic: 2,
  /** Component weights; must sum to 1. */
  weights: { unit: 0.45, topic: 0.25, difficultyMix: 0.15, spread: 0.15 },
};

/** Dedicated diagnostic blueprint. */
export const DIAGNOSTIC = {
  itemCount: 30,
  timeLimitSeconds: 45 * 60,
  /** Target share of items per difficulty band. */
  difficultyMix: { easy: 0.3, medium: 0.5, hard: 0.2 },
  /** A diagnostic older than this stops counting as primary evidence. */
  freshnessDays: 45,
};

/** Validation reporting gate: below this many reported real AP scores we refuse
 *  to display any accuracy metric at all. */
export const VALIDATION_MIN_REPORTED = 30;
