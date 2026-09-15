import type { TopicGuide } from "@/lib/navigator-guides";

/** Student-facing Unit 2 guides. Mirrors the Unit 1 Navigator structure:
 * recognition → decision → execution → verification, with MCQ/FRQ strategy.
 */

const definitionOfDerivative: TopicGuide = {
  sections: [
    {
      id: "core-idea",
      title: "The Core Idea: Average Rate → Instantaneous Rate",
      blocks: [
        { kind: "prose", text: "A derivative is an instantaneous rate of change. The limit definition starts with an average rate of change over a tiny interval and lets that interval shrink to zero." },
        { kind: "formula", label: "Derivative at x = a", tex: "f'(a)=\\lim_{h\\to0}\\frac{f(a+h)-f(a)}{h}=\\lim_{x\\to a}\\frac{f(x)-f(a)}{x-a}" },
        { kind: "callout", tone: "rule", title: "Master recognition rule", body: "Difference quotient + shrinking interval → derivative. Geometrically: secant slope → tangent slope." },
      ],
    },
    {
      id: "recognition",
      title: "When You See This → Think This",
      blocks: [{ kind: "table", columns: ["If you see…", "Think…", "First move…"], rows: [
        ["$\\lim_{h\\to0}\\frac{f(a+h)-f(a)}h$", "Derivative at $a$", "Recognize it as $f'(a)$ before doing algebra."],
        ["$\\lim_{x\\to a}\\frac{f(x)-f(a)}{x-a}$", "Derivative at $a$", "Match numerator change in output with denominator change in input."],
        ["Average rate on $[a,b]$", "Secant slope", "Compute $\\frac{f(b)-f(a)}{b-a}$."],
        ["Slope of tangent line at $x=a$", "$f'(a)$", "Find or estimate the derivative at that input."],
        ["Table near $x=a$", "Estimate instantaneous rate", "Use nearby secant slopes, preferably bracketing $a$."],
        ["Units of $f$ and $x$", "Derivative units", "Use output-units per input-unit."],
      ] }],
    },
    {
      id: "strategy",
      title: "Strategy Flowchart",
      blocks: [{ kind: "tree", start: "ask", nodes: [
        { id: "ask", prompt: "What is the prompt asking for?", options: [
          { label: "Average rate of change", outcome: "Use secant slope: $[f(b)-f(a)]/(b-a)$." },
          { label: "Instantaneous rate / tangent slope", next: "given" },
          { label: "Recognize a limit", outcome: "Match the limit to a derivative definition and identify the point." },
        ]},
        { id: "given", prompt: "How is the function represented?", options: [
          { label: "Formula", outcome: "Use the derivative definition if requested; otherwise identify the derivative value needed." },
          { label: "Graph", outcome: "Estimate the tangent slope from rise/run near the point." },
          { label: "Table", outcome: "Estimate with nearby secant slopes; use values on both sides when available." },
        ]},
      ] }],
    },
    {
      id: "question-families",
      title: "Question Families You Must Recognize",
      blocks: [
        { kind: "list", title: "Family A — Average rate", items: ["Given two endpoints, compute the secant slope.", "In context, interpret it as average change in the output per one unit of input."] },
        { kind: "list", title: "Family B — Recognize a derivative from a limit", items: ["Identify the center point $a$.", "Match the numerator to change in function value and denominator to change in input.", "Do not expand a complicated limit if recognition answers the question."] },
        { kind: "list", title: "Family C — Tangent slope", items: ["Translate ‘slope of the tangent’ or ‘instantaneous rate’ directly to $f'(a)$.", "If a tangent-line equation is requested, use point-slope form after finding $f'(a)$."] },
        { kind: "list", title: "Family D — Numerical / graphical estimate", items: ["Use local behavior, not distant points.", "From a table, nearby slopes on opposite sides of $a$ often give the best estimate."] },
      ],
    },
    {
      id: "examples",
      title: "Worked Examples",
      blocks: [
        { kind: "example", title: "Recognize before calculating", problem: "If $f(3)=7$, what does $\\displaystyle\\lim_{x\\to3}\\frac{f(x)-7}{x-3}$ represent?", steps: [
          { label: "Match the numerator", body: "$f(x)-7=f(x)-f(3)$." },
          { label: "Match the denominator", body: "$x-3$ measures the input change from 3." },
        ], conclusion: "The limit is $f'(3)$, the slope of the tangent to $y=f(x)$ at $x=3$." },
        { kind: "example", title: "Contextual interpretation", problem: "$P(t)$ is population in bacteria and $P'(4)=120$. Interpret the value.", steps: [
          { label: "Identify units", body: "$P'$ has units bacteria per unit of time." },
          { label: "State instantaneous meaning", body: "At $t=4$, the population is increasing at an instantaneous rate of 120 bacteria per unit of time." },
        ], conclusion: "Include time, direction, rate, and units." },
      ],
    },
    {
      id: "mcq-frq",
      title: "MCQ & FRQ Strategy",
      blocks: [
        { kind: "callout", tone: "info", title: "MCQ", items: ["Recognition can be faster than computation: first ask whether the expression is already a derivative definition.", "Check the point carefully; distractors often use the wrong center value or reverse subtraction.", "For graph/table estimates, eliminate slopes with impossible sign or magnitude before calculating."] },
        { kind: "callout", tone: "rule", title: "FRQ", items: ["Show the correct difference quotient when the definition is requested.", "For contextual interpretations, state what quantity is changing, when, in what direction, and with what units.", "For tangent lines, connect the slope explicitly to $f'(a)$ and use the point $(a,f(a))$."] },
      ],
    },
    {
      id: "errors",
      title: "Common Mistakes — Detect & Prevent",
      blocks: [{ kind: "table", columns: ["Mistake", "Why it fails", "Prevention"], rows: [
        ["Using $f(a)/a$", "A derivative is a rate of change, not a ratio of coordinates.", "Look for change in output divided by change in input."],
        ["Confusing secant and tangent slopes", "Average and instantaneous rates are different.", "Ask whether the interval has positive width or is shrinking to a point."],
        ["Reversing only one subtraction", "That flips the slope sign.", "Keep numerator and denominator subtraction orders consistent."],
        ["Ignoring units", "A contextual rate is incomplete without meaning.", "Output units / input units."],
      ] }],
    },
    {
      id: "quick-reference",
      title: "Exam-Day Quick Reference",
      blocks: [
        { kind: "list", ordered: true, title: "Recognize → Think → Do → Check", items: ["Recognize: average rate, instantaneous rate, tangent slope, derivative-definition limit, graph/table estimate.", "Think: secant or tangent? What point? What representation?", "Do: choose the matching formula or local estimate.", "Check: sign, point, notation, and units."] },
        { kind: "checklist", title: "Can you do this?", items: ["Recognize both standard derivative definitions instantly.", "Move between average rate, instantaneous rate, and tangent slope.", "Estimate $f'(a)$ from a graph or table.", "Interpret a derivative in context with correct units.", "Write a tangent-line equation from $f(a)$ and $f'(a)$."] },
      ],
    },
  ],
};

