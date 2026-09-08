import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "save_mistake",
  title: "Save a mistake",
  description:
    "Save a mistake to the signed-in student's personal mistakes list. Write in the second person, exam-focused, with all mathematics in inline LaTeX ($...$).",
  inputSchema: {
    title: z.string().describe("Short name for the mistake."),
    category: z.string().describe("One or two words, e.g. Algebra, Calculator, Units, Justification, Series."),
    description: z.string().describe("What goes wrong."),
    how_to_avoid: z.string().describe("One actionable, checkable habit."),
    example: z.string().optional().describe("A short concrete instance with the correct version."),
  },
  annotations: { readOnlyHint: false, openWorldHint: false },
  handler: async ({ title, category, description, how_to_avoid, example }, ctx) => {
    if (!ctx.isAuthenticated()) throw new ToolError("Not signed in.");
    const supabase = supabaseForUser(ctx);

    const base =
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 32) || "mistake";
    const code = `my-${base}-${Math.random().toString(36).slice(2, 6)}`;

    const { data, error } = await supabase
      .from("user_mistakes")
      .insert({
        user_id: ctx.getUserId()!,
        code,
        title: title.slice(0, 120),
        category: category.slice(0, 40),
        description: description.slice(0, 1200),
        example: example ? example.slice(0, 1200) : null,
        how_to_avoid: how_to_avoid.slice(0, 1200),
      })
      .select("id, code, title, category, description, example, how_to_avoid")
      .single();
    if (error) throw new ToolError(error.message);

    return {
      content: [{ type: "text", text: `Saved "${data.title}" (${data.code}) to your mistakes list.` }],
      structuredContent: { mistake: data },
    };
  },
});
