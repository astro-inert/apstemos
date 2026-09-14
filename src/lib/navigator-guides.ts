/**
 * Native Question Type Navigator guide content.
 * Keyed by the existing topic slug inside `question-navigator-data.ts`.
 * All string fields may contain inline `$...$` / block `$$...$$` LaTeX.
 */

export type GuideTreeNode = {
  id: string;
  prompt: string;
  options: Array<{ label: string; next?: string; outcome?: string }>;
};

export type GuideBlock =
  | { kind: "prose"; text: string }
  | { kind: "callout"; tone?: "info" | "warn" | "rule"; title: string; body?: string; items?: string[] }
  | { kind: "formula"; tex: string; label?: string }
  | { kind: "table"; columns: string[]; rows: string[][] }
  | { kind: "list"; ordered?: boolean; title?: string; items: string[] }
  | {
      kind: "example";
      title: string;
      problem: string;
      steps: Array<{ label: string; body?: string }>;
      conclusion?: string;
      note?: string;
    }
  | { kind: "checklist"; title?: string; items: string[] }
  | { kind: "tree"; start: string; nodes: GuideTreeNode[] };

export type GuideSection = { id: string; title: string; blocks: GuideBlock[] };
export type TopicGuide = { sections: GuideSection[] };

/* ------------------------------------------------------------------ */
/* 1.6 · Evaluating Limits Algebraically                              */
/* ------------------------------------------------------------------ */

