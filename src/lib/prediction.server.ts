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
  uncalibrated: boolean;
  has_fresh_diagnostic: boolean;
  last_diagnostic_at: string | null;
  missing: string[];
  next_step: string;
};

function unitWeightMap(unitRows: Array<{ number: number; ap_weight_pct: number | string }>) {
  const byNumber = new Map(unitRows.map((u) => [u.number, Number(u.ap_weight_pct)]));
  const map: Record<string, number> = {};
  for (const u of QN_UNITS) map[u.slug] = byNumber.get(u.number) ?? 100 / QN_UNITS.length;
  return map;
}

/**
 * Builds an AP score estimate from the latest submitted diagnostic only.
 * Practice remains evidence for mastery/weakness analytics, but self-selected
 * practice is intentionally excluded from the exam-score model.
 */
export async function buildScoreEstimate(supabase: DB, userId: string): Promise<ScoreEstimate> {
  const { getActiveTrack } = await import("./track.server");
  const { questionKeyInTrack } = await import("./generated-bank");
  const track = await getActiveTrack(supabase, userId);
  const [diagRes, diagRespRes, unitsRes] = await Promise.all([
    supabase
      .from("diagnostics")
      .select("id, submitted_at, question_keys")
      .eq("user_id", userId)
      .not("submitted_at", "is", null)
      .order("submitted_at", { ascending: false })
      .limit(20),
    supabase
      .from("diagnostic_responses")
      .select("question_key, correct, difficulty, unit_slug, topic_slug, diagnostic_id, was_unseen")
      .eq("user_id", userId),
    supabase.from("units").select("number, ap_weight_pct").eq("subject_id", "ap-calc-bc"),
  ]);

  const latestDiagnostic =
    (diagRes.data ?? []).find((diagnostic) => {
      const keys = diagnostic.question_keys;
      if (track === "AB")
        return keys.length > 0 && keys.every((key) => questionKeyInTrack(key, "AB"));
      return keys.some((key) => !questionKeyInTrack(key, "AB"));
    }) ?? null;
  const freshCutoff = Date.now() - DIAGNOSTIC.freshnessDays * 86400_000;
  const has_fresh_diagnostic =
    !!latestDiagnostic?.submitted_at &&
    new Date(latestDiagnostic.submitted_at).getTime() >= freshCutoff;

  const diagResponses = (diagRespRes.data ?? []).filter(
    (r) =>
      latestDiagnostic &&
      r.diagnostic_id === latestDiagnostic.id &&
      questionKeyInTrack(r.question_key, track),
  );

  const responses: ScoredResponse[] = diagResponses.map((r) => ({
    question_key: r.question_key,
    correct: !!r.correct,
    kind: "diagnostic",
    difficulty_label: (r.difficulty ?? "medium") as "easy" | "medium" | "hard",
    unit_slug: r.unit_slug,
    topic_slug: r.topic_slug,
  }));

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
        .select(
          "question_key, empirical_difficulty, discrimination, calibrated, n_first_attempts, difficulty_label",
        )
        .in("question_key", keys.slice(i, i + 200));
      statRows.push(...((data ?? []) as typeof statRows));
    }
    const byKey = new Map(statRows.map((s) => [s.question_key, s]));
    for (const r of responses) {
      const s = byKey.get(r.question_key);
      if (!s) continue;
      const usable =
        s.calibrated &&
        s.n_first_attempts >= ITEM_CALIBRATION_MIN_RESPONSES &&
        s.empirical_difficulty !== null;
      r.calibrated = usable;
      r.empirical_difficulty = usable ? Number(s.empirical_difficulty) : null;
      r.discrimination = usable && s.discrimination !== null ? Number(s.discrimination) : null;
      if (s.difficulty_label) r.difficulty_label = s.difficulty_label as "easy" | "medium" | "hard";
    }
  }

  const ability = estimateAbility(responses);
  const coverage = computeCoverage({
    responses,
    unitWeights: unitWeightMap(
      (unitsRes.data ?? []).filter((unit) => track === "BC" || unit.number <= 8),
    ),
    totalTopics: QN_UNITS.filter((unit) => track === "BC" || unit.number <= 8).reduce(
      (sum, unit) => sum + unit.topics.length,
      0,
    ),
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
  const showScore = state !== "insufficient_data" && has_fresh_diagnostic;

  return {
    model_version: MODEL_VERSION,
    estimated_score: showScore ? dist.mostLikely : null,
    range: showScore ? { low: dist.low, high: dist.high } : null,
    distribution: showScore
      ? Object.fromEntries(Object.entries(dist.probabilities).map(([k, v]) => [k, v]))
      : null,
    ability: ability.theta,
    standard_error: ability.se,
    confidence_state: showScore ? state : "insufficient_data",
    coverage,
    question_count: responses.length,
    unique_question_count,
    first_attempt_count: diagResponses.length,
    repeat_count: 0,
    provisional_share: ability.provisionalShare,
    uncalibrated: ability.provisionalShare >= 1,
    has_fresh_diagnostic,
    last_diagnostic_at: latestDiagnostic?.submitted_at ?? null,
    missing: !latestDiagnostic ? ["a completed MCQ diagnostic"] : missing,
    next_step: !latestDiagnostic
      ? "Complete the timed MCQ diagnostic to generate a score estimate. Practice results are kept separate from score prediction."
      : nextStepFor({
          state: showScore ? state : "insufficient_data",
          uniqueItems: unique_question_count,
          coverage: coverage.score,
          hasFreshDiagnostic: has_fresh_diagnostic,
        }),
  };
}

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
