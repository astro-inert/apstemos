import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Check, FileUp, Loader2, RefreshCw, Trash2, Wand2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { LaTeX } from "@/components/LaTeX";
import { QN_UNITS } from "@/lib/question-navigator-data";
import {
  deleteBankQuestion,
  extractQuestions,
  listBankQuestions,
  listUploads,
  registerUpload,
  setQuestionReview,
  updateBankQuestion,
  type ExtractedQuestion,
} from "@/lib/question-bank.functions";

const MAX_MB = 25;

export function QuestionBankPanel() {
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const uploadsFn = useServerFn(listUploads);
  const registerFn = useServerFn(registerUpload);
  const extractFn = useServerFn(extractQuestions);
  const pendingFn = useServerFn(listBankQuestions);
  const reviewFn = useServerFn(setQuestionReview);

  const uploads = useQuery({ queryKey: ["bank-uploads"], queryFn: () => uploadsFn() });
  const pending = useQuery({
    queryKey: ["bank-pending"],
    queryFn: () => pendingFn({ data: { review_status: "pending" } }),
  });

  const ingest = useMutation({
    mutationFn: async (file: File) => {
      setError(null);
      if (file.type !== "application/pdf") throw new Error("Please choose a PDF file.");
      if (file.size > MAX_MB * 1024 * 1024) throw new Error(`PDF must be under ${MAX_MB}MB.`);

      setStatus("Uploading PDF…");
      const path = `${crypto.randomUUID()}.pdf`;
      const { error: upErr } = await supabase.storage.from("exam-pdfs").upload(path, file, {
        contentType: "application/pdf",
        upsert: false,
      });
      if (upErr) throw new Error(upErr.message);

      setStatus("Registering upload…");
      const { upload_id } = await registerFn({ data: { filename: file.name, storage_path: path } });

      setStatus("Extracting questions with AI — this can take a couple of minutes…");
      const res = await extractFn({ data: { upload_id } });
      return res.extracted;
    },
    onSuccess: (n) => {
      setStatus(`Extracted ${n} questions. Review them below.`);
      qc.invalidateQueries({ queryKey: ["bank-uploads"] });
      qc.invalidateQueries({ queryKey: ["bank-pending"] });
    },
    onError: (e: Error) => {
      setStatus(null);
      setError(e.message);
      qc.invalidateQueries({ queryKey: ["bank-uploads"] });
    },
  });

  const approveAll = useMutation({
    mutationFn: async (ids: string[]) => reviewFn({ data: { ids, approve: true } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bank-pending"] });
      qc.invalidateQueries({ queryKey: ["performance-snapshot"] });
    },
  });

  const rows = pending.data ?? [];

  return (
    <div className="space-y-6">
      {/* Upload */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="text-xs uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1.5">
          <FileUp className="h-3.5 w-3.5" /> Exam PDF ingestion
        </div>
        <h3 className="font-display font-semibold mt-1">Upload an AP Calculus exam</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Questions are transcribed with LaTeX preserved, figures described, and auto-tagged to units and subtopics.
          Nothing goes live until you approve it.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <input
            ref={fileRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) ingest.mutate(f);
              e.target.value = "";
            }}
          />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={ingest.isPending}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
          >
            {ingest.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileUp className="h-4 w-4" />}
            {ingest.isPending ? "Processing…" : "Choose PDF"}
          </button>
          <button
            onClick={() => {
              uploads.refetch();
              pending.refetch();
            }}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </button>
          <span className="text-xs text-muted-foreground">PDF · max {MAX_MB}MB</span>
        </div>

        {status && <div className="mt-3 text-sm text-muted-foreground">{status}</div>}
        {error && (
          <div className="mt-3 text-sm text-rose-400 border border-rose-500/30 bg-rose-500/5 rounded-md px-3 py-2">
            {error}
          </div>
        )}

        {(uploads.data?.length ?? 0) > 0 && (
          <div className="mt-5 divide-y divide-border border-t border-border">
            {uploads.data!.map((u) => (
              <div key={u.id} className="flex items-center justify-between gap-3 py-2 text-sm">
                <div className="min-w-0">
                  <div className="truncate font-medium">{u.filename}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {new Date(u.created_at).toLocaleString()} · {u.extracted_count} questions
                    {u.error ? ` · ${u.error}` : ""}
                  </div>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${
                    u.status === "extracted"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : u.status === "failed"
                        ? "bg-rose-500/10 text-rose-400"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {u.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review queue */}
      <div className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-border">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1.5">
              <Wand2 className="h-3.5 w-3.5 text-pink-400" /> Review queue
            </div>
            <h3 className="font-display font-semibold mt-1">{rows.length} extracted questions awaiting review</h3>
          </div>
          {rows.length > 0 && (
            <button
              onClick={() => approveAll.mutate(rows.map((r) => r.id))}
              disabled={approveAll.isPending}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-elevated disabled:opacity-60"
            >
              <Check className="h-3.5 w-3.5" /> Approve all
            </button>
          )}
        </div>
        {pending.isLoading ? (
          <div className="p-5 text-sm text-muted-foreground">Loading review queue…</div>
        ) : rows.length === 0 ? (
          <div className="p-5 text-sm text-muted-foreground">
            Nothing pending. Upload an exam PDF to populate the question bank.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {rows.map((q) => (
              <ReviewRow key={q.id} q={q} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ReviewRow({ q }: { q: ExtractedQuestion }) {
  const qc = useQueryClient();
  const updateFn = useServerFn(updateBankQuestion);
  const reviewFn = useServerFn(setQuestionReview);
  const deleteFn = useServerFn(deleteBankQuestion);

  const [unitSlug, setUnitSlug] = useState(q.unit_slug ?? "");
  const [topicSlug, setTopicSlug] = useState(q.topic_slug ?? "");
  const [answer, setAnswer] = useState(q.answer ?? "");

  const unit = QN_UNITS.find((u) => u.slug === unitSlug);

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["bank-pending"] });
    qc.invalidateQueries({ queryKey: ["performance-snapshot"] });
  };

  const save = useMutation({
    mutationFn: async () =>
      updateFn({
        data: {
          id: q.id,
          unit_slug: unitSlug || null,
          topic_slug: topicSlug || null,
          answer: answer || null,
        },
      }),
    onSuccess: invalidate,
  });
  const approve = useMutation({
    mutationFn: async () => {
      await updateFn({ data: { id: q.id, unit_slug: unitSlug || null, topic_slug: topicSlug || null, answer: answer || null } });
      return reviewFn({ data: { ids: [q.id], approve: true } });
    },
    onSuccess: invalidate,
  });
  const remove = useMutation({ mutationFn: async () => deleteFn({ data: { id: q.id } }), onSuccess: invalidate });

  return (
    <div className="p-5 space-y-3">
      <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
        <span className="rounded bg-elevated px-1.5 py-0.5">{q.type}</span>
        {q.question_number != null && <span>#{q.question_number}{q.part ? `(${q.part})` : ""}</span>}
        {q.calculator && <span>calculator</span>}
        <span>{q.ap_value} pt</span>
        {q.page_start != null && <span>p.{q.page_start}</span>}
      </div>

      <div className="text-sm leading-relaxed">
        <LaTeX>{q.prompt}</LaTeX>
      </div>

      {q.choices.length > 0 && (
        <ul className="grid sm:grid-cols-2 gap-1.5 text-sm">
          {q.choices.map((c) => (
            <li key={c.label} className="flex gap-2">
              <span className="font-mono text-muted-foreground">{c.label}.</span>
              <LaTeX>{c.text}</LaTeX>
            </li>
          ))}
        </ul>
      )}

      {q.rubric.length > 0 && (
        <ul className="text-xs text-muted-foreground space-y-1">
          {q.rubric.map((r, i) => (
            <li key={i}>
              <span className="font-mono">{r.points}pt</span> — <LaTeX>{r.criterion}</LaTeX>
            </li>
          ))}
        </ul>
      )}

      <div className="grid sm:grid-cols-3 gap-2">
        <select
          value={unitSlug}
          onChange={(e) => {
            setUnitSlug(e.target.value);
            setTopicSlug("");
          }}
          className="rounded-md border border-border bg-background px-2 py-1.5 text-xs"
        >
          <option value="">Unassigned unit</option>
          {QN_UNITS.map((u) => (
            <option key={u.slug} value={u.slug}>
              Unit {u.number} · {u.title}
            </option>
          ))}
        </select>
        <select
          value={topicSlug}
          onChange={(e) => setTopicSlug(e.target.value)}
          className="rounded-md border border-border bg-background px-2 py-1.5 text-xs"
        >
          <option value="">Unassigned subtopic</option>
          {(unit?.topics ?? []).map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.title}
            </option>
          ))}
        </select>
        <input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Correct answer"
          className="rounded-md border border-border bg-background px-2 py-1.5 text-xs"
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => approve.mutate()}
          disabled={approve.isPending}
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground disabled:opacity-60"
        >
          <Check className="h-3.5 w-3.5" /> Approve & publish
        </button>
        <button
          onClick={() => save.mutate()}
          disabled={save.isPending}
          className="rounded-md border border-border px-3 py-1.5 text-xs hover:bg-elevated disabled:opacity-60"
        >
          {save.isSuccess ? "Saved" : "Save edits"}
        </button>
        <button
          onClick={() => remove.mutate()}
          disabled={remove.isPending}
          className="ml-auto inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-rose-400"
        >
          <Trash2 className="h-3.5 w-3.5" /> Discard
        </button>
      </div>
    </div>
  );
}
