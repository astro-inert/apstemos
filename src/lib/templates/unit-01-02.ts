/**
 * Original AP Calculus MCQ templates for Unit 1 (Limits and Continuity) and
 * Unit 2 (Differentiation: Definition and Properties).
 */

import { ri, pick, frac, term, type RNG, type QuestionTemplate } from "../question-templates";
import type { GraphMarker, TableFigure } from "../figures";
import { sampleCurve } from "../figures";

const U1 = "unit-1-limits-and-continuity";
const U2 = "unit-2-differentiation-definition-and-properties";

function coef(c: number, body: string): string {
  if (c === 1) return body;
  if (c === -1) return `-${body}`;
  return `${c}${body}`;
}

const trigVal = (angle: "6" | "4" | "3", fn: "sin" | "cos"): [string, number] => {
  if (angle === "6") return fn === "sin" ? ["\\frac{1}{2}", 0.5] : ["\\frac{\\sqrt{3}}{2}", 0.8660254];
  if (angle === "4") return ["\\frac{\\sqrt{2}}{2}", 0.70710678];
  return fn === "sin" ? ["\\frac{\\sqrt{3}}{2}", 0.8660254] : ["\\frac{1}{2}", 0.5];
};
const angleLabel = (angle: "6" | "4" | "3") => (angle === "6" ? "\\frac{\\pi}{6}" : angle === "4" ? "\\frac{\\pi}{4}" : "\\frac{\\pi}{3}");

