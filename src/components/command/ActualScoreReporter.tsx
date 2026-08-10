import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Check, GraduationCap } from "lucide-react";
import { reportActualScore } from "@/lib/prediction.functions";

/** Voluntary reporting of a real AP score. Used only to validate the model. */
export function ActualScoreReporter() {
  const qc = useQueryClient();
  const fn = useServerFn(reportActualScore);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const report = useMutation({
    mutationFn: (score: number) => fn({ data: { actual_ap_score: score } }),
    onSuccess: () => {
      setDone(true);
      qc.invalidateQueries({ queryKey: ["score-estimate"] });
    },
  });

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
      <div className="micro-label inline-flex items-center gap-1.5">
        <GraduationCap className="h-3.5 w-3.5" /> got your real score?
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
        Reporting your actual AP score is entirely optional. It's the only way we can measure whether our estimates
        are any good — we publish nothing about accuracy until enough real scores exist.
      </p>
      {done ? (
        <div className="mt-4 inline-flex items-center gap-1.5 text-[13px] text-emerald-500">
          <Check className="h-3.5 w-3.5" /> Thanks — recorded.
        </div>
      ) : (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              onClick={() => setPicked(s)}
              className={`num h-9 w-9 rounded-full border text-[13px] transition-colors ${
                picked === s ? "border-primary bg-primary/10 text-foreground" : "border-border hover:bg-elevated/60"
              }`}
            >
              {s}
            </button>
          ))}
          <button
            onClick={() => picked && report.mutate(picked)}
            disabled={!picked || report.isPending}
            className="rounded-full bg-primary px-4 py-2 text-[13px] font-semibold text-primary-foreground disabled:opacity-50"
          >
            {report.isPending ? "Saving…" : "Report score"}
          </button>
        </div>
      )}
      {report.error && <p className="mt-2 text-[12px] text-destructive">{(report.error as Error).message}</p>}
    </div>
  );
}
