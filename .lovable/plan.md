# Complete Build: Formula-Complete Question Bank, Duplicate Purge, Correct Figures, Airtight Workflow

## Honest state of the project right now (measured, not claimed)

- 3,817 generated questions from 372 templates. 337 taxonomy manifestations, 0 *missing*, but **56 manifestations hold only 1–2 questions**, so "covered" overstates reality.
- Reasoning mix is still dominated by plain computation: **47.6% computation**; graphical items are only **5.1%**.
- Techniques from your Master Guide that the bank barely or never tests (counts across all three template files): inverse trig derivatives and integrals **0**, linearization / tangent-line approximation **0**, derivative of an inverse function **0**, volumes by known cross-section **0**, shells **0**, trig antiderivatives sec/csc/tan/cot **0**, direct comparison test **0**, alternating series error bound **0**, Newton's law of cooling **0**, integration by parts **2**, partial fractions **2**, limit comparison **2**, integral test **1**, radius of convergence **2**, interval of convergence **1**.
- Deduplication today is exact-prompt only, so numeric re-skins of one sentence survive inside a topic.
- The figure layer has real defects (detailed in Part C) — most importantly every "graph of f" is drawn as straight polyline segments, which makes concavity, inflection, and smooth-curve questions visually wrong.
- Three items from the previously approved plan were never built: the stress-harness upgrades, figure renderers beyond slope fields and piecewise graphs, and the topic-level coverage display.

Everything below is what "done" means. Each phase ends with raw audit output pasted, not summarized.

---

## Part A — Content completeness

### A1. Master Guide becomes a machine-checked checklist

New `src/lib/master-guide-index.ts` encodes every formula, theorem, technique, rule, and table from the 10-page guide as an entry: `{ id, page, label, topic_slug, manifestations[], minQuestions }`. New `scripts/master-guide-audit.ts` fails if any entry has fewer than 3 generated questions and prints every deficient entry. That converts "comprehensive" into a hard gate.

### A2. Full technique inventory to build out

Each bullet becomes real template families with symbolic, graphical, tabular, verbal, and contextual variants wherever the technique admits them.

**Unit 1 — Limits and Continuity**
Limit notation and one-sided limits; existence via matching one-sided limits; estimation from graphs and from tables; factorization and cancellation; rationalization with conjugates; special trig limits `sin(ax)/bx` at 0 and at ∞ and `(1−cos x)/x`; squeeze theorem including bounding-function setup; removable / jump / infinite discontinuity classification and which are removable; the three continuity conditions and solving for a parameter that makes a piecewise function continuous; vertical asymptotes from `a/0`; horizontal asymptotes including `ax/√(bx²+c)` sign behavior as x → ±∞; end behavior of rational, exponential, and radical forms; IVT hypotheses, conclusion, and what it does not guarantee; continuity vs differentiability.

**Unit 2 — Differentiation: Definition and Fundamental Properties**
Average vs instantaneous rate; both limit definitions (h-form and alternate a-form) forward and in reverse (given a limit, name the derivative); recognizing a difference quotient; differentiability failures — corners (`|x|`), cusps (`x^{2/3}`), vertical tangents, discontinuities; power/constant/sum rules; all six trig derivatives; `e^x`, `a^x ln a`, `ln x`, `log_a x`; all six inverse trig derivatives; product rule; quotient rule; derivatives from tables; reading `f'` sign information off a graph of `f`.

**Unit 3 — Composite, Implicit, and Inverse Functions**
Chain rule with correct inner/outer identification, multi-layer compositions, and chain rule on table data; implicit differentiation including solving for `dy/dx` and second implicit derivatives; tangent lines to implicit curves and locating horizontal/vertical tangents; derivative of an inverse function `1/f'(f^{-1}(x))`; logarithmic differentiation; chain-rule-omission distractors.

**Unit 4 — Contextual Applications of Differentiation**
Interpreting a derivative with units; straight-line motion — position, velocity, acceleration, speed `|v|`, direction changes, when speed increases; related rates in the four-step structure across geometric contexts; linearization `f(a)+f'(a)(x−a)` including whether it over- or under-estimates based on concavity; L'Hôpital for `0/0` and `∞/∞`, rewriting `0·∞` and `∞−∞`, and cases where it does not apply.

