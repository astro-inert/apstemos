# AP STEM OS — ground-up redesign

A full visual and structural rebuild of the marketing surface plus a light-first theme across the whole app. Same product, same data, same routes — new instrument-grade design language.

## 1. New design language (site-wide, light-first)

- Warm near-white background, dark charcoal type, magenta as the single interaction color. Very subtle lavender/pink atmospheric gradients — no blobs, no cheesy gradients.
- 1px hairline borders, very soft shadows, generous whitespace, restrained radii. Glass only on the navbar and floating surfaces.
- Light becomes the default theme; dark mode stays available from the existing toggle and gets re-tuned to match (same tokens, inverted). Every page — landing pages, resource pages, dashboard, practice — inherits the new tokens.
- Typography: large tight display headings, restrained body, monospace for percentages, mastery values, micro-labels, and question IDs. LaTeX rendering stays for all math.
- All values live as tokens in `src/styles.css`; no hardcoded colors in components.

## 2. Navigation & footer

- Sticky navbar: typographic `AP STEM OS` logo on the left (with the subject switcher kept next to it), then Practice · Score Command Center · Resources (dropdown), and a `Start practicing →` button on the right. Translucency and hairline border fade in on scroll. Clean mobile sheet instead of a shrunken desktop row.
- Footer: single tidy column set — Practice, Score Command Center, Common Mistakes, Question Type Navigator, FRQ Library, Topic Rundowns, Formula & Strategy Guide, Exam Strategy — with "Free forever." Removes the GitHub link and the "open source" wording.

## 3. Homepage story (all 7 subject landing pages)

Rebuilt as a sequence of sections, each subject rendering its own units and subtopics:

1. **Hero** — "Know exactly what to study to get a 5." + the specified subline, `Start optimizing my score →`, `Explore the system →`, and the "Free forever · No credit card · Built for the AP exam" line.
2. **Score Command Center instrument** — overlapping the hero: predicted score, subtopic mastery bars, and a numbered "Your next moves" list. Numbers count up on entry, bars fill in view, rows glow on hover.
3. **"Every answer changes what comes next."** — Practice → Diagnose → Understand → Target → Repeat as one continuous pipeline with a magenta signal traveling through it on scroll; each stage reveals a tiny UI fragment (an answer, a shifting mastery %, a mistake identified, a recommendation, the next question).
4. **"Don't just see that you're wrong. Understand why."** — split-screen demo: a real AP-style question on the left; selecting the wrong choice reveals Concept / Mistake / Pattern / Next on the right, plus `Practice this weakness →`.
5. **"Stop guessing what to study."** — full unit-mastery panel beside a visually dominant highest-priority recommendations panel.
6. **"Your mistakes shouldn't disappear."** — Common Mistakes entry (what happens, how to avoid, your history) with a quiet "Can't find your mistake? Describe it →" entry point into the existing capture dialog.
7. **"Know how the AP asks."** — curriculum navigator: unit + subtopic list where selecting a subtopic reveals the MCQ and FRQ approach steps, field-manual styling.
8. **Three pillars** — Practice (1,700+ AP-style questions by unit, subtopic, and difficulty), Mistake Intelligence, Score Optimization; each with a small animated interface preview.
9. **Resources** — FRQ Library, Topic Rundowns, Formula & Strategy Guide, Exam Strategy as four restrained secondary modules.
10. **Free forever manifesto** — "Built for students. Free forever." with FREE FOREVER · NO CREDIT CARD · NO PREMIUM TIER.
11. **Final CTA** — "Stop studying. Start optimizing." + `Start practicing →`.

Mobile is composed deliberately, not scaled down: the hero stays large, the command center stacks vertically, the pipeline runs vertically, the wrong-answer demo becomes a two-step stacked reveal, and nothing overflows horizontally.

## 4. Live vs demo data

- Signed out (and during SSR/prerender): the dashboard, mastery, and recommendation visuals render the specified illustrative values, labeled as an example preview.
- Signed in with attempts: they swap to real mastery, unit, and recommendation data from the existing performance functions, fetched client-side so public routes stay prerender-safe. Users with no attempts keep the example preview.
- 70% is described only as AP STEM OS's operational mastery threshold.

## 5. Copy rules enforced everywhere

Sweep the whole app for and remove: "average point loss" / point-loss numbers, "open source", GitHub references, "AI-powered" as marketing, and any fabricated statistic, testimonial, or score-improvement claim. The mistake capture and Common Mistakes surfaces stop displaying an estimated point-loss figure.

## Technical notes

- `src/styles.css`: rewrite the token layer (light default, retuned dark, new shadow/gradient/easing tokens, mono-numeric utilities, reduced-motion guards).
- Install `motion` (Motion for React) for spring transitions, scroll-triggered reveals, and the pipeline signal; all motion respects `prefers-reduced-motion`.
- `src/components/SubjectHome.tsx` is replaced by a set of focused section components under `src/components/home/` (hero, command-center instrument, pipeline, wrong-answer demo, mistakes, navigator, pillars, resources, manifesto, CTA), composed by `SubjectHome`.
- `src/lib/subjects.ts` gains per-subject demo mastery/recommendation/question content for the section visuals, plus removal of the point-loss fields used by the old mistake list.
- `SiteNav.tsx`, `SiteFooter.tsx`, `PageShell.tsx`, `AppShell.tsx`, and the resource/dashboard pages get token-level restyling only — no logic or data changes.
- No database migrations, no changes to auth, practice scoring, or the question engine.