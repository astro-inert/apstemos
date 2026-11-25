import type { TopicGuide } from "@/lib/navigator-guides";
export const inverseTrigGuide: TopicGuide = {
  "sections": [
    {
      "id": "core-idea",
      "title": "The Core Idea: Inverse Trig Derivatives",
      "blocks": [
        {
          "kind": "prose",
          "text": "Inverse trigonometric functions return principal angles. Differentiate the outer inverse trig function and multiply by the derivative of its argument."
        },
        {
          "kind": "formula",
          "label": "Inverse sine",
          "tex": "\\frac{u'}{\\sqrt{1-u^2}}"
        },
        {
          "kind": "formula",
          "label": "Inverse cosine",
          "tex": "-\\frac{u'}{\\sqrt{1-u^2}}"
        },
        {
          "kind": "formula",
          "label": "Inverse tangent",
          "tex": "\\frac{u'}{1+u^2}"
        },
        {
          "kind": "callout",
          "tone": "rule",
          "title": "Domain check",
          "body": "For arcsin and arccos the formulas require $|u|<1$. At $u=\\pm1$, examine the composite directly; the derivative may still exist. Arctan accepts all real arguments."
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
              "$\\sin^{-1}x$",
              "Inverse, not reciprocal",
              "Rewrite as arcsin."
            ],
            [
              "$\\arccos(3x)$",
              "Negative chain rule",
              "$-3/\\sqrt{1-9x^2}$"
            ],
            [
              "$\\arctan(x^2)$",
              "Chain rule",
              "$2x/(1+x^4)$"
            ],
            [
              "$x\\arctan x$",
              "Product rule",
              "Differentiate both factors."
            ],
            [
              "$\\ln(\\arcsin x)$",
              "Nested chain rule",
              "Start with logarithm."
            ],
            [
              "$\\sin y=x$",
              "Implicit derivation",
              "Differentiate both sides."
            ],
            [
              "Graph or table of inner function",
              "Composition",
              "Read u(a) and u'(a)."
            ],
            [
              "Tangent or target slope",
              "Reverse reasoning",
              "Compute derivative and impose condition."
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
              "prompt": "What is the question asking?",
              "options": [
                {
                  "label": "Differentiate",
                  "next": "outer"
                },
                {
                  "label": "Derive the formula",
                  "outcome": "Write the ordinary trig equation and differentiate implicitly using the principal branch."
                },
                {
                  "label": "Find a slope or parameter",
                  "outcome": "Differentiate, impose the given condition, and check the domain."
                },
                {
                  "label": "Check differentiability",
                  "outcome": "Check the domain; analyze endpoints directly."
                }
              ]
            },
            {
              "id": "outer",
              "prompt": "What is the outer operation?",
              "options": [
                {
                  "label": "Arcsin or arccos",
                  "outcome": "Use $\\pm u'/\\sqrt{1-u^2}$; minus for arccos."
                },
                {
                  "label": "Arctan",
                  "outcome": "Use $u'/(1+u^2)$."
                },
                {
                  "label": "Product or quotient",
                  "outcome": "Apply the product or quotient rule first."
                },
                {
                  "label": "Power, log or exponential",
                  "outcome": "Apply the outer chain rule first."
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
          "title": "Family A — Recognition and direct derivatives",
          "items": [
            "Distinguish inverse and reciprocal notation.",
            "Choose the correct sign and denominator; evaluate exact slopes."
          ]
        },
        {
          "kind": "list",
          "title": "Family B — Composite arguments",
          "items": [
            "Differentiate affine, polynomial, rational, radical, exponential and trig arguments.",
            "Apply every chain-rule layer; use supplied table values at the correct input."
          ]
        },
        {
          "kind": "list",
          "title": "Family C — Mixed differentiation",
          "items": [
            "Combine product, quotient and outer chain rules.",
            "Simplify inverse identities only on valid principal branches."
          ]
        },
        {
          "kind": "list",
          "title": "Family D — Implicit and geometric reasoning",
          "items": [
            "Derive formulas from ordinary trig equations.",
            "Find tangent lines and compare graph slopes."
          ]
        },
        {
          "kind": "list",
          "title": "Family E — Reverse reasoning",
          "items": [
            "Solve for a parameter or input from a given derivative.",
            "Reject extraneous roots and check domains."
          ]
        },
        {
          "kind": "list",
          "title": "Family F — Domain and conceptual exceptions",
          "items": [
            "Distinguish function domain from derivative domain.",
            "Investigate composite endpoints directly."
          ]
        },
        {
          "kind": "list",
          "title": "Family G — Error analysis",
          "items": [
            "Detect missing chain factors, wrong signs, wrong denominators and reciprocal confusion."
          ]
        },
        {
          "kind": "list",
          "title": "Family H — Context and calculator reasoning",
          "items": [
            "Interpret angle rates in radians per unit.",
            "Use calculators for genuine numerical root solving or approximation, not routine exact derivatives."
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
          "title": "Affine inverse cosine",
          "problem": "Differentiate $f(x)=\\arccos(2x-1)$.",
          "steps": [
            {
              "label": "Identify",
              "body": "Outer arccos, inner affine function."
            },
            {
              "label": "Differentiate",
              "body": "$f'(x)=-2/\\sqrt{1-(2x-1)^2}$."
            },
            {
              "label": "Check domain",
              "body": "$0<x<1$."
            }
          ],
          "conclusion": "$f'(x)=-\\frac2{\\sqrt{1-(2x-1)^2}}$."
        },
        {
          "kind": "example",
          "title": "Product rule",
          "problem": "Differentiate $x^2\\arctan x$.",
          "steps": [
            {
              "label": "Identify factors",
              "body": "$u=x^2$, $v=\\arctan x$."
            },
            {
              "label": "Apply product rule",
              "body": "$u'v+uv'$."
            }
          ],
          "conclusion": "$2x\\arctan x+\\frac{x^2}{1+x^2}$."
        },
        {
          "kind": "example",
          "title": "Derive inverse sine",
          "problem": "Find the derivative of $y=\\arcsin x$ for $-1<x<1$.",
          "steps": [
            {
              "label": "Reverse",
              "body": "$\\sin y=x$."
            },
            {
              "label": "Differentiate",
              "body": "$\\cos y\\,y'=1$."
            },
            {
              "label": "Principal branch",
              "body": "$\\cos y=\\sqrt{1-x^2}>0$."
            }
          ],
          "conclusion": "$y'=\\frac1{\\sqrt{1-x^2}}$."
        },
        {
          "kind": "example",
          "title": "Reverse slope",
          "problem": "Where does $\\arctan x$ have slope $1/5$?",
          "steps": [
            {
              "label": "Set equation",
              "body": "$1/(1+x^2)=1/5$."
            },
            {
              "label": "Solve",
              "body": "$x^2=4$."
            }
          ],
          "conclusion": "$x=\\pm2$."
        },
        {
          "kind": "example",
          "title": "Supplied inner values",
          "problem": "If $g(2)=1/2$ and $g'(2)=-3$, find the derivative of $\\arcsin(g(x))$ at 2.",
          "steps": [
            {
              "label": "Chain rule",
              "body": "$g'(2)/\\sqrt{1-g(2)^2}$."
            },
            {
              "label": "Substitute",
              "body": "$-3/\\sqrt{3/4}$."
            }
          ],
          "conclusion": "$-2\\sqrt3$."
        },
        {
          "kind": "example",
          "title": "Endpoint exception",
          "problem": "Is $f(x)=\\arcsin(1-x^4)$ differentiable at zero?",
          "steps": [
            {
              "label": "Recognize",
              "body": "The standard chain-rule formula is undefined there."
            },
            {
              "label": "Analyze",
              "body": "Near zero, $\\pi/2-f(x)=2\\arcsin(x^2/\\sqrt2)$."
            },
            {
              "label": "Difference quotient",
              "body": "Since $\\arcsin z/z\\to1$, $(f(x)-f(0))/x\\to0$."
            }
          ],
          "conclusion": "$f'(0)=0$."
        },
        {
          "kind": "example",
          "title": "Angle rate",
          "problem": "If $\\theta(t)=\\arctan(t/4)$, find its rate at $t=4$ seconds.",
          "steps": [
            {
              "label": "Differentiate",
              "body": "$\\theta'(t)=(1/4)/(1+t^2/16)$."
            },
            {
              "label": "Evaluate",
              "body": "$\\theta'(4)=1/8$."
            }
          ],
          "conclusion": "The angle increases at 1/8 radian per second."
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
          "title": "MCQ: eliminate structural errors",
          "items": [
            "Check sign, denominator and inner derivative.",
            "Use exact values unless numerical approximation is requested.",
            "Read graph and table evidence at the correct input."
          ]
        },
        {
          "kind": "callout",
          "tone": "rule",
          "title": "FRQ: show the method",
          "items": [
            "Write the chain-rule expression before evaluating.",
            "Justify the principal branch when deriving formulas.",
            "Explain domain restrictions and include contextual units."
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
              "Inverse equals reciprocal",
              "Different operations",
              "Use arcsin notation."
            ],
            [
              "Positive arccos derivative",
              "Arccos decreases",
              "Include minus sign."
            ],
            [
              "Square root in arctan denominator",
              "Wrong formula",
              "Use 1+u²."
            ],
            [
              "Missing inner derivative",
              "Composition requires chain rule",
              "Label u and u'."
            ],
            [
              "Undefined formula implies no derivative",
              "Composite endpoint may be differentiable",
              "Check difference quotient."
            ],
            [
              "Ignoring principal branch",
              "Inverse identities depend on domain",
              "Check branch."
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
          "title": "Recognize → Differentiate → Check",
          "items": [
            "Identify inverse trig function.",
            "Choose sign and denominator.",
            "Multiply by inner derivative.",
            "Check domain, exactness and units."
          ]
        },
        {
          "kind": "checklist",
          "title": "Can you do this?",
          "items": [
            "Recall all three formulas.",
            "Differentiate nested and mixed expressions.",
            "Derive formulas implicitly.",
            "Use graph and table data.",
            "Solve reverse slope and domain questions."
          ]
        }
      ]
    }
  ]
};
