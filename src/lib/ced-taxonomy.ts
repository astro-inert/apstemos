/**
 * CED taxonomy for the AP Calculus MCQ bank.
 *
 * The *displayed* structure never changes: 10 units and the same 59 user
 * topics defined in `question-navigator-data.ts`. Underneath, each user topic
 * maps to the College Board CED topics it actually covers and to an inventory
 * of **manifestations** — materially different mathematical ways the concept
 * can legitimately be tested.
 *
 *   unit → CED topic → user topic → concept → manifestation
 *          ↳ representation ↳ reasoning ↳ algebraic structure ↳ misconceptions
 *
 * Coverage is measured against this inventory, not against a question count.
 */

export type Representation =
  | "symbolic"
  | "graphical"
  | "tabular"
  | "verbal"
  | "contextual"
  | "mixed";

export type ReasoningType =
  | "computation"
  | "concept-recognition"
  | "procedure-selection"
  | "interpretation"
  | "comparison"
  | "estimation"
  | "classification"
  | "reverse"
  | "parameter"
  | "must-be-true"
  | "error-analysis"
  | "insufficient-info"
  | "equivalent-forms"
  | "synthesis";

export type AlgebraicStructure =
  | "plain"
  | "factoring"
  | "conjugate"
  | "common-denominator"
  | "rewriting-powers"
  | "identities"
  | "substitution"
  | "division"
  | "partial-fractions"
  | "completing-square"
  | "equivalent-forms";

export type Manifestation = {
  /** stable id, unique across the bank */
  id: string;
  /** user topic slug (displayed, unchanged) */
  topic: string;
  /** internal CED topic label(s) this manifestation belongs to */
  ced: string;
  /** short human label */
  label: string;
  representation: Representation;
  reasoning: ReasoningType;
  algebra?: AlgebraicStructure;
  /** common-mistake codes this manifestation's distractors should exploit */
  misconceptions?: string[];
};

type Row = [
  id: string,
  label: string,
  representation: Representation,
  reasoning: ReasoningType,
  algebra?: AlgebraicStructure,
];

const group = (topic: string, ced: string, rows: Row[]): Manifestation[] =>
  rows.map(([id, label, representation, reasoning, algebra]) => ({
    id: `${topic}:${id}`,
    topic,
    ced,
    label,
    representation,
    reasoning,
    algebra,
  }));

/* ------------------------------------------------------------------ */
/* Unit 1 — Limits and Continuity                                      */
/* ------------------------------------------------------------------ */

const U1 = [
  ...group("evaluating-limits-algebraically", "LIM-1.C / LIM-1.D — limit properties and algebraic manipulation", [
    ["direct-substitution", "Direct substitution across function families", "symbolic", "computation"],
    ["removable-factor", "0/0 resolved by factoring and cancellation", "symbolic", "computation", "factoring"],
    ["conjugate", "Radical difference resolved by a conjugate", "symbolic", "computation", "conjugate"],
    ["complex-fraction", "Nested fraction requiring a common denominator", "symbolic", "computation", "common-denominator"],
    ["limit-properties", "Combining limits of f and g from given values", "symbolic", "computation"],
    ["procedure-choice", "Which technique resolves this limit", "symbolic", "procedure-selection"],
    ["parameter", "Value of a parameter making the limit exist", "symbolic", "parameter"],
    ["trig-identity", "Trigonometric structure requiring an identity", "symbolic", "computation", "identities"],
  ]),
  ...group("limits-from-graphs-and-tables", "LIM-1.B — estimating limits from graphs and tables", [
    ["graph-one-sided", "One-sided limits read from a graph", "graphical", "interpretation"],
    ["graph-vs-value", "Limit value versus function value at a point", "graphical", "comparison"],
    ["table-estimate", "Estimating a limit from tabulated values", "tabular", "estimation"],
    ["table-insufficient", "Table data that cannot determine the limit", "tabular", "insufficient-info"],
    ["notation", "Which limit statement matches the displayed behavior", "graphical", "concept-recognition"],
    ["composite-graph", "Limit of a composition read from two graphs", "graphical", "synthesis"],
  ]),
  ...group("squeeze-theorem", "LIM-1.E — Squeeze Theorem", [
    ["bounded-oscillation", "Bounded oscillating factor times a vanishing factor", "symbolic", "computation"],
    ["explicit-bounds", "Bounding functions supplied symbolically", "symbolic", "must-be-true"],
    ["graph-bounds", "Bounding curves given graphically", "graphical", "interpretation"],
    ["table-bounds", "Numerical bounds supplied in a table", "tabular", "estimation"],
    ["valid-argument", "Which squeeze argument is valid", "verbal", "error-analysis"],
    ["at-infinity", "Squeeze reasoning as x grows without bound", "symbolic", "computation"],
  ]),
  ...group("continuity-and-discontinuity", "LIM-2.A–2.C — continuity at a point and over an interval", [
    ["classify", "Classifying a discontinuity as removable, jump, or infinite", "symbolic", "classification"],
    ["piecewise-parameter", "Parameter that makes a piecewise function continuous", "symbolic", "parameter"],
    ["two-parameters", "Two parameters forcing continuity and matching slopes", "symbolic", "parameter"],
    ["graph-classify", "Reading discontinuity type off a graph", "graphical", "classification"],
    ["removable-repair", "Redefining a function to remove a discontinuity", "symbolic", "reverse"],
    ["definition", "Which condition of continuity fails", "verbal", "concept-recognition"],
    ["interval", "Continuity over an interval versus at a point", "verbal", "must-be-true"],
  ]),
  ...group("intermediate-value-theorem", "LIM-2.D — Intermediate Value Theorem", [
    ["guaranteed-value", "Value guaranteed on a closed interval", "symbolic", "must-be-true"],
    ["table-root", "Table data guaranteeing a root", "tabular", "must-be-true"],
    ["hypotheses", "Whether the hypotheses are satisfied", "verbal", "error-analysis"],
    ["cannot-conclude", "Conclusion the IVT does not support", "verbal", "must-be-true"],
    ["count-solutions", "Minimum number of guaranteed solutions", "graphical", "comparison"],
  ]),
  ...group("limits-at-infinity", "LIM-2.D / LIM-1.E — infinite limits and end behavior", [
    ["rational-degrees", "Rational end behavior by degree comparison", "symbolic", "computation"],
    ["radical-end", "Radical end behavior and hidden absolute value", "symbolic", "computation", "rewriting-powers"],
    ["exp-log-growth", "Exponential versus polynomial versus logarithmic growth", "symbolic", "comparison"],
    ["vertical-asymptote", "Infinite limits and vertical asymptotes", "symbolic", "classification"],
    ["asymptote-count", "Locating all asymptotes of a rational function", "symbolic", "synthesis", "factoring"],
    ["graph-end", "End behavior read from a graph", "graphical", "interpretation"],
    ["parameter-asymptote", "Parameter giving a prescribed horizontal asymptote", "symbolic", "reverse"],
  ]),
];

