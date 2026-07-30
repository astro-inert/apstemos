import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { QN_UNITS } from "./question-navigator-data";

/** A unit needs this many logged questions before mastery % is trusted… */
export const UNIT_MASTERY_THRESHOLD = 10;
/** …and every subtopic in the unit must have at least this many logged questions. */
export const UNIT_SUBTOPIC_MIN = 1;
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
  accuracy: number; // 0-1
  points_earned: number;
  points_possible: number;
  predicted_raw_score: number; // out of 108
  predicted_ap_score: number; // 1-5
  confidence: "low" | "medium" | "high";
  unit_mastery: Array<{
    unit_id: string;
    number: number;
    name: string;
    ap_weight_pct: number;
    ap_points: number;
    mastery: number; // 0-100, or -1 if no data
    attempts: number;
    /** how many of the unit's subtopics have at least one logged question */
    subtopics_covered: number;
    subtopics_total: number;
    /** true once attempts >= UNIT_MASTERY_THRESHOLD AND every subtopic has been touched */
    mastery_unlocked: boolean;
  }>;

  subtopics: Array<{
    unit_slug: string;
    unit_number: number;
    topic_slug: string;
    topic_title: string;
    accuracy: number; // 0-100
    attempts: number;
    /** true once attempts >= SUBTOPIC_THRESHOLD */
    unlocked: boolean;
  }>;
  untouched_units: Array<{ unit_id: string; number: number; name: string; ap_points: number; ap_weight_pct: number }>;
  top_mistakes: Array<{
    code: string;
    title: string;
    category: string;
    occurrences: number;
    est_point_loss: number;
  }>;
  recommended_actions: Array<{
    title: string;
    detail: string;
    estimated_gain: number;
    target: string;
  }>;
};

// AP Calc BC cutoffs (approximate, recent years): 5≥68, 4≥54, 3≥40, 2≥27
function rawToAp(raw: number): number {
  if (raw >= 68) return 5;
  if (raw >= 54) return 4;
  if (raw >= 40) return 3;
  if (raw >= 27) return 2;
  return 1;
}

