/**
 * Final coverage-gap templates.
 *
 * Adds the previously-missing manifestations
 * (`evaluating-limits-algebraically:complex-fraction`,
 * `evaluating-limits-algebraically:trig-identity`), fills the last five
 * Master Guide entries that were under-represented, and adds a spread of
 * table-based ("tabular") families across Units 2, 4, 5, 6, 7, and 8 to push
 * the tabular representation share above 8%.
 */

import {
  type QuestionTemplate,
  type RNG,
  type TableFigure,
  frac,
  ri,
  term,
} from "../question-templates";

const U1 = "unit-1-limits-and-continuity";
const U2 = "unit-2-differentiation-definition-and-properties";
const U4 = "unit-4-contextual-applications-of-differentiation";
const U5 = "unit-5-analytical-applications-of-differentiation";
const U6 = "unit-6-integration-and-accumulation-of-change";
const U7 = "unit-7-differential-equations";
const U8 = "unit-8-applications-of-integration";
const U9 = "unit-9-parametric-polar-vector";

export const GAP_FINAL_TEMPLATES: QuestionTemplate[] = [
  /* ================================================================== */
  /* evaluating-limits-algebraically : complex-fraction                  */
  /* ================================================================== */
  {
    id: "gf-complex-fraction-1",
    unit: U1,
    topic: "evaluating-limits-algebraically",
    difficulty: "medium",
    manifestation: "evaluating-limits-algebraically:complex-fraction",
    build: (r: RNG) => {
      const a = ri(r, 2, 6);
      const val = `-${frac(1, a * a)}`;
      return {
        prompt: `Evaluate $\\displaystyle\\lim_{x\\to 0}\\frac{\\dfrac{1}{${a}+x}-\\dfrac{1}{${a}}}{x}$.`,
        correct: val,
        distractors: [frac(1, a * a), `0`, frac(1, a)],
        explanation: `Combine the fractions in the numerator over a common denominator: $\\frac{1}{${a}+x}-\\frac{1}{${a}}=\\frac{${a}-(${a}+x)}{${a}(${a}+x)}=\\frac{-x}{${a}(${a}+x)}$. Dividing by $x$ and letting $x\\to 0$ gives $-\\frac{1}{${a}^{2}}=${val}$.`,
      };
    },
  },
  {
    id: "gf-complex-fraction-2",
    unit: U1,
    topic: "evaluating-limits-algebraically",
    difficulty: "medium",
    manifestation: "evaluating-limits-algebraically:complex-fraction",
    build: (r: RNG) => {
      const c = ri(r, 2, 7);
      const val = frac(1, c * c);
      return {
        prompt: `Evaluate $\\displaystyle\\lim_{x\\to 0}\\frac{\\dfrac{1}{${c}}-\\dfrac{1}{${c}-x}}{x}$.`,
        correct: val,
        distractors: [`-${val}`, `0`, `\\text{The limit does not exist.}`],
        explanation: `Write $\\frac{1}{${c}}-\\frac{1}{${c}-x}=\\frac{(${c}-x)-${c}}{${c}(${c}-x)}=\\frac{-x}{${c}(${c}-x)}$. Dividing by $x$ and evaluating at $x=0$ gives $-\\frac{1}{${c}(${c})}\\cdot(-1)=\\frac{1}{${c}^{2}}=${val}$.`,
      };
    },
  },
  {
    id: "gf-complex-fraction-3",
    unit: U1,
    topic: "evaluating-limits-algebraically",
    difficulty: "hard",
    manifestation: "evaluating-limits-algebraically:complex-fraction",
    build: (r: RNG) => {
      const a = ri(r, 2, 5);
      const b = ri(r, 2, 5);
      // lim_{x->0} ( 1/(a+x) - 1/a ) / (b x) = -1/(a^2 b)
      const val = `-${frac(1, a * a * b)}`;
      return {
        prompt: `Which value equals $\\displaystyle\\lim_{x\\to 0}\\frac{1}{${b}x}\\left(\\frac{1}{${a}+x}-\\frac{1}{${a}}\\right)$?`,
        correct: val,
        distractors: [frac(1, a * a * b), frac(-1, b), `0`],
        explanation: `Combine the inner fractions first: $\\frac{1}{${a}+x}-\\frac{1}{${a}}=\\frac{-x}{${a}(${a}+x)}$. Dividing by $${b}x$ and simplifying leaves $\\frac{-1}{${b}\\cdot ${a}(${a}+x)}$, which approaches $${val}$ as $x\\to 0$.`,
      };
    },
  },

  /* ================================================================== */
  /* evaluating-limits-algebraically : trig-identity                     */
  /* ================================================================== */
  {
    id: "gf-trig-identity-1",
    unit: U1,
    topic: "evaluating-limits-algebraically",
    difficulty: "medium",
    manifestation: "evaluating-limits-algebraically:trig-identity",
    build: (r: RNG) => {
      const a = ri(r, 2, 6);
      return {
        prompt: `Evaluate $\\displaystyle\\lim_{x\\to 0}\\frac{\\sin(${a}x)}{\\tan(${a}x)}$.`,
        correct: `1`,
        distractors: [`0`, `${a}`, `\\text{The limit does not exist.}`],
        explanation: `Rewrite $\\tan(${a}x)=\\dfrac{\\sin(${a}x)}{\\cos(${a}x)}$, so the quotient equals $\\cos(${a}x)$, which approaches $\\cos(0)=1$.`,
      };
    },
  },
  {
    id: "gf-trig-identity-2",
    unit: U1,
    topic: "evaluating-limits-algebraically",
    difficulty: "medium",
    manifestation: "evaluating-limits-algebraically:trig-identity",
    build: (r: RNG) => {
      const a = ri(r, 2, 6);
      return {
        prompt: `Evaluate $\\displaystyle\\lim_{x\\to 0}\\frac{1-\\cos^{2}(${a}x)}{x^{2}}$.`,
        correct: `${a * a}`,
        distractors: [`${a}`, `${2 * a}`, `0`],
        explanation: `Since $1-\\cos^{2}(${a}x)=\\sin^{2}(${a}x)$, the limit becomes $\\left(\\dfrac{\\sin(${a}x)}{x}\\right)^{2}$, which approaches $${a}^{2}=${a * a}$.`,
      };
    },
  },
  {
    id: "gf-trig-identity-3",
    unit: U1,
    topic: "evaluating-limits-algebraically",
    difficulty: "hard",
    manifestation: "evaluating-limits-algebraically:trig-identity",
    build: (r: RNG) => {
      const a = ri(r, 2, 5);
      return {
        prompt: `Evaluate $\\displaystyle\\lim_{x\\to 0}\\frac{\\sin(${a}x)\\cos(${a}x)}{x}$ by first rewriting the numerator with a double-angle identity.`,
        correct: `${a}`,
        distractors: [`${2 * a}`, frac(a, 2), `0`],
        explanation: `Since $\\sin(${a}x)\\cos(${a}x)=\\tfrac12\\sin(2\\cdot${a}x)$, the limit is $\\displaystyle\\lim_{x\\to0}\\frac{\\sin(2${a}x)}{2x}=${a}$.`,
      };
    },
  },

  /* ================================================================== */
  /* squeeze-theorem : (1 - cos x)/x family (Master Guide: trig-lim-cos)  */
  /* ================================================================== */
  {
    id: "gf-cos-limit-1",
    unit: U1,
    topic: "squeeze-theorem",
    difficulty: "medium",
    manifestation: "squeeze-theorem:bounded-oscillation",
    build: (r: RNG) => {
      const a = ri(r, 2, 6);
      const b = ri(r, 2, 6);
      const val = frac(a * a, 2 * b);
      return {
        prompt: `Evaluate $\\displaystyle\\lim_{x\\to 0}\\frac{1-\\cos(${a}x)}{${b}x^{2}}$.`,
        correct: val,
        distractors: [frac(2 * b, a * a), `0`, frac(a, b)],
        explanation: `Using the special limit $\\displaystyle\\lim_{x\\to0}\\frac{1-\\cos x}{x^{2}}=\\frac12$, substitute $u=${a}x$: the limit equals $\\dfrac{${a}^{2}}{2\\cdot ${b}}=${val}$.`,
      };
    },
  },
  {
    id: "gf-cos-limit-2",
    unit: U1,
    topic: "squeeze-theorem",
    difficulty: "easy",
    manifestation: "squeeze-theorem:bounded-oscillation",
    build: (r: RNG) => {
      const a = ri(r, 2, 9);
      return {
        prompt: `What is $\\displaystyle\\lim_{x\\to 0}\\frac{1-\\cos(${a}x)}{x}$?`,
        correct: `0`,
        distractors: [`${a}`, `1`, `\\text{The limit does not exist.}`],
        explanation: `Since $\\displaystyle\\lim_{x\\to0}\\frac{1-\\cos x}{x}=0$, replacing $x$ with $${a}x$ still gives a limit of $0$, because $\\frac{1-\\cos(${a}x)}{x}=${a}\\cdot\\frac{1-\\cos(${a}x)}{${a}x}\\to ${a}\\cdot 0 = 0$.`,
      };
    },
  },
  {
    id: "gf-cos-limit-3",
    unit: U1,
    topic: "squeeze-theorem",
    difficulty: "medium",
    manifestation: "squeeze-theorem:valid-argument",
    build: () => ({
      prompt: `To evaluate $\\displaystyle\\lim_{x\\to 0}\\frac{1-\\cos x}{x}$ using the Squeeze Theorem after multiplying by the conjugate $\\dfrac{1+\\cos x}{1+\\cos x}$, which rewritten form is produced and correctly squeezed to $0$?`,
      correct: `\\frac{\\sin x}{x}\\cdot\\frac{\\sin x}{1+\\cos x}`,
      distractors: [
        `\\frac{\\sin x}{x}\\cdot\\frac{1-\\cos x}{1+\\cos x}`,
        `\\frac{\\cos x}{x}\\cdot\\frac{\\sin^{2}x}{1+\\cos x}`,
        `\\frac{1-\\cos^{2}x}{x^{2}}`,
      ],
      explanation: `Multiplying the numerator and denominator by $1+\\cos x$ gives $\\frac{1-\\cos^{2}x}{x(1+\\cos x)}=\\frac{\\sin^{2}x}{x(1+\\cos x)}=\\frac{\\sin x}{x}\\cdot\\frac{\\sin x}{1+\\cos x}$. As $x\\to0$ the first factor tends to $1$ and the second to $0$, so the product tends to $0$.`,
    }),
  },

  /* ================================================================== */
  /* definition-of-the-derivative : alternate x -> a definition          */
  /* ================================================================== */
  {
    id: "gf-def-deriv-alt-1",
    unit: U2,
    topic: "definition-of-the-derivative",
    difficulty: "medium",
    manifestation: "definition-of-the-derivative:equivalent-forms",
    build: (r: RNG) => {
      const a = ri(r, 2, 6);
      const p = ri(r, 2, 4);
      return {
        prompt: `Using the alternate definition $\\displaystyle f'(a)=\\lim_{x\\to a}\\frac{f(x)-f(a)}{x-a}$ with $f(x)=x^{${p}}$ and $a=${a}$, which limit expression correctly represents $f'(${a})$?`,
        correct: `\\displaystyle\\lim_{x\\to ${a}}\\frac{x^{${p}}-${a}^{${p}}}{x-${a}}`,
        distractors: [
          `\\displaystyle\\lim_{x\\to ${a}}\\frac{x^{${p}}-${a}^{${p}}}{x}`,
          `\\displaystyle\\lim_{h\\to 0}\\frac{(x+h)^{${p}}}{h}`,
          `\\displaystyle\\lim_{x\\to 0}\\frac{x^{${p}}-${a}^{${p}}}{x-${a}}`,
        ],
        explanation: `The alternate form of the derivative replaces $h=x-a$ and lets $x\\to a$, giving $\\lim_{x\\to ${a}}\\frac{f(x)-f(${a})}{x-${a}}=\\lim_{x\\to ${a}}\\frac{x^{${p}}-${a}^{${p}}}{x-${a}}$.`,
      };
    },
  },
  {
    id: "gf-def-deriv-alt-2",
    unit: U2,
    topic: "definition-of-the-derivative",
    difficulty: "hard",
    manifestation: "definition-of-the-derivative:equivalent-forms",
    build: (r: RNG) => {
      const a = ri(r, 2, 5);
      const val = 2 * a;
      return {
        prompt: `Evaluate $\\displaystyle\\lim_{x\\to ${a}}\\frac{x^{2}-${a * a}}{x-${a}}$, the alternate-form derivative of $f(x)=x^{2}$ at $x=${a}$.`,
        correct: `${val}`,
        distractors: [`${a}`, `${a * a}`, `0`],
        explanation: `Factor the numerator: $\\frac{(x-${a})(x+${a})}{x-${a}}=x+${a}$, which tends to $${a}+${a}=${val}$ as $x\\to ${a}$. This matches $f'(${a})=2(${a})=${val}$.`,
      };
    },
  },

  /* ================================================================== */
  /* u-substitution / FTC : sec^2, csc^2, sec tan, csc cot antiderivatives*/
  /* ================================================================== */
  {
    id: "gf-int-sec2-1",
    unit: U6,
    topic: "fundamental-theorem-of-calculus",
    difficulty: "medium",
    manifestation: "fundamental-theorem-of-calculus:ftc2-evaluate",
    build: (r: RNG) => {
      const a = ri(r, 2, 4);
      return {
        prompt: `Evaluate $\\displaystyle\\int_{0}^{\\pi/4} ${a}\\sec^{2}x\\,dx$.`,
        correct: `${a}`,
        distractors: [frac(a, 2), `${2 * a}`, `0`],
        explanation: `An antiderivative of $\\sec^{2}x$ is $\\tan x$, so the integral is $${a}\\left[\\tan x\\right]_{0}^{\\pi/4}=${a}(1-0)=${a}$.`,
      };
    },
  },
  {
    id: "gf-int-sec2-2",
    unit: U6,
    topic: "fundamental-theorem-of-calculus",
    difficulty: "medium",
    manifestation: "fundamental-theorem-of-calculus:ftc2-evaluate",
    build: (r: RNG) => {
      const a = ri(r, 2, 4);
      const val = -a;
      return {
        prompt: `Evaluate $\\displaystyle\\int_{\\pi/4}^{\\pi/2} ${a}\\csc^{2}x\\,dx$.`,
        correct: `${val}`,
        distractors: [`${a}`, `${2 * a}`, `0`],
        explanation: `Since $\\int \\csc^{2}x\\,dx=-\\cot x$, the integral equals $${a}\\left[-\\cot x\\right]_{\\pi/4}^{\\pi/2}=${a}\\big((0)-(-1)\\big)\\cdot(-1)\\cdot(-1)$; evaluating directly gives $${a}(-\\cot(\\pi/2)+\\cot(\\pi/4))\\cdot(-1)= ${val}$. Concretely, $-\\cot(\\pi/2)=0$ and $-\\cot(\\pi/4)=-1$, so the antiderivative changes by $0-(-1)=1$ times $-${a}$, giving $${val}$.`,
      };
    },
  },
  {
    id: "gf-int-sec2-3",
    unit: U6,
    topic: "u-substitution",
    difficulty: "medium",
    manifestation: "u-substitution:trig-inner",
    build: (r: RNG) => {
      const a = ri(r, 2, 5);
      return {
        prompt: `Find the general antiderivative $\\displaystyle\\int ${a}\\sec x\\tan x\\,dx$.`,
        correct: `${a}\\sec x + C`,
        distractors: [`${a}\\tan x + C`, `-${a}\\sec x + C`, `${a}\\sec^{2}x + C`],
        explanation: `The derivative of $\\sec x$ is $\\sec x\\tan x$, so an antiderivative of $${a}\\sec x\\tan x$ is $${a}\\sec x + C$.`,
      };
    },
  },

  /* ================================================================== */
  /* u-substitution : ln forms for tan, cot, sec, csc                    */
  /* ================================================================== */
  {
    id: "gf-int-tan-sec-1",
    unit: U6,
    topic: "u-substitution",
    difficulty: "medium",
    manifestation: "u-substitution:trig-inner",
    build: (r: RNG) => {
      const a = ri(r, 2, 5);
      return {
        prompt: `Find $\\displaystyle\\int ${a}\\tan x\\,dx$.`,
        correct: `-${a}\\ln|\\cos x| + C`,
        distractors: [`${a}\\ln|\\cos x| + C`, `${a}\\ln|\\sin x| + C`, `${a}\\sec^{2}x + C`],
        explanation: `Let $u=\\cos x$, so $du=-\\sin x\\,dx$ and $\\int \\tan x\\,dx=\\int\\frac{\\sin x}{\\cos x}\\,dx=-\\ln|\\cos x|+C$; multiplying by $${a}$ gives $-${a}\\ln|\\cos x|+C$.`,
      };
    },
  },
  {
    id: "gf-int-tan-sec-2",
    unit: U6,
    topic: "u-substitution",
    difficulty: "hard",
    manifestation: "u-substitution:trig-inner",
    build: (r: RNG) => {
      const a = ri(r, 2, 5);
      return {
        prompt: `Find $\\displaystyle\\int ${a}\\cot x\\,dx$.`,
        correct: `${a}\\ln|\\sin x| + C`,
        distractors: [`-${a}\\ln|\\sin x| + C`, `${a}\\ln|\\cos x| + C`, `${a}\\csc^{2}x + C`],
        explanation: `With $u=\\sin x$, $du=\\cos x\\,dx$, so $\\int\\cot x\\,dx=\\int\\frac{\\cos x}{\\sin x}\\,dx=\\ln|\\sin x|+C$; scaling by $${a}$ gives $${a}\\ln|\\sin x|+C$.`,
      };
    },
  },
  {
    id: "gf-int-tan-sec-3",
    unit: U6,
    topic: "u-substitution",
    difficulty: "hard",
    manifestation: "u-substitution:trig-inner",
    build: (r: RNG) => {
      const a = ri(r, 2, 4);
      return {
        prompt: `Which expression equals $\\displaystyle\\int ${a}\\sec x\\,dx$?`,
        correct: `${a}\\ln|\\sec x + \\tan x| + C`,
        distractors: [`${a}\\ln|\\sec x - \\tan x| + C`, `${a}\\sec x\\tan x + C`, `${a}\\ln|\\csc x + \\cot x| + C`],
        explanation: `Multiplying the integrand by $\\frac{\\sec x+\\tan x}{\\sec x+\\tan x}$ makes the numerator the derivative of $\\sec x+\\tan x$, giving the standard antiderivative $${a}\\ln|\\sec x+\\tan x|+C$.`,
      };
    },
  },

  /* ================================================================== */
  /* parametric-derivatives : second derivative (Master Guide: param-d2) */
  /* ================================================================== */
  {
    id: "gf-param-second-1",
    unit: U9,
    topic: "parametric-derivatives",
    difficulty: "hard",
    track: "BC",
    manifestation: "parametric-derivatives:second",
    build: (r: RNG) => {
      const a = ri(r, 2, 4);
      const b = ri(r, 2, 5);
      const t = ri(r, 1, 3);
      // x = at, y = b t^2 => dy/dx = 2bt/a, d/dt(dy/dx)=2b/a, dx/dt=a => d2y/dx2 = 2b/a^2
      const val = frac(2 * b, a * a);
      return {
        prompt: `For the curve $x=${a}t$ and $y=${b}t^{2}$, find the second derivative $\\dfrac{d^{2}y}{dx^{2}}$ at $t=${t}$.`,
        correct: val,
        distractors: [frac(2 * b, a), frac(b, a * a), `${val === "0" ? "1" : "0"}`],
        explanation: `Since $\\frac{dy}{dx}=\\frac{2${b}t}{${a}}$, differentiating this with respect to $t$ gives $\\frac{2${b}}{${a}}$. Dividing by $\\frac{dx}{dt}=${a}$ gives the second derivative of the parametric curve, $\\frac{d^{2}y}{dx^{2}}=\\frac{2${b}}{${a}^{2}}=${val}$, which is constant and does not depend on $t$.`,
      };
    },
  },
  {
    id: "gf-param-second-2",
    unit: U9,
    topic: "parametric-derivatives",
    difficulty: "hard",
    track: "BC",
    manifestation: "parametric-derivatives:second",
    build: (r: RNG) => {
      const a = ri(r, 2, 3);
      const b = ri(r, 2, 3);
      const t = ri(r, 1, 2);
      // x = t^2, y = a t^3 + b t ; dx/dt=2t, dy/dt=3a t^2+b, dy/dx=(3a t^2+b)/(2t)
      // d/dt(dy/dx) via quotient rule then divide by 2t
      const num1 = (6 * a * t) * (2 * t) - (3 * a * t * t + b) * 2; // derivative numerator*denom - numer*denom'
      const den1 = (2 * t) * (2 * t);
      // d2y/dx2 = [num1/den1] / (2t)
      const val = frac(num1, den1 * 2 * t);
      return {
        prompt: `A curve is given by $x=t^{2}$ and $y=${a}t^{3}${term(b, "t")}$. Compute the second derivative $\\dfrac{d^{2}y}{dx^{2}}$ at $t=${t}$.`,
        correct: val,
        distractors: [frac(num1, den1), frac(3 * a, 2), `0`],
        explanation: `First $\\frac{dy}{dx}=\\dfrac{${3 * a}t^{2}${term(b, "")}}{2t}$. Differentiating this quotient with respect to $t$ and dividing the result by $\\frac{dx}{dt}=2t$ gives the second derivative of the parametric curve; evaluating at $t=${t}$ gives $${val}$.`,
      };
    },
  },
  {
    id: "gf-param-second-3",
    unit: U9,
    topic: "parametric-derivatives",
    difficulty: "hard",
    track: "BC",
    manifestation: "parametric-derivatives:second",
    build: (r: RNG) => {
      const a = ri(r, 2, 5);
      const t = ri(r, 1, 3);
      // x = cos-free simple: x = t, y = a t^3 -> dy/dx = 3a t^2, d2y/dx2 = 6 a t
      const val = 6 * a * t;
      return {
        prompt: `For the parametrically defined curve $x=t$ and $y=${a}t^{3}$, what is the value of the second derivative $\\dfrac{d^{2}y}{dx^{2}}$ at $t=${t}$?`,
        correct: `${val}`,
        distractors: [`${3 * a * t * t}`, `${6 * a}`, `${3 * a}`],
        explanation: `Because $x=t$, $\\frac{dy}{dx}=\\frac{dy}{dt}=${3 * a}t^{2}$. The second derivative of the parametric curve is $\\frac{d}{dt}\\left(\\frac{dy}{dx}\\right)\\Big/\\frac{dx}{dt}=${6 * a}t\\big/1=${6 * a}t$, which at $t=${t}$ equals $${val}$.`,
      };
    },
  },

  /* ================================================================== */
  /* Tabular families spread across Units 2, 4, 5, 6, 7, 8                */
  /* ================================================================== */

  /* ---- Unit 2: definition-of-the-derivative : table-estimate (unequal spacing) ---- */
  {
    id: "gf-table-deriv-unequal",
    unit: U2,
    topic: "definition-of-the-derivative",
    difficulty: "medium",
    manifestation: "definition-of-the-derivative:table-estimate",
    representation: "tabular",
    mistakes: ["uses-wrong-width"],
    build: (r: RNG) => {
      const xs = [1, 2, 4, 7];
      const fVals = [ri(r, 2, 5), ri(r, 6, 9), ri(r, 10, 14), ri(r, 15, 20)];
      const table: TableFigure = {
        kind: "table",
        headers: ["x", ...xs.map(String)],
        rows: [["f(x)", ...fVals.map(String)]],
      };
      const est = frac(fVals[2] - fVals[1], xs[2] - xs[1]);
      return {
        prompt: `The table gives selected values of a differentiable function $f$. Using the two table entries nearest $x=3$, estimate $f'(3)$.`,
        correct: est,
        distractors: [
          frac(fVals[3] - fVals[0], xs[3] - xs[0]),
          frac(fVals[2] - fVals[1], 1),
          frac(fVals[1] - fVals[0], xs[1] - xs[0]),
        ],
        explanation: `The values at $x=2$ and $x=4$ bracket $x=3$ most closely, so $f'(3)\\approx\\dfrac{f(4)-f(2)}{4-2}=\\dfrac{${fVals[2]}-${fVals[1]}}{${xs[2] - xs[1]}}=${est}$.`,
        figure: table,
      };
    },
  },

  /* ---- Unit 4: rectilinear-motion : table-motion (speed increasing/decreasing) ---- */
  {
    id: "gf-table-motion-speed",
    unit: U4,
    topic: "rectilinear-motion",
    difficulty: "medium",
    manifestation: "rectilinear-motion:table-motion",
    representation: "tabular",
    calculator: true,
    build: (r: RNG) => {
      const t = [0, 2, 4, 6];
      const v = [ri(r, -6, -3), ri(r, -2, 1), ri(r, 2, 5), ri(r, 6, 9)];
      const table: TableFigure = {
        kind: "table",
        headers: ["t", ...t.map(String)],
        rows: [["v(t)", ...v.map(String)]],
      };
      return {
        prompt: `The table gives the velocity $v(t)$, in meters per second, of a particle moving along a line at selected times $t$. On which interval is the particle's speed guaranteed to be increasing?`,
        correct: `(4,6)`,
        distractors: [`(0,2)`, `(2,4)`, `\\text{None of the intervals shown}`],
        explanation: `Speed increases when $v$ and $a$ have the same sign. On $(4,6)$, $v$ is positive and increasing (from ${v[2]} to ${v[3]}), so both velocity and acceleration are positive there, meaning speed is increasing. On $(0,2)$ and $(2,4)$, $v$ changes sign or moves toward $0$, which does not guarantee increasing speed.`,
        figure: table,
      };
    },
  },

  /* ---- Unit 4: rates-of-change-in-context : compare-rates ---- */
  {
    id: "gf-table-compare-rates",
    unit: U4,
    topic: "rates-of-change-in-context",
    difficulty: "medium",
    manifestation: "rates-of-change-in-context:compare-rates",
    representation: "tabular",
    calculator: true,
    build: (r: RNG) => {
      const t = [0, 3, 6, 9];
      const h = [ri(r, 10, 20), ri(r, 25, 35), ri(r, 40, 55), ri(r, 58, 65)];
      const table: TableFigure = {
        kind: "table",
        headers: ["t (min)", ...t.map(String)],
        rows: [["h(t) (meters)", ...h.map(String)]],
      };
      const rates = [
        (h[1] - h[0]) / (t[1] - t[0]),
        (h[2] - h[1]) / (t[2] - t[1]),
        (h[3] - h[2]) / (t[3] - t[2]),
      ];
      const maxIdx = rates.indexOf(Math.max(...rates));
      const intervals = [`(0,3)`, `(3,6)`, `(6,9)`];
      return {
        prompt: `The height $h(t)$ of a balloon, in meters, is recorded at selected times $t$, in minutes. On which interval is the average rate of change of $h$ the greatest?`,
        correct: intervals[maxIdx],
        distractors: intervals.filter((_, i) => i !== maxIdx),
        explanation: `Average rates of change on the three intervals are $${rates.map((x) => x.toFixed(2)).join(", ")}$ meters per minute, respectively, so the greatest occurs on $${intervals[maxIdx]}$.`,
        figure: table,
      };
    },
  },

  /* ---- Unit 5: mean-value-theorem : table-conclusion ---- */
  {
    id: "gf-table-mvt-conclusion",
    unit: U5,
    topic: "mean-value-theorem",
    difficulty: "medium",
    manifestation: "mean-value-theorem:table-conclusion",
    representation: "tabular",
    build: (r: RNG) => {
      const xs = [0, 2, 5, 8];
      const fVals = [ri(r, 1, 4), ri(r, 5, 8), ri(r, 9, 13), ri(r, 14, 20)];
      const table: TableFigure = {
        kind: "table",
        headers: ["x", ...xs.map(String)],
        rows: [["f(x)", ...fVals.map(String)]],
      };
      const avg = frac(fVals[3] - fVals[0], xs[3] - xs[0]);
      return {
        prompt: `The differentiable function $f$ has the values shown in the table. The Mean Value Theorem guarantees a value $c$ in $(0,8)$ with $f'(c)$ equal to which quantity?`,
        correct: avg,
        distractors: [frac(fVals[1] - fVals[0], xs[1] - xs[0]), `${fVals[3] - fVals[0]}`, frac(fVals[3], xs[3])],
        explanation: `The MVT guarantees $f'(c)=\\dfrac{f(8)-f(0)}{8-0}=\\dfrac{${fVals[3]}-${fVals[0]}}{8}=${avg}$ for some $c$ in $(0,8)$, since $f$ is differentiable (hence continuous) on the interval.`,
        figure: table,
      };
    },
  },

  /* ---- Unit 5: second-derivative-test : table (concavity from f' values) ---- */
  {
    id: "gf-table-concavity-fprime",
    unit: U5,
    topic: "second-derivative-test",
    difficulty: "hard",
    manifestation: "second-derivative-test:table",
    representation: "tabular",
    mistakes: ["reads-f-instead-of-fprime"],
    build: (r: RNG) => {
      const xs = [-2, 0, 2, 4];
      const fp = [ri(r, -8, -4), ri(r, -3, -1), ri(r, 2, 5), ri(r, 6, 10)];
      const table: TableFigure = {
        kind: "table",
        headers: ["x", ...xs.map(String)],
        rows: [["f'(x)", ...fp.map(String)]],
      };
      return {
        prompt: `The table gives values of $f'(x)$ for a twice-differentiable function $f$ at selected values of $x$. Based on this data, on which interval must the graph of $f$ be concave up?`,
        correct: `(0,2)`,
        distractors: [`(-2,0)`, `(2,4)`, `\\text{Cannot be determined}`],
        explanation: `Concavity is up where $f'$ is increasing. Between $x=0$ and $x=2$, $f'$ rises from $${fp[1]}$ to $${fp[2]}$, so $f''>0$ somewhere on $(0,2)$ and the data is consistent with $f$ being concave up there.`,
        figure: table,
      };
    },
  },

  /* ---- Unit 6: riemann-sums : left-right from a rate table ---- */
  {
    id: "gf-table-riemann-leftright",
    unit: U6,
    topic: "riemann-sums",
    difficulty: "medium",
    manifestation: "riemann-sums:left-right",
    representation: "tabular",
    calculator: true,
    build: (r: RNG) => {
      const t = [0, 2, 4, 6, 8];
      const v = [ri(r, 3, 5), ri(r, 6, 8), ri(r, 9, 11), ri(r, 12, 14), ri(r, 15, 17)];
      const table: TableFigure = {
        kind: "table",
        headers: ["t", ...t.map(String)],
        rows: [["v(t)", ...v.map(String)]],
      };
      const width = 2;
      const left = width * (v[0] + v[1] + v[2] + v[3]);
      return {
        prompt: `The table gives the velocity $v(t)$ of a car, in feet per second, at two-second intervals. Use a left Riemann sum with the four subintervals shown to approximate $\\displaystyle\\int_{0}^{8} v(t)\\,dt$.`,
        correct: `${left}`,
        distractors: [
          `${width * (v[1] + v[2] + v[3] + v[4])}`,
          `${width * (v[0] + v[1] + v[2] + v[3] + v[4])}`,
          `${left / 2}`,
        ],
        explanation: `A left sum uses the value at the left endpoint of each width-$2$ subinterval: $2\\big(${v[0]}+${v[1]}+${v[2]}+${v[3]}\\big)=${left}$.`,
        figure: table,
      };
    },
  },

  /* ---- Unit 6: accumulation-functions : table-rate ---- */
  {
    id: "gf-table-accumulation-rate",
    unit: U6,
    topic: "accumulation-functions",
    difficulty: "hard",
    manifestation: "accumulation-functions:table-rate",
    representation: "tabular",
    calculator: true,
    build: (r: RNG) => {
      const t = [0, 1, 3, 6];
      const rate = [ri(r, 2, 4), ri(r, 5, 7), ri(r, 8, 10), ri(r, 11, 14)];
      const table: TableFigure = {
        kind: "table",
        headers: ["t", ...t.map(String)],
        rows: [["r(t)", ...rate.map(String)]],
      };
      const trap =
        0.5 * (rate[0] + rate[1]) * (t[1] - t[0]) +
        0.5 * (rate[1] + rate[2]) * (t[2] - t[1]) +
        0.5 * (rate[2] + rate[3]) * (t[3] - t[2]);
      const g6 = 20 + trap;
      return {
        prompt: `A tank contains $20$ liters of fluid at time $t=0$. Fluid flows in at a rate $r(t)$, in liters per minute, given by the table. Using a trapezoidal approximation with the given subintervals, estimate the amount of fluid $g(6)=20+\\displaystyle\\int_{0}^{6}r(t)\\,dt$ in the tank at $t=6$.`,
        correct: `${dec3(g6)}`,
        distractors: [`${dec3(trap)}`, `${dec3(20 + rate[3] * 6)}`, `${dec3(g6 + 5)}`],
        explanation: `The trapezoidal estimate of $\\int_{0}^{6} r(t)\\,dt$ is $${dec3(trap)}$ liters, so $g(6)\\approx 20+${dec3(trap)}=${dec3(g6)}$ liters.`,
        figure: table,
      };
    },
  },

  /* ---- Unit 7: eulers-method : multi-step (find a missing table entry) ---- */
  {
    id: "gf-table-euler-missing",
    unit: U7,
    topic: "eulers-method",
    difficulty: "hard",
    track: "BC",
    manifestation: "eulers-method:multi-step",
    representation: "tabular",
    calculator: true,
    build: (r: RNG) => {
      // dy/dx = x + y, y(0) = y0, step 0.5, want y at x=1 (two steps)
      const y0 = ri(r, 1, 3);
      const h = 0.5;
      const x0 = 0;
      const y1 = y0 + h * (x0 + y0);
      const x1 = 0.5;
      const y2 = y1 + h * (x1 + y1);
      const table: TableFigure = {
        kind: "table",
        headers: ["x", "0", "0.5", "1"],
        rows: [["y (Euler approx.)", `${y0}`, `${dec3(y1)}`, `?`]],
      };
      return {
        prompt: `Euler's method with step size $h=0.5$ is used to approximate the solution to $\\dfrac{dy}{dx}=x+y$ with the initial condition shown in the table. What value belongs in place of the "?" for the approximation of $y(1)$?`,
        correct: `${dec3(y2)}`,
        distractors: [`${dec3(y1 + h * y1)}`, `${dec3(y1 + h * (x1 + y0))}`, `${dec3(y2 + h)}`],
        explanation: `From $x=0.5$, $y\\approx${dec3(y1)}$, the next step is $y(1)\\approx y(0.5)+h\\big(x+y\\big)=${dec3(y1)}+0.5(0.5+${dec3(y1)})=${dec3(y2)}$.`,
        figure: table,
      };
    },
  },

  /* ---- Unit 8: average-value : table (trapezoidal estimate) ---- */
  {
    id: "gf-table-average-value",
    unit: U8,
    topic: "average-value",
    difficulty: "hard",
    manifestation: "average-value:table",
    representation: "tabular",
    calculator: true,
    build: (r: RNG) => {
      const x = [1, 2, 5, 9];
      const f = [ri(r, 4, 6), ri(r, 7, 9), ri(r, 10, 13), ri(r, 14, 18)];
      const table: TableFigure = {
        kind: "table",
        headers: ["x", ...x.map(String)],
        rows: [["f(x)", ...f.map(String)]],
      };
      const trap =
        0.5 * (f[0] + f[1]) * (x[1] - x[0]) +
        0.5 * (f[1] + f[2]) * (x[2] - x[1]) +
        0.5 * (f[2] + f[3]) * (x[3] - x[2]);
      const avg = trap / (x[3] - x[0]);
      return {
        prompt: `Selected values of a continuous function $f$ are given in the table. Use a trapezoidal approximation for $\\displaystyle\\int_{1}^{9} f(x)\\,dx$ to estimate the average value of $f$ on $[1,9]$.`,
        correct: `${dec3(avg)}`,
        distractors: [`${dec3(trap)}`, `${dec3(avg * 2)}`, `${dec3((f[0] + f[3]) / 2)}`],
        explanation: `The trapezoidal estimate of the integral is $${dec3(trap)}$, so the average value is $\\dfrac{1}{9-1}\\cdot${dec3(trap)}=${dec3(avg)}$.`,
        figure: table,
      };
    },
  },

  /* ---- Unit 8: accumulation-in-context : table net change (in/out rates) ---- */
  {
    id: "gf-table-net-change-inout",
    unit: U8,
    topic: "accumulation-in-context",
    difficulty: "hard",
    manifestation: "accumulation-in-context:in-out-rates",
    representation: "tabular",
    calculator: true,
    build: (r: RNG) => {
      const t = [0, 2, 5, 10];
      const inRate = [ri(r, 8, 10), ri(r, 9, 12), ri(r, 6, 8), ri(r, 4, 6)];
      const outRate = [ri(r, 3, 5), ri(r, 4, 6), ri(r, 7, 9), ri(r, 8, 10)];
      const net = inRate.map((v, i) => v - outRate[i]);
      const table: TableFigure = {
        kind: "table",
        headers: ["t (hours)", ...t.map(String)],
        rows: [
          ["Inflow rate (gal/hr)", ...inRate.map(String)],
          ["Outflow rate (gal/hr)", ...outRate.map(String)],
        ],
      };
      const trap =
        0.5 * (net[0] + net[1]) * (t[1] - t[0]) +
        0.5 * (net[1] + net[2]) * (t[2] - t[1]) +
        0.5 * (net[2] + net[3]) * (t[3] - t[2]);
      return {
        prompt: `Water flows into and out of a tank at the rates shown in the table, both in gallons per hour. Using a trapezoidal approximation over the given subintervals, estimate the net change in the amount of water in the tank from $t=0$ to $t=10$ hours.`,
        correct: `${dec3(trap)}`,
        distractors: [`${dec3(Math.abs(trap) + 5)}`, `${dec3(-trap)}`, `${dec3(trap / 2)}`],
        explanation: `The net rate is inflow minus outflow at each time: $${net.join(", ")}$ gallons per hour. Trapezoidal approximation of $\\int_{0}^{10}\\big(\\text{in}-\\text{out}\\big)\\,dt$ gives a net change of about $${dec3(trap)}$ gallons.`,
        figure: table,
      };
    },
  },
];

function dec3(x: number): string {
  const v = Math.round(x * 1000) / 1000;
  return `${v}`;
}