/* ------------------------------------------------------------------ */
/* Unit 2 — Definition and fundamental properties                      */
/* ------------------------------------------------------------------ */

const U2 = [
  ...group("definition-of-the-derivative", "FUN-1.A / CHA-2.B — difference quotients and derivative definition", [
    ["recognize-limit", "Recognizing a limit as a derivative at a point", "symbolic", "concept-recognition"],
    ["evaluate-quotient", "Evaluating a difference quotient directly", "symbolic", "computation"],
    ["equivalent-forms", "Equivalent difference-quotient expressions", "symbolic", "comparison", "equivalent-forms"],
    ["table-estimate", "Estimating f'(a) from a table", "tabular", "estimation"],
    ["graph-slope", "Estimating a derivative from a graph", "graphical", "estimation"],
    ["average-vs-instant", "Average rate versus instantaneous rate", "contextual", "comparison"],
    ["tangent-line", "Tangent-line equation at a point", "symbolic", "computation"],
  ]),
  ...group("power-rule", "FUN-3.A — basic derivative rules", [
    ["polynomial", "Polynomial and constant-multiple differentiation", "symbolic", "computation"],
    ["negative-fractional", "Negative and fractional powers", "symbolic", "computation", "rewriting-powers"],
    ["radical-rewrite", "Radicals rewritten as powers before differentiating", "symbolic", "computation", "rewriting-powers"],
    ["simplify-first", "Expression simplified before differentiating", "symbolic", "procedure-selection", "equivalent-forms"],
    ["evaluate-at-point", "Derivative evaluated at a point", "symbolic", "computation"],
    ["reverse", "Recovering a function from its derivative data", "symbolic", "reverse"],
  ]),
  ...group("product-and-quotient-rules", "FUN-3.B — product and quotient rules", [
    ["product-symbolic", "Product rule on symbolic factors", "symbolic", "computation"],
    ["quotient-symbolic", "Quotient rule with algebraic simplification", "symbolic", "computation", "factoring"],
    ["table-values", "Product/quotient derivative from a table of values", "tabular", "computation"],
    ["graph-values", "Product/quotient derivative from graphs of f and g", "graphical", "synthesis"],
    ["procedure-choice", "Which rule is required for this expression", "symbolic", "procedure-selection"],
    ["error-analysis", "Locating the error in a product/quotient computation", "symbolic", "error-analysis"],
    ["rewrite-avoids-quotient", "Rewriting a quotient to avoid the quotient rule", "symbolic", "equivalent-forms"],
  ]),
  ...group("derivatives-of-trig-exp-log", "FUN-3.A — derivatives of elementary functions", [
    ["standard", "Derivatives of sin, cos, e^x, ln x", "symbolic", "computation"],
    ["secant-family", "Derivatives of tan, cot, sec, csc", "symbolic", "computation"],
    ["combined", "Sums and constant multiples of elementary functions", "symbolic", "computation"],
    ["evaluate-special-angle", "Derivative evaluated at a special angle", "symbolic", "computation"],
    ["identity-first", "Identity applied before differentiating", "symbolic", "procedure-selection", "identities"],
    ["match-derivative", "Matching a function to its derivative graph", "graphical", "comparison"],
  ]),
  ...group("differentiability-and-continuity", "FUN-2.A — differentiability implies continuity", [
    ["corner-cusp", "Corners, cusps, and vertical tangents", "graphical", "classification"],
    ["piecewise-parameters", "Parameters making a piecewise function differentiable", "symbolic", "parameter"],
    ["implication", "Which implication between the two properties holds", "verbal", "must-be-true"],
    ["counterexample", "Function continuous but not differentiable", "symbolic", "concept-recognition"],
    ["table-evidence", "What tabulated values can and cannot establish", "tabular", "insufficient-info"],
  ]),
];