export const getPerformanceSnapshot = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<PerformanceSnapshot> => {
    const { supabase, userId } = context;

    const [profileRes, unitsRes, attemptsRes, mistakesCatRes] = await Promise.all([
      supabase.from("profiles").select("display_name, track, target_score, exam_date").eq("id", userId).maybeSingle(),
      supabase.from("units").select("id, number, name, ap_weight_pct, ap_points").eq("subject_id", "ap-calc-bc").order("number"),
      supabase
        .from("attempts")
        .select("unit_id, unit_slug, topic_slug, correct, points_earned, points_possible, mistake_codes")
        .eq("user_id", userId),
      supabase.from("common_mistakes").select("code, title, category, est_point_loss"),
    ]);

    const attempts = attemptsRes.data ?? [];
    const units = unitsRes.data ?? [];
    const mistakesCat = mistakesCatRes.data ?? [];

    const attempts_count = attempts.length;
    const points_earned = attempts.reduce((s, a) => s + Number(a.points_earned ?? 0), 0);
    const points_possible = attempts.reduce((s, a) => s + Number(a.points_possible ?? 0), 0);
    const accuracy = points_possible > 0 ? points_earned / points_possible : 0;

    // Unit mastery: % correct within unit; -1 if untouched
    const byUnit = new Map<string, { e: number; p: number; n: number }>();
    for (const a of attempts) {
      if (!a.unit_id) continue;
      const cur = byUnit.get(a.unit_id) ?? { e: 0, p: 0, n: 0 };
      cur.e += Number(a.points_earned ?? 0);
      cur.p += Number(a.points_possible ?? 0);
      cur.n += 1;
      byUnit.set(a.unit_id, cur);
    }

    // Which subtopics has the user actually touched? Mastery only unlocks with
    // full subtopic coverage, so a unit can't look "mastered" off one topic.
    const touchedTopics = new Set(attempts.map((a) => a.topic_slug).filter(Boolean) as string[]);

    const unit_mastery = units.map((u) => {
      const m = byUnit.get(u.id);
      const mastery = m && m.p > 0 ? Math.round((m.e / m.p) * 100) : -1;
      const qnUnit = QN_UNITS.find((q) => q.number === u.number);
      const topics = qnUnit?.topics ?? [];
      const subtopics_total = topics.length;
      const subtopics_covered = topics.filter((t) => touchedTopics.has(t.slug)).length;
      const attemptsN = m?.n ?? 0;
      return {
        unit_id: u.id,
        number: u.number,
        name: u.name,
        ap_weight_pct: Number(u.ap_weight_pct),
        ap_points: u.ap_points,
        mastery,
        attempts: attemptsN,
        subtopics_covered,
        subtopics_total,
        mastery_unlocked:
          attemptsN >= UNIT_MASTERY_THRESHOLD &&
          subtopics_total > 0 &&
          subtopics_covered >= subtopics_total * UNIT_SUBTOPIC_MIN,
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

    // Subtopic accuracy (needs SUBTOPIC_THRESHOLD attempts to be trusted)
    const byTopic = new Map<string, { e: number; p: number; n: number }>();
    for (const a of attempts) {
      const slug = a.topic_slug;
      if (!slug) continue;
      const cur = byTopic.get(slug) ?? { e: 0, p: 0, n: 0 };
      cur.e += Number(a.points_earned ?? 0);
      cur.p += Number(a.points_possible ?? 0);
      cur.n += 1;
      byTopic.set(slug, cur);
    }
    const subtopics = QN_UNITS.flatMap((u) =>
      u.topics
        .filter((t) => byTopic.has(t.slug))
        .map((t) => {
          const s = byTopic.get(t.slug)!;
          return {
            unit_slug: u.slug,
            unit_number: u.number,
            topic_slug: t.slug,
            topic_title: t.title,
            accuracy: s.p > 0 ? Math.round((s.e / s.p) * 100) : 0,
            attempts: s.n,
            unlocked: s.n >= SUBTOPIC_THRESHOLD,
          };
        }),
    );

    // Predicted score: weighted accuracy across units, defaulting untouched to 50%
    const weightedAcc = unit_mastery.reduce((s, u) => {
      const acc = u.mastery >= 0 ? u.mastery / 100 : 0.5;
      return s + acc * u.ap_points;
    }, 0);
    const predicted_raw_score = Math.round(weightedAcc);
    const predicted_ap_score = rawToAp(predicted_raw_score);
    const confidence: "low" | "medium" | "high" =
      attempts_count < 20 ? "low" : attempts_count < 80 ? "medium" : "high";

    // Top mistakes from the user's attempts
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
          est_point_loss: Number(meta?.est_point_loss ?? 1) * occurrences,
        };
      })
      .sort((a, b) => b.est_point_loss - a.est_point_loss)
      .slice(0, 5);

    // Recommended actions = weakest weighted units
    const recommended_actions = [...unit_mastery]
      .filter((u) => u.mastery !== 100)
      .map((u) => {
        const acc = u.mastery >= 0 ? u.mastery / 100 : 0.5;
        const gain = Math.round((1 - acc) * u.ap_points * 0.6);
        return {
          title: `Drill Unit ${u.number}: ${u.name}`,
          detail:
            u.mastery < 0
              ? `Untouched. Worth ${u.ap_points} AP points (${u.ap_weight_pct}% of exam).`
              : `Currently ${u.mastery}% mastery. Highest ROI in your study plan.`,
          estimated_gain: gain,
          target: `unit-${u.number}`,
        };
      })
      .sort((a, b) => b.estimated_gain - a.estimated_gain)
      .slice(0, 5);

    return {
      profile: profileRes.data ?? null,
      attempts_count,
      accuracy,
      points_earned,
      points_possible,
      predicted_raw_score,
      predicted_ap_score,
      confidence,
      unit_mastery,
      subtopics,
      untouched_units,
      top_mistakes,
      recommended_actions,
    };
  });
