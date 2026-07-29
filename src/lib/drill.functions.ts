import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";
import { bankCount, bankKeys, buildQuestion, uuidFromKey } from "./generated-bank";
import { makeRng, shuffle } from "./question-templates";

export type DrillQuestion = {
  key: string;
  unit_slug: string;
  topic_slug: string;
  difficulty: "easy" | "medium" | "hard";
  calculator: boolean;
  ap_value: number;
  prompt: string;
  choices: Array<{ label: string; text: string }>;
};

export const getDrillSet = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        unit_slug: z.string().max(120).optional(),
        topic_slug: z.string().max(120).optional(),
        limit: z.number().int().min(1).max(40).default(20),
        seed: z.string().max(60).default("default"),
      })
      .parse(input ?? {}),
  )
  .handler(async ({ data, context }): Promise<{ total: number; questions: DrillQuestion[] }> => {
    const filter = { unit_slug: data.unit_slug, topic_slug: data.topic_slug };
    const keys = bankKeys(filter);
    const picked = shuffle(makeRng(`${context.userId}:${data.seed}:${data.unit_slug ?? ""}:${data.topic_slug ?? ""}`), keys).slice(
      0,
      data.limit,
    );
    const questions = picked
      .map(buildQuestion)
      .filter((q): q is NonNullable<ReturnType<typeof buildQuestion>> => q !== null)
      .map((q) => ({
        key: q.key,
        unit_slug: q.unit_slug,
        topic_slug: q.topic_slug,
        difficulty: q.difficulty,
        calculator: q.calculator,
        ap_value: q.ap_value,
        prompt: q.prompt,
        choices: q.choices,
      }));
    return { total: bankCount(filter), questions };
  });

export const submitDrillAttempt = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        key: z.string().max(120),
        selected_label: z.string().max(2),
        time_spent_seconds: z.number().int().min(0).max(7200).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const q = buildQuestion(data.key);
    if (!q) throw new Error("Question not found.");

    const correct = data.selected_label === q.answer_label;

    const { error } = await context.supabase.from("attempts").insert({
      user_id: context.userId,
      question_id: uuidFromKey(q.key),
      unit_slug: q.unit_slug,
      topic_slug: q.topic_slug,
      selected_answer: data.selected_label,
      correct,
      points_earned: correct ? q.ap_value : 0,
      points_possible: q.ap_value,
      time_spent_seconds: data.time_spent_seconds ?? null,
      mistake_codes: correct ? [] : q.common_mistake_codes,
    });
    if (error) throw new Error(error.message);

    let related: Array<{ code: string; title: string; how_to_avoid: string }> = [];
    if (!correct && q.common_mistake_codes.length > 0) {
      const { data: m } = await context.supabase
        .from("common_mistakes")
        .select("code, title, how_to_avoid")
        .in("code", q.common_mistake_codes);
      related = m ?? [];
    }

    return {
      correct,
      answer_label: q.answer_label,
      answer_text: q.answer_text,
      explanation: q.explanation,
      points_earned: correct ? q.ap_value : 0,
      points_possible: q.ap_value,
      related_mistakes: related,
    };
  });
