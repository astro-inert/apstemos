# AP STEM OS — editorial academic visual system

## Goal
Retune the existing product into a deliberately art-directed academic software experience. Preserve all copy, routes, features, data, interactions, and information architecture while replacing the generic rounded-card SaaS language with a confident editorial system.

## Site-wide visual language
- Make warm off-white the page canvas and white the primary reading surface.
- Set the typography hierarchy to near-black navy for headings and primary content, dark slate for body copy, medium slate for supporting information, and very faint slate only for truly tertiary metadata.
- Use one distinctive blue-violet interaction color, with pink, yellow, and pale blue reserved for small instructional/status accents.
- Remove atmospheric gradients, glow effects, heavy shadows, and broad glass treatments. Keep only quiet elevation where an overlay needs separation.
- Tighten radii and use hairline rules, whitespace, alignment, and typographic scale instead of wrapping every block in a card.
- Replace tiny uppercase tracking-heavy labels with readable sentence-case labels. Keep monospaced type for section numbers, measurements, IDs, and technical metadata.
- Retain dark mode, but tune it to the same hierarchy and restrained identity.

## Shared product shell
- Restyle the navigation as a crisp academic utility bar with clearer active states, rectangular controls, and a restrained menu surface.
- Remove decorative background effects from the app shell.
- Strengthen page titles, descriptions, and section headings; standardize a measured spacing scale and readable line lengths.
- Simplify the footer into an editorial reference index separated by rules rather than decorative styling.

## Homepage and product surfaces
- Flatten non-interactive homepage sections into open editorial compositions with rules and columns.
- Preserve cards only for the command-center preview, answer choices, actionable recommendations, and other genuinely grouped or interactive content.
- Replace pill CTAs and tags with compact squared controls, simple text links, or inline metadata where appropriate.
- Remove ornamental animation/glow treatment while retaining subtle motion that communicates state or sequence.
- Apply the same visual hierarchy to Practice, Score Command Center, Common Mistakes, and resource pages so body copy remains dark and readable throughout.

## Question Type Navigator field manual
- Recast the unit directory as a ruled academic index rather than a rounded container.
- Recast topic cards as structured reference entries with prominent numbering, stronger titles, readable summaries, and restrained interaction cues.
- Give topic guides a desktop field-manual layout: persistent section index alongside an open reading column; collapse naturally on smaller screens.
- Turn guide sections into open chapters separated by rules, not isolated rounded cards.
- Render formulas, theorem/rule notes, warnings, examples, tables, checklists, and decision trees as distinct editorial patterns with minimal radii and stronger text contrast.
- Preserve every guide word, formula, interaction, and anchor.

## Technical implementation
- Update semantic design tokens and shared utilities in `src/styles.css`; keep all colors tokenized.
- Update shared shells and primitives first, then the homepage modules, Navigator routes/renderers, and core practice/dashboard surfaces.
- Keep the existing fonts and math rendering; use display type for hierarchy, body type for reading, and mono selectively.
- Do not alter data fetching, authentication, scoring, route structure, or copy.

## Verification
- Check the homepage, Navigator index/unit/topic pages, Practice, Score Command Center, Common Mistakes, and representative resource pages at desktop and phone widths.
- Verify light and dark themes, readable contrast, no horizontal overflow, no clipped mathematical content, and no interaction regressions.
- Confirm all content-route metadata remains intact and inspect current build/runtime diagnostics before completion.
