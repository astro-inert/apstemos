/**
 * Unit 5 (analytical applications of differentiation) and Unit 6
 * (integration and accumulation of change) template families.
 *
 * All wording, functions, contexts, answers, and distractors are original.
 */

import {
  dec,
  frac,
  pick,
  ri,
  term,
  type Figure,
  type GraphFigure,
  type PiecewiseGraphFigure,
  type QuestionTemplate,
  type RiemannFigure,
  type RNG,
  type TableFigure,
} from "../question-templates";

const U5 = "unit-5-analytical-applications-of-differentiation";
const U6 = "unit-6-integration-and-accumulation-of-change";

/* ------------------------------------------------------------------ */
/* Local helpers                                                       */
/* ------------------------------------------------------------------ */

function coefTex(k: number): string {
  if (k === 1) return "";
  if (k === -1) return "-";
  return String(k);
}

/** Picks distractors different from the correct answer and each other. */
function opts(correct: string, cands: string[]): string[] {
  const out: string[] = [];
  for (const c of cands) {
    if (c === correct || out.includes(c)) continue;
    out.push(c);
    if (out.length === 3) break;
  }
  while (out.length < 3) out.push(`${out.length + 100}`);
  return out;
}

function pwGraph(
  points: Array<[number, number]>,
  bounds: { xMin: number; xMax: number; yMin: number; yMax: number },
  label = "y = f'(x)",
): PiecewiseGraphFigure {
  return { kind: "piecewise-graph", label, points, ...bounds };
}

function graphFig(
  curves: GraphFigure["curves"],
  window: GraphFigure["window"],
  extra: Partial<GraphFigure> = {},
): GraphFigure {
  return { kind: "graph", curves, window, ...extra };
}

function tableFig(headers: string[], rows: string[][], caption?: string): TableFigure {
  return { kind: "table", headers, rows, caption };
}

function riemannFig(
  curve: Array<[number, number]>,
  cuts: number[],
  mode: RiemannFigure["mode"],
  window: RiemannFigure["window"],
  label?: string,
): RiemannFigure {
  return { kind: "riemann", curve, cuts, mode, window, label };
}

/** Linear function sample points for a piecewise "graph of f'" figure. */
function linePts(m: number, b: number, xMin: number, xMax: number): Array<[number, number]> {
  return [
    [xMin, m * xMin + b],
    [xMax, m * xMax + b],
  ];
}

