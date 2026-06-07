import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "APCalcExamPrep — AP Calculus AB/BC Exam Prep (2026+)" },
      { name: "description", content: "AP Calculus AB/BC Exam Prep (2026+). Self-Study Guide, Topic Rundown, 108 Points Breakdown, and FRQs by Type." },
    ],
  }),
  component: HomePage,
});

const LATEX_PDF_URL = "https://www.overleaf.com/download/project/69da90d931d1b909a9d09491/build/19ea2640ea6-92bb352f97e666fa/output/output.pdf?compileGroup=standard&clsiserverid=clsi-pre-emp-c3d-b-f-15kq&enable_pdf_caching=true&popupDownload=true&editorId=9fff4a11-61ca-4aef-a499-3d3445bc08f6";

const features = [
  { to: "/self-study-guide", eyebrow: "Guide", title: "Self-Study Guide", desc: "Just because you're not in a class doesn't mean you have to do it all by yourself. Here's a full guide so you can get started and keep that momentum all the way until May.", color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe" },
  { to: "/topic-rundown", eyebrow: "Topics", title: "Topic Rundown", desc: "Need a quick refresher on sum-to-integral notation? This topic rundown succinctly breaks down essential concepts—from derivatives to integrals to series.", color: "#ca8a04", bg: "#fefce8", border: "#fde68a" },
  { to: "/108-points-breakdown", eyebrow: "Scoring", title: "108 Points Breakdown", desc: "Maximize your score by leveraging exam focus and scoring guidelines.", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
  { to: "/frqs-by-type", eyebrow: "FRQs", title: "FRQs by Type", desc: "Know exactly what you'll see in May, including possible variations for each question type, for both AB and BC.", color: "#7e22ce", bg: "#faf5ff", border: "#e9d5ff" },
  { href: LATEX_PDF_URL, eyebrow: "Cram", title: "Master Sheet", desc: "Save this 10-page LaTeX-formatted comprehensive, topic-organized sheet to review all the important formulas you need a week before your exam.", color: "#ea580c", bg: "#fff7ed", border: "#fed7aa", external: true },
  { to: "/exam-strategy", eyebrow: "Strategy", title: "Exam Strategy", desc: "You don't need to be 100% on all concepts—know exactly how to optimize your execution on exam day.", color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
] as const;

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <div className="px-6 pt-12 pb-16">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Hero banner */}
          <section className="rounded-2xl overflow-hidden bg-gradient-to-b from-[#1a2a5e] via-[#142048] to-[#0f1a3a] px-6 py-16 sm:py-20 text-center">
            <div className="max-w-3xl mx-auto space-y-5">
              <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
                Free Exam Prep — 2026+
              </div>
              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                AP Calculus AB/BC Exam Prep
              </h1>
              <p className="text-sm sm:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
                Abandon your Princeton Review book. This site is all you need for a 5 on your AP Calc exam this year.
              </p>
            </div>
          </section>


          {/* Feature cards */}
          <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => {
              const inner = (
                <>
                  <div
                    className="text-[11px] font-bold uppercase tracking-[0.18em] mb-2"
                    style={{ color: f.color }}
                  >
                    {f.eyebrow}
                  </div>
                  <h2 className="font-display text-lg font-semibold" style={{ color: f.color }}>
                    {f.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{f.desc}</p>
                </>
              );
              const cls = "block p-6 rounded-lg border transition-transform hover:-translate-y-0.5";
              const style = { backgroundColor: f.bg, borderColor: f.border };
              if ("href" in f) {
                return (
                  <a key={f.href} href={f.href} target="_blank" rel="noopener noreferrer" download className={cls} style={style}>
                    {inner}
                  </a>
                );
              }
              return (
                <Link key={f.to} to={f.to} className={cls} style={style}>
                  {inner}
                </Link>
              );
            })}
          </section>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
