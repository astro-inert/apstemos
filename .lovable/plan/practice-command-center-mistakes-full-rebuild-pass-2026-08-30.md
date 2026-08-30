# Practice → Command Center → Mistakes: full rebuild pass

Goal: the practice / command center / mistakes workflow is airtight — no repeated questions, correct AB/BC separation, clean math and LaTeX, honest statistics, and copy that matches reality.

## 1. Question bank: comprehensiveness and no near-duplicates

Source material (all four confirmed downloadable): the official AP Calculus AB/BC Course and Exam Description, plus the three practice-test PDFs you linked (82-page test, 8-page set, and the third packet). These are read as a *coverage map and style reference only* — every question stays original, with no College Board text reproduced.

- Extract the full CED topic/skill inventory (every numbered topic 1.1 → 10.15 and its skill statements) and audit the current 77 templates against it. Any topic or asked-form with no template gets one.
- Expand templates so every distinct question *form* inside a topic exists — graph-based, table-based, symbolic, contextual with units, theorem-justification, and the calculator-dependent forms the practice tests use — not just more numeric variants of one sentence.
- Add a duplicate guard: today variant de-duplication compares full prompt text, so 27 numeric re-skins of one sentence all survive. New rule: reject variants whose normalized prompt (numbers stripped) already exists in the same topic beyond a small quota, and cap variants per template.
- Tag every template with `track: "AB" | "BC" | "both"` so BC-only topics (parametric/polar/vector, series, logistic growth, improper integrals, Euler's method) never appear for AB students.
- Tag every template's `calculator` flag deliberately (currently mostly default `false`) — numeric integration, root-finding, decimal evaluation, and contextual rate accumulation marked `true`, calibrated against how the practice tests split their sections.


## 2. Never show an answered question again

- `getDrillSet` filters out every `question_key` present in the user's `question_exposure` before sampling, and returns remaining counts.
- When a unit/topic has no unseen questions left, Practice shows an "exhausted" state with the user's accuracy for that topic and links to the next-weakest topic. No repeats, no silent recycling.
- The MCQ diagnostic samples strictly from unseen keys (the blueprint currently only *prefers* unseen); if the blueprint cannot be filled with unseen items, it says so instead of reusing seen ones.

## 3. AB / BC tracks

- Track is stored on the profile (already exists as `profiles.track`) and switchable from the Command Center header and Practice.
- Practice, the diagnostic blueprint, unit/topic statistics, and the Command Center unit list all filter by the active track. AB hides BC-only units/topics entirely; switching tracks re-scopes stats rather than deleting history.

## 4. Math and LaTeX correctness

- Rewrite the "tidy" pass that strips redundant `1`s. It currently runs as blind regexes over the whole string and can delete meaningful 1s. Replacement: templates emit coefficients through formatting helpers that decide at construction time (coefficient 1 → omitted, exponent 1 → omitted, constant 1 → kept), and the regex pass is removed.
- Add a build-time audit script that renders every generated question, choice, and explanation through KaTeX in strict mode and fails on any unrendered/malformed expression, stray `\text{}`, unbalanced braces, or literal backslashes leaking into prose. Fix everything it flags.

## 4b. Stress-test every single question

An automated sweep runs over the entire generated bank (every template × every variant) and fails the build on any of these, and each failure gets fixed rather than suppressed:

- **Obvious answers**: the correct choice must not be identifiable without doing the math. Checks reject sets where the key is the only choice with a different form/length/sign, the only simplified one, the only one with the right units, or an outlier in magnitude; distractors must come from real error paths (sign slip, chain-rule omission, wrong bound, derivative/antiderivative swap), not filler.
- **Degenerate math**: no duplicate choices, no case where two choices are algebraically equal, no unanswerable or ambiguous prompt, no answer absent from the choice set, and answer positions distributed evenly across A–D across the bank.
- **Non-AP questions**: every item must map to a real CED topic and skill and read like an AP-style stem (function/graph/table/context framing, standard notation and phrasing). Anything trivial, contrived, or outside the CED gets rewritten or cut.
- **AP-style coverage without copyright risk**: the CED and your practice tests set which *forms* get tested and how prompts are phrased in general; all numbers, functions, contexts, and wording are original, and a similarity check flags any prompt that drifts too close to source text.
- Verification: run the sweep, read the full report, and fix every flagged item before this is called done.

- Run the LaTeX audit over the Common Mistakes rows and the answer-log/practice tables so those render identically.


## 5. Statistics vs. prediction

- Unit and topic statistics come straight from the question bank attempts and are always shown (attempts, accuracy, coverage of that unit's/topic's available questions) — no gating, no prediction language.
- The AP score estimate appears **only** after the MCQ diagnostic is submitted. Before that, the estimate card invites you to take the diagnostic instead of showing a partial number.
- Remove all point-loss estimates everywhere: Command Center top-mistakes, the Common Mistakes database cards, and the AI mistake-capture flow stop producing or displaying `est_point_loss`.
- Top mistakes are ranked by number of occurrences.

## 6. Score Command Center cleanup

- Remove the "Fastest path" card and the "108-point mastery map" card.
- Remove copy that hedges about model reliability, and remove the "Report your score" section entirely.
- Rename the section to **Unit level breakdown** (replacing the "Topic-level breakdown unlocks…" line).
- Fix the exam countdown: it reads 0 because the stored exam date (2026-05-12) is in the past. Exam date becomes **May 10, 2027** as the default and for existing profiles.

## 7. Timed MCQ diagnostic: calculator calibration

- Every question is visibly tagged **Calculator** or **No calculator** in Practice and in the diagnostic.
- The 30-question diagnostic is built as 20 no-calculator + 10 calculator items.
- Time budget is aggregate, not per question: 20 × 2 min + 10 × 3 min = **70 minutes** on a single session timer.

## 8. 108-Point Breakdown page

- Drop "and here's how every one of them is earned" from the description.
- Title accent moves to **live** instead of **points** ("Where the *live* points live" → the pink word is `live`), matching the Common Mistakes page treatment.

## Technical notes

- `src/lib/question-templates.ts`: add `track`, deliberate `calculator`, new template families, coefficient-aware formatting helpers, remove `tidyTex` regex stripping.
- `src/lib/generated-bank.ts`: structural de-duplication, track filter in `bankKeys`.
- `src/lib/drill.functions.ts`: exclude seen keys via `question_exposure`, return remaining counts and exhausted state.
- `src/lib/diagnostic.server.ts` + `src/lib/predictor-config.ts`: unseen-only sampling, 20/10 calculator split, 4200-second aggregate limit.
- `src/lib/prediction.server.ts` / `ScoreEstimateCard.tsx`: estimate requires a submitted diagnostic; reliability hedging copy removed.
- `src/lib/performance.functions.ts`: drop `est_point_loss`, sort mistakes by occurrences, per-track unit/topic stats.
- `src/routes/_authenticated/command-center.tsx`: remove Fastest path, 108-point card, `ActualScoreReporter`; rename to Unit level breakdown; track switcher.
- `src/routes/common-mistakes.tsx`, `src/lib/user-mistakes.functions.ts`: remove point-loss display and generation.
- Migration: default `profiles.exam_date` → 2027-05-10 and update existing rows.
- New audit script rendering all generated content through KaTeX, run before finishing.
