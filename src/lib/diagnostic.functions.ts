import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { DiagnosticItem } from "./diagnostic.server";

export type DiagnosticSession = {
  id: string;
  items: DiagnosticItem[];
  time_limit_seconds: number;
  unseen_share: number;
  started_at: string;
};

/** Creates a fresh timed diagnostic and returns its blueprint-sampled item set. */
export const startDiagnostic = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<DiagnosticSession> => {
    const { sampleBlueprint, toClientItem } = await import("./diagnostic.server");
    const { DIAGNOSTIC } = await import("./predictor-config");
    const seed = `diag-${Date.now()}`;
    const { items, unseenShare } = await sampleBlueprint(context.supabase, context.userId, seed);
    if (!items.length) throw new Error("No diagnostic questions available.");

    const { data, error } = await context.supabase
      .from("diagnostics")
      .insert({
        user_id: context.userId,
        question_keys: items.map((q) => q.key),
        time_limit_seconds: DIAGNOSTIC.timeLimitSeconds,
        unseen_share: unseenShare,
        item_count: items.length,
      })
      .select("id, started_at, time_limit_seconds")
      .single();
    if (error) throw new Error(error.message);

    return {
      id: data.id,
      items: items.map(toClientItem),
      time_limit_seconds: data.time_limit_seconds,
      unseen_share: unseenShare,
      started_at: data.started_at,
    };
  });

/** Submits a diagnostic. Answers lock on submit; a locked session cannot change. */
export const submitDiagnostic = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        diagnostic_id: z.string().uuid(),
        responses: z
          .array(
            z.object({
              key: z.string().max(160),
              selected_label: z.string().max(2).optional(),
              time_spent_ms: z.number().int().min(0).max(3_600_000).optional(),
            }),
          )
          .min(1)
          .max(80),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { buildQuestion } = await import("./generated-bank");
    const { recordExposure } = await import("./exposure.server");
    const { buildScoreEstimate, persistEstimate } = await import("./prediction.server");

    const { data: session, error: sErr } = await context.supabase
      .from("diagnostics")
      .select("id, locked, question_keys")
      .eq("id", data.diagnostic_id)
      .eq("user_id", context.userId)
      .maybeSingle();
    if (sErr) throw new Error(sErr.message);
    if (!session) throw new Error("Diagnostic not found.");
    if (session.locked) throw new Error("This diagnostic was already submitted.");

    const allowed = new Set(session.question_keys);
    const { data: exposure } = await context.supabase
      .from("question_exposure")
      .select("question_key")
      .eq("user_id", context.userId);
    const seen = new Set((exposure ?? []).map((e) => e.question_key));

    let correctCount = 0;
    const rows: Array<Record<string, unknown>> = [];
    for (const r of data.responses) {
      if (!allowed.has(r.key)) continue;
      const q = buildQuestion(r.key);
      if (!q) continue;
      const correct = !!r.selected_label && r.selected_label === q.answer_label;
      if (correct) correctCount += 1;
      const was_unseen = !seen.has(r.key);
      rows.push({
        diagnostic_id: session.id,
        user_id: context.userId,
        question_key: r.key,
        unit_slug: q.unit_slug,
        topic_slug: q.topic_slug,
        difficulty: q.difficulty,
        selected_answer: r.selected_label ?? null,
        correct,
        was_unseen,
        time_spent_ms: r.time_spent_ms ?? null,
      });
      await recordExposure(
        context.supabase,
        context.userId,
        { key: q.key, unit_slug: q.unit_slug, topic_slug: q.topic_slug, difficulty: q.difficulty },
        correct,
      );
    }

    if (rows.length) {
      const { error } = await context.supabase.from("diagnostic_responses").insert(rows as never);
      if (error) throw new Error(error.message);
    }

    await context.supabase
      .from("diagnostics")
      .update({ submitted_at: new Date().toISOString(), locked: true, correct_count: correctCount })
      .eq("id", session.id)
      .eq("user_id", context.userId);

    const estimate = await buildScoreEstimate(context.supabase, context.userId);
    await persistEstimate(context.supabase, context.userId, estimate, session.id);

    return {
      answered: rows.length,
      correct: correctCount,
      estimate,
    };
  });
