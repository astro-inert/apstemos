import type { TopicGuide } from "@/lib/navigator-guides";
export const linearizationGuide: TopicGuide = {
  "sections": [
    {
      "id": "core",
      "title": "Core Idea: Replace the Curve Locally",
      "blocks": [
        {
          "kind": "prose",
          "text": "CED Topic 4.6, CHA-3.F, CHA-3.F.1–2, suggested skill 1.F (College Board course framework, p. 87). The following families are original APSTEMOS classifications."
        },
        {
          "kind": "prose",
          "text": "A differentiable function behaves like its tangent line to first order near the point of tangency. Knowing a value and instantaneous rate lets you estimate a nearby value without knowing the whole function."
        },
        {
          "kind": "formula",
          "label": "Linearization",
          "tex": "L(x)=f(a)+f'(a)(x-a)"
        },
        {
          "kind": "formula",
          "label": "Local change",
          "tex": "\\Delta f\\approx f'(a)\\Delta x"
        },
        {
          "kind": "callout",
          "tone": "rule",
          "title": "Anchor versus target",
          "body": "Evaluate the derivative at the known anchor a, not at the unknown target x. The approximation is exact at a; elsewhere it may or may not be exact."
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
            "Signal",
            "Think",
            "First move"
          ],
          "rows": [
            [
              "Estimate a nearby function value",
              "Tangent line",
              "Find anchor, height and slope"
            ],
            [
              "Approximate a change",
              "Slope times increment",
              "Compute signed increment"
            ],
            [
              "Table of f and f'",
              "Use same anchor row",
              "Choose a nearby usable row"
            ],
            [
              "Graph of tangent line",
              "Read slope and intercept",
              "Evaluate line at target"
            ],
            [
              "Overestimate or underestimate",
              "Concavity over intervening interval",
              "Check f' increasing/decreasing"
            ],
            [
              "Known approximation, missing slope",
              "Reverse linearization",
              "Solve the linear equation"
            ],
            [
              "Rate and current measurement",
              "Contextual prediction",
              "Multiply rate by elapsed time"
            ],
            [
              "Which estimate is justified?",
              "Check assumptions",
              "Distinguish local prediction from exact value"
            ]
          ]
        }
      ]
    },
    {
      "id": "tree",
      "title": "Strategy Flowchart",
      "blocks": [
        {
          "kind": "tree",
          "start": "task",
          "nodes": [
            {
              "id": "task",
              "prompt": "What is being requested?",
              "options": [
                {
                  "label": "Nearby value or change",
                  "next": "data"
                },
                {
                  "label": "Overestimate or underestimate",
                  "outcome": "Check concavity on the interval joining anchor and target; compare the curve to its tangent."
                },
                {
                  "label": "Missing slope or anchor value",
                  "outcome": "Solve L(x)=f(a)+f'(a)(x-a) for the missing quantity; check nonzero increment if dividing."
                },
                {
                  "label": "Validity or error",
                  "outcome": "Check differentiability, known data, proximity and whether curvature information is sufficient."
                }
              ]
            },
            {
              "id": "data",
              "prompt": "What information is given?",
              "options": [
                {
                  "label": "Explicit formula",
                  "outcome": "Choose a convenient nearby anchor, calculate f(a) and f'(a), then evaluate L."
                },
                {
                  "label": "Table or graph",
                  "outcome": "Read the anchor value and tangent slope; label any estimated slope as approximate."
                },
                {
                  "label": "Context and rate",
                  "outcome": "Use current value plus rate times signed time change; retain units."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "families",
      "title": "Question Families & Types",
      "blocks": [
        {
          "kind": "list",
          "title": "Family A — Direct tangent approximation",
          "items": [
            "A1: Build L from an explicit function.",
            "A2: Choose a convenient nearby anchor for a radical, exponential or logarithm.",
            "A3: Distinguish estimated function value from estimated change."
          ]
        },
        {
          "kind": "list",
          "title": "Family B — Supplied data and representations",
          "items": [
            "B1: Use supplied f(a) and f'(a).",
            "B2: Read a table of values and derivatives.",
            "B3: Read a graph's tangent line or labeled slope; distinguish secants from tangents."
          ]
        },
        {
          "kind": "list",
          "title": "Family C — Concavity and error direction",
          "items": [
            "C1: Use concavity up or down over the relevant interval.",
            "C2: Infer concavity from monotonicity of f' or the sign of f''.",
            "C3: Determine when information is insufficient, including changing concavity."
          ]
        },
        {
          "kind": "list",
          "title": "Family D — Reverse reasoning",
          "items": [
            "D1: Recover the derivative from a stated linear approximation.",
            "D2: Recover the anchor value or increment.",
            "D3: Recover a parameter from a tangent-line equation."
          ]
        },
        {
          "kind": "list",
          "title": "Family E — Contextual linearization",
          "items": [
            "E1: Predict a nearby measurement from its instantaneous rate.",
            "E2: Interpret signed changes and units.",
            "E3: Use derivatives obtained by chain or implicit differentiation."
          ]
        },
        {
          "kind": "list",
          "title": "Family F — Validity and comparison",
          "items": [
            "F1: Distinguish tangent from secant approximations.",
            "F2: Compare approximations when actual values or sufficient curvature data are available.",
            "F3: Recognize limits of local approximation without assuming proximity guarantees a specific error."
          ]
        },
        {
          "kind": "list",
          "title": "Family G — Error analysis and method selection",
          "items": [
            "G1: Detect wrong anchor, wrong sign or missing base value.",
            "G2: Reject overestimate claims based solely on increasing/decreasing behavior.",
            "G3: Select a valid setup and interpret calculator output."
          ]
        }
      ]
    },
    {
      "id": "error-direction",
      "title": "Why Concavity Controls Error",
      "blocks": [
        {
          "kind": "prose",
          "text": "On an interval containing both anchor and target, a differentiable concave-up function lies on or above its tangent; a concave-down function lies on or below its tangent. Strict inequalities require stronger information, such as strictly positive or negative second derivative across the interval."
        },
        {
          "kind": "formula",
          "label": "Concave up",
          "tex": "f''>0\\ \\Longrightarrow\\ L(x)<f(x)\\quad(x\\ne a)"
        },
        {
          "kind": "formula",
          "label": "Concave down",
          "tex": "f''<0\\ \\Longrightarrow\\ L(x)>f(x)\\quad(x\\ne a)"
        },
        {
          "kind": "callout",
          "tone": "rule",
          "title": "Both sides of the anchor",
          "body": "The direction of the inequality does not reverse merely because x is to the left of a. A positive derivative tells you the function increases, not whether the tangent overestimates."
        },
        {
          "kind": "prose",
          "text": "The sign of f'' at a single point is not enough to justify a claim at an arbitrary target. Check the intervening interval. Taylor remainder bounds are not needed for this AB/BC topic."
        }
      ]
    },
    {
      "id": "examples",
      "title": "Worked Examples",
      "blocks": [
        {
          "kind": "example",
          "title": "A · Convenient anchor",
          "problem": "Approximate $\\sqrt{26}$.",
          "steps": [
            {
              "label": "Recognize",
              "body": "Use $f(x)=\\sqrt{x}$ and $a=25$."
            },
            {
              "label": "Differentiate",
              "body": "$f'(25)=1/10$."
            },
            {
              "label": "Estimate",
              "body": "$L(26)=5+(1/10)(1)$."
            }
          ],
          "conclusion": "$\\sqrt{26}\\approx5.1$."
        },
        {
          "kind": "example",
          "title": "A · Signed change",
          "problem": "If $f(3)=8$ and $f'(3)=-4$, estimate $f(2.9)$ and the change from 3.",
          "steps": [
            {
              "label": "Increment",
              "body": "$\\Delta x=-0.1$."
            },
            {
              "label": "Change",
              "body": "$\\Delta f\\approx(-4)(-0.1)=0.4$."
            }
          ],
          "conclusion": "$f(2.9)\\approx8.4$."
        },
        {
          "kind": "table",
          "columns": [
            "x",
            "f(x)",
            "f'(x)"
          ],
          "rows": [
            [
              "1",
              "3",
              "2"
            ],
            [
              "2",
              "5",
              "1"
            ],
            [
              "3",
              "6",
              "0"
            ]
          ]
        },
        {
          "kind": "example",
          "title": "B · Table",
          "problem": "Use the preceding table to estimate $f(2.1)$ from the anchor 2.",
          "steps": [
            {
              "label": "Same row",
              "body": "$f(2)=5$, $f'(2)=1$."
            },
            {
              "label": "Evaluate",
              "body": "$5+1(0.1)$."
            }
          ],
          "conclusion": "5.1 approximately."
        },
        {
          "kind": "example",
          "title": "B · Graph information",
          "problem": "A tangent at $(2,7)$ also passes through $(4,1)$. Estimate $f(1.9)$.",
          "steps": [
            {
              "label": "Slope",
              "body": "$m=(1-7)/(4-2)=-3$."
            },
            {
              "label": "Evaluate",
              "body": "$7-3(1.9-2)=7.3$."
            }
          ],
          "conclusion": "7.3 approximately; the second point is on the tangent, not necessarily the curve."
        },
        {
          "kind": "example",
          "title": "C · Underestimate",
          "problem": "Estimate $e^{0.1}$ using the tangent at 0 and justify error direction.",
          "steps": [
            {
              "label": "Linearize",
              "body": "$L(x)=1+x$, so $L(0.1)=1.1$."
            },
            {
              "label": "Justify",
              "body": "$f''(x)=e^x>0$ on $[0,0.1]$."
            }
          ],
          "conclusion": "1.1 is an underestimate."
        },
        {
          "kind": "example",
          "title": "C · Insufficient information",
          "problem": "Given $f(0)=0$, $f'(0)=1$ and $f''(0)=0$, is $L(1)$ above or below $f(1)$?",
          "steps": [
            {
              "label": "Counterexamples",
              "body": "$f(x)=x+x^3$ and $g(x)=x-x^3$ satisfy all three data."
            },
            {
              "label": "Compare",
              "body": "$L(1)=1$, while $f(1)=2$ and $g(1)=0$."
            }
          ],
          "conclusion": "Neither direction is guaranteed."
        },
        {
          "kind": "example",
          "title": "D · Recover slope",
          "problem": "The linearization at 4 has $L(4)=9$ and $L(4.2)=8$. Find $f'(4)$.",
          "steps": [
            {
              "label": "Slope",
              "body": "$f'(4)=(8-9)/0.2$."
            }
          ],
          "conclusion": "-5."
        },
        {
          "kind": "example",
          "title": "E · Context",
          "problem": "A tank contains 120 L at noon and its volume derivative is $-3$ L/min. Estimate the volume 2 minutes later.",
          "steps": [
            {
              "label": "Model",
              "body": "$V(2)\\approx120+(-3)(2)$."
            }
          ],
          "conclusion": "114 L approximately. The rate need not stay constant."
        },
        {
          "kind": "example",
          "title": "E · Hidden implicit derivative",
          "problem": "A differentiable positive branch satisfies $x^2+y^2=25$ near $(3,4)$. Estimate y at x=3.1.",
          "steps": [
            {
              "label": "Differentiate",
              "body": "$y'=-x/y$, so $y'(3)=-3/4$."
            },
            {
              "label": "Linearize",
              "body": "$4-(3/4)(0.1)=3.925$."
            }
          ],
          "conclusion": "3.925 approximately."
        },
        {
          "kind": "example",
          "title": "F · Compare against actual",
          "problem": "For $f(x)=x^2$, estimate $f(2.1)$ using anchors 2 and 3. Compare absolute errors.",
          "steps": [
            {
              "label": "Anchor 2",
              "body": "$4+4(0.1)=4.4$."
            },
            {
              "label": "Anchor 3",
              "body": "$9+6(-0.9)=3.6$."
            },
            {
              "label": "Actual",
              "body": "$f(2.1)=4.41$; errors are $0.01$ and $0.81$."
            }
          ],
          "conclusion": "The anchor 2 is better here; this is not a universal nearest-anchor theorem."
        },
        {
          "kind": "example",
          "title": "G · Diagnose error",
          "problem": "A student estimates $\\ln(1.05)$ by $1.05$ using anchor 1.",
          "steps": [
            {
              "label": "Check anchor",
              "body": "$\\ln 1=0$, $f'(1)=1$."
            },
            {
              "label": "Correct",
              "body": "$L(1.05)=0+1(0.05)=0.05$."
            }
          ],
          "conclusion": "0.05 is an overestimate because ln is concave down on [1,1.05]."
        }
      ]
    },
    {
      "id": "representation",
      "title": "Representation Switching",
      "blocks": [
        {
          "kind": "table",
          "columns": [
            "Given",
            "Extract",
            "Avoid"
          ],
          "rows": [
            [
              "Formula",
              "Anchor value and derivative",
              "Evaluating derivative at target"
            ],
            [
              "f and f' table",
              "Matched row",
              "Mixing rows"
            ],
            [
              "f-only table",
              "Secant approximation to slope if requested",
              "Calling the secant exact"
            ],
            [
              "Graph of f",
              "Tangent point and slope",
              "Reading slope as height"
            ],
            [
              "Graph of f'",
              "Slope of f from height of f'; concavity from monotonicity",
              "Using height of f' as f(a)"
            ],
            [
              "Context",
              "Current value, rate, signed change",
              "Ignoring units"
            ]
          ]
        }
      ]
    },
    {
      "id": "exam",
      "title": "MCQ & FRQ Strategy",
      "blocks": [
        {
          "kind": "list",
          "title": "MCQ recognition",
          "items": [
            "Direct computation: write the three terms before evaluating.",
            "Equivalent expression: compare slope and anchor value.",
            "Error direction: use curvature on the relevant interval, not sign of f'.",
            "Reverse problem: solve for the missing quantity with correct restrictions.",
            "Calculator-active: obtain necessary numerical derivative or compare actual and estimated values without premature rounding."
          ]
        },
        {
          "kind": "callout",
          "tone": "rule",
          "title": "FRQ justification",
          "body": "State the tangent approximation with the anchor, substitute the requested input, and explain error direction using concavity on the intervening interval. Include units when contextual."
        },
        {
          "kind": "example",
          "title": "FRQ model response",
          "problem": "Suppose $P(5)=40$, $P'(5)=3$, and $P''(t)<0$ for $5\\le t\\le 5.2$. Estimate $P(5.2)$ and justify whether the estimate is high or low.",
          "steps": [
            {
              "label": "Setup",
              "body": "$L(t)=40+3(t-5)$."
            },
            {
              "label": "Evaluate",
              "body": "$P(5.2)\\approx L(5.2)=40.6$."
            },
            {
              "label": "Justify",
              "body": "Since $P''<0$ throughout the interval, P is concave down and its tangent lies above the curve."
            }
          ],
          "conclusion": "40.6 is an overestimate."
        }
      ]
    },
    {
      "id": "errors",
      "title": "Common Mistakes",
      "blocks": [
        {
          "kind": "table",
          "columns": [
            "Mistake",
            "Repair"
          ],
          "rows": [
            [
              "Use f'(x) instead of f'(a)",
              "Hold the tangent slope fixed"
            ],
            [
              "Forget f(a)",
              "Distinguish change from value"
            ],
            [
              "Use x rather than x−a",
              "Compute signed displacement"
            ],
            [
              "Use increasing to justify error",
              "Check concavity"
            ],
            [
              "Assume f''(a)=0 means exact",
              "Check behavior throughout interval"
            ],
            [
              "Treat approximation as equality",
              "Use ≈ unless equality established"
            ],
            [
              "Assume nearest anchor always best",
              "Compare error with sufficient evidence"
            ]
          ]
        }
      ]
    },
    {
      "id": "summary",
      "title": "Connections & Exam-Day Checklist",
      "blocks": [
        {
          "kind": "list",
          "title": "Cross-topic connections",
          "items": [
            "Unit 2 tangent slope and derivative definition supply local linearity.",
            "Unit 3 differentiation rules and procedure selection help find the anchor slope.",
            "Unit 4 contextual rates supply units and meaning.",
            "Unit 5 concavity supplies error-direction reasoning.",
            "Unit 10 Taylor polynomials extend this idea; higher-order terms and remainder bounds are outside core Topic 4.6."
          ]
        },
        {
          "kind": "list",
          "title": "Difficulty progression",
          "items": [
            "Introductory: supplied anchor value and slope.",
            "Standard: choose anchor and differentiate.",
            "Challenging: infer concavity from another representation or reverse the approximation.",
            "Stretch: distinguish insufficient data from valid error comparisons."
          ]
        },
        {
          "kind": "checklist",
          "title": "Can you do this?",
          "items": [
            "Choose an anchor and form its tangent.",
            "Estimate a value or signed change.",
            "Extract data from graphs and tables.",
            "Justify overestimate or underestimate.",
            "Recognize insufficient information.",
            "Recover a missing slope or parameter.",
            "Communicate a contextual FRQ answer."
          ]
        },
        {
          "kind": "prose",
          "text": "Source: College Board AP Calculus AB and BC Course and Exam Description, Topic 4.6, course framework p. 87. https://apcentral.collegeboard.org/media/pdf/ap-calculus-ab-and-bc-course-and-exam-description.pdf"
        }
      ]
    }
  ]
};
