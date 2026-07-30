import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { SUBJECTS, type SubjectId } from "./subjects";

export const SUBJECT_STORAGE_KEY = "ap-os:subject";

function subjectIdForPath(pathname: string): SubjectId | null {
  const match = (Object.values(SUBJECTS) as (typeof SUBJECTS)[SubjectId][]).find(
    (s) => s.path === pathname,
  );
  return match ? match.id : null;
}

/**
 * Resolves the active subject: from the current pathname when it matches a
 * subject's home page, otherwise from localStorage, defaulting to calc-bc.
 * SSR-safe: localStorage is only read in an effect, never during render.
 */
export function useCurrentSubject(): SubjectId {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const fromPath = subjectIdForPath(pathname);
  const [stored, setStored] = useState<SubjectId>("calc-bc");

  useEffect(() => {
    if (fromPath) return;
    const raw = window.localStorage.getItem(SUBJECT_STORAGE_KEY) as SubjectId | null;
    if (raw && SUBJECTS[raw]) setStored(raw);
  }, [fromPath]);

  return fromPath ?? stored;
}

export function persistCurrentSubject(id: SubjectId) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SUBJECT_STORAGE_KEY, id);
}
