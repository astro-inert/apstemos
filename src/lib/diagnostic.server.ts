import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { bankKeys, buildQuestion } from "./generated-bank";
import { makeRng, shuffle } from "./question-templates";
import { DIAGNOSTIC } from "./predictor-config";
import { QN_UNITS } from "./question-navigator-data";

type DB = SupabaseClient<Database>;

export type DiagnosticItem = {
  key: string;
  unit_slug: string;
  topic_slug: string;
  difficulty: "easy" | "medium" | "hard";
  calculator: boolean;
  prompt: string;
  figure?: ReturnType<typeof buildQuestion> extends null ? never : NonNullable<ReturnType<typeof buildQuestion>>["figure"];
  choices: Array<{ label: string; text: string }>;
};

type Built = NonNullable<ReturnType<typeof buildQuestion>>;

/**
 * Blueprint sample: AP-weighted spread across units, target easy/medium/hard mix,
 * unseen items strongly preferred. Returns the item list plus how much of it is
 * genuinely unseen so the UI can say so honestly.
 */
export async function sampleBlueprint(
  supabase: DB,
  userId: string,
  seed: string,
): Promise<{ items: Built[]; unseenShare: number }> {
  const { data: unitRows } = await supabase
    .from("units")
    .select("number, ap_weight_pct")
    .eq("subject_id", "ap-calc-bc");
  const weightByNumber = new Map((unitRows ?? []).map((u) => [u.number, Number(u.ap_weight_pct)]));

  const { data: exposure } = await supabase
    .from("question_exposure")
    .select("question_key")
    .eq("user_id", userId);
  const seen = new Set((exposure ?? []).map((e) => e.question_key));

  const rng = makeRng(`${userId}:${seed}`);
  const totalWeight = QN_UNITS.reduce((s, u) => s + (weightByNumber.get(u.number) ?? 10), 0);

  // Per-unit target counts proportional to AP weight.
  const targets = QN_UNITS.map((u) => ({
    unit: u,
    n: Math.max(1, Math.round((DIAGNOSTIC.itemCount * (weightByNumber.get(u.number) ?? 10)) / totalWeight)),
  }));

  const diffTargets = {
    easy: Math.round(DIAGNOSTIC.itemCount * DIAGNOSTIC.difficultyMix.easy),
    medium: Math.round(DIAGNOSTIC.itemCount * DIAGNOSTIC.difficultyMix.medium),
    hard: Math.round(DIAGNOSTIC.itemCount * DIAGNOSTIC.difficultyMix.hard),
  };
  const diffUsed = { easy: 0, medium: 0, hard: 0 };

  const chosen: Built[] = [];
  let unseenCount = 0;

  for (const t of targets) {
    const pool = shuffle(rng, bankKeys({ unit_slug: t.unit.slug }));
    const unseenFirst = [...pool.filter((k) => !seen.has(k)), ...pool.filter((k) => seen.has(k))];
    let taken = 0;
    for (const key of unseenFirst) {
      if (taken >= t.n || chosen.length >= DIAGNOSTIC.itemCount) break;
      const q = buildQuestion(key);
      if (!q) continue;
      // Respect the difficulty blueprint unless nothing else is left.
      if (diffUsed[q.difficulty] >= diffTargets[q.difficulty] && chosen.length < DIAGNOSTIC.itemCount - 3) continue;
      diffUsed[q.difficulty] += 1;
      chosen.push(q);
      if (!seen.has(key)) unseenCount += 1;
      taken += 1;
    }
  }

  // Top up if blueprint rounding left us short.
  if (chosen.length < DIAGNOSTIC.itemCount) {
    const have = new Set(chosen.map((q) => q.key));
    const pool = shuffle(rng, bankKeys());
    for (const key of [...pool.filter((k) => !seen.has(k)), ...pool.filter((k) => seen.has(k))]) {
      if (chosen.length >= DIAGNOSTIC.itemCount) break;
      if (have.has(key)) continue;
      const q = buildQuestion(key);
      if (!q) continue;
      chosen.push(q);
      have.add(key);
      if (!seen.has(key)) unseenCount += 1;
    }
  }

  const items = shuffle(rng, chosen).slice(0, DIAGNOSTIC.itemCount);
  return {
    items,
    unseenShare: items.length ? Math.round((unseenCount / items.length) * 100) / 100 : 0,
  };
}

export function toClientItem(q: Built): DiagnosticItem {
  return {
    key: q.key,
    unit_slug: q.unit_slug,
    topic_slug: q.topic_slug,
    difficulty: q.difficulty,
    calculator: q.calculator,
    prompt: q.prompt,
    figure: q.figure,
    choices: q.choices,
  };
}
