import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

type DB = SupabaseClient<Database>;

export type ExamTrack = "AB" | "BC";

/** The saved AB/BC choice for this account. BC is the default, as it is a superset. */
export async function getActiveTrack(supabase: DB, userId: string): Promise<ExamTrack> {
  const { data } = await supabase.from("profiles").select("track").eq("id", userId).maybeSingle();
  return data?.track === "AB" ? "AB" : "BC";
}

/** Every question key this user has already been shown. */
export async function getSeenKeys(supabase: DB, userId: string): Promise<Set<string>> {
  const { data } = await supabase.from("question_exposure").select("question_key").eq("user_id", userId);
  return new Set((data ?? []).map((e) => e.question_key));
}
