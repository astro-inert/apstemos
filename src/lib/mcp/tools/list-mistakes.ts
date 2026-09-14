import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_mistakes",
  title: "List mistakes",
  description:
    "List entries from the shared Common Mistakes database and, when include_mine is true, the student's own saved mistakes. Optionally filter the shared list by category.",
  inputSchema: {
    category: z.string().max(40).optional().describe("Filter shared mistakes by category, e.g. Algebra or Units."),
    include_mine: z.boolean().optional().describe("Also return the student's own saved mistakes. Defaults to true."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ category, include_mine }, ctx) => {
    if (!ctx.isAuthenticated()) throw new ToolError("Not signed in.");
    const supabase = supabaseForUser(ctx);

    let shared = supabase.from("common_mistakes").select("code, title, category, description, how_to_avoid");
    if (category) shared = shared.ilike("category", category);
    const sharedRes = await shared;
    if (sharedRes.error) throw new ToolError(sharedRes.error.message);

    type MineRow = {
      code: string | null;
      title: string | null;
      category: string | null;
      description: string | null;
      example: string | null;
      how_to_avoid: string | null;
    };
    let mine: MineRow[] = [];
    if (include_mine !== false) {
      const mineRes = await supabase
        .from("user_mistakes")
        .select("code, title, category, description, example, how_to_avoid")
        .order("created_at", { ascending: false });
      if (mineRes.error) throw new ToolError(mineRes.error.message);
      mine = mineRes.data ?? [];
    }

    const payload = { common_mistakes: sharedRes.data ?? [], my_mistakes: mine };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
