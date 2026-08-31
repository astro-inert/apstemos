/**
 * Gap-filling template families.
 *
 * Every family here targets a specific CED **manifestation** that the coverage
 * audit reported as uncovered — a materially different legitimate way the exam
 * asks about a topic (graphical, tabular, verbal, reverse, parameter,
 * procedure-selection, error-analysis, must-be-true, insufficient-information),
 * not another numeric variant of a form the bank already had.
 *
 * All wording, functions, constants, contexts, answers, and distractors are
 * original.
 */

import {
  dec,
  frac,
  pick,
  ri,
  term,
  type PiecewiseGraphFigure,
  type QuestionTemplate,
  type RNG,
} from "./question-templates";

const U1 = "unit-1-limits-and-continuity";

/* ------------------------------------------------------------------ */
/* Local helpers                                                       */
/* ------------------------------------------------------------------ */

/** Renders a leading coefficient, omitting an unnecessary factor of 1. */
function coefTex(k: number): string {
  if (k === 1) return "";
  if (k === -1) return "-";
  return String(k);
}

/** Picks the first three candidates that differ from the answer and each other. */
function opts(correct: string, cands: string[]): string[] {
  const out: string[] = [];
  for (const c of cands) {
    if (c === correct || out.includes(c)) continue;
    out.push(c);
    if (out.length === 3) break;
  }
  return out;
}

/** Rational answer plus recalculated numeric distractors. */
function ratio(n: number, d: number) {
  const correct = frac(n, d);
  return {
    correct,
    distractors: opts(correct, [
      frac(d, n),
      frac(n + d, d),
      frac(-n, d),
      frac(2 * n, d),
      frac(n, 2 * d),
      `0`,
    ]),
  };
}

/** Linear interpolation on a piecewise-linear graph. */
function pwl(pts: Array<[number, number]>, x: number): number {
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    if (x >= x0 && x <= x1) {
      if (x1 === x0) return y1;
      return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
    }
  }
  return pts[pts.length - 1][1];
}

function graph(
  label: string,
  points: Array<[number, number]>,
  bounds: { xMin: number; xMax: number; yMin: number; yMax: number },
): PiecewiseGraphFigure {
  return { kind: "piecewise-graph", label, points, ...bounds };
}

/** Small table renderer used by the tabular manifestations. */
function table(header: string[], row: string[]): string {
  return `| ${header.join(" | ")} |\n| ${header.map(() => "---").join(" | ")} |\n| ${row.join(" | ")} |`;
}

const tablePair = (label: string, xs: number[], ys: string[]) =>
  table(["$x$", ...xs.map((x) => `$${x}$`)], [`$${label}$`, ...ys.map((y) => `$${y}$`)]);

/* ------------------------------------------------------------------ */
/* Unit 1 — Limits and Continuity                                      */
/* ------------------------------------------------------------------ */

export const GAP_TEMPLATES: QuestionTemplate[] = [
  {
    id: "g1-direct-substitution",
    unit: U1,
    topic: "evaluating-limits-algebraically",
    difficulty: "easy",
    manifestation: "evaluating-limits-algebraically:direct-substitution",
    build: (r: RNG) => {
      const a = ri(r, 2, 7);
      const p = ri(r, 2, 6);
      const q = ri(r, 1, 9);
      const c = ri(r, 1, 9);
      const d = ri(r, 1, 6);
      const n = p * a * a + q * a + c;
      const den = a + d;
      const { correct, distractors } = ratio(n, den);
      return {
        prompt: `Evaluate $\\displaystyle\\lim_{x\\to ${a}}\\frac{${p}x^{2} ${term(q, "x")} ${term(c, "")}}{x + ${d}}$.`,
        correct,
        distractors,
        explanation: `The function is a rational function whose denominator is $${den}\\ne 0$ at $x=${a}$, so it is continuous there and the limit is found by substitution: $\\frac{${n}}{${den}} = ${correct}$.`,
      };
    },
  },
  {
    id: "g1-complex-fraction",
    unit: U1,
    topic: "evaluating-limits-algebraically",
    difficulty: "hard",
    manifestation: "evaluating-limits-algebraically:complex-fraction",
    build: (r: RNG) => {
      const c = ri(r, 2, 9);
      const correct = frac(-1, c * c);
      return {
        prompt: `Evaluate $\\displaystyle\\lim_{x\\to 0}\\frac{\\dfrac{1}{x + ${c}} - \\dfrac{1}{${c}}}{x}$.`,
        correct,
        distractors: opts(correct, [frac(1, c * c), frac(-1, c), frac(1, c), `0`]),
        explanation: `Combine the numerator over the common denominator $${c}(x+${c})$ to get $\\dfrac{-x}{${c}(x+${c})}$. Dividing by $x$ leaves $\\dfrac{-1}{${c}(x+${c})}$, which approaches $${correct}$.`,
      };
    },
  },
  {
    id: "g1-limit-properties",
    unit: U1,
    topic: "evaluating-limits-algebraically",
    difficulty: "easy",
    manifestation: "evaluating-limits-algebraically:limit-properties",
    build: (r: RNG) => {
      const a = ri(r, 1, 6);
      const A = ri(r, 2, 9);
      const B = ri(r, 2, 9);
      const p = ri(r, 2, 5);
      const q = ri(r, 2, 5);
      const v = p * A - q * B;
      const correct = `${v}`;
      return {
        prompt: `Suppose $\\displaystyle\\lim_{x\\to ${a}} f(x) = ${A}$ and $\\displaystyle\\lim_{x\\to ${a}} g(x) = ${B}$. Find $\\displaystyle\\lim_{x\\to ${a}}\\left[${p}f(x) - ${q}g(x)\\right]$.`,
        correct,
        distractors: opts(correct, [`${p * A + q * B}`, `${A - B}`, `${p * A * q * B}`, `${v + 1}`]),
        explanation: `Limits distribute over sums and constant multiples: $${p}(${A}) - ${q}(${B}) = ${v}$.`,
      };
    },
  },
  {
    id: "g1-procedure-choice",
    unit: U1,
    topic: "evaluating-limits-algebraically",
    difficulty: "medium",
    manifestation: "evaluating-limits-algebraically:procedure-choice",
    build: (r: RNG) => {
      const c = ri(r, 2, 9);
      const kind = pick(r, ["factor", "conjugate", "denominator"] as const);
      const expr =
        kind === "factor"
          ? `\\displaystyle\\lim_{x\\to ${c}}\\frac{x^{2} - ${c * c}}{x - ${c}}`
          : kind === "conjugate"
            ? `\\displaystyle\\lim_{x\\to 0}\\frac{\\sqrt{x + ${c * c}} - ${c}}{x}`
            : `\\displaystyle\\lim_{x\\to\\infty}\\frac{${c}x^{2} + x}{x^{2} - ${c}}`;
      const answers = {
        factor: `\\text{Factor the numerator and cancel the common factor.}`,
        conjugate: `\\text{Multiply numerator and denominator by the conjugate of the numerator.}`,
        denominator: `\\text{Divide numerator and denominator by the highest power of } x.`,
      } as const;
      const correct = answers[kind];
      return {
        prompt: `Which algebraic step resolves $${expr}$ without any further indeterminate form?`,
        correct,
        distractors: opts(correct, [
          answers.factor,
          answers.conjugate,
          answers.denominator,
          `\\text{Substitute the value directly, since the expression is continuous there.}`,
        ]),
        explanation: `The expression's structure decides the technique; here the correct first step is: ${correct.replace(/\\text\{|\}/g, "")}`,
      };
    },
  },
  {
    id: "g1-limit-parameter",
    unit: U1,
    topic: "evaluating-limits-algebraically",
    difficulty: "hard",
    manifestation: "evaluating-limits-algebraically:parameter",
    build: (r: RNG) => {
      const c = ri(r, 2, 7);
      const k = ri(r, 1, 8);
      const m = c * c + k * c;
      const correct = `${k}`;
      return {
        prompt: `For what value of $k$ does $\\displaystyle\\lim_{x\\to ${c}}\\frac{x^{2} + kx - ${m}}{x - ${c}}$ exist as a finite number?`,
        correct,
        distractors: opts(correct, [`${-k}`, `${m}`, `${k + 1}`, `${c}`]),
        explanation: `A finite limit requires the numerator to vanish at $x=${c}$: $${c}^{2} + ${c}k - ${m} = 0$, so $k = ${k}$.`,
      };
    },
  },
  {
    id: "g1-trig-identity",
    unit: U1,
    topic: "evaluating-limits-algebraically",
    difficulty: "hard",
    manifestation: "evaluating-limits-algebraically:trig-identity",
    build: (r: RNG) => {
      const a = ri(r, 2, 6);
      const b = ri(r, 2, 8);
      const correct = frac(a * a, 2 * b);
      return {
        prompt: `Evaluate $\\displaystyle\\lim_{x\\to 0}\\frac{1 - \\cos(${a}x)}{${b}x^{2}}$.`,
        correct,
        distractors: opts(correct, [frac(a, 2 * b), frac(a * a, b), `0`, frac(2 * a, b)]),
        explanation: `Rewrite $1-\\cos(${a}x)$ using $\\frac{1-\\cos u}{u^{2}}\\to\\frac{1}{2}$ with $u=${a}x$: the limit is $\\frac{${a}^{2}}{2\\cdot ${b}} = ${correct}$.`,
      };
    },
  },
  {
    id: "g1-graph-vs-value",
    unit: U1,
    topic: "limits-from-graphs-and-tables",
    difficulty: "medium",
    manifestation: "limits-from-graphs-and-tables:graph-vs-value",
    build: (r: RNG) => {
      const c = ri(r, 2, 4);
      const L = ri(r, 2, 5);
      const v = L + pick(r, [2, 3, -2] as const);
      const correct = `\\displaystyle\\lim_{x\\to ${c}}f(x)=${L}\\text{, but }f(${c})=${v}`;
      return {
        prompt: `The graph of $f$ consists of the line segments shown, with an open circle at $x=${c}$. The value of $f$ at that point is defined separately as $f(${c})=${v}$. Which statement is true?`,
        figure: graph(
          "y = f(x)",
          [
            [c - 2, L - 2],
            [c, L],
            [c + 2, L + 2],
          ],
          { xMin: c - 3, xMax: c + 3, yMin: Math.min(L - 3, v - 1), yMax: Math.max(L + 3, v + 1) },
        ),
        correct,
        distractors: opts(correct, [
          `\\displaystyle\\lim_{x\\to ${c}}f(x)=${v}\\text{, and }f(${c})=${v}`,
          `\\displaystyle\\lim_{x\\to ${c}}f(x)\\text{ does not exist}`,
          `f\\text{ is continuous at }x=${c}`,
        ]),
        explanation: `The limit depends only on values near $x=${c}$, which approach $${L}$ from both sides. The separately defined value $f(${c})=${v}$ does not change the limit, so $f$ is not continuous there.`,
      };
    },
  },
  {
    id: "g1-table-insufficient",
    unit: U1,
    topic: "limits-from-graphs-and-tables",
    difficulty: "medium",
    manifestation: "limits-from-graphs-and-tables:table-insufficient",
    build: (r: RNG) => {
      const c = ri(r, 2, 6);
      const L = ri(r, 3, 8);
      const xs = [c - 0.1, c - 0.01, c + 0.5, c + 1];
      const ys = [`${L - 0.1}`, `${L - 0.01}`, `${L + 2}`, `${L + 4}`];
      const correct = `\\text{The table alone cannot determine the limit.}`;
      return {
        prompt: `Values of a function $h$ are given in the table.\n\n${tablePair("h(x)", xs, ys)}\n\nWhat can be concluded about $\\displaystyle\\lim_{x\\to ${c}} h(x)$?`,
        correct,
        distractors: opts(correct, [`${L}`, `${L + 2}`, `\\text{The limit does not exist.}`]),
        explanation: `The two entries to the right of $${c}$ are far from $${c}$, so the table gives no evidence about the right-hand behavior near $${c}$. A table can suggest a limit but never establish one.`,
      };
    },
  },
  {
    id: "g1-limit-notation",
    unit: U1,
    topic: "limits-from-graphs-and-tables",
    difficulty: "easy",
    manifestation: "limits-from-graphs-and-tables:notation",
    build: (r: RNG) => {
      const c = ri(r, 2, 4);
      const L = ri(r, 3, 7);
      const correct = `\\displaystyle\\lim_{x\\to ${c}}f(x)=${L}`;
      return {
        prompt: `The graph of $f$ consists of the line segments shown. Which limit statement is true?`,
        figure: graph(
          "y = f(x)",
          [
            [0, 0],
            [c, L],
            [2 * c, 0],
          ],
          { xMin: -1, xMax: 2 * c + 1, yMin: -1, yMax: L + 2 },
        ),
        correct,
        distractors: opts(correct, [
          `\\displaystyle\\lim_{x\\to ${c}}f(x)=${L + 1}`,
          `\\displaystyle\\lim_{x\\to 0}f(x)=${L}`,
          `\\displaystyle\\lim_{x\\to ${2 * c}}f(x)=${L}`,
        ]),
        explanation: `Both one-sided values at $x=${c}$ equal the peak height $${L}$, so $\\lim_{x\\to ${c}}f(x)=${L}$. At $x=0$ and $x=${2 * c}$ the graph has height $0$.`,
      };
    },
  },
  {
    id: "g1-composite-graph",
    unit: U1,
    topic: "limits-from-graphs-and-tables",
    difficulty: "hard",
    manifestation: "limits-from-graphs-and-tables:composite-graph",
    build: (r: RNG) => {
      const ys: Array<[number, number]> = [
        [0, ri(r, 1, 5)],
        [2, ri(r, 1, 5)],
        [4, ri(r, 1, 5)],
        [6, ri(r, 1, 5)],
      ];
      const a = pick(r, [1, 3, 5] as const);
      const inner = pwl(ys, a);
      const value = pwl(ys, inner);
      const correct = dec(value, 2);
      return {
        prompt: `The graph of the continuous function $f$ consists of the line segments shown. Find $\\displaystyle\\lim_{x\\to ${a}} f\\!\\left(f(x)\\right)$.`,
        figure: graph("y = f(x)", ys, { xMin: -1, xMax: 7, yMin: 0, yMax: 6 }),
        correct,
        distractors: opts(correct, [
          dec(inner, 2),
          dec(value + 1, 2),
          dec(value - 1, 2),
          dec(2 * value, 2),
        ]),
        explanation: `Since $f$ is continuous, $\\lim_{x\\to ${a}} f(f(x)) = f(f(${a}))$. From the graph $f(${a}) = ${dec(inner, 2)}$, and then $f(${dec(inner, 2)}) = ${correct}$.`,
      };
    },
  },
  {
    id: "g1-squeeze-graph",
    unit: U1,
    topic: "squeeze-theorem",
    difficulty: "medium",
    manifestation: "squeeze-theorem:graph-bounds",
    build: (r: RNG) => {
      const c = ri(r, 1, 4);
      const s = ri(r, 1, 3);
      const correct = `0`;
      return {
        prompt: `The graph of $u$ shown consists of line segments, and $u(${c})=0$. A function $f$ satisfies $-u(x)\\le f(x)\\le u(x)$ for all $x$. Find $\\displaystyle\\lim_{x\\to ${c}} f(x)$.`,
        figure: graph(
          "y = u(x)",
          [
            [c - 2, 2 * s],
            [c, 0],
            [c + 2, 2 * s],
          ],
          { xMin: c - 3, xMax: c + 3, yMin: -1, yMax: 2 * s + 1 },
        ),
        correct,
        distractors: opts(correct, [
          `${2 * s}`,
          `${c}`,
          `\\text{The limit does not exist.}`,
          `${-2 * s}`,
        ]),
        explanation: `Both bounding functions $-u$ and $u$ approach $0$ as $x\\to ${c}$, so by the squeeze theorem $f$ is forced to the same value, $0$.`,
      };
    },
  },
  {
    id: "g1-squeeze-table",
    unit: U1,
    topic: "squeeze-theorem",
    difficulty: "medium",
    manifestation: "squeeze-theorem:table-bounds",
    build: (r: RNG) => {
      const c = ri(r, 2, 6);
      const L = ri(r, 2, 8);
      const xs = [c - 0.1, c - 0.01, c + 0.01, c + 0.1];
      const lower = [`${L - 0.4}`, `${L - 0.04}`, `${L - 0.05}`, `${L - 0.5}`];
      const upper = [`${L + 0.3}`, `${L + 0.03}`, `${L + 0.02}`, `${L + 0.2}`];
      const correct = `${L}`;
      const body = `${table(["$x$", ...xs.map((x) => `$${x}$`)], ["$g(x)$", ...lower])}\n\n${table(
        ["$x$", ...xs.map((x) => `$${x}$`)],
        ["$h(x)$", ...upper],
      )}`;
      return {
        prompt: `A function $f$ satisfies $g(x)\\le f(x)\\le h(x)$ near $x=${c}$, with values as given.\n\n${body}\n\nWhat does this evidence suggest for $\\displaystyle\\lim_{x\\to ${c}} f(x)$?`,
        correct,
        distractors: opts(correct, [
          `${L + 0.3}`,
          `${L - 0.4}`,
          `\\text{The limit does not exist.}`,
          `0`,
        ]),
        explanation: `The bounds close in on $${L}$ from below and above, so any function trapped between them is squeezed toward $${L}$.`,
      };
    },
  },
  {
    id: "g1-squeeze-valid",
    unit: U1,
    topic: "squeeze-theorem",
    difficulty: "medium",
    manifestation: "squeeze-theorem:valid-argument",
    build: () => {
      const correct = `\\text{If } g(x)\\le f(x)\\le h(x) \\text{ near } a \\text{ and } \\lim g = \\lim h = L, \\text{ then } \\lim f = L.`;
      return {
        prompt: `Which statement is a correct use of the squeeze theorem?`,
        correct,
        distractors: [
          `\\text{If } g(x)\\le f(x)\\le h(x) \\text{ near } a, \\text{ then } \\lim_{x\\to a} f(x) \\text{ must exist.}`,
          `\\text{If } \\lim g = L \\text{ and } \\lim h = M \\text{ with } L\\ne M, \\text{ then } \\lim f \\text{ is the average of } L \\text{ and } M.`,
          `\\text{If } f \\text{ is bounded near } a, \\text{ then } \\lim_{x\\to a} f(x) \\text{ exists.}`,
        ],
        explanation: `The theorem needs the two bounds to share the same limit. Bounds alone, unequal bounds, or mere boundedness are not enough to force a limit to exist.`,
      };
    },
  },
  {
    id: "g1-squeeze-infinity",
    unit: U1,
    topic: "squeeze-theorem",
    difficulty: "medium",
    manifestation: "squeeze-theorem:at-infinity",
    build: (r: RNG) => {
      const a = ri(r, 2, 9);
      const c = ri(r, 2, 9);
      const correct = `0`;
      return {
        prompt: `Evaluate $\\displaystyle\\lim_{x\\to\\infty}\\frac{${c} + ${a}\\sin x}{x}$.`,
        correct,
        distractors: opts(correct, [`${a}`, `${c}`, `\\text{The limit does not exist.}`, frac(a, c)]),
        explanation: `The numerator stays between $${c - a}$ and $${c + a}$, so the quotient is squeezed between $\\frac{${c - a}}{x}$ and $\\frac{${c + a}}{x}$, both of which approach $0$.`,
      };
    },
  },
  {
    id: "g1-two-parameters",
    unit: U1,
    topic: "continuity-and-discontinuity",
    difficulty: "hard",
    manifestation: "continuity-and-discontinuity:two-parameters",
    build: (r: RNG) => {
      const c = ri(r, 1, 5);
      const a = 2 * c;
      const b = -c * c;
      const correct = `a = ${a},\\ b = ${b}`;
      return {
        prompt: `Let $f(x)=\\begin{cases} x^{2} & x\\le ${c}\\\\ ax + b & x> ${c}\\end{cases}$. For which values of $a$ and $b$ is $f$ both continuous and differentiable at $x=${c}$?`,
        correct,
        distractors: opts(correct, [
          `a = ${c},\\ b = ${b}`,
          `a = ${a},\\ b = ${c * c}`,
          `a = ${a + 1},\\ b = ${b - 1}`,
          `a = ${c * c},\\ b = ${a}`,
        ]),
        explanation: `Matching slopes gives $a = 2(${c}) = ${a}$. Matching values then gives $${c}^{2} = ${a}(${c}) + b$, so $b = ${b}$.`,
      };
    },
  },
  {
    id: "g1-graph-classify",
    unit: U1,
    topic: "continuity-and-discontinuity",
    difficulty: "medium",
    manifestation: "continuity-and-discontinuity:graph-classify",
    build: (r: RNG) => {
      const c = ri(r, 2, 4);
      const y1 = ri(r, 1, 3);
      const gap = ri(r, 2, 4);
      const jump = r() < 0.5;
      const pts: Array<[number, number]> = jump
        ? [
            [c - 2, y1],
            [c, y1 + 1],
            [c, y1 + 1 + gap],
            [c + 2, y1 + 2 + gap],
          ]
        : [
            [c - 2, y1],
            [c, y1 + gap],
            [c + 2, y1],
          ];
      const correct = jump
        ? `f\\text{ has a jump discontinuity at }x=${c}`
        : `f\\text{ is continuous at }x=${c}`;
      return {
        prompt: `The graph of $f$ consists of the line segments shown. Which statement describes the behavior of $f$ at $x=${c}$?`,
        figure: graph("y = f(x)", pts, {
          xMin: c - 3,
          xMax: c + 3,
          yMin: 0,
          yMax: y1 + gap + 3,
        }),
        correct,
        distractors: opts(correct, [
          `f\\text{ has a jump discontinuity at }x=${c}`,
          `f\\text{ is continuous at }x=${c}`,
          `f\\text{ has a removable discontinuity at }x=${c}`,
          `f\\text{ has an infinite discontinuity at }x=${c}`,
        ]),
        explanation: jump
          ? `The one-sided values at $x=${c}$ differ, so the two-sided limit fails to exist and the break is a jump.`
          : `The one-sided values agree with the graph's height at $x=${c}$, so $f$ is continuous there even though the graph has a corner.`,
      };
    },
  },
  {
    id: "g1-continuity-definition",
    unit: U1,
    topic: "continuity-and-discontinuity",
    difficulty: "medium",
    manifestation: "continuity-and-discontinuity:definition",
    build: (r: RNG) => {
      const c = ri(r, 2, 8);
      const v = 2 * c + ri(r, 1, 4);
      const correct = `\\text{The limit exists but does not equal } f(${c}).`;
      return {
        prompt: `Let $f(x)=\\dfrac{x^{2} - ${c * c}}{x - ${c}}$ for $x\\ne ${c}$, and let $f(${c}) = ${v}$. Which condition of continuity fails at $x=${c}$?`,
        correct,
        distractors: opts(correct, [
          `f(${c}) \\text{ is undefined.}`,
          `\\text{The two one-sided limits disagree.}`,
          `\\text{The limit is infinite.}`,
        ]),
        explanation: `Cancelling gives $f(x)=x+${c}$ for $x\\ne ${c}$, so the limit is $${2 * c}$. The value $f(${c})=${v}$ is defined but different, so the third condition of continuity fails.`,
      };
    },
  },
  {
    id: "g1-continuity-interval",
    unit: U1,
    topic: "continuity-and-discontinuity",
    difficulty: "medium",
    manifestation: "continuity-and-discontinuity:interval",
    build: (r: RNG) => {
      const a = ri(r, 0, 3);
      const b = a + ri(r, 2, 6);
      const correct = `f\\text{ is continuous at every point of }(${a},${b}).`;
      return {
        prompt: `A function $f$ is continuous on the closed interval $[${a},${b}]$. Which statement must be true?`,
        correct,
        distractors: [
          `f\\text{ is differentiable on }(${a},${b}).`,
          `f\\text{ is increasing somewhere on }(${a},${b}).`,
          `f\\text{ has an inverse on }[${a},${b}].`,
        ],
        explanation: `Continuity on a closed interval includes continuity at every interior point. It says nothing about differentiability, monotonicity, or invertibility.`,
      };
    },
  },
  {
    id: "g1-ivt-table",
    unit: U1,
    topic: "intermediate-value-theorem",
    difficulty: "medium",
    manifestation: "intermediate-value-theorem:table-root",
    build: (r: RNG) => {
      const x0 = ri(r, 0, 3);
      const step = ri(r, 1, 3);
      const xs = [x0, x0 + step, x0 + 2 * step, x0 + 3 * step];
      const ys = [`${-ri(r, 2, 9)}`, `${-ri(r, 1, 5)}`, `${ri(r, 1, 6)}`, `${ri(r, 4, 9)}`];
      const correct = `\\text{There is a zero of } f \\text{ in } (${xs[1]},${xs[2]}).`;
      return {
        prompt: `The continuous function $f$ has the values shown.\n\n${tablePair("f(x)", xs, ys)}\n\nWhich conclusion is guaranteed?`,
        correct,
        distractors: [
          `\\text{There is a zero of } f \\text{ in } (${xs[0]},${xs[1]}).`,
          `\\text{There is a zero of } f \\text{ in } (${xs[2]},${xs[3]}).`,
          `f \\text{ has exactly one zero on } [${xs[0]},${xs[3]}].`,
        ],
        explanation: `Only between $x=${xs[1]}$ and $x=${xs[2]}$ does $f$ change sign, so the Intermediate Value Theorem guarantees a zero there. It never guarantees how many zeros exist.`,
      };
    },
  },
  {
    id: "g1-ivt-cannot",
    unit: U1,
    topic: "intermediate-value-theorem",
    difficulty: "medium",
    manifestation: "intermediate-value-theorem:cannot-conclude",
    build: (r: RNG) => {
      const a = ri(r, 0, 3);
      const b = a + ri(r, 2, 6);
      const fa = -ri(r, 2, 8);
      const fb = ri(r, 2, 8);
      const correct = `f\\text{ takes the value }0\\text{ exactly once on }(${a},${b}).`;
      return {
        prompt: `A function $f$ is continuous on $[${a},${b}]$ with $f(${a})=${fa}$ and $f(${b})=${fb}$. Which conclusion is **not** guaranteed?`,
        correct,
        distractors: [
          `f\\text{ takes the value }0\\text{ somewhere on }(${a},${b}).`,
          `f\\text{ takes every value between }${fa}\\text{ and }${fb}\\text{ on }[${a},${b}].`,
          `f\\text{ takes the value }${Math.round((fa + fb) / 2)}\\text{ somewhere on }[${a},${b}].`,
        ],
        explanation: `The Intermediate Value Theorem guarantees that intermediate values are attained at least once, but never that they are attained exactly once.`,
      };
    },
  },
  {
    id: "g1-ivt-count",
    unit: U1,
    topic: "intermediate-value-theorem",
    difficulty: "hard",
    manifestation: "intermediate-value-theorem:count-solutions",
    build: (r: RNG) => {
      const k = ri(r, 2, 5) + 0.5;
      const pts: Array<[number, number]> = [
        [0, ri(r, 1, 2)],
        [2, ri(r, 6, 7)],
        [4, ri(r, 1, 2)],
        [6, ri(r, 6, 7)],
      ];
      let count = 0;
      for (let i = 0; i < pts.length - 1; i++) {
        if ((pts[i][1] - k) * (pts[i + 1][1] - k) < 0) count++;
      }
      const correct = `${count}`;
      return {
        prompt: `The graph of the continuous function $f$ consists of the line segments shown. What is the minimum number of solutions of $f(x) = ${k}$ on $[0,6]$ that this graph guarantees?`,
        figure: graph("y = f(x)", pts, { xMin: -1, xMax: 7, yMin: 0, yMax: 8 }),
        correct,
        distractors: opts(correct, [`${count + 1}`, `${count - 1}`, `${count + 2}`, `0`]),
        explanation: `On each segment where $f$ crosses the height $${k}$, the Intermediate Value Theorem guarantees a solution. The graph changes from below $${k}$ to above it (or the reverse) ${count} times.`,
      };
    },
  },
  {
    id: "g1-vertical-asymptote",
    unit: U1,
    topic: "limits-at-infinity",
    difficulty: "medium",
    manifestation: "limits-at-infinity:vertical-asymptote",
    build: (r: RNG) => {
      const b = ri(r, 2, 7);
      let c = ri(r, 1, 7);
      if (c === b) c = b + 1;
      let a = ri(r, 1, 9);
      if (a === -b) a = b + 2;
      if (a === c) a = c + 2;
      const correct = `x = ${b}\\text{ and }x = ${-c}`;
      return {
        prompt: `Find every vertical asymptote of $f(x)=\\dfrac{x + ${a}}{(x - ${b})(x + ${c})}$.`,
        correct,
        distractors: opts(correct, [
          `x = ${-b}\\text{ and }x = ${c}`,
          `x = ${b}\\text{ only}`,
          `x = ${-a}`,
          `\\text{There are no vertical asymptotes.}`,
        ]),
        explanation: `The denominator vanishes at $x=${b}$ and $x=${-c}$, and the numerator is nonzero there, so the one-sided limits are infinite at both values.`,
      };
    },
  },
  {
    id: "g1-asymptote-count",
    unit: U1,
    topic: "limits-at-infinity",
    difficulty: "hard",
    manifestation: "limits-at-infinity:asymptote-count",
    build: (r: RNG) => {
      const p = ri(r, 2, 9);
      const q = ri(r, 1, 9);
      const b = ri(r, 2, 6);
      const correct = `\\text{one horizontal asymptote and two vertical asymptotes}`;
      return {
        prompt: `How many asymptotes does the graph of $f(x)=\\dfrac{${p}x + ${q}}{x^{2} - ${b * b}}$ have, and of what kind?`,
        correct,
        distractors: [
          `\\text{one horizontal asymptote and one vertical asymptote}`,
          `\\text{two horizontal asymptotes and two vertical asymptotes}`,
          `\\text{no horizontal asymptote and two vertical asymptotes}`,
        ],
        explanation: `The denominator factors as $(x-${b})(x+${b})$, giving vertical asymptotes at $x=\\pm ${b}$. Since the numerator's degree is smaller, $f\\to 0$ in both directions, giving the single horizontal asymptote $y=0$.`,
      };
    },
  },
  {
    id: "g1-graph-end",
    unit: U1,
    topic: "limits-at-infinity",
    difficulty: "easy",
    manifestation: "limits-at-infinity:graph-end",
    build: (r: RNG) => {
      const L = ri(r, 2, 6);
      const start = ri(r, 0, 1);
      const correct = `${L}`;
      return {
        prompt: `The graph of $f$ is shown for $0\\le x\\le 8$, and for $x > 8$ the graph continues along the same horizontal line. Find $\\displaystyle\\lim_{x\\to\\infty} f(x)$.`,
        figure: graph(
          "y = f(x)",
          [
            [0, start],
            [3, L + 2],
            [6, L],
            [8, L],
          ],
          { xMin: -1, xMax: 9, yMin: 0, yMax: L + 3 },
        ),
        correct,
        distractors: opts(correct, [`${L + 2}`, `${start}`, `\\infty`, `0`]),
        explanation: `Beyond $x=6$ the graph levels off at height $${L}$ and stays there, so the end behavior gives the horizontal asymptote $y=${L}$.`,
      };
    },
  },
  {
    id: "g1-parameter-asymptote",
    unit: U1,
    topic: "limits-at-infinity",
    difficulty: "hard",
    manifestation: "limits-at-infinity:parameter-asymptote",
    build: (r: RNG) => {
      const b = ri(r, 2, 8);
      const m = ri(r, 2, 7);
      const q = ri(r, 1, 9);
      const k = m * b;
      const correct = `${k}`;
      return {
        prompt: `For what value of $k$ does the graph of $f(x)=\\dfrac{kx^{2} + ${q}x}{${b}x^{2} - ${q}}$ have the horizontal asymptote $y = ${m}$?`,
        correct,
        distractors: opts(correct, [`${m}`, `${b}`, frac(m, b), `${k + 1}`]),
        explanation: `For equal degrees the horizontal asymptote is the ratio of leading coefficients, so $\\frac{k}{${b}} = ${m}$ and $k = ${k}$.`,
      };
    },
  },
];

