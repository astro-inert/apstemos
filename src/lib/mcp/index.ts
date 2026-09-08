import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listUnits from "./tools/list-units";
import getPracticeQuestions from "./tools/get-practice-questions";
import submitAnswer from "./tools/submit-answer";
import getPerformance from "./tools/get-performance";
import listMistakes from "./tools/list-mistakes";
import saveMistake from "./tools/save-mistake";

// Must be the direct Supabase host: SUPABASE_URL is rewritten to a proxy on publish,
// and only the project ref survives unchanged as a build-time literal.
const projectRef = import.meta.env['VITE_SUPABASE_PROJECT_ID'] ?? "project-ref-unset";

export default defineMcp({
  name: "ap-stem-os",
  title: "AP STEM OS",
  version: "0.1.0",
  instructions: [
    "Tools for AP STEM OS, an AP Calculus AB/BC score-optimization app.",
    "Use `list_units_and_topics` to discover unit and topic slugs.",
    "Use `get_practice_questions` to draw unseen multiple-choice questions for the signed-in student, then `submit_answer` to log each response and get the explanation.",
    "Use `get_performance` for their unit and topic accuracy breakdown. Never state or infer an AP score prediction from it.",
    "Use `list_mistakes` and `save_mistake` for the mistakes database. Write mathematics in inline LaTeX ($...$).",
  ].join("\n"),
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listUnits, getPracticeQuestions, submitAnswer, getPerformance, listMistakes, saveMistake],
});
