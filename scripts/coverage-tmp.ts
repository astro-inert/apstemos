import { QN_UNITS } from "@/lib/question-navigator-data";
import { BASE_TEMPLATES } from "@/lib/question-templates";
const byTopic = new Map<string, string[]>();
for (const t of BASE_TEMPLATES) byTopic.set(t.topic, [...(byTopic.get(t.topic) ?? []), t.id]);
for (const u of QN_UNITS) {
  console.log(`\nU${u.number} ${u.slug}`);
  for (const t of u.topics) console.log("   ", t.slug, "|", (byTopic.get(t.slug) ?? []).join(","));
}