/* ------------------------------------------------------------------ */
/* Unit 2 — Differentiation: definition and fundamental properties     */
/* ------------------------------------------------------------------ */

const U2 = "unit-2-differentiation-definition-and-properties";

const NAMES = ["f", "g", "h", "p", "q"] as const;

GAP_TEMPLATES.push(
  {
    id: "g2-equivalent-forms",
    unit: U2,
    topic: "definition-of-the-derivative",
    difficulty: "medium",
    manifestation: "definition-of-the-derivative:equivalent-forms",
    build: (r: RNG) => {
      const a = ri(r, 2, 9);
      const f = pick(r, NAMES);
      const correct = `\\displaystyle\\lim_{x\\to ${a}}\\frac{${f}(x) - ${f}(${a})}{x - ${a}}`;
      return {
        prompt: `Let $${f}$ be differentiable at $x=${a}$. Which expression is equal to $\\displaystyle\\lim_{h\\to 0}\\frac{${f}(${a}+h) - ${f}(${a})}{h}$?`,
        correct,
        distractors: [
          `\\displaystyle\\lim_{x\\to ${a}}\\frac{${f}(x) - ${f}(${a})}{${a}}`,
          `\\displaystyle\\lim_{h\\to 0}\\frac{${f}(${a}+h) - ${f}(${a})}{${a}+h}`,
          `\\dfrac{${f}(${a}) - ${f}(0)}{${a}}`,
        ],
        explanation: `Writing $x = ${a}+h$ turns $h\\to 0$ into $x\\to ${a}$ and $h$ into $x-${a}$, giving the point form of the derivative. The other choices divide by the wrong quantity or compute an average rate of change.`,
      };
    },
  },
  {
    id: "g2-graph-slope",
    unit: U2,
    topic: "definition-of-the-derivative",
    difficulty: "medium",
    manifestation: "definition-of-the-derivative:graph-slope",
    build: (r: RNG) => {
      const x0 = ri(r, 1, 3);
      const rise = ri(r, 2, 6);
      const run = ri(r, 1, 3);
      const pts: Array<[number, number]> = [
        [0, 1],
        [x0, 1 + ri(r, 1, 3)],
        [x0 + run, 1 + ri(r, 1, 3) + rise],
      ];
      const slope = (pts[2][1] - pts[1][1]) / run;
      const correct = dec(slope, 3);
      return {
        prompt: `The graph of $f$ consists of the line segments shown. Find $f'(x)$ for $x$ between $${x0}$ and $${x0 + run}$.`,
        figure: graph("y = f(x)", pts, { xMin: -1, xMax: x0 + run + 1, yMin: 0, yMax: pts[2][1] + 2 }),
        correct,
        distractors: opts(correct, [dec(-slope, 3), dec(slope + 1, 3), dec(run / (rise || 1), 3), `0`]),
        explanation: `On a line segment the derivative is the segment's slope: $\\frac{${pts[2][1]} - ${pts[1][1]}}{${pts[2][0]} - ${pts[1][0]}} = ${correct}$.`,
      };
    },
  },
  {
    id: "g2-average-vs-instant",
    unit: U2,
    topic: "definition-of-the-derivative",
    difficulty: "medium",
    manifestation: "definition-of-the-derivative:average-vs-instant",
    build: (r: RNG) => {
      const a = ri(r, 1, 4);
      const b = a + ri(r, 2, 5);
      const k = ri(r, 2, 5);
      const avg = k * (a + b);
      const correct = `${avg}`;
      return {
        prompt: `A tank's volume, in gallons, is $V(t)=${k}t^{2}$ after $t$ minutes. Find the average rate of change of the volume over $${a}\\le t\\le ${b}$, in gallons per minute.`,
        correct,
        distractors: opts(correct, [`${2 * k * a}`, `${2 * k * b}`, `${k * (b - a)}`, `${avg + k}`]),
        explanation: `The average rate of change is $\\frac{V(${b}) - V(${a})}{${b} - ${a}} = \\frac{${k}(${b * b}) - ${k}(${a * a})}{${b - a}} = ${avg}$. The instantaneous rates $V'(${a})=${2 * k * a}$ and $V'(${b})=${2 * k * b}$ answer a different question.`,
      };
    },
  },
  {
    id: "g2-power-polynomial",
    unit: U2,
    topic: "power-rule",
    difficulty: "easy",
    manifestation: "power-rule:polynomial",
    build: (r: RNG) => {
      const a = ri(r, 2, 6);
      const b = ri(r, 2, 8);
      const c = ri(r, 1, 9);
      const correct = `${3 * a}x^{2} ${term(-2 * b, "x")} ${term(c, "")}`;
      return {
        prompt: `If $f(x)=${a}x^{3} ${term(-b, "x^{2}")} ${term(c, "x")} + ${ri(r, 2, 9)}$, find $f'(x)$.`,
        correct,
        distractors: [
          `${3 * a}x^{2} ${term(-b, "x")} ${term(c, "")}`,
          `${a}x^{2} ${term(-2 * b, "x")} ${term(c, "")}`,
          `${3 * a}x^{2} ${term(-2 * b, "x")}`,
        ],
        explanation: `Differentiate term by term: the cubic gives $${3 * a}x^{2}$, the quadratic gives $${term(-2 * b, "x").trim()}$, the linear term gives $${c}$, and the constant gives $0$.`,
      };
    },
  },
  {
    id: "g2-radical-rewrite",
    unit: U2,
    topic: "power-rule",
    difficulty: "medium",
    manifestation: "power-rule:radical-rewrite",
    build: (r: RNG) => {
      const a = ri(r, 2, 9);
      const correct = `\\dfrac{${a}}{3}x^{-\\frac{2}{3}}`;
      return {
        prompt: `If $f(x)=${a}\\sqrt[3]{x}$, find $f'(x)$.`,
        correct,
        distractors: [
          `${a}x^{-\\frac{2}{3}}`,
          `\\dfrac{${a}}{3}x^{\\frac{2}{3}}`,
          `\\dfrac{${a}}{2}x^{-\\frac{1}{2}}`,
        ],
        explanation: `Rewrite as $${a}x^{1/3}$; the power rule gives $${a}\\cdot\\frac{1}{3}x^{-2/3}$.`,
      };
    },
  },
  {
    id: "g2-simplify-first",
    unit: U2,
    topic: "power-rule",
    difficulty: "medium",
    manifestation: "power-rule:simplify-first",
    build: (r: RNG) => {
      const a = ri(r, 2, 8);
      const b = ri(r, 2, 9);
      const correct = `${a} - ${b}x^{-2}`;
      return {
        prompt: `Let $f(x)=\\dfrac{${a}x^{2} + ${b}}{x}$ for $x\\ne 0$. Which is the most efficient first step, and what is $f'(x)$?`,
        correct,
        distractors: [
          `${a} + ${b}x^{-2}`,
          `\\dfrac{${2 * a}x}{1}`,
          `\\dfrac{${a}x^{2} - ${b}}{x^{2}}`,
        ],
        explanation: `Divide first: $f(x)=${a}x + ${b}x^{-1}$. Then $f'(x)=${a} - ${b}x^{-2}$, avoiding the quotient rule entirely.`,
      };
    },
  },
  {
    id: "g2-power-reverse",
    unit: U2,
    topic: "power-rule",
    difficulty: "hard",
    manifestation: "power-rule:reverse",
    build: (r: RNG) => {
      const a = ri(r, 2, 6);
      const c = ri(r, 1, 9);
      const correct = `${a}x^{3} ${term(c, "")}`;
      return {
        prompt: `A function $f$ satisfies $f'(x)=${3 * a}x^{2}$ and $f(0)=${c}$. Which expression could be $f(x)$?`,
        correct,
        distractors: [
          `${3 * a}x^{3} ${term(c, "")}`,
          `${a}x^{3}`,
          `${6 * a}x ${term(c, "")}`,
        ],
        explanation: `An antiderivative of $${3 * a}x^{2}$ is $${a}x^{3}$, and the condition $f(0)=${c}$ fixes the constant at $${c}$.`,
      };
    },
  },
  {
    id: "g2-pq-table",
    unit: U2,
    topic: "product-and-quotient-rules",
    difficulty: "medium",
    manifestation: "product-and-quotient-rules:table-values",
    build: (r: RNG) => {
      const a = ri(r, 1, 5);
      const f = ri(r, 2, 8);
      const fp = ri(r, 1, 6);
      const g = ri(r, 2, 8);
      const gp = ri(r, 1, 6);
      const v = fp * g + f * gp;
      const correct = `${v}`;
      const body = table(
        ["$x$", "$f(x)$", "$f'(x)$", "$g(x)$", "$g'(x)$"],
        [`$${a}$`, `$${f}$`, `$${fp}$`, `$${g}$`, `$${gp}$`],
      );
      return {
        prompt: `Values of two differentiable functions are given.\n\n${body}\n\nIf $P(x)=f(x)g(x)$, find $P'(${a})$.`,
        correct,
        distractors: opts(correct, [`${fp * gp}`, `${f * g}`, `${fp * g - f * gp}`, `${v + f}`]),
        explanation: `The product rule gives $P'(${a}) = f'(${a})g(${a}) + f(${a})g'(${a}) = ${fp}(${g}) + ${f}(${gp}) = ${v}$.`,
      };
    },
  },
  {
    id: "g2-pq-graph",
    unit: U2,
    topic: "product-and-quotient-rules",
    difficulty: "hard",
    manifestation: "product-and-quotient-rules:graph-values",
    build: (r: RNG) => {
      const a = ri(r, 2, 4);
      const fv = ri(r, 2, 6);
      const slope = ri(r, 1, 4);
      const c = ri(r, 2, 6);
      const v = slope * c;
      const correct = `${v}`;
      return {
        prompt: `The graph of $f$ shown consists of line segments, and $g(x)=${c}$ for all $x$. Find $(fg)'(${a})$.`,
        figure: graph(
          "y = f(x)",
          [
            [0, fv - slope * a],
            [a + 2, fv + 2 * slope],
          ],
          { xMin: -1, xMax: a + 3, yMin: 0, yMax: fv + 2 * slope + 2 },
        ),
        correct,
        distractors: opts(correct, [`${slope}`, `${c}`, `${fv * c}`, `${v + c}`]),
        explanation: `Since $g$ is constant, $g'=0$ and $(fg)' = f'g = f'(${a})\\cdot ${c}$. The segment's slope is $${slope}$, so the value is $${v}$.`,
      };
    },
  },
  {
    id: "g2-pq-procedure",
    unit: U2,
    topic: "product-and-quotient-rules",
    difficulty: "medium",
    manifestation: "product-and-quotient-rules:procedure-choice",
    build: (r: RNG) => {
      const a = ri(r, 2, 9);
      const b = ri(r, 2, 9);
      const correct = `\\text{No product or quotient rule is needed; expand and use the power rule.}`;
      return {
        prompt: `Which describes the least amount of work needed to differentiate $f(x)=x^{2}\\left(${a}x + ${b}\\right)$?`,
        correct,
        distractors: [
          `\\text{The quotient rule is required.}`,
          `\\text{The product rule is the only valid method.}`,
          `\\text{The chain rule is required.}`,
        ],
        explanation: `Expanding gives $${a}x^{3} + ${b}x^{2}$, so the power rule suffices. The product rule is valid but does more work, and no quotient or composition appears.`,
      };
    },
  },
  {
    id: "g2-pq-error",
    unit: U2,
    topic: "product-and-quotient-rules",
    difficulty: "hard",
    manifestation: "product-and-quotient-rules:error-analysis",
    build: (r: RNG) => {
      const a = ri(r, 2, 8);
      const correct = `\\text{The two products in the numerator were added instead of subtracted.}`;
      return {
        prompt: `A student differentiates $f(x)=\\dfrac{x^{2}}{x + ${a}}$ and writes $f'(x)=\\dfrac{2x(x+${a}) + x^{2}}{(x+${a})^{2}}$. What is the error?`,
        correct,
        distractors: [
          `\\text{The denominator should not be squared.}`,
          `\\text{The derivative of } x^{2} \\text{ should be } x.`,
          `\\text{There is no error.}`,
        ],
        explanation: `The quotient rule numerator is $u'v - uv'$, so the correct numerator is $2x(x+${a}) - x^{2}$. The squared denominator and the derivative $2x$ are both correct.`,
      };
    },
  },
  {
    id: "g2-rewrite-avoids-quotient",
    unit: U2,
    topic: "product-and-quotient-rules",
    difficulty: "medium",
    manifestation: "product-and-quotient-rules:rewrite-avoids-quotient",
    build: (r: RNG) => {
      const a = ri(r, 2, 9);
      const b = ri(r, 2, 9);
      const correct = `${a}x^{-1} + ${b}x^{-3}`;
      return {
        prompt: `Rewrite $f(x)=\\dfrac{${a}x^{2} + ${b}}{x^{3}}$ in a form that needs only the power rule.`,
        correct,
        distractors: [
          `${a}x^{-1} + ${b}x^{3}`,
          `${a}x^{2} + ${b}x^{-3}`,
          `\\dfrac{${a}}{x} + \\dfrac{${b}}{x^{2}}`,
        ],
        explanation: `Divide each numerator term by $x^{3}$: $\\frac{${a}x^{2}}{x^{3}} = ${a}x^{-1}$ and $\\frac{${b}}{x^{3}} = ${b}x^{-3}$.`,
      };
    },
  },
  {
    id: "g2-secant-family",
    unit: U2,
    topic: "derivatives-of-trig-exp-log",
    difficulty: "medium",
    manifestation: "derivatives-of-trig-exp-log:secant-family",
    build: (r: RNG) => {
      const a = ri(r, 2, 9);
      const which = pick(r, ["tan", "sec", "cot", "csc"] as const);
      const answers = {
        tan: `${a}\\sec^{2} x`,
        sec: `${a}\\sec x\\tan x`,
        cot: `-${a}\\csc^{2} x`,
        csc: `-${a}\\csc x\\cot x`,
      } as const;
      const correct = answers[which];
      return {
        prompt: `If $f(x)=${a}\\${which} x$, find $f'(x)$.`,
        correct,
        distractors: opts(correct, [answers.tan, answers.sec, answers.cot, answers.csc]),
        explanation: `The standard derivative gives $f'(x)=${correct}$.`,
      };
    },
  },
  {
    id: "g2-combined-elementary",
    unit: U2,
    topic: "derivatives-of-trig-exp-log",
    difficulty: "easy",
    manifestation: "derivatives-of-trig-exp-log:combined",
    build: (r: RNG) => {
      const a = ri(r, 2, 9);
      const b = ri(r, 2, 9);
      const correct = `${a}\\cos x + \\dfrac{${b}}{x}`;
      return {
        prompt: `If $f(x)=${a}\\sin x + ${b}\\ln x$ for $x>0$, find $f'(x)$.`,
        correct,
        distractors: [
          `${a}\\cos x + ${b}\\ln x`,
          `-${a}\\cos x + \\dfrac{${b}}{x}`,
          `${a}\\cos x + \\dfrac{${b}}{x^{2}}`,
        ],
        explanation: `Differentiate each term: $\\frac{d}{dx}\\sin x = \\cos x$ and $\\frac{d}{dx}\\ln x = \\frac{1}{x}$.`,
      };
    },
  },
  {
    id: "g2-special-angle",
    unit: U2,
    topic: "derivatives-of-trig-exp-log",
    difficulty: "medium",
    manifestation: "derivatives-of-trig-exp-log:evaluate-special-angle",
    build: (r: RNG) => {
      const a = ri(r, 2, 9);
      const correct = `${-a}`;
      return {
        prompt: `If $f(x)=${a}\\cos x$, find $f'\\!\\left(\\dfrac{\\pi}{2}\\right)$.`,
        correct,
        distractors: opts(correct, [`${a}`, `0`, frac(a, 2), `${2 * a}`]),
        explanation: `$f'(x) = -${a}\\sin x$, and $\\sin\\frac{\\pi}{2} = 1$, so $f'\\left(\\frac{\\pi}{2}\\right) = ${-a}$.`,
      };
    },
  },
  {
    id: "g2-identity-first",
    unit: U2,
    topic: "derivatives-of-trig-exp-log",
    difficulty: "hard",
    manifestation: "derivatives-of-trig-exp-log:identity-first",
    build: (r: RNG) => {
      const a = ri(r, 2, 9);
      const correct = `${a}\\cos x`;
      return {
        prompt: `Let $f(x)=${a}\\dfrac{\\sin x}{\\tan x}\\cdot\\sec x\\cdot\\sin x$ for values where every factor is defined. Simplify first, then find $f'(x)$.`,
        correct,
        distractors: [
          `${a}\\sec^{2} x`,
          `-${a}\\sin x`,
          `${a}\\sin x\\cos x`,
        ],
        explanation: `Since $\\frac{\\sin x}{\\tan x} = \\cos x$ and $\\cos x\\sec x = 1$, the function simplifies to $${a}\\sin x$, whose derivative is $${a}\\cos x$.`,
      };
    },
  },
  {
    id: "g2-match-derivative-graph",
    unit: U2,
    topic: "derivatives-of-trig-exp-log",
    difficulty: "hard",
    manifestation: "derivatives-of-trig-exp-log:match-derivative",
    build: (r: RNG) => {
      const k = ri(r, 2, 5);
      const correct = `y = ${k}e^{x}`;
      return {
        prompt: `The graph shown is increasing everywhere, is always positive, and has slope equal to its own height at every point. Which function has this graph?`,
        figure: graph(
          "y = f(x)",
          [
            [0, k],
            [1, Math.round(k * Math.E)],
            [2, Math.round(k * Math.E * Math.E)],
          ],
          { xMin: -1, xMax: 3, yMin: 0, yMax: Math.round(k * 8) },
        ),
        correct,
        distractors: [`y = ${k}\\ln x`, `y = ${k}x^{2}`, `y = ${k}\\sin x`],
        explanation: `Only exponential functions of base $e$ satisfy $f'=f$. Logarithms, powers, and sine all fail at least one stated property.`,
      };
    },
  },
  {
    id: "g2-diff-implication",
    unit: U2,
    topic: "differentiability-and-continuity",
    difficulty: "medium",
    manifestation: "differentiability-and-continuity:implication",
    build: (r: RNG) => {
      const a = ri(r, 1, 9);
      const correct = `\\text{If } f \\text{ is differentiable at } x=${a}, \\text{ then } f \\text{ is continuous at } x=${a}.`;
      return {
        prompt: `Which statement about a function $f$ and the point $x=${a}$ must be true?`,
        correct,
        distractors: [
          `\\text{If } f \\text{ is continuous at } x=${a}, \\text{ then } f \\text{ is differentiable at } x=${a}.`,
          `\\text{If } f \\text{ is not differentiable at } x=${a}, \\text{ then } f \\text{ is not continuous at } x=${a}.`,
          `\\text{If } \\lim_{x\\to ${a}} f(x) \\text{ exists, then } f \\text{ is differentiable at } x=${a}.`,
        ],
        explanation: `Differentiability implies continuity, but not the reverse: corners and cusps are continuous without being differentiable.`,
      };
    },
  },
  {
    id: "g2-diff-counterexample",
    unit: U2,
    topic: "differentiability-and-continuity",
    difficulty: "medium",
    manifestation: "differentiability-and-continuity:counterexample",
    build: (r: RNG) => {
      const a = ri(r, 1, 9);
      const correct = `f(x) = |x - ${a}|`;
      return {
        prompt: `Which function is continuous at $x=${a}$ but not differentiable there?`,
        correct,
        distractors: [
          `f(x) = (x - ${a})^{2}`,
          `f(x) = \\dfrac{1}{x - ${a}}`,
          `f(x) = ${a}x + 1`,
        ],
        explanation: `The absolute-value function has a corner at $x=${a}$: the one-sided slopes are $-1$ and $1$. The quadratic and the line are differentiable, and the reciprocal is not even defined at $x=${a}$.`,
      };
    },
  },
  {
    id: "g2-diff-table-evidence",
    unit: U2,
    topic: "differentiability-and-continuity",
    difficulty: "hard",
    manifestation: "differentiability-and-continuity:table-evidence",
    build: (r: RNG) => {
      const a = ri(r, 2, 6);
      const xs = [a - 0.1, a, a + 0.1];
      const v = ri(r, 2, 8);
      const ys = [`${v - 0.3}`, `${v}`, `${v + 0.3}`];
      const correct = `\\text{Nothing about differentiability at } x=${a} \\text{ can be concluded.}`;
      return {
        prompt: `A function $f$ has the tabulated values shown.\n\n${tablePair("f(x)", xs, ys)}\n\nWhat do these values establish about $f$ at $x=${a}$?`,
        correct,
        distractors: [
          `f \\text{ is differentiable at } x=${a}, \\text{ with } f'(${a})=3.`,
          `f \\text{ is continuous at } x=${a}.`,
          `f \\text{ is not differentiable at } x=${a}.`,
        ],
        explanation: `Three sampled values cannot establish a limit, continuity, or differentiability; they only suggest a trend. The symmetric difference quotient here estimates a slope but proves nothing.`,
      };
    },
  },
);

