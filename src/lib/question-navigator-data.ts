export type TopicEntry = {
  slug: string;
  title: string;
  blurb: string;
};

export type UnitEntry = {
  slug: string;
  number: number;
  title: string;
  weight: string;
  blurb: string;
  topics: TopicEntry[];
};

export const QN_UNITS: UnitEntry[] = [
  {
    slug: "unit-1-limits-and-continuity",
    number: 1,
    title: "Limits and Continuity",
    weight: "4–7%",
    blurb: "Limit notation, one-sided behavior, continuity, IVT.",
    topics: [
      { slug: "evaluating-limits-algebraically", title: "Evaluating Limits Algebraically", blurb: "Factor, conjugate, and rational manipulation." },
      { slug: "limits-from-graphs-and-tables", title: "Limits from Graphs and Tables", blurb: "One-sided limits, jump and removable discontinuities." },
      { slug: "squeeze-theorem", title: "Squeeze Theorem", blurb: "Trig-based bounding arguments." },
      { slug: "continuity-and-discontinuity", title: "Continuity & Discontinuity Types", blurb: "Removable, jump, infinite, and piecewise continuity." },
      { slug: "intermediate-value-theorem", title: "Intermediate Value Theorem", blurb: "Existence arguments on closed intervals." },
      { slug: "limits-at-infinity", title: "Limits at Infinity", blurb: "End behavior and horizontal asymptotes." },
    ],
  },
  {
    slug: "unit-2-differentiation-definition-and-properties",
    number: 2,
    title: "Differentiation: Definition and Fundamental Properties",
    weight: "4–7%",
    blurb: "Definition of the derivative and basic rules.",
    topics: [
      { slug: "definition-of-the-derivative", title: "Definition of the Derivative", blurb: "Limit definition and tangent slopes." },
      { slug: "power-rule", title: "Power Rule", blurb: "Polynomial and rational power differentiation." },
      { slug: "product-and-quotient-rules", title: "Product & Quotient Rules", blurb: "Standard product/quotient identification." },
      { slug: "derivatives-of-trig-exp-log", title: "Derivatives of Trig / Exp / Log", blurb: "Standard derivatives of elementary functions." },
      { slug: "differentiability-and-continuity", title: "Differentiability vs. Continuity", blurb: "Where derivatives fail to exist." },
    ],
  },
  {
    slug: "unit-3-differentiation-composite-implicit-inverse",
    number: 3,
    title: "Differentiation: Composite, Implicit, and Inverse Functions",
    weight: "4–7%",
    blurb: "Chain rule, implicit differentiation, inverse trig.",
    topics: [
      { slug: "chain-rule", title: "Chain Rule", blurb: "Compositions and nested derivatives." },
      { slug: "implicit-differentiation", title: "Implicit Differentiation", blurb: "Curves defined implicitly by equations." },
      { slug: "derivatives-of-inverse-functions", title: "Derivatives of Inverse Functions", blurb: "Inverse function theorem applications." },
      { slug: "inverse-trig-derivatives", title: "Inverse Trig Derivatives", blurb: "arcsin, arccos, arctan in problems." },
      { slug: "higher-order-derivatives", title: "Higher-Order Derivatives", blurb: "Second and third derivatives in context." },
    ],
  },
  {
    slug: "unit-4-contextual-applications-of-differentiation",
    number: 4,
    title: "Contextual Applications of Differentiation",
    weight: "6–9%",
    blurb: "Rates, motion, related rates, linearization, L'Hôpital.",
    topics: [
      { slug: "related-rates", title: "Related Rates", blurb: "Classic geometric and physical setups." },
      { slug: "linearization", title: "Linearization", blurb: "Tangent line approximation and error." },
      { slug: "lhopitals-rule", title: "L'Hôpital's Rule", blurb: "0/0 and ∞/∞ indeterminate forms." },
      { slug: "rectilinear-motion", title: "Rectilinear Motion", blurb: "Position, velocity, acceleration, speed." },
      { slug: "rates-of-change-in-context", title: "Rates of Change in Context", blurb: "Units, meaning, and interpretation." },
    ],
  },
  {
    slug: "unit-5-analytical-applications-of-differentiation",
    number: 5,
    title: "Analytical Applications of Differentiation",
    weight: "8–11%",
    blurb: "Extrema, MVT, concavity, optimization, curve analysis.",
    topics: [
      { slug: "mean-value-theorem", title: "Mean Value Theorem", blurb: "Hypotheses, conclusions, and justifications." },
      { slug: "critical-points", title: "Critical Points", blurb: "Locating where f'(x)=0 or DNE." },
      { slug: "first-derivative-test", title: "First Derivative Test", blurb: "Increasing/decreasing intervals and local extrema." },
      { slug: "second-derivative-test", title: "Second Derivative Test & Concavity", blurb: "Inflection points and concavity analysis." },
      { slug: "local-and-global-extrema", title: "Local & Global Extrema", blurb: "Candidates Test on closed intervals." },
      { slug: "optimization", title: "Optimization", blurb: "Modeling and constrained max/min." },
      { slug: "curve-sketching", title: "Curve Sketching & f / f' / f''", blurb: "Reading sign charts and graphs." },
    ],
  },
  {
    slug: "unit-6-integration-and-accumulation-of-change",
    number: 6,
    title: "Integration and Accumulation of Change",
    weight: "17–20%",
    blurb: "Riemann sums, FTC, u-sub, IBP, partial fractions.",
    topics: [
      { slug: "riemann-sums", title: "Riemann & Trapezoidal Sums", blurb: "Left, right, midpoint, and trapezoidal approximations." },
      { slug: "fundamental-theorem-of-calculus", title: "Fundamental Theorem of Calculus", blurb: "Both forms and accumulation functions." },
      { slug: "u-substitution", title: "u-Substitution", blurb: "Pattern recognition and bound transformation." },
      { slug: "integration-by-parts", title: "Integration by Parts (BC)", blurb: "LIATE strategy and repeated parts." },
      { slug: "partial-fractions", title: "Partial Fractions (BC)", blurb: "Linear factor decomposition." },
      { slug: "improper-integrals", title: "Improper Integrals (BC)", blurb: "Convergence and divergence with limits." },
      { slug: "accumulation-functions", title: "Accumulation Functions", blurb: "g(x)=∫f(t)dt analysis." },
    ],
  },
  {
    slug: "unit-7-differential-equations",
    number: 7,
    title: "Differential Equations",
    weight: "6–9%",
    blurb: "Slope fields, separable ODEs, Euler's method, logistic.",
    topics: [
      { slug: "slope-fields", title: "Slope Fields", blurb: "Sketching and interpreting direction fields." },
      { slug: "separable-differential-equations", title: "Separable Differential Equations", blurb: "Standard separation and initial conditions." },
      { slug: "exponential-growth-and-decay", title: "Exponential Growth & Decay", blurb: "dy/dt = ky models." },
      { slug: "eulers-method", title: "Euler's Method (BC)", blurb: "Stepwise numerical approximation." },
      { slug: "logistic-growth", title: "Logistic Growth (BC)", blurb: "Carrying capacity and inflection." },
    ],
  },
  {
    slug: "unit-8-applications-of-integration",
    number: 8,
    title: "Applications of Integration",
    weight: "6–9%",
    blurb: "Average value, area, volume, arc length (BC).",
    topics: [
      { slug: "average-value", title: "Average Value of a Function", blurb: "Mean value theorem for integrals." },
      { slug: "area-between-curves", title: "Area Between Curves", blurb: "dx and dy integration setups." },
      { slug: "volume-disks-and-washers", title: "Volume — Disks & Washers", blurb: "Solids of revolution." },
      { slug: "volume-known-cross-sections", title: "Volume — Known Cross Sections", blurb: "Square, triangle, semicircle cross sections." },
      { slug: "arc-length", title: "Arc Length (BC)", blurb: "Cartesian arc length formula." },
      { slug: "accumulation-in-context", title: "Accumulation in Context", blurb: "Net change with rates in/out problems." },
    ],
  },
  {
    slug: "unit-9-parametric-polar-vector",
    number: 9,
    title: "Parametric Equations, Polar Coordinates, and Vector-Valued Functions",
    weight: "11–12% (BC)",
    blurb: "Parametric, polar, and vector calculus.",
    topics: [
      { slug: "parametric-derivatives", title: "Parametric Derivatives", blurb: "dy/dx and d²y/dx² for parametric curves." },
      { slug: "parametric-arc-length", title: "Parametric Arc Length", blurb: "∫√((dx/dt)²+(dy/dt)²) dt." },
      { slug: "vector-valued-functions", title: "Vector-Valued Functions", blurb: "Position, velocity, speed, acceleration vectors." },
      { slug: "polar-derivatives", title: "Polar Derivatives", blurb: "Slope of polar curves." },
      { slug: "polar-area", title: "Polar Area", blurb: "½∫r² dθ and area between polar curves." },
    ],
  },
  {
    slug: "unit-10-infinite-sequences-and-series",
    number: 10,
    title: "Infinite Sequences and Series",
    weight: "17–18% (BC)",
    blurb: "Convergence tests, Taylor and Maclaurin, error bounds.",
    topics: [
      { slug: "nth-term-test", title: "nth-Term Test", blurb: "Necessary condition for convergence." },
      { slug: "geometric-and-p-series", title: "Geometric & p-Series", blurb: "Standard convergence baselines." },
      { slug: "comparison-tests", title: "Comparison & Limit Comparison", blurb: "Choosing comparison series." },
      { slug: "ratio-test", title: "Ratio Test", blurb: "Radius and interval of convergence." },
      { slug: "alternating-series-test", title: "Alternating Series Test", blurb: "Conditional vs. absolute convergence." },
      { slug: "taylor-and-maclaurin-series", title: "Taylor & Maclaurin Series", blurb: "Standard expansions and manipulation." },
      { slug: "lagrange-error-bound", title: "Lagrange Error Bound", blurb: "Bounding remainder of Taylor polynomial." },
      { slug: "power-series-operations", title: "Power Series Operations", blurb: "Differentiation, integration, and substitution." },
    ],
  },
];

export function findUnit(slug: string) {
  return QN_UNITS.find((u) => u.slug === slug);
}

export function findTopic(unitSlug: string, topicSlug: string) {
  const unit = findUnit(unitSlug);
  if (!unit) return null;
  const topic = unit.topics.find((t) => t.slug === topicSlug);
  if (!topic) return null;
  return { unit, topic };
}
