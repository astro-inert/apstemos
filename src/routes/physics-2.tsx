import { createFileRoute } from "@tanstack/react-router";
import { SubjectHome } from "@/components/SubjectHome";
import { SUBJECTS } from "@/lib/subjects";

const subject = SUBJECTS["physics-2"];

export const Route = createFileRoute("/physics-2")({
  head: () => ({
    meta: [
      { title: subject.meta.title },
      { name: "description", content: subject.meta.description },
      { property: "og:title", content: subject.meta.title },
      { property: "og:description", content: subject.meta.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <SubjectHome subject={subject} />,
});