/* ------------------------------------------------------------------ */
/* Unit 3 — Composite, implicit, and inverse differentiation           */
/* ------------------------------------------------------------------ */

const U3 = "unit-3-differentiation-composite-implicit-inverse";

GAP_TEMPLATES.push(
  {
    id: "g3-chain-with-product",
    unit: U3,
    topic: "chain-rule",
    difficulty: "hard",
    manifestation: "chain-rule:with-product",
    build: (r: RNG) => {
      const a = ri(r, 2, 6);
      const correct = `e^{${a}x}\\left(${a}x + 1\\right)`;
      return {
        prompt: `If $f(x)=xe^{${a}x}$, find $f'(x)$.`,
        correct,
        distractors: [
          `e^{${a}x}\\left(x + ${a}\\right)`,
          `${a}xe^{${a}x}`,
          `e^{${a}x}\\left(${a}x - 1\\right)`,
        ],
        explanation: `Product rule with the chain rule on $e^{${a}x}$: $f'(x)=e^{${a}x} + x\\cdot ${a}e^{${a}x} = e^{${a}x}(${a}x + 1)$.`,
      };
    },
  },
  {
    id: "g3-chain-table",
    unit: U3,
    topic: "chain-rule",
    difficulty: "medium",
    manifestation: "chain-rule:table-composition",
    build: (r: RNG) => {
      const a = ri(r, 1, 4);
      const ga = ri(r, 2, 7);
      const gpa = ri(r, 2, 6);
      const fpga = ri(r, 2, 6);
      const v = fpga * gpa;
      const correct = `${v}`;
      const body = table(
        ["$x$", "$g(x)$", "$g'(x)$", "$f'(x)$"],
        [`$${a}$`, `$${ga}$`, `$${gpa}$`, `$${ri(r, 1, 5)}$`],
      );
      return {
        prompt: `For differentiable functions $f$ and $g$, the table gives values at $x=${a}$, and separately $f'(${ga}) = ${fpga}$.\n\n${body}\n\nIf $h(x)=f(g(x))$, find $h'(${a})$.`,
        correct,
        distractors: opts(correct, [`${fpga}`, `${gpa}`, `${fpga + gpa}`, `${ga * gpa}`]),
        explanation: `The chain rule gives $h'(${a}) = f'(g(${a}))\\,g'(${a}) = f'(${ga})\\cdot ${gpa} = ${fpga}\\cdot ${gpa} = ${v}$.`,
      };
    },
  },
  {
    id: "g3-chain-graph",
    unit: U3,
    topic: "chain-rule",
    difficulty: "hard",
    manifestation: "chain-rule:graph-composition",
    build: (r: RNG) => {
      const a = ri(r, 1, 3);
      const s1 = ri(r, 2, 4);
      const s2 = ri(r, 2, 4);
      const pts: Array<[number, number]> = [
        [0, 0],
        [4, 4 * s1],
      ];
      const inner = s1 * a;
      const v = s1 * s2;
      const correct = `${v}`;
      return {
        prompt: `The graph of $u$ shown is a single line segment, and $w$ is a differentiable function with $w'(x)=${s2}$ for all $x$. Find $\\dfrac{d}{dx}\\,w(u(x))$ at $x=${a}$.`,
        figure: graph("y = u(x)", pts, { xMin: -1, xMax: 5, yMin: -1, yMax: 4 * s1 + 1 }),
        correct,
        distractors: opts(correct, [`${s1}`, `${s2}`, `${s1 + s2}`, `${inner}`]),
        explanation: `The segment's slope is $u'(${a}) = ${s1}$, so the chain rule gives $w'(u(${a}))\\,u'(${a}) = ${s2}\\cdot ${s1} = ${v}$.`,
      };
    },
  },
  {
    id: "g3-hidden-composition",
    unit: U3,
    topic: "chain-rule",
    difficulty: "medium",
    manifestation: "chain-rule:hidden-composition",
    build: (r: RNG) => {
      const a = ri(r, 2, 8);
      const correct = `\\dfrac{${a}}{2\\sqrt{${a}x + 1}}`;
      return {
        prompt: `Which rule is needed for $f(x)=\\sqrt{${a}x + 1}$, and what is $f'(x)$?`,
        correct,
        distractors: [
          `\\dfrac{1}{2\\sqrt{${a}x + 1}}`,
          `\\dfrac{${a}}{\\sqrt{${a}x + 1}}`,
          `${a}\\sqrt{${a}x + 1}`,
        ],
        explanation: `The radical hides a composition: with outer $\\sqrt{u}$ and inner $u = ${a}x+1$, the chain rule gives $\\frac{1}{2\\sqrt{u}}\\cdot ${a}$.`,
      };
    },
  },
  {
    id: "g3-chain-error",
    unit: U3,
    topic: "chain-rule",
    difficulty: "medium",
    manifestation: "chain-rule:error-analysis",
    build: (r: RNG) => {
      const a = ri(r, 2, 6);
      const n = ri(r, 3, 5);
      const correct = `\\text{The factor } ${a} \\text{ from the derivative of the inside was omitted.}`;
      return {
        prompt: `A student differentiates $f(x)=\\left(${a}x + 1\\right)^{${n}}$ and writes $f'(x)=${n}\\left(${a}x + 1\\right)^{${n - 1}}$. What went wrong?`,
        correct,
        distractors: [
          `\\text{The exponent should stay } ${n}.`,
          `\\text{The product rule should have been used.}`,
          `\\text{Nothing; the answer is correct.}`,
        ],
        explanation: `The chain rule requires multiplying by the inner derivative, so $f'(x)=${n * a}\\left(${a}x+1\\right)^{${n - 1}}$.`,
      };
    },
  },
  {
    id: "g3-implicit-trig",
    unit: U3,
    topic: "implicit-differentiation",
    difficulty: "hard",
    manifestation: "implicit-differentiation:trig-exp-relation",
    build: (r: RNG) => {
      const a = ri(r, 2, 6);
      const correct = `\\dfrac{${a}}{\\cos y}`;
      return {
        prompt: `The curve $\\sin y = ${a}x$ defines $y$ implicitly as a function of $x$. Find $\\dfrac{dy}{dx}$.`,
        correct,
        distractors: [`${a}\\cos y`, `\\dfrac{\\cos y}{${a}}`, `\\dfrac{${a}}{\\sin y}`],
        explanation: `Differentiating both sides gives $\\cos y\\cdot\\frac{dy}{dx} = ${a}$, so $\\frac{dy}{dx} = \\frac{${a}}{\\cos y}$.`,
      };
    },
  },
  {
    id: "g3-implicit-tangent-line",
    unit: U3,
    topic: "implicit-differentiation",
    difficulty: "hard",
    manifestation: "implicit-differentiation:tangent-line",
    build: (r: RNG) => {
      const t = pick(r, [
        [3, 4, 5],
        [6, 8, 10],
        [5, 12, 13],
      ] as const);
      const [x0, y0, h] = t;
      const m = frac(-x0, y0);
      const correct = `y - ${y0} = ${m}\\left(x - ${x0}\\right)`;
      return {
        prompt: `Write an equation of the line tangent to $x^{2} + y^{2} = ${h * h}$ at the point $(${x0}, ${y0})$.`,
        correct,
        distractors: [
          `y - ${y0} = ${frac(x0, y0)}\\left(x - ${x0}\\right)`,
          `y - ${y0} = ${frac(y0, x0)}\\left(x - ${x0}\\right)`,
          `y - ${x0} = ${m}\\left(x - ${y0}\\right)`,
        ],
        explanation: `Implicit differentiation gives $\\frac{dy}{dx} = -\\frac{x}{y} = ${m}$ at $(${x0},${y0})$; point-slope form then gives the tangent line.`,
      };
    },
  },
  {
    id: "g3-implicit-horizontal",
    unit: U3,
    topic: "implicit-differentiation",
    difficulty: "hard",
    manifestation: "implicit-differentiation:horizontal-vertical",
    build: (r: RNG) => {
      const b = ri(r, 2, 7);
      const correct = `\\text{where } x = 0`;
      return {
        prompt: `For the curve $x^{2} + ${b}y^{2} = ${b * 9}$, at which points is the tangent line horizontal?`,
        correct,
        distractors: [`\\text{where } y = 0`, `\\text{where } x = y`, `\\text{nowhere}`],
        explanation: `Differentiating gives $\\frac{dy}{dx} = \\frac{-x}{${b}y}$, which is zero exactly when $x=0$ (and $y\\ne 0$). Where $y=0$ the tangent is vertical instead.`,
      };
    },
  },
  {
    id: "g3-implicit-second",
    unit: U3,
    topic: "implicit-differentiation",
    difficulty: "hard",
    manifestation: "implicit-differentiation:second-derivative",
    build: (r: RNG) => {
      const a = ri(r, 2, 6);
      const correct = `-\\dfrac{${a}}{y^{3}}\\cdot ${a}^{0}`.replace(`\\cdot ${a}^{0}`, "");
      return {
        prompt: `The curve $x^{2} + y^{2} = ${a * a}$ defines $y$ implicitly. Which expression equals $\\dfrac{d^{2}y}{dx^{2}}$?`,
        correct: `-\\dfrac{x^{2} + y^{2}}{y^{3}}`,
        distractors: [`-\\dfrac{x}{y}`, `\\dfrac{x^{2} + y^{2}}{y^{3}}`, `-\\dfrac{1}{y}`],
        explanation: `From $\\frac{dy}{dx} = -\\frac{x}{y}$, differentiating again and substituting gives $\\frac{d^{2}y}{dx^{2}} = -\\frac{y - x\\left(-\\frac{x}{y}\\right)}{y^{2}} = -\\frac{x^{2}+y^{2}}{y^{3}}$.`,
      };
    },
  },
  {
    id: "g3-implicit-error",
    unit: U3,
    topic: "implicit-differentiation",
    difficulty: "medium",
    manifestation: "implicit-differentiation:error-analysis",
    build: (r: RNG) => {
      const a = ri(r, 2, 9);
      const correct = `\\text{The factor } \\dfrac{dy}{dx} \\text{ from differentiating } y^{2} \\text{ was omitted.}`;
      return {
        prompt: `A student differentiates $x^{2} + y^{2} = ${a * a}$ and writes $2x + 2y = 0$. What is the error?`,
        correct,
        distractors: [
          `\\text{The derivative of } x^{2} \\text{ should be } \\dfrac{x}{2}.`,
          `\\text{The right-hand side should differentiate to } \\dfrac{${a}}{2}.`,
          `\\text{The } \\dfrac{dy}{dx} \\text{ factor belongs on } x^{2} \\text{ instead.}`,

        ],
        explanation: `Since $y$ depends on $x$, $\\frac{d}{dx}y^{2} = 2y\\frac{dy}{dx}$. The correct equation is $2x + 2y\\frac{dy}{dx} = 0$.`,
      };
    },
  },
  {
    id: "g3-inverse-table",
    unit: U3,
    topic: "derivatives-of-inverse-functions",
    difficulty: "medium",
    manifestation: "derivatives-of-inverse-functions:table",
    build: (r: RNG) => {
      const a = ri(r, 1, 5);
      const fa = ri(r, 4, 9);
      const fpa = ri(r, 2, 6);
      const correct = frac(1, fpa);
      const body = table(["$x$", "$f(x)$", "$f'(x)$"], [`$${a}$`, `$${fa}$`, `$${fpa}$`]);
      return {
        prompt: `The table gives values for a differentiable, increasing function $f$.\n\n${body}\n\nIf $g$ is the inverse of $f$, find $g'(${fa})$.`,
        correct,
        distractors: opts(correct, [`${fpa}`, frac(1, fa), `${fa}`, frac(1, a)]),
        explanation: `Since $f(${a})=${fa}$, we have $g(${fa})=${a}$ and $g'(${fa}) = \\frac{1}{f'(${a})} = ${correct}$.`,
      };
    },
  },
  {
    id: "g3-inverse-tangent",
    unit: U3,
    topic: "derivatives-of-inverse-functions",
    difficulty: "hard",
    manifestation: "derivatives-of-inverse-functions:tangent-to-inverse",
    build: (r: RNG) => {
      const a = ri(r, 1, 4);
      const fa = ri(r, 5, 9);
      const fpa = ri(r, 2, 6);
      const correct = `y - ${a} = ${frac(1, fpa)}\\left(x - ${fa}\\right)`;
      return {
        prompt: `A differentiable, increasing function $f$ satisfies $f(${a})=${fa}$ and $f'(${a})=${fpa}$. Write an equation of the line tangent to the graph of $f^{-1}$ at $x=${fa}$.`,
        correct,
        distractors: [
          `y - ${fa} = ${frac(1, fpa)}\\left(x - ${a}\\right)`,
          `y - ${a} = ${fpa}\\left(x - ${fa}\\right)`,
          `y - ${fa} = ${fpa}\\left(x - ${a}\\right)`,
        ],
        explanation: `The inverse passes through $(${fa}, ${a})$ with slope $\\frac{1}{f'(${a})} = ${frac(1, fpa)}$.`,
      };
    },
  },
  {
    id: "g3-inverse-concept",
    unit: U3,
    topic: "derivatives-of-inverse-functions",
    difficulty: "medium",
    manifestation: "derivatives-of-inverse-functions:reciprocal-concept",
    build: (r: RNG) => {
      const a = ri(r, 2, 9);
      const correct = `\\left(f^{-1}\\right)'(${a}) = \\dfrac{1}{f'\\left(f^{-1}(${a})\\right)}`;
      return {
        prompt: `Let $f$ be differentiable and invertible. Which statement is correct?`,
        correct,
        distractors: [
          `\\left(f^{-1}\\right)'(${a}) = \\dfrac{1}{f'(${a})}`,
          `\\left(f^{-1}\\right)'(${a}) = f'(${a})`,
          `\\left(f^{-1}\\right)'(${a}) = -\\dfrac{1}{f'(${a})}`,
        ],
        explanation: `The reciprocal must be evaluated at the matching input, $f^{-1}(${a})$, not at $${a}$ itself.`,
      };
    },
  },
  {
    id: "g3-inverse-reflection",
    unit: U3,
    topic: "derivatives-of-inverse-functions",
    difficulty: "medium",
    manifestation: "derivatives-of-inverse-functions:graph-reflection",
    build: (r: RNG) => {
      const s = ri(r, 2, 5);
      const b = ri(r, 1, 4);
      const correct = frac(1, s);
      return {
        prompt: `The graph of the invertible function $f$ shown is a single line segment. What is the slope of the graph of $f^{-1}$?`,
        figure: graph(
          "y = f(x)",
          [
            [0, b],
            [4, b + 4 * s],
          ],
          { xMin: -1, xMax: 5, yMin: 0, yMax: b + 4 * s + 1 },
        ),
        correct,
        distractors: opts(correct, [`${s}`, `${-s}`, frac(-1, s), `${b}`]),
        explanation: `Reflecting a line of slope $${s}$ across $y=x$ produces a line of reciprocal slope $${correct}$.`,
      };
    },
  },
  {
    id: "g3-arcsin-arccos",
    unit: U3,
    topic: "inverse-trig-derivatives",
    difficulty: "medium",
    manifestation: "inverse-trig-derivatives:arcsin-arctan",
    build: (r: RNG) => {
      const which = pick(r, ["arcsin", "arccos", "arctan"] as const);
      const answers = {
        arcsin: `\\dfrac{1}{\\sqrt{1 - x^{2}}}`,
        arccos: `-\\dfrac{1}{\\sqrt{1 - x^{2}}}`,
        arctan: `\\dfrac{1}{1 + x^{2}}`,
      } as const;
      const correct = answers[which];
      return {
        prompt: `Find $\\dfrac{d}{dx}\\left[\\${which} x\\right]$.`,
        correct,
        distractors: opts(correct, [answers.arcsin, answers.arccos, answers.arctan, `\\dfrac{1}{\\sqrt{x^{2} - 1}}`]),
        explanation: `This is the standard derivative of $\\${which} x$.`,
      };
    },
  },
  {
    id: "g3-inverse-trig-evaluate",
    unit: U3,
    topic: "inverse-trig-derivatives",
    difficulty: "medium",
    manifestation: "inverse-trig-derivatives:evaluate",
    build: (r: RNG) => {
      const a = ri(r, 2, 6);
      const correct = frac(1, 1 + a * a);
      return {
        prompt: `If $f(x)=\\arctan x$, find $f'(${a})$.`,
        correct,
        distractors: opts(correct, [frac(1, a * a), frac(a, 1 + a * a), frac(1, 1 - a * a), `${a}`]),
        explanation: `$f'(x)=\\frac{1}{1+x^{2}}$, so $f'(${a}) = \\frac{1}{1 + ${a * a}} = ${correct}$.`,
      };
    },
  },
  {
    id: "g3-inverse-trig-match-integral",
    unit: U3,
    topic: "inverse-trig-derivatives",
    difficulty: "hard",
    manifestation: "inverse-trig-derivatives:match-integral",
    build: (r: RNG) => {
      const a = ri(r, 2, 6);
      const correct = `\\arctan\\left(\\dfrac{x}{${a}}\\right)\\cdot\\dfrac{1}{${a}} + C`;
      return {
        prompt: `Which antiderivative form matches $\\displaystyle\\int\\frac{dx}{x^{2} + ${a * a}}$?`,
        correct,
        distractors: [
          `\\arcsin\\left(\\dfrac{x}{${a}}\\right) + C`,
          `\\dfrac{1}{${a}}\\ln\\left|x^{2} + ${a * a}\\right| + C`,
          `${a}\\arctan\\left(\\dfrac{x}{${a}}\\right) + C`,
        ],
        explanation: `Recognizing the arctangent pattern $\\int\\frac{dx}{x^{2}+a^{2}} = \\frac{1}{a}\\arctan\\frac{x}{a} + C$ with $a=${a}$ gives the answer.`,
      };
    },
  },
  {
    id: "g3-inverse-trig-context",
    unit: U3,
    topic: "inverse-trig-derivatives",
    difficulty: "hard",
    manifestation: "inverse-trig-derivatives:context",
    build: (r: RNG) => {
      const d = ri(r, 2, 8);
      const correct = `\\text{radians per second}`;
      return {
        prompt: `A camera $${d}$ meters from a straight track turns to follow a car, so the viewing angle satisfies $\\theta = \\arctan\\!\\left(\\dfrac{x}{${d}}\\right)$, where $x$ is measured in meters and time in seconds. What are the units of $\\dfrac{d\\theta}{dt}$?`,
        correct,
        distractors: [
          `\\text{meters per second}`,
          `\\text{seconds per radian}`,
          `\\text{meters per radian}`,
        ],
        explanation: `$\\theta$ is an angle in radians and $t$ is in seconds, so the derivative measures radians per second.`,
      };
    },
  },
  {
    id: "g3-higher-order-pattern",
    unit: U3,
    topic: "higher-order-derivatives",
    difficulty: "hard",
    manifestation: "higher-order-derivatives:pattern",
    build: (r: RNG) => {
      const a = ri(r, 2, 6);
      const n = pick(r, [4, 8, 12] as const);
      const correct = `${a}\\sin x`;
      return {
        prompt: `If $f(x)=${a}\\sin x$, find $f^{(${n})}(x)$.`,
        correct,
        distractors: [`${a}\\cos x`, `-${a}\\sin x`, `-${a}\\cos x`],
        explanation: `Derivatives of sine cycle with period $4$, and $${n}$ is a multiple of $4$, so $f^{(${n})} = f = ${a}\\sin x$.`,
      };
    },
  },
  {
    id: "g3-higher-order-graph",
    unit: U3,
    topic: "higher-order-derivatives",
    difficulty: "medium",
    manifestation: "higher-order-derivatives:from-graph",
    build: (r: RNG) => {
      const a = ri(r, 1, 3);
      const s = ri(r, 2, 4);
      const pts: Array<[number, number]> = [
        [0, 4],
        [a + 1, 4 - s],
        [a + 4, 4 - s + 2 * s],
      ];
      const correct = `f''(x) < 0`;
      return {
        prompt: `The graph of $f'$ shown consists of line segments. Which statement about $f''$ holds for $0 < x < ${a + 1}$?`,
        figure: graph("y = f'(x)", pts, { xMin: -1, xMax: a + 5, yMin: 0, yMax: 8 }),
        correct,
        distractors: [`f''(x) > 0`, `f''(x) = 0`, `f''(x) \\text{ is undefined}`],
        explanation: `On that interval the graph of $f'$ is decreasing, and $f''$ is the slope of $f'$, so $f'' < 0$ there.`,
      };
    },
  },
  {
    id: "g3-higher-order-context",
    unit: U3,
    topic: "higher-order-derivatives",
    difficulty: "medium",
    manifestation: "higher-order-derivatives:context-meaning",
    build: (r: RNG) => {
      const t = ri(r, 2, 9);
      const correct = `\\text{The population is increasing at a decreasing rate at time } t=${t}.`;
      return {
        prompt: `Let $P(t)$ be a population at time $t$ years. If $P'(${t}) > 0$ and $P''(${t}) < 0$, what is happening at $t=${t}$?`,
        correct,
        distractors: [
          `\\text{The population is decreasing at time } t=${t}.`,
          `\\text{The population is increasing at an increasing rate at time } t=${t}.`,
          `\\text{The population has a maximum at time } t=${t}.`,
        ],
        explanation: `A positive first derivative means growth; a negative second derivative means that growth rate is itself falling.`,
      };
    },
  },
  {
    id: "g3-higher-order-table",
    unit: U3,
    topic: "higher-order-derivatives",
    difficulty: "medium",
    manifestation: "higher-order-derivatives:table",
    build: (r: RNG) => {
      const a = ri(r, 2, 5);
      const step = 2;
      const xs = [a - step, a, a + step];
      const d0 = ri(r, 2, 6);
      const d2 = d0 + ri(r, 2, 8);
      const ys = [`${d0}`, `${ri(r, 2, 9)}`, `${d2}`];
      const slope = (d2 - d0) / (2 * step);
      const correct = dec(slope, 3);
      return {
        prompt: `Values of $f'$ are given in the table.\n\n${tablePair("f'(x)", xs, ys)}\n\nUse a symmetric difference quotient to estimate $f''(${a})$.`,
        correct,
        distractors: opts(correct, [dec(d2 - d0, 3), dec(-slope, 3), dec(slope * 2, 3), `0`]),
        explanation: `Estimate with $\\frac{f'(${xs[2]}) - f'(${xs[0]})}{${xs[2]} - ${xs[0]}} = \\frac{${d2} - ${d0}}{${2 * step}} = ${correct}$.`,
      };
    },
  },
);

/* ------------------------------------------------------------------ */
/* Unit 4 — Contextual applications of differentiation                 */
/* ------------------------------------------------------------------ */

const U4 = "unit-4-contextual-applications-of-differentiation";

