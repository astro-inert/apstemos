import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Info, ShieldQuestion } from "lucide-react";
import { getScoreEstimate } from "@/lib/prediction.functions";
import { CONFIDENCE_GATES } from "@/lib/predictor-config";

const CONF_LABEL: Record<string, string> = {
  insufficient_data: "not enough evidence",
  preliminary: "preliminary",
  moderate: "moderate confidence",
  high: "high confidence",
};

const CONF_STYLE: Record<string, string> = {
  insufficient_data: "bg-muted text-muted-foreground",
  preliminary: "bg-amber-500/10 text-amber-500",
  moderate: "bg-sky-500/10 text-sky-500",
  high: "bg-emerald-500/10 text-emerald-500",
};

/**
 * MCQ-Based AP Score Estimate. Deliberately refuses to show a score until the
 * evidence gates are met, and never implies free-response coverage.
 */
export function ScoreEstimateCard() {
  const fn = useServerFn(getScoreEstimate);
  const { data, isLoading } = useQuery({
    queryKey: ["score-estimate"],
    queryFn: () => fn(),
    staleTime: 30_000,
  });

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-card">
      <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary opacity-25 blur-3xl" />
      <div className="relative">
        <div className="flex items-start justify-between gap-3 text-xs">
          <span className="micro-label">MCQ-based AP score estimate</span>
          {data && (
            <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${CONF_STYLE[data.confidence_state]}`}>
              {CONF_LABEL[data.confidence_state]}
            </span>
          )}
        </div>

        {isLoading || !data ? (
          <div className="mt-6 text-[14px] text-muted-foreground">Reading your response history…</div>
        ) : data.confidence_state === "insufficient_data" || data.estimated_score === null ? (
          <div className="mt-5">
            <div className="font-display text-3xl font-semibold tracking-[-0.03em]">Not enough evidence yet</div>
            <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
              We won't show an estimate until your answers can actually support one. Right now:{" "}
              <span className="num text-foreground">{data.unique_question_count}</span> unique questions of{" "}
              <span className="num text-foreground">{CONFIDENCE_GATES.preliminary.minUniqueItems}</span> needed
              {data.missing.length ? ` · still need ${data.missing.join(", ")}` : ""}.
            </p>
            <Link
              to="/predict"
              className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[13px] font-semibold text-primary-foreground"
            >
              Take the MCQ diagnostic <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="num font-display text-6xl font-bold tracking-tight">{data.estimated_score}</span>
              <div className="text-[13px] text-muted-foreground">
                <div>
                  most likely · range{" "}
                  <span className="num text-foreground">
                    {data.range?.low}–{data.range?.high}
                  </span>
                </div>
                <div className="num">±{data.standard_error.toFixed(2)} ability SE</div>
              </div>
            </div>

            <div className="mt-5 space-y-1.5">
              {([5, 4, 3, 2, 1] as const).map((k) => {
                const p = Number(data.distribution?.[String(k)] ?? 0);
                return (
                  <div key={k} className="flex items-center gap-2 text-[11px]">
                    <span className="num w-3 text-muted-foreground">{k}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-elevated">
                      <div
                        className={`h-full rounded-full ${k === data.estimated_score ? "bg-primary" : "bg-primary/30"}`}
                        style={{ width: `${Math.round(p * 100)}%` }}
                      />
                    </div>
                    <span className="num w-8 text-right text-muted-foreground">{Math.round(p * 100)}%</span>
                  </div>
                );
              })}
            </div>

            <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
              Model estimates, not calibrated probabilities. Your current multiple-choice performance is most
              consistent with a {data.estimated_score}. <strong className="font-medium text-foreground">Free-response
              performance is not included</strong> — AP STEM OS contains MCQs only.
            </p>

            <div className="mt-4 border-t border-border pt-4 text-[12px] text-muted-foreground">
              <div className="num">
                {data.unique_question_count} unique questions · {data.first_attempt_count} first attempts ·{" "}
                {Math.round(data.coverage.score * 100)}% coverage
              </div>
              <div className="mt-1.5 flex items-start gap-1.5">
                <Info className="mt-0.5 h-3 w-3 shrink-0" />
                <span>{data.next_step}</span>
              </div>
              {data.uncalibrated && (
                <div className="mt-1.5 flex items-start gap-1.5">
                  <ShieldQuestion className="mt-0.5 h-3 w-3 shrink-0" />
                  <span>Item difficulties are author-assigned, not yet empirically calibrated.</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
