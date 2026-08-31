/**
 * Back-compatible entry point: every practice / diagnostic / answer-log call
 * site imports `SlopeField`, while the actual renderers live in
 * `src/components/figures/QuestionFigure.tsx` and cover graphs, tables,
 * parametric and polar curves, Riemann overlays, and slope fields.
 */
export { QuestionFigure as SlopeField, QuestionFigure } from "./figures/QuestionFigure";