GAP_TEMPLATES.push(
  {
    id: "g4-similar-triangles",
    unit: U4,
    topic: "related-rates",
    difficulty: "hard",
    manifestation: "related-rates:similar-triangles",
    calculator: true,
    build: (r: RNG) => {
      const H = ri(r, 12, 20);
      const h = ri(r, 5, 6);
      const v = ri(r, 2, 5);
      const rate = (v * H) / (H - h);
      const correct = dec(rate, 3);
      return {
        prompt: `A street lamp sits atop a $${H}$-foot pole. A person $${h}$ feet tall walks away from the pole at $${v}$ feet per second. How fast is the tip of the person's shadow moving away from the pole, in feet per second?`,
        correct,
        distractors: opts(correct, [dec(v, 3), dec((v * h) / (H - h), 3), dec((v * H) / h, 3), dec(rate / 2, 3)]),
        explanation: `Similar triangles give $\\frac{s}{${H}} = \\frac{s - x}{${h}}$, so $s = \\frac{${H}}{${H - h}}x$. Differentiating, $\\frac{ds}{dt} = \\frac{${H}}{${H - h}}(${v}) = ${correct}$.`,
      };
    },
  },
  {
    id: "g4-trig-angle",
    unit: U4,
    topic: "related-rates",
    difficulty: "hard",
    manifestation: "related-rates:trig-angle",
    calculator: true,
    build: (r: RNG) => {
      const d = ri(r, 3, 9);
      const v = ri(r, 2, 6);
      const rate = v / d;
      const correct = dec(rate, 4);
      return {
        prompt: `A balloon rises vertically from a point $${d}$ meters from an observer, at $${v}$ meters per second. When the balloon is at the observer's eye level height above the launch point is $0$, how fast is the angle of elevation increasing, in radians per second?`,
        correct,
        distractors: opts(correct, [dec(v * d, 4), dec(d / v, 4), dec(rate / 2, 4), `0`]),
        explanation: `With $\\tan\\theta = \\frac{y}{${d}}$, differentiating gives $\\sec^{2}\\theta\\,\\frac{d\\theta}{dt} = \\frac{1}{${d}}\\frac{dy}{dt}$. At $y=0$, $\\theta = 0$ and $\\sec^{2}\\theta = 1$, so $\\frac{d\\theta}{dt} = \\frac{${v}}{${d}} = ${correct}$.`,
      };
    },
  },
  {
    id: "g4-related-setup",
    unit: U4,
    topic: "related-rates",
    difficulty: "medium",
    manifestation: "related-rates:setup",
    build: (r: RNG) => {
      const rr = ri(r, 2, 9);
      const correct = `\\dfrac{dV}{dt} = 4\\pi r^{2}\\dfrac{dr}{dt}`;
      return {
        prompt: `A spherical balloon of radius $r$ has volume $V = \\dfrac{4}{3}\\pi r^{3}$. When the radius is $${rr}$ centimeters and growing, which equation correctly relates the rates?`,
        correct,
        distractors: [
          `\\dfrac{dV}{dt} = 4\\pi r^{2}`,
          `\\dfrac{dV}{dt} = \\dfrac{4}{3}\\pi r^{3}\\dfrac{dr}{dt}`,
          `\\dfrac{dV}{dr} = 4\\pi r^{2}\\dfrac{dr}{dt}`,
        ],
        explanation: `Differentiating $V=\\frac{4}{3}\\pi r^{3}$ with respect to time gives $\\frac{dV}{dt} = 4\\pi r^{2}\\frac{dr}{dt}$; the chain-rule factor $\\frac{dr}{dt}$ is required.`,
      };
    },
  },
  {
    id: "g4-sign-interpretation",
    unit: U4,
    topic: "related-rates",
    difficulty: "medium",
    manifestation: "related-rates:sign-interpretation",
    build: (r: RNG) => {
      const v = ri(r, 2, 9);
      const correct = `\\text{The area is shrinking at } ${v} \\text{ square centimeters per second.}`;
      return {
        prompt: `A square metal plate cools, and its area $A$ satisfies $\\dfrac{dA}{dt} = -${v}$ square centimeters per second. What does this mean?`,
        correct,
        distractors: [
          `\\text{The area is growing at } ${v} \\text{ square centimeters per second.}`,
          `\\text{The side length is shrinking at } ${v} \\text{ centimeters per second.}`,
          `\\text{The area is } -${v} \\text{ square centimeters.}`,
        ],
        explanation: `A negative rate of change of area means the area is decreasing; the rate describes area, not side length, and is not itself an area.`,
      };
    },
  },
  {
    id: "g4-linearization-over-under",
    unit: U4,
    topic: "linearization",
    difficulty: "hard",
    manifestation: "linearization:over-under",
    build: (r: RNG) => {
      const c = ri(r, 2, 9);
      const correct = `\\text{an overestimate, because the graph is concave down}`;
      return {
        prompt: `The tangent line to $f(x)=\\sqrt{x}$ at $x=${c * c}$ is used to approximate $\\sqrt{${c * c} + 1}$. Is the approximation an overestimate or an underestimate, and why?`,
        correct,
        distractors: [
          `\\text{an underestimate, because the graph is concave up}`,
          `\\text{an overestimate, because the graph is increasing}`,
          `\\text{exact, because the tangent line touches the graph}`,
        ],
        explanation: `$f''(x) = -\\frac{1}{4}x^{-3/2} < 0$, so the graph is concave down and lies below its tangent line, making the tangent-line value too large.`,
      };
    },
  },
  {
    id: "g4-linearization-context",
    unit: U4,
    topic: "linearization",
    difficulty: "medium",
    manifestation: "linearization:context",
    build: (r: RNG) => {
      const t = ri(r, 2, 8);
      const v = ri(r, 20, 60);
      const rate = ri(r, 2, 6);
      const dt = pick(r, [0.2, 0.5] as const);
      const est = v + rate * dt;
      const correct = dec(est, 2);
      return {
        prompt: `A tank contains $${v}$ liters at time $t=${t}$ minutes, and the volume is increasing at $${rate}$ liters per minute at that moment. Use a linear approximation to estimate the volume at $t=${t + dt}$ minutes.`,
        correct,
        distractors: opts(correct, [dec(v + rate, 2), dec(v - rate * dt, 2), dec(v * dt, 2), dec(v + rate * dt * 2, 2)]),
        explanation: `The tangent-line estimate is $V(${t}) + V'(${t})\\Delta t = ${v} + ${rate}(${dt}) = ${correct}$ liters.`,
      };
    },
  },
  {
    id: "g4-linearization-table",
    unit: U4,
    topic: "linearization",
    difficulty: "medium",
    manifestation: "linearization:table",
    build: (r: RNG) => {
      const a = ri(r, 2, 6);
      const fa = ri(r, 5, 15);
      const fpa = ri(r, 2, 6);
      const h = pick(r, [0.1, 0.3] as const);
      const est = fa + fpa * h;
      const correct = dec(est, 2);
      const body = table(["$x$", "$f(x)$", "$f'(x)$"], [`$${a}$`, `$${fa}$`, `$${fpa}$`]);
      return {
        prompt: `The table gives values of a differentiable function $f$.\n\n${body}\n\nUse the tangent line at $x=${a}$ to approximate $f(${a + h})$.`,
        correct,
        distractors: opts(correct, [dec(fa + fpa, 2), dec(fa - fpa * h, 2), dec(fa * h, 2), dec(fpa, 2)]),
        explanation: `$f(${a + h}) \\approx f(${a}) + f'(${a})(${h}) = ${fa} + ${fpa}(${h}) = ${correct}$.`,
      };
    },
  },
  {
    id: "g4-linearization-reverse",
    unit: U4,
    topic: "linearization",
    difficulty: "hard",
    manifestation: "linearization:reverse",
    build: (r: RNG) => {
      const a = ri(r, 2, 8);
      const b = ri(r, 2, 9);
      const correct = `f(${a}) = ${b}\\text{ and }f'(${a}) = ${b}`;
      return {
        prompt: `The tangent line to a differentiable function $f$ at $x=${a}$ is $y = ${b}\\left(x - ${a}\\right) + ${b}$. What are $f(${a})$ and $f'(${a})$?`,
        correct,
        distractors: [
          `f(${a}) = ${a}\\text{ and }f'(${a}) = ${b}`,
          `f(${a}) = ${b}\\text{ and }f'(${a}) = ${a}`,
          `f(${a}) = ${b + a}\\text{ and }f'(${a}) = ${b}`,
        ],
        explanation: `Point-slope form shows the line passes through $(${a}, ${b})$ with slope $${b}$, so $f(${a})=${b}$ and $f'(${a})=${b}$.`,
      };
    },
  },
  {
    id: "g4-lhopital-inf",
    unit: U4,
    topic: "lhopitals-rule",
    difficulty: "medium",
    manifestation: "lhopitals-rule:infinity-over-infinity",
    build: (r: RNG) => {
      const p = ri(r, 2, 9);
      const q = ri(r, 2, 9);
      const correct = frac(p, q);
      return {
        prompt: `Evaluate $\\displaystyle\\lim_{x\\to\\infty}\\frac{${p}x + \\ln x}{${q}x}$.`,
        correct,
        distractors: opts(correct, [frac(q, p), `0`, `\\infty`, frac(p + 1, q)]),
        explanation: `The form is $\\infty/\\infty$; applying the rule gives $\\lim\\frac{${p} + \\frac{1}{x}}{${q}} = ${correct}$.`,
      };
    },
  },
  {
    id: "g4-lhopital-repeated",
    unit: U4,
    topic: "lhopitals-rule",
    difficulty: "hard",
    manifestation: "lhopitals-rule:repeated",
    build: (r: RNG) => {
      const a = ri(r, 2, 6);
      const b = ri(r, 2, 8);
      const correct = frac(a * a, 2 * b);
      return {
        prompt: `Evaluate $\\displaystyle\\lim_{x\\to 0}\\frac{e^{${a}x} - ${a}x - 1}{${b}x^{2}}$.`,
        correct,
        distractors: opts(correct, [frac(a, 2 * b), frac(a * a, b), `0`, frac(a, b)]),
        explanation: `Both numerator and denominator vanish twice; applying the rule twice gives $\\frac{${a}^{2}e^{${a}x}}{2\\cdot ${b}}\\to ${correct}$.`,
      };
    },
  },
  {
    id: "g4-lhopital-rewrite",
    unit: U4,
    topic: "lhopitals-rule",
    difficulty: "hard",
    manifestation: "lhopitals-rule:rewrite-first",
    build: (r: RNG) => {
      const a = ri(r, 2, 9);
      const correct = `\\text{Rewrite as } \\dfrac{\\ln x}{1/x} \\text{ or } \\dfrac{x}{1/\\ln x} \\text{ to obtain a quotient.}`;
      return {
        prompt: `To evaluate $\\displaystyle\\lim_{x\\to 0^{+}} ${a}x\\ln x$, what must be done before the rule can be applied?`,
        correct,
        distractors: [
          `\\text{Apply the rule directly to the product } ${a}x\\ln x.`,
          `\\text{Rewrite as } \\dfrac{${a}x}{\\ln x} \\text{ and apply the rule.}`,
          `\\text{Rewrite as } \\dfrac{\\ln x}{${a}x} \\text{ and apply the rule.}`,

        ],
        explanation: `The rule applies only to quotients of the form $0/0$ or $\\infty/\\infty$, so the product must first be written as a quotient.`,
      };
    },
  },
  {
    id: "g4-lhopital-applicability",
    unit: U4,
    topic: "lhopitals-rule",
    difficulty: "medium",
    manifestation: "lhopitals-rule:applicability",
    build: (r: RNG) => {
      const a = ri(r, 2, 9);
      const b = ri(r, 2, 9);
      const correct = `\\text{The rule does not apply; the limit is } \\dfrac{${a}}{${b}}\\text{ by substitution.}`;
      return {
        prompt: `A student applies L'Hôpital's rule to $\\displaystyle\\lim_{x\\to 0}\\frac{x + ${a}}{x + ${b}}$. Which statement is correct?`,
        correct: `\\text{The rule does not apply; the limit is } ${frac(a, b)} \\text{ by substitution.}`,
        distractors: [
          `\\text{The rule applies and gives } 1.`,
          `\\text{The rule applies and gives } ${frac(b, a)}.`,
          `\\text{The limit does not exist.}`,
        ],
        explanation: `At $x=0$ the expression is $\\frac{${a}}{${b}}$, not an indeterminate form, so the rule is not applicable and direct substitution gives the limit.`,
      };
    },
  },
  {
    id: "g4-lhopital-parameter",
    unit: U4,
    topic: "lhopitals-rule",
    difficulty: "hard",
    manifestation: "lhopitals-rule:parameter",
    build: (r: RNG) => {
      const L = ri(r, 2, 8);
      const b = ri(r, 2, 6);
      const k = L * b;
      const correct = `${k}`;
      return {
        prompt: `For what value of $k$ does $\\displaystyle\\lim_{x\\to 0}\\frac{e^{kx} - 1}{${b}x} = ${L}$?`,
        correct,
        distractors: opts(correct, [`${L}`, `${b}`, frac(L, b), `${k + 1}`]),
        explanation: `The rule gives $\\lim\\frac{ke^{kx}}{${b}} = \\frac{k}{${b}}$. Setting $\\frac{k}{${b}} = ${L}$ gives $k = ${k}$.`,
      };
    },
  },
  {
    id: "g4-speed-increasing",
    unit: U4,
    topic: "rectilinear-motion",
    difficulty: "hard",
    manifestation: "rectilinear-motion:speed-increasing",
    build: (r: RNG) => {
      const correct = `\\text{when } v \\text{ and } a \\text{ have the same sign}`;
      return {
        prompt: `A particle moves along a line with velocity $v(t)$ and acceleration $a(t)$. The particle's speed is increasing exactly:`,
        correct,
        distractors: [
          `\\text{when } a(t) > 0`,
          `\\text{when } v(t) > 0`,
          `\\text{when } v \\text{ and } a \\text{ have opposite signs}`,
        ],
        explanation: `Speed is $|v|$, and it grows exactly when velocity moves away from zero, which happens when velocity and acceleration share a sign.`,
      };
    },
  },
  {
    id: "g4-graph-velocity",
    unit: U4,
    topic: "rectilinear-motion",
    difficulty: "medium",
    manifestation: "rectilinear-motion:graph-velocity",
    build: (r: RNG) => {
      const c = ri(r, 2, 4);
      const pts: Array<[number, number]> = [
        [0, -ri(r, 2, 4)],
        [c, 0],
        [c + 3, ri(r, 2, 5)],
      ];
      const correct = `\\text{The particle changes direction at } t = ${c}.`;
      return {
        prompt: `The graph of a particle's velocity $v$ consists of the line segments shown. Which statement is true?`,
        figure: graph("y = v(t)", pts, { xMin: -1, xMax: c + 4, yMin: -5, yMax: 6 }),
        correct,
        distractors: [
          `\\text{The particle is at rest for } 0 < t < ${c}.`,
          `\\text{The particle changes direction at } t = 0.`,
          `\\text{The particle's acceleration is negative throughout.}`,
        ],
        explanation: `Velocity crosses zero at $t=${c}$, changing from negative to positive, so the direction of motion reverses there. The graph's positive slope means acceleration is positive.`,
      };
    },
  },
  {
    id: "g4-table-motion",
    unit: U4,
    topic: "rectilinear-motion",
    difficulty: "medium",
    manifestation: "rectilinear-motion:table-motion",
    build: (r: RNG) => {
      const xs = [0, 2, 4, 6];
      const v0 = ri(r, 2, 5);
      const v3 = v0 + ri(r, 4, 10);
      const ys = [`${v0}`, `${v0 + 1}`, `${v3 - 1}`, `${v3}`];
      const est = (v3 - (v3 - 1)) / 2;
      const correct = dec(est, 3);
      return {
        prompt: `Values of a particle's velocity $v$, in meters per second, are given for time $t$ in seconds.\n\n${tablePair("v(t)", xs, ys)}\n\nUse the data on $[4,6]$ to estimate the acceleration at $t=5$, in meters per second squared.`,
        correct,
        distractors: opts(correct, [dec(v3 - (v3 - 1), 3), dec(-est, 3), dec(est * 4, 3), `0`]),
        explanation: `Estimate with the difference quotient $\\frac{v(6) - v(4)}{6 - 4} = \\frac{${v3} - ${v3 - 1}}{2} = ${correct}$.`,
      };
    },
  },
  {
    id: "g4-displacement-vs-distance",
    unit: U4,
    topic: "rectilinear-motion",
    difficulty: "medium",
    manifestation: "rectilinear-motion:displacement-vs-distance",
    build: (r: RNG) => {
      const d = ri(r, 3, 9);
      const back = ri(r, 1, d - 1);
      const correct = `\\text{displacement } ${d - back}\\text{ meters, distance } ${d + back}\\text{ meters}`;
      return {
        prompt: `A particle moves $${d}$ meters in the positive direction, then $${back}$ meters in the negative direction. What are its displacement and total distance traveled?`,
        correct,
        distractors: [
          `\\text{displacement } ${d + back}\\text{ meters, distance } ${d - back}\\text{ meters}`,
          `\\text{displacement } ${d}\\text{ meters, distance } ${d}\\text{ meters}`,
          `\\text{displacement } ${d - back}\\text{ meters, distance } ${d - back}\\text{ meters}`,
        ],
        explanation: `Displacement is the net change in position, $${d} - ${back} = ${d - back}$. Total distance adds the magnitudes of both legs, $${d} + ${back} = ${d + back}$.`,
      };
    },
  },
  {
    id: "g4-rate-units",
    unit: U4,
    topic: "rates-of-change-in-context",
    difficulty: "easy",
    manifestation: "rates-of-change-in-context:units",
    build: (r: RNG) => {
      const t = ri(r, 2, 9);
      const correct = `\\text{degrees Celsius per hour}`;
      return {
        prompt: `Let $T(t)$ be the temperature, in degrees Celsius, of a liquid after $t$ hours. What are the units of $T'(${t})$?`,
        correct,
        distractors: [
          `\\text{degrees Celsius}`,
          `\\text{hours per degree Celsius}`,
          `\\text{degrees Celsius per hour squared}`,
        ],
        explanation: `A derivative carries the output units divided by the input units: degrees Celsius per hour.`,
      };
    },
  },
  {
    id: "g4-compare-rates",
    unit: U4,
    topic: "rates-of-change-in-context",
    difficulty: "medium",
    manifestation: "rates-of-change-in-context:compare-rates",
    build: (r: RNG) => {
      const xs = [0, 3, 6, 9];
      const y0 = ri(r, 2, 5);
      const y1 = y0 + ri(r, 2, 4);
      const y2 = y1 + ri(r, 8, 14);
      const y3 = y2 + ri(r, 1, 3);
      const ys = [`${y0}`, `${y1}`, `${y2}`, `${y3}`];
      const correct = `[3,6]`;
      return {
        prompt: `The table gives the volume $V$, in liters, of liquid in a tank at time $t$ hours.\n\n${tablePair("V(t)", xs, ys)}\n\nOver which interval is the average rate of change of $V$ greatest?`,
        correct,
        distractors: [`[0,3]`, `[6,9]`, `[0,9]`],
        explanation: `The intervals all have width $3$, so the largest change wins: $${y2 - y1}$ liters on $[3,6]$ exceeds $${y1 - y0}$ and $${y3 - y2}$.`,
      };
    },
  },
  {
    id: "g4-graph-rate",
    unit: U4,
    topic: "rates-of-change-in-context",
    difficulty: "medium",
    manifestation: "rates-of-change-in-context:graph-rate",
    build: (r: RNG) => {
      const c = ri(r, 2, 4);
      const peak = ri(r, 5, 8);
      const pts: Array<[number, number]> = [
        [0, 1],
        [c, peak],
        [c + 4, 1],
      ];
      const correct = `\\text{The volume is increasing throughout, fastest at } t = ${c}\\text{ hours or earlier.}`;
      return {
        prompt: `The graph shows $R$, the rate at which water enters a tank, in liters per hour. Which statement about the tank's volume on $0 < t < ${c + 4}$ is true?`,
        figure: graph("y = R(t)", pts, { xMin: -1, xMax: c + 5, yMin: 0, yMax: peak + 2 }),
        correct,
        distractors: [
          `\\text{The volume decreases after } t = ${c}\\text{ hours.}`,
          `\\text{The volume is greatest at } t = ${c}\\text{ hours.}`,
          `\\text{The volume is constant after } t = ${c}\\text{ hours.}`,
        ],
        explanation: `$R$ stays positive, so volume always increases; after $t=${c}$ the rate falls but remains positive, so the volume grows more slowly rather than decreasing.`,
      };
    },
  },
  {
    id: "g4-non-motion-rate",
    unit: U4,
    topic: "rates-of-change-in-context",
    difficulty: "medium",
    manifestation: "rates-of-change-in-context:non-motion",
    build: (r: RNG) => {
      const k = ri(r, 2, 6);
      const c = ri(r, 10, 40);
      const t = ri(r, 2, 5);
      const v = 2 * k * t;
      const correct = `${v}`;
      return {
        prompt: `A colony's mass, in grams, is $M(t)=${k}t^{2} + ${c}$ after $t$ days. How fast is the mass growing at $t=${t}$ days, in grams per day?`,
        correct,
        distractors: opts(correct, [`${k * t * t + c}`, `${k * t}`, `${2 * k}`, `${v + c}`]),
        explanation: `$M'(t) = ${2 * k}t$, so $M'(${t}) = ${v}$ grams per day.`,
      };
    },
  },
);

/* ------------------------------------------------------------------ */
/* Unit 5 — Analytical applications of differentiation                 */
/* ------------------------------------------------------------------ */

const U5 = "unit-5-analytical-applications-of-differentiation";

