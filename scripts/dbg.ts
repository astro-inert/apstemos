import { buildQuestion } from "@/lib/generated-bank";
for (const k of ["u6-improper::0","u3-inverse-derivative::6","x3-inverse-function-value::1","u9-polar-petal::0","u1-horizontal-asymptote-rational::16"]) {
  const q = buildQuestion(k)!;
  console.log(k, "|", q.answer_label, "|", q.choices.map(c=>c.text).join("  ~  "));
}
