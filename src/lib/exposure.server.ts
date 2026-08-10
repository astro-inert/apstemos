import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { PROVISIONAL_DIFFICULTY } from "./predictor-config";

type DB = SupabaseClient<Database>;

/** Provenance kinds a practice attempt can have (diagnostic responses are separate). */
export type AttemptKind = Database["public"]["Enums"]["attempt_kind"];

export type ExposureItem = {
  key: string;
  unit_slug: string;
  topic_slug: string;
  difficulty: "easy" | "medium" | "hard";
};

/**
 * Records that a user answered a question and returns the provenance of that
 * response. First attempts on unseen items are the only high-weight evidence;
 * anything the user has already answered is down-weighted by the model.
 */
export async function recordExposure(
  supabase: DB,
  userId: string,
  item: ExposureItem,
  correct: boolean,
): Promise<AttemptKind> {
  const { data: existing } = await supabase
    .from("question_exposure")
    .select("id, attempt_count, first_attempt_correct")
    .eq("user_id", userId)
    .eq("question_key", item.key)
    .maybeSingle();

  if (!existing) {
    await supabase.from("question_exposure").insert({
      user_id: userId,
      question_key: item.key,
      unit_slug: item.unit_slug,
      topic_slug: item.topic_slug,
      first_attempt_correct: correct,
      first_attempt_at: new Date().toISOString(),
      attempt_count: 1,
    });
    await bumpItemStats(supabase, item, correct);
    return "first_attempt";
  }

  await supabase
    .from("question_exposure")
    .update({ attempt_count: (existing.attempt_count ?? 0) + 1 })
    .eq("id", existing.id);

  return existing.first_attempt_correct === null ? "previously_seen" : "previously_answered";
}

/** Accumulates first-attempt statistics used later for empirical calibration.
 *  Item statistics are global, so they are written with the privileged client
 *  after the caller has already been authenticated. */
export async function bumpItemStats(_supabase: DB, item: ExposureItem, correct: boolean) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data: row } = await supabaseAdmin
    .from("item_stats")
    .select("question_key, n_first_attempts, n_first_correct")
    .eq("question_key", item.key)
    .maybeSingle();

  if (!row) {
    await supabaseAdmin.from("item_stats").insert({
      question_key: item.key,
      unit_slug: item.unit_slug,
      topic_slug: item.topic_slug,
      difficulty_label: item.difficulty,
      provisional_difficulty: PROVISIONAL_DIFFICULTY[item.difficulty],
      n_first_attempts: 1,
      n_first_correct: correct ? 1 : 0,
    });
    return;
  }

  await supabaseAdmin
    .from("item_stats")
    .update({
      n_first_attempts: (row.n_first_attempts ?? 0) + 1,
      n_first_correct: (row.n_first_correct ?? 0) + (correct ? 1 : 0),
    })
    .eq("question_key", item.key);
}
