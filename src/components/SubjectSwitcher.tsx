import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Check, ChevronDown } from "lucide-react";
import {
  PHYSICS_STORAGE_KEY,
  SUBJECTS,
  SUBJECT_MENU,
  type SubjectId,
} from "@/lib/subjects";
import { persistCurrentSubject } from "@/lib/use-subject";

interface Props {
  current: SubjectId;
}

const PHYSICS_IDS: SubjectId[] = ["physics-1", "physics-2", "physics-c-mech", "physics-c-em"];

export function SubjectSwitcher({ current }: Props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [physicsOpen, setPhysicsOpen] = useState(PHYSICS_IDS.includes(current));
  const [lastPhysics, setLastPhysics] = useState<SubjectId>("physics-1");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(PHYSICS_STORAGE_KEY) as SubjectId | null;
    if (stored && PHYSICS_IDS.includes(stored)) setLastPhysics(stored);
  }, []);

  useEffect(() => {
    if (PHYSICS_IDS.includes(current)) {
      setLastPhysics(current);
      window.localStorage.setItem(PHYSICS_STORAGE_KEY, current);
    }
    persistCurrentSubject(current);
  }, [current]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (id: SubjectId) => {
    setOpen(false);
    navigate({ to: SUBJECTS[id].path });
  };

  const active = SUBJECTS[current];
  const ActiveIcon = active.icon;

  return (
    <div className="relative shrink-0" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 font-display text-base font-bold tracking-tight hover:bg-elevated transition-colors"
      >
        <span className="grid place-items-center h-7 w-7 rounded-md bg-primary text-primary-foreground transition-colors">
          <ActiveIcon className="h-4 w-4" strokeWidth={2.5} />
        </span>
        <span className="truncate max-w-[9.5rem] sm:max-w-none">{active.navLabel}</span>
        <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full mt-2 w-[min(92vw,20rem)] glass rounded-xl shadow-elevated p-1.5 origin-top-left animate-bounce-in z-50"
        >
          {SUBJECT_MENU.map((group) => {
            const GroupIcon = group.icon;
            if (group.subjectId) {
              const id = group.subjectId;
              return (
                <button
                  key={group.id}
                  role="menuitem"
                  onClick={() => go(id)}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-elevated transition-colors"
                >
                  <GroupIcon className="h-4 w-4 shrink-0" />
                  <span className="flex-1 text-left">{group.label}</span>
                  {current === id && <Check className="h-4 w-4 text-primary" />}
                </button>
              );
            }
            const children = group.children ?? [];
            const groupActive = children.some((c) => c.subjectId === current);
            return (
              <div key={group.id}>
                <div className="w-full flex items-center rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-elevated transition-colors">
                  <button
                    role="menuitem"
                    onClick={() => go(groupActive ? current : lastPhysics)}
                    className="flex-1 flex items-center gap-2.5 px-3 py-2.5 text-left"
                  >
                    <GroupIcon className="h-4 w-4 shrink-0" />
                    <span className="flex-1">{group.label}</span>
                  </button>
                  <button
                    aria-label={physicsOpen ? "Collapse courses" : "Expand courses"}
                    aria-expanded={physicsOpen}
                    onClick={() => setPhysicsOpen((v) => !v)}
                    className="px-3 py-2.5"
                  >
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${physicsOpen ? "rotate-180" : ""}`} />
                  </button>
                </div>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: physicsOpen ? "1fr" : "0fr", opacity: physicsOpen ? 1 : 0 }}
                >
                  <div className="overflow-hidden">
                    <div className="ml-4 pl-2 border-l border-border my-1 flex flex-col">
                      {children.map((child) => {
                        const sub = SUBJECTS[child.subjectId];
                        return (
                          <div key={child.subjectId}>
                            {child.dividerBefore && <div className="my-1.5 border-t border-border" />}
                            <button
                              role="menuitem"
                              onClick={() => go(child.subjectId)}
                              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-elevated transition-colors"
                            >
                              <span className="w-4 shrink-0">
                                {current === child.subjectId && <Check className="h-3.5 w-3.5 text-primary" />}
                              </span>
                              <span className="flex-1 text-left">{sub.label.replace(/^Physics C: /, "Physics C: ")}</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
