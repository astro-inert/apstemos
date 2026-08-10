# Making the site match the AP STEM OS identity

Three passes, in order. Pass 1 is the identity/landing work; passes 2 and 3 fill the gaps I found while reading the project.

## What's already true

- Practice (1700+ generated questions, unit/subtopic tags, difficulty, explanations), Score Command Center (70% strength/weakness threshold, unit mastery, ROI suggestions), Answer Log with mistake tagging, Common Mistakes Database, Question Type Navigator (unit → topic), FRQ Library, and the formula-sheet PDF link all exist.

## What's missing

- The site never says what it is: open-source, forever-free, built for a 5 — not for deep learning. Naming is inconsist­ent ("Performance OS" vs "AP STEM OS").
- Exam Strategy is an empty page ("[Content coming soon.]").
- Topic Rundowns is a list of 10 unit cards with no content behind them.
- Question Type Navigator topic pages end in a "Question-type PDF · coming soon" block instead of the MCQ/FRQ how-to writeup.
- There is no way to add a mistake the database doesn't have.

## Pass 1 — Identity and landing

- Rename the product to **AP STEM OS** everywhere: footer, page titles, meta/OG tags, sidebar wordmark (keep the per-subject short forms AP Calc/OS, AP Physics/OS, AP Stats/OS).
- Rewrite the landing hero and add a short positioning band stating: open-source, forever free, covers AP Calculus AB/BC, Physics 1, 2, C Mechanics, C E&M, and Statistics, and built for one outcome — a 5. Keep the existing dark palette, cards, and animations.
- Retitle the supporting-resources group to the real names: **FRQ Library**, **Topic Rundowns**, **Formula and Strategy Guide**, **Exam Strategy**. Update the nav dropdown to match.
- Describe each resource with the user's own one-liners (what it is and when to use it) instead of generic copy.
- Add a short "why this exists / open source" block near the footer with a repo link placeholder.

## Pass 2 — Fill the empty content (AP Calculus)

- **Exam Strategy**: build the real page with three sections — calculator usage (graphing-calc tasks with worked examples), timing (per-section pacing and point-per-minute triage), and efficient approaches to recurring question types. LaTeX-rendered.
- **Topic Rundowns**: make each unit card open a unit page with an exam-focused rundown of every core concept for that unit — what's tested, the formula/rule, the trap, and the fastest solve.
- **Question Type Navigator level 4**: replace the "coming soon" block with the actual writeup per subtopic — how to answer MCQs on it, how to answer FRQs on it, worked pattern, and the mistakes it triggers.
- **Formula and Strategy Guide**: keep the printable PDF as the primary action, plus an in-app LaTeX-rendered version of the same 10 pages so it's usable without downloading.

Physics and Statistics stay as they are for now (skeleton pages, no bank).

## Pass 3 — Close the loop with AI mistake capture

- On a missed question in the Answer Log (and from the Common Mistakes page), add "My mistake isn't here → describe it".
- The student describes it in plain language; AI drafts a structured entry — title, category, description, example, how to avoid, estimated point loss — shown for edit before saving.
- Saved entries are **private to that student**: they appear in their own Common Mistakes view alongside the shared ones, marked as personal, and are taggable from the Answer Log exactly like shared mistakes.

## Technical notes

- New `user_mistakes` table (owner-scoped RLS + grants) for personal AI-drafted entries; Answer Log tags reference either a shared `common_mistakes.code` or a personal entry id.
- Drafting runs through a `createServerFn` calling Lovable AI (`google/gemini-3.6-flash`) with a Zod-validated structured output — no key in the client.
- Topic Rundowns and the Navigator writeups become data modules (like `question-navigator-data.ts`) with new nested routes, so content is authored once and rendered by shared components.
- All new prose renders through the existing `LaTeX` component; per-route `head()` metadata added for every new page.
