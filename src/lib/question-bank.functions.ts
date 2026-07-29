import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";
import { QN_UNITS } from "./question-navigator-data";

export type ExtractedQuestion = {
  id: string;
  type: "MCQ" | "FRQ";
  question_number: number | null;
  part: string | null;
  prompt: string;
  choices: Array<{ label: string; text: string }>;
  answer: string | null;
  explanation: string | null;
  rubric: Array<{ points: number; criterion: string }>;
  calculator: boolean;
  difficulty: "easy" | "medium" | "hard";
  unit_slug: string | null;
  topic_slug: string | null;
  ap_value: number;
  page_start: number | null;
  page_end: number | null;
  review_status: string;
  is_published: boolean;
  source: string | null;
  year: number | null;
};

const choiceSchema = z.object({ label: z.string(), text: z.string() });
const rubricSchema = z.object({ points: z.number(), criterion: z.string() });

function topicCatalog() {
  return QN_UNITS.map(
    (u) =>
      `${u.slug} (Unit ${u.number}: ${u.title}) -> ${u.topics.map((t) => t.slug).join(", ")}`,
  ).join("\n");
}

type AdminCheckClient = {
  rpc: (
    fn: "has_role",
    args: { _user_id: string; _role: "admin" },
  ) => PromiseLike<{ data: unknown }>;
};

async function assertAdmin(supabase: AdminCheckClient, userId: string) {
  const { data } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  if (data !== true) throw new Error("Admin access required.");
  return true;
}

export const getBankAccess = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    return { is_admin: data === true };
  });

export const listUploads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase
      .from("question_uploads")
      .select("id, filename, status, page_count, extracted_count, error, created_at")
      .order("created_at", { ascending: false })
      .limit(30);
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const registerUpload = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ filename: z.string().min(1).max(300), storage_path: z.string().min(1).max(500) }).parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data: row, error } = await context.supabase
      .from("question_uploads")
      .insert({ user_id: context.userId, filename: data.filename, storage_path: data.storage_path, status: "uploaded" })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { upload_id: row.id };
  });

