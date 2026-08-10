import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { getPerformanceSnapshot } from "@/lib/performance.functions";
import { getScoreEstimate } from "@/lib/prediction.functions";
import { HOME_DEMO, type DemoMove, type DemoSubtopic } from "@/lib/home-demo";
import type { SubjectConfig } from "@/lib/subjects";

export interface InstrumentData {
  /** true when these numbers come from the signed-in user's own attempts */
  live: boolean;
  /** null when the user has too little evidence for an honest MCQ-based estimate */
  predicted: number | null;
  subtopics: DemoSubtopic[];
  moves: DemoMove[];
  units: { label: string; name: string; mastery: number }[];
}

function useSignedIn() {
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => setSignedIn(!!session));
    return () => sub.subscription.unsubscribe();
  }, []);
  return signedIn;
}

/**
 * Homepage instrument data. Renders the illustrative example preview by default —
 * including during SSR — and swaps to the signed-in user's real mastery once they
 * have logged attempts.
 */
export function useHomeInstrument(subject: SubjectConfig): InstrumentData {
  const demo = HOME_DEMO[subject.id];
  const signedIn = useSignedIn();
  const snapshotFn = useServerFn(getPerformanceSnapshot);
  const estimateFn = useServerFn(getScoreEstimate);

  const { data } = useQuery({
    queryKey: ["home-instrument", subject.id],
    queryFn: () => snapshotFn(),
    enabled: signedIn && subject.id === "calc-bc",
    retry: false,
    staleTime: 60_000,
  });

  const { data: estimate } = useQuery({
    queryKey: ["score-estimate"],
    queryFn: () => estimateFn(),
    enabled: signedIn && subject.id === "calc-bc",
    retry: false,
    staleTime: 60_000,
  });

  const fallback: InstrumentData = {
    live: false,
    predicted: demo.predicted,
    subtopics: demo.subtopics,
    moves: demo.moves,
    units: subject.units.map((u, i) => ({
      label: `Unit ${u.number}`,
      name: u.name,
      mastery: demo.unitMastery[i] ?? demo.unitMastery[demo.unitMastery.length - 1] ?? 60,
    })),
  };

  if (!data || data.attempts_count === 0) return fallback;

  const ranked = [...data.subtopics].sort((a, b) => b.accuracy - a.accuracy);
  const subtopics: DemoSubtopic[] = ranked
    .slice(0, 5)
    .map((s) => ({ name: s.topic_title, mastery: Math.round(s.accuracy) }));

  const weakest = [...data.subtopics].sort((a, b) => a.accuracy - b.accuracy).slice(0, 3);
  const moves: DemoMove[] = weakest.length
    ? weakest.map((s, i) => ({
        name: s.topic_title,
        mastery: Math.round(s.accuracy),
        action: s.unlocked
          ? i === 0
            ? "Review Question Type Navigator"
            : "Complete targeted practice"
          : "Complete more questions",
        cta: i === 1 ? "Review" : "Practice",
      }))
    : demo.moves;

  const units = data.unit_mastery.length
    ? data.unit_mastery.map((u) => ({
        label: `Unit ${u.number}`,
        name: u.name,
        mastery: u.mastery < 0 ? 0 : Math.round(u.mastery),
      }))
    : fallback.units;

  return {
    live: true,
    predicted: estimate?.estimated_score ?? null,
    subtopics: subtopics.length ? subtopics : demo.subtopics,
    moves,
    units,
  };
}
