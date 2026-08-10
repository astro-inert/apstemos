import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/**
 * Recomputes empirical item difficulty from accumulated first attempts.
 * `calibrated` only flips once an item clears the sample floor, so nothing is
 * ever presented as calibrated on thin data. Admin-triggered.
 */
export const recalibrateItems = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");

    const { ITEM_CALIBRATION_MIN_RESPONSES } = await import("./predictor-config");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: rows, error } = await supabaseAdmin
      .from("item_stats")
      .select("question_key, n_first_attempts, n_first_correct")
      .gte("n_first_attempts", ITEM_CALIBRATION_MIN_RESPONSES);
    if (error) throw new Error(error.message);

    let updated = 0;
    for (const r of rows ?? []) {
      const n = r.n_first_attempts ?? 0;
      if (n < ITEM_CALIBRATION_MIN_RESPONSES) continue;
      // Laplace-smoothed proportion correct -> Rasch difficulty on the logit
      // scale, anchored at the population mean ability of 0.
      const p = Math.min(0.98, Math.max(0.02, ((r.n_first_correct ?? 0) + 0.5) / (n + 1)));
      const b = Math.log((1 - p) / p);
      const { error: uErr } = await supabaseAdmin
        .from("item_stats")
        .update({ empirical_difficulty: Math.round(b * 1000) / 1000, calibrated: true })
        .eq("question_key", r.question_key);
      if (!uErr) updated += 1;
    }

    return { updated, floor: ITEM_CALIBRATION_MIN_RESPONSES };
  });
