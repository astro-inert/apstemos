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
