/**
 * Parameterized original AP Calculus MCQ templates.
 *
 * Every template is a *generator*: given a deterministic seeded RNG it produces
 * a unique prompt, a correct answer, and recalculated distractors. Expanding the
 * template set across variants yields ~1,800 original questions with no
 * College Board text reproduced anywhere.
 */

export type Difficulty = "easy" | "medium" | "hard";

export type BuiltQuestion = {
  prompt: string;
  correct: string;
  distractors: string[];
  explanation: string;
};

export type QuestionTemplate = {
  id: string;
  unit: string;
  topic: string;
  difficulty: Difficulty;
  calculator?: boolean;
  mistakes?: string[];
  build: (r: RNG) => BuiltQuestion;
};

/* ------------------------------------------------------------------ */
/* Deterministic RNG                                                   */
/* ------------------------------------------------------------------ */

export type RNG = () => number;

export function hashString(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

export function makeRng(seed: string): RNG {
  let a = hashString(seed) || 1;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const ri = (r: RNG, a: number, b: number) => a + Math.floor(r() * (b - a + 1));
const pick = <T,>(r: RNG, xs: readonly T[]): T => xs[Math.floor(r() * xs.length) % xs.length];

export function shuffle<T>(r: RNG, xs: T[]): T[] {
  const out = xs.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Formatting helpers                                                  */
/* ------------------------------------------------------------------ */

const gcd = (a: number, b: number): number => (b ? gcd(b, Math.abs(a % b)) : Math.abs(a));

function frac(n: number, d: number): string {
  if (d < 0) {
    n = -n;
    d = -d;
  }
  const g = gcd(n, d) || 1;
  n /= g;
  d /= g;
  if (d === 1) return `${n}`;
  return `${n < 0 ? "-" : ""}\\frac{${Math.abs(n)}}{${d}}`;
}

function dec(x: number, p = 3): string {
  const v = Math.round(x * 10 ** p) / 10 ** p;
  return `${v}`;
}

/** signed term like " + 3x" / " - x^2" */
function term(coef: number, body: string): string {
  if (coef === 0) return "";
  const sign = coef < 0 ? " - " : " + ";
  const a = Math.abs(coef);
  const c = a === 1 && body ? "" : `${a}`;
  return `${sign}${c}${body}`;
}

function poly(parts: Array<[number, string]>): string {
  let s = parts.map(([c, b]) => term(c, b)).join("");
  s = s.replace(/^ \+ /, "").replace(/^ - /, "-");
  return s || "0";
}

const CONTEXTS = [
  { thing: "water", unit: "liters", rateUnit: "liters per minute", time: "minutes", vessel: "a reservoir" },
  { thing: "sand", unit: "cubic feet", rateUnit: "cubic feet per hour", time: "hours", vessel: "a hopper" },
  { thing: "fuel", unit: "gallons", rateUnit: "gallons per minute", time: "minutes", vessel: "a tank" },
  { thing: "grain", unit: "bushels", rateUnit: "bushels per day", time: "days", vessel: "a silo" },
  { thing: "coolant", unit: "liters", rateUnit: "liters per second", time: "seconds", vessel: "a chamber" },
] as const;

const TRIPLES = [
  [3, 4, 5],
  [6, 8, 10],
  [5, 12, 13],
  [8, 15, 17],
  [9, 12, 15],
  [7, 24, 25],
  [20, 21, 29],
] as const;

/* ------------------------------------------------------------------ */
/* Templates                                                           */
/* ------------------------------------------------------------------ */

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

export const TEMPLATES: QuestionTemplate[] = [
  /* ---------------- Unit 1 ---------------- */
  {
    id: "u1-removable",
    unit: U1,
    topic: "evaluating-limits-algebraically",
    difficulty: "easy",
    mistakes: ["sign-error"],
    build: (r) => {
      const a = ri(r, 2, 9);
      let b = ri(r, 1, 9);
      if (b === a) b = a === 9 ? 1 : a + 1;
      const s = a + b;
      const p = a * b;
      return {
        prompt: `Evaluate $\\displaystyle\\lim_{x\\to ${a}}\\frac{x^{2} ${term(-s, "x")} ${term(p, "")}}{x - ${a}}$.`,
        correct: `${a - b}`,
        distractors: [`${b - a}`, `${a + b}`, `0`],
        explanation: `Factor the numerator as $(x-${a})(x-${b})$. Cancel $(x-${a})$ and substitute: $${a} - ${b} = ${a - b}$.`,
      };
    },
  },
  {
    id: "u1-end-behavior",
    unit: U1,
    topic: "limits-at-infinity",
    difficulty: "easy",
    build: (r) => {
      const p = ri(r, 2, 9);
      const q = ri(r, 2, 9);
      const c = ri(r, 1, 9);
      const d = ri(r, 1, 9);
      return {
        prompt: `Evaluate $\\displaystyle\\lim_{x\\to\\infty}\\frac{${p}x^{2} ${term(c, "x")}}{${q}x^{2} ${term(-d, "")}}$.`,
        correct: frac(p, q),
        distractors: [frac(q, p), `0`, `\\text{The limit does not exist.}`],
        explanation: `For equal degrees the limit is the ratio of leading coefficients: $${frac(p, q)}$.`,
      };
    },
  },
  {
    id: "u1-conjugate",
    unit: U1,
    topic: "evaluating-limits-algebraically",
    difficulty: "medium",
    build: (r) => {
      const c = ri(r, 2, 9);
      return {
        prompt: `Evaluate $\\displaystyle\\lim_{x\\to 0}\\frac{\\sqrt{x+${c * c}}-${c}}{x}$.`,
        correct: frac(1, 2 * c),
        distractors: [frac(1, c), `${2 * c}`, `0`],
        explanation: `Multiply by the conjugate: the expression becomes $\\frac{1}{\\sqrt{x+${c * c}}+${c}}$, which approaches $\\frac{1}{${2 * c}}$.`,
      };
    },
  },
  {
    id: "u1-piecewise-continuity",
    unit: U1,
    topic: "continuity-and-discontinuity",
    difficulty: "medium",
    build: (r) => {
      const c = ri(r, 1, 5);
      const m = ri(r, 0, 6);
      const k = ri(r, 1, 7);
      const n = k * c + m - c * c;
      return {
        prompt: `Let $f(x)=\\begin{cases} kx ${term(m, "")} & x\\le ${c}\\\\ x^{2} ${term(n, "")} & x> ${c}\\end{cases}$. For what value of $k$ is $f$ continuous at $x=${c}$?`,
        correct: `${k}`,
        distractors: [`${k + 1}`, `${-k}`, `${m}`],
        explanation: `Set the one-sided values equal: $k(${c}) + ${m} = ${c}^{2} ${term(n, "")}$, so $k = ${k}$.`,
      };
    },
  },
  {
    id: "u1-trig-limit",
    unit: U1,
    topic: "squeeze-theorem",
    difficulty: "easy",
    build: (r) => {
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
    id: "u1-ivt",
    unit: U1,
    topic: "intermediate-value-theorem",
    difficulty: "medium",
    mistakes: ["mvt-conditions"],
    build: (r) => {
      const a = ri(r, 0, 4);
      const b = a + ri(r, 2, 6);
      const lo = -ri(r, 2, 9);
      const hi = ri(r, 2, 9);
      const inside = ri(r, lo + 1, hi - 1);
      return {
        prompt: `A function $f$ is continuous on $[${a},${b}]$ with $f(${a})=${lo}$ and $f(${b})=${hi}$. Which value must $f$ attain somewhere on $(${a},${b})$?`,
        correct: `${inside}`,
        distractors: [`${hi + ri(r, 2, 6)}`, `${lo - ri(r, 2, 6)}`, `\\text{No value is guaranteed.}`],
        explanation: `The Intermediate Value Theorem guarantees every value strictly between $${lo}$ and $${hi}$ is attained, and $${inside}$ lies in that interval.`,
      };
    },
  },

  /* ---------------- Unit 2 ---------------- */
  {
    id: "u2-power-rule",
    unit: U2,
    topic: "power-rule",
    difficulty: "easy",
    build: (r) => {
      const a = ri(r, 1, 5);
      const b = ri(r, -6, 6);
      const c = ri(r, -9, 9);
      const t = ri(r, 1, 4);
      const val = 3 * a * t * t + 2 * b * t + c;
      return {
        prompt: `If $f(x)=${a}x^{3} ${term(b, "x^{2}")} ${term(c, "x")} ${term(ri(r, -5, 5), "")}$, find $f'(${t})$.`,
        correct: `${val}`,
        distractors: [`${3 * a * t * t + 2 * b * t}`, `${a * t * t + b * t + c}`, `${val + c}`],
        explanation: `$f'(x)=${3 * a}x^{2} ${term(2 * b, "x")} ${term(c, "")}$, so $f'(${t}) = ${val}$.`,
      };
    },
  },
  {
    id: "u2-definition",
    unit: U2,
    topic: "definition-of-the-derivative",
    difficulty: "medium",
    build: (r) => {
      const n = ri(r, 2, 5);
      const t = ri(r, 2, 5);
      const val = n * t ** (n - 1);
      return {
        prompt: `Evaluate $\\displaystyle\\lim_{h\\to 0}\\frac{(${t}+h)^{${n}} - ${t}^{${n}}}{h}$.`,
        correct: `${val}`,
        distractors: [`${t ** n}`, `${n * t ** n}`, `0`],
        explanation: `This is $f'(${t})$ for $f(x)=x^{${n}}$, so the value is $${n}\\cdot ${t}^{${n - 1}} = ${val}$.`,
      };
    },
  },
  {
    id: "u2-product-rule",
    unit: U2,
    topic: "product-and-quotient-rules",
    difficulty: "medium",
    mistakes: ["product-quotient-skip"],
    build: (r) => {
      const a = ri(r, 2, 6);
      const b = ri(r, -6, 6);
      const c = ri(r, 1, 9);
      const t = ri(r, 1, 4);
      const val = a * (t * t + c) + 2 * t * (a * t + b);
      return {
        prompt: `Let $f(x)=(${a}x ${term(b, "")})(x^{2} ${term(c, "")})$. Find $f'(${t})$.`,
        correct: `${val}`,
        distractors: [`${a * 2 * t}`, `${a * (t * t + c)}`, `${2 * t * (a * t + b)}`],
        explanation: `Product rule: $f'(x)=${a}(x^{2} ${term(c, "")}) + 2x(${a}x ${term(b, "")})$, so $f'(${t}) = ${val}$.`,
      };
    },
  },
  {
    id: "u2-quotient-rule",
    unit: U2,
    topic: "product-and-quotient-rules",
    difficulty: "medium",
    mistakes: ["product-quotient-skip", "sign-error"],
    build: (r) => {
      const a = ri(r, 2, 7);
      const b = ri(r, -8, 8);
      const c = ri(r, 1, 5);
      const t = ri(r, 0, 4);
      const den = (t + c) ** 2;
      return {
        prompt: `Let $f(x)=\\dfrac{${a}x ${term(b, "")}}{x ${term(c, "")}}$. Find $f'(${t})$.`,
        correct: frac(a * c - b, den),
        distractors: [frac(b - a * c, den), frac(a * c + b, den), `${a}`],
        explanation: `$f'(x)=\\dfrac{${a}(x${term(c, "")}) - (${a}x${term(b, "")})}{(x${term(c, "")})^{2}} = \\dfrac{${a * c - b}}{(x${term(c, "")})^{2}}$, so $f'(${t}) = ${frac(a * c - b, den)}$.`,
      };
    },
  },
  {
    id: "u2-elementary",
    unit: U2,
    topic: "derivatives-of-trig-exp-log",
    difficulty: "easy",
    build: (r) => {
      const a = ri(r, 2, 9);
      const b = ri(r, 2, 9);
      return {
        prompt: `If $f(x)=${a}\\sin x + ${b}e^{x}$, find $f'(0)$.`,
        correct: `${a + b}`,
        distractors: [`${b}`, `${a}`, `${b - a}`],
        explanation: `$f'(x)=${a}\\cos x + ${b}e^{x}$, so $f'(0)=${a}+${b}=${a + b}$.`,
      };
    },
  },
  {
    id: "u2-differentiability",
    unit: U2,
    topic: "differentiability-and-continuity",
    difficulty: "medium",
    build: (r) => {
      const a = ri(r, -6, 6);
      return {
        prompt: `Let $f(x)=|x ${term(-a, "")}|$. Which statement is true at $x=${a}$?`,
        correct: `\\text{$f$ is continuous but not differentiable.}`,
        distractors: [
          `\\text{$f$ is differentiable but not continuous.}`,
          `\\text{$f$ is both continuous and differentiable.}`,
          `\\text{$f$ is neither continuous nor differentiable.}`,
        ],
        explanation: `The absolute value graph has a corner at $x=${a}$: the one-sided slopes are $-1$ and $1$, so $f$ is continuous there but not differentiable.`,
      };
    },
  },

  /* ---------------- Unit 3 ---------------- */
  {
    id: "u3-chain-power",
    unit: U3,
    topic: "chain-rule",
    difficulty: "medium",
    mistakes: ["chain-rule-skip"],
    build: (r) => {
      const a = ri(r, 2, 5);
      const b = ri(r, 1, 6);
      const n = ri(r, 2, 4);
      const t = ri(r, 1, 3);
      const inner = a * t * t + b;
      const val = n * inner ** (n - 1) * 2 * a * t;
      return {
        prompt: `If $f(x)=(${a}x^{2} ${term(b, "")})^{${n}}$, find $f'(${t})$.`,
        correct: `${val}`,
        distractors: [`${n * inner ** (n - 1)}`, `${inner ** n}`, `${2 * a * t}`],
        explanation: `Chain rule: $f'(x)=${n}(${a}x^{2}${term(b, "")})^{${n - 1}}\\cdot ${2 * a}x$. At $x=${t}$ this is $${val}$.`,
      };
    },
  },
  {
    id: "u3-chain-trig",
    unit: U3,
    topic: "chain-rule",
    difficulty: "medium",
    mistakes: ["chain-rule-skip"],
    build: (r) => {
      const a = ri(r, 2, 6);
      const n = ri(r, 2, 5);
      return {
        prompt: `Find $\\dfrac{d}{dx}\\left[\\sin^{${n}}(${a}x)\\right]$.`,
        correct: `${n * a}\\sin^{${n - 1}}(${a}x)\\cos(${a}x)`,
        distractors: [
          `${n}\\sin^{${n - 1}}(${a}x)\\cos(${a}x)`,
          `${n * a}\\sin^{${n - 1}}(${a}x)`,
          `${n * a}\\cos^{${n - 1}}(${a}x)`,
        ],
        explanation: `Two chain layers: bring down ${n}, keep $\\sin^{${n - 1}}(${a}x)$, multiply by $\\cos(${a}x)$ and by the inner derivative ${a}.`,
      };
    },
  },
  {
    id: "u3-implicit-circle",
    unit: U3,
    topic: "implicit-differentiation",
    difficulty: "medium",
    mistakes: ["implicit-y-prime"],
    build: (r) => {
      const [x0, y0, h] = pick(r, TRIPLES);
      return {
        prompt: `The curve $x^{2}+y^{2}=${h * h}$ passes through $(${x0},${y0})$. Find $\\dfrac{dy}{dx}$ at that point.`,
        correct: frac(-x0, y0),
        distractors: [frac(x0, y0), frac(-y0, x0), frac(y0, x0)],
        explanation: `Differentiating implicitly: $2x + 2y\\frac{dy}{dx}=0$, so $\\frac{dy}{dx} = -\\frac{x}{y} = ${frac(-x0, y0)}$.`,
      };
    },
  },
  {
    id: "u3-implicit-product",
    unit: U3,
    topic: "implicit-differentiation",
    difficulty: "hard",
    mistakes: ["implicit-y-prime", "product-quotient-skip"],
    build: (r) => {
      const x0 = ri(r, 1, 5);
      const y0 = ri(r, 1, 6);
      const k = x0 * x0 + x0 * y0;
      return {
        prompt: `The curve $x^{2}+xy=${k}$ contains the point $(${x0},${y0})$. Find $\\dfrac{dy}{dx}$ there.`,
        correct: frac(-(2 * x0 + y0), x0),
        distractors: [frac(2 * x0 + y0, x0), frac(-(2 * x0 - y0), x0), frac(-y0, x0)],
        explanation: `Implicit differentiation gives $2x + y + x\\frac{dy}{dx}=0$, so $\\frac{dy}{dx} = -\\frac{2x+y}{x} = ${frac(-(2 * x0 + y0), x0)}$.`,
      };
    },
  },
  {
    id: "u3-inverse-derivative",
    unit: U3,
    topic: "derivatives-of-inverse-functions",
    difficulty: "medium",
    build: (r) => {
      const a = ri(r, 1, 6);
      const b = ri(r, 1, 9);
      const p = ri(r, 2, 8);
      return {
        prompt: `A differentiable function $f$ satisfies $f(${a})=${b}$ and $f'(${a})=${p}$. If $g=f^{-1}$, find $g'(${b})$.`,
        correct: frac(1, p),
        distractors: [`${p}`, frac(1, b), frac(1, a)],
        explanation: `$g'(${b}) = \\dfrac{1}{f'(${a})} = ${frac(1, p)}$.`,
      };
    },
  },
  {
    id: "u3-arctan",
    unit: U3,
    topic: "inverse-trig-derivatives",
    difficulty: "medium",
    mistakes: ["chain-rule-skip"],
    build: (r) => {
      const a = ri(r, 2, 6);
      const t = ri(r, 0, 3);
      const den = 1 + a * a * t * t;
      return {
        prompt: `If $f(x)=\\arctan(${a}x)$, find $f'(${t})$.`,
        correct: frac(a, den),
        distractors: [frac(1, den), frac(a, 1 + t * t), `${a}`],
        explanation: `$f'(x)=\\dfrac{${a}}{1+${a * a}x^{2}}$, so $f'(${t}) = ${frac(a, den)}$.`,
      };
    },
  },

  /* ---------------- Unit 4 ---------------- */
  {
    id: "u4-related-rates-circle",
    unit: U4,
    topic: "related-rates",
    difficulty: "medium",
    mistakes: ["related-rates-units", "missing-units"],
    build: (r) => {
      const R = ri(r, 2, 12);
      const k = ri(r, 1, 6);
      return {
        prompt: `A circular ripple expands so that its radius increases at $${k}$ cm/s. How fast is the enclosed area changing when the radius is $${R}$ cm?`,
        correct: `${2 * R * k}\\pi \\text{ cm}^{2}/\\text{s}`,
        distractors: [`${R * k}\\pi \\text{ cm}^{2}/\\text{s}`, `${R * R * k}\\pi \\text{ cm}^{2}/\\text{s}`, `${2 * R}\\pi \\text{ cm}^{2}/\\text{s}`],
        explanation: `$A=\\pi r^{2}\\Rightarrow \\frac{dA}{dt}=2\\pi r\\frac{dr}{dt} = 2\\pi(${R})(${k}) = ${2 * R * k}\\pi$ cm²/s.`,
      };
    },
  },
  {
    id: "u4-related-rates-ladder",
    unit: U4,
    topic: "related-rates",
    difficulty: "hard",
    mistakes: ["related-rates-units", "sign-error"],
    build: (r) => {
      const [x0, y0, L] = pick(r, TRIPLES);
      const v = ri(r, 1, 4);
      return {
        prompt: `A $${L}$-ft ladder leans against a wall. Its base slides away from the wall at $${v}$ ft/s. When the base is $${x0}$ ft from the wall, how fast is the top sliding down?`,
        correct: `${frac(x0 * v, y0)} \\text{ ft/s downward}`,
        distractors: [
          `${frac(y0 * v, x0)} \\text{ ft/s downward}`,
          `${v} \\text{ ft/s downward}`,
          `${frac(x0 * v, L)} \\text{ ft/s downward}`,
        ],
        explanation: `From $x^{2}+y^{2}=${L * L}$: $\\frac{dy}{dt} = -\\frac{x}{y}\\frac{dx}{dt} = -\\frac{${x0}(${v})}{${y0}}$, a drop of $${frac(x0 * v, y0)}$ ft/s.`,
      };
    },
  },
  {
    id: "u4-motion",
    unit: U4,
    topic: "rectilinear-motion",
    difficulty: "medium",
    build: (r) => {
      const a = ri(r, -6, 6);
      const b = ri(r, -9, 9);
      const t = ri(r, 1, 4);
      const acc = 6 * t + 2 * a;
      return {
        prompt: `A particle moves along a line with position $s(t)=t^{3} ${term(a, "t^{2}")} ${term(b, "t")}$ for $t\\ge 0$. Find its acceleration at $t=${t}$.`,
        correct: `${acc}`,
        distractors: [`${3 * t * t + 2 * a * t + b}`, `${6 * t}`, `${acc + b}`],
        explanation: `$v(t)=3t^{2}${term(2 * a, "t")}${term(b, "")}$ and $a(t)=6t${term(2 * a, "")}$, so $a(${t})=${acc}$.`,
      };
    },
  },
  {
    id: "u4-linearization",
    unit: U4,
    topic: "linearization",
    difficulty: "medium",
    build: (r) => {
      const p = ri(r, 3, 12);
      const d = pick(r, [-2, -1, 1, 2, 3]);
      const base = p * p;
      const approx = p + d / (2 * p);
      return {
        prompt: `Use the tangent line to $f(x)=\\sqrt{x}$ at $x=${base}$ to approximate $\\sqrt{${base + d}}$.`,
        correct: dec(approx, 4),
        distractors: [dec(p + d, 4), dec(p + d / p, 4), dec(p - d / (2 * p), 4)],
        explanation: `$L(x)=${p}+\\frac{1}{${2 * p}}(x-${base})$, so $\\sqrt{${base + d}}\\approx ${p} + \\frac{${d}}{${2 * p}} = ${dec(approx, 4)}$.`,
      };
    },
  },
  {
    id: "u4-lhopital",
    unit: U4,
    topic: "lhopitals-rule",
    difficulty: "medium",
    build: (r) => {
      const a = ri(r, 2, 7);
      const b = ri(r, 2, 7);
      return {
        prompt: `Evaluate $\\displaystyle\\lim_{x\\to 0}\\frac{e^{${a}x}-1}{${b}x}$.`,
        correct: frac(a, b),
        distractors: [frac(b, a), `0`, `1`],
        explanation: `Both numerator and denominator go to $0$; L'Hôpital gives $\\lim \\frac{${a}e^{${a}x}}{${b}} = ${frac(a, b)}$.`,
      };
    },
  },
  {
    id: "u4-rate-context",
    unit: U4,
    topic: "rates-of-change-in-context",
    difficulty: "easy",
    mistakes: ["answer-not-in-context", "missing-units"],
    build: (r) => {
      const c = pick(r, CONTEXTS);
      const t = ri(r, 2, 9);
      const k = ri(r, 2, 15);
      return {
        prompt: `${c.thing.charAt(0).toUpperCase() + c.thing.slice(1)} enters ${c.vessel} at rate $R(t)$, measured in ${c.rateUnit}, where $t$ is in ${c.time}. If $R'(${t}) = ${k}$, what does this mean?`,
        correct: `\\text{The inflow rate is increasing by ${k} ${c.rateUnit} per ${c.time.replace(/s$/, "")} at } t=${t}.`,
        distractors: [
          `\\text{${k} ${c.unit} of ${c.thing} entered during the first ${t} ${c.time}.}`,
          `\\text{The amount of ${c.thing} is ${k} ${c.unit} at } t=${t}.`,
          `\\text{The inflow rate equals ${k} ${c.rateUnit} at } t=${t}.`,
        ],
        explanation: `$R'$ is the rate of change of a rate: its units are ${c.rateUnit} per ${c.time.replace(/s$/, "")}, so the inflow is speeding up by ${k} of those units at $t=${t}$.`,
      };
    },
  },

  /* ---------------- Unit 5 ---------------- */
  {
    id: "u5-local-min",
    unit: U5,
    topic: "first-derivative-test",
    difficulty: "medium",
    build: (r) => {
      const r1 = ri(r, -7, 1);
      const r2 = r1 + ri(r, 2, 6);
      return {
        prompt: `A differentiable function satisfies $f'(x)=(x ${term(-r1, "")})(x ${term(-r2, "")})$. At which $x$-value does $f$ have a local minimum?`,
        correct: `${r2}`,
        distractors: [`${r1}`, `${(r1 + r2) / 2}`, `\\text{No local minimum exists.}`],
        explanation: `$f'$ changes from negative to positive at $x=${r2}$, so the First Derivative Test gives a local minimum there.`,
      };
    },
  },
  {
    id: "u5-mvt",
    unit: U5,
    topic: "mean-value-theorem",
    difficulty: "medium",
    mistakes: ["mvt-conditions"],
    build: (r) => {
      const a = ri(r, -5, 2);
      const b = a + 2 * ri(r, 1, 5);
      return {
        prompt: `Let $f(x)=x^{2}$ on $[${a},${b}]$. Find the value of $c$ guaranteed by the Mean Value Theorem.`,
        correct: frac(a + b, 2),
        distractors: [`${a}`, `${b}`, frac(b - a, 2)],
        explanation: `$\\frac{f(${b})-f(${a})}{${b}-${a}} = ${a}+${b}$ and $f'(c)=2c$, so $c=\\frac{${a}+${b}}{2}=${frac(a + b, 2)}$.`,
      };
    },
  },
  {
    id: "u5-inflection",
    unit: U5,
    topic: "second-derivative-test",
    difficulty: "medium",
    build: (r) => {
      const a = 3 * ri(r, -4, 4);
      const b = ri(r, -6, 6);
      return {
        prompt: `For $f(x)=x^{3} ${term(a, "x^{2}")} ${term(b, "x")}$, find the $x$-coordinate of the inflection point.`,
        correct: `${-a / 3}`,
        distractors: [`${a / 3}`, `${-a}`, `${-2 * a / 3}`],
        explanation: `$f''(x)=6x ${term(2 * a, "")}$, which is zero at $x=${-a / 3}$ and changes sign there.`,
      };
    },
  },
  {
    id: "u5-candidates",
    unit: U5,
    topic: "local-and-global-extrema",
    difficulty: "medium",
    build: (r) => {
      const c = ri(r, 2, 6);
      const m = c + ri(r, 1, 4);
      const fMax = m ** 3 - 3 * c * c * m;
      const fCrit = -2 * c ** 3;
      return {
        prompt: `Let $f(x)=x^{3} - ${3 * c * c}x$ on $[0,${m}]$. What is the absolute maximum value of $f$?`,
        correct: `${Math.max(fMax, 0)}`,
        distractors: [`${fCrit}`, `${m}`, `${fMax + Math.abs(fCrit)}`],
        explanation: `Candidates are $x=0$, the critical value $x=${c}$, and $x=${m}$: $f(0)=0$, $f(${c})=${fCrit}$, $f(${m})=${fMax}$. The largest is $${Math.max(fMax, 0)}$.`,
      };
    },
  },
  {
    id: "u5-second-derivative-test",
    unit: U5,
    topic: "critical-points",
    difficulty: "easy",
    build: (r) => {
      const a = ri(r, 1, 7);
      return {
        prompt: `Given $f'(x)=3x^{2}-${3 * a * a}$ and $f''(x)=6x$, at which critical point does $f$ have a local minimum?`,
        correct: `x=${a}`,
        distractors: [`x=${-a}`, `x=0`, `x=${a * a}`],
        explanation: `Critical points are $x=\\pm ${a}$. Since $f''(${a})=${6 * a}>0$, $f$ has a local minimum at $x=${a}$.`,
      };
    },
  },
  {
    id: "u5-sign-chart",
    unit: U5,
    topic: "curve-sketching",
    difficulty: "medium",
    build: (r) => {
      const p = ri(r, -6, 0);
      const q = p + ri(r, 2, 5);
      return {
        prompt: `A function $f$ is differentiable everywhere, with $f'(x)>0$ on $(-\\infty,${p})$, $f'(x)<0$ on $(${p},${q})$, and $f'(x)>0$ on $(${q},\\infty)$. Which statement is true?`,
        correct: `\\text{$f$ has a local maximum at $x=${p}$ and a local minimum at $x=${q}$.}`,
        distractors: [
          `\\text{$f$ has a local minimum at $x=${p}$ and a local maximum at $x=${q}$.}`,
          `\\text{$f$ has inflection points at $x=${p}$ and $x=${q}$.}`,
          `\\text{$f$ is increasing on $(${p},${q})$.}`,
        ],
        explanation: `$f'$ changes $+\\to-$ at $x=${p}$ (local max) and $-\\to+$ at $x=${q}$ (local min).`,
      };
    },
  },

  /* ---------------- Unit 6 ---------------- */
  {
    id: "u6-definite-poly",
    unit: U6,
    topic: "fundamental-theorem-of-calculus",
    difficulty: "easy",
    mistakes: ["fundamental-thm-skip-c"],
    build: (r) => {
      const a = 3 * ri(r, 1, 4);
      const c = ri(r, -6, 6);
      const b = ri(r, 1, 4);
      const val = (a * b ** 3) / 3 + c * b;
      return {
        prompt: `Evaluate $\\displaystyle\\int_{0}^{${b}}\\left(${a}x^{2} ${term(c, "")}\\right)dx$.`,
        correct: `${val}`,
        distractors: [`${a * b ** 3 + c * b}`, `${(a * b ** 3) / 3}`, `${2 * a * b + c}`],
        explanation: `Antiderivative: $\\frac{${a}}{3}x^{3} ${term(c, "x")}$. Evaluating from $0$ to $${b}$ gives $${val}$.`,
      };
    },
  },
  {
    id: "u6-ftc-chain",
    unit: U6,
    topic: "accumulation-functions",
    difficulty: "hard",
    mistakes: ["chain-rule-skip"],
    build: (r) => {
      const c = ri(r, 1, 8);
      const t = ri(r, 1, 4);
      const val = 2 * t * (t * t + c);
      return {
        prompt: `Let $g(x)=\\displaystyle\\int_{0}^{x^{2}} (t ${term(c, "")})\\,dt$. Find $g'(${t})$.`,
        correct: `${val}`,
        distractors: [`${t * t + c}`, `${2 * t}`, `${t + c}`],
        explanation: `By FTC with the chain rule, $g'(x)=(x^{2}${term(c, "")})\\cdot 2x$, so $g'(${t}) = ${val}$.`,
      };
    },
  },
  {
    id: "u6-usub",
    unit: U6,
    topic: "u-substitution",
    difficulty: "medium",
    mistakes: ["wrong-bounds"],
    build: (r) => {
      const c = ri(r, 1, 5);
      const b = ri(r, 1, 3);
      const n = ri(r, 1, 2);
      const val = ((b * b + c) ** (n + 1) - c ** (n + 1)) / (2 * (n + 1));
      return {
        prompt: `Evaluate $\\displaystyle\\int_{0}^{${b}} x\\left(x^{2} ${term(c, "")}\\right)^{${n}} dx$.`,
        correct: frac((b * b + c) ** (n + 1) - c ** (n + 1), 2 * (n + 1)),
        distractors: [
          frac((b * b + c) ** (n + 1) - c ** (n + 1), n + 1),
          frac((b * b + c) ** (n + 1), 2 * (n + 1)),
          `${dec(val * 2, 3)}`,
        ],
        explanation: `Let $u=x^{2}${term(c, "")}$, $du=2x\\,dx$. The integral becomes $\\frac{1}{2}\\int_{${c}}^{${b * b + c}} u^{${n}}du = ${frac((b * b + c) ** (n + 1) - c ** (n + 1), 2 * (n + 1))}$.`,
      };
    },
  },
  {
    id: "u6-riemann",
    unit: U6,
    topic: "riemann-sums",
    difficulty: "medium",
    mistakes: ["riemann-orientation", "table-trap-vs-simpsons"],
    build: (r) => {
      const h = ri(r, 1, 3);
      const v = [ri(r, 1, 9), ri(r, 1, 9), ri(r, 1, 9), ri(r, 1, 9)];
      const left = h * (v[0] + v[1] + v[2]);
      const right = h * (v[1] + v[2] + v[3]);
      const xs = [0, h, 2 * h, 3 * h];
      return {
        prompt: `The table gives values of a continuous function $f$: $f(${xs[0]})=${v[0]}$, $f(${xs[1]})=${v[1]}$, $f(${xs[2]})=${v[2]}$, $f(${xs[3]})=${v[3]}$. Use a left Riemann sum with the three subintervals of equal width to approximate $\\int_{0}^{${3 * h}} f(x)\\,dx$.`,
        correct: `${left}`,
        distractors: [`${right}`, `${(left + right) / 2}`, `${v[0] + v[1] + v[2]}`],
        explanation: `Each subinterval has width $${h}$; using left endpoints: $${h}(${v[0]}+${v[1]}+${v[2]}) = ${left}$.`,
      };
    },
  },
  {
    id: "u6-accumulation",
    unit: U6,
    topic: "accumulation-functions",
    difficulty: "easy",
    build: (r) => {
      const a = ri(r, 1, 5);
      const x = ri(r, 2, 6);
      const val = x * x - a * a;
      return {
        prompt: `Let $g(x)=\\displaystyle\\int_{${a}}^{x} 2t\\,dt$. Find $g(${x})$.`,
        correct: `${val}`,
        distractors: [`${x * x}`, `${2 * x - 2 * a}`, `${x * x + a * a}`],
        explanation: `$g(x)=x^{2}-${a * a}$, so $g(${x}) = ${x * x} - ${a * a} = ${val}$.`,
      };
    },
  },
  {
    id: "u6-average-value",
    unit: U6,
    topic: "fundamental-theorem-of-calculus",
    difficulty: "medium",
    mistakes: ["average-value-skip-divide"],
    build: (r) => {
      const a = ri(r, 1, 6);
      const b = ri(r, -8, 8);
      const p = ri(r, 0, 3);
      const q = p + ri(r, 2, 6);
      const avg = (a * (p + q)) / 2 + b;
      return {
        prompt: `Find the average value of $f(x)=${a}x ${term(b, "")}$ on $[${p},${q}]$.`,
        correct: `${avg}`,
        distractors: [`${a * (q - p) + b}`, `${(a * (q * q - p * p)) / 2 + b * (q - p)}`, `${a * q + b}`],
        explanation: `Average value $=\\frac{1}{${q}-${p}}\\int_{${p}}^{${q}} f = ${avg}$.`,
      };
    },
  },

  /* ---------------- Unit 7 ---------------- */
  {
    id: "u7-exponential",
    unit: U7,
    topic: "exponential-growth-and-decay",
    difficulty: "easy",
    mistakes: ["diffeq-separate-vars"],
    build: (r) => {
      const A = ri(r, 2, 20);
      const k = ri(r, 2, 6);
      return {
        prompt: `Solve $\\dfrac{dy}{dt} = ${k}y$ with $y(0)=${A}$, and give $y(1)$.`,
        correct: `${A}e^{${k}}`,
        distractors: [`${A}e^{${k}} - ${A}`, `${A * k}e`, `${A} + ${k}`],
        explanation: `Separating gives $y=${A}e^{${k}t}$, so $y(1)=${A}e^{${k}}$.`,
      };
    },
  },
  {
    id: "u7-separable-xy",
    unit: U7,
    topic: "separable-differential-equations",
    difficulty: "medium",
    mistakes: ["diffeq-separate-vars"],
    build: (r) => {
      const [x0, A, hyp] = pick(r, TRIPLES);
      return {
        prompt: `Solve $\\dfrac{dy}{dx} = \\dfrac{x}{y}$ with $y(0)=${A}$, $y>0$. Find $y(${x0})$.`,
        correct: `${hyp}`,
        distractors: [`${A + x0}`, `${dec(Math.sqrt(x0 * x0 + A), 3)}`, `${A}`],
        explanation: `Separating: $y^{2}=x^{2}+${A * A}$, so $y(${x0})=\\sqrt{${x0 * x0}+${A * A}} = ${hyp}$.`,
      };
    },
  },
  {
    id: "u7-euler",
    unit: U7,
    topic: "eulers-method",
    difficulty: "hard",
    mistakes: ["eulers-method-step"],
    build: (r) => {
      const A = ri(r, 1, 6);
      const h = pick(r, [0.5, 0.25, 0.2, 1]);
      const y1 = A + h * (0 + A);
      const y2 = y1 + h * (h + y1);
      return {
        prompt: `Use Euler's method with step size $h=${h}$ and two steps to approximate $y(${2 * h})$ for $\\dfrac{dy}{dx}=x+y$, $y(0)=${A}$.`,
        correct: dec(y2, 4),
        distractors: [dec(y1, 4), dec(A + 2 * h * A, 4), dec(y2 + h, 4)],
        explanation: `Step 1: $y_1 = ${A} + ${h}(0+${A}) = ${dec(y1, 4)}$. Step 2: $y_2 = ${dec(y1, 4)} + ${h}(${h}+${dec(y1, 4)}) = ${dec(y2, 4)}$.`,
      };
    },
  },
  {
    id: "u7-logistic",
    unit: U7,
    topic: "logistic-growth",
    difficulty: "medium",
    build: (r) => {
      const M = 100 * ri(r, 2, 20);
      const k = ri(r, 2, 9);
      return {
        prompt: `A population satisfies $\\dfrac{dP}{dt} = 0.0${k}P\\left(1-\\dfrac{P}{${M}}\\right)$. For what population is the population growing fastest?`,
        correct: `${M / 2}`,
        distractors: [`${M}`, `${M / 4}`, `${0.0 + k}`],
        explanation: `Logistic growth is fastest at half the carrying capacity: $P=\\frac{${M}}{2}=${M / 2}$.`,
      };
    },
  },
  {
    id: "u7-separable-poly",
    unit: U7,
    topic: "separable-differential-equations",
    difficulty: "easy",
    mistakes: ["fundamental-thm-skip-c"],
    build: (r) => {
      const A = ri(r, 1, 9);
      const x = ri(r, 1, 4);
      return {
        prompt: `If $\\dfrac{dy}{dx} = 3x^{2}$ and $y(0)=${A}$, find $y(${x})$.`,
        correct: `${x ** 3 + A}`,
        distractors: [`${x ** 3}`, `${3 * x * x + A}`, `${x ** 3 - A}`],
        explanation: `$y = x^{3} + C$ with $C=${A}$, so $y(${x}) = ${x ** 3 + A}$.`,
      };
    },
  },
  {
    id: "u7-half-life",
    unit: U7,
    topic: "exponential-growth-and-decay",
    difficulty: "medium",
    build: (r) => {
      const T = ri(r, 2, 30);
      return {
        prompt: `A substance decays according to $y=y_0e^{-kt}$ and has a half-life of $${T}$ years. What is $k$?`,
        correct: `\\dfrac{\\ln 2}{${T}}`,
        distractors: [`\\dfrac{${T}}{\\ln 2}`, `\\dfrac{\\ln(1/2)}{${T}}`, `${dec(1 / T, 4)}`],
        explanation: `Setting $\\frac{1}{2}=e^{-k(${T})}$ gives $k = \\frac{\\ln 2}{${T}}$.`,
      };
    },
  },

  /* ---------------- Unit 8 ---------------- */
  {
    id: "u8-area-between",
    unit: U8,
    topic: "area-between-curves",
    difficulty: "medium",
    mistakes: ["wrong-bounds"],
    build: (r) => {
      const a = ri(r, 2, 9);
      return {
        prompt: `Find the area of the region enclosed by $y=${a}x$ and $y=x^{2}$.`,
        correct: frac(a ** 3, 6),
        distractors: [frac(a ** 3, 3), frac(a ** 3, 2), frac(a ** 2, 6)],
        explanation: `They intersect at $x=0$ and $x=${a}$: $\\int_0^{${a}}(${a}x-x^{2})dx = \\frac{${a}^{3}}{6} = ${frac(a ** 3, 6)}$.`,
      };
    },
  },
  {
    id: "u8-disk",
    unit: U8,
    topic: "volume-disks-and-washers",
    difficulty: "medium",
    build: (r) => {
      const b = ri(r, 2, 8);
      return {
        prompt: `The region bounded by $y=\\sqrt{x}$, $y=0$, and $x=${b}$ is revolved about the $x$-axis. Find the volume.`,
        correct: `${frac(b * b, 2)}\\pi`,
        distractors: [`${b * b}\\pi`, `${frac(b ** 3, 3)}\\pi`, `${frac(2 * b ** 1.5, 3)}\\pi`],
        explanation: `$V=\\pi\\int_0^{${b}} x\\,dx = \\pi\\frac{${b}^{2}}{2} = ${frac(b * b, 2)}\\pi$.`,
      };
    },
  },
  {
    id: "u8-cross-sections",
    unit: U8,
    topic: "volume-known-cross-sections",
    difficulty: "hard",
    build: (r) => {
      const a = ri(r, 2, 9);
      return {
        prompt: `A solid has base the region bounded by $y=${a}-x$, $x=0$, and $y=0$. Cross sections perpendicular to the $x$-axis are squares. Find the volume.`,
        correct: frac(a ** 3, 3),
        distractors: [frac(a ** 3, 6), frac(a ** 2, 2), `${a ** 3}`],
        explanation: `$V=\\int_0^{${a}}(${a}-x)^{2}dx = \\frac{${a}^{3}}{3} = ${frac(a ** 3, 3)}$.`,
      };
    },
  },
  {
    id: "u8-arc-length-setup",
    unit: U8,
    topic: "arc-length",
    difficulty: "medium",
    build: (r) => {
      const a = ri(r, 2, 6);
      const b = a + ri(r, 1, 5);
      const k = ri(r, 2, 5);
      return {
        prompt: `Which integral gives the length of $y=${k}x^{2}$ from $x=${a}$ to $x=${b}$?`,
        correct: `\\int_{${a}}^{${b}}\\sqrt{1+${4 * k * k}x^{2}}\\,dx`,
        distractors: [
          `\\int_{${a}}^{${b}}\\sqrt{1+${2 * k}x}\\,dx`,
          `\\int_{${a}}^{${b}}\\sqrt{1+${k * k}x^{4}}\\,dx`,
          `\\int_{${a}}^{${b}}\\left(1+${2 * k}x\\right)dx`,
        ],
        explanation: `$y'=${2 * k}x$, so the integrand is $\\sqrt{1+(${2 * k}x)^{2}} = \\sqrt{1+${4 * k * k}x^{2}}$.`,
      };
    },
  },
  {
    id: "u8-distance",
    unit: U8,
    topic: "accumulation-in-context",
    difficulty: "hard",
    mistakes: ["answer-not-in-context"],
    build: (r) => {
      const c = ri(r, 1, 5);
      const b = c + ri(r, 1, 5);
      const total = (c * c) / 2 + (b - c) ** 2 / 2;
      const disp = (b * b) / 2 - c * b;
      return {
        prompt: `A particle has velocity $v(t)=t-${c}$ for $0\\le t\\le ${b}$. Find the total distance traveled.`,
        correct: frac(c * c + (b - c) ** 2, 2),
        distractors: [frac(b * b - 2 * c * b, 2), `${dec(Math.abs(disp), 3)}`, `${dec(total * 2, 3)}`],
        explanation: `$v<0$ on $[0,${c})$ and $v>0$ on $(${c},${b}]$: distance $=\\frac{${c}^{2}}{2}+\\frac{(${b}-${c})^{2}}{2} = ${frac(c * c + (b - c) ** 2, 2)}$.`,
      };
    },
  },
  {
    id: "u8-net-change",
    unit: U8,
    topic: "accumulation-in-context",
    difficulty: "medium",
    mistakes: ["missing-units", "answer-not-in-context"],
    build: (r) => {
      const ctx = pick(r, CONTEXTS);
      const inRate = ri(r, 5, 20);
      const outRate = ri(r, 1, 4);
      const T = ri(r, 2, 8);
      const start = ri(r, 10, 90);
      const net = start + (inRate - outRate) * T;
      return {
        prompt: `${ctx.vessel.charAt(0).toUpperCase() + ctx.vessel.slice(1)} holds ${start} ${ctx.unit} of ${ctx.thing} at $t=0$. ${ctx.thing.charAt(0).toUpperCase() + ctx.thing.slice(1)} enters at a constant $${inRate}$ ${ctx.rateUnit} and leaves at a constant $${outRate}$ ${ctx.rateUnit}. How much is in ${ctx.vessel} at $t=${T}$?`,
        correct: `${net} \\text{ ${ctx.unit}}`,
        distractors: [
          `${(inRate - outRate) * T} \\text{ ${ctx.unit}}`,
          `${start + inRate * T} \\text{ ${ctx.unit}}`,
          `${inRate - outRate} \\text{ ${ctx.unit}}`,
        ],
        explanation: `Net change $=\\int_0^{${T}}(${inRate}-${outRate})dt = ${(inRate - outRate) * T}$, added to the initial ${start} gives ${net} ${ctx.unit}.`,
      };
    },
  },

  /* ---------------- Unit 9 ---------------- */
  {
    id: "u9-parametric-slope",
    unit: U9,
    topic: "parametric-derivatives",
    difficulty: "medium",
    build: (r) => {
      const a = ri(r, 1, 6);
      const b = ri(r, 1, 9);
      const t = ri(r, 1, 4);
      return {
        prompt: `A curve is given by $x(t)=t^{2} ${term(a, "")}$ and $y(t)=t^{3} ${term(b, "t")}$. Find $\\dfrac{dy}{dx}$ at $t=${t}$.`,
        correct: frac(3 * t * t + b, 2 * t),
        distractors: [frac(2 * t, 3 * t * t + b), `${6 * t}`, frac(3 * t * t, 2 * t)],
        explanation: `$\\frac{dy}{dx} = \\frac{3t^{2}${term(b, "")}}{2t}$, which at $t=${t}$ equals $${frac(3 * t * t + b, 2 * t)}$.`,
      };
    },
  },
  {
    id: "u9-speed",
    unit: U9,
    topic: "vector-valued-functions",
    difficulty: "medium",
    build: (r) => {
      const [p, q, s] = pick(r, TRIPLES);
      const t = ri(r, 1, 4);
      return {
        prompt: `A particle has velocity vector $\\langle ${p}, ${q}\\rangle$ at $t=${t}$. What is its speed at that instant?`,
        correct: `${s}`,
        distractors: [`${p + q}`, `${p * q}`, `${dec((p + q) / 2, 2)}`],
        explanation: `Speed $=\\sqrt{${p}^{2}+${q}^{2}} = ${s}$.`,
      };
    },
  },
  {
    id: "u9-second-derivative",
    unit: U9,
    topic: "parametric-derivatives",
    difficulty: "hard",
    build: () => ({
      prompt: `For a curve defined parametrically by $x(t)$ and $y(t)$, which expression equals $\\dfrac{d^{2}y}{dx^{2}}$?`,
      correct: `\\dfrac{\\frac{d}{dt}\\left(\\frac{dy/dt}{dx/dt}\\right)}{dx/dt}`,
      distractors: [
        `\\dfrac{d^{2}y/dt^{2}}{d^{2}x/dt^{2}}`,
        `\\dfrac{d}{dt}\\left(\\dfrac{dy/dt}{dx/dt}\\right)`,
        `\\dfrac{dy/dt}{d^{2}x/dt^{2}}`,
      ],
      explanation: `Differentiate $dy/dx$ with respect to $t$, then divide by $dx/dt$ to convert back to an $x$-derivative.`,
    }),
  },
  {
    id: "u9-polar-petal",
    unit: U9,
    topic: "polar-area",
    difficulty: "hard",
    mistakes: ["polar-area-formula"],
    build: (r) => {
      const a = ri(r, 1, 6);
      return {
        prompt: `Find the area enclosed by one petal of $r=${a}\\sin(2\\theta)$.`,
        correct: `${frac(a * a, 8)}\\pi`,
        distractors: [`${frac(a * a, 4)}\\pi`, `${frac(a * a, 2)}\\pi`, `${a * a}\\pi`],
        explanation: `$A=\\frac{1}{2}\\int_0^{\\pi/2} ${a * a}\\sin^{2}(2\\theta)d\\theta = \\frac{${a * a}\\pi}{8}$.`,
      };
    },
  },
  {
    id: "u9-polar-setup",
    unit: U9,
    topic: "polar-area",
    difficulty: "medium",
    mistakes: ["polar-area-formula", "wrong-bounds"],
    build: (r) => {
      const a = ri(r, 2, 8);
      return {
        prompt: `Which integral gives the area inside $r=${a}(1+\\cos\\theta)$ for $0\\le\\theta\\le\\pi$?`,
        correct: `\\dfrac{1}{2}\\int_{0}^{\\pi} ${a * a}(1+\\cos\\theta)^{2}\\,d\\theta`,
        distractors: [
          `\\int_{0}^{\\pi} ${a}(1+\\cos\\theta)\\,d\\theta`,
          `\\dfrac{1}{2}\\int_{0}^{2\\pi} ${a * a}(1+\\cos\\theta)^{2}\\,d\\theta`,
          `\\int_{0}^{\\pi} ${a * a}(1+\\cos\\theta)^{2}\\,d\\theta`,
        ],
        explanation: `Polar area is $\\frac{1}{2}\\int r^{2}d\\theta$ over the given $\\theta$-interval.`,
      };
    },
  },
  {
    id: "u9-vector-motion",
    unit: U9,
    topic: "vector-valued-functions",
    difficulty: "medium",
    build: (r) => {
      const a = ri(r, 1, 5);
      const t = ri(r, 1, 4);
      return {
        prompt: `A particle has position $\\langle ${a}t^{2}, t^{3}\\rangle$. Find its acceleration vector at $t=${t}$.`,
        correct: `\\langle ${2 * a}, ${6 * t}\\rangle`,
        distractors: [`\\langle ${2 * a * t}, ${3 * t * t}\\rangle`, `\\langle ${a * t * t}, ${t ** 3}\\rangle`, `\\langle ${2 * a}, ${3 * t}\\rangle`],
        explanation: `Velocity is $\\langle ${2 * a}t, 3t^{2}\\rangle$ and acceleration is $\\langle ${2 * a}, 6t\\rangle$, which at $t=${t}$ is $\\langle ${2 * a}, ${6 * t}\\rangle$.`,
      };
    },
  },

  /* ---------------- Unit 10 ---------------- */
  {
    id: "u10-geometric",
    unit: U10,
    topic: "geometric-and-p-series",
    difficulty: "easy",
    build: (r) => {
      const a = ri(r, 1, 9);
      const p = ri(r, 1, 4);
      const q = p + ri(r, 1, 5);
      return {
        prompt: `Find the sum $\\displaystyle\\sum_{n=0}^{\\infty} ${a}\\left(${frac(p, q)}\\right)^{n}$.`,
        correct: frac(a * q, q - p),
        distractors: [frac(a * q, q + p), frac(a * p, q - p), `\\text{The series diverges.}`],
        explanation: `Geometric with $|r|<1$: sum $=\\frac{${a}}{1-${frac(p, q)}} = ${frac(a * q, q - p)}$.`,
      };
    },
  },
  {
    id: "u10-ratio-radius",
    unit: U10,
    topic: "ratio-test",
    difficulty: "medium",
    mistakes: ["series-interval-endpoints"],
    build: (r) => {
      const a = ri(r, 2, 9);
      const c = ri(r, -6, 6);
      return {
        prompt: `Find the radius of convergence of $\\displaystyle\\sum_{n=1}^{\\infty}\\frac{(x ${term(-c, "")})^{n}}{${a}^{n}\\,n}$.`,
        correct: `${a}`,
        distractors: [frac(1, a), `${c}`, `\\infty`],
        explanation: `The ratio test gives $\\frac{|x-${c}|}{${a}}<1$, so $R=${a}$.`,
      };
    },
  },
  {
    id: "u10-p-series",
    unit: U10,
    topic: "geometric-and-p-series",
    difficulty: "easy",
    mistakes: ["series-test-justify"],
    build: (r) => {
      const num = ri(r, 1, 5);
      const den = ri(r, 1, 4);
      const p = num / den;
      const conv = p > 1;
      return {
        prompt: `Does $\\displaystyle\\sum_{n=1}^{\\infty}\\frac{1}{n^{${frac(num, den)}}}$ converge or diverge?`,
        correct: conv
          ? `\\text{Converges, since } p = ${frac(num, den)} > 1.`
          : `\\text{Diverges, since } p = ${frac(num, den)} \\le 1.`,
        distractors: [
          conv ? `\\text{Diverges, since } p = ${frac(num, den)} \\le 1.` : `\\text{Converges, since } p = ${frac(num, den)} > 1.`,
          `\\text{Converges, because the terms approach } 0.`,
          `\\text{Diverges by the nth-term test.}`,
        ],
        explanation: `A $p$-series converges exactly when $p>1$; here $p=${frac(num, den)}$.`,
      };
    },
  },
  {
    id: "u10-taylor-coefficient",
    unit: U10,
    topic: "taylor-and-maclaurin-series",
    difficulty: "medium",
    build: (r) => {
      const a = ri(r, 2, 5);
      const n = ri(r, 2, 5);
      const fact = [1, 1, 2, 6, 24, 120][n];
      return {
        prompt: `In the Maclaurin series for $f(x)=e^{${a}x}$, what is the coefficient of $x^{${n}}$?`,
        correct: frac(a ** n, fact),
        distractors: [frac(1, fact), `${a ** n}`, frac(a, fact)],
        explanation: `$e^{${a}x}=\\sum \\frac{(${a}x)^{n}}{n!}$, so the $x^{${n}}$ coefficient is $\\frac{${a}^{${n}}}{${n}!} = ${frac(a ** n, fact)}$.`,
      };
    },
  },
  {
    id: "u10-alternating-error",
    unit: U10,
    topic: "alternating-series-test",
    difficulty: "medium",
    mistakes: ["alternating-series-error"],
    build: (r) => {
      const p = ri(r, 2, 4);
      const N = ri(r, 2, 8);
      return {
        prompt: `The alternating series $\\displaystyle\\sum_{n=1}^{\\infty}\\frac{(-1)^{n+1}}{n^{${p}}}$ is approximated by its first $${N}$ terms. What is the best bound on the error?`,
        correct: frac(1, (N + 1) ** p),
        distractors: [frac(1, N ** p), frac(1, (N + 1) * p), frac(1, (N + 2) ** p)],
        explanation: `For a convergent alternating series the error is at most the first omitted term: $\\frac{1}{${N + 1}^{${p}}} = ${frac(1, (N + 1) ** p)}$.`,
      };
    },
  },
  {
    id: "u10-power-series-sub",
    unit: U10,
    topic: "power-series-operations",
    difficulty: "medium",
    build: (r) => {
      const a = ri(r, 2, 9);
      const b = ri(r, 2, 5);
      const n = ri(r, 2, 4);
      return {
        prompt: `Find the coefficient of $x^{${n}}$ in the Maclaurin series for $f(x)=\\dfrac{${a}}{1-${b}x}$.`,
        correct: `${a * b ** n}`,
        distractors: [`${a * b}`, `${b ** n}`, `${a}`],
        explanation: `$\\frac{${a}}{1-${b}x} = ${a}\\sum(${b}x)^{n}$, so the $x^{${n}}$ coefficient is $${a}\\cdot ${b}^{${n}} = ${a * b ** n}$.`,
      };
    },
  },
];
