import type { TopicGuide } from "@/lib/navigator-guides";
export const higherOrderGuide: TopicGuide = {
  "sections": [
    {
      "id": "core-idea",
      "title": "The Core Idea: Differentiate the Derivative",
      "blocks": [
        {
          "kind": "prose",
          "text": "A higher-order derivative is obtained by differentiating the previous derivative. The second derivative measures how the first derivative changes; it is not the square of the first derivative."
        },
        {
          "kind": "formula",
          "label": "Second derivative",
          "tex": "f''(x)=\\frac{d}{dx}f'(x)=\\frac{d^2y}{dx^2}"
        },
        {
          "kind": "formula",
          "label": "Higher orders",
          "tex": "f^{(n)}(x)=\\frac{d}{dx}f^{(n-1)}(x)"
        },
        {
          "kind": "callout",
          "tone": "rule",
          "title": "Differentiate before substituting",
          "body": "Unless the next derivative is supplied directly, keep the variable in the first derivative until you have differentiated again."
        }
      ]
    },
    {
      "id": "recognition",
      "title": "When You See This → Think This",
      "blocks": [
        {
          "kind": "table",
          "columns": [
            "If you see…",
            "Think…",
            "First move…"
          ],
          "rows": [
            [
              "$f''(a)$",
              "Derivative of f' at a",
              "Find f'' before evaluating."
            ],
            [
              "$\\frac{d^2y}{dx^2}$",
              "Second derivative, not a square",
              "Differentiate dy/dx."
            ],
            [
              "$f^{(n)}(x)$",
              "Repeated differentiation",
              "Look for a pattern."
            ],
            [
              "Graph of f'",
              "Second derivative is slope",
              "Read tangent slope."
            ],
            [
              "Table of f'",
              "Estimate second derivative",
              "Compute a difference quotient."
            ],
            [
              "Implicit equation",
              "Differentiate implicitly twice",
              "Retain y and y' until substitution."
            ],
            [
              "Position function",
              "Velocity then acceleration",
              "Differentiate twice with respect to time."
            ],
            [
              "Composite function",
              "Repeated chain and product rules",
              "Differentiate the entire first derivative."
            ]
          ]
        }
      ]
    },
    {
      "id": "strategy",
      "title": "Strategy Flowchart",
      "blocks": [
        {
          "kind": "tree",
          "start": "identify",
          "nodes": [
            {
              "id": "identify",
              "prompt": "What representation is given?",
              "options": [
                {
                  "label": "Explicit formula",
                  "next": "order"
                },
                {
                  "label": "Implicit equation",
                  "outcome": "Find y', differentiate again using product and chain rules, then substitute y' and the point."
                },
                {
                  "label": "Graph of f'",
                  "outcome": "Read the tangent slope of f' at the requested input."
                },
                {
                  "label": "Table of f'",
                  "outcome": "Estimate f'' using the change in f' divided by the change in x; do not claim an exact value without sufficient information."
                }
              ]
            },
            {
              "id": "order",
              "prompt": "Which derivative is requested?",
              "options": [
                {
                  "label": "Second or third",
                  "outcome": "Differentiate successively, applying all required rules each time."
                },
                {
                  "label": "Large or general order",
                  "outcome": "Identify a repeating cycle or a coefficient pattern; verify the indexing."
                },
                {
                  "label": "Value at a point",
                  "outcome": "Differentiate to the requested order before substituting the input."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "question-families",
      "title": "Question Families You Must Recognize",
      "blocks": [
        {
          "kind": "list",
          "title": "Family A — Notation and direct repeated differentiation",
          "items": [
            "Distinguish f'', f''' and f^(n) from powers.",
            "Differentiate polynomials, rational powers, exponentials and trigonometric functions repeatedly."
          ]
        },
        {
          "kind": "list",
          "title": "Family B — Mixed and composite expressions",
          "items": [
            "For $f(x)=F(g(x))$, use $f''=F''(g)(g')^2+F'(g)g''$.",
            "Differentiate every term of the first derivative; apply product and quotient rules again when necessary."
          ]
        },
        {
          "kind": "list",
          "title": "Family C — Implicit second derivatives",
          "items": [
            "Differentiate the original relation to obtain y'.",
            "Differentiate the resulting relation again, retaining y'' and (y')² terms.",
            "Solve for y'' and substitute the first derivative only when appropriate."
          ]
        },
        {
          "kind": "list",
          "title": "Family D — Higher-order patterns",
          "items": [
            "Use the four-step cycle of sine and cosine.",
            "Track powers and factorial coefficients in repeated polynomial or reciprocal differentiation.",
            "Recognize exponential factors raised to the derivative order."
          ]
        },
        {
          "kind": "list",
          "title": "Family E — Graphical and tabular reasoning",
          "items": [
            "Read f'' as the slope of f', not the height of f'.",
            "Estimate f'' from nearby values of f'; distinguish estimates from exact derivatives.",
            "Interpret increasing or decreasing f' as evidence of the sign of f'' where it exists."
          ]
        },
        {
          "kind": "list",
          "title": "Family F — Reverse reasoning and parameters",
          "items": [
            "Use a supplied second derivative value to solve for a coefficient.",
            "Distinguish conditions on f, f' and f''; a second derivative alone does not determine the original function."
          ]
        },
        {
          "kind": "list",
          "title": "Family G — Contextual interpretation",
          "items": [
            "For position s(t), velocity is s'(t) and acceleration is s''(t).",
            "Track units through each differentiation; acceleration is not necessarily the rate of change of speed."
          ]
        },
        {
          "kind": "list",
          "title": "Family H — Error analysis and calculator reasoning",
          "items": [
            "Detect premature substitution, missing chain factors and incorrect derivative order.",
            "Use calculators for genuine numerical tasks, not routine symbolic repeated differentiation."
          ]
        }
      ]
    },
    {
      "id": "examples",
      "title": "Worked Examples",
      "blocks": [
        {
          "kind": "example",
          "title": "Repeated polynomial differentiation",
          "problem": "Find $f'''(x)$ if $f(x)=2x^5-3x^3+x$.",
          "steps": [
            {
              "label": "First derivative",
              "body": "$f'=10x^4-9x^2+1$."
            },
            {
              "label": "Second derivative",
              "body": "$f''=40x^3-18x$."
            },
            {
              "label": "Third derivative",
              "body": "$f'''=120x^2-18$."
            }
          ],
          "conclusion": "$120x^2-18$."
        },
        {
          "kind": "example",
          "title": "Composite second derivative",
          "problem": "Find $f''(x)$ for $f(x)=\\sin(x^2)$.",
          "steps": [
            {
              "label": "First derivative",
              "body": "$f'=2x\\cos(x^2)$."
            },
            {
              "label": "Product and chain rules",
              "body": "$f''=2\\cos(x^2)-4x^2\\sin(x^2)$."
            }
          ],
          "conclusion": "$2\\cos(x^2)-4x^2\\sin(x^2)$."
        },
        {
          "kind": "example",
          "title": "Implicit second derivative",
          "problem": "For $x^2+y^2=25$, find $y''$ at $(3,4)$.",
          "steps": [
            {
              "label": "First derivative",
              "body": "$x+yy'=0$, so $y'=-x/y$."
            },
            {
              "label": "Differentiate again",
              "body": "$1+(y')^2+yy''=0$."
            },
            {
              "label": "Substitute",
              "body": "$y''=-(1+9/16)/4$."
            }
          ],
          "conclusion": "$y''=-25/64$."
        },
        {
          "kind": "example",
          "title": "Derivative cycle",
          "problem": "Find the 23rd derivative of $\\sin x$.",
          "steps": [
            {
              "label": "Identify cycle",
              "body": "$\\sin x,\\cos x,-\\sin x,-\\cos x$ repeat every four derivatives."
            },
            {
              "label": "Find remainder",
              "body": "$23=4(5)+3$."
            }
          ],
          "conclusion": "$f^{(23)}(x)=-\\cos x$."
        },
        {
          "kind": "example",
          "title": "Table-based estimate",
          "problem": "Suppose $f'(1.9)=3.4$ and $f'(2.1)=4.2$. Estimate $f''(2)$.",
          "steps": [
            {
              "label": "Use nearby first derivatives",
              "body": "$\\frac{f'(2.1)-f'(1.9)}{2.1-1.9}$."
            },
            {
              "label": "Compute",
              "body": "$0.8/0.2=4$."
            }
          ],
          "conclusion": "$f''(2)\\approx4$."
        },
        {
          "kind": "example",
          "title": "Reverse parameter",
          "problem": "Let $f(x)=ax^3+2x^2$. If $f''(1)=16$, find a.",
          "steps": [
            {
              "label": "Differentiate twice",
              "body": "$f''(x)=6ax+4$."
            },
            {
              "label": "Impose condition",
              "body": "$6a+4=16$."
            }
          ],
          "conclusion": "$a=2$."
        },
        {
          "kind": "example",
          "title": "Motion interpretation",
          "problem": "A particle has position $s(t)=t^3-6t^2+9t$ meters. Find acceleration at $t=3$ seconds.",
          "steps": [
            {
              "label": "Velocity",
              "body": "$v(t)=3t^2-12t+9$."
            },
            {
              "label": "Acceleration",
              "body": "$a(t)=6t-12$."
            },
            {
              "label": "Evaluate",
              "body": "$a(3)=6$."
            }
          ],
          "conclusion": "Acceleration is 6 meters per second squared."
        }
      ]
    },
    {
      "id": "mcq-frq",
      "title": "MCQ & FRQ Strategy",
      "blocks": [
        {
          "kind": "callout",
          "tone": "info",
          "title": "MCQ: track the order",
          "items": [
            "Check whether the question asks for f', f'' or a higher order.",
            "Eliminate answers that square the derivative or omit a product-rule term.",
            "For graph questions, identify which function is actually plotted."
          ]
        },
        {
          "kind": "callout",
          "tone": "rule",
          "title": "FRQ: show successive differentiation",
          "items": [
            "Write intermediate derivatives clearly.",
            "For implicit differentiation, show the second differentiation and solve for y''.",
            "Label estimates and include contextual units."
          ]
        }
      ]
    },
    {
      "id": "errors",
      "title": "Common Mistakes — Detect & Prevent",
      "blocks": [
        {
          "kind": "table",
          "columns": [
            "Mistake",
            "Why it fails",
            "Prevention"
          ],
          "rows": [
            [
              "Squaring f'",
              "Second derivative is a derivative, not a power.",
              "Differentiate f'."
            ],
            [
              "Substituting a point too early",
              "A numerical value loses variable dependence.",
              "Evaluate after differentiating."
            ],
            [
              "Missing product terms",
              "First derivative may itself be a product.",
              "Reidentify the rules each time."
            ],
            [
              "Treating y' as constant",
              "y' depends on x.",
              "Differentiate y' to obtain y''."
            ],
            [
              "Reading height of f'",
              "Height gives f', not f''.",
              "Read slope."
            ],
            [
              "Calling a secant estimate exact",
              "Finite differences are generally approximate.",
              "Use approximation notation."
            ]
          ]
        }
      ]
    },
    {
      "id": "quick-reference",
      "title": "Exam-Day Quick Reference",
      "blocks": [
        {
          "kind": "list",
          "title": "Identify → Differentiate → Evaluate → Check",
          "items": [
            "Identify the derivative order and representation.",
            "Differentiate successively or recognize a verified pattern.",
            "Evaluate at the requested input only after differentiation.",
            "Check signs, domain, notation and units."
          ]
        },
        {
          "kind": "checklist",
          "title": "Can you do this?",
          "items": [
            "Compute second and third derivatives.",
            "Handle mixed and implicit second derivatives.",
            "Recognize higher-order patterns.",
            "Interpret graphs and tables of derivatives.",
            "Solve parameter and contextual problems."
          ]
        }
      ]
    }
  ]
};
