import { GAP_TEMPLATES } from "../src/lib/question-templates-gap";
import { getManifestation, manifestationsForTopic } from "../src/lib/ced-taxonomy";
const bad = GAP_TEMPLATES.filter((t) => t.manifestation && !getManifestation(t.manifestation));
console.log("bad:", bad.length);
for (const t of bad) {
  console.log(t.id, "->", t.manifestation);
  console.log("   available:", manifestationsForTopic(t.topic).map((m) => m.id).join(", "));
}
