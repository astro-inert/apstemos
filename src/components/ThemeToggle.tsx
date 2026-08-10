import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

function getInitial(): "dark" | "light" {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = getInitial();
    setTheme(t);
    setMounted(true);
    document.documentElement.classList.toggle("dark", t === "dark");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-card/50 transition-colors hover:bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      {/* Icon only after hydration so SSR and client markup match. */}
      <span className="grid h-4 w-4 place-items-center">
        {mounted ? theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" /> : null}
      </span>
    </button>
  );
}
