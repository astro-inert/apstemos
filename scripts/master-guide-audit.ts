/**
 * Master Guide audit: every formula / technique / theorem in the uploaded
 * AP Calculus BC Master Guide must be represented by at least `min` generated
 * questions in the right topic. Exits non-zero when anything is short.
 *
 * Run: bun scripts/master-guide-audit.ts
 */
import { GUIDE_ENTRIES } from "@/lib/master-guide-index";
import { bankKeys, buildQuestion } from "@/lib/generated-bank";

type Item = { topic: string; text: string };

const items: Item[] = [];
for (const key of bankKeys()) {
  const q = buildQuestion(key);
  if (!q) continue;
  items.push({
    topic: q.topic_slug,
    text: `${q.prompt}\n${q.choices.map((c) => c.text).join("\n")}\n${q.explanation}`,
  });
}

const rows = GUIDE_ENTRIES.map((e) => {
  const topics = new Set(e.topics);
  const n = items.filter((i) => topics.has(i.topic) && e.match.test(i.text)).length;
  return { e, n };
});

const short = rows.filter((r) => r.n < (r.e.min ?? 3));

console.log(`=== Master Guide audit ===`);
console.log(`entries: ${GUIDE_ENTRIES.length}   bank items: ${items.length}`);
console.log(`satisfied: ${rows.length - short.length}   short: ${short.length}\n`);

for (const { e, n } of short.sort((a, b) => a.e.page - b.e.page || a.e.id.localeCompare(b.e.id))) {
  console.log(`  p${String(e.page).padStart(2)}  ${e.id.padEnd(22)} ${String(n).padStart(2)}/${e.min}  ${e.label}  [${e.topics.join(", ")}]`);
}

if (short.length) process.exitCode = 1;
