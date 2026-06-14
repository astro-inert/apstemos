# AP Calculus BC Performance OS — Build Plan

A staged rebuild. I'll ship Phase 1 now (the foundation + flagship UI you can actually see). Phases 2–3 follow once you confirm Phase 1 feels right — that avoids burning credits on screens you'd want redesigned.

## Phase 1 — Foundation + Score Command Center (this turn)

**Backend (Lovable Cloud)**
- Enable Cloud, configure email + Google auth.
- Schema (all RLS-locked to `auth.uid()`):
  - `profiles` (display name, target score, exam date, track AB/BC)
  - `units` (curriculum, AP weight %, point value out of 108)
  - `topics` (FK unit)
  - `questions` (type MCQ/FRQ, unit, topic, difficulty, calculator, skills[], common_mistakes[], ap_value, answer, explanation) — schema only, empty
  - `attempts` (user, question, correct, time_spent, mistake_tags[])
  - `mastery` (user, topic, score 0–100, last_practiced, attempts_count) — derived view + trigger
  - `common_mistakes` (catalog with description, example, consequence, fix, est_point_loss)
  - `mistake_occurrences` (user, mistake, question)
- `user_roles` table + `has_role()` for future admin question authoring.
- Seed: units (1–10), 108-pt distribution, ~20 starter common mistakes (sign errors, missing units, wrong bounds, etc.) — these are general AP knowledge, not question content.

**Frontend**
- Auth pages (`/auth`, `/reset-password`) with email + Google.
- `_authenticated/` shell with sidebar nav: Command Center, Practice, FRQ Library, Common Mistakes, Topics, Roadmap, Formula Sheet, Settings.
- **Homepage `/`** (public, marketing): new hero ("Everything You Need For A 5"), Score Command Center preview, 108-pt engine visual, common-mistakes teaser, formula-sheet card, CTAs to sign in. Removes streaks/daily-question/generic-progress.
- **`/command-center`** (authed, flagship):
  - Predicted AP Score card (1–5) with confidence + trend sparkline
  - 108-pt bar: current / target / gap
  - "Fastest path to your target" — ranked recommended actions by ROI
  - Unit mastery heatmap (10 units × MCQ/FRQ)
  - Recent mistakes feed
- **`/common-mistakes`**: searchable catalog (description, example, AP consequence, fix, est. point loss, related links).
- **`/108-points`**: full breakdown — Section I MCQ (45 = 54 raw pts scaled), Section II FRQ (54 pts) — visualized as a treemap of where points live and where this user is losing them.
- Keep existing `/frqs-by-type`, `/topic-rundown`, `/exam-strategy`, `/self-study-guide`, `/latex-master-sheet` but restyle to match new shell.

**Design**
- Keep Cloud White / Modern Tech / Bento / Dark-default tokens already in `src/styles.css`.
- Tighten to "data-dense premium" (UWorld + Linear): more tables, sparklines, heatmaps; fewer hero gradients. Add Recharts for mastery viz.

## Phase 2 — Practice Engine (next turn)

- `/practice` MCQ runner: Practice / Timed / Exam Sim / Custom / Adaptive Weakness modes
- Per-question review screen (answer, explanation, skill, mistakes, related FRQ/topic/formula links)
- Post-test analytics: unit/topic breakdown, time analysis, weakness detection, projected score delta, recommended actions
- Adaptive selection: weighted random by `mastery.score` ASC + low `attempts_count`
- Mastery recalc trigger on `attempts` insert

## Phase 3 — FRQ DB + Roadmap + Admin (later)

- FRQ DB with full filter set (year/unit/topic/calc/difficulty/skill/type), scoring guidelines view, point breakdown
- Self-study roadmap generator (1/3/6/9 mo based on exam date + diagnostic)
- Admin route (`/_authenticated/_admin/questions`) for you to add questions over time — covers the "you'll provide them later" answer
- Subject-agnostic refactor: rename `units` → `(subject_id, unit)` so AP Physics C / Stats can be added without redesign

## Technical Notes

- All authed reads via `createServerFn` + `requireSupabaseAuth`.
- Public homepage uses `supabaseAdmin` server fn for any read (none needed Phase 1; it's static marketing).
- Predicted score = linear model on mastery-weighted unit accuracy until enough attempts; documented as estimate.
- No streaks, no daily question, no generic readiness % — replaced by Predicted AP Score (1–5) backed by real attempt data, "Estimate based on N questions" when low signal.

## What I'm NOT building this turn

- Question content (you're supplying)
- The MCQ runner UI (Phase 2)
- FRQ filterable DB (Phase 3 — existing `/frqs-by-type` stays as the placeholder)
- Subject-agnostic abstraction (Phase 3; schema is forward-compatible but uses BC fields now)

Approve and I'll start with Cloud + schema + auth + Command Center + new homepage.