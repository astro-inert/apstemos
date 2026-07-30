import type { Figure } from "@/lib/question-templates";

/**
 * Renders an actual slope field for dy/dx = a·x + b·y: a grid of short segments
 * whose inclination is the slope of the solution curve through that point.
 */
export function SlopeField({ figure, size = 260 }: { figure: Figure; size?: number }) {
  const { a, b, extent } = figure;
  const pad = 16;
  const inner = size - pad * 2;
  const step = inner / (2 * extent);
  const segLength = step * 0.72;

  const toPx = (x: number, y: number) => ({
    px: pad + (x + extent) * step,
    py: pad + (extent - y) * step,
  });

  const segments: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let x = -extent; x <= extent; x++) {
    for (let y = -extent; y <= extent; y++) {
      const slope = a * x + b * y;
      const angle = Math.atan(slope);
      const dx = (Math.cos(angle) * segLength) / 2;
      const dy = (Math.sin(angle) * segLength) / 2;
      const { px, py } = toPx(x, y);
      segments.push({ x1: px - dx, y1: py + dy, x2: px + dx, y2: py - dy });
    }
  }

  const origin = toPx(0, 0);

  return (
    <figure className="my-3 inline-block rounded-lg border border-border bg-elevated/30 p-2">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={`Slope field for dy/dx = ${a}x ${b < 0 ? "-" : "+"} ${Math.abs(b)}y`}
      >
        {/* grid */}
        {Array.from({ length: 2 * extent + 1 }, (_, i) => {
          const p = pad + i * step;
          return (
            <g key={`g${i}`} className="text-border">
              <line x1={p} y1={pad} x2={p} y2={size - pad} stroke="currentColor" strokeWidth={0.5} opacity={0.5} />
              <line x1={pad} y1={p} x2={size - pad} y2={p} stroke="currentColor" strokeWidth={0.5} opacity={0.5} />
            </g>
          );
        })}
        {/* axes */}
        <g className="text-muted-foreground">
          <line x1={pad} y1={origin.py} x2={size - pad} y2={origin.py} stroke="currentColor" strokeWidth={1} />
          <line x1={origin.px} y1={pad} x2={origin.px} y2={size - pad} stroke="currentColor" strokeWidth={1} />
        </g>
        {/* slope segments */}
        <g className="text-primary">
          {segments.map((s, i) => (
            <line
              key={i}
              x1={s.x1}
              y1={s.y1}
              x2={s.x2}
              y2={s.y2}
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
            />
          ))}
        </g>
      </svg>
      <figcaption className="mt-1 text-center font-mono text-[10px] text-muted-foreground">
        x, y ∈ [−{extent}, {extent}]
      </figcaption>
    </figure>
  );
}
