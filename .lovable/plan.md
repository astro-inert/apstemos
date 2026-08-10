# Landing page composition refinement

Three sections in `src/components/SubjectHome.tsx` get re-composed. No new design system, no color/typography/card-style changes — same tokens, same components, same pink accent on dark.

## 1. Hero

Goal: one idea — "Everything you need for a 5" + "Every answer makes the platform smarter" — with the existing Score Command Center UI as the proof.

- Switch from a fully centered stack to a two-column layout on large screens (left: copy, right: product visual); stays single-column stacked on mobile.
- Left column keeps, in order: countdown pill, existing `h1` gradient headline, the "Every answer makes the platform smarter." line, one shortened supporting paragraph, and both existing CTAs. The two redundant paragraphs merge into one so the stack is shorter.
- Stats row becomes a compact inline strip under the CTAs (small numbers + labels separated by dividers) instead of a full-width 3-cell bordered box, so it supports rather than competes.
- Right column reuses the existing Score Command Center cards (predicted score card + fastest-path list, same markup/classes) as the hero's visual evidence — moved, not redesigned.
- Because the dashboard now lives in the hero, the standalone `ScoreCommandPreview` section is removed from the page flow (its point-gap card folds into the hero visual), keeping the "Open my Command Center" link with it.
- `PositioningBand` ("what this is") moves out of the hero's immediate flow to sit after the loop section, so the hero ends on the product visual.

## 2. How it works / the loop

Goal: read as one cycle, not six equal features.

- Restructure from 6 equal cards into 3 primary stage cards — Practice, Score Command Center, Targeted Practice — with a return arrow from the last back to the first (a restrained curved/looping connector line, not a flowchart).
- The Score Command Center stage card holds the three diagnosis items (weak subtopics, common mistakes, question types) as small nested rows inside it, using the existing icon-badge treatment at a smaller size — they are things the Command Center surfaces, not steps.
- Section headline copy becomes "Every answer changes what comes next."; keeps the existing `SectionHeader` component and eyebrow style.
- Keeps the existing "Start the loop" link.

## 3. Every tool, one system

Goal: hierarchy instead of four equal products.

- Layout becomes a converging shape: a row of three input cards (Practice, Mistake Database, Question Type Navigator) → connector → one wider, visually dominant Score Command Center card → connector → a single "Next recommendation" summary line/card.
- Input cards use the smaller card treatment already used for supporting resources' larger variant; the Command Center card spans full width with the existing primary glow/ring treatment so it clearly reads as the center.
- Captions shrink to one short line per input card describing what it feeds in.
- Supporting resources (Topic Rundowns, FRQ Library, Exam Strategy, Formula & Strategy Guide) stay exactly as-is in the secondary grid below, under the existing "supporting resources" divider label.

## Technical notes

- All edits are confined to `src/components/SubjectHome.tsx` (Hero, HowItWorks, ScoreCommandPreview, SystemMap, and the section ordering in `SubjectHome`).
- Data still comes from `subject.score`, `subject.stats`, `subject.recommendations`, and `subject.tools` in `src/lib/subjects.ts`; no data-shape changes.
- No changes to `src/styles.css`, `SiteNav`, `SiteFooter`, or any dashboard/route code.
- Accent maps, `hover-lift`, `glass`, `bg-grid`, and existing class strings are reused verbatim.
