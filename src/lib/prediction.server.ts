import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import {
  computeCoverage,
  estimateAbility,
  nextStepFor,
  resolveConfidence,
  scoreDistribution,
  type ScoredResponse,
} from "./ability";
import { DIAGNOSTIC, ITEM_CALIBRATION_MIN_RESPONSES, MODEL_VERSION } from "./predictor-config";
import { QN_UNITS } from "./question-navigator-data";

type DB = SupabaseClient<Database>;

export type ScoreEstimate = {
  model_version: string;
  /** null whenever confidence_state is insufficient_data — never show a score then. */
  estimated_score: number | null;
  range: { low: number; high: number } | null;
  distribution: Record<string, number> | null;
  ability: number;
  standard_error: number;
  confidence_state: "insufficient_data" | "preliminary" | "moderate" | "high";
  coverage: ReturnType<typeof computeCoverage>;
  question_count: number;
  unique_question_count: number;
  first_attempt_count: number;
  repeat_count: number;
  provisional_share: number;
  /** true when no item in the pool has empirically calibrated difficulty yet */
  uncalibrated: boolean;
  has_fresh_diagnostic: boolean;
  last_diagnostic_at: string | null;
  missing: string[];
  next_step: string;
};

const TOTAL_TOPICS = QN_UNITS.reduce((s, u) => s + u.topics.length, 0);

function unitWeightMap(unitRows: Array<{ number: number; ap_weight_pct: number | string }>) {
  const byNumber = new Map(unitRows.map((u) => [u.number, Number(u.ap_weight_pct)]));
  const map: Record<string, number> = {};
  for (const u of QN_UNITS) map[u.slug] = byNumber.get(u.number) ?? 100 / QN_UNITS.length;
  return map;
}

/**
 * Builds the response set the ability model consumes: diagnostic responses first
 * (primary evidence), then practice attempts tagged by provenance.
 */
