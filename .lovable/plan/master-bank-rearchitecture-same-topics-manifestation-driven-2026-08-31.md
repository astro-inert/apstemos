# Master Bank Rearchitecture — Same Topics, Manifestation-Driven Internals

## Goal

Keep the student-facing structure exactly as it is today: 10 units, the same 59 topic names, same navigator and practice UI. Change what sits underneath: instead of "topic → template → 27 numeric variants", the bank becomes a coverage-complete taxonomy where every topic owns a full inventory of **manifestations** (materially different ways the AP can test that concept), each mapped to real CED topics — including CED material the current 59-topic list only implicitly covers.

Nothing in the CED gets skipped just because a topic name doesn't mention it. Example: "Evaluating Limits Algebraically" internally also carries limit notation, algebraic limit properties, procedure selection, indeterminate structures, parameter reasoning, and misconception-driven distractors.

## What changes for the student

- Same topic list, same navigation, same practice flow, same AB/BC switch and calculator tagging.
- Questions feel far less repetitive: graphs, tables, verbal claims, "which must be true", reverse reasoning, procedure selection, parameter conditions, error analysis — not just "compute this".
- Topic pages can show a coverage view (how many distinct manifestations exist, how many the student has seen), so progress means understanding rather than grinding lookalikes.

## Internal architecture

New taxonomy layer, keyed to the existing unit/topic slugs:

```text
unit  →  CED topic (internal)  →  user topic (displayed, unchanged)
      →  concept  →  manifestation
              ↳ representation (symbolic / graphical / tabular / verbal / contextual / mixed)
              ↳ reasoning type (21 kinds from the spec)
              ↳ algebraic structure (factoring, conjugates, identities, ...)
              ↳ misconception set → distractor rationales
              ↳ difficulty, calculator status
              ↳ generators (1..n)  →  questions
```

Each generated question carries a `structural_signature` (normalized concept → limit point/interval → structure → representation → reasoning) used for near-duplicate detection, plus the full metadata schema from the spec (`ced_topic`, `manifestation`, `misconception`, `distractor_rationale`, etc.).

## Technical work

1. **Taxonomy module** (`src/lib/ced-taxonomy.ts`): CED topic records, concept/manifestation inventories per user topic, representation/reasoning/algebra enums, misconception codes wired to the existing Common Mistakes codes.
2. **Template model rewrite**: `QuestionTemplate` gains required `manifestation`, `representation`, `reasoningType`, `algebraicStructure`, `misconceptions`, `signature`. Existing 139 templates get reclassified into the taxonomy rather than thrown away; duplicates by signature get collapsed.
3. **Generator budget by coverage, not count**: `generated-bank.ts` stops multiplying every template by a flat 27. Variants per manifestation are capped (spec §30/§31), so no manifestation is over-farmed and thin ones get filled first.
4. **Coverage engine** (`scripts/coverage-audit.ts`): produces the CED Coverage Audit — per CED topic and per manifestation: fully / partially / missing / overrepresented / duplicate-heavy. This report drives generation priority (spec §40).
5. **New manifestation generators**, written unit by unit, prioritized by audit gaps: graph-based (reuse/extend the SVG figure pipeline for f/f'/f'' graphs, slope fields, parametric and polar curves), table-based, verbal/justification, procedure-selection, reverse-reasoning, parameter-condition, error-analysis, and legitimate cross-unit spiral items with a primary CED classification.
6. **Figure support**: extend `Figure` beyond `slope-field` to graph and table renderers so graphical/tabular manifestations are first-class instead of text-only.
7. **Stress harness upgrade** (`scripts/stress-bank.ts`): keep existing checks (no equivalent choices, unique answer, answer-position balance, LaTeX validity, no obvious answers) and add signature-collision detection, manifestation-threshold checks, representation/reasoning distribution checks, and a duplicate-heavy warning. Bank ships only at `issues: 0`.
8. **Downstream wiring**: drill, unseen-only filtering, diagnostic sampling (30 items, 20 no-calculator + 10 calculator, pooled 70 minutes), and unit/topic analytics all read the new metadata; sampling additionally spreads across manifestations so a diagnostic never draws two near-identical items.

## Rollout

Phase 1: taxonomy + model rewrite + coverage audit + stress upgrade, with existing templates reclassified (no student-visible regression).
Phase 2–4: gap-driven generator build in unit batches (1–3, 4–6, 7–10 incl. BC-only 9/10), each batch ending with a clean audit + stress run.
Phase 5: topic-level coverage display in the navigator/command center.

## Originality

CED and the uploaded practice PDFs remain reference and style inputs only. All wording, functions, values, contexts, answers, distractors, and explanations stay original; no released question is reproduced or lightly reskinned.
