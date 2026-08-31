import { ri, pick, frac, dec, term, type RNG, type QuestionTemplate } from "../question-templates";
import { sampleParametric, samplePolar, fitWindow, type Figure } from "../figures";

const U9 = "unit-9-parametric-polar-vector";
const U10 = "unit-10-infinite-sequences-and-series";

/** signed coefficient, dropping redundant 1s and rendering -1 as a bare minus */
function cf(c: number, body: string): string {
  if (c === 1) return body;
  if (c === -1) return `-${body}`;
  return `${c}${body}`;
}

function powFrac(n: number, d: number): string {
  return frac(n, d);
}

export const UNIT_09_10_TEMPLATES: QuestionTemplate[] = [
  /* =========================================================================
   * UNIT 9
   * ========================================================================= */

  /* ---------- parametric-derivatives:second ---------- */
  {
    id: "n9-param-second-1",
    unit: U9,
    topic: "parametric-derivatives",
    difficulty: "hard",
    track: "BC",
    manifestation: "parametric-derivatives:second",
    build: (r) => {
      const a = ri(r, 2, 5);
      const b = ri(r, 2, 6);
      const t = ri(r, 1, 3);
      // x = a t^2, y = b t^3
      // dx/dt = 2a t, dy/dt = 3b t^2, dy/dx = 3b t / (2a)
      // d/dt(dy/dx) = 3b/(2a); d2y/dx2 = (3b/(2a)) / (2a t) = 3b/(4 a^2 t)
      const val = frac(3 * b, 4 * a * a * t);
      return {
        prompt: `A curve is defined by $x=${a}t^{2}$ and $y=${b}t^{3}$. Find $\\dfrac{d^{2}y}{dx^{2}}$ at $t=${t}$.`,
        correct: val,
        distractors: [
          frac(3 * b, 2 * a),
          frac(3 * b * t, 2 * a),
          frac(3 * b, 4 * a * a),
        ],
        explanation: `Here $\\frac{dy}{dx}=\\frac{3${b}t^{2}}{2${a}t}=\\frac{3${b}t}{2${a}}$, a function of $t$. Differentiating this with respect to $t$ gives $\\frac{3${b}}{2${a}}$, and dividing by $\\frac{dx}{dt}=2${a}t$ gives $\\frac{d^{2}y}{dx^{2}}=\\frac{3${b}}{4${a}^{2}t}$, which at $t=${t}$ equals $${val}$.`,
      };
    },
  },
  {
    id: "n9-param-second-2",
    unit: U9,
    topic: "parametric-derivatives",
    difficulty: "hard",
    track: "BC",
    manifestation: "parametric-derivatives:second",
    build: (r) => {
      const a = ri(r, 2, 4);
      const b = ri(r, 2, 4);
      const t0 = ri(r, 1, 2) * Math.PI / 4 === 0 ? 0 : 0; // unused, keep simple
      const k = ri(r, 1, 3);
      // x = a cos(t), y = b sin(t) at t = pi/2 * k where sin,cos nice? use t=0 for simplicity family variety
      // Use x = a t, y = b t^3 + t for variety with concavity language
      const c = ri(r, 1, 5);
      const t = ri(r, 1, 3);
      // dx/dt = a, dy/dt = 3b t^2 + c, dy/dx = (3b t^2+c)/a
      // d/dt(dy/dx) = 6bt/a; d2y/dx2 = (6bt/a)/a = 6bt/a^2
      const val = frac(6 * b * t, a * a);
      return {
        prompt: `For the curve $x=${a}t$ and $y=${b}t^{3} ${term(c, "t")}$, which expression gives $\\dfrac{d^{2}y}{dx^{2}}$ as a function of $t$, evaluated at $t=${t}$?`,
        correct: val,
        distractors: [
          frac(6 * b * t, a),
          frac(3 * b * t * t + c, a),
          frac(6 * b * t + c, a * a),
        ],
        explanation: `First $\\frac{dy}{dx}=\\frac{3${b}t^{2}${term(c, "")}}{${a}}$. Differentiating with respect to $t$ gives $\\frac{6${b}t}{${a}}$, and dividing again by $\\frac{dx}{dt}=${a}$ gives $\\frac{d^{2}y}{dx^{2}}=\\frac{6${b}t}{${a}^{2}}$. At $t=${t}$ this is $${val}$.`,
      };
    },
  },
  {
    id: "n9-param-second-3",
    unit: U9,
    topic: "parametric-derivatives",
    difficulty: "hard",
    track: "BC",
    manifestation: "parametric-derivatives:second",
    build: (r) => {
      const a = ri(r, 2, 4);
      const b = ri(r, 2, 4);
      // x = a t - t^2 style, y = b t^2
      const t = ri(r, 1, 3);
      // dx/dt = a - 2t, dy/dt = 2b t, dy/dx = 2bt/(a-2t)
      // guard a-2t != 0
      const adj = a + 2 * t + 1; // ensure a stays big relative to t so denom nonzero
      const A = adj;
      const dxdt = A - 2 * t;
      const dydx_num = 2 * b * t;
      // d/dt(dy/dx) via quotient rule: [2b(A-2t) - 2bt(-2)] / (A-2t)^2 = [2bA -4bt +4bt]/(A-2t)^2 = 2bA/(A-2t)^2
      const ddt = frac(2 * b * A, dxdt * dxdt);
      const val = frac(2 * b * A, dxdt * dxdt * dxdt);
      return {
        prompt: `A curve satisfies $x=${A}t - t^{2}$ and $y=${b}t^{2}$. Determine $\\dfrac{d^{2}y}{dx^{2}}$ at $t=${t}$.`,
        correct: val,
        distractors: [
          ddt,
          frac(2 * b, dxdt),
          frac(2 * b * A, dxdt * dxdt) + "",
        ],
        explanation: `With $\\frac{dy}{dx}=\\frac{2${b}t}{${A}-2t}$, the quotient rule gives $\\frac{d}{dt}\\left[\\frac{dy}{dx}\\right]=\\frac{2${b}(${A})}{(${A}-2t)^{2}}$. Dividing this by $\\frac{dx}{dt}=${A}-2t$ once more gives $\\frac{d^{2}y}{dx^{2}}=\\frac{2${b}(${A})}{(${A}-2t)^{3}}$, which at $t=${t}$ is $${val}$.`,
      };
    },
  },

  /* ---------- parametric-derivatives:error-analysis ---------- */
  {
    id: "n9-param-error-1",
    unit: U9,
    topic: "parametric-derivatives",
    difficulty: "medium",
    track: "BC",
    manifestation: "parametric-derivatives:error-analysis",
    build: (r) => {
      const a = ri(r, 2, 6);
      const b = ri(r, 2, 6);
      const t = ri(r, 1, 4);
      // x = a t^2, y = b t^3, correct dy/dx = 3bt^2/(2at) = 3bt/(2a)
      const correct = frac(3 * b * t, 2 * a);
      const studentWrong = frac(3 * b * t * t, 2 * a * t); // same value actually equal; need genuinely wrong distractor
      // student forgot to divide by dx/dt, just wrote dy/dt
      const wrong1 = `${3 * b * t * t}`;
      // student inverted: used dx/dt over dy/dt
      const wrong2 = frac(2 * a * t, 3 * b * t * t);
      // student used dy/dx = dy/dt * dx/dt (multiplied instead of divided)
      const wrong3 = `${3 * b * t * t * 2 * a * t}`;
      return {
        prompt: `A student computes $\\dfrac{dy}{dx}$ for $x=${a}t^{2}$, $y=${b}t^{3}$ at $t=${t}$ by finding $\\frac{dy}{dt}=${3 * b}t^{2}$ and $\\frac{dx}{dt}=${2 * a}t$, but instead of dividing, multiplies these two derivatives together. What value does the student report, and what should the correct value be?`,
        correct: `\\text{Student: } ${wrong3}\\text{; correct value: } ${correct}`,
        distractors: [
          `\\text{Student: } ${wrong1}\\text{; correct value: } ${correct}`,
          `\\text{Student: } ${wrong3}\\text{; correct value: } ${wrong2}`,
          `\\text{Student: } ${correct}\\text{; correct value: } ${wrong3}`,
        ],
        explanation: `$\\frac{dy}{dx}=\\frac{dy/dt}{dx/dt}=\\frac{${3 * b}t^{2}}{${2 * a}t}=\\frac{3${b}t}{2${a}}=${correct}$ at $t=${t}$. Multiplying instead of dividing gives $${3 * b * t * t}\\cdot ${2 * a * t}=${wrong3}$, an unrelated and much larger number.`,
      };
    },
  },
  {
    id: "n9-param-error-2",
    unit: U9,
    topic: "parametric-derivatives",
    difficulty: "medium",
    track: "BC",
    manifestation: "parametric-derivatives:error-analysis",
    build: (r) => {
      const a = ri(r, 2, 5);
      const b = ri(r, 2, 5);
      const t = ri(r, 1, 3);
      // x = a t^3, y = b t^2. dy/dx = 2bt/(3at^2) = 2b/(3at)
      const correct = frac(2 * b, 3 * a * t);
      // A student instead writes dx/dy (reciprocal)
      const flipped = frac(3 * a * t, 2 * b);
      return {
        prompt: `For the curve $x=${a}t^{3}$, $y=${b}t^{2}$, a student wants $\\dfrac{dy}{dx}$ at $t=${t}$ but accidentally computes $\\dfrac{dx/dt}{dy/dt}$ instead of $\\dfrac{dy/dt}{dx/dt}$. Which of these is the student's (incorrect) result?`,
        correct: flipped,
        distractors: [
          correct,
          frac(2 * b * t, 3 * a),
          frac(3 * a, 2 * b * t),
        ],
        explanation: `Correctly, $\\frac{dy}{dx}=\\frac{2${b}t}{3${a}t^{2}}=\\frac{2${b}}{3${a}t}=${correct}$. Inverting the ratio instead gives $\\frac{3${a}t^{2}}{2${b}t}=\\frac{3${a}t}{2${b}}=${flipped}$, the reciprocal of the correct slope.`,
      };
    },
  },
  {
    id: "n9-param-error-3",
    unit: U9,
    topic: "parametric-derivatives",
    difficulty: "medium",
    track: "BC",
    manifestation: "parametric-derivatives:error-analysis",
    build: (r) => {
      const a = ri(r, 2, 6);
      const b = ri(r, 2, 6);
      const t = ri(r, 1, 3);
      // x = a t^2 + t, y = b t^2. dx/dt = 2at+1, dy/dt = 2bt
      const dxdt = 2 * a * t + 1;
      const dydt = 2 * b * t;
      const correct = frac(dydt, dxdt);
      // student forgets the "+1" term in dx/dt, uses only 2at
      const wrong = frac(dydt, 2 * a * t);
      return {
        prompt: `Given $x=${a}t^{2}+t$ and $y=${b}t^{2}$, a student differentiates $x$ but drops the constant term, using $\\frac{dx}{dt}=${2 * a}t$ instead of $\\frac{dx}{dt}=${2 * a}t+1$. Using this incorrect derivative, what value does the student obtain for $\\dfrac{dy}{dx}$ at $t=${t}$?`,
        correct: wrong,
        distractors: [
          correct,
          frac(dxdt, dydt),
          frac(dydt, dxdt + 1),
        ],
        explanation: `The correct derivative is $\\frac{dx}{dt}=${2 * a}t+1$, giving $\\frac{dy}{dx}=\\frac{${dydt}}{${dxdt}}=${correct}$ at $t=${t}$. Dropping the $+1$ term instead yields $\\frac{${dydt}}{${2 * a * t}}=${wrong}$, a different value because the derivative of $x$ was computed incorrectly.`,
      };
    },
  },

  /* ---------- parametric-arc-length:distance-vs-displacement ---------- */
  {
    id: "n9-arclen-dvd-1",
    unit: U9,
    topic: "parametric-arc-length",
    difficulty: "medium",
    track: "BC",
    manifestation: "parametric-arc-length:distance-vs-displacement",
    build: (r) => {
      const a = ri(r, 3, 6);
      return {
        prompt: `A particle moves so that $x(t)=${a}\\cos t$ and $y(t)=${a}\\sin t$ for $0\\le t\\le 2\\pi$. Which statement correctly compares the total distance traveled to the net displacement from $t=0$ to $t=2\\pi$?`,
        correct: `\\text{The distance traveled is } ${2 * a}\\pi\\text{, but the net displacement is } 0.`,
        distractors: [
          `\\text{The distance traveled equals the net displacement, both } ${2 * a}\\pi.`,
          `\\text{The distance traveled is } 0\\text{, and the net displacement is } ${2 * a}\\pi.`,
          `\\text{Both the distance traveled and the net displacement equal } 0.`,
        ],
        explanation: `The particle traces a full circle of radius ${a}, returning to its start, so displacement (the straight-line change in position) is $0$. But the arc length traveled is the circle's circumference, $2\\pi(${a})=${2 * a}\\pi$, since speed $\\sqrt{x'(t)^2+y'(t)^2}=${a}$ is never zero.`,
      };
    },
  },
  {
    id: "n9-arclen-dvd-2",
    unit: U9,
    topic: "parametric-arc-length",
    difficulty: "medium",
    track: "BC",
    manifestation: "parametric-arc-length:distance-vs-displacement",
    build: (r) => {
      const a = ri(r, 2, 5);
      return {
        prompt: `A particle's position is given by $x(t)=t$, $y(t)=${a}\\sin t$ for $0\\le t\\le \\pi$. To find how far the particle actually traveled along its path (not just how far it ended up from where it started), a student should compute which quantity?`,
        correct: `\\int_{0}^{\\pi}\\sqrt{1+${a}^{2}\\cos^{2}t}\\,dt`,
        distractors: [
          `\\sqrt{(\\pi-0)^{2}+(y(\\pi)-y(0))^{2}}`,
          `\\int_{0}^{\\pi}\\left(1+${a}\\cos t\\right)dt`,
          `y(\\pi)-y(0)`,
        ],
        explanation: `Total distance traveled along a parametric path requires the arc-length integral $\\int\\sqrt{(x'(t))^2+(y'(t))^2}\\,dt = \\int_{0}^{\\pi}\\sqrt{1+${a}^{2}\\cos^{2}t}\\,dt$. The straight-line distance between endpoints (displacement) would instead use the Pythagorean formula on the endpoint coordinates, which understates the actual path length whenever the motion is not a straight line.`,
      };
    },
  },
  {
    id: "n9-arclen-dvd-3",
    unit: U9,
    topic: "parametric-arc-length",
    difficulty: "hard",
    track: "BC",
    manifestation: "parametric-arc-length:distance-vs-displacement",
    build: (r) => {
      const a = ri(r, 2, 5);
      const b = ri(r, 2, 5);
      return {
        prompt: `A particle moves along $x(t)=${a}t$, $y(t)=${b}t$ for $0\\le t\\le 2$, then reverses and moves along the same line back to its starting point for $2\\le t\\le 4$. Compare the particle's total distance traveled to its displacement over $0\\le t\\le 4$.`,
        correct: `\\text{The distance traveled is twice the length of the one-way segment, while the displacement is } 0.`,
        distractors: [
          `\\text{The distance traveled and the displacement are equal, since the path is a straight line.}`,
          `\\text{The distance traveled is } 0\\text{ because the particle returns to its start.}`,
          `\\text{The displacement is twice the one-way segment length, and the distance traveled is } 0.`,
        ],
        explanation: `Because the particle retraces the same segment, its net displacement (final minus initial position) is $0$. But distance traveled accumulates speed over time regardless of direction, so it equals twice the length of the one-way trip, $2\\sqrt{${a}^2+${b}^2}\\cdot 2$.`,
      };
    },
  },

  /* ---------- parametric-arc-length:bounds ---------- */
  {
    id: "n9-arclen-bounds-1",
    unit: U9,
    topic: "parametric-arc-length",
    difficulty: "medium",
    track: "BC",
    manifestation: "parametric-arc-length:bounds",
    build: (r) => {
      const a = ri(r, 2, 4);
      const p = ri(r, 1, 2);
      const q = p + ri(r, 1, 2);
      const pTex = p === 1 ? "\\pi" : `${p}\\pi`;
      const qTex = q === 1 ? "\\pi" : `${q}\\pi`;
      return {
        prompt: `A curve is traced by $x=${a}\\cos t$, $y=${a}\\sin t$ for $t$ ranging over $[${pTex}, ${qTex}]$, and the curve happens to retrace part of itself once for $t>${qTex}$. Which integral correctly gives the arc length of the curve traced exactly once over the intended interval?`,
        correct: `\\int_{${pTex}}^{${qTex}}${a}\\,dt`,
        distractors: [
          `\\int_{0}^{2\\pi}${a}\\,dt`,
          `\\int_{${pTex}}^{${qTex}}${a}^{2}\\,dt`,
          `2\\int_{${pTex}}^{${qTex}}${a}\\,dt`,
        ],
        explanation: `Since $\\sqrt{x'(t)^2+y'(t)^2}=${a}$ is constant, the arc length is simply $\\int_{${pTex}}^{${qTex}}${a}\\,dt$ over exactly the given parameter interval — using $[0,2\\pi]$ instead would include portions of the curve outside the stated bounds (or repeat them), and squaring the speed is not part of the arc-length formula.`,
      };
    },
  },
  {
    id: "n9-arclen-bounds-2",
    unit: U9,
    topic: "parametric-arc-length",
    difficulty: "hard",
    track: "BC",
    manifestation: "parametric-arc-length:bounds",
    build: (r) => {
      const a = ri(r, 2, 4);
      const k = ri(r, 2, 3);
      return {
        prompt: `The curve $x=\\cos(${k}t)$, $y=\\sin(${k}t)$ traces the unit circle exactly once as $t$ ranges over $\\left[0, \\dfrac{2\\pi}{${k}}\\right]$. A student instead sets up the arc-length integral over $[0,2\\pi]$. What is the consequence?`,
        correct: `\\text{The integral gives } ${k}\\text{ times the actual circumference, since the circle is traced } ${k}\\text{ times.}`,
        distractors: [
          `\\text{The integral still gives the correct circumference, since the curve is the same circle.}`,
          `\\text{The integral gives } \\frac{1}{${k}}\\text{ of the actual circumference.}`,
          `\\text{The integral gives zero because the curve returns to its start.}`,
        ],
        explanation: `The speed is $\\sqrt{x'(t)^2+y'(t)^2}=${k}$, constant, so integrating over $[0,2\\pi]$ (which is ${k} times too long a parameter interval) yields $${k}\\cdot 2\\pi$, or ${k} times the true circumference $2\\pi$. Choosing the correct bounds $\\left[0,\\frac{2\\pi}{${k}}\\right]$ is essential to avoid overcounting repeated tracing.`,
      };
    },
  },
  {
    id: "n9-arclen-bounds-3",
    unit: U9,
    topic: "parametric-arc-length",
    difficulty: "medium",
    track: "BC",
    manifestation: "parametric-arc-length:bounds",
    build: (r) => {
      const a = ri(r, 2, 5);
      const t1 = ri(r, 0, 1);
      const t2 = t1 + ri(r, 2, 4);
      return {
        prompt: `A particle traces a curve for $t\\in[${t1},${t2}]$ with $x(t)=t^{2}$ and $y(t)=${a}t$. A student sets up the arc length as $\\int_{0}^{${t2}}\\sqrt{(x'(t))^2+(y'(t))^2}\\,dt$ instead of using the given interval. What is wrong with this setup?`,
        correct: `\\text{The lower bound should be } ${t1}\\text{, not } 0\\text{, matching the particle's actual starting parameter value.}`,
        distractors: [
          `\\text{Nothing is wrong; the bounds } 0\\text{ to } ${t2}\\text{ are equivalent.}`,
          `\\text{The upper bound should be doubled to } ${2 * t2}.`,
          `\\text{The integrand should use } (x'(t))^2 - (y'(t))^2\\text{ instead of the sum.}`,
          
        ],
        explanation: `The arc-length integral must be taken over exactly the parameter interval on which the particle actually moves, $[${t1},${t2}]$. Using $t=0$ as a lower bound when the motion starts at $t=${t1}$ includes arc length from a portion of the curve the particle never traverses.`,
      };
    },
  },

  /* ---------- polar-derivatives:tangent-at-angle ---------- */
  {
    id: "n9-polar-tan-1",
    unit: U9,
    topic: "polar-derivatives",
    difficulty: "hard",
    track: "BC",
    manifestation: "polar-derivatives:tangent-at-angle",
    build: (r) => {
      const a = ri(r, 2, 5);
      const theta = pick(r, [
        { t: "0", sin: 0, cos: 1 },
        { t: "\\pi/2", sin: 1, cos: 0 },
      ]);
      // r = a + a cos(theta) style cardioid, find slope at given angle
      // Use r = a(1+cos theta); dr/dtheta = -a sin theta
      // x = r cos t, y = r sin t
      // dy/dx = (dr/dtheta sin t + r cos t)/(dr/dtheta cos t - r sin t)
      const th = theta.t;
      const sinT = theta.sin;
      const cosT = theta.cos;
      const rVal = a * (1 + cosT);
      const drdtheta = -a * sinT;
      const num = drdtheta * sinT + rVal * cosT;
      const den = drdtheta * cosT - rVal * sinT;
      let correct: string;
      if (den === 0) correct = "\\text{undefined}";
      else correct = frac(num, den);
      return {
        prompt: `For the polar curve $r=${a}(1+\\cos\\theta)$, find $\\dfrac{dy}{dx}$ at $\\theta=${th}$.`,
        correct,
        distractors: [
          den === 0 ? frac(num, 1) : frac(den, num),
          drdtheta === 0 ? "\\text{zero slope}" : `${drdtheta}`,
          frac(rVal, drdtheta === 0 ? 1 : drdtheta),
        ],
        explanation: `With $x=r\\cos\\theta$ and $y=r\\sin\\theta$, $\\frac{dy}{dx}=\\dfrac{\\frac{dr}{d\\theta}\\sin\\theta + r\\cos\\theta}{\\frac{dr}{d\\theta}\\cos\\theta - r\\sin\\theta}$. Here $\\frac{dr}{d\\theta}=-${a}\\sin\\theta$ and at $\\theta=${th}$, $r=${rVal}$, giving the stated result.`,
      };
    },
  },
  {
    id: "n9-polar-tan-2",
    unit: U9,
    topic: "polar-derivatives",
    difficulty: "hard",
    track: "BC",
    manifestation: "polar-derivatives:tangent-at-angle",
    build: (r) => {
      const a = ri(r, 2, 6);
      // r = a sin(theta), at theta = pi/4
      const th = "\\pi/4";
      const s = Math.SQRT1_2;
      // dr/dtheta = a cos theta = a*s ; r = a*s
      // x'=drdtheta cos t - r sin t; y' = drdtheta sin t + r cos t
      // numeric approach then present exact form
      const drdtheta = a * s;
      const rVal = a * s;
      const num = drdtheta * s + rVal * s; // = a*s*s + a*s*s = a (since s^2=1/2, sum = a)
      const den = drdtheta * s - rVal * s; // = 0
      return {
        prompt: `For the polar curve $r=${a}\\sin\\theta$, what is $\\dfrac{dy}{dx}$ at $\\theta=${th}$?`,
        correct: `\\text{undefined (vertical tangent)}`,
        distractors: [
          `0`,
          `${a}`,
          `\\text{undefined (horizontal tangent)}`,
        ],
        explanation: `At $\\theta=\\pi/4$, $\\frac{dr}{d\\theta}=${a}\\cos\\theta=\\frac{${a}}{\\sqrt2}$ and $r=\\frac{${a}}{\\sqrt2}$. Computing $\\frac{dx}{d\\theta}=\\frac{dr}{d\\theta}\\cos\\theta - r\\sin\\theta$ gives $0$ while $\\frac{dy}{d\\theta}\\ne 0$, so the tangent line is vertical and $\\frac{dy}{dx}$ is undefined.`,
      };
    },
  },
  {
    id: "n9-polar-tan-3",
    unit: U9,
    topic: "polar-derivatives",
    difficulty: "hard",
    track: "BC",
    manifestation: "polar-derivatives:tangent-at-angle",
    build: (r) => {
      const a = ri(r, 2, 5);
      // r = a theta, spiral, at theta = pi/2
      const th = "\\pi/2";
      // dr/dtheta = a; r = a*pi/2
      const rVal = `${a}\\cdot\\frac{\\pi}{2}`;
      // x' = a cos t - r sin t = a*0 - r*1 = -r
      // y' = a sin t + r cos t = a*1 + r*0 = a
      // dy/dx = a / (-r) = -a/r = -a/(a*pi/2) = -2/pi
      const correct = `-\\frac{2}{\\pi}`;
      return {
        prompt: `For the spiral $r=${a}\\theta$, find $\\dfrac{dy}{dx}$ at $\\theta=${th}$.`,
        correct,
        distractors: [
          `\\frac{2}{\\pi}`,
          `-\\frac{\\pi}{2}`,
          `${a}`,
        ],
        explanation: `With $\\frac{dr}{d\\theta}=${a}$ and $r=${a}\\cdot\\frac{\\pi}{2}$ at $\\theta=\\frac{\\pi}{2}$: $\\frac{dx}{d\\theta}=\\frac{dr}{d\\theta}\\cos\\theta - r\\sin\\theta = -r$ and $\\frac{dy}{d\\theta}=\\frac{dr}{d\\theta}\\sin\\theta + r\\cos\\theta = ${a}$. So $\\frac{dy}{dx}=\\frac{${a}}{-r}=\\frac{${a}}{-${a}\\pi/2}=-\\frac{2}{\\pi}$.`,
      };
    },
  },

  /* ---------- polar-derivatives:error-analysis ---------- */
  {
    id: "n9-polar-error-1",
    unit: U9,
    topic: "polar-derivatives",
    difficulty: "medium",
    track: "BC",
    manifestation: "polar-derivatives:error-analysis",
    build: (r) => {
      const a = ri(r, 2, 6);
      return {
        prompt: `For the polar curve $r=${a}\\cos\\theta$, a student claims that $\\dfrac{dy}{dx}=\\dfrac{dr}{d\\theta}=-${a}\\sin\\theta$. What is the flaw in this reasoning?`,
        correct: `\\text{The student mistook } \\frac{dr}{d\\theta}\\text{ for } \\frac{dy}{dx}\\text{; } \\frac{dy}{dx}\\text{ must be computed from } x=r\\cos\\theta, y=r\\sin\\theta.`,
        distractors: [
          `\\text{There is no flaw; } \\frac{dr}{d\\theta}\\text{ and } \\frac{dy}{dx}\\text{ are always equal for polar curves.}`,
          `\\text{The student should have used } \\frac{d\\theta}{dr}\\text{ instead of } \\frac{dr}{d\\theta}.`,
          `\\text{The sign of } \\frac{dr}{d\\theta}\\text{ should be positive, not negative.}`,
        ],
        explanation: `$\\frac{dr}{d\\theta}$ measures how the radius changes with angle, which is not the same as the slope of the tangent line to the curve in the $xy$-plane. The correct slope requires $\\frac{dy}{dx}=\\dfrac{\\frac{dr}{d\\theta}\\sin\\theta+r\\cos\\theta}{\\frac{dr}{d\\theta}\\cos\\theta - r\\sin\\theta}$, built from $x=r\\cos\\theta$ and $y=r\\sin\\theta$.`,
      };
    },
  },
  {
    id: "n9-polar-error-2",
    unit: U9,
    topic: "polar-derivatives",
    difficulty: "medium",
    track: "BC",
    manifestation: "polar-derivatives:error-analysis",
    build: (r) => {
      const a = ri(r, 2, 5);
      const th = pick(r, ["0", "\\pi/2", "\\pi"]);
      return {
        prompt: `A student wants the slope of the tangent line to $r=${a}+\\cos\\theta$ at $\\theta=${th}$, and writes $\\dfrac{dy}{dx}=\\dfrac{dr}{d\\theta}$ evaluated at $\\theta=${th}$. Which correction is needed?`,
        correct: `\\text{Compute } x=r\\cos\\theta, y=r\\sin\\theta\\text{ first, then find } \\dfrac{dy/d\\theta}{dx/d\\theta}\\text{ using the product rule on each.}`,
        distractors: [
          `\\text{No correction needed; } \\frac{dr}{d\\theta}\\text{ already gives the slope in polar form.}`,
          `\\text{Replace } \\theta\\text{ with } r\\text{ in the derivative before evaluating.}`,
          `\\text{Take the reciprocal of } \\frac{dr}{d\\theta}\\text{ to get the slope.}`,
        ],
        explanation: `Because $x$ and $y$ each depend on both $r(\\theta)$ and $\\theta$ itself, the slope requires differentiating $x=r\\cos\\theta$ and $y=r\\sin\\theta$ via the product rule, then forming the ratio $\\frac{dy/d\\theta}{dx/d\\theta}$ — simply reporting $\\frac{dr}{d\\theta}$ ignores the geometry entirely.`,
      };
    },
  },
  {
    id: "n9-polar-error-3",
    unit: U9,
    topic: "polar-derivatives",
    difficulty: "medium",
    track: "BC",
    manifestation: "polar-derivatives:error-analysis",
    build: (r) => {
      const a = ri(r, 2, 6);
      const b = ri(r, 1, 4);
      return {
        prompt: `For $r=${a}+${b}\\sin\\theta$, a student sets $\\frac{dy}{dx}=0$ to find horizontal tangents by solving $\\frac{dr}{d\\theta}=0$ instead of $\\frac{dy}{d\\theta}=0$. Why does this lead to incorrect points?`,
        correct: `\\text{Horizontal tangents occur where } \\frac{dy}{d\\theta}=0 \\text{ and } \\frac{dx}{d\\theta}\\ne 0\\text{, which is generally not where } \\frac{dr}{d\\theta}=0.`,
        distractors: [
          `\\text{The equations } \\frac{dr}{d\\theta}=0 \\text{ and } \\frac{dy}{d\\theta}=0 \\text{ always have the same solutions.}`,
          `\\text{Horizontal tangents require } \\frac{dx}{d\\theta}=0\\text{, which the student found by coincidence.}`,
          `\\text{The student should instead solve } r=0\\text{ to find horizontal tangents.}`,
        ],
        explanation: `Since $y=r\\sin\\theta$, $\\frac{dy}{d\\theta}=\\frac{dr}{d\\theta}\\sin\\theta+r\\cos\\theta$, which involves both $r$ and $\\theta$ together, not just $\\frac{dr}{d\\theta}$ alone. Setting $\\frac{dr}{d\\theta}=0$ finds where the radius is momentarily stationary, an entirely different geometric condition from a horizontal tangent line.`,
      };
    },
  },

  /* ---------- polar-area:bounds ---------- */
  {
    id: "n9-polar-area-bounds-1",
    unit: U9,
    topic: "polar-area",
    difficulty: "medium",
    track: "BC",
    manifestation: "polar-area:bounds",
    build: (r) => {
      const a = ri(r, 2, 5);
      return {
        prompt: `Which integral gives the area enclosed by one full petal of the rose $r=${a}\\sin(2\\theta)$?`,
        correct: `\\frac{1}{2}\\int_{0}^{\\pi/2}\\left(${a}\\sin(2\\theta)\\right)^{2}d\\theta`,
        distractors: [
          `\\frac{1}{2}\\int_{0}^{2\\pi}\\left(${a}\\sin(2\\theta)\\right)^{2}d\\theta`,
          `\\int_{0}^{\\pi/2}${a}\\sin(2\\theta)\\,d\\theta`,
          `\\frac{1}{2}\\int_{0}^{\\pi}\\left(${a}\\sin(2\\theta)\\right)^{2}d\\theta`,
        ],
        explanation: `One petal of $r=${a}\\sin(2\\theta)$ is traced as $\\theta$ runs from $0$ to $\\frac{\\pi}{2}$ (where $r$ first returns to $0$). The polar area formula is $\\frac{1}{2}\\int r^2\\,d\\theta$, so the petal's area is $\\frac{1}{2}\\int_{0}^{\\pi/2}\\left(${a}\\sin(2\\theta)\\right)^2d\\theta$; using $[0,2\\pi]$ would sum all four petals instead of one.`,
      };
    },
  },
  {
    id: "n9-polar-area-bounds-2",
    unit: U9,
    topic: "polar-area",
    difficulty: "hard",
    track: "BC",
    manifestation: "polar-area:bounds",
    build: (r) => {
      const a = ri(r, 2, 4);
      // limaçon with inner loop: r = a + 2a cos(theta) has inner loop when a < |2a|, i.e. always for this form (a/(2a)=1/2<1)
      const b = 2 * a;
      // outer loop bounds where r=0: a+2a cos theta =0 -> cos theta = -1/2 -> theta = 2pi/3, 4pi/3
      const window = fitWindow(samplePolar((t) => a + b * Math.cos(t), 0, 2 * Math.PI), 1);
      const fig: Figure = {
        kind: "parametric",
        label: `r = ${a} + ${b}\\cos\\theta`,
        points: samplePolar((t) => a + b * Math.cos(t), 0, 2 * Math.PI),
        window,
        caption: `Limaçon $r=${a}+${b}\\cos\\theta$, which has an inner loop.`,
      };
      return {
        prompt: `The limaçon $r=${a}+${b}\\cos\\theta$ has an inner loop, shown below. Which integral gives the area of just the inner loop?`,
        correct: `\\frac{1}{2}\\int_{2\\pi/3}^{4\\pi/3}\\left(${a}+${b}\\cos\\theta\\right)^{2}d\\theta`,
        distractors: [
          `\\frac{1}{2}\\int_{0}^{2\\pi}\\left(${a}+${b}\\cos\\theta\\right)^{2}d\\theta`,
          `\\frac{1}{2}\\int_{0}^{2\\pi/3}\\left(${a}+${b}\\cos\\theta\\right)^{2}d\\theta`,
          `\\int_{2\\pi/3}^{4\\pi/3}\\left(${a}+${b}\\cos\\theta\\right)d\\theta`,
        ],
        explanation: `Setting $r=0$: $${a}+${b}\\cos\\theta=0 \\Rightarrow \\cos\\theta=-\\frac{1}{2}$, giving $\\theta=\\frac{2\\pi}{3}$ and $\\theta=\\frac{4\\pi}{3}$. Between these angles $r$ is negative, tracing the inner loop, so its area is $\\frac{1}{2}\\int_{2\\pi/3}^{4\\pi/3}r^2\\,d\\theta$. Integrating over the full $[0,2\\pi]$ instead would count the outer loop's area too, not isolate the inner loop.`,
        figure: fig,
      };
    },
  },
  {
    id: "n9-polar-area-bounds-3",
    unit: U9,
    topic: "polar-area",
    difficulty: "hard",
    track: "BC",
    manifestation: "polar-area:bounds",
    build: (r) => {
      const a = ri(r, 2, 5);
      // area of region inside r = a and outside r = a(1-cos theta)? use simple region between two circles intersection - choose r1 = a, r2 = 2a cos theta intersect where a = 2a cos theta -> cos theta=1/2 -> theta=pi/3
      const points = samplePolar((t) => Math.max(a, 2 * a * Math.cos(t)), -Math.PI / 2, Math.PI / 2);
      const window = fitWindow(points, 1);
      return {
        prompt: `The curves $r=${a}$ and $r=${2 * a}\\cos\\theta$ intersect where $\\cos\\theta=\\frac{1}{2}$, i.e. at $\\theta=\\pm\\frac{\\pi}{3}$. Which integral gives the area of the region that lies inside both curves?`,
        correct: `\\frac{1}{2}\\int_{-\\pi/3}^{\\pi/3}${a}^{2}\\,d\\theta + \\frac{1}{2}\\int_{\\pi/3}^{\\pi/2}\\left(${2 * a}\\cos\\theta\\right)^{2}d\\theta \\cdot 2`,
        distractors: [
          `\\frac{1}{2}\\int_{-\\pi/3}^{\\pi/3}\\left(${2 * a}\\cos\\theta\\right)^{2}d\\theta`,
          `\\frac{1}{2}\\int_{-\\pi/2}^{\\pi/2}${a}^{2}\\,d\\theta`,
          `\\frac{1}{2}\\int_{0}^{\\pi/3}\\left(${a}-${2 * a}\\cos\\theta\\right)^{2}d\\theta`,
        ],
        explanation: `For $|\\theta|\\le\\frac{\\pi}{3}$ the smaller curve $r=${a}$ is inside $r=${2 * a}\\cos\\theta$, so the circle $r=${a}$ bounds the region there; for $\\frac{\\pi}{3}\\le\\theta\\le\\frac{\\pi}{2}$ (and symmetrically for negative $\\theta$), $r=${2 * a}\\cos\\theta$ is the inner boundary. Using the wrong curve on the wrong sub-interval, or the wrong bounds entirely, misses this piecewise structure.`,
      };
    },
  },

  /* =========================================================================
   * UNIT 10
   * ========================================================================= */

  /* ---------- nth-term-test:inconclusive ---------- */
  {
    id: "n10-nthterm-inconclusive-1",
    unit: U10,
    topic: "nth-term-test",
    difficulty: "medium",
    track: "BC",
    manifestation: "nth-term-test:inconclusive",
    build: (r) => {
      const a = ri(r, 2, 6);
      return {
        prompt: `For a series $\\sum a_n$, it is found that $\\displaystyle\\lim_{n\\to\\infty}a_n=0$. Which statement must be true?`,
        correct: `\\text{The nth-term test gives no information; the series may converge or diverge.}`,
        distractors: [
          `\\text{The series must converge.}`,
          `\\text{The series must diverge.}`,
          `\\text{The series must converge absolutely.}`,
        ],
        explanation: `The nth-term test only detects divergence (when the limit of terms is nonzero or does not exist). When the limit is $0$, the test is inconclusive: for example $\\sum\\frac{1}{n}$ diverges while $\\sum\\frac{1}{n^{2}}$ converges, yet both have terms tending to $0$.`,
      };
    },
  },
  {
    id: "n10-nthterm-inconclusive-2",
    unit: U10,
    topic: "nth-term-test",
    difficulty: "medium",
    track: "BC",
    manifestation: "nth-term-test:inconclusive",
    build: (r) => {
      const p1 = ri(r, 1, 1);
      return {
        prompt: `Both $\\displaystyle\\sum_{n=1}^{\\infty}\\frac{1}{n}$ and $\\displaystyle\\sum_{n=1}^{\\infty}\\frac{1}{n^{2}}$ have terms approaching $0$ as $n\\to\\infty$, yet one converges and the other diverges. What does this demonstrate about the nth-term test?`,
        correct: `\\text{A limit of } 0\\text{ for the terms never proves convergence — only a nonzero (or nonexistent) limit proves divergence.}`,
        distractors: [
          `\\text{The nth-term test is unreliable and should never be used.}`,
          `\\text{A limit of } 0\\text{ always proves convergence except in these two special cases.}`,
          `\\text{The test proves both series converge, contradicting known results.}`,
        ],
        explanation: `The harmonic series $\\sum\\frac{1}{n}$ diverges while the $p$-series $\\sum\\frac{1}{n^2}$ converges, even though both have terms shrinking to $0$. This pair is the standard counterexample showing that $\\lim a_n = 0$ is a necessary but not sufficient condition for convergence.`,
      };
    },
  },
  {
    id: "n10-nthterm-inconclusive-3",
    unit: U10,
    topic: "nth-term-test",
    difficulty: "medium",
    track: "BC",
    manifestation: "nth-term-test:inconclusive",
    build: (r) => {
      const k = ri(r, 2, 4);
      return {
        prompt: `A student checks that $\\displaystyle\\lim_{n\\to\\infty}\\frac{1}{n^{${k}}}=0$ and concludes $\\displaystyle\\sum_{n=1}^{\\infty}\\frac{1}{n^{${k}}}$ converges "by the nth-term test." Is this conclusion justified?`,
        correct: `\\text{No — the nth-term test cannot establish convergence; a separate test (such as the p-series test) is needed.}`,
        distractors: [
          `\\text{Yes — a limit of } 0\\text{ for the terms is sufficient to prove convergence.}`,
          `\\text{No — the terms do not actually approach } 0\\text{ for } k\\ge 2.`,
          `\\text{Yes, but only because } k\\text{ is even.}`,
        ],
        explanation: `The series does converge (it is a $p$-series with $p=${k}>1$), but the nth-term test itself never proves convergence — it can only prove divergence when the term limit is nonzero. The correct justification here is the $p$-series test, not the nth-term test.`,
      };
    },
  },

  /* ---------- nth-term-test:sequence-vs-series (includes partial-sums extras) ---------- */
  {
    id: "n10-nthterm-seqvsseries-1",
    unit: U10,
    topic: "nth-term-test",
    difficulty: "medium",
    track: "BC",
    manifestation: "nth-term-test:sequence-vs-series",
    build: (r) => {
      const a = ri(r, 2, 5);
      return {
        prompt: `The sequence $a_n=\\dfrac{${a}n}{n+1}$ converges to $${a}$ as $n\\to\\infty$. What can be concluded about the series $\\displaystyle\\sum_{n=1}^{\\infty}a_n$?`,
        correct: `\\text{The series must diverge, since its terms do not approach } 0.`,
        distractors: [
          `\\text{The series must converge, since the sequence converges.}`,
          `\\text{The series converges to } ${a}.`,
          `\\text{No conclusion can be drawn without more information.}`,
        ],
        explanation: `Convergence of the sequence $a_n$ is a separate idea from convergence of the series $\\sum a_n$. Here $\\lim a_n = ${a}\\ne 0$, so by the nth-term test the series $\\sum a_n$ diverges, even though the underlying sequence of terms itself converges nicely to $${a}$.`,
      };
    },
  },
  {
    id: "n10-nthterm-seqvsseries-2",
    unit: U10,
    topic: "nth-term-test",
    difficulty: "medium",
    track: "BC",
    manifestation: "nth-term-test:sequence-vs-series",
    build: (r) => {
      const a1 = ri(r, 2, 5);
      const a2 = ri(r, 1, a1 - 1);
      const a3 = ri(r, 0, a2 - 1) + 1 > a2 ? a2 - 1 : a2 - 1; // ensure decreasing-ish, just use explicit terms
      const t1 = a1;
      const t2 = a2;
      const t3 = ri(r, 1, Math.max(1, a2 - 1));
      const S1 = t1;
      const S2 = t1 + t2;
      const S3 = t1 + t2 + t3;
      return {
        prompt: `A series has first three terms $a_1=${t1}$, $a_2=${t2}$, $a_3=${t3}$. What are the partial sums $S_1$, $S_2$, and $S_3$?`,
        correct: `S_1=${S1},\\ S_2=${S2},\\ S_3=${S3}`,
        distractors: [
          `S_1=${t1},\\ S_2=${t2},\\ S_3=${t3}`,
          `S_1=${S1},\\ S_2=${S1 * t2},\\ S_3=${S1 * t2 * t3}`,
          `S_1=${S3},\\ S_2=${S2},\\ S_3=${S1}`,
        ],
        explanation: `Each partial sum $S_n$ adds one more term to the running total: $S_1=a_1=${S1}$, $S_2=a_1+a_2=${S1}+${t2}=${S2}$, and $S_3=a_1+a_2+a_3=${S2}+${t3}=${S3}$. Confusing partial sums with the individual terms themselves is a common error — $S_2$ is the accumulated total, not just $a_2$.`,
      };
    },
  },
  {
    id: "n10-nthterm-seqvsseries-3",
    unit: U10,
    topic: "nth-term-test",
    difficulty: "medium",
    track: "BC",
    manifestation: "nth-term-test:sequence-vs-series",
    build: (r) => {
      const a = ri(r, 2, 5);
      const t1 = a;
      const t2 = frac(a, 2);
      const t3 = frac(a, 4);
      const S1n = a;
      const S2n = a + a / 2;
      const S3n = a + a / 2 + a / 4;
      return {
        prompt: `The series $\\displaystyle\\sum_{n=0}^{\\infty}\\frac{${a}}{2^{n}}$ has terms $a_0=${a}$, $a_1=${t1 / 2}$, $a_2=${t1 / 4}$. Find the partial sum $S_2 = a_0+a_1+a_2$.`,
        correct: dec(S3n, 2),
        distractors: [
          dec(a + a / 2, 2),
          `${a}`,
          dec(a / 4, 2),
        ],
        explanation: `$S_2$ sums the first three terms (indices $0,1,2$): $S_2 = ${a} + ${a / 2} + ${a / 4} = ${dec(S3n, 2)}$. A common mistake is stopping after two terms (giving $S_1$) or reporting only the last term added.`,
      };
    },
  },
  {
    id: "n10-nthterm-partial-sums-4",
    unit: U10,
    topic: "nth-term-test",
    difficulty: "easy",
    track: "BC",
    manifestation: "nth-term-test:sequence-vs-series",
    build: (r) => {
      const b = ri(r, 2, 6);
      const t1 = b, t2 = b + 1, t3 = b + 2;
      const S1 = t1, S2 = t1 + t2, S3 = t1 + t2 + t3;
      return {
        prompt: `For the series $\\displaystyle\\sum_{n=1}^{\\infty}(n+${b - 1})$, compute the partial sums $S_1$, $S_2$, $S_3$.`,
        correct: `S_1=${S1},\\ S_2=${S2},\\ S_3=${S3}`,
        distractors: [
          `S_1=${t1},\\ S_2=${t2},\\ S_3=${t3}`,
          `S_1=${S1},\\ S_2=${S2 - 1},\\ S_3=${S3 - 2}`,
          `S_1=0,\\ S_2=${S1},\\ S_3=${S2}`,
        ],
        explanation: `The terms are $a_1=${t1}$, $a_2=${t2}$, $a_3=${t3}$. Then $S_1=${t1}$, $S_2=${t1}+${t2}=${S2}$, and $S_3=${S2}+${t3}=${S3}$. Listing the individual terms instead of the running totals, or shifting indices by one, are the typical errors here.`,
      };
    },
  },
  {
    id: "n10-nthterm-partial-sums-5",
    unit: U10,
    topic: "nth-term-test",
    difficulty: "easy",
    track: "BC",
    manifestation: "nth-term-test:sequence-vs-series",
    build: (r) => {
      const c = ri(r, 2, 5);
      const t1 = frac(1, c), t2 = frac(1, c + 1), t3 = frac(1, c + 2);
      const S1v = 1 / c;
      const S2v = 1 / c + 1 / (c + 1);
      const S3v = S2v + 1 / (c + 2);
      return {
        prompt: `Given the series $\\displaystyle\\sum_{n=0}^{\\infty}\\frac{1}{${c}+n}$, find $S_3$, the sum of its first three terms.`,
        correct: dec(S3v, 3),
        distractors: [
          dec(S2v, 3),
          dec(1 / (c + 2), 3),
          dec(S3v + 1 / c, 3),
        ],
        explanation: `The first three terms (for $n=0,1,2$) are $\\frac{1}{${c}}$, $\\frac{1}{${c + 1}}$, and $\\frac{1}{${c + 2}}$. Their sum is $S_3\\approx ${dec(S3v, 3)}$. Reporting $S_2$ (only two terms) is a common off-by-one error.`,
      };
    },
  },
  {
    id: "n10-nthterm-partial-sums-6",
    unit: U10,
    topic: "nth-term-test",
    difficulty: "medium",
    track: "BC",
    manifestation: "nth-term-test:sequence-vs-series",
    build: (r) => {
      const a = ri(r, 3, 8);
      const ratio = frac(1, 3);
      const t1 = a, t2 = a / 3, t3 = a / 9;
      const S3 = t1 + t2 + t3;
      return {
        prompt: `The geometric series $\\displaystyle\\sum_{n=0}^{\\infty}${a}\\left(\\frac{1}{3}\\right)^{n}$ has $S_1=${t1}$. Find $S_3$.`,
        correct: dec(S3, 3),
        distractors: [
          dec(t1 + t2, 3),
          dec(t3, 3),
          dec(S3 - t1, 3),
        ],
        explanation: `Here $S_1=a_1=${t1}$ refers to the first partial sum (just one term), so $S_3=a_1+a_2+a_3=${t1}+${dec(t2, 3)}+${dec(t3, 3)}=${dec(S3, 3)}$. Confusing $S_1$ with $a_1$ alone, or stopping the sum early, are the usual pitfalls.`,
      };
    },
  },

  /* ---------- nth-term-test:error-analysis ---------- */
  {
    id: "n10-nthterm-error-1",
    unit: U10,
    topic: "nth-term-test",
    difficulty: "medium",
    track: "BC",
    manifestation: "nth-term-test:error-analysis",
    build: (r) => {
      const a = ri(r, 2, 6);
      return {
        prompt: `A student examines $\\displaystyle\\sum_{n=1}^{\\infty}\\frac{n}{n+${a}}$ and, seeing that the terms are always positive, concludes that the series converges. What is the error?`,
        correct: `\\text{The terms approach } 1\\text{, not } 0\\text{, so the nth-term test actually shows the series diverges.}`,
        distractors: [
          `\\text{There is no error; positive terms always produce a convergent series.}`,
          `\\text{The student should have used the ratio test instead, which would confirm convergence.}`,
          `\\text{The terms approach } 0\\text{, so the series does converge, just not for the stated reason.}`,
        ],
        explanation: `$\\lim_{n\\to\\infty}\\frac{n}{n+${a}}=1\\ne 0$, so by the nth-term test the series diverges. Positivity of terms says nothing about convergence; the student needed to check the limit of the terms, not their sign.`,
      };
    },
  },
  {
    id: "n10-nthterm-error-2",
    unit: U10,
    topic: "nth-term-test",
    difficulty: "medium",
    track: "BC",
    manifestation: "nth-term-test:error-analysis",
    build: (r) => {
      const a = ri(r, 2, 5);
      return {
        prompt: `A student writes: "$\\displaystyle\\lim_{n\\to\\infty}\\cos\\left(\\frac{1}{n}\\right)=1$, so the terms don't go to 0, so by the nth-term test $\\sum\\cos\\left(\\frac{1}{n}\\right)$ diverges." Is this reasoning valid?`,
        correct: `\\text{Yes — the reasoning is valid, since a nonzero term limit correctly triggers the nth-term test for divergence.}`,
        distractors: [
          `\\text{No — the nth-term test only applies when the limit is } 0.`,
          `\\text{No — } \\cos(1/n)\\text{ actually approaches } 0\\text{, not } 1.`,
          `\\text{No — divergence can only be shown using the integral test.}`,
        ],
        explanation: `The reasoning is correct: as $n\\to\\infty$, $\\frac{1}{n}\\to 0$, so $\\cos(1/n)\\to \\cos(0)=1\\ne 0$. Since the terms do not approach zero, the nth-term test validly concludes that $\\sum\\cos(1/n)$ diverges.`,
      };
    },
  },
  {
    id: "n10-nthterm-error-3",
    unit: U10,
    topic: "nth-term-test",
    difficulty: "medium",
    track: "BC",
    manifestation: "nth-term-test:error-analysis",
    build: (r) => {
      const a = ri(r, 2, 6);
      return {
        prompt: `A student argues: "$\\displaystyle\\sum_{n=1}^{\\infty}(-1)^{n}$ has terms that don't converge to a single value at all, so the nth-term test doesn't apply and no conclusion can be drawn." Evaluate this claim.`,
        correct: `\\text{The claim is false — when the limit of the terms fails to exist, the nth-term test still applies and proves divergence.}`,
        distractors: [
          `\\text{The claim is correct — the nth-term test requires the limit to exist.}`,
          `\\text{The claim is correct, but the series actually converges to } 0\\text{ by symmetry.}`,
          `\\text{The claim is false because the terms actually do converge, to } -1.`,
        ],
        explanation: `The nth-term test states that if $\\lim a_n\\ne 0$ *or fails to exist*, the series diverges. Since $(-1)^n$ oscillates between $-1$ and $1$ with no limit, the series $\\sum(-1)^n$ diverges by the nth-term test — the test does apply.`,
      };
    },
  },

  /* ---------- comparison-tests:limit-comparison ---------- */
  {
    id: "n10-limitcomp-1",
    unit: U10,
    topic: "comparison-tests",
    difficulty: "hard",
    track: "BC",
    manifestation: "comparison-tests:limit-comparison",
    build: (r) => {
      const a = ri(r, 2, 6);
      const b = ri(r, 1, 5);
      return {
        prompt: `Apply the limit comparison test to $\\displaystyle\\sum_{n=1}^{\\infty}\\frac{${a}n+${b}}{n^{3}+1}$ using the comparison series $\\displaystyle\\sum\\frac{1}{n^{2}}$. What is $\\displaystyle\\lim_{n\\to\\infty}\\frac{a_n}{b_n}$, and what does it imply?`,
        correct: `${a}\\text{; since the limit is a finite positive number and } \\sum\\frac{1}{n^{2}}\\text{ converges, the given series converges.}`,
        distractors: [
          `0\\text{; the test is inconclusive.}`,
          `\\infty\\text{; the given series must diverge.}`,
          `${a}\\text{; since the limit is finite and positive, the given series diverges, matching the harmonic-like behavior.}`,
        ],
        explanation: `$\\dfrac{a_n}{b_n}=\\dfrac{(${a}n+${b})/(n^3+1)}{1/n^2}=\\dfrac{${a}n^3+${b}n^2}{n^3+1}\\to ${a}$, a finite positive number. Since $\\sum\\frac{1}{n^2}$ is a convergent $p$-series ($p=2>1$), the limit comparison test says the original series also converges.`,
      };
    },
  },
  {
    id: "n10-limitcomp-2",
    unit: U10,
    topic: "comparison-tests",
    difficulty: "hard",
    track: "BC",
    manifestation: "comparison-tests:limit-comparison",
    build: (r) => {
      const a = ri(r, 2, 5);
      return {
        prompt: `To determine the convergence of $\\displaystyle\\sum_{n=1}^{\\infty}\\frac{1}{\\sqrt{n^{2}+${a}}}$, a student compares it via the limit comparison test to $\\displaystyle\\sum\\frac{1}{n}$. Compute $\\displaystyle\\lim_{n\\to\\infty}\\frac{1/\\sqrt{n^2+${a}}}{1/n}$ and state the conclusion.`,
        correct: `1\\text{; since } \\sum\\frac{1}{n}\\text{ diverges and the limit is finite and positive, the given series diverges.}`,
        distractors: [
          `0\\text{; the given series converges.}`,
          `1\\text{; since the limit equals } 1\\text{, the given series also converges, matching } \\sum\\frac{1}{n^2}.`,
          `\\infty\\text{; the test is inconclusive.}`,
        ],
        explanation: `$\\dfrac{1/\\sqrt{n^2+${a}}}{1/n}=\\dfrac{n}{\\sqrt{n^2+${a}}}\\to 1$ as $n\\to\\infty$, a finite positive limit. Because $\\sum\\frac{1}{n}$ (the harmonic series) diverges, the limit comparison test concludes the original series diverges too.`,
      };
    },
  },
  {
    id: "n10-limitcomp-3",
    unit: U10,
    topic: "comparison-tests",
    difficulty: "hard",
    track: "BC",
    manifestation: "comparison-tests:limit-comparison",
    build: (r) => {
      const a = ri(r, 2, 5);
      const p = ri(r, 2, 3);
      return {
        prompt: `Which comparison series $b_n$ should be used in a limit comparison test for $\\displaystyle\\sum_{n=1}^{\\infty}\\frac{${a}n^{2}+n}{n^{${p + 2}}-3}$, and what is $\\lim \\frac{a_n}{b_n}$?`,
        correct: `b_n=\\frac{1}{n^{${p}}};\\ \\lim\\frac{a_n}{b_n}=${a}`,
        distractors: [
          `b_n=\\frac{1}{n^{${p + 2}}};\\ \\lim\\frac{a_n}{b_n}=0`,
          `b_n=\\frac{1}{n};\\ \\lim\\frac{a_n}{b_n}=\\infty`,
          `b_n=\\frac{1}{n^{${p}}};\\ \\lim\\frac{a_n}{b_n}=1`,
        ],
        explanation: `Comparing the dominant powers, $a_n\\approx \\frac{${a}n^2}{n^{${p + 2}}}=\\frac{${a}}{n^{${p}}}$, so the natural comparison series is $b_n=\\frac{1}{n^{${p}}}$. Then $\\lim\\frac{a_n}{b_n}=\\lim\\frac{${a}n^{${p}}(n^2+n/${a})}{n^{${p + 2}}-3}=${a}$, a finite positive number, so both series share the same convergence behavior.`,
      };
    },
  },

  /* ---------- comparison-tests:invalid-comparison (+ direct comparison by name) ---------- */
  {
    id: "n10-invalidcomp-1",
    unit: U10,
    topic: "comparison-tests",
    difficulty: "medium",
    track: "BC",
    manifestation: "comparison-tests:invalid-comparison",
    build: (r) => {
      const a = ri(r, 2, 5);
      return {
        prompt: `To show $\\displaystyle\\sum_{n=1}^{\\infty}\\frac{1}{n+${a}}$ converges, a student notes $\\frac{1}{n+${a}} < \\frac{1}{n}$ for all $n\\ge 1$ and that this proves convergence "by direct comparison" since it is smaller than the harmonic series. What is wrong?`,
        correct: `\\text{The direct comparison test requires comparing a smaller series to a known convergent series; here } \\sum\\frac{1}{n}\\text{ diverges, so being smaller proves nothing.}`,
        distractors: [
          `\\text{Nothing is wrong; the comparison correctly proves convergence.}`,
          `\\text{The inequality } \\frac{1}{n+${a}}<\\frac{1}{n}\\text{ is actually false.}`,
          `\\text{The student needed to compare to } \\sum\\frac{1}{n^{2}}\\text{ instead, which would prove divergence.}`,
        ],
        explanation: `The direct comparison test only proves convergence when a series is bounded above by a *convergent* series, or proves divergence when a series is bounded below by a *divergent* one. Since $\\sum\\frac{1}{n}$ diverges, showing $\\frac{1}{n+${a}}$ is smaller gives no information — indeed $\\sum\\frac{1}{n+${a}}$ also diverges by limit comparison to $\\sum\\frac{1}{n}$.`,
      };
    },
  },
  {
    id: "n10-invalidcomp-2",
    unit: U10,
    topic: "comparison-tests",
    difficulty: "medium",
    track: "BC",
    manifestation: "comparison-tests:invalid-comparison",
    build: (r) => {
      const a = ri(r, 2, 5);
      return {
        prompt: `A student notes $\\frac{1}{n^{2}} < \\frac{${a}}{n}$ for all $n\\ge 1$ and concludes, "since $\\sum\\frac{${a}}{n}$ diverges, the direct comparison test tells me $\\sum\\frac{1}{n^{2}}$ also diverges." Evaluate this use of the test.`,
        correct: `\\text{Invalid — bounding a series above by a divergent series proves nothing about its own convergence.}`,
        distractors: [
          `\\text{Valid — smaller series inherit divergence from larger ones.}`,
          `\\text{Valid, because both series have the same general form.}`,
          `\\text{Invalid, because the inequality } \\frac{1}{n^2}<\\frac{${a}}{n}\\text{ is false for large } n.`,
        ],
        explanation: `The direct comparison test needs the *smaller* series to be compared to a *divergent lower bound*, or the *larger* series compared to a *convergent upper bound* — being smaller than a divergent series proves nothing at all. In fact $\\sum\\frac{1}{n^2}$ converges (it's a $p$-series with $p=2$), showing the flawed logic leads to a false conclusion here.`,
      };
    },
  },
  {
    id: "n10-invalidcomp-3",
    unit: U10,
    topic: "comparison-tests",
    difficulty: "medium",
    track: "BC",
    manifestation: "comparison-tests:invalid-comparison",
    build: (r) => {
      const a = ri(r, 2, 6);
      return {
        prompt: `A student wants to apply the direct comparison test to $\\displaystyle\\sum_{n=1}^{\\infty}\\frac{\\sin^{2}(n)}{n^{2}}$ and writes $\\frac{\\sin^{2}(n)}{n^{2}} \\le \\frac{1}{n^{2}}$, then concludes divergence because $\\sin^2(n)$ is unpredictable. What is the correct conclusion?`,
        correct: `\\text{Since } 0\\le \\frac{\\sin^{2}(n)}{n^{2}}\\le\\frac{1}{n^{2}}\\text{ and } \\sum\\frac{1}{n^{2}}\\text{ converges, the direct comparison test proves the given series converges.}`,
        distractors: [
          `\\text{The series diverges because } \\sin^2(n)\\text{ never approaches a limit.}`,
          `\\text{The comparison test cannot be applied to series containing trigonometric terms.}`,
          `\\text{The series converges only conditionally, not absolutely.}`,
        ],
        explanation: `The student correctly bounded the terms but drew the wrong conclusion: an upper bound by a *convergent* series (here $\\sum\\frac{1}{n^2}$) proves convergence, not divergence, by the direct comparison test. The unpredictability of $\\sin^2(n)$ is irrelevant once a valid convergent bound is established.`,
      };
    },
  },

  /* ---------- comparison-tests:integral-test ---------- */
  {
    id: "n10-integraltest-1",
    unit: U10,
    topic: "comparison-tests",
    difficulty: "hard",
    track: "BC",
    manifestation: "comparison-tests:integral-test",
    build: (r) => {
      const a = ri(r, 2, 4);
      return {
        prompt: `To apply the integral test to $\\displaystyle\\sum_{n=1}^{\\infty}\\frac{n}{e^{${a}n}}$, which condition must first be verified about $f(x)=\\frac{x}{e^{${a}x}}$ on $[1,\\infty)$?`,
        correct: `f\\text{ must be positive, continuous, and eventually decreasing on } [1,\\infty).`,
        distractors: [
          `f\\text{ must be increasing and bounded above.}`,
          `f\\text{ must have a removable discontinuity at some } x\\ge 1.`,
          `f\\text{ must satisfy } f(n)=a_n\\text{ only at even integers.}`,
        ],
        explanation: `The integral test applies only when $f$ is positive, continuous, and (eventually) decreasing for $x\\ge 1$; then $\\sum a_n$ and $\\int_{1}^{\\infty}f(x)\\,dx$ share the same convergence behavior. Here $f(x)=xe^{-${a}x}$ is positive and continuous, and since $f'(x)=e^{-${a}x}(1-${a}x)<0$ for $x>\\frac{1}{${a}}$, it is eventually decreasing — so the test applies.`,
      };
    },
  },
  {
    id: "n10-integraltest-2",
    unit: U10,
    topic: "comparison-tests",
    difficulty: "hard",
    track: "BC",
    manifestation: "comparison-tests:integral-test",
    build: (r) => {
      const a = ri(r, 2, 4);
      return {
        prompt: `Using the integral test on $\\displaystyle\\sum_{n=2}^{\\infty}\\frac{1}{n(\\ln n)^{${a}}}$, evaluate $\\displaystyle\\int_{2}^{\\infty}\\frac{dx}{x(\\ln x)^{${a}}}$ and state whether the series converges.`,
        correct: `\\text{The integral converges (it evaluates to a finite value via } u=\\ln x\\text{), so the series converges.}`,
        distractors: [
          `\\text{The integral diverges to } \\infty\\text{, so the series diverges.}`,
          `\\text{The integral equals } 0\\text{, so the series converges to } 0.`,
          `\\text{The integral test cannot be used because } \\ln x\\text{ is not defined at } x=2.`,
        ],
        explanation: `Substituting $u=\\ln x$, $du=\\frac{dx}{x}$, the integral becomes $\\int_{\\ln 2}^{\\infty}u^{-${a}}\\,du$, which converges since $${a}>1$. Because $f(x)=\\frac{1}{x(\\ln x)^{${a}}}$ is positive, continuous, and decreasing for $x\\ge 2$, the integral test confirms the series converges as well.`,
      };
    },
  },
  {
    id: "n10-integraltest-3",
    unit: U10,
    topic: "comparison-tests",
    difficulty: "medium",
    track: "BC",
    manifestation: "comparison-tests:integral-test",
    build: (r) => {
      const a = ri(r, 1, 4);
      return {
        prompt: `A student wants to apply the integral test to $\\displaystyle\\sum_{n=1}^{\\infty}(-1)^{n}\\frac{1}{n^{2}}$. Why is the integral test not valid here?`,
        correct: `\\text{The terms alternate in sign, so } f(x)\\text{ is not positive on } [1,\\infty)\\text{, violating a required hypothesis.}`,
        distractors: [
          `\\text{The integral test is valid here and shows the series diverges.}`,
          `\\text{The integral test cannot be used because } n^{2}\\text{ is not continuous.}`,
          `\\text{The integral test requires the terms to be integers.}`,
        ],
        explanation: `The integral test requires $f(x)$ to be positive (as well as continuous and decreasing) on the interval. Since the series terms alternate in sign, there is no corresponding positive, decreasing function $f$ with $f(n)=a_n$, so the hypotheses fail and the integral test cannot be applied — a different test (like the alternating series test) is needed instead.`,
      };
    },
  },

  /* ---------- ratio-test:interval-endpoints ---------- */
  {
    id: "n10-ratio-endpoints-1",
    unit: U10,
    topic: "ratio-test",
    difficulty: "hard",
    track: "BC",
    manifestation: "ratio-test:interval-endpoints",
    build: (r) => {
      const c = ri(r, 2, 5);
      return {
        prompt: `The ratio test applied to $\\displaystyle\\sum_{n=1}^{\\infty}\\frac{(x-${c})^{n}}{n}$ shows convergence for $|x-${c}|<1$. What must be done to determine the full interval of convergence?`,
        correct: `\\text{Separately test } x=${c - 1}\\text{ and } x=${c + 1}\\text{, since the ratio test gives no information at the endpoints.}`,
        distractors: [
          `\\text{Conclude the interval is exactly } (${c - 1},${c + 1})\\text{, since the ratio test already settles the endpoints.}`,
          `\\text{Assume both endpoints diverge, since the radius of convergence is finite.}`,
          `\\text{Apply the ratio test again at each endpoint to determine convergence there.}`,
        ],
        explanation: `The ratio test only determines the open interval $|x-${c}|<1$, i.e. $(${c - 1},${c + 1})$; at the endpoints the ratio test limit equals exactly $1$, which is always inconclusive. Each endpoint, $x=${c - 1}$ and $x=${c + 1}$, must be substituted into the series and tested individually with a different test (such as the alternating series test or comparison test).`,
      };
    },
  },
  {
    id: "n10-ratio-endpoints-2",
    unit: U10,
    topic: "ratio-test",
    difficulty: "hard",
    track: "BC",
    manifestation: "ratio-test:interval-endpoints",
    build: (r) => {
      const c = ri(r, 1, 4);
      return {
        prompt: `For $\\displaystyle\\sum_{n=1}^{\\infty}\\frac{x^{n}}{n^{2}}$, the ratio test gives radius of convergence $1$, so $-1<x<1$. At $x=-1$ the series becomes $\\sum\\frac{(-1)^n}{n^2}$, and at $x=1$ it becomes $\\sum\\frac{1}{n^2}$. What is the interval of convergence?`,
        correct: `[-1,1]`,
        distractors: [
          `(-1,1)`,
          `[-1,1)`,
          `(-1,1]`,
        ],
        explanation: `At $x=1$, $\\sum\\frac{1}{n^2}$ is a convergent $p$-series ($p=2$). At $x=-1$, $\\sum\\frac{(-1)^n}{n^2}$ converges absolutely by the same $p$-series comparison. Since both endpoints converge, the full interval of convergence is the closed interval $[-1,1]$ — a common mistake is assuming the interval stays open just because the ratio test itself only guarantees the open interval.`,
      };
    },
  },
  {
    id: "n10-ratio-endpoints-3",
    unit: U10,
    topic: "ratio-test",
    difficulty: "hard",
    track: "BC",
    manifestation: "ratio-test:interval-endpoints",
    build: (r) => {
      const c = ri(r, 1, 3);
      return {
        prompt: `For $\\displaystyle\\sum_{n=1}^{\\infty}\\frac{(x+${c})^{n}}{n}$, the ratio test gives $|x+${c}|<1$. At $x=${-c - 1}$ the series is $\\sum\\frac{(-1)^n}{n}$ and at $x=${-c + 1}$ it is $\\sum\\frac{1}{n}$. What is the interval of convergence?`,
        correct: `[${-c - 1},${-c + 1})`,
        distractors: [
          `(${-c - 1},${-c + 1})`,
          `(${-c - 1},${-c + 1}]`,
          `[${-c - 1},${-c + 1}]`,
        ],
        explanation: `At $x=${-c - 1}$, $\\sum\\frac{(-1)^n}{n}$ converges (conditionally) by the alternating series test. At $x=${-c + 1}$, $\\sum\\frac{1}{n}$ is the divergent harmonic series. So only the left endpoint is included: the interval of convergence is $[${-c - 1},${-c + 1})$. Automatically including or excluding both endpoints without checking each individually is the key error to avoid.`,
      };
    },
  },

  /* ---------- ratio-test:inconclusive ---------- */
  {
    id: "n10-ratio-inconclusive-1",
    unit: U10,
    topic: "ratio-test",
    difficulty: "medium",
    track: "BC",
    manifestation: "ratio-test:inconclusive",
    build: (r) => {
      return {
        prompt: `Applying the ratio test to a series $\\sum a_n$, a student finds $\\displaystyle\\lim_{n\\to\\infty}\\left|\\frac{a_{n+1}}{a_n}\\right|=1$. What can be concluded?`,
        correct: `\\text{The ratio test is inconclusive; another test must be used.}`,
        distractors: [
          `\\text{The series converges.}`,
          `\\text{The series diverges.}`,
          `\\text{The series converges conditionally.}`,
        ],
        explanation: `When the ratio test limit equals exactly $1$, the test provides no information — the series could converge (e.g. $\\sum\\frac{1}{n^2}$) or diverge (e.g. $\\sum\\frac{1}{n}$), both of which give a ratio limit of $1$. A different test is required in this case.`,
      };
    },
  },
  {
    id: "n10-ratio-inconclusive-2",
    unit: U10,
    topic: "ratio-test",
    difficulty: "medium",
    track: "BC",
    manifestation: "ratio-test:inconclusive",
    build: (r) => {
      return {
        prompt: `A student applies the ratio test to $\\displaystyle\\sum_{n=1}^{\\infty}\\frac{1}{n}$ and to $\\displaystyle\\sum_{n=1}^{\\infty}\\frac{1}{n^{2}}$, and finds the ratio limit equals $1$ for both series even though one converges and the other diverges. What does this illustrate?`,
        correct: `\\text{A ratio-test limit of } 1\\text{ never determines convergence or divergence — it is always inconclusive.}`,
        distractors: [
          `\\text{The ratio test always fails for } p\\text{-series specifically.}`,
          `\\text{A ratio limit of } 1\\text{ means both series must have the same convergence behavior.}`,
          `\\text{The ratio test result of } 1\\text{ indicates conditional convergence.}`,
        ],
        explanation: `Both $\\sum\\frac{1}{n}$ and $\\sum\\frac{1}{n^2}$ yield a ratio-test limit of exactly $1$, yet the first diverges and the second converges. This is the standard example showing a ratio limit of $1$ carries zero information about convergence, regardless of the series involved.`,
      };
    },
  },
  {
    id: "n10-ratio-inconclusive-3",
    unit: U10,
    topic: "ratio-test",
    difficulty: "medium",
    track: "BC",
    manifestation: "ratio-test:inconclusive",
    build: (r) => {
      const a = ri(r, 2, 5);
      return {
        prompt: `For the series $\\displaystyle\\sum_{n=1}^{\\infty}\\frac{n+${a}}{n^{2}+1}$, the ratio test limit turns out to equal $1$. Which alternative approach correctly determines convergence?`,
        correct: `\\text{Limit comparison with } \\sum\\frac{1}{n}\\text{, which shows the series diverges.}`,
        distractors: [
          `\\text{Concluding convergence directly from the ratio test's value of } 1.`,
          `\\text{Applying the ratio test a second time with a higher power.}`,
          `\\text{Assuming divergence automatically whenever the ratio test gives } 1.`,
        ],
        explanation: `Since the ratio test is inconclusive when its limit is $1$, another test is needed. Comparing $\\frac{n+${a}}{n^2+1}$ to $\\frac{1}{n}$ via the limit comparison test gives $\\lim\\frac{(n+${a})/(n^2+1)}{1/n}=1$, a finite positive value, and since $\\sum\\frac{1}{n}$ diverges, so does the original series.`,
      };
    },
  },

  /* ---------- alternating-series-test:convergence ---------- */
  {
    id: "n10-altseries-conv-1",
    unit: U10,
    topic: "alternating-series-test",
    difficulty: "medium",
    track: "BC",
    manifestation: "alternating-series-test:convergence",
    build: (r) => {
      const a = ri(r, 2, 6);
      return {
        prompt: `Determine whether $\\displaystyle\\sum_{n=1}^{\\infty}\\frac{(-1)^{n}}{n+${a}}$ converges using the alternating series test.`,
        correct: `\\text{Converges, since } \\frac{1}{n+${a}}\\text{ is positive, decreasing, and approaches } 0.`,
        distractors: [
          `\\text{Diverges, since the terms alternate in sign and never settle down.}`,
          `\\text{Converges only if } ${a}\\text{ is even.}`,
          `\\text{The test is inconclusive because the terms are not eventually decreasing.}`,
        ],
        explanation: `Let $b_n=\\frac{1}{n+${a}}$. This is positive for all $n\\ge 1$, decreasing (since the denominator grows), and $\\lim_{n\\to\\infty}b_n=0$. All three hypotheses of the alternating series test are satisfied, so the series converges.`,
      };
    },
  },
  {
    id: "n10-altseries-conv-2",
    unit: U10,
    topic: "alternating-series-test",
    difficulty: "medium",
    track: "BC",
    manifestation: "alternating-series-test:convergence",
    build: (r) => {
      const a = ri(r, 2, 5);
      return {
        prompt: `Does $\\displaystyle\\sum_{n=1}^{\\infty}(-1)^{n+1}\\frac{n}{n^{2}+${a}}$ converge? Apply the alternating series test to decide.`,
        correct: `\\text{Yes, it converges, since } b_n=\\frac{n}{n^{2}+${a}}\\text{ is eventually decreasing and tends to } 0.`,
        distractors: [
          `\\text{No, it diverges, since } \\frac{n}{n^{2}+${a}}\\text{ does not tend to } 0.`,
          `\\text{Yes, but only because the numerator is odd-powered.}`,
          `\\text{The alternating series test cannot apply since the terms are rational functions.}`,
        ],
        explanation: `Since $b_n=\\frac{n}{n^{2}+${a}}\\to 0$ as $n\\to\\infty$, and $b_n$ is decreasing for $n$ large enough (as the denominator's growth dominates), the alternating series test guarantees convergence.`,
      };
    },
  },
  {
    id: "n10-altseries-conv-3",
    unit: U10,
    topic: "alternating-series-test",
    difficulty: "medium",
    track: "BC",
    manifestation: "alternating-series-test:convergence",
    build: (r) => {
      const a = ri(r, 2, 4);
      return {
        prompt: `Consider $\\displaystyle\\sum_{n=1}^{\\infty}\\frac{(-1)^{n}}{\\ln(n+${a})}$. Using the alternating series test, what is the conclusion?`,
        correct: `\\text{Converges, since } \\frac{1}{\\ln(n+${a})}\\text{ is positive, decreasing, and approaches } 0\\text{ as } n\\to\\infty.`,
        distractors: [
          `\\text{Diverges, since } \\ln(n+${a})\\text{ grows without bound.}`,
          `\\text{The test is inconclusive because } \\ln(n+${a})\\text{ is not defined for small } n.`,
          `\\text{Converges absolutely, since } \\frac{1}{\\ln(n+${a})} > \\frac{1}{n}.`,
        ],
        explanation: `As $n\\to\\infty$, $\\ln(n+${a})\\to\\infty$, so $b_n=\\frac{1}{\\ln(n+${a})}\\to 0$, and $b_n$ is decreasing since $\\ln$ is increasing. All hypotheses hold, so the alternating series test confirms convergence (though only conditional, since $\\sum\\frac{1}{\\ln(n+${a})}$ itself diverges by comparison to the harmonic series).`,
      };
    },
  },

  /* ---------- alternating-series-test:absolute-vs-conditional ---------- */
  {
    id: "n10-altseries-abscond-1",
    unit: U10,
    topic: "alternating-series-test",
    difficulty: "hard",
    track: "BC",
    manifestation: "alternating-series-test:absolute-vs-conditional",
    build: (r) => {
      const p = ri(r, 1, 1);
      return {
        prompt: `Classify $\\displaystyle\\sum_{n=1}^{\\infty}\\frac{(-1)^{n}}{n}$ as absolutely convergent, conditionally convergent, or divergent.`,
        correct: `\\text{Conditionally convergent}`,
        distractors: [
          `\\text{Absolutely convergent}`,
          `\\text{Divergent}`,
          `\\text{Convergent, and equal to its absolute-value series}`,
        ],
        explanation: `The series itself converges by the alternating series test, but $\\sum\\left|\\frac{(-1)^n}{n}\\right|=\\sum\\frac{1}{n}$ is the divergent harmonic series. Converging without converging absolutely is exactly the definition of conditional convergence.`,
      };
    },
  },
  {
    id: "n10-altseries-abscond-2",
    unit: U10,
    topic: "alternating-series-test",
    difficulty: "hard",
    track: "BC",
    manifestation: "alternating-series-test:absolute-vs-conditional",
    build: (r) => {
      const p = ri(r, 2, 3);
      return {
        prompt: `Classify $\\displaystyle\\sum_{n=1}^{\\infty}\\frac{(-1)^{n}}{n^{${p}}}$ as absolutely convergent, conditionally convergent, or divergent.`,
        correct: `\\text{Absolutely convergent}`,
        distractors: [
          `\\text{Conditionally convergent}`,
          `\\text{Divergent}`,
          `\\text{Neither convergent nor divergent}`,
        ],
        explanation: `Taking absolute values gives $\\sum\\frac{1}{n^{${p}}}$, a $p$-series with $p=${p}>1$, which converges. Since the series of absolute values already converges, the original alternating series is absolutely convergent (which is a stronger property than the plain convergence the alternating series test alone would show).`,
      };
    },
  },
  {
    id: "n10-altseries-abscond-3",
    unit: U10,
    topic: "alternating-series-test",
    difficulty: "hard",
    track: "BC",
    manifestation: "alternating-series-test:absolute-vs-conditional",
    build: (r) => {
      return {
        prompt: `A student determines that $\\displaystyle\\sum_{n=1}^{\\infty}\\frac{(-1)^{n}}{\\sqrt{n}}$ converges by the alternating series test, then also claims it converges absolutely since it converges. Is this second claim correct?`,
        correct: `\\text{No — } \\sum\\frac{1}{\\sqrt{n}}\\text{ is a divergent } p\\text{-series } (p=\\tfrac12<1)\\text{, so the convergence is only conditional.}`,
        distractors: [
          `\\text{Yes — any series that passes the alternating series test converges absolutely.}`,
          `\\text{Yes — since } \\sqrt{n}\\text{ grows without bound, the absolute series must converge too.}`,
          `\\text{No — the original series does not actually converge at all.}`,
        ],
        explanation: `Convergence by the alternating series test only guarantees convergence of the signed series, not of $\\sum|a_n|$. Here $\\sum\\frac{1}{\\sqrt{n}}$ is a $p$-series with $p=\\frac12<1$, which diverges, so the original series is conditionally, not absolutely, convergent.`,
      };
    },
  },

  /* ---------- alternating-series-test:hypotheses ---------- */
  {
    id: "n10-altseries-hyp-1",
    unit: U10,
    topic: "alternating-series-test",
    difficulty: "medium",
    track: "BC",
    manifestation: "alternating-series-test:hypotheses",
    build: (r) => {
      return {
        prompt: `A student applies the alternating series test to $\\displaystyle\\sum_{n=1}^{\\infty}(-1)^{n}\\left(1+\\frac{1}{n}\\right)$ and concludes it converges, since the terms alternate in sign. What is the flaw?`,
        correct: `\\text{The terms } 1+\\frac{1}{n}\\text{ approach } 1\\text{, not } 0\\text{, so the alternating series test's hypotheses fail; the series actually diverges by the nth-term test.}`,
        distractors: [
          `\\text{There is no flaw; alternating sign alone always guarantees convergence.}`,
          `\\text{The terms are not decreasing, but they do approach } 0\\text{, so the conclusion is still correct.}`,
          `\\text{The series converges absolutely, so the reasoning understates the result.}`,
        ],
        explanation: `The alternating series test requires $b_n\\to 0$. Here $b_n=1+\\frac1n\\to 1\\ne 0$, so the hypothesis fails, and in fact the series diverges by the nth-term test since its terms do not approach zero at all — merely alternating in sign is not sufficient for convergence.`,
      };
    },
  },
  {
    id: "n10-altseries-hyp-2",
    unit: U10,
    topic: "alternating-series-test",
    difficulty: "medium",
    track: "BC",
    manifestation: "alternating-series-test:hypotheses",
    build: (r) => {
      return {
        prompt: `For $\\displaystyle\\sum_{n=1}^{\\infty}(-1)^{n}\\frac{n}{n^{2}+1}$, a student checks that $b_n=\\frac{n}{n^2+1}\\to 0$ but forgets to verify that $b_n$ is decreasing. Why does this matter?`,
        correct: `\\text{Both conditions — } b_n\\to 0 \\text{ and } b_n \\text{ eventually decreasing — are required hypotheses; skipping one leaves the argument incomplete even if the conclusion happens to be true.}`,
        distractors: [
          `\\text{It doesn't matter; } b_n\\to 0\\text{ alone is sufficient for the alternating series test.}`,
          `\\text{It matters because } b_n\\text{ is actually increasing, so the series must diverge.}`,
          `\\text{It matters only for } p\\text{-series, not for this rational sequence.}`,
        ],
        explanation: `The alternating series test has two hypotheses: $b_n\\to 0$ and $b_n$ eventually decreasing. Both must be checked. Here $b_n=\\frac{n}{n^2+1}$ does turn out to be decreasing for $n\\ge 1$ (its derivative as a function of $x$ is negative for $x>1$), so the test does apply, but skipping the verification is a logical gap even though it happens not to change the conclusion.`,
      };
    },
  },
  {
    id: "n10-altseries-hyp-3",
    unit: U10,
    topic: "alternating-series-test",
    difficulty: "medium",
    track: "BC",
    manifestation: "alternating-series-test:hypotheses",
    build: (r) => {
      return {
        prompt: `A student attempts the alternating series test on $\\displaystyle\\sum_{n=1}^{\\infty}(-1)^{n}\\sin\\left(\\frac{1}{n}\\right)$ but does not check whether $\\sin(1/n)$ is eventually decreasing before concluding convergence. Is the conclusion still valid?`,
        correct: `\\text{Yes — } \\sin(1/n)\\text{ is positive, eventually decreasing (since } 1/n\\text{ decreases toward } 0\\text{), and tends to } 0\\text{, so all hypotheses do hold even though the student skipped stating them.}`,
        distractors: [
          `\\text{No — without explicitly checking monotonicity, the test cannot be applied at all, regardless of the actual behavior of the sequence.}`,
          `\\text{No — } \\sin(1/n)\\text{ does not approach } 0\\text{ as } n\\to\\infty.`,
          `\\text{Yes, but only because the series actually diverges, making the hypotheses irrelevant.}`,
        ],
        explanation: `Since $\\frac1n$ decreases to $0$ and $\\sin$ is increasing near $0$, $\\sin(1/n)$ is indeed positive, decreasing, and tends to $0$; the alternating series test's hypotheses are genuinely satisfied. The lesson is that skipping the verification is poor practice, but here the conclusion happens to be correct because the hypotheses were true all along.`,
      };
    },
  },

  /* ---------- taylor-and-maclaurin-series:identify-function ---------- */
  {
    id: "n10-taylor-identify-1",
    unit: U10,
    topic: "taylor-and-maclaurin-series",
    difficulty: "hard",
    track: "BC",
    manifestation: "taylor-and-maclaurin-series:identify-function",
    build: (r) => {
      const funcs = [
        { name: "\\sin x", series: "x - \\frac{x^{3}}{3!} + \\frac{x^{5}}{5!} - \\frac{x^{7}}{7!} + \\cdots", wrong1: "\\cos x", wrong2: "e^{x}", wrong3: "\\arctan x" },
        { name: "\\cos x", series: "1 - \\frac{x^{2}}{2!} + \\frac{x^{4}}{4!} - \\frac{x^{6}}{6!} + \\cdots", wrong1: "\\sin x", wrong2: "\\frac{1}{1-x}", wrong3: "e^{x}" },
        { name: "\\arctan x", series: "x - \\frac{x^{3}}{3} + \\frac{x^{5}}{5} - \\frac{x^{7}}{7} + \\cdots", wrong1: "\\sin x", wrong2: "\\ln(1+x)", wrong3: "\\frac{1}{1+x}" },
        { name: "\\ln(1+x)", series: "x - \\frac{x^{2}}{2} + \\frac{x^{3}}{3} - \\frac{x^{4}}{4} + \\cdots", wrong1: "\\arctan x", wrong2: "e^{x}", wrong3: "\\frac{1}{1+x}" },
        { name: "\\frac{1}{1-x}", series: "1 + x + x^{2} + x^{3} + x^{4} + \\cdots", wrong1: "\\frac{1}{1+x}", wrong2: "e^{x}", wrong3: "\\ln(1+x)" },
        { name: "\\frac{1}{1+x}", series: "1 - x + x^{2} - x^{3} + x^{4} - \\cdots", wrong1: "\\frac{1}{1-x}", wrong2: "\\cos x", wrong3: "\\arctan x" },
      ];
      const f = pick(r, funcs);
      return {
        prompt: `The Maclaurin series $${f.series}$ represents which function?`,
        correct: f.name,
        distractors: [f.wrong1, f.wrong2, f.wrong3],
        explanation: `Matching the pattern of coefficients and powers of $x$ to the standard Maclaurin expansions identifies this as the series for $${f.name}$.`,
      };
    },
  },
  {
    id: "n10-taylor-identify-2",
    unit: U10,
    topic: "taylor-and-maclaurin-series",
    difficulty: "hard",
    track: "BC",
    manifestation: "taylor-and-maclaurin-series:identify-function",
    build: (r) => {
      const funcs = [
        { name: "\\sin x", terms: ["x", "-\\frac{x^{3}}{6}", "\\frac{x^{5}}{120}"] },
        { name: "\\cos x", terms: ["1", "-\\frac{x^{2}}{2}", "\\frac{x^{4}}{24}"] },
        { name: "e^{x}", terms: ["1", "x", "\\frac{x^{2}}{2}"] },
        { name: "\\arctan x", terms: ["x", "-\\frac{x^{3}}{3}", "\\frac{x^{5}}{5}"] },
        { name: "\\ln(1+x)", terms: ["x", "-\\frac{x^{2}}{2}", "\\frac{x^{3}}{3}"] },
        { name: "\\frac{1}{1+x}", terms: ["1", "-x", "x^{2}"] },
      ];
      const f = pick(r, funcs);
      const fracPartner: Record<string, string> = { "\\frac{1}{1+x}": "\\frac{1}{1-x}", "\\frac{1}{1-x}": "\\frac{1}{1+x}" };
      const other = funcs.filter((g) => g.name !== f.name && g.name !== fracPartner[f.name]);
      const shuffledOthers = fracPartner[f.name]
        ? [{ name: fracPartner[f.name] }, other[0], other[1]]
        : [other[0], other[1], other[2]];
      return {
        prompt: `A power series has first three nonzero terms $${f.terms[0]}$, $${f.terms[1]}$, $${f.terms[2]}$ in its Maclaurin expansion. Which function does this series represent?`,
        correct: f.name,
        distractors: shuffledOthers.map((g) => g!.name),
        explanation: `Comparing these first three terms to the standard Maclaurin series (for $\\sin x$, $\\cos x$, $e^x$, $\\arctan x$, $\\ln(1+x)$, and $\\frac{1}{1+x}$) identifies the series uniquely as that of $${f.name}$.`,
      };
    },
  },
  {
    id: "n10-taylor-identify-3",
    unit: U10,
    topic: "taylor-and-maclaurin-series",
    difficulty: "hard",
    track: "BC",
    manifestation: "taylor-and-maclaurin-series:identify-function",
    build: (r) => {
      const funcs = [
        { name: "\\sin x", gen: "\\sum_{n=0}^{\\infty}\\frac{(-1)^{n}x^{2n+1}}{(2n+1)!}" },
        { name: "\\cos x", gen: "\\sum_{n=0}^{\\infty}\\frac{(-1)^{n}x^{2n}}{(2n)!}" },
        { name: "\\arctan x", gen: "\\sum_{n=0}^{\\infty}\\frac{(-1)^{n}x^{2n+1}}{2n+1}" },
        { name: "\\ln(1+x)", gen: "\\sum_{n=1}^{\\infty}\\frac{(-1)^{n+1}x^{n}}{n}" },
        { name: "\\frac{1}{1-x}", gen: "\\sum_{n=0}^{\\infty}x^{n}" },
        { name: "\\frac{1}{1+x}", gen: "\\sum_{n=0}^{\\infty}(-1)^{n}x^{n}" },
      ];
      const f = pick(r, funcs);
      const fracPartner2: Record<string, string> = { "\\frac{1}{1+x}": "\\frac{1}{1-x}", "\\frac{1}{1-x}": "\\frac{1}{1+x}" };
      const others = funcs.filter((g) => g.name !== f.name && g.name !== fracPartner2[f.name]);
      const distractors = fracPartner2[f.name]
        ? [fracPartner2[f.name], others[0].name, others[1].name]
        : [others[0].name, others[1].name, others[2].name];
      return {
        prompt: `The general term formula $\\displaystyle${f.gen}$ is the Maclaurin series of which function?`,
        correct: f.name,
        distractors,
        explanation: `Recognizing the pattern of signs, powers of $x$, and denominators in $${f.gen}$ against the six standard Maclaurin expansions identifies the function as $${f.name}$.`,
      };
    },
  },

  /* ---------- lagrange-error-bound:degree-needed ---------- */
  {
    id: "n10-lagrange-degree-1",
    unit: U10,
    topic: "lagrange-error-bound",
    difficulty: "hard",
    track: "BC",
    manifestation: "lagrange-error-bound:degree-needed",
    build: (r) => {
      const k = ri(r, 2, 4);
      return {
        prompt: `Using the Lagrange error bound with $|f^{(n+1)}(x)|\\le 1$ for all relevant $x$, what is the smallest degree $n$ such that a Taylor polynomial centered at $0$ approximates $f$ at $x=\\frac{1}{2}$ with error less than $\\dfrac{1}{10^{${k}}}$, given the bound $\\left|R_n\\right|\\le \\dfrac{(1/2)^{n+1}}{(n+1)!}$?`,
        correct: `\\text{The smallest } n \\text{ for which } \\dfrac{(1/2)^{n+1}}{(n+1)!} < \\dfrac{1}{10^{${k}}}.`,
        distractors: [
          `\\text{The smallest } n \\text{ for which } \\dfrac{(1/2)^{n}}{n!} < \\dfrac{1}{10^{${k}}}\\text{ (using the } n\\text{th derivative bound instead of the } (n+1)\\text{th).}`,
          `\\text{The smallest } n \\text{ for which } (1/2)^{n+1} < \\dfrac{1}{10^{${k}}}\\text{ (ignoring the factorial in the denominator).}`,
          `\\text{The largest } n \\text{ for which } \\dfrac{(1/2)^{n+1}}{(n+1)!} < \\dfrac{1}{10^{${k}}}.`,
        ],
        explanation: `The Lagrange error bound is $|R_n(x)|\\le\\dfrac{M|x-c|^{n+1}}{(n+1)!}$ where $M$ bounds $|f^{(n+1)}|$. Setting $M=1$, $x-c=\\frac12$, the required condition is $\\dfrac{(1/2)^{n+1}}{(n+1)!}<\\dfrac{1}{10^{${k}}}$, and one must find the *smallest* such $n$ (using the correct exponent $n+1$ and factorial $(n+1)!$), since larger $n$ only shrinks the bound further.`,
      };
    },
  },
  {
    id: "n10-lagrange-degree-2",
    unit: U10,
    topic: "lagrange-error-bound",
    difficulty: "hard",
    track: "BC",
    manifestation: "lagrange-error-bound:degree-needed",
    build: (r) => {
      const M = ri(r, 1, 3);
      return {
        prompt: `Suppose $|f^{(n+1)}(x)|\\le ${M}$ for all $x$ near $c=0$, and we want the degree-$n$ Taylor polynomial to approximate $f(1)$ with error at most $0.001$. Which inequality must $n$ satisfy?`,
        correct: `\\dfrac{${M}\\cdot 1^{n+1}}{(n+1)!} \\le 0.001`,
        distractors: [
          `\\dfrac{${M}\\cdot 1^{n}}{n!} \\le 0.001`,
          `\\dfrac{1^{n+1}}{(n+1)!} \\le \\dfrac{0.001}{${M}}\\cdot ${M}`,
          `${M}\\cdot 1^{n+1} \\le 0.001\\cdot(n+1)!\\cdot 2`,
        ],
        explanation: `The Lagrange error bound gives $|R_n(1)|\\le\\dfrac{${M}\\cdot|1-0|^{n+1}}{(n+1)!}=\\dfrac{${M}}{(n+1)!}$. Requiring this to be at most $0.001$ gives the inequality $\\dfrac{${M}}{(n+1)!}\\le 0.001$, and the smallest $n$ satisfying it is the needed degree.`,
      };
    },
  },
  {
    id: "n10-lagrange-degree-3",
    unit: U10,
    topic: "lagrange-error-bound",
    difficulty: "hard",
    track: "BC",
    manifestation: "lagrange-error-bound:degree-needed",
    build: (r) => {
      return {
        prompt: `For $f(x)=\\cos x$ centered at $0$, all derivatives satisfy $|f^{(k)}(x)|\\le 1$. To guarantee the degree-$n$ Maclaurin polynomial approximates $\\cos(1)$ with error under $\\frac{1}{100}$, a student must find the smallest $n$ with $\\dfrac{1}{(n+1)!}<\\dfrac{1}{100}$. Testing $n=3$ gives $\\frac{1}{24}\\approx 0.0417$, and $n=4$ gives $\\frac{1}{120}\\approx 0.0083$. What is the smallest valid degree $n$?`,
        correct: `4`,
        distractors: [
          `3`,
          `5`,
          `2`,
        ],
        explanation: `We need $\\frac{1}{(n+1)!}<0.01$. At $n=3$, $\\frac{1}{4!}=\\frac{1}{24}\\approx0.0417$, too large. At $n=4$, $\\frac{1}{5!}=\\frac{1}{120}\\approx0.0083<0.01$, which works. So the smallest sufficient degree is $n=4$.`,
      };
    },
  },

  /* ---------- lagrange-error-bound:interpret ---------- */
  {
    id: "n10-lagrange-interpret-1",
    unit: U10,
    topic: "lagrange-error-bound",
    difficulty: "medium",
    track: "BC",
    manifestation: "lagrange-error-bound:interpret",
    build: (r) => {
      return {
        prompt: `A Taylor polynomial $P_n(x)$ satisfies the Lagrange error bound $|f(x)-P_n(x)|\\le 0.02$ near $x=c$. Which statement correctly interprets this bound?`,
        correct: `\\text{The actual error is at most } 0.02\\text{; it could be much smaller, but is guaranteed not to exceed it.}`,
        distractors: [
          `\\text{The actual error is exactly } 0.02.`,
          `\\text{The approximation is guaranteed to be accurate to at least } 2\\text{ decimal places for every } x.`,
          `\\text{The bound guarantees } P_n(x)\\text{ converges to } f(x)\\text{ as } n\\to\\infty\\text{ for all } x.`,
        ],
        explanation: `The Lagrange error bound is an upper bound on the magnitude of the error, not its exact value — the true error may be considerably smaller. It says nothing by itself about convergence as $n\\to\\infty$ or about accuracy at values of $x$ outside the interval it was derived for.`,
      };
    },
  },
  {
    id: "n10-lagrange-interpret-2",
    unit: U10,
    topic: "lagrange-error-bound",
    difficulty: "medium",
    track: "BC",
    manifestation: "lagrange-error-bound:interpret",
    build: (r) => {
      return {
        prompt: `A student computes a Lagrange error bound of $0.5$ for a degree-$2$ Taylor approximation and concludes, "since $0.5$ is large, the approximation must be bad." What is the flaw in this reasoning?`,
        correct: `\\text{A large error bound only means the guarantee is weak — the actual error could still be small; the bound is not the actual error.}`,
        distractors: [
          `\\text{There is no flaw; a bound of } 0.5\\text{ always means the approximation is inaccurate.}`,
          `\\text{The student should have used a lower-degree polynomial to shrink the bound.}`,
          `\\text{The bound of } 0.5\\text{ proves the polynomial does not converge to } f(x).`,
        ],
        explanation: `The Lagrange error bound provides only a worst-case upper limit on the error; a large bound merely reflects a weak or loose guarantee, not necessarily a large actual error. The actual error could be far smaller than $0.5$ — one cannot conclude the approximation is "bad" from the bound alone.`,
      };
    },
  },
  {
    id: "n10-lagrange-interpret-3",
    unit: U10,
    topic: "lagrange-error-bound",
    difficulty: "medium",
    track: "BC",
    manifestation: "lagrange-error-bound:interpret",
    build: (r) => {
      return {
        prompt: `A student uses the Lagrange error bound to show $|f(1)-P_3(1)|\\le 0.001$. What does this NOT guarantee?`,
        correct: `\\text{It does not guarantee that } |f(1)-P_3(1)| \\text{ is close to } 0.001\\text{; the true error could be much smaller.}`,
        distractors: [
          `\\text{It does not guarantee that the error is nonnegative.}`,
          `\\text{It does not guarantee } P_3(1)\\text{ is a real number.}`,
          `\\text{It does not guarantee } f(1)\\text{ exists.}`,
        ],
        explanation: `The bound $0.001$ is only a ceiling on the possible error — the actual error at $x=1$ could be, say, $0.00001$, far below the bound. Interpreting the bound as an estimate of the error's actual size (rather than a guaranteed maximum) is the common misconception.`,
      };
    },
  },

  /* ---------- lagrange-error-bound:compare-actual ---------- */
  {
    id: "n10-lagrange-compare-1",
    unit: U10,
    topic: "lagrange-error-bound",
    difficulty: "hard",
    track: "BC",
    manifestation: "lagrange-error-bound:compare-actual",
    build: (r) => {
      return {
        prompt: `For $f(x)=e^{x}$ near $x=0$, the third-degree Maclaurin polynomial gives $P_3(1)=1+1+\\frac12+\\frac16=2.6\\overline{6}$. Since $e\\approx 2.71828$, the actual error is about $0.0516$. Using $|f^{(4)}(x)|\\le e$ on $[0,1]$, the Lagrange bound is $\\dfrac{e\\cdot 1^{4}}{4!}\\approx 0.1133$. What does the comparison show?`,
        correct: `\\text{The actual error } (0.0516) \\text{ is smaller than the Lagrange bound } (0.1133)\\text{, consistent with the bound being an upper limit.}`,
        distractors: [
          `\\text{The actual error exceeds the Lagrange bound, showing the bound was computed incorrectly.}`,
          `\\text{The actual error and the bound must always be equal for } e^{x}.`,
          `\\text{Since the actual error is smaller, the Lagrange bound formula does not apply here.}`,
        ],
        explanation: `The Lagrange error bound is designed to be an upper bound, so the true error ($\\approx 0.0516$) being smaller than the bound ($\\approx 0.1133$) is exactly the expected relationship — the bound need not be tight, only correct as a ceiling.`,
      };
    },
  },
  {
    id: "n10-lagrange-compare-2",
    unit: U10,
    topic: "lagrange-error-bound",
    difficulty: "hard",
    track: "BC",
    manifestation: "lagrange-error-bound:compare-actual",
    build: (r) => {
      return {
        prompt: `Using $P_2(x)=1-\\frac{x^2}{2}$ to approximate $\\cos(0.5)$, the actual value is $\\cos(0.5)\\approx 0.87758$ while $P_2(0.5)=1-0.125=0.875$, giving an actual error of about $0.00258$. The Lagrange bound with $|f^{(3)}(x)|\\le 1$ gives $\\dfrac{(0.5)^{3}}{3!}\\approx 0.02083$. What can be concluded?`,
        correct: `\\text{The Lagrange bound } (0.02083) \\text{ safely overestimates the true error } (0.00258)\\text{, as it should.}`,
        distractors: [
          `\\text{The Lagrange bound underestimates the actual error, so more terms are needed.}`,
          `\\text{The two values should match exactly, so a computational error was made.}`,
          `\\text{Since the actual error is smaller, the approximation } P_2(x) \\text{ must be exact.}`,
        ],
        explanation: `A valid Lagrange error bound must be at least as large as the true error, and here $0.02083 > 0.00258$, confirming the bound is a valid (if not tight) guarantee — it is normal, even typical, for the true error to be noticeably smaller than the bound.`,
      };
    },
  },
  {
    id: "n10-lagrange-compare-3",
    unit: U10,
    topic: "lagrange-error-bound",
    difficulty: "hard",
    track: "BC",
    manifestation: "lagrange-error-bound:compare-actual",
    build: (r) => {
      return {
        prompt: `A student computes a Lagrange error bound of $0.004$ for a Taylor approximation, then computes the actual error directly (using a known closed form for $f$) and finds it equals $0.009$. What should the student conclude?`,
        correct: `\\text{An error was made somewhere, since the actual error can never exceed a correctly computed Lagrange bound.}`,
        distractors: [
          `\\text{This is expected — the actual error is often larger than the Lagrange bound.}`,
          `\\text{The Taylor polynomial itself must be incorrect, unrelated to the bound.}`,
          `\\text{The bound and the actual error are independent quantities that need not be compared.}`,
        ],
        explanation: `Because the Lagrange error bound is a guaranteed upper limit on $|f(x)-P_n(x)|$, a correctly derived bound can never be smaller than the true error. Finding the actual error larger than the computed bound signals an arithmetic or setup mistake, most often in choosing $M$ (the bound on the $(n+1)$th derivative) or the value of $|x-c|$.`,
      };
    },
  },

  /* ---------- power-series-operations:differentiate ---------- */
  {
    id: "n10-powerseries-diff-1",
    unit: U10,
    topic: "power-series-operations",
    difficulty: "hard",
    track: "BC",
    manifestation: "power-series-operations:differentiate",
    build: (r) => {
      return {
        prompt: `Given $\\dfrac{1}{1-x}=\\displaystyle\\sum_{n=0}^{\\infty}x^{n}$, differentiate term by term to find a power series for $\\dfrac{1}{(1-x)^{2}}$.`,
        correct: `\\sum_{n=1}^{\\infty}nx^{n-1}`,
        distractors: [
          `\\sum_{n=0}^{\\infty}nx^{n}`,
          `\\sum_{n=1}^{\\infty}x^{n-1}`,
          `\\sum_{n=0}^{\\infty}(n+1)x^{n+1}`,
        ],
        explanation: `Differentiating $\\frac{1}{1-x}=\\sum_{n=0}^{\\infty}x^n$ term by term gives $\\frac{1}{(1-x)^2}=\\sum_{n=1}^{\\infty}nx^{n-1}$ (the $n=0$ term vanishes since its derivative is $0$), matching the known derivative $\\frac{d}{dx}\\left[\\frac{1}{1-x}\\right]=\\frac{1}{(1-x)^2}$.`,
      };
    },
  },
  {
    id: "n10-powerseries-diff-2",
    unit: U10,
    topic: "power-series-operations",
    difficulty: "hard",
    track: "BC",
    manifestation: "power-series-operations:differentiate",
    build: (r) => {
      return {
        prompt: `Since $\\sin x=\\displaystyle\\sum_{n=0}^{\\infty}\\frac{(-1)^{n}x^{2n+1}}{(2n+1)!}$, differentiating term by term should reproduce the Maclaurin series for $\\cos x$. Which series results?`,
        correct: `\\sum_{n=0}^{\\infty}\\frac{(-1)^{n}x^{2n}}{(2n)!}`,
        distractors: [
          `\\sum_{n=0}^{\\infty}\\frac{(-1)^{n}x^{2n+1}}{(2n)!}`,
          `\\sum_{n=0}^{\\infty}\\frac{(-1)^{n+1}x^{2n}}{(2n)!}`,
          `\\sum_{n=1}^{\\infty}\\frac{(-1)^{n}x^{2n-1}}{(2n-1)!}`,
        ],
        explanation: `Differentiating each term $\\frac{(-1)^n x^{2n+1}}{(2n+1)!}$ gives $\\frac{(-1)^n(2n+1)x^{2n}}{(2n+1)!}=\\frac{(-1)^nx^{2n}}{(2n)!}$, so summing over $n$ reproduces exactly the Maclaurin series for $\\cos x$, confirming $\\frac{d}{dx}[\\sin x]=\\cos x$ term by term.`,
      };
    },
  },
  {
    id: "n10-powerseries-diff-3",
    unit: U10,
    topic: "power-series-operations",
    difficulty: "hard",
    track: "BC",
    manifestation: "power-series-operations:differentiate",
    build: (r) => {
      return {
        prompt: `Given $\\ln(1+x)=\\displaystyle\\sum_{n=1}^{\\infty}\\frac{(-1)^{n+1}x^{n}}{n}$, differentiate term by term to obtain a series for $\\dfrac{1}{1+x}$.`,
        correct: `\\sum_{n=1}^{\\infty}(-1)^{n+1}x^{n-1}`,
        distractors: [
          `\\sum_{n=1}^{\\infty}\\frac{(-1)^{n+1}x^{n-1}}{n-1}`,
          `\\sum_{n=1}^{\\infty}(-1)^{n}x^{n-1}`,
          `\\sum_{n=1}^{\\infty}(-1)^{n+1}x^{n}`,
        ],
        explanation: `Differentiating each term of $\\ln(1+x)$'s series, $\\frac{d}{dx}\\left[\\frac{(-1)^{n+1}x^n}{n}\\right]=(-1)^{n+1}x^{n-1}$, and summing over $n\\ge 1$ reindexes to exactly $\\sum_{n=0}^{\\infty}(-1)^n x^n=\\frac{1}{1+x}$, confirming $\\frac{d}{dx}[\\ln(1+x)]=\\frac{1}{1+x}$.`,
      };
    },
  },

  /* ---------- power-series-operations:integrate ---------- */
  {
    id: "n10-powerseries-int-1",
    unit: U10,
    topic: "power-series-operations",
    difficulty: "hard",
    track: "BC",
    manifestation: "power-series-operations:integrate",
    build: (r) => {
      return {
        prompt: `Integrating $\\dfrac{1}{1+x^{2}}=\\displaystyle\\sum_{n=0}^{\\infty}(-1)^{n}x^{2n}$ term by term from $0$ to $x$ produces the Maclaurin series for which function?`,
        correct: `\\arctan x`,
        distractors: [
          `\\ln(1+x^{2})`,
          `\\arcsin x`,
          `\\frac{x}{1+x^{2}}`,
        ],
        explanation: `Integrating term by term, $\\int_0^x\\sum_{n=0}^\\infty(-1)^nt^{2n}\\,dt=\\sum_{n=0}^{\\infty}\\frac{(-1)^nx^{2n+1}}{2n+1}$, which is exactly the known Maclaurin series for $\\arctan x$, matching $\\frac{d}{dx}[\\arctan x]=\\frac{1}{1+x^2}$.`,
      };
    },
  },
  {
    id: "n10-powerseries-int-2",
    unit: U10,
    topic: "power-series-operations",
    difficulty: "hard",
    track: "BC",
    manifestation: "power-series-operations:integrate",
    build: (r) => {
      return {
        prompt: `Integrating $\\dfrac{1}{1+x}=\\displaystyle\\sum_{n=0}^{\\infty}(-1)^{n}x^{n}$ term by term from $0$ to $x$ gives a series for which function?`,
        correct: `\\ln(1+x)`,
        distractors: [
          `\\frac{1}{1-x}`,
          `\\ln(1-x)`,
          `\\arctan x`,
        ],
        explanation: `Term-by-term integration gives $\\int_0^x\\sum_{n=0}^\\infty (-1)^n t^n\\,dt = \\sum_{n=0}^{\\infty}\\frac{(-1)^nx^{n+1}}{n+1}=\\sum_{n=1}^{\\infty}\\frac{(-1)^{n+1}x^n}{n}$, which is the standard Maclaurin series for $\\ln(1+x)$, consistent with $\\frac{d}{dx}[\\ln(1+x)]=\\frac{1}{1+x}$.`,
      };
    },
  },
  {
    id: "n10-powerseries-int-3",
    unit: U10,
    topic: "power-series-operations",
    difficulty: "hard",
    track: "BC",
    manifestation: "power-series-operations:integrate",
    build: (r) => {
      return {
        prompt: `Using $\\cos x=\\displaystyle\\sum_{n=0}^{\\infty}\\frac{(-1)^{n}x^{2n}}{(2n)!}$, integrate term by term from $0$ to $x$. Which series results, and what function does it represent?`,
        correct: `\\sum_{n=0}^{\\infty}\\frac{(-1)^{n}x^{2n+1}}{(2n+1)!}\\text{, the Maclaurin series for } \\sin x.`,
        distractors: [
          `\\sum_{n=0}^{\\infty}\\frac{(-1)^{n}x^{2n+1}}{(2n)!}\\text{, the Maclaurin series for } \\sin x.`,
          `\\sum_{n=0}^{\\infty}\\frac{(-1)^{n}x^{2n-1}}{(2n-1)!}\\text{, the Maclaurin series for } \\cos x.`,
          `\\sum_{n=0}^{\\infty}\\frac{(-1)^{n+1}x^{2n+1}}{(2n+1)!}\\text{, the Maclaurin series for } -\\sin x.`,
        ],
        explanation: `Integrating each term, $\\int_0^x\\frac{(-1)^nt^{2n}}{(2n)!}\\,dt=\\frac{(-1)^nx^{2n+1}}{(2n)!(2n+1)}=\\frac{(-1)^nx^{2n+1}}{(2n+1)!}$, and summing reproduces exactly the Maclaurin series for $\\sin x$, consistent with $\\int_0^x\\cos t\\,dt=\\sin x$.`,
      };
    },
  },

  /* ---------- power-series-operations:limit-from-series ---------- */
  {
    id: "n10-powerseries-limit-1",
    unit: U10,
    topic: "power-series-operations",
    difficulty: "hard",
    track: "BC",
    manifestation: "power-series-operations:limit-from-series",
    build: (r) => {
      return {
        prompt: `Use the Maclaurin series for $\\sin x$ to evaluate $\\displaystyle\\lim_{x\\to 0}\\frac{\\sin x - x}{x^{3}}$.`,
        correct: `-\\frac{1}{6}`,
        distractors: [
          `\\frac{1}{6}`,
          `0`,
          `-1`,
        ],
        explanation: `Since $\\sin x = x - \\frac{x^3}{6} + \\frac{x^5}{120}-\\cdots$, we get $\\sin x - x = -\\frac{x^3}{6}+\\frac{x^5}{120}-\\cdots$. Dividing by $x^3$ and letting $x\\to 0$, every term but the first vanishes, leaving $-\\frac{1}{6}$.`,
      };
    },
  },
  {
    id: "n10-powerseries-limit-2",
    unit: U10,
    topic: "power-series-operations",
    difficulty: "hard",
    track: "BC",
    manifestation: "power-series-operations:limit-from-series",
    build: (r) => {
      return {
        prompt: `Use the Maclaurin series for $\\cos x$ to evaluate $\\displaystyle\\lim_{x\\to 0}\\frac{1-\\cos x}{x^{2}}$.`,
        correct: `\\frac{1}{2}`,
        distractors: [
          `-\\frac{1}{2}`,
          `0`,
          `1`,
        ],
        explanation: `Since $\\cos x = 1-\\frac{x^2}{2}+\\frac{x^4}{24}-\\cdots$, we have $1-\\cos x=\\frac{x^2}{2}-\\frac{x^4}{24}+\\cdots$. Dividing by $x^2$ and taking $x\\to0$ leaves $\\frac12$, matching the well-known limit.`,
      };
    },
  },
  {
    id: "n10-powerseries-limit-3",
    unit: U10,
    topic: "power-series-operations",
    difficulty: "hard",
    track: "BC",
    manifestation: "power-series-operations:limit-from-series",
    build: (r) => {
      return {
        prompt: `Use the Maclaurin series for $\\arctan x$ to evaluate $\\displaystyle\\lim_{x\\to 0}\\frac{\\arctan x - x}{x^{3}}$.`,
        correct: `-\\frac{1}{3}`,
        distractors: [
          `\\frac{1}{3}`,
          `0`,
          `-1`,
        ],
        explanation: `Since $\\arctan x = x - \\frac{x^3}{3}+\\frac{x^5}{5}-\\cdots$, we get $\\arctan x - x = -\\frac{x^3}{3}+\\frac{x^5}{5}-\\cdots$. Dividing by $x^3$ and letting $x\\to 0$ leaves $-\\frac13$.`,
      };
    },
  },
];