/* ------------------------------------------------------------------ */
/* Unit 3 — Composite, implicit, inverse                                */
/* ------------------------------------------------------------------ */

const U3 = [
  ...group("chain-rule", "FUN-3.C — chain rule", [
    ["single-composition", "One outer and one inner function", "symbolic", "computation"],
    ["nested-double", "Two nested compositions", "symbolic", "computation"],
    ["with-product", "Chain rule combined with the product rule", "symbolic", "synthesis"],
    ["table-composition", "Composite derivative from a table", "tabular", "computation"],
    ["graph-composition", "Composite derivative from graphs", "graphical", "synthesis"],
    ["hidden-composition", "Algebraic form concealing the composition", "symbolic", "procedure-selection", "equivalent-forms"],
    ["error-analysis", "Missing or unnecessary inner-derivative factor", "symbolic", "error-analysis"],
  ]),
  ...group("implicit-differentiation", "FUN-3.D — implicit differentiation", [
    ["solve-dydx", "Solving for dy/dx in a polynomial relation", "symbolic", "computation"],
    ["with-product", "Relation containing a product of x and y", "symbolic", "computation"],
    ["trig-exp-relation", "Trigonometric or exponential relation", "symbolic", "computation"],
    ["tangent-line", "Tangent line at a point on the curve", "symbolic", "computation"],
    ["horizontal-vertical", "Where the tangent is horizontal or vertical", "symbolic", "classification"],
    ["second-derivative", "Second derivative implicitly", "symbolic", "synthesis"],
    ["error-analysis", "Omitted dy/dx factor in a proposed solution", "symbolic", "error-analysis"],
  ]),
  ...group("derivatives-of-inverse-functions", "FUN-3.E — derivatives of inverse functions", [
    ["formula-at-point", "Inverse derivative at a point from f'", "symbolic", "computation"],
    ["table", "Inverse derivative from a table of f and f'", "tabular", "computation"],
    ["tangent-to-inverse", "Tangent line to the inverse function", "symbolic", "synthesis"],
    ["reciprocal-concept", "Reciprocal relationship between slopes", "verbal", "concept-recognition"],
    ["graph-reflection", "Reflection across y = x read graphically", "graphical", "interpretation"],
  ]),
  ...group("inverse-trig-derivatives", "FUN-3.E — inverse trigonometric derivatives", [
    ["arcsin-arctan", "Derivatives of arcsin, arccos, arctan", "symbolic", "computation"],
    ["with-chain", "Inverse trig combined with the chain rule", "symbolic", "computation"],
    ["evaluate", "Evaluating an inverse trig derivative at a point", "symbolic", "computation"],
    ["match-integral", "Recognizing the matching antiderivative form", "symbolic", "procedure-selection"],
    ["context", "Inverse trig derivative in an applied setting", "contextual", "interpretation"],
  ]),
  ...group("higher-order-derivatives", "FUN-3.F — higher-order derivatives", [
    ["compute-second", "Second and third derivatives symbolically", "symbolic", "computation"],
    ["pattern", "Pattern in repeated derivatives", "symbolic", "concept-recognition"],
    ["from-graph", "Sign of f'' read from the graph of f'", "graphical", "interpretation"],
    ["context-meaning", "Meaning of the second derivative in context", "contextual", "interpretation"],
    ["table", "Second-derivative estimate from tabulated f'", "tabular", "estimation"],
  ]),
];

/* ------------------------------------------------------------------ */
/* Unit 4 — Contextual applications                                     */
/* ------------------------------------------------------------------ */

