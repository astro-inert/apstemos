import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

/* ── Motion primitives ─────────────────────────────────────────────── */

export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 1 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
      transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.7, delay }}
    >
      {children}
    </motion.div>
  );
}

export function CountUp({
  to,
  duration = 900,
  decimals = 0,
  suffix = "",
}: {
  to: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [value, setValue] = useState(reduced ? to : 0);

  useEffect(() => {
    if (!inView || reduced) {
      if (reduced) setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, to, duration]);

  return (
    <span ref={ref} className="num">
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ── Instrument primitives ─────────────────────────────────────────── */

export function MasteryBar({ value, delay = 0 }: { value: number; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-elevated">
      <motion.div
        className="h-full rounded-full bg-primary"
        style={{ opacity: value >= 70 ? 1 : 0.72 }}
        initial={reduced ? { width: `${value}%` } : { width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ type: "spring", stiffness: 60, damping: 18, delay }}
      />
    </div>
  );
}

export function MicroLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`micro-label ${className}`}>{children}</div>;
}

export function SectionHeading({
  label,
  title,
  sub,
  align = "left",
}: {
  label?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "text-center" : ""}>
      {label ? <MicroLabel className="mb-5">{label}</MicroLabel> : null}
      <h2 className="max-w-3xl font-display text-3xl font-semibold leading-[1.06] tracking-[-0.035em] sm:text-5xl">
        {title}
      </h2>
      {sub ? (
        <p
          className={`mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {sub}
        </p>
      ) : null}
    </Reveal>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`px-5 py-20 sm:px-8 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function ExampleBadge({ live }: { live: boolean }) {
  return (
    <span className="num rounded-full border border-border bg-elevated/60 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-subtle">
      {live ? "your data" : "example preview"}
    </span>
  );
}
