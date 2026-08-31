/**
 * Declarative figure specifications for question stems.
 *
 * A template describes *what* the picture shows; the renderer in
 * `src/components/figures/QuestionFigure.tsx` decides how to draw it. Keeping
 * the description declarative means the stress harness can check a figure
 * against its prompt (monotonicity, sign, interval, feature counts) without
 * touching React.
 */

export type Window = { xMin: number; xMax: number; yMin: number; yMax: number };

/** dy/dx = a·x + b·y on an explicit window. */
export type SlopeFieldFigure = {
  kind: "slope-field";
  a: number;
  b: number;
  /** grid half-width; x,y ∈ [-extent, extent] unless `window` is given */
  extent: number;
  window?: Window;
};

/**
 * A piecewise-linear graph. Kept as its own kind because "the graph of f
 * consists of line segments" is a real AP stem, and those items must render as
 * straight segments.
 */
export type PiecewiseGraphFigure = {
  kind: "piecewise-graph";
  label: string;
  points: Array<[number, number]>;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
};

export type MarkerKind = "closed" | "open" | "hole";

export type GraphMarker = {
  x: number;
  y: number;
  kind: MarkerKind;
  label?: string;
};

export type GraphCurve = {
  label?: string;
  /** ordered sample points; use `sampleCurve` for smooth graphs */
  points: Array<[number, number]>;
  /** true → render as a smooth spline, false → straight segments */
  smooth?: boolean;
  dashed?: boolean;
  /** 0 = primary accent, 1 = secondary accent */
  tone?: 0 | 1;
};

/**
 * A general function graph: one or more curves on labelled axes, with optional
 * discontinuity markers, asymptotes, labelled features, and a shaded region for
 * area / accumulation items.
 */
export type GraphFigure = {
  kind: "graph";
  curves: GraphCurve[];
  window: Window;
  markers?: GraphMarker[];
  vAsymptotes?: number[];
  hAsymptotes?: number[];
  /** shaded region between the x-axis and curve `curve` (default 0) */
  shade?: { from: number; to: number; curve?: number };
  xLabel?: string;
  yLabel?: string;
  caption?: string;
};

/** A data table of function or rate values, including unequal Δx rows. */
export type TableFigure = {
  kind: "table";
  headers: string[];
  rows: string[][];
  caption?: string;
};

/** A parametric or polar curve traced in the plane. */
export type ParametricFigure = {
  kind: "parametric";
  label?: string;
  points: Array<[number, number]>;
  window: Window;
  /** optional shaded sector from the origin, for polar-area items */
  sector?: Array<[number, number]>;
  caption?: string;
};

/** Riemann rectangles or trapezoids drawn over a curve. */
export type RiemannFigure = {
  kind: "riemann";
  curve: Array<[number, number]>;
  /** rectangle/trapezoid boundaries in x, length n+1 */
  cuts: number[];
  mode: "left" | "right" | "midpoint" | "trapezoid";
  window: Window;
  label?: string;
  caption?: string;
};

export type Figure =
  | SlopeFieldFigure
  | PiecewiseGraphFigure
  | GraphFigure
  | TableFigure
  | ParametricFigure
  | RiemannFigure;

/* ------------------------------------------------------------------ */
/* Sampling helpers                                                    */
/* ------------------------------------------------------------------ */

/** Dense samples of a smooth function, for `GraphFigure.curves`. */
export function sampleCurve(
  f: (x: number) => number,
  xMin: number,
  xMax: number,
  n = 96,
): Array<[number, number]> {
  const pts: Array<[number, number]> = [];
  for (let i = 0; i <= n; i++) {
    const x = xMin + ((xMax - xMin) * i) / n;
    const y = f(x);
    if (Number.isFinite(y)) pts.push([x, y]);
  }
  return pts;
}

/** Samples a polar curve r(θ) into Cartesian points. */
export function samplePolar(
  r: (theta: number) => number,
  from: number,
  to: number,
  n = 180,
): Array<[number, number]> {
  const pts: Array<[number, number]> = [];
  for (let i = 0; i <= n; i++) {
    const t = from + ((to - from) * i) / n;
    const rad = r(t);
    if (!Number.isFinite(rad)) continue;
    pts.push([rad * Math.cos(t), rad * Math.sin(t)]);
  }
  return pts;
}

/** Samples a parametric pair (x(t), y(t)). */
export function sampleParametric(
  x: (t: number) => number,
  y: (t: number) => number,
  from: number,
  to: number,
  n = 180,
): Array<[number, number]> {
  const pts: Array<[number, number]> = [];
  for (let i = 0; i <= n; i++) {
    const t = from + ((to - from) * i) / n;
    const px = x(t);
    const py = y(t);
    if (Number.isFinite(px) && Number.isFinite(py)) pts.push([px, py]);
  }
  return pts;
}

/** A window that comfortably contains every supplied point. */
export function fitWindow(points: Array<[number, number]>, pad = 0.5): Window {
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  const round = (v: number, up: boolean) => (up ? Math.ceil(v) : Math.floor(v));
  return {
    xMin: round(Math.min(...xs) - pad, false),
    xMax: round(Math.max(...xs) + pad, true),
    yMin: round(Math.min(...ys) - pad, false),
    yMax: round(Math.max(...ys) + pad, true),
  };
}