const evaluatingLimitsAlgebraically: TopicGuide = {
  sections: [
    {
      id: "core-idea",
      title: "The Core Idea: Resolving Indeterminate Forms",
      blocks: [
        {
          kind: "prose",
          text:
            "Evaluating a limit algebraically is the process of rewriting a function to eliminate mathematical ambiguities when direct substitution fails.",
        },
        {
          kind: "callout",
          tone: "info",
          title: "Visual intuition",
          body:
            "Imagine arriving at a road block (a hole in the graph at $x = a$). Direct substitution tells you the road is missing ($\\frac{0}{0}$). Algebraic manipulation does not change the function's values anywhere else, but it creates a seamless blueprint (an equivalent function) that reveals exactly where the missing point was supposed to be.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Formal algebraic principle",
          body: "If $f(x) = g(x)$ for all $x \\neq a$, then $\\lim_{x \\to a} f(x) = \\lim_{x \\to a} g(x)$.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The $\\frac{0}{0}$ indeterminate form rule",
          body:
            "Direct substitution yielding $\\frac{0}{0}$ is a signal that $(x - a)$ is a common factor in both the numerator and denominator. Your goal is to algebraically extract and cancel this factor.",
        },
      ],
    },
    {
      id: "recognition",
      title: "When You See This → Think This",
      blocks: [
        {
          kind: "table",
          columns: ["If you see in the prompt…", "Think…", "First move…"],
          rows: [
            [
              "Polynomial ratio yielding $\\frac{0}{0}$",
              "Factoring",
              "Factor numerator and denominator; cancel the $(x-a)$ factor.",
            ],
            [
              "Radical expression $\\sqrt{g(x)} - c$ yielding $\\frac{0}{0}$",
              "Conjugate multiplication",
              "Multiply numerator and denominator by the conjugate pair $\\sqrt{g(x)} + c$.",
            ],
            [
              "Complex fraction $\\dfrac{\\frac{1}{a+x} - \\frac{1}{a}}{x}$ yielding $\\frac{0}{0}$",
              "Common denominator",
              "Combine fractions in the numerator into a single quotient, then simplify.",
            ],
            [
              "Non-zero constant over zero $\\frac{k}{0}$ ($k \\neq 0$)",
              "Infinite limit / DNE",
              "Check one-sided limits to determine if the expression approaches $+\\infty$, $-\\infty$, or DNE.",
            ],
          ],
        },
      ],
    },
    {
      id: "strategy",
      title: "Strategy Flowchart",
      blocks: [
        {
          kind: "tree",
          start: "sub",
          nodes: [
            {
              id: "sub",
              prompt: "Perform direct substitution: evaluate $f(a)$ for $\\lim_{x \\to a} f(x)$.",
              options: [
                { label: "Real value", outcome: "Result is a real number $L$, so $\\lim_{x \\to a} f(x) = L$." },
                { label: "Undefined", next: "form" },
              ],
            },
            {
              id: "form",
              prompt: "What form does $f(a)$ produce?",
              options: [
                {
                  label: "Form $\\frac{k}{0}$, $k \\neq 0$",
                  outcome: "The limit is $\\pm\\infty$ or DNE — check one-sided behavior to decide which.",
                },
                { label: "Form $\\frac{0}{0}$ (indeterminate)", next: "structure" },
              ],
            },
            {
              id: "structure",
              prompt: "Form $\\frac{0}{0}$: identify the expression structure.",
              options: [
                { label: "Polynomials", outcome: "Factor and cancel $(x - a)$." },
                { label: "Radicals", outcome: "Multiply by the conjugate." },
                { label: "Complex fractions", outcome: "Find a common denominator, then simplify." },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "examples",
      title: "Core Worked Examples",
      blocks: [
        {
          kind: "example",
          title: "Type 1: Rationalization via conjugate",
          problem: "Evaluate $\\displaystyle\\lim_{x \\to 0} \\frac{\\sqrt{x+4}-2}{x}$.",
          steps: [
            {
              label: "Direct substitution test",
              body: "$\\frac{\\sqrt{0+4}-2}{0} = \\frac{2-2}{0} = \\frac{0}{0}$ (indeterminate form).",
            },
            {
              label: "Multiply by the conjugate pair $(\\sqrt{x+4}+2)$",
              body:
                "$\\displaystyle\\lim_{x \\to 0} \\frac{(\\sqrt{x+4}-2)(\\sqrt{x+4}+2)}{x(\\sqrt{x+4}+2)}$",
            },
            {
              label: "Simplify the numerator using $(a-b)(a+b) = a^2 - b^2$",
              body:
                "$\\displaystyle\\lim_{x \\to 0} \\frac{(x+4)-4}{x(\\sqrt{x+4}+2)} = \\lim_{x \\to 0} \\frac{x}{x(\\sqrt{x+4}+2)}$",
            },
            {
              label: "Cancel the common factor $x$ and evaluate",
              body:
                "$\\displaystyle\\lim_{x \\to 0} \\frac{1}{\\sqrt{x+4}+2} = \\frac{1}{\\sqrt{0+4}+2} = \\frac{1}{2+2} = \\frac{1}{4}$",
            },
          ],
          conclusion: "$\\displaystyle\\lim_{x \\to 0} \\frac{\\sqrt{x+4}-2}{x} = \\frac{1}{4}$",
        },
        {
          kind: "example",
          title: "Type 2: Simplifying complex fractions",
          problem: "Evaluate $\\displaystyle\\lim_{x \\to 3} \\frac{\\frac{1}{x} - \\frac{1}{3}}{x-3}$.",
          steps: [
            {
              label: "Direct substitution test",
              body: "$\\frac{\\frac{1}{3}-\\frac{1}{3}}{3-3} = \\frac{0}{0}$ (indeterminate form).",
            },
            {
              label: "Combine numerator fractions over a common denominator $3x$",
              body: "$\\frac{1}{x} - \\frac{1}{3} = \\frac{3-x}{3x}$",
            },
            {
              label: "Rewrite the full complex quotient",
              body:
                "$\\displaystyle\\lim_{x \\to 3} \\frac{\\frac{3-x}{3x}}{x-3} = \\lim_{x \\to 3} \\left( \\frac{3-x}{3x} \\cdot \\frac{1}{x-3} \\right)$",
            },
            {
              label: "Extract the negative sign to match factors and cancel",
              body:
                "Note that $(3-x) = -(x-3)$, so $\\displaystyle\\lim_{x \\to 3} \\left( \\frac{-(x-3)}{3x(x-3)} \\right) = \\lim_{x \\to 3} \\frac{-1}{3x} = \\frac{-1}{3(3)} = -\\frac{1}{9}$",
            },
          ],
          conclusion: "$\\displaystyle\\lim_{x \\to 3} \\frac{\\frac{1}{x}-\\frac{1}{3}}{x-3} = -\\frac{1}{9}$",
        },
      ],
    },
    {
      id: "exam-strategy",
      title: "AP Exam Strategy & Point-Scoring",
      blocks: [
        {
          kind: "list",
          ordered: true,
          title: "The 3-part FRQ credit formula",
          items: [
            "Do NOT write $\\frac{0}{0} = L$ or put \"$\\frac{0}{0}$\" in an equation chain: writing equal signs connected to $\\frac{0}{0}$ is considered a linkage error and loses communication credit.",
            "Show clear algebraic steps: show the explicit factoring, conjugation, or common denominator steps before cancellation.",
            "Maintain limit notation: keep writing $\\lim_{x \\to a}$ in front of every step until direct substitution is actually performed.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Avoid these point-loss traps",
          items: [
            "Trap 1: dropping the $\\lim_{x \\to a}$ operator prematurely before plugging in the target number.",
            "Trap 2: writing $\\frac{0}{0} = 0$ or $\\frac{0}{0} = 1$. $\\frac{0}{0}$ is indeterminate; it has no numeric value until resolved.",
            "Trap 3: forgetting to distribute negative signs when expanding conjugate numerators (for example, failing to distribute across terms inside parentheses).",
          ],
        },
      ],
    },
    {
      id: "quick-reference",
      title: "Algebraic Limits Cheat Sheet",
      blocks: [
        {
          kind: "list",
          title: "Core identity transformations",
          items: [
            "Difference of squares: $a^2 - b^2 = (a-b)(a+b)$",
            "Difference of cubes: $a^3 - b^3 = (a-b)(a^2+ab+b^2)$",
            "Conjugate pair: $(\\sqrt{A}-\\sqrt{B})(\\sqrt{A}+\\sqrt{B}) = A - B$",
          ],
        },
        {
          kind: "list",
          ordered: true,
          title: "Algebraic limit toolkit",
          items: [
            "Always direct substitute first. If you get a number, you are done.",
            "Identify $\\frac{0}{0}$. This guarantees a removable discontinuity exists.",
            "Factor or rationalize. Convert to an equivalent expression $g(x)$.",
            "Direct substitute again. Plug $x = a$ into the simplified expression.",
          ],
        },
        {
          kind: "checklist",
          title: "Final verification checklist",
          items: [
            "Did I check direct substitution before attempting algebra?",
            "Did I keep writing $\\lim_{x \\to a}$ on every line until substitution?",
            "Did I avoid setting any expression explicitly equal to $\\frac{0}{0}$?",
            "Did I verify sign distributions after canceling factors?",
          ],
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* 1.2 · Limits from Graphs and Tables                                */
/* ------------------------------------------------------------------ */

const limitsFromGraphsAndTables: TopicGuide = {
  sections: [
    {
      id: "core-idea",
      title: "The Core Idea: Approaching vs. Being At",
      blocks: [
        {
          kind: "prose",
          text:
            "The central skill of this topic is reading the behavior of $f(x)$ as $x$ approaches a target value $a$ — not merely evaluating $f(a)$.",
        },
        {
          kind: "callout",
          tone: "info",
          title: "Visual & tabular intuition",
          items: [
            "Graph intuition: follow the curve toward $x = a$ from the left and right. The height you approach is the limit, regardless of whether there is a hole, a point, or nothing drawn at $x = a$.",
            "Table intuition: track output values as inputs get progressively closer to $a$ (for example $1.9,\\ 1.99,\\ 1.999 \\to 2$). Look for the numerical trend.",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Two-sided limit existence theorem",
          body:
            "The two-sided limit $\\lim_{x \\to a} f(x) = L$ exists if and only if both one-sided limits exist and are equal: $$\\lim_{x \\to a^-} f(x) = L \\quad \\text{and} \\quad \\lim_{x \\to a^+} f(x) = L \\iff \\lim_{x \\to a} f(x) = L$$ If $\\lim_{x \\to a^-} f(x) \\neq \\lim_{x \\to a^+} f(x)$, then the two-sided limit does not exist (DNE).",
        },
      ],
    },
    {
      id: "recognition",
      title: "When You See This → Think This",
      blocks: [
        {
          kind: "table",
          columns: ["If you see in the prompt…", "Think…", "First move…"],
          rows: [
            ["Graph with $\\lim_{x \\to a} f(x)$", "Two-sided approach", "Follow the curve from both left and right toward $x = a$."],
            [
              "Graph with $\\lim_{x \\to a^-} f(x)$ or $\\lim_{x \\to a^+} f(x)$",
              "One-sided limit",
              "Inspect ONLY the left ($a^-$) or right ($a^+$) side.",
            ],
            [
              "Hole at $(a, L)$ and solid point at $(a, k)$",
              "Limit $\\neq$ point value",
              "The limit is $L$; the function value is $f(a) = k$. Ignore the point.",
            ],
            [
              "Table with $x$-values approaching $a$",
              "Output trend",
              "Separate left ($x < a$) and right ($x > a$) data to check the trend.",
            ],
            [
              "Graph shooting upward/downward at $a$",
              "Unbounded behavior",
              "State an infinite limit ($\\pm\\infty$) or a vertical asymptote.",
            ],
          ],
        },
      ],
    },
    {
      id: "strategy",
      title: "Strategy Flowchart",
      blocks: [
        {
          kind: "tree",
          start: "sided",
          nodes: [
            {
              id: "sided",
              prompt: "Target limit $\\lim_{x \\to a} f(x)$: is it a one-sided limit ($x \\to a^-$ or $x \\to a^+$)?",
              options: [
                {
                  label: "Yes",
                  outcome: "Inspect ONLY the specified side. The approach $y$-value is $L$.",
                },
                { label: "No", next: "rep" },
              ],
            },
            {
              id: "rep",
              prompt: "What representation is provided?",
              options: [
                { label: "Graph", next: "match" },
                { label: "Table", next: "match" },
              ],
            },
            {
              id: "match",
              prompt:
                "Graph: read heights left ($L_1$) and right ($L_2$). Table: track trends left ($L_1$) and right ($L_2$). Do the one-sided limits match ($L_1 = L_2 = L$)?",
              options: [
                { label: "Yes", outcome: "The limit exists: $\\lim_{x \\to a} f(x) = L$." },
                { label: "No", outcome: "The limit DNE because $L_1 \\neq L_2$." },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "examples",
      title: "Core Worked Examples",
      blocks: [
        {
          kind: "example",
          title: "Type 1: Limit from a graph with a discontinuity",
          problem: "Consider a graph of $f(x)$ with a hole at $(2, 5)$ and a solid dot at $(2, 1)$.",
          steps: [
            { label: "Evaluate the left-hand approach", body: "Trace the curve from $x < 2$ toward $x = 2$: $\\lim_{x \\to 2^-} f(x) = 5$." },
            { label: "Evaluate the right-hand approach", body: "Trace the curve from $x > 2$ toward $x = 2$: $\\lim_{x \\to 2^+} f(x) = 5$." },
            {
              label: "Compare sides and point value",
              body: "Since $L_1 = L_2 = 5$, the limit is $5$. The solid point gives $f(2) = 1$, which does not affect the limit.",
            },
          ],
          conclusion: "$\\lim_{x \\to 2} f(x) = 5$ even though $f(2) = 1$.",
        },
        {
          kind: "example",
          title: "Type 2: Estimating a two-sided limit from a table",
          problem:
            "Use the table below to estimate $\\lim_{x \\to 3} f(x)$.\n\n| $x$ | 2.9 | 2.99 | 2.999 | 3.001 | 3.01 | 3.1 |\n| --- | --- | --- | --- | --- | --- | --- |\n| $f(x)$ | 4.80 | 4.98 | 4.999 | 5.001 | 5.02 | 5.20 |",
          steps: [
            { label: "Analyze the left side ($x \\to 3^-$)", body: "As $x$ increases ($2.9 \\to 2.99 \\to 2.999$), $f(x)$ approaches $5$." },
            { label: "Analyze the right side ($x \\to 3^+$)", body: "As $x$ decreases ($3.1 \\to 3.01 \\to 3.001$), $f(x)$ approaches $5$." },
            { label: "Conclude", body: "Both sides approach $5$, so the best estimate is $\\lim_{x \\to 3} f(x) = 5$." },
          ],
        },
      ],
    },
    {
      id: "exam-strategy",
      title: "AP Exam Strategy & Point-Scoring",
      blocks: [
        {
          kind: "list",
          ordered: true,
          title: "Full-credit justification rules",
          items: [
            "Always state both one-sided limits explicitly when proving a two-sided limit exists or fails to exist (for example, write \"$\\lim_{x \\to a^-} f(x) = 3$ and $\\lim_{x \\to a^+} f(x) = 5$\").",
            "State non-existence explicitly: write \"Since $\\lim_{x \\to a^-} f(x) \\neq \\lim_{x \\to a^+} f(x)$, $\\lim_{x \\to a} f(x)$ does not exist.\"",
            "Never use $f(a)$ to justify a limit value.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Avoid these point-loss traps",
          items: [
            "Trap 1: confusing $f(a)$ and $\\lim_{x \\to a} f(x)$ — choosing the $y$-value of the filled dot instead of the hole height.",
            "Trap 2: table row selection — reading the closest $x$-value row as the exact answer instead of identifying the underlying output trend.",
            "Trap 3: assuming DNE for holes — claiming a limit does not exist simply because $f(a)$ is undefined or discontinuous.",
          ],
        },
      ],
    },
    {
      id: "quick-reference",
      title: "Limits from Graphs & Tables Cheat Sheet",
      blocks: [
        {
          kind: "list",
          title: "Core notation summary",
          items: [
            "$\\lim_{x \\to a^-} f(x) = L_1 \\implies$ left-hand limit (approach from $x < a$)",
            "$\\lim_{x \\to a^+} f(x) = L_2 \\implies$ right-hand limit (approach from $x > a$)",
            "$\\lim_{x \\to a} f(x) = L \\iff L_1 = L_2 = L$",
          ],
        },
        {
          kind: "list",
          title: "Representation translation matrix",
          items: [
            "Graph → notation: identify the target $x$, trace the curve from left/right to find the $y$-height.",
            "Table → notation: look for the progression as $x$ steps closer to $a$ ($2.9,\\ 2.99,\\ 2.999 \\to 3$).",
            "Verbal → notation: \"As inputs approach $a$ from values larger than $a$, outputs approach $L$\" $\\implies \\lim_{x \\to a^+} f(x) = L$.",
          ],
        },
        {
          kind: "checklist",
          title: "Final verification checklist",
          items: [
            "Did I check both sides for two-sided limits?",
            "Did I ignore the solid dot when evaluating limits at a removable discontinuity?",
            "For tables, did I separate $x < a$ and $x > a$ data points?",
            "Did I write explicit limit statements ($\\lim_{x \\to a^-}$) instead of just final numbers in justifications?",
          ],
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* 1.8 · Squeeze Theorem                                              */
/* ------------------------------------------------------------------ */

const squeezeTheorem: TopicGuide = {
  sections: [
    {
      id: "core-idea",
      title: "The Core Idea: Trapping Unruly Functions",
      blocks: [
        {
          kind: "prose",
          text:
            "The Squeeze (Sandwich) Theorem is a limit tool for functions that are too wild, oscillating, or complex to evaluate directly.",
        },
        {
          kind: "callout",
          tone: "info",
          title: "Visual intuition",
          body:
            "Picture a hallway between two moving walls. The walls converge to a single doorway; if $f(x)$ is trapped between $g(x)$ and $h(x)$, and both converge to the same height $L$ as $x \\to a$, then $f(x)$ is forced to $L$.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Formal theorem statement",
          body:
            "Let $f$, $g$, and $h$ be defined near $x = a$ (except possibly at $a$ itself). If (1) $g(x) \\le f(x) \\le h(x)$ for all $x$ near $a$, and (2) $\\lim_{x \\to a} g(x) = L$ and $\\lim_{x \\to a} h(x) = L$, then $\\lim_{x \\to a} f(x) = L$.",
        },
      ],
    },
    {
      id: "recognition",
      title: "When You See This → Think This",
      blocks: [
        {
          kind: "table",
          columns: ["If you see in the prompt…", "Think…", "First move…"],
          rows: [
            [
              "Explicit inequality $g(x) \\le f(x) \\le h(x)$",
              "Direct trap",
              "Evaluate $\\lim g(x)$ and $\\lim h(x)$ as $x \\to a$. Check if they are equal.",
            ],
            [
              "Oscillating term like $\\sin(1/x)$ or $\\cos(\\pi/x)$",
              "Bounded function",
              "Start with $-1 \\le \\sin(\\cdot) \\le 1$, then multiply to build $f(x)$.",
            ],
            [
              "Absolute value form $|f(x) - L| \\le g(x)$",
              "Two-sided trap",
              "Unpack as $-g(x) \\le f(x) - L \\le g(x)$, then take limits.",
            ],
            [
              "$g(x) \\le f(x) \\le h(x)$ but the limits differ (e.g. $3 \\neq 5$)",
              "Inconclusive",
              "State: \"The Squeeze Theorem does not apply.\"",
            ],
          ],
        },
      ],
    },
    {
      id: "strategy",
      title: "Strategy Flowchart",
      blocks: [
        {
          kind: "tree",
          start: "direct",
          nodes: [
            {
              id: "direct",
              prompt: "Evaluating $\\lim_{x \\to a} f(x)$: can $f(x)$ be evaluated directly or via standard algebra/factoring?",
              options: [
                { label: "Yes", outcome: "Use standard limit laws." },
                { label: "No", next: "bounds" },
              ],
            },
            {
              id: "bounds",
              prompt: "Are bounds given, or does $f(x)$ contain $\\sin(\\cdot)$ or $\\cos(\\cdot)$?",
              options: [
                { label: "No", outcome: "Use another method (for example L'Hôpital's Rule)." },
                { label: "Yes", next: "outer" },
              ],
            },
            {
              id: "outer",
              prompt: "Compute the outer limits $L_1 = \\lim g(x)$ and $L_2 = \\lim h(x)$. Do they match?",
              options: [
                { label: "Limits match ($L_1 = L_2 = L$)", outcome: "Conclude $\\lim_{x \\to a} f(x) = L$ by the Squeeze Theorem." },
                { label: "Limits differ ($L_1 \\neq L_2$)", outcome: "The Squeeze Theorem is inconclusive." },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "examples",
      title: "Core Worked Examples",
      blocks: [
        {
          kind: "example",
          title: "Type 1: Constructing bounds for bounded functions",
          problem: "Evaluate $\\displaystyle\\lim_{x \\to 0} x^2 \\sin\\!\\left(\\frac{1}{x}\\right)$.",
          steps: [
            { label: "Start with the bounded component", body: "$-1 \\le \\sin(1/x) \\le 1$ for all $x \\neq 0$." },
            {
              label: "Multiply through by $x^2$",
              body: "Valid since $x^2 > 0$ for $x \\neq 0$, so no sign flip: $-x^2 \\le x^2 \\sin(1/x) \\le x^2$.",
            },
            { label: "Take the outer limits", body: "$\\lim_{x \\to 0} (-x^2) = 0$ and $\\lim_{x \\to 0} x^2 = 0$." },
          ],
          conclusion:
            "Since the outer limits both equal $0$, by the Squeeze Theorem $\\lim_{x \\to 0} x^2 \\sin(1/x) = 0$.",
        },
        {
          kind: "example",
          title: "Type 2: Absolute-value transformations",
          problem: "If $|f(x) - 4| \\le 3(x-2)^2$, evaluate $\\lim_{x \\to 2} f(x)$.",
          steps: [
            {
              label: "Unpack the absolute value",
              body: "$|A| \\le B \\implies -B \\le A \\le B$, giving $-3(x-2)^2 \\le f(x) - 4 \\le 3(x-2)^2$.",
            },
            { label: "Isolate $f(x)$", body: "Add $4$ across all terms: $4 - 3(x-2)^2 \\le f(x) \\le 4 + 3(x-2)^2$." },
            {
              label: "Take limits",
              body: "$\\lim_{x \\to 2} [4 - 3(x-2)^2] = 4$ and $\\lim_{x \\to 2} [4 + 3(x-2)^2] = 4$.",
            },
          ],
          conclusion: "By the Squeeze Theorem, $\\lim_{x \\to 2} f(x) = 4$.",
        },
      ],
    },
    {
      id: "exam-strategy",
      title: "AP Exam Strategy & Point-Scoring",
      blocks: [
        {
          kind: "list",
          ordered: true,
          title: "The 3-part FRQ credit formula",
          items: [
            "State the inequality: $g(x) \\le f(x) \\le h(x)$ near $x = a$.",
            "Compute the outer limits: show $\\lim_{x \\to a} g(x) = L$ and $\\lim_{x \\to a} h(x) = L$ explicitly.",
            "Name the theorem: \"Therefore, by the Squeeze Theorem, $\\lim_{x \\to a} f(x) = L$.\"",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Avoid these point-loss traps",
          items: [
            "Trap 1: claiming $f(a) = L$ — the Squeeze Theorem gives the limit, not the actual function value at $x = a$.",
            "Trap 2: forgetting to explicitly write the phrase \"Squeeze Theorem.\"",
            "Trap 3: multiplying inequalities by $x$ without checking the sign (signs flip if negative) — use $x^2$ or absolute values instead.",
          ],
        },
      ],
    },
    {
      id: "quick-reference",
      title: "Squeeze Theorem Cheat Sheet",
      blocks: [
        {
          kind: "formula",
          label: "Core theorem formula",
          tex: "g(x) \\le f(x) \\le h(x) \\ \\text{ and } \\ \\lim_{x \\to a} g(x) = \\lim_{x \\to a} h(x) = L \\implies \\lim_{x \\to a} f(x) = L",
        },
        {
          kind: "list",
          title: "Benchmark bounds to memorize",
          items: [
            "$-1 \\le \\sin\\theta \\le 1 \\implies -|x^k| \\le x^k \\sin(1/x) \\le |x^k|$",
            "$-1 \\le \\cos\\theta \\le 1 \\implies -|x^k| \\le x^k \\cos(1/x) \\le |x^k|$",
            "Classic AP limits: $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$ and $\\lim_{x \\to 0} \\frac{1 - \\cos x}{x} = 0$",
          ],
        },
        {
          kind: "checklist",
          title: "Final verification checklist",
          items: [
            "Did I establish both an upper AND a lower bound?",
            "Did I evaluate limits for BOTH bounds separately?",
            "Do the outer limit values match?",
            "Did I explicitly write the name \"Squeeze Theorem\" in my final sentence?",
          ],
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* 1.10–1.13 · Continuity & Discontinuity Types                       */
/* ------------------------------------------------------------------ */

const continuityAndDiscontinuity: TopicGuide = {
  sections: [
    {
      id: "core-idea",
      title: "The Core Idea: Three Conditions",
      blocks: [
        {
          kind: "prose",
          text: "A function is continuous at $x = a$ precisely when all three of these hold:",
        },
        {
          kind: "list",
          ordered: true,
          items: ["$f(a)$ exists", "$\\lim_{x \\to a} f(x)$ exists", "$\\lim_{x \\to a} f(x) = f(a)$"],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The AP recognition rule",
          body: "VALUE → LIMIT → AGREEMENT. If any one fails, $f$ is not continuous at $a$.",
        },
        {
          kind: "callout",
          tone: "info",
          title: "Piecewise shortcut",
          body:
            "For a piecewise function, the fastest route is usually checking $\\lim_{x \\to a^-} f(x) = \\lim_{x \\to a^+} f(x) = f(a)$.",
        },
      ],
    },
    {
      id: "recognition",
      title: "When You See This → Think This",
      blocks: [
        {
          kind: "table",
          columns: ["If you see in the prompt…", "Think…", "First move…"],
          rows: [
            ["\"continuous at $x = a$\"", "Three continuity conditions", "Check $f(a)$, the limit, and whether they agree."],
            ["Piecewise function at its joining point", "One-sided limits", "Compute the left limit, right limit, and function value."],
            ["Left and right limits differ", "Jump discontinuity", "Compare $\\lim_{x \\to a^-} f(x)$ and $\\lim_{x \\to a^+} f(x)$."],
            ["Finite limit exists but value is missing/wrong", "Removable discontinuity", "Compare $\\lim_{x \\to a} f(x)$ with $f(a)$."],
            ["Function becomes unbounded near $a$", "Infinite discontinuity", "Look for $\\pm\\infty$ / vertical-asymptote behavior."],
            ["\"continuous on $[a,b]$\"", "Interior + endpoints", "Use two-sided limits inside and one-sided limits at endpoints."],
            ["\"find $k$ so $f$ is continuous\"", "Match the pieces", "Set the relevant limit equal to the required function value."],
            ["\"remove the discontinuity\"", "Redefine one point", "Set $f(a)$ equal to the finite limit, when the limit exists."],
          ],
        },
      ],
    },
    {
      id: "strategy",
      title: "Strategy Flowchart",
      blocks: [
        {
          kind: "tree",
          start: "value",
          nodes: [
            {
              id: "value",
              prompt: "Is $f$ continuous at $x = a$? First: does $f(a)$ exist?",
              options: [
                { label: "No", outcome: "Not continuous at $x = a$." },
                { label: "Yes", next: "limit" },
              ],
            },
            {
              id: "limit",
              prompt: "Does $\\lim_{x \\to a} f(x)$ exist?",
              options: [
                { label: "No", outcome: "Not continuous at $x = a$." },
                { label: "Yes", next: "agree" },
              ],
            },
            {
              id: "agree",
              prompt: "Does $\\lim_{x \\to a} f(x) = f(a)$?",
              options: [
                { label: "No", outcome: "Not continuous at $x = a$." },
                { label: "Yes", outcome: "Continuous at $x = a$." },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "classifying",
      title: "Classifying Discontinuities",
      blocks: [
        {
          kind: "callout",
          tone: "info",
          title: "Removable discontinuity",
          items: [
            "Condition: $\\lim_{x \\to a} f(x) = L$ (finite) but $f(a) \\neq L$.",
            "Visual clue: a hole.",
            "Repair rule: if $L$ is finite, defining $f(a) = L$ removes the discontinuity.",
          ],
        },
        {
          kind: "callout",
          tone: "info",
          title: "Jump discontinuity",
          items: [
            "Condition: $\\lim_{x \\to a^-} f(x) \\neq \\lim_{x \\to a^+} f(x)$ (one-sided limits exist but disagree).",
            "Consequence: the two-sided limit does not exist.",
            "Visual clue: the graph jumps from one height to another.",
            "Key rule: changing $f(a)$ cannot fix the mismatch.",
          ],
        },
        {
          kind: "callout",
          tone: "info",
          title: "Infinite / asymptotic discontinuity",
          items: [
            "Condition: $\\lim_{x \\to a} f(x) = \\infty$ or $-\\infty$ (the function becomes unbounded near the point).",
            "Visual clue: vertical-asymptote behavior.",
            "The detailed connection between infinite limits and vertical asymptotes is developed in CED Topic 1.14.",
          ],
        },
      ],
    },
    {
      id: "examples",
      title: "Core Worked Examples",
      blocks: [
        {
          kind: "example",
          title: "Type 1: Test continuity",
          problem: "$f(x) = x^2 + 1$ for $x \\neq 2$; $f(x) = 5$ for $x = 2$. Check continuity at $x = 2$.",
          steps: [
            { label: "Check the value", body: "$f(2) = 5$." },
            { label: "Check the limit", body: "$\\lim_{x \\to 2} f(x) = 2^2 + 1 = 5$." },
            { label: "Compare", body: "$\\lim_{x \\to 2} f(x) = f(2)$, so $f$ is continuous at $x = 2$." },
          ],
          note:
            "If the prompt says \"continuous at $a$,\" do not stop after finding the limit — you must compare the limit with $f(a)$.",
        },
        {
          kind: "example",
          title: "Type 2: Find a parameter",
          problem: "$f(x) = x^2 + 3$ for $x < 2$; $f(x) = k$ for $x \\ge 2$. Find $k$ for continuity at $x = 2$.",
          steps: [
            { label: "Left limit", body: "$\\lim_{x \\to 2^-} f(x) = 2^2 + 3 = 7$." },
            { label: "Match the second piece", body: "The value from the second piece must equal $7$, so $k = 7$." },
          ],
          note: "\"Find $k$ so that $f$ is continuous\" means left limit $=$ right limit $= f(a)$.",
        },
        {
          kind: "example",
          title: "Type 3: Classify the discontinuity",
          problem: "$\\lim_{x \\to 3^-} f(x) = 4$ and $\\lim_{x \\to 3^+} f(x) = 7$.",
          steps: [
            { label: "Compare the sides", body: "Since $4 \\neq 7$, the two-sided limit does not exist." },
            { label: "Classify", body: "Therefore this is a jump discontinuity." },
          ],
          note: "The value of $f(3)$ cannot make the function continuous.",
        },
      ],
    },
    {
      id: "intervals",
      title: "Continuity on an Interval",
      blocks: [
        {
          kind: "list",
          title: "For the closed interval $[a, b]$, continuity requires:",
          items: [
            "$f$ is continuous on $(a, b)$,",
            "$\\lim_{x \\to a^+} f(x) = f(a)$,",
            "$\\lim_{x \\to b^-} f(x) = f(b)$.",
          ],
        },
        {
          kind: "prose",
          text:
            "Endpoints use one-sided limits because the function only needs to be continuous from within the interval.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Endpoint trap",
          body:
            "Do not require a two-sided limit at an endpoint of the interval. For $[a,b]$: at $a$ use $\\lim_{x \\to a^+} f(x)$; at $b$ use $\\lim_{x \\to b^-} f(x)$.",
        },
      ],
    },
    {
      id: "removing",
      title: "Removing a Discontinuity",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "Rule",
          body:
            "If $\\lim_{x \\to a} f(x) = L$ exists and is finite, a removable discontinuity can be repaired by defining $f(a) = L$.",
        },
        {
          kind: "example",
          title: "Worked example",
          problem: "$f(x) = \\dfrac{x^2 - 9}{x - 3}$, $x \\neq 3$.",
          steps: [
            { label: "Factor", body: "$f(x) = \\frac{(x-3)(x+3)}{x-3} = x + 3$, $x \\neq 3$." },
            { label: "Take the limit", body: "$\\lim_{x \\to 3} f(x) = 6$." },
          ],
          conclusion: "The discontinuity is removable by defining $f(3) = 6$.",
        },
      ],
    },
    {
      id: "exam-strategy",
      title: "AP Exam Strategy",
      blocks: [
        {
          kind: "list",
          ordered: true,
          title: "The fast AP workflow",
          items: [
            "Identify the point $x = a$ where continuity is being tested.",
            "Check the function value $f(a)$.",
            "Check the limit; use one-sided limits when necessary.",
            "Compare the limit with $f(a)$.",
            "Classify the failure if continuity does not hold.",
          ],
        },
        { kind: "callout", tone: "rule", title: "Summary chain", body: "Value → Limit → Compare → Classify" },
        {
          kind: "callout",
          tone: "info",
          title: "FRQ justification template",
          body:
            "When asked to justify continuity at $x = a$, write the actual mathematical relationship: $\\lim_{x \\to a} f(x) = L$ and $f(a) = L$. Therefore $\\lim_{x \\to a} f(x) = f(a)$, so $f$ is continuous at $a$.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Avoid these mistakes",
          items: [
            "Mistake 1: checking only whether $f(a)$ exists.",
            "Mistake 2: checking only the two-sided limit.",
            "Mistake 3: calling every undefined point removable without checking whether the finite two-sided limit exists.",
            "Mistake 4: confusing unequal one-sided limits with a removable discontinuity.",
            "Mistake 5: using a two-sided endpoint condition on a closed interval.",
          ],
        },
      ],
    },
    {
      id: "representations",
      title: "Representation Translation",
      blocks: [
        {
          kind: "table",
          columns: ["Representation", "What to look for"],
          rows: [
            ["Graph", "Hole → removable; jump → jump; vertical blow-up → infinite."],
            ["Table", "Compare values approaching from the left and right; look for a common finite value."],
            ["Piecewise formula", "Check the boundary between pieces."],
            ["Equation", "Evaluate $f(a)$ and compute the relevant limit."],
            ["Verbal description", "Translate phrases such as \"approaches the same value\" into a limit condition."],
          ],
        },
      ],
    },
    {
      id: "connections",
      title: "Cross-Topic Connections",
      blocks: [
        {
          kind: "table",
          columns: ["Related topic", "Connection"],
          rows: [
            ["Limits from Graphs and Tables", "Supply the limits needed to test continuity."],
            ["Evaluating Limits Algebraically", "Provides algebraic methods for finding finite limits."],
            ["Squeeze Theorem", "Can establish a limit required for continuity."],
            ["Intermediate Value Theorem", "Requires continuity on an interval."],
            ["Infinite limits", "Help distinguish unbounded behavior from removable or jump behavior."],
          ],
        },
      ],
    },
    {
      id: "quick-reference",
      title: "Continuity Cheat Sheet",
      blocks: [
        {
          kind: "list",
          title: "Continuity at $x = a$ — all three must hold",
          items: ["$f(a)$ exists", "$\\lim_{x \\to a} f(x)$ exists", "$\\lim_{x \\to a} f(x) = f(a)$"],
        },
        {
          kind: "list",
          title: "Discontinuity recognition",
          items: [
            "Removable: finite limit exists, value missing or wrong",
            "Jump: $L^- \\neq L^+$",
            "Infinite: the function becomes unbounded",
          ],
        },
        {
          kind: "list",
          title: "Piecewise functions",
          items: [
            "At the joining point $x = a$: $\\lim_{x \\to a^-} f(x) = \\lim_{x \\to a^+} f(x) = f(a)$",
            "If finding a parameter, make the pieces agree.",
          ],
        },
        {
          kind: "list",
          title: "Intervals — for $[a, b]$",
          items: ["Two-sided inside", "Right-sided at $a$", "Left-sided at $b$"],
        },
        {
          kind: "checklist",
          title: "Final verification checklist",
          items: [
            "Did I check whether $f(a)$ exists?",
            "Did I determine whether the limit exists?",
            "If necessary, did I compare the one-sided limits?",
            "Did I compare the limit with $f(a)$?",
            "If an interval is involved, did I check the endpoints one-sidedly?",
            "If discontinuous, did I identify the exact type?",
          ],
        },
        { kind: "callout", tone: "rule", title: "Master recognition rule", body: "Value → Limit → Agreement → Type" },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* 1.16 · Intermediate Value Theorem                                  */
/* ------------------------------------------------------------------ */

const intermediateValueTheorem: TopicGuide = {
  sections: [
    {
      id: "core-idea",
      title: "The Core Idea: Guaranteed Existence",
      blocks: [
        {
          kind: "formula",
          label: "Statement",
          tex:
            "f \\text{ continuous on } [a,b] \\ \\text{ and } \\ d \\text{ between } f(a) \\text{ and } f(b) \\implies \\exists c \\in (a,b) \\text{ with } f(c) = d",
        },
        { kind: "callout", tone: "info", title: "Key idea", body: "A continuous function cannot skip an intermediate output value." },
        {
          kind: "callout",
          tone: "rule",
          title: "AP recognition rule",
          body: "CONTINUOUS + TARGET BETWEEN $\\implies$ GUARANTEED VALUE",
        },
        {
          kind: "list",
          ordered: true,
          title: "Pre-check questions",
          items: [
            "Is $f$ continuous on the entire interval $[a,b]$?",
            "Is the target $d$ between $f(a)$ and $f(b)$?",
          ],
        },
        { kind: "prose", text: "If both are satisfied, the IVT gives existence." },
      ],
    },
    {
      id: "recognition",
      title: "When You See This → Think This",
      blocks: [
        {
          kind: "table",
          columns: ["Prompt signal", "Think…", "First move…"],
          rows: [
            ["\"Show that there exists $c$ such that $f(c) = d$\"", "IVT", "Check continuity and whether $d$ lies between the endpoint values."],
            ["\"$f$ is continuous on $[a,b]$\"", "IVT hypothesis", "Use the stated continuity, then compare $f(a)$ and $f(b)$."],
            ["$f(a) < d < f(b)$", "Intermediate value", "IVT guarantees at least one $c$ in the interval."],
            ["$f(a) > d > f(b)$", "Still between", "Order doesn't matter; $d$ is still between the endpoints."],
            ["\"guaranteed to have a root\"", "Set $d = 0$", "Check whether $0$ lies between $f(a)$ and $f(b)$."],
            ["\"find the value of $c$\"", "IVT $\\neq$ solver", "IVT establishes existence; another method may locate $c$."],
            ["Continuity fails", "Hypothesis failure", "IVT cannot be invoked from the given information."],
          ],
        },
      ],
    },
    {
      id: "strategy",
      title: "Strategy Flowchart",
      blocks: [
        {
          kind: "tree",
          start: "cont",
          nodes: [
            {
              id: "cont",
              prompt: "You need to prove $\\exists c$ such that $f(c) = d$. Is $f$ continuous on $[a,b]$?",
              options: [
                { label: "No", outcome: "IVT cannot be applied." },
                { label: "Yes", next: "between" },
              ],
            },
            {
              id: "between",
              prompt: "Is $d$ between $f(a)$ and $f(b)$?",
              options: [
                { label: "No", outcome: "No IVT guarantee." },
                { label: "Yes", outcome: "IVT guarantees at least one $c \\in (a,b)$ with $f(c) = d$." },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "conditions",
      title: "The Two IVT Conditions",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "01 — Continuity",
          body:
            "$f$ must be continuous on the entire closed interval $[a,b]$; a discontinuity anywhere inside prevents automatic invocation.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "02 — Target between endpoint values",
          body:
            "$\\min\\{f(a), f(b)\\} \\le d \\le \\max\\{f(a), f(b)\\}$. The standard AP conclusion (an interior $c$) requires strict betweenness.",
        },
      ],
    },
    {
      id: "examples",
      title: "Core Worked Examples",
      blocks: [
        {
          kind: "example",
          title: "Type 1: Prove a root exists",
          problem: "$f(x) = x^3 - x - 1$. Show there exists $c \\in (1,2)$ with $f(c) = 0$.",
          steps: [
            { label: "Recognize", body: "A root means $d = 0$." },
            { label: "Verify hypotheses", body: "$f$ is a polynomial, hence continuous on $[1,2]$; $f(1) = -1$ and $f(2) = 5$, and $-1 < 0 < 5$." },
          ],
          conclusion: "By the IVT, there exists $c \\in (1,2)$ with $f(c) = 0$.",
          note: "A root means $f(c) = 0$; check continuity and the position of $0$ relative to the endpoint values.",
        },
        {
          kind: "example",
          title: "Type 2: Prove a specific output occurs",
          problem: "$f$ is continuous on $[2,5]$, $f(2) = 3$, $f(5) = 11$. Can we conclude there exists $c \\in (2,5)$ with $f(c) = 7$?",
          steps: [
            { label: "Identify the target", body: "$d = 7$." },
            { label: "Check betweenness", body: "$3 < 7 < 11$." },
          ],
          conclusion: "Yes — by the IVT there exists $c \\in (2,5)$ with $f(c) = 7$.",
          note: "No exact value of $c$ is required.",
        },
        {
          kind: "example",
          title: "Type 3: Determine whether IVT applies",
          problem: "$f(x) = x + 1$ for $x < 2$ and $f(x) = x + 4$ for $x \\ge 2$. Can the IVT be used on $[1,3]$?",
          steps: [
            { label: "Check continuity at the joining point", body: "The left limit at $x = 2$ is $3$; the right limit is $6$." },
            { label: "Conclude about hypotheses", body: "$f$ is discontinuous at $x = 2 \\in [1,3]$, so the hypotheses are not satisfied." },
          ],
          conclusion: "No — the IVT cannot be applied on $[1,3]$.",
        },
      ],
    },
    {
      id: "roots",
      title: "Roots: The Most Important Special Case",
      blocks: [
        { kind: "prose", text: "A root $c$ satisfies $f(c) = 0$." },
        {
          kind: "callout",
          tone: "rule",
          title: "Root version",
          body: "If $f$ is continuous on $[a,b]$ and $0$ is between $f(a)$ and $f(b)$, then there exists $c \\in (a,b)$ with $f(c) = 0$.",
        },
        { kind: "prose", text: "Convenient test: $f(a) \\cdot f(b) < 0$ (opposite signs)." },
        {
          kind: "callout",
          tone: "warn",
          title: "Root trap",
          body:
            "\"Opposite signs\" is a shortcut, not the theorem itself; the actual condition is that $0$ lies between $f(a)$ and $f(b)$. Continuity on the entire interval is always required.",
        },
      ],
    },
    {
      id: "limits-of-ivt",
      title: "What IVT Does — and Does Not — Tell You",
      blocks: [
        {
          kind: "table",
          columns: ["IVT guarantees", "IVT does not guarantee"],
          rows: [
            ["At least one $c$ exists", "The exact value of $c$"],
            ["The target output occurs somewhere in the interval", "That there is exactly one such $c$"],
            ["Existence from continuity and endpoint values", "The precise shape of the graph between endpoints"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Key distinction",
          body:
            "IVT = EXISTENCE — not necessarily location, exact value, or uniqueness. If asked to find $c$, the IVT alone generally does not give the numerical value.",
        },
      ],
    },
    {
      id: "exam-strategy",
      title: "AP Exam Strategy",
      blocks: [
        {
          kind: "list",
          ordered: true,
          title: "The fast AP workflow",
          items: [
            "Identify the interval $[a,b]$.",
            "Verify continuity on the entire interval.",
            "Evaluate $f(a)$ and $f(b)$.",
            "Identify the target value $d$.",
            "Check that $d$ lies between the endpoint outputs.",
            "State the IVT conclusion explicitly.",
          ],
        },
        { kind: "callout", tone: "rule", title: "Flow", body: "CONTINUOUS → ENDPOINTS → TARGET BETWEEN → EXISTS" },
        {
          kind: "callout",
          tone: "info",
          title: "FRQ justification template",
          body:
            "\"$f$ is continuous on $[a,b]$, $d$ lies between $f(a)$ and $f(b)$, therefore by the IVT there exists $c \\in (a,b)$ such that $f(c) = d$.\" This is not for verbatim memorization — explicitly connect the hypotheses to the conclusion.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "High-value traps",
          items: [
            "Checking endpoint values without establishing continuity.",
            "Saying \"IVT guarantees a solution\" without identifying the guaranteed output value.",
            "Treating the IVT as a method for finding the exact $c$.",
            "Assuming existence means uniqueness.",
            "Forgetting the target must be between the endpoint outputs.",
          ],
        },
      ],
    },
    {
      id: "representations",
      title: "Representation Translation",
      blocks: [
        {
          kind: "table",
          columns: ["Representation", "What to look for"],
          rows: [
            ["Graph", "A continuous path passing through the target horizontal level."],
            ["Table", "Endpoint values placing the target between them, with continuity supplied or established elsewhere."],
            ["Equation", "Use the function's definition to establish continuity, then evaluate endpoint outputs."],
            ["Verbal", "Translate \"takes every value between\" into an existence statement."],
            ["Numerical", "Compare $d$ with $f(a)$ and $f(b)$."],
          ],
        },
      ],
    },
    {
      id: "connections",
      title: "Cross-Topic Connections",
      blocks: [
        {
          kind: "table",
          columns: ["Related topic", "Connection"],
          rows: [
            ["Continuity & Discontinuity", "IVT requires continuity throughout the interval."],
            ["Limits", "Limits help determine whether a function is continuous at points."],
            ["Graphs & tables", "Provide endpoint information; help identify whether the target is intermediate."],
            ["Mean Value Theorem", "Another existence theorem: hypotheses on an interval guarantee a point with a particular derivative value."],
            ["Numerical methods", "IVT can establish that a root exists before a numerical method locates it."],
          ],
        },
      ],
    },
    {
      id: "quick-reference",
      title: "Intermediate Value Theorem Cheat Sheet",
      blocks: [
        {
          kind: "formula",
          label: "The IVT",
          tex:
            "f \\text{ continuous on } [a,b],\\ d \\text{ between } f(a),f(b) \\implies \\exists c \\in (a,b): f(c) = d",
        },
        {
          kind: "list",
          title: "Two conditions — both must be satisfied",
          items: [
            "01 Continuity: $f$ continuous on the entire $[a,b]$.",
            "02 Target between: $d$ lies between $f(a)$ and $f(b)$.",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Root shortcut",
          body: "Set $d = 0$; if $f$ is continuous on $[a,b]$ and $f(a)f(b) < 0$, then there exists $c \\in (a,b)$ with $f(c) = 0$.",
        },
        {
          kind: "table",
          columns: ["What IVT gives — YES", "What IVT gives — NO"],
          rows: [
            ["Existence", "Exact location"],
            ["The target occurs", "Uniqueness"],
            ["—", "Precise graph shape"],
          ],
        },
        {
          kind: "checklist",
          title: "Final verification checklist",
          items: [
            "Did I identify the interval $[a,b]$?",
            "Is $f$ continuous on the entire interval?",
            "Did I calculate $f(a)$ and $f(b)$?",
            "Is the target actually between them?",
            "Did I state that the IVT guarantees at least one $c \\in (a,b)$?",
            "Did I avoid claiming uniqueness or an exact value of $c$?",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Master recognition rule",
          body: "Continuous + Target Between $\\implies$ Guaranteed Existence",
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* 1.15 · Limits at Infinity                                          */
/* ------------------------------------------------------------------ */

const limitsAtInfinity: TopicGuide = {
  sections: [
    {
      id: "core-idea",
      title: "Core Recognition System",
      blocks: [
        { kind: "prose", text: "$x \\to \\infty$ is the right end of the graph; $x \\to -\\infty$ is the left end." },
        {
          kind: "table",
          columns: ["Outcome", "Interpretation"],
          rows: [
            ["$\\lim_{x \\to \\pm\\infty} f(x) = L$", "$f(x)$ approaches the finite value $L$."],
            ["$\\lim f(x) = \\infty$", "$f(x)$ grows without bound."],
            ["$\\lim f(x) = -\\infty$", "$f(x)$ decreases without bound."],
            ["DNE", "End behavior does not approach one finite value or one infinite direction."],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Master recognition",
          body: "Direction → Representation → Dominant Behavior → Limit → Interpretation",
        },
      ],
    },
    {
      id: "choose-analysis",
      title: "Choose the Right Analysis",
      blocks: [
        {
          kind: "table",
          columns: ["If you see…", "Do this first"],
          rows: [
            ["Polynomial", "Keep the leading term."],
            ["Rational function", "Compare numerator and denominator degrees."],
            ["Radical", "Factor the dominant power; remember $\\sqrt{x^2} = |x|$."],
            ["Exponential / logarithm", "Compare growth rates."],
            ["Graph", "Follow the appropriate end of the graph."],
            ["Table", "Track values as $x$ becomes increasingly positive or negative."],
            ["Two functions being compared", "Consider a ratio such as $f(x)/g(x)$."],
          ],
        },
      ],
    },
    {
      id: "cases",
      title: "The Essential Cases",
      blocks: [
        {
          kind: "prose",
          text:
            "Polynomials: for $f(x) = a_n x^n + \\cdots + a_1 x + a_0$, the leading term controls end behavior.",
        },
        {
          kind: "table",
          columns: ["Leading term", "$x \\to -\\infty$", "$x \\to \\infty$"],
          rows: [
            ["even degree, $a_n > 0$", "$+\\infty$", "$+\\infty$"],
            ["even degree, $a_n < 0$", "$-\\infty$", "$-\\infty$"],
            ["odd degree, $a_n > 0$", "$-\\infty$", "$+\\infty$"],
            ["odd degree, $a_n < 0$", "$+\\infty$", "$-\\infty$"],
          ],
        },
        {
          kind: "list",
          title: "Rational functions $f(x) = P(x)/Q(x)$",
          items: [
            "$\\deg P < \\deg Q \\implies \\lim = 0$",
            "$\\deg P = \\deg Q \\implies \\lim$ is the ratio of leading coefficients",
            "$\\deg P > \\deg Q \\implies$ no finite horizontal-asymptote limit",
            "Caveat: when the degrees differ enough to leave polynomial growth, determine the sign and direction rather than stopping at the degree rule.",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Relative growth",
          body:
            "$\\lim_{x \\to \\infty} f(x)/g(x) = 0$ means $g$ grows faster than $f$. AP-level hierarchy: $\\ln x \\ll x^p \\ll a^x$ for $p > 0$, $a > 1$.",
        },
      ],
    },
    {
      id: "variants",
      title: "High-Value Variants",
      blocks: [
        {
          kind: "example",
          title: "Different behavior at the two ends",
          problem: "$f(x) = \\dfrac{x}{\\sqrt{x^2+1}}$",
          steps: [
            {
              label: "Factor the dominant power",
              body: "$\\sqrt{x^2+1} = |x|\\sqrt{1 + 1/x^2}$.",
            },
            { label: "Evaluate each end", body: "$\\lim_{x \\to \\infty} f(x) = 1$ and $\\lim_{x \\to -\\infty} f(x) = -1$." },
          ],
          conclusion: "The two ends have different horizontal asymptotes.",
        },
        {
          kind: "example",
          title: "Graph / table → limit",
          problem: "A graph approaches $y = 4$ on the far right; a table gives $3.1,\\ 3.7,\\ 3.96,\\ 3.996, \\ldots$",
          steps: [
            { label: "Read the graph", body: "$\\lim_{x \\to \\infty} f(x) = 4$." },
            { label: "Read the table", body: "The trend suggests $\\lim = 4$." },
          ],
          note: "A finite table suggests a limit; it does not by itself prove it.",
        },
        {
          kind: "example",
          title: "Radical expressions",
          problem: "$\\displaystyle\\lim_{x \\to \\infty} \\left( \\sqrt{x^2+1} - x \\right)$",
          steps: [
            { label: "Direct substitution", body: "Indeterminate." },
            { label: "Rationalize", body: "Rewrite as $\\dfrac{1}{\\sqrt{x^2+1}+x}$." },
          ],
          conclusion: "The limit is $0$.",
        },
      ],
    },
    {
      id: "examples",
      title: "Worked Examples",
      blocks: [
        {
          kind: "example",
          title: "Example A — Rational function",
          problem: "$\\displaystyle\\lim_{x \\to \\infty} \\frac{6x^3 - 2x + 1}{3x^3 + 7x^2 - 4}$",
          steps: [{ label: "Equal degrees", body: "Take the ratio of leading coefficients: $6/3 = 2$." }],
          conclusion: "The limit is $2$; the horizontal asymptote is $y = 2$.",
        },
        {
          kind: "example",
          title: "Example B — Left-end behavior",
          problem: "$\\displaystyle\\lim_{x \\to -\\infty} \\left( -3x^4 + 2x^2 - 7 \\right)$",
          steps: [
            { label: "Leading term", body: "$-3x^4$." },
            { label: "Parity", body: "Since $x^4 \\to +\\infty$ at both ends, the coefficient $-3$ flips the direction." },
          ],
          conclusion: "The limit is $-\\infty$.",
        },
        {
          kind: "example",
          title: "Example C — Radical / sign",
          problem: "$\\displaystyle\\lim_{x \\to -\\infty} \\frac{\\sqrt{x^2+4}}{x}$",
          steps: [
            { label: "Factor", body: "$\\sqrt{x^2+4} = |x|\\sqrt{1 + 4/x^2}$." },
            { label: "Resolve the absolute value", body: "As $x \\to -\\infty$, $|x| = -x$." },
          ],
          conclusion: "The limit is $-1$.",
        },
        {
          kind: "example",
          title: "Example D — Relative growth",
          problem: "$\\displaystyle\\lim_{x \\to \\infty} \\frac{x^4}{e^x}$",
          steps: [{ label: "Compare growth", body: "The exponential dominates the polynomial: $x^4 \\ll e^x$." }],
          conclusion: "The limit is $0$.",
        },
      ],
    },
    {
      id: "strategy",
      title: "Decision Tree & Exam Traps",
      blocks: [
        {
          kind: "tree",
          start: "dir",
          nodes: [
            {
              id: "dir",
              prompt: "Which end are you analyzing?",
              options: [
                { label: "$x \\to \\infty$ (right end)", next: "rep" },
                { label: "$x \\to -\\infty$ (left end)", next: "rep" },
              ],
            },
            {
              id: "rep",
              prompt: "Identify the representation, then find the dominant term or growth behavior.",
              options: [
                { label: "Polynomial or rational", next: "sign" },
                { label: "Radical", next: "sign" },
                { label: "Exponential / logarithmic comparison", next: "sign" },
                { label: "Graph or table", next: "sign" },
              ],
            },
            {
              id: "sign",
              prompt: "Track sign and magnitude. What does the dominant behavior produce?",
              options: [
                { label: "A single finite value", outcome: "The limit is finite: $\\lim f(x) = L$, a horizontal asymptote $y = L$ at that end." },
                { label: "Unbounded growth or decrease", outcome: "The limit is $+\\infty$ or $-\\infty$ — state the direction." },
                { label: "No single behavior", outcome: "The limit does not exist." },
              ],
            },
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Top traps",
          items: [
            "Treating $+\\infty$ and $-\\infty$ as interchangeable.",
            "Forgetting that $\\sqrt{x^2} = |x|$.",
            "Using a degree rule without checking the resulting sign.",
            "Assuming both ends must have the same limit.",
            "Thinking a horizontal asymptote cannot be crossed.",
            "Confusing \"approaches $L$\" with \"equals $L$.\"",
            "Treating a table of values as a proof.",
            "Assuming every limit at infinity is finite.",
          ],
        },
        {
          kind: "list",
          title: "MCQ / FRQ execution",
          items: [
            "MCQ: identify the direction first; eliminate answers with the wrong end behavior or sign.",
            "FRQ: state the dominant behavior and connect it explicitly to the limit; if a horizontal asymptote is requested, translate the limit into the line $y = L$.",
          ],
        },
      ],
    },
    {
      id: "quick-reference",
      title: "Limits at Infinity Cheat Sheet",
      blocks: [
        {
          kind: "list",
          ordered: true,
          title: "Recognize → Analyze → Interpret",
          items: [
            "Direction: $x \\to \\infty$ is the right end; $x \\to -\\infty$ is the left end. Never assume the two ends behave identically.",
            "Polynomials: keep the leading term $a_n x^n$; check degree parity, coefficient sign, and direction.",
            "Rational functions: $\\deg P < \\deg Q \\implies 0$; $\\deg P = \\deg Q \\implies$ ratio of leading coefficients; $\\deg P > \\deg Q \\implies$ the remaining growth must be analyzed.",
            "Radicals: $\\sqrt{x^2} = |x|$; as $x \\to \\infty$, $|x| = x$; as $x \\to -\\infty$, $|x| = -x$.",
            "Horizontal asymptote: $\\lim_{x \\to \\infty} f(x) = L$ means the right end approaches $y = L$ (likewise for $x \\to -\\infty$). The graph may cross the asymptote.",
            "Relative growth: compare via $\\lim_{x \\to \\infty} f(x)/g(x)$; hierarchy $\\ln x \\ll x^p \\ll a^x$.",
          ],
        },
        {
          kind: "checklist",
          title: "Final check",
          items: [
            "Correct direction?",
            "Correct representation?",
            "Dominant behavior identified?",
            "Sign checked?",
            "Finite, infinite, or DNE?",
            "Asymptote interpreted correctly?",
            "Relative growth interpreted if needed?",
            "Approaches $\\neq$ equals?",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Master rule",
          body: "$x \\to \\pm\\infty \\implies$ find what dominates $\\implies$ determine the end behavior",
        },
      ],
    },
  ],
};

export const NAVIGATOR_GUIDES: Record<string, TopicGuide> = {
  "evaluating-limits-algebraically": evaluatingLimitsAlgebraically,
  "limits-from-graphs-and-tables": limitsFromGraphsAndTables,
  "squeeze-theorem": squeezeTheorem,
  "continuity-and-discontinuity": continuityAndDiscontinuity,
  "intermediate-value-theorem": intermediateValueTheorem,
  "limits-at-infinity": limitsAtInfinity,
};

export function getTopicGuide(slug: string): TopicGuide | undefined {
  return NAVIGATOR_GUIDES[slug];
}