export const extractQuestions = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ upload_id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("AI is not configured.");

    const { data: upload, error: upErr } = await context.supabase
      .from("question_uploads")
      .select("id, filename, storage_path")
      .eq("id", data.upload_id)
      .single();
    if (upErr || !upload) throw new Error("Upload not found.");

    await context.supabase.from("question_uploads").update({ status: "extracting", error: null }).eq("id", upload.id);

    try {
      const { data: file, error: dlErr } = await context.supabase.storage
        .from("exam-pdfs")
        .download(upload.storage_path);
      if (dlErr || !file) throw new Error("Could not read the uploaded PDF.");

      const bytes = new Uint8Array(await file.arrayBuffer());
      let binary = "";
      for (let i = 0; i < bytes.length; i += 8192) {
        binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
      }
      const base64 = btoa(binary);

      const system = [
        "You extract AP Calculus exam questions from PDFs into structured JSON.",
        "Rules:",
        "- Transcribe every question. Preserve ALL mathematics as inline LaTeX wrapped in $...$ (display math in $$...$$).",
        "- If a question depends on a graph, table or figure, transcribe the table in LaTeX/markdown and append a precise textual description of the figure at the end of the prompt in the form: [Figure: ...].",
        "- Multiple choice questions: type MCQ, choices as [{label:'A', text:'$...$'}], answer = the correct label if determinable, else null.",
        "- Free response: type FRQ, one object PER PART (part = 'a','b','c',...), rubric = list of scoring points.",
        "- calculator = true if the section allows a graphing calculator.",
        "- ap_value = points the item is worth (MCQ = 1, FRQ part = rubric point total).",
        "- Classify each question into the AP Calculus unit and topic slugs below. Use exact slugs, or null if genuinely unclear.",
        topicCatalog(),
      ].join("\n");

      const body = {
        model: "google/gemini-3.6-flash",
        messages: [
          { role: "system", content: system },
          {
            role: "user",
            content: [
              { type: "text", text: "Extract every question from this AP Calculus exam PDF." },
              {
                type: "file",
                file: { filename: upload.filename, file_data: `data:application/pdf;base64,${base64}` },
              },
            ],
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "save_questions",
              description: "Save the extracted questions.",
              parameters: {
                type: "object",
                properties: {
                  source: { type: "string" },
                  year: { type: "integer" },
                  questions: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        type: { type: "string", enum: ["MCQ", "FRQ"] },
                        question_number: { type: "integer" },
                        part: { type: "string" },
                        prompt: { type: "string" },
                        choices: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: { label: { type: "string" }, text: { type: "string" } },
                            required: ["label", "text"],
                          },
                        },
                        answer: { type: "string" },
                        explanation: { type: "string" },
                        rubric: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: { points: { type: "number" }, criterion: { type: "string" } },
                            required: ["points", "criterion"],
                          },
                        },
                        calculator: { type: "boolean" },
                        difficulty: { type: "string", enum: ["easy", "medium", "hard"] },
                        unit_slug: { type: "string" },
                        topic_slug: { type: "string" },
                        ap_value: { type: "number" },
                        page_start: { type: "integer" },
                        page_end: { type: "integer" },
                      },
                      required: ["type", "prompt"],
                    },
                  },
                },
                required: ["questions"],
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "save_questions" } },
      };

      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Lovable-API-Key": apiKey },
        body: JSON.stringify(body),
      });

      if (res.status === 429) throw new Error("AI rate limit reached. Try again in a minute.");
      if (res.status === 402) throw new Error("AI credits exhausted. Add credits to continue extraction.");
      if (!res.ok) throw new Error(`Extraction failed (${res.status}): ${(await res.text()).slice(0, 300)}`);

      const json = (await res.json()) as {
        choices?: Array<{ message?: { tool_calls?: Array<{ function?: { arguments?: string } }> } }>;
      };
      const args = json.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
      if (!args) throw new Error("The model returned no questions.");

      const parsed = z
        .object({
          source: z.string().optional(),
          year: z.number().int().optional(),
          questions: z.array(
            z.object({
              type: z.enum(["MCQ", "FRQ"]),
              question_number: z.number().int().optional(),
              part: z.string().optional(),
              prompt: z.string().min(1),
              choices: z.array(choiceSchema).optional(),
              answer: z.string().optional(),
              explanation: z.string().optional(),
              rubric: z.array(rubricSchema).optional(),
              calculator: z.boolean().optional(),
              difficulty: z.enum(["easy", "medium", "hard"]).optional(),
              unit_slug: z.string().optional(),
              topic_slug: z.string().optional(),
              ap_value: z.number().optional(),
              page_start: z.number().int().optional(),
              page_end: z.number().int().optional(),
            }),
          ),
        })
        .parse(JSON.parse(args));

      const validUnits = new Set(QN_UNITS.map((u) => u.slug));
      const validTopics = new Set(QN_UNITS.flatMap((u) => u.topics.map((t) => t.slug)));

      const rows = parsed.questions.map((q) => ({
        type: q.type,
        prompt: q.prompt,
        choices: q.choices ?? [],
        rubric: q.rubric ?? [],
        answer: q.answer ?? null,
        explanation: q.explanation ?? null,
        question_number: q.question_number ?? null,
        part: q.part ?? null,
        calculator: q.calculator ?? false,
        difficulty: q.difficulty ?? "medium",
        unit_slug: q.unit_slug && validUnits.has(q.unit_slug) ? q.unit_slug : null,
        topic_slug: q.topic_slug && validTopics.has(q.topic_slug) ? q.topic_slug : null,
        ap_value: q.ap_value ?? 1,
        page_start: q.page_start ?? null,
        page_end: q.page_end ?? null,
        source: parsed.source ?? upload.filename,
        year: parsed.year ?? null,
        upload_id: upload.id,
        created_by: context.userId,
        review_status: "pending",
        is_published: false,
      }));

      if (rows.length === 0) throw new Error("No questions could be extracted from this PDF.");

      const { error: insErr } = await context.supabase.from("questions").insert(rows);
      if (insErr) throw new Error(insErr.message);

      await context.supabase
        .from("question_uploads")
        .update({ status: "extracted", extracted_count: rows.length })
        .eq("id", upload.id);

      return { extracted: rows.length };
    } catch (e) {
      const message = e instanceof Error ? e.message : "Extraction failed.";
      await context.supabase.from("question_uploads").update({ status: "failed", error: message }).eq("id", upload.id);
      throw new Error(message);
    }
  });

export const listBankQuestions = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        upload_id: z.string().uuid().optional(),
        review_status: z.enum(["pending", "approved", "all"]).default("pending"),
      })
      .parse(input ?? {}),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    let q = context.supabase
      .from("questions")
      .select(
        "id, type, question_number, part, prompt, choices, answer, explanation, rubric, calculator, difficulty, unit_slug, topic_slug, ap_value, page_start, page_end, review_status, is_published, source, year",
      )
      .order("question_number", { ascending: true, nullsFirst: false })
      .limit(400);
    if (data.upload_id) q = q.eq("upload_id", data.upload_id);
    if (data.review_status !== "all") q = q.eq("review_status", data.review_status);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return (rows ?? []) as unknown as ExtractedQuestion[];
  });

export const updateBankQuestion = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        prompt: z.string().min(1).max(8000).optional(),
        answer: z.string().max(2000).nullable().optional(),
        explanation: z.string().max(8000).nullable().optional(),
        unit_slug: z.string().max(120).nullable().optional(),
        topic_slug: z.string().max(120).nullable().optional(),
        difficulty: z.enum(["easy", "medium", "hard"]).optional(),
        calculator: z.boolean().optional(),
        ap_value: z.number().min(0).max(20).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { id, ...patch } = data;
    const { error } = await context.supabase.from("questions").update(patch).eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const setQuestionReview = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ ids: z.array(z.string().uuid()).min(1).max(500), approve: z.boolean() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase
      .from("questions")
      .update({
        review_status: data.approve ? "approved" : "pending",
        is_published: data.approve,
      })
      .in("id", data.ids);
    if (error) throw new Error(error.message);
    return { updated: data.ids.length };
  });

export const deleteBankQuestion = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from("questions").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