**Unit 5 — Analytical Applications of Differentiation**
MVT hypotheses, conclusion, counterexamples; Rolle's case; EVT hypotheses and endpoint testing; critical points where `f'=0` or undefined; increasing/decreasing from `f'`; first derivative test; concavity from `f''`; inflection points requiring a sign change; second derivative test and when inconclusive; absolute extrema on closed intervals; candidates test; optimization with constraint elimination and verification; curve sketching and matching `f`, `f'`, `f''` graphs.

**Unit 6 — Integration and Accumulation of Change**
Riemann sums — left, right, midpoint, trapezoidal, equal and unequal subintervals; over/under-estimate rules from monotonicity and concavity (both guide tables); sum-to-integral limit form and its reverse; definite integral properties (additivity, reversal, constant multiples, zero width); FTC Part 1 including chain rule with a variable upper bound and with both bounds functions; FTC Part 2; accumulation functions analysed from a graph of the integrand; the full antiderivative table — powers, all trig including sec²/csc²/sec·tan/csc·cot and `∫tan`, `∫cot`, `∫sec`, `∫csc`, inverse trig forms, `e^x`, `a^x`, `1/x` with absolute value; u-substitution including changing bounds; integration by parts including repeated application; partial fractions with distinct linear factors; improper integrals as limits with infinite bounds and interior discontinuities, plus convergence decisions.

**Unit 7 — Differential Equations**
Verifying a proposed solution; slope fields — sketching, matching an equation to a field, reading solution behavior; separation of variables with initial conditions and `+C` handling; exponential growth/decay `y = y₀e^{kt}`; logistic `dP/dt = kP(1−P/M)` with carrying capacity and maximum growth at `M/2`; Euler's method tables with one or more steps and over/under-estimate reasoning; Newton's law of cooling as a modeling context; domain of validity of a solution.

**Unit 8 — Applications of Integration**
Average value with units and MVT for integrals; net change and accumulation in context; displacement vs total distance `∫|v|`; area between curves in x and in y including choosing the variable and splitting at intersections; disks; washers with correct big-R/small-r assignment; shells; volumes by known cross-section for squares, isosceles right triangles, equilateral triangles, semicircles; arc length in x and in y; setting up an integral without evaluating.

**Unit 9 — Parametric, Polar, Vector (BC)**
`dy/dx` from parametric derivatives; `d²y/dx²`; parametric arc length; parametric motion — velocity vector, speed, acceleration, total distance; polar/Cartesian conversion; polar area of one region; area between two polar curves; polar arc length; finding bounds including limaçons with an inner loop; `dy/dx` for a polar curve; vector-valued position/velocity/acceleration with initial conditions.

**Unit 10 — Infinite Sequences and Series (BC)**
Partial sums; geometric convergence and sum with shifted starting index; nth-term test; p-series; alternating series test; integral test with hypothesis checks; direct comparison; limit comparison; ratio test including inconclusive `L=1`; absolute vs conditional convergence and the alternating harmonic case; power series form; Taylor and Maclaurin construction from derivative values; the seven common Maclaurin series (`e^x`, `sin`, `cos`, `1/(1−x)`, `1/(1+x)`, `ln(1+x)`, `arctan`); manipulating known series by substitution, differentiation, integration, multiplication; Lagrange error bound; alternating series error bound; radius of convergence; interval of convergence with mandatory endpoint checking.

### A3. Depth and balance targets

- Every manifestation ≥ 3 distinct questions; the 56 thin ones filled first.
- Every Master Guide entry ≥ 3 questions.
- No reasoning type above 30% of the bank. Computation is capped; the freed budget goes to must-be-true, procedure-selection, reverse reasoning, parameter conditions, error analysis, equivalent forms, interpretation, classification, insufficient-information.
- Representation floors: graphical ≥ 12%, tabular ≥ 12%, verbal ≥ 7%, contextual ≥ 15%.
- Difficulty spread per topic roughly 30% easy / 45% medium / 25% hard, with no all-easy topic.
- Calculator flags assigned by the work required (numeric integration, root finding, decimal evaluation, table-driven contextual rates), not defaulted.
- Track tags audited per topic: AB never sees BC-only content; BC sees everything.

### A4. Distractor quality

Every distractor traces to a named error path stored in metadata: sign slip, chain-rule omission, derivative/antiderivative swap, wrong or reversed bounds, dropped constant multiple, missing `+C`, confusing `f` with `f'`, treating a necessary condition as sufficient, off-by-one series index, radius vs interval confusion, degrees/radians, dropped units. Filler numbers are not acceptable, and each distractor carries a misconception code so wrong answers feed the Common Mistakes database.

