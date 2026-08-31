/**
 * Expanded CED-coverage template families.
 *
 * Every AP Calculus CED topic is asked in more than one *form* — graphs,
 * tables, symbolic manipulation, context with units, and theorem
 * justification — and roughly a third of the exam allows a calculator. These
 * families add those forms on top of the original set in
 * `question-templates.ts`, so the bank is not 27 numeric re-skins of one
 * sentence per topic.
 *
 * Everything here is original: numbers, functions, and contexts are generated,
 * and no College Board text is reproduced.
 */

import {
  coef,
  dec,
  frac,
  pick,
  poly,
  pow,
  ri,
  term,
  type QuestionTemplate,
} from "./question-templates";
import {
  fitWindow,
  sampleCurve,
  samplePolar,
  type PiecewiseGraphFigure,
  type TableFigure,
} from "./figures";

const U1 = "unit-1-limits-and-continuity";
const U2 = "unit-2-differentiation-definition-and-properties";
const U3 = "unit-3-differentiation-composite-implicit-inverse";
const U4 = "unit-4-contextual-applications-of-differentiation";
const U5 = "unit-5-analytical-applications-of-differentiation";
const U6 = "unit-6-integration-and-accumulation-of-change";
const U7 = "unit-7-differential-equations";
const U8 = "unit-8-applications-of-integration";
const U9 = "unit-9-parametric-polar-vector";
const U10 = "unit-10-infinite-sequences-and-series";

const NAMES = ["f", "g", "h"] as const;

