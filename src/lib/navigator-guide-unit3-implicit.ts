import type { TopicGuide } from "@/lib/navigator-guides";

/** Unit 3 / Implicit Differentiation. CED 3.5 (procedure selection) and 3.6. */
export const implicitDifferentiationGuide: TopicGuide = {
  sections: [
    { id: "core-idea", title: "The Core Idea: Differentiate Both Sides", blocks: [
      { kind: "prose", text: "An implicit equation relates x and y without necessarily isolating y. Treat y as a differentiable function of x. Differentiate both sides with respect to x, apply the Chain Rule whenever a term contains y, then solve algebraically for dy/dx." },
      { kind: "formula", label: "Essential Chain Rule step", tex: "\\frac{d}{dx}[y^n]=ny^{n-1}\\frac{dy}{dx}" },
      { kind: "formula", label: "Example: circle", tex: "x^2+y^2=25\\quad\\Longrightarrow\\quad 2x+2y\\frac{dy}{dx}=0\\quad\\Longrightarrow\\quad\\frac{dy}{dx}=-\\frac{x}{y}" },
      { kind: "callout", tone: "rule", title: "Master recognition rule", body: "If x and y are mixed in an equation and the problem asks for a tangent slope or dy/dx, implicit differentiation is often the efficient approach. Every differentiated y-expression needs its y' factor." },
    ] },
    { id: "recognition", title: "When You See This → Think This", blocks: [
      { kind: "table", columns: ["Prompt feature", "Think", "First move"], rows: [
        ["$x^2+y^2=c$", "Implicit curve", "Differentiate both sides; $d(y^2)/dx=2yy'$."],
        ["$xy=6$", "Product involving x and y", "Use Product Rule: $(xy)'=y+xy'$."],
        ["$\\sin y=x$", "Composition through y", "Use Chain Rule: $(\\sin y)'=\\cos y\\,y'$."],
        ["$e^{xy}=x+y$", "Nested composition and product", "Differentiate the exponent $xy$ with Product Rule."],
        ["Tangent line at $(a,b)$", "Evaluate a slope", "Find $y'$, substitute both coordinates, then use point-slope form."],
        ["Horizontal tangent", "Slope zero", "Set numerator of a valid $y'$ expression to zero; verify denominator nonzero and point on curve."],
        ["Vertical tangent", "Undefined finite $dy/dx$", "Inspect where the slope denominator is zero and check the local curve behavior."],
      ] },
    ] },
    { id: "strategy", title: "Strategy Flowchart", blocks: [
      { kind: "tree", start: "form", nodes: [
        { id: "form", prompt: "Is y given explicitly as a function of x?", options: [
          { label: "Yes, easily isolated", outcome: "Explicit differentiation may be simplest. Implicit differentiation is also valid if the relation permits it." },
          { label: "No, x and y are mixed", next: "terms" },
        ] },
        { id: "terms", prompt: "Which types of terms appear?", options: [
          { label: "Powers of y", outcome: "Differentiate $y^n$ as $ny^{n-1}y'$, then collect the $y'$ terms." },
          { label: "Products such as xy", outcome: "Use Product Rule and remember that the derivative of y is $y'$." },
          { label: "Trig, log, or exponential expressions of y", outcome: "Use the appropriate outer derivative and multiply by the derivative of the inner y-expression." },
        ] },
      ] },
    ] },
    { id: "question-families", title: "Question Families You Must Recognize", blocks: [
      { kind: "list", title: "Family A — Find the derivative of a relation (CED 3.6)", items: [
        "Differentiate each side with respect to x. Constants differentiate to zero.",
        "Collect all terms containing $y'$ on one side, factor out $y'$, and divide.",
        "Do not treat y as constant; y depends on x along the curve.",
      ] },
      { kind: "list", title: "Family B — Tangent line at a specified point", items: [
        "Confirm the given point lies on the curve when appropriate.",
        "Substitute the point into the expression for $dy/dx$ to obtain a slope.",
        "Use $y-b=m(x-a)$ for a finite tangent slope.",
      ] },
      { kind: "list", title: "Family C — Horizontal and vertical tangents", items: [
        "For $y'=-F_x/F_y$ at a regular point of $F(x,y)=0$, horizontal tangency typically requires $F_x=0$ and $F_y\\ne0$.",
        "Vertical tangency typically requires $F_y=0$ and $F_x\\ne0$ at a regular point.",
        "If both partial-derivative expressions vanish, the slope test is inconclusive; analyze the relation locally.",
      ] },
      { kind: "list", title: "Family D — Mixed differentiation rules", items: [
        "Differentiate $xy^2$ using Product Rule: $y^2+2xyy'$.",
        "Differentiate $\\cos(xy)$ as $-\\sin(xy)(y+xy')$.",
        "Differentiate $\\ln y$ as $y'/y$ where $y>0$.",
      ] },
      { kind: "list", title: "Family E — Second derivative", items: [
        "First obtain $y'$ implicitly, then differentiate that expression again.",
        "Apply Product/Quotient/Chain Rules and substitute the first derivative where needed.",
        "For a requested value of $y''$, evaluate using both coordinates of the point.",
      ] },
    ] },
    { id: "examples", title: "Worked Examples", blocks: [
      { kind: "example", title: "Circle: slope and tangent", problem: "For $x^2+y^2=25$, find the tangent line at $(3,4)$.", steps: [
        { label: "Differentiate both sides", body: "$2x+2yy'=0$." },
        { label: "Isolate the derivative", body: "$y'=-x/y$ where $y\\ne0$." },
        { label: "Evaluate the slope", body: "At $(3,4)$, $m=-3/4$." },
        { label: "Write the line", body: "$y-4=-\\frac34(x-3)$." },
      ], conclusion: "The tangent line is $y-4=-\\frac34(x-3)$." },
      { kind: "example", title: "Product Rule inside an implicit relation", problem: "Find $dy/dx$ if $xy+y^2=7$.", steps: [
        { label: "Differentiate the product", body: "$(xy)'=y+xy'$." },
        { label: "Differentiate the y-power", body: "$(y^2)'=2yy'$." },
        { label: "Collect derivative terms", body: "$y+(x+2y)y'=0$." },
        { label: "Solve", body: "$y'=-y/(x+2y)$ whenever $x+2y\\ne0$." },
      ], conclusion: "$\\displaystyle\\frac{dy}{dx}=-\\frac{y}{x+2y}$." },
      { kind: "example", title: "Nested Chain Rule", problem: "Find $dy/dx$ if $\\sin y=x^2$.", steps: [
        { label: "Differentiate both sides", body: "$\\cos y\\,y'=2x$." },
        { label: "Isolate y'", body: "$y'=2x/\\cos y$ where $\\cos y\\ne0$." },
      ], conclusion: "$\\displaystyle\\frac{dy}{dx}=\\frac{2x}{\\cos y}$ at points where $\\cos y\\ne0$." },
      { kind: "example", title: "Second derivative of a circle", problem: "Find $y''$ for $x^2+y^2=25$ at $(3,4)$.", steps: [
        { label: "Start with first derivative", body: "$y'=-x/y$." },
        { label: "Differentiate using Quotient Rule", body: "$y''=-(y-xy')/y^2$." },
        { label: "Substitute y'", body: "$y''=-(y+x^2/y)/y^2=-(x^2+y^2)/y^3$." },
        { label: "Use the relation", body: "$y''=-25/y^3$, so at $(3,4)$ it is $-25/64$." },
      ], conclusion: "$y''(3,4)=-25/64$ (notation means the value at the specified point on the curve)." },
    ] },
    { id: "mcq-frq", title: "MCQ & FRQ Strategy", blocks: [
      { kind: "callout", tone: "info", title: "MCQ: find the missing y' factors", items: [
        "Check whether every differentiated y-expression contributes a factor of $y'$.",
        "Product terms such as $xy$ require two derivative terms, not just $xy'$.",
        "For tangent slopes, substitute the x- and y-coordinates; do not assume the derivative depends on x alone.",
        "When the denominator of a slope expression is zero, do not automatically label it a vertical tangent without checking the curve.",
      ] },
      { kind: "callout", tone: "rule", title: "FRQ: display the derivative equation", items: [
        "Show the differentiated equation before isolating $y'$; this makes Chain and Product Rule work visible.",
        "State the slope at the specified point and then write the tangent-line equation.",
        "For a second derivative, show the second differentiation and substitution clearly.",
        "If the problem requests justification of a horizontal or vertical tangent, identify the relevant slope behavior and verify the point lies on the relation.",
      ] },
    ] },
    { id: "errors", title: "Common Mistakes — Detect & Prevent", blocks: [
      { kind: "table", columns: ["Mistake", "Why it fails", "Prevention"], rows: [
        ["$(y^3)'=3y^2$", "Missing the derivative of y with respect to x.", "Write $3y^2y'$."],
        ["$(xy)'=xy'$", "Differentiates only one factor.", "Use $y+xy'$."],
        ["Substitute only the x-coordinate", "Implicit slope generally depends on both x and y.", "Use the full point $(a,b)$."],
        ["Treat a zero denominator as proof of a vertical tangent", "A singular point can behave differently.", "Check the numerator and the curve locally."],
        ["Solve for y before every problem", "May be impossible or unnecessarily complicated.", "Differentiate the relation directly."],
        ["Differentiate $y'$ as zero", "$y'$ varies along the curve.", "Use $y''$ when differentiating $y'$."],
      ] },
    ] },
    { id: "quick-reference", title: "Exam-Day Quick Reference", blocks: [
      { kind: "list", ordered: true, title: "Recognize → Differentiate → Isolate → Evaluate", items: [
        "Identify the implicit relation and the point or slope being requested.",
        "Differentiate both sides with respect to x, inserting $y'$ after y-dependent expressions.",
        "Use Product and Chain Rules wherever necessary; collect and solve for $y'$.",
        "Evaluate at the full point and check denominator/domain conditions.",
      ] },
      { kind: "checklist", title: "Can you do this?", items: [
        "Differentiate powers, products, and compositions involving y.",
        "Find tangent slopes and tangent-line equations on implicit curves.",
        "Determine candidates for horizontal or vertical tangency with appropriate checks.",
        "Differentiate again to obtain $y''$ when required.",
        "Explain why the derivative may fail to be finite at certain points.",
      ] },
    ] },
  ],
};