export const UNIT_01_02_TEMPLATES: QuestionTemplate[] = [
  /* ================================================================== */
  /* evaluating-limits-algebraically : direct-substitution               */
  /* ================================================================== */
  {
    id: "n1-direct-sub-poly",
    unit: U1,
    topic: "evaluating-limits-algebraically",
    difficulty: "easy",
    manifestation: "evaluating-limits-algebraically:direct-substitution",
    build: (r: RNG) => {
      const a = ri(r, -4, 4);
      const b = ri(r, 1, 6);
      const c = ri(r, -8, 8);
      const t = ri(r, -3, 3);
      const val = b * t * t + c * t + a;
      return {
        prompt: `What is $\\displaystyle\\lim_{x\\to ${t}}\\left(${b}x^{2}${term(c, "x")}${term(a, "")}\\right)$?`,
        correct: `${val}`,
        distractors: [`${val + 1}`, `${b * t + c * t + a}`, `${-val}`],
        explanation: `The function is continuous everywhere, so substitute $x=${t}$ directly: $${b}(${t})^{2}${term(c, "")}${term(a, "")}=${val}$.`,
      };
    },
  },
  {
    id: "n1-direct-sub-rational",
    unit: U1,
    topic: "evaluating-limits-algebraically",
    difficulty: "easy",
    manifestation: "evaluating-limits-algebraically:direct-substitution",
    build: (r: RNG) => {
      const t = ri(r, 1, 5);
      const a = ri(r, 1, 6);
      const b = ri(r, 1, 9);
      const num = a * t + b;
      const den = t + a;
      return {
        prompt: `Given $g(x)=\\dfrac{${a}x+${b}}{x+${a}}$, evaluate $\\displaystyle\\lim_{x\\to ${t}} g(x)$, given the denominator is not zero at $x=${t}$.`,
        correct: frac(num, den),
        distractors: [frac(den, num), frac(num, den + 1), `${a}`],
        explanation: `Since $x+${a}$ does not vanish at $x=${t}$, substitute directly: $g(${t})=\\dfrac{${num}}{${den}}=${frac(num, den)}$.`,
      };
    },
  },
  {
    id: "n1-direct-sub-radical",
    unit: U1,
    topic: "evaluating-limits-algebraically",
    difficulty: "medium",
    manifestation: "evaluating-limits-algebraically:direct-substitution",
    build: (r: RNG) => {
      const s = ri(r, 2, 6);
      const t = ri(r, 1, 5);
      const aOff = s * s - t;
      const c = ri(r, 1, 4);
      const bAdd = ri(r, -5, 5);
      const val = c * s + bAdd;
      return {
        prompt: `Since $f(x)=${c}\\sqrt{x+${aOff}}${term(bAdd, "")}$ is continuous at $x=${t}$, evaluate $\\displaystyle\\lim_{x\\to ${t}} f(x)$.`,
        correct: `${val}`,
        distractors: [`${c * s}`, `${c * (t + aOff) + bAdd}`, `${-val}`],
        explanation: `Substitute directly: $x+${aOff}=${t + aOff}=${s}^{2}$, so $f(${t})=${c}\\cdot ${s}${term(bAdd, "")}=${val}$.`,
      };
    },
  },

  /* ================================================================== */
  /* evaluating-limits-algebraically : conjugate                         */
  /* ================================================================== */
  {
    id: "n1-conjugate-basic",
    unit: U1,
    topic: "evaluating-limits-algebraically",
    difficulty: "medium",
    manifestation: "evaluating-limits-algebraically:conjugate",
    algebra: "conjugate",
    mistakes: ["forgot-conjugate", "sign-error"],
    build: (r: RNG) => {
      const c = ri(r, 2, 9);
      return {
        prompt: `Evaluate $\\displaystyle\\lim_{x\\to 0}\\frac{\\sqrt{x+${c * c}}-${c}}{x}$.`,
        correct: frac(1, 2 * c),
        distractors: [frac(1, c), `${2 * c}`, frac(-1, 2 * c)],
        explanation: `Multiply by the conjugate $\\sqrt{x+${c * c}}+${c}$; the numerator becomes $x$, which cancels, leaving $\\frac{1}{\\sqrt{x+${c * c}}+${c}}\\to\\frac{1}{${2 * c}}$.`,
      };
    },
  },
  {
    id: "n1-conjugate-shift",
    unit: U1,
    topic: "evaluating-limits-algebraically",
    difficulty: "hard",
    manifestation: "evaluating-limits-algebraically:conjugate",
    algebra: "conjugate",
    mistakes: ["forgot-conjugate"],
    build: (r: RNG) => {
      const t = ri(r, 1, 4);
      const s = ri(r, 3, 6);
      const k = s * s - t;
      return {
        prompt: `Evaluate $\\displaystyle\\lim_{x\\to ${t}}\\frac{\\sqrt{x+${k}}-\\sqrt{${t + k}}}{x-${t}}$.`,
        correct: frac(1, 2 * s),
        distractors: [frac(1, s), frac(-1, 2 * s), frac(1, 2 * s * s)],
        explanation: `Multiply by the conjugate $\\sqrt{x+${k}}+\\sqrt{${t + k}}$; the numerator becomes $x-${t}$, which cancels, leaving $\\frac{1}{\\sqrt{x+${k}}+\\sqrt{${t + k}}}\\to\\frac{1}{${2 * s}}$.`,
      };
    },
  },
  {
    id: "n1-conjugate-negative",
    unit: U1,
    topic: "evaluating-limits-algebraically",
    difficulty: "hard",
    manifestation: "evaluating-limits-algebraically:conjugate",
    algebra: "conjugate",
    mistakes: ["sign-error"],
    build: (r: RNG) => {
      const c = ri(r, 2, 8);
      return {
        prompt: `Determine $\\displaystyle\\lim_{x\\to 0}\\frac{${c}-\\sqrt{${c * c}-x}}{x}$.`,
        correct: frac(1, 2 * c),
        distractors: [frac(-1, 2 * c), frac(1, c), `${2 * c}`],
        explanation: `Multiply by the conjugate $${c}+\\sqrt{${c * c}-x}$: the numerator becomes $x$, giving $\\frac{1}{${c}+\\sqrt{${c * c}-x}}\\to\\frac{1}{${2 * c}}$.`,
      };
    },
  },

  /* ================================================================== */
  /* evaluating-limits-algebraically : complex-fraction                  */
  /* ================================================================== */
  {
    id: "n1-complex-fraction-basic",
    unit: U1,
    topic: "evaluating-limits-algebraically",
    difficulty: "hard",
    manifestation: "evaluating-limits-algebraically:complex-fraction",
    algebra: "common-denominator",
    mistakes: ["sign-error"],
    build: (r: RNG) => {
      const a = ri(r, 2, 8);
      return {
        prompt: `Evaluate $\\displaystyle\\lim_{x\\to 0}\\frac{\\dfrac{1}{x+${a}}-\\dfrac{1}{${a}}}{x}$.`,
        correct: frac(-1, a * a),
        distractors: [frac(1, a * a), frac(-1, a), frac(1, a)],
        explanation: `Combine the fractions over a common denominator: $\\dfrac{-x}{${a}(x+${a})x}=\\dfrac{-1}{${a}(x+${a})}\\to\\dfrac{-1}{${a * a}}$.`,
      };
    },
  },
  {
    id: "n1-complex-fraction-scaled",
    unit: U1,
    topic: "evaluating-limits-algebraically",
    difficulty: "hard",
    manifestation: "evaluating-limits-algebraically:complex-fraction",
    algebra: "common-denominator",
    mistakes: ["sign-error"],
    build: (r: RNG) => {
      const a = ri(r, 2, 7);
      const b = ri(r, 2, 9);
      return {
        prompt: `Evaluate $\\displaystyle\\lim_{x\\to 0}\\frac{\\dfrac{${b}}{x+${a}}-\\dfrac{${b}}{${a}}}{x}$.`,
        correct: frac(-b, a * a),
        distractors: [frac(b, a * a), frac(-b, a), frac(b, a)],
        explanation: `Combining over a common denominator gives $\\dfrac{-${b}x}{${a}(x+${a})x}=\\dfrac{-${b}}{${a}(x+${a})}\\to\\dfrac{-${b}}{${a * a}}$.`,
      };
    },
  },
  {
    id: "n1-complex-fraction-centered",
    unit: U1,
    topic: "evaluating-limits-algebraically",
    difficulty: "hard",
    manifestation: "evaluating-limits-algebraically:complex-fraction",
    algebra: "common-denominator",
    mistakes: ["sign-error"],
    build: (r: RNG) => {
      const t = ri(r, 2, 9);
      return {
        prompt: `Evaluate $\\displaystyle\\lim_{x\\to ${t}}\\frac{\\dfrac{1}{x}-\\dfrac{1}{${t}}}{x-${t}}$.`,
        correct: frac(-1, t * t),
        distractors: [frac(1, t * t), frac(-1, t), frac(1, t)],
        explanation: `Combine the numerator into $\\dfrac{${t}-x}{${t}x}$, so the whole expression is $\\dfrac{-1}{${t}x}\\to\\dfrac{-1}{${t * t}}$ as $x\\to ${t}$.`,
      };
    },
  },

  /* ================================================================== */
  /* evaluating-limits-algebraically : procedure-choice                  */
  /* ================================================================== */
  {
    id: "n1-procedure-choice-factor",
    unit: U1,
    topic: "evaluating-limits-algebraically",
    difficulty: "medium",
    manifestation: "evaluating-limits-algebraically:procedure-choice",
    reasoning: "procedure-selection",
    build: (r: RNG) => {
      const a = ri(r, 2, 7);
      const b = ri(r, 1, 6);
      return {
        prompt: `Which technique most directly resolves $\\displaystyle\\lim_{x\\to ${a}}\\frac{x^{2}-${a + b}x+${a * b}}{x-${a}}$?`,
        correct: `\\text{Factor the numerator and cancel the common factor.}`,
        distractors: [
          `\\text{Multiply numerator and denominator by the conjugate.}`,
          `\\text{Combine the terms over a common denominator.}`,
          `\\text{Apply direct substitution without simplifying.}`,
        ],
        explanation: `The numerator factors as $(x-${a})(x-${b})$, so factoring and canceling $(x-${a})$ removes the $0/0$ form.`,
      };
    },
  },
  {
    id: "n1-procedure-choice-conjugate",
    unit: U1,
    topic: "evaluating-limits-algebraically",
    difficulty: "medium",
    manifestation: "evaluating-limits-algebraically:procedure-choice",
    reasoning: "procedure-selection",
    build: (r: RNG) => {
      const c = ri(r, 2, 9);
      return {
        prompt: `Which technique most directly resolves $\\displaystyle\\lim_{x\\to 0}\\frac{\\sqrt{x+${c * c}}-${c}}{x}$?`,
        correct: `\\text{Multiply numerator and denominator by the conjugate.}`,
        distractors: [
          `\\text{Factor the numerator and cancel the common factor.}`,
          `\\text{Combine the terms over a common denominator.}`,
          `\\text{Apply the special trigonometric limit identity.}`,
        ],
        explanation: `The $0/0$ form comes from a radical difference, so multiplying by the conjugate $\\sqrt{x+${c * c}}+${c}$ eliminates the radical.`,
      };
    },
  },
  {
    id: "n1-procedure-choice-common-denom",
    unit: U1,
    topic: "evaluating-limits-algebraically",
    difficulty: "medium",
    manifestation: "evaluating-limits-algebraically:procedure-choice",
    reasoning: "procedure-selection",
    build: (r: RNG) => {
      const a = ri(r, 2, 9);
      return {
        prompt: `Which technique most directly resolves $\\displaystyle\\lim_{x\\to 0}\\frac{\\dfrac{1}{x+${a}}-\\dfrac{1}{${a}}}{x}$?`,
        correct: `\\text{Combine the terms over a common denominator.}`,
        distractors: [
          `\\text{Multiply numerator and denominator by the conjugate.}`,
          `\\text{Factor the numerator and cancel the common factor.}`,
          `\\text{Apply direct substitution without simplifying.}`,
        ],
        explanation: `The nested fractions must first be combined over a common denominator before the $x$ in the denominator can cancel.`,
      };
    },
  },

  /* ================================================================== */
  /* evaluating-limits-algebraically : trig-identity                     */
  /* ================================================================== */
  {
    id: "n1-trig-identity-sin-ratio",
    unit: U1,
    topic: "evaluating-limits-algebraically",
    difficulty: "medium",
    manifestation: "evaluating-limits-algebraically:trig-identity",
    algebra: "identities",
    build: (r: RNG) => {
      const a = ri(r, 2, 9);
      const b = ri(r, 2, 9);
      return {
        prompt: `Evaluate $\\displaystyle\\lim_{x\\to 0}\\frac{\\sin(${a}x)}{${b}x}$.`,
        correct: frac(a, b),
        distractors: [frac(b, a), `1`, `0`],
        explanation: `Rewrite as $\\frac{${a}}{${b}}\\cdot\\frac{\\sin(${a}x)}{${a}x}$; the second factor tends to $1$, leaving $${frac(a, b)}$.`,
      };
    },
  },
  {
    id: "n1-trig-identity-one-minus-cos",
    unit: U1,
    topic: "evaluating-limits-algebraically",
    difficulty: "medium",
    manifestation: "evaluating-limits-algebraically:trig-identity",
    algebra: "identities",
    mistakes: ["wrong-special-limit"],
    build: (r: RNG) => {
      const a = ri(r, 2, 9);
      return {
        prompt: `Evaluate $\\displaystyle\\lim_{x\\to 0}\\frac{1-\\cos(${a}x)}{x}$.`,
        correct: `0`,
        distractors: [`${a}`, `1`, frac(a, 2)],
        explanation: `Since $\\frac{1-\\cos(u)}{u}\\to 0$ as $u\\to 0$, write the expression as $${a}\\cdot\\frac{1-\\cos(${a}x)}{${a}x}\\to ${a}\\cdot 0 = 0$.`,
      };
    },
  },
  {
    id: "n1-trig-identity-sin-sin",
    unit: U1,
    topic: "evaluating-limits-algebraically",
    difficulty: "hard",
    manifestation: "evaluating-limits-algebraically:trig-identity",
    algebra: "identities",
    build: (r: RNG) => {
      const a = ri(r, 2, 9);
      const b = ri(r, 2, 9);
      return {
        prompt: `Evaluate $\\displaystyle\\lim_{x\\to 0}\\frac{\\sin(${a}x)}{\\sin(${b}x)}$.`,
        correct: frac(a, b),
        distractors: [frac(b, a), `1`, `0`],
        explanation: `Write $\\frac{\\sin(${a}x)}{${a}x}\\cdot\\frac{${a}x}{${b}x}\\cdot\\frac{${b}x}{\\sin(${b}x)}$; the outer factors tend to $1$, leaving $${frac(a, b)}$.`,
      };
    },
  },

  /* ================================================================== */
  /* limits-from-graphs-and-tables : notation                             */
  /* ================================================================== */
  {
    id: "n1-graph-notation-onesided",
    unit: U1,
    topic: "limits-from-graphs-and-tables",
    difficulty: "medium",
    manifestation: "limits-from-graphs-and-tables:notation",
    representation: "graphical",
    build: (r: RNG) => {
      const c = ri(r, -2, 2);
      const L1 = ri(r, -4, 0);
      const L2 = L1 + ri(r, 2, 6);
      const Fc = L2 + ri(r, 1, 3);
      const avg = (L1 + L2) / 2;
      return {
        prompt: `The graph of $f$ is shown, with a jump at $x=${c}$. What is $\\displaystyle\\lim_{x\\to ${c}^{-}} f(x)$?`,
        correct: `${L1}`,
        distractors: [`${L2}`, `${Fc}`, `${avg}`],
        explanation: `Following the left branch as $x\\to ${c}^{-}$, the curve approaches the open circle at height $${L1}$.`,
        figure: {
          kind: "graph",
          curves: [
            { points: [[c - 3, L1 - 3], [c, L1]], smooth: false, tone: 0 },
            { points: [[c, L2], [c + 3, L2 + 3]], smooth: false, tone: 1 },
          ],
          window: { xMin: c - 3.5, xMax: c + 3.5, yMin: Math.min(L1, L2) - 4, yMax: Math.max(L1, L2) + 4 },
          markers: [
            { x: c, y: L1, kind: "open" },
            { x: c, y: L2, kind: "open" },
            { x: c, y: Fc, kind: "closed" },
          ],
          caption: "A jump discontinuity at x = " + c,
        },
      };
    },
  },
  {
    id: "n1-graph-notation-hole",
    unit: U1,
    topic: "limits-from-graphs-and-tables",
    difficulty: "medium",
    manifestation: "limits-from-graphs-and-tables:notation",
    representation: "graphical",
    mistakes: ["confuses-limit-with-value"],
    build: (r: RNG) => {
      const c = ri(r, -2, 2);
      const Fc = c + ri(r, 2, 5);
      return {
        prompt: `The graph of $f(x)=x$ is shown with a hole at $x=${c}$, where $f(${c})=${Fc}$ instead. What is $\\displaystyle\\lim_{x\\to ${c}} f(x)$?`,
        correct: `${c}`,
        distractors: [`${Fc}`, `${c + 1}`, `\\text{The limit does not exist.}`],
        explanation: `The hole does not affect the limit: as $x\\to ${c}$ along the line $y=x$, $f(x)\\to ${c}$, regardless of the isolated value $f(${c})=${Fc}$.`,
        figure: {
          kind: "graph",
          curves: [{ points: [[c - 4, c - 4], [c + 4, c + 4]], smooth: false, tone: 0 }],
          window: { xMin: c - 4.5, xMax: c + 4.5, yMin: c - 5, yMax: c + 5 },
          markers: [
            { x: c, y: c, kind: "hole" },
            { x: c, y: Fc, kind: "closed" },
          ],
          caption: "A removable discontinuity at x = " + c,
        },
      };
    },
  },
  {
    id: "n1-graph-notation-dne",
    unit: U1,
    topic: "limits-from-graphs-and-tables",
    difficulty: "medium",
    manifestation: "limits-from-graphs-and-tables:notation",
    representation: "graphical",
    build: (r: RNG) => {
      const c = ri(r, -2, 2);
      const L1 = ri(r, -4, 0);
      const L2 = L1 + ri(r, 2, 6);
      return {
        prompt: `The graph of $f$ jumps at $x=${c}$, approaching $${L1}$ from the left and $${L2}$ from the right. Which statement correctly describes $\\displaystyle\\lim_{x\\to ${c}} f(x)$?`,
        correct: `\\text{The limit does not exist because the one-sided limits differ.}`,
        distractors: [
          `\\text{The limit equals } ${L1}.`,
          `\\text{The limit equals } ${L2}.`,
          `\\text{The limit equals the average of the one-sided limits.}`,
        ],
        explanation: `Since the left-hand limit $${L1}$ and the right-hand limit $${L2}$ are unequal, the two-sided limit does not exist.`,
        figure: {
          kind: "graph",
          curves: [
            { points: [[c - 3, L1 - 3], [c, L1]], smooth: false, tone: 0 },
            { points: [[c, L2], [c + 3, L2 + 3]], smooth: false, tone: 1 },
          ],
          window: { xMin: c - 3.5, xMax: c + 3.5, yMin: Math.min(L1, L2) - 4, yMax: Math.max(L1, L2) + 4 },
          markers: [
            { x: c, y: L1, kind: "open" },
            { x: c, y: L2, kind: "open" },
          ],
          caption: "A jump discontinuity at x = " + c,
        },
      };
    },
  },

  /* ================================================================== */
  /* squeeze-theorem : valid-argument                                    */
  /* ================================================================== */
  {
    id: "n1-squeeze-valid",
    unit: U1,
    topic: "squeeze-theorem",
    difficulty: "medium",
    manifestation: "squeeze-theorem:valid-argument",
    representation: "verbal",
    reasoning: "error-analysis",
    build: (r: RNG) => {
      const c = ri(r, 1, 6);
      return {
        prompt: `A student shows $-${c}x^{2}\\le f(x)\\le ${c}x^{2}$ for all $x$ near $0$ and concludes $\\displaystyle\\lim_{x\\to 0} f(x)=0$. Is this reasoning valid?`,
        correct: `\\text{Yes: both bounding functions approach 0, so the Squeeze Theorem forces the limit to be 0.}`,
        distractors: [
          `\\text{No: the bounding functions must be equal to } f(x) \\text{, not just bound it.}`,
          `\\text{No: the Squeeze Theorem only applies to trigonometric functions.}`,
          `\\text{Yes, but only because } f \\text{ must be an even function.}`,
        ],
        explanation: `Both $-${c}x^{2}$ and $${c}x^{2}$ tend to $0$ as $x\\to 0$, and $f$ is trapped between them, so by the Squeeze Theorem $f(x)\\to 0$ as well.`,
      };
    },
  },
  {
    id: "n1-squeeze-invalid-different-limits",
    unit: U1,
    topic: "squeeze-theorem",
    difficulty: "medium",
    manifestation: "squeeze-theorem:valid-argument",
    representation: "verbal",
    reasoning: "error-analysis",
    build: (r: RNG) => {
      const L1 = ri(r, -3, 0);
      const L2 = L1 + ri(r, 2, 5);
      return {
        prompt: `A student shows $${L1}\\le f(x)\\le ${L2}$ for all $x$ near $2$ and concludes $\\displaystyle\\lim_{x\\to 2} f(x)=${L1}$. Is this reasoning valid?`,
        correct: `\\text{No: the bounding constants have different limits, so the Squeeze Theorem does not determine a unique value.}`,
        distractors: [
          `\\text{Yes: the lower bound always gives the correct limit.}`,
          `\\text{Yes: any value between the bounds is an acceptable limit.}`,
          `\\text{No: the Squeeze Theorem cannot be used with constant bounds.}`,
        ],
        explanation: `The Squeeze Theorem requires both bounding functions to approach the *same* limit; here $${L1}\\ne ${L2}$, so no conclusion about the exact limit follows.`,
      };
    },
  },
  {
    id: "n1-squeeze-invalid-reversed",
    unit: U1,
    topic: "squeeze-theorem",
    difficulty: "medium",
    manifestation: "squeeze-theorem:valid-argument",
    representation: "verbal",
    reasoning: "error-analysis",
    build: (r: RNG) => {
      const c = ri(r, 1, 5);
      return {
        prompt: `A student writes $${c}x^{2}\\le f(x)\\le -${c}x^{2}$ near $x=0$ and concludes $\\displaystyle\\lim_{x\\to 0} f(x)=0$. Is this reasoning valid?`,
        correct: `\\text{No: the stated inequality is reversed, since } ${c}x^{2}\\ge -${c}x^{2} \\text{ near 0, so the hypothesis fails.}`,
        distractors: [
          `\\text{Yes: the conclusion } 0 \\text{ is correct regardless of the order of the inequality.}`,
          `\\text{Yes: reversing the inequality does not affect the Squeeze Theorem.}`,
          `\\text{No: the Squeeze Theorem requires strict inequalities everywhere.}`,
        ],
        explanation: `Since $${c}x^2 \\ge 0 \\ge -${c}x^2$ near $0$, the stated inequality $${c}x^{2}\\le f(x)\\le -${c}x^{2}$ can only hold where both sides equal $f(x)=0$, so the hypothesis as written is invalid.`,
      };
    },
  },

  /* ================================================================== */
  /* squeeze-theorem : at-infinity                                       */
  /* ================================================================== */
  {
    id: "n1-squeeze-infinity-sin",
    unit: U1,
    topic: "squeeze-theorem",
    difficulty: "medium",
    manifestation: "squeeze-theorem:at-infinity",
    build: (r: RNG) => {
      const a = ri(r, 2, 9);
      return {
        prompt: `Evaluate $\\displaystyle\\lim_{x\\to\\infty}\\frac{\\sin(${a}x)}{x}$.`,
        correct: `0`,
        distractors: [`\\text{The limit does not exist.}`, `1`, `${a}`],
        explanation: `Since $-1\\le\\sin(${a}x)\\le 1$, we have $\\frac{-1}{x}\\le\\frac{\\sin(${a}x)}{x}\\le\\frac{1}{x}$, and both bounds tend to $0$, so the limit is $0$ by the Squeeze Theorem.`,
      };
    },
  },
  {
    id: "n1-squeeze-infinity-cos-shift",
    unit: U1,
    topic: "squeeze-theorem",
    difficulty: "medium",
    manifestation: "squeeze-theorem:at-infinity",
    build: (r: RNG) => {
      const a = ri(r, 2, 9);
      return {
        prompt: `Evaluate $\\displaystyle\\lim_{x\\to\\infty}\\frac{${a}+\\cos x}{x}$.`,
        correct: `0`,
        distractors: [`${a}`, `\\text{The limit does not exist.}`, `1`],
        explanation: `Since $${a}-1\\le ${a}+\\cos x\\le ${a}+1$, dividing by $x\\to\\infty$ squeezes the expression to $0$.`,
      };
    },
  },
  {
    id: "n1-squeeze-infinity-power",
    unit: U1,
    topic: "squeeze-theorem",
    difficulty: "hard",
    manifestation: "squeeze-theorem:at-infinity",
    build: (r: RNG) => {
      const a = ri(r, 2, 4);
      return {
        prompt: `Evaluate $\\displaystyle\\lim_{x\\to\\infty}\\frac{\\cos(2x)}{x^{${a}}}$.`,
        correct: `0`,
        distractors: [`\\text{The limit does not exist.}`, `1`, frac(1, a)],
        explanation: `Since $-1\\le\\cos(2x)\\le 1$, the expression is squeezed between $\\pm\\frac{1}{x^{${a}}}$, and both bounds tend to $0$ as $x\\to\\infty$.`,
      };
    },
  },

  /* ================================================================== */
  /* intermediate-value-theorem : count-solutions                        */
  /* ================================================================== */
  {
    id: "n1-ivt-count-two",
    unit: U1,
    topic: "intermediate-value-theorem",
    difficulty: "medium",
    manifestation: "intermediate-value-theorem:count-solutions",
    representation: "graphical",
    reasoning: "comparison",
    build: (r: RNG) => {
      const a0 = ri(r, -2, 1);
      const A = ri(r, 2, 5);
      const B = ri(r, -3, 3);
      const shape = [-1, 1, -1];
      const xs = shape.map((_, i) => a0 + 2 * i);
      const ys = shape.map((s) => B + A * s);
      const pts: Array<[number, number]> = xs.map((x, i) => [x, ys[i]]);
      return {
        prompt: `The graph of a continuous function $f$ consists of the connected line segments shown. For how many values $c$ in $(${xs[0]},${xs[xs.length - 1]})$ is $f(c)=${B}$?`,
        correct: `2`,
        distractors: [`1`, `3`, `0`],
        explanation: `The value $y=${B}$ lies strictly between consecutive endpoint heights on each of the two segments that switch from below to above (or above to below) $${B}$, and by the Intermediate Value Theorem each such segment contributes exactly one solution, for a total of $2$.`,
        figure: {
          kind: "graph",
          curves: [{ points: pts, smooth: false, tone: 0 }],
          window: { xMin: xs[0] - 1, xMax: xs[xs.length - 1] + 1, yMin: B - A - 2, yMax: B + A + 2 },
          markers: xs.map((x, i) => ({ x, y: ys[i], kind: "closed" as const })),
          caption: `f(x) = ${B} is marked by the dashed reference level`,
        },
      };
    },
  },
  {
    id: "n1-ivt-count-three",
    unit: U1,
    topic: "intermediate-value-theorem",
    difficulty: "medium",
    manifestation: "intermediate-value-theorem:count-solutions",
    representation: "graphical",
    reasoning: "comparison",
    build: (r: RNG) => {
      const a0 = ri(r, -3, 0);
      const A = ri(r, 2, 5);
      const B = ri(r, -3, 3);
      const shape = [-1, 1, -1, 1];
      const xs = shape.map((_, i) => a0 + 2 * i);
      const ys = shape.map((s) => B + A * s);
      const pts: Array<[number, number]> = xs.map((x, i) => [x, ys[i]]);
      return {
        prompt: `A continuous function $g$ has the piecewise-linear graph shown. Based on the graph, how many solutions does $g(x)=${B}$ have on $(${xs[0]},${xs[xs.length - 1]})$?`,
        correct: `3`,
        distractors: [`2`, `4`, `1`],
        explanation: `The graph crosses the level $y=${B}$ once on each of the three segments where the endpoint heights lie on opposite sides of $${B}$, so the Intermediate Value Theorem guarantees $3$ solutions.`,
        figure: {
          kind: "graph",
          curves: [{ points: pts, smooth: false, tone: 0 }],
          window: { xMin: xs[0] - 1, xMax: xs[xs.length - 1] + 1, yMin: B - A - 2, yMax: B + A + 2 },
          markers: xs.map((x, i) => ({ x, y: ys[i], kind: "closed" as const })),
          caption: `g(x) = ${B} is marked by the dashed reference level`,
        },
      };
    },
  },
  {
    id: "n1-ivt-count-one",
    unit: U1,
    topic: "intermediate-value-theorem",
    difficulty: "medium",
    manifestation: "intermediate-value-theorem:count-solutions",
    representation: "graphical",
    reasoning: "comparison",
    build: (r: RNG) => {
      const a0 = ri(r, -2, 1);
      const A = ri(r, 2, 5);
      const B = ri(r, -3, 3);
      const shape = [-1, -0.5, 1];
      const xs = shape.map((_, i) => a0 + 2 * i);
      const ys = shape.map((s) => B + A * s);
      const pts: Array<[number, number]> = xs.map((x, i) => [x, ys[i]]);
      return {
        prompt: `The graph of a continuous function $h$ is made of the two segments shown, with a small dip that never crosses $y=${B}$ until the last segment. How many solutions does $h(x)=${B}$ have on $(${xs[0]},${xs[xs.length - 1]})$?`,
        correct: `1`,
        distractors: [`2`, `0`, `3`],
        explanation: `The first segment stays entirely on one side of $y=${B}$, while only the final segment has endpoints straddling $${B}$, so the Intermediate Value Theorem guarantees exactly $1$ solution.`,
        figure: {
          kind: "graph",
          curves: [{ points: pts, smooth: false, tone: 0 }],
          window: { xMin: xs[0] - 1, xMax: xs[xs.length - 1] + 1, yMin: B - A - 2, yMax: B + A + 2 },
          markers: xs.map((x, i) => ({ x, y: ys[i], kind: "closed" as const })),
          caption: `h(x) = ${B} is marked by the dashed reference level`,
        },
      };
    },
  },

  /* ================================================================== */
  /* limits-at-infinity : asymptote-count                                */
  /* ================================================================== */
  {
    id: "n1-asymptote-count-how-many",
    unit: U1,
    topic: "limits-at-infinity",
    difficulty: "hard",
    manifestation: "limits-at-infinity:asymptote-count",
    reasoning: "synthesis",
    build: (r: RNG) => {
      const a = ri(r, 1, 6);
      const bSqrt = ri(r, 2, 5);
      const b = bSqrt * bSqrt;
      const c = ri(r, 1, 9);
      return {
        prompt: `How many horizontal asymptotes does the graph of $f(x)=\\dfrac{${a}x}{\\sqrt{${b}x^{2}+${c}}}$ have?`,
        correct: `2`,
        distractors: [`1`, `0`, `3`],
        explanation: `As $x\\to\\infty$, $f(x)\\to\\frac{${a}}{${bSqrt}}$, and as $x\\to-\\infty$, $f(x)\\to-\\frac{${a}}{${bSqrt}}$; these are different values, giving $2$ horizontal asymptotes.`,
      };
    },
  },
  {
    id: "n1-asymptote-count-negative-inf",
    unit: U1,
    topic: "limits-at-infinity",
    difficulty: "hard",
    manifestation: "limits-at-infinity:asymptote-count",
    reasoning: "synthesis",
    mistakes: ["sign-error"],
    build: (r: RNG) => {
      const a = ri(r, 1, 6);
      const bSqrt = ri(r, 2, 5);
      const b = bSqrt * bSqrt;
      const c = ri(r, 1, 9);
      return {
        prompt: `Find $\\displaystyle\\lim_{x\\to-\\infty}\\dfrac{${a}x}{\\sqrt{${b}x^{2}+${c}}}$.`,
        correct: frac(-a, bSqrt),
        distractors: [frac(a, bSqrt), `0`, `\\text{The limit does not exist.}`],
        explanation: `For $x<0$, $\\sqrt{${b}x^{2}+${c}}=-x\\sqrt{${b}+${c}/x^{2}}$, so the ratio tends to $-\\dfrac{${a}}{${bSqrt}}$ as $x\\to-\\infty$.`,
      };
    },
  },
  {
    id: "n1-asymptote-count-pair",
    unit: U1,
    topic: "limits-at-infinity",
    difficulty: "hard",
    manifestation: "limits-at-infinity:asymptote-count",
    reasoning: "synthesis",
    build: (r: RNG) => {
      const a = ri(r, 1, 6);
      const bSqrt = ri(r, 2, 5);
      const b = bSqrt * bSqrt;
      const c = ri(r, 1, 9);
      return {
        prompt: `What are the $y$-values of the horizontal asymptotes of $f(x)=\\dfrac{${a}x}{\\sqrt{${b}x^{2}+${c}}}$?`,
        correct: `y=\\frac{${a}}{${bSqrt}}\\text{ and }y=-\\frac{${a}}{${bSqrt}}`,
        distractors: [
          `y=\\frac{${a}}{${bSqrt}}\\text{ only}`,
          `y=\\frac{${a}}{${b}}\\text{ and }y=-\\frac{${a}}{${b}}`,
          `y=${a}\\text{ and }y=-${a}`,
        ],
        explanation: `Dividing numerator and denominator by $|x|$ gives limits of $\\frac{${a}}{${bSqrt}}$ as $x\\to\\infty$ and $-\\frac{${a}}{${bSqrt}}$ as $x\\to-\\infty$.`,
      };
    },
  },

  /* ================================================================== */
  /* limits-at-infinity : graph-end                                      */
  /* ================================================================== */
  {
    id: "n1-graph-end-horizontal",
    unit: U1,
    topic: "limits-at-infinity",
    difficulty: "medium",
    manifestation: "limits-at-infinity:graph-end",
    representation: "graphical",
    reasoning: "interpretation",
    build: (r: RNG) => {
      const cAsym = ri(r, -2, 2);
      const L = ri(r, -3, 3);
      const k = pick(r, [-3, -2, 2, 3]);
      const f = (x: number) => L + k / (x - cAsym);
      const leftPts = sampleCurve(f, cAsym - 6, cAsym - 0.5, 60);
      const rightPts = sampleCurve(f, cAsym + 0.5, cAsym + 6, 60);
      return {
        prompt: `The graph of $f$ is shown. Based on its end behavior, what is $\\displaystyle\\lim_{x\\to\\infty} f(x)$?`,
        correct: `${L}`,
        distractors: [`${cAsym}`, `${L + k > 0 ? L + 1 : L - 1}`, `\\text{The limit does not exist.}`],
        explanation: `As $x\\to\\infty$, the graph flattens toward the horizontal asymptote $y=${L}$.`,
        figure: {
          kind: "graph",
          curves: [
            { points: leftPts, smooth: true, tone: 0 },
            { points: rightPts, smooth: true, tone: 0 },
          ],
          window: { xMin: cAsym - 6, xMax: cAsym + 6, yMin: L - 6, yMax: L + 6 },
          vAsymptotes: [cAsym],
          hAsymptotes: [L],
          caption: `A vertical asymptote at x = ${cAsym} and a horizontal asymptote at y = ${L}`,
        },
      };
    },
  },
  {
    id: "n1-graph-end-count",
    unit: U1,
    topic: "limits-at-infinity",
    difficulty: "medium",
    manifestation: "limits-at-infinity:graph-end",
    representation: "graphical",
    reasoning: "interpretation",
    build: (r: RNG) => {
      const cAsym = ri(r, -2, 2);
      const L = ri(r, -3, 3);
      const k = pick(r, [-3, -2, 2, 3]);
      const f = (x: number) => L + k / (x - cAsym);
      const leftPts = sampleCurve(f, cAsym - 6, cAsym - 0.5, 60);
      const rightPts = sampleCurve(f, cAsym + 0.5, cAsym + 6, 60);
      return {
        prompt: `The graph of $f$ is shown, with both branches flattening toward the same height on either end. How many horizontal asymptotes does the graph show?`,
        correct: `1`,
        distractors: [`2`, `0`, `\\text{Cannot be determined from the graph.}`],
        explanation: `Both the left and right branches approach the same height $y=${L}$ as $x\\to\\pm\\infty$, so the graph has exactly $1$ horizontal asymptote.`,
        figure: {
          kind: "graph",
          curves: [
            { points: leftPts, smooth: true, tone: 0 },
            { points: rightPts, smooth: true, tone: 0 },
          ],
          window: { xMin: cAsym - 6, xMax: cAsym + 6, yMin: L - 6, yMax: L + 6 },
          vAsymptotes: [cAsym],
          hAsymptotes: [L],
          caption: `A vertical asymptote at x = ${cAsym} and a horizontal asymptote at y = ${L}`,
        },
      };
    },
  },
  {
    id: "n1-graph-end-two-sided",
    unit: U1,
    topic: "limits-at-infinity",
    difficulty: "hard",
    manifestation: "limits-at-infinity:graph-end",
    representation: "graphical",
    reasoning: "interpretation",
    build: (r: RNG) => {
      const mid = ri(r, -2, 2);
      const A = ri(r, 2, 5);
      const f = (x: number) => mid + A * (x / Math.sqrt(x * x + 1));
      const pts = sampleCurve(f, -10, 10, 120);
      const highL = mid + A;
      const lowL = mid - A;
      return {
        prompt: `The S-shaped graph of $f$ is shown. What is $\\displaystyle\\lim_{x\\to-\\infty} f(x)$?`,
        correct: `${lowL}`,
        distractors: [`${highL}`, `${mid}`, `\\text{The limit does not exist.}`],
        explanation: `As $x\\to-\\infty$, the left branch flattens toward the lower horizontal asymptote $y=${lowL}$, while the right branch approaches $y=${highL}$ as $x\\to\\infty$.`,
        figure: {
          kind: "graph",
          curves: [{ points: pts, smooth: true, tone: 0 }],
          window: { xMin: -10, xMax: 10, yMin: lowL - 2, yMax: highL + 2 },
          hAsymptotes: [highL, lowL],
          caption: "The curve has two distinct horizontal asymptotes",
        },
      };
    },
  },

  /* ================================================================== */
  /* Unit 2: definition-of-the-derivative : recognize-limit               */
  /* ================================================================== */
  {
    id: "n2-def-recognize-h-form",
    unit: U2,
    topic: "definition-of-the-derivative",
    difficulty: "medium",
    manifestation: "definition-of-the-derivative:recognize-limit",
    reasoning: "concept-recognition",
    build: (r: RNG) => {
      const t = ri(r, 1, 9);
      return {
        prompt: `For a differentiable function $f$, what does $\\displaystyle\\lim_{h\\to 0}\\frac{f(${t}+h)-f(${t})}{h}$ represent?`,
        correct: `f'(${t})`,
        distractors: [`f(${t})`, `f'(h)`, `f''(${t})`],
        explanation: `This is exactly the difference-quotient definition of the derivative evaluated at $x=${t}$, so the limit equals $f'(${t})$.`,
      };
    },
  },
  {
    id: "n2-def-recognize-a-form",
    unit: U2,
    topic: "definition-of-the-derivative",
    difficulty: "medium",
    manifestation: "definition-of-the-derivative:recognize-limit",
    reasoning: "concept-recognition",
    build: (r: RNG) => {
      const a = ri(r, 1, 9);
      return {
        prompt: `For a differentiable function $f$, what does $\\displaystyle\\lim_{x\\to ${a}}\\frac{f(x)-f(${a})}{x-${a}}$ represent?`,
        correct: `f'(${a})`,
        distractors: [`f(${a})`, `\\dfrac{f(x)}{x-${a}}`, `f'(x)`],
        explanation: `This is the alternate ("$a$-form") definition of the derivative at $x=${a}$, so the limit equals $f'(${a})$.`,
      };
    },
  },
  {
    id: "n2-def-recognize-reverse",
    unit: U2,
    topic: "definition-of-the-derivative",
    difficulty: "medium",
    manifestation: "definition-of-the-derivative:recognize-limit",
    reasoning: "reverse",
    build: (r: RNG) => {
      const t = ri(r, 1, 9);
      return {
        prompt: `Which limit expression is equal to $f'(${t})$ for a differentiable function $f$?`,
        correct: `\\lim_{h\\to 0}\\dfrac{f(${t}+h)-f(${t})}{h}`,
        distractors: [
          `\\lim_{h\\to 0}\\dfrac{f(${t})-f(${t}+h)}{h}`,
          `\\lim_{h\\to 0}\\dfrac{f(${t}+h)-f(${t})}{${t}}`,
          `\\lim_{x\\to ${t}}\\dfrac{f(x)-f(${t})}{x}`,
        ],
        explanation: `The definition of the derivative requires the increment $h$ in both the numerator's argument shift and the denominator, matching the first option exactly.`,
      };
    },
  },

  /* ================================================================== */
  /* power-rule : polynomial                                             */
  /* ================================================================== */
  {
    id: "n2-power-rule-expression",
    unit: U2,
    topic: "power-rule",
    difficulty: "easy",
    manifestation: "power-rule:polynomial",
    build: (r: RNG) => {
      const a = ri(r, 2, 6);
      const b = ri(r, -6, 6);
      const c = ri(r, -9, 9);
      const d = ri(r, -5, 5);
      return {
        prompt: `Find $f'(x)$ if $f(x)=${a}x^{3}${term(b, "x^{2}")}${term(c, "x")}${term(d, "")}$.`,
        correct: `${3 * a}x^{2}${term(2 * b, "x")}${term(c, "")}`,
        distractors: [
          `${a}x^{2}${term(b, "x")}${term(c, "")}`,
          `${3 * a}x^{2}${term(2 * b, "x")}${term(d, "")}`,
          `${3 * a}x^{2}${term(b, "x")}${term(c, "")}`,
        ],
        explanation: `Differentiate term by term: $\\frac{d}{dx}${a}x^{3}=${3 * a}x^{2}$, $\\frac{d}{dx}${b}x^{2}=${2 * b}x$, $\\frac{d}{dx}${c}x=${c}$, and the constant term vanishes.`,
      };
    },
  },
  {
    id: "n2-power-rule-eval",
    unit: U2,
    topic: "power-rule",
    difficulty: "easy",
    manifestation: "power-rule:polynomial",
    build: (r: RNG) => {
      const a = ri(r, 1, 5);
      const b = ri(r, -6, 6);
      const c = ri(r, -9, 9);
      const t = ri(r, 1, 4);
      const val = 3 * a * t * t + 2 * b * t + c;
      return {
        prompt: `The height of an object is $s(t)=${a}t^{3}${term(b, "t^{2}")}${term(c, "t")}$. Find the instantaneous rate of change of $s$ at $t=${t}$.`,
        correct: `${val}`,
        distractors: [`${3 * a * t * t + 2 * b * t}`, `${a * t * t + b * t + c}`, `${val + c}`],
        explanation: `$s'(t)=${3 * a}t^{2}${term(2 * b, "t")}${term(c, "")}$, so $s'(${t})=${val}$.`,
      };
    },
  },
  {
    id: "n2-power-rule-quartic",
    unit: U2,
    topic: "power-rule",
    difficulty: "medium",
    manifestation: "power-rule:polynomial",
    mistakes: ["dropped-exponent-decrement"],
    build: (r: RNG) => {
      const a = ri(r, 1, 4);
      const b = ri(r, -6, 6);
      const c = ri(r, -6, 6);
      return {
        prompt: `Which expression equals $\\dfrac{d}{dx}\\left[${a}x^{4}${term(b, "x^{2}")}${term(c, "")}\\right]$?`,
        correct: `${4 * a}x^{3}${term(2 * b, "x")}`,
        distractors: [
          `${4 * a}x^{3}${term(2 * b, "x")}${term(c, "")}`,
          `${a}x^{3}${term(b, "x")}`,
          `${4 * a}x^{4}${term(2 * b, "x")}`,
        ],
        explanation: `Differentiate each term: $${a}x^{4}\\to ${4 * a}x^{3}$, $${b}x^{2}\\to ${2 * b}x$, and the constant $${c}$ differentiates to $0$.`,
      };
    },
  },

  /* ================================================================== */
  /* power-rule : negative-fractional                                    */
  /* ================================================================== */
  {
    id: "n2-power-rule-negative-expr",
    unit: U2,
    topic: "power-rule",
    difficulty: "medium",
    manifestation: "power-rule:negative-fractional",
    mistakes: ["sign-error"],
    build: (r: RNG) => {
      const a = ri(r, 2, 6);
      const n = ri(r, 2, 4);
      return {
        prompt: `Find $f'(x)$ if $f(x)=${a}x^{-${n}}$.`,
        correct: `-${a * n}x^{-${n + 1}}`,
        distractors: [`${a * n}x^{-${n + 1}}`, `-${a * n}x^{-${n - 1}}`, `-${a}x^{-${n + 1}}`],
        explanation: `Power rule with a negative exponent: $\\frac{d}{dx}${a}x^{-${n}} = ${a}\\cdot(-${n})x^{-${n}-1}=-${a * n}x^{-${n + 1}}$.`,
      };
    },
  },
  {
    id: "n2-power-rule-fractional-eval",
    unit: U2,
    topic: "power-rule",
    difficulty: "medium",
    manifestation: "power-rule:negative-fractional",
    build: (r: RNG) => {
      const t = pick(r, [2, 3, 5, 6, 7, 8, 10]);
      const a = ri(r, 2, 6);

      return {
        prompt: `Let $f(x)=${a}x^{1/2}$. Find $f'(${t})$ in simplified radical form.`,
        correct: `\\dfrac{${a}}{2\\sqrt{${t}}}`,
        distractors: [`\\dfrac{${a}}{\\sqrt{${t}}}`, `${a}\\sqrt{${t}}`, `\\dfrac{${a}}{2${t}}`],
        explanation: `$f'(x)=${a}\\cdot\\tfrac12 x^{-1/2}=\\dfrac{${a}}{2\\sqrt{x}}$, so $f'(${t})=\\dfrac{${a}}{2\\sqrt{${t}}}$.`,
      };
    },
  },
  {
    id: "n2-power-rule-neg-fractional-rewrite",
    unit: U2,
    topic: "power-rule",
    difficulty: "hard",
    manifestation: "power-rule:negative-fractional",
    reasoning: "equivalent-forms",
    build: (r: RNG) => {
      const a = ri(r, 2, 6);
      const p = 3;
      const q = 2;
      return {
        prompt: `If $f(x)=${a}x^{-3/2}$, which expression equals $f'(x)$?`,
        correct: `-\\dfrac{${3 * a}}{2}x^{-5/2}`,
        distractors: [`\\dfrac{${3 * a}}{2}x^{-5/2}`, `-\\dfrac{${3 * a}}{2}x^{-1/2}`, `-${a}x^{-5/2}`],
        explanation: `$f'(x)=${a}\\cdot\\left(-\\tfrac{3}{2}\\right)x^{-3/2-1}=-\\dfrac{${3 * a}}{2}x^{-5/2}$.`,
      };
    },
  },

  /* ================================================================== */
  /* power-rule : radical-rewrite                                        */
  /* ================================================================== */
  {
    id: "n2-power-rule-radical-sqrt",
    unit: U2,
    topic: "power-rule",
    difficulty: "medium",
    manifestation: "power-rule:radical-rewrite",
    algebra: "rewriting-powers",
    build: (r: RNG) => {
      const c = ri(r, 2, 9);
      return {
        prompt: `Rewrite $f(x)=${c}\\sqrt{x}$ as a power of $x$ and find $f'(x)$.`,
        correct: `\\dfrac{${c}}{2\\sqrt{x}}`,
        distractors: [`\\dfrac{${c}}{\\sqrt{x}}`, `${c}\\sqrt{x}`, `\\dfrac{${c}}{2}x`],
        explanation: `Since $\\sqrt{x}=x^{1/2}$, $f'(x)=${c}\\cdot\\tfrac12 x^{-1/2}=\\dfrac{${c}}{2\\sqrt{x}}$.`,
      };
    },
  },
  {
    id: "n2-power-rule-radical-cube",
    unit: U2,
    topic: "power-rule",
    difficulty: "medium",
    manifestation: "power-rule:radical-rewrite",
    algebra: "rewriting-powers",
    build: (r: RNG) => {
      const c = ri(r, 2, 9);
      return {
        prompt: `Rewrite $f(x)=${c}\\sqrt[3]{x}$ as a power of $x$ and find $f'(x)$.`,
        correct: `\\dfrac{${c}}{3x^{2/3}}`,
        distractors: [`\\dfrac{${c}}{3x^{1/3}}`, `\\dfrac{${3 * c}}{x^{2/3}}`, `\\dfrac{${c}}{x^{2/3}}`],
        explanation: `Since $\\sqrt[3]{x}=x^{1/3}$, $f'(x)=${c}\\cdot\\tfrac13 x^{-2/3}=\\dfrac{${c}}{3x^{2/3}}$.`,
      };
    },
  },
  {
    id: "n2-power-rule-radical-reciprocal",
    unit: U2,
    topic: "power-rule",
    difficulty: "hard",
    manifestation: "power-rule:radical-rewrite",
    algebra: "rewriting-powers",
    mistakes: ["sign-error"],
    build: (r: RNG) => {
      const c = ri(r, 2, 9);
      const t = ri(r, 1, 4);
      const val = -c / (2 * t * Math.sqrt(t));
      return {
        prompt: `Let $f(x)=\\dfrac{${c}}{\\sqrt{x}}$. Rewrite as a power of $x$ and find $f'(${t})$.`,
        correct: `-\\dfrac{${c}}{2\\cdot ${t}\\sqrt{${t}}}`,
        distractors: [`\\dfrac{${c}}{2\\cdot ${t}\\sqrt{${t}}}`, `-\\dfrac{${c}}{\\sqrt{${t}}}`, `-\\dfrac{${c}}{2\\sqrt{${t}}}`],
        explanation: `Since $f(x)=${c}x^{-1/2}$, $f'(x)=-\\tfrac{${c}}{2}x^{-3/2}$, so $f'(${t})=-\\dfrac{${c}}{2\\cdot ${t}\\sqrt{${t}}}$.`,
      };
    },
  },

  /* ================================================================== */
  /* product-and-quotient-rules : procedure-choice                       */
  /* ================================================================== */
  {
    id: "n2-product-choice",
    unit: U2,
    topic: "product-and-quotient-rules",
    difficulty: "medium",
    manifestation: "product-and-quotient-rules:procedure-choice",
    reasoning: "procedure-selection",
    build: (r: RNG) => {
      return {
        prompt: `If $h(x)=u(x)v(x)$ where $u$ and $v$ are differentiable, which expression correctly gives $h'(x)$?`,
        correct: `u'(x)v(x)+u(x)v'(x)`,
        distractors: [`u'(x)v'(x)`, `u'(x)v(x)-u(x)v'(x)`, `\\dfrac{u'(x)v(x)-u(x)v'(x)}{v(x)^{2}}`],
        explanation: `The product rule states $h'(x)=u'(x)v(x)+u(x)v'(x)$.`,
      };
    },
  },
  {
    id: "n2-quotient-choice",
    unit: U2,
    topic: "product-and-quotient-rules",
    difficulty: "medium",
    manifestation: "product-and-quotient-rules:procedure-choice",
    reasoning: "procedure-selection",
    build: (r: RNG) => {
      return {
        prompt: `If $h(x)=\\dfrac{u(x)}{v(x)}$ where $u$ and $v$ are differentiable, which expression correctly gives $h'(x)$?`,
        correct: `\\dfrac{u'(x)v(x)-u(x)v'(x)}{v(x)^{2}}`,
        distractors: [
          `\\dfrac{u(x)v'(x)-u'(x)v(x)}{v(x)^{2}}`,
          `\\dfrac{u'(x)v(x)-u(x)v'(x)}{v(x)}`,
          `u'(x)v(x)+u(x)v'(x)`,
        ],
        explanation: `The quotient rule states $h'(x)=\\dfrac{u'(x)v(x)-u(x)v'(x)}{v(x)^{2}}$, with the numerator order and squared denominator both essential.`,
      };
    },
  },
  {
    id: "n2-product-quotient-select-context",
    unit: U2,
    topic: "product-and-quotient-rules",
    difficulty: "medium",
    manifestation: "product-and-quotient-rules:procedure-choice",
    reasoning: "procedure-selection",
    build: (r: RNG) => {
      const a = ri(r, 2, 6);
      const b = ri(r, 1, 5);
      return {
        prompt: `To differentiate $k(x)=\\dfrac{${a}x^{2}}{x+${b}}$, which rule should be applied, and why?`,
        correct: `\\text{The quotient rule, because } k \\text{ is a ratio of two differentiable functions.}`,
        distractors: [
          `\\text{The product rule, because the numerator and denominator are multiplied.}`,
          `\\text{The power rule alone, since only the numerator has an exponent.}`,
          `\\text{The chain rule, because the denominator is a function of } x.`,
        ],
        explanation: `Since $k$ is written as one differentiable function divided by another, the quotient rule is the appropriate tool.`,
      };
    },
  },

  /* ================================================================== */
  /* product-and-quotient-rules : error-analysis                         */
  /* ================================================================== */
  {
    id: "n2-product-error-analysis",
    unit: U2,
    topic: "product-and-quotient-rules",
    difficulty: "hard",
    manifestation: "product-and-quotient-rules:error-analysis",
    reasoning: "error-analysis",
    mistakes: ["product-quotient-skip"],
    build: (r: RNG) => {
      const a = ri(r, 2, 6);
      const b = ri(r, -6, 6);
      const c = ri(r, 1, 9);
      const t = ri(r, 1, 4);
      const correctVal = a * (t * t + c) + 2 * t * (a * t + b);
      const wrongVal = a * 2 * t;
      return {
        prompt: `A student differentiates $f(x)=(${a}x${term(b, "")})(x^{2}${term(c, "")})$ by writing $f'(x)=${a}\\cdot 2x$, multiplying the derivatives of each factor together. What is the correct value of $f'(${t})$?`,
        correct: `${correctVal}`,
        distractors: [`${wrongVal}`, `${a * (t * t + c)}`, `${2 * t * (a * t + b)}`],
        explanation: `The student forgot the product rule's two terms. Correctly, $f'(x)=${a}(x^{2}${term(c, "")})+2x(${a}x${term(b, "")})$, so $f'(${t})=${correctVal}$.`,
      };
    },
  },
  {
    id: "n2-quotient-error-analysis",
    unit: U2,
    topic: "product-and-quotient-rules",
    difficulty: "hard",
    manifestation: "product-and-quotient-rules:error-analysis",
    reasoning: "error-analysis",
    mistakes: ["quotient-order-swap"],
    build: (r: RNG) => {
      const a = ri(r, 2, 7);
      const b = ri(r, -8, 8);
      const c = ri(r, 1, 5);
      const t = ri(r, 0, 4);
      const den = (t + c) ** 2;
      const correctVal = frac(a * c - b, den);
      const swappedVal = frac(b - a * c, den);
      return {
        prompt: `A student differentiates $f(x)=\\dfrac{${a}x${term(b, "")}}{x${term(c, "")}}$ but swaps the order of the numerator terms in the quotient rule, getting $f'(${t})=${swappedVal}$. What is the correct value of $f'(${t})$?`,
        correct: correctVal,
        distractors: [swappedVal, `${a}`, frac(a * c + b, den)],
        explanation: `The quotient rule requires $\\dfrac{${a}(x${term(c, "")})-(${a}x${term(b, "")})}{(x${term(c, "")})^{2}}$; evaluated at $x=${t}$ this gives $${correctVal}$, not the student's swapped-order result.`,
      };
    },
  },
  {
    id: "n2-error-analysis-step",
    unit: U2,
    topic: "product-and-quotient-rules",
    difficulty: "medium",
    manifestation: "product-and-quotient-rules:error-analysis",
    reasoning: "error-analysis",
    build: (r: RNG) => {
      const a = ri(r, 2, 6);
      const c = ri(r, 1, 9);
      return {
        prompt: `A student differentiates $f(x)=x(${a}x${term(c, "")})$ using the product rule and writes: Step 1: $u=x,\\ v=${a}x${term(c, "")}$. Step 2: $u'=1,\\ v'=${a}$. Step 3: $f'(x)=u'v-uv'$. Which step contains the error?`,
        correct: `\\text{Step 3, because the product rule requires } u'v+uv' \\text{, not } u'v-uv'.`,
        distractors: [
          `\\text{Step 1, because } u \\text{ and } v \\text{ are chosen incorrectly.}`,
          `\\text{Step 2, because } v' \\text{ should equal } ${a}x.`,
          `\\text{There is no error; the work is correct.}`,
        ],
        explanation: `Steps 1 and 2 correctly identify $u,v,u',v'$. The error is in Step 3: the product rule adds the two terms, $f'(x)=u'v+uv'$, not subtracts them.`,
      };
    },
  },

  /* ================================================================== */
  /* product-and-quotient-rules : table-derivative (tabular)              */
  /* ================================================================== */
  {
    id: "n2-table-product",
    unit: U2,
    topic: "product-and-quotient-rules",
    difficulty: "hard",
    manifestation: "product-and-quotient-rules:table-derivative",
    representation: "tabular",
    build: (r: RNG) => {
      const x0 = ri(r, 1, 5);
      const fVals = [ri(r, 1, 6), ri(r, 1, 6), ri(r, 1, 6)];
      const gVals = [ri(r, 1, 6), ri(r, 1, 6), ri(r, 1, 6)];
      const fpVals = [ri(r, -4, 4), ri(r, -4, 4), ri(r, -4, 4)];
      const gpVals = [ri(r, -4, 4), ri(r, -4, 4), ri(r, -4, 4)];
      const idx = 1;
      const val = fpVals[idx] * gVals[idx] + fVals[idx] * gpVals[idx];
      const table: TableFigure = {
        kind: "table",
        headers: ["x", "f(x)", "g(x)", "f'(x)", "g'(x)"],
        rows: [0, 1, 2].map((i) => [`${x0 + i}`, `${fVals[i]}`, `${gVals[i]}`, `${fpVals[i]}`, `${gpVals[i]}`]),
        caption: "Selected values of f, g, and their derivatives",
      };
      return {
        prompt: `Using the table of values, if $h(x)=f(x)g(x)$, find $h'(${x0 + idx})$.`,
        correct: `${val}`,
        distractors: [`${fpVals[idx] * gpVals[idx]}`, `${fVals[idx] * gVals[idx]}`, `${fpVals[idx] * gVals[idx] - fVals[idx] * gpVals[idx]}`],
        explanation: `By the product rule, $h'(${x0 + idx})=f'(${x0 + idx})g(${x0 + idx})+f(${x0 + idx})g'(${x0 + idx})=${fpVals[idx]}(${gVals[idx]})+${fVals[idx]}(${gpVals[idx]})=${val}$.`,
        figure: table,
      };
    },
  },
  {
    id: "n2-table-quotient",
    unit: U2,
    topic: "product-and-quotient-rules",
    difficulty: "hard",
    manifestation: "product-and-quotient-rules:table-derivative",
    representation: "tabular",
    build: (r: RNG) => {
      const x0 = ri(r, 1, 5);
      const fVals = [ri(r, 2, 8), ri(r, 2, 8), ri(r, 2, 8)];
      const gVals = [ri(r, 2, 6), ri(r, 2, 6), ri(r, 2, 6)];
      const fpVals = [ri(r, -4, 4), ri(r, -4, 4), ri(r, -4, 4)];
      const gpVals = [ri(r, -4, 4), ri(r, -4, 4), ri(r, -4, 4)];
      const idx = 1;
      const num = fpVals[idx] * gVals[idx] - fVals[idx] * gpVals[idx];
      const den = gVals[idx] * gVals[idx];
      const table: TableFigure = {
        kind: "table",
        headers: ["x", "f(x)", "g(x)", "f'(x)", "g'(x)"],
        rows: [0, 1, 2].map((i) => [`${x0 + i}`, `${fVals[i]}`, `${gVals[i]}`, `${fpVals[i]}`, `${gpVals[i]}`]),
        caption: "Selected values of f, g, and their derivatives",
      };
      return {
        prompt: `Using the table of values, if $h(x)=\\dfrac{f(x)}{g(x)}$, find $h'(${x0 + idx})$.`,
        correct: frac(num, den),
        distractors: [frac(-num, den), frac(fpVals[idx] * gVals[idx] + fVals[idx] * gpVals[idx], den), frac(num, gVals[idx])],
        explanation: `By the quotient rule, $h'(${x0 + idx})=\\dfrac{f'(${x0 + idx})g(${x0 + idx})-f(${x0 + idx})g'(${x0 + idx})}{g(${x0 + idx})^{2}}=\\dfrac{${num}}{${den}}$.`,
        figure: table,
      };
    },
  },

  /* ================================================================== */
  /* derivatives-of-trig-exp-log : secant-family                         */
  /* ================================================================== */
  {
    id: "n2-secant-family-tan",
    unit: U2,
    topic: "derivatives-of-trig-exp-log",
    difficulty: "medium",
    manifestation: "derivatives-of-trig-exp-log:secant-family",
    build: (r: RNG) => {
      const a = ri(r, 2, 7);
      return {
        prompt: `Find $f'(x)$ if $f(x)=${a}\\tan x$.`,
        correct: `${a}\\sec^{2}x`,
        distractors: [`${a}\\sec x\\tan x`, `-${a}\\csc^{2}x`, `${a}\\cot^{2}x`],
        explanation: `The derivative of $\\tan x$ is $\\sec^{2}x$, so $f'(x)=${a}\\sec^{2}x$.`,
      };
    },
  },
  {
    id: "n2-secant-family-sec",
    unit: U2,
    topic: "derivatives-of-trig-exp-log",
    difficulty: "medium",
    manifestation: "derivatives-of-trig-exp-log:secant-family",
    build: (r: RNG) => {
      const a = ri(r, 2, 7);
      return {
        prompt: `Find $f'(x)$ if $f(x)=${a}\\sec x$.`,
        correct: `${a}\\sec x\\tan x`,
        distractors: [`${a}\\sec^{2}x`, `-${a}\\csc x\\cot x`, `${a}\\tan x`],
        explanation: `The derivative of $\\sec x$ is $\\sec x\\tan x$, so $f'(x)=${a}\\sec x\\tan x$.`,
      };
    },
  },
  {
    id: "n2-secant-family-cot-csc",
    unit: U2,
    topic: "derivatives-of-trig-exp-log",
    difficulty: "hard",
    manifestation: "derivatives-of-trig-exp-log:secant-family",
    mistakes: ["sign-error"],
    build: (r: RNG) => {
      const a = ri(r, 2, 6);
      const b = ri(r, 2, 6);
      return {
        prompt: `Find $f'(x)$ if $f(x)=${a}\\cot x+${b}\\csc x$.`,
        correct: `-${a}\\csc^{2}x-${b}\\csc x\\cot x`,
        distractors: [`${a}\\csc^{2}x+${b}\\csc x\\cot x`, `-${a}\\csc^{2}x+${b}\\csc x\\cot x`, `-${a}\\sec^{2}x-${b}\\sec x\\tan x`],
        explanation: `Since $\\frac{d}{dx}\\cot x=-\\csc^{2}x$ and $\\frac{d}{dx}\\csc x=-\\csc x\\cot x$, $f'(x)=-${a}\\csc^{2}x-${b}\\csc x\\cot x$.`,
      };
    },
  },

  /* ================================================================== */
  /* derivatives-of-trig-exp-log : evaluate-special-angle                 */
  /* ================================================================== */
  {
    id: "n2-special-angle-sin",
    unit: U2,
    topic: "derivatives-of-trig-exp-log",
    difficulty: "medium",
    manifestation: "derivatives-of-trig-exp-log:evaluate-special-angle",
    build: (r: RNG) => {
      const a = ri(r, 2, 8);
      const angle: "6" | "4" | "3" = pick(r, ["6", "4", "3"]);
      const [cosStr] = trigVal(angle, "cos");
      return {
        prompt: `Let $f(x)=${a}\\sin x$. Find $f'\\!\\left(${angleLabel(angle)}\\right)$.`,
        correct: `${a}\\cdot ${cosStr}`,
        distractors: [`-${a}\\cdot ${cosStr}`, `${a}\\cdot ${trigVal(angle, "sin")[0]}`, `${cosStr}`],
        explanation: `Since $f'(x)=${a}\\cos x$, $f'\\!\\left(${angleLabel(angle)}\\right)=${a}\\cdot ${cosStr}$.`,
      };
    },
  },
  {
    id: "n2-special-angle-cos",
    unit: U2,
    topic: "derivatives-of-trig-exp-log",
    difficulty: "medium",
    manifestation: "derivatives-of-trig-exp-log:evaluate-special-angle",
    mistakes: ["sign-error"],
    build: (r: RNG) => {
      const a = ri(r, 2, 8);
      const angle: "6" | "4" | "3" = pick(r, ["6", "4", "3"]);
      const [sinStr] = trigVal(angle, "sin");
      return {
        prompt: `Let $f(x)=${a}\\cos x$. Find $f'\\!\\left(${angleLabel(angle)}\\right)$.`,
        correct: `-${a}\\cdot ${sinStr}`,
        distractors: [`${a}\\cdot ${sinStr}`, `-${a}\\cdot ${trigVal(angle, "cos")[0]}`, `${sinStr}`],
        explanation: `Since $f'(x)=-${a}\\sin x$, $f'\\!\\left(${angleLabel(angle)}\\right)=-${a}\\cdot ${sinStr}$.`,
      };
    },
  },
  {
    id: "n2-special-angle-zero",
    unit: U2,
    topic: "derivatives-of-trig-exp-log",
    difficulty: "medium",
    manifestation: "derivatives-of-trig-exp-log:evaluate-special-angle",
    build: (r: RNG) => {
      const a = ri(r, 2, 9);
      const b = ri(r, 2, 9);
      return {
        prompt: `Let $f(x)=${a}\\sin x+${b}\\cos x$. Find $f'(0)$.`,
        correct: `${a}`,
        distractors: [`${b}`, `-${b}`, `${a + b}`],
        explanation: `$f'(x)=${a}\\cos x-${b}\\sin x$, so $f'(0)=${a}\\cos 0-${b}\\sin 0=${a}$.`,
      };
    },
  },

  /* ================================================================== */
  /* derivatives-of-trig-exp-log : match-derivative (graphical)           */
  /* ================================================================== */
  {
    id: "n2-match-derivative-tent",
    unit: U2,
    topic: "derivatives-of-trig-exp-log",
    difficulty: "medium",
    manifestation: "derivatives-of-trig-exp-log:match-derivative",
    representation: "graphical",
    reasoning: "comparison",
    build: (r: RNG) => {
      const peak = ri(r, -2, 2);
      const h = ri(r, 2, 5);
      return {
        prompt: `The graph of $f$ rises in a straight line to a peak at $x=${peak}$ and then falls in a straight line. Which description matches $f'(x)$?`,
        correct: `\\text{Positive for } x<${peak} \\text{ and negative for } x>${peak}.`,
        distractors: [
          `\\text{Negative for } x<${peak} \\text{ and positive for } x>${peak}.`,
          `\\text{Positive for all } x.`,
          `\\text{Equal to zero for all } x.`,
        ],
        explanation: `Since $f$ increases up to $x=${peak}$ and decreases afterward, its slope $f'(x)$ is positive before the peak and negative after it.`,
        figure: {
          kind: "graph",
          curves: [{ points: [[peak - h, 0], [peak, h], [peak + h, 0]], smooth: false, tone: 0 }],
          window: { xMin: peak - h - 1, xMax: peak + h + 1, yMin: -1, yMax: h + 1 },
          caption: `f rises then falls with a peak at x = ${peak}`,
        },
      };
    },
  },
  {
    id: "n2-match-derivative-peak-value",
    unit: U2,
    topic: "derivatives-of-trig-exp-log",
    difficulty: "medium",
    manifestation: "derivatives-of-trig-exp-log:match-derivative",
    representation: "graphical",
    reasoning: "comparison",
    build: (r: RNG) => {
      const c = ri(r, -2, 2);
      const A = ri(r, 2, 5);
      const f = (x: number) => A - (x - c) * (x - c);
      const pts = sampleCurve(f, c - 3, c + 3, 60);
      return {
        prompt: `The graph of a smooth function $f$ is shown, with a maximum marked at $x=${c}$. What is the value of $f'(${c})$?`,
        correct: `0`,
        distractors: [`${A}`, `-${A}`, `\\text{Undefined}`],
        explanation: `At a smooth local maximum the tangent line is horizontal, so $f'(${c})=0$.`,
        figure: {
          kind: "graph",
          curves: [{ points: pts, smooth: true, tone: 0 }],
          window: { xMin: c - 3, xMax: c + 3, yMin: A - 10, yMax: A + 1 },
          markers: [{ x: c, y: A, kind: "closed" }],
          caption: `f has a maximum at x = ${c}`,
        },
      };
    },
  },
  {
    id: "n2-match-derivative-monotonic",
    unit: U2,
    topic: "derivatives-of-trig-exp-log",
    difficulty: "medium",
    manifestation: "derivatives-of-trig-exp-log:match-derivative",
    representation: "graphical",
    reasoning: "comparison",
    build: (r: RNG) => {
      const b = ri(r, 1, 3) / 2;
      const f = (x: number) => Math.exp(b * x);
      const pts = sampleCurve(f, -3, 3, 60);
      return {
        prompt: `The graph of $f(x)=e^{${b}x}$ is shown, increasing across its entire domain. Which statement about $f'(x)$ must be true?`,
        correct: `f'(x)\\text{ is positive for every } x \\text{ shown.}`,
        distractors: [
          `f'(x)\\text{ is negative for every } x \\text{ shown.}`,
          `f'(x)\\text{ changes sign at } x=0.`,
          `f'(x)=0\\text{ for every } x \\text{ shown.}`,
        ],
        explanation: `Because $f$ is increasing over the entire pictured interval, its derivative must be positive throughout.`,
        figure: {
          kind: "graph",
          curves: [{ points: pts, smooth: true, tone: 0 }],
          window: { xMin: -3, xMax: 3, yMin: 0, yMax: Math.exp(b * 3) + 1 },
          caption: "f is increasing across its whole domain",
        },
      };
    },
  },

  /* ================================================================== */
  /* derivatives-of-trig-exp-log : exponential base a^x                  */
  /* ================================================================== */
  {
    id: "n2-exp-base-expression",
    unit: U2,
    topic: "derivatives-of-trig-exp-log",
    difficulty: "medium",
    manifestation: "derivatives-of-trig-exp-log:exponential-base",
    build: (r: RNG) => {
      const coefA = ri(r, 2, 6);
      const base = pick(r, [2, 3, 5, 7]);
      return {
        prompt: `Find $f'(x)$ if $f(x)=${coefA}\\cdot ${base}^{x}$.`,
        correct: `${coefA}\\cdot ${base}^{x}\\ln ${base}`,
        distractors: [`${coefA}\\cdot ${base}^{x}`, `${coefA}x\\cdot ${base}^{x-1}`, `${coefA}\\cdot ${base}^{x}\\log ${base}`],
        explanation: `For $g(x)=b^{x}$, $g'(x)=b^{x}\\ln b$, so $f'(x)=${coefA}\\cdot ${base}^{x}\\ln ${base}$.`,
      };
    },
  },
  {
    id: "n2-exp-base-eval-zero",
    unit: U2,
    topic: "derivatives-of-trig-exp-log",
    difficulty: "medium",
    manifestation: "derivatives-of-trig-exp-log:exponential-base",
    build: (r: RNG) => {
      const base = pick(r, [2, 3, 5, 7]);
      return {
        prompt: `If $f(x)=${base}^{x}$, find $f'(0)$.`,
        correct: `\\ln ${base}`,
        distractors: [`${base}`, `1`, `\\dfrac{1}{\\ln ${base}}`],
        explanation: `$f'(x)=${base}^{x}\\ln ${base}$, so $f'(0)=${base}^{0}\\ln ${base}=\\ln ${base}$.`,
      };
    },
  },

  /* ================================================================== */
  /* derivatives-of-trig-exp-log : logarithm base log_a x                 */
  /* ================================================================== */
  {
    id: "n2-log-base-expression",
    unit: U2,
    topic: "derivatives-of-trig-exp-log",
    difficulty: "medium",
    manifestation: "derivatives-of-trig-exp-log:logarithm-base",
    build: (r: RNG) => {
      const base = pick(r, [2, 3, 5, 10]);
      return {
        prompt: `Find $f'(x)$ if $f(x)=\\log_{${base}} x$.`,
        correct: `\\dfrac{1}{x\\ln ${base}}`,
        distractors: [`\\dfrac{1}{x}`, `\\dfrac{\\ln ${base}}{x}`, `\\dfrac{1}{${base}x}`],
        explanation: `The derivative of $\\log_{b}x$ is $\\dfrac{1}{x\\ln b}$, so $f'(x)=\\dfrac{1}{x\\ln ${base}}$.`,
      };
    },
  },
  {
    id: "n2-log-base-eval",
    unit: U2,
    topic: "derivatives-of-trig-exp-log",
    difficulty: "hard",
    manifestation: "derivatives-of-trig-exp-log:logarithm-base",
    build: (r: RNG) => {
      const c = ri(r, 2, 8);
      const base = pick(r, [2, 3, 5, 10]);
      const t = ri(r, 2, 6);
      return {
        prompt: `Let $f(x)=${c}\\log_{${base}} x$. Find $f'(${t})$.`,
        correct: `\\dfrac{${c}}{${t}\\ln ${base}}`,
        distractors: [`\\dfrac{${c}}{${t}}`, `\\dfrac{${c}\\ln ${base}}{${t}}`, `\\dfrac{${c}}{${base}${t}}`],
        explanation: `$f'(x)=\\dfrac{${c}}{x\\ln ${base}}$, so $f'(${t})=\\dfrac{${c}}{${t}\\ln ${base}}$.`,
      };
    },
  },

  /* ================================================================== */
  /* differentiability-and-continuity : corner-cusp (graphical)           */
  /* ================================================================== */
  {
    id: "n2-corner-abs-value",
    unit: U2,
    topic: "differentiability-and-continuity",
    difficulty: "medium",
    manifestation: "differentiability-and-continuity:corner-cusp",
    representation: "graphical",
    reasoning: "classification",
    build: (r: RNG) => {
      const a = ri(r, -2, 2);
      const h = ri(r, 2, 5);
      return {
        prompt: `The graph of $f(x)=|x-${a}|$ is shown. How should the point at $x=${a}$ be classified?`,
        correct: `\\text{A corner: the one-sided slopes are } -1 \\text{ and } 1.`,
        distractors: [
          `\\text{A cusp: the one-sided slopes both approach } \\infty.`,
          `\\text{A vertical tangent: the slope is undefined and unbounded on both sides.}`,
          `\\text{A removable discontinuity.}`,
        ],
        explanation: `The two linear branches meet at $x=${a}$ with different finite slopes ($-1$ and $1$), which is the signature of a corner, not a cusp or vertical tangent.`,
        figure: {
          kind: "piecewise-graph",
          label: "f",
          points: [[a - h, h], [a, 0], [a + h, h]],
          xMin: a - h - 1,
          xMax: a + h + 1,
          yMin: -1,
          yMax: h + 1,
        },
      };
    },
  },
  {
    id: "n2-cusp-two-thirds",
    unit: U2,
    topic: "differentiability-and-continuity",
    difficulty: "hard",
    manifestation: "differentiability-and-continuity:corner-cusp",
    representation: "graphical",
    reasoning: "classification",
    build: (r: RNG) => {
      const a = ri(r, -2, 2);
      const f = (x: number) => Math.pow(Math.abs(x - a), 2 / 3);
      const pts = sampleCurve(f, a - 2, a + 2, 60);
      return {
        prompt: `The graph of $f(x)=(x-${a})^{2/3}$ is shown, coming to a sharp point at $x=${a}$. How should this point be classified?`,
        correct: `\\text{A cusp: the one-sided slopes approach opposite infinities.}`,
        distractors: [
          `\\text{A corner: the one-sided slopes are finite and unequal.}`,
          `\\text{A vertical tangent: the slopes approach the same infinity on both sides.}`,
          `\\text{A jump discontinuity.}`,
        ],
        explanation: `Near $x=${a}$, $f'(x)\\to-\\infty$ from the left and $f'(x)\\to+\\infty$ from the right (or vice versa), producing the sharply pointed cusp shown, unlike a corner's finite slopes.`,
        figure: {
          kind: "graph",
          curves: [{ points: pts, smooth: true, tone: 0 }],
          window: { xMin: a - 2, xMax: a + 2, yMin: -0.5, yMax: 2 },
          markers: [{ x: a, y: 0, kind: "closed" }],
          caption: `f has a cusp at x = ${a}`,
        },
      };
    },
  },
  {
    id: "n2-vertical-tangent-cube-root",
    unit: U2,
    topic: "differentiability-and-continuity",
    difficulty: "hard",
    manifestation: "differentiability-and-continuity:corner-cusp",
    representation: "graphical",
    reasoning: "classification",
    build: (r: RNG) => {
      const a = ri(r, -2, 2);
      const f = (x: number) => Math.cbrt(x - a);
      const pts = sampleCurve(f, a - 2, a + 2, 60);
      return {
        prompt: `The graph of $f(x)=\\sqrt[3]{x-${a}}$ is shown, becoming vertical at $x=${a}$. How should this point be classified?`,
        correct: `\\text{A vertical tangent: the slope increases without bound on both sides.}`,
        distractors: [
          `\\text{A corner: the one-sided slopes are finite and unequal.}`,
          `\\text{A cusp: the one-sided slopes approach opposite infinities.}`,
          `\\text{A hole in the graph.}`,
        ],
        explanation: `As $x\\to ${a}$, $f'(x)=\\frac13(x-${a})^{-2/3}\\to+\\infty$ from both sides, so the tangent line becomes vertical without the graph having a sharp point.`,
        figure: {
          kind: "graph",
          curves: [{ points: pts, smooth: true, tone: 0 }],
          window: { xMin: a - 2, xMax: a + 2, yMin: -1.5, yMax: 1.5 },
          markers: [{ x: a, y: 0, kind: "closed" }],
          caption: `f has a vertical tangent at x = ${a}`,
        },
      };
    },
  },
];