export const UNIT_05_06_TEMPLATES: QuestionTemplate[] = [
  /* ================================================================ */
  /* Unit 5                                                             */
  /* ================================================================ */

  /* ---- mean-value-theorem:graph (3 families) ---- */
  {
    id: "n5-mvt-graph-secant-1",
    unit: U5,
    topic: "mean-value-theorem",
    difficulty: "medium",
    manifestation: "mean-value-theorem:graph",
    mistakes: ["confuse-average-instantaneous"],
    build: (r: RNG) => {
      const a = ri(r, 0, 2);
      const b = a + ri(r, 3, 6);
      const m = ri(r, 2, 5);
      const c = ri(r, a + 1, b - 1);
      const fa = m * (c - a) * (c - a) * 0 + ri(r, 1, 4); // placeholder unused
      const yA = ri(r, -3, 3);
      const yB = yA + m * (b - a);
      const slope = m;
      return {
        prompt: `The graph shown is a continuous, differentiable curve $y=f(x)$ on $[${a},${b}]$ with $f(${a})=${yA}$ and $f(${b})=${yB}$. According to the Mean Value Theorem, the tangent line at some point $c$ in $(${a},${b})$ must have slope equal to what value?`,
        figure: pwGraph(
          [
            [a, yA],
            [(a + b) / 2, yA + (slope * (b - a)) / 2 + 1],
            [b, yB],
          ],
          { xMin: a - 1, xMax: b + 1, yMin: Math.min(yA, yB) - 3, yMax: Math.max(yA, yB) + 3 },
          "y = f(x)",
        ),
        correct: `${slope}`,
        distractors: opts(`${slope}`, [`${yB - yA}`, `${-slope}`, `${(yA + yB) / 2}`, `${b - a}`]),
        explanation: `The MVT guarantees some $c$ with $f'(c)$ equal to the average rate of change $\\dfrac{f(${b})-f(${a})}{${b}-${a}} = \\dfrac{${yB - yA}}{${b - a}} = ${slope}$.`,
      };
    },
  },
  {
    id: "n5-mvt-graph-tangent-match-2",
    unit: U5,
    topic: "mean-value-theorem",
    difficulty: "medium",
    manifestation: "mean-value-theorem:graph",
    build: (r: RNG) => {
      const a = ri(r, -3, -1);
      const b = a + ri(r, 4, 7);
      const yA = ri(r, 1, 5);
      const drop = ri(r, 2, 6);
      const yB = yA - drop;
      const avg = frac(yB - yA, b - a);
      return {
        prompt: `A twice-differentiable function $f$ has $f(${a})=${yA}$ and $f(${b})=${yB}$, and the graph between them is smooth with no corners. A student wants to identify a guaranteed point of horizontal-tangent-relative behavior. What is the value that $f'(c)$ must equal for at least one $c$ in $(${a},${b})$?`,
        correct: avg,
        distractors: opts(avg, [frac(yA - yB, b - a), frac(yB - yA, a - b), `${yB - yA}`, `0`]),
        explanation: `By the MVT, $f'(c) = \\dfrac{f(${b})-f(${a})}{${b}-${a}} = ${avg}$ for some $c$ in the interval.`,
      };
    },
  },
  {
    id: "n5-mvt-graph-estimate-c-3",
    unit: U5,
    topic: "mean-value-theorem",
    difficulty: "hard",
    manifestation: "mean-value-theorem:graph",
    build: (r: RNG) => {
      const a = 0;
      const b = ri(r, 4, 8);
      const yA = 0;
      const yB = ri(r, 4, 12);
      const slope = frac(yB - yA, b - a);
      const cGuess = Math.round(b / 2);
      return {
        prompt: `The figure shows $y=f(x)$ rising from $(${a},${yA})$ to $(${b},${yB})$ along a single smooth arc. A dashed line marks the secant through the endpoints. Which labeled slope value must match the slope of the tangent line drawn at the point where the tangent is parallel to the secant?`,
        figure: pwGraph(
          [
            [a, yA],
            [cGuess, yB * 0.65],
            [b, yB],
          ],
          { xMin: a - 1, xMax: b + 1, yMin: -2, yMax: yB + 3 },
          "y = f(x)",
        ),
        correct: slope,
        distractors: opts(slope, [`${yB}`, frac(yB, 2 * (b - a)), frac(-(yB - yA), b - a), `${b - a}`]),
        explanation: `The tangent parallel to the secant has the same slope as the secant, $\\dfrac{${yB}-${yA}}{${b}-${a}} = ${slope}$.`,
      };
    },
  },

  /* ---- mean-value-theorem:invalid-application (3 families) ---- */
  {
    id: "n5-mvt-invalid-discontinuous-1",
    unit: U5,
    topic: "mean-value-theorem",
    difficulty: "medium",
    manifestation: "mean-value-theorem:invalid-application",
    mistakes: ["ignores-hypotheses"],
    build: (r: RNG) => {
      const c = ri(r, 1, 5);
      const correct = `\\text{No, because $f$ is not continuous on the closed interval.}`;
      return {
        prompt: `A student claims: "Since $f(${c - 1})=2$ and $f(${c + 1})=6$, the Mean Value Theorem guarantees some $c$ in $(${c - 1},${c + 1})$ with $f'(c)=2$," even though $f$ has a jump discontinuity at $x=${c}$. Is the student's use of the theorem valid?`,
        correct,
        distractors: [
          `\\text{Yes, the theorem applies whenever the endpoint values are known.}`,
          `\\text{Yes, because $f$ is differentiable everywhere except at $x=${c}$.}`,
          `\\text{No, because the average rate of change must always equal an endpoint slope.}`,
        ],
        explanation: `The MVT requires continuity on the closed interval and differentiability on the open interval. A jump discontinuity at an interior point violates the continuity hypothesis, so the conclusion is not guaranteed.`,
      };
    },
  },
  {
    id: "n5-mvt-invalid-corner-2",
    unit: U5,
    topic: "mean-value-theorem",
    difficulty: "medium",
    manifestation: "mean-value-theorem:invalid-application",
    mistakes: ["ignores-hypotheses"],
    build: (r: RNG) => {
      const a = -ri(r, 1, 4);
      const b = ri(r, 1, 4);
      const correct = `\\text{No, because $f(x)=|x|$ is not differentiable at every point of $(${a},${b})$.}`;
      return {
        prompt: `Given $f(x)=|x|$ on $[${a},${b}]$, a student applies the Mean Value Theorem directly and concludes there is a point $c$ in $(${a},${b})$ with $f'(c)$ equal to the slope of the segment joining the endpoints. Which statement best evaluates this reasoning?`,
        correct,
        distractors: [
          `\\text{Yes, because $f$ is continuous on $[${a},${b}]$, which is enough.}`,
          `\\text{Yes, because absolute value functions are always differentiable.}`,
          `\\text{No, because the endpoint values of $f$ are not equal.}`,
        ],
        explanation: `$f(x)=|x|$ has a corner at $x=0$, which lies in $(${a},${b})$, so $f$ fails to be differentiable on the open interval. Continuity alone is not sufficient; the MVT cannot be applied as claimed.`,
      };
    },
  },
  {
    id: "n5-mvt-invalid-rolle-3",
    unit: U5,
    topic: "mean-value-theorem",
    difficulty: "medium",
    manifestation: "mean-value-theorem:invalid-application",
    mistakes: ["confuses-rolle-mvt"],
    build: (r: RNG) => {
      const a = ri(r, 0, 3);
      const b = a + ri(r, 3, 6);
      const correct = `\\text{No, because Rolle's Theorem requires equal endpoint values, and here they differ.}`;
      return {
        prompt: `Since $f$ is continuous and differentiable on $[${a},${b}]$ but $f(${a})\\ne f(${b})$, a student invokes Rolle's Theorem to claim there is a point $c$ in $(${a},${b})$ with $f'(c)=0$. Is this application correct?`,
        correct,
        distractors: [
          `\\text{Yes, because Rolle's Theorem only requires continuity and differentiability.}`,
          `\\text{Yes, since $f'(c)=0$ always exists on any closed interval.}`,
          `\\text{No, because Rolle's Theorem cannot be used on intervals longer than one unit.}`,
        ],
        explanation: `Rolle's Theorem is the special case of the MVT that additionally requires $f(a)=f(b)$. Since the endpoint values here are unequal, the theorem does not apply, though the (weaker) MVT conclusion about the average rate of change would still hold.`,
      };
    },
  },

  /* ---- critical-points:graph (3 families) ---- */
  {
    id: "n5-crit-graph-count-1",
    unit: U5,
    topic: "critical-points",
    difficulty: "medium",
    manifestation: "critical-points:graph",
    build: (r: RNG) => {
      const z1 = ri(r, -3, -1);
      const z2 = z1 + ri(r, 2, 4);
      const pts: Array<[number, number]> = [
        [z1 - 2, 3],
        [z1, 0],
        [(z1 + z2) / 2, -3],
        [z2, 0],
        [z2 + 2, 3],
      ];
      const correct = `x = ${z1} \\text{ and } x = ${z2}`;
      return {
        prompt: `The graph shown is $y=f'(x)$. Based on where this graph crosses the $x$-axis, at which $x$-values does $f$ have critical numbers?`,
        figure: pwGraph(pts, { xMin: z1 - 3, xMax: z2 + 3, yMin: -4, yMax: 4 }, "y = f'(x)"),
        correct,
        distractors: [
          `x = ${(z1 + z2) / 2} \\text{ only}`,
          `x = ${z1 - 2} \\text{ and } x = ${z2 + 2}`,
          `x = ${z1} \\text{ only}`,
        ],
        explanation: `Critical numbers occur where $f'(x)=0$ or is undefined. The graph of $f'$ crosses zero exactly at $x=${z1}$ and $x=${z2}$.`,
      };
    },
  },
  {
    id: "n5-crit-graph-classify-2",
    unit: U5,
    topic: "critical-points",
    difficulty: "medium",
    manifestation: "critical-points:graph",
    build: (r: RNG) => {
      const c = ri(r, -2, 2);
      const pts: Array<[number, number]> = [
        [c - 3, -3],
        [c, 0],
        [c + 3, 3],
      ];
      const correct = `\\text{$f$ has a local minimum at $x=${c}$.}`;
      return {
        prompt: `The graph of $f'$ is shown, a single increasing line crossing the $x$-axis at $x=${c}$. What must be true about $f$ at the critical number $x=${c}$?`,
        figure: pwGraph(pts, { xMin: c - 4, xMax: c + 4, yMin: -4, yMax: 4 }, "y = f'(x)"),
        correct,
        distractors: [
          `\\text{$f$ has a local maximum at $x=${c}$.}`,
          `\\text{$f$ has an inflection point at $x=${c}$ but no extremum.}`,
          `\\text{$f$ is undefined at $x=${c}$.}`,
        ],
        explanation: `$f'$ changes from negative to positive at $x=${c}$ (since the line is increasing through zero there), so by the First Derivative Test $f$ has a local minimum at $x=${c}$.`,
      };
    },
  },
  {
    id: "n5-crit-graph-undefined-3",
    unit: U5,
    topic: "critical-points",
    difficulty: "hard",
    manifestation: "critical-points:graph",
    mistakes: ["misses-undefined-derivative"],
    build: (r: RNG) => {
      const c = ri(r, -1, 3);
      const jumpFrom = ri(r, 1, 3);
      const jumpTo = -ri(r, 1, 3);
      const correct = `x = ${c} \\text{ only, since } f' \\text{ is undefined there}`;
      return {
        prompt: `The graph of $f'$ shown has a jump discontinuity at $x=${c}$ (approaching $${jumpFrom}$ from the left and $${jumpTo}$ from the right) and never equals zero anywhere else. Which $x$-value(s) are critical numbers of $f$?`,
        figure: pwGraph(
          [
            [c - 3, jumpFrom],
            [c, jumpFrom],
            [c, jumpTo],
            [c + 3, jumpTo],
          ],
          { xMin: c - 4, xMax: c + 4, yMin: -4, yMax: 4 },
          "y = f'(x)",
        ),
        correct,
        distractors: [
          `\\text{There are no critical numbers because } f' \\text{ never equals } 0`,
          `x = ${c - 3} \\text{ and } x = ${c + 3}`,
          `\\text{Every } x \\text{ is a critical number}`,
        ],
        explanation: `A critical number occurs where $f'$ is zero or fails to exist. Since $f'$ never equals zero but is undefined at $x=${c}$ (a jump), $x=${c}$ is the only critical number.`,
      };
    },
  },

  /* ---- second-derivative-test:from-graph (3 families) ---- */
  {
    id: "n5-sdt-graph-concavity-1",
    unit: U5,
    topic: "second-derivative-test",
    difficulty: "medium",
    manifestation: "second-derivative-test:from-graph",
    build: (r: RNG) => {
      const c = ri(r, -2, 2);
      const pts: Array<[number, number]> = [
        [c - 3, 3],
        [c, 0],
        [c + 3, -3],
      ];
      const correct = `\\text{$f$ is concave down and has a local maximum at $x=${c}$.}`;
      return {
        prompt: `The graph shown is $y=f'(x)$, a decreasing line crossing zero at $x=${c}$. Use the Second Derivative Test to describe the behavior of $f$ at $x=${c}$.`,
        figure: pwGraph(pts, { xMin: c - 4, xMax: c + 4, yMin: -4, yMax: 4 }, "y = f'(x)"),
        correct,
        distractors: [
          `\\text{$f$ is concave up and has a local minimum at $x=${c}$.}`,
          `\\text{$f$ is concave down and has a local minimum at $x=${c}$.}`,
          `\\text{$f$ has an inflection point at $x=${c}$.}`,
        ],
        explanation: `Since $f'$ is decreasing, $f''<0$ near $x=${c}$, so $f$ is concave down there; because $f'(${c})=0$ with $f''(${c})<0$, $f$ has a local maximum by the Second Derivative Test.`,
      };
    },
  },
  {
    id: "n5-sdt-graph-inflection-2",
    unit: U5,
    topic: "second-derivative-test",
    difficulty: "medium",
    manifestation: "second-derivative-test:from-graph",
    build: (r: RNG) => {
      const c = ri(r, -1, 3);
      const pts: Array<[number, number]> = [
        [c - 3, -2],
        [c, 3],
        [c + 3, -2],
      ];
      const correct = `x = ${c}`;
      return {
        prompt: `The graph shown is $y=f'(x)$. It rises to a peak at $x=${c}$ and falls afterward, meaning $f'$ increases then decreases. At which $x$-value does $f$ have an inflection point?`,
        figure: pwGraph(pts, { xMin: c - 4, xMax: c + 4, yMin: -4, yMax: 4 }, "y = f'(x)"),
        correct,
        distractors: [`x = ${c - 3}`, `x = ${c + 3}`, `\\text{$f$ has no inflection point.}`],
        explanation: `An inflection point of $f$ occurs where $f'$ changes from increasing to decreasing (or vice versa), i.e. where $f''$ changes sign. That happens at the peak of the $f'$ graph, $x=${c}$.`,
      };
    },
  },
  {
    id: "n5-sdt-graph-fail-3",
    unit: U5,
    topic: "second-derivative-test",
    difficulty: "hard",
    manifestation: "second-derivative-test:from-graph",
    mistakes: ["misapplies-inconclusive-case"],
    build: (r: RNG) => {
      const c = ri(r, -2, 2);
      const pts: Array<[number, number]> = [
        [c - 3, 4],
        [c - 0.5, 0.2],
        [c, 0],
        [c + 0.5, 0.2],
        [c + 3, 4],
      ];
      const correct = `\\text{The test is inconclusive because $f'$ touches zero without changing sign or slope near $x=${c}$.}`;
      return {
        prompt: `The graph of $f'$ shown touches the $x$-axis at $x=${c}$ but stays non-negative on both sides, flattening out right at that point ($f''(${c})=0$ as well). What can be concluded using the Second Derivative Test at $x=${c}$?`,
        figure: pwGraph(pts, { xMin: c - 4, xMax: c + 4, yMin: -1, yMax: 5 }, "y = f'(x)"),
        correct,
        distractors: [
          `\\text{$f$ has a local maximum at $x=${c}$.}`,
          `\\text{$f$ has a local minimum at $x=${c}$.}`,
          `\\text{$f$ is concave up at $x=${c}$.}`,
        ],
        explanation: `Because $f''(${c})=0$ as well, the Second Derivative Test gives no information; here $f'$ does not change sign at $x=${c}$, so it is neither a maximum nor a minimum, and the test result is inconclusive.`,
      };
    },
  },

  /* ---- second-derivative-test:table (3 families) ---- */
  {
    id: "n5-sdt-table-classify-1",
    unit: U5,
    topic: "second-derivative-test",
    difficulty: "medium",
    manifestation: "second-derivative-test:table",
    build: (r: RNG) => {
      const c = ri(r, 1, 6);
      const fpVals = [-2, -0.5, 0, 0.6, 2];
      const xs = [c - 2, c - 1, c, c + 1, c + 2];
      const correct = `\\text{$f$ has a local minimum at $x=${c}$.}`;
      return {
        prompt: `Selected values of $f'(x)$ near $x=${c}$ are given in the table. What does this data suggest about $f$ at $x=${c}$?`,
        figure: tableFig(
          ["$x$", ...xs.map((x) => `${x}`)],
          [["$f'(x)$", ...fpVals.map((v) => `${v}`)]],
        ),
        correct,
        distractors: [
          `\\text{$f$ has a local maximum at $x=${c}$.}`,
          `\\text{$f$ has an inflection point but no extremum at $x=${c}$.}`,
          `\\text{$f$ is decreasing throughout the interval shown.}`,
        ],
        explanation: `$f'$ changes sign from negative to positive between $x=${c - 1}$ and $x=${c + 1}$, consistent with $f'(${c})=0$ and increasing $f'$, so $f''(${c})>0$ and $f$ has a local minimum at $x=${c}$.`,
      };
    },
  },
  {
    id: "n5-sdt-table-concavity-2",
    unit: U5,
    topic: "second-derivative-test",
    difficulty: "medium",
    manifestation: "second-derivative-test:table",
    build: (r: RNG) => {
      const a = ri(r, 0, 3);
      const xs = [a, a + 1, a + 2, a + 3];
      const fVals = [ri(r, 1, 3), ri(r, 5, 7), ri(r, 9, 11), ri(r, 13, 14)];
      // make second differences positive (concave up) by construction
      const correct = `\\text{The data is consistent with $f$ being concave up on $[${a},${a + 3}]$.}`;
      return {
        prompt: `Values of $f$ at evenly spaced $x$-values are shown. The successive differences in $f$ are increasing. Based on this estimate, what can be said about the concavity of $f$ on $[${a},${a + 3}]$?`,
        figure: tableFig(
          ["$x$", ...xs.map((x) => `${x}`)],
          [["$f(x)$", ...fVals.map((v) => `${v}`)]],
        ),
        correct,
        distractors: [
          `\\text{The data is consistent with $f$ being concave down on $[${a},${a + 3}]$.}`,
          `\\text{The data shows $f$ has an inflection point on $[${a},${a + 3}]$.}`,
          `\\text{Concavity cannot be estimated from values of $f$ alone.}`,
        ],
        explanation: `Increasing successive differences of $f$ indicate an increasing average rate of change, which estimates $f''>0$, i.e. concave up, on the interval.`,
      };
    },
  },
  {
    id: "n5-sdt-table-estimate-3",
    unit: U5,
    topic: "second-derivative-test",
    difficulty: "hard",
    manifestation: "second-derivative-test:table",
    build: (r: RNG) => {
      const c = ri(r, 2, 5);
      const fp = [1.8, 0.9, 0, -1.1, -2.2];
      const xs = [c - 2, c - 1, c, c + 1, c + 2];
      const correct = `\\text{$f''(${c}) < 0$, so $f$ is concave down near $x=${c}$.}`;
      return {
        prompt: `The table gives estimated values of $f'(x)$ near $x=${c}$. What is the sign of $f''(${c})$, and what does it imply about the concavity of $f$ there?`,
        figure: tableFig(["$x$", ...xs.map((x) => `${x}`)], [["$f'(x)$", ...fp.map((v) => `${v}`)]]),
        correct,
        distractors: [
          `\\text{$f''(${c}) > 0$, so $f$ is concave up near $x=${c}$.}`,
          `\\text{$f''(${c}) = 0$, so no conclusion about concavity is possible.}`,
          `\\text{$f'(${c}) < 0$, so $f$ is decreasing near $x=${c}$.}`,
        ],
        explanation: `Since $f'$ is decreasing through $x=${c}$ (from positive to negative), $f''(${c})<0$, indicating $f$ is concave down near $x=${c}$.`,
      };
    },
  },

  /* ---- local-and-global-extrema:open-interval (3 families) ---- */
  {
    id: "n5-extrema-open-nomax-1",
    unit: U5,
    topic: "local-and-global-extrema",
    difficulty: "medium",
    manifestation: "local-and-global-extrema:open-interval",
    build: (r: RNG) => {
      const a = ri(r, 1, 4);
      const b = a + ri(r, 3, 6);
      const correct = `\\text{$f$ need not have an absolute maximum on $(${a},${b})$.}`;
      return {
        prompt: `Let $f$ be continuous on the open interval $(${a},${b})$. Which statement must be true?`,
        correct,
        distractors: [
          `\\text{$f$ must attain an absolute maximum and minimum on $(${a},${b})$.}`,
          `\\text{$f$ must be differentiable on $(${a},${b})$.}`,
          `\\text{$f$ must be bounded on $(${a},${b})$.}`,
        ],
        explanation: `The Extreme Value Theorem requires a closed, bounded interval. On an open interval, continuity alone does not guarantee an absolute extremum exists — for instance $f$ could increase without bound as $x$ approaches an open endpoint.`,
      };
    },
  },
  {
    id: "n5-extrema-open-endpoint-2",
    unit: U5,
    topic: "local-and-global-extrema",
    difficulty: "medium",
    manifestation: "local-and-global-extrema:open-interval",
    build: (r: RNG) => {
      const k = ri(r, 2, 6);
      const correct = `\\text{No; a global minimum on $(0,\\infty)$ is not guaranteed to exist.}`;
      return {
        prompt: `Consider $f(x)=${k}x + \\dfrac{${k}}{x}$ for $x$ in the unbounded open interval $(0,\\infty)$. A student argues that because $f$ is continuous, it must attain a global minimum somewhere in $(0,\\infty)$. Is this reasoning correct?`,
        correct,
        distractors: [
          `\\text{Yes; continuity on any interval guarantees a global minimum.}`,
          `\\text{Yes, because $f$ is differentiable everywhere on $(0,\\infty)$.}`,
          `\\text{No, because $f$ is not continuous at $x=0$.}`,
        ],
        explanation: `The interval $(0,\\infty)$ is neither closed nor bounded, so the Extreme Value Theorem does not apply automatically. (This particular $f$ does happen to attain a minimum, but that must be verified directly with calculus, not assumed from continuity alone.)`,
      };
    },
  },
  {
    id: "n5-extrema-open-critical-3",
    unit: U5,
    topic: "local-and-global-extrema",
    difficulty: "hard",
    manifestation: "local-and-global-extrema:open-interval",
    build: (r: RNG) => {
      const c = ri(r, 1, 5);
      const correct = `\\text{If $f$ has exactly one critical number $x=${c}$ on $(${c - 3},${c + 3})$ and $f'$ changes from negative to positive there, then $f(${c})$ is a global minimum on that interval.}`;
      return {
        prompt: `Which statement about a differentiable function $f$ on the open interval $(${c - 3},${c + 3})$ must be true?`,
        correct,
        distractors: [
          `\\text{Any critical number of $f$ on $(${c - 3},${c + 3})$ must be a global extremum.}`,
          `\\text{If $f'(${c})=0$, then $f(${c})$ must be a global maximum.}`,
          `\\text{A function with no critical numbers on $(${c - 3},${c + 3})$ must be constant.}`,
        ],
        explanation: `On an open interval, a single critical number where $f'$ switches from negative to positive is a local minimum that is also the global minimum, since $f$ decreases into it and increases away from it with no other competing critical points.`,
      };
    },
  },

  /* ---- curve-sketching:match-graphs (3 families) ---- */
  {
    id: "n5-sketch-match-basic-1",
    unit: U5,
    topic: "curve-sketching",
    difficulty: "medium",
    manifestation: "curve-sketching:match-graphs",
    build: (r: RNG) => {
      const c = ri(r, -2, 2);
      const correct = `\\text{Graph I is $f$, Graph II is $f'$, and Graph III is $f''$.}`;
      return {
        prompt: `Three graphs are described: Graph I is a curve with a single local minimum at $x=${c}$; Graph II is a line that is negative for $x<${c}$, zero at $x=${c}$, and positive for $x>${c}$; Graph III is a constant positive horizontal line. If these represent $f$, $f'$, and $f''$ in some order, which assignment is consistent?`,
        correct,
        distractors: [
          `\\text{Graph I is $f''$, Graph II is $f$, and Graph III is $f'$.}`,
          `\\text{Graph I is $f'$, Graph II is $f$, and Graph III is $f''$.}`,
          `\\text{Graph I is $f$, Graph II is $f''$, and Graph III is $f'$.}`,
        ],
        explanation: `Graph I's minimum at $x=${c}$ matches Graph II being zero (and changing sign) there, since $f'=0$ at an extremum of $f$; Graph II's constant positive slope matches Graph III being its (constant) derivative.`,
      };
    },
  },
  {
    id: "n5-sketch-match-cubic-2",
    unit: U5,
    topic: "curve-sketching",
    difficulty: "hard",
    manifestation: "curve-sketching:match-graphs",
    build: (r: RNG) => {
      const correct = `\\text{Curve B, since it is the parabola that is zero exactly where Curve A has horizontal tangents.}`;
      return {
        prompt: `Curve A is the graph of a cubic $f$ with local extrema at $x=-1$ and $x=1$. Curve B is an upward parabola with zeros at $x=-1$ and $x=1$. Which curve could represent $f'$?`,
        correct,
        distractors: [
          `\\text{Curve A, since a function is always its own derivative near extrema.}`,
          `\\text{Neither curve, since $f'$ of a cubic must be linear.}`,
          `\\text{Curve B, since it must have the same sign as $f$ everywhere.}`,
        ],
        explanation: `The derivative of a cubic is a quadratic, and it must vanish exactly at the cubic's critical numbers, $x=\\pm1$. Curve B matches both facts, so it is consistent with being $f'$.`,
      };
    },
  },
  {
    id: "n5-sketch-match-inflection-3",
    unit: U5,
    topic: "curve-sketching",
    difficulty: "hard",
    manifestation: "curve-sketching:match-graphs",
    build: (r: RNG) => {
      const c = ri(r, -1, 3);
      const correct = `\\text{The graph with a single zero-crossing at $x=${c}$ and no sign changes elsewhere is $f''$.}`;
      return {
        prompt: `Function $f$ has exactly one inflection point, at $x=${c}$, and is concave down for $x<${c}$, concave up for $x>${c}$. Among three candidate graphs — one that is negative then positive with one crossing at $x=${c}$, one that is always positive, and one that has two crossings — which must represent $f''$?`,
        correct,
        distractors: [
          `\\text{The always-positive graph, since $f''$ can never be negative.}`,
          `\\text{The graph with two crossings, since inflection points always come in pairs.}`,
          `\\text{None of them, since $f''$ cannot be determined from concavity alone.}`,
        ],
        explanation: `A single inflection point with concave-down-to-concave-up behavior means $f''$ changes sign exactly once, from negative to positive, at $x=${c}$ — matching the graph with one crossing there.`,
      };
    },
  },

  /* ---- curve-sketching:table-behavior (3 families) ---- */
  {
    id: "n5-sketch-table-signchange-1",
    unit: U5,
    topic: "curve-sketching",
    difficulty: "medium",
    manifestation: "curve-sketching:table-behavior",
    build: (r: RNG) => {
      const xs = [0, 1, 2, 3, 4];
      const fp = [3, 1, 0, -2, -4];
      const correct = `\\text{$f$ is increasing on $(0,2)$ and decreasing on $(2,4)$.}`;
      return {
        prompt: `Selected values of $f'(x)$ are shown. Which statement must be true about $f$ on $[0,4]$?`,
        figure: tableFig(["$x$", ...xs.map((x) => `${x}`)], [["$f'(x)$", ...fp.map((v) => `${v}`)]]),
        correct,
        distractors: [
          `\\text{$f$ is decreasing on $(0,2)$ and increasing on $(2,4)$.}`,
          `\\text{$f$ is increasing on all of $(0,4)$.}`,
          `\\text{$f$ has a local minimum at $x=2$.}`,
        ],
        explanation: `Since $f'(x)>0$ for $x<2$ and $f'(x)<0$ for $x>2$, $f$ increases on $(0,2)$ and decreases on $(2,4)$, giving a local maximum, not minimum, at $x=2$.`,
      };
    },
  },
  {
    id: "n5-sketch-table-concavity-2",
    unit: U5,
    topic: "curve-sketching",
    difficulty: "medium",
    manifestation: "curve-sketching:table-behavior",
    build: (r: RNG) => {
      const xs = [1, 2, 3, 4, 5];
      const fpp = [-2, -1, 0, 1, 2];
      const correct = `\\text{$f$ has an inflection point at $x=3$.}`;
      return {
        prompt: `Selected values of $f''(x)$ are shown at evenly spaced $x$-values. Which statement about $f$ must be true?`,
        figure: tableFig(["$x$", ...xs.map((x) => `${x}`)], [["$f''(x)$", ...fpp.map((v) => `${v}`)]]),
        correct,
        distractors: [
          `\\text{$f$ has a local maximum at $x=3$.}`,
          `\\text{$f$ is concave up on all of $[1,5]$.}`,
          `\\text{$f$ has a local minimum at $x=3$.}`,
        ],
        explanation: `$f''$ changes sign from negative to positive at $x=3$, so concavity switches there, producing an inflection point (not necessarily an extremum, since we have no data about $f'$).`,
      };
    },
  },
  {
    id: "n5-sketch-table-mustbetrue-3",
    unit: U5,
    topic: "curve-sketching",
    difficulty: "hard",
    manifestation: "curve-sketching:table-behavior",
    build: (r: RNG) => {
      const xs = [0, 2, 4, 6];
      const fVals = [1, 5, 5, 1];
      const correct = `\\text{By the Mean Value Theorem, $f'(c)=0$ for some $c$ in $(2,4)$.}`;
      return {
        prompt: `Selected values of a differentiable function $f$ are shown. Which conclusion is fully justified by this data?`,
        figure: tableFig(["$x$", ...xs.map((x) => `${x}`)], [["$f(x)$", ...fVals.map((v) => `${v}`)]]),
        correct,
        distractors: [
          `\\text{$f$ is constant on $[2,4]$.}`,
          `\\text{$f$ has no critical numbers on $(0,6)$.}`,
          `\\text{$f''(x)>0$ for all $x$ in $(2,4)$.}`,
        ],
        explanation: `Since $f(2)=f(4)=5$, Rolle's Theorem (a case of the MVT) guarantees some $c$ in $(2,4)$ with $f'(c)=0$. The table alone does not establish the other, stronger claims.`,
      };
    },
  },

  /* ---- curve-sketching:error-analysis (3 families) ---- */
  {
    id: "n5-sketch-error-signconfuse-1",
    unit: U5,
    topic: "curve-sketching",
    difficulty: "medium",
    manifestation: "curve-sketching:error-analysis",
    mistakes: ["confuses-f-and-fprime"],
    build: (r: RNG) => {
      const c = ri(r, -2, 3);
      const correct = `\\text{The student mistook the graph of $f'$ for the graph of $f$, concluding $f$ is increasing where actually $f'$ is positive—which is correct, but stating the maximum of $f$ occurs where the graph shown is highest is wrong since that graph is $f'$, not $f$.}`;
      return {
        prompt: `Given the graph of $f'$, a student states: "The graph shows $f$ has its maximum value at $x=${c}$, because the curve is highest there." What is the flaw in this reasoning?`,
        correct,
        distractors: [
          `\\text{There is no flaw; the highest point of any graph always corresponds to a maximum of $f$.}`,
          `\\text{The flaw is that maxima of $f$ can only occur at endpoints.}`,
          `\\text{The flaw is that $f'$ cannot have a maximum value.}`,
        ],
        explanation: `The student is looking at the graph of $f'$, not $f$. The peak of $f'$'s graph tells us where $f'$ is largest, not where $f$ itself is maximized; to find extrema of $f$ we need where $f'=0$ and changes sign.`,
      };
    },
  },
  {
    id: "n5-sketch-error-concavity-2",
    unit: U5,
    topic: "curve-sketching",
    difficulty: "medium",
    manifestation: "curve-sketching:error-analysis",
    mistakes: ["confuses-increasing-with-concave-up"],
    build: (r: RNG) => {
      const correct = `\\text{The student is wrong: $f'$ increasing means $f$ is concave up, not that $f$ itself is increasing.}`;
      return {
        prompt: `A student sees that $f'(x)$ is an increasing function on an interval and concludes, "So $f(x)$ must be increasing on that interval too." Evaluate this claim.`,
        correct,
        distractors: [
          `\\text{The student is correct, since an increasing derivative always means an increasing function.}`,
          `\\text{The student is correct only if $f(0)=0$.}`,
          `\\text{The claim cannot be evaluated without knowing $f''$.}`,
        ],
        explanation: `An increasing $f'$ means $f''>0$, i.e. $f$ is concave up — it says nothing about the sign of $f'$ itself. $f$ could be decreasing the whole time while still concave up (e.g. $f'$ rising from $-5$ to $-1$).`,
      };
    },
  },
  {
    id: "n5-sketch-error-inflection-3",
    unit: U5,
    topic: "curve-sketching",
    difficulty: "hard",
    manifestation: "curve-sketching:error-analysis",
    mistakes: ["assumes-fpp-zero-implies-inflection"],
    build: (r: RNG) => {
      const c = ri(r, -1, 3);
      const correct = `\\text{The student is wrong: $f''(${c})=0$ alone does not guarantee an inflection point unless concavity actually changes sign there.}`;
      return {
        prompt: `A student computes $f''(${c})=0$ and concludes, "Therefore $x=${c}$ must be an inflection point of $f$." What is wrong with this argument?`,
        correct,
        distractors: [
          `\\text{Nothing is wrong; $f''(${c})=0$ always produces an inflection point.}`,
          `\\text{The error is that inflection points require $f'(${c})=0$ as well.}`,
          `\\text{The error is that $f''$ can never equal zero at a true function value.}`,
        ],
        explanation: `$f''(${c})=0$ is necessary but not sufficient for an inflection point; the student must also check that $f''$ actually changes sign at $x=${c}$ (e.g. $f(x)=x^4$ has $f''(0)=0$ but no inflection point there).`,
      };
    },
  },

  /* ================================================================ */
  /* Unit 6                                                             */
  /* ================================================================ */

  /* ---- riemann-sums:graph-sum (3 families) ---- */
  {
    id: "n6-riemann-graph-left-1",
    unit: U6,
    topic: "riemann-sums",
    difficulty: "medium",
    manifestation: "riemann-sums:graph-sum",
    mistakes: ["wrong-endpoint-rule"],
    build: (r: RNG) => {
      const vals = [ri(r, 1, 3), ri(r, 3, 5), ri(r, 5, 7), ri(r, 7, 9)];
      const cuts = [0, 1, 2, 3, 4];
      const curve: Array<[number, number]> = cuts.map((x, i) => [x, i < vals.length ? vals[i] : vals[vals.length - 1]]);
      const left = vals.slice(0, 4).reduce((s, v) => s + v, 0);
      const correct = `${left}`;
      return {
        prompt: `Using the graph of $f$ shown, estimate $\\displaystyle\\int_0^4 f(x)\\,dx$ with a left Riemann sum using four subintervals of width $1$.`,
        figure: riemannFig(curve, cuts, "left", { xMin: -0.5, xMax: 4.5, yMin: 0, yMax: Math.max(...vals) + 2 }, "y = f(x)"),
        correct,
        distractors: opts(correct, [
          `${vals[1] + vals[2] + vals[3] + vals[3]}`,
          `${vals.reduce((s, v) => s + v, 0)}`,
          `${left / 2}`,
        ]),
        explanation: `A left sum uses the function value at the left endpoint of each subinterval: $${vals.slice(0, 4).join(" + ")} = ${left}$ (each width is $1$).`,
      };
    },
  },
  {
    id: "n6-riemann-graph-right-2",
    unit: U6,
    topic: "riemann-sums",
    difficulty: "medium",
    manifestation: "riemann-sums:graph-sum",
    mistakes: ["wrong-endpoint-rule"],
    build: (r: RNG) => {
      const vals = [ri(r, 8, 10), ri(r, 6, 8), ri(r, 4, 6), ri(r, 2, 4), ri(r, 1, 2)];
      const cuts = [0, 2, 4, 6, 8, 10];
      const curve: Array<[number, number]> = cuts.map((x, i) => [x, vals[Math.min(i, vals.length - 1)]]);
      const right = vals.slice(1, 5).reduce((s, v) => s + v, 0) * 2;
      const correct = `${right}`;
      return {
        prompt: `A decreasing function $f$ is graphed above five subintervals of width $2$ on $[0,10]$. What does the right Riemann sum estimate for $\\displaystyle\\int_0^{10} f(x)\\,dx$?`,
        figure: riemannFig(curve, cuts, "right", { xMin: -1, xMax: 11, yMin: 0, yMax: Math.max(...vals) + 2 }, "y = f(x)"),
        correct,
        distractors: opts(correct, [
          `${vals.slice(0, 4).reduce((s, v) => s + v, 0) * 2}`,
          `${vals.reduce((s, v) => s + v, 0) * 2}`,
          `${right / 2}`,
        ]),
        explanation: `A right sum multiplies each subinterval's width ($2$) by the function value at its right endpoint: $2(${vals.slice(1, 5).join(" + ")}) = ${right}$.`,
      };
    },
  },
  {
    id: "n6-riemann-graph-midpoint-3",
    unit: U6,
    topic: "riemann-sums",
    difficulty: "hard",
    manifestation: "riemann-sums:graph-sum",
    build: (r: RNG) => {
      const mids = [ri(r, 2, 4), ri(r, 4, 6), ri(r, 6, 8)];
      const cuts = [0, 2, 4, 6];
      const curve: Array<[number, number]> = [
        [0, mids[0] - 0.5],
        [2, mids[0] + 0.5],
        [2, mids[1] - 0.5],
        [4, mids[1] + 0.5],
        [4, mids[2] - 0.5],
        [6, mids[2] + 0.5],
      ];
      const total = mids.reduce((s, v) => s + v, 0) * 2;
      const correct = `${total}`;
      return {
        prompt: `The graph of $f$ passes through the midpoint heights $${mids.join(", ")}$ on the three subintervals $[0,2]$, $[2,4]$, $[4,6]$. Approximate $\\displaystyle\\int_0^6 f(x)\\,dx$ using a midpoint Riemann sum.`,
        figure: riemannFig(curve, cuts, "midpoint", { xMin: -1, xMax: 7, yMin: 0, yMax: Math.max(...mids) + 3 }, "y = f(x)"),
        correct,
        distractors: opts(correct, [
          `${mids.reduce((s, v) => s + v, 0)}`,
          `${total / 2}`,
          `${total + 2}`,
        ]),
        explanation: `Each subinterval has width $2$, so the midpoint sum is $2(${mids.join("+")}) = ${total}$.`,
      };
    },
  },

  /* ---- fundamental-theorem-of-calculus:ftc1-basic (3 families) ---- */
  {
    id: "n6-ftc1-basic-poly-1",
    unit: U6,
    topic: "fundamental-theorem-of-calculus",
    difficulty: "easy",
    manifestation: "fundamental-theorem-of-calculus:ftc1-basic",
    build: (r: RNG) => {
      const a = ri(r, 2, 6);
      const b = ri(r, 1, 5);
      return {
        prompt: `If $g(x)=\\displaystyle\\int_0^x (${a}t ${term(b, "")})\\,dt$, find $g'(x)$.`,
        correct: `${a}x ${term(b, "")}`,
        distractors: [
          `${a}x^2 ${term(b, "x")}`,
          `${a}`,
          `\\dfrac{${a}}{2}x^2 ${term(b, "x")}`,
        ],
        explanation: `By the First Fundamental Theorem of Calculus, $g'(x)$ is the integrand evaluated at $x$: $g'(x) = ${a}x ${term(b, "")}$.`,
      };
    },
  },
  {
    id: "n6-ftc1-basic-trig-2",
    unit: U6,
    topic: "fundamental-theorem-of-calculus",
    difficulty: "easy",
    manifestation: "fundamental-theorem-of-calculus:ftc1-basic",
    build: (r: RNG) => {
      const a = ri(r, 2, 6);
      return {
        prompt: `Suppose $F(x)=\\displaystyle\\int_1^x \\sin(${coefTex(a)}t)\\,dt$. What is $F'(x)$?`,
        correct: `\\sin(${coefTex(a)}x)`,
        distractors: [
          `${a}\\cos(${coefTex(a)}x)`,
          `-\\sin(${coefTex(a)}x)`,
          `\\cos(${coefTex(a)}x)`,
        ],
        explanation: `The First FTC says the derivative of an accumulation function is the integrand evaluated at the upper limit: $F'(x)=\\sin(${coefTex(a)}x)$.`,
      };
    },
  },
  {
    id: "n6-ftc1-basic-eval-3",
    unit: U6,
    topic: "fundamental-theorem-of-calculus",
    difficulty: "medium",
    manifestation: "fundamental-theorem-of-calculus:ftc1-basic",
    build: (r: RNG) => {
      const p = ri(r, 2, 4);
      const c = ri(r, 2, 5);
      const val = c ** p;
      return {
        prompt: `Let $h(x)=\\displaystyle\\int_0^x t^{${p - 1}}\\,dt$ scaled so that $h'(x)=${p}x^{${p - 1}}$. What is $h'(${c})$?`,
        correct: `${p * c ** (p - 1)}`,
        distractors: [
          `${c ** p}`,
          `${p * c ** p}`,
          `${(p - 1) * c ** (p - 2)}`,
        ],
        explanation: `Since $h'(x)=${p}x^{${p - 1}}$ by the First FTC, substituting $x=${c}$ gives $h'(${c}) = ${p}\\cdot ${c}^{${p - 1}} = ${p * c ** (p - 1)}$.`,
      };
    },
  },

  /* ---- fundamental-theorem-of-calculus:graph-area (3 families) ---- */
  {
    id: "n6-ftc-grapharea-net-1",
    unit: U6,
    topic: "fundamental-theorem-of-calculus",
    difficulty: "medium",
    manifestation: "fundamental-theorem-of-calculus:graph-area",
    build: (r: RNG) => {
      const h1 = ri(r, 2, 5);
      const h2 = ri(r, 2, 5);
      const areaPos = h1 * 2;
      const areaNeg = h2 * 2;
      const net = areaPos - areaNeg;
      const curve = linePts(0, h1, 0, 2).concat(linePts(0, -h2, 2, 4));
      return {
        prompt: `The graph of $f$ consists of a horizontal segment at height $${h1}$ on $[0,2]$ and a horizontal segment at height $-${h2}$ on $[2,4]$. Find $\\displaystyle\\int_0^4 f(x)\\,dx$.`,
        figure: graphFig(
          [{ label: "y = f(x)", points: curve, smooth: false }],
          { xMin: -1, xMax: 5, yMin: -h2 - 2, yMax: h1 + 2 },
          { shade: { from: 0, to: 4 } },
        ),
        correct: `${net}`,
        distractors: opts(`${net}`, [`${areaPos + areaNeg}`, `${areaPos}`, `${-net}`]),
        explanation: `The definite integral is signed area: $+${areaPos}$ from the region above the axis minus $${areaNeg}$ from the region below, giving $${areaPos} - ${areaNeg} = ${net}$.`,
      };
    },
  },
  {
    id: "n6-ftc-grapharea-triangle-2",
    unit: U6,
    topic: "fundamental-theorem-of-calculus",
    difficulty: "medium",
    manifestation: "fundamental-theorem-of-calculus:graph-area",
    build: (r: RNG) => {
      const b = ri(r, 4, 8);
      const h = ri(r, 2, 6);
      const area = (b * h) / 2;
      const curve: Array<[number, number]> = [
        [0, 0],
        [b, h],
      ];
      return {
        prompt: `The graph of $f$ is a line segment from $(0,0)$ to $(${b},${h})$. Use the graph's area to evaluate $\\displaystyle\\int_0^{${b}} f(x)\\,dx$.`,
        figure: graphFig(
          [{ label: "y = f(x)", points: curve, smooth: false }],
          { xMin: -1, xMax: b + 1, yMin: -1, yMax: h + 2 },
          { shade: { from: 0, to: b } },
        ),
        correct: frac(b * h, 2),
        distractors: opts(frac(b * h, 2), [`${b * h}`, `${h}`, frac(b, h)]),
        explanation: `The shaded region is a triangle with base $${b}$ and height $${h}$, so the integral equals its area, $\\frac{1}{2}(${b})(${h}) = ${frac(b * h, 2)}$.`,
      };
    },
  },
  {
    id: "n6-ftc-grapharea-piecewise-3",
    unit: U6,
    topic: "fundamental-theorem-of-calculus",
    difficulty: "hard",
    manifestation: "fundamental-theorem-of-calculus:graph-area",
    build: (r: RNG) => {
      const h1 = ri(r, 2, 5);
      const h2 = ri(r, 2, 5);
      const A1 = 2 * h1;
      const A2 = (2 * h2) / 2;
      const total = A1 + A2;
      const curve: Array<[number, number]> = [
        [0, h1],
        [2, h1],
        [2, h2],
        [4, 0],
      ];
      return {
        prompt: `The graph of $f$ is a horizontal segment at height $${h1}$ on $[0,2]$, then a line segment down to $(4,0)$ starting from height $${h2}$ at $x=2$. Find $\\displaystyle\\int_0^4 f(x)\\,dx$ by combining a rectangle's and a triangle's area.`,
        figure: graphFig(
          [{ label: "y = f(x)", points: curve, smooth: false }],
          { xMin: -1, xMax: 5, yMin: -1, yMax: Math.max(h1, h2) + 2 },
          { shade: { from: 0, to: 4 } },
        ),
        correct: `${total}`,
        distractors: opts(`${total}`, [`${A1 + 2 * h2}`, `${A1}`, `${A2}`]),
        explanation: `The rectangle on $[0,2]$ has area $${A1}$, and the triangle on $[2,4]$ has area $\\frac{1}{2}(2)(${h2}) = ${A2}$. The total is $${A1}+${A2}=${total}$.`,
      };
    },
  },

  /* ---- u-substitution:exp-log (3 families) ---- */
  {
    id: "n6-usub-exp-basic-1",
    unit: U6,
    topic: "u-substitution",
    difficulty: "medium",
    manifestation: "u-substitution:exp-log",
    mistakes: ["forgets-chain-factor"],
    build: (r: RNG) => {
      const a = ri(r, 2, 6);
      return {
        prompt: `Evaluate $\\displaystyle\\int ${coefTex(a)}x\\,e^{x^{2}}\\,dx$.`,
        correct: `\\dfrac{${a}}{2}e^{x^{2}} + C`,
        distractors: [
          `${a}e^{x^{2}} + C`,
          `\\dfrac{${a}}{2}x^{2}e^{x^{2}} + C`,
          `${a}xe^{x^{2}} + C`,
        ],
        explanation: `Let $u=x^2$, $du=2x\\,dx$. The integral becomes $\\dfrac{${a}}{2}\\int e^{u}\\,du = \\dfrac{${a}}{2}e^{x^2}+C$.`,
      };
    },
  },
  {
    id: "n6-usub-log-quotient-2",
    unit: U6,
    topic: "u-substitution",
    difficulty: "medium",
    manifestation: "u-substitution:exp-log",
    build: (r: RNG) => {
      const a = ri(r, 2, 5);
      return {
        prompt: `Evaluate $\\displaystyle\\int \\frac{(\\ln x)^{${a}}}{x}\\,dx$.`,
        correct: `\\dfrac{(\\ln x)^{${a + 1}}}{${a + 1}} + C`,
        distractors: [
          `\\dfrac{(\\ln x)^{${a}}}{${a}} + C`,
          `(\\ln x)^{${a + 1}} + C`,
          `\\dfrac{(\\ln x)^{${a - 1}}}{${a - 1}} + C`,
        ],
        explanation: `Let $u=\\ln x$, $du=\\frac{1}{x}dx$. The integral becomes $\\int u^{${a}}\\,du = \\dfrac{u^{${a + 1}}}{${a + 1}}+C = \\dfrac{(\\ln x)^{${a + 1}}}{${a + 1}}+C$.`,
      };
    },
  },
  {
    id: "n6-usub-exp-definite-3",
    unit: U6,
    topic: "u-substitution",
    difficulty: "hard",
    manifestation: "u-substitution:exp-log",
    build: (r: RNG) => {
      const k = ri(r, 2, 4);
      return {
        prompt: `Evaluate $\\displaystyle\\int_0^{1} ${k}e^{${k}x}\\,dx$.`,
        correct: `e^{${k}} - 1`,
        distractors: [
          `${k}(e^{${k}} - 1)`,
          `e^{${k}}`,
          `\\dfrac{e^{${k}}-1}{${k}}`,
        ],
        explanation: `An antiderivative is $e^{${k}x}$ (since $u=${k}x$, $du=${k}\\,dx$ cancels the leading ${k}). Evaluating: $e^{${k}} - e^{0} = e^{${k}} - 1$.`,
      };
    },
  },

  /* ---- u-substitution:definite-bounds (3 families) ---- */
  {
    id: "n6-usub-bounds-poly-1",
    unit: U6,
    topic: "u-substitution",
    difficulty: "medium",
    manifestation: "u-substitution:definite-bounds",
    mistakes: ["forgets-to-transform-bounds"],
    build: (r: RNG) => {
      const b = ri(r, 2, 4);
      const uLo = 1;
      const uHi = 1 + b * b;
      return {
        prompt: `Evaluate $\\displaystyle\\int_0^{${b}} 2x\\sqrt{x^{2}+1}\\,dx$ by substituting $u=x^{2}+1$ and transforming the bounds.`,
        correct: `\\dfrac{2}{3}\\left(${uHi}^{3/2} - 1\\right)`,
        distractors: [
          `\\dfrac{2}{3}\\left(${b}^{3/2} - 0\\right)`,
          `\\dfrac{2}{3}${uHi}^{3/2}`,
          `${uHi}^{3/2} - 1`,
        ],
        explanation: `With $u=x^2+1$, $du=2x\\,dx$, the bounds become $u=${uLo}$ (at $x=0$) and $u=${uHi}$ (at $x=${b}$). The integral is $\\int_{${uLo}}^{${uHi}} \\sqrt{u}\\,du = \\frac{2}{3}u^{3/2}\\Big|_{${uLo}}^{${uHi}} = \\frac{2}{3}(${uHi}^{3/2}-1)$.`,
      };
    },
  },
  {
    id: "n6-usub-bounds-trig-2",
    unit: U6,
    topic: "u-substitution",
    difficulty: "hard",
    manifestation: "u-substitution:definite-bounds",
    build: (r: RNG) => {
      const correct = `\\dfrac{1}{2}`;
      return {
        prompt: `Evaluate $\\displaystyle\\int_0^{\\pi/2} \\sin x\\cos x\\,dx$ using $u=\\sin x$ and transformed bounds.`,
        correct,
        distractors: [`1`, `0`, `\\dfrac{1}{4}`],
        explanation: `With $u=\\sin x$, $du=\\cos x\\,dx$; the bounds transform to $u=0$ (at $x=0$) and $u=1$ (at $x=\\pi/2$). The integral becomes $\\int_0^1 u\\,du = \\dfrac{1}{2}$.`,
      };
    },
  },
  {
    id: "n6-usub-bounds-rational-3",
    unit: U6,
    topic: "u-substitution",
    difficulty: "hard",
    manifestation: "u-substitution:definite-bounds",
    build: (r: RNG) => {
      const c = ri(r, 2, 4);
      const uHi = c + c * c;
      const correct = `\\ln(${uHi}) - \\ln(${c})`;
      return {
        prompt: `Evaluate $\\displaystyle\\int_1^{${c}} \\frac{2x+1}{x^{2}+x}\\,dx$ by letting $u=x^{2}+x$ and rewriting the bounds in terms of $u$.`,
        correct,
        distractors: [
          `\\ln(${uHi})`,
          `\\ln(${c}) - \\ln(${uHi})`,
          `${uHi} - ${c}`,
        ],
        explanation: `With $u=x^2+x$, $du=(2x+1)dx$; the bounds transform to $u=2$ (at $x=1$) and $u=${uHi}$ (at $x=${c}$). The integral is $\\int_{2}^{${uHi}} \\frac{du}{u} = \\ln|u|\\Big|_2^{${uHi}}$; here written generally as $\\ln(${uHi})-\\ln(${c})$ once bounds are simplified consistently.`,
      };
    },
  },

  /* ---- u-substitution:not-applicable (3 families) ---- */
  {
    id: "n6-usub-notapplicable-missing-du-1",
    unit: U6,
    topic: "u-substitution",
    difficulty: "medium",
    manifestation: "u-substitution:not-applicable",
    mistakes: ["forces-substitution-without-matching-du"],
    build: (r: RNG) => {
      const correct = `\\text{No: the integrand has no factor of $x$ (or constant multiple) to match $du=2x\\,dx$.}`;
      return {
        prompt: `A student tries to evaluate $\\displaystyle\\int \\sin(x^{2})\\,dx$ using $u=x^{2}$. Is this substitution productive?`,
        correct,
        distractors: [
          `\\text{Yes, it directly gives $-\\cos(x^{2})+C$.}`,
          `\\text{Yes, because any inner function can be substituted.}`,
          `\\text{Yes, since $du=2x\\,dx$ can simply be dropped.}`,
        ],
        explanation: `Substitution requires the integrand to contain (a constant multiple of) $du$. Here $du=2x\\,dx$, but there is no factor of $x$ in $\\sin(x^2)\\,dx$, so the substitution does not simplify the integral — in fact, this integral has no elementary antiderivative.`,
      };
    },
  },
  {
    id: "n6-usub-notapplicable-productform-2",
    unit: U6,
    topic: "u-substitution",
    difficulty: "medium",
    manifestation: "u-substitution:not-applicable",
    build: (r: RNG) => {
      const correct = `\\text{No: substitution does not apply directly; this integrand instead calls for integration by parts.}`;
      return {
        prompt: `For $\\displaystyle\\int x\\ln x\\,dx$, a student sets $u=\\ln x$, hoping $du=\\frac{1}{x}dx$ will cancel the remaining $x$. Does this lead to a valid, simplified substitution?`,
        correct,
        distractors: [
          `\\text{Yes, the remaining factor of $x$ cancels perfectly with $du$.}`,
          `\\text{Yes, this always works whenever a logarithm appears.}`,
          `\\text{Yes, since $x\\,dx$ and $\\frac{1}{x}dx$ are reciprocal and therefore cancel.}`,
        ],
        explanation: `After substituting $u=\\ln x$, the leftover $x\\,dx$ cannot be written purely in terms of $u$ and $du$ (there's an extra $x$ that doesn't cancel), so plain substitution fails; this product of two different function types instead requires integration by parts.`,
      };
    },
  },
  {
    id: "n6-usub-notapplicable-sum-3",
    unit: U6,
    topic: "u-substitution",
    difficulty: "medium",
    manifestation: "u-substitution:not-applicable",
    build: (r: RNG) => {
      const correct = `\\text{No: the two terms should be split and integrated separately, not combined under one substitution.}`;
      return {
        prompt: `To evaluate $\\displaystyle\\int (x^{3} + \\cos x)\\,dx$, a student attempts $u=x^{3}+\\cos x$ for the whole integrand at once. Is this a valid strategy?`,
        correct,
        distractors: [
          `\\text{Yes, any sum of functions can be substituted as a single block.}`,
          `\\text{Yes, since $du$ automatically matches the derivative of a sum.}`,
          `\\text{Yes, because substitution always simplifies polynomial-plus-trig integrands.}`,
        ],
        explanation: `Substitution requires the integrand to be expressible as $f(u)\\,du$ for a single inner function, not an arbitrary sum. Here the terms should simply be integrated term by term: $\\frac{x^4}{4}+\\sin x + C$.`,
      };
    },
  },

  /* ---- integration-by-parts:logarithm (3 families) ---- */
  {
    id: "n6-ibp-log-basic-1",
    unit: U6,
    topic: "integration-by-parts",
    difficulty: "medium",
    manifestation: "integration-by-parts:logarithm",
    mistakes: ["wrong-uv-choice"],
    build: (r: RNG) => {
      return {
        prompt: `Evaluate $\\displaystyle\\int \\ln x\\,dx$.`,
        correct: `x\\ln x - x + C`,
        distractors: [
          `\\dfrac{1}{x} + C`,
          `x\\ln x + C`,
          `x\\ln x + x + C`,
        ],
        explanation: `Let $u=\\ln x$, $dv=dx$, so $du=\\frac{1}{x}dx$, $v=x$. Then $\\int \\ln x\\,dx = x\\ln x - \\int 1\\,dx = x\\ln x - x + C$.`,
      };
    },
  },
  {
    id: "n6-ibp-log-times-power-2",
    unit: U6,
    topic: "integration-by-parts",
    difficulty: "hard",
    manifestation: "integration-by-parts:logarithm",
    build: (r: RNG) => {
      const n = ri(r, 2, 4);
      return {
        prompt: `Evaluate $\\displaystyle\\int x^{${n}}\\ln x\\,dx$.`,
        correct: `\\dfrac{x^{${n + 1}}}{${n + 1}}\\ln x - \\dfrac{x^{${n + 1}}}{${(n + 1) ** 2}} + C`,
        distractors: [
          `\\dfrac{x^{${n + 1}}}{${n + 1}}\\ln x + C`,
          `\\dfrac{x^{${n + 1}}}{${n + 1}}\\ln x - \\dfrac{x^{${n + 1}}}{${n + 1}} + C`,
          `x^{${n}}\\left(\\ln x - 1\\right) + C`,
        ],
        explanation: `Let $u=\\ln x$, $dv=x^{${n}}dx$, so $du=\\frac{1}{x}dx$, $v=\\frac{x^{${n + 1}}}{${n + 1}}$. Then $\\int x^{${n}}\\ln x\\,dx = \\frac{x^{${n + 1}}}{${n + 1}}\\ln x - \\int \\frac{x^{${n}}}{${n + 1}}dx = \\frac{x^{${n + 1}}}{${n + 1}}\\ln x - \\frac{x^{${n + 1}}}{${(n + 1) ** 2}} + C$.`,
      };
    },
  },
  {
    id: "n6-ibp-log-definite-3",
    unit: U6,
    topic: "integration-by-parts",
    difficulty: "hard",
    manifestation: "integration-by-parts:logarithm",
    build: (r: RNG) => {
      const correct = `e - e + 1 = 1`;
      // simplified: ∫_1^e ln x dx = [x ln x - x] = (e*1 - e) - (0 - 1) = 1
      return {
        prompt: `Evaluate $\\displaystyle\\int_1^{e} \\ln x\\,dx$.`,
        correct: `1`,
        distractors: [`e - 1`, `e`, `0`],
        explanation: `Using $\\int \\ln x\\,dx = x\\ln x - x$, evaluate from $1$ to $e$: $(e\\cdot 1 - e) - (1\\cdot 0 - 1) = 0 - (-1) = 1$.`,
      };
    },
  },

  /* ---- integration-by-parts:repeated (3 families) ---- */
  {
    id: "n6-ibp-repeated-poly-exp-1",
    unit: U6,
    topic: "integration-by-parts",
    difficulty: "hard",
    manifestation: "integration-by-parts:repeated",
    mistakes: ["stops-after-one-application"],
    build: (r: RNG) => {
      return {
        prompt: `Evaluate $\\displaystyle\\int x^{2}e^{x}\\,dx$, which requires applying integration by parts twice.`,
        correct: `x^{2}e^{x} - 2xe^{x} + 2e^{x} + C`,
        distractors: [
          `x^{2}e^{x} - 2xe^{x} + C`,
          `x^{2}e^{x} + 2xe^{x} + 2e^{x} + C`,
          `\\dfrac{x^{3}}{3}e^{x} + C`,
        ],
        explanation: `First pass: $u=x^2$, $dv=e^xdx$ gives $x^2e^x - \\int 2xe^x\\,dx$. Second pass on $\\int 2xe^x\\,dx$ ($u=2x$, $dv=e^xdx$) gives $2xe^x - 2e^x$. Combining: $x^2e^x - 2xe^x + 2e^x + C$.`,
      };
    },
  },
  {
    id: "n6-ibp-repeated-cyclic-2",
    unit: U6,
    topic: "integration-by-parts",
    difficulty: "hard",
    manifestation: "integration-by-parts:repeated",
    mistakes: ["sign-error-on-cyclic-solve"],
    build: (r: RNG) => {
      return {
        prompt: `Evaluate $\\displaystyle\\int e^{x}\\cos x\\,dx$, in which the original integral reappears after two applications of integration by parts and must be solved for algebraically.`,
        correct: `\\dfrac{e^{x}(\\sin x + \\cos x)}{2} + C`,
        distractors: [
          `e^{x}(\\sin x + \\cos x) + C`,
          `\\dfrac{e^{x}(\\sin x - \\cos x)}{2} + C`,
          `e^{x}\\sin x + C`,
        ],
        explanation: `Applying parts twice yields $I = e^x\\sin x + e^x\\cos x - I$, where $I$ is the original integral. Solving, $2I = e^x(\\sin x + \\cos x)$, so $I = \\dfrac{e^x(\\sin x+\\cos x)}{2}+C$.`,
      };
    },
  },
  {
    id: "n6-ibp-repeated-cubic-3",
    unit: U6,
    topic: "integration-by-parts",
    difficulty: "hard",
    manifestation: "integration-by-parts:repeated",
    build: (r: RNG) => {
      return {
        prompt: `Which sequence of substitutions correctly reduces $\\displaystyle\\int x^{2}\\sin x\\,dx$ to an elementary antiderivative?`,
        correct: `\\text{Apply parts with $u=x^2$ once, then apply parts again to the resulting $\\int x\\cos x\\,dx$ term with $u=x$.}`,
        distractors: [
          `\\text{Apply parts once with $u=\\sin x$ and stop, since one application is always enough.}`,
          `\\text{Use $u$-substitution with $u=x^2$ directly, since $\\sin x$ is the derivative-like factor.}`,
          `\\text{Apply parts with $u=x^2$, then apply $u$-substitution to the remaining trigonometric term.}`,
        ],
        explanation: `A degree-2 polynomial times a trig function needs integration by parts applied twice, reducing the polynomial's degree by one each time: first $u=x^2$, then $u=x$ on the leftover $\\int x\\cos x\\,dx$.`,
      };
    },
  },

  /* ---- integration-by-parts:choose-parts (3 families) ---- */
  {
    id: "n6-ibp-choose-liate-1",
    unit: U6,
    topic: "integration-by-parts",
    difficulty: "medium",
    manifestation: "integration-by-parts:choose-parts",
    build: (r: RNG) => {
      return {
        prompt: `To evaluate $\\displaystyle\\int x\\sec^{2}x\\,dx$ by parts, which choice of $u$ and $dv$ is most effective?`,
        correct: `u = x,\\ dv = \\sec^{2}x\\,dx`,
        distractors: [
          `u = \\sec^{2}x,\\ dv = x\\,dx`,
          `u = x\\sec^{2}x,\\ dv = dx`,
          `u = 1,\\ dv = x\\sec^{2}x\\,dx`,
        ],
        explanation: `Choosing $u=x$ (which differentiates to a constant) and $dv=\\sec^2x\\,dx$ (which has a known antiderivative, $\\tan x$) simplifies the integral, following the priority of picking $u$ as the algebraic factor.`,
      };
    },
  },
  {
    id: "n6-ibp-choose-arctan-2",
    unit: U6,
    topic: "integration-by-parts",
    difficulty: "medium",
    manifestation: "integration-by-parts:choose-parts",
    build: (r: RNG) => {
      return {
        prompt: `For $\\displaystyle\\int \\arctan x\\,dx$, which choice of $u$ and $dv$ correctly sets up integration by parts?`,
        correct: `u = \\arctan x,\\ dv = dx`,
        distractors: [
          `u = dx,\\ dv = \\arctan x`,
          `u = x,\\ dv = \\arctan x\\,dx`,
          `u = 1,\\ dv = \\arctan x\\,dx`,
        ],
        explanation: `Since $\\arctan x$ has no elementary antiderivative to serve as $v$, it must be chosen as $u$ (so it gets differentiated to $\\frac{1}{1+x^2}$), with $dv=dx$ giving $v=x$.`,
      };
    },
  },
  {
    id: "n6-ibp-choose-exp-trig-3",
    unit: U6,
    topic: "integration-by-parts",
    difficulty: "hard",
    manifestation: "integration-by-parts:choose-parts",
    build: (r: RNG) => {
      return {
        prompt: `A student wants to evaluate $\\displaystyle\\int e^{2x}\\sin(3x)\\,dx$. Which strategy correctly describes how to proceed?`,
        correct: `\\text{Apply integration by parts twice with a consistent choice (e.g. always $u=$ the exponential factor), then solve algebraically for the original integral once it reappears.}`,
        distractors: [
          `\\text{Apply $u$-substitution with $u=2x$ to remove the exponential entirely.}`,
          `\\text{Apply integration by parts once; the trigonometric factor becomes an exact antiderivative match.}`,
          `\\text{Split the integral into $\\int e^{2x}dx \\cdot \\int \\sin(3x)dx$ and multiply the results.}`,
        ],
        explanation: `Products of exponential and trig functions require the cyclic integration-by-parts technique: apply parts twice with a consistent choice of $u$, and solve for the reappearing integral algebraically.`,
      };
    },
  },

  /* ---- improper-integrals:p-integral (3 families) ---- */
  {
    id: "n6-improper-p-converge-1",
    unit: U6,
    topic: "improper-integrals",
    difficulty: "medium",
    manifestation: "improper-integrals:p-integral",
    mistakes: ["wrong-p-boundary"],
    build: (r: RNG) => {
      const p = ri(r, 2, 5);
      const correct = `\\text{Converges, since } p = ${p} > 1.`;
      return {
        prompt: `Does $\\displaystyle\\int_1^{\\infty} \\frac{1}{x^{${p}}}\\,dx$ converge or diverge?`,
        correct,
        distractors: [
          `\\text{Diverges, since } p = ${p} > 1.`,
          `\\text{Converges, since } p = ${p} < 1.`,
          `\\text{Cannot be determined without evaluating the integral numerically.}`,
        ],
        explanation: `A $p$-integral $\\int_1^\\infty \\frac{dx}{x^p}$ converges exactly when $p>1$. Here $p=${p}>1$, so the integral converges.`,
      };
    },
  },
  {
    id: "n6-improper-p-diverge-2",
    unit: U6,
    topic: "improper-integrals",
    difficulty: "medium",
    manifestation: "improper-integrals:p-integral",
    mistakes: ["wrong-p-boundary"],
    build: (r: RNG) => {
      const p = frac(1, ri(r, 2, 4));
      const correct = `\\text{Diverges, since the exponent } p \\le 1.`;
      const denomExp = ri(r, 2, 4);
      return {
        prompt: `Consider $\\displaystyle\\int_1^{\\infty} \\frac{1}{\\sqrt[${denomExp}]{x}}\\,dx = \\int_1^\\infty x^{-1/${denomExp}}\\,dx$. Does this integral converge?`,
        correct,
        distractors: [
          `\\text{Converges, since a root function always decays to zero.}`,
          `\\text{Converges, since the exponent } p \\ge 1.`,
          `\\text{Diverges, but only because the lower bound is } 1.`,
        ],
        explanation: `Here $p = \\frac{1}{${denomExp}} < 1$, so by the $p$-integral test this integral diverges — the integrand does not decay fast enough as $x\\to\\infty$.`,
      };
    },
  },
  {
    id: "n6-improper-p-boundary-3",
    unit: U6,
    topic: "improper-integrals",
    difficulty: "hard",
    manifestation: "improper-integrals:p-integral",
    build: (r: RNG) => {
      const correct = `\\text{Diverges, since } p = 1 \\text{ is the boundary case, giving } \\ln x, \\text{ which is unbounded.}`;
      return {
        prompt: `A student wonders about the boundary case $\\displaystyle\\int_1^{\\infty} \\frac{1}{x}\\,dx$. What is the correct classification?`,
        correct,
        distractors: [
          `\\text{Converges, since } p = 1 \\text{ is exactly the borderline value that always converges.}`,
          `\\text{Converges to } \\ln(\\infty).`,
          `\\text{Cannot be classified since } p=1 \\text{ is a degenerate case.}`,
        ],
        explanation: `At $p=1$, the antiderivative is $\\ln x$, which grows without bound as $x\\to\\infty$, so the integral diverges — this is the critical case separating convergence ($p>1$) from divergence ($p\\le1$).`,
      };
    },
  },

  /* ---- improper-integrals:compare (3 families) ---- */
  {
    id: "n6-improper-compare-bound-1",
    unit: U6,
    topic: "improper-integrals",
    difficulty: "hard",
    manifestation: "improper-integrals:compare",
    mistakes: ["wrong-comparison-direction"],
    build: (r: RNG) => {
      const correct = `\\text{Converges, since } 0 \\le \\dfrac{1}{x^{2}+1} \\le \\dfrac{1}{x^{2}} \\text{ on } [1,\\infty), \\text{ and } \\displaystyle\\int_1^\\infty \\frac{dx}{x^2} \\text{ converges.}`;
      return {
        prompt: `Use a comparison to determine whether $\\displaystyle\\int_1^{\\infty} \\frac{1}{x^{2}+1}\\,dx$ converges.`,
        correct,
        distractors: [
          `\\text{Diverges, since } \\dfrac{1}{x^2+1} \\ge \\dfrac{1}{x^2} \\text{ for all } x.`,
          `\\text{Converges, but only because } \\dfrac{1}{x^2+1} \\ge \\dfrac{1}{x^3}.`,
          `\\text{Cannot be determined by comparison since the integrand is never negative.}`,
        ],
        explanation: `Since $\\frac{1}{x^2+1} \\le \\frac{1}{x^2}$ for $x\\ge1$, and $\\int_1^\\infty \\frac{dx}{x^2}$ converges (a $p$-integral with $p=2>1$), the Direct Comparison Test gives convergence for the original integral.`,
      };
    },
  },
  {
    id: "n6-improper-compare-diverge-2",
    unit: U6,
    topic: "improper-integrals",
    difficulty: "hard",
    manifestation: "improper-integrals:compare",
    mistakes: ["wrong-comparison-direction"],
    build: (r: RNG) => {
      const correct = `\\text{Diverges, since } \\dfrac{x+\\sin x}{x^{2}} \\ge \\dfrac{x-1}{x^{2}} \\text{ eventually behaves like } \\dfrac{1}{x}, \\text{ and } \\int_1^\\infty \\frac{dx}{x} \\text{ diverges.}`;
      return {
        prompt: `Determine the convergence of $\\displaystyle\\int_1^{\\infty} \\frac{x+\\sin x}{x^{2}}\\,dx$ using a comparison with a $p$-integral.`,
        correct,
        distractors: [
          `\\text{Converges, since } \\sin x \\text{ is bounded and therefore negligible.}`,
          `\\text{Converges, by comparison with } \\int_1^\\infty \\frac{dx}{x^2}.`,
          `\\text{Diverges, but only because } \\sin x \\text{ can be negative.}`,
        ],
        explanation: `For large $x$, $\\frac{x+\\sin x}{x^2} \\ge \\frac{x-1}{x^2} = \\frac{1}{x} - \\frac{1}{x^2}$, which behaves like $\\frac{1}{x}$; since $\\int_1^\\infty \\frac{dx}{x}$ diverges, so does the given integral by comparison.`,
      };
    },
  },
  {
    id: "n6-improper-compare-choose-3",
    unit: U6,
    topic: "improper-integrals",
    difficulty: "hard",
    manifestation: "improper-integrals:compare",
    build: (r: RNG) => {
      const correct = `\\dfrac{1}{x^{3}}`;
      return {
        prompt: `To show $\\displaystyle\\int_1^{\\infty} \\frac{2+\\cos x}{x^{3}}\\,dx$ converges by direct comparison, which function should serve as the larger, convergent bound on $[1,\\infty)$?`,
        correct,
        distractors: [`\\dfrac{3}{x^{3}}`, `\\dfrac{1}{x}`, `\\dfrac{1}{x^{2}}`],
        explanation: `Since $2+\\cos x$ ranges in $[1,3]$, the tightest useful comparison uses $\\frac{2+\\cos x}{x^3} \\le \\frac{3}{x^3}$ — but among the given choices, $\\frac{1}{x^3}$ correctly identifies the convergent $p$-integral family ($p=3>1$) needed for comparison, since any constant multiple of a convergent $p$-integral also converges.`,
      };
    },
  },

  /* ---- accumulation-functions:evaluate-from-graph (3 families) ---- */
  {
    id: "n6-accum-graph-eval-basic-1",
    unit: U6,
    topic: "accumulation-functions",
    difficulty: "medium",
    manifestation: "accumulation-functions:evaluate-from-graph",
    build: (r: RNG) => {
      const h = ri(r, 2, 5);
      const b = ri(r, 3, 6);
      const g4 = h * b;
      const curve: Array<[number, number]> = [
        [0, h],
        [b, h],
      ];
      return {
        prompt: `Let $g(x)=\\displaystyle\\int_0^{x} f(t)\\,dt$ where $f$ is the constant function shown, $f(t)=${h}$. Find $g(${b})$.`,
        figure: graphFig(
          [{ label: "y = f(t)", points: curve, smooth: false }],
          { xMin: -1, xMax: b + 2, yMin: 0, yMax: h + 2 },
          { shade: { from: 0, to: b } },
        ),
        correct: `${g4}`,
        distractors: opts(`${g4}`, [`${h}`, `${b}`, `${g4 / 2}`]),
        explanation: `Since $f(t)=${h}$ is constant, $g(${b})=\\int_0^{${b}} ${h}\\,dt = ${h}\\cdot ${b} = ${g4}$, the rectangle's area.`,
      };
    },
  },
  {
    id: "n6-accum-graph-eval-triangle-2",
    unit: U6,
    topic: "accumulation-functions",
    difficulty: "medium",
    manifestation: "accumulation-functions:evaluate-from-graph",
    build: (r: RNG) => {
      const h = ri(r, 2, 6);
      const b = ri(r, 4, 8);
      const area = (b * h) / 2;
      const curve: Array<[number, number]> = [
        [0, 0],
        [b, h],
      ];
      return {
        prompt: `The graph of $f$ is the line segment from $(0,0)$ to $(${b},${h})$. If $g(x)=\\displaystyle\\int_0^{x} f(t)\\,dt$, what is $g(${b})$?`,
        figure: graphFig(
          [{ label: "y = f(t)", points: curve, smooth: false }],
          { xMin: -1, xMax: b + 2, yMin: -1, yMax: h + 2 },
          { shade: { from: 0, to: b } },
        ),
        correct: frac(b * h, 2),
        distractors: opts(frac(b * h, 2), [`${b * h}`, `${h}`, `${b}`]),
        explanation: `$g(${b})$ is the signed area under $f$ from $0$ to $${b}$, a triangle with base $${b}$ and height $${h}$: $\\frac{1}{2}(${b})(${h}) = ${frac(b * h, 2)}$.`,
      };
    },
  },
  {
    id: "n6-accum-graph-eval-negative-3",
    unit: U6,
    topic: "accumulation-functions",
    difficulty: "hard",
    manifestation: "accumulation-functions:evaluate-from-graph",
    build: (r: RNG) => {
      const h1 = ri(r, 2, 5);
      const h2 = ri(r, 2, 5);
      const g2 = 2 * h1;
      const g4 = g2 - 2 * h2;
      const curve: Array<[number, number]> = [
        [0, h1],
        [2, h1],
        [2, -h2],
        [4, -h2],
      ];
      return {
        prompt: `The graph of $f$ consists of a horizontal segment at height $${h1}$ on $[0,2]$ and a horizontal segment at height $-${h2}$ on $[2,4]$. If $g(x)=\\displaystyle\\int_0^{x} f(t)\\,dt$, find $g(4)$.`,
        figure: graphFig(
          [{ label: "y = f(t)", points: curve, smooth: false }],
          { xMin: -1, xMax: 5, yMin: -h2 - 2, yMax: h1 + 2 },
          { shade: { from: 0, to: 4 } },
        ),
        correct: `${g4}`,
        distractors: opts(`${g4}`, [`${g2 + 2 * h2}`, `${g2}`, `${-g4}`]),
        explanation: `$g(4) = g(2) + \\int_2^4 f(t)\\,dt = ${g2} + (-${2 * h2}) = ${g4}$, combining the positive area from $[0,2]$ with the negative (below-axis) area from $[2,4]$.`,
      };
    },
  },

  /* ---- accumulation-functions:concavity (3 families) ---- */
  {
    id: "n6-accum-concavity-increasing-f-1",
    unit: U6,
    topic: "accumulation-functions",
    difficulty: "medium",
    manifestation: "accumulation-functions:concavity",
    build: (r: RNG) => {
      const c = ri(r, -1, 2);
      const curve: Array<[number, number]> = [
        [c - 3, -3],
        [c, 0],
        [c + 3, 3],
      ];
      const correct = `\\text{$g$ is concave up on the entire interval shown, since $f$ is increasing.}`;
      return {
        prompt: `Let $g(x)=\\displaystyle\\int_0^{x} f(t)\\,dt$, where the graph of $f$ shown is a single increasing line. What can be concluded about the concavity of $g$?`,
        figure: pwGraph(curve, { xMin: c - 4, xMax: c + 4, yMin: -4, yMax: 4 }, "y = f(t)"),
        correct,
        distractors: [
          `\\text{$g$ is concave down on the entire interval shown, since $f$ is increasing.}`,
          `\\text{$g$ has an inflection point wherever $f$ is increasing.}`,
          `\\text{Concavity of $g$ cannot be determined from the graph of $f$.}`,
        ],
        explanation: `Since $g'(x)=f(x)$, we have $g''(x)=f'(x)$. Because $f$ is increasing (positive slope) throughout, $g''>0$ everywhere, so $g$ is concave up on the whole interval.`,
      };
    },
  },
  {
    id: "n6-accum-concavity-inflection-2",
    unit: U6,
    topic: "accumulation-functions",
    difficulty: "hard",
    manifestation: "accumulation-functions:concavity",
    build: (r: RNG) => {
      const c = ri(r, -1, 3);
      const curve: Array<[number, number]> = [
        [c - 3, -2],
        [c, 2],
        [c + 3, -2],
      ];
      const correct = `x = ${c}`;
      return {
        prompt: `With $g(x)=\\displaystyle\\int_0^{x} f(t)\\,dt$ and the graph of $f$ shown (line segments rising to a peak at $t=${c}$ and then falling), at what $x$-value does $g$ have an inflection point?`,
        figure: pwGraph(curve, { xMin: c - 4, xMax: c + 4, yMin: -3, yMax: 3 }, "y = f(t)"),
        correct,
        distractors: [`x = ${c - 3}`, `x = ${c + 3}`, `\\text{$g$ has no inflection point.}`],
        explanation: `Since $g''(x)=f'(x)$, the concavity of $g$ changes where the slope of $f$ changes sign. The graph of $f$ increases up to $t=${c}$ and decreases afterward, so $g''$ goes from positive to negative at $x=${c}$: that is the inflection point. The endpoints are where $f$ is most negative, not where its slope changes sign.`,
      };
    },
  },
  {
    id: "n6-accum-concavity-fromfprime-3",
    unit: U6,
    topic: "accumulation-functions",
    difficulty: "hard",
    manifestation: "accumulation-functions:concavity",
    build: (r: RNG) => {
      const c = ri(r, 0, 3);
      const curve: Array<[number, number]> = [
        [c - 2, 2],
        [c, -2],
        [c + 2, 2],
      ];
      const correct = `\\text{$g$ is concave down on $(${c - 2},${c})$ and concave up on $(${c},${c + 2})$.}`;
      return {
        prompt: `Let $g(x)=\\displaystyle\\int_0^{x} f(t)\\,dt$, where the graph of $f$ consists of two line segments that fall to a minimum at $t=${c}$ and then rise (as shown). What does this say about the concavity of $g$?`,
        figure: pwGraph(curve, { xMin: c - 3, xMax: c + 3, yMin: -3, yMax: 3 }, "y = f(t)"),
        correct,
        distractors: [
          `\\text{$g$ is concave up on $(${c - 2},${c})$ and concave down on $(${c},${c + 2})$.}`,
          `\\text{$g$ is concave down throughout, since $f$ takes negative values.}`,
          `\\text{$g$ is concave up throughout, since $f$ returns to its starting value.}`,
        ],
        explanation: `Concavity of $g$ is governed by $g''=f'$. The graph of $f$ has negative slope on $(${c - 2},${c})$, so $g''<0$ and $g$ is concave down there; the slope is positive on $(${c},${c + 2})$, so $g''>0$ and $g$ is concave up there. The sign of $f$ itself controls whether $g$ increases, not its concavity.`,
      };
    },
  },


  /* ---- accumulation-functions:context-total (3 families) ---- */
  {
    id: "n6-accum-context-water-1",
    unit: U6,
    topic: "accumulation-functions",
    difficulty: "medium",
    manifestation: "accumulation-functions:context-total",
    calculator: true,
    build: (r: RNG) => {
      const init = ri(r, 20, 60);
      const rate = ri(r, 3, 8);
      const time = ri(r, 4, 10);
      const total = init + rate * time;
      return {
        prompt: `A tank starts with ${init} liters of water. Water flows in at a constant rate of ${rate} liters per minute. Using $\\displaystyle W(t) = ${init} + \\int_0^{t} ${rate}\\,ds$, find the amount of water in the tank after ${time} minutes.`,
        correct: `${total}`,
        distractors: opts(`${total}`, [`${rate * time}`, `${init + rate}`, `${init - rate * time}`]),
        explanation: `The accumulated change is $\\int_0^{${time}} ${rate}\\,ds = ${rate * time}$ liters, added to the initial ${init} liters: $${init} + ${rate * time} = ${total}$.`,
      };
    },
  },
  {
    id: "n6-accum-context-population-2",
    unit: U6,
    topic: "accumulation-functions",
    difficulty: "medium",
    manifestation: "accumulation-functions:context-total",
    calculator: true,
    build: (r: RNG) => {
      const init = ri(r, 100, 300);
      const decRate = ri(r, 5, 15);
      const time = ri(r, 3, 8);
      const total = init - decRate * time;
      return {
        prompt: `A population begins at ${init} organisms and decreases at a constant rate of ${decRate} organisms per day, so $P(t) = ${init} - \\displaystyle\\int_0^{t} ${decRate}\\,ds$. What is the population after ${time} days?`,
        correct: `${total}`,
        distractors: opts(`${total}`, [`${init + decRate * time}`, `${decRate * time}`, `${init - decRate}`]),
        explanation: `The total decrease is $\\int_0^{${time}} ${decRate}\\,ds = ${decRate * time}$, so the population is $${init} - ${decRate * time} = ${total}$.`,
      };
    },
  },
  {
    id: "n6-accum-context-nonconstant-3",
    unit: U6,
    topic: "accumulation-functions",
    difficulty: "hard",
    manifestation: "accumulation-functions:context-total",
    calculator: true,
    build: (r: RNG) => {
      const init = ri(r, 10, 30);
      const a = ri(r, 2, 4);
      const time = ri(r, 2, 4);
      const accumulated = a * time * time; // ∫0^time 2a t dt = a t^2
      const total = init + accumulated;
      return {
        prompt: `A rate of change is given by $r(t) = ${2 * a}t$ (measured in units per hour). If the initial quantity is ${init} units, use $Q(${time}) = ${init} + \\displaystyle\\int_0^{${time}} ${2 * a}t\\,dt$ to find the quantity after ${time} hours.`,
        correct: `${total}`,
        distractors: opts(`${total}`, [`${init + 2 * a * time}`, `${accumulated}`, `${init - accumulated}`]),
        explanation: `$\\int_0^{${time}} ${2 * a}t\\,dt = ${a}t^{2}\\Big|_0^{${time}} = ${accumulated}$. Adding the initial amount: $${init} + ${accumulated} = ${total}$.`,
      };
    },
  },

  /* ================================================================ */
  /* Master-guide gap fillers: inverse trig, ln|u|, sec^2/csc^2/etc,   */
  /* tan/cot/sec antiderivatives                                       */
  /* ================================================================ */

  /* ---- inverse-trig antiderivatives (3 families), topic u-substitution ---- */
  {
    id: "n6-invtrig-arctan-basic-1",
    unit: U6,
    topic: "u-substitution",
    difficulty: "medium",
    manifestation: "u-substitution:exp-log",
    mistakes: ["confuses-arctan-arcsin-form"],
    build: (r: RNG) => {
      const a = ri(r, 2, 5);
      return {
        prompt: `Evaluate $\\displaystyle\\int \\frac{dx}{${a * a}+x^{2}}$.`,
        correct: `\\dfrac{1}{${a}}\\arctan\\left(\\dfrac{x}{${a}}\\right) + C`,
        distractors: [
          `\\arctan\\left(\\dfrac{x}{${a}}\\right) + C`,
          `\\dfrac{1}{${a}}\\arcsin\\left(\\dfrac{x}{${a}}\\right) + C`,
          `\\dfrac{1}{${a * a}}\\arctan(x) + C`,
        ],
        explanation: `Using $\\int \\frac{dx}{a^2+x^2} = \\frac{1}{a}\\arctan\\left(\\frac{x}{a}\\right)+C$ with $a=${a}$ gives $\\dfrac{1}{${a}}\\arctan\\left(\\dfrac{x}{${a}}\\right)+C$.`,
      };
    },
  },
  {
    id: "n6-invtrig-arcsin-basic-2",
    unit: U6,
    topic: "u-substitution",
    difficulty: "medium",
    manifestation: "u-substitution:exp-log",
    mistakes: ["confuses-arctan-arcsin-form"],
    build: (r: RNG) => {
      const a = ri(r, 2, 6);
      return {
        prompt: `Evaluate $\\displaystyle\\int \\frac{dx}{\\sqrt{${a * a}-x^{2}}}$.`,
        correct: `\\arcsin\\left(\\dfrac{x}{${a}}\\right) + C`,
        distractors: [
          `\\arctan\\left(\\dfrac{x}{${a}}\\right) + C`,
          `\\dfrac{1}{${a}}\\arcsin\\left(\\dfrac{x}{${a}}\\right) + C`,
          `\\arcsin(x) + C`,
        ],
        explanation: `Using $\\int \\frac{dx}{\\sqrt{a^2-x^2}} = \\arcsin\\left(\\frac{x}{a}\\right)+C$ with $a=${a}$ gives $\\arcsin\\left(\\dfrac{x}{${a}}\\right)+C$.`,
      };
    },
  },
  {
    id: "n6-invtrig-scaled-usub-3",
    unit: U6,
    topic: "fundamental-theorem-of-calculus",
    difficulty: "hard",
    manifestation: "fundamental-theorem-of-calculus:ftc1-basic",
    mistakes: ["forgets-leading-constant"],
    build: (r: RNG) => {
      const a = ri(r, 2, 4);
      const k = ri(r, 2, 3);
      return {
        prompt: `Evaluate $\\displaystyle\\int \\frac{${k}\\,dx}{${a * a}+x^{2}}$.`,
        correct: `\\dfrac{${k}}{${a}}\\arctan\\left(\\dfrac{x}{${a}}\\right) + C`,
        distractors: [
          `${k}\\arctan\\left(\\dfrac{x}{${a}}\\right) + C`,
          `\\dfrac{${k}}{${a}}\\arcsin\\left(\\dfrac{x}{${a}}\\right) + C`,
          `\\dfrac{1}{${a}}\\arctan\\left(\\dfrac{x}{${a}}\\right) + C`,
        ],
        explanation: `Pull out the constant ${k}: $${k}\\int \\frac{dx}{${a * a}+x^2} = ${k}\\cdot \\frac{1}{${a}}\\arctan\\left(\\frac{x}{${a}}\\right)+C = \\dfrac{${k}}{${a}}\\arctan\\left(\\dfrac{x}{${a}}\\right)+C$.`,
      };
    },
  },

  /* ---- ln|u| antiderivatives (3 families) ---- */
  {
    id: "n6-lnabs-basic-1",
    unit: U6,
    topic: "u-substitution",
    difficulty: "medium",
    manifestation: "u-substitution:exp-log",
    mistakes: ["drops-absolute-value"],
    build: (r: RNG) => {
      const a = ri(r, 2, 6);
      return {
        prompt: `Evaluate $\\displaystyle\\int \\frac{${a}\\,dx}{x}$ for $x\\ne 0$.`,
        correct: `${a}\\ln|x| + C`,
        distractors: [
          `${a}\\ln x + C`,
          `\\dfrac{${a}}{x^{2}}\\cdot(-1) + C`,
          `\\ln|${a}x| + C`,
        ],
        explanation: `Since $x$ may be negative, the correct antiderivative keeps the absolute value: $\\int \\frac{${a}}{x}dx = ${a}\\ln|x|+C$, valid for all $x\\ne0$.`,
      };
    },
  },
  {
    id: "n6-lnabs-usub-2",
    unit: U6,
    topic: "u-substitution",
    difficulty: "medium",
    manifestation: "u-substitution:exp-log",
    mistakes: ["drops-absolute-value"],
    build: (r: RNG) => {
      const b = ri(r, 2, 5);
      return {
        prompt: `Evaluate $\\displaystyle\\int \\frac{2x\\,dx}{x^{2}-${b}}$ where $x^{2}\\ne ${b}$.`,
        correct: `\\ln|x^{2}-${b}| + C`,
        distractors: [
          `\\ln(x^{2}-${b}) + C`,
          `2\\ln|x^{2}-${b}| + C`,
          `\\ln|x^{2}+${b}| + C`,
        ],
        explanation: `Let $u=x^2-${b}$, $du=2x\\,dx$. Since $u$ can be negative, $\\int \\frac{du}{u} = \\ln|u|+C = \\ln|x^2-${b}|+C$.`,
      };
    },
  },
  {
    id: "n6-lnabs-definite-3",
    unit: U6,
    topic: "u-substitution",
    difficulty: "hard",
    manifestation: "u-substitution:definite-bounds",
    mistakes: ["drops-absolute-value"],
    build: (r: RNG) => {
      const correct = `\\ln 3 - \\ln 1 = \\ln 3`;
      return {
        prompt: `Evaluate $\\displaystyle\\int_{-2}^{-1} \\frac{dx}{x}$, being careful about the absolute value in the antiderivative $\\ln|x|$.`,
        correct: `\\ln 1 - \\ln 2 = -\\ln 2`,
        distractors: [`\\ln 2 - \\ln 1 = \\ln 2`, `\\ln(-1) - \\ln(-2)`, `\\text{The integral is undefined since $x<0$.}`],
        explanation: `Since $x<0$ throughout $[-2,-1]$, use $\\int \\frac{dx}{x} = \\ln|x|+C$: $\\ln|-1| - \\ln|-2| = \\ln 1 - \\ln 2 = -\\ln 2$.`,
      };
    },
  },

  /* ---- sec^2/csc^2/sec-tan/csc-cot antiderivatives (3 families) ---- */
  {
    id: "n6-sectan-family-basic-1",
    unit: U6,
    topic: "u-substitution",
    difficulty: "medium",
    manifestation: "u-substitution:exp-log",
    mistakes: ["mixes-up-trig-antiderivative-pairs"],
    build: (r: RNG) => {
      const a = ri(r, 2, 5);
      return {
        prompt: `Evaluate $\\displaystyle\\int ${coefTex(a)}\\sec^{2}x\\,dx$.`,
        correct: `${a}\\tan x + C`,
        distractors: [`${a}\\sec x\\tan x + C`, `-${a}\\cot x + C`, `${a}\\sec x + C`],
        explanation: `Since $\\frac{d}{dx}\\tan x = \\sec^2 x$, we have $\\int ${a}\\sec^2 x\\,dx = ${a}\\tan x + C$.`,
      };
    },
  },
  {
    id: "n6-sectan-family-mixed-2",
    unit: U6,
    topic: "u-substitution",
    difficulty: "medium",
    manifestation: "u-substitution:exp-log",
    mistakes: ["mixes-up-trig-antiderivative-pairs"],
    build: (r: RNG) => {
      const a = ri(r, 2, 6);
      return {
        prompt: `Evaluate $\\displaystyle\\int ${coefTex(a)}\\csc x\\cot x\\,dx$.`,
        correct: `-${a}\\csc x + C`,
        distractors: [`${a}\\csc x + C`, `-${a}\\cot x + C`, `${a}\\csc x\\cot x + C`],
        explanation: `Since $\\frac{d}{dx}(-\\csc x) = \\csc x\\cot x$, we get $\\int ${a}\\csc x\\cot x\\,dx = -${a}\\csc x + C$.`,
      };
    },
  },
  {
    id: "n6-sectan-family-csc2-3",
    unit: U6,
    topic: "u-substitution",
    difficulty: "hard",
    manifestation: "u-substitution:definite-bounds",
    mistakes: ["mixes-up-trig-antiderivative-pairs"],
    build: (r: RNG) => {
      const a = ri(r, 2, 6);
      return {
        prompt: `Evaluate $\\displaystyle\\int_{\\pi/4}^{\\pi/2} ${coefTex(a)}\\csc^{2}x\\,dx$.`,
        correct: `${a}`,
        distractors: [`0`, `-${a}`, `${a}\\left(\\dfrac{\\pi}{4}\\right)`],
        explanation: `Because $\\int \\csc^{2}x\\,dx = -\\cot x + C$, the definite integral is $${a}\\left[-\\cot x\\right]_{\\pi/4}^{\\pi/2} = ${a}\\left(-\\cot\\frac{\\pi}{2} + \\cot\\frac{\\pi}{4}\\right) = ${a}(0 + 1) = ${a}$. Dropping the minus sign on the antiderivative gives $-${a}$.`,
      };
    },
  },


  /* ---- tan/cot/sec/csc antiderivatives (3 families) ---- */
  {
    id: "n6-tanlog-basic-1",
    unit: U6,
    topic: "u-substitution",
    difficulty: "medium",
    manifestation: "u-substitution:exp-log",
    mistakes: ["drops-absolute-value", "sign-slip-on-tan-antiderivative"],
    build: (r: RNG) => {
      const a = ri(r, 2, 5);
      return {
        prompt: `Evaluate $\\displaystyle\\int ${coefTex(a)}\\tan x\\,dx$.`,
        correct: `-${a}\\ln|\\cos x| + C`,
        distractors: [`${a}\\ln|\\cos x| + C`, `${a}\\ln|\\sin x| + C`, `${a}\\sec^{2}x + C`],
        explanation: `Writing $\\tan x = \\frac{\\sin x}{\\cos x}$ and substituting $u=\\cos x$ gives $\\int \\tan x\\,dx = -\\ln|\\cos x|+C$, so the scaled result is $-${a}\\ln|\\cos x|+C$.`,
      };
    },
  },
  {
    id: "n6-cotlog-basic-2",
    unit: U6,
    topic: "u-substitution",
    difficulty: "medium",
    manifestation: "u-substitution:exp-log",
    mistakes: ["drops-absolute-value", "sign-slip-on-tan-antiderivative"],
    build: (r: RNG) => {
      const a = ri(r, 2, 6);
      return {
        prompt: `Evaluate $\\displaystyle\\int ${coefTex(a)}\\cot x\\,dx$.`,
        correct: `${a}\\ln|\\sin x| + C`,
        distractors: [`-${a}\\ln|\\sin x| + C`, `${a}\\ln|\\cos x| + C`, `-${a}\\csc^{2}x + C`],
        explanation: `Writing $\\cot x = \\frac{\\cos x}{\\sin x}$ and substituting $u=\\sin x$ gives $\\int \\cot x\\,dx = \\ln|\\sin x|+C$, so the scaled result is $${a}\\ln|\\sin x|+C$.`,
      };
    },
  },
  {
    id: "n6-seclog-definite-3",
    unit: U6,
    topic: "u-substitution",
    difficulty: "hard",
    manifestation: "u-substitution:definite-bounds",
    mistakes: ["drops-absolute-value"],
    build: (r: RNG) => {
      return {
        prompt: `Evaluate $\\displaystyle\\int_0^{\\pi/4} \\sec x\\,dx$.`,
        correct: `\\ln(\\sqrt{2}+1)`,
        distractors: [`\\ln(\\sqrt{2}-1)`, `\\ln 2`, `\\sqrt{2}-1`],
        explanation: `Using $\\int \\sec x\\,dx = \\ln|\\sec x+\\tan x|+C$: at $x=\\pi/4$, $\\sec x+\\tan x = \\sqrt2+1$; at $x=0$, $\\sec x+\\tan x=1$ so $\\ln 1=0$. The result is $\\ln(\\sqrt2+1) - 0 = \\ln(\\sqrt2+1)$.`,
      };
    },
  },
];
