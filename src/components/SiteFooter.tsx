import { Link } from "@tanstack/react-router";

const columns: { label: string; links: { to: string; label: string }[] }[] = [
  {
    label: "the system",
    links: [
      { to: "/practice", label: "Practice" },
      { to: "/command-center", label: "Score Command Center" },
      { to: "/common-mistakes", label: "Common Mistakes" },
      { to: "/question-navigator", label: "Question Type Navigator" },
    ],
  },
  {
    label: "resources",
    links: [
      { to: "/frqs-by-type", label: "FRQ Library" },
      { to: "/topic-rundown", label: "Topic Rundowns" },
      { to: "/latex-master-sheet", label: "Formula & Strategy Guide" },
      { to: "/exam-strategy", label: "Exam Strategy" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-5 py-14 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-[minmax(0,1.2fr)_repeat(2,minmax(0,1fr))]">
        <div>
          <Link to="/" className="font-display text-[15px] font-semibold tracking-[-0.02em]">
            AP STEM OS
          </Link>
          <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-muted-foreground">
            A score-optimization platform for AP Calculus AB/BC, AP Physics 1, 2, C: Mechanics and C: E&amp;M, and AP
            Statistics.
          </p>
          <p className="num mt-6 text-[11px] uppercase tracking-[0.18em] text-subtle">Free forever.</p>
        </div>
        {columns.map((c) => (
          <div key={c.label}>
            <div className="micro-label">{c.label}</div>
            <ul className="mt-4 space-y-2.5">
              {c.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-[13px] text-muted-foreground transition-colors hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t border-border pt-6">
        <p className="num text-[11px] text-subtle">© 2026 AP STEM OS · Not affiliated with College Board</p>
      </div>
    </footer>
  );
}