GAP_TEMPLATES.push(
  {
    id: "g5-mvt-hypotheses",
    unit: U5,
    topic: "mean-value-theorem",
    difficulty: "hard",
    manifestation: "mean-value-theorem:hypotheses",
    build: (r: RNG) => {
      const a = ri(r, 1, 4);
      const b = a + ri(r, 2, 5);
      const correct = `\\text{No, because } f \\text{ is not differentiable at } x = ${a + 1}.`;
      return {
        prompt: `Does the Mean Value Theorem apply to $f(x)=\\left|x - ${a + 1}\\right|$ on $[${a}, ${b}]$?`,
        correct,
        distractors: [
          `\\text{Yes, because } f \\text{ is continuous on } [${a},${b}].`,
          `\\text{No, because } f \\text{ is not continuous on } [${a},${b}].`,
          `\\text{Yes, and } c = ${a + 1}.`,
        ],
        explanation: `The theorem needs differentiability on the open interval. The absolute value has a corner at $x=${a + 1}$, which lies inside $(${a},${b})$, so a hypothesis fails even though $f$ is continuous.`,
      };
    },
  },
  {
    id: "g5-mvt-table",
    unit: U5,
    topic: "mean-value-theorem",
    difficulty: "medium",
    manifestation: "mean-value-theorem:table-conclusion",
    build: (r: RNG) => {
      const xs = [0, 4];
      const f0 = ri(r, 2, 6);
      const slope = ri(r, 2, 5);
      const f4 = f0 + 4 * slope;
      const correct = `f'(c) = ${slope} \\text{ for some } c \\text{ in } (0,4)`;
      const body = table(["$x$", "$0$", "$4$"], ["$f(x)$", `$${f0}$`, `$${f4}$`]);
      return {
        prompt: `A differentiable function $f$ has the values shown.\n\n${body}\n\nWhich conclusion is guaranteed?`,
        correct,
        distractors: [
          `f'(x) = ${slope} \\text{ for every } x \\text{ in } (0,4)`,
          `f'(c) = ${f4 - f0} \\text{ for some } c \\text{ in } (0,4)`,
          `f \\text{ is increasing on all of } (0,4)`,
        ],
        explanation: `The Mean Value Theorem guarantees one point where the derivative equals the average rate $\\frac{${f4} - ${f0}}{4} = ${slope}$. It says nothing about every point, and ${xs.length === 2 ? "the total change" : ""} $${f4 - f0}$ is not a rate.`,
      };
    },
  },
  {
    id: "g5-mvt-graph",
    unit: U5,
    topic: "mean-value-theorem",
    difficulty: "medium",
    manifestation: "mean-value-theorem:graph",
    build: (r: RNG) => {
      const s = ri(r, 2, 5);
      const pts: Array<[number, number]> = [
        [0, 1],
        [2, 1 + s],
        [4, 1 + 4 * s],
      ];
      const avg = (pts[2][1] - pts[0][1]) / 4;
      const correct = dec(avg, 3);
      return {
        prompt: `The graph of the differentiable function $f$ passes through the plotted points shown. What slope does the Mean Value Theorem guarantee $f'$ attains somewhere on $(0,4)$?`,
        figure: graph("y = f(x)", pts, { xMin: -1, xMax: 5, yMin: 0, yMax: pts[2][1] + 2 }),
        correct,
        distractors: opts(correct, [dec(s, 3), dec(4 * avg, 3), dec(avg / 2, 3), `0`]),
        explanation: `The average rate of change is $\\frac{${pts[2][1]} - ${pts[0][1]}}{4 - 0} = ${correct}$, and the theorem guarantees $f'$ equals that value somewhere inside the interval.`,
      };
    },
  },
  {
    id: "g5-mvt-context",
    unit: U5,
    topic: "mean-value-theorem",
    difficulty: "medium",
    manifestation: "mean-value-theorem:context",
    build: (r: RNG) => {
      const d = ri(r, 40, 90);
      const t = ri(r, 1, 2);
      const avg = d / t;
      const correct = `\\text{At some moment the car's speed was exactly } ${dec(avg, 2)} \\text{ miles per hour.}`;
      return {
        prompt: `A car travels $${d}$ miles in $${t}$ hour${t > 1 ? "s" : ""} along a straight road, and its position is a differentiable function of time. What does the Mean Value Theorem guarantee?`,
        correct,
        distractors: [
          `\\text{The car's speed was } ${dec(avg, 2)} \\text{ miles per hour for the whole trip.}`,
          `\\text{The car's speed never exceeded } ${dec(avg, 2)} \\text{ miles per hour.}`,
          `\\text{The car's speed was } ${dec(avg, 2)} \\text{ miles per hour at both the start and the end.}`,
        ],
        explanation: `The average speed is $${dec(avg, 2)}$ miles per hour, and the theorem guarantees the instantaneous speed equals that average at least once.`,
      };
    },
  },
  {
    id: "g5-mvt-invalid",
    unit: U5,
    topic: "mean-value-theorem",
    difficulty: "medium",
    manifestation: "mean-value-theorem:invalid-application",
    build: (r: RNG) => {
      const a = ri(r, 1, 5);
      const correct = `\\text{The theorem gives existence of one such } c, \\text{ not uniqueness.}`;
      return {
        prompt: `A student concludes from the Mean Value Theorem that there is exactly one $c$ in $(0,${a + 3})$ with $f'(c)$ equal to the average rate of change. Why is this reasoning wrong?`,
        correct,
        distractors: [
          `\\text{The theorem requires } f \\text{ to be increasing.}`,
          `\\text{The theorem applies only on closed intervals.}`,
          `\\text{The theorem concerns } f, \\text{ not } f'.`,
        ],
        explanation: `The conclusion is an existence statement: at least one such $c$ exists, and there may be many.`,
      };
    },
  },
  {
    id: "g5-critical-undefined",
    unit: U5,
    topic: "critical-points",
    difficulty: "medium",
    manifestation: "critical-points:undefined-derivative",
    build: (r: RNG) => {
      const a = ri(r, 1, 8);
      const correct = `x = ${a}`;
      return {
        prompt: `Find every critical number of $f(x)=\\left(x - ${a}\\right)^{\\frac{2}{3}}$.`,
        correct,
        distractors: [
          `x = ${-a}`,
          `x = 0`,
          `\\text{There are no critical numbers.}`,
        ],
        explanation: `$f'(x) = \\frac{2}{3}(x-${a})^{-1/3}$ is never zero but fails to exist at $x=${a}$, which is in the domain of $f$, so $x=${a}$ is a critical number.`,
      };
    },
  },
  {
    id: "g5-critical-not-extremum",
    unit: U5,
    topic: "critical-points",
    difficulty: "medium",
    manifestation: "critical-points:not-extremum",
    build: (r: RNG) => {
      const a = ri(r, 1, 6);
      const correct = `f\\text{ has a critical number at }x=${a}\\text{ but no extremum there.}`;
      return {
        prompt: `Let $f(x)=\\left(x - ${a}\\right)^{3}$. Which statement is true?`,
        correct,
        distractors: [
          `f\\text{ has a local minimum at }x=${a}.`,
          `f\\text{ has a local maximum at }x=${a}.`,
          `f\\text{ has no critical number.}`,
        ],
        explanation: `$f'(x)=3(x-${a})^{2}$ is zero at $x=${a}$ but does not change sign there, so $f$ increases through the point with no extremum.`,
      };
    },
  },
  {
    id: "g5-critical-graph",
    unit: U5,
    topic: "critical-points",
    difficulty: "medium",
    manifestation: "critical-points:graph",
    build: (r: RNG) => {
      const c1 = ri(r, 1, 2);
      const c2 = c1 + ri(r, 2, 3);
      const pts: Array<[number, number]> = [
        [0, -2],
        [c1, 0],
        [(c1 + c2) / 2, 3],
        [c2, 0],
        [c2 + 2, -3],
      ];
      const correct = `x = ${c1}\\text{ and }x = ${c2}`;
      return {
        prompt: `The graph of $f'$ consists of the line segments shown. At which values of $x$ does $f$ have a critical number?`,
        figure: graph("y = f'(x)", pts, { xMin: -1, xMax: c2 + 3, yMin: -4, yMax: 4 }),
        correct,
        distractors: [
          `x = ${(c1 + c2) / 2}`,
          `x = ${c1}\\text{ only}`,
          `x = 0\\text{ and }x = ${c2 + 2}`,
        ],
        explanation: `Critical numbers occur where $f'=0$, which the graph shows at $x=${c1}$ and $x=${c2}$. The peak of $f'$ is where $f''=0$, not a critical number of $f$.`,
      };
    },
  },
  {
    id: "g5-evt-hypotheses",
    unit: U5,
    topic: "critical-points",
    difficulty: "medium",
    manifestation: "critical-points:evt-hypotheses",
    build: (r: RNG) => {
      const a = ri(r, 0, 3);
      const b = a + ri(r, 2, 6);
      const correct = `f\\text{ continuous on the closed interval }[${a},${b}]`;
      return {
        prompt: `Which hypothesis guarantees that $f$ attains both an absolute maximum and an absolute minimum on $[${a},${b}]$?`,
        correct,
        distractors: [
          `f\\text{ differentiable on the open interval }(${a},${b})`,
          `f\\text{ continuous on the open interval }(${a},${b})`,
          `f\\text{ increasing on }[${a},${b}]`,
        ],
        explanation: `The Extreme Value Theorem requires continuity on a closed, bounded interval; openness or differentiability alone is not enough.`,
      };
    },
  },
  {
    id: "g5-fdt-intervals",
    unit: U5,
    topic: "first-derivative-test",
    difficulty: "medium",
    manifestation: "first-derivative-test:intervals",
    build: (r: RNG) => {
      const a = ri(r, 1, 4);
      const b = a + ri(r, 2, 5);
      const correct = `\\left(${a},${b}\\right)`;
      return {
        prompt: `A differentiable function satisfies $f'(x) = -\\left(x - ${a}\\right)\\left(x - ${b}\\right)$. On which interval is $f$ increasing?`,
        correct,
        distractors: [
          `\\left(-\\infty,${a}\\right)`,
          `\\left(${b},\\infty\\right)`,
          `\\left(-\\infty,\\infty\\right)`,
        ],
        explanation: `The product $(x-${a})(x-${b})$ is negative between the roots, so $f' = -(x-${a})(x-${b})$ is positive there and $f$ increases on $(${a},${b})$.`,
      };
    },
  },
  {
    id: "g5-fdt-fprime-graph",
    unit: U5,
    topic: "first-derivative-test",
    difficulty: "medium",
    manifestation: "first-derivative-test:from-fprime-graph",
    build: (r: RNG) => {
      const c = ri(r, 2, 4);
      const pts: Array<[number, number]> = [
        [0, 3],
        [c, 0],
        [c + 3, -3],
      ];
      const correct = `\\text{a local maximum at } x = ${c}`;
      return {
        prompt: `The graph of $f'$ shown consists of line segments. What happens to $f$ at $x=${c}$?`,
        figure: graph("y = f'(x)", pts, { xMin: -1, xMax: c + 4, yMin: -4, yMax: 4 }),
        correct,
        distractors: [
          `\\text{a local minimum at } x = ${c}`,
          `\\text{an inflection point at } x = ${c}`,
          `\\text{nothing; } f \\text{ is increasing through } x = ${c}`,
        ],
        explanation: `$f'$ changes from positive to negative at $x=${c}$, so $f$ changes from increasing to decreasing: a local maximum.`,
      };
    },
  },
  {
    id: "g5-fdt-table",
    unit: U5,
    topic: "first-derivative-test",
    difficulty: "medium",
    manifestation: "first-derivative-test:table-sign",
    build: (r: RNG) => {
      const c = ri(r, 2, 5);
      const xs = [c - 1, c, c + 1];
      const ys = [`-${ri(r, 2, 6)}`, `0`, `${ri(r, 2, 6)}`];
      const correct = `f\\text{ has a local minimum at }x=${c}.`;
      return {
        prompt: `Values of $f'$ for a differentiable function are given, and $f'$ is continuous.\n\n${tablePair("f'(x)", xs, ys)}\n\nWhich conclusion is best supported?`,
        correct,
        distractors: [
          `f\\text{ has a local maximum at }x=${c}.`,
          `f\\text{ has an inflection point at }x=${c}.`,
          `f\\text{ is decreasing on }[${c - 1},${c + 1}].`,
        ],
        explanation: `The sampled values show $f'$ passing from negative to positive at $x=${c}$, which is the first-derivative-test signature of a local minimum.`,
      };
    },
  },
  {
    id: "g5-fdt-parameter",
    unit: U5,
    topic: "first-derivative-test",
    difficulty: "hard",
    manifestation: "first-derivative-test:parameter",
    build: (r: RNG) => {
      const c = ri(r, 1, 6);
      const k = 3 * c * c;
      const correct = `${k}`;
      return {
        prompt: `For what value of $k$ does $f(x)=x^{3} - kx$ have a critical number at $x=${c}$?`,
        correct,
        distractors: opts(correct, [`${c}`, `${3 * c}`, `${c * c}`, `${k + 1}`]),
        explanation: `$f'(x)=3x^{2} - k$, so $f'(${c}) = 0$ gives $k = 3(${c})^{2} = ${k}$.`,
      };
    },
  },
  {
    id: "g5-fdt-reverse",
    unit: U5,
    topic: "first-derivative-test",
    difficulty: "hard",
    manifestation: "first-derivative-test:reverse",
    build: (r: RNG) => {
      const a = ri(r, 1, 4);
      const b = a + ri(r, 2, 4);
      const correct = `f'(x) = \\left(x - ${a}\\right)\\left(x - ${b}\\right)`;
      return {
        prompt: `A function $f$ has a local maximum at $x=${a}$ and a local minimum at $x=${b}$, with no other extrema. Which derivative is consistent with this?`,
        correct,
        distractors: [
          `f'(x) = -\\left(x - ${a}\\right)\\left(x - ${b}\\right)`,
          `f'(x) = \\left(x - ${a}\\right)^{2}\\left(x - ${b}\\right)^{2}`,
          `f'(x) = \\left(x - ${a}\\right) + \\left(x - ${b}\\right)`,
        ],
        explanation: `$(x-${a})(x-${b})$ is positive, then negative, then positive, so $f$ rises to a maximum at $x=${a}$ and falls to a minimum at $x=${b}$. The negated version reverses the roles, and the squared version never changes sign.`,
      };
    },
  },
  {
    id: "g5-sdt-classify",
    unit: U5,
    topic: "second-derivative-test",
    difficulty: "medium",
    manifestation: "second-derivative-test:classify-extremum",
    build: (r: RNG) => {
      const c = ri(r, 1, 6);
      const correct = `\\text{a local minimum, because } f''(${c}) > 0`;
      return {
        prompt: `A function satisfies $f'(${c}) = 0$ and $f''(${c}) = ${ri(r, 2, 9)}$. What does $f$ have at $x=${c}$?`,
        correct,
        distractors: [
          `\\text{a local maximum, because } f''(${c}) > 0`,
          `\\text{an inflection point, because } f'(${c}) = 0`,
          `\\text{nothing can be determined}`,
        ],
        explanation: `A positive second derivative at a critical point means the graph is concave up there, so the critical point is a local minimum.`,
      };
    },
  },
  {
    id: "g5-sdt-graph",
    unit: U5,
    topic: "second-derivative-test",
    difficulty: "medium",
    manifestation: "second-derivative-test:from-graph",
    build: (r: RNG) => {
      const c = ri(r, 2, 4);
      const pts: Array<[number, number]> = [
        [0, -2],
        [c, 2],
        [c + 3, 1],
      ];
      const correct = `\\text{concave up on } (0,${c}) \\text{ and concave down on } (${c},${c + 3})`;
      return {
        prompt: `The graph of $f'$ shown consists of line segments. Describe the concavity of $f$.`,
        figure: graph("y = f'(x)", pts, { xMin: -1, xMax: c + 4, yMin: -3, yMax: 3 }),
        correct,
        distractors: [
          `\\text{concave down on } (0,${c}) \\text{ and concave up on } (${c},${c + 3})`,
          `\\text{concave up on } (0,${c + 3})`,
          `\\text{concave down on } (0,${c + 3})`,
        ],
        explanation: `$f''$ is the slope of $f'$. The graph of $f'$ rises on $(0,${c})$ and falls afterward, so $f$ is concave up then concave down.`,
      };
    },
  },
  {
    id: "g5-sdt-inconclusive",
    unit: U5,
    topic: "second-derivative-test",
    difficulty: "medium",
    manifestation: "second-derivative-test:inconclusive",
    build: (r: RNG) => {
      const c = ri(r, 1, 8);
      const correct = `\\text{The test is inconclusive; use the first derivative test.}`;
      return {
        prompt: `A function satisfies $f'(${c}) = 0$ and $f''(${c}) = 0$. What can be concluded about $x=${c}$?`,
        correct,
        distractors: [
          `f\\text{ has an inflection point at }x=${c}.`,
          `f\\text{ has neither a maximum nor a minimum at }x=${c}.`,
          `f\\text{ has a local minimum at }x=${c}.`,
        ],
        explanation: `A zero second derivative gives no information at a critical point; the sign change of $f'$ must be examined instead.`,
      };
    },
  },
  {
    id: "g5-sdt-table",
    unit: U5,
    topic: "second-derivative-test",
    difficulty: "medium",
    manifestation: "second-derivative-test:table",
    build: (r: RNG) => {
      const xs = [1, 2, 3, 4];
      const base = ri(r, 2, 5);
      const ys = [`${base}`, `${base + 1}`, `${base + 3}`, `${base + 6}`];
      const correct = `\\text{concave up, because the increments of } f \\text{ are growing}`;
      return {
        prompt: `Values of $f$ are given for equally spaced inputs.\n\n${tablePair("f(x)", xs, ys)}\n\nWhat does the data suggest about the concavity of $f$ on $[1,4]$?`,
        correct,
        distractors: [
          `\\text{concave down, because } f \\text{ is increasing}`,
          `\\text{linear, because the inputs are equally spaced}`,
          `\\text{concave down, because the increments of } f \\text{ are growing}`,
        ],
        explanation: `Successive increases are $1$, $2$, and $3$: the rate of change is itself increasing, which suggests $f'' > 0$ and a concave-up graph.`,
      };
    },
  },
  {
    id: "g5-endpoint-extremum",
    unit: U5,
    topic: "local-and-global-extrema",
    difficulty: "medium",
    manifestation: "local-and-global-extrema:endpoint-extremum",
    build: (r: RNG) => {
      const b = ri(r, 2, 5);
      const correct = `x = ${b}`;
      return {
        prompt: `Let $f(x)=x^{2}$ on $[0,${b}]$. Where does $f$ attain its absolute maximum?`,
        correct,
        distractors: [`x = 0`, `x = ${frac(b, 2)}`, `\\text{nowhere, since }f\\text{ has no critical point in }(0,${b})`],
        explanation: `The only critical number is $x=0$, which gives the minimum. Comparing candidate values, the maximum $${b * b}$ occurs at the endpoint $x=${b}$.`,
      };
    },
  },
  {
    id: "g5-open-interval",
    unit: U5,
    topic: "local-and-global-extrema",
    difficulty: "hard",
    manifestation: "local-and-global-extrema:open-interval",
    build: (r: RNG) => {
      const b = ri(r, 2, 8);
      const correct = `\\text{It has an absolute minimum but no absolute maximum.}`;
      return {
        prompt: `Consider $f(x)=x^{2}$ on the open interval $(-${b}, ${b})$. Which statement is true?`,
        correct,
        distractors: [
          `\\text{It has both an absolute maximum and an absolute minimum.}`,
          `\\text{It has an absolute maximum but no absolute minimum.}`,
          `\\text{It has neither.}`,
        ],
        explanation: `The minimum $0$ is attained at $x=0$, but values approach $${b * b}$ without reaching it, so no maximum is attained. The Extreme Value Theorem requires a closed interval.`,
      };
    },
  },
  {
    id: "g5-extrema-graph",
    unit: U5,
    topic: "local-and-global-extrema",
    difficulty: "medium",
    manifestation: "local-and-global-extrema:graph",
    build: (r: RNG) => {
      const top = ri(r, 5, 9);
      const c = ri(r, 2, 4);
      const pts: Array<[number, number]> = [
        [0, 2],
        [c, top],
        [c + 3, 1],
      ];
      const correct = `\\text{maximum } ${top} \\text{ at } x = ${c}, \\text{ minimum } 1 \\text{ at } x = ${c + 3}`;
      return {
        prompt: `The graph of the continuous function $f$ on $[0,${c + 3}]$ consists of the line segments shown. Identify the absolute extrema.`,
        figure: graph("y = f(x)", pts, { xMin: -1, xMax: c + 4, yMin: 0, yMax: top + 2 }),
        correct,
        distractors: [
          `\\text{maximum } ${top} \\text{ at } x = ${c}, \\text{ minimum } 2 \\text{ at } x = 0`,
          `\\text{maximum } 2 \\text{ at } x = 0, \\text{ minimum } 1 \\text{ at } x = ${c + 3}`,
          `\\text{no absolute extrema exist}`,
        ],
        explanation: `Comparing the peak and both endpoints, the largest value is $${top}$ at $x=${c}$ and the smallest is $1$ at the right endpoint.`,
      };
    },
  },
  {
    id: "g5-extrema-context",
    unit: U5,
    topic: "local-and-global-extrema",
    difficulty: "hard",
    manifestation: "local-and-global-extrema:context",
    build: (r: RNG) => {
      const k = ri(r, 2, 6);
      const b = ri(r, 4, 9);
      const tMax = b / (2 * k);
      const hMax = k * tMax * tMax * -1 + b * tMax;
      const correct = dec(hMax, 3);
      return {
        prompt: `A drone's height, in meters, is $h(t) = -${k}t^{2} + ${b}t$ for $t\\ge 0$ seconds. What is its greatest height, in meters?`,
        correct,
        distractors: opts(correct, [dec(tMax, 3), dec(b, 3), dec(2 * hMax, 3), `0`]),
        explanation: `$h'(t) = -${2 * k}t + ${b}$ is zero at $t=${dec(tMax, 3)}$, and $h''<0$, so that critical time gives the maximum height $${correct}$ meters.`,
      };
    },
  },
  {
    id: "g5-opt-box",
    unit: U5,
    topic: "optimization",
    difficulty: "hard",
    manifestation: "optimization:box-volume",
    calculator: true,
    build: (r: RNG) => {
      const s = pick(r, [12, 18, 24, 30] as const);
      const x = s / 6;
      const v = x * (s - 2 * x) ** 2;
      const correct = dec(v, 3);
      return {
        prompt: `An open box is made from a $${s}$-inch by $${s}$-inch square sheet by cutting congruent squares of side $x$ from each corner and folding up the sides. What is the greatest possible volume, in cubic inches?`,
        correct,
        distractors: opts(correct, [dec(x, 3), dec(s * s, 3), dec(v / 2, 3), dec(2 * v, 3)]),
        explanation: `The volume is $V(x) = x(${s} - 2x)^{2}$. Solving $V'(x)=0$ on $0<x<${s / 2}$ gives $x=${dec(x, 3)}$, so the maximum volume is $${correct}$ cubic inches.`,
      };
    },
  },
  {
    id: "g5-opt-distance",
    unit: U5,
    topic: "optimization",
    difficulty: "hard",
    manifestation: "optimization:distance",
    calculator: true,
    build: (r: RNG) => {
      const a = ri(r, 2, 8);
      const d = Math.sqrt(a * a - a + 0.25 + 0) * 0;
      const xStar = 0.5 * (2 * a - 1) / 2;
      const dist = Math.sqrt((xStar - a) ** 2 + xStar);
      const correct = dec(dist, 3);
      return {
        prompt: `What is the shortest distance from the point $(${a}, 0)$ to the curve $y=\\sqrt{x}$, for $x\\ge 0$? Give the distance correct to three decimal places.`,
        correct,
        distractors: opts(correct, [dec(a, 3), dec(Math.sqrt(a), 3), dec(dist + 1, 3), dec(d + 1, 3)]),
        explanation: `Minimize $D(x) = (x - ${a})^{2} + x$. Then $D'(x) = 2(x-${a}) + 1 = 0$ gives $x=${dec(xStar, 3)}$, and the distance is $\\sqrt{D(x)} = ${correct}$.`,
      };
    },
  },
  {
    id: "g5-opt-cost",
    unit: U5,
    topic: "optimization",
    difficulty: "hard",
    manifestation: "optimization:cost",
    calculator: true,
    build: (r: RNG) => {
      const A = pick(r, [36, 64, 100, 144] as const);
      const s = Math.sqrt(A);
      const per = ri(r, 2, 6);
      const cost = per * 4 * s;
      const correct = dec(cost, 3);
      return {
        prompt: `A rectangular garden must enclose $${A}$ square meters. Fencing costs $${per}$ dollars per meter. What is the least possible cost, in dollars?`,
        correct,
        distractors: opts(correct, [dec(per * A, 3), dec(cost / 2, 3), dec(per * 2 * s, 3), dec(cost + per, 3)]),
        explanation: `With area fixed, perimeter $P(x) = 2x + \\frac{${2 * A}}{x}$ is minimized at $x=${s}$, the square. The perimeter is $${4 * s}$ meters, costing $${per} \\cdot ${4 * s} = ${correct}$ dollars.`,
      };
    },
  },
  {
    id: "g5-opt-setup",
    unit: U5,
    topic: "optimization",
    difficulty: "medium",
    manifestation: "optimization:setup",
    build: (r: RNG) => {
      const P = pick(r, [20, 40, 60, 80] as const);
      const correct = `A(x) = x\\left(\\dfrac{${P}}{2} - x\\right)`;
      return {
        prompt: `A rectangle has perimeter $${P}$ meters. Which function of one variable should be maximized to find the largest possible area?`,
        correct,
        distractors: [
          `A(x) = x\\left(${P} - x\\right)`,
          `A(x) = 2x + \\dfrac{${P}}{2}`,
          `A(x) = x^{2}`,
        ],
        explanation: `The constraint $2x + 2y = ${P}$ gives $y = \\frac{${P}}{2} - x$, so the area to maximize is $x\\left(\\frac{${P}}{2} - x\\right)$.`,
      };
    },
  },
  {
    id: "g5-opt-justification",
    unit: U5,
    topic: "optimization",
    difficulty: "medium",
    manifestation: "optimization:justification",
    build: (r: RNG) => {
      const c = ri(r, 2, 8);
      const correct = `A'\\text{ changes from positive to negative at }x=${c}.`;
      return {
        prompt: `A quantity $A(x)$ has a single critical number at $x=${c}$ on its domain. Which statement justifies that this critical number gives the maximum?`,
        correct,
        distractors: [
          `A(${c})\\text{ is larger than } A(0).`,
          `A'(${c}) = 0.`,
          `A''(${c}) = 0.`,
        ],
        explanation: `A sign change of the derivative from positive to negative establishes a maximum. A zero derivative alone locates a candidate, and a zero second derivative is inconclusive.`,
      };
    },
  },
  {
    id: "g5-match-graphs",
    unit: U5,
    topic: "curve-sketching",
    difficulty: "hard",
    manifestation: "curve-sketching:match-graphs",
    build: (r: RNG) => {
      const c = ri(r, 2, 4);
      const pts: Array<[number, number]> = [
        [0, 4],
        [c, 0],
        [c + 3, -4],
      ];
      const correct = `f\\text{ is increasing and concave down on }(0,${c}).`;
      return {
        prompt: `The graph shown is the graph of $f'$, consisting of line segments. Which statement about $f$ is true?`,
        figure: graph("y = f'(x)", pts, { xMin: -1, xMax: c + 4, yMin: -5, yMax: 5 }),
        correct,
        distractors: [
          `f\\text{ is increasing and concave up on }(0,${c}).`,
          `f\\text{ is decreasing and concave down on }(0,${c}).`,
          `f\\text{ has an inflection point at }x=${c}.`,
        ],
        explanation: `On $(0,${c})$ the graph of $f'$ is positive (so $f$ increases) and decreasing (so $f''<0$ and $f$ is concave down). At $x=${c}$, $f'=0$ without a slope change in $f'$, so there is no inflection point.`,
      };
    },
  },
  {
    id: "g5-table-behavior",
    unit: U5,
    topic: "curve-sketching",
    difficulty: "medium",
    manifestation: "curve-sketching:table-behavior",
    build: (r: RNG) => {
      const xs = [1, 2, 3, 4];
      const ys = [`${ri(r, 2, 5)}`, `${ri(r, 2, 5)}`, `-${ri(r, 2, 5)}`, `-${ri(r, 2, 5)}`];
      const correct = `f\\text{ has a local maximum somewhere in }(2,3).`;
      return {
        prompt: `Values of the continuous function $f'$ are given.\n\n${tablePair("f'(x)", xs, ys)}\n\nWhich statement must be true?`,
        correct,
        distractors: [
          `f\\text{ has a local minimum somewhere in }(2,3).`,
          `f\\text{ is decreasing on }(1,4).`,
          `f\\text{ has an inflection point at }x=3.`,
        ],
        explanation: `$f'$ is positive at $x=2$ and negative at $x=3$, so by continuity it changes sign in between, where $f$ turns from increasing to decreasing.`,
      };
    },
  },
  {
    id: "g5-must-be-true",
    unit: U5,
    topic: "curve-sketching",
    difficulty: "hard",
    manifestation: "curve-sketching:must-be-true",
    build: (r: RNG) => {
      const c = ri(r, 2, 4);
      const pts: Array<[number, number]> = [
        [0, 1],
        [c, 3],
        [c + 3, 1],
      ];
      const correct = `f\\text{ is increasing on }(0,${c + 3}).`;
      return {
        prompt: `The graph of $f'$ shown consists of line segments and stays positive. Which statement about $f$ must be true on $(0,${c + 3})$?`,
        figure: graph("y = f'(x)", pts, { xMin: -1, xMax: c + 4, yMin: 0, yMax: 5 }),
        correct,
        distractors: [
          `f\\text{ has a local maximum at }x=${c}.`,
          `f\\text{ is concave up on }(0,${c + 3}).`,
          `f\\text{ is positive on }(0,${c + 3}).`,
        ],
        explanation: `A positive derivative forces $f$ to increase. The peak of $f'$ marks an inflection point of $f$, concavity changes sign, and nothing is known about the values of $f$ itself.`,
      };
    },
  },
  {
    id: "g5-curve-error",
    unit: U5,
    topic: "curve-sketching",
    difficulty: "medium",
    manifestation: "curve-sketching:error-analysis",
    build: (r: RNG) => {
      const c = ri(r, 1, 8);
      const correct = `\\text{A zero of } f' \\text{ gives an extremum only if } f' \\text{ changes sign there.}`;
      return {
        prompt: `A student sees that $f'(${c}) = 0$ and concludes that $f$ has a local extremum at $x=${c}$. Why is this reasoning flawed?`,
        correct,
        distractors: [
          `\\text{A zero of } f' \\text{ always gives an inflection point instead.}`,
          `f' \\text{ must be undefined at an extremum.}`,
          `\\text{Extrema can occur only at endpoints.}`,
        ],
        explanation: `Functions such as $f(x)=(x-${c})^{3}$ have $f'(${c})=0$ with no extremum, because $f'$ keeps the same sign on both sides.`,
      };
    },
  },
);

/* ------------------------------------------------------------------ */
/* Unit 6 — Integration and accumulation of change                     */
/* ------------------------------------------------------------------ */

const U6 = "unit-6-integration-and-accumulation-of-change";