---

## Part B — Duplicate purge (delete, not just suppress)

1. **Structural signature dedup.** Normalize each prompt: strip numbers, coefficients, variable names, and interval endpoints down to a skeleton, combine with concept + representation + reasoning + algebraic structure. Identical skeletons beyond a small per-topic quota are **deleted from the bank**, not merely flagged.
2. **Near-duplicate detection.** Token-level similarity between prompts inside a topic; anything above the threshold is cut, keeping the variant with the better distractor set and difficulty fit.
3. **Answer-set duplicates.** Two items with the same skeleton *and* the same answer/distractor multiset are collapsed to one.
4. **Per-manifestation caps.** A manifestation cannot be over-farmed just because a template is easy to parameterize; caps are enforced at generation, and the remaining budget flows to thin manifestations.
5. **Cross-file template duplicates.** `question-templates.ts`, `question-templates-extra.ts`, and `question-templates-gap.ts` are audited for templates that produce equivalent items; redundant templates are removed rather than left dormant.
6. **Regression gate.** Stress harness fails on any signature collision above quota, so duplicates cannot creep back.

Expect the bank size to *drop* during this pass before rising again from Part A. That is the point: a smaller, genuinely distinct bank beats an inflated one.

---

## Part C — Figures: fix the mistakes and build the missing renderers

### C1. Defects to fix in the current renderers

- **Curves are polylines.** `PiecewiseGraph` connects points with straight segments, so any item about concavity, inflection, smoothness, or a parabola/exponential shape is drawn incorrectly. Add true smooth-curve rendering from a sampled function, and keep piecewise-linear only where the question explicitly says the graph consists of line segments.
- **Axes can be drawn outside the plot.** `px(0)` / `py(0)` are unclamped, so when the window excludes 0 the axis lines and tick labels land off the data area. Axes get clamped, and windows that exclude 0 get edge-anchored axes with proper labels.
- **No discontinuity marks.** There is no way to draw open/closed endpoints, holes, or jumps, so removable/jump discontinuity graph items cannot be shown truthfully. Add open/closed point markers, holes, and vertical-asymptote dashes.
- **No feature labels.** Extrema, inflection points, intercepts, and asymptotes are unlabeled, and the only text is a caption — some prompts refer to features the picture doesn't identify. Add labelled points, region shading for area/accumulation items, and axis titles.
- **Slope-field label artifacts.** The aria-label prints raw coefficients, producing `dy/dx = 1x + 1y` style text with redundant 1s; extent is forced symmetric about the origin so a field on, say, `[0,4]` cannot be drawn; fixed screen-space segment length makes steep slopes overshoot their cells. All three get fixed: formatted equation text, arbitrary x/y windows, slope-aware segment clipping.
- **Every figure is re-verified against its prompt.** Any item where the picture and the stem disagree (wrong sign, wrong interval, wrong number of turning points, wrong monotonicity) gets corrected or cut. This is a full sweep, not spot checks.

### C2. New renderers

`src/components/figures/` with one dispatch component absorbing the existing slope-field and piecewise renderers:

- **Data table** for tabular items (values of `f`, `f'`, `v(t)`, unequal `Δx` rows).
- **Function graph** for `f`, `f'`, `f''` with labelled intercepts, extrema, inflection points, asymptotes, shaded regions, and discontinuity markers.
- **Polar / parametric curve** including limaçons with inner loops and shaded sectors.
- **Riemann rectangles / trapezoids** overlay for approximation items.

Figures render identically in Practice, the timed diagnostic, and the answer log, each with an accessible description. An item whose representation is graphical or tabular but which carries no figure is a stress-test failure.

---

## Part D — Correctness gates

