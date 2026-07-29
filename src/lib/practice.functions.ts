import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

export type PracticeQuestion = {
  id: string;
  type: "MCQ" | "FRQ";
  prompt: string;
  choices: Array<{ label: string; text: string }>;
  rubric: Array<{ points: number; criterion: string }>;
  calculator: boolean;
  difficulty: "easy" | "medium" | "hard";
  unit_slug: string | null;
  topic_slug: string | null;
  ap_value: number;
  question_number: number | null;
  part: string | null;
  source: string | null;
  year: number | null;
  page_image_url: string | null;
};

export const getPracticeQuestions = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        unit_slug: z.string().max(120).optional(),
        topic_slug: z.string().max(120).optional(),
        limit: z.number().int().min(1).max(50).default(10),
      })
      .parse(input ?? {}),
  )
  .handler(async ({ data, context }): Promise<PracticeQuestion[]> => {
    let q = context.supabase
      .from("questions")
      .select(
        "id, type, prompt, choices, rubric, calculator, difficulty, unit_slug, topic_slug, ap_value, question_number, part, source, year, page_image_url",
      )
      .eq("is_published", true)
      .eq("review_status", "approved")
      .limit(data.limit);
    if (data.unit_slug) q = q.eq("unit_slug", data.unit_slug);
    if (data.topic_slug) q = q.eq("topic_slug", data.topic_slug);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return (rows ?? []) as unknown as PracticeQuestion[];
  });

function normalize(v: string) {
  return v.trim().toLowerCase().replace(/\s+/g, "");
}

export const submitAttempt = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        question_id: z.string().uuid(),
        selected_answer: z.string().max(2000),
        time_spent_seconds: z.number().int().min(0).max(7200).optional(),
        self_scored_points: z.number().min(0).max(20).optional(),
        mistake_codes: z.array(z.string().max(40)).max(10).default([]),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { data: q, error } = await context.supabase
      .from("questions")
      .select("id, type, answer, explanation, ap_value, unit_slug, topic_slug, unit_id, topic_id, common_mistake_codes")
      .eq("id", data.question_id)
      .single();
    if (error || !q) throw new Error("Question not found.");

    const possible = Number(q.ap_value ?? 1);
    let earned: number;
    if (q.type === "FRQ") {
      earned = Math.min(possible, Number(data.self_scored_points ?? 0));
    } else {
      earned = q.answer && normalize(q.answer) === normalize(data.selected_answer) ? possible : 0;
    }
    const correct = possible > 0 ? earned >= possible : false;

    const { error: insErr } = await context.supabase.from("attempts").insert({
      user_id: context.userId,
      question_id: q.id,
      unit_id: q.unit_id,
      topic_id: q.topic_id,
      unit_slug: q.unit_slug,
      topic_slug: q.topic_slug,
      selected_answer: data.selected_answer,
      correct,
      points_earned: earned,
      points_possible: possible,
      time_spent_seconds: data.time_spent_seconds ?? null,
      mistake_codes: data.mistake_codes,
    });
    if (insErr) throw new Error(insErr.message);

    const codes = [...new Set([...(q.common_mistake_codes ?? []), ...data.mistake_codes])];
    let related: Array<{ code: string; title: string; how_to_avoid: string }> = [];
    if (!correct && codes.length > 0) {
      const { data: m } = await context.supabase
        .from("common_mistakes")
        .select("code, title, how_to_avoid")
        .in("code", codes);
      related = m ?? [];
    }

    return {
      correct,
      points_earned: earned,
      points_possible: possible,
      answer: q.answer,
      explanation: q.explanation,
      related_mistakes: related,
    };
  });

export type AnswerLogRow = {
  id: string;
  created_at: string;
  correct: boolean;
  points_earned: number;
  points_possible: number;
  selected_answer: string | null;
  topic_slug: string | null;
  unit_slug: string | null;
  mistake_codes: string[];
  prompt: string;
  type: "MCQ" | "FRQ";
  source: string | null;
};

export const getAnswerLog = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ limit: z.number().int().min(1).max(200).default(50) }).parse(input ?? {}))
  .handler(async ({ data, context }): Promise<AnswerLogRow[]> => {
    const { data: rows, error } = await context.supabase
      .from("attempts")
      .select(
        "id, created_at, correct, points_earned, points_possible, selected_answer, topic_slug, unit_slug, mistake_codes, question_id",
      )
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false })
      .limit(data.limit);
    if (error) throw new Error(error.message);

    const ids = Array.from(new Set((rows ?? []).map((r) => r.question_id).filter(Boolean)));
    const byId = new Map<string, { prompt: string; type: "MCQ" | "FRQ"; source: string | null }>();
    if (ids.length > 0) {
      const { data: qs } = await context.supabase
        .from("questions")
        .select("id, prompt, type, source")
        .in("id", ids);
      for (const q of qs ?? []) byId.set(q.id, { prompt: q.prompt, type: q.type as "MCQ" | "FRQ", source: q.source });
    }

    const missing = ids.filter((id) => !byId.has(id));
    if (missing.length > 0) {
      const { bankKeys, buildQuestion, uuidFromKey } = await import("@/lib/generated-bank");
      const missingSet = new Set(missing);
      for (const key of bankKeys()) {
        const id = uuidFromKey(key);
        if (!missingSet.has(id)) continue;
        const gq = buildQuestion(key);
        if (gq) byId.set(id, { prompt: gq.prompt, type: "MCQ", source: "Generated" });
        missingSet.delete(id);
        if (missingSet.size === 0) break;
      }
    }

    return (rows ?? []).map((r) => {
      const q = byId.get(r.question_id) ?? null;
      return {
        id: r.id,
        created_at: r.created_at,
        correct: r.correct,
        points_earned: Number(r.points_earned),
        points_possible: Number(r.points_possible),
        selected_answer: r.selected_answer,
        topic_slug: r.topic_slug,
        unit_slug: r.unit_slug,
        mistake_codes: (r.mistake_codes ?? []) as string[],
        prompt: q?.prompt ?? "(question removed)",
        type: q?.type ?? "MCQ",
        source: q?.source ?? null,
      };
    });
  });
