# Finish the job: honest, formula-complete question bank + the pieces I skipped

You are right to be unhappy. Here is the honest state of the bank as it exists right now, measured, not claimed:

- 3,817 questions, 372 templates, 0 *missing* manifestations — but 56 manifestations have only 1–2 questions, so "covered" overstates it.
- 47.6% of the bank is still plain "compute this" reasoning. Graphical items are 5.1%.
- Whole techniques in your Master Guide are effectively absent from the bank: inverse trig derivatives and integrals (0 hits), linearization / tangent-line approximation (0), volumes by cross-section (0), shells (0), derivative of an inverse function (0), sec/csc/tan/cot integrals (0), alternating series error bound (0), direct comparison test (0), Newton's law of cooling (0), and only 1–2 items each for integration by parts, partial fractions, limit comparison, integral test, radius/interval of convergence.
- Three things from the approved plan were never built: the stress-harness upgrades (signature collisions, manifestation thresholds, representation/reasoning distribution), the table/graph figure renderers beyond slope fields and piecewise graphs, and the topic-level coverage display.

## 1. Master Guide as a completeness checklist

Turn the uploaded Master Guide into an explicit machine-checked inventory (`src/lib/master-guide-index.ts`): every formula, technique, theorem, table, and rule on its 10 pages becomes a checklist entry mapped to a user topic and manifestation. An audit script fails if any entry has fewer than 3 generated questions. This closes the "every single thing they could ask" requirement with evidence instead of a claim.

Explicitly added because the guide lists them and the bank lacks them:
- Limits: conjugates/rationalization, special trig limits, squeeze theorem, HA with radicals, discontinuity classification, L'Hôpital including indeterminate rewrites.
- Derivatives: all six trig, all six inverse trig, exponential/log with base a, product/quotient/chain combinations, derivative of an inverse function, implicit, related rates, linearization, position/velocity/acceleration/speed.
- Applications: EVT with endpoints, both derivative tests, inflection with sign change, optimization, curve sketching from f'/f''.
- Integrals: full antiderivative table (trig, inverse trig, exponential/log), u-substitution with bound change, integration by parts, partial fractions, improper integrals as limits (including discontinuity at an interior point), FTC1 with chain rule, FTC2, Riemann/midpoint/trapezoid including the over/under-estimate tables and unequal subintervals.
- Applications of integrals: average value with units, area in x and y, disks, washers, shells, cross-sections (square, isosceles triangle, semicircle), arc length in x and y.
- Differential equations: slope fields, separation of variables, exponential growth, logistic (including max growth at M/2 and carrying capacity), Euler's method tables, Newton's law of cooling.
- BC polar/parametric: dy/dx and d²y/dx², parametric arc length, polar area, area between two polar curves, polar arc length, limaçon inner-loop bounds, vector position/velocity/acceleration/speed/distance.
- Series: partial sums, geometric with shifted index, p-series, nth-term, AST, integral test, DCT, LCT, ratio test, absolute vs conditional convergence, power/Taylor/Maclaurin, the seven common Maclaurin series, series manipulation, Lagrange error bound, alternating series error bound, radius and interval of convergence with endpoint checking.

## 2. Depth, not just presence

- Every manifestation reaches at least 3 distinct questions; the 56 thin ones get filled first.
- Rebalance so no single reasoning type exceeds ~30% of the bank: computation gets capped, and the gap is filled with must-be-true, procedure-selection, reverse-reasoning, parameter-condition, error-analysis, equivalent-forms, and interpretation forms.
- Graphical representation raised to at least 12% of the bank.

## 3. Figures (the missing renderer work)

Extend the figure layer so graphical and tabular items are real, not text-described: a data-table renderer, a general function-graph renderer (f, f', f'' with labelled features), and a polar/parametric curve renderer, all wired into the existing `SlopeField`-style dispatch component and rendered in Practice, the diagnostic, and the answer log.

## 4. Stress harness upgrades (previously promised, not delivered)

Add to `scripts/stress-bank.ts`: structural-signature collision detection, per-manifestation minimum threshold, representation and reasoning distribution bounds, near-duplicate prompt detection with numbers normalized out, Master-Guide checklist coverage, and a fail on any item whose figure is missing when its representation is graphical or tabular. The bank ships only at 0 issues, and I will paste the full report rather than summarizing it.

## 5. Topic-level coverage display

Each topic page and the Command Center topic rows show how many distinct manifestations exist for that topic and how many the student has seen, so progress reads as understanding rather than volume.

## Technical notes

- New: `src/lib/master-guide-index.ts`, `scripts/master-guide-audit.ts`, figure renderers under `src/components/figures/`.
- Edited: `src/lib/ced-taxonomy.ts` (manifestations for the newly added techniques), `src/lib/question-templates-gap.ts` plus new per-unit gap files to keep files manageable, `src/lib/generated-bank.ts` (reasoning-mix budgeting), `scripts/stress-bank.ts`, `scripts/coverage-audit.ts`, topic navigator and Command Center for the coverage view.
- Delivered in unit batches; each batch ends with a full coverage audit, Master-Guide audit, and stress run at 0 issues, and I report the raw numbers each time.
- Originality unchanged: the Master Guide, CED, and practice PDFs are reference only; all wording, functions, values, contexts, answers, distractors, and explanations stay original.