const basicDerivativeRules: TopicGuide = {
  sections: [
    {
      id: "core-idea",
      title: "The Core Idea: Differentiate Structure, Not Appearance",
      blocks: [
        { kind: "prose", text: "Once a function is built from powers, constants, sums, differences, and constant multiples, differentiation becomes a structure-recognition problem. Identify the pieces, apply the matching rule, then simplify." },
        { kind: "formula", label: "Power Rule", tex: "\\frac{d}{dx}(x^n)=nx^{n-1}" },
        { kind: "formula", label: "Linearity", tex: "\\frac{d}{dx}[cf(x)]=cf'(x),\\qquad \\frac{d}{dx}[f(x)\\pm g(x)]=f'(x)\\pm g'(x)" },
        { kind: "callout", tone: "rule", title: "Master recognition rule", body: "Rewrite powers cleanly → differentiate term-by-term → simplify → verify the form." },
      ],
    },
    {
      id: "recognition",
      title: "When You See This → Think This",
      blocks: [{ kind: "table", columns: ["If you see…", "Think…", "First move…"], rows: [
        ["$x^n$", "Power Rule", "Multiply by $n$, then subtract 1 from the exponent."],
        ["Constant $c$", "Constant Rule", "Derivative is 0."],
        ["$cf(x)$", "Constant Multiple Rule", "Keep $c$; differentiate $f$."],
        ["$f(x)\\pm g(x)$", "Sum / Difference Rule", "Differentiate each term separately."],
        ["$1/x^m$ or $\\sqrt[r]{x^m}$", "Power Rule after rewriting", "Rewrite as $x^{-m}$ or $x^{m/r}$."],
        ["Expanded polynomial", "Term-by-term differentiation", "Apply power/constant rules to every term."],
        ["Expression that can simplify first", "Simplify before choosing a heavier rule", "Cancel or rewrite algebraically if valid, then differentiate."],
      ] }],
    },
    {
      id: "strategy",
      title: "Strategy Flowchart",
      blocks: [{ kind: "tree", start: "shape", nodes: [
        { id: "shape", prompt: "What is the outer algebraic structure?", options: [
          { label: "Single power / reciprocal / root", outcome: "Rewrite as $x^n$ if needed, then use the Power Rule." },
          { label: "Sum or difference", outcome: "Differentiate term-by-term." },
          { label: "Constant multiple", outcome: "Pull the constant through the derivative." },
          { label: "Actual product or quotient of variable functions", outcome: "Stop: that belongs to Product & Quotient Rules unless algebra simplifies it first." },
        ]},
      ] }],
    },
    {
      id: "question-families",
      title: "Question Families You Must Recognize",
      blocks: [
        { kind: "list", title: "Family A — Direct symbolic derivative", items: ["Polynomial or power function → differentiate term-by-term.", "Roots and reciprocals → rewrite with fractional/negative exponents first."] },
        { kind: "list", title: "Family B — Evaluate $f'(a)$", items: ["Find the derivative function first unless derivative data are already supplied.", "Substitute the requested input only after differentiating."] },
        { kind: "list", title: "Family C — Derivative data", items: ["If values such as $f'(a)$ and $g'(a)$ are given, use linearity directly.", "Do not invent formulas for $f$ or $g$." ] },
        { kind: "list", title: "Family D — Simplify first", items: ["An expression that looks like a quotient may reduce to powers.", "Use the simplest valid structure; do not force a more complicated rule."] },
      ],
    },
    {
      id: "examples",
      title: "Worked Examples",
      blocks: [
        { kind: "example", title: "Negative and fractional powers", problem: "Differentiate $f(x)=3\\sqrt{x}-\\frac{4}{x^2}+7$.", steps: [
          { label: "Rewrite", body: "$f(x)=3x^{1/2}-4x^{-2}+7$." },
          { label: "Differentiate term-by-term", body: "$f'(x)=\\frac32x^{-1/2}+8x^{-3}$." },
          { label: "Optional cleanup", body: "$f'(x)=\\frac{3}{2\\sqrt{x}}+\\frac{8}{x^3}$." },
        ], conclusion: "Rewrite first when roots or reciprocals hide powers." },
        { kind: "example", title: "Use derivative data directly", problem: "If $f'(2)=5$ and $g'(2)=-3$, find $h'(2)$ for $h(x)=4f(x)-2g(x)+9$.", steps: [
          { label: "Differentiate structurally", body: "$h'(x)=4f'(x)-2g'(x)$." },
          { label: "Use the given values", body: "$h'(2)=4(5)-2(-3)=26$." },
        ], conclusion: "$h'(2)=26$." },
      ],
    },
    {
      id: "mcq-frq",
      title: "MCQ & FRQ Strategy",
      blocks: [
        { kind: "callout", tone: "info", title: "MCQ", items: ["Scan the structure before calculating; many distractors encode one missed exponent, sign, or constant.", "Rewrite roots/reciprocals immediately.", "Check whether simplification avoids Product/Quotient Rule work.", "Use answer-choice structure to catch impossible exponents or leftover constants."] },
        { kind: "callout", tone: "rule", title: "FRQ", items: ["Show a derivative expression that makes your rule use clear when work is required.", "If the derivative is used later in a tangent-line or contextual part, preserve exact values until the final step.", "Attach units and interpretation when the derivative represents a rate in context."] },
      ],
    },
    {
      id: "errors",
      title: "Common Mistakes — Detect & Prevent",
      blocks: [{ kind: "table", columns: ["Mistake", "Detection", "Prevention"], rows: [
        ["Forgetting to lower the exponent", "Derivative still has exponent $n$.", "Power Rule always changes $x^n$ to $nx^{n-1}$."],
        ["Differentiating a constant to 1", "A standalone number remains.", "Constant derivative = 0."],
        ["Dropping a coefficient", "Scale changed unexpectedly.", "Keep constant multiples attached."],
        ["Mishandling negative exponents", "Sign/exponent seems inconsistent.", "Write $n-1$ explicitly before simplifying."],
        ["Using Product Rule on $3x^5$", "One factor is only a constant.", "Use constant multiple + Power Rule."],
      ] }],
    },
    {
      id: "quick-reference",
      title: "Exam-Day Quick Reference",
      blocks: [
        { kind: "list", ordered: true, title: "Recognize → Rewrite → Differentiate → Check", items: ["Recognize the algebraic structure.", "Rewrite radicals and reciprocals as powers.", "Differentiate term-by-term using power, constant, sum/difference, and constant-multiple rules.", "Check coefficients, exponents, signs, and whether a constant vanished."] },
        { kind: "checklist", title: "Can you do this?", items: ["Differentiate integer, negative, and fractional powers.", "Apply constant, sum, difference, and constant-multiple rules automatically.", "Use supplied derivative values without reconstructing functions.", "Recognize when simplification is faster than a product/quotient rule.", "Evaluate $f'(a)$ only after forming the correct derivative."] },
      ],
    },
  ],
};

