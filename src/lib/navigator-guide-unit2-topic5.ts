import type { TopicGuide } from "@/lib/navigator-guides";

/**
 * AP STEM OS — Unit 2 Topic 5
 * Navigator taxonomy: Differentiability vs. Continuity
 * Notion mapping: FUN 2.4 — Connecting Differentiability and Continuity:
 * Determining When Derivatives Do and Do Not Exist.
 * CED focus: FUN-2.A; FUN-2.A.1–2; suggested skill 3.E.
 */
export const differentiabilityContinuityGuide: TopicGuide = {
  sections: [
    {
      id: "core-idea",
      title: "The Core Idea: Differentiable ⇒ Continuous, Not the Reverse",
      blocks: [
        { kind: "prose", text: "Differentiability is the stronger condition. If a function is differentiable at x = a, then it must be continuous there. But continuity alone does not guarantee that a derivative exists." },
        { kind: "formula", label: "One-way implication", tex: "f\\text{ differentiable at }a\\;\\Longrightarrow\\;f\\text{ continuous at }a" },
        { kind: "formula", label: "Contrapositive", tex: "f\\text{ not continuous at }a\\;\\Longrightarrow\\;f'(a)\\text{ does not exist}" },
        { kind: "callout", tone: "rule", title: "Master recognition rule", body: "Discontinuous? The derivative cannot exist. Continuous? You still must check whether the left- and right-hand derivative behavior agrees and gives a finite slope." },
      ],
    },
    {
      id: "recognition",
      title: "When You See This → Think This",
      blocks: [{ kind: "table", columns: ["If you see…", "Think…", "First move…"], rows: [
        ["A discontinuity at x = a", "Automatically not differentiable", "Stop: differentiability implies continuity, so f'(a) cannot exist."],
        ["A continuous sharp corner", "Continuity does not guarantee differentiability", "Compare the left- and right-hand slopes."],
        ["A cusp", "Derivative fails even though the graph may be continuous", "Inspect one-sided derivative behavior; the slopes do not approach one finite common value."],
        ["A vertical tangent", "No finite tangent slope", "Recognize that f'(a) does not exist as a finite real number."],
        ["Piecewise function at a join", "Two separate tests", "Check continuity first; only then compare one-sided derivatives."],
        ["f is differentiable at a", "Continuity is guaranteed", "Conclude f is continuous at a without extra calculation."],
        ["f is continuous at a", "Not enough information for differentiability", "Look for derivative evidence; do not reverse the theorem."],
        ["a is not in the domain of f", "Neither f(a) nor f'(a) exists", "Domain check comes before derivative work."],
      ]}],
    },
    {
      id: "strategy",
      title: "Strategy Flowchart",
      blocks: [{ kind: "tree", start: "domain", nodes: [
        { id: "domain", prompt: "Is x = a in the domain of f?", options: [
          { label: "No", outcome: "f'(a) does not exist. A point outside the domain of f cannot be in the domain of f'." },
          { label: "Yes", next: "continuous" },
        ]},
        { id: "continuous", prompt: "Is f continuous at x = a?", options: [
          { label: "No", outcome: "Not differentiable at a. You are done." },
          { label: "Yes", next: "slopes" },
        ]},
        { id: "slopes", prompt: "Do the left- and right-hand derivative behaviors approach the same finite value?", options: [
          { label: "Yes", outcome: "f is differentiable at a." },
          { label: "No — unequal one-sided slopes", outcome: "Not differentiable: corner or other slope mismatch." },
          { label: "No — slope becomes unbounded / vertical", outcome: "Not differentiable: there is no finite derivative." },
        ]},
      ]}],
    },
    {
      id: "question-families",
      title: "Question Families You Must Recognize",
      blocks: [
        { kind: "list", title: "Family A — Theorem / implication questions", items: ["Differentiable at a ⇒ continuous at a is always valid.", "Not continuous at a ⇒ not differentiable at a is the valid contrapositive.", "Continuous at a ⇒ differentiable at a is false in general.", "Not differentiable at a ⇒ not continuous at a is also false in general."] },
        { kind: "list", title: "Family B — Graph: where does f' fail to exist?", items: ["First mark discontinuities; every one is automatically a derivative failure.", "Then inspect continuous points for corners, cusps, or vertical tangents.", "A horizontal tangent is differentiable: its derivative is 0."] },
        { kind: "list", title: "Family C — Piecewise differentiability at a join", items: ["Continuity is Gate 1: left limit = right limit = f(a).", "Differentiability is Gate 2: left derivative = right derivative as the same finite value.", "Passing Gate 2 requires passing Gate 1 first."] },
        { kind: "list", title: "Family D — Difference-quotient evidence", items: ["Compare one-sided limits of the difference quotient.", "If they disagree, the two-sided derivative does not exist.", "If the quotient becomes unbounded, there is no finite derivative at that point."] },
        { kind: "list", title: "Family E — Domain of f versus domain of f'", items: ["The domain of f' can be smaller than the domain of f.", "A point not in the domain of f cannot be in the domain of f'.", "A point can belong to the domain of f but not the domain of f' when f is continuous but nondifferentiable there."] },
      ],
    },
    {
      id: "representations",
      title: "Representation Translation",
      blocks: [{ kind: "table", columns: ["Representation", "What to inspect"], rows: [
        ["Graph", "Continuity first; then corners, cusps, vertical tangents, and ordinary smooth points."],
        ["Piecewise formula", "Function-value/limit agreement first; derivative agreement second."],
        ["Difference quotient", "Whether left- and right-hand limits exist and agree as one finite value."],
        ["Verbal theorem statement", "Direction of implication: differentiable ⇒ continuous."],
        ["Domain information", "A derivative can exist only where the original function is defined."],
      ]}],
    },
    {
      id: "examples",
      title: "Worked Examples",
      blocks: [
        { kind: "example", title: "Continuous but not differentiable", problem: "Determine whether f(x)=|x| is differentiable at x=0.", steps: [
          { label: "Check continuity", body: "$|x|$ is continuous at 0, so differentiability is still possible — but not guaranteed." },
          { label: "Check one-sided slopes", body: "For $x<0$, the slope is $-1$; for $x>0$, the slope is $1$." },
          { label: "Compare", body: "The one-sided derivatives disagree." },
        ], conclusion: "$f'(0)$ does not exist. The graph is continuous at 0 but has a corner there." },
        { kind: "example", title: "Piecewise join: continuity before slope", problem: "Let $f(x)=x^2$ for $x\\le1$ and $f(x)=mx+b$ for $x>1$. Find conditions on m and b so f is differentiable at x=1.", steps: [
          { label: "Gate 1 — continuity", body: "The left value is 1, so the right-hand expression must satisfy $m+b=1$." },
          { label: "Gate 2 — derivative match", body: "The left derivative at 1 is $2$. The right derivative is $m$, so $m=2$." },
          { label: "Return to continuity", body: "$2+b=1$, so $b=-1$." },
        ], conclusion: "Differentiability requires $m=2$ and $b=-1$. Never skip the continuity gate." },
        { kind: "example", title: "Use the theorem instead of overworking", problem: "Suppose f is differentiable at x=4. Which conclusion is guaranteed about f at x=4?", steps: [
          { label: "Recognize the theorem", body: "Differentiability is the stronger condition." },
          { label: "Apply the implication", body: "Differentiable at 4 ⇒ continuous at 4." },
        ], conclusion: "Continuity at x=4 is guaranteed. No limit calculation is needed." },
      ],
    },
    {
      id: "mcq-frq",
      title: "MCQ & FRQ Strategy",
      blocks: [
        { kind: "callout", tone: "info", title: "MCQ: classify before calculating", items: ["Memorize the theorem direction, then use the contrapositive when useful.", "If a graph is discontinuous at a point, eliminate any answer claiming differentiability there.", "Do not confuse a horizontal tangent with a derivative failure: horizontal means derivative 0.", "For piecewise questions, test continuity before spending time matching derivatives.", "If choices describe corners, cusps, vertical tangents, and discontinuities, ask whether the derivative approaches one finite value from both sides."] },
        { kind: "callout", tone: "rule", title: "FRQ: justify the failure precisely", items: ["Do not write only ‘not differentiable because it is a corner’ when the prompt asks for mathematical justification; identify unequal one-sided derivative behavior when appropriate.", "If discontinuity is established, cite the implication: differentiability at a point requires continuity there.", "For piecewise functions, show the continuity condition and derivative-matching condition separately.", "A complete conclusion names the point and states whether the derivative exists."] },
      ],
    },
    {
      id: "hidden-applications",
      title: "Hidden & Mixed Applications",
      blocks: [
        { kind: "callout", tone: "info", title: "This topic often appears as a condition check", body: "The AP task may not literally ask ‘Is f differentiable?’ It may ask which statements must be true, where f' is defined, whether a theorem can be used later, or what parameter makes a piecewise function differentiable." },
        { kind: "list", title: "Common disguises", items: ["Choosing a parameter so a piecewise graph has no break and no slope mismatch.", "Identifying the domain of f' from a graph of f.", "Using a known discontinuity to conclude immediately that a derivative does not exist.", "Distinguishing a derivative value of 0 from a derivative that does not exist.", "Interpreting a graph that is continuous everywhere but fails to be differentiable at selected points."] },
      ],
    },
    {
      id: "errors",
      title: "Common Mistakes — Detect & Prevent",
      blocks: [{ kind: "table", columns: ["Mistake", "Why it fails", "Prevention"], rows: [
        ["Continuous ⇒ differentiable", "The theorem only goes the other direction.", "Say it exactly: differentiable ⇒ continuous."],
        ["Not differentiable ⇒ discontinuous", "Corners and vertical tangents can be continuous.", "Use the contrapositive correctly: not continuous ⇒ not differentiable."],
        ["Checking slopes before continuity in a piecewise problem", "Matching derivative formulas cannot repair a break in the function.", "Gate 1 continuity; Gate 2 derivative agreement."],
        ["Calling a horizontal tangent nondifferentiable", "A horizontal tangent has a perfectly valid slope of 0.", "Differentiate between slope = 0 and slope DNE."],
        ["Treating a vertical tangent as an ordinary derivative", "The tangent has no finite slope.", "AP derivative values are finite real slopes unless the problem explicitly discusses other behavior."],
        ["Ignoring domain", "f'(a) cannot exist if f(a) is not defined.", "Check whether a belongs to the domain of f first."],
      ]}],
    },
    {
      id: "connections",
      title: "Cross-Topic Connections",
      blocks: [{ kind: "table", columns: ["Related topic", "Connection"], rows: [
        ["Definition of the Derivative", "Differentiability is determined by the existence of the difference-quotient limit."],
        ["Continuity — Unit 1", "Continuity is necessary for differentiability, but not sufficient."],
        ["Piecewise continuity", "A piecewise join must first be continuous before it can be differentiable."],
        ["Critical points — Unit 5", "Points where f' is 0 or does not exist can become critical-point candidates when they lie in the domain of f."],
        ["Mean Value Theorem — Unit 5", "Differentiability on an open interval is one of the theorem's hypotheses."],
        ["Graph analysis", "Features of f determine where f' exists and what the graph of f' can look like."],
      ]}],
    },
    {
      id: "quick-reference",
      title: "Exam-Day Quick Reference",
      blocks: [
        { kind: "table", columns: ["Situation at x = a", "Continuous?", "Differentiable?"], rows: [
          ["Ordinary smooth point", "Yes", "Yes"],
          ["Horizontal tangent", "Yes", "Yes; $f'(a)=0$"],
          ["Corner", "Can be yes", "No"],
          ["Cusp", "Can be yes", "No"],
          ["Vertical tangent", "Can be yes", "No finite derivative"],
          ["Hole / jump / other discontinuity", "No", "No"],
        ]},
        { kind: "list", ordered: true, title: "Domain → Continuity → One-Sided Slopes → Conclusion", items: ["Domain: is f(a) defined?", "Continuity: does the function actually meet at a?", "One-sided slopes: do both sides approach the same finite derivative value?", "Conclusion: state differentiable or not differentiable and give the exact reason."] },
        { kind: "checklist", title: "Can You Do This?", items: ["State differentiable ⇒ continuous without reversing it.", "Use the contrapositive not continuous ⇒ not differentiable.", "Identify derivative failures from a graph.", "Distinguish corners, cusps, vertical tangents, discontinuities, and horizontal tangents.", "Solve a piecewise differentiability condition using continuity first and derivative matching second.", "Determine whether a point can belong to the domain of f'.", "Justify nondifferentiability using one-sided derivative behavior when required."] },
        { kind: "callout", tone: "rule", title: "Master rule", body: "Continuity opens the door to differentiability; it does not guarantee you can walk through it. Check the slopes." },
      ],
    },
  ],
};

export function getUnit2Topic5Guide(slug: string): TopicGuide | undefined {
  return slug === "differentiability-and-continuity" ? differentiabilityContinuityGuide : undefined;
}
