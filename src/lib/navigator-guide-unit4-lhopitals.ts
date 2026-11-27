import type { TopicGuide } from "@/lib/navigator-guides";

export const lhopitalsGuide: TopicGuide = {
  "sections": [
    {
      "id": "core-idea",
      "title": "The Core Idea: Check the Form Before Differentiating",
      "blocks": [
        {
          "kind": "prose",
          "text": "When both numerator and denominator approach zero, their relative rates of change can determine the quotient's limit. The same principle applies when both grow without bound. Your first move is to identify the limiting form."
        },
        {
          "kind": "callout",
          "tone": "rule",
          "title": "When the rule applies",
          "body": "Let $f$ and $g$ be differentiable on a punctured interval approaching the target, with $g'(x)\\ne0$ there. Suppose the quotient has form $0/0$ or $\\pm\\infty/\\pm\\infty$. If $\\lim f'(x)/g'(x)$ exists as a finite value or signed infinity, the original quotient has that same limit. Use the appropriate one-sided interval at a boundary; the target may also be infinite."
        },
        {
          "kind": "formula",
          "label": "Differentiate numerator and denominator separately",
          "tex": "\\lim_{x\\to a}\\frac{f(x)}{g(x)}=\\lim_{x\\to a}\\frac{f'(x)}{g'(x)}"
        },
        {
          "kind": "callout",
          "tone": "rule",
          "title": "The form is a checkpoint",
          "body": "$0/0$ and $\\infty/\\infty$ describe competing behavior. They are not answers. A nonzero number divided by a quantity approaching zero requires sign analysis. A finite numerator over a denominator growing without bound tends to zero."
        },
        {
          "kind": "callout",
          "tone": "rule",
          "title": "Recheck after every application",
          "body": "Evaluate the new quotient's limiting form. Apply the rule again only when the new quotient still satisfies its conditions. An inconclusive derivative quotient does not prove that the original limit fails to exist."
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
              "Both numerator and denominator approach 0",
              "Rates may resolve the quotient",
              "Verify differentiability and denominator derivative conditions."
            ],
            [
              "Both numerator and denominator grow without bound",
              "Compare their derivative growth",
              "Check signs and the direction of approach."
            ],
            [
              "A substituted denominator of 0",
              "Determine the numerator limit first",
              "Distinguish zero-over-zero from nonzero-over-zero."
            ],
            [
              "Another indeterminate quotient after differentiating",
              "A second application may work",
              "Recheck the form before differentiating again."
            ],
            [
              "Values of f, g, f′ and g′",
              "The functions establish the form; derivatives supply the ratio",
              "Check stated smoothness and continuity assumptions."
            ],
            [
              "An unknown coefficient in a finite-limit condition",
              "The numerator may need to vanish",
              "Solve the cancellation condition first."
            ],
            [
              "A student's differentiated quotient",
              "Audit the use of the theorem",
              "Check the original form and separate derivatives."
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
          "start": "form",
          "nodes": [
            {
              "id": "form",
              "prompt": "What happens to the numerator and denominator?",
              "options": [
                {
                  "label": "0/0 or infinity/infinity",
                  "next": "conditions"
                },
                {
                  "label": "Finite denominator is nonzero",
                  "outcome": "Use limit laws and substitute."
                },
                {
                  "label": "Nonzero numerator over zero",
                  "outcome": "Check signs on each requested side."
                },
                {
                  "label": "Finite numerator over infinity",
                  "outcome": "The limit is zero."
                },
                {
                  "label": "Product, difference or variable power",
                  "outcome": "Simplify or reformulate first; the rule applies to eligible quotients."
                }
              ]
            },
            {
              "id": "conditions",
              "prompt": "Are the differentiability and denominator-derivative conditions satisfied near the target?",
              "options": [
                {
                  "label": "Yes",
                  "next": "differentiate"
                },
                {
                  "label": "No or not established",
                  "outcome": "Use another justified method or identify the missing assumptions."
                }
              ]
            },
            {
              "id": "differentiate",
              "prompt": "Differentiate numerator and denominator separately. What is the new limit?",
              "options": [
                {
                  "label": "Evaluates to a finite value or signed infinity",
                  "outcome": "State the original limit and justify the application."
                },
                {
                  "label": "Still an eligible indeterminate form",
                  "next": "conditions"
                },
                {
                  "label": "Oscillates or is unresolved",
                  "outcome": "The theorem is inconclusive here. Reconsider algebra or another limit method."
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
          "title": "Family A — Recognize eligibility",
          "items": [
            "A1: Identify $0/0$ from substitution or given limits.",
            "A2: Identify $\\infty/\\infty$ with the correct signs and direction.",
            "A3: Reject applications to determinate forms or when hypotheses fail."
          ]
        },
        {
          "kind": "list",
          "title": "Family B — Evaluate eligible quotients",
          "items": [
            "B1: Differentiate and evaluate at a finite target.",
            "B2: Compare growth as the input tends to infinity.",
            "B3: Keep the requested one-sided approach through the calculation."
          ]
        },
        {
          "kind": "list",
          "title": "Family C — Repeated application and simplification",
          "items": [
            "C1: Recheck and apply the rule more than once.",
            "C2: Simplify after an application when substitution then works.",
            "C3: Choose factoring or a known limit when it gives a shorter justified solution."
          ]
        },
        {
          "kind": "list",
          "title": "Family D — Supplied data and representations",
          "items": [
            "D1: Use supplied function and derivative values with the required regularity.",
            "D2: Read limiting values and tangent slopes from labeled graphs.",
            "D3: Distinguish exact information from finite numerical samples."
          ]
        },
        {
          "kind": "list",
          "title": "Family E — Reverse reasoning and parameters",
          "items": [
            "E1: Choose a parameter so a finite limit can exist.",
            "E2: Use a specified quotient limit to recover a derivative relationship.",
            "E3: Determine a continuity value after evaluating a removable-limit expression."
          ]
        },
        {
          "kind": "list",
          "title": "Family F — Error analysis and justification",
          "items": [
            "F1: Detect a quotient-rule substitution for separate derivatives.",
            "F2: Detect missing hypotheses or an invalid repeated application.",
            "F3: Recognize that failure of the derivative-quotient limit leaves the original limit unresolved."
          ]
        },
        {
          "kind": "table",
          "columns": [
            "Representation",
            "Use",
            "Check"
          ],
          "rows": [
            [
              "Formula",
              "Evaluate the limiting form, then differentiate.",
              "Keep the same target and direction."
            ],
            [
              "Table",
              "Read exact function and derivative data when supplied.",
              "Finite samples alone cannot establish an exact limit."
            ],
            [
              "Graph",
              "Read the limiting heights and tangent slopes.",
              "A point value at a hole need not equal the limit."
            ],
            [
              "Verbal context",
              "Identify which two changing quantities form the quotient.",
              "State units and interpret the limiting ratio."
            ]
          ]
        },
        {
          "kind": "callout",
          "tone": "rule",
          "title": "Exact derivative data",
          "body": "If $f(a)=g(a)=0$, both functions are differentiable at $a$, and $g'(a)\\ne0$, then $\\lim_{x\\to a}f(x)/g(x)=f'(a)/g'(a)$ follows directly from the derivative definitions. To present this specifically as L'Hôpital's Rule, establish its neighborhood hypotheses and the limit of the derivative quotient."
        }
      ]
    },
    {
      "id": "examples",
      "title": "Worked Examples",
      "blocks": [
        {
          "kind": "example",
          "title": "A and B · One valid application",
          "problem": "Evaluate $\\displaystyle\\lim_{x\\to0}\\frac{e^{3x}-1}{\\sin(2x)}$.",
          "steps": [
            {
              "label": "Recognize",
              "body": "The numerator and denominator both tend to zero. Their derivatives exist near zero, and $2\\cos(2x)\\ne0$ sufficiently near zero."
            },
            {
              "label": "Apply",
              "body": "$\\displaystyle\\lim_{x\\to0}\\frac{3e^{3x}}{2\\cos(2x)}=\\frac32$."
            }
          ],
          "conclusion": "The limit is $3/2$.",
          "note": "The chain-rule factors 3 and 2 are essential."
        },
        {
          "kind": "example",
          "title": "B · Growth at infinity",
          "problem": "Evaluate $\\displaystyle\\lim_{x\\to\\infty}\\frac{\\ln x}{\\sqrt{x}}$.",
          "steps": [
            {
              "label": "Recognize",
              "body": "Both functions tend to positive infinity on $x>0$."
            },
            {
              "label": "Differentiate and simplify",
              "body": "$\\displaystyle\\frac{1/x}{1/(2\\sqrt{x})}=\\frac{2}{\\sqrt{x}}\\to0$."
            }
          ],
          "conclusion": "The limit is 0.",
          "note": "Simplifying the derivative quotient finishes the problem without another application."
        },
        {
          "kind": "example",
          "title": "B · Preserve the one-sided target",
          "problem": "Evaluate $\\displaystyle\\lim_{x\\to0^+}\\frac{\\ln x}{1/x}$.",
          "steps": [
            {
              "label": "Recognize",
              "body": "The numerator tends to $-\\infty$ and denominator to $+\\infty$."
            },
            {
              "label": "Apply",
              "body": "$\\displaystyle\\frac{1/x}{-1/x^2}=-x\\to0$."
            }
          ],
          "conclusion": "The limit is 0, approached through negative quotient values.",
          "note": "The logarithm requires the right-hand approach."
        },
        {
          "kind": "example",
          "title": "C · Recheck before repeating",
          "problem": "Evaluate $\\displaystyle\\lim_{x\\to0}\\frac{e^x-1-x}{x^2}$.",
          "steps": [
            {
              "label": "First application",
              "body": "The form is $0/0$. The derivative quotient is $(e^x-1)/(2x)$."
            },
            {
              "label": "Second checkpoint",
              "body": "This quotient still has form $0/0$, so a second application gives $e^x/2\\to1/2$."
            }
          ],
          "conclusion": "The limit is $1/2$.",
          "note": "Write the new indeterminate form before applying the rule again."
        },
        {
          "kind": "example",
          "title": "D · Supplied values and slopes",
          "problem": "Functions $f$ and $g$ have continuous derivatives near 2, with $f(2)=g(2)=0$, $f'(2)=6$ and $g'(2)=-3$. Find $\\lim_{x\\to2}f(x)/g(x)$.",
          "steps": [
            {
              "label": "Establish conditions",
              "body": "Continuity gives form $0/0$. Continuity of $g\\prime$ and its nonzero value at 2 ensure that $g\\prime$ stays nonzero sufficiently nearby."
            },
            {
              "label": "Use the slopes",
              "body": "The derivative quotient tends to $6/(-3)=-2$."
            }
          ],
          "conclusion": "The limit is $-2$.",
          "note": "On a labeled graph, use the tangent slopes for 6 and −3. Heights establish the original form."
        },
        {
          "kind": "example",
          "title": "E · A parameter controls existence",
          "problem": "For which $k$ is $\\displaystyle\\lim_{x\\to0}\\frac{e^{2x}-1-kx}{x^2}$ finite? Find that limit.",
          "steps": [
            {
              "label": "First application",
              "body": "The original form is $0/0$ for every $k$. The derivative quotient is $(2e^{2x}-k)/(2x)$."
            },
            {
              "label": "Determine the parameter",
              "body": "If $k\\ne2$, the original numerator has a nonzero linear term, and the original quotient diverges with opposite signs on the two sides. A finite limit requires $k=2$."
            },
            {
              "label": "Recheck and finish",
              "body": "With $k=2$, the new form is $0/0$. A second application gives $4e^{2x}/2\\to2$."
            }
          ],
          "conclusion": "$k=2$ and the limit is 2.",
          "note": "A nonzero-over-zero derivative quotient cannot be differentiated again to erase the obstruction."
        },
        {
          "kind": "example",
          "title": "E · Recover a derivative",
          "problem": "Suppose $f$ and $g$ have continuous derivatives near 1, $f(1)=g(1)=0$, $g'(1)=4$, and $\\lim_{x\\to1}f(x)/g(x)=3$. Find $f'(1)$.",
          "steps": [
            {
              "label": "Translate the limit",
              "body": "The hypotheses give $f'(1)/g'(1)=3$."
            },
            {
              "label": "Solve",
              "body": "$f'(1)/4=3$, hence $f'(1)=12$."
            }
          ],
          "conclusion": "The derivative is 12.",
          "note": "The quotient limit is a ratio of slopes."
        },
        {
          "kind": "example",
          "title": "E · Define the missing value",
          "problem": "For $x\\ne0$, let $H(x)=(\\sin(5x))/x$. What value of $H(0)$ makes $H$ continuous?",
          "steps": [
            {
              "label": "Find the approaching value",
              "body": "The quotient has form $0/0$. The derivative quotient is $5\\cos(5x)$, whose limit is 5."
            },
            {
              "label": "Match the point value",
              "body": "Continuity requires $H(0)=\\lim_{x\\to0}H(x)$."
            }
          ],
          "conclusion": "Set $H(0)=5$.",
          "note": "Defining a point value does not alter the punctured-neighborhood limit."
        },
        {
          "kind": "example",
          "title": "F · An invalid application changes the answer",
          "problem": "A student differentiates top and bottom of $(x^2+1)/(x+1)$ to evaluate its limit as $x\\to1$, obtaining 2. Identify the error.",
          "steps": [
            {
              "label": "Check the original form",
              "body": "The numerator and denominator tend to 2 and 2. Direct substitution gives $2/2=1$."
            },
            {
              "label": "Explain",
              "body": "The rule's indeterminate-form condition is absent. The derivative quotient need not have the same limit."
            }
          ],
          "conclusion": "The original limit is 1.",
          "note": "Always evaluate the original form before replacing it."
        },
        {
          "kind": "example",
          "title": "F · An inconclusive derivative quotient",
          "problem": "Evaluate $\\displaystyle\\lim_{x\\to\\infty}\\frac{x+\\sin x}{x}$.",
          "steps": [
            {
              "label": "Try the derivative quotient",
              "body": "The form is $\\infty/\\infty$, but the derivative quotient $1+\\cos x$ has no limit. The theorem gives no conclusion."
            },
            {
              "label": "Use algebra",
              "body": "Write the original quotient as $1+\\sin x/x$. Since $|\\sin x/x|\\le1/x$ for $x>0$, the second term tends to zero."
            }
          ],
          "conclusion": "The original limit is 1.",
          "note": "An oscillating derivative quotient does not force an oscillating original quotient."
        },
        {
          "kind": "example",
          "title": "C · A shorter algebraic route",
          "problem": "Evaluate $\\displaystyle\\lim_{x\\to3}\\frac{x^2-9}{x-3}$.",
          "steps": [
            {
              "label": "Recognize",
              "body": "The form is $0/0$, so the rule is available."
            },
            {
              "label": "Factor",
              "body": "For $x\\ne3$, the quotient equals $x+3$, which tends to 6."
            }
          ],
          "conclusion": "The limit is 6.",
          "note": "Use a valid simpler method when one is immediate."
        }
      ]
    },
    {
      "id": "mcq-frq",
      "title": "MCQ & FRQ Strategy",
      "blocks": [
        {
          "kind": "list",
          "title": "MCQ",
          "items": [
            "Check the original form before comparing differentiated answer choices.",
            "For a supplied-data question, locate both the function limits and derivative information.",
            "Use signs to eliminate an impossible answer in a one-sided limit.",
            "If a parameter is present, test whether it changes the form before solving a derivative equation.",
            "A choice produced by the Quotient Rule is a common error when the task asks for a quotient limit."
          ]
        },
        {
          "kind": "list",
          "title": "FRQ",
          "items": [
            "State the numerator and denominator limits that establish the indeterminate form.",
            "Write the derivative quotient inside a limit with the same target and direction.",
            "State the evaluated limit. For repeated applications, establish the form again at each step.",
            "Use stated smoothness assumptions when functions are supplied abstractly. A numerical table alone does not prove them.",
            "If asked to explain why the method fails, identify the failed condition explicitly."
          ]
        },
        {
          "kind": "callout",
          "tone": "rule",
          "title": "Calculator use",
          "body": "On a calculator-active problem, graphing or nearby values can help check behavior. They do not establish an exact limit or the theorem's hypotheses. Show the limiting form and derivative quotient, and retain precision until the requested final rounding."
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
              "Differentiate before identifying the form",
              "The resulting quotient can have a different limit.",
              "Write both component limits first."
            ],
            [
              "Apply the Quotient Rule",
              "That differentiates the whole function.",
              "Differentiate the numerator and denominator separately."
            ],
            [
              "Repeat automatically",
              "The new quotient may be nonzero-over-zero.",
              "Recheck after every application."
            ],
            [
              "Drop chain-rule factors",
              "The derivatives are incorrect.",
              "Differentiate each composite function completely."
            ],
            [
              "Use isolated derivative values without assumptions",
              "The derivative quotient may not approach those values.",
              "Use supplied continuity or justify a derivative-definition argument."
            ],
            [
              "Treat a finite table as an exact proof",
              "Several smooth functions can match finitely many samples.",
              "Identify what is stated versus estimated."
            ],
            [
              "Conclude nonexistence from an inconclusive application",
              "The theorem provides a sufficient route.",
              "Try algebra, bounds, or another justified method."
            ],
            [
              "Lose a side or domain restriction",
              "The requested limit may change.",
              "Carry the approach notation through every line."
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
          "title": "Recognize → Think → Do → Check",
          "items": [
            "Recognize an eligible quotient by evaluating its component limits.",
            "Check differentiability, the denominator derivative, the domain and the direction.",
            "Differentiate numerator and denominator separately.",
            "Evaluate the new limit; recheck before a repeated application.",
            "Verify the sign, the final form and the justification."
          ]
        },
        {
          "kind": "checklist",
          "title": "Can you do this?",
          "items": [
            "Identify eligible and ineligible forms before differentiating.",
            "Handle finite, infinite and one-sided targets.",
            "Decide whether repeated application is valid.",
            "Use exact graphical or tabular derivative data with stated hypotheses.",
            "Recover a parameter or missing derivative.",
            "Explain an invalid application and choose another method.",
            "Write a complete limit argument with correct notation."
          ]
        }
      ]
    }
  ]
};
