import type {
  Figure,
  GraphFigure,
  ParametricFigure,
  PiecewiseGraphFigure,
  RiemannFigure,
  SlopeFieldFigure,
  TableFigure,
  Window,
} from "@/lib/figures";
import { LaTeX } from "@/components/LaTeX";

/** Dispatches a question figure to the right renderer. */
export function QuestionFigure({ figure, size = 280 }: { figure: Figure; size?: number }) {
  switch (figure.kind) {
    case "table":
      return <DataTable figure={figure} />;
    case "graph":
      return <FunctionGraph figure={figure} size={size} />;
    case "parametric":
      return <ParametricCurve figure={figure} size={size} />;
    case "riemann":
      return <RiemannPlot figure={figure} size={size} />;
    case "piecewise-graph":
      return <PiecewiseGraph figure={figure} size={size} />;
    default:
      return <SlopeFieldPlot figure={figure} size={size} />;
  }
}

/* ------------------------------------------------------------------ */
/* Shared plotting primitives                                          */
/* ------------------------------------------------------------------ */

const PAD = 26;

type Frame = {
  w: number;
  h: number;
  px: (x: number) => number;
  py: (y: number) => number;
  /** axis positions, clamped into the plot area so they never draw outside it */
  axisY: number;
  axisX: number;
  xTicks: number[];
  yTicks: number[];
};

function makeFrame(win: Window, size: number): Frame {
  const w = size + 40;
  const h = size;
  const sx = (w - PAD * 2) / (win.xMax - win.xMin || 1);
  const sy = (h - PAD * 2) / (win.yMax - win.yMin || 1);
  const px = (x: number) => PAD + (x - win.xMin) * sx;
  const py = (y: number) => h - PAD - (y - win.yMin) * sy;
  const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
  const step = (span: number) => (span > 12 ? Math.ceil(span / 8) : 1);

  const xs: number[] = [];
  const dx = step(win.xMax - win.xMin);
  for (let x = Math.ceil(win.xMin); x <= win.xMax; x += dx) xs.push(x);
  const ys: number[] = [];
  const dy = step(win.yMax - win.yMin);
  for (let y = Math.ceil(win.yMin); y <= win.yMax; y += dy) ys.push(y);

  return {
    w,
    h,
    px,
    py,
    // horizontal axis (y = 0) and vertical axis (x = 0), clamped to the frame
    axisX: clamp(py(0), PAD, h - PAD),
    axisY: clamp(px(0), PAD, w - PAD),
    xTicks: xs,
    yTicks: ys,
  };
}

