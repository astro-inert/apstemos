/** Decorative calculus line drawings. Purely visual; hidden from assistive tech. */
export function CalcLines({ variant = "curve", className = "" }: { variant?: "curve" | "riemann" | "field"; className?: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.1, strokeLinecap: "round" as const };
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 320 220" className={`calc-lines ${className}`}>
      {variant === "curve" && (
        <g {...common}>
          <line x1="20" y1="190" x2="305" y2="190" />
          <line x1="40" y1="205" x2="40" y2="15" />
          <path d="M40 170 C 90 165, 110 40, 170 60 S 250 170, 300 70" />
          <line x1="110" y1="128" x2="230" y2="22" strokeDasharray="3 4" />
          <circle cx="170" cy="60" r="3" />
          <line x1="170" y1="60" x2="170" y2="190" strokeDasharray="2 4" opacity=".6" />
        </g>
      )}
      {variant === "riemann" && (
        <g {...common}>
          <line x1="20" y1="190" x2="305" y2="190" />
          <path d="M30 175 C 100 170, 160 60, 300 40" />
          {[50, 90, 130, 170, 210, 250].map((x, i) => {
            const h = [16, 26, 48, 82, 108, 128][i] ?? 0;
            return <rect key={x} x={x} y={190 - h} width="40" height={h} opacity=".55" />;
          })}
        </g>
      )}
      {variant === "field" && (
        <g {...common}>
          {Array.from({ length: 7 }).flatMap((_, r) =>
            Array.from({ length: 10 }).map((__, c) => {
              const x = 25 + c * 30, y = 20 + r * 30, s = ((x - 160) / 160) * 0.9 + ((y - 110) / 110) * -0.4;
              const dx = 9 / Math.sqrt(1 + s * s), dy = s * dx;
              return <line key={`${r}-${c}`} x1={x - dx} y1={y + dy} x2={x + dx} y2={y - dy} opacity=".7" />;
            }),
          )}
        </g>
      )}
    </svg>
  );
}
