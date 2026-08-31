# Complete Build: Formula-Complete Question Bank + Airtight Practice → Command Center → Mistakes Workflow

## Honest state of the project right now (measured, not claimed)

- 3,817 generated questions from 372 templates. 337 taxonomy manifestations, 0 missing, but **56 manifestations hold only 1–2 questions**, so "covered" overstates reality.
- Reasoning mix is still dominated by plain computation: **47.6% computation**, and only 5.1% of items are graphical.
- Techniques listed in your Master Guide that the bank barely or never tests (grep counts across all three template files): inverse trig derivatives and integrals **0**, linearization / tangent-line approximation **0**, derivative of an inverse function **0**, volumes by cross-section **0**, shells **0**, trig antiderivatives sec/csc/tan/cot **0**, direct comparison test **0**, alternating series error bound **0**, Newton's law of cooling **0**, integration by parts **2**, partial fractions **2**, limit comparison **2**, integral test **1**, radius of convergence **2**, interval of convergence **1**.
- Three items from the previously approved plan were never built: the stress-harness upgrades, figure renderers beyond slope fields and piecewise graphs, and the topic-level coverage display.

Everything below is what "done" means. Nothing in it is optional, and each phase ends with numbers pasted from the audits rather than a summary.

---

## Part A — Content completeness

### A1. Master Guide becomes a machine-checked checklist

New `src/lib/master-guide-index.ts` encodes every formula, theorem, technique, rule, and table from the 10-page guide as a checklist entry: `{ id, page, label, topic_slug, manifestations[], minQuestions }`. New `scripts/master-guide-audit.ts` fails the build if any entry has fewer than 3 generated questions, and prints the deficient entries. This replaces "I think it's comprehensive" with a hard gate.

### A2. Full technique inventory to build out

Each bullet below becomes real template families with symbolic, graphical, tabular, verbal, and contextual variants where the technique admits them.

**Unit 1 — Limits and Continuity**
Limit notation and one-sided limits; existence via matching one-sided limits; estimation from graphs and from tables; factorization and cancellation; rationalization with conjugates; special trig limits `sin(ax)/bx` at 0 and at ∞, `(1−cos x)/x`; squeeze theorem including bounding-function setup; removable / jump / infinite discontinuity classification and which are removable; continuity three-condition checks and solving for a parameter that makes a piecewise function continuous; vertical asymptotes from `a/0`; horizontal asymptotes including `ax/√(bx²+c)` sign behavior as x → ±∞; end behavior of rational, exponential, and radical forms; IVT hypotheses, conclusion, and what it does not guarantee; connecting continuity to differentiability.

**Unit 2 — Differentiation: Definition and Fundamental Properties**
Average vs instantaneous rate; both limit definitions (h-form and alternate a-form) forward and in reverse (given a limit, name the derivative); recognizing a difference quotient; differentiability failures: corners (`|x|`), cusps (`x^{2/3}`), vertical tangents, discontinuities; power/constant/sum rules; all six trig derivatives; `e^x`, `a^x ln a`, `ln x`, `log_a x`; all six inverse trig derivatives; product rule; quotient rule; derivatives from tables of values; reading `f'` sign information off a graph of `f`.

**Unit 3 — Composite, Implicit, and Inverse Functions**
Chain rule with correct inner/outer identification, multi-layer compositions, chain rule applied to table data; implicit differentiation including solving for `dy/dx` and second implicit derivatives; tangent lines to implicit curves and locating horizontal/vertical tangents; derivative of an inverse function `1/f'(f^{-1}(x))`; logarithmic differentiation; common chain-rule omission distractors.

**Unit 4 — Contextual Applications of Differentiation**
Interpreting the meaning of a derivative with units; straight-line motion: position, velocity, acceleration, speed `|v|`, direction changes, when speed increases; related rates with the four-step structure (find / given / equation / differentiate) across geometric contexts; linearization `f(a)+f'(a)(x−a)` including whether the estimate is an over- or under-estimate based on concavity; L'Hôpital's rule for `0/0` and `∞/∞` including rewriting `0·∞` and `∞−∞`, and cases where it does not apply.

**Unit 5 — Analytical Applications of Differentiation**
MVT hypotheses, conclusion, and counterexamples; Rolle's case; EVT hypotheses and endpoint testing; critical points where `f'=0` or undefined; increasing/decreasing from `f'`; first derivative test; concavity from `f''`; inflection points requiring a sign change; second derivative test and when it is inconclusive; absolute extrema on closed intervals; candidates test; optimization with constraint elimination and verification; curve sketching and matching `f`, `f'`, `f''` graphs; connecting the shape of `f'` to features of `f`.

