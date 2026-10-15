import type { TopicGuide } from "@/lib/navigator-guides";

/** Unit 3 — Chain Rule. CED 3.1, 3.2, 3.3, 3.4.
 * Selecting procedures (3.5) is practiced across the entire unit.
 */
export const chainRuleGuide: TopicGuide = {
  sections: [
    { id: "core-idea", title: "The Core Idea: Differentiate from the Outside In", blocks: [
      { kind: "prose", text: "The Chain Rule differentiates a composite function. Identify the outer operation and its inner input; differentiate the outer function while keeping its input unchanged, then multiply by the derivative of the inner function. This applies to algebraic, trigonometric, exponential, and logarithmic compositions." },
      { kind: "formula", label: "Chain Rule (CED 3.1)", tex: "\\frac{d}{dx}f(g(x))=f'(g(x))g'(x)" },
      { kind: "formula", label: "Leibniz notation", tex: "\\frac{dy}{dx}=\\frac{dy}{du}\\frac{du}{dx}\\quad\\text{if }y=f(u),\\ u=g(x)" },
      { kind: "callout", tone: "rule", title: "Recognition rule", body: "Ask: what operation is applied last? That is the outer function. Do not differentiate the inside first and stop." },
    ] },
    { id: "recognition", title: "When You See This → Think This", blocks: [
      { kind: "table", columns: ["Given structure", "Recognize", "First move"], rows: [
        ["$(3x^2-1)^5$", "Power of an expression", "Differentiate the fifth power, then multiply by $6x$."],
        ["$\\sin(x^3)$", "Trig of an expression", "Differentiate sine, then multiply by $3x^2$."],
        ["$e^{\\cos x}$", "Exponential composition", "Keep $e^{\\cos x}$ and multiply by $-\\sin x$."],
        ["$\\ln(1+x^2)$", "Logarithm of an expression", "Divide the inner derivative by the inner expression."],
        ["$\\sqrt{f(x)}$ with $f'(a)$ given", "Chain Rule with derivative data", "Use $f'(a)/(2\\sqrt{f(a)})$ if $f(a)>0$."],
        ["$f(g(x))$ with table values", "Composition and table lookup", "Find $g(a)$, then $f'(g(a))$, then $g'(a)$."],
        ["$[f(x)g(x)]^2$", "Product inside a power", "Apply Chain Rule outside and Product Rule inside."],
      ] },
    ] },
    { id: "strategy", title: "Strategy Flowchart", blocks: [
      { kind: "tree", start: "outer", nodes: [
        { id: "outer", prompt: "Is the function a composition?", options: [
          { label: "Yes — one nested operation", next: "inner" },
          { label: "Yes — several nested operations", outcome: "Differentiate each layer from outermost to innermost; multiply the derivatives of all layers." },
          { label: "No — sum, product, or quotient", outcome: "Choose the corresponding rule. If one component is composite, apply Chain Rule within that component." },
        ] },
        { id: "inner", prompt: "How is the inner function represented?", options: [
          { label: "Explicit formula", outcome: "Differentiate the outer function at the inner expression, then multiply by the inner derivative." },
          { label: "Graph or table", outcome: "Use $f'(g(a))g'(a)$, checking which row or graph input is needed." },
          { label: "Another composite", outcome: "Repeat the outside-in process for each nested layer." },
        ] },
      ] },
    ] },
    { id: "question-families", title: "Question Families You Must Recognize", blocks: [
      { kind: "list", title: "Family A — Algebraic and nested powers (3.1)", items: [
        "For $[u(x)]^n$, the derivative is $n[u(x)]^{n-1}u'(x)$.",
        "A reciprocal or radical of a composite is still a power composition; rewrite with negative or fractional exponents.",
        "With several layers, track every inner derivative. For example, $\\sin((x^2+1)^3)$ has three layers.",
      ] },
      { kind: "list", title: "Family B — Trigonometric compositions (3.2)", items: [
        "$\\frac{d}{dx}\\sin u=\\cos u\\,u'$; $\\frac{d}{dx}\\cos u=-\\sin u\\,u'$.",
        "$\\frac{d}{dx}\\tan u=\\sec^2u\\,u'$; apply the same principle to the other standard trig derivatives.",
        "Distinguish $\\sin^2x=[\\sin x]^2$ from $\\sin(x^2)$; their outer operations differ.",
      ] },
      { kind: "list", title: "Family C — Exponential and logarithmic compositions (3.3)", items: [
        "$\\frac{d}{dx}e^{u}=e^{u}u'$ and $\\frac{d}{dx}a^u=a^u\\ln(a)u'$ for $a>0$, $a\\ne1$.",
        "$\\frac{d}{dx}\\ln|u|=u'/u$ wherever $u\\ne0$.",
        "If a logarithm is wrapped around a product or quotient, logarithmic properties may simplify the work, but respect domains.",
      ] },
      { kind: "list", title: "Family D — Derivative data (3.1 and 3.4)", items: [
        "Given $f$, $g$, $f'$, and $g'$ in a table, evaluate $f'(g(a))$ at the inner output, not at $a$.",
        "A graph of $f$ can supply a tangent slope $f'(g(a))$; a graph of $g$ supplies both $g(a)$ and $g'(a)$.",
        "Products, quotients, and compositions can occur together: identify the outermost structure before selecting rules.",
      ] },
      { kind: "list", title: "Family E — Combining rules (3.4–3.5)", items: [
        "A composition can sit inside a product, quotient, or another composition.",
        "Choosing the correct procedure matters as much as algebra: use the Product Rule only for an actual product of variable functions.",
        "When asked for a value rather than a derivative formula, substitute only after the rule structure is correct.",
      ] },
    ] },
    { id: "examples", title: "Worked Examples", blocks: [
      { kind: "example", title: "Nested composite", problem: "Differentiate $y=\\sin((x^2+1)^3)$.", steps: [
        { label: "Outer layer", body: "The outer operation is sine, so begin with $\\cos((x^2+1)^3)$." },
        { label: "Middle layer", body: "Differentiate the cube: $3(x^2+1)^2$." },
        { label: "Inner layer", body: "Differentiate $x^2+1$ to get $2x$." },
      ], conclusion: "$y'=6x(x^2+1)^2\\cos((x^2+1)^3)$." },
      { kind: "example", title: "Derivative table", problem: "At $x=2$, suppose $g(2)=4$, $g'(2)=-3$, and $f'(4)=5$. Find $\\frac{d}{dx}[f(g(x))]$ at $x=2$.", steps: [
        { label: "Apply the structure", body: "$\\frac{d}{dx}f(g(x))=f'(g(x))g'(x)$." },
        { label: "Locate the correct derivative", body: "$f'(g(2))=f'(4)=5$; do not use $f'(2)$." },
        { label: "Multiply", body: "$5(-3)=-15$." },
      ], conclusion: "The derivative at $x=2$ is $-15$." },
      { kind: "example", title: "Product plus Chain Rule", problem: "Find the derivative of $h(x)=x^2e^{3x}$.", steps: [
        { label: "Outer structure", body: "This is a product of $x^2$ and $e^{3x}$." },
        { label: "Differentiate both factors", body: "$\\frac{d}{dx}x^2=2x$ and $\\frac{d}{dx}e^{3x}=3e^{3x}$." },
        { label: "Combine", body: "$h'(x)=2xe^{3x}+3x^2e^{3x}$." },
      ], conclusion: "$h'(x)=e^{3x}(2x+3x^2)$." },
    ] },
    { id: "mcq-frq", title: "MCQ & FRQ Strategy", blocks: [
      { kind: "callout", tone: "info", title: "MCQ: identify the missing factor", items: [
        "Distractors often omit the inner derivative, differentiate only the inner expression, or use $f'(a)$ in place of $f'(g(a))$.",
        "For nested functions, count the layers before comparing answer choices.",
        "For tabular questions, trace the exact input path: $a\\to g(a)\\to f'(g(a))$.",
      ] },
      { kind: "callout", tone: "rule", title: "FRQ: show rule selection and evaluation", items: [
        "Write a derivative expression that displays the Chain Rule before substituting numerical data.",
        "When combining rules, preserve product/quotient structure and all inner derivatives.",
        "If the prompt asks for interpretation, attach the appropriate meaning and units to the derivative value.",
      ] },
    ] },
    { id: "errors", title: "Common Mistakes — Detect & Prevent", blocks: [
      { kind: "table", columns: ["Mistake", "Why it fails", "How to prevent"], rows: [
        ["$\\frac{d}{dx}(u^5)=5u^4$", "The inner function also changes with $x$.", "Multiply by $u'$."],
        ["$\\frac{d}{dx}\\cos u=\\sin u\\,u'$", "The negative sign is missing.", "Recall $(\\cos u)'=-\\sin u\\,u'$."],
        ["Using $f'(a)$ in $[f(g(x))]'_{x=a}$", "The outer derivative is evaluated at $g(a)$.", "Compute the inner output first."],
        ["Applying Product Rule to $f(g(x))$", "Composition is not multiplication.", "Identify the last operation."],
        ["Using $u'/\\ln u$ for $\\ln u$", "The derivative of logarithm is a quotient.", "Use $u'/u$ on its domain."],
        ["Dropping a layer in a nested expression", "Every composition contributes a derivative factor.", "Label outer, middle, inner."],
      ] },
    ] },
    { id: "quick-reference", title: "Exam-Day Quick Reference", blocks: [
      { kind: "list", ordered: true, title: "Recognize → Think → Do → Check", items: [
        "Recognize the outer operation and every nested input.",
        "Choose Chain Rule, possibly combined with product or quotient rules.",
        "Differentiate outside in, multiplying by each inner derivative.",
        "Check signs, omitted factors, evaluation inputs, and domains.",
      ] },
      { kind: "checklist", title: "Can you do this?", items: [
        "Differentiate composite powers, trig, exponential, and logarithmic functions.",
        "Evaluate $[f(g(x))]'$ from graphs and tables.",
        "Distinguish composition from multiplication.",
        "Combine Chain Rule with Product and Quotient Rules.",
        "Explain which derivative value is required at each nested input.",
      ] },
    ] },
  ],
};
