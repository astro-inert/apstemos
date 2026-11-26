import type { TopicGuide } from "@/lib/navigator-guides";
export const relatedRatesGuide: TopicGuide = {
  "sections": [
    {
      "id": "core",
      "title": "The Core Idea",
      "blocks": [
        {
          "kind": "prose",
          "text": "Related rates connect instantaneous changes in quantities linked by an equation. You are not finding a missing measurement alone: you are finding how quickly it changes at a particular instant."
        },
        {
          "kind": "prose",
          "text": "CED alignment (2026–27, course framework pp. 85–86): Topic 4.4 — CHA-3.D, CHA-3.D.1–2, skill 1.E; Topic 4.5 — CHA-3.E, CHA-3.E.1, skill 3.F. The families below are APSTEMOS classifications, not official College Board categories."
        },
        {
          "kind": "formula",
          "label": "Chain rule",
          "tex": "\\frac{dQ}{dt}=\\frac{dQ}{dx}\\frac{dx}{dt}"
        },
        {
          "kind": "formula",
          "label": "Two changing factors",
          "tex": "\\frac{d}{dt}(xy)=x\\frac{dy}{dt}+y\\frac{dx}{dt}"
        },
        {
          "kind": "formula",
          "label": "Quotient",
          "tex": "\\frac{d}{dt}\\left(\\frac{x}{y}\\right)=\\frac{y x'-x y'}{y^2}"
        },
        {
          "kind": "callout",
          "title": "Differentiate before freezing values",
          "body": "An instantaneous measurement is not a constant. Substitute a fixed numerical dimension early only if it remains constant throughout the motion.",
          "tone": "rule"
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
              "How fast is one quantity changing when another…",
              "Related rates",
              "Name the target derivative and common time variable."
            ],
            [
              "Growing sphere or circle",
              "Power and chain rules",
              "Write the volume or area equation."
            ],
            [
              "Two moving endpoints",
              "Distance relationship",
              "Choose signed coordinates and a distance equation."
            ],
            [
              "Angle of elevation",
              "Trigonometry",
              "Identify opposite, adjacent and hypotenuse."
            ],
            [
              "Cone fills or shadow changes",
              "Similar triangles",
              "Eliminate a changing dimension using a constant ratio."
            ],
            [
              "Both length and width change",
              "Product rule",
              "Keep both derivative terms."
            ],
            [
              "Table of quantities and rates",
              "Evaluate differentiated relation",
              "Use entries from the same time."
            ],
            [
              "How fast decreasing?",
              "Sign versus magnitude",
              "Find signed derivative, then state decreasing at positive magnitude."
            ]
          ]
        }
      ]
    },
    {
      "id": "decision",
      "title": "Decision Tree",
      "blocks": [
        {
          "kind": "tree",
          "start": "relation",
          "nodes": [
            {
              "id": "relation",
              "prompt": "How are the quantities connected?",
              "options": [
                {
                  "label": "Explicit function or supplied equation",
                  "next": "rules"
                },
                {
                  "label": "Geometry or distance",
                  "next": "geometry"
                },
                {
                  "label": "Table or graph",
                  "outcome": "Extract values and slopes at the same instant, then apply the supplied relationship."
                }
              ]
            },
            {
              "id": "geometry",
              "prompt": "What geometry controls the relationship?",
              "options": [
                {
                  "label": "Area or volume",
                  "next": "rules"
                },
                {
                  "label": "Right triangle or angle",
                  "outcome": "Use Pythagoras or a trigonometric ratio, then differentiate with respect to time."
                },
                {
                  "label": "Similar shapes",
                  "outcome": "Derive a constant ratio, eliminate a variable, then differentiate."
                }
              ]
            },
            {
              "id": "rules",
              "prompt": "What changes with time?",
              "options": [
                {
                  "label": "One independent measurement",
                  "outcome": "Use the chain rule, then evaluate and interpret."
                },
                {
                  "label": "Multiple measurements",
                  "outcome": "Keep every varying term; use product, quotient or implicit differentiation as needed."
                },
                {
                  "label": "Target is a rate supplied indirectly",
                  "outcome": "Solve the differentiated equation for the requested rate; check whether the coefficient is nonzero."
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
          "title": "Family A — Recognition and quantities",
          "items": [
            "A1: Distinguish a value from its rate; translate words into signed derivative notation.",
            "A2: Identify the equation and common independent variable.",
            "A3: Distinguish fixed parameters from instantaneous measurements."
          ]
        },
        {
          "kind": "list",
          "title": "Family B — Geometric relationships",
          "items": [
            "B1: Circle and sphere area, circumference and volume: differentiate powers of radius.",
            "B2: Rectangle, cylinder or cone with multiple varying dimensions: use product rules where appropriate.",
            "B3: Distance between moving points: use coordinate differences and Pythagoras."
          ]
        },
        {
          "kind": "list",
          "title": "Family C — Right triangles and trigonometry",
          "items": [
            "C1: Fixed hypotenuse, changing legs: differentiate the Pythagorean equation.",
            "C2: Both legs change: retain both rate terms.",
            "C3: Angular rate: choose a trig ratio with known sides; use radians."
          ]
        },
        {
          "kind": "list",
          "title": "Family D — Similar triangles",
          "items": [
            "D1: A conical container with fixed shape: derive radius as a function of water height.",
            "D2: Shadow length versus moving tip: distinguish the two target distances.",
            "D3: Use proportional dimensions only while the similarity assumptions hold."
          ]
        },
        {
          "kind": "list",
          "title": "Family E — Implicit time differentiation",
          "items": [
            "E1: Differentiate a supplied nonlinear relation without solving explicitly.",
            "E2: Products and quotients of changing quantities.",
            "E3: Rearrange to isolate an unknown rate; check for insufficient information or a zero coefficient."
          ]
        },
        {
          "kind": "list",
          "title": "Family F — Reverse reasoning, signs and units",
          "items": [
            "F1: Recover a measurement from supplied rates.",
            "F2: Recover a second rate from a known target rate.",
            "F3: Interpret negative, zero or positive rates and distinguish signed rates from magnitudes."
          ]
        },
        {
          "kind": "list",
          "title": "Family G — Representation and context",
          "items": [
            "G1: Use a table of simultaneous values and rates.",
            "G2: Read a tangent slope from a graph of a measurement.",
            "G3: Estimate a missing rate from nearby observations and label the result approximate."
          ]
        },
        {
          "kind": "list",
          "title": "Family H — Error analysis and procedure selection",
          "items": [
            "H1: Detect premature substitution and missing chain factors.",
            "H2: Select between algebraic elimination and implicit differentiation.",
            "H3: Check assumptions, units, signs and whether enough information is available."
          ]
        }
      ]
    },
    {
      "id": "formulas",
      "title": "Relationship Toolkit",
      "blocks": [
        {
          "kind": "table",
          "columns": [
            "Relationship",
            "Equation",
            "Time derivative"
          ],
          "rows": [
            [
              "Circle area",
              "$A=\\pi r^2$",
              "$A'=2\\pi rr'$"
            ],
            [
              "Sphere volume",
              "$V=\\frac43\\pi r^3$",
              "$V'=4\\pi r^2r'$"
            ],
            [
              "Sphere surface area",
              "$S=4\\pi r^2$",
              "$S'=8\\pi rr'$"
            ],
            [
              "Rectangle",
              "$A=lw$",
              "$A'=l'w+lw'$"
            ],
            [
              "Cylinder",
              "$V=\\pi r^2h$",
              "$V'=\\pi(2rr'h+r^2h')$"
            ],
            [
              "Cone",
              "$V=\\frac13\\pi r^2h$",
              "$V'=\\frac{\\pi}{3}(2rr'h+r^2h')$"
            ],
            [
              "Right triangle",
              "$z^2=x^2+y^2$",
              "$zz'=xx'+yy'$"
            ],
            [
              "Angle",
              "$\\tan\\theta=y/x$",
              "$\\sec^2\\theta\\,\\theta'=(xy'-yx')/x^2$"
            ]
          ]
        },
        {
          "kind": "callout",
          "title": "Check assumptions",
          "body": "These equations assume the named shapes and differentiable dimensions. For the angular formula, x must be nonzero and the angle must be measured in radians.",
          "tone": "rule"
        }
      ]
    },
    {
      "id": "examples",
      "title": "Worked Examples",
      "blocks": [
        {
          "kind": "example",
          "title": "A · Identify the rate",
          "problem": "A circular region has radius 6 cm, increasing at 2 cm/s. Identify the known rate and the requested area rate.",
          "steps": [
            {
              "label": "Translate",
              "body": "$r=6$, $r'=2$, target $A'$."
            },
            {
              "label": "Relate and differentiate",
              "body": "$A=\\pi r^2$, so $A'=2\\pi rr'$."
            }
          ],
          "conclusion": "$A'=24\\pi$ cm²/s; the area is increasing."
        },
        {
          "kind": "example",
          "title": "B · Two varying dimensions",
          "problem": "A cylinder has radius 2 m, height 5 m, radius increasing at 0.3 m/min and height decreasing at 1 m/min. Find its volume rate.",
          "steps": [
            {
              "label": "Recognize",
              "body": "Both dimensions vary, so use the product rule."
            },
            {
              "label": "Differentiate",
              "body": "$V'=\\pi(2rr'h+r^2h')$."
            },
            {
              "label": "Evaluate",
              "body": "$\\pi(2(2)(0.3)(5)+4(-1))=2\\pi$."
            }
          ],
          "conclusion": "Volume increases at $2\\pi$ m³/min. The height decrease does not imply a volume decrease."
        },
        {
          "kind": "example",
          "title": "C · Angular rate",
          "problem": "A point moves horizontally away from an observer at 3 m/s. A fixed platform is 4 m above the observer's horizontal line. Find the rate of change of the elevation angle to the platform directly above the moving point when its horizontal distance is 3 m.",
          "steps": [
            {
              "label": "Model",
              "body": "$\\tan\\theta=4/x$."
            },
            {
              "label": "Differentiate",
              "body": "$\\sec^2\\theta\\,\\theta'=-4x'/x^2$."
            },
            {
              "label": "Evaluate",
              "body": "$\\sec^2\\theta=25/9$, hence $\\theta'=-12/25$."
            }
          ],
          "conclusion": "The angle decreases at 12/25 rad/s."
        },
        {
          "kind": "example",
          "title": "D · Cone similarity",
          "problem": "Water fills a conical tank of height 12 m and top radius 6 m at 3 m³/min. Find the height rate when water is 2 m deep.",
          "steps": [
            {
              "label": "Similarity",
              "body": "$r/h=1/2$, so $r=h/2$."
            },
            {
              "label": "Eliminate radius",
              "body": "$V=\\pi h^3/12$."
            },
            {
              "label": "Differentiate",
              "body": "$V'=\\pi h^2h'/4$. At $h=2$, $3=\\pi h'$."
            }
          ],
          "conclusion": "$h'=3/\\pi$ m/min."
        },
        {
          "kind": "example",
          "title": "D · Shadow and tip",
          "problem": "A 1.5 m person walks away from a 6 m lamp at 2 m/s. Find the shadow length rate and tip rate.",
          "steps": [
            {
              "label": "Define",
              "body": "x is distance from lamp; s is shadow length."
            },
            {
              "label": "Similar triangles",
              "body": "$6/(x+s)=1.5/s$, so $s=x/3$."
            },
            {
              "label": "Differentiate",
              "body": "$s'=2/3$, while $(x+s)'=8/3$."
            }
          ],
          "conclusion": "Shadow length increases at 2/3 m/s; its tip moves away at 8/3 m/s."
        },
        {
          "kind": "example",
          "title": "E · Implicit relationship",
          "problem": "Two quantities satisfy $x^2+xy+y^2=19$. At $(2,3)$, $x'=4$. Find $y'$.",
          "steps": [
            {
              "label": "Differentiate",
              "body": "$(2x+y)x'+(x+2y)y'=0$."
            },
            {
              "label": "Evaluate",
              "body": "$7(4)+8y'=0$."
            }
          ],
          "conclusion": "$y'=-7/2$ units per unit time."
        },
        {
          "kind": "example",
          "title": "F · Reverse rate",
          "problem": "A sphere's volume increases at $36\\pi$ cm³/s when its radius increases at 1 cm/s. Find its radius.",
          "steps": [
            {
              "label": "Rate relation",
              "body": "$36\\pi=4\\pi r^2(1)$."
            },
            {
              "label": "Physical restriction",
              "body": "$r^2=9$ and $r>0$."
            }
          ],
          "conclusion": "Radius is 3 cm."
        },
        {
          "kind": "table",
          "columns": [
            "t (s)",
            "r (cm)",
            "h (cm)",
            "r' (cm/s)",
            "h' (cm/s)"
          ],
          "rows": [
            [
              "1",
              "2",
              "6",
              "0.5",
              "-1"
            ],
            [
              "2",
              "3",
              "5",
              "1",
              "-2"
            ]
          ]
        },
        {
          "kind": "example",
          "title": "G · Table-based rates",
          "problem": "Use the preceding table to determine a cylinder's volume rate at t=2.",
          "steps": [
            {
              "label": "Read same row",
              "body": "$r=3,h=5,r'=1,h'=-2$."
            },
            {
              "label": "Evaluate",
              "body": "$V'=\\pi(2(3)(1)(5)+9(-2))$."
            }
          ],
          "conclusion": "$12\\pi$ cm³/s."
        },
        {
          "kind": "example",
          "title": "G · Graph-based reasoning",
          "problem": "The tangent to a radius-versus-time graph at t=4 passes through (3,2) and (5,6), with r(4)=4 cm. Find circumference rate.",
          "steps": [
            {
              "label": "Read slope",
              "body": "$r'=(6-2)/(5-3)=2$ cm/s."
            },
            {
              "label": "Differentiate",
              "body": "$C'=2\\pi r'$."
            }
          ],
          "conclusion": "$4\\pi$ cm/s."
        },
        {
          "kind": "example",
          "title": "H · Premature substitution",
          "problem": "A rectangle has length 8 cm and width 3 cm at one instant. Both increase at 1 cm/s. A student writes A=8w and gets A'=8.",
          "steps": [
            {
              "label": "Detect",
              "body": "Length 8 is only an instantaneous value, not a fixed length."
            },
            {
              "label": "Repair",
              "body": "$A'=l'w+lw'=3+8=11$."
            }
          ],
          "conclusion": "Area increases at 11 cm²/s."
        }
      ]
    },
    {
      "id": "representations",
      "title": "Representation Switching",
      "blocks": [
        {
          "kind": "table",
          "columns": [
            "Given",
            "Read or derive",
            "Do not confuse"
          ],
          "rows": [
            [
              "Equation",
              "Differentiate every varying quantity",
              "Value with rate"
            ],
            [
              "Table of measurements",
              "Estimate a derivative using nearby secant slopes if needed",
              "Estimate with exact tangent slope"
            ],
            [
              "Table of derivatives",
              "Use supplied rate directly",
              "Rate with measurement"
            ],
            [
              "Graph",
              "Read height for value and tangent slope for rate",
              "Slope of a secant with exact derivative"
            ],
            [
              "Diagram",
              "Label changing dimensions and constants",
              "A drawing's apparent proportions with stated measurements"
            ],
            [
              "Verbal context",
              "Convert increasing/decreasing to signed rates",
              "Speed or magnitude with signed derivative"
            ]
          ]
        },
        {
          "kind": "prose",
          "text": "If a table only gives r(3)=5 and r(5)=9, the centered estimate of r'(4) is 2; an exact instantaneous derivative does not follow from those two values."
        }
      ]
    },
    {
      "id": "exam",
      "title": "MCQ & FRQ Strategy",
      "blocks": [
        {
          "kind": "table",
          "columns": [
            "MCQ form",
            "First move",
            "Trap"
          ],
          "rows": [
            [
              "Direct rate",
              "Write relation and differentiate",
              "Substitute too early"
            ],
            [
              "Valid differentiated equation",
              "Identify every varying factor",
              "Missing chain factor"
            ],
            [
              "Reverse rate or dimension",
              "Solve signed rate equation",
              "Extraneous negative length"
            ],
            [
              "Which statement must be true?",
              "Check available information and assumptions",
              "Assuming all rates are constant"
            ],
            [
              "Calculator-active",
              "Find needed measurement or numerical derivative, then evaluate relation",
              "Rounding intermediate values"
            ],
            [
              "Error analysis",
              "Identify first invalid mathematical step",
              "Fixing arithmetic while leaving wrong model"
            ]
          ]
        },
        {
          "kind": "callout",
          "title": "FRQ response structure",
          "body": "Define variables; write the relationship; differentiate with respect to time; substitute the simultaneous measurements and rates; solve; state what changes, in which direction, at what instant, and in correct units.",
          "tone": "rule"
        },
        {
          "kind": "example",
          "title": "FRQ-style complete response",
          "problem": "Two perpendicular distances from a corner are 6 m and 8 m at an instant. The first increases at 2 m/s and the second decreases at 1 m/s. Find the rate of change of separation.",
          "steps": [
            {
              "label": "Define",
              "body": "Let $x,y$ be the distances and $z$ the separation. $z^2=x^2+y^2$."
            },
            {
              "label": "Differentiate",
              "body": "$2zz'=2xx'+2yy'$."
            },
            {
              "label": "Evaluate",
              "body": "$z=10$, so $10z'=6(2)+8(-1)=4$."
            }
          ],
          "conclusion": "At the stated instant, the separation increases at 0.4 m/s."
        },
        {
          "kind": "prose",
          "text": "Show the modeling equation and derivative setup on FRQs. Calculator evaluation does not replace modeling or contextual justification. Exact scoring depends on the individual rubric."
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
            "Error",
            "Why it fails",
            "Prevention"
          ],
          "rows": [
            [
              "Freeze a changing variable",
              "Its derivative is incorrectly set to zero",
              "Keep functions of time until after differentiation"
            ],
            [
              "Omit a chain factor",
              "Derivative is with respect to time, not the dimension",
              "Attach the dimension's rate"
            ],
            [
              "Ignore product term",
              "Both factors may change",
              "Mark fixed versus variable quantities"
            ],
            [
              "Use full cone radius for water",
              "Water radius varies with depth",
              "Derive similar-triangle relation"
            ],
            [
              "Report degrees per second from radian formula",
              "Standard trig differentiation uses radians",
              "Convert only at the end if requested"
            ],
            [
              "Divide by zero",
              "Rate equation may not determine the target",
              "Check the coefficient before dividing"
            ],
            [
              "Use an unsigned rate",
              "Different directions produce different effects",
              "Assign signs with respect to chosen coordinates"
            ],
            [
              "Mix times",
              "The rate equation applies instantaneously",
              "Use simultaneous data"
            ]
          ]
        }
      ]
    },
    {
      "id": "connections",
      "title": "Hidden Applications & Difficulty",
      "blocks": [
        {
          "kind": "list",
          "title": "Cross-topic connections",
          "items": [
            "Unit 2: power, product, quotient and trig rules supply the derivative machinery.",
            "Unit 3: chain and implicit rules; CED 3.5 supports method selection.",
            "Unit 4.5 (APSTEMOS): contextual derivative interpretation is a supporting skill, not a replacement for the related-rates model.",
            "Unit 5 optimization: finding an extremum is different from finding a time rate.",
            "Unit 6 accumulation: obtaining total change from a rate requires integration, not related-rate differentiation."
          ]
        },
        {
          "kind": "list",
          "title": "Difficulty",
          "items": [
            "Introductory: one supplied relation and one varying measurement.",
            "Standard: model a geometric constraint and calculate a signed rate.",
            "Challenging: eliminate variables, combine multiple changing quantities or switch representations.",
            "Stretch: determine whether the data suffice, compare valid methods or reason about a zero coefficient."
          ]
        }
      ]
    },
    {
      "id": "summary",
      "title": "Exam-Day Quick Reference",
      "blocks": [
        {
          "kind": "list",
          "title": "Recognize → Model → Differentiate → Evaluate → Interpret",
          "items": [
            "Identify target and known rates with units.",
            "Write a relationship valid over time.",
            "Eliminate variables if useful; preserve every varying quantity.",
            "Differentiate with respect to the common independent variable.",
            "Evaluate at the same instant and solve.",
            "Check sign, units, physical domain and sufficiency."
          ]
        },
        {
          "kind": "checklist",
          "title": "Can you do this?",
          "items": [
            "Recognize related rates without explicit labeling.",
            "Build area, volume, distance and angular models.",
            "Use similarity for changing dimensions.",
            "Differentiate implicit, product and quotient relations.",
            "Recover unknown measurements or rates.",
            "Use graphs and tables without confusing slopes and values.",
            "Explain results in context and diagnose invalid solutions."
          ]
        },
        {
          "kind": "prose",
          "text": "Curriculum source: College Board AP Calculus AB and BC Course and Exam Description, current 2026–27 version, Unit 4 topics 4.4–4.5 (AP Central). All examples and classifications in this guide are original APSTEMOS instructional material."
        }
      ]
    }
  ]
};