**Unit 6 — Integration and Accumulation of Change**
Riemann sums: left, right, midpoint, trapezoidal with equal and unequal subintervals; over/under-estimate rules from monotonicity and concavity (both tables in the guide); sum-to-integral limit form and reverse; definite integral properties (additivity, reversal, constant multiples, zero-width); FTC Part 1 including chain rule with a variable upper bound and both bounds functions; FTC Part 2; accumulation functions analysed from a graph of the integrand; the full antiderivative table — powers, trig, sec²/csc²/sec·tan/csc·cot, `∫tan`, `∫cot`, `∫sec`, `∫csc`, inverse trig forms, `e^x`, `a^x`, `1/x` with absolute value; u-substitution including changing bounds for definite integrals; integration by parts including repeated application; partial fractions with distinct linear factors; improper integrals written as limits, infinite bounds, and interior discontinuities, with convergence/divergence decisions.

**Unit 7 — Differential Equations**
Verifying a proposed solution; slope fields — sketching, matching an equation to a field, and reading solution behavior; separation of variables including applying an initial condition and keeping `+C`; exponential growth/decay `y = y₀e^{kt}`; logistic model `dP/dt = kP(1−P/M)`, carrying capacity, and maximum growth at `M/2`; Euler's method tables with one or more steps and over/under-estimate reasoning; Newton's law of cooling as a modeling context; domain of validity of a solution.

**Unit 8 — Applications of Integration**
Average value with units and the MVT for integrals; net change and accumulation in context; displacement vs total distance `∫|v|`; area between curves in x and in y, including choosing the correct variable and splitting at intersections; disks; washers with correct big-R/small-r assignment; shells; volumes by known cross-section for squares, isosceles right triangles, equilateral triangles, and semicircles; arc length in x and in y; setting up an integral without evaluating (a very common AP form).

**Unit 9 — Parametric, Polar, Vector (BC)**
`dy/dx` from parametric derivatives; `d²y/dx²`; parametric arc length; parametric motion: velocity vector, speed, acceleration, total distance; polar/Cartesian conversion; polar area for one region; area between two polar curves; polar arc length; finding bounds including limaçons with an inner loop; `dy/dx` for a polar curve; vector-valued position/velocity/acceleration with initial conditions.

**Unit 10 — Infinite Sequences and Series (BC)**
Partial sums; geometric series convergence and sum with shifted starting index; nth-term test; p-series; alternating series test; integral test with hypothesis checking; direct comparison; limit comparison; ratio test including inconclusive `L=1`; absolute vs conditional convergence and the alternating harmonic case; power series form; Taylor and Maclaurin series construction from derivative values; the seven common Maclaurin series (`e^x`, `sin`, `cos`, `1/(1−x)`, `1/(1+x)`, `ln(1+x)`, `arctan`); manipulating known series by substitution, differentiation, integration, and multiplication; Lagrange error bound; alternating series error bound; radius of convergence; interval of convergence with mandatory endpoint checking.

### A3. Depth and balance targets

- Every manifestation ≥ 3 distinct questions; the 56 thin ones are filled first.
- Every Master Guide checklist entry ≥ 3 questions.
- No single reasoning type above 30% of the bank. Computation is capped, and the freed budget goes to must-be-true, procedure-selection, reverse reasoning, parameter conditions, error analysis, equivalent forms, interpretation, classification, and insufficient-information items.
- Representation floors: graphical ≥ 12%, tabular ≥ 12%, verbal ≥ 7%, contextual ≥ 15%.
- Difficulty spread per topic: roughly 30% easy, 45% medium, 25% hard, with no topic all-easy.
- Calculator flags assigned by the actual work required (numeric integration, root finding, decimal evaluation, table-driven contextual rates → calculator), not defaulted.
- Track tags audited per topic so AB never sees BC-only content and BC sees everything.

### A4. Distractor quality

Every distractor traces to a named error path recorded in metadata: sign slip, chain-rule omission, derivative/antiderivative swap, wrong bound or reversed bounds, forgetting a constant multiple, `+C` omission, confusing `f` with `f'`, treating a necessary condition as sufficient, off-by-one index in series, radius vs interval confusion, degrees/radians, units dropped. Filler numbers are not acceptable, and each distractor carries its misconception code so wrong answers feed the Common Mistakes database.

---

## Part B — Figures (previously promised, not built)

New `src/components/figures/` with a single dispatch component:

