# Rebuild: MCQ-Based AP Score Estimate

Replaces the current weighted-percentage predictor with an ability-based, coverage-aware, uncertainty-honest estimate. MCQ only — no FRQ modeling, no implied FRQ coverage.

## What changes conceptually

Today: unit accuracy x AP unit weight -> raw/108 -> hardcoded cutoffs, shown from question zero.
After: first-attempt responses on unseen questions feed a Rasch-style ability estimate; a dedicated timed diagnostic is the primary evidence; historical practice is secondary; the result is a distribution over 1-5 with an explicit confidence state and range.

## 1. Data collection infrastructure

New tables (all with GRANTs + owner-scoped RLS):

- `item_stats` — per question key: `provisional_difficulty` (from the author label), `empirical_difficulty`, `discrimination`, `n_first_attempts`, `n_correct`, `calibrated boolean default false`. Nothing is presented as calibrated until `n_first_attempts` clears a configurable floor.
- `question_exposure` — per (user, question key): `first_seen_at`, `first_attempt_correct`, `attempt_count`.
- `predictions` — `user_id`, `model_version`, `estimated_score`, `distribution jsonb`, `ability`, `standard_error`, `confidence_state`, `coverage_score`, `question_count`, `unique_question_count`, `diagnostic_id`, `created_at`, `actual_ap_score`, `actual_reported_at`.
- `diagnostics` + `diagnostic_responses` — a diagnostic session: item list, per-item response, `time_spent_ms`, `answered_at`, locked after submit.

`attempts` gains `attempt_kind` (`first_attempt` | `previously_seen` | `previously_answered` | `repeat_attempt`) and starts actually recording `time_spent_seconds` (the practice UI currently drops it).

## 2. Ability estimate

`src/lib/ability.ts` — pure, unit-testable:

- 1PL/Rasch marginal-likelihood ability estimate over first-attempt responses, weighted by evidence source (diagnostic > unseen practice > repeat, repeats capped near zero).
- Item difficulty from `item_stats`: `empirical_difficulty` when `calibrated`, otherwise provisional values mapped from easy/medium/hard. Provisional items are flagged in the returned payload so the UI and stored prediction both know the model is uncalibrated.
- Discrimination used only where empirically estimated (2PL); otherwise fixed at 1.0.
- Returns `{ theta, se, itemsUsed, provisionalShare }`.

Difficulty therefore matters: 80% on hard items yields a materially higher theta than 80% on easy items.

## 3. Coverage score

`coverage_score` (0-1) = weighted blend of unit coverage (AP-weighted share of units with >= N first-attempt items), topic coverage, difficulty-mix balance, and a concentration penalty (Herfindahl) so 30 items from one unit cannot look representative.

## 4. Confidence states

All thresholds live in one config module (`src/lib/predictor-config.ts`, with `MODEL_VERSION = "mcq_predictor_v1"`), not scattered constants:

- `insufficient_data` — below minimum unseen items or coverage; no score shown, only what's missing.
- `preliminary` / `moderate` / `high` — driven by item count, unique items, coverage_score, SE, and whether a timed diagnostic exists.

## 5. Score distribution

Theta -> expected MCQ performance -> score bands, convolved with the ability SE to produce probabilities for 1..5. Displayed as whole percentages, labeled **model estimates, not calibrated probabilities**, until validation data exists. Output includes most likely score and a range (e.g. 3-5) from the credible interval.

## 6. Predict My AP Score diagnostic

New route `/_authenticated/predict`:

- Blueprint-sampled item set: AP-weighted unit spread, fixed easy/medium/hard mix, unseen items preferred (falls back with an explicit note when the pool is exhausted).
- Timed with per-item response time recorded; answers lock on submit; no post-submit changes.
- Produces its own result row and becomes the primary evidence source; historical practice is down-weighted secondary evidence.

## 7. UI and wording

- Command Center card becomes **MCQ-Based AP Score Estimate** with the disclaimer that free-response performance is not included, plus a distribution bar, range, confidence chip, and "what would improve this" next step.
- Language is always "your current MCQ performance is most consistent with...", never "you will get a 5". Insufficient data and high-uncertainty states get their own copy. No College Board accuracy claims; official info and AP STEM OS estimates are visually separated.
- Voluntary "report your actual AP score" input writes `actual_ap_score` for validation.

## 8. Validation + admin dashboard

`/_authenticated/admin/predictions` (gated by the existing `has_role(admin)`): totals, distribution by predicted score, confidence mix, average items and coverage, reported actuals, predicted-vs-actual matrix, MAE, calibration curve, Brier score, accuracy by confidence / item count / predicted score, split by `model_version`. Every metric renders "not enough validation data yet" until real reported scores exist — nothing fabricated, no advertised accuracy.

## Technical notes

- Estimation lives in pure modules; server functions (`prediction.functions.ts`, `diagnostic.functions.ts`) wrap them with `requireSupabaseAuth`.
- `getPerformanceSnapshot` keeps mastery/diagnostics but its `predicted_ap_score` / `predicted_raw_score` fields and `rawToAp` cutoffs are removed; the homepage instrument reads the new estimate and shows the example preview when a user has insufficient data.
- Item calibration is a scheduled recompute over first attempts, flipping `calibrated` only past the sample floor.

## Sequencing

1. Migrations + attempt-kind/timing capture (data must accumulate before anything else is meaningful).
2. `ability.ts`, coverage, distribution, config + tests.
3. Prediction server functions; rewire Command Center card.
4. Diagnostic assessment route.
5. Actual-score reporting + admin analytics dashboard.
