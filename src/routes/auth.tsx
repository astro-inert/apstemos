import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Sigma } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [{ title: "Sign in — AP STEM OS" }],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/command-center" });
    });
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/command-center` },
        });
        if (error) throw error;
        toast.success("Check your email to confirm your account.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/command-center" });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/command-center`,
    });
    if (result.error) {
      toast.error("Google sign-in failed");
      setLoading(false);
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/command-center" });
  }

  return (
    <div className="min-h-screen bg-background text-foreground grid lg:grid-cols-2">
      {/* Left — brand */}
      <div className="relative hidden flex-col justify-between overflow-hidden border-r border-border bg-card p-12 lg:flex">
        <div className="pointer-events-none absolute inset-0 atmosphere opacity-70" />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <Link to="/" className="relative flex items-center gap-2 font-display text-[15px] font-semibold tracking-[-0.02em]">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Sigma className="h-4 w-4" strokeWidth={2.5} />
          </span>
          <span>AP STEM<span className="text-muted-foreground font-medium">/OS</span></span>
        </Link>
        <div className="relative space-y-6 max-w-md">
          <div className="micro-label">the operating system for a 5</div>
          <h1 className="font-display text-4xl font-semibold leading-[1.06] tracking-[-0.035em]">
            Diagnose. Drill. <span className="text-primary">Score a 5.</span>
          </h1>
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            Track every point you lose. See your predicted AP score update in real time. Know exactly what to study next.
          </p>
          <div className="grid grid-cols-3 gap-3 pt-6">
            {[
              { label: "Tracked exam points", value: "108" },
              { label: "Common point-losses", value: "22+" },
              { label: "BC units modeled", value: "10/10" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-background/50 p-4">
                <div className="num font-display text-xl font-semibold">{s.value}</div>
                <div className="micro-label mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="num relative text-[11px] text-subtle">© {new Date().getFullYear()} AP STEM OS</div>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-8 inline-flex items-center gap-2 font-display text-[15px] font-semibold tracking-[-0.02em] lg:hidden">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Sigma className="h-4 w-4" strokeWidth={2.5} />
            </span>
            <span>AP STEM<span className="font-medium text-muted-foreground">/OS</span></span>
          </Link>
          <h2 className="font-display text-2xl font-semibold tracking-[-0.03em]">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h2>
          <p className="mt-2 text-[14px] text-muted-foreground">
            {mode === "signin" ? "Pick up where you left off." : "Free. No credit card. Tracks your progress to exam day."}
          </p>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-[14px] font-semibold transition-colors hover:border-primary/40 disabled:opacity-50"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="micro-label">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="micro-label">Email</label>
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-full border border-border bg-card px-4 py-2.5 text-[14px] outline-none transition-colors focus:border-primary/50"
                placeholder="you@school.edu"
              />
            </div>
            <div>
              <label className="micro-label">Password</label>
              <input
                type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-full border border-border bg-card px-4 py-2.5 text-[14px] outline-none transition-colors focus:border-primary/50"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit" disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-[14px] font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {mode === "signin" ? "Sign in" : "Create account"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-[13px] text-muted-foreground">
            {mode === "signin" ? "New here? " : "Already have an account? "}
            <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="text-foreground font-medium hover:underline">
              {mode === "signin" ? "Create an account" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