const U4 = [
  ...group("related-rates", "CHA-3.D / CHA-3.E — related rates", [
    ["geometric-area", "Area or perimeter changing with a dimension", "contextual", "computation"],
    ["volume", "Volume of a cone, sphere, or cylinder", "contextual", "computation"],
    ["pythagorean", "Right-triangle distance relationships", "contextual", "computation"],
    ["similar-triangles", "Shadow and similar-triangle setups", "contextual", "synthesis"],
    ["trig-angle", "Angle of elevation changing over time", "contextual", "computation"],
    ["setup", "Which equation correctly relates the rates", "verbal", "procedure-selection"],
    ["sign-interpretation", "Interpreting the sign of a computed rate", "contextual", "interpretation"],
  ]),
  ...group("linearization", "CHA-3.F — linear approximation", [
    ["approximate-value", "Approximating a function value", "symbolic", "computation"],
    ["over-under", "Over- or underestimate from concavity", "symbolic", "comparison"],
    ["context", "Linear approximation in an applied context", "contextual", "estimation"],
    ["table", "Tangent-line approximation from tabulated data", "tabular", "estimation"],
    ["reverse", "Recovering f or f' from an approximation", "symbolic", "reverse"],
  ]),
  ...group("lhopitals-rule", "LIM-4.A — L'Hospital's Rule", [
    ["zero-over-zero", "0/0 indeterminate form", "symbolic", "computation"],
    ["infinity-over-infinity", "∞/∞ indeterminate form", "symbolic", "computation"],
    ["repeated", "Rule applied more than once", "symbolic", "computation"],
    ["rewrite-first", "Product or difference rewritten as a quotient", "symbolic", "procedure-selection", "equivalent-forms"],
    ["applicability", "Whether the rule legitimately applies", "symbolic", "error-analysis"],
    ["parameter", "Parameter making a limit take a given value", "symbolic", "parameter"],
  ]),
  ...group("rectilinear-motion", "CHA-3.B — straight-line motion", [
    ["velocity-acceleration", "Velocity and acceleration from position", "symbolic", "computation"],
    ["speed-increasing", "When speed is increasing or decreasing", "symbolic", "must-be-true"],
    ["direction-change", "When the particle changes direction", "symbolic", "classification"],
    ["graph-velocity", "Motion read from a velocity graph", "graphical", "interpretation"],
    ["table-motion", "Motion data supplied in a table", "tabular", "estimation"],
    ["displacement-vs-distance", "Displacement contrasted with distance traveled", "contextual", "comparison"],
  ]),
  ...group("rates-of-change-in-context", "CHA-3.A / CHA-3.C — rates in applied contexts", [
    ["units", "Units of a derivative in context", "contextual", "interpretation"],
    ["meaning", "Meaning of f'(a) in words", "contextual", "interpretation"],
    ["second-derivative", "Interpreting f'' in context", "contextual", "interpretation"],
    ["compare-rates", "Comparing rates across intervals", "tabular", "comparison"],
    ["graph-rate", "Rate behavior read from a graph", "graphical", "interpretation"],
    ["non-motion", "Applied rate outside a motion context", "contextual", "computation"],
  ]),
];

/* ------------------------------------------------------------------ */
/* Unit 5 — Analytical applications                                     */
/* ------------------------------------------------------------------ */

const U5 = [
  ...group("mean-value-theorem", "FUN-1.B — Mean Value Theorem", [
    ["find-c", "Finding the guaranteed value of c", "symbolic", "computation"],
    ["hypotheses", "Whether the hypotheses hold", "symbolic", "error-analysis"],
    ["table-conclusion", "Conclusion guaranteed by tabulated data", "tabular", "must-be-true"],
    ["graph", "Average slope matched to an instantaneous slope", "graphical", "interpretation"],
    ["context", "MVT interpreted in an applied setting", "contextual", "interpretation"],
    ["invalid-application", "Improper use of the theorem", "verbal", "error-analysis"],
  ]),
  ...group("critical-points", "FUN-4.A — critical numbers and EVT", [
    ["locate", "Locating critical numbers", "symbolic", "computation", "factoring"],
    ["undefined-derivative", "Critical numbers where f' fails to exist", "symbolic", "classification"],
    ["not-extremum", "Critical point that is not an extremum", "symbolic", "must-be-true"],
    ["graph", "Critical numbers read from a graph of f'", "graphical", "interpretation"],
    ["evt-hypotheses", "Extreme Value Theorem hypotheses", "verbal", "concept-recognition"],
  ]),
  ...group("first-derivative-test", "FUN-4.A — increasing/decreasing and the first derivative test", [
    ["intervals", "Intervals of increase and decrease", "symbolic", "computation", "factoring"],
    ["sign-chart", "Local extrema from a sign chart", "symbolic", "classification"],
    ["from-fprime-graph", "Extrema of f from the graph of f'", "graphical", "interpretation"],
    ["table-sign", "Behavior inferred from tabulated f'", "tabular", "must-be-true"],
    ["parameter", "Parameter controlling where extrema occur", "symbolic", "parameter"],
    ["reverse", "Which f' produces the described behavior", "symbolic", "reverse"],
  ]),
  ...group("second-derivative-test", "FUN-4.A — concavity and the second derivative test", [
    ["inflection", "Locating inflection points", "symbolic", "computation"],
    ["concavity-intervals", "Intervals of concavity", "symbolic", "computation"],
    ["classify-extremum", "Classifying an extremum with f''", "symbolic", "classification"],
    ["from-graph", "Concavity read from the graph of f'", "graphical", "interpretation"],
    ["inconclusive", "When the second derivative test fails", "verbal", "must-be-true"],
    ["table", "Concavity inferred from tabulated values", "tabular", "estimation"],
  ]),
  ...group("local-and-global-extrema", "FUN-4.A — global extrema on an interval", [
    ["candidates-test", "Candidates test on a closed interval", "symbolic", "computation"],
    ["endpoint-extremum", "Extremum occurring at an endpoint", "symbolic", "comparison"],
    ["open-interval", "Global extrema on an open or unbounded interval", "symbolic", "must-be-true"],
    ["graph", "Global extrema from a graph", "graphical", "interpretation"],
    ["context", "Maximum of an applied quantity", "contextual", "synthesis"],
  ]),
  ...group("optimization", "FUN-4.B / FUN-4.C — optimization", [
    ["geometry-constraint", "Geometric constraint with a fixed perimeter or area", "contextual", "synthesis"],
    ["box-volume", "Maximizing volume of a constructed solid", "contextual", "synthesis"],
    ["distance", "Minimizing a distance", "contextual", "synthesis"],
    ["cost", "Minimizing cost or material", "contextual", "synthesis"],
    ["setup", "Which function should be optimized", "verbal", "procedure-selection"],
    ["justification", "Justifying that a candidate is the extremum", "verbal", "must-be-true"],
  ]),
  ...group("curve-sketching", "FUN-4.A — connecting f, f', and f''", [
    ["match-graphs", "Matching f with f' and f''", "graphical", "comparison"],
    ["from-sign-chart", "Shape implied by sign information", "symbolic", "synthesis"],
    ["table-behavior", "Behavior implied by tabulated derivative values", "tabular", "must-be-true"],
    ["must-be-true", "Which statement about f must be true", "graphical", "must-be-true"],
    ["error-analysis", "Incorrect conclusion drawn from f'", "verbal", "error-analysis"],
  ]),
];