export async function buildScoreEstimate(supabase: DB, userId: string): Promise<ScoreEstimate> {
  const [attemptsRes, diagRes, diagRespRes, unitsRes] = await Promise.all([
    supabase
      .from("attempts")
      .select("question_key, correct, attempt_kind, difficulty, unit_slug, topic_slug, diagnostic_id")
      .eq("user_id", userId)
      .not("question_key", "is", null),
    supabase
      .from("diagnostics")
      .select("id, submitted_at")
      .eq("user_id", userId)
      .not("submitted_at", "is", null)
      .order("submitted_at", { ascending: false })
      .limit(1),
    supabase
      .from("diagnostic_responses")
      .select("question_key, correct, difficulty, unit_slug, topic_slug, diagnostic_id, was_unseen")
      .eq("user_id", userId),
    supabase.from("units").select("number, ap_weight_pct").eq("subject_id", "ap-calc-bc"),
  ]);

  const latestDiagnostic = diagRes.data?.[0] ?? null;
  const freshCutoff = Date.now() - DIAGNOSTIC.freshnessDays * 86400_000;
  const has_fresh_diagnostic = !!latestDiagnostic?.submitted_at && new Date(latestDiagnostic.submitted_at).getTime() >= freshCutoff;

  const diagResponses = (diagRespRes.data ?? []).filter(
    (r) => latestDiagnostic && r.diagnostic_id === latestDiagnostic.id,
  );

  // Diagnostic items take precedence; practice attempts for the same key are skipped.
  const claimed = new Set(diagResponses.map((r) => r.question_key));

  const responses: ScoredResponse[] = [];
  for (const r of diagResponses) {
    responses.push({
      question_key: r.question_key,
      correct: !!r.correct,
      kind: "diagnostic",
      difficulty_label: (r.difficulty ?? "medium") as "easy" | "medium" | "hard",
      unit_slug: r.unit_slug,
      topic_slug: r.topic_slug,
    });
  }

  let repeat_count = 0;
  let first_attempt_count = 0;
  const seenPractice = new Set<string>();
  for (const a of attemptsRes.data ?? []) {
    const key = a.question_key!;
    if (claimed.has(key)) continue;
    const kind = (a.attempt_kind ?? "first_attempt") as ScoredResponse["kind"];
    if (kind === "first_attempt") first_attempt_count += 1;
    else repeat_count += 1;
    // Only the strongest response per key contributes.
    if (seenPractice.has(key) && kind !== "first_attempt") continue;
    seenPractice.add(key);
    responses.push({
      question_key: key,
      correct: !!a.correct,
      kind,
      difficulty_label: (a.difficulty ?? "medium") as "easy" | "medium" | "hard",
      unit_slug: a.unit_slug,
      topic_slug: a.topic_slug,
    });
  }

  // Attach empirical item parameters where they exist and are past the sample floor.
  const keys = [...new Set(responses.map((r) => r.question_key))];
  if (keys.length) {
    const statRows: Array<{
      question_key: string;
      empirical_difficulty: number | null;
      discrimination: number | null;
      calibrated: boolean;
      n_first_attempts: number;
      difficulty_label: string;
    }> = [];
    for (let i = 0; i < keys.length; i += 200) {
      const { data } = await supabase
        .from("item_stats")
        .select("question_key, empirical_difficulty, discrimination, calibrated, n_first_attempts, difficulty_label")
        .in("question_key", keys.slice(i, i + 200));
      statRows.push(...((data ?? []) as typeof statRows));
    }
    const byKey = new Map(statRows.map((s) => [s.question_key, s]));
    for (const r of responses) {
      const s = byKey.get(r.question_key);
      if (!s) continue;
      const usable = s.calibrated && s.n_first_attempts >= ITEM_CALIBRATION_MIN_RESPONSES && s.empirical_difficulty !== null;
      r.calibrated = usable;
      r.empirical_difficulty = usable ? Number(s.empirical_difficulty) : null;
      r.discrimination = usable && s.discrimination !== null ? Number(s.discrimination) : null;
      if (s.difficulty_label) r.difficulty_label = s.difficulty_label as "easy" | "medium" | "hard";
    }
  }

  const ability = estimateAbility(responses);
  const coverage = computeCoverage({
    responses,
    unitWeights: unitWeightMap(unitsRes.data ?? []),
    totalTopics: TOTAL_TOPICS,
  });

  const unique_question_count = keys.length;
  const { state, missing } = resolveConfidence({
    effectiveItems: ability.effectiveItems,
    uniqueItems: unique_question_count,
    coverage: coverage.score,
    se: ability.se,
    hasFreshDiagnostic: has_fresh_diagnostic,
  });

  const dist = scoreDistribution(ability.theta, ability.se);
  const showScore = state !== "insufficient_data";

  return {
    model_version: MODEL_VERSION,
    estimated_score: showScore ? dist.mostLikely : null,
    range: showScore ? { low: dist.low, high: dist.high } : null,
    distribution: showScore
      ? Object.fromEntries(Object.entries(dist.probabilities).map(([k, v]) => [k, v]))
      : null,
    ability: ability.theta,
    standard_error: ability.se,
    confidence_state: state,
    coverage,
    question_count: responses.length,
    unique_question_count,
    first_attempt_count: first_attempt_count + diagResponses.length,
    repeat_count,
    provisional_share: ability.provisionalShare,
    uncalibrated: ability.provisionalShare >= 1,
    has_fresh_diagnostic,
    last_diagnostic_at: latestDiagnostic?.submitted_at ?? null,
    missing,
    next_step: nextStepFor({
      state,
      uniqueItems: unique_question_count,
      coverage: coverage.score,
      hasFreshDiagnostic: has_fresh_diagnostic,
    }),
  };
}

/** Persists an estimate so accuracy can be validated later against reported scores. */
export async function persistEstimate(
  supabase: DB,
  userId: string,
  est: ScoreEstimate,
  diagnosticId?: string | null,
) {
  const { data, error } = await supabase
    .from("predictions")
    .insert({
      user_id: userId,
      model_version: est.model_version,
      estimated_score: est.estimated_score,
      score_low: est.range?.low ?? null,
      score_high: est.range?.high ?? null,
      distribution: est.distribution ?? {},
      ability: est.ability,
      standard_error: est.standard_error,
      confidence_state: est.confidence_state,
      coverage_score: est.coverage.score,
      question_count: est.question_count,
      unique_question_count: est.unique_question_count,
      provisional_share: est.provisional_share,
      diagnostic_id: diagnosticId ?? null,
    })
    .select("id")
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data?.id ?? null;
}
