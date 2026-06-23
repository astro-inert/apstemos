import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { AlertTriangle, Search } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { LaTeX } from "@/components/LaTeX";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/common-mistakes")({
  head: () => ({
    meta: [
      { title: "Common Mistakes — AP Calc Performance OS" },
      { name: "description", content: "The 22+ ways AP Calculus students lose points — described, exampled, and fixed." },
    ],
  }),
  component: CommonMistakes,
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

function CommonMistakes() {
  const { data: mistakes } = useSuspenseQuery(mistakesQuery);
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
    <AppShell>
      <div className="px-4 py-6 sm:px-6 lg:px-10 lg:py-10 max-w-6xl">
        <div className="mb-6">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-1">// common point losses</div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold tracking-tight">Where AP Calc points die</h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
            Every mistake here has cost real students real points. Read the description, study the example, and copy the "how to avoid" line into your notes.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-2 mb-5">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search mistakes…"
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-card text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {categories.map((c) => (
              <button
                key={c} onClick={() => setCat(c)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium border transition ${cat === c ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:text-foreground"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="grid md:grid-cols-2 gap-3">
          {filtered.map((m) => (
            <article key={m.code} className="rounded-xl border border-border bg-card p-5 hover-lift">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="grid place-items-center h-8 w-8 rounded-md bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20 shrink-0">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold leading-tight">{m.title}</h3>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">{m.category}</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-mono text-sm font-bold text-rose-400">−{Number(m.est_point_loss).toFixed(1)}</div>
                  <div className="text-[10px] text-muted-foreground">avg pts</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                <LaTeX>{m.description}</LaTeX>
              </p>
              {m.example && (
                <div className="mt-3 rounded-md bg-elevated/60 border border-border p-2.5 text-xs leading-relaxed">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Example</div>
                  <LaTeX>{m.example}</LaTeX>
                </div>
              )}
              {m.ap_consequence && (
                <div className="mt-3 text-xs">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">AP consequence</div>
                  <div className="text-foreground/90"><LaTeX>{m.ap_consequence}</LaTeX></div>
                </div>
              )}
              <div className="mt-3 pt-3 border-t border-border">
                <div className="text-[10px] uppercase tracking-wider text-emerald-400 mb-1">How to avoid</div>
                <div className="text-sm text-foreground/90"><LaTeX>{m.how_to_avoid}</LaTeX></div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-sm text-muted-foreground">No mistakes match that filter.</div>
        )}
      </div>
    </AppShell>
  );
}
