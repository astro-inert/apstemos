import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/** Saves the AB/BC exam track on the account. Practice, diagnostics, and the
 *  Command Center all read this, so the choice persists across sessions. */
export const setExamTrack = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ track: z.enum(["AB", "BC"]) }).parse(input))
  .handler(async ({ data, context }): Promise<{ track: "AB" | "BC" }> => {
    const { error } = await context.supabase
      .from("profiles")
      .update({ track: data.track, updated_at: new Date().toISOString() })
      .eq("id", context.userId);
    if (error) throw new Error(error.message);
    return { track: data.track };
  });
