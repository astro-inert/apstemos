import { MANIFESTATIONS } from "@/lib/ced-taxonomy";
import { TEMPLATE_MANIFESTATION } from "@/lib/template-classification";
const ids = new Set(MANIFESTATIONS.map((m) => m.id));
const bad = Object.entries(TEMPLATE_MANIFESTATION).filter(([, v]) => !ids.has(v));
console.log("manifestations:", ids.size, "bad refs:", bad.length);
for (const b of bad) console.log(" ", b[0], "->", b[1]);
