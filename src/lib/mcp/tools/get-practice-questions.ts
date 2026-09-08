import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { bankCount, bankKeys, buildQuestion } from "@/lib/generated-bank";
import { makeRng, shuffle } from "@/lib/question-templates";
import { getActiveTrack, getSeenKeys } from "@/lib/track.server";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "get_practice_questions",
  title: "Get practice questions",
  description:
    "Draw multiple-choice practice questions the signed-in student has never answered before, on their saved AB/BC track. Optionally scope to a unit or topic slug. Answers are not included; submit one with submit_answer to see the result.",
  inputSchema: {
    unit_slug: z.string().max(120).optional().describe("Unit slug from list_units_and_topics."),
    topic_slug: z.string().max(120).optional().describe("Topic slug from list_units_and_topics."),
    limit: z.number().int().optional().describe("How many questions to return, 1-10. Defaults to 5."),
  },
  annotations: { readOnlyHint: true, openWorldHint: false },
  handler: async ({ unit_slug, topic_slug, limit }, ctx) => {
    if (!ctx.isAuthenticated()) throw new ToolError("Not signed in.");
    const supabase = supabaseForUser(ctx);
    const userId = ctx.getUserId()!;
    const count = Math.min(Math.max(limit ?? 5, 1), 10);

    const track = await getActiveTrack(supabase, userId);
    const seen = await getSeenKeys(supabase, userId);
    const filter = { unit_slug, topic_slug, track };
    const unseen = bankKeys(filter).filter((k) => !seen.has(k));
    const picked = shuffle(makeRng(`${userId}:${Date.now()}`), unseen).slice(0, count);

    const questions = picked.flatMap((key) => {
      const q = buildQuestion(key);
      if (!q) return [];
      return [
        {
          question_key: q.key,
          unit_slug: q.unit_slug,
          topic_slug: q.topic_slug,
          difficulty: q.difficulty,
          calculator: q.calculator,
          prompt: q.prompt,
          choices: q.choices,
        },
      ];
    });

    const payload = {
      track,
      total_in_scope: bankCount(filter),
      unseen_remaining: unseen.length,
      exhausted: unseen.length === 0,
      questions,
    };
    return {
      content: [
        {
          type: "text",
          text:
            unseen.length === 0
              ? "No unseen questions left in that scope — every question there has already been answered."
              : JSON.stringify(payload, null, 2),
        },
      ],
      structuredContent: payload,
    };
  },
});
