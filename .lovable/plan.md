# Native Unit 1 Question Type Navigator Pages

## Goal
Replace the placeholder content inside six existing Unit 1 topic pages with complete, responsive, web-native versions of the supplied Navigator PDFs. The pages remain inside the current Question Type Navigator hierarchy and use the existing topic-card links.

## Exact PDF-to-topic mapping
- `Evaluating Limits Algebraically` → `evaluating-limits-algebraically`
- `Limits from Graphs and Tables` → `limits-from-graphs-and-tables`
- `Squeeze Theorem` → `squeeze-theorem`
- `Continuity & Discontinuity Types` → `continuity-and-discontinuity`
- `Intermediate Value Theorem` → `intermediate-value-theorem`
- `Limits at Infinity` → `limits-at-infinity`

No topic names, slugs, parent units, or routes will change.

## Build
1. Add a typed Unit 1 Navigator content registry keyed by the six existing topic slugs. Encode every substantive source element: core ideas, theorem statements, recognition rules, prompt-signal tables, strategy branches, classifications/cases, worked examples, execution guidance, traps, representation translations, cross-topic connections, quick-reference rules, and verification checklists.
2. Add focused native renderers for those structures:
   - responsive comparison and recognition tables;
   - interactive decision trees with selectable branches and visible outcomes;
   - theorem/rule callouts;
   - numbered worked solutions with KaTeX-rendered expressions;
   - mistake and execution guidance panels;
   - accessible checklists that students can tick locally;
   - compact page navigation for moving among the page’s sections.
3. Replace the topic-page placeholder cards with the matching registry content while retaining the current dynamic topic route and Unit 1 topic cards. Topics without supplied content retain their current fallback state.
4. Keep the topic name as the sole main title. Omit PDF mastheads, document-title blocks, CED Alignment sections/metadata, page numbers, “review this page” document language, and the three-part descriptor directly beneath each topic name.
5. Preserve all substantive mathematical and instructional content from the PDFs without embedding, linking, or presenting the PDFs as downloads. Keep MCQ and FRQ guidance together on each topic page rather than creating additional routes.
6. Use the existing semantic colors, typography, spacing, dark mode, motion conventions, and KaTeX renderer. Tables and formulas will scroll safely on narrow screens; interactive controls will be keyboard accessible.

## Source-content fidelity
- Preserve the source hierarchy and exact instructional logic, including all theorem hypotheses and conclusions.
- Preserve worked-example values, equations, intermediate steps, conclusions, classifications, and caveats.
- Preserve distinctions such as limit versus point value, existence versus uniqueness, finite-table evidence versus proof, endpoint one-sided continuity, and `√(x²)=|x|` sign handling.
- Convert flowchart layout into real HTML controls/branches rather than screenshots.
- Do not add new taxonomy or inferred instructional claims.

## Verification
- Confirm every supplied PDF maps to its correct existing topic card and route.
- Audit page content against each PDF section-by-section for omissions.
- Check all formulas, tables, and examples render correctly.
- Test interaction and navigation by keyboard.
- Check representative phone and desktop layouts for clipping, overflow, and overlap.
- Confirm route metadata remains unique and complete.
- Run the focused typecheck/tests and inspect the current preview diagnostics before completion.