/* ------------------------------------------------------------------ */
/* Unit 6 — Integration and accumulation                                */
/* ------------------------------------------------------------------ */

const U6 = [
  ...group("riemann-sums", "LIM-5.A–5.C — Riemann and trapezoidal sums", [
    ["left-right", "Left and right sums with equal widths", "tabular", "computation"],
    ["midpoint", "Midpoint sum", "symbolic", "computation"],
    ["trapezoidal-unequal", "Trapezoidal sum with unequal widths", "tabular", "computation"],
    ["over-under", "Over- or underestimate from monotonicity or concavity", "symbolic", "comparison"],
    ["sigma-to-integral", "Sigma notation translated to a definite integral", "symbolic", "concept-recognition"],
    ["construct", "Constructing the sum that matches a description", "verbal", "reverse"],
    ["graph-sum", "Riemann sum built from a graph", "graphical", "estimation"],
  ]),
  ...group("fundamental-theorem-of-calculus", "FUN-5.A / FUN-6.B — both forms of the FTC", [
    ["ftc1-basic", "Derivative of an accumulation function", "symbolic", "computation"],
    ["ftc1-chain", "Variable limit requiring the chain rule", "symbolic", "synthesis"],
    ["ftc1-both-limits", "Both limits of integration variable", "symbolic", "synthesis"],
    ["ftc2-evaluate", "Evaluating a definite integral by antiderivative", "symbolic", "computation"],
    ["net-change", "Net change from a rate function", "contextual", "interpretation"],
    ["graph-area", "Definite integral evaluated from a graph's area", "graphical", "interpretation"],
    ["error-analysis", "Misapplied FTC statement", "verbal", "error-analysis"],
  ]),
  ...group("u-substitution", "FUN-6.D — substitution", [
    ["polynomial-inner", "Polynomial inner function", "symbolic", "computation", "substitution"],
    ["trig-inner", "Trigonometric substitution pattern", "symbolic", "computation", "substitution"],
    ["exp-log", "Exponential and logarithmic patterns", "symbolic", "computation", "substitution"],
    ["definite-bounds", "Transforming the bounds of a definite integral", "symbolic", "computation", "substitution"],
    ["choose-u", "Selecting the substitution that works", "symbolic", "procedure-selection"],
    ["not-applicable", "Recognizing when substitution fails", "symbolic", "error-analysis"],
  ]),
  ...group("integration-by-parts", "FUN-6.E (BC) — integration by parts", [
    ["polynomial-exp", "Polynomial times exponential", "symbolic", "computation"],
    ["polynomial-trig", "Polynomial times trigonometric", "symbolic", "computation"],
    ["logarithm", "Logarithmic integrand", "symbolic", "computation"],
    ["repeated", "Parts applied twice", "symbolic", "synthesis"],
    ["choose-parts", "Choosing u and dv", "symbolic", "procedure-selection"],
    ["definite", "Definite integral by parts", "symbolic", "computation"],
  ]),
  ...group("partial-fractions", "FUN-6.F (BC) — partial fractions", [
    ["distinct-linear", "Distinct linear factors", "symbolic", "computation", "partial-fractions"],
    ["setup", "Correct decomposition form", "symbolic", "procedure-selection", "partial-fractions"],
    ["definite", "Definite integral after decomposition", "symbolic", "computation", "partial-fractions"],
    ["long-division-first", "Improper rational function requiring division", "symbolic", "procedure-selection", "division"],
    ["logistic-link", "Decomposition arising in a logistic model", "contextual", "synthesis", "partial-fractions"],
  ]),
  ...group("improper-integrals", "LIM-6.A (BC) — improper integrals", [
    ["infinite-bound", "Infinite upper or lower bound", "symbolic", "computation"],
    ["unbounded-integrand", "Discontinuous integrand inside the interval", "symbolic", "computation"],
    ["p-integral", "Convergence by the p-rule", "symbolic", "classification"],
    ["limit-notation", "Correct limit formulation of the integral", "symbolic", "concept-recognition"],
    ["compare", "Comparing convergence of two improper integrals", "symbolic", "comparison"],
  ]),
  ...group("accumulation-functions", "FUN-5.A / CHA-4.D — accumulation functions", [
    ["evaluate-from-graph", "Values of g(x) = ∫f(t)dt from a graph", "graphical", "computation"],
    ["extrema", "Extrema of an accumulation function", "graphical", "classification"],
    ["concavity", "Concavity of an accumulation function", "graphical", "interpretation"],
    ["context-total", "Initial amount plus accumulated change", "contextual", "computation"],
    ["table-rate", "Accumulated change estimated from a rate table", "tabular", "estimation"],
    ["must-be-true", "Which statement about the accumulation must be true", "graphical", "must-be-true"],
  ]),
];