GAP_TEMPLATES.push(
  {
    id: "g6-riemann-midpoint",
    unit: U6,
    topic: "riemann-sums",
    difficulty: "medium",
    manifestation: "riemann-sums:midpoint",
    build: (r: RNG) => {
      const k = ri(r, 1, 4);
      // f(x) = k x^2 on [0,4], 2 subintervals, midpoints 1 and 3
      const val = 2 * (k * 1 + k * 9);
      const correct = `${val}`;
      return {
        prompt: `Approximate $\\displaystyle\\int_{0}^{4} ${coefTex(k)}x^{2}\\,dx$ using a midpoint Riemann sum with two subintervals of equal width.`,
        correct,
        distractors: opts(correct, [`${val / 2}`, `${2 * val}`, `${2 * (k * 0 + k * 4)}`, `${2 * (k * 4 + k * 16)}`]),
        explanation: `The subintervals are $[0,2]$ and $[2,4]$ with width $2$ and midpoints $1$ and $3$. The sum is $2\\left(${k}(1)^{2}\\right) + 2\\left(${k}(3)^{2}\\right) = ${correct}$.`,
      };
    },
  },
  {
    id: "g6-riemann-over-under",
    unit: U6,
    topic: "riemann-sums",
    difficulty: "medium",
    manifestation: "riemann-sums:over-under",
    build: (r: RNG) => {
      const a = ri(r, 1, 3);
      const b = a + ri(r, 2, 4);
      const correct = `\\text{An underestimate, because } f \\text{ is increasing on } [${a},${b}].`;
      return {
        prompt: `Let $f$ be increasing and concave up on $[${a},${b}]$. A left Riemann sum with equal subintervals is used to approximate $\\displaystyle\\int_{${a}}^{${b}} f(x)\\,dx$. What kind of approximation is it?`,
        correct,
        distractors: [
          `\\text{An overestimate, because } f \\text{ is increasing on } [${a},${b}].`,
          `\\text{An overestimate, because } f \\text{ is concave up on } [${a},${b}].`,
          `\\text{Exact, because the subintervals have equal width.}`,
        ],
        explanation: `For an increasing function each left endpoint gives the smallest value on its subinterval, so every rectangle sits below the curve and the sum underestimates the integral.`,
      };
    },
  },
  {
    id: "g6-riemann-sigma",
    unit: U6,
    topic: "riemann-sums",
    difficulty: "hard",
    manifestation: "riemann-sums:sigma-to-integral",
    build: (r: RNG) => {
      const n = pick(r, [4, 5, 8, 10] as const);
      const b = ri(r, 2, 6);
      const correct = `\\displaystyle\\int_{0}^{${b}} x^{2}\\,dx`;
      return {
        prompt: `Which definite integral equals $\\displaystyle\\lim_{n\\to\\infty}\\sum_{i=1}^{n} \\left(\\frac{${b}i}{n}\\right)^{2}\\cdot\\frac{${b}}{n}$?`,
        correct,
        distractors: [
          `\\displaystyle\\int_{0}^{${b}} x\\,dx`,
          `\\displaystyle\\int_{0}^{${n}} x^{2}\\,dx`,
          `\\displaystyle\\int_{${b}}^{${b + n}} x^{2}\\,dx`,
        ],
        explanation: `Here $\\Delta x = \\frac{${b}}{n}$ and $x_{i} = \\frac{${b}i}{n}$, right endpoints on $[0,${b}]$ with integrand $x^{2}$.`,
      };
    },
  },
  {
    id: "g6-riemann-construct",
    unit: U6,
    topic: "riemann-sums",
    difficulty: "medium",
    manifestation: "riemann-sums:construct",
    build: (r: RNG) => {
      const a = ri(r, 0, 2);
      const b = a + 6;
      const n = 3;
      const w = (b - a) / n;
      const correct = `${w}\\left[f(${a + w}) + f(${a + 2 * w}) + f(${a + 3 * w})\\right]`;
      return {
        prompt: `Write the right Riemann sum with $${n}$ equal subintervals for $\\displaystyle\\int_{${a}}^{${b}} f(x)\\,dx$.`,
        correct,
        distractors: [
          `${w}\\left[f(${a}) + f(${a + w}) + f(${a + 2 * w})\\right]`,
          `${b - a}\\left[f(${a + w}) + f(${a + 2 * w}) + f(${a + 3 * w})\\right]`,
          `${w}\\left[f(${a}) + f(${a + 3 * w})\\right]`,
        ],
        explanation: `The width is $\\frac{${b} - ${a}}{${n}} = ${w}$, and the right endpoints are $${a + w}$, $${a + 2 * w}$, and $${a + 3 * w}$.`,
      };
    },
  },
  {
    id: "g6-riemann-graph",
    unit: U6,
    topic: "riemann-sums",
    difficulty: "medium",
    manifestation: "riemann-sums:graph-sum",
    build: (r: RNG) => {
      const h = ri(r, 2, 5);
      const pts: Array<[number, number]> = [
        [0, 0],
        [2, h],
        [4, 0],
      ];
      const area = 0.5 * 4 * h;
      const correct = dec(area, 3);
      return {
        prompt: `The graph of $f$ shown consists of two line segments. Find $\\displaystyle\\int_{0}^{4} f(x)\\,dx$ using areas.`,
        figure: graph("y = f(x)", pts, { xMin: -1, xMax: 5, yMin: -1, yMax: h + 2 }),
        correct,
        distractors: opts(correct, [dec(2 * area, 3), dec(area / 2, 3), dec(h, 3), `0`]),
        explanation: `The region is a triangle with base $4$ and height $${h}$, so the integral equals $\\frac{1}{2}(4)(${h}) = ${correct}$.`,
      };
    },
  },
  {
    id: "g6-ftc-both-limits",
    unit: U6,
    topic: "fundamental-theorem-of-calculus",
    difficulty: "hard",
    manifestation: "fundamental-theorem-of-calculus:ftc1-both-limits",
    build: (r: RNG) => {
      const k = ri(r, 2, 5);
      const correct = `${2 * k}x\\sin\\left(x^{2}\\right)`;
      return {
        prompt: `Let $g(x)=\\displaystyle\\int_{0}^{x^{2}} ${coefTex(k)}\\sin(t)\\,dt$. Find $g'(x)$.`,
        correct,
        distractors: [
          `${coefTex(k)}\\sin\\left(x^{2}\\right)`,
          `${2 * k}x\\cos\\left(x^{2}\\right)`,
          `${coefTex(k)}\\sin\\left(x^{2}\\right)\\cdot x`,
        ],
        explanation: `By the chain rule with the Fundamental Theorem, $g'(x) = ${coefTex(k)}\\sin\\left(x^{2}\\right)\\cdot \\frac{d}{dx}\\left(x^{2}\\right) = ${correct}$.`,
      };
    },
  },
  {
    id: "g6-ftc-net-change",
    unit: U6,
    topic: "fundamental-theorem-of-calculus",
    difficulty: "medium",
    manifestation: "fundamental-theorem-of-calculus:net-change",
    build: (r: RNG) => {
      const start = ri(r, 5, 40);
      const net = ri(r, 3, 20);
      const correct = `${start + net}`;
      return {
        prompt: `A tank holds $${start}$ liters at time $t=0$ hours, and water flows in at the rate $R(t)$ liters per hour with $\\displaystyle\\int_{0}^{5} R(t)\\,dt = ${net}$. How many liters are in the tank at $t=5$?`,
        correct,
        distractors: opts(correct, [`${net}`, `${start}`, `${start - net}`, `${start * net}`]),
        explanation: `The integral of the rate gives the net change, so the amount is $${start} + ${net} = ${correct}$ liters.`,
      };
    },
  },
  {
    id: "g6-ftc-graph",
    unit: U6,
    topic: "fundamental-theorem-of-calculus",
    difficulty: "medium",
    manifestation: "fundamental-theorem-of-calculus:graph-area",
    build: (r: RNG) => {
      const h = ri(r, 2, 4);
      const pts: Array<[number, number]> = [
        [0, h],
        [2, 0],
        [4, -h],
      ];
      const correct = `x = 2`;
      return {
        prompt: `Let $g(x)=\\displaystyle\\int_{0}^{x} f(t)\\,dt$, where the graph of $f$ shown consists of line segments. At what value of $x$ in $(0,4)$ does $g$ attain its maximum?`,
        figure: graph("y = f(t)", pts, { xMin: -1, xMax: 5, yMin: -h - 1, yMax: h + 1 }),
        correct,
        distractors: [`x = 0`, `x = 4`, `x = ${h}`],
        explanation: `$g' = f$ changes from positive to negative at $x=2$, so $g$ increases then decreases and is greatest at $x=2$.`,
      };
    },
  },
  {
    id: "g6-ftc-error",
    unit: U6,
    topic: "fundamental-theorem-of-calculus",
    difficulty: "medium",
    manifestation: "fundamental-theorem-of-calculus:error-analysis",
    build: (r: RNG) => {
      const k = ri(r, 2, 6);
      const correct = `\\text{The derivative of the accumulation is } f, \\text{ not an antiderivative of } f.`;
      return {
        prompt: `For $g(x)=\\displaystyle\\int_{${k}}^{x} f(t)\\,dt$, a student writes $g'(x)=F(x)$ where $F$ is an antiderivative of $f$. What is the error?`,
        correct,
        distractors: [
          `\\text{The lower limit } ${k} \\text{ must be } 0.`,
          `g \\text{ is not differentiable.}`,
          `g'(x) = f(x) - f(${k}).`,
        ],
        explanation: `The Fundamental Theorem gives $g'(x) = f(x)$ directly; differentiating produces the integrand, not another antiderivative.`,
      };
    },
  },
  {
    id: "g6-usub-explog",
    unit: U6,
    topic: "u-substitution",
    difficulty: "medium",
    manifestation: "u-substitution:exp-log",
    build: (r: RNG) => {
      const k = ri(r, 2, 6);
      const correct = `\\dfrac{1}{${k}}e^{${k}x} + C`;
      return {
        prompt: `Evaluate $\\displaystyle\\int e^{${coefTex(k)}x}\\,dx$.`,
        correct,
        distractors: [
          `${coefTex(k)}e^{${k}x} + C`,
          `e^{${k}x} + C`,
          `\\dfrac{1}{${k}}e^{${k}x^{2}} + C`,
        ],
        explanation: `With $u=${k}x$, $du=${k}\\,dx$, so the integral is $\\frac{1}{${k}}\\int e^{u}\\,du = \\frac{1}{${k}}e^{${k}x} + C$.`,
      };
    },
  },
  {
    id: "g6-usub-definite",
    unit: U6,
    topic: "u-substitution",
    difficulty: "hard",
    manifestation: "u-substitution:definite-bounds",
    build: (r: RNG) => {
      const b = ri(r, 1, 3);
      // ∫_0^b 2x (x^2+1)^2 dx = [ (x^2+1)^3 /3 ]
      const val = ((b * b + 1) ** 3 - 1) / 3;
      const correct = dec(val, 3);
      return {
        prompt: `Evaluate $\\displaystyle\\int_{0}^{${b}} 2x\\left(x^{2}+1\\right)^{2}\\,dx$.`,
        correct,
        distractors: opts(correct, [dec(val * 3, 3), dec(val / 2, 3), dec(((b * b + 1) ** 3) / 3, 3), dec(val + 1, 3)]),
        explanation: `Let $u=x^{2}+1$, so $du=2x\\,dx$ and the bounds become $u=1$ to $u=${b * b + 1}$. Then the integral is $\\left[\\frac{u^{3}}{3}\\right]_{1}^{${b * b + 1}} = ${correct}$.`,
      };
    },
  },
  {
    id: "g6-usub-choose-u",
    unit: U6,
    topic: "u-substitution",
    difficulty: "medium",
    manifestation: "u-substitution:choose-u",
    build: (r: RNG) => {
      const k = ri(r, 2, 7);
      const correct = `u = x^{3} + ${k}`;
      return {
        prompt: `Which substitution best evaluates $\\displaystyle\\int \\frac{x^{2}}{x^{3} + ${k}}\\,dx$?`,
        correct,
        distractors: [`u = x^{2}`, `u = x^{3}`, `u = \\dfrac{1}{x^{3} + ${k}}`],
        explanation: `With $u = x^{3} + ${k}$, $du = 3x^{2}\\,dx$ matches the numerator up to a constant, giving $\\frac{1}{3}\\ln\\left|x^{3}+${k}\\right| + C$.`,
      };
    },
  },
  {
    id: "g6-usub-not-applicable",
    unit: U6,
    topic: "u-substitution",
    difficulty: "medium",
    manifestation: "u-substitution:not-applicable",
    build: (r: RNG) => {
      const k = ri(r, 2, 6);
      const correct = `\\displaystyle\\int x\\cos(x)\\,dx`;
      return {
        prompt: `For which integral does a single $u$-substitution fail to finish the problem?`,
        correct,
        distractors: [
          `\\displaystyle\\int x\\cos\\left(x^{2}\\right)\\,dx`,
          `\\displaystyle\\int \\frac{${coefTex(k)}}{${k}x + 1}\\,dx`,
          `\\displaystyle\\int \\left(x + ${k}\\right)^{5}\\,dx`,
        ],
        explanation: `In $\\int x\\cos(x)\\,dx$ the factor $x$ is not the derivative of the cosine's argument, so substitution leaves an $x$ behind; integration by parts is required.`,
      };
    },
  },
  {
    id: "g6-ibp-poly-trig",
    unit: U6,
    topic: "integration-by-parts",
    difficulty: "hard",
    track: "bc",
    manifestation: "integration-by-parts:polynomial-trig",
    build: (r: RNG) => {
      const k = ri(r, 1, 5);
      const correct = `${coefTex(k)}\\left(x\\sin(x) + \\cos(x)\\right) + C`;
      return {
        prompt: `Evaluate $\\displaystyle\\int ${coefTex(k)}x\\cos(x)\\,dx$.`,
        correct,
        distractors: [
          `${coefTex(k)}\\left(x\\sin(x) - \\cos(x)\\right) + C`,
          `${coefTex(k)}\\left(x\\cos(x) + \\sin(x)\\right) + C`,
          `\\dfrac{${k}x^{2}\\sin(x)}{2} + C`,
        ],
        explanation: `Take $u=x$ and $dv=\\cos(x)\\,dx$: the result is $x\\sin(x) - \\int \\sin(x)\\,dx = x\\sin(x) + \\cos(x)$, scaled by $${k}$.`,
      };
    },
  },
  {
    id: "g6-ibp-repeated",
    unit: U6,
    topic: "integration-by-parts",
    difficulty: "hard",
    track: "bc",
    manifestation: "integration-by-parts:repeated",
    build: (r: RNG) => {
      const correct = `\\text{two}`;
      return {
        prompt: `How many applications of integration by parts are needed to evaluate $\\displaystyle\\int x^{2}e^{x}\\,dx$?`,
        correct,
        distractors: [`\\text{one}`, `\\text{three}`, `\\text{none; substitution suffices}`],
        explanation: `Each application lowers the power of $x$ by one, so $x^{2}$ requires two rounds before the polynomial factor disappears.`,
      };
    },
  },
  {
    id: "g6-ibp-choose-parts",
    unit: U6,
    topic: "integration-by-parts",
    difficulty: "medium",
    track: "bc",
    manifestation: "integration-by-parts:choose-parts",
    build: (r: RNG) => {
      const correct = `u = \\ln(x),\\; dv = x\\,dx`;
      return {
        prompt: `Which choice of parts evaluates $\\displaystyle\\int x\\ln(x)\\,dx$ most directly?`,
        correct,
        distractors: [
          `u = x,\\; dv = \\ln(x)\\,dx`,
          `u = x\\ln(x),\\; dv = dx`,
          `u = \\dfrac{1}{x},\\; dv = x\\,dx`,
        ],
        explanation: `Choosing $u=\\ln(x)$ makes $du=\\frac{1}{x}\\,dx$, which cancels against $v=\\frac{x^{2}}{2}$ and leaves an elementary integral.`,
      };
    },
  },
  {
    id: "g6-ibp-definite",
    unit: U6,
    topic: "integration-by-parts",
    difficulty: "hard",
    track: "bc",
    manifestation: "integration-by-parts:definite",
    build: (r: RNG) => {
      const b = ri(r, 1, 3);
      const val = b * Math.exp(b) - Math.exp(b) + 1;
      const correct = dec(val, 3);
      return {
        prompt: `Evaluate $\\displaystyle\\int_{0}^{${b}} xe^{x}\\,dx$.`,
        correct,
        distractors: opts(correct, [dec(b * Math.exp(b), 3), dec(Math.exp(b) - 1, 3), dec(val + 1, 3), dec(val / 2, 3)]),
        explanation: `Parts with $u=x$, $dv=e^{x}\\,dx$ gives $\\left[xe^{x} - e^{x}\\right]_{0}^{${b}} = ${correct}$.`,
      };
    },
  },
  {
    id: "g6-pf-setup",
    unit: U6,
    topic: "partial-fractions",
    difficulty: "medium",
    track: "bc",
    manifestation: "partial-fractions:setup",
    build: (r: RNG) => {
      const a = ri(r, 1, 4);
      const b = a + ri(r, 1, 4);
      const correct = `\\dfrac{A}{x - ${a}} + \\dfrac{B}{x - ${b}}`;
      return {
        prompt: `What is the correct partial fraction form for $\\dfrac{1}{\\left(x - ${a}\\right)\\left(x - ${b}\\right)}$?`,
        correct,
        distractors: [
          `\\dfrac{A}{x - ${a}} + \\dfrac{Bx + C}{x - ${b}}`,
          `\\dfrac{Ax + B}{\\left(x - ${a}\\right)\\left(x - ${b}\\right)}`,
          `\\dfrac{A}{\\left(x - ${a}\\right)\\left(x - ${b}\\right)}`,
        ],
        explanation: `Each distinct linear factor contributes a single constant numerator, giving $\\frac{A}{x-${a}} + \\frac{B}{x-${b}}$.`,
      };
    },
  },
  {
    id: "g6-pf-long-division",
    unit: U6,
    topic: "partial-fractions",
    difficulty: "hard",
    track: "bc",
    manifestation: "partial-fractions:long-division-first",
    build: (r: RNG) => {
      const a = ri(r, 1, 6);
      const correct = `1 + \\dfrac{${a}}{x - ${a}}`;
      return {
        prompt: `Rewrite $\\dfrac{x}{x - ${a}}$ in a form suitable for integration.`,
        correct,
        distractors: [
          `\\dfrac{${a}}{x - ${a}}`,
          `1 - \\dfrac{${a}}{x - ${a}}`,
          `x - \\dfrac{${a}}{x - ${a}}`,
        ],
        explanation: `Because the degrees match, divide first: $\\frac{x}{x-${a}} = \\frac{(x - ${a}) + ${a}}{x - ${a}} = 1 + \\frac{${a}}{x-${a}}$.`,
      };
    },
  },
  {
    id: "g6-pf-logistic-link",
    unit: U6,
    topic: "partial-fractions",
    difficulty: "hard",
    track: "bc",
    manifestation: "partial-fractions:logistic-link",
    build: (r: RNG) => {
      const M = pick(r, [100, 200, 500, 1000] as const);
      const correct = `\\dfrac{1}{P} + \\dfrac{1}{${M} - P}`;
      return {
        prompt: `Separating the logistic equation $\\dfrac{dP}{dt} = kP\\left(1 - \\dfrac{P}{${M}}\\right)$ requires integrating $\\dfrac{${M}}{P\\left(${M} - P\\right)}$. Which decomposition is correct?`,
        correct,
        distractors: [
          `\\dfrac{1}{P} - \\dfrac{1}{${M} - P}`,
          `\\dfrac{${M}}{P} + \\dfrac{${M}}{${M} - P}`,
          `\\dfrac{1}{P\\left(${M} - P\\right)}`,
        ],
        explanation: `Writing $\\frac{${M}}{P(${M}-P)} = \\frac{A}{P} + \\frac{B}{${M}-P}$ and clearing denominators gives $A=B=1$.`,
      };
    },
  },
  {
    id: "g6-improper-unbounded-integrand",
    unit: U6,
    topic: "improper-integrals",
    difficulty: "hard",
    track: "bc",
    manifestation: "improper-integrals:unbounded-integrand",
    build: (r: RNG) => {
      const b = ri(r, 1, 6);
      const correct = `${dec(2 * Math.sqrt(b), 3)}`;
      return {
        prompt: `Evaluate $\\displaystyle\\int_{0}^{${b}} \\frac{1}{\\sqrt{x}}\\,dx$, or state that it diverges.`,
        correct,
        distractors: opts(correct, [`${dec(Math.sqrt(b), 3)}`, `\\text{divergent}`, `${dec(Math.sqrt(b) / 2, 3)}`, `${dec(4 * Math.sqrt(b), 3)}`]),
        explanation: `The integrand is unbounded at $0$, so use a limit: $\\lim_{a\\to 0^{+}} \\left[2\\sqrt{x}\\right]_{a}^{${b}} = 2\\sqrt{${b}} = ${correct}$.`,
      };
    },
  },
  {
    id: "g6-improper-p-integral",
    unit: U6,
    topic: "improper-integrals",
    difficulty: "medium",
    track: "bc",
    manifestation: "improper-integrals:p-integral",
    build: (r: RNG) => {
      const p = pick(r, [2, 3, 4] as const);
      const correct = `\\dfrac{1}{${p - 1}}`;
      return {
        prompt: `Evaluate $\\displaystyle\\int_{1}^{\\infty} \\frac{1}{x^{${p}}}\\,dx$, or state that it diverges.`,
        correct,
        distractors: [`\\dfrac{1}{${p}}`, `\\text{divergent}`, `\\dfrac{1}{${p + 1}}`],
        explanation: `Since $${p} > 1$, the integral converges to $\\frac{1}{${p} - 1} = \\frac{1}{${p - 1}}$.`,
      };
    },
  },
  {
    id: "g6-improper-limit-notation",
    unit: U6,
    topic: "improper-integrals",
    difficulty: "medium",
    track: "bc",
    manifestation: "improper-integrals:limit-notation",
    build: (r: RNG) => {
      const a = ri(r, 1, 5);
      const correct = `\\displaystyle\\lim_{b\\to\\infty}\\int_{${a}}^{b} f(x)\\,dx`;
      return {
        prompt: `Which expression correctly defines $\\displaystyle\\int_{${a}}^{\\infty} f(x)\\,dx$?`,
        correct,
        distractors: [
          `\\displaystyle\\int_{${a}}^{\\infty} f(x)\\,dx \\text{ evaluated by substituting } \\infty`,
          `\\displaystyle\\lim_{b\\to\\infty}\\int_{b}^{\\infty} f(x)\\,dx`,
          `\\displaystyle\\lim_{a\\to\\infty}\\int_{${a}}^{a} f(x)\\,dx`,
        ],
        explanation: `An infinite limit of integration is replaced by a finite bound and a limit is taken as that bound grows without bound.`,
      };
    },
  },
  {
    id: "g6-improper-compare",
    unit: U6,
    topic: "improper-integrals",
    difficulty: "hard",
    track: "bc",
    manifestation: "improper-integrals:compare",
    build: (r: RNG) => {
      const correct = `\\displaystyle\\int_{1}^{\\infty} \\frac{1}{x}\\,dx`;
      return {
        prompt: `Which of these improper integrals diverges?`,
        correct,
        distractors: [
          `\\displaystyle\\int_{1}^{\\infty} \\frac{1}{x^{2}}\\,dx`,
          `\\displaystyle\\int_{1}^{\\infty} e^{-x}\\,dx`,
          `\\displaystyle\\int_{1}^{\\infty} \\frac{1}{x^{3}}\\,dx`,
        ],
        explanation: `The integral of $\\frac{1}{x}$ grows like $\\ln(b)$, which is unbounded, while the other integrands decay fast enough to converge.`,
      };
    },
  },
  {
    id: "g6-accum-graph-eval",
    unit: U6,
    topic: "accumulation-functions",
    difficulty: "medium",
    manifestation: "accumulation-functions:evaluate-from-graph",
    build: (r: RNG) => {
      const h = ri(r, 2, 5);
      const pts: Array<[number, number]> = [
        [0, h],
        [3, h],
        [3, -h],
        [6, -h],
      ];
      const correct = `${0}`;
      return {
        prompt: `Let $g(x)=\\displaystyle\\int_{0}^{x} f(t)\\,dt$, where the graph of $f$ shown is piecewise constant. Find $g(6)$.`,
        figure: graph("y = f(t)", pts, { xMin: -1, xMax: 7, yMin: -h - 1, yMax: h + 1 }),
        correct,
        distractors: opts(correct, [`${3 * h}`, `${-3 * h}`, `${6 * h}`, `${h}`]),
        explanation: `The signed area is $3(${h})$ on $[0,3]$ and $-3(${h})$ on $[3,6]$, which cancel, so $g(6)=0$.`,
      };
    },
  },
  {
    id: "g6-accum-extrema",
    unit: U6,
    topic: "accumulation-functions",
    difficulty: "hard",
    manifestation: "accumulation-functions:extrema",
    build: (r: RNG) => {
      const c = ri(r, 2, 5);
      const correct = `\\text{where } f \\text{ changes from negative to positive}`;
      return {
        prompt: `Let $g(x)=\\displaystyle\\int_{${c}}^{x} f(t)\\,dt$ for a continuous $f$. Where does $g$ have a local minimum?`,
        correct,
        distractors: [
          `\\text{where } f \\text{ changes from positive to negative}`,
          `\\text{where } f \\text{ has a minimum}`,
          `\\text{at } x = ${c}, \\text{ since } g(${c}) = 0`,
        ],
        explanation: `Because $g' = f$, a local minimum of $g$ occurs where $f$ crosses from negative to positive.`,
      };
    },
  },
  {
    id: "g6-accum-concavity",
    unit: U6,
    topic: "accumulation-functions",
    difficulty: "hard",
    manifestation: "accumulation-functions:concavity",
    build: (r: RNG) => {
      const correct = `\\text{where } f \\text{ is increasing}`;
      return {
        prompt: `Let $g(x)=\\displaystyle\\int_{0}^{x} f(t)\\,dt$ for a differentiable $f$. On what set is the graph of $g$ concave up?`,
        correct,
        distractors: [
          `\\text{where } f \\text{ is positive}`,
          `\\text{where } f \\text{ is decreasing}`,
          `\\text{where } f \\text{ is concave up}`,
        ],
        explanation: `$g'' = f'$, so $g$ is concave up exactly where $f$ is increasing.`,
      };
    },
  },
  {
    id: "g6-accum-table-rate",
    unit: U6,
    topic: "accumulation-functions",
    difficulty: "medium",
    manifestation: "accumulation-functions:table-rate",
    calculator: true,
    build: (r: RNG) => {
      const xs = [0, 2, 4, 6];
      const a = ri(r, 2, 6);
      const b = a + ri(r, 1, 5);
      const c = b + ri(r, 1, 5);
      const d = c + ri(r, 1, 5);
      const trap = 2 * ((a + b) / 2 + (b + c) / 2 + (c + d) / 2);
      const correct = dec(trap, 3);
      return {
        prompt: `Water flows into a tank at the rate $R(t)$ liters per hour, sampled below.\n\n${tablePair("R(t)", xs, [`${a}`, `${b}`, `${c}`, `${d}`])}\n\nUse a trapezoidal sum with the three subintervals to approximate the liters added over $0\\le t\\le 6$.`,
        correct,
        distractors: opts(correct, [dec(trap / 2, 3), dec(2 * (a + b + c), 3), dec(2 * (b + c + d), 3), dec(a + b + c + d, 3)]),
        explanation: `Each subinterval has width $2$, so the sum is $2\\left(\\frac{${a}+${b}}{2} + \\frac{${b}+${c}}{2} + \\frac{${c}+${d}}{2}\\right) = ${correct}$ liters.`,
      };
    },
  },
  {
    id: "g6-accum-must-be-true",
    unit: U6,
    topic: "accumulation-functions",
    difficulty: "hard",
    manifestation: "accumulation-functions:must-be-true",
    build: (r: RNG) => {
      const c = ri(r, 1, 6);
      const correct = `g(${c}) = 0`;
      return {
        prompt: `Let $g(x)=\\displaystyle\\int_{${c}}^{x} f(t)\\,dt$, where $f$ is continuous and positive. Which statement must be true?`,
        correct,
        distractors: [
          `g(x) > 0 \\text{ for all } x`,
          `g \\text{ is concave up for all } x`,
          `g(${c}) = f(${c})`,
        ],
        explanation: `An integral over a degenerate interval is zero, so $g(${c})=0$. Since $g'=f>0$, $g$ increases and is negative for $x<${c}$; concavity depends on $f'$.`,
      };
    },
  },
);

/* ------------------------------------------------------------------ */
/* Unit 7 — Differential equations                                     */
/* ------------------------------------------------------------------ */

const U7 = "unit-7-differential-equations";

