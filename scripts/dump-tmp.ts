import { TEMPLATES } from "@/lib/question-templates";
import { buildQuestion } from "@/lib/generated-bank";
for (const t of TEMPLATES) {
  const q = buildQuestion(`${t.id}::1`);
  console.log(`${t.id}\t${t.topic}\t${(q?.prompt ?? "").slice(0, 150).replace(/\s+/g," ")}`);
}