/** Catmull-Rom → cubic Bézier, so smooth curves look like curves. */
function smoothPath(pts: Array<[number, number]>): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0]![0]},${pts[0]![1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)]!;
    const p1 = pts[i]!;
    const p2 = pts[i + 1]!;
    const p3 = pts[Math.min(pts.length - 1, i + 2)]!;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`;
  }
  return d;
}

function linePath(pts: Array<[number, number]>): string {
  return pts.length ? `M ${pts.map(([x, y]) => `${x},${y}`).join(" L ")}` : "";
}

function Axes({ frame, xLabel, yLabel }: { frame: Frame; xLabel?: string; yLabel?: string }) {
  const { w, h, px, py, axisX, axisY, xTicks, yTicks } = frame;
  return (
    <>
      <g className="text-border">
        {xTicks.map((x) => (
          <line key={`gx${x}`} x1={px(x)} y1={PAD} x2={px(x)} y2={h - PAD} stroke="currentColor" strokeWidth={0.5} opacity={0.45} />
        ))}
        {yTicks.map((y) => (
          <line key={`gy${y}`} x1={PAD} y1={py(y)} x2={w - PAD} y2={py(y)} stroke="currentColor" strokeWidth={0.5} opacity={0.45} />
        ))}
      </g>
      <g className="text-muted-foreground">
        <line x1={PAD} y1={axisX} x2={w - PAD} y2={axisX} stroke="currentColor" strokeWidth={1} />
        <line x1={axisY} y1={PAD} x2={axisY} y2={h - PAD} stroke="currentColor" strokeWidth={1} />
        {xTicks
          .filter((x) => x !== 0)
          .map((x) => (
            <text key={`tx${x}`} x={px(x)} y={Math.min(h - 4, axisX + 11)} textAnchor="middle" fontSize={8} fill="currentColor">
              {x}
            </text>
          ))}
        {yTicks
          .filter((y) => y !== 0)
          .map((y) => (
            <text key={`ty${y}`} x={axisY - 5} y={py(y) + 3} textAnchor="end" fontSize={8} fill="currentColor">
              {y}
            </text>
          ))}
        {xLabel ? (
          <text x={w - PAD} y={Math.max(12, axisX - 6)} textAnchor="end" fontSize={9} fill="currentColor">
            {xLabel}
          </text>
        ) : null}
        {yLabel ? (
          <text x={axisY + 4} y={PAD - 8} textAnchor="start" fontSize={9} fill="currentColor">
            {yLabel}
          </text>
        ) : null}
      </g>
    </>
  );
}

function FigureShell({ children, caption }: { children: React.ReactNode; caption?: string }) {
  return (
    <figure className="my-3 inline-block rounded-lg border border-border bg-elevated/30 p-2">
      {children}
      {caption ? (
        <figcaption className="mt-1 max-w-[320px] text-center font-mono text-[10px] leading-snug text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Function graph                                                      */
/* ------------------------------------------------------------------ */

function FunctionGraph({ figure, size }: { figure: GraphFigure; size: number }) {
  const frame = makeFrame(figure.window, size);
  const { px, py, h } = frame;
  const shadeCurve = figure.shade ? figure.curves[figure.shade.curve ?? 0] : undefined;

  const shadePath = (() => {
    if (!figure.shade || !shadeCurve) return "";
    const { from, to } = figure.shade;
    const inside = shadeCurve.points.filter(([x]) => x >= Math.min(from, to) && x <= Math.max(from, to));
    if (inside.length < 2) return "";
    const pts = inside.map(([x, y]) => `${px(x)},${py(y)}`).join(" L ");
    return `M ${px(inside[0]![0])},${frame.axisX} L ${pts} L ${px(inside[inside.length - 1]![0])},${frame.axisX} Z`;
  })();

  const described = figure.curves.map((c) => c.label).filter(Boolean).join(", ");

  return (
    <FigureShell caption={figure.caption ?? described}>
      <svg width={frame.w} height={h} viewBox={`0 0 ${frame.w} ${h}`} role="img" aria-label={`Graph of ${described || "a function"}`}>
        <Axes frame={frame} xLabel={figure.xLabel} yLabel={figure.yLabel} />
        {shadePath ? <path d={shadePath} className="text-primary" fill="currentColor" opacity={0.16} /> : null}
        {(figure.vAsymptotes ?? []).map((x) => (
          <line
            key={`va${x}`}
            x1={px(x)}
            y1={PAD}
            x2={px(x)}
            y2={h - PAD}
            className="text-muted-foreground"
            stroke="currentColor"
            strokeWidth={1}
            strokeDasharray="4 3"
          />
        ))}
        {(figure.hAsymptotes ?? []).map((y) => (
          <line
            key={`ha${y}`}
            x1={PAD}
            y1={py(y)}
            x2={frame.w - PAD}
            y2={py(y)}
            className="text-muted-foreground"
            stroke="currentColor"
            strokeWidth={1}
            strokeDasharray="4 3"
          />
        ))}
        {figure.curves.map((c, i) => {
          const pts = c.points.map(([x, y]) => [px(x), py(y)] as [number, number]);
          return (
            <path
              key={`c${i}`}
              d={c.smooth === false ? linePath(pts) : smoothPath(pts)}
              fill="none"
              className={c.tone === 1 ? "text-accent-foreground" : "text-primary"}
              stroke="currentColor"
              strokeWidth={2}
              strokeDasharray={c.dashed ? "5 4" : undefined}
              strokeLinejoin="round"
            />
          );
        })}
        {(figure.markers ?? []).map((m, i) => (
          <g key={`m${i}`}>
            <circle
              cx={px(m.x)}
              cy={py(m.y)}
              r={3.4}
              className="text-primary"
              stroke="currentColor"
              strokeWidth={1.6}
              fill={m.kind === "closed" ? "currentColor" : "var(--color-background, #fff)"}
            />
            {m.label ? (
              <text x={px(m.x) + 6} y={py(m.y) - 5} fontSize={8} className="text-muted-foreground" fill="currentColor">
                {m.label}
              </text>
            ) : null}
          </g>
        ))}
      </svg>
    </FigureShell>
  );
}

/* ------------------------------------------------------------------ */
/* Piecewise-linear graph (kept: "the graph consists of line segments") */
/* ------------------------------------------------------------------ */

function PiecewiseGraph({ figure, size }: { figure: PiecewiseGraphFigure; size: number }) {
  const frame = makeFrame({ xMin: figure.xMin, xMax: figure.xMax, yMin: figure.yMin, yMax: figure.yMax }, size);
  const pts = figure.points.map(([x, y]) => [frame.px(x), frame.py(y)] as [number, number]);
  return (
    <FigureShell caption={figure.label}>
      <svg width={frame.w} height={frame.h} viewBox={`0 0 ${frame.w} ${frame.h}`} role="img" aria-label={`Graph of ${figure.label}`}>
        <Axes frame={frame} />
        <path d={linePath(pts)} fill="none" className="text-primary" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" />
      </svg>
    </FigureShell>
  );
}

/* ------------------------------------------------------------------ */
/* Parametric / polar curve                                            */
/* ------------------------------------------------------------------ */

function ParametricCurve({ figure, size }: { figure: ParametricFigure; size: number }) {
  const frame = makeFrame(figure.window, size);
  const pts = figure.points.map(([x, y]) => [frame.px(x), frame.py(y)] as [number, number]);
  const sector = (figure.sector ?? []).map(([x, y]) => [frame.px(x), frame.py(y)] as [number, number]);
  return (
    <FigureShell caption={figure.caption ?? figure.label}>
      <svg width={frame.w} height={frame.h} viewBox={`0 0 ${frame.w} ${frame.h}`} role="img" aria-label={`Curve ${figure.label ?? ""}`}>
        <Axes frame={frame} />
        {sector.length > 2 ? (
          <path
            d={`M ${frame.px(0)},${frame.py(0)} L ${sector.map(([x, y]) => `${x},${y}`).join(" L ")} Z`}
            className="text-primary"
            fill="currentColor"
            opacity={0.16}
          />
        ) : null}
        <path d={smoothPath(pts)} fill="none" className="text-primary" stroke="currentColor" strokeWidth={2} />
      </svg>
    </FigureShell>
  );
}

/* ------------------------------------------------------------------ */
/* Riemann rectangles / trapezoids                                     */
/* ------------------------------------------------------------------ */

function RiemannPlot({ figure, size }: { figure: RiemannFigure; size: number }) {
  const frame = makeFrame(figure.window, size);
  const { px, py, axisX } = frame;
  const pts = figure.curve.map(([x, y]) => [px(x), py(y)] as [number, number]);
  const yAt = (x: number) => {
    let best = figure.curve[0]!;
    for (const p of figure.curve) if (Math.abs(p[0] - x) < Math.abs(best[0] - x)) best = p;
    return best[1];
  };

  const cells = figure.cuts.slice(0, -1).map((left, i) => {
    const right = figure.cuts[i + 1]!;
    if (figure.mode === "trapezoid") {
      return (
        <polygon
          key={i}
          points={`${px(left)},${axisX} ${px(left)},${py(yAt(left))} ${px(right)},${py(yAt(right))} ${px(right)},${axisX}`}
          className="text-primary"
          fill="currentColor"
          fillOpacity={0.14}
          stroke="currentColor"
          strokeWidth={1}
        />
      );
    }
    const sampleX = figure.mode === "left" ? left : figure.mode === "right" ? right : (left + right) / 2;
    const top = py(yAt(sampleX));
    return (
      <rect
        key={i}
        x={px(left)}
        y={Math.min(top, axisX)}
        width={px(right) - px(left)}
        height={Math.abs(axisX - top)}
        className="text-primary"
        fill="currentColor"
        fillOpacity={0.14}
        stroke="currentColor"
        strokeWidth={1}
      />
    );
  });

  const modeLabel = { left: "left endpoints", right: "right endpoints", midpoint: "midpoints", trapezoid: "trapezoids" }[
    figure.mode
  ];

  return (
    <FigureShell caption={figure.caption ?? `${figure.label ?? "y = f(x)"} with ${modeLabel}`}>
      <svg
        width={frame.w}
        height={frame.h}
        viewBox={`0 0 ${frame.w} ${frame.h}`}
        role="img"
        aria-label={`Approximation using ${modeLabel}`}
      >
        <Axes frame={frame} />
        {cells}
        <path d={smoothPath(pts)} fill="none" className="text-primary" stroke="currentColor" strokeWidth={2} />
      </svg>
    </FigureShell>
  );
}

/* ------------------------------------------------------------------ */
/* Data table                                                          */
/* ------------------------------------------------------------------ */

function DataTable({ figure }: { figure: TableFigure }) {
  return (
    <figure className="my-3 inline-block max-w-full overflow-x-auto rounded-lg border border-border bg-elevated/30 p-2">
      <table className="w-auto border-collapse text-sm">
        <thead>
          <tr>
            {figure.headers.map((hd, i) => (
              <th key={i} className="border border-border bg-elevated/60 px-2.5 py-1.5 text-center font-medium whitespace-nowrap">
                <LaTeX>{hd}</LaTeX>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {figure.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="border border-border px-2.5 py-1.5 text-center whitespace-nowrap">
                  <LaTeX>{cell}</LaTeX>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {figure.caption ? (
        <figcaption className="mt-1 text-center font-mono text-[10px] text-muted-foreground">{figure.caption}</figcaption>
      ) : null}
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Slope field                                                         */
/* ------------------------------------------------------------------ */

/** "dy/dx = x + 2y" style label with no redundant 1 coefficients. */
export function slopeFieldEquation(a: number, b: number): string {
  const termFor = (c: number, v: string) => {
    if (c === 0) return "";
    const mag = Math.abs(c) === 1 ? "" : `${Math.abs(c)}`;
    return `${mag}${v}`;
  };
  const first = a !== 0 ? `${a < 0 ? "-" : ""}${termFor(a, "x")}` : "";
  const second = b !== 0 ? `${b < 0 ? " - " : first ? " + " : ""}${termFor(b, "y")}` : "";
  const rhs = `${first}${second}` || "0";
  return `dy/dx = ${rhs}`;
}

function SlopeFieldPlot({ figure, size }: { figure: SlopeFieldFigure; size: number }) {
  const win: Window =
    figure.window ?? { xMin: -figure.extent, xMax: figure.extent, yMin: -figure.extent, yMax: figure.extent };
  const frame = makeFrame(win, size);
  const { px, py } = frame;
  const cell = Math.min(
    (px(win.xMin + 1) - px(win.xMin)) || 20,
    (py(win.yMin) - py(win.yMin + 1)) || 20,
  );
  const segLength = cell * 0.68;

  const segments: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];
  for (let x = Math.ceil(win.xMin); x <= win.xMax; x++) {
    for (let y = Math.ceil(win.yMin); y <= win.yMax; y++) {
      const slope = figure.a * x + figure.b * y;
      const angle = Math.atan(slope);
      // slope-aware clipping keeps steep segments inside their own cell
      const dx = (Math.cos(angle) * segLength) / 2;
      const dy = (Math.sin(angle) * segLength) / 2;
      segments.push({ x1: px(x) - dx, y1: py(y) + dy, x2: px(x) + dx, y2: py(y) - dy });
    }
  }

  const eq = slopeFieldEquation(figure.a, figure.b);

  return (
    <FigureShell caption={`${eq}   ·   x ∈ [${win.xMin}, ${win.xMax}], y ∈ [${win.yMin}, ${win.yMax}]`}>
      <svg width={frame.w} height={frame.h} viewBox={`0 0 ${frame.w} ${frame.h}`} role="img" aria-label={`Slope field for ${eq}`}>
        <Axes frame={frame} />
        <g className="text-primary">
          {segments.map((s, i) => (
            <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
          ))}
        </g>
      </svg>
    </FigureShell>
  );
}