/* ------------------------------------------------------------------ */
/* Unit 7 — Differential equations                                      */
/* ------------------------------------------------------------------ */

const U7 = [
  ...group("slope-fields", "FUN-7.C — slope fields", [
    ["slope-at-point", "Slope at a specified point", "graphical", "computation"],
    ["match-equation", "Matching a field to its differential equation", "graphical", "comparison"],
    ["solution-curve", "Behavior of the solution through a point", "graphical", "interpretation"],
    ["equilibrium", "Equilibrium solutions and long-term behavior", "graphical", "classification"],
    ["impossible-curve", "Curve that cannot be a solution", "graphical", "error-analysis"],
  ]),
  ...group("separable-differential-equations", "FUN-7.D / FUN-7.E — separation of variables", [
    ["solve-initial", "Particular solution from an initial condition", "symbolic", "computation"],
    ["implicit-solution", "Solution left in implicit form", "symbolic", "computation"],
    ["verify", "Verifying a proposed solution", "symbolic", "error-analysis"],
    ["model", "Translating a verbal rate into an equation", "verbal", "concept-recognition"],
    ["domain", "Interval of validity for the solution", "symbolic", "must-be-true"],
    ["separability", "Whether an equation is separable", "symbolic", "procedure-selection"],
  ]),
  ...group("exponential-growth-and-decay", "FUN-7.F — exponential models", [
    ["half-life", "Half-life and decay constants", "contextual", "computation"],
    ["doubling", "Doubling time and growth constants", "contextual", "computation"],
    ["from-data", "Model constants recovered from two data points", "tabular", "reverse"],
    ["interpret-constant", "Meaning of k in context", "contextual", "interpretation"],
    ["compare-models", "Comparing two exponential models", "contextual", "comparison"],
  ]),
  ...group("eulers-method", "FUN-7.C (BC) — Euler's method", [
    ["one-step", "Single step approximation", "symbolic", "computation"],
    ["multi-step", "Two or more steps", "tabular", "computation"],
    ["step-size", "Effect of changing the step size", "symbolic", "comparison"],
    ["over-under", "Over- or underestimate from concavity", "symbolic", "must-be-true"],
    ["formula-error", "Incorrectly stated Euler update", "symbolic", "error-analysis"],
  ]),
  ...group("logistic-growth", "FUN-7.H (BC) — logistic models", [
    ["carrying-capacity", "Carrying capacity from the equation", "symbolic", "concept-recognition"],
    ["fastest-growth", "Population growing fastest at half capacity", "symbolic", "computation"],
    ["long-term", "Long-term behavior of the solution", "symbolic", "interpretation"],
    ["from-context", "Building a logistic model from a description", "verbal", "reverse"],
    ["graph-shape", "Shape of a logistic solution curve", "graphical", "interpretation"],
  ]),
];

/* ------------------------------------------------------------------ */
/* Unit 8 — Applications of integration                                 */
/* ------------------------------------------------------------------ */

const U8 = [
  ...group("average-value", "CHA-4.B — average value of a function", [
    ["compute", "Average value computed directly", "symbolic", "computation"],
    ["graph", "Average value estimated from a graph", "graphical", "estimation"],
    ["table", "Average value from tabulated data", "tabular", "estimation"],
    ["context-units", "Average value interpreted with units", "contextual", "interpretation"],
    ["reverse", "Interval or parameter giving a prescribed average", "symbolic", "reverse"],
  ]),
  ...group("area-between-curves", "CHA-5.A / CHA-5.B — area between curves", [
    ["dx-setup", "Integration with respect to x", "symbolic", "computation"],
    ["dy-setup", "Integration with respect to y", "symbolic", "procedure-selection"],
    ["intersections", "Finding the bounds by intersection", "symbolic", "synthesis", "factoring"],
    ["switching-top", "Region where the top curve changes", "graphical", "synthesis"],
    ["setup-only", "Which integral expression represents the area", "graphical", "concept-recognition"],
    ["signed-vs-geometric", "Signed integral versus geometric area", "symbolic", "comparison"],
  ]),
  ...group("volume-disks-and-washers", "CHA-5.C — solids of revolution", [
    ["disk-x-axis", "Disks about a horizontal axis", "symbolic", "computation"],
    ["washer", "Washers between two curves", "symbolic", "computation"],
    ["shifted-axis", "Revolution about a line other than an axis", "symbolic", "synthesis"],
    ["about-y", "Revolution about a vertical axis", "symbolic", "procedure-selection"],
    ["setup-only", "Which integral gives the volume", "graphical", "concept-recognition"],
  ]),
  ...group("volume-known-cross-sections", "CHA-5.C — solids with known cross sections", [
    ["square", "Square cross sections", "symbolic", "computation"],
    ["triangle", "Equilateral or right-triangle cross sections", "symbolic", "computation"],
    ["semicircle", "Semicircular cross sections", "symbolic", "computation"],
    ["perpendicular-y", "Cross sections perpendicular to the y-axis", "symbolic", "procedure-selection"],
    ["setup-only", "Which integral gives the volume", "graphical", "concept-recognition"],
  ]),
  ...group("arc-length", "CHA-6.A (BC) — arc length", [
    ["compute", "Arc length of a curve with clean algebra", "symbolic", "computation", "completing-square"],
    ["setup", "Correct arc-length integrand", "symbolic", "concept-recognition"],
    ["compare-chord", "Arc length compared to straight-line distance", "graphical", "comparison"],
    ["calculator-value", "Numerical arc length with technology", "symbolic", "estimation"],
    ["context", "Arc length as distance traveled", "contextual", "interpretation"],
  ]),
  ...group("accumulation-in-context", "CHA-4.C / CHA-4.D — net change in context", [
    ["in-out-rates", "Simultaneous rates in and out", "contextual", "synthesis"],
    ["total-vs-net", "Total amount versus net change", "contextual", "comparison"],
    ["max-amount", "When the accumulated amount is greatest", "contextual", "classification"],
    ["graph-rate", "Accumulation read from a rate graph", "graphical", "computation"],
    ["table-rate", "Accumulation approximated from a rate table", "tabular", "estimation"],
    ["units", "Units of an accumulated quantity", "contextual", "interpretation"],
  ]),
];

