import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import heroStudent from "@/assets/hero-student.jpg";
import { BookOpen, Layers, Target, FileText, ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "APCalcExamPrep — AP Calculus AB & BC Exam Prep" },
      { name: "description", content: "Master the AP Calculus AB & BC exam with curated study guides, topic rundowns, the 108 points breakdown, and FRQs by type." },
    ],
  }),
  component: HomePage,
});

const features = [
  { to: "/self-study-guide", num: "01", title: "Self-Study Guide", desc: "A step-by-step roadmap to mastery, from limits to series.", color: "secondary", Icon: BookOpen },
  { to: "/topic-rundown", num: "02", title: "Topic Rundown", desc: "Concise cheat sheets for every unit in the College Board CED.", color: "primary", Icon: Layers },
  { to: "/108-points-breakdown", num: "03", title: "108 Points Breakdown", desc: "The ultimate guide to how to maximize your raw exam score.", color: "accent", Icon: Target },
  { to: "/frqs-by-type", num: "04", title: "FRQs by Type", desc: "Master the six types of free response questions you'll see.", color: "secondary", Icon: FileText },
] as const;

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/30">
      <SiteNav />

      {/* Hero */}
      <section className="relative px-6 pt-16 pb-28 overflow-hidden math-grid">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8 animate-bounce-in">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 text-foreground text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Built for the 2026 Exam
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-[0.9] text-balance">
              Master the{" "}
              <span className="text-primary relative inline-block">
                ∫integral
                <span className="absolute -bottom-2 left-0 w-full h-2 bg-accent/50 -z-10 rounded-full" />
              </span>{" "}
              of success.
            </h1>
            <p className="text-xl text-muted-foreground max-w-[50ch] text-pretty leading-relaxed font-medium">
              Everything you need for the AP Calculus AB &amp; BC exam, curated by top scorers. No fluff — just the derivative of your potential.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/self-study-guide" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl shadow-brand hover:-translate-y-0.5 transition-all text-lg">
                Start Studying <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/topic-rundown" className="px-8 py-4 bg-card ring-2 ring-border text-foreground font-bold rounded-2xl hover:bg-muted transition-all text-lg">
                Browse Topics
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full max-w-xl animate-bounce-in [animation-delay:150ms]">
            <div className="relative bg-card p-6 rounded-[2rem] shadow-soft ring-1 ring-black/5">
              <img
                src={heroStudent}
                alt="Student studying for AP Calculus"
                width={1200}
                height={900}
                className="w-full aspect-[4/3] object-cover rounded-2xl"
              />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent rounded-full grid place-items-center shadow-brand transform rotate-12">
                <span className="text-accent-foreground font-extrabold text-center leading-tight font-display">
                  SCORE<br />A 5
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-24 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tight">Everything inside.</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Four focused resources designed around how the AP Calculus exam is actually scored.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => {
              const colorMap = {
                primary: "border-primary/20 hover:border-primary bg-primary/10 text-primary",
                secondary: "border-secondary/20 hover:border-secondary bg-secondary/10 text-secondary",
                accent: "border-accent/30 hover:border-accent bg-accent/20 text-foreground",
              };
              const [borderCls, iconBg] = colorMap[f.color].split(" hover:");
              const cls = colorMap[f.color];
              return (
                <Link
                  key={f.to}
                  to={f.to}
                  className={`group p-8 bg-background rounded-[2rem] border-b-4 transition-all space-y-4 ${cls.split(" ").slice(0, 2).join(" ")}`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold ${cls.split(" ").slice(2).join(" ")}`}>
                    <f.Icon className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-bold tracking-widest text-muted-foreground">{f.num}</div>
                  <h3 className="font-display text-2xl font-bold">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                  <div className="inline-flex items-center gap-1 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto bg-secondary rounded-[3rem] overflow-hidden text-secondary-foreground flex flex-col md:flex-row">
          <div className="flex-1 p-12 lg:p-16 border-b md:border-b-0 md:border-r border-white/10">
            <span className="uppercase tracking-widest text-white/60 font-bold text-xs mb-4 block">Track One</span>
            <h2 className="font-display text-5xl font-extrabold mb-6">Calculus AB</h2>
            <p className="text-white/80 text-lg mb-8">A solid foundation in differential and integral calculus — equivalent to a first-semester college course.</p>
            <ul className="space-y-3 mb-12 text-white/80">
              <li>✓ Limits &amp; Continuity</li>
              <li>✓ Derivatives &amp; Applications</li>
              <li>✓ Integrals &amp; the Fundamental Theorem</li>
            </ul>
            <Link to="/ab-track" className="block w-full text-center py-4 bg-card text-secondary font-bold rounded-2xl hover:bg-accent hover:text-accent-foreground transition-colors">
              Explore AB Track
            </Link>
          </div>
          <div className="flex-1 p-12 lg:p-16 bg-white/5">
            <span className="uppercase tracking-widest text-white/60 font-bold text-xs mb-4 block">Track Two</span>
            <h2 className="font-display text-5xl font-extrabold mb-6">Calculus BC</h2>
            <p className="text-white/80 text-lg mb-8">Everything in AB plus parametric, polar, vector functions, and infinite series.</p>
            <ul className="space-y-3 mb-12 text-white/80">
              <li>✓ All AB Topics Included</li>
              <li>✓ Sequences &amp; Series</li>
              <li>✓ Advanced Integration Techniques</li>
            </ul>
            <Link to="/bc-track" className="block w-full text-center py-4 bg-primary text-primary-foreground font-bold rounded-2xl shadow-brand hover:scale-[1.02] transition-transform">
              Explore BC Track
            </Link>
          </div>
        </div>
      </section>

      {/* 108 Points teaser */}
      <section className="px-6 py-24 math-grid">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tight">Cracking the 108 Points</h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              The AP Exam is graded out of 108 raw points. Do you know what it takes to get a 5? We show you exactly where to aim.
            </p>
          </div>
          <div className="relative inline-block">
            <div className="size-64 rounded-full border-[16px] border-primary/20 flex items-center justify-center">
              <div className="text-center">
                <div className="font-display text-7xl font-extrabold text-primary">72+</div>
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-1">Score for a 5</div>
              </div>
            </div>
            <div className="absolute -right-6 sm:-right-12 top-4 p-4 bg-card rounded-2xl shadow-soft border border-border max-w-[180px] text-left animate-bounce-in">
              <span className="text-xs font-extrabold text-primary uppercase tracking-wide">Pro Tip</span>
              <p className="text-sm font-medium mt-1">Don't skip the slope fields — they're easy points.</p>
            </div>
          </div>
          <Link to="/108-points-breakdown" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl shadow-brand hover:-translate-y-0.5 transition-all">
            See the Full Breakdown <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
