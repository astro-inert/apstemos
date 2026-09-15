import type { TopicGuide } from "@/lib/navigator-guides";

/** Student-facing Unit 2 guides. Mirrors the Unit 1 Navigator structure:
 * recognition → decision → execution → verification, with MCQ/FRQ strategy.
 */

const definitionOfDerivative: TopicGuide = {
  sections: [
    { id: "core-idea", title: "The Core Idea: Average Rate → Instantaneous Rate", blocks: [
      { kind: "prose", text: "A derivative is an instantaneous rate of change. The limit definition starts with an average rate of change over a tiny interval and lets that interval shrink to zero." },
      { kind: "formula", label: "Derivative at x = a", tex: "f'(a)=\\lim_{h\\to0}\\frac{f(a+h)-f(a)}{h}=\\lim_{x\\to a}\\frac{f(x)-f(a)}{x-a}" },
      { kind: "callout", tone: "rule", title: "Master recognition rule", body: "Difference quotient + shrinking interval → derivative. Geometrically: secant slope → tangent slope." },
    ]},
    { id: "recognition", title: "When You See This → Think This", blocks: [{ kind: "table", columns: ["If you see…", "Think…", "First move…"], rows: [
      ["$\\lim_{h\\to0}\\frac{f(a+h)-f(a)}h$", "Derivative at $a$", "Recognize it as $f'(a)$ before doing algebra."], ["$\\lim_{x\\to a}\\frac{f(x)-f(a)}{x-a}$", "Derivative at $a$", "Match numerator change in output with denominator change in input."], ["Average rate on $[a,b]$", "Secant slope", "Compute $\\frac{f(b)-f(a)}{b-a}$."], ["Slope of tangent line at $x=a$", "$f'(a)$", "Find or estimate the derivative at that input."], ["Table near $x=a$", "Estimate instantaneous rate", "Use nearby secant slopes, preferably bracketing $a$."], ["Units of $f$ and $x$", "Derivative units", "Use output-units per input-unit."],
    ]}]},
    { id: "strategy", title: "Strategy Flowchart", blocks: [{ kind: "tree", start: "ask", nodes: [
      { id: "ask", prompt: "What is the prompt asking for?", options: [{ label: "Average rate of change", outcome: "Use secant slope: $[f(b)-f(a)]/(b-a)$." }, { label: "Instantaneous rate / tangent slope", next: "given" }, { label: "Recognize a limit", outcome: "Match the limit to a derivative definition and identify the point." }]},
      { id: "given", prompt: "How is the function represented?", options: [{ label: "Formula", outcome: "Use the derivative definition if requested; otherwise identify the derivative value needed." }, { label: "Graph", outcome: "Estimate the tangent slope from rise/run near the point." }, { label: "Table", outcome: "Estimate with nearby secant slopes; use values on both sides when available." }]},
    ]}]},
    { id: "question-families", title: "Question Families You Must Recognize", blocks: [
      { kind: "list", title: "Family A — Average rate", items: ["Given two endpoints, compute the secant slope.", "In context, interpret it as average change in the output per one unit of input."] },
      { kind: "list", title: "Family B — Recognize a derivative from a limit", items: ["Identify the center point $a$.", "Match the numerator to change in function value and denominator to change in input.", "Do not expand a complicated limit if recognition answers the question."] },
      { kind: "list", title: "Family C — Tangent slope", items: ["Translate ‘slope of the tangent’ or ‘instantaneous rate’ directly to $f'(a)$.", "If a tangent-line equation is requested, use point-slope form after finding $f'(a)$."] },
      { kind: "list", title: "Family D — Numerical / graphical estimate", items: ["Use local behavior, not distant points.", "From a table, nearby slopes on opposite sides of $a$ often give the best estimate."] },
    ]},
    { id: "examples", title: "Worked Examples", blocks: [
      { kind: "example", title: "Recognize before calculating", problem: "If $f(3)=7$, what does $\\displaystyle\\lim_{x\\to3}\\frac{f(x)-7}{x-3}$ represent?", steps: [{ label: "Match the numerator", body: "$f(x)-7=f(x)-f(3)$." }, { label: "Match the denominator", body: "$x-3$ measures the input change from 3." }], conclusion: "The limit is $f'(3)$, the slope of the tangent to $y=f(x)$ at $x=3$." },
      { kind: "example", title: "Contextual interpretation", problem: "$P(t)$ is population in bacteria and $P'(4)=120$. Interpret the value.", steps: [{ label: "Identify units", body: "$P'$ has units bacteria per unit of time." }, { label: "State instantaneous meaning", body: "At $t=4$, the population is increasing at an instantaneous rate of 120 bacteria per unit of time." }], conclusion: "Include time, direction, rate, and units." },
    ]},
    { id: "mcq-frq", title: "MCQ & FRQ Strategy", blocks: [
      { kind: "callout", tone: "info", title: "MCQ", items: ["Recognition can be faster than computation: first ask whether the expression is already a derivative definition.", "Check the point carefully; distractors often use the wrong center value or reverse subtraction.", "For graph/table estimates, eliminate slopes with impossible sign or magnitude before calculating."] },
      { kind: "callout", tone: "rule", title: "FRQ", items: ["Show the correct difference quotient when the definition is requested.", "For contextual interpretations, state what quantity is changing, when, in what direction, and with what units.", "For tangent lines, connect the slope explicitly to $f'(a)$ and use the point $(a,f(a))$."] },
    ]},
    { id: "errors", title: "Common Mistakes — Detect & Prevent", blocks: [{ kind: "table", columns: ["Mistake", "Why it fails", "Prevention"], rows: [
      ["Using $f(a)/a$", "A derivative is a rate of change, not a ratio of coordinates.", "Look for change in output divided by change in input."], ["Confusing secant and tangent slopes", "Average and instantaneous rates are different.", "Ask whether the interval has positive width or is shrinking to a point."], ["Reversing only one subtraction", "That flips the slope sign.", "Keep numerator and denominator subtraction orders consistent."], ["Ignoring units", "A contextual rate is incomplete without meaning.", "Output units / input units."],
    ]}]},
    { id: "quick-reference", title: "Exam-Day Quick Reference", blocks: [
      { kind: "list", ordered: true, title: "Recognize → Think → Do → Check", items: ["Recognize: average rate, instantaneous rate, tangent slope, derivative-definition limit, graph/table estimate.", "Think: secant or tangent? What point? What representation?", "Do: choose the matching formula or local estimate.", "Check: sign, point, notation, and units."] },
      { kind: "checklist", title: "Can you do this?", items: ["Recognize both standard derivative definitions instantly.", "Move between average rate, instantaneous rate, and tangent slope.", "Estimate $f'(a)$ from a graph or table.", "Interpret a derivative in context with correct units.", "Write a tangent-line equation from $f(a)$ and $f'(a)$."] },
    ]},
  ],
};