### D1. LaTeX and math hygiene
Every prompt, choice, and explanation renders through KaTeX in strict mode. Failures on unbalanced `$`, unterminated `\text{`, stray backslashes in prose, unbalanced braces, redundant coefficient `1` (`1x`, `1\pi`), redundant exponent `^{1}`, `+ -`, and `--`. Coefficients and exponents come from construction-time helpers; no regex stripping after the fact.

### D2. Stress harness upgrades in `scripts/stress-bank.ts`
Keeps current checks (duplicate/equivalent choices, missing answer, answer-position balance 18–32%, obvious-answer shape heuristics, unmapped unit/topic) and adds:
- structural-signature collision detection with per-topic quota;
- near-duplicate prompt detection with numbers normalized out;
- per-manifestation minimum threshold;
- representation and reasoning distribution bounds from A3;
- Master Guide checklist coverage;
- missing-figure check for graphical/tabular items, plus figure/prompt consistency assertions (monotonicity, sign, interval, feature counts declared by the template must match the rendered data);
- distractor-provenance check — every distractor carries a misconception code;
- numeric self-verification: an independent evaluation re-derives each computed answer and mismatches fail.

The bank ships only at **0 issues**, with the full report pasted.

---

## Part E — Workflow verification, end to end

Verified in the running app with a real session, not by reading code:

1. Practice respects the saved AB/BC track; switching re-scopes stats without deleting history.
2. An answered question never reappears — unit drills, topic drills, or diagnostic.
3. Exhausted state shows topic accuracy and links to the next weakest topic.
4. Calculator / No calculator tag visible on every item.
5. Diagnostic: 30 items, 20 no-calculator + 10 calculator, single pooled 70-minute timer, unseen-only sampling, spread across manifestations; it says so plainly if the blueprint cannot be filled with unseen items.
6. Score estimate only after a submitted diagnostic; before that the card invites the diagnostic. No point-loss estimates anywhere.
7. Unit and topic statistics always visible from bank attempts; mastery requires 10 attempts plus at least one from every topic in the unit; topic stats at 3 attempts.
8. Top mistakes ranked by occurrences; wrong answers write misconception codes surfacing in the Common Mistakes database.
9. Exam countdown correct against May 10, 2027.
10. Answer log renders LaTeX and figures identically to Practice, with green/red state and mistake tagging.

---

## Part F — Coverage display

Topic pages and Command Center topic rows show manifestations available vs seen, plus remaining unseen count, so progress reads as understanding rather than volume. Unit rows aggregate the same numbers.

---

## Rollout

Each batch ends with the coverage audit, Master Guide audit, and stress run, with raw output reported:

1. Taxonomy additions, Master Guide index + audit, stress-harness upgrades, duplicate purge, figure renderer rebuild and figure sweep.
2. Units 1–4 content build.
3. Units 5–6 content build.
4. Units 7–8 content build.
5. Units 9–10 (BC) content build.
6. Balance pass to hit A3 floors and the 30% computation cap.
7. Live workflow verification (Part E) plus the coverage display.

## Technical notes

- New files: `src/lib/master-guide-index.ts`, `scripts/master-guide-audit.ts`, `scripts/dedupe-report.ts`, `src/components/figures/*`, per-unit template files `src/lib/templates/unit-01.ts` … `unit-10.ts` so no single file stays unmaintainable (the gap file is currently 5,305 lines).
- Edited: `src/lib/ced-taxonomy.ts`, `src/lib/generated-bank.ts` (signature dedup, per-manifestation caps, reasoning/representation budgeting), `src/lib/question-templates*.ts` (migration + duplicate removal), `src/components/SlopeField.tsx` (folded into the figures dispatch, re-exported so call sites keep working), `scripts/stress-bank.ts`, `scripts/coverage-audit.ts`, `src/lib/drill.functions.ts`, `src/lib/diagnostic.server.ts`, `src/lib/performance.functions.ts`, `src/routes/_authenticated/practice.tsx`, `src/routes/_authenticated/command-center.tsx`, question-navigator topic routes.
- Originality: the Master Guide, the CED, and the practice PDFs are reference and style inputs only. All wording, functions, values, contexts, answers, distractors, and explanations are original; a similarity check flags any prompt drifting toward source text, and no released question is reproduced or reskinned.