/* ------------------------------------------------------------------ */
/* Unit 9 — Parametric, polar, vector (BC)                              */
/* ------------------------------------------------------------------ */

const U9 = [
  ...group("parametric-derivatives", "CHA-3.G (BC) — parametric derivatives", [
    ["dydx", "First derivative dy/dx at a parameter value", "symbolic", "computation"],
    ["second", "Second derivative and concavity", "symbolic", "synthesis"],
    ["tangent-line", "Tangent line to a parametric curve", "symbolic", "computation"],
    ["horizontal-vertical", "Horizontal and vertical tangents", "symbolic", "classification"],
    ["eliminate-parameter", "Eliminating the parameter", "symbolic", "equivalent-forms"],
    ["error-analysis", "Incorrect parametric derivative formula", "symbolic", "error-analysis"],
  ]),
  ...group("parametric-arc-length", "CHA-6.B (BC) — parametric arc length", [
    ["setup", "Correct arc-length integral", "symbolic", "concept-recognition"],
    ["compute", "Arc length with simplifying algebra", "symbolic", "computation", "identities"],
    ["distance-vs-displacement", "Distance traveled versus displacement", "contextual", "comparison"],
    ["calculator", "Numerical arc length with technology", "symbolic", "estimation"],
    ["bounds", "Choosing the parameter interval", "symbolic", "procedure-selection"],
  ]),
  ...group("vector-valued-functions", "CHA-3.G (BC) — vector-valued functions", [
    ["velocity-acceleration", "Velocity and acceleration vectors", "symbolic", "computation"],
    ["speed", "Speed as the magnitude of velocity", "symbolic", "computation"],
    ["position-from-velocity", "Position recovered by integration", "symbolic", "reverse"],
    ["component-analysis", "Behavior of individual components", "symbolic", "interpretation"],
    ["total-distance", "Total distance travelled along the path", "symbolic", "synthesis"],
  ]),
  ...group("polar-derivatives", "CHA-3.G (BC) — polar derivatives", [
    ["slope", "Slope dy/dx of a polar curve", "symbolic", "computation", "identities"],
    ["tangent-at-angle", "Tangent behavior at a specific angle", "symbolic", "computation"],
    ["r-increasing", "Where r is increasing or decreasing", "symbolic", "interpretation"],
    ["graph-match", "Matching a polar equation to its graph", "graphical", "comparison"],
    ["error-analysis", "Confusing dr/dθ with dy/dx", "symbolic", "error-analysis"],
  ]),
  ...group("polar-area", "CHA-5.D (BC) — polar area", [
    ["single-region", "Area enclosed by one polar curve", "symbolic", "computation"],
    ["between-curves", "Area between two polar curves", "symbolic", "synthesis"],
    ["bounds", "Determining the limits of integration", "symbolic", "procedure-selection"],
    ["setup-only", "Which integral gives the area", "graphical", "concept-recognition"],
    ["calculator", "Numerical polar area with technology", "symbolic", "estimation"],
  ]),
];

/* ------------------------------------------------------------------ */
/* Unit 10 — Series (BC)                                                */
/* ------------------------------------------------------------------ */

