import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { QN_UNITS } from "@/lib/question-navigator-data";
import { supabaseForUser } from "../supabase";

const TOPIC_MIN_ATTEMPTS = 3;
const UNIT_MASTERY_ATTEMPTS = 10;

export default defineTool({
  name: "get_performance",
  title: "Get performance breakdown",
  description:
    "Summarize the signed-in student's practice performance: overall accuracy, per-unit accuracy with mastery status, per-topic accuracy, and units they have not touched. Contains no AP score prediction.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async (_input, ctx) => {
    if (!ctx.isAuthenticated()) throw new ToolError("Not signed in.");
    const supabase = supabaseForUser(ctx);
    const userId = ctx.getUserId()!;

    const [profileRes, attemptsRes] = await Promise.all([
      supabase.from("profiles").select("track, target_score, exam_date").eq("id", userId).maybeSingle(),
      supabase.from("attempts").select("unit_slug, topic_slug, correct").eq("user_id", userId),
    ]);
    if (attemptsRes.error) throw new ToolError(attemptsRes.error.message);
    const attempts = attemptsRes.data ?? [];

    const tally = (rows: typeof attempts) => ({
      attempts: rows.length,
      accuracy_pct: rows.length ? Math.round((rows.filter((r) => r.correct).length / rows.length) * 100) : null,
    });

    const units = QN_UNITS.map((u) => {
      const rows = attempts.filter((a) => a.unit_slug === u.slug);
      const touchedTopics = new Set(rows.map((a) => a.topic_slug));
      const t = tally(rows);
      return {
        unit_slug: u.slug,
        number: u.number,
        title: u.title,
        exam_weight: u.weight,
        ...t,
        topics_touched: touchedTopics.size,
        topics_total: u.topics.length,
        mastery_unlocked: t.attempts >= UNIT_MASTERY_ATTEMPTS && touchedTopics.size === u.topics.length,
        topics: u.topics.map((tp) => {
          const trows = rows.filter((a) => a.topic_slug === tp.slug);
          const tt = tally(trows);
          return { topic_slug: tp.slug, title: tp.title, ...tt, reliable: tt.attempts >= TOPIC_MIN_ATTEMPTS };
        }),
      };
    });

    const payload = {
      track: profileRes.data?.track ?? "BC",
      exam_date: profileRes.data?.exam_date ?? null,
      target_score: profileRes.data?.target_score ?? null,
      overall: tally(attempts),
      units,
      untouched_units: units.filter((u) => u.attempts === 0).map((u) => u.title),
      notes: `Topic accuracy is only reliable at ${TOPIC_MIN_ATTEMPTS}+ questions; unit mastery unlocks at ${UNIT_MASTERY_ATTEMPTS}+ questions covering every topic.`,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