const basicDerivativeRules: TopicGuide = {
  sections: [
    { id: "core-idea", title: "The Core Idea: Differentiate Structure, Not Appearance", blocks: [
      { kind: "prose", text: "Once a function is built from powers, constants, sums, differences, and constant multiples, differentiation becomes a structure-recognition problem. Identify the pieces, apply the matching rule, then simplify." },
      { kind: "formula", label: "Power Rule", tex: "\\frac{d}{dx}(x^n)=nx^{n-1}" }, { kind: "formula", label: "Linearity", tex: "\\frac{d}{dx}[cf(x)]=cf'(x),\\qquad \\frac{d}{dx}[f(x)\\pm g(x)]=f'(x)\\pm g'(x)" },
      { kind: "callout", tone: "rule", title: "Master recognition rule", body: "Rewrite powers cleanly → differentiate term-by-term → simplify → verify the form." },
    ]},
    { id: "recognition", title: "When You See This → Think This", blocks: [{ kind: "table", columns: ["If you see…", "Think…", "First move…"], rows: [
      ["$x^n$", "Power Rule", "Multiply by $n$, then subtract 1 from the exponent."], ["Constant $c$", "Constant Rule", "Derivative is 0."], ["$cf(x)$", "Constant Multiple Rule", "Keep $c$; differentiate $f$."], ["$f(x)\\pm g(x)$", "Sum / Difference Rule", "Differentiate each term separately."], ["$1/x^m$ or $\\sqrt[r]{x^m}$", "Power Rule after rewriting", "Rewrite as $x^{-m}$ or $x^{m/r}$."], ["Expanded polynomial", "Term-by-term differentiation", "Apply power/constant rules to every term."], ["Expression that can simplify first", "Simplify before choosing a heavier rule", "Cancel or rewrite algebraically if valid, then differentiate."],
    ]}]},
    { id: "strategy", title: "Strategy Flowchart", blocks: [{ kind: "tree", start: "shape", nodes: [{ id: "shape", prompt: "What is the outer algebraic structure?", options: [{ label: "Single power / reciprocal / root", outcome: "Rewrite as $x^n$ if needed, then use the Power Rule." }, { label: "Sum or difference", outcome: "Differentiate term-by-term." }, { label: "Constant multiple", outcome: "Pull the constant through the derivative." }, { label: "Actual product or quotient of variable functions", outcome: "Stop: that belongs to Product & Quotient Rules unless algebra simplifies it first." }]}]}]},
    { id: "question-families", title: "Question Families You Must Recognize", blocks: [
      { kind: "list", title: "Family A — Direct symbolic derivative", items: ["Polynomial or power function → differentiate term-by-term.", "Roots and reciprocals → rewrite with fractional/negative exponents first."] }, { kind: "list", title: "Family B — Evaluate $f'(a)$", items: ["Find the derivative function first unless derivative data are already supplied.", "Substitute the requested input only after differentiating."] }, { kind: "list", title: "Family C — Derivative data", items: ["If values such as $f'(a)$ and $g'(a)$ are given, use linearity directly.", "Do not invent formulas for $f$ or $g$."] }, { kind: "list", title: "Family D — Simplify first", items: ["An expression that looks like a quotient may reduce to powers.", "Use the simplest valid structure; do not force a more complicated rule."] },
    ]},
    { id: "examples", title: "Worked Examples", blocks: [
      { kind: "example", title: "Negative and fractional powers", problem: "Differentiate $f(x)=3\\sqrt{x}-\\frac{4}{x^2}+7$.", steps: [{ label: "Rewrite", body: "$f(x)=3x^{1/2}-4x^{-2}+7$." }, { label: "Differentiate term-by-term", body: "$f'(x)=\\frac32x^{-1/2}+8x^{-3}$." }, { label: "Optional cleanup", body: "$f'(x)=\\frac{3}{2\\sqrt{x}}+\\frac{8}{x^3}$." }], conclusion: "Rewrite first when roots or reciprocals hide powers." },
      { kind: "example", title: "Use derivative data directly", problem: "If $f'(2)=5$ and $g'(2)=-3$, find $h'(2)$ for $h(x)=4f(x)-2g(x)+9$.", steps: [{ label: "Differentiate structurally", body: "$h'(x)=4f'(x)-2g'(x)$." }, { label: "Use the given values", body: "$h'(2)=4(5)-2(-3)=26$." }], conclusion: "$h'(2)=26$." },
    ]},
    { id: "mcq-frq", title: "MCQ & FRQ Strategy", blocks: [{ kind: "callout", tone: "info", title: "MCQ", items: ["Scan the structure before calculating; many distractors encode one missed exponent, sign, or constant.", "Rewrite roots/reciprocals immediately.", "Check whether simplification avoids Product/Quotient Rule work.", "Use answer-choice structure to catch impossible exponents or leftover constants."] }, { kind: "callout", tone: "rule", title: "FRQ", items: ["Show a derivative expression that makes your rule use clear when work is required.", "If the derivative is used later in a tangent-line or contextual part, preserve exact values until the final step.", "Attach units and interpretation when the derivative represents a rate in context."] }]},
    { id: "errors", title: "Common Mistakes — Detect & Prevent", blocks: [{ kind: "table", columns: ["Mistake", "Detection", "Prevention"], rows: [["Forgetting to lower the exponent", "Derivative still has exponent $n$.", "Power Rule always changes $x^n$ to $nx^{n-1}$."], ["Differentiating a constant to 1", "A standalone number remains.", "Constant derivative = 0."], ["Dropping a coefficient", "Scale changed unexpectedly.", "Keep constant multiples attached."], ["Mishandling negative exponents", "Sign/exponent seems inconsistent.", "Write $n-1$ explicitly before simplifying."], ["Using Product Rule on $3x^5$", "One factor is only a constant.", "Use constant multiple + Power Rule."]]}]},
    { id: "quick-reference", title: "Exam-Day Quick Reference", blocks: [{ kind: "list", ordered: true, title: "Recognize → Rewrite → Differentiate → Check", items: ["Recognize the algebraic structure.", "Rewrite radicals and reciprocals as powers.", "Differentiate term-by-term using power, constant, sum/difference, and constant-multiple rules.", "Check coefficients, exponents, signs, and whether a constant vanished."] }, { kind: "checklist", title: "Can you do this?", items: ["Differentiate integer, negative, and fractional powers.", "Apply constant, sum, difference, and constant-multiple rules automatically.", "Use supplied derivative values without reconstructing functions.", "Recognize when simplification is faster than a product/quotient rule.", "Evaluate $f'(a)$ only after forming the correct derivative."] }]},
  ],
};

