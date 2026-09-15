# AP STEM OS accuracy, filtering, navigation, and mobile pass

## Goal
Fix the mobile layout problems, make AB/BC selection control the real Practice and Score Command Center data, restore distinct Physics blues, make subject-home navigation stay within the active subject, and replace the Calculus homepage wording without changing its section order or visual structure.

## 1. Mobile containment and navigation
- Rework the shared top bar’s 640–767px behavior so the subject label, Practice action, theme control, and menu never compete for the same row.
- Keep the subject label width-constrained until the full desktop navigation has room; hide or relocate the Practice action at the intermediate breakpoint instead of overlapping “AP Calculus BC.”
- Clamp the subject menu to the available viewport rather than letting a left-anchored wide menu extend off-screen.
- Fix the homepage Score Command Center preview with `min-width: 0`, wrapping/truncation only where semantically appropriate, and locally scrollable wide math—not page-level clipping.
- Audit every homepage section at narrow phone, standard phone, the reported 759px width, tablet, and desktop widths. Correct overflowing grids, long labels, buttons, math, and flex rows naturally.

## 2. Real AB/BC filtering
### Practice
- Add an explicit AB/BC control to Practice, initialized from the saved account track and persisted when changed.
- Make track part of the Practice query identity so switching immediately loads the correct unseen bank.
- Continue excluding BC-only units/topics/questions for AB, while BC includes shared AB material plus BC-only material.
- Make the unit/topic options track-aware so AB never offers Units 9–10 or BC-only topics.
- Add the difficulty filter promised by the supplied homepage copy, using the bank’s existing easy/medium/hard classification.
- Preserve no-repeat behavior within the selected filters and show the active track in the remaining-question summary.

### Score Command Center
- Filter the performance snapshot by the saved track instead of always aggregating every attempt and all ten BC units.
- For AB, show Units 1–8 and exclude attempts tied to BC-only questions/topics; for BC, show the full BC course.
- Recompute attempt totals, accuracy, topic strengths/weaknesses, untouched units, unit mastery, recommendations, top mistakes, and homepage live data from the active track only.
- Make the Answer Log track-aware so switching AB/BC changes the visible history consistently.
- Keep score prediction gated by the timed diagnostic and ensure its displayed result belongs to the selected track; never infer a prediction from ordinary practice.
- Invalidate and refresh all dependent views after a track change so Practice, Command Center, and homepage data cannot disagree.

## 3. Homepage truthfulness and supplied copy
- Preserve the current homepage section order, responsive composition, interactions, and component structure. Do not add standalone Answer Log, feedback-loop, toolkit, or “two sides” sections.
- Replace the Calculus homepage wording with the supplied language, distributing it into the closest existing sections:
  - Hero: the supplied “Practice. Find the gaps. Fix them.” positioning, actions, and proof line.
  - Workflow: the supplied Practice → Measure → Diagnose → Learn → Target → Repeat sequence, expanded to six steps inside the existing workflow area.
  - Interactive question area: the supplied Practice positioning and filtering/explanation promises.
  - Score Command Center preview: the supplied unit mastery, topic strengths/weaknesses, recommendations, and action-oriented explanation.
  - Mistakes area: Answer Log → find/tag mistake, Common Mistakes guidance, AI-added personal mistakes, and the complete feedback-loop narrative within the existing two-part composition.
  - Navigator: explain that it follows the same unit/topic organization as Practice and teaches recognition, approach, traps, justification, and communication for MCQs and FRQs. Remove vague claims about “exact question types” where the current guides are broader instructional field manuals.
  - Resources: the supplied FRQ Library, Topic Rundowns, Formula & Strategy Guide, and Exam Strategy descriptions.
  - Existing synthesis/pillars area: the supplied feedback-loop versus AP-toolkit distinction.
  - Final action: the supplied “Don’t let practice end at correct or incorrect” close.
- Use the user’s requested APSTEMOS wording consistently while retaining the visible AP STEM OS brand in shared navigation.
- Verify the live generated-bank count before publishing “2,000+”; use only a defensible rounded claim supported by the current deduplicated bank.
- Replace illustrative Calculus topics with names/slugs that actually exist in the current Navigator and question bank. For signed-in users, continue using their real filtered data.
- Do not present Physics or Statistics tools as live while their content remains gated as coming soon.

## 4. Subject identity and subject-home navigation
- Add four token-based Physics identities in light and dark themes, using the chosen light-to-deep progression:
  - Physics 1: light sky blue
  - Physics 2: clear azure
  - Physics C: Mechanics: stronger royal blue
  - Physics C: Electricity & Magnetism: deep cobalt
- Keep all colors within the existing semantic token system so contrast, controls, charts, and dark mode remain coherent.
- Make the AP STEM OS wordmark link to the current subject’s home path. Statistics returns to Statistics; each Physics course returns to its own course home; Calculus returns to `/`.
- Preserve subject persistence on shared pages so returning through the wordmark or shared tools does not silently reset the user to Calculus.

## 5. Verification
- Exercise AB and BC end to end: switch tracks in Practice and Command Center, confirm available units/topics/questions, submit attempts, and verify summaries and Answer Log stay isolated correctly.
- Verify track persistence after navigation and reload.
- Test the homepage and top bar at 320px, 390px, 759px, 768px, tablet, and desktop widths for horizontal overflow and control collisions.
- Test all six subject homes in light and dark modes, including AP STEM OS wordmark destinations and the four Physics blue identities.
- Confirm all homepage calls to action lead to existing working routes and all visible claims match implemented functionality.
- Run focused tests, type checking, and the preview build; resolve any current build errors before completion.

## Technical notes
- Extend the existing generated-bank filter contract with difficulty rather than creating a second filtering path.
- Determine an attempt’s AB/BC eligibility from its generated question key/taxonomy, with a safe policy for legacy rows, so historical data is not deleted.
- Keep shared AB questions visible in both tracks while excluding BC-only evidence from AB summaries.
- Do not edit generated route files or change routes, database roles, unrelated MCP work, or the homepage’s information architecture.
