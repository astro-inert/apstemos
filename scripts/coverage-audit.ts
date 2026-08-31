/**
 * Coverage audit: measures the generated bank against the CED manifestation
 * inventory rather than against a raw question count.
 *
 * Run: bun scripts/coverage-audit.ts [--missing]
 */
import { MANIFESTATIONS } from "@/lib/ced-taxonomy";
import { QN_UNITS } from "@/lib/question-navigator-data";
import { TEMPLATES } from "@/lib/question-templates";
import { bankKeys, buildQuestion, templateTaxonomy } from "@/lib/generated-bank";

const MIN_PER_MANIFESTATION = 3;
const MIN_PER_TOPIC = 5;

const counts = new Map<string, number>();
const topicCounts = new Map<string, number>();
const repCounts = new Map<string, number>();
const reasoningCounts = new Map<string, number>();
const signatures = new Map<string, number>();

for (const key of bankKeys()) {
  const q = buildQuestion(key);
  if (!q) continue;
  counts.set(q.manifestation, (counts.get(q.manifestation) ?? 0) + 1);
  topicCounts.set(q.topic_slug, (topicCounts.get(q.topic_slug) ?? 0) + 1);
  repCounts.set(q.representation, (repCounts.get(q.representation) ?? 0) + 1);
  reasoningCounts.set(q.reasoning, (reasoningCounts.get(q.reasoning) ?? 0) + 1);
  signatures.set(q.structural_signature, (signatures.get(q.structural_signature) ?? 0) + 1);
}

const total = [...counts.values()].reduce((a, b) => a + b, 0);
const covered = MANIFESTATIONS.filter((m) => (counts.get(m.id) ?? 0) >= MIN_PER_MANIFESTATION);
const partial = MANIFESTATIONS.filter((m) => {
  const n = counts.get(m.id) ?? 0;
  return n > 0 && n < MIN_PER_MANIFESTATION;
});
const missing = MANIFESTATIONS.filter((m) => !counts.has(m.id));

const unclassified = TEMPLATES.filter((t) => templateTaxonomy(t).manifestation.endsWith(":unclassified"));

console.log("=== CED coverage audit ===");
console.log(`generated questions        ${total}`);
console.log(`templates                  ${TEMPLATES.length} (unclassified: ${unclassified.length})`);
console.log(`manifestations in taxonomy ${MANIFESTATIONS.length}`);
console.log(`  fully covered (>=${MIN_PER_MANIFESTATION})      ${covered.length}`);
console.log(`  partial (1-${MIN_PER_MANIFESTATION - 1})              ${partial.length}`);
console.log(`  missing                  ${missing.length}`);

console.log("\n=== representation mix ===");
for (const [k, v] of [...repCounts].sort((a, b) => b[1] - a[1]))
  console.log(`  ${k.padEnd(12)} ${v} (${((v / total) * 100).toFixed(1)}%)`);

console.log("\n=== reasoning mix ===");
for (const [k, v] of [...reasoningCounts].sort((a, b) => b[1] - a[1]))
  console.log(`  ${k.padEnd(20)} ${v} (${((v / total) * 100).toFixed(1)}%)`);

const thinTopics: string[] = [];
for (const unit of QN_UNITS) {
  for (const t of unit.topics) {
    const n = topicCounts.get(t.slug) ?? 0;
    if (n < MIN_PER_TOPIC) thinTopics.push(`${t.slug} (${n})`);
  }
}
console.log(`\n=== topics under ${MIN_PER_TOPIC} questions: ${thinTopics.length} ===`);
for (const t of thinTopics) console.log(`  ${t}`);

const heavy = [...signatures].filter(([, n]) => n > 40).sort((a, b) => b[1] - a[1]);
console.log(`\n=== duplicate-heavy signatures (>40): ${heavy.length} ===`);
for (const [sig, n] of heavy.slice(0, 15)) console.log(`  ${n}  ${sig}`);

if (process.argv.includes("--missing")) {
  console.log("\n=== missing manifestations by unit ===");
  const byTopic = new Map<string, string[]>();
  for (const m of missing) {
    const list = byTopic.get(m.topic) ?? [];
    list.push(`${m.id}  [${m.representation}/${m.reasoning}]  ${m.label}`);
    byTopic.set(m.topic, list);
  }
  for (const unit of QN_UNITS) {
    const rows = unit.topics.flatMap((t) => byTopic.get(t.slug) ?? []);
    if (!rows.length) continue;
    console.log(`\nUnit ${unit.number}: ${unit.title}`);
    for (const r of rows) console.log(`  - ${r}`);
  }
}
