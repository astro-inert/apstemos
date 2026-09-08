import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { buildQuestion, uuidFromKey } from "@/lib/generated-bank";
import { recordExposure } from "@/lib/exposure.server";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "submit_answer",
  title: "Submit an answer",
  description:
    "Record the student's answer to a practice question from get_practice_questions and return whether it was correct, the correct choice, and a worked explanation. The question will never be served to them again.",
  inputSchema: {
    question_key: z.string().max(120).describe("The question_key returned by get_practice_questions."),
    selected_label: z.string().max(2).describe("The chosen choice label: A, B, C, or D."),
  },
  annotations: { readOnlyHint: false, idempotentHint: false, openWorldHint: false },
  handler: async ({ question_key, selected_label }, ctx) => {
    if (!ctx.isAuthenticated()) throw new ToolError("Not signed in.");
    const supabase = supabaseForUser(ctx);
    const userId = ctx.getUserId()!;

    const q = buildQuestion(question_key);
    if (!q) throw new ToolError("Unknown question_key.");

    const label = selected_label.trim().toUpperCase();
    const correct = label === q.answer_label;

    const attempt_kind = await recordExposure(
      supabase,
      userId,
      { key: q.key, unit_slug: q.unit_slug, topic_slug: q.topic_slug, difficulty: q.difficulty },
      correct,
    );

    const { error } = await supabase.from("attempts").insert({
      user_id: userId,
      question_id: uuidFromKey(q.key),
      unit_slug: q.unit_slug,
      topic_slug: q.topic_slug,
      selected_answer: label,
      correct,
      points_earned: correct ? q.ap_value : 0,
      points_possible: q.ap_value,
      mistake_codes: correct ? [] : q.common_mistake_codes,
      question_key: q.key,
      difficulty: q.difficulty,
      attempt_kind,
    });
    if (error) throw new ToolError(error.message);

    const result = {
      correct,
      answer_label: q.answer_label,
      answer_text: q.answer_text,
      explanation: q.explanation,
      topic_slug: q.topic_slug,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: result,
    };
  },
});