const productQuotientRules: TopicGuide = {
  sections: [
    {
      id: "core-idea",
      title: "The Core Idea: Both Factors Change",
      blocks: [
        { kind: "prose", text: "When two variable-dependent functions are multiplied or divided, you cannot differentiate the pieces independently. The derivative must account for how both pieces change." },
        { kind: "formula", label: "Product Rule", tex: "(fg)'=f'g+fg'" },
        { kind: "formula", label: "Quotient Rule", tex: "\\left(\\frac{f}{g}\\right)'=\\frac{f'g-fg'}{g^2}" },
        { kind: "callout", tone: "rule", title: "Master recognition rule", body: "Two variable functions multiplied → Product Rule. One variable function divided by another → Quotient Rule. But simplify first if the structure collapses cleanly." },
      ],
    },
    {
      id: "recognition",
      title: "When You See This → Think This",
      blocks: [{ kind: "table", columns: ["If you see…", "Think…", "First move…"], rows: [
        ["$f(x)g(x)$", "Product Rule", "Label the two factors before differentiating."],
        ["$f(x)/g(x)$", "Quotient Rule", "Identify numerator and denominator; square the original denominator."],
        ["Table gives $f(a),g(a),f'(a),g'(a)$", "Rule + data substitution", "Write the symbolic rule first, then plug values."],
        ["Graph gives function values and tangent slopes", "Read values and derivatives from the graph", "Extract $f(a),g(a),f'(a),g'(a)$ before calculating."],
        ["$x^2(x^3+1)$", "Product Rule OR simplify", "Ask whether expansion makes the derivative easier."],
        ["$x^5/x^2$", "Simplify first", "Rewrite as $x^3$ where the original expression is defined."],
      ] }],
    },
    {
      id: "strategy",
      title: "Strategy Flowchart",
      blocks: [{ kind: "tree", start: "structure", nodes: [
        { id: "structure", prompt: "What structure is actually present?", options: [
          { label: "Product of two variable functions", next: "product" },
          { label: "Quotient of two variable functions", next: "quotient" },
          { label: "Can simplify to powers first", outcome: "Simplify, then use basic derivative rules." },
        ]},
        { id: "product", prompt: "Product Rule", options: [{ label: "Execute", outcome: "Differentiate first × leave second + leave first × differentiate second." }]},
        { id: "quotient", prompt: "Quotient Rule", options: [{ label: "Execute", outcome: "Numerator: $f'g-fg'$. Denominator: original $g^2$." }]},
      ] }],
    },
    {
      id: "question-families",
      title: "Question Families You Must Recognize",
      blocks: [
        { kind: "list", title: "Family A — Direct symbolic product", items: ["Differentiate each factor separately inside the Product Rule.", "Do not multiply $f'$ and $g'$ together."] },
        { kind: "list", title: "Family B — Direct symbolic quotient", items: ["Keep numerator order consistent: $f'g-fg'$.", "The denominator is $[g(x)]^2$, not $g'(x)^2$."] },
        { kind: "list", title: "Family C — Table / graph data", items: ["The rule needs function values AND derivative values.", "Organize the four required numbers before substitution."] },
        { kind: "list", title: "Family D — Mixed / hidden structure", items: ["A product or quotient may appear inside a tangent-slope, rate, or later application question.", "Classify the derivative structure before thinking about the larger context."] },
      ],
    },
    {
      id: "examples",
      title: "Worked Examples",
      blocks: [
        { kind: "example", title: "Product from table data", problem: "Let $h(x)=f(x)g(x)$. At $x=2$, $f=3$, $f'=-1$, $g=5$, and $g'=4$. Find $h'(2)$.", steps: [
          { label: "Write the rule first", body: "$h'=f'g+fg'$." },
          { label: "Substitute by role", body: "$h'(2)=(-1)(5)+(3)(4)=7$." },
        ], conclusion: "$h'(2)=7$." },
        { kind: "example", title: "Quotient from derivative data", problem: "Let $q(x)=f(x)/g(x)$. At $x=a$, $f=6$, $f'=2$, $g=3$, and $g'=-1$. Find $q'(a)$.", steps: [
          { label: "Write the structure", body: "$q'=\\frac{f'g-fg'}{g^2}$." },
          { label: "Substitute", body: "$q'(a)=\\frac{(2)(3)-(6)(-1)}{3^2}=\\frac{12}{9}=\\frac43$." },
        ], conclusion: "$q'(a)=\\frac43$." },
      ],
    },
    {
      id: "mcq-frq",
      title: "MCQ & FRQ Strategy",
      blocks: [
        { kind: "callout", tone: "info", title: "MCQ", items: ["Before doing arithmetic, write the rule skeleton; this prevents most sign/order errors.", "For table questions, map each number to $f,g,f',g'$ rather than substituting while reading.", "Eliminate the classic distractor $f'g'$ for products and $(f'/g')$ for quotients.", "Check whether algebraic simplification makes the formal rule unnecessary."] },
        { kind: "callout", tone: "rule", title: "FRQ", items: ["Write the product/quotient-rule setup before numerical substitution when justification of work matters.", "If the derivative feeds a tangent-line or interpretation part, keep the exact derivative value available.", "For contextual quotients, interpret the resulting derivative with the quotient's units per input-unit."] },
      ],
    },
    {
      id: "errors",
      title: "Common Mistakes — Detect & Prevent",
      blocks: [{ kind: "table", columns: ["Mistake", "Why it fails", "Prevention"], rows: [
        ["$(fg)'=f'g'$", "It ignores the cross-effects of each changing factor.", "Memorize the structure $f'g+fg'$."],
        ["$(f/g)'=f'/g'$", "Differentiation does not distribute over division.", "Write the Quotient Rule skeleton first."],
        ["Reversing the quotient numerator", "It changes the sign.", "Keep one fixed order: $f'g-fg'$."],
        ["Squaring $g'$", "The denominator is the original denominator squared.", "Copy $g$ first, then square it."],
        ["Using only derivative values", "Both rules also require original function values.", "Make a four-value checklist: $f,g,f',g'$."],
      ] }],
    },
    {
      id: "quick-reference",
      title: "Exam-Day Quick Reference",
      blocks: [
        { kind: "list", ordered: true, title: "Recognize → Label → Rule → Substitute → Check", items: ["Recognize product, quotient, or simplify-first structure.", "Label $f$ and $g$ clearly.", "Write the correct rule skeleton.", "Substitute values only after the structure is correct.", "Check quotient order, denominator square, signs, and whether all required values were used."] },
        { kind: "checklist", title: "Can you do this?", items: ["Recognize genuine products and quotients instantly.", "Choose simplify-first when it is cleaner.", "Apply both rules symbolically.", "Use table/graph values of $f,g,f',g'$ correctly.", "Carry a product/quotient derivative into tangent-line or contextual questions."] },
      ],
    },
  ],
};

export const UNIT2_NAVIGATOR_GUIDES: Record<string, TopicGuide> = {
  "definition-of-the-derivative": definitionOfDerivative,
  "power-rule": basicDerivativeRules,
  "product-and-quotient-rules": productQuotientRules,
};

export function getUnit2TopicGuide(slug: string): TopicGuide | undefined {
  return UNIT2_NAVIGATOR_GUIDES[slug];
}