- **Data table** renderer for tabular items (values of `f`, `f'`, `v(t)`, unequal `Δx` rows).
- **Function graph** renderer for `f`, `f'`, `f''` with labelled intercepts, extrema, inflection points, asymptotes, and shaded regions for area/accumulation items.
- **Polar / parametric curve** renderer including limaçons and shaded sectors.
- Existing slope-field and piecewise-linear renderers fold into the same dispatch.

Figures render in Practice, the timed diagnostic, and the answer log, all with accessible descriptions. Any item whose representation is graphical or tabular but which carries no figure is a stress-test failure.

---

## Part C — Correctness gates

### C1. LaTeX and math hygiene
Every prompt, choice, and explanation renders through KaTeX in strict mode. Failures on: unbalanced `$`, unterminated `\text{`, stray backslashes in prose, unbalanced braces, redundant coefficient `1` (`1x`, `1\pi`), redundant exponent `^{1}`, `+ -` sequences, and `--`. Coefficients and exponents are produced by construction-time helpers, never by regex stripping after the fact.

### C2. Stress harness upgrades in `scripts/stress-bank.ts`
Keeps the current checks (duplicate/equivalent choices, missing answer, answer-position balance 18–32%, obvious-answer shape heuristics, unmapped unit/topic) and adds:
- structural-signature collision detection;
- near-duplicate prompt detection with numbers normalized out, with a per-topic quota;
- per-manifestation minimum threshold;
- representation and reasoning distribution bounds from A3;
- Master Guide checklist coverage;
- missing-figure check for graphical/tabular items;
- distractor-provenance check (every distractor has a misconception code);
- numeric self-verification: where a template computes an answer, an independent evaluation re-derives it and mismatches fail.

The bank ships only at **0 issues**, and I paste the full report.

---

## Part D — Workflow verification, end to end

Each of these is verified in the running app with a real session, not by reading code:

1. Practice respects the saved AB/BC track; switching track re-scopes without deleting history.
2. An answered question never reappears — in unit drills, topic drills, or the diagnostic.
3. Exhausted state shows topic accuracy and a link to the next weakest topic.
4. Calculator / No calculator tag is visible on every item.
5. Diagnostic: 30 items, 20 no-calculator + 10 calculator, single pooled 70-minute timer, unseen-only sampling, spread across manifestations so no two items are near-identical; it says so plainly if it cannot fill the blueprint with unseen items.
6. Score estimate appears only after a submitted diagnostic; before that the card invites the diagnostic. No point-loss estimates anywhere.
7. Unit and topic statistics always visible from bank attempts; mastery requires 10 attempts plus at least one from every topic in the unit; topic stats appear at 3 attempts.
8. Top mistakes ranked by occurrences; wrong answers write misconception codes that surface in the Common Mistakes database.
9. Exam countdown reads correctly against May 10, 2027.
10. Answer log renders LaTeX and figures identically to Practice, with green/red state and mistake tagging.

---

## Part E — Coverage display

Topic pages and Command Center topic rows show manifestations available vs seen for that topic, plus remaining unseen question count, so progress reads as understanding rather than volume. Unit rows aggregate the same numbers.

---

## Rollout

Each batch ends with the coverage audit, the Master Guide audit, and the stress run, and I report the raw output:

1. Taxonomy additions for the new techniques, Master Guide index, audit script, stress-harness upgrades, figure renderers.
2. Units 1–4 content build.
3. Units 5–6 content build.
4. Units 7–8 content build.
5. Units 9–10 (BC) content build.
6. Balance pass to hit the A3 distribution floors and the 30% computation cap.
7. Workflow verification (Part D) in the live app, plus the coverage display.

## Technical notes

- New files: `src/lib/master-guide-index.ts`, `scripts/master-guide-audit.ts`, `src/components/figures/*`, per-unit template files (`src/lib/templates/unit-01.ts` … `unit-10.ts`) so no single file grows past a maintainable size.
- Edited: `src/lib/ced-taxonomy.ts`, `src/lib/generated-bank.ts` (reasoning/representation budgeting, per-manifestation caps, signature dedup), `src/lib/question-templates*.ts` (migration into per-unit files), `scripts/stress-bank.ts`, `scripts/coverage-audit.ts`, `src/lib/drill.functions.ts`, `src/lib/diagnostic.server.ts`, `src/lib/performance.functions.ts`, `src/routes/_authenticated/practice.tsx`, `src/routes/_authenticated/command-center.tsx`, the question-navigator topic routes.
- Originality: the Master Guide, the CED, and the practice PDFs are reference and style inputs only. All wording, functions, values, contexts, answers, distractors, and explanations are original; a similarity check flags any prompt drifting toward source text, and no released question is reproduced or reskinned.