const productQuotientRules: TopicGuide = {
  sections: [
    { id: "core-idea", title: "The Core Idea: Both Factors Change", blocks: [{ kind: "prose", text: "When two variable-dependent functions are multiplied or divided, you cannot differentiate the pieces independently. The derivative must account for how both pieces change." }, { kind: "formula", label: "Product Rule", tex: "(fg)'=f'g+fg'" }, { kind: "formula", label: "Quotient Rule", tex: "\\left(\\frac{f}{g}\\right)'=\\frac{f'g-fg'}{g^2}" }, { kind: "callout", tone: "rule", title: "Master recognition rule", body: "Two variable functions multiplied → Product Rule. One variable function divided by another → Quotient Rule. But simplify first if the structure collapses cleanly." }]},
    { id: "recognition", title: "When You See This → Think This", blocks: [{ kind: "table", columns: ["If you see…", "Think…", "First move…"], rows: [["$f(x)g(x)$", "Product Rule", "Label the two factors before differentiating."], ["$f(x)/g(x)$", "Quotient Rule", "Identify numerator and denominator; square the original denominator."], ["Table gives $f(a),g(a),f'(a),g'(a)$", "Rule + data substitution", "Write the symbolic rule first, then plug values."], ["Graph gives function values and tangent slopes", "Read values and derivatives from the graph", "Extract $f(a),g(a),f'(a),g'(a)$ before calculating."], ["$x^2(x^3+1)$", "Product Rule OR simplify", "Ask whether expansion makes the derivative easier."], ["$x^5/x^2$", "Simplify first", "Rewrite as $x^3$ where the original expression is defined."]]}]},
    { id: "strategy", title: "Strategy Flowchart", blocks: [{ kind: "tree", start: "structure", nodes: [{ id: "structure", prompt: "What structure is actually present?", options: [{ label: "Product of two variable functions", next: "product" }, { label: "Quotient of two variable functions", next: "quotient" }, { label: "Can simplify to powers first", outcome: "Simplify, then use basic derivative rules." }]}, { id: "product", prompt: "Product Rule", options: [{ label: "Execute", outcome: "Differentiate first × leave second + leave first × differentiate second." }]}, { id: "quotient", prompt: "Quotient Rule", options: [{ label: "Execute", outcome: "Numerator: $f'g-fg'$. Denominator: original $g^2$." }]}]}]},
    { id: "question-families", title: "Question Families You Must Recognize", blocks: [{ kind: "list", title: "Family A — Direct symbolic product", items: ["Differentiate each factor separately inside the Product Rule.", "Do not multiply $f'$ and $g'$ together."] }, { kind: "list", title: "Family B — Direct symbolic quotient", items: ["Keep numerator order consistent: $f'g-fg'$.", "The denominator is $[g(x)]^2$, not $g'(x)^2$."] }, { kind: "list", title: "Family C — Table / graph data", items: ["The rule needs function values AND derivative values.", "Organize the four required numbers before substitution."] }, { kind: "list", title: "Family D — Mixed / hidden structure", items: ["A product or quotient may appear inside a tangent-slope, rate, or later application question.", "Classify the derivative structure before thinking about the larger context."] }]},
    { id: "examples", title: "Worked Examples", blocks: [{ kind: "example", title: "Product from table data", problem: "Let $h(x)=f(x)g(x)$. At $x=2$, $f=3$, $f'=-1$, $g=5$, and $g'=4$. Find $h'(2)$.", steps: [{ label: "Write the rule first", body: "$h'=f'g+fg'$." }, { label: "Substitute by role", body: "$h'(2)=(-1)(5)+(3)(4)=7$." }], conclusion: "$h'(2)=7$." }, { kind: "example", title: "Quotient from derivative data", problem: "Let $q(x)=f(x)/g(x)$. At $x=a$, $f=6$, $f'=2$, $g=3$, and $g'=-1$. Find $q'(a)$.", steps: [{ label: "Write the structure", body: "$q'=\\frac{f'g-fg'}{g^2}$." }, { label: "Substitute", body: "$q'(a)=\\frac{(2)(3)-(6)(-1)}{3^2}=\\frac{12}{9}=\\frac43$." }], conclusion: "$q'(a)=\\frac43$." }]},
    { id: "mcq-frq", title: "MCQ & FRQ Strategy", blocks: [{ kind: "callout", tone: "info", title: "MCQ", items: ["Before doing arithmetic, write the rule skeleton; this prevents most sign/order errors.", "For table questions, map each number to $f,g,f',g'$ rather than substituting while reading.", "Eliminate the classic distractor $f'g'$ for products and $(f'/g')$ for quotients.", "Check whether algebraic simplification makes the formal rule unnecessary."] }, { kind: "callout", tone: "rule", title: "FRQ", items: ["Write the product/quotient-rule setup before numerical substitution when work is required.", "If the derivative feeds a tangent-line or interpretation part, keep the exact derivative value available.", "For contextual quotients, interpret the resulting derivative with the quotient's units per input-unit."] }]},
    { id: "errors", title: "Common Mistakes — Detect & Prevent", blocks: [{ kind: "table", columns: ["Mistake", "Why it fails", "Prevention"], rows: [["$(fg)'=f'g'$", "It ignores the cross-effects of each changing factor.", "Memorize the structure $f'g+fg'$."], ["$(f/g)'=f'/g'$", "Differentiation does not distribute over division.", "Write the Quotient Rule skeleton first."], ["Reversing the quotient numerator", "It changes the sign.", "Keep one fixed order: $f'g-fg'$."], ["Squaring $g'$", "The denominator is the original denominator squared.", "Copy $g$ first, then square it."], ["Using only derivative values", "Both rules also require original function values.", "Make a four-value checklist: $f,g,f',g'$." ]]}]},
    { id: "quick-reference", title: "Exam-Day Quick Reference", blocks: [{ kind: "list", ordered: true, title: "Recognize → Label → Rule → Substitute → Check", items: ["Recognize product, quotient, or simplify-first structure.", "Label $f$ and $g$ clearly.", "Write the correct rule skeleton.", "Substitute values only after the structure is correct.", "Check quotient order, denominator square, signs, and whether all required values were used."] }, { kind: "checklist", title: "Can you do this?", items: ["Recognize genuine products and quotients instantly.", "Choose simplify-first when it is cleaner.", "Apply both rules symbolically.", "Use table/graph values of $f,g,f',g'$ correctly.", "Carry a product/quotient derivative into tangent-line or contextual questions."] }]},
  ],
};

