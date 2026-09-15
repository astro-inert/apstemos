import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { QN_UNITS } from "./question-navigator-data";

/** A unit needs this many logged questions before its accuracy is treated as established. */
export const UNIT_MASTERY_THRESHOLD = 10;
/** A subtopic needs this many logged questions before it counts as a strength/weakness. */
export const SUBTOPIC_THRESHOLD = 3;
/** Accuracy at or above this counts as a strength; below it, a weakness. Never both. */
export const STRENGTH_CUTOFF = 70;

export type PerformanceSnapshot = {
  profile: {
    display_name: string | null;
    track: "AB" | "BC";
    target_score: number;
    exam_date: string;
  } | null;
  attempts_count: number;
  /** Ordinary question-bank accuracy: correct attempts / attempts. */
  accuracy: number; // 0-1
  points_earned: number;
  points_possible: number;
  /** Unit-weighted demonstrated practice performance on the 108-point map. NOT a score prediction. */
  mastery_points: number;
  mastery_points_possible: number;
  unit_mastery: Array<{
    unit_id: string;
    number: number;
    name: string;
    ap_weight_pct: number;
    ap_points: number;
    /** Ordinary MCQ accuracy for attempts in this unit; -1 if untouched. */
    mastery: number; // 0-100, or -1 if no data
    attempts: number;
    correct: number;
    /** how many of the unit's subtopics have at least one logged question */
    subtopics_covered: number;
    subtopics_total: number;
    coverage: number; // 0-1
    /** true once there is enough volume and every subtopic has at least one attempt */
    mastery_unlocked: boolean;
  }>;

  subtopics: Array<{
    unit_slug: string;
    unit_number: number;
    topic_slug: string;
    topic_title: string;
    accuracy: number; // 0-100
    attempts: number;
    correct: number;
    /** true once attempts >= SUBTOPIC_THRESHOLD */
    unlocked: boolean;
  }>;
  untouched_units: Array<{
    unit_id: string;
    number: number;
    name: string;
    ap_points: number;
    ap_weight_pct: number;
  }>;
  /** Ranked by how often the mistake actually occurred. No point-loss estimates. */
  top_mistakes: Array<{
    code: string;
    title: string;
    category: string;
    occurrences: number;
  }>;
};

