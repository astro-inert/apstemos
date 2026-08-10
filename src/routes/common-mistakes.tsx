import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useSuspenseQuery, queryOptions, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { AlertTriangle, Search } from "lucide-react";
import { MistakeCaptureDialog } from "@/components/mistakes/MistakeCaptureDialog";
import { listUserMistakes, type UserMistake } from "@/lib/user-mistakes.functions";
import { PageShell } from "@/components/PageShell";
import { LaTeX } from "@/components/LaTeX";
import { supabase } from "@/integrations/supabase/client";
import { SubjectContentGate } from "@/components/SubjectContentGate";

export const Route = createFileRoute("/common-mistakes")({
  head: () => ({
    meta: [
      { title: "Common Mistakes — AP STEM OS" },
      { name: "description", content: "The 22+ ways AP Calculus students lose points — described, exampled, and fixed." },
    ],
  }),
  component: () => (
    <SubjectContentGate>
      <CommonMistakes />
    </SubjectContentGate>
  ),
});

const mistakesQuery = queryOptions({
  queryKey: ["common-mistakes"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("common_mistakes")
      .select("*")
      .order("est_point_loss", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },
});

type MistakeRow = {
  code: string;
  title: string;
  category: string;
  description: string;
  example: string | null;
  ap_consequence?: string | null;
  how_to_avoid: string;
  est_point_loss: number | string;
  personal?: boolean;
};

function CommonMistakes() {
  const { data: shared } = useSuspenseQuery(mistakesQuery);
  const listMine = useServerFn(listUserMistakes);
  const { data: mine } = useQuery({
    queryKey: ["user-mistakes"],
    queryFn: async (): Promise<UserMistake[]> => {
      try {
        return await listMine();
      } catch {
        return [];
      }
    },
    retry: false,
  });

  const mistakes: MistakeRow[] = useMemo(
    () => [
      ...(mine ?? []).map((m) => ({ ...m, ap_consequence: null, personal: true }) as MistakeRow),
      ...(shared as unknown as MistakeRow[]),
    ],
    [shared, mine],
  );
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");

  const categories = useMemo(() => ["all", ...Array.from(new Set(mistakes.map((m) => m.category)))], [mistakes]);
  const filtered = useMemo(() => {
    return mistakes.filter((m) => {
      if (cat !== "all" && m.category !== cat) return false;
      if (!q) return true;
      const needle = q.toLowerCase();
      return (m.title + m.description + m.category).toLowerCase().includes(needle);
    });
  }, [mistakes, q, cat]);

  return (
    <PageShell
      eyebrow="mistake intelligence"
      title={
        <>
          Where points <span className="text-primary">die</span>.
        </>
      }
      description='Every mistake here has cost real students real points. Read the description, study the example, and copy the "how to avoid" line into your notes.'
    >
      <div className="mb-8">
        <MistakeCaptureDialog />
      </div>

      {/* Controls */}
      <div className="mb-6 flex flex-wrap gap-2">
        <div className="relative min-w-[200px] flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search mistakes…"
            className="w-full rounded-full border border-border bg-card py-2.5 pl-10 pr-4 text-[14px] outline-none transition-colors focus:border-primary/50"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`num rounded-full border px-3.5 py-1.5 text-[11px] uppercase tracking-[0.12em] transition-colors ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((m) => (
          <article
            key={m.code}
            id={m.code}
            className="scroll-mt-28 rounded-3xl border border-border bg-card p-6 shadow-card transition-all hover:border-primary/30 hover:shadow-elevated"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-destructive/10 text-destructive ring-1 ring-destructive/20">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-[15px] font-semibold leading-tight">
                    <LaTeX>{m.title}</LaTeX>
                  </h3>
                  <div className="micro-label mt-1.5 flex items-center gap-2">
                    {m.category}
                    {m.personal && (
                      <span className="rounded-full bg-primary/15 px-2 py-0.5 text-primary">personal</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="num text-[14px] font-semibold text-destructive">
                  −{Number(m.est_point_loss).toFixed(1)}
                </div>
                <div className="num text-[10px] text-subtle">avg pts</div>
              </div>
            </div>

            <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">
              <LaTeX>{m.description}</LaTeX>
            </p>

            {m.example && (
              <div className="mt-4 rounded-2xl border border-border bg-elevated/50 p-4 text-[13px] leading-relaxed">
                <div className="micro-label mb-2">example</div>
                <LaTeX>{m.example}</LaTeX>
              </div>
            )}

            {m.ap_consequence && (
              <div className="mt-4">
                <div className="micro-label mb-2">ap consequence</div>
                <div className="text-[13px] leading-relaxed text-foreground/90">
                  <LaTeX>{m.ap_consequence}</LaTeX>
                </div>
              </div>
            )}

            <div className="mt-5 border-t border-border pt-4">
              <div className="micro-label mb-2 text-primary">how to avoid</div>
              <div className="text-[13px] leading-relaxed text-foreground/90">
                <LaTeX>{m.how_to_avoid}</LaTeX>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-3xl border border-dashed border-border py-16 text-center text-[14px] text-muted-foreground">
          No mistakes match that filter.
        </div>
      )}
    </PageShell>
  );
}

