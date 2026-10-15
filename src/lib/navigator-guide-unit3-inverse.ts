import type { TopicGuide } from "@/lib/navigator-guides";

/** Unit 3 Topic 3 — Derivatives of Inverse Functions.
 * College Board AP Calculus AB/BC CED 3.7 (Calculating Derivatives of Inverse Functions).
 * Inverse trigonometric derivatives are treated separately in 3.8.
 */
export const inverseFunctionsGuide: TopicGuide = {
  sections: [
    { id: "core-idea", title: "The Core Idea: Reverse the Inputs and Outputs", blocks: [
      { kind: "prose", text: "If f is one-to-one on an appropriate interval, its inverse reverses the mapping: f(a)=b means f^{-1}(b)=a. At corresponding points where f'(a) is nonzero, the tangent slopes of f and its inverse are reciprocals. Do not confuse an inverse function with a reciprocal function." },
      { kind: "formula", label: "Inverse derivative theorem — CED 3.7", tex: "\\left(f^{-1}\\right)'(b)=\\frac{1}{f'(a)}\\quad\\text{when }f(a)=b,\\ f'(a)\\ne0" },
      { kind: "formula", label: "Equivalent input form", tex: "\\left(f^{-1}\\right)'(x)=\\frac{1}{f'(f^{-1}(x))}" },
      { kind: "callout", tone: "rule", title: "The input switch is essential", body: "To find $(f^{-1})'(b)$, first locate the input a for which $f(a)=b$. The required derivative is $f'(a)$, not $f'(b)$." },
    ] },
    { id: "recognition", title: "When You See This → Think This", blocks: [
      { kind: "table", columns: ["If you see…", "Think…", "First move…"], rows: [
        ["$(f^{-1})'(5)$", "Derivative of an inverse at output 5", "Find a with $f(a)=5$; then compute $1/f'(a)$."],
        ["Table of $f(x)$ and $f'(x)$", "Look up the inverse input", "Find the row where the f-value equals the target."],
        ["Graph of f and tangent slopes", "Reflect across $y=x$", "Find the corresponding point $(a,b)$ and take the reciprocal of the slope."],
        ["$f(g(x))=x$ where $g=f^{-1}$", "Inverse composition identity", "Differentiate: $f'(g(x))g'(x)=1$."],
        ["$(f^{-1})'(f(a))$", "Direct corresponding-point form", "Use $1/f'(a)$ if the derivative is nonzero."],
        ["$(f^{-1})'(b)$ and $f'(a)=0$", "Inverse slope theorem cannot be applied", "Investigate differentiability of the inverse; do not divide by zero."],
        ["$1/f(x)$", "Reciprocal, not inverse function", "Use reciprocal/quotient differentiation, not the inverse theorem."],
      ] },
    ] },
    { id: "strategy", title: "Strategy Flowchart", blocks: [
      { kind: "tree", start: "identify", nodes: [
        { id: "identify", prompt: "What function is being differentiated?", options: [
          { label: "$f^{-1}$ — inverse function", next: "locate" },
          { label: "$1/f$ — reciprocal function", outcome: "Use the Quotient Rule or $-f'(x)/[f(x)]^2$, where $f(x)\\ne0$." },
          { label: "$f^{-1}(g(x))$ — composite inverse", outcome: "Apply Chain Rule: $g'(x)/f'(f^{-1}(g(x)))$ where defined." },
        ] },
        { id: "locate", prompt: "Can you find a with f(a)=b?", options: [
          { label: "Yes, from a table or graph", outcome: "Read $f'(a)$ at that input; if nonzero, take its reciprocal." },
          { label: "Yes, by solving an equation", outcome: "Solve $f(a)=b$, respecting the specified one-to-one domain; then evaluate $1/f'(a)$." },
          { label: "No corresponding input in the supplied domain", outcome: "Check whether b is in the range of f on the stated domain. If not, $f^{-1}(b)$ is undefined." },
        ] },
      ] },
    ] },
    { id: "question-families", title: "Question Families You Must Recognize", blocks: [
      { kind: "list", title: "Family A — Numerical table (CED 3.7)", items: [
        "Find the row where $f(a)=b$, not the row where $a=b$.",
        "Read $f'(a)$ from the same row and compute its reciprocal.",
        "If $f'(a)=0$, the reciprocal formula is undefined; check what the question actually permits you to conclude.",
      ] },
      { kind: "list", title: "Family B — Algebraic inverse derivative", items: [
        "You do not have to solve explicitly for $f^{-1}(x)$ if you can find the corresponding input a.",
        "Differentiate f first, then solve $f(a)=b$ and evaluate $1/f'(a)$.",
        "For a restricted domain, verify the input a belongs to that interval.",
      ] },
      { kind: "list", title: "Family C — Graphical inverse derivative", items: [
        "The point $(a,b)$ on f corresponds to $(b,a)$ on $f^{-1}$.",
        "A nonzero tangent slope m for f corresponds to slope $1/m$ for its inverse.",
        "A negative slope remains negative after taking the reciprocal; reflection does not change the sign of a nonzero slope.",
      ] },
      { kind: "list", title: "Family D — Derive the rule by implicit differentiation", items: [
        "Begin with $f(f^{-1}(x))=x$.",
        "Apply Chain Rule: $f'(f^{-1}(x))(f^{-1})'(x)=1$.",
        "Divide by the nonzero derivative of f at the corresponding input.",
      ] },
      { kind: "list", title: "Family E — Composite inverse functions", items: [
        "For $h(x)=f^{-1}(g(x))$, use Chain Rule in addition to the inverse theorem.",
        "The derivative is $h'(x)=g'(x)/f'(f^{-1}(g(x)))$ where defined.",
        "Track the evaluation path $x\\to g(x)\\to f^{-1}(g(x))\\to f'$ carefully.",
      ] },
    ] },
    { id: "examples", title: "Worked Examples", blocks: [
      { kind: "example", title: "Table: locate the right row", problem: "A one-to-one differentiable function satisfies $f(1)=4$, $f'(1)=3$, $f(4)=7$, and $f'(4)=2$. Find $(f^{-1})'(4)$.", steps: [
        { label: "Find the inverse input", body: "Because $f(1)=4$, we have $f^{-1}(4)=1$." },
        { label: "Evaluate the derivative of f", body: "The required value is $f'(1)=3$, not $f'(4)=2$." },
        { label: "Take the reciprocal", body: "$(f^{-1})'(4)=1/3$." },
      ], conclusion: "$(f^{-1})'(4)=\\frac13$." },
      { kind: "example", title: "Polynomial without solving the inverse", problem: "Let $f(x)=x^3+x+1$. Find $(f^{-1})'(3)$.", steps: [
        { label: "Find a corresponding input", body: "$f(1)=1+1+1=3$, so $f^{-1}(3)=1$." },
        { label: "Differentiate f", body: "$f'(x)=3x^2+1$; thus $f'(1)=4$." },
        { label: "Apply the theorem", body: "$(f^{-1})'(3)=1/f'(1)=1/4$." },
      ], conclusion: "$(f^{-1})'(3)=\\frac14$." },
      { kind: "example", title: "Composite inverse with Chain Rule", problem: "Suppose $f(2)=5$, $f'(2)=4$, $g(1)=5$, and $g'(1)=-3$. If $h(x)=f^{-1}(g(x))$, find $h'(1)$.", steps: [
        { label: "Differentiate the composition", body: "$h'(x)=(f^{-1})'(g(x))g'(x)$." },
        { label: "Find the inverse derivative", body: "Since $f(2)=5$, $(f^{-1})'(5)=1/f'(2)=1/4$." },
        { label: "Multiply by the inner derivative", body: "$h'(1)=(1/4)(-3)=-3/4$." },
      ], conclusion: "$h'(1)=-\\frac34$." },
      { kind: "example", title: "Inverse derivative from a graph description", problem: "A smooth one-to-one curve $y=f(x)$ passes through $(2,6)$ with tangent slope $-4$. Find the slope of $f^{-1}$ at $(6,2)$.", steps: [
        { label: "Reverse coordinates", body: "The corresponding inverse point is $(6,2)$." },
        { label: "Reciprocate the slope", body: "The slope of the inverse is $1/(-4)$." },
      ], conclusion: "The inverse tangent slope is $-\\frac14$." },
    ] },
    { id: "mcq-frq", title: "MCQ & FRQ Strategy", blocks: [
      { kind: "callout", tone: "info", title: "MCQ: watch the evaluation input", items: [
        "The most tempting distractor is $1/f'(b)$ instead of $1/f'(a)$ where $f(a)=b$.",
        "Another common distractor is $f'(a)$ without taking its reciprocal.",
        "For a graph, switch the coordinates before locating the tangent slope.",
        "Distinguish $f^{-1}$ from $[f(x)]^{-1}$, which may mean a reciprocal depending on notation.",
      ] },
      { kind: "callout", tone: "rule", title: "FRQ: show the correspondence", items: [
        "Write $f(a)=b$, hence $f^{-1}(b)=a$, before using the derivative formula.",
        "Show the relevant $f'(a)$ and the reciprocal calculation.",
        "For a composite inverse, explicitly show the additional Chain Rule factor.",
        "State domain or nonzero-derivative restrictions if they affect the result.",
      ] },
    ] },
    { id: "errors", title: "Common Mistakes — Detect & Prevent", blocks: [
      { kind: "table", columns: ["Mistake", "Why it fails", "Prevention"], rows: [
        ["Using $1/f'(b)$ automatically", "b is an output of f, not necessarily the required input.", "Find a such that $f(a)=b$."],
        ["Writing $(f^{-1})'(b)=f'(a)$", "Inverse slopes are reciprocals.", "Use $1/f'(a)$."],
        ["Treating $f^{-1}(x)$ as $1/f(x)$", "Inverse and reciprocal are different operations.", "Check whether inputs/outputs reverse."],
        ["Forgetting $g'$ in $f^{-1}(g(x))$", "The outer inverse is part of a composition.", "Apply Chain Rule."],
        ["Dividing by $f'(a)=0$", "The reciprocal formula requires a nonzero derivative.", "Check the theorem's hypotheses."],
        ["Using an input outside the restricted domain", "An inverse depends on the selected one-to-one branch.", "Check the specified domain."],
      ] },
    ] },
    { id: "quick-reference", title: "Exam-Day Quick Reference", blocks: [
      { kind: "list", ordered: true, title: "Find → Evaluate → Reciprocate → Check", items: [
        "Identify the inverse function and the target input b.",
        "Find the corresponding a satisfying $f(a)=b$.",
        "Read or calculate $f'(a)$ and verify it is nonzero.",
        "Take the reciprocal, multiplying by any extra Chain Rule factor.",
      ] },
      { kind: "checklist", title: "Can you do this?", items: [
        "Compute inverse derivatives from numerical tables.",
        "Compute inverse derivatives without explicitly solving for the inverse.",
        "Translate points and tangent slopes between inverse graphs.",
        "Derive the inverse differentiation formula from $f(f^{-1}(x))=x$.",
        "Handle composite inverse functions and domain restrictions.",
      ] },
    ] },
  ],
};
