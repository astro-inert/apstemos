import { defineTool } from "@lovable.dev/mcp-js";
import { QN_UNITS } from "@/lib/question-navigator-data";

export default defineTool({
  name: "list_units_and_topics",
  title: "List units and topics",
  description:
    "List every AP Calculus AB/BC unit in the course, with its exam weighting and the topics inside it. Topic slugs returned here are the values other tools accept.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const units = QN_UNITS.map((u) => ({
      unit_slug: u.slug,
      number: u.number,
      title: u.title,
      exam_weight: u.weight,
      topics: u.topics.map((t) => ({ topic_slug: t.slug, title: t.title, blurb: t.blurb })),
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(units, null, 2) }],
      structuredContent: { units },
    };
  },
});
