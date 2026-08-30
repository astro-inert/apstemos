import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { bankKeys, buildQuestion } from "./generated-bank";
import { makeRng, shuffle } from "./question-templates";
import { DIAGNOSTIC } from "./predictor-config";
import { QN_UNITS } from "./question-navigator-data";
import { getActiveTrack, getSeenKeys, type ExamTrack } from "./track.server";

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
 * Blueprint sample for the timed MCQ diagnostic.
 *
 * Rules enforced here:
 *  - only questions the student has never seen are eligible, so the diagnostic
 *    is never contaminated by items already answered in practice;
 *  - AB students never receive BC-only material;
 *  - the form is two thirds no-calculator and one third calculator, matching the
 *    aggregate timing budget in `DIAGNOSTIC`;
 *  - units are sampled in proportion to their AP exam weight.
 */
export async function sampleBlueprint(
  supabase: DB,
  userId: string,
  seed: string,
): Promise<{ items: Built[]; unseenShare: number; track: ExamTrack }> {
  const track = await getActiveTrack(supabase, userId);
  const seen = await getSeenKeys(supabase, userId);

  const { data: unitRows } = await supabase
    .from("units")
    .select("number, ap_weight_pct")
    .eq("subject_id", "ap-calc-bc");
  const weightByNumber = new Map((unitRows ?? []).map((u) => [u.number, Number(u.ap_weight_pct)]));

  const rng = makeRng(`${userId}:${seed}`);

  const eligible = (opts: { unit_slug?: string; calculator: boolean }) =>
    shuffle(
      rng,
      bankKeys({ unit_slug: opts.unit_slug, calculator: opts.calculator, track }).filter((k) => !seen.has(k)),
    );

  const units = QN_UNITS.filter((u) => track === "BC" || (u.number !== 9 && u.number !== 10));
  const totalWeight = units.reduce((s, u) => s + (weightByNumber.get(u.number) ?? 10), 0) || 1;

  const chosen: Built[] = [];
  const have = new Set<string>();

  const take = (keys: string[], max: number) => {
    let taken = 0;
    for (const key of keys) {
      if (taken >= max) break;
      if (have.has(key)) continue;
      const q = buildQuestion(key);
      if (!q) continue;
      chosen.push(q);
      have.add(key);
      taken += 1;
    }
    return taken;
  };

  // Fill each calculator bucket unit by unit, proportional to AP weight.
  for (const calculator of [false, true]) {
    const bucketSize = calculator ? DIAGNOSTIC.calculatorCount : DIAGNOSTIC.noCalculatorCount;
    let filled = 0;
    for (const u of units) {
      const target = Math.max(1, Math.round((bucketSize * (weightByNumber.get(u.number) ?? 10)) / totalWeight));
      if (filled >= bucketSize) break;
      filled += take(eligible({ unit_slug: u.slug, calculator }), Math.min(target, bucketSize - filled));
    }
    // Top up the bucket from any unit if rounding or thin pools left it short.
    if (filled < bucketSize) take(eligible({ calculator }), bucketSize - filled);
  }

  const items = shuffle(rng, chosen).slice(0, DIAGNOSTIC.itemCount);
  return { items, unseenShare: 1, track };
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
