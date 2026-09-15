# Homepage credibility and conversion refinement

## Goal
Refine the existing AP STEM OS homepage across Calculus, Statistics, Physics 1, Physics 2, Physics C Mechanics, and Physics C E&M without changing its structure, visual identity, or product behavior.

## Changes
- Tighten the existing homepage copy so each section has one clear job: value, practice, learned mastery, mistake diagnosis, question-type guidance, resources, then one final connected workflow.
- Keep the central loop prominent once—Practice → Mastery Data → Weak Areas → Repeated Mistakes → Question Type Guidance → Practice Again—and remove nearby explanations that repeat it.
- Replace the Calculus homepage preview with one coherent fictional BC student profile. Unit mastery, topic mastery, completed-question counts, and recommended next moves will agree, with the weakest areas driving recommendations.
- Keep “Example preview” labeling and ensure unavailable subjects remain clearly labeled as coming soon rather than implying live functionality.
- Correct the Calculus Navigator example so “Evaluating Limits Algebraically” uses mathematically relevant MCQ and FRQ steps. Audit the Physics and Statistics examples for the same topic-to-guidance consistency.
- Proofread all visible homepage text, including the “an AP…” grammar fix, consistent feature names, punctuation, and AP terminology.
- Keep the primary Start Practicing action visually dominant and verify its current route is the shortest safe path into course/unit/topic selection without adding sign-up friction.
- Preserve existing non-affiliation language and use only product evidence—accurate examples, coherent data, and transparent labels—for credibility.
- Refine mobile containment and density without hiding demonstrations: readable dashboards, sensible section spacing, adequate tap targets, and no horizontal overflow.

## Technical details
- Reuse the existing homepage components, tokens, motion, routes, and subject gating.
- Centralize demo counts and mastery relationships in the existing homepage demo data rather than hardcoding contradictory values in presentation components.
- Keep live signed-in data behavior unchanged; only the signed-out example preview changes.
- Validate all subject home routes at 320, 390, 759, 768, and 1280px; check CTA links, interactive examples, overflow, console errors, and the current build log.