GAP_TEMPLATES.push(
  {
    id: "g7-slope-solution-curve",
    unit: U7,
    topic: "slope-fields",
    difficulty: "medium",
    manifestation: "slope-fields:solution-curve",
    build: (r: RNG) => {
      const y0 = ri(r, 1, 4);
      const correct = `\\text{It increases and its slopes grow steeper as } x \\text{ increases.}`;
      return {
        prompt: `A slope field for $\\dfrac{dy}{dx} = xy$ is shown. Describe the solution curve through $(1, ${y0})$ for $x > 1$.`,
        figure: { kind: "slope-field", expr: "xy", label: "dy/dx = xy" } as Figure,
        correct,
        distractors: [
          `\\text{It decreases toward } y = 0.`,
          `\\text{It is a horizontal line through } y = ${y0}.`,
          `\\text{It increases with slopes that flatten as } x \\text{ increases.}`,
        ],
        explanation: `With $x>0$ and $y>0$ the slope $xy$ is positive and grows as both $x$ and $y$ grow, so the curve rises with increasingly steep slopes.`,
      };
    },
  },
  {
    id: "g7-slope-equilibrium",
    unit: U7,
    topic: "slope-fields",
    difficulty: "medium",
    manifestation: "slope-fields:equilibrium",
    build: (r: RNG) => {
      const a = ri(r, 2, 8);
      const correct = `y = ${a}`;
      return {
        prompt: `Which equilibrium solution does the differential equation $\\dfrac{dy}{dx} = y - ${a}$ have?`,
        correct,
        distractors: [`y = 0`, `y = -${a}`, `x = ${a}`],
        explanation: `An equilibrium solution is a constant solution, so set $y - ${a} = 0$ to get $y = ${a}$.`,
      };
    },
  },
  {
    id: "g7-slope-impossible",
    unit: U7,
    topic: "slope-fields",
    difficulty: "hard",
    manifestation: "slope-fields:impossible-curve",
    build: (r: RNG) => {
      const correct = `\\text{a curve with a horizontal tangent at a point where } x \\ne 0 \\text{ and } y \\ne 0`;
      return {
        prompt: `For $\\dfrac{dy}{dx} = xy$, which of the following cannot be part of a solution curve?`,
        figure: { kind: "slope-field", expr: "xy", label: "dy/dx = xy" } as Figure,
        correct,
        distractors: [
          `\\text{the horizontal line } y = 0`,
          `\\text{a curve with a horizontal tangent where } x = 0`,
          `\\text{a curve rising steeply in the first quadrant}`,
        ],
        explanation: `The slope is zero only when $x=0$ or $y=0$, so a horizontal tangent away from both axes is impossible.`,
      };
    },
  },
  {
    id: "g7-sep-verify",
    unit: U7,
    topic: "separable-differential-equations",
    difficulty: "medium",
    manifestation: "separable-differential-equations:verify",
    build: (r: RNG) => {
      const k = ri(r, 2, 5);
      const correct = `y = e^{${k}x}`;
      return {
        prompt: `Which function is a solution of $\\dfrac{dy}{dx} = ${coefTex(k)}y$?`,
        correct,
        distractors: [`y = ${coefTex(k)}x`, `y = e^{x} + ${k}`, `y = x^{${k}}`],
        explanation: `Differentiating $y=e^{${k}x}$ gives $\\frac{dy}{dx} = ${k}e^{${k}x} = ${k}y$, matching the equation.`,
      };
    },
  },
  {
    id: "g7-sep-model",
    unit: U7,
    topic: "separable-differential-equations",
    difficulty: "medium",
    manifestation: "separable-differential-equations:model",
    build: (r: RNG) => {
      const A = ri(r, 20, 90);
      const correct = `\\dfrac{dT}{dt} = k\\left(T - ${A}\\right)`;
      return {
        prompt: `An object's temperature $T$ changes at a rate proportional to the difference between $T$ and the surrounding temperature $${A}$ degrees. Which equation models this?`,
        correct,
        distractors: [
          `\\dfrac{dT}{dt} = kT - ${A}`,
          `\\dfrac{dT}{dt} = \\dfrac{k}{T - ${A}}`,
          `\\dfrac{dT}{dt} = k\\left(${A} - t\\right)`,
        ],
        explanation: `"Proportional to the difference" means the rate equals a constant times $\\left(T - ${A}\\right)$.`,
      };
    },
  },
  {
    id: "g7-sep-domain",
    unit: U7,
    topic: "separable-differential-equations",
    difficulty: "hard",
    manifestation: "separable-differential-equations:domain",
    build: (r: RNG) => {
      const c = ri(r, 1, 5);
      const correct = `x < ${c}`;
      return {
        prompt: `A solution of a separable equation is $y = \\dfrac{1}{${c} - x}$ with initial condition given at $x = 0$. On what interval is this solution valid?`,
        correct,
        distractors: [`x > ${c}`, `x \\ne ${c}`, `\\text{all real } x`],
        explanation: `The solution must be continuous on an interval containing the initial value $x=0$, and it breaks at $x=${c}$, so the interval of validity is $x < ${c}$.`,
      };
    },
  },
  {
    id: "g7-sep-separability",
    unit: U7,
    topic: "separable-differential-equations",
    difficulty: "medium",
    manifestation: "separable-differential-equations:separability",
    build: (r: RNG) => {
      const k = ri(r, 2, 6);
      const correct = `\\dfrac{dy}{dx} = ${coefTex(k)}xy^{2}`;
      return {
        prompt: `Which differential equation is separable?`,
        correct,
        distractors: [
          `\\dfrac{dy}{dx} = x + y`,
          `\\dfrac{dy}{dx} = \\dfrac{x + y}{x}`,
          `\\dfrac{dy}{dx} = \\sin(x + y)`,
        ],
        explanation: `Only the product form factors as a function of $x$ times a function of $y$, allowing the variables to be separated.`,
      };
    },
  },
  {
    id: "g7-exp-from-data",
    unit: U7,
    topic: "exponential-growth-and-decay",
    difficulty: "hard",
    calculator: true,
    manifestation: "exponential-growth-and-decay:from-data",
    build: (r: RNG) => {
      const P0 = pick(r, [50, 80, 120, 200] as const);
      const mult = pick(r, [2, 3, 4] as const);
      const t1 = pick(r, [4, 5, 10] as const);
      const k = Math.log(mult) / t1;
      const correct = dec(k, 4);
      const body = tablePair("P(t)", [0, t1], [`${P0}`, `${P0 * mult}`]);
      return {
        prompt: `A population grows according to $P(t) = P_{0}e^{kt}$, with the values shown.\n\n${body}\n\nFind $k$.`,
        correct,
        distractors: opts(correct, [dec(mult / t1, 4), dec(Math.log(mult), 4), dec(k * 2, 4), dec(1 / k, 4)]),
        explanation: `From $${P0 * mult} = ${P0}e^{${t1}k}$ we get $e^{${t1}k} = ${mult}$, so $k = \\frac{\\ln(${mult})}{${t1}} = ${correct}$.`,
      };
    },
  },
  {
    id: "g7-exp-interpret-k",
    unit: U7,
    topic: "exponential-growth-and-decay",
    difficulty: "medium",
    manifestation: "exponential-growth-and-decay:interpret-constant",
    build: (r: RNG) => {
      const pct = pick(r, [3, 5, 8, 12] as const);
      const correct = `\\text{The quantity decays at a continuous rate of } ${pct}\\% \\text{ per year.}`;
      return {
        prompt: `A quantity satisfies $\\dfrac{dA}{dt} = -0.${pct < 10 ? "0" + pct : pct}A$, where $t$ is in years. What does the constant mean?`,
        correct,
        distractors: [
          `\\text{The quantity decreases by } ${pct} \\text{ units each year.}`,
          `\\text{The quantity grows at a continuous rate of } ${pct}\\% \\text{ per year.}`,
          `\\text{The quantity halves every } ${pct} \\text{ years.}`,
        ],
        explanation: `The equation says the rate of change is $-0.${pct < 10 ? "0" + pct : pct}$ times the amount present, a continuous percentage decay rate, not a fixed number of units.`,
      };
    },
  },
  {
    id: "g7-exp-compare",
    unit: U7,
    topic: "exponential-growth-and-decay",
    difficulty: "hard",
    manifestation: "exponential-growth-and-decay:compare-models",
    build: (r: RNG) => {
      const a = ri(r, 2, 4);
      const b = a + ri(r, 1, 3);
      const A0 = pick(r, [100, 200, 400] as const);
      const B0 = A0 / 2;
      const correct = `B \\text{ eventually exceeds } A, \\text{ because it has the larger growth constant.}`;
      return {
        prompt: `Two populations satisfy $A(t) = ${A0}e^{0.0${a}t}$ and $B(t) = ${B0}e^{0.0${b}t}$. Which statement is true for large $t$?`,
        correct,
        distractors: [
          `A \\text{ always exceeds } B, \\text{ because it starts larger.}`,
          `\\text{The two populations stay in the same ratio.}`,
          `B \\text{ never catches } A, \\text{ because } ${B0} < ${A0}.`,
        ],
        explanation: `The ratio $\\frac{B}{A} = \\frac{${B0}}{${A0}}e^{0.0${b - a}t}$ grows without bound, so the larger exponent wins regardless of the starting values.`,
      };
    },
  },
  {
    id: "g7-euler-one-step",
    unit: U7,
    topic: "eulers-method",
    difficulty: "medium",
    track: "bc",
    manifestation: "eulers-method:one-step",
    build: (r: RNG) => {
      const y0 = ri(r, 1, 5);
      const h = pick(r, [0.1, 0.2, 0.5] as const);
      const x0 = ri(r, 1, 3);
      const slope = x0 + y0;
      const y1 = y0 + h * slope;
      const correct = dec(y1, 3);
      return {
        prompt: `Let $\\dfrac{dy}{dx} = x + y$ with $y(${x0}) = ${y0}$. Use one step of Euler's method with step size $${h}$ to approximate $y(${dec(x0 + h, 2)})$.`,
        correct,
        distractors: opts(correct, [dec(y0 + slope, 3), dec(y0 + h, 3), dec(y0 + h * y0, 3), dec(y0 + 2 * h * slope, 3)]),
        explanation: `The slope at $(${x0},${y0})$ is $${slope}$, so the update is $${y0} + ${h}(${slope}) = ${correct}$.`,
      };
    },
  },
  {
    id: "g7-euler-step-size",
    unit: U7,
    topic: "eulers-method",
    difficulty: "medium",
    track: "bc",
    manifestation: "eulers-method:step-size",
    build: (r: RNG) => {
      const correct = `\\text{The approximation generally becomes more accurate.}`;
      return {
        prompt: `In Euler's method, what is the effect of halving the step size while keeping the same target $x$-value?`,
        correct,
        distractors: [
          `\\text{The approximation becomes exact.}`,
          `\\text{The approximation generally becomes less accurate.}`,
          `\\text{The approximation is unchanged.}`,
        ],
        explanation: `Smaller steps follow the curve more closely, reducing accumulated error, though the result is still an approximation.`,
      };
    },
  },
  {
    id: "g7-euler-over-under",
    unit: U7,
    topic: "eulers-method",
    difficulty: "hard",
    track: "bc",
    manifestation: "eulers-method:over-under",
    build: (r: RNG) => {
      const correct = `\\text{An underestimate, because the solution is concave up.}`;
      return {
        prompt: `A solution curve of a differential equation is concave up on the interval used. How does an Euler's method approximation compare with the true value?`,
        correct,
        distractors: [
          `\\text{An overestimate, because the solution is concave up.}`,
          `\\text{Exact, because the tangent line matches the curve.}`,
          `\\text{It cannot be determined from concavity.}`,
        ],
        explanation: `Each Euler step follows a tangent line, and tangent lines lie below a concave-up curve, so the approximation underestimates.`,
      };
    },
  },
  {
    id: "g7-euler-formula-error",
    unit: U7,
    topic: "eulers-method",
    difficulty: "medium",
    track: "bc",
    manifestation: "eulers-method:formula-error",
    build: (r: RNG) => {
      const correct = `y_{n+1} = y_{n} + h\\cdot f\\left(x_{n}, y_{n}\\right)`;
      return {
        prompt: `Which statement of the Euler update is correct for $\\dfrac{dy}{dx} = f(x,y)$ with step size $h$?`,
        correct,
        distractors: [
          `y_{n+1} = y_{n} + f\\left(x_{n}, y_{n}\\right)`,
          `y_{n+1} = y_{n} + h\\cdot f\\left(x_{n+1}, y_{n+1}\\right)`,
          `y_{n+1} = h\\cdot f\\left(x_{n}, y_{n}\\right)`,
        ],
        explanation: `The change in $y$ is the slope at the current point times the step size, so the increment is $h\\cdot f(x_{n}, y_{n})$.`,
      };
    },
  },
  {
    id: "g7-logistic-capacity",
    unit: U7,
    topic: "logistic-growth",
    difficulty: "medium",
    track: "bc",
    manifestation: "logistic-growth:carrying-capacity",
    build: (r: RNG) => {
      const M = pick(r, [400, 600, 900, 1200] as const);
      const k = pick(r, [0.02, 0.05, 0.1] as const);
      const correct = `${M}`;
      return {
        prompt: `A population satisfies $\\dfrac{dP}{dt} = ${k}P\\left(1 - \\dfrac{P}{${M}}\\right)$. What is the carrying capacity?`,
        correct,
        distractors: opts(correct, [`${M / 2}`, `${2 * M}`, `${Math.round(k * M)}`, `0`]),
        explanation: `The logistic form $kP\\left(1 - \\frac{P}{M}\\right)$ has carrying capacity $M = ${M}$, the nonzero equilibrium value.`,
      };
    },
  },
  {
    id: "g7-logistic-long-term",
    unit: U7,
    topic: "logistic-growth",
    difficulty: "medium",
    track: "bc",
    manifestation: "logistic-growth:long-term",
    build: (r: RNG) => {
      const M = pick(r, [500, 800, 1000] as const);
      const P0 = M / 4;
      const correct = `P \\to ${M}`;
      return {
        prompt: `A population with $P(0) = ${P0}$ satisfies $\\dfrac{dP}{dt} = 0.03P\\left(1 - \\dfrac{P}{${M}}\\right)$. What happens as $t\\to\\infty$?`,
        correct,
        distractors: [`P \\to ${M / 2}`, `P \\to \\infty`, `P \\to ${P0}`],
        explanation: `Starting below the carrying capacity, the population increases and approaches $${M}$ without exceeding it. Half the capacity is where growth is fastest, not the limit.`,
      };
    },
  },
  {
    id: "g7-logistic-from-context",
    unit: U7,
    topic: "logistic-growth",
    difficulty: "hard",
    track: "bc",
    manifestation: "logistic-growth:from-context",
    build: (r: RNG) => {
      const M = pick(r, [250, 600, 1500] as const);
      const correct = `\\dfrac{dP}{dt} = kP\\left(1 - \\dfrac{P}{${M}}\\right)`;
      return {
        prompt: `A fish population grows at a rate jointly proportional to the current population and to the remaining room below the maximum sustainable level of $${M}$ fish. Which model fits?`,
        correct,
        distractors: [
          `\\dfrac{dP}{dt} = kP`,
          `\\dfrac{dP}{dt} = k\\left(${M} - P\\right)`,
          `\\dfrac{dP}{dt} = \\dfrac{kP}{${M} - P}`,
        ],
        explanation: `"Jointly proportional to $P$ and to the remaining room" produces the logistic product $kP\\left(1 - \\frac{P}{${M}}\\right)$.`,
      };
    },
  },
  {
    id: "g7-logistic-graph-shape",
    unit: U7,
    topic: "logistic-growth",
    difficulty: "medium",
    track: "bc",
    manifestation: "logistic-growth:graph-shape",
    build: (r: RNG) => {
      const M = pick(r, [200, 400, 1000] as const);
      const correct = `P = ${M / 2}`;
      return {
        prompt: `For a logistic model with carrying capacity $${M}$ and an initial value below it, at what population is the growth rate greatest?`,
        correct,
        distractors: opts(correct, [`${M}`, `${M / 4}`, `0`, `${Math.round(0.75 * M)}`]),
        explanation: `The growth rate $kP\\left(1 - \\frac{P}{${M}}\\right)$ is a downward parabola in $P$ with maximum at half the carrying capacity, which is also the inflection point of the solution curve.`,
      };
    },
  },
);

/* ------------------------------------------------------------------ */
/* Unit 8 — Applications of integration                                */
/* ------------------------------------------------------------------ */

const U8 = "unit-8-applications-of-integration";

