import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { RefreshCw } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { getPredictionAnalytics } from "@/lib/prediction.functions";
import { recalibrateItems } from "@/lib/calibration.functions";
import { MODEL_VERSION } from "@/lib/predictor-config";

export const Route = createFileRoute("/_authenticated/admin/predictions")({
  head: () => ({
    meta: [
      { title: "Prediction Analytics — AP STEM OS" },
      {
        name: "description",
        content: "Admin dashboard tracking MCQ score estimate accuracy, calibration, and item statistics.",
      },
      { property: "og:title", content: "Prediction Analytics — AP STEM OS" },
      { property: "og:description", content: "Internal validation metrics for the MCQ score estimate." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPredictions,
});

function AdminPredictions() {
  const fn = useServerFn(getPredictionAnalytics);
  const recalFn = useServerFn(recalibrateItems);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["prediction-analytics"],
    queryFn: () => fn(),
    retry: false,
  });
  const recal = useMutation({ mutationFn: () => recalFn(), onSuccess: () => refetch() });

  return (
    <PageShell
      eyebrow="admin"
      title="Prediction analytics"
      description={`Validation for model ${MODEL_VERSION}. Accuracy metrics stay hidden until enough real AP scores have been voluntarily reported — nothing here is estimated or filled in.`}
    >
      {error ? (
        <p className="text-[14px] text-destructive">{(error as Error).message}</p>
      ) : isLoading || !data ? (
        <p className="text-[14px] text-muted-foreground">Loading…</p>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Predictions stored" value={data.total_predictions} />
            <Stat label="Real scores reported" value={data.reported_count} />
            <Stat label="Avg questions used" value={data.avg_questions ?? "—"} />
            <Stat label="Avg coverage" value={data.avg_coverage === null ? "—" : `${Math.round(data.avg_coverage * 100)}%`} />
          </div>

          <Panel title="Predicted score distribution">
            <Rows rows={data.by_predicted_score.map((r) => [r.score === null ? "no score shown" : `score ${r.score}`, r.count])} />
          </Panel>

          <Panel title="Confidence state mix">
            <Rows rows={data.by_confidence.map((r) => [r.state.replace("_", " "), r.count])} />
          </Panel>

          <Panel title="Item calibration">
            <Rows
              rows={[
                ["Items with recorded first attempts", data.item_calibration.total_items],
                ["Empirically calibrated items", data.item_calibration.calibrated_items],
                ["First attempts required per item", data.item_calibration.min_responses],
              ]}
            />
            <button
              onClick={() => recal.mutate()}
              disabled={recal.isPending}
              className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-[13px] disabled:opacity-50"
            >
              <RefreshCw className="h-3.5 w-3.5" /> {recal.isPending ? "Recomputing…" : "Recompute item difficulty"}
            </button>
            {recal.data && (
              <p className="mt-2 num text-[12px] text-muted-foreground">{recal.data.updated} items updated.</p>
            )}
          </Panel>

          <Panel title="Accuracy vs. reported scores">
            {!data.validation_ready ? (
              <p className="text-[13px] leading-relaxed text-muted-foreground">
                Not enough validation data yet — {data.reported_count} of {data.validation_min_reported} reported real
                AP scores. No accuracy, calibration, or Brier metrics are computed or displayed until that floor is
                reached.
              </p>
            ) : (
              <div className="space-y-5">
                <Rows
                  rows={[
                    ["Mean absolute error", data.mae ?? "—"],
                    ["Brier score (1-5 distribution)", data.brier ?? "—"],
                  ]}
                />
                <div>
                  <div className="micro-label mb-2">Predicted vs actual</div>
                  <Rows rows={(data.matrix ?? []).map((m) => [`predicted ${m.predicted} → actual ${m.actual}`, m.count])} />
                </div>
                <div>
                  <div className="micro-label mb-2">Calibration curve</div>
                  <Rows
                    rows={(data.calibration ?? []).map((c) => [
                      `${c.bucket} (n=${c.n})`,
                      `predicted ${Math.round(c.predicted * 100)}% · observed ${Math.round(c.observed * 100)}%`,
                    ])}
                  />
                </div>
                <div>
                  <div className="micro-label mb-2">Accuracy by confidence state</div>
                  <Rows
                    rows={(data.accuracy_by_confidence ?? []).map((a) => [
                      `${a.state.replace("_", " ")} (n=${a.n})`,
                      `exact ${Math.round(a.exact * 100)}% · ±1 ${Math.round(a.within_one * 100)}%`,
                    ])}
                  />
                </div>
              </div>
            )}
          </Panel>

          <Panel title="By model version">
            <Rows
              rows={data.by_model_version.map((m) => [
                m.model_version,
                `${m.n} predictions · ${m.reported} reported · MAE ${m.mae ?? "not enough data"}`,
              ])}
            />
          </Panel>
        </div>
      )}
    </PageShell>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-border bg-card px-5 py-4">
      <div className="micro-label">{label}</div>
      <div className="num mt-2 text-[22px] font-semibold">{value}</div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
      <h2 className="font-display text-[15px] font-semibold tracking-[-0.02em]">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Rows({ rows }: { rows: Array<[string, string | number]> }) {
  if (!rows.length) return <p className="text-[13px] text-muted-foreground">No data yet.</p>;
  return (
    <ul className="divide-y divide-border text-[13px]">
      {rows.map(([k, v]) => (
        <li key={k} className="flex items-center justify-between gap-4 py-2">
          <span className="text-muted-foreground">{k}</span>
          <span className="num">{v}</span>
        </li>
      ))}
    </ul>
  );
}