/* CED 2.7 + 2.10 — Navigator taxonomy combines the elementary trig,
 * exponential, and logarithmic derivative families into one student topic.
 */
const derivativesTrigExpLog: TopicGuide = {
  sections: [
    { id: "core-idea", title: "The Core Idea: Know the Base Function, Then Read the Structure", blocks: [
      { kind: "prose", text: "For these functions, the AP task is usually not to re-derive each rule. It is to recognize the function family instantly, recall its derivative accurately, and combine that fact with the derivative structure already present in the expression." },
      { kind: "formula", label: "Core derivatives", tex: "(\\sin x)'=\\cos x,\\quad(\\cos x)'=-\\sin x,\\quad(e^x)'=e^x,\\quad(\\ln x)'=\\frac1x" },
      { kind: "formula", label: "Remaining trig derivatives", tex: "(\\tan x)'=\\sec^2x,\\quad(\\cot x)'=-\\csc^2x,\\quad(\\sec x)'=\\sec x\\tan x,\\quad(\\csc x)'=-\\csc x\\cot x" },
      { kind: "callout", tone: "rule", title: "Master recognition rule", body: "Identify the function family → recall its exact derivative → preserve signs → combine with any sum, constant-multiple, product, or quotient structure." },
      { kind: "callout", tone: "info", title: "CED scope", body: "This Navigator topic combines CED Topic 2.7 (sine, cosine, $e^x$, $\\ln x$, plus derivative-definition limits involving known derivatives) and Topic 2.10 (tangent, cotangent, secant, cosecant). Composite-function derivatives belong to Unit 3's Chain Rule, not this topic." },
    ]},
    { id: "recognition", title: "When You See This → Think This", blocks: [{ kind: "table", columns: ["If you see…", "Think…", "First move…"], rows: [
      ["$\\sin x$", "Cosine", "Replace it with $\\cos x$."],
      ["$\\cos x$", "Negative sine", "Write the negative sign before anything else: $-\\sin x$."],
      ["$e^x$", "Self-derivative", "Keep $e^x$."],
      ["$\\ln x$", "Reciprocal", "Write $1/x$."],
      ["$\\tan x$", "Secant squared", "Write $\\sec^2x$."],
      ["$\\cot x$", "Negative cosecant squared", "Write $-\\csc^2x$."],
      ["$\\sec x$", "Secant tangent", "Write $\\sec x\\tan x$."],
      ["$\\csc x$", "Negative cosecant cotangent", "Write $-\\csc x\\cot x$."],
      ["Limit that matches the derivative of a familiar function", "Derivative-definition shortcut", "Identify $f$, the point $a$, and evaluate the known $f'(a)$."],
      ["Several familiar functions added/subtracted", "Linearity", "Differentiate each term; protect every negative sign."],
      ["Two variable functions multiplied/divided", "Product / Quotient Rule", "Keep the familiar derivative facts inside the larger rule."],
    ]}]},
    { id: "strategy", title: "Strategy Flowchart", blocks: [{ kind: "tree", start: "outer", nodes: [
      { id: "outer", prompt: "What is the expression actually asking you to differentiate?", options: [
        { label: "One familiar function", next: "family" },
        { label: "Sum / difference / constant multiple", outcome: "Differentiate term-by-term, using the memorized derivative for each familiar function." },
        { label: "Product / quotient", outcome: "Use the Product or Quotient Rule; substitute the correct familiar-function derivatives into it." },
        { label: "A limit", next: "limit" },
      ]},
      { id: "family", prompt: "Which family?", options: [
        { label: "$\\sin,\\cos,e^x,\\ln x$", outcome: "Use the Topic 2.7 derivative fact directly." },
        { label: "$\\tan,\\cot,\\sec,\\csc$", outcome: "Use the Topic 2.10 trig derivative fact directly." },
        { label: "Composite such as $\\sin(x^2)$", outcome: "The inner-function factor requires the Chain Rule — Unit 3." },
      ]},
      { id: "limit", prompt: "Can the limit be written as $[f(a+h)-f(a)]/h$ or $[f(x)-f(a)]/(x-a)$?", options: [
        { label: "Yes", outcome: "Recognize it as $f'(a)$ and use the known derivative of the familiar function." },
        { label: "No", outcome: "Do not force a derivative-definition interpretation; analyze the limit using the appropriate limit method." },
      ]},
    ]}]},
    { id: "question-families", title: "Question Families You Must Recognize", blocks: [
      { kind: "list", title: "Family A — Direct familiar derivative", items: ["Differentiate $\\sin x$, $\\cos x$, $e^x$, $\\ln x$, $\\tan x$, $\\cot x$, $\\sec x$, or $\\csc x$ directly.", "The main difficulty is recall: signs and paired trig functions are common distractor targets."] },
      { kind: "list", title: "Family B — Linear combinations", items: ["Constants, sums, and differences do not change which base derivative rule applies.", "Differentiate every term; a minus sign outside a function must remain attached to the derivative."] },
      { kind: "list", title: "Family C — Familiar derivatives inside Product / Quotient Rule", items: ["Classify the outer structure first.", "Then differentiate each factor using the appropriate familiar-function rule.", "Keep the Quotient Rule numerator order fixed to avoid sign reversal."] },
      { kind: "list", title: "Family D — Limit disguised as a known derivative", items: ["A derivative-definition limit can be evaluated by recognizing the underlying familiar function.", "Identify both the function and the point before evaluating the derivative.", "This is specifically part of the CED 2.7 connection between familiar derivatives and limits."] },
      { kind: "list", title: "Family E — Evaluate a derivative at a point", items: ["Differentiate first, then substitute the requested input.", "Use exact trig values when they are standard; do not decimalize unnecessarily."] },
      { kind: "list", title: "Family F — Tangent-line / instantaneous-rate use", items: ["Once $f'(a)$ is found, it can become a tangent slope or an instantaneous rate.", "For a tangent line, pair the derivative with the original point $(a,f(a))$."] },
    ]},
    { id: "representations", title: "Representation Translation", blocks: [{ kind: "table", columns: ["Representation", "What the AP task becomes"], rows: [
      ["Analytical formula", "Recognize each familiar function and apply the correct derivative rule."],
      ["Limit expression", "Check whether it is the derivative definition of a familiar function at a particular point."],
      ["Graph / tangent line", "Connect the slope at $x=a$ to the value of the derivative you can compute analytically."],
      ["Verbal / contextual", "Translate instantaneous rate or tangent slope into $f'(a)$, then differentiate the model."],
      ["Mixed expression", "Separate outer structure (sum/product/quotient) from the derivative fact for each component."],
    ]}]},
    { id: "examples", title: "Worked Examples", blocks: [
      { kind: "example", title: "Mixed familiar functions", problem: "Differentiate $f(x)=4\\sin x-3\\cos x+2e^x-5\\ln x$.", steps: [
        { label: "Classify", body: "This is a linear combination, so differentiate term-by-term." },
        { label: "Apply the four base facts", body: "$f'(x)=4\\cos x+3\\sin x+2e^x-\\frac5x$." },
        { label: "Check the sign", body: "The derivative of $-3\\cos x$ is $+3\\sin x$ because $(\\cos x)'=-\\sin x$." },
      ], conclusion: "$f'(x)=4\\cos x+3\\sin x+2e^x-5/x$." },
      { kind: "example", title: "Topic 2.10 sign check", problem: "Differentiate $g(x)=2\\tan x-\\cot x+3\\sec x+4\\csc x$.", steps: [
        { label: "Differentiate each trig family", body: "$g'(x)=2\\sec^2x+\\csc^2x+3\\sec x\\tan x-4\\csc x\\cot x$." },
        { label: "Audit the negatives", body: "$(-\\cot x)'=+\\csc^2x$, while $(4\\csc x)'=-4\\csc x\\cot x$." },
      ], conclusion: "The two built-in negative derivative rules are $\\cot$ and $\\csc$; cosine also differentiates to a negative sine." },
      { kind: "example", title: "Derivative-definition limit shortcut", problem: "Evaluate $\\displaystyle\\lim_{h\\to0}\\frac{e^{2+h}-e^2}{h}$.", steps: [
        { label: "Recognize the template", body: "This is $[f(2+h)-f(2)]/h$ for $f(x)=e^x$." },
        { label: "Translate", body: "The limit equals $f'(2)$." },
        { label: "Use the familiar derivative", body: "Since $f'(x)=e^x$, $f'(2)=e^2$." },
      ], conclusion: "The limit is $e^2$; no algebraic expansion is needed." },
      { kind: "example", title: "Product structure + familiar derivatives", problem: "Differentiate $p(x)=x^2\\sin x$.", steps: [
        { label: "Classify the outer structure", body: "This is a product of two variable functions." },
        { label: "Use Product Rule", body: "$p'(x)=2x\\sin x+x^2\\cos x$." },
      ], conclusion: "Do not treat $(x^2\\sin x)'$ as $(2x)(\\cos x)$." },
    ]},
    { id: "mcq-frq", title: "MCQ & FRQ Strategy", blocks: [
      { kind: "callout", tone: "info", title: "MCQ: win on recognition before algebra", items: [
        "Do a sign audit first: $\\cos$, $\\cot$, and $\\csc$ have negative base derivatives; $\\sin$, $\\tan$, $\\sec$, $e^x$, and $\\ln x$ do not.",
        "For a derivative-definition limit, check whether recognition alone gives the value before manipulating the expression.",
        "If answer choices differ by one trig pairing, recall the derivative as a complete chunk: $\\sec\\to\\sec\\tan$ and $\\csc\\to-\\csc\\cot$.",
        "Classify the outer operation before differentiating. A correct base derivative inserted into the wrong Product/Quotient structure is still wrong.",
        "If the input is a standard angle, keep exact values until the end.",
      ]},
      { kind: "callout", tone: "rule", title: "FRQ: make the derivative usable", items: [
        "Write a mathematically clear derivative expression before using it in a tangent-line, rate, or later subpart.",
        "When a derivative value represents a rate, interpret it with the input and output quantities and appropriate units.",
        "When the prompt asks for a tangent line, use $f'(a)$ as the slope and $(a,f(a))$ as the point.",
        "Do not introduce a Chain Rule factor for a non-composite base function; conversely, composite functions require Unit 3 knowledge.",
      ]},
    ]},
    { id: "hidden-applications", title: "Hidden & Mixed Applications", blocks: [
      { kind: "callout", tone: "info", title: "The derivative rule may not be the headline", body: "On an AP question, these derivatives can be one step inside a tangent-line problem, a rate interpretation, a Product/Quotient Rule calculation, or a derivative-definition limit. Ask what derivative value the larger problem needs, then compute only that." },
      { kind: "list", title: "Common disguises", items: [
        "A limit whose numerator is $f(a+h)-f(a)$ for $f=\\sin,\\cos,e^x,$ or $\\ln x$.",
        "A product or quotient where one factor is trig, exponential, or logarithmic.",
        "A tangent-line equation requiring a familiar derivative at a standard input.",
        "A contextual model containing $e^x$ or $\\ln x$ where the final task is to interpret an instantaneous rate.",
      ]},
    ]},
    { id: "errors", title: "Common Mistakes — Detect & Prevent", blocks: [{ kind: "table", columns: ["Mistake", "Why it fails", "Prevention"], rows: [
      ["$(\\cos x)'=\\sin x$", "The cosine derivative has a negative sign.", "Say the pair as one unit: cosine → negative sine."],
      ["$(\\ln x)'=1/\\ln x$", "The logarithm is not copied into its derivative.", "Memorize $\\ln x\\to1/x$."],
      ["$(\\tan x)'=\\sec x$", "The secant must be squared.", "Memorize tangent → secant squared."],
      ["$(\\sec x)'=\\sec^2x$", "That is the tangent derivative.", "Pair secant with secant-tangent."],
      ["Missing the negative on $\\cot$ or $\\csc$", "Both base derivatives are negative.", "Run a sign audit before simplifying."],
      ["Treating $e^x$ like a power", "$e^x$ is exponential, not $x^n$.", "Use the self-derivative fact $e^x\\to e^x$."],
      ["Forcing algebra on a derivative-definition limit", "It wastes time and can create errors when recognition already determines the value.", "Match the derivative template first."],
      ["Applying only base rules to a product/quotient", "The outer operation still controls the derivative structure.", "Classify outer structure before differentiating components."],
      ["Using Chain Rule on $\\sin x$ or $e^x$", "The inner function is just $x$.", "Save Chain Rule for a genuine composite function such as $\\sin(x^2)$."],
    ]}]},
    { id: "connections", title: "Cross-Topic Connections", blocks: [{ kind: "table", columns: ["Related topic", "Connection"], rows: [
      ["Definition of the Derivative", "Known familiar derivatives can turn certain derivative-definition limits into recognition problems."],
      ["Basic Derivative Rules", "Sums, differences, and constant multiples combine directly with these derivative facts."],
      ["Product & Quotient Rules", "Familiar functions frequently appear as factors or numerator/denominator components."],
      ["Chain Rule — Unit 3", "Composite versions such as $e^{g(x)}$, $\\ln(g(x))$, or $\\sin(g(x))$ require an inner derivative factor."],
      ["Tangent lines / rates", "The computed derivative value becomes a slope or instantaneous rate."],
      ["Later analytical applications", "Signs and values of these derivatives feed increasing/decreasing, extrema, and curve-analysis questions."],
    ]}]},
    { id: "quick-reference", title: "Exam-Day Quick Reference", blocks: [
      { kind: "table", columns: ["Function", "Derivative"], rows: [["$\\sin x$", "$\\cos x$"], ["$\\cos x$", "$-\\sin x$"], ["$e^x$", "$e^x$"], ["$\\ln x$", "$1/x$"], ["$\\tan x$", "$\\sec^2x$"], ["$\\cot x$", "$-\\csc^2x$"], ["$\\sec x$", "$\\sec x\\tan x$"], ["$\\csc x$", "$-\\csc x\\cot x$"]]},
      { kind: "list", ordered: true, title: "Recognize → Classify → Differentiate → Use → Check", items: [
        "Recognize the familiar function(s).",
        "Classify the outer structure: single function, linear combination, product, quotient, or derivative-definition limit.",
        "Differentiate using the exact base rule and any required outer rule.",
        "Use the derivative for the requested value, tangent slope, rate, or limit.",
        "Check signs, trig pairings, the evaluation point, and whether a Chain Rule belongs here or in Unit 3.",
      ]},
      { kind: "checklist", title: "Can You Do This?", items: [
        "Recall all eight base derivatives without hesitation.",
        "Differentiate linear combinations of trig, exponential, and logarithmic functions.",
        "Use these derivatives correctly inside Product and Quotient Rules.",
        "Recognize a derivative-definition limit involving a familiar function.",
        "Evaluate familiar derivatives at standard inputs exactly.",
        "Carry a derivative value into a tangent-line or contextual-rate question.",
        "Separate Unit 2 base derivatives from Unit 3 composite-function Chain Rule questions.",
      ]},
      { kind: "callout", tone: "rule", title: "Master rule", body: "Know the base derivative cold. Then let the expression's outer structure tell you what to do with it." },
    ]},
  ],
};

export const UNIT2_NAVIGATOR_GUIDES: Record<string, TopicGuide> = {
  "definition-of-the-derivative": definitionOfDerivative,
  "power-rule": basicDerivativeRules,
  "product-and-quotient-rules": productQuotientRules,
  "derivatives-of-trig-exp-log": derivativesTrigExpLog,
};

export function getUnit2TopicGuide(slug: string): TopicGuide | undefined {
  return UNIT2_NAVIGATOR_GUIDES[slug];
}
