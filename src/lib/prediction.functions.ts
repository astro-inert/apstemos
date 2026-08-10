import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { ScoreEstimate } from "./prediction.server";

export type { ScoreEstimate };

/** Current MCQ-based estimate for the signed-in user. Read-only. */
export const getScoreEstimate = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<ScoreEstimate> => {
    const { buildScoreEstimate } = await import("./prediction.server");
    return buildScoreEstimate(context.supabase, context.userId);
  });

/** Voluntary reporting of a real AP score, used only for validation. */
export const reportActualScore = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ actual_ap_score: z.number().int().min(1).max(5) }).parse(input))
  .handler(async ({ data, context }) => {
    const { buildScoreEstimate, persistEstimate } = await import("./prediction.server");

    const { data: latest } = await context.supabase
      .from("predictions")
      .select("id")
      .eq("user_id", context.userId)
      .is("actual_ap_score", null)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    let id = latest?.id ?? null;
    if (!id) {
      const est = await buildScoreEstimate(context.supabase, context.userId);
      id = await persistEstimate(context.supabase, context.userId, est, null);
    }
    if (!id) throw new Error("Could not record your score.");

    const { error } = await context.supabase
      .from("predictions")
      .update({ actual_ap_score: data.actual_ap_score, actual_reported_at: new Date().toISOString() })
      .eq("id", id)
      .eq("user_id", context.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Snapshots the current estimate so it can later be compared with a real score. */
export const snapshotEstimate = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { buildScoreEstimate, persistEstimate } = await import("./prediction.server");
    const est = await buildScoreEstimate(context.supabase, context.userId);
    const id = await persistEstimate(context.supabase, context.userId, est, null);
    return { id, estimate: est };
  });

export type PredictionAnalytics = {
  total_predictions: number;
  by_predicted_score: Array<{ score: number | null; count: number }>;
  by_confidence: Array<{ state: string; count: number }>;
  avg_questions: number | null;
  avg_unique_questions: number | null;
  avg_coverage: number | null;
  reported_count: number;
  validation_ready: boolean;
  validation_min_reported: number;
  /** All fields below are null until validation_ready is true. */
  mae: number | null;
  brier: number | null;
  matrix: Array<{ predicted: number; actual: number; count: number }> | null;
  calibration: Array<{ bucket: string; predicted: number; observed: number; n: number }> | null;
  accuracy_by_confidence: Array<{ state: string; exact: number; within_one: number; n: number }> | null;
  by_model_version: Array<{ model_version: string; n: number; reported: number; mae: number | null }>;
  item_calibration: { calibrated_items: number; total_items: number; min_responses: number };
};

/** Admin-only validation analytics. Never fabricates metrics: everything that
 *  depends on reported real scores stays null until enough exist. */
export const getPredictionAnalytics = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<PredictionAnalytics> => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");

    const { VALIDATION_MIN_REPORTED, ITEM_CALIBRATION_MIN_RESPONSES } = await import("./predictor-config");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: rows } = await supabaseAdmin
      .from("predictions")
      .select(
        "model_version, estimated_score, confidence_state, coverage_score, question_count, unique_question_count, distribution, actual_ap_score",
      );
    const preds = rows ?? [];

    const { count: totalItems } = await supabaseAdmin
      .from("item_stats")
      .select("question_key", { count: "exact", head: true });
    const { count: calibratedItems } = await supabaseAdmin
      .from("item_stats")
      .select("question_key", { count: "exact", head: true })
      .eq("calibrated", true);

    const countBy = <T extends string | number | null>(vals: T[]) => {
      const m = new Map<T, number>();
      for (const v of vals) m.set(v, (m.get(v) ?? 0) + 1);
      return [...m.entries()];
    };
    const avg = (vals: number[]) => (vals.length ? Math.round((vals.reduce((s, v) => s + v, 0) / vals.length) * 100) / 100 : null);

    const reported = preds.filter((p) => p.actual_ap_score !== null && p.estimated_score !== null);
    const validation_ready = reported.length >= VALIDATION_MIN_REPORTED;

    const base: PredictionAnalytics = {
      total_predictions: preds.length,
      by_predicted_score: countBy(preds.map((p) => p.estimated_score)).map(([score, count]) => ({ score, count })),
      by_confidence: countBy(preds.map((p) => p.confidence_state)).map(([state, count]) => ({ state, count })),
      avg_questions: avg(preds.map((p) => p.question_count ?? 0)),
      avg_unique_questions: avg(preds.map((p) => p.unique_question_count ?? 0)),
      avg_coverage: avg(preds.map((p) => Number(p.coverage_score ?? 0))),
      reported_count: reported.length,
      validation_ready,
      validation_min_reported: VALIDATION_MIN_REPORTED,
      mae: null,
      brier: null,
      matrix: null,
      calibration: null,
      accuracy_by_confidence: null,
      by_model_version: countBy(preds.map((p) => p.model_version)).map(([model_version, n]) => ({
        model_version: String(model_version),
        n,
        reported: reported.filter((p) => p.model_version === model_version).length,
        mae: null,
      })),
      item_calibration: {
        calibrated_items: calibratedItems ?? 0,
        total_items: totalItems ?? 0,
        min_responses: ITEM_CALIBRATION_MIN_RESPONSES,
      },
    };

    if (!validation_ready) return base;

    const errs = reported.map((p) => Math.abs((p.estimated_score as number) - (p.actual_ap_score as number)));
    const mae = Math.round((errs.reduce((s, v) => s + v, 0) / errs.length) * 100) / 100;

    // Multi-class Brier score over the stored 1-5 distribution.
    let brierSum = 0;
    let brierN = 0;
    const calBuckets = new Map<string, { p: number; o: number; n: number }>();
    for (const p of reported) {
      const dist = (p.distribution ?? {}) as Record<string, number>;
      if (!Object.keys(dist).length) continue;
      let s = 0;
      for (const k of [1, 2, 3, 4, 5]) {
        const pk = Number(dist[String(k)] ?? 0);
        const outcome = p.actual_ap_score === k ? 1 : 0;
        s += (pk - outcome) ** 2;
        const bucket = `${Math.floor(Math.min(0.99, Math.max(0, pk)) * 5) * 20}-${Math.floor(Math.min(0.99, Math.max(0, pk)) * 5) * 20 + 20}%`;
        const cur = calBuckets.get(bucket) ?? { p: 0, o: 0, n: 0 };
        cur.p += pk;
        cur.o += outcome;
        cur.n += 1;
        calBuckets.set(bucket, cur);
      }
      brierSum += s;
      brierN += 1;
    }

    const matrixMap = new Map<string, number>();
    for (const p of reported) {
      const k = `${p.estimated_score}|${p.actual_ap_score}`;
      matrixMap.set(k, (matrixMap.get(k) ?? 0) + 1);
    }

    const byConf = new Map<string, { exact: number; within: number; n: number }>();
    for (const p of reported) {
      const cur = byConf.get(p.confidence_state) ?? { exact: 0, within: 0, n: 0 };
      const diff = Math.abs((p.estimated_score as number) - (p.actual_ap_score as number));
      if (diff === 0) cur.exact += 1;
      if (diff <= 1) cur.within += 1;
      cur.n += 1;
      byConf.set(p.confidence_state, cur);
    }

    return {
      ...base,
      mae,
      brier: brierN ? Math.round((brierSum / brierN) * 1000) / 1000 : null,
      matrix: [...matrixMap.entries()].map(([k, count]) => {
        const [predicted, actual] = k.split("|");
        return { predicted: Number(predicted), actual: Number(actual), count };
      }),
      calibration: [...calBuckets.entries()]
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([bucket, v]) => ({
          bucket,
          predicted: Math.round((v.p / v.n) * 1000) / 1000,
          observed: Math.round((v.o / v.n) * 1000) / 1000,
          n: v.n,
        })),
      accuracy_by_confidence: [...byConf.entries()].map(([state, v]) => ({
        state,
        exact: Math.round((v.exact / v.n) * 1000) / 1000,
        within_one: Math.round((v.within / v.n) * 1000) / 1000,
        n: v.n,
      })),
      by_model_version: base.by_model_version.map((m) => {
        const rs = reported.filter((p) => p.model_version === m.model_version);
        return {
          ...m,
          mae: rs.length >= VALIDATION_MIN_REPORTED
            ? Math.round((rs.reduce((s, p) => s + Math.abs((p.estimated_score as number) - (p.actual_ap_score as number)), 0) / rs.length) * 100) / 100
            : null,
        };
      }),
    };
  });