export const getPerformanceSnapshot = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<PerformanceSnapshot> => {
    const { supabase, userId } = context;

    const [profileRes, unitsRes, attemptsRes, mistakesCatRes] = await Promise.all([
      supabase
        .from("profiles")
        .select("display_name, track, target_score, exam_date")
        .eq("id", userId)
        .maybeSingle(),
      supabase
        .from("units")
        .select("id, number, name, ap_weight_pct, ap_points")
        .eq("subject_id", "ap-calc-bc")
        .order("number"),
      supabase
        .from("attempts")
        .select(
          "question_key, unit_id, unit_slug, topic_slug, correct, points_earned, points_possible, mistake_codes",
        )
        .eq("user_id", userId),
      supabase.from("common_mistakes").select("code, title, category"),
    ]);

    const track = profileRes.data?.track === "AB" ? "AB" : "BC";
    const { questionKeyInTrack } = await import("./generated-bank");
    const attempts = (attemptsRes.data ?? []).filter((attempt) =>
      attempt.question_key ? questionKeyInTrack(attempt.question_key, track) : track === "BC",
    );
    const units = (unitsRes.data ?? []).filter((unit) => track === "BC" || unit.number <= 8);
    const mistakesCat = mistakesCatRes.data ?? [];

    const attempts_count = attempts.length;
    const correct_count = attempts.reduce((sum, attempt) => sum + (attempt.correct ? 1 : 0), 0);
    const accuracy = attempts_count > 0 ? correct_count / attempts_count : 0;
    const points_earned = attempts.reduce((s, a) => s + Number(a.points_earned ?? 0), 0);
    const points_possible = attempts.reduce((s, a) => s + Number(a.points_possible ?? 0), 0);

    const byUnit = new Map<string, { correct: number; n: number }>();
    for (const a of attempts) {
      const qnUnit = a.unit_slug ? QN_UNITS.find((entry) => entry.slug === a.unit_slug) : undefined;
      const matchedUnit = a.unit_id
        ? units.find((unit) => unit.id === a.unit_id)
        : qnUnit
          ? units.find((unit) => unit.number === qnUnit.number)
          : undefined;
      if (!matchedUnit) continue;
      const cur = byUnit.get(matchedUnit.id) ?? { correct: 0, n: 0 };
      cur.correct += a.correct ? 1 : 0;
      cur.n += 1;
      byUnit.set(matchedUnit.id, cur);
    }

    const touchedTopics = new Set(attempts.map((a) => a.topic_slug).filter(Boolean) as string[]);

    const unit_mastery = units.map((u) => {
      const m = byUnit.get(u.id);
      const mastery = m && m.n > 0 ? Math.round((m.correct / m.n) * 100) : -1;
      const qnUnit = QN_UNITS.find((q) => q.number === u.number);
      const topics = qnUnit?.topics ?? [];
      const subtopics_total = topics.length;
      const subtopics_covered = topics.filter((t) => touchedTopics.has(t.slug)).length;
      const attemptsN = m?.n ?? 0;
      const coverage = subtopics_total > 0 ? subtopics_covered / subtopics_total : 0;
      return {
        unit_id: u.id,
        number: u.number,
        name: u.name,
        ap_weight_pct: Number(u.ap_weight_pct),
        ap_points: u.ap_points,
        mastery,
        attempts: attemptsN,
        correct: m?.correct ?? 0,
        subtopics_covered,
        subtopics_total,
        coverage,
        mastery_unlocked:
          attemptsN >= UNIT_MASTERY_THRESHOLD &&
          subtopics_total > 0 &&
          subtopics_covered === subtopics_total,
      };
    });

    const untouched_units = unit_mastery
      .filter((u) => u.attempts === 0)
      .map((u) => ({
        unit_id: u.unit_id,
        number: u.number,
        name: u.name,
        ap_points: u.ap_points,
        ap_weight_pct: u.ap_weight_pct,
      }));

    const byTopic = new Map<string, { correct: number; n: number }>();
    for (const a of attempts) {
      const slug = a.topic_slug;
      if (!slug) continue;
      const cur = byTopic.get(slug) ?? { correct: 0, n: 0 };
      cur.correct += a.correct ? 1 : 0;
      cur.n += 1;
      byTopic.set(slug, cur);
    }
    const subtopics = QN_UNITS.filter((u) => track === "BC" || u.number <= 8).flatMap((u) =>
      u.topics
        .filter((t) => byTopic.has(t.slug))
        .map((t) => {
          const s = byTopic.get(t.slug);
          if (!s) return null;
          return {
            unit_slug: u.slug,
            unit_number: u.number,
            topic_slug: t.slug,
            topic_title: t.title,
            accuracy: s.n > 0 ? Math.round((s.correct / s.n) * 100) : 0,
            attempts: s.n,
            correct: s.correct,
            unlocked: s.n >= SUBTOPIC_THRESHOLD,
          };
        })
        .filter((topic): topic is NonNullable<typeof topic> => topic !== null),
    );

    // A weighted summary of demonstrated practice performance. It is deliberately
    // separate from the diagnostic-based AP score estimate.
    const mastery_points = Math.round(
      unit_mastery.reduce(
        (s, u) => s + (u.mastery_unlocked && u.mastery >= 0 ? u.mastery / 100 : 0) * u.ap_points,
        0,
      ),
    );

    const mistakeCounts = new Map<string, number>();
    for (const a of attempts) {
      for (const code of (a.mistake_codes ?? []) as string[]) {
        mistakeCounts.set(code, (mistakeCounts.get(code) ?? 0) + 1);
      }
    }
    const top_mistakes = [...mistakeCounts.entries()]
      .map(([code, occurrences]) => {
        const meta = mistakesCat.find((m) => m.code === code);
        return {
          code,
          title: meta?.title ?? code,
          category: meta?.category ?? "—",
          occurrences,
        };
      })
      .sort((a, b) => b.occurrences - a.occurrences || a.title.localeCompare(b.title))
      .slice(0, 5);

    return {
      profile: profileRes.data ?? null,
      attempts_count,
      accuracy,
      points_earned,
      points_possible,
      mastery_points,
      mastery_points_possible: units.reduce((sum, unit) => sum + unit.ap_points, 0),
      unit_mastery,
      subtopics,
      untouched_units,
      top_mistakes,
    };
  });
