import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type UserMistake = {
  id: string;
  code: string;
  title: string;
  category: string;
  description: string;
  example: string | null;
  how_to_avoid: string;
  est_point_loss: number;
};

export type MistakeDraft = {
  title: string;
  category: string;
  description: string;
  example: string;
  how_to_avoid: string;
  est_point_loss: number;
};

const draftSchema = z.object({
  title: z.string().min(3).max(120),
  category: z.string().min(2).max(40),
  description: z.string().min(3).max(1200),
  example: z.string().max(1200).default(""),
  how_to_avoid: z.string().min(3).max(1200),
  est_point_loss: z.number().min(0).max(9),
});

export const listUserMistakes = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<UserMistake[]> => {
    const { data, error } = await context.supabase
      .from("user_mistakes")
      .select("id, code, title, category, description, example, how_to_avoid, est_point_loss")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []).map((m) => ({ ...m, est_point_loss: Number(m.est_point_loss) })) as UserMistake[];
  });

export const draftUserMistake = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        description: z.string().min(10).max(1500),
        question_prompt: z.string().max(2000).optional(),
        topic: z.string().max(120).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data }): Promise<MistakeDraft> => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("AI is not configured.");

    const system = [
      "You turn a student's plain-language description of an AP STEM mistake into a structured database entry.",
      "Rules:",
      "- Write in the second person, concise and exam-focused. No fluff, no encouragement.",
      "- Wrap every piece of mathematics in inline LaTeX using $...$.",
      "- category: one or two words (e.g. Algebra, Calculator, Units, Justification, Series).",
      "- example: a short concrete instance of the mistake, with the correct version.",
      "- how_to_avoid: one actionable checkable habit.",
      "- est_point_loss: realistic average AP points lost per occurrence, between 0.5 and 4.",
    ].join("\n");

    const userText = [
      data.question_prompt ? `Question they missed: ${data.question_prompt}` : null,
      data.topic ? `Topic: ${data.topic}` : null,
      `Their description of the mistake: ${data.description}`,
    ]
      .filter(Boolean)
      .join("\n");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Lovable-API-Key": apiKey },
      body: JSON.stringify({
        model: "google/gemini-3.6-flash",
        messages: [
          { role: "system", content: system },
          { role: "user", content: userText },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "save_mistake",
              description: "Save the structured mistake entry.",
              parameters: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  category: { type: "string" },
                  description: { type: "string" },
                  example: { type: "string" },
                  how_to_avoid: { type: "string" },
                  est_point_loss: { type: "number" },
                },
                required: ["title", "category", "description", "how_to_avoid", "est_point_loss"],
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "save_mistake" } },
      }),
    });

    if (res.status === 429) throw new Error("AI rate limit reached. Try again in a minute.");
    if (res.status === 402) throw new Error("AI credits exhausted.");
    if (!res.ok) throw new Error(`Drafting failed (${res.status}).`);

    const json = (await res.json()) as {
      choices?: Array<{ message?: { tool_calls?: Array<{ function?: { arguments?: string } }> } }>;
    };
    const args = json.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    if (!args) throw new Error("The AI returned no draft. Try describing the mistake in more detail.");
    return draftSchema.parse(JSON.parse(args));
  });

export const saveUserMistake = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => draftSchema.parse(input))
  .handler(async ({ data, context }): Promise<UserMistake> => {
    const base =
      data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 32) || "mistake";
    const code = `my-${base}-${Math.random().toString(36).slice(2, 6)}`;

    const { data: row, error } = await context.supabase
      .from("user_mistakes")
      .insert({
        user_id: context.userId,
        code,
        title: data.title,
        category: data.category,
        description: data.description,
        example: data.example || null,
        how_to_avoid: data.how_to_avoid,
        est_point_loss: data.est_point_loss,
      })
      .select("id, code, title, category, description, example, how_to_avoid, est_point_loss")
      .single();
    if (error) throw new Error(error.message);
    return { ...row, est_point_loss: Number(row.est_point_loss) } as UserMistake;
  });

export const tagAttemptMistake = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ attempt_id: z.string().uuid(), code: z.string().min(1).max(60) }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { data: attempt, error: readErr } = await context.supabase
      .from("attempts")
      .select("id, mistake_codes")
      .eq("id", data.attempt_id)
      .single();
    if (readErr || !attempt) throw new Error("Attempt not found.");

    const codes = [...new Set([...((attempt.mistake_codes ?? []) as string[]), data.code])];
    const { error } = await context.supabase
      .from("attempts")
      .update({ mistake_codes: codes })
      .eq("id", data.attempt_id);
    if (error) throw new Error(error.message);
    return { mistake_codes: codes };
  });
