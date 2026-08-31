/**
 * Master Guide completeness index.
 *
 * Every formula, theorem, technique, rule, and table in the AP Calculus BC
 * Master Guide becomes one entry here. `scripts/master-guide-audit.ts` walks the
 * generated bank and fails when an entry has fewer than `min` questions, so
 * "comprehensive" is a checked property rather than a claim.
 *
 * `match` is tested against the question's prompt + choices + explanation, and
 * `topics` restricts which user topics can satisfy the entry.
 */

export type GuideEntry = {
  id: string;
  page: number;
  label: string;
  topics: string[];
  match: RegExp;
  min?: number;
};

const MIN = 3;

export const GUIDE_ENTRIES: GuideEntry[] = [
  /* ---------------- page 1: limits, continuity ---------------- */
  { id: "lim-factor", page: 1, label: "Factorization and cancellation", topics: ["evaluating-limits-algebraically"], match: /factor|cancel/i },
  { id: "lim-conjugate", page: 1, label: "Rationalization / conjugates", topics: ["evaluating-limits-algebraically"], match: /conjugate|rationaliz|\\sqrt/i },
  { id: "lim-onesided", page: 1, label: "One-sided limits and existence", topics: ["limits-from-graphs-and-tables", "evaluating-limits-algebraically", "continuity-and-discontinuity"], match: /\^-|\^\+|one-sided|left-hand|right-hand/i },
  { id: "lim-graph", page: 1, label: "Limits estimated from a graph", topics: ["limits-from-graphs-and-tables"], match: /graph/i },
  { id: "lim-table", page: 1, label: "Limits estimated from a table", topics: ["limits-from-graphs-and-tables"], match: /table/i },
  { id: "cont-three", page: 1, label: "Three conditions for continuity", topics: ["continuity-and-discontinuity"], match: /continuous|continuity/i },
  { id: "disc-removable", page: 1, label: "Removable discontinuity", topics: ["continuity-and-discontinuity"], match: /removable/i },
  { id: "disc-jump", page: 1, label: "Jump discontinuity", topics: ["continuity-and-discontinuity"], match: /jump/i },
  { id: "disc-infinite", page: 1, label: "Infinite discontinuity / vertical asymptote", topics: ["continuity-and-discontinuity", "limits-at-infinity"], match: /vertical asymptote|infinite discontinuity/i },
  { id: "diff-breaks", page: 1, label: "Corners, cusps, vertical tangents break differentiability", topics: ["differentiability-and-continuity"], match: /corner|cusp|vertical tangent/i },
  { id: "trig-lim-sin", page: 1, label: "Special trig limit sin(ax)/bx", topics: ["evaluating-limits-algebraically", "squeeze-theorem"], match: /\\sin/i },
  { id: "trig-lim-cos", page: 1, label: "Special trig limit (1 - cos x)/x", topics: ["evaluating-limits-algebraically", "squeeze-theorem"], match: /\\cos/i },
  { id: "squeeze", page: 1, label: "Squeeze (sandwich) theorem", topics: ["squeeze-theorem"], match: /squeeze|sandwich|\\le/i },
  { id: "ivt", page: 1, label: "Intermediate Value Theorem", topics: ["intermediate-value-theorem"], match: /intermediate value|IVT/i },
  { id: "mvt", page: 1, label: "Mean Value Theorem", topics: ["mean-value-theorem"], match: /mean value|MVT/i },
  { id: "ha-radical", page: 1, label: "Horizontal asymptote of ax/sqrt(bx^2+c)", topics: ["limits-at-infinity"], match: /\\sqrt/i },
  { id: "ha-rational", page: 1, label: "Horizontal asymptotes / end behavior", topics: ["limits-at-infinity"], match: /horizontal asymptote|\\to\s*\\infty|as x/i },

  /* ---------------- page 2: L'Hopital, derivative rules ---------------- */
  { id: "lhopital", page: 2, label: "L'Hopital's rule", topics: ["lhopitals-rule"], match: /Hopital|H\\Ĥ|indeterminate/i },
  { id: "lhopital-forms", page: 2, label: "Indeterminate forms 0/0 and inf/inf", topics: ["lhopitals-rule"], match: /\\frac\{0\}\{0\}|\\infty/i },
  { id: "def-deriv-h", page: 2, label: "Limit definition of the derivative (h form)", topics: ["definition-of-the-derivative"], match: /h\s*\\to\s*0|f\(x\s*\+\s*h\)/i },
  { id: "def-deriv-alt", page: 2, label: "Alternate definition at a point", topics: ["definition-of-the-derivative"], match: /x\s*\\to\s*a|\\frac\{f\(x\)\s*-\s*f\(/i },
  { id: "d-trig", page: 2, label: "Derivatives of the six trig functions", topics: ["derivatives-of-trig-exp-log"], match: /\\sin|\\cos|\\tan|\\sec|\\csc|\\cot/i },
  { id: "d-invtrig", page: 2, label: "Derivatives of inverse trig functions", topics: ["inverse-trig-derivatives"], match: /arcsin|arccos|arctan|\\sin\^\{-1\}|\\tan\^\{-1\}/i },
  { id: "d-exp", page: 2, label: "Derivative of e^x and a^x", topics: ["derivatives-of-trig-exp-log"], match: /e\^|a\^x|\\ln a/i },
  { id: "d-log", page: 2, label: "Derivative of ln x and log_a x", topics: ["derivatives-of-trig-exp-log"], match: /\\ln|\\log/i },
  { id: "d-power", page: 2, label: "Power rule", topics: ["power-rule"], match: /x\^/i },
  { id: "d-product", page: 2, label: "Product rule", topics: ["product-and-quotient-rules"], match: /product/i },
  { id: "d-quotient", page: 2, label: "Quotient rule", topics: ["product-and-quotient-rules"], match: /quotient|\\frac/i },

  /* ---------------- page 3: chain, implicit, extrema ---------------- */
  { id: "chain", page: 3, label: "Chain rule", topics: ["chain-rule"], match: /chain|composite|f\(g\(x\)\)/i },
  { id: "d-inverse-fn", page: 3, label: "Derivative of an inverse function", topics: ["derivatives-of-inverse-functions"], match: /inverse/i },
  { id: "implicit", page: 3, label: "Implicit differentiation", topics: ["implicit-differentiation"], match: /implicit|\\frac\{dy\}\{dx\}/i },
  { id: "higher-order", page: 3, label: "Higher-order derivatives", topics: ["higher-order-derivatives", "implicit-differentiation"], match: /second derivative|f''|\\frac\{d\^2/i },
  { id: "crit-points", page: 3, label: "Critical points", topics: ["critical-points"], match: /critical/i },
  { id: "inflection", page: 3, label: "Inflection points require a sign change", topics: ["second-derivative-test", "curve-sketching"], match: /inflection/i },
  { id: "evt", page: 3, label: "Extreme Value Theorem", topics: ["local-and-global-extrema"], match: /extreme value|EVT|closed interval/i },
  { id: "fdt", page: 3, label: "First derivative test", topics: ["first-derivative-test"], match: /increas|decreas|local max|local min/i },
  { id: "concavity", page: 3, label: "Concavity from f''", topics: ["second-derivative-test", "curve-sketching"], match: /concave/i },
  { id: "sdt", page: 3, label: "Second derivative test", topics: ["second-derivative-test"], match: /f''|second derivative/i },
  { id: "related-rates", page: 3, label: "Related rates procedure", topics: ["related-rates"], match: /\\frac\{d.\}\{dt\}|per second|per minute|rate/i },
  { id: "optimization", page: 3, label: "Optimization procedure", topics: ["optimization"], match: /minimi|maximi|least|greatest/i },

  /* ---------------- page 4: motion, linearization, Riemann ---------------- */
  { id: "motion-vel", page: 4, label: "Position, velocity, acceleration", topics: ["rectilinear-motion"], match: /velocity|acceleration|position/i },
  { id: "motion-speed", page: 4, label: "Speed = |v(t)|", topics: ["rectilinear-motion"], match: /speed/i },
  { id: "motion-distance", page: 4, label: "Total distance vs displacement", topics: ["rectilinear-motion", "accumulation-in-context"], match: /total distance|displacement/i },
  { id: "linearization", page: 4, label: "Linearization / tangent line approximation", topics: ["linearization"], match: /tangent line approximation|linear approximation|approximate/i },
  { id: "lin-over-under", page: 4, label: "Over- or under-estimate from concavity", topics: ["linearization"], match: /overestimate|underestimate/i },
  { id: "riemann-left", page: 4, label: "Left Riemann sum", topics: ["riemann-sums"], match: /left/i },
  { id: "riemann-right", page: 4, label: "Right Riemann sum", topics: ["riemann-sums"], match: /right/i },
  { id: "riemann-mid", page: 4, label: "Midpoint rule", topics: ["riemann-sums"], match: /midpoint/i },
  { id: "riemann-trap", page: 4, label: "Trapezoidal rule", topics: ["riemann-sums"], match: /trapezoid/i },
  { id: "riemann-overunder", page: 4, label: "Over/under-estimate from monotonicity and concavity", topics: ["riemann-sums"], match: /overestimate|underestimate/i },
  { id: "riemann-sigma", page: 4, label: "Limit of a Riemann sum as a definite integral", topics: ["riemann-sums"], match: /\\sum|\\lim_\{n/i },
  { id: "riemann-unequal", page: 4, label: "Unequal subintervals from a table", topics: ["riemann-sums"], match: /table|subinterval/i },

  /* ---------------- page 5: antiderivatives, substitution, parts, FTC ---------------- */
  { id: "int-trig", page: 5, label: "Antiderivatives of trig functions", topics: ["u-substitution", "fundamental-theorem-of-calculus"], match: /\\sin|\\cos|\\tan|\\sec|\\csc|\\cot/i },
  { id: "int-sec2", page: 5, label: "Antiderivatives of sec^2, csc^2, sec tan, csc cot", topics: ["u-substitution", "fundamental-theorem-of-calculus"], match: /\\sec\^|\\csc\^|\\sec x\s*\\tan|\\csc x\s*\\cot/i },
  { id: "int-tan-sec", page: 5, label: "Integrals of tan, cot, sec, csc with ln", topics: ["u-substitution"], match: /\\ln\s*\\?\|?\s*\\?(cos|sin|sec|csc)/i },
  { id: "int-invtrig", page: 5, label: "Inverse trig antiderivative forms", topics: ["u-substitution", "fundamental-theorem-of-calculus"], match: /arctan|arcsin|\\tan\^\{-1\}|\\sin\^\{-1\}/i },
  { id: "int-exp", page: 5, label: "Antiderivatives of e^x and a^x", topics: ["u-substitution", "fundamental-theorem-of-calculus"], match: /e\^|a\^x/i },
  { id: "int-recip", page: 5, label: "Integral of 1/x with absolute value", topics: ["u-substitution", "fundamental-theorem-of-calculus"], match: /\\ln\s*\\?\|/i },
  { id: "usub", page: 5, label: "u-substitution", topics: ["u-substitution"], match: /substitut|u\s*=/i },
  { id: "usub-bounds", page: 5, label: "Changing bounds in a definite substitution", topics: ["u-substitution"], match: /bound|limits of integration/i },
  { id: "parts", page: 5, label: "Integration by parts", topics: ["integration-by-parts"], match: /parts|u\s*dv|uv\s*-/i },
  { id: "ftc1", page: 5, label: "FTC Part 1", topics: ["fundamental-theorem-of-calculus", "accumulation-functions"], match: /\\frac\{d\}\{dx\}|derivative of/i },
  { id: "ftc1-chain", page: 5, label: "FTC Part 1 with a chain rule", topics: ["fundamental-theorem-of-calculus"], match: /\^\{[^}]*x[^}]*\}|upper (bound|limit)/i },
  { id: "ftc2", page: 5, label: "FTC Part 2", topics: ["fundamental-theorem-of-calculus"], match: /F\(b\)|antiderivative|evaluate/i },
  { id: "partial-fractions", page: 5, label: "Partial fractions", topics: ["partial-fractions"], match: /partial fraction|\\frac\{A\}/i },

  /* ---------------- page 6: improper integrals, applications ---------------- */
  { id: "improper-inf", page: 6, label: "Improper integral with an infinite bound", topics: ["improper-integrals"], match: /\\infty/i },
  { id: "improper-disc", page: 6, label: "Improper integral with an interior discontinuity", topics: ["improper-integrals"], match: /discontinu|unbounded/i },
  { id: "improper-limit", page: 6, label: "Improper integrals written as limits", topics: ["improper-integrals"], match: /\\lim/i },
  { id: "improper-conv", page: 6, label: "Convergence / divergence of improper integrals", topics: ["improper-integrals"], match: /converg|diverg/i },
  { id: "avg-value", page: 6, label: "Average value of a function", topics: ["average-value"], match: /average value|\\frac\{1\}\{b\s*-\s*a\}/i },
  { id: "avg-units", page: 6, label: "Average value in context with units", topics: ["average-value", "accumulation-in-context"], match: /meters|liters|gallons|degrees|units|per/i },
  { id: "area-x", page: 6, label: "Area between curves in x", topics: ["area-between-curves"], match: /dx/i },
  { id: "area-y", page: 6, label: "Area between curves in y", topics: ["area-between-curves"], match: /dy/i },
  { id: "disks", page: 6, label: "Disk method", topics: ["volume-disks-and-washers"], match: /disk/i },
  { id: "washers", page: 6, label: "Washer method", topics: ["volume-disks-and-washers"], match: /washer/i },
  { id: "shells", page: 6, label: "Shell method", topics: ["volume-disks-and-washers"], match: /shell/i },
  { id: "cross-square", page: 6, label: "Cross sections: squares", topics: ["volume-known-cross-sections"], match: /square/i },
  { id: "cross-triangle", page: 6, label: "Cross sections: triangles", topics: ["volume-known-cross-sections"], match: /triangle/i },
  { id: "cross-semicircle", page: 6, label: "Cross sections: semicircles", topics: ["volume-known-cross-sections"], match: /semicircle/i },

  /* ---------------- page 7: arc length, differential equations ---------------- */
  { id: "arclen-x", page: 7, label: "Arc length in x", topics: ["arc-length"], match: /dx/i },
  { id: "arclen-y", page: 7, label: "Arc length in y", topics: ["arc-length"], match: /dy/i },
  { id: "euler", page: 7, label: "Euler's method", topics: ["eulers-method"], match: /Euler|step size|\\Delta x/i },
  { id: "separable", page: 7, label: "Separation of variables", topics: ["separable-differential-equations"], match: /separ|dy|dx/i },
  { id: "separable-ic", page: 7, label: "Applying an initial condition", topics: ["separable-differential-equations", "exponential-growth-and-decay"], match: /initial|y\(0\)|passes through/i },
  { id: "expgrowth", page: 7, label: "Exponential growth and decay", topics: ["exponential-growth-and-decay"], match: /e\^\{?k|growth|decay|half-life/i },
  { id: "logistic", page: 7, label: "Logistic growth model", topics: ["logistic-growth"], match: /logistic|carrying capacity/i },
  { id: "logistic-half", page: 7, label: "Fastest growth at M/2", topics: ["logistic-growth"], match: /fastest|maximum rate|most rapidly/i },
  { id: "cooling", page: 7, label: "Newton's law of cooling", topics: ["separable-differential-equations", "exponential-growth-and-decay"], match: /cool|temperature|ambient|surrounding/i },
  { id: "slope-field", page: 7, label: "Slope fields", topics: ["slope-fields"], match: /slope field/i },

  /* ---------------- page 8: parametric, polar, vectors, series start ---------------- */
  { id: "param-dydx", page: 8, label: "dy/dx for a parametric curve", topics: ["parametric-derivatives"], match: /\\frac\{dy\}\{dx\}|\\frac\{dy\/dt\}/i },
  { id: "param-d2", page: 8, label: "Second derivative of a parametric curve", topics: ["parametric-derivatives"], match: /d\^2y|second derivative/i },
  { id: "param-arclen", page: 8, label: "Parametric arc length", topics: ["parametric-arc-length"], match: /\\sqrt/i },
  { id: "polar-convert", page: 8, label: "Polar / Cartesian conversion", topics: ["polar-derivatives", "polar-area"], match: /\\cos\s*\\theta|\\sin\s*\\theta|r\^2/i },
  { id: "polar-area", page: 8, label: "Polar area of one region", topics: ["polar-area"], match: /\\frac\{1\}\{2\}\s*\\int|area/i },
  { id: "polar-two", page: 8, label: "Area between two polar curves", topics: ["polar-area"], match: /between|r_1|r_2|two curves/i },
  { id: "polar-arclen", page: 8, label: "Polar arc length", topics: ["polar-derivatives", "parametric-arc-length"], match: /\\frac\{dr\}\{d\\theta\}|arc length/i },
  { id: "vector-motion", page: 8, label: "Vector position, velocity, acceleration", topics: ["vector-valued-functions"], match: /vector|\\langle/i },
  { id: "vector-speed", page: 8, label: "Speed and distance travelled for a vector path", topics: ["vector-valued-functions", "parametric-arc-length"], match: /speed|distance/i },
  { id: "partial-sums", page: 8, label: "Partial sums", topics: ["nth-term-test", "geometric-and-p-series"], match: /partial sum|S_\d|S_n/i },
  { id: "geometric", page: 8, label: "Geometric series convergence and sum", topics: ["geometric-and-p-series"], match: /geometric/i },
  { id: "geometric-index", page: 8, label: "Geometric series with a shifted index", topics: ["geometric-and-p-series"], match: /n\s*=\s*[1-9]/i },

  /* ---------------- page 9: Taylor, Maclaurin, error bounds ---------------- */
  { id: "power-series", page: 9, label: "Power series form", topics: ["power-series-operations"], match: /power series|c_n|\(x\s*-\s*a\)\^n/i },
  { id: "taylor", page: 9, label: "Taylor series construction", topics: ["taylor-and-maclaurin-series"], match: /Taylor/i },
  { id: "maclaurin", page: 9, label: "Maclaurin series", topics: ["taylor-and-maclaurin-series"], match: /Maclaurin|centered at\s*\$?0/i },
  { id: "mac-exp", page: 9, label: "Maclaurin series for e^x", topics: ["taylor-and-maclaurin-series", "power-series-operations"], match: /e\^/i },
  { id: "mac-sin", page: 9, label: "Maclaurin series for sin x", topics: ["taylor-and-maclaurin-series", "power-series-operations"], match: /\\sin/i },
  { id: "mac-cos", page: 9, label: "Maclaurin series for cos x", topics: ["taylor-and-maclaurin-series", "power-series-operations"], match: /\\cos/i },
  { id: "mac-geo", page: 9, label: "Maclaurin series for 1/(1-x) and 1/(1+x)", topics: ["power-series-operations", "geometric-and-p-series"], match: /\\frac\{1\}\{1\s*[-+]\s*x\}/i },
  { id: "mac-ln", page: 9, label: "Maclaurin series for ln(1+x)", topics: ["power-series-operations", "taylor-and-maclaurin-series"], match: /\\ln\(1\s*\+\s*x\)/i },
  { id: "mac-arctan", page: 9, label: "Maclaurin series for arctan x", topics: ["power-series-operations", "taylor-and-maclaurin-series"], match: /arctan|\\tan\^\{-1\}/i },
  { id: "series-manip", page: 9, label: "Manipulating known series", topics: ["power-series-operations"], match: /differentiat|integrat|substitut|multiply/i },
  { id: "lagrange", page: 9, label: "Lagrange error bound", topics: ["lagrange-error-bound"], match: /Lagrange|error bound|R_n/i },
  { id: "alt-error", page: 9, label: "Alternating series error bound", topics: ["lagrange-error-bound", "alternating-series-test"], match: /alternating series (error|remainder)|a_\{n\s*\+\s*1\}/i },

  /* ---------------- page 10: convergence tests ---------------- */
  { id: "nth-term", page: 10, label: "nth-term test", topics: ["nth-term-test"], match: /nth-term|n\\text\{th\}|term test|\\lim_\{n/i },
  { id: "p-series", page: 10, label: "p-series", topics: ["geometric-and-p-series"], match: /p-series|\\frac\{1\}\{n\^/i },
  { id: "ast", page: 10, label: "Alternating series test", topics: ["alternating-series-test"], match: /alternating/i },
  { id: "integral-test", page: 10, label: "Integral test", topics: ["comparison-tests"], match: /integral test/i },
  { id: "dct", page: 10, label: "Direct comparison test", topics: ["comparison-tests"], match: /direct comparison/i },
  { id: "lct", page: 10, label: "Limit comparison test", topics: ["comparison-tests"], match: /limit comparison/i },
  { id: "ratio", page: 10, label: "Ratio test", topics: ["ratio-test"], match: /ratio test|\\frac\{a_\{n\s*\+\s*1\}\}/i },
  { id: "ratio-inconclusive", page: 10, label: "Ratio test inconclusive at L = 1", topics: ["ratio-test"], match: /inconclusive|L\s*=\s*1/i },
  { id: "abs-cond", page: 10, label: "Absolute vs conditional convergence", topics: ["alternating-series-test", "comparison-tests"], match: /absolutely|conditionally/i },
  { id: "radius", page: 10, label: "Radius of convergence", topics: ["ratio-test", "power-series-operations"], match: /radius/i },
  { id: "interval", page: 10, label: "Interval of convergence with endpoint checks", topics: ["ratio-test", "power-series-operations"], match: /interval of convergence|endpoint/i },
].map((e) => ({ ...e, min: (e as { min?: number }).min ?? MIN }));

export const GUIDE_ENTRY_COUNT = GUIDE_ENTRIES.length;
