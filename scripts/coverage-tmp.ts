import { QN_UNITS } from "@/lib/question-navigator-data";
import { TEMPLATES } from "@/lib/question-templates";
import { bankCount, bankKeys, buildQuestion, templateTrack } from "@/lib/generated-bank";
const byTopic = new Map<string, string[]>();
for (const t of TEMPLATES) byTopic.set(t.topic, [...(byTopic.get(t.topic) ?? []), t.id]);
let thin = 0;
for (const u of QN_UNITS) for (const t of u.topics) {
  const ids = byTopic.get(t.slug) ?? [];
  const n = bankCount({ topic_slug: t.slug });
  if (ids.length < 2 || n < 5) { thin++; console.log("THIN", u.number, t.slug, ids.length, n); }
}
console.log("thin topics:", thin, "templates:", TEMPLATES.length);
console.log("total", bankCount(), "AB", bankCount({track:"AB"}), "BC", bankCount({track:"BC"}));
console.log("calc", bankCount({calculator:true}), "nocalc", bankCount({calculator:false}));
console.log("AB calc", bankCount({track:"AB",calculator:true}));