GAP_TEMPLATES.push(
  {
    id: "g8-avg-graph",
    unit: U8,
    topic: "average-value",
    difficulty: "medium",
    manifestation: "average-value:graph",
    build: (r: RNG) => {
      const h = ri(r, 2, 6);
      const pts: Array<[number, number]> = [
        [0, 0],
        [2, h],
        [4, 0],
      ];
      const avg = (0.5 * 4 * h) / 4;
      const correct = dec(avg, 3);
      return {
        prompt: `The graph of $f$ shown consists of two line segments. Find the average value of $f$ on $[0,4]$.`,
        figure: graph("y = f(x)", pts, { xMin: -1, xMax: 5, yMin: -1, yMax: h + 2 }),
        correct,
        distractors: opts(correct, [dec(h, 3), dec(2 * avg, 3), dec(avg / 2, 3), dec(4 * avg, 3)]),
        explanation: `The area is $\\frac{1}{2}(4)(${h}) = ${dec(2 * h, 3)}$, so the average value is $\\frac{1}{4}\\cdot ${dec(2 * h, 3)} = ${correct}$.`,
      };
    },
  },
  {
    id: "g8-avg-table",
    unit: U8,
    topic: "average-value",
    difficulty: "medium",
    calculator: true,
    manifestation: "average-value:table",
    build: (r: RNG) => {
      const xs = [0, 2, 4];
      const a = ri(r, 2, 6);
      const b = a + ri(r, 1, 4);
      const c = b + ri(r, 1, 4);
      const trap = 2 * ((a + b) / 2 + (b + c) / 2);
      const avg = trap / 4;
      const correct = dec(avg, 3);
      return {
        prompt: `Values of the continuous function $f$ are given.\n\n${tablePair("f(x)", xs, [`${a}`, `${b}`, `${c}`])}\n\nUse a trapezoidal sum with the two subintervals to approximate the average value of $f$ on $[0,4]$.`,
        correct,
        distractors: opts(correct, [dec(trap, 3), dec((a + b + c) / 3, 3), dec(avg / 2, 3), dec(2 * avg, 3)]),
        explanation: `The trapezoidal estimate of the integral is $${dec(trap, 3)}$, and dividing by the length $4$ gives an average value of $${correct}$.`,
      };
    },
  },
  {
    id: "g8-avg-context-units",
    unit: U8,
    topic: "average-value",
    difficulty: "medium",
    manifestation: "average-value:context-units",
    build: (r: RNG) => {
      const T = pick(r, [4, 6, 8] as const);
      const correct = `\\text{the average speed, in meters per second, over the } ${T} \\text{ seconds}`;
      return {
        prompt: `A particle moves with speed $v(t)$ meters per second. What does $\\dfrac{1}{${T}}\\displaystyle\\int_{0}^{${T}} v(t)\\,dt$ represent?`,
        correct,
        distractors: [
          `\\text{the total distance travelled, in meters}`,
          `\\text{the acceleration, in meters per second squared}`,
          `\\text{the change in speed, in meters per second}`,
        ],
        explanation: `The integral gives distance in meters; dividing by the elapsed time gives an average speed in meters per second.`,
      };
    },
  },
  {
    id: "g8-avg-reverse",
    unit: U8,
    topic: "average-value",
    difficulty: "hard",
    manifestation: "average-value:reverse",
    build: (r: RNG) => {
      const target = pick(r, [3, 12, 27, 48] as const);
      const b = Math.sqrt(3 * target);
      const correct = dec(b, 3);
      return {
        prompt: `For what positive value of $b$ does $f(x)=x^{2}$ have average value $${target}$ on $[0,b]$?`,
        correct,
        distractors: opts(correct, [dec(target, 3), dec(Math.sqrt(target), 3), dec(3 * target, 3), dec(b / 3, 3)]),
        explanation: `The average value is $\\frac{1}{b}\\cdot\\frac{b^{3}}{3} = \\frac{b^{2}}{3}$. Setting this equal to $${target}$ gives $b = \\sqrt{${3 * target}} = ${correct}$.`,
      };
    },
  },
  {
    id: "g8-area-dy-setup",
    unit: U8,
    topic: "area-between-curves",
    difficulty: "hard",
    manifestation: "area-between-curves:dy-setup",
    build: (r: RNG) => {
      const b = pick(r, [2, 3, 4] as const);
      const correct = `\\displaystyle\\int_{0}^{${b}} y^{2}\\,dy`;
      return {
        prompt: `Set up the area of the region bounded by $x = y^{2}$, the $y$-axis, and $y = ${b}$ as an integral with respect to $y$.`,
        correct,
        distractors: [
          `\\displaystyle\\int_{0}^{${b}} \\sqrt{y}\\,dy`,
          `\\displaystyle\\int_{0}^{${b * b}} y^{2}\\,dy`,
          `\\displaystyle\\int_{0}^{${b}} \\left(${b} - y^{2}\\right)\\,dy`,
        ],
        explanation: `Horizontal strips have length $x = y^{2}$ measured from the $y$-axis, and $y$ runs from $0$ to $${b}$.`,
      };
    },
  },
  {
    id: "g8-area-switching-top",
    unit: U8,
    topic: "area-between-curves",
    difficulty: "hard",
    manifestation: "area-between-curves:switching-top",
    build: (r: RNG) => {
      const correct = `\\displaystyle\\int_{0}^{1}\\left(\\sqrt{x} - x^{2}\\right)dx + \\int_{1}^{2}\\left(x^{2} - \\sqrt{x}\\right)dx`;
      return {
        prompt: `Which expression gives the total area of the regions between $y=\\sqrt{x}$ and $y=x^{2}$ for $0\\le x\\le 2$?`,
        correct,
        distractors: [
          `\\displaystyle\\int_{0}^{2}\\left(\\sqrt{x} - x^{2}\\right)dx`,
          `\\displaystyle\\int_{0}^{2}\\left(x^{2} - \\sqrt{x}\\right)dx`,
          `\\displaystyle\\int_{0}^{1}\\left(x^{2} - \\sqrt{x}\\right)dx + \\int_{1}^{2}\\left(\\sqrt{x} - x^{2}\\right)dx`,
        ],
        explanation: `The curves cross at $x=1$: $\\sqrt{x}$ is on top before the crossing and $x^{2}$ is on top after, so the integral must be split with the correct order on each piece.`,
      };
    },
  },
  {
    id: "g8-area-setup-only",
    unit: U8,
    topic: "area-between-curves",
    difficulty: "medium",
    manifestation: "area-between-curves:setup-only",
    build: (r: RNG) => {
      const m = ri(r, 1, 4);
      const correct = `\\displaystyle\\int_{0}^{${m}}\\left(${coefTex(m)}x - x^{2}\\right)dx`;
      return {
        prompt: `Which integral gives the area of the region enclosed by $y = ${coefTex(m)}x$ and $y = x^{2}$?`,
        correct,
        distractors: [
          `\\displaystyle\\int_{0}^{${m}}\\left(x^{2} - ${coefTex(m)}x\\right)dx`,
          `\\displaystyle\\int_{0}^{${m}}\\left(${coefTex(m)}x + x^{2}\\right)dx`,
          `\\displaystyle\\int_{0}^{${m * m}}\\left(${coefTex(m)}x - x^{2}\\right)dx`,
        ],
        explanation: `The curves meet where $${coefTex(m)}x = x^{2}$, at $x=0$ and $x=${m}$, and the line is above the parabola between them.`,
      };
    },
  },
  {
    id: "g8-area-signed-vs-geometric",
    unit: U8,
    topic: "area-between-curves",
    difficulty: "medium",
    manifestation: "area-between-curves:signed-vs-geometric",
    build: (r: RNG) => {
      void r;
      const correct = `\\text{The integral is } 0, \\text{ but the geometric area is } 4.`;
      return {
        prompt: `Compare $\\displaystyle\\int_{0}^{2\\pi} \\sin(x)\\,dx$ with the total area between the graph of $\\sin(x)$ and the $x$-axis on $[0,2\\pi]$.`,
        correct,
        distractors: [
          `\\text{Both equal } 0.`,
          `\\text{Both equal } 4.`,
          `\\text{The integral is } 4, \\text{ but the geometric area is } 0.`,
        ],
        explanation: `Each hump has area $2$. The signed areas cancel, so the integral is $0$, while the geometric area adds the magnitudes: $2 + 2 = 4$.`,
      };
    },
  },
  {
    id: "g8-washer",
    unit: U8,
    topic: "volume-disks-and-washers",
    difficulty: "hard",
    manifestation: "volume-disks-and-washers:washer",
    build: (r: RNG) => {
      const correct = `\\pi\\displaystyle\\int_{0}^{1}\\left(x - x^{4}\\right)dx`;
      return {
        prompt: `The region between $y=\\sqrt{x}$ and $y=x^{2}$ for $0\\le x\\le 1$ is revolved about the $x$-axis. Which integral gives the volume?`,
        correct,
        distractors: [
          `\\pi\\displaystyle\\int_{0}^{1}\\left(\\sqrt{x} - x^{2}\\right)^{2}dx`,
          `\\pi\\displaystyle\\int_{0}^{1}\\left(x^{4} - x\\right)dx`,
          `2\\pi\\displaystyle\\int_{0}^{1}\\left(x - x^{4}\\right)dx`,
        ],
        explanation: `A washer has outer radius $\\sqrt{x}$ and inner radius $x^{2}$, so the integrand is $\\pi\\left(x - x^{4}\\right)$; squaring the difference of radii is a common error.`,
      };
    },
  },
  {
    id: "g8-shifted-axis",
    unit: U8,
    topic: "volume-disks-and-washers",
    difficulty: "hard",
    manifestation: "volume-disks-and-washers:shifted-axis",
    build: (r: RNG) => {
      const c = ri(r, 1, 4);
      const correct = `\\pi\\displaystyle\\int_{0}^{1}\\left(\\sqrt{x} + ${c}\\right)^{2} - ${c}^{2}\\,dx`;
      return {
        prompt: `The region between $y=\\sqrt{x}$ and the $x$-axis for $0\\le x\\le 1$ is revolved about the line $y=-${c}$. Which integral gives the volume?`,
        correct,
        distractors: [
          `\\pi\\displaystyle\\int_{0}^{1}\\left(\\sqrt{x} + ${c}\\right)^{2}dx`,
          `\\pi\\displaystyle\\int_{0}^{1}\\left(\\sqrt{x} - ${c}\\right)^{2}dx`,
          `\\pi\\displaystyle\\int_{0}^{1}\\left(x + ${c}^{2}\\right)dx`,
        ],
        explanation: `Distances are measured from $y=-${c}$: the outer radius is $\\sqrt{x}+${c}$ and the inner radius is $${c}$, so the hole must be subtracted.`,
      };
    },
  },
  {
    id: "g8-about-y",
    unit: U8,
    topic: "volume-disks-and-washers",
    difficulty: "hard",
    manifestation: "volume-disks-and-washers:about-y",
    build: (r: RNG) => {
      const b = pick(r, [1, 2, 3] as const);
      const correct = `\\pi\\displaystyle\\int_{0}^{${b}} y^{4}\\,dy`;
      return {
        prompt: `The region bounded by $x=y^{2}$, the $y$-axis, and $y=${b}$ is revolved about the $y$-axis. Which integral gives the volume?`,
        correct,
        distractors: [
          `\\pi\\displaystyle\\int_{0}^{${b}} y^{2}\\,dy`,
          `\\pi\\displaystyle\\int_{0}^{${b}} x^{4}\\,dx`,
          `2\\pi\\displaystyle\\int_{0}^{${b}} y^{4}\\,dy`,
        ],
        explanation: `Revolving about a vertical axis uses horizontal disks of radius $x=y^{2}$, so the integrand is $\\pi\\left(y^{2}\\right)^{2} = \\pi y^{4}$ with respect to $y$.`,
      };
    },
  },
  {
    id: "g8-cross-triangle",
    unit: U8,
    topic: "volume-known-cross-sections",
    difficulty: "hard",
    manifestation: "volume-known-cross-sections:triangle",
    build: (r: RNG) => {
      const b = pick(r, [2, 3, 4] as const);
      const correct = `\\dfrac{\\sqrt{3}}{4}\\displaystyle\\int_{0}^{${b}} x^{2}\\,dx`;
      return {
        prompt: `A solid has base the region between $y=x$ and the $x$-axis for $0\\le x\\le ${b}$. Cross sections perpendicular to the $x$-axis are equilateral triangles. Which integral gives the volume?`,
        correct,
        distractors: [
          `\\displaystyle\\int_{0}^{${b}} x^{2}\\,dx`,
          `\\dfrac{1}{2}\\displaystyle\\int_{0}^{${b}} x^{2}\\,dx`,
          `\\dfrac{\\sqrt{3}}{4}\\displaystyle\\int_{0}^{${b}} x\\,dx`,
        ],
        explanation: `The side length equals the height of the region, $x$, and an equilateral triangle of side $s$ has area $\\frac{\\sqrt{3}}{4}s^{2}$.`,
      };
    },
  },
  {
    id: "g8-cross-semicircle",
    unit: U8,
    topic: "volume-known-cross-sections",
    difficulty: "hard",
    manifestation: "volume-known-cross-sections:semicircle",
    build: (r: RNG) => {
      const b = pick(r, [2, 4, 6] as const);
      const correct = `\\dfrac{\\pi}{8}\\displaystyle\\int_{0}^{${b}} x^{2}\\,dx`;
      return {
        prompt: `A solid has base the region between $y=x$ and the $x$-axis for $0\\le x\\le ${b}$. Cross sections perpendicular to the $x$-axis are semicircles with diameter in the base. Which integral gives the volume?`,
        correct,
        distractors: [
          `\\dfrac{\\pi}{2}\\displaystyle\\int_{0}^{${b}} x^{2}\\,dx`,
          `\\dfrac{\\pi}{4}\\displaystyle\\int_{0}^{${b}} x^{2}\\,dx`,
          `\\pi\\displaystyle\\int_{0}^{${b}} x^{2}\\,dx`,
        ],
        explanation: `With diameter $x$, the radius is $\\frac{x}{2}$ and the semicircular area is $\\frac{1}{2}\\pi\\left(\\frac{x}{2}\\right)^{2} = \\frac{\\pi}{8}x^{2}$.`,
      };
    },
  },
  {
    id: "g8-cross-perp-y",
    unit: U8,
    topic: "volume-known-cross-sections",
    difficulty: "hard",
    manifestation: "volume-known-cross-sections:perpendicular-y",
    build: (r: RNG) => {
      const b = pick(r, [1, 2, 3] as const);
      const correct = `\\displaystyle\\int_{0}^{${b}} y^{4}\\,dy`;
      return {
        prompt: `A solid has base the region bounded by $x=y^{2}$, the $y$-axis, and $y=${b}$. Cross sections perpendicular to the $y$-axis are squares. Which integral gives the volume?`,
        correct,
        distractors: [
          `\\displaystyle\\int_{0}^{${b}} y^{2}\\,dy`,
          `\\displaystyle\\int_{0}^{${b}} x^{4}\\,dx`,
          `\\pi\\displaystyle\\int_{0}^{${b}} y^{4}\\,dy`,
        ],
        explanation: `Cross sections perpendicular to the $y$-axis have side $x = y^{2}$, so the area is $\\left(y^{2}\\right)^{2}$ and the variable of integration is $y$. No factor of $\\pi$ appears for squares.`,
      };
    },
  },
  {
    id: "g8-cross-setup-only",
    unit: U8,
    topic: "volume-known-cross-sections",
    difficulty: "medium",
    manifestation: "volume-known-cross-sections:setup-only",
    build: (r: RNG) => {
      const h = ri(r, 2, 5);
      const pts: Array<[number, number]> = [
        [0, h],
        [4, 0],
      ];
      const correct = `\\displaystyle\\int_{0}^{4}\\left(${h} - \\dfrac{${h}}{4}x\\right)^{2}dx`;
      return {
        prompt: `The base of a solid is the region under the segment shown and above the $x$-axis on $[0,4]$. Cross sections perpendicular to the $x$-axis are squares. Which integral gives the volume?`,
        figure: graph("y = f(x)", pts, { xMin: -1, xMax: 5, yMin: -1, yMax: h + 2 }),
        correct,
        distractors: [
          `\\displaystyle\\int_{0}^{4}\\left(${h} - \\dfrac{${h}}{4}x\\right)dx`,
          `\\pi\\displaystyle\\int_{0}^{4}\\left(${h} - \\dfrac{${h}}{4}x\\right)^{2}dx`,
          `\\displaystyle\\int_{0}^{${h}}\\left(${h} - \\dfrac{${h}}{4}x\\right)^{2}dx`,
        ],
        explanation: `The segment is $y = ${h} - \\frac{${h}}{4}x$, the side of each square, so the integrand is its square and $x$ runs from $0$ to $4$.`,
      };
    },
  },
  {
    id: "g8-arc-compute",
    unit: U8,
    topic: "arc-length",
    difficulty: "hard",
    track: "bc",
    calculator: true,
    manifestation: "arc-length:compute",
    build: (r: RNG) => {
      const m = ri(r, 2, 5);
      const b = ri(r, 2, 6);
      const len = b * Math.sqrt(1 + m * m);
      const correct = dec(len, 3);
      return {
        prompt: `Find the length of the graph of $y = ${coefTex(m)}x$ from $x=0$ to $x=${b}$.`,
        correct,
        distractors: opts(correct, [dec(b, 3), dec(m * b, 3), dec(b * (1 + m * m), 3), dec(len / 2, 3)]),
        explanation: `The arc length integral gives $\\int_{0}^{${b}}\\sqrt{1 + ${m * m}}\\,dx = ${b}\\sqrt{${1 + m * m}} = ${correct}$.`,
      };
    },
  },
  {
    id: "g8-arc-compare-chord",
    unit: U8,
    topic: "arc-length",
    difficulty: "medium",
    track: "bc",
    manifestation: "arc-length:compare-chord",
    build: (r: RNG) => {
      const correct = `\\text{The arc length is greater, unless the curve is a straight segment.}`;
      return {
        prompt: `How does the arc length of a smooth curve between two points compare with the straight-line distance between them?`,
        correct,
        distractors: [
          `\\text{The arc length is smaller.}`,
          `\\text{They are always equal.}`,
          `\\text{The comparison depends on the concavity.}`,
        ],
        explanation: `The straight segment is the shortest path between the endpoints, so any curved path is longer, with equality only for the segment itself.`,
      };
    },
  },
  {
    id: "g8-arc-context",
    unit: U8,
    topic: "arc-length",
    difficulty: "medium",
    track: "bc",
    manifestation: "arc-length:context",
    build: (r: RNG) => {
      const correct = `\\text{the length of the path travelled along the curve}`;
      return {
        prompt: `A hiker's route follows the graph of a smooth function. What does $\\displaystyle\\int_{a}^{b}\\sqrt{1 + \\left(f'(x)\\right)^{2}}\\,dx$ represent?`,
        correct,
        distractors: [
          `\\text{the horizontal distance covered}`,
          `\\text{the net change in elevation}`,
          `\\text{the average steepness of the route}`,
        ],
        explanation: `That integral accumulates the arc length element, giving the total distance travelled along the curve rather than a horizontal or vertical change.`,
      };
    },
  },
  {
    id: "g8-accum-max-amount",
    unit: U8,
    topic: "accumulation-in-context",
    difficulty: "hard",
    manifestation: "accumulation-in-context:max-amount",
    build: (r: RNG) => {
      const t = ri(r, 2, 6);
      const correct = `\\text{at } t = ${t}, \\text{ where the inflow rate equals the outflow rate}`;
      return {
        prompt: `Water enters a tank at rate $I(t)$ and leaves at rate $O(t)$, with $I(t) > O(t)$ for $t < ${t}$ and $I(t) < O(t)$ for $t > ${t}$. When is the amount of water greatest?`,
        correct,
        distractors: [
          `\\text{at } t = 0`,
          `\\text{when } I \\text{ is greatest}`,
          `\\text{at the end of the time interval}`,
        ],
        explanation: `The net rate $I - O$ changes from positive to negative at $t=${t}$, so the accumulated amount rises then falls and is greatest there.`,
      };
    },
  },
  {
    id: "g8-accum-graph-rate",
    unit: U8,
    topic: "accumulation-in-context",
    difficulty: "medium",
    manifestation: "accumulation-in-context:graph-rate",
    build: (r: RNG) => {
      const h = ri(r, 2, 6);
      const pts: Array<[number, number]> = [
        [0, 0],
        [3, h],
        [6, 0],
      ];
      const total = 0.5 * 6 * h;
      const correct = dec(total, 3);
      return {
        prompt: `Sand is added to a pile at the rate $R(t)$ tons per hour, whose graph consists of the two segments shown. How many tons are added over $0\\le t\\le 6$?`,
        figure: graph("y = R(t)", pts, { xMin: -1, xMax: 7, yMin: -1, yMax: h + 2 }),
        correct,
        distractors: opts(correct, [dec(h, 3), dec(total / 2, 3), dec(2 * total, 3), dec(6 * h, 3)]),
        explanation: `The amount added is the area under the rate graph: a triangle with base $6$ and height $${h}$, so $\\frac{1}{2}(6)(${h}) = ${correct}$ tons.`,
      };
    },
  },
  {
    id: "g8-accum-table-rate",
    unit: U8,
    topic: "accumulation-in-context",
    difficulty: "medium",
    calculator: true,
    manifestation: "accumulation-in-context:table-rate",
    build: (r: RNG) => {
      const xs = [0, 3, 6];
      const a = ri(r, 2, 8);
      const b = a + ri(r, 1, 5);
      const c = b + ri(r, 1, 5);
      const left = 3 * (a + b);
      const correct = dec(left, 3);
      return {
        prompt: `Oil flows from a well at the rate $R(t)$ barrels per hour, sampled below.\n\n${tablePair("R(t)", xs, [`${a}`, `${b}`, `${c}`])}\n\nUse a left Riemann sum with the two subintervals to approximate the barrels produced over $0\\le t\\le 6$.`,
        correct,
        distractors: opts(correct, [dec(3 * (b + c), 3), dec(a + b, 3), dec(6 * a, 3), dec(left / 2, 3)]),
        explanation: `Each subinterval has width $3$, and the left endpoints give rates $${a}$ and $${b}$, so the estimate is $3(${a}) + 3(${b}) = ${correct}$ barrels.`,
      };
    },
  },
  {
    id: "g8-accum-units",
    unit: U8,
    topic: "accumulation-in-context",
    difficulty: "medium",
    manifestation: "accumulation-in-context:units",
    build: (r: RNG) => {
      const correct = `\\text{gallons}`;
      return {
        prompt: `Fuel is consumed at the rate $C(t)$ gallons per minute. What are the units of $\\displaystyle\\int_{0}^{20} C(t)\\,dt$?`,
        correct,
        distractors: [`\\text{gallons per minute}`, `\\text{minutes}`, `\\text{gallons per minute squared}`],
        explanation: `Integrating a rate in gallons per minute with respect to minutes multiplies out the time unit, leaving gallons.`,
      };
    },
  },
);

/* ------------------------------------------------------------------ */
/* Unit 9 — Parametric, polar, and vector-valued functions (BC)        */
/* ------------------------------------------------------------------ */

const U9 = "unit-9-parametric-polar-vector";

GAP_TEMPLATES.push(
  {
    id: "g9-param-tangent-line",
    unit: U9,
    topic: "parametric-derivatives",
    difficulty: "hard",
    track: "bc",
    manifestation: "parametric-derivatives:tangent-line",
    build: (r: RNG) => {
      const t0 = ri(r, 1, 4);
      // x = t^2, y = t^3 ; dy/dx = 3t/2
      const slope = (3 * t0) / 2;
      const x0 = t0 * t0;
      const y0 = t0 ** 3;
      const correct = `y - ${y0} = ${dec(slope, 3)}\\left(x - ${x0}\\right)`;
      return {
        prompt: `A curve is given by $x = t^{2}$ and $y = t^{3}$. Find an equation of the tangent line at $t = ${t0}$.`,
        correct,
        distractors: [
          `y - ${y0} = ${dec(3 * t0 * t0, 3)}\\left(x - ${x0}\\right)`,
          `y - ${x0} = ${dec(slope, 3)}\\left(x - ${y0}\\right)`,
          `y - ${y0} = ${dec(2 * t0, 3)}\\left(x - ${x0}\\right)`,
        ],
        explanation: `$\\frac{dy}{dx} = \\frac{3t^{2}}{2t} = \\frac{3t}{2}$, which is $${dec(slope, 3)}$ at $t=${t0}$, and the point is $(${x0}, ${y0})$.`,
      };
    },
  },
  {
    id: "g9-param-eliminate",
    unit: U9,
    topic: "parametric-derivatives",
    difficulty: "medium",
    track: "bc",
    manifestation: "parametric-derivatives:eliminate-parameter",
    build: (r: RNG) => {
      const k = ri(r, 1, 5);
      const correct = `y = x^{2} + ${k}`;
      return {
        prompt: `Eliminate the parameter for $x = t$, $y = t^{2} + ${k}$.`,
        correct,
        distractors: [`y = x + ${k}`, `y = \\left(x + ${k}\\right)^{2}`, `x = y^{2} + ${k}`],
        explanation: `Since $x=t$, substituting gives $y = x^{2} + ${k}$.`,
      };
    },
  },
  {
    id: "g9-param-error",
    unit: U9,
    topic: "parametric-derivatives",
    difficulty: "medium",
    track: "bc",
    manifestation: "parametric-derivatives:error-analysis",
    build: (r: RNG) => {
      void r;
      const correct = `\\dfrac{dy}{dx} = \\dfrac{dy/dt}{dx/dt}`;
      return {
        prompt: `Which formula correctly gives the slope of a parametric curve?`,
        correct,
        distractors: [
          `\\dfrac{dy}{dx} = \\dfrac{dx/dt}{dy/dt}`,
          `\\dfrac{dy}{dx} = \\dfrac{dy}{dt}\\cdot\\dfrac{dx}{dt}`,
          `\\dfrac{dy}{dx} = \\dfrac{dy}{dt} - \\dfrac{dx}{dt}`,
        ],
        explanation: `The chain rule gives $\\frac{dy}{dt} = \\frac{dy}{dx}\\cdot\\frac{dx}{dt}$, so the slope is the quotient of the $t$-derivatives with $dy/dt$ on top.`,
      };
    },
  },
  {
    id: "g9-param-arc-setup",
    unit: U9,
    topic: "parametric-arc-length",
    difficulty: "medium",
    track: "bc",
    manifestation: "parametric-arc-length:setup",
    build: (r: RNG) => {
      const b = ri(r, 1, 5);
      const correct = `\\displaystyle\\int_{0}^{${b}}\\sqrt{4t^{2} + 9t^{4}}\\,dt`;
      return {
        prompt: `For $x = t^{2}$ and $y = t^{3}$, which integral gives the length of the curve for $0\\le t\\le ${b}$?`,
        correct,
        distractors: [
          `\\displaystyle\\int_{0}^{${b}}\\sqrt{2t + 3t^{2}}\\,dt`,
          `\\displaystyle\\int_{0}^{${b}}\\left(2t + 3t^{2}\\right)dt`,
          `\\displaystyle\\int_{0}^{${b}}\\sqrt{1 + 9t^{4}}\\,dt`,
        ],
        explanation: `With $\\frac{dx}{dt} = 2t$ and $\\frac{dy}{dt} = 3t^{2}$, the arc length integrand is $\\sqrt{(2t)^{2} + \\left(3t^{2}\\right)^{2}}$.`,
      };
    },
  },
  {
    id: "g9-param-distance-vs-displacement",
    unit: U9,
    topic: "parametric-arc-length",
    difficulty: "hard",
    track: "bc",
    manifestation: "parametric-arc-length:distance-vs-displacement",
    build: (r: RNG) => {
      void r;
      const correct = `\\text{Distance is the integral of speed; displacement is the change in position.}`;
      return {
        prompt: `For a particle moving along a parametric path, how do total distance travelled and displacement differ?`,
        correct,
        distractors: [
          `\\text{They are always equal.}`,
          `\\text{Displacement is the integral of speed; distance is the change in position.}`,
          `\\text{Distance is always smaller than the magnitude of displacement.}`,
        ],
        explanation: `Distance accumulates $\\sqrt{(dx/dt)^{2} + (dy/dt)^{2}}$, which is never negative, while displacement is the vector difference of the endpoints and can be smaller in magnitude.`,
      };
    },
  },
  {
    id: "g9-param-bounds",
    unit: U9,
    topic: "parametric-arc-length",
    difficulty: "medium",
    track: "bc",
    manifestation: "parametric-arc-length:bounds",
    build: (r: RNG) => {
      void r;
      const correct = `0 \\le t \\le 2\\pi`;
      return {
        prompt: `The circle $x = \\cos(t)$, $y = \\sin(t)$ is traced once. Which parameter interval should be used for its arc length?`,
        correct,
        distractors: [`0 \\le t \\le \\pi`, `0 \\le t \\le 4\\pi`, `-1 \\le t \\le 1`],
        explanation: `One full trip around the circle takes $t$ from $0$ to $2\\pi$; a larger interval retraces the curve and doubles the computed length.`,
      };
    },
  },
  {
    id: "g9-vector-position-from-velocity",
    unit: U9,
    topic: "vector-valued-functions",
    difficulty: "hard",
    track: "bc",
    manifestation: "vector-valued-functions:position-from-velocity",
    build: (r: RNG) => {
      const x0 = ri(r, 1, 5);
      const y0 = ri(r, 1, 5);
      const k = ri(r, 2, 5);
      const correct = `\\left\\langle ${x0} + \\dfrac{t^{2}}{2},\\; ${y0} + ${k}t \\right\\rangle`;
      return {
        prompt: `A particle has velocity $\\left\\langle t, ${k} \\right\\rangle$ and position $\\left\\langle ${x0}, ${y0} \\right\\rangle$ at $t=0$. Find its position at time $t$.`,
        correct,
        distractors: [
          `\\left\\langle ${x0} + t,\\; ${y0} + ${k} \\right\\rangle`,
          `\\left\\langle \\dfrac{t^{2}}{2},\\; ${k}t \\right\\rangle`,
          `\\left\\langle ${x0} + t^{2},\\; ${y0} + ${k}t \\right\\rangle`,
        ],
        explanation: `Integrate each component and use the initial position as the constant: $x = ${x0} + \\frac{t^{2}}{2}$ and $y = ${y0} + ${k}t$.`,
      };
    },
  },
  {
    id: "g9-vector-components",
    unit: U9,
    topic: "vector-valued-functions",
    difficulty: "medium",
    track: "bc",
    manifestation: "vector-valued-functions:component-analysis",
    build: (r: RNG) => {
      const a = ri(r, 1, 5);
      const correct = `\\text{It moves left when } t < ${a} \\text{ and right when } t > ${a}.`;
      return {
        prompt: `A particle has velocity $\\left\\langle t - ${a},\\; t^{2} + 1 \\right\\rangle$. Describe its horizontal motion.`,
        correct,
        distractors: [
          `\\text{It moves right for all } t.`,
          `\\text{It moves left for all } t.`,
          `\\text{It is at rest at } t = ${a}, \\text{ then moves down.}`,
        ],
        explanation: `The horizontal velocity $t - ${a}$ is negative before $t=${a}$ and positive afterward, so the particle moves left then right. The vertical component is always positive.`,
      };
    },
  },
  {
    id: "g9-vector-total-distance",
    unit: U9,
    topic: "vector-valued-functions",
    difficulty: "hard",
    track: "bc",
    calculator: true,
    manifestation: "vector-valued-functions:total-distance",
    build: (r: RNG) => {
      const b = ri(r, 1, 4);
      const k = ri(r, 2, 5);
      const speed = Math.sqrt(1 + k * k);
      const total = b * speed;
      const correct = dec(total, 3);
      return {
        prompt: `A particle has velocity $\\left\\langle 1, ${k} \\right\\rangle$ for $0\\le t\\le ${b}$. Find the total distance travelled.`,
        correct,
        distractors: opts(correct, [dec(b, 3), dec(k * b, 3), dec(b * (1 + k), 3), dec(total / 2, 3)]),
        explanation: `The speed is $\\sqrt{1 + ${k * k}} = ${dec(speed, 3)}$, constant, so the distance is $${b}\\cdot ${dec(speed, 3)} = ${correct}$.`,
      };
    },
  },
  {
    id: "g9-polar-tangent-angle",
    unit: U9,
    topic: "polar-derivatives",
    difficulty: "hard",
    track: "bc",
    manifestation: "polar-derivatives:tangent-at-angle",
    build: (r: RNG) => {
      const a = ri(r, 1, 5);
      const correct = `\\text{horizontal}`;
      return {
        prompt: `For the circle $r = ${a}$, what is the tangent line at $\\theta = \\dfrac{\\pi}{2}$?`,
        correct,
        distractors: [`\\text{vertical}`, `\\text{of slope } 1`, `\\text{undefined, since } r \\text{ is constant}`],
        explanation: `At $\\theta = \\frac{\\pi}{2}$ the point is the top of the circle of radius $${a}$, where the tangent line is horizontal.`,
      };
    },
  },
  {
    id: "g9-polar-graph-match",
    unit: U9,
    topic: "polar-derivatives",
    difficulty: "medium",
    track: "bc",
    manifestation: "polar-derivatives:graph-match",
    build: (r: RNG) => {
      const a = ri(r, 2, 6);
      const correct = `\\text{a circle of radius } ${a} \\text{ centered at the origin}`;
      return {
        prompt: `Which curve is described by $r = ${a}$?`,
        correct,
        distractors: [
          `\\text{a circle of radius } ${a} \\text{ centered at } (${a}, 0)`,
          `\\text{a vertical line } x = ${a}`,
          `\\text{a spiral through the origin}`,
        ],
        explanation: `A constant radius means every point is $${a}$ units from the origin, which is a circle centered at the origin.`,
      };
    },
  },
  {
    id: "g9-polar-error",
    unit: U9,
    topic: "polar-derivatives",
    difficulty: "hard",
    track: "bc",
    manifestation: "polar-derivatives:error-analysis",
    build: (r: RNG) => {
      void r;
      const correct = `\\dfrac{dr}{d\\theta} \\text{ is not the slope; the slope requires } \\dfrac{dy/d\\theta}{dx/d\\theta}.`;
      return {
        prompt: `A student computes $\\dfrac{dr}{d\\theta}$ and reports it as the slope of a polar curve. What is the error?`,
        correct,
        distractors: [
          `\\dfrac{dr}{d\\theta} \\text{ must be squared first.}`,
          `\\text{The slope of a polar curve is always } \\tan(\\theta).`,
          `\\text{Polar curves have no tangent lines.}`,
        ],
        explanation: `The slope is measured in the $xy$-plane, so convert with $x = r\\cos\\theta$ and $y = r\\sin\\theta$ and take the quotient of their $\\theta$-derivatives.`,
      };
    },
  },
  {
    id: "g9-polar-area-between",
    unit: U9,
    topic: "polar-area",
    difficulty: "hard",
    track: "bc",
    manifestation: "polar-area:between-curves",
    build: (r: RNG) => {
      const a = ri(r, 2, 4);
      const b = a + ri(r, 1, 3);
      const correct = `\\dfrac{1}{2}\\displaystyle\\int_{0}^{2\\pi}\\left(${b}^{2} - ${a}^{2}\\right)d\\theta`;
      return {
        prompt: `Which integral gives the area of the ring between the polar circles $r = ${a}$ and $r = ${b}$?`,
        correct,
        distractors: [
          `\\dfrac{1}{2}\\displaystyle\\int_{0}^{2\\pi}\\left(${b} - ${a}\\right)^{2}d\\theta`,
          `\\displaystyle\\int_{0}^{2\\pi}\\left(${b}^{2} - ${a}^{2}\\right)d\\theta`,
          `\\dfrac{1}{2}\\displaystyle\\int_{0}^{\\pi}\\left(${b}^{2} - ${a}^{2}\\right)d\\theta`,
        ],
        explanation: `Polar area uses $\\frac{1}{2}\\int r^{2}\\,d\\theta$, and the region between two curves subtracts the squares of the radii over a full revolution.`,
      };
    },
  },
  {
    id: "g9-polar-bounds",
    unit: U9,
    topic: "polar-area",
    difficulty: "hard",
    track: "bc",
    manifestation: "polar-area:bounds",
    build: (r: RNG) => {
      const a = ri(r, 2, 5);
      const correct = `0 \\le \\theta \\le \\pi`;
      return {
        prompt: `The curve $r = ${a}\\sin(\\theta)$ traces a full circle exactly once on which interval?`,
        correct,
        distractors: [`0 \\le \\theta \\le 2\\pi`, `0 \\le \\theta \\le \\dfrac{\\pi}{2}`, `-\\pi \\le \\theta \\le \\pi`],
        explanation: `$r = ${a}\\sin(\\theta)$ completes the circle as $\\theta$ goes from $0$ to $\\pi$; continuing to $2\\pi$ retraces it and doubles a computed area.`,
      };
    },
  },
  {
    id: "g9-polar-calculator",
    unit: U9,
    topic: "polar-area",
    difficulty: "hard",
    track: "bc",
    calculator: true,
    manifestation: "polar-area:calculator",
    build: (r: RNG) => {
      const a = ri(r, 2, 6);
      const area = (Math.PI * a * a) / 4;
      const correct = dec(area, 3);
      return {
        prompt: `Find the area enclosed by $r = ${a}\\sin(\\theta)$, correct to three decimal places.`,
        correct,
        distractors: opts(correct, [dec(4 * area, 3), dec(2 * area, 3), dec(area / 2, 3), dec(Math.PI * a, 3)]),
        explanation: `The curve is a circle of radius $\\frac{${a}}{2}$, so $\\frac{1}{2}\\int_{0}^{\\pi}\\left(${a}\\sin\\theta\\right)^{2}d\\theta = \\pi\\left(\\frac{${a}}{2}\\right)^{2} = ${correct}$.`,
      };
    },
  },
);
