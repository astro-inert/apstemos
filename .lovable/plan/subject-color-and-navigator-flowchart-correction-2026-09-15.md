# Subject color and Navigator flowchart correction

## Build
- Restore subject-scoped semantic accents: AP Calculus uses pink/red; AP Statistics uses yellow with purple for contrast and interactive emphasis. Keep the editorial warm-paper system and all other subjects unchanged.
- Harden shared content surfaces and Navigator blocks with shrinkable grid/flex children, bounded widths, wrapping, and horizontal scrolling only for wide math or tables so no card causes page-level mobile overflow.
- Replace the current linear decision-path presentation with a true branching flowchart: visible connected nodes and branches, clear start/decision/outcome states, and selectable branches that remain keyboard accessible and interactive.
- Audit every “Strategy Flowchart” label against its underlying tree content. Keep the label only where the genuine flowchart renders; do not use it for plain prose or lists.

## Verify
- Check Calculus and Statistics pages in light and dark themes.
- Test Navigator flowcharts by mouse and keyboard, including reset behavior.
- Test representative pages at 430px and desktop widths for page-level overflow and content clipping.
- Confirm the preview compiles without errors.
