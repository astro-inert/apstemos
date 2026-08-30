import { TEMPLATES } from "@/lib/question-templates";
import { QN_UNITS } from "@/lib/question-navigator-data";
const byTopic = new Map<string, number>();
for (const t of TEMPLATES) byTopic.set(t.topic, (byTopic.get(t.topic) ?? 0) + 1);
for (const u of QN_UNITS) {
  for (const t of u.topics) {
    const n = byTopic.get(t.slug) ?? 0;
    if (n < 2) console.log(`U${u.number} ${t.slug} -> ${n}`);
  }
}
const known = new Set(QN_UNITS.flatMap(u=>u.topics.map(t=>t.slug)));
for (const [k] of byTopic) if (!known.has(k)) console.log("ORPHAN", k);
console.log("templates", TEMPLATES.length, "topics", known.size);