const U10 = [
  ...group("nth-term-test", "LIM-7.A (BC) — nth-term test", [
    ["apply", "Divergence from a nonzero term limit", "symbolic", "computation"],
    ["inconclusive", "Why the test cannot prove convergence", "verbal", "must-be-true"],
    ["sequence-vs-series", "Sequence convergence versus series convergence", "verbal", "comparison"],
    ["table-terms", "Term behavior read from a table", "tabular", "estimation"],
    ["error-analysis", "Misuse of the nth-term test", "verbal", "error-analysis"],
  ]),
  ...group("geometric-and-p-series", "LIM-7.A (BC) — geometric and p-series", [
    ["sum", "Sum of a convergent geometric series", "symbolic", "computation"],
    ["shifted-index", "Series with a shifted starting index", "symbolic", "computation"],
    ["disguised", "Algebraically disguised geometric structure", "symbolic", "concept-recognition", "equivalent-forms"],
    ["p-series", "Convergence of a p-series", "symbolic", "classification"],
    ["parameter-ratio", "Parameter values giving convergence", "symbolic", "parameter"],
    ["repeating-context", "Geometric series in an applied setting", "contextual", "synthesis"],
  ]),
  ...group("comparison-tests", "LIM-7.A (BC) — comparison and limit comparison", [
    ["direct-comparison", "Direct comparison with a known series", "symbolic", "computation"],
    ["limit-comparison", "Limit comparison test", "symbolic", "computation"],
    ["choose-comparison", "Selecting an appropriate comparison series", "symbolic", "procedure-selection"],
    ["invalid-comparison", "Comparison that proves nothing", "symbolic", "error-analysis"],
    ["integral-test", "Integral test applied to a positive series", "symbolic", "computation"],
  ]),
  ...group("ratio-test", "LIM-7.A (BC) — ratio test and convergence intervals", [
    ["convergence", "Convergence of a numerical series", "symbolic", "computation"],
    ["radius", "Radius of convergence of a power series", "symbolic", "computation"],
    ["interval-endpoints", "Testing the endpoints of the interval", "symbolic", "synthesis"],
    ["factorial", "Series involving factorials", "symbolic", "computation"],
    ["inconclusive", "When the ratio test is inconclusive", "verbal", "must-be-true"],
  ]),
  ...group("alternating-series-test", "LIM-7.A (BC) — alternating series", [
    ["convergence", "Applying the alternating series test", "symbolic", "computation"],
    ["absolute-vs-conditional", "Absolute versus conditional convergence", "symbolic", "classification"],
    ["error-bound", "Alternating series remainder bound", "symbolic", "computation"],
    ["hypotheses", "Whether the hypotheses are satisfied", "verbal", "error-analysis"],
    ["terms-needed", "Number of terms for a given accuracy", "symbolic", "reverse"],
  ]),
  ...group("taylor-and-maclaurin-series", "LIM-8.A–8.F (BC) — Taylor and Maclaurin series", [
    ["build-from-derivatives", "Coefficients from derivative values", "symbolic", "computation"],
    ["known-series", "Manipulating a known Maclaurin series", "symbolic", "synthesis", "substitution"],
    ["polynomial-approx", "Taylor polynomial used to approximate", "symbolic", "estimation"],
    ["table-derivatives", "Taylor polynomial from tabulated derivatives", "tabular", "computation"],
    ["center-shift", "Series centered away from zero", "symbolic", "computation"],
    ["identify-function", "Recognizing the function from its series", "symbolic", "reverse"],
  ]),
  ...group("lagrange-error-bound", "LIM-8.C (BC) — Lagrange error bound", [
    ["compute-bound", "Computing the error bound", "symbolic", "computation"],
    ["degree-needed", "Degree required for a given accuracy", "symbolic", "reverse"],
    ["interpret", "What the bound does and does not guarantee", "verbal", "must-be-true"],
    ["max-derivative", "Choosing the bounding derivative value", "symbolic", "procedure-selection"],
    ["compare-actual", "Bound compared with the actual error", "symbolic", "comparison"],
  ]),
  ...group("power-series-operations", "LIM-8.D–8.G (BC) — operations on power series", [
    ["differentiate", "Differentiating a power series term by term", "symbolic", "computation"],
    ["integrate", "Integrating a power series term by term", "symbolic", "computation"],
    ["substitute", "Substitution into a known series", "symbolic", "computation", "substitution"],
    ["multiply", "Multiplying series or by a power of x", "symbolic", "computation"],
    ["interval-after-operation", "Interval of convergence after an operation", "symbolic", "must-be-true"],
    ["limit-from-series", "Evaluating a limit using a series", "symbolic", "synthesis"],
  ]),
];

export const MANIFESTATIONS: Manifestation[] = [
  ...U1,
  ...U2,
  ...U3,
  ...U4,
  ...U5,
  ...U6,
  ...U7,
  ...U8,
  ...U9,
  ...U10,
];

const BY_ID = new Map(MANIFESTATIONS.map((m) => [m.id, m]));

export function getManifestation(id: string): Manifestation | undefined {
  return BY_ID.get(id);
}

export function manifestationsForTopic(topic: string): Manifestation[] {
  return MANIFESTATIONS.filter((m) => m.topic === topic);
}

/**
 * Normalized structural signature used for near-duplicate detection: two
 * questions with the same signature test the same thing the same way.
 */
export function structuralSignature(input: {
  topic: string;
  manifestation?: string;
  representation?: Representation;
  reasoning?: ReasoningType;
  algebra?: AlgebraicStructure;
}): string {
  const m = input.manifestation ? BY_ID.get(input.manifestation) : undefined;
  return [
    input.topic,
    input.manifestation ?? "unclassified",
    input.representation ?? m?.representation ?? "symbolic",
    input.reasoning ?? m?.reasoning ?? "computation",
    input.algebra ?? m?.algebra ?? "plain",
  ].join(" → ");
}