export const EXTRA_TEMPLATES: QuestionTemplate[] = [
  /* ------------------------------------------------------------------ */
  /* Unit 1                                                              */
  /* ------------------------------------------------------------------ */
  {
    id: "x1-piecewise-onesided",
    unit: U1,
    topic: "limits-from-graphs-and-tables",
    difficulty: "easy",
    build: (r) => {
      const c = ri(r, 1, 5);
      const m = ri(r, 2, 6);
      const b = ri(r, 1, 9);
      const left = m * c + b;
      const right = c * c;
      const pts: Array<[number, number]> = [
        [c - 3, m * (c - 3) + b],
        [c, left],
        [c, right],
        [c + 3, (c + 3) * (c + 3)],
      ];
      const window = fitWindow(pts, 1);
      const figure: PiecewiseGraphFigure = {
        kind: "piecewise-graph",
        label: "f(x)",
        points: pts,
        xMin: window.xMin,
        xMax: window.xMax,
        yMin: window.yMin,
        yMax: window.yMax,
      };
      return {
        prompt: `Let $f$ be defined by $f(x)=${poly([[m, "x"], [b, ""]])}$ for $x<${c}$ and $f(x)=x^{2}$ for $x\\ge ${c}$. Find $\\displaystyle\\lim_{x\\to ${c}^{-}} f(x)$.`,
        correct: `${left}`,
        distractors: [`${right}`, `${left + right}`, `\\text{The limit does not exist.}`],
        explanation: `Approaching from the left uses the linear piece: $${m}(${c}) + ${b} = ${left}$. The right-hand limit is $${right}$, but it is not what the one-sided limit asks for.`,
        figure,
      };
    },
    mistakes: ["sign-error"],
  },
  {
    id: "x1-table-estimate",
    unit: U1,
    topic: "limits-from-graphs-and-tables",
    difficulty: "medium",
    calculator: true,
    build: (r) => {
      const L = ri(r, 2, 9);
      const c = ri(r, 1, 4);
      const rows = [
        [c - 0.1, L - 0.21],
        [c - 0.01, L - 0.02],
        [c + 0.01, L + 0.02],
        [c + 0.1, L + 0.19],
      ];
      const table =
        `| $x$ | ${rows.map((x) => `$${dec(x[0], 2)}$`).join(" | ")} |\n` +
        `| --- | ${rows.map(() => "---").join(" | ")} |\n` +
        `| $g(x)$ | ${rows.map((x) => `$${dec(x[1], 2)}$`).join(" | ")} |`;
      return {
        prompt: `The table gives values of a function $g$ near $x=${c}$.\n\n${table}\n\nWhich value is the best estimate of $\\displaystyle\\lim_{x\\to ${c}} g(x)$?`,
        correct: `${L}`,
        distractors: [`${L - 0.02}`, `${L + 0.19}`, `\\text{The limit does not exist.}`],
        explanation: `Values from both sides close in on $${L}$ as $x\\to ${c}$, so the limit is approximately $${L}$. Table values are estimates of the limit, not the limit itself.`,
      };
    },
  },
  {
    id: "x1-squeeze-bounds",
    unit: U1,
    topic: "squeeze-theorem",
    difficulty: "medium",
    build: (r) => {
      const L = ri(r, 2, 9);
      const k = ri(r, 1, 4);
      return {
        prompt: `Suppose $${L} - ${coef(k, "x^{2}")} \\le f(x) \\le ${L} + ${coef(k, "x^{2}")}$ for all $x$. Find $\\displaystyle\\lim_{x\\to 0} f(x)$.`,
        correct: `${L}`,
        distractors: [`${k}`, `0`, `\\text{The limit cannot be determined.}`],
        explanation: `Both bounds tend to $${L}$ as $x\\to 0$, so by the Squeeze Theorem $\\lim_{x\\to 0} f(x) = ${L}$.`,
      };
    },
  },
  {
    id: "x1-continuity-solve-k",
    unit: U1,
    topic: "continuity-and-discontinuity",
    difficulty: "medium",
    build: (r) => {
      const a = ri(r, 2, 7);
      return {
        prompt: `Let $f(x)=\\dfrac{x^{2}-${a * a}}{x-${a}}$ for $x\\ne ${a}$ and $f(${a})=k$. For what value of $k$ is $f$ continuous at $x=${a}$?`,
        correct: `${2 * a}`,
        distractors: [`${a}`, `0`, `${a * a}`],
        explanation: `For $x\\ne ${a}$, $f(x)=x+${a}$, so the limit at $x=${a}$ is $${2 * a}$. Continuity requires $k$ to equal that limit.`,
      };
    },
    mistakes: ["sign-error"],
  },
  {
    id: "x1-discontinuity-type",
    unit: U1,
    topic: "continuity-and-discontinuity",
    difficulty: "medium",
    build: (r) => {
      const a = ri(r, 2, 6);
      let c = ri(r, 1, 7);
      if (c === a) c = a + 1;
      const b = ri(r, 1, 8);
      return {
        prompt: `Let $f(x)=\\dfrac{(x-${a})(x+${b})}{(x-${a})(x-${c})}$. Classify the discontinuities of $f$.`,
        correct: `\\text{Removable at } x=${a}, \\text{ infinite at } x=${c}`,
        distractors: [
          `\\text{Infinite at } x=${a}, \\text{ removable at } x=${c}`,
          `\\text{Removable at both } x=${a} \\text{ and } x=${c}`,
          `\\text{Jump discontinuity at } x=${c} \\text{ only}`,
        ],
        explanation: `The factor $(x-${a})$ cancels, leaving a hole at $x=${a}$. The remaining factor $(x-${c})$ in the denominator makes $x=${c}$ a vertical asymptote.`,
      };
    },
  },
  {
    id: "x1-ivt-guarantee",
    unit: U1,
    topic: "intermediate-value-theorem",
    difficulty: "medium",
    build: (r) => {
      const a = ri(r, 0, 3);
      const b = a + ri(r, 2, 5);
      const fa = -ri(r, 1, 6);
      const fb = ri(r, 1, 6);
      return {
        prompt: `A function $f$ is continuous on $[${a},${b}]$ with $f(${a})=${fa}$ and $f(${b})=${fb}$. Which conclusion is guaranteed?`,
        correct: `\\text{There is at least one } c \\text{ in } (${a},${b}) \\text{ with } f(c)=0`,
        distractors: [
          `\\text{There is exactly one } c \\text{ in } (${a},${b}) \\text{ with } f(c)=0`,
          `f \\text{ is increasing on } [${a},${b}]`,
          `f \\text{ is differentiable on } (${a},${b})`,
        ],
        explanation: `The Intermediate Value Theorem guarantees every value between $${fa}$ and $${fb}$ is attained, so a zero exists. It does not promise uniqueness, monotonicity, or differentiability.`,
      };
    },
  },

  /* ------------------------------------------------------------------ */
  /* Unit 2                                                              */
  /* ------------------------------------------------------------------ */
  {
    id: "x2-definition-recognize",
    unit: U2,
    topic: "definition-of-the-derivative",
    difficulty: "medium",
    build: (r) => {
      const a = ri(r, 1, 6);
      const n = ri(r, 2, 4);
      const val = n * a ** (n - 1);
      return {
        prompt: `Evaluate $\\displaystyle\\lim_{h\\to 0}\\frac{(${a}+h)^{${n}} - ${a ** n}}{h}$.`,
        correct: `${val}`,
        distractors: [`${a ** n}`, `${n * a ** n}`, `0`],
        explanation: `This is the definition of $f'(${a})$ for $f(x)=${pow("x", n)}$. Since $f'(x)=${coef(n, pow("x", n - 1))}$, the limit is $${val}$.`,
      };
    },
  },
  {
    id: "x2-symmetric-difference",
    unit: U2,
    topic: "definition-of-the-derivative",
    difficulty: "medium",
    calculator: true,
    build: (r) => {
      const a = ri(r, 2, 6);
      const slope = ri(r, 2, 9);
      const base = ri(r, 5, 40);
      const lo = base - slope * 0.5;
      const hi = base + slope * 0.5;
      const figure: TableFigure = {
        kind: "table",
        headers: ["t", `${a - 0.5}`, `${a}`, `${a + 0.5}`],
        rows: [["P(t)", dec(lo, 2), `${base}`, dec(hi, 2)]],
        caption: "Selected values of P(t)",
      };
      return {
        prompt: `Selected values of a differentiable function $P$ are given. Use a symmetric difference quotient to approximate $P'(${a})$.`,
        correct: `${slope}`,
        distractors: [`${dec(slope / 2, 2)}`, `${2 * slope}`, `${base}`],
        explanation: `$P'(${a}) \\approx \\dfrac{P(${a + 0.5}) - P(${a - 0.5})}{1} = ${dec(hi - lo, 2)} = ${slope}$.`,
        figure,
      };
    },
  },
  {
    id: "x2-power-negative-radical",
    unit: U2,
    topic: "power-rule",
    difficulty: "medium",
    build: (r) => {
      const a = ri(r, 2, 8);
      const b = ri(r, 2, 8);
      return {
        prompt: `If $f(x)=\\dfrac{${a}}{x^{2}} + ${b}\\sqrt{x}$, find $f'(x)$.`,
        correct: `-\\dfrac{${2 * a}}{x^{3}} + \\dfrac{${b}}{2\\sqrt{x}}`,
        distractors: [
          `\\dfrac{${2 * a}}{x^{3}} + \\dfrac{${b}}{2\\sqrt{x}}`,
          `-\\dfrac{${a}}{x^{3}} + ${coef(b, "\\sqrt{x}")}`,
          `-\\dfrac{${2 * a}}{x} + \\dfrac{${b}}{\\sqrt{x}}`,
        ],
        explanation: `Write $f(x)=${a}x^{-2} + ${b}x^{1/2}$. Then $f'(x) = ${-2 * a}x^{-3} + ${frac(b, 2)}x^{-1/2}$.`,
      };
    },
    mistakes: ["sign-error"],
  },
  {
    id: "x2-tangent-line",
    unit: U2,
    topic: "power-rule",
    difficulty: "medium",
    build: (r) => {
      const a = ri(r, 1, 4);
      const b = ri(r, 1, 6);
      const x0 = ri(r, 1, 3);
      const y0 = a * x0 ** 2 + b;
      const m = 2 * a * x0;
      return {
        prompt: `Let $f(x)=${poly([[a, "x^{2}"], [b, ""]])}$. Write an equation of the line tangent to the graph of $f$ at $x=${x0}$.`,
        correct: `y - ${y0} = ${coef(m, `(x - ${x0})`)}`,
        distractors: [
          `y - ${y0} = ${coef(a * x0 * x0, `(x - ${x0})`)}`,
          `y - ${m} = ${coef(y0, `(x - ${x0})`)}`,
          `y = ${coef(m, "x")}`,
        ],
        explanation: `$f(${x0})=${y0}$ and $f'(x)=${coef(2 * a, "x")}$, so $f'(${x0})=${m}$. Point-slope form gives $y - ${y0} = ${m}(x-${x0})$.`,
      };
    },
  },
  {
    id: "x2-trig-exp-value",
    unit: U2,
    topic: "derivatives-of-trig-exp-log",
    difficulty: "medium",
    build: (r) => {
      const a = ri(r, 2, 6);
      const b = ri(r, 2, 6);
      return {
        prompt: `If $f(x)=${coef(a, "\\sin x")} + ${coef(b, "e^{x}")}$, find $f'(0)$.`,
        correct: `${a + b}`,
        distractors: [`${b}`, `${a}`, `${a - b}`],
        explanation: `$f'(x)=${coef(a, "\\cos x")} + ${coef(b, "e^{x}")}$, so $f'(0)=${a}+${b}=${a + b}$.`,
      };
    },
  },
  {
    id: "x2-differentiable-piecewise",
    unit: U2,
    topic: "differentiability-and-continuity",
    difficulty: "hard",
    build: (r) => {
      const c = ri(r, 1, 4);
      const m = 2 * c;
      const b = -c * c;
      return {
        prompt: `Let $f(x)=x^{2}$ for $x\\le ${c}$ and $f(x)=${coef(m, "x")} + k$ for $x>${c}$. For what value of $k$ is $f$ differentiable at $x=${c}$?`,
        correct: `${b}`,
        distractors: [`${c * c}`, `${m}`, `0`],
        explanation: `The slopes already match, since $\\frac{d}{dx}x^{2}=${m}$ at $x=${c}$. Continuity then forces $${c * c} = ${m}(${c}) + k$, so $k=${b}$.`,
      };
    },
  },
  {
    id: "x2-quotient-value",
    unit: U2,
    topic: "product-and-quotient-rules",
    difficulty: "medium",
    build: (r) => {
      const a = ri(r, 2, 6);
      const b = ri(r, 1, 6);
      // f(x) = (a x) / (x + b); f'(x) = ab/(x+b)^2 ; at x = 0 -> a/b
      return {
        prompt: `If $f(x)=\\dfrac{${coef(a, "x")}}{x + ${b}}$, find $f'(0)$.`,
        correct: frac(a, b),
        distractors: [frac(b, a), `${a}`, `0`],
        explanation: `By the quotient rule $f'(x)=\\dfrac{${a}(x+${b}) - ${coef(a, "x")}}{(x+${b})^{2}} = \\dfrac{${a * b}}{(x+${b})^{2}}$, so $f'(0)=${frac(a, b)}$.`,
      };
    },
    mistakes: ["quotient-rule-order"],
  },

  /* ------------------------------------------------------------------ */
  /* Unit 3                                                              */
  /* ------------------------------------------------------------------ */
  {
    id: "x3-chain-log",
    unit: U3,
    topic: "chain-rule",
    difficulty: "medium",
    build: (r) => {
      const a = ri(r, 2, 7);
      const b = ri(r, 1, 9);
      return {
        prompt: `If $y=\\ln\\left(${poly([[a, "x^{2}"], [b, ""]])}\\right)$, find $\\dfrac{dy}{dx}$.`,
        correct: `\\dfrac{${2 * a}x}{${poly([[a, "x^{2}"], [b, ""]])}}`,
        distractors: [
          `\\dfrac{1}{${poly([[a, "x^{2}"], [b, ""]])}}`,
          `\\dfrac{${2 * a}x}{${a}x}`,
          `${coef(2 * a, "x")}\\ln\\left(${poly([[a, "x^{2}"], [b, ""]])}\\right)`,
        ],
        explanation: `Chain rule: the derivative of $\\ln u$ is $\\frac{u'}{u}$ with $u=${poly([[a, "x^{2}"], [b, ""]])}$ and $u'=${coef(2 * a, "x")}$.`,
      };
    },
    mistakes: ["chain-rule-missing"],
  },
  {
    id: "x3-inverse-function-value",
    unit: U3,
    topic: "derivatives-of-inverse-functions",
    difficulty: "hard",
    build: (r) => {
      const a = ri(r, 1, 4);
      const c = ri(r, 1, 6);
      // f(x) = a x^3 + x + c, f(1) = a + 1 + c, f'(1) = 3a + 1
      const f1 = a + 1 + c;
      const fp1 = 3 * a + 1;
      return {
        prompt: `Let $f(x)=${poly([[a, "x^{3}"], [1, "x"], [c, ""]])}$, which is increasing for all $x$. If $g$ is the inverse of $f$, find $g'(${f1})$.`,
        correct: frac(1, fp1),
        distractors: [`${fp1}`, frac(1, f1), `${f1}`],
        explanation: `$f(1)=${f1}$, so $g'(${f1}) = \\dfrac{1}{f'(1)}$. Since $f'(x)=${poly([[3 * a, "x^{2}"], [1, ""]])}$, $f'(1)=${fp1}$ and $g'(${f1})=${frac(1, fp1)}$.`,
      };
    },
  },
  {
    id: "x3-inverse-trig-chain",
    unit: U3,
    topic: "inverse-trig-derivatives",
    difficulty: "medium",
    build: (r) => {
      const k = ri(r, 2, 6);
      return {
        prompt: `If $y=\\arcsin(${coef(k, "x")})$, find $\\dfrac{dy}{dx}$.`,
        correct: `\\dfrac{${k}}{\\sqrt{1 - ${k * k}x^{2}}}`,
        distractors: [
          `\\dfrac{1}{\\sqrt{1 - ${k * k}x^{2}}}`,
          `\\dfrac{${k}}{1 + ${k * k}x^{2}}`,
          `\\dfrac{${k}}{\\sqrt{1 - ${coef(k, "x")}}}`,
        ],
        explanation: `$\\frac{d}{dx}\\arcsin u = \\frac{u'}{\\sqrt{1-u^{2}}}$ with $u=${coef(k, "x")}$, giving $\\dfrac{${k}}{\\sqrt{1-${k * k}x^{2}}}$.`,
      };
    },
    mistakes: ["chain-rule-missing"],
  },
  {
    id: "x3-second-derivative-trig",
    unit: U3,
    topic: "higher-order-derivatives",
    difficulty: "medium",
    build: (r) => {
      const k = ri(r, 2, 5);
      return {
        prompt: `If $y=\\sin(${coef(k, "x")})$, find $\\dfrac{d^{2}y}{dx^{2}}$.`,
        correct: `${coef(-(k * k), `\\sin(${coef(k, "x")})`)}`,
        distractors: [
          `${coef(k * k, `\\sin(${coef(k, "x")})`)}`,
          `${coef(-k, `\\sin(${coef(k, "x")})`)}`,
          `${coef(-(k * k), `\\cos(${coef(k, "x")})`)}`,
        ],
        explanation: `$y'=${coef(k, `\\cos(${coef(k, "x")})`)}$ and $y''=${coef(-(k * k), `\\sin(${coef(k, "x")})`)}$.`,
      };
    },
  },
  {
    id: "x3-implicit-tangent-slope",
    unit: U3,
    topic: "implicit-differentiation",
    difficulty: "hard",
    build: (r) => {
      const a = ri(r, 1, 4);
      const x0 = ri(r, 1, 3);
      const y0 = ri(r, 1, 3);
      // x^2 + a y^2 = x0^2 + a y0^2 ; dy/dx = -x/(a y)
      const c = x0 * x0 + a * y0 * y0;
      return {
        prompt: `The curve $x^{2} + ${coef(a, "y^{2}")} = ${c}$ passes through $(${x0}, ${y0})$. Find $\\dfrac{dy}{dx}$ at that point.`,
        correct: frac(-x0, a * y0),
        distractors: [frac(x0, a * y0), frac(-a * y0, x0), frac(-x0, y0)],
        explanation: `Differentiating implicitly, $2x + ${2 * a}y\\frac{dy}{dx}=0$, so $\\frac{dy}{dx} = -\\dfrac{x}{${a}y} = ${frac(-x0, a * y0)}$ at $(${x0},${y0})$.`,
      };
    },
    mistakes: ["implicit-missing-dydx"],
  },

  /* ------------------------------------------------------------------ */
  /* Unit 4                                                              */
  /* ------------------------------------------------------------------ */
  {
    id: "x4-linearization-numeric",
    unit: U4,
    topic: "linearization",
    difficulty: "medium",
    calculator: true,
    build: (r) => {
      const n = pick(r, [4, 9, 16, 25, 36, 49, 64]);
      const d = pick(r, [0.1, 0.2, 0.3, -0.1, -0.2]);
      const base = Math.sqrt(n);
      const approx = base + d / (2 * base);
      return {
        prompt: `Use the tangent line to $y=\\sqrt{x}$ at $x=${n}$ to approximate $\\sqrt{${dec(n + d, 2)}}$.`,
        correct: `${dec(approx, 4)}`,
        distractors: [`${dec(base, 4)}`, `${dec(base + d, 4)}`, `${dec(base + d * base, 4)}`],
        explanation: `$L(x)=${base} + \\dfrac{1}{${2 * base}}(x-${n})$, so $L(${dec(n + d, 2)}) = ${dec(approx, 4)}$.`,
      };
    },
  },
  {
    id: "x4-lhopital-exp",
    unit: U4,
    topic: "lhopitals-rule",
    difficulty: "medium",
    build: (r) => {
      const a = ri(r, 2, 7);
      const b = ri(r, 2, 7);
      return {
        prompt: `Evaluate $\\displaystyle\\lim_{x\\to 0}\\frac{e^{${coef(a, "x")}} - 1}{${coef(b, "x")}}$.`,
        correct: frac(a, b),
        distractors: [frac(b, a), `0`, `\\text{The limit does not exist.}`],
        explanation: `The form is $\\frac{0}{0}$. Differentiating top and bottom gives $\\dfrac{${a}e^{${coef(a, "x")}}}{${b}}$, which is $${frac(a, b)}$ at $x=0$.`,
      };
    },
  },
  {
    id: "x4-motion-direction",
    unit: U4,
    topic: "rectilinear-motion",
    difficulty: "hard",
    build: (r) => {
      const a = ri(r, 1, 3);
      const b = ri(r, 2, 5);
      // v(t) = t^2 - (a+b) t + ab = (t-a)(t-b); speed increasing where v and a(t) share sign
      const lo = Math.min(a, b);
      const hi = Math.max(a, b);
      const mid = (a + b) / 2;
      return {
        prompt: `A particle moves along a line with velocity $v(t)=t^{2} ${term(-(a + b), "t")} ${term(a * b, "")}$ for $t\\ge 0$. On which interval is the particle moving left?`,
        correct: `${lo} < t < ${hi}`,
        distractors: [`0 < t < ${lo}`, `t > ${hi}`, `t > ${dec(mid, 2)}`],
        explanation: `$v(t)=(t-${a})(t-${b})$ is negative exactly between its zeros, so the particle moves in the negative direction for $${lo}<t<${hi}$.`,
      };
    },
  },
  {
    id: "x4-rate-interpretation",
    unit: U4,
    topic: "rates-of-change-in-context",
    difficulty: "medium",
    build: (r) => {
      const ctx = pick(r, [
        { q: "the volume of water in a tank", unit: "liters", t: "minutes", sym: "V" },
        { q: "the mass of a culture", unit: "grams", t: "hours", sym: "M" },
        { q: "the depth of snow", unit: "centimeters", t: "hours", sym: "D" },
      ]);
      const t0 = ri(r, 2, 9);
      const v = ri(r, 2, 8);
      return {
        prompt: `Let $${ctx.sym}(t)$ be ${ctx.q}, in ${ctx.unit}, at time $t$ ${ctx.t}. Interpret $${ctx.sym}'(${t0}) = -${v}$.`,
        correct: `\\text{At } t=${t0} \\text{ ${ctx.t}, the quantity is decreasing at } ${v} \\text{ ${ctx.unit} per ${ctx.t.replace(/s$/, "")}}`,
        distractors: [
          `\\text{At } t=${t0} \\text{ ${ctx.t}, the quantity is } ${v} \\text{ ${ctx.unit}}`,
          `\\text{At } t=${t0} \\text{ ${ctx.t}, the quantity is increasing at } ${v} \\text{ ${ctx.unit} per ${ctx.t.replace(/s$/, "")}}`,
          `\\text{The quantity decreases by } ${v} \\text{ ${ctx.unit} over the first } ${t0} \\text{ ${ctx.t}}`,
        ],
        explanation: `A derivative is an instantaneous rate with units of ${ctx.unit} per ${ctx.t.replace(/s$/, "")}, and the negative sign means the quantity is decreasing at that instant.`,
      };
    },
    mistakes: ["units-missing"],
  },
  {
    id: "x4-related-rates-cone",
    unit: U4,
    topic: "related-rates",
    difficulty: "hard",
    calculator: true,
    build: (r) => {
      const rad = ri(r, 2, 6);
      const rate = ri(r, 2, 9);
      // V = pi r^2 h with fixed radius; dh/dt = rate/(pi r^2)
      const dh = rate / (Math.PI * rad * rad);
      return {
        prompt: `Water is poured into a cylindrical tank of radius ${rad} feet at a constant rate of ${rate} cubic feet per minute. How fast is the water level rising, in feet per minute?`,
        correct: `${dec(dh, 4)}`,
        distractors: [`${dec(rate / (2 * Math.PI * rad), 4)}`, `${dec(rate / rad, 4)}`, `${dec(rate * Math.PI * rad * rad, 2)}`],
        explanation: `$V=\\pi r^{2}h$ with $r=${rad}$ fixed, so $\\frac{dV}{dt} = \\pi(${rad * rad})\\frac{dh}{dt}$ and $\\frac{dh}{dt} = \\dfrac{${rate}}{${rad * rad}\\pi} \\approx ${dec(dh, 4)}$.`,
      };
    },
  },

  /* ------------------------------------------------------------------ */
  /* Unit 5                                                              */
  /* ------------------------------------------------------------------ */
  {
    id: "x5-mvt-find-c",
    unit: U5,
    topic: "mean-value-theorem",
    difficulty: "medium",
    build: (r) => {
      const a = ri(r, 0, 3);
      const b = a + 2 * ri(r, 1, 3);
      const c = (a + b) / 2;
      return {
        prompt: `Let $f(x)=x^{2}$ on $[${a},${b}]$. Find the value of $c$ guaranteed by the Mean Value Theorem.`,
        correct: `${dec(c, 2)}`,
        distractors: [`${dec((a + b) / 4, 2)}`, `${b}`, `${dec(Math.sqrt((a * a + b * b) / 2), 3)}`],
        explanation: `The average rate of change is $\\dfrac{${b * b}-${a * a}}{${b}-${a}} = ${a + b}$. Setting $2c = ${a + b}$ gives $c=${dec(c, 2)}$.`,
      };
    },
  },
  {
    id: "x5-critical-count",
    unit: U5,
    topic: "critical-points",
    difficulty: "medium",
    build: (r) => {
      const a = ri(r, 1, 5);
      const k = 3 * a;
      return {
        prompt: `Let $f(x)=x^{3} ${term(-k, "x")}$. How many critical points does $f$ have, and where?`,
        correct: `\\text{Two: } x=\\pm\\sqrt{${a}}`,
        distractors: [`\\text{One: } x=0`, `\\text{Two: } x=\\pm ${a}`, `\\text{None}`],
        explanation: `$f'(x)=3x^{2}-${k}=0$ gives $x^{2}=${a}$, so $x=\\pm\\sqrt{${a}}$.`,
      };
    },
  },
  {
    id: "x5-first-derivative-test-sign",
    unit: U5,
    topic: "first-derivative-test",
    difficulty: "hard",
    build: (r) => {
      const a = ri(r, 1, 4);
      let b = ri(r, 2, 7);
      if (b === a) b = a + 2;
      return {
        prompt: `A differentiable function $f$ has $f'(x)=(x-${a})(x-${b})^{2}$. Classify the behavior of $f$ at $x=${a}$ and $x=${b}$.`,
        correct: `\\text{Local minimum at } x=${a}, \\text{ neither at } x=${b}`,
        distractors: [
          `\\text{Local maximum at } x=${a}, \\text{ local minimum at } x=${b}`,
          `\\text{Local minimum at both } x=${a} \\text{ and } x=${b}`,
          `\\text{Neither at } x=${a}, \\text{ local minimum at } x=${b}`,
        ],
        explanation: `$f'$ changes from negative to positive at $x=${a}$, a local minimum. The squared factor keeps the sign of $f'$ unchanged at $x=${b}$, so it is neither.`,
      };
    },
  },
  {
    id: "x5-concavity-interval",
    unit: U5,
    topic: "second-derivative-test",
    difficulty: "medium",
    build: (r) => {
      const a = ri(r, 1, 4);
      const b = ri(r, 1, 6);
      // f = x^3 + a x^2 ; f'' = 6x + 2a ; concave up for x > -a/3
      const cut = frac(-a, 3);
      return {
        prompt: `Let $f(x)=x^{3} ${term(a, "x^{2}")} ${term(b, "x")}$. On which interval is the graph of $f$ concave up?`,
        correct: `x > ${cut}`,
        distractors: [`x < ${cut}`, `x > ${frac(-a, 2)}`, `x > ${a}`],
        explanation: `$f''(x)=6x + ${2 * a}$, which is positive when $x > ${cut}$.`,
      };
    },
  },
  {
    id: "x5-absolute-extremum",
    unit: U5,
    topic: "local-and-global-extrema",
    difficulty: "hard",
    build: (r) => {
      const a = ri(r, 1, 3);
      const b = ri(r, 3, 6);
      // f(x) = x^3 - 3a x^2 on [0, b] with b > 2a; compare endpoints and critical pt x=2a
      const x1 = 2 * a;
      const fx1 = x1 ** 3 - 3 * a * x1 ** 2;
      const fb = b ** 3 - 3 * a * b ** 2;
      const maxVal = Math.max(0, fb);
      const at = fb >= 0 ? `x=${b}` : `x=0`;
      return {
        prompt: `Let $f(x)=x^{3} ${term(-3 * a, "x^{2}")}$ on the closed interval $[0,${b}]$. Where does $f$ attain its absolute maximum?`,
        correct: `${at}`,
        distractors: [`x=${x1}`, `x=${a}`, `x=${dec(b / 2, 2)}`],
        explanation: `Critical numbers are $x=0$ and $x=${x1}$, with $f(${x1})=${fx1}$. Comparing $f(0)=0$, $f(${x1})=${fx1}$, and $f(${b})=${fb}$, the maximum value $${maxVal}$ occurs at $${at}$.`,
      };
    },
  },
  {
    id: "x5-optimization-rectangle",
    unit: U5,
    topic: "optimization",
    difficulty: "hard",
    build: (r) => {
      const p = 4 * ri(r, 3, 12);
      const side = p / 4;
      return {
        prompt: `A rectangle has perimeter ${p} meters. What is the greatest possible area, in square meters?`,
        correct: `${side * side}`,
        distractors: [`${(p / 2) * (p / 2)}`, `${p * p}`, `${(p / 3) * (p / 3)}`],
        explanation: `With $2x+2y=${p}$, area $A=x(${p / 2}-x)$ is maximized at $x=${side}$, giving $A=${side * side}$.`,
      };
    },
  },
  {
    id: "x5-curve-sketching-from-derivative",
    unit: U5,
    topic: "curve-sketching",
    difficulty: "hard",
    build: (r) => {
      const a = ri(r, 1, 3);
      const b = a + ri(r, 2, 4);
      return {
        prompt: `A function $f$ is differentiable everywhere, $f'>0$ on $(-\\infty,${a})$, $f'<0$ on $(${a},${b})$, and $f'>0$ on $(${b},\\infty)$. Which statement about $f$ is true?`,
        correct: `f \\text{ has a local maximum at } x=${a} \\text{ and a local minimum at } x=${b}`,
        distractors: [
          `f \\text{ has a local minimum at } x=${a} \\text{ and a local maximum at } x=${b}`,
          `f \\text{ has inflection points at } x=${a} \\text{ and } x=${b}`,
          `f \\text{ is concave down on } (${a},${b})`,
        ],
        explanation: `$f'$ changes $+\\to-$ at $x=${a}$ (local maximum) and $-\\to+$ at $x=${b}$ (local minimum). Sign changes of $f'$ say nothing directly about concavity.`,
      };
    },
  },

  /* ------------------------------------------------------------------ */
  /* Unit 6                                                              */
  /* ------------------------------------------------------------------ */
  {
    id: "x6-trapezoid-table",
    unit: U6,
    topic: "riemann-sums",
    difficulty: "medium",
    calculator: true,
    build: (r) => {
      const v = [ri(r, 2, 9), ri(r, 3, 12), ri(r, 4, 14), ri(r, 2, 10)];
      const h = 2;
      const trap = (h / 2) * (v[0]! + 2 * v[1]! + 2 * v[2]! + v[3]!);
      const left = h * (v[0]! + v[1]! + v[2]!);
      const figure: TableFigure = {
        kind: "table",
        headers: ["t", "0", "2", "4", "6"],
        rows: [["R(t)", `${v[0]}`, `${v[1]}`, `${v[2]}`, `${v[3]}`]],
        caption: "Rate R(t), in gallons per hour",
      };
      return {
        prompt: `The table gives values of a rate $R$, in gallons per hour. Use a trapezoidal sum with the three subintervals to approximate $\\displaystyle\\int_{0}^{6} R(t)\\,dt$.`,
        correct: `${dec(trap, 2)}`,
        distractors: [`${dec(left, 2)}`, `${dec(trap / 2, 2)}`, `${dec(h * (v[1]! + v[2]! + v[3]!), 2)}`],
        explanation: `Each trapezoid has width $2$: $\\frac{2}{2}\\left[${v[0]} + 2(${v[1]}) + 2(${v[2]}) + ${v[3]}\\right] = ${dec(trap, 2)}$ gallons.`,
        figure,
      };
    },
  },
  {
    id: "x6-usub-trig",
    unit: U6,
    topic: "u-substitution",
    difficulty: "medium",
    build: (r) => {
      const k = ri(r, 2, 6);
      const n = ri(r, 2, 4);
      return {
        prompt: `Find $\\displaystyle\\int \\sin^{${n}}(${coef(k, "x")})\\cos(${coef(k, "x")})\\,dx$.`,
        correct: `\\dfrac{\\sin^{${n + 1}}(${coef(k, "x")})}{${k * (n + 1)}} + C`,
        distractors: [
          `\\dfrac{\\sin^{${n + 1}}(${coef(k, "x")})}{${n + 1}} + C`,
          `\\dfrac{\\cos^{${n + 1}}(${coef(k, "x")})}{${k * (n + 1)}} + C`,
          `${coef(k * (n + 1), `\\sin^{${n + 1}}(${coef(k, "x")})`)} + C`,
        ],
        explanation: `Let $u=\\sin(${coef(k, "x")})$, so $du = ${k}\\cos(${coef(k, "x")})\\,dx$. The integral becomes $\\frac{1}{${k}}\\int u^{${n}}du = \\dfrac{u^{${n + 1}}}{${k * (n + 1)}}+C$.`,
      };
    },
    mistakes: ["forgot-constant"],
  },
  {
    id: "x6-parts-xln",
    unit: U6,
    topic: "integration-by-parts",
    difficulty: "hard",
    track: "BC",
    build: (r) => {
      const n = ri(r, 1, 3);
      const p = n + 1;
      return {
        prompt: `Find $\\displaystyle\\int ${pow("x", n)}\\ln x\\,dx$.`,
        correct: `\\dfrac{${pow("x", p)}\\ln x}{${p}} - \\dfrac{${pow("x", p)}}{${p * p}} + C`,
        distractors: [
          `\\dfrac{${pow("x", p)}\\ln x}{${p}} + \\dfrac{${pow("x", p)}}{${p * p}} + C`,
          `\\dfrac{${pow("x", p)}}{${p}} \\cdot \\dfrac{1}{x} + C`,
          `${pow("x", n)}\\ln x - ${pow("x", n)} + C`,
        ],
        explanation: `Take $u=\\ln x$, $dv=${pow("x", n)}dx$. Then $\\int ${pow("x", n)}\\ln x\\,dx = \\frac{${pow("x", p)}\\ln x}{${p}} - \\int \\frac{${pow("x", n)}}{${p}}dx = \\frac{${pow("x", p)}\\ln x}{${p}} - \\frac{${pow("x", p)}}{${p * p}} + C$.`,
      };
    },
    mistakes: ["forgot-constant"],
  },
  {
    id: "x6-partial-fractions-log",
    unit: U6,
    topic: "partial-fractions",
    difficulty: "hard",
    track: "BC",
    build: (r) => {
      const a = ri(r, 1, 4);
      let b = ri(r, 2, 6);
      if (b === a) b = a + 2;
      const d = b - a;
      return {
        prompt: `Find $\\displaystyle\\int \\frac{dx}{(x-${a})(x-${b})}$.`,
        correct: `\\dfrac{1}{${d}}\\ln\\left|\\dfrac{x-${b}}{x-${a}}\\right| + C`,
        distractors: [
          `\\dfrac{1}{${d}}\\ln\\left|\\dfrac{x-${a}}{x-${b}}\\right| + C`,
          `\\ln\\left|(x-${a})(x-${b})\\right| + C`,
          `\\dfrac{1}{(x-${a})(x-${b})} + C`,
        ],
        explanation: `Decompose: $\\frac{1}{(x-${a})(x-${b})} = \\frac{1}{${d}}\\left(\\frac{1}{x-${b}} - \\frac{1}{x-${a}}\\right)$, then integrate each logarithm.`,
      };
    },
  },
  {
    id: "x6-improper-p-test",
    unit: U6,
    topic: "improper-integrals",
    difficulty: "hard",
    track: "BC",
    build: (r) => {
      const p = pick(r, [2, 3, 4, 5]);
      const val = frac(1, p - 1);
      return {
        prompt: `Evaluate $\\displaystyle\\int_{1}^{\\infty}\\frac{dx}{x^{${p}}}$.`,
        correct: val,
        distractors: [frac(1, p), `${p - 1}`, `\\text{The integral diverges.}`],
        explanation: `$\\int_1^{b} x^{-${p}}dx = \\frac{x^{-${p - 1}}}{-${p - 1}}\\Big|_1^{b} \\to ${val}$ as $b\\to\\infty$, since $${p} > 1$.`,
      };
    },
  },
  {
    id: "x6-accumulation-derivative",
    unit: U6,
    topic: "accumulation-functions",
    difficulty: "medium",
    build: (r) => {
      const a = ri(r, 0, 3);
      const k = ri(r, 2, 6);
      const x0 = ri(r, 1, 4);
      return {
        prompt: `Let $F(x)=\\displaystyle\\int_{${a}}^{x}\\sqrt{${coef(k, "t")} + 1}\\,dt$. Find $F'(${x0})$.`,
        correct: `\\sqrt{${k * x0 + 1}}`,
        distractors: [`\\sqrt{${k * x0}}`, `\\dfrac{${k}}{2\\sqrt{${k * x0 + 1}}}`, `${k * x0 + 1}`],
        explanation: `By the Fundamental Theorem of Calculus, $F'(x)=\\sqrt{${coef(k, "x")}+1}$, so $F'(${x0})=\\sqrt{${k * x0 + 1}}$.`,
      };
    },
  },
  {
    id: "x6-definite-numeric",
    unit: U6,
    topic: "fundamental-theorem-of-calculus",
    difficulty: "medium",
    calculator: true,
    build: (r) => {
      const k = ri(r, 1, 4);
      const b = ri(r, 1, 3);
      const val = (Math.exp(k * b) - 1) / k;
      return {
        prompt: `Evaluate $\\displaystyle\\int_{0}^{${b}} e^{${coef(k, "x")}}\\,dx$, correct to three decimal places.`,
        correct: `${dec(val, 3)}`,
        distractors: [`${dec(Math.exp(k * b), 3)}`, `${dec(val * k, 3)}`, `${dec(Math.exp(k * b) - 1, 3)}`],
        explanation: `$\\int_0^{${b}} e^{${coef(k, "x")}}dx = \\frac{1}{${k}}\\left(e^{${k * b}} - 1\\right) \\approx ${dec(val, 3)}$.`,
      };
    },
  },

  /* ------------------------------------------------------------------ */
  /* Unit 7                                                              */
  /* ------------------------------------------------------------------ */
  {
    id: "x7-euler-two-steps",
    unit: U7,
    topic: "eulers-method",
    difficulty: "hard",
    track: "BC",
    build: (r) => {
      const y0 = ri(r, 1, 4);
      const h = pick(r, [0.5, 0.25]);
      // dy/dx = x + y, start at (0, y0)
      const y1 = y0 + h * (0 + y0);
      const y2 = y1 + h * (h + y1);
      const figure: TableFigure = {
        kind: "table",
        headers: ["x", "y", "dy/dx = x + y"],
        rows: [
          ["0", `${y0}`, `${y0}`],
          [dec(h, 2), dec(y1, 4), dec(h + y1, 4)],
          [dec(2 * h, 2), dec(y2, 4), "—"],
        ],
        caption: "Euler's method steps",
      };
      return {
        prompt: `Let $\\dfrac{dy}{dx} = x + y$ with $y(0)=${y0}$. Use Euler's method with two steps of size $${h}$ to approximate $y(${dec(2 * h, 2)})$.`,
        correct: `${dec(y2, 4)}`,
        distractors: [`${dec(y1, 4)}`, `${dec(y0 + 2 * h * y0, 4)}`, `${dec(y2 + h, 4)}`],
        explanation: `Step 1: $y \\approx ${y0} + ${h}(0+${y0}) = ${dec(y1, 4)}$. Step 2: $y \\approx ${dec(y1, 4)} + ${h}(${h}+${dec(y1, 4)}) = ${dec(y2, 4)}$.`,
        figure,
      };
    },
  },
  {
    id: "x7-logistic-fastest",
    unit: U7,
    topic: "logistic-growth",
    difficulty: "medium",
    track: "BC",
    build: (r) => {
      const k = pick(r, [0.02, 0.05, 0.1]);
      const K = pick(r, [200, 400, 500, 800, 1000]);
      return {
        prompt: `A population $P$ satisfies $\\dfrac{dP}{dt} = ${k}P\\left(1 - \\dfrac{P}{${K}}\\right)$. For what population is the population growing fastest?`,
        correct: `${K / 2}`,
        distractors: [`${K}`, `${dec(K / 4, 1)}`, `${dec(k * K, 2)}`],
        explanation: `Logistic growth is fastest at half the carrying capacity, $P = \\frac{${K}}{2} = ${K / 2}$.`,
      };
    },
  },
  {
    id: "x7-separable-initial",
    unit: U7,
    topic: "separable-differential-equations",
    difficulty: "medium",
    build: (r) => {
      const k = ri(r, 2, 5);
      const y0 = ri(r, 1, 6);
      return {
        prompt: `Solve $\\dfrac{dy}{dx} = ${coef(k, "xy")}$ with $y(0)=${y0}$.`,
        correct: `y = ${y0}e^{${frac(k, 2)}x^{2}}`,
        distractors: [
          `y = ${y0}e^{${coef(k, "x")}}`,
          `y = ${y0} + ${frac(k, 2)}x^{2}`,
          `y = ${y0}e^{${coef(k, "x^{2}")}}`,
        ],
        explanation: `Separating, $\\int \\frac{dy}{y} = \\int ${coef(k, "x")}\\,dx$ gives $\\ln|y| = ${frac(k, 2)}x^{2} + C$. Applying $y(0)=${y0}$ yields $y=${y0}e^{${frac(k, 2)}x^{2}}$.`,
      };
    },
  },
  {
    id: "x7-decay-context",
    unit: U7,
    topic: "exponential-growth-and-decay",
    difficulty: "medium",
    calculator: true,
    build: (r) => {
      const A = pick(r, [50, 80, 120, 200]);
      const half = pick(r, [3, 5, 8, 10]);
      const t = half * 2 + ri(r, 0, 3);
      const val = A * Math.pow(0.5, t / half);
      return {
        prompt: `A sample of ${A} grams decays exponentially with a half-life of ${half} years. How many grams remain after ${t} years?`,
        correct: `${dec(val, 3)}`,
        distractors: [`${dec(A / 2, 3)}`, `${dec(A * Math.pow(0.5, half / t), 3)}`, `${dec(A - (A * t) / (2 * half), 3)}`],
        explanation: `$A(t) = ${A}\\left(\\tfrac{1}{2}\\right)^{t/${half}}$, so $A(${t}) \\approx ${dec(val, 3)}$ grams.`,
      };
    },
  },
  {
    id: "x7-slope-field-match-linear",
    unit: U7,
    topic: "slope-fields",
    difficulty: "medium",
    build: (r) => {
      const k = ri(r, 1, 4);
      return {
        prompt: `A slope field has segments whose slope depends only on $y$, is zero along $y=${k}$, positive for $y<${k}$, and negative for $y>${k}$. Which differential equation matches?`,
        correct: `\\dfrac{dy}{dx} = ${k} - y`,
        distractors: [`\\dfrac{dy}{dx} = y - ${k}`, `\\dfrac{dy}{dx} = x - ${k}`, `\\dfrac{dy}{dx} = ${k} - x`],
        explanation: `Slopes depend on $y$ only and vanish at $y=${k}$, being positive below that line: $\\frac{dy}{dx} = ${k}-y$.`,
        figure: {
          kind: "slope-field",
          a: 0,
          b: -1,
          extent: k + 3,
          window: { xMin: -(k + 3), xMax: k + 3, yMin: -1, yMax: 2 * k + 2 },
        },
      };
    },
  },

  /* ------------------------------------------------------------------ */
  /* Unit 8                                                              */
  /* ------------------------------------------------------------------ */
  {
    id: "x8-average-value-poly",
    unit: U8,
    topic: "average-value",
    difficulty: "medium",
    build: (r) => {
      const b = ri(r, 2, 5);
      // average of x^2 on [0,b] = b^2/3
      return {
        prompt: `Find the average value of $f(x)=x^{2}$ on $[0,${b}]$.`,
        correct: frac(b * b, 3),
        distractors: [frac(b * b * b, 3), `${b * b}`, frac(b, 3)],
        explanation: `$\\frac{1}{${b}}\\int_0^{${b}} x^{2}dx = \\frac{1}{${b}}\\cdot\\frac{${b ** 3}}{3} = ${frac(b * b, 3)}$.`,
      };
    },
  },
  {
    id: "x8-area-between-numeric",
    unit: U8,
    topic: "area-between-curves",
    difficulty: "hard",
    calculator: true,
    build: (r) => {
      const a = ri(r, 1, 4);
      // y = a x - x^2 and y = 0 ; area = a^3/6
      const area = (a ** 3) / 6;
      return {
        prompt: `Find the area of the region enclosed by $y=${coef(a, "x")} - x^{2}$ and the $x$-axis.`,
        correct: `${dec(area, 3)}`,
        distractors: [`${dec(area * 2, 3)}`, `${dec((a ** 3) / 3, 3)}`, `${dec((a ** 2) / 2, 3)}`],
        explanation: `The curve crosses the axis at $x=0$ and $x=${a}$: $\\int_0^{${a}}(${coef(a, "x")}-x^{2})dx = \\frac{${a}^{3}}{6} \\approx ${dec(area, 3)}$.`,
      };
    },
  },
  {
    id: "x8-washer-setup",
    unit: U8,
    topic: "volume-disks-and-washers",
    difficulty: "hard",
    build: (r) => {
      const b = ri(r, 1, 4);
      const linePts = sampleCurve((x) => b * x, 0, b, 40);
      const parabolaPts = sampleCurve((x) => x * x, 0, b, 40);
      const window = fitWindow([...linePts, ...parabolaPts], 1);
      const figure = {
        kind: "graph" as const,
        curves: [
          { label: `y=${coef(b, "x")}`, points: linePts, smooth: false, tone: 0 as const },
          { label: "y=x^2", points: parabolaPts, smooth: true, tone: 1 as const },
        ],
        window,
        shade: { from: 0, to: b, curve: 0 as const },
        caption: `Region bounded by y=${coef(b, "x")} and y=x^2`,
      };
      return {
        prompt: `The region bounded by $y=x^{2}$ and $y=${coef(b, "x")}$ is revolved about the $x$-axis. Which integral gives the volume?`,
        correct: `\\pi\\displaystyle\\int_{0}^{${b}}\\left(${b * b}x^{2} - x^{4}\\right)dx`,
        distractors: [
          `\\pi\\displaystyle\\int_{0}^{${b}}\\left(${coef(b, "x")} - x^{2}\\right)^{2}dx`,
          `\\pi\\displaystyle\\int_{0}^{${b}}\\left(x^{4} - ${b * b}x^{2}\\right)dx`,
          `2\\pi\\displaystyle\\int_{0}^{${b}}x\\left(${coef(b, "x")} - x^{2}\\right)dx`,
        ],
        explanation: `The curves meet at $x=0$ and $x=${b}$, with $${coef(b, "x")}$ on the outside. Washers give $\\pi\\int_0^{${b}}\\left[(${coef(b, "x")})^{2}-(x^{2})^{2}\\right]dx$.`,
        figure,
      };
    },
    mistakes: ["washer-square-difference"],
  },
  {
    id: "x8-cross-section-square",
    unit: U8,
    topic: "volume-known-cross-sections",
    difficulty: "hard",
    build: (r) => {
      const b = ri(r, 1, 4);
      // base bounded by y = sqrt(x), x-axis, x = b ; square cross sections perpendicular to x: A = x
      const vol = frac(b * b, 2);
      return {
        prompt: `The base of a solid is the region bounded by $y=\\sqrt{x}$, the $x$-axis, and $x=${b}$. Cross sections perpendicular to the $x$-axis are squares. Find the volume.`,
        correct: vol,
        distractors: [frac(b * b, 4), `${b * b}`, frac(2 * b ** 3, 3)],
        explanation: `Each square has side $\\sqrt{x}$ and area $x$, so $V=\\int_0^{${b}} x\\,dx = ${vol}$.`,
      };
    },
  },
  {
    id: "x8-arc-length-numeric",
    unit: U8,
    topic: "arc-length",
    difficulty: "hard",
    track: "BC",
    calculator: true,
    build: (r) => {
      const b = ri(r, 1, 3);
      // y = x^2 ; L = int_0^b sqrt(1+4x^2) dx = [x sqrt(1+4x^2)/2 + asinh(2x)/4]
      const L = (b * Math.sqrt(1 + 4 * b * b)) / 2 + Math.asinh(2 * b) / 4;
      return {
        prompt: `Find the length of the curve $y=x^{2}$ from $x=0$ to $x=${b}$, correct to three decimal places.`,
        correct: `${dec(L, 3)}`,
        distractors: [`${dec(b * b, 3)}`, `${dec(Math.sqrt(1 + 4 * b * b), 3)}`, `${dec(L / 2, 3)}`],
        explanation: `$L=\\int_0^{${b}}\\sqrt{1+(2x)^{2}}\\,dx \\approx ${dec(L, 3)}$.`,
      };
    },
  },
  {
    id: "x8-accumulation-context",
    unit: U8,
    topic: "accumulation-in-context",
    difficulty: "medium",
    calculator: true,
    build: (r) => {
      const inRate = ri(r, 4, 12);
      const outRate = ri(r, 1, 3);
      const t = ri(r, 3, 9);
      const start = ri(r, 10, 60);
      const net = start + (inRate - outRate) * t;
      return {
        prompt: `A tank holds ${start} gallons at time $t=0$. Water enters at a constant ${inRate} gallons per hour and leaves at a constant ${outRate} gallons per hour. How many gallons are in the tank at $t=${t}$ hours?`,
        correct: `${net}`,
        distractors: [`${start + inRate * t}`, `${(inRate - outRate) * t}`, `${start + inRate + outRate}`],
        explanation: `Net accumulation is $\\int_0^{${t}}(${inRate}-${outRate})dt = ${(inRate - outRate) * t}$ gallons, added to the initial ${start}.`,
      };
    },
    mistakes: ["forgot-initial-condition"],
  },

  /* ------------------------------------------------------------------ */
  /* Unit 9 (BC)                                                         */
  /* ------------------------------------------------------------------ */
  {
    id: "x9-parametric-vertical-tangent",
    unit: U9,
    topic: "parametric-derivatives",
    difficulty: "hard",
    track: "BC",
    build: (r) => {
      const a = ri(r, 1, 5);
      // x = t^2 - a, y = t^3 - 3t ; dx/dt = 2t = 0 at t = 0
      return {
        prompt: `A curve is given by $x(t)=t^{2} - ${a}$ and $y(t)=t^{3} - 3t$. At which value of $t$ does the curve have a vertical tangent line?`,
        correct: `t = 0`,
        distractors: [`t = 1`, `t = ${a}`, `t = \\pm 1`],
        explanation: `A vertical tangent needs $\\frac{dx}{dt}=0$ with $\\frac{dy}{dt}\\ne 0$. Here $\\frac{dx}{dt}=2t=0$ at $t=0$, where $\\frac{dy}{dt}=-3\\ne 0$.`,
      };
    },
  },
  {
    id: "x9-parametric-arc-numeric",
    unit: U9,
    topic: "parametric-arc-length",
    difficulty: "hard",
    track: "BC",
    calculator: true,
    build: (r) => {
      const a = ri(r, 2, 5);
      const b = ri(r, 2, 5);
      const T = ri(r, 1, 3);
      // x = a t, y = b t -> straight line, length = T sqrt(a^2+b^2)
      const L = T * Math.sqrt(a * a + b * b);
      return {
        prompt: `A particle moves with $x(t)=${coef(a, "t")}$ and $y(t)=${coef(b, "t")}$. Find the distance traveled from $t=0$ to $t=${T}$, correct to three decimal places.`,
        correct: `${dec(L, 3)}`,
        distractors: [`${dec(T * (a + b), 3)}`, `${dec(Math.sqrt(a * a + b * b), 3)}`, `${dec(T * Math.abs(a - b), 3)}`],
        explanation: `Speed is $\\sqrt{${a}^{2}+${b}^{2}}$, constant, so distance $= ${T}\\sqrt{${a * a + b * b}} \\approx ${dec(L, 3)}$.`,
      };
    },
  },
  {
    id: "x9-vector-acceleration",
    unit: U9,
    topic: "vector-valued-functions",
    difficulty: "hard",
    track: "BC",
    build: (r) => {
      const a = ri(r, 2, 5);
      const k = ri(r, 2, 4);
      const t0 = ri(r, 1, 3);
      // position <a t^2, sin(kt)> ; acceleration <2a, -k^2 sin(kt)>
      return {
        prompt: `A particle has position $\\left\\langle ${coef(a, "t^{2}")}, \\sin(${coef(k, "t")}) \\right\\rangle$. Find the acceleration vector at $t=${t0}$.`,
        correct: `\\left\\langle ${2 * a}, ${coef(-(k * k), `\\sin(${k * t0})`)} \\right\\rangle`,
        distractors: [
          `\\left\\langle ${coef(2 * a, `${t0}`)}, ${coef(k, `\\cos(${k * t0})`)} \\right\\rangle`,
          `\\left\\langle ${2 * a}, ${coef(k * k, `\\sin(${k * t0})`)} \\right\\rangle`,
          `\\left\\langle ${a * t0 * t0}, \\sin(${k * t0}) \\right\\rangle`,
        ],
        explanation: `Differentiate twice: velocity is $\\left\\langle ${coef(2 * a, "t")}, ${coef(k, `\\cos(${coef(k, "t")})`)}\\right\\rangle$ and acceleration is $\\left\\langle ${2 * a}, ${coef(-(k * k), `\\sin(${coef(k, "t")})`)}\\right\\rangle$.`,
      };
    },
  },
  {
    id: "x9-polar-slope-setup",
    unit: U9,
    topic: "polar-derivatives",
    difficulty: "hard",
    track: "BC",
    build: (r) => {
      const a = ri(r, 2, 6);
      return {
        prompt: `For the polar curve $r=${a}\\cos\\theta$, which expression gives $\\dfrac{dy}{d\\theta}$?`,
        correct: `${a}\\cos(2\\theta)`,
        distractors: [`${coef(-a, "\\sin(2\\theta)")}`, `${a}\\cos\\theta`, `${coef(-a, "\\sin\\theta\\cos\\theta")}`],
        explanation: `$y=r\\sin\\theta = ${a}\\cos\\theta\\sin\\theta = ${frac(a, 2)}\\sin(2\\theta)$, so $\\frac{dy}{d\\theta} = ${a}\\cos(2\\theta)$.`,
      };
    },
  },
  {
    id: "x9-polar-area-circle",
    unit: U9,
    topic: "polar-area",
    difficulty: "hard",
    track: "BC",
    build: (r) => {
      const a = ri(r, 2, 6);
      return {
        prompt: `Find the area enclosed by the polar curve $r=${a}$ for $0\\le\\theta\\le\\pi$.`,
        correct: `\\dfrac{${a * a}\\pi}{2}`,
        distractors: [`${a * a}\\pi`, `${coef(a, "\\pi")}`, `\\dfrac{${a}\\pi}{2}`],
        explanation: `$A=\\frac{1}{2}\\int_0^{\\pi}${a}^{2}d\\theta = \\frac{${a * a}\\pi}{2}$.`,
      };
    },
  },

  /* ------------------------------------------------------------------ */
  /* Unit 10 (BC)                                                        */
  /* ------------------------------------------------------------------ */
  {
    id: "x10-nth-term-conclusion",
    unit: U10,
    topic: "nth-term-test",
    difficulty: "medium",
    track: "BC",
    build: (r) => {
      const a = ri(r, 2, 8);
      const b = ri(r, 2, 8);
      return {
        prompt: `Consider $\\displaystyle\\sum_{n=1}^{\\infty}\\frac{${coef(a, "n")} + 1}{${coef(b, "n")} + 3}$. What does the $n$th-term test show?`,
        correct: `\\text{The series diverges.}`,
        distractors: [
          `\\text{The series converges.}`,
          `\\text{The test is inconclusive.}`,
          `\\text{The series converges conditionally.}`,
        ],
        explanation: `The terms approach $${frac(a, b)}\\ne 0$, so the series diverges by the $n$th-term test.`,
      };
    },
  },
  {
    id: "x10-geometric-sum-value",
    unit: U10,
    topic: "geometric-and-p-series",
    difficulty: "medium",
    track: "BC",
    build: (r) => {
      const a = ri(r, 2, 9);
      const d = ri(r, 2, 5);
      // sum_{n=0}^inf a (1/d)^n = a d/(d-1)
      return {
        prompt: `Find the sum $\\displaystyle\\sum_{n=0}^{\\infty} ${a}\\left(\\frac{1}{${d}}\\right)^{n}$.`,
        correct: frac(a * d, d - 1),
        distractors: [frac(a, d - 1), frac(a, d), `${a * d}`],
        explanation: `A geometric series with first term $${a}$ and ratio $\\frac{1}{${d}}$ sums to $\\dfrac{${a}}{1-\\frac{1}{${d}}} = ${frac(a * d, d - 1)}$.`,
      };
    },
  },
  {
    id: "x10-limit-comparison",
    unit: U10,
    topic: "comparison-tests",
    difficulty: "hard",
    track: "BC",
    build: (r) => {
      const a = ri(r, 2, 9);
      return {
        prompt: `Which series is the best comparison for $\\displaystyle\\sum_{n=1}^{\\infty}\\frac{${coef(a, "n")} + 1}{n^{3} + 2n}$, and what is the conclusion?`,
        correct: `\\sum \\frac{1}{n^{2}}, \\text{ so the series converges}`,
        distractors: [
          `\\sum \\frac{1}{n}, \\text{ so the series diverges}`,
          `\\sum \\frac{1}{n^{3}}, \\text{ so the series diverges}`,
          `\\sum ${a}, \\text{ so the series diverges}`,
        ],
        explanation: `For large $n$ the terms behave like $\\frac{${a}n}{n^{3}} = \\frac{${a}}{n^{2}}$. Limit comparison with the convergent $p$-series $\\sum n^{-2}$ shows convergence.`,
      };
    },
  },
  {
    id: "x10-ratio-test-factorial",
    unit: U10,
    topic: "ratio-test",
    difficulty: "hard",
    track: "BC",
    build: (r) => {
      const a = ri(r, 2, 9);
      return {
        prompt: `Apply the ratio test to $\\displaystyle\\sum_{n=1}^{\\infty}\\frac{${a}^{n}}{n!}$. What is the limit of $\\left|\\frac{a_{n+1}}{a_n}\\right|$, and what does it show?`,
        correct: `0, \\text{ so the series converges}`,
        distractors: [
          `${a}, \\text{ so the series diverges}`,
          `1, \\text{ so the test is inconclusive}`,
          `\\infty, \\text{ so the series diverges}`,
        ],
        explanation: `$\\left|\\frac{a_{n+1}}{a_n}\\right| = \\frac{${a}}{n+1} \\to 0 < 1$, so the series converges absolutely.`,
      };
    },
  },
  {
    id: "x10-alternating-conditional",
    unit: U10,
    topic: "alternating-series-test",
    difficulty: "hard",
    track: "BC",
    build: (r) => {
      const p = pick(r, [1, 2]);
      const conv = p > 1;
      return {
        prompt: `Classify $\\displaystyle\\sum_{n=1}^{\\infty}\\frac{(-1)^{n}}{${pow("n", p)}}$.`,
        correct: conv ? `\\text{Absolutely convergent}` : `\\text{Conditionally convergent}`,
        distractors: conv
          ? [`\\text{Conditionally convergent}`, `\\text{Divergent}`, `\\text{Convergent only for even } n`]
          : [`\\text{Absolutely convergent}`, `\\text{Divergent}`, `\\text{Convergent only for even } n`],
        explanation: conv
          ? `$\\sum ${pow("n", -p)}$ converges as a $p$-series with $p=${p}>1$, so the alternating series converges absolutely.`
          : `The alternating series converges, but $\\sum \\frac{1}{n}$ diverges, so convergence is conditional.`,
      };
    },
  },
  {
    id: "x10-maclaurin-term",
    unit: U10,
    topic: "taylor-and-maclaurin-series",
    difficulty: "hard",
    track: "BC",
    build: (r) => {
      const k = ri(r, 2, 5);
      // e^{kx}: coefficient of x^3 is k^3/6
      return {
        prompt: `In the Maclaurin series for $e^{${coef(k, "x")}}$, what is the coefficient of $x^{3}$?`,
        correct: frac(k ** 3, 6),
        distractors: [frac(k, 6), `${k ** 3}`, frac(k ** 3, 3)],
        explanation: `$e^{${coef(k, "x")}} = \\sum \\frac{(${coef(k, "x")})^{n}}{n!}$, so the $x^{3}$ coefficient is $\\frac{${k}^{3}}{3!} = ${frac(k ** 3, 6)}$.`,
      };
    },
  },
  {
    id: "x10-lagrange-bound-numeric",
    unit: U10,
    topic: "lagrange-error-bound",
    difficulty: "hard",
    track: "BC",
    calculator: true,
    build: (r) => {
      const n = ri(r, 2, 4);
      const x = pick(r, [0.1, 0.2, 0.5]);
      // f = sin x, |f^{(n+1)}| <= 1, bound = x^{n+1}/(n+1)!
      const fact = (m: number): number => (m <= 1 ? 1 : m * fact(m - 1));
      const bound = Math.pow(x, n + 1) / fact(n + 1);
      return {
        prompt: `The Maclaurin polynomial of degree ${n} for $\\sin x$ is used to approximate $\\sin(${x})$. Using the Lagrange error bound with $\\left|f^{(${n + 1})}\\right|\\le 1$, what is the maximum possible error?`,
        correct: `${dec(bound, 6)}`,
        distractors: [`${dec(Math.pow(x, n) / fact(n), 6)}`, `${dec(bound * (n + 1), 6)}`, `${dec(x, 6)}`],
        explanation: `The bound is $\\dfrac{|x|^{${n + 1}}}{(${n + 1})!} = \\dfrac{${x}^{${n + 1}}}{${fact(n + 1)}} \\approx ${dec(bound, 6)}$.`,
      };
    },
  },
  {
    id: "x10-power-series-interval",
    unit: U10,
    topic: "power-series-operations",
    difficulty: "hard",
    track: "BC",
    build: (r) => {
      const c = ri(r, 1, 5);
      const R = ri(r, 2, 5);
      return {
        prompt: `A power series $\\displaystyle\\sum_{n=0}^{\\infty} a_n (x-${c})^{n}$ has radius of convergence ${R}. Which interval must contain every $x$ for which the series converges?`,
        correct: `[${c - R}, ${c + R}]`,
        distractors: [`(${c - R}, ${c + R})`.replace("(", "\\left(").replace(")", "\\right)"), `[0, ${R}]`, `[${c}, ${c + R}]`],
        explanation: `The series converges on the open interval $(${c - R}, ${c + R})$ and possibly at the endpoints, so every convergent $x$ lies in $[${c - R}, ${c + R}]$.`,
      };
    },
  },
  {
    id: "x2-name-variation",
    unit: U2,
    topic: "product-and-quotient-rules",
    difficulty: "medium",
    build: (r) => {
      const nm = pick(r, NAMES);
      const a = ri(r, 2, 6);
      const b = ri(r, 2, 6);
      // f = (a x)(e^x) -> f' = a e^x (x + 1) ; at x = 0 -> a
      return {
        prompt: `Let $${nm}(x) = ${coef(a, "x")}e^{x} ${term(b, "")}$. Find $${nm}'(0)$.`,
        correct: `${a}`,
        distractors: [`${a + b}`, `${b}`, `0`],
        explanation: `Product rule: $${nm}'(x) = ${a}e^{x} + ${coef(a, "x")}e^{x}$, so $${nm}'(0)=${a}$. The constant $${b}$ does not affect the derivative.`,
      };
    },
    mistakes: ["product-rule-missing-term"],
  },
];
