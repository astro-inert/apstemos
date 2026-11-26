import type { StaticUnit2Question } from "./unit2-bank-types";

export const LINEARIZATION_BANK: StaticUnit2Question[] = [
  {
    "key": "U4.T2.F1.TY1.Q001",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [
      "2.5",
      "2.6"
    ],
    "difficulty": "easy",
    "calculator": false,
    "prompt": "For $f(x)=x^{3}-2x$, which expression is its linearization at $x=-1$?",
    "choices": [
      {
        "label": "A",
        "text": "$1+(x-1)$"
      },
      {
        "label": "B",
        "text": "$-1+(x+1)$"
      },
      {
        "label": "C",
        "text": "$1+(x+1)$"
      },
      {
        "label": "D",
        "text": "$1-2(x+1)$"
      }
    ],
    "answer_label": "C",
    "explanation": "At $-1$ the height is 1 and the slope $3x^{2}-2$ is 1.\n\nA: Centers the line at positive 1.\nB: Uses the input as the height.\nD: Drops the derivative of $x^{3}$.\n\nAPSTEMOS classification: Build L from an explicit function. Primary CED 4.6; skill 1.E.",
    "representation": "Symbolic / verbal"
  },
  {
    "key": "U4.T2.F1.TY1.Q002",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [
      "2.7",
      "3.1"
    ],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "For $g(x)=\\cos (2x)$, what does the linearization at zero predict for $g(0.08)$?",
    "choices": [
      {
        "label": "A",
        "text": "1"
      },
      {
        "label": "B",
        "text": "0"
      },
      {
        "label": "C",
        "text": "$\\cos (0.16)$"
      },
      {
        "label": "D",
        "text": "$0.84$"
      }
    ],
    "answer_label": "A",
    "explanation": "The anchor height is 1 and the derivative $-2$ $\\sin (2x)$ vanishes there.\n\nB: Reports the estimated change.\nC: Gives the exact target expression instead of the tangent prediction.\nD: Uses $-2$ as the slope.\n\nAPSTEMOS classification: Build L from an explicit function. Primary CED 4.6; skill 1.E.",
    "representation": "Symbolic / verbal"
  },
  {
    "key": "U4.T2.F1.TY2.Q003",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [
      "2.5"
    ],
    "difficulty": "easy",
    "calculator": false,
    "prompt": "Using the square-root tangent at the nearest perfect square, estimate $\\sqrt{63}$.",
    "choices": [
      {
        "label": "A",
        "text": "$8.0625$"
      },
      {
        "label": "B",
        "text": "$7.875$"
      },
      {
        "label": "C",
        "text": "$-0.0625$"
      },
      {
        "label": "D",
        "text": "$7.9375$"
      }
    ],
    "answer_label": "D",
    "explanation": "At 64 the height is 8 and the slope is $\\frac{1}{16}$. The increment is $-1$.\n\nA: Reverses the increment.\nB: Uses $\\frac{1}{8}$ as the slope.\nC: Reports only the change.\n\nAPSTEMOS classification: Choose a convenient nearby anchor for a radical, exponential or logarithm. Primary CED 4.6; skill 1.E.",
    "representation": "Symbolic / verbal"
  },
  {
    "key": "U4.T2.F1.TY2.Q004",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [
      "2.7"
    ],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "To approximate $\\ln (0.97)$ without a calculator, which setup uses the nearest anchor where ln has a known exact value of zero?",
    "choices": [
      {
        "label": "A",
        "text": "$0+(1/0.97)(-0.03)$"
      },
      {
        "label": "B",
        "text": "$1+1(-0.03)$"
      },
      {
        "label": "C",
        "text": "$0+1(-0.03)$"
      },
      {
        "label": "D",
        "text": "$0+1(0.97)$"
      }
    ],
    "answer_label": "C",
    "explanation": "At 1, $\\ln (1)=0$ and its derivative is 1.\n\nA: Takes the derivative at the target.\nB: Uses the anchor input as the height.\nD: Uses the target as the increment.\n\nAPSTEMOS classification: Choose a convenient nearby anchor for a radical, exponential or logarithm. Primary CED 4.6; skill 1.D.",
    "representation": "Symbolic / verbal"
  },
  {
    "key": "U4.T2.F1.TY3.Q005",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [
      "2.5"
    ],
    "difficulty": "easy",
    "calculator": false,
    "prompt": "The area of a disk is $\\pi r^{2}$. Use linearization to estimate the change in area as $r$ goes from 5 to $4.9$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\pi $"
      },
      {
        "label": "B",
        "text": "$-\\pi $"
      },
      {
        "label": "C",
        "text": "$24\\pi $"
      },
      {
        "label": "D",
        "text": "$-0.99\\pi $"
      }
    ],
    "answer_label": "B",
    "explanation": "The derivative is $2\\pi r$. At 5, multiply $10\\pi $ by $-0.1$.\n\nA: Loses the sign of the change.\nC: Reports the estimated final area.\nD: Reports the exact change, including the quadratic term.\n\nAPSTEMOS classification: Distinguish estimated function value from estimated change. Primary CED 4.6; skill 1.E.",
    "representation": "Symbolic / verbal"
  },
  {
    "key": "U4.T2.F2.TY1.Q006",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [],
    "difficulty": "easy",
    "calculator": false,
    "prompt": "Suppose $f(3)=8$ and $f'(3)=-5$. Estimate $f(3-2h)$ using the tangent at 3.",
    "choices": [
      {
        "label": "A",
        "text": "$8-10h$"
      },
      {
        "label": "B",
        "text": "$8-5h$"
      },
      {
        "label": "C",
        "text": "$8+10h$"
      },
      {
        "label": "D",
        "text": "$10h$"
      }
    ],
    "answer_label": "C",
    "explanation": "The signed input change is $-2h$, so the predicted output change is $10h$.\n\nA: Drops the negative input direction.\nB: Treats $h$ as the entire increment.\nD: Omits the base value.\n\nAPSTEMOS classification: Use supplied f(a) and f'(a). Primary CED 4.6; skill 1.E.",
    "representation": "Symbolic / verbal"
  },
  {
    "key": "U4.T2.F2.TY2.Q007",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [],
    "difficulty": "easy",
    "calculator": false,
    "prompt": "Using the nearest row with both a value and a derivative, estimate $f(2.04)$ from the table.",
    "choices": [
      {
        "label": "A",
        "text": "$4.10$"
      },
      {
        "label": "B",
        "text": "$4.08$"
      },
      {
        "label": "C",
        "text": "$0.08$"
      },
      {
        "label": "D",
        "text": "$4.02$"
      }
    ],
    "answer_label": "B",
    "explanation": "The row at 2 has height 4 and slope 2. Add $2(0.04)$.\n\nA: Uses the closer row's height as the prediction.\nC: Reports only the change.\nD: Uses the displacement from $2.03$ with the slope from 2.\n\nAPSTEMOS classification: Read a table of values and derivatives. Primary CED 4.6; skill 2.B.",
    "representation": "Tabular",
    "figure": {
      "kind": "table",
      "headers": [
        "$x$",
        "$f(x)$",
        "$f'(x)$"
      ],
      "rows": [
        [
          "1.9",
          "3.82",
          "1.6"
        ],
        [
          "2",
          "4",
          "2"
        ],
        [
          "2.03",
          "4.10",
          "unavailable"
        ]
      ]
    }
  },
  {
    "key": "U4.T2.F2.TY3.Q008",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [
      "2.2"
    ],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The solid curve and its dashed tangent meet at $x=2$. Use the dashed line to estimate $f(2.25)$.",
    "choices": [
      {
        "label": "A",
        "text": "$3.5$"
      },
      {
        "label": "B",
        "text": "$0.5$"
      },
      {
        "label": "C",
        "text": "$3.25$"
      },
      {
        "label": "D",
        "text": "$3.75$"
      }
    ],
    "answer_label": "A",
    "explanation": "The tangent passes through $(1,1)$ and $(2,3)$, so its slope is 2. Add $2(0.25)$ to 3.\n\nB: Reports only the tangent rise.\nC: Assumes unit slope.\nD: Uses the height 3 as the slope.\n\nAPSTEMOS classification: Read a graph's tangent line or labeled slope; distinguish secants from tangents. Primary CED 4.6; skill 2.B.",
    "representation": "Graphical",
    "figure": {
      "kind": "graph",
      "window": {
        "xMin": 1,
        "xMax": 3,
        "yMin": 0,
        "yMax": 6
      },
      "curves": [
        {
          "points": [
            [
              1.0,
              1.5
            ],
            [
              1.025,
              1.5253124999999998
            ],
            [
              1.05,
              1.55125
            ],
            [
              1.075,
              1.5778124999999998
            ],
            [
              1.1,
              1.605
            ],
            [
              1.125,
              1.6328125
            ],
            [
              1.15,
              1.66125
            ],
            [
              1.175,
              1.6903125
            ],
            [
              1.2,
              1.72
            ],
            [
              1.225,
              1.7503125000000002
            ],
            [
              1.25,
              1.78125
            ],
            [
              1.275,
              1.8128125
            ],
            [
              1.3,
              1.845
            ],
            [
              1.325,
              1.8778124999999999
            ],
            [
              1.35,
              1.9112500000000001
            ],
            [
              1.375,
              1.9453125
            ],
            [
              1.4,
              1.98
            ],
            [
              1.425,
              2.0153125000000003
            ],
            [
              1.45,
              2.05125
            ],
            [
              1.475,
              2.0878125
            ],
            [
              1.5,
              2.125
            ],
            [
              1.525,
              2.1628125
            ],
            [
              1.55,
              2.20125
            ],
            [
              1.575,
              2.2403125
            ],
            [
              1.6,
              2.2800000000000002
            ],
            [
              1.625,
              2.3203125
            ],
            [
              1.65,
              2.36125
            ],
            [
              1.675,
              2.4028125
            ],
            [
              1.7,
              2.445
            ],
            [
              1.725,
              2.4878125
            ],
            [
              1.75,
              2.53125
            ],
            [
              1.775,
              2.5753125
            ],
            [
              1.8,
              2.62
            ],
            [
              1.825,
              2.6653124999999998
            ],
            [
              1.85,
              2.71125
            ],
            [
              1.875,
              2.7578125
            ],
            [
              1.9,
              2.8049999999999997
            ],
            [
              1.925,
              2.8528125
            ],
            [
              1.95,
              2.90125
            ],
            [
              1.975,
              2.9503125000000003
            ],
            [
              2.0,
              3.0
            ],
            [
              2.025,
              3.0503125
            ],
            [
              2.05,
              3.10125
            ],
            [
              2.075,
              3.1528125000000005
            ],
            [
              2.1,
              3.205
            ],
            [
              2.125,
              3.2578125
            ],
            [
              2.15,
              3.31125
            ],
            [
              2.175,
              3.3653124999999995
            ],
            [
              2.2,
              3.4200000000000004
            ],
            [
              2.225,
              3.4753125000000002
            ],
            [
              2.25,
              3.53125
            ],
            [
              2.275,
              3.5878124999999996
            ],
            [
              2.3,
              3.6449999999999996
            ],
            [
              2.325,
              3.7028125000000003
            ],
            [
              2.35,
              3.7612500000000004
            ],
            [
              2.375,
              3.8203125
            ],
            [
              2.4,
              3.88
            ],
            [
              2.425,
              3.9403124999999997
            ],
            [
              2.45,
              4.001250000000001
            ],
            [
              2.475,
              4.062812500000001
            ],
            [
              2.5,
              4.125
            ],
            [
              2.525,
              4.1878125
            ],
            [
              2.55,
              4.25125
            ],
            [
              2.575,
              4.3153125
            ],
            [
              2.6,
              4.38
            ],
            [
              2.625,
              4.4453125
            ],
            [
              2.65,
              4.5112499999999995
            ],
            [
              2.675,
              4.577812499999999
            ],
            [
              2.7,
              4.6450000000000005
            ],
            [
              2.725,
              4.7128125
            ],
            [
              2.75,
              4.78125
            ],
            [
              2.775,
              4.850312499999999
            ],
            [
              2.8,
              4.92
            ],
            [
              2.825,
              4.990312500000001
            ],
            [
              2.85,
              5.06125
            ],
            [
              2.875,
              5.1328125
            ],
            [
              2.9,
              5.205
            ],
            [
              2.925,
              5.2778125
            ],
            [
              2.95,
              5.35125
            ],
            [
              2.975,
              5.4253125
            ],
            [
              3.0,
              5.5
            ]
          ],
          "smooth": true,
          "label": "f(x)"
        },
        {
          "points": [
            [
              1,
              1
            ],
            [
              3,
              5
            ]
          ],
          "dashed": true,
          "label": "tangent line",
          "tone": 1
        }
      ],
      "xLabel": "x",
      "yLabel": "f(x)",
      "markers": [
        {
          "x": 2,
          "y": 3,
          "kind": "closed"
        }
      ]
    }
  },
  {
    "key": "U4.T2.F3.TY1.Q009",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [
      "5.6"
    ],
    "difficulty": "easy",
    "calculator": false,
    "prompt": "A differentiable function is strictly concave down on $[2,5]$. How does its tangent estimate based at 5 compare with $f(2)$?",
    "choices": [
      {
        "label": "A",
        "text": "The sign of $f'$ is needed."
      },
      {
        "label": "B",
        "text": "It is less than $f(2)$."
      },
      {
        "label": "C",
        "text": "It equals $f(2)$."
      },
      {
        "label": "D",
        "text": "It is greater than $f(2)$."
      }
    ],
    "answer_label": "D",
    "explanation": "A strictly concave-down curve lies below its tangent even to the left of the anchor.\n\nA: The relative position follows from concavity.\nB: Reverses the tangent comparison when moving left.\nC: Assumes equality at another input.\n\nAPSTEMOS classification: Use concavity up or down over the relevant interval. Primary CED 4.6; skill 1.F.",
    "representation": "Verbal"
  },
  {
    "key": "U4.T2.F3.TY2.Q010",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [
      "5.6"
    ],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Throughout $[1,1.3]$, $f'$ is negative and strictly increasing. Which describes the tangent estimate at 1 for $f(1.3)$?",
    "choices": [
      {
        "label": "A",
        "text": "Above both values"
      },
      {
        "label": "B",
        "text": "Below $f(1.3)$ and above $f(1)$"
      },
      {
        "label": "C",
        "text": "Below $f(1.3)$ and below $f(1)$"
      },
      {
        "label": "D",
        "text": "Above $f(1.3)$ and below $f(1)$"
      }
    ],
    "answer_label": "C",
    "explanation": "Negative slope predicts a decrease. Increasing slope makes the function strictly concave up, above its tangent.\n\nA: Reverses both comparisons.\nB: Uses the change in slope to infer a positive tangent slope.\nD: Gets the decrease right but reverses the curvature effect.\n\nAPSTEMOS classification: Infer concavity from monotonicity of f' or the sign of f''. Primary CED 4.6; skill 1.F.",
    "representation": "Symbolic / verbal"
  },
  {
    "key": "U4.T2.F3.TY2.Q011",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [
      "5.6"
    ],
    "difficulty": "easy",
    "calculator": false,
    "prompt": "Let $f''(x)=x-4$. For which target must the tangent at $x=3$ overestimate $f$ at the target?",
    "choices": [
      {
        "label": "A",
        "text": "7"
      },
      {
        "label": "B",
        "text": "3"
      },
      {
        "label": "C",
        "text": "6"
      },
      {
        "label": "D",
        "text": "$3.7$"
      }
    ],
    "answer_label": "D",
    "explanation": "The second derivative is negative from 3 to $3.7$. Beyond 4 the curvature changes, and the sign requires further analysis.\n\nA: Integrating the curvature gives $f(7)-L(7)=16(4-3)/6$, which is positive.\nB: At the anchor the estimate is exact.\nC: Here $f(6)-L(6)=9(3-3)/6=0$.\n\nAPSTEMOS classification: Infer concavity from monotonicity of f' or the sign of f''. Primary CED 4.6; skill 1.F.",
    "representation": "Symbolic / verbal"
  },
  {
    "key": "U4.T2.F3.TY3.Q012",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [
      "5.6"
    ],
    "difficulty": "hard",
    "calculator": false,
    "prompt": "A smooth function is strictly concave down on $(0,1)$ and strictly concave up on $(1,2)$. Which conclusion follows about its tangent at 0 evaluated at 2?",
    "choices": [
      {
        "label": "A",
        "text": "It must be exact."
      },
      {
        "label": "B",
        "text": "It must overestimate."
      },
      {
        "label": "C",
        "text": "It must underestimate."
      },
      {
        "label": "D",
        "text": "The error direction depends on how the slope changes across both intervals."
      }
    ],
    "answer_label": "D",
    "explanation": "The slope initially falls below its anchor value. After 1 it may recover slightly or enough to outweigh that initial loss.\n\nA: Equal interval lengths do not imply cancellation.\nB: Later slope recovery can overcome the initial loss.\nC: Later recovery can be arbitrarily small.\n\nAPSTEMOS classification: Determine when information is insufficient, including changing concavity. Primary CED 4.6; skill 1.F.",
    "representation": "Verbal"
  },
  {
    "key": "U4.T2.F4.TY1.Q013",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [],
    "difficulty": "easy",
    "calculator": false,
    "prompt": "A tangent model at $x=6$ gives $L(6)=10$ and $L(5.8)=10.7$. Find $f'(6)$.",
    "choices": [
      {
        "label": "A",
        "text": "$0.7$"
      },
      {
        "label": "B",
        "text": "$-0.14$"
      },
      {
        "label": "C",
        "text": "$3.5$"
      },
      {
        "label": "D",
        "text": "$-3.5$"
      }
    ],
    "answer_label": "D",
    "explanation": "Divide the model rise $0.7$ by the signed run $-0.2$.\n\nA: Gives the rise without scaling by input change.\nB: Multiplies instead of dividing.\nC: Ignores the run's sign.\n\nAPSTEMOS classification: Recover the derivative from a stated linear approximation. Primary CED 4.6; skill 1.E.",
    "representation": "Symbolic / verbal"
  },
  {
    "key": "U4.T2.F4.TY2.Q014",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "A tangent model at $x=4$ has slope $-3$ and predicts $f(4.2)\\approx 7.1$. What is $f(4)$?",
    "choices": [
      {
        "label": "A",
        "text": "$7.7$"
      },
      {
        "label": "B",
        "text": "$7.1$"
      },
      {
        "label": "C",
        "text": "$0.6$"
      },
      {
        "label": "D",
        "text": "$6.5$"
      }
    ],
    "answer_label": "A",
    "explanation": "Solve $7.1=f(4)-3(0.2)$. The anchor height equals the model height exactly.\n\nB: Confuses target prediction and anchor height.\nC: Reports only the magnitude of the adjustment.\nD: Applies the forward change a second time.\n\nAPSTEMOS classification: Recover the anchor value or increment. Primary CED 4.6; skill 1.E.",
    "representation": "Symbolic / verbal"
  },
  {
    "key": "U4.T2.F4.TY2.Q015",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [],
    "difficulty": "easy",
    "calculator": false,
    "prompt": "A sensor model at pressure 12 predicts a $0.18$-unit output decrease. Its local slope is $-0.6$ output units per pressure unit. What pressure change does the model require?",
    "choices": [
      {
        "label": "A",
        "text": "$+0.30$"
      },
      {
        "label": "B",
        "text": "$12.30$"
      },
      {
        "label": "C",
        "text": "$-0.30$"
      },
      {
        "label": "D",
        "text": "$+0.108$"
      }
    ],
    "answer_label": "A",
    "explanation": "Solve $-0.18=-0.6\\Delta p$. A decreasing response requires a positive pressure increment.\n\nB: Reports the final pressure.\nC: Uses the wrong sign.\nD: Multiplies the rate by the output change.\n\nAPSTEMOS classification: Recover the anchor value or increment. Primary CED 4.6; skill 1.E.",
    "representation": "Symbolic / verbal"
  },
  {
    "key": "U4.T2.F4.TY3.Q016",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [
      "2.5"
    ],
    "difficulty": "hard",
    "calculator": false,
    "prompt": "The tangent to $f(x)=kx^{2}+b$ at $x=2$ is $y=12x-5$. Which ordered pair $(k,b)$ follows?",
    "choices": [
      {
        "label": "A",
        "text": "$(6,-5)$"
      },
      {
        "label": "B",
        "text": "$(3,7)$"
      },
      {
        "label": "C",
        "text": "$(3,19)$"
      },
      {
        "label": "D",
        "text": "$(3,-5)$"
      }
    ],
    "answer_label": "B",
    "explanation": "At 2 the slope is $4k=12$, so $k=3$. The line height is 19, hence $12+b=19$.\n\nA: Omits the factor 2 in the derivative and copies the intercept.\nC: Uses the anchor height as the parameter $b$.\nD: Treats the tangent intercept as the curve intercept.\n\nAPSTEMOS classification: Recover a parameter from a tangent-line equation. Primary CED 4.6; skill 1.E.",
    "representation": "Symbolic / verbal"
  },
  {
    "key": "U4.T2.F5.TY1.Q017",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [],
    "difficulty": "easy",
    "calculator": false,
    "prompt": "At noon a reservoir holds 800 $L$. At that instant its volume is decreasing at 12 L/min. Use local linearity to estimate the volume 45 seconds later.",
    "choices": [
      {
        "label": "A",
        "text": "260 $L$"
      },
      {
        "label": "B",
        "text": "791 $L$"
      },
      {
        "label": "C",
        "text": "809 $L$"
      },
      {
        "label": "D",
        "text": "9 $L$"
      }
    ],
    "answer_label": "B",
    "explanation": "Convert 45 seconds to $0.75$ minute. The predicted volume is $800-12(0.75)$.\n\nA: Treats seconds as minutes.\nC: Reverses the direction of flow.\nD: Reports the magnitude of the change.\n\nAPSTEMOS classification: Predict a nearby measurement from its instantaneous rate. Primary CED 4.6; skill 1.E.",
    "representation": "Contextual"
  },
  {
    "key": "U4.T2.F5.TY2.Q018",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [],
    "difficulty": "easy",
    "calculator": false,
    "prompt": "At 100 units of production, marginal cost is $0.4$ thousand dollars per additional unit. Which statement uses the local model for a decrease of three units?",
    "choices": [
      {
        "label": "A",
        "text": "Total cost decreases by about $1,200$ dollars."
      },
      {
        "label": "B",
        "text": "Total cost decreases by about $1.2$ dollars."
      },
      {
        "label": "C",
        "text": "Total cost becomes $1,200$ dollars."
      },
      {
        "label": "D",
        "text": "Marginal cost decreases by $1,200$ dollars per unit."
      }
    ],
    "answer_label": "A",
    "explanation": "The signed change is $(0.4)(-3)=-1.2$ thousand dollars.\n\nB: Drops the thousands scale.\nC: Converts an output change into a total.\nD: Uses the slope to predict a change in the slope itself.\n\nAPSTEMOS classification: Interpret signed changes and units. Primary CED 4.6; skill 3.F.",
    "representation": "Contextual"
  },
  {
    "key": "U4.T2.F5.TY3.Q019",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [
      "3.1"
    ],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "A probe reports $S(t)=g(T(t))$. At $t=4$, $S=20$, $T'=-3$ and $g'(T(4))=2$. Estimate $S(4.1)$.",
    "choices": [
      {
        "label": "A",
        "text": "$20.6$"
      },
      {
        "label": "B",
        "text": "$19.9$"
      },
      {
        "label": "C",
        "text": "$19.4$"
      },
      {
        "label": "D",
        "text": "$-0.6$"
      }
    ],
    "answer_label": "C",
    "explanation": "The composite slope is $2(-3)=-6$, so the predicted change is $-0.6$.\n\nA: Uses the magnitude of the composite slope.\nB: Adds the component derivatives.\nD: Omits the base reading.\n\nAPSTEMOS classification: Use derivatives obtained by chain or implicit differentiation. Primary CED 4.6; skill 1.E.",
    "representation": "Contextual"
  },
  {
    "key": "U4.T2.F5.TY3.Q020",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [
      "3.2"
    ],
    "difficulty": "hard",
    "calculator": false,
    "prompt": "A point follows $x^{2}+xy+y^{2}=7$ near $(1,2)$. Using the tangent there, estimate $y$ when $x=1.05$.",
    "choices": [
      {
        "label": "A",
        "text": "$0.96$"
      },
      {
        "label": "B",
        "text": "$1.96$"
      },
      {
        "label": "C",
        "text": "$2.04$"
      },
      {
        "label": "D",
        "text": "$1.9375$"
      }
    ],
    "answer_label": "B",
    "explanation": "Implicit differentiation gives $y'=-(2x+y)/(x+2y)=-4/5$. Use $2-(4/5)(0.05)$.\n\nA: Uses the $x$-coordinate as the starting height.\nC: Omits the negative sign.\nD: Inverts the slope.\n\nAPSTEMOS classification: Use derivatives obtained by chain or implicit differentiation. Primary CED 4.6; skill 1.E.",
    "representation": "Symbolic"
  },
  {
    "key": "U4.T2.F6.TY1.Q021",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [
      "2.1"
    ],
    "difficulty": "easy",
    "calculator": false,
    "prompt": "Measurements give $f(1)=4$ and $f(3)=10$, with no derivative data. Which statement follows?",
    "choices": [
      {
        "label": "A",
        "text": "The tangent slope at 1 is 6."
      },
      {
        "label": "B",
        "text": "The secant has slope 3, but the slope of the tangent at 1 is undetermined."
      },
      {
        "label": "C",
        "text": "The tangent slope at 1 is 3."
      },
      {
        "label": "D",
        "text": "The tangent at 1 must pass through $(3,10)$."
      }
    ],
    "answer_label": "B",
    "explanation": "Two heights determine an average rate. Differentiable curves with different initial slopes can join them.\n\nA: Uses the rise without dividing by the run.\nC: Assigns an average rate to a specific endpoint.\nD: Treats the secant as a tangent.\n\nAPSTEMOS classification: Distinguish tangent from secant approximations. Primary CED 4.6; skill 1.D.",
    "representation": "Verbal"
  },
  {
    "key": "U4.T2.F6.TY2.Q022",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Two tangent models predict $5.12$ and $4.94$ for the same target. Its actual value is $5.02$. Which model is more accurate and by how much in absolute error?",
    "choices": [
      {
        "label": "A",
        "text": "The second, by $0.02$."
      },
      {
        "label": "B",
        "text": "The second, by $0.18$."
      },
      {
        "label": "C",
        "text": "They are equally accurate."
      },
      {
        "label": "D",
        "text": "The first, by $0.02$."
      }
    ],
    "answer_label": "A",
    "explanation": "The absolute errors are $0.10$ and $0.08$, so the second reduces the error by $0.02$.\n\nB: Uses the distance between model predictions.\nC: Opposite signs of error do not imply equal magnitudes.\nD: Reverses which error is smaller.\n\nAPSTEMOS classification: Compare approximations when actual values or sufficient curvature data are available. Primary CED 4.6; skill 1.F.",
    "representation": "Symbolic / verbal"
  },
  {
    "key": "U4.T2.F6.TY2.Q023",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [
      "5.6"
    ],
    "difficulty": "hard",
    "calculator": false,
    "prompt": "Let $f''>0$ on $[1,3]$. At $x=3$ compare the tangent predictions based at 1 and at 2.",
    "choices": [
      {
        "label": "A",
        "text": "The tangent at 2 overestimates."
      },
      {
        "label": "B",
        "text": "The tangent at 2 gives the closer estimate."
      },
      {
        "label": "C",
        "text": "The predictions coincide."
      },
      {
        "label": "D",
        "text": "The tangent at 1 gives the closer estimate."
      }
    ],
    "answer_label": "B",
    "explanation": "At 2 its tangent equals $f(2)$, above the first tangent. It then rises faster since $f'(2)>f'(1)$. Both tangents are below $f(3)$.\n\nA: Each tangent lies below the strictly convex curve.\nC: Strict convexity gives distinct slopes and ordered predictions here.\nD: The earlier tangent is already lower at 2 and has smaller slope.\n\nAPSTEMOS classification: Compare approximations when actual values or sufficient curvature data are available. Primary CED 4.6; skill 1.F.",
    "representation": "Symbolic / verbal"
  },
  {
    "key": "U4.T2.F6.TY3.Q024",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [],
    "difficulty": "hard",
    "calculator": false,
    "prompt": "Suppose $f$ is differentiable, $f(0)=2$ and $f'(0)=1$. Which claim about $f(0.001)$ is justified?",
    "choices": [
      {
        "label": "A",
        "text": "Its tangent estimate is $2.001$; the data give no numerical error bound at that input."
      },
      {
        "label": "B",
        "text": "The error is at most $0.001$."
      },
      {
        "label": "C",
        "text": "The exact value is $2.001$."
      },
      {
        "label": "D",
        "text": "The estimate is always low."
      }
    ],
    "answer_label": "A",
    "explanation": "Functions 2+x+Kx² share the same anchor and slope. Their errors at $0.001$ are $K$ times $0.000001$, which can be arbitrarily large in magnitude.\n\nB: A small fixed input change gives no universal bound.\nC: Matching height and slope leaves higher-order behavior free.\nD: Negative $K$ gives the opposite error direction.\n\nAPSTEMOS classification: Recognize limits of local approximation without assuming proximity guarantees a specific error. Primary CED 4.6; skill 1.F.",
    "representation": "Verbal"
  },
  {
    "key": "U4.T2.F7.TY1.Q025",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [
      "2.5"
    ],
    "difficulty": "easy",
    "calculator": false,
    "prompt": "To estimate $\\sqrt{9.2}$ a student writes $3+\\frac{0.2}{2\\sqrt{9.2}}$. Which single edit produces the tangent estimate centered at 9?",
    "choices": [
      {
        "label": "A",
        "text": "Replace $0.2$ with $9.2$."
      },
      {
        "label": "B",
        "text": "Replace the initial 3 with 9."
      },
      {
        "label": "C",
        "text": "Replace $\\sqrt{9.2}$ in the denominator with 3."
      },
      {
        "label": "D",
        "text": "Reverse the sign of $0.2$."
      }
    ],
    "answer_label": "C",
    "explanation": "The tangent slope is $1/(2\\sqrt{9})$, evaluated at the anchor.\n\nA: Uses the target as the displacement.\nB: Uses the anchor input as its function value.\nD: The target lies to the right of 9.\n\nAPSTEMOS classification: Detect wrong anchor, wrong sign or missing base value. Primary CED 4.6; skill 3.E.",
    "representation": "Symbolic / verbal"
  },
  {
    "key": "U4.T2.F7.TY2.Q026",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [
      "5.6"
    ],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "A student claims that the tangent to an increasing function always underestimates it to the right of the anchor. Which function on $x>0$ is a counterexample?",
    "choices": [
      {
        "label": "A",
        "text": "$f(x)=e^{x}$"
      },
      {
        "label": "B",
        "text": "$f(x)=x^{3}$"
      },
      {
        "label": "C",
        "text": "$f(x)=x^{2}$"
      },
      {
        "label": "D",
        "text": "$f(x)=\\ln $ $x$"
      }
    ],
    "answer_label": "D",
    "explanation": "The logarithm is increasing and strictly concave down. Its tangent at 1 lies above the curve to the right.\n\nA: This increasing convex function lies above its tangents.\nB: On positive inputs its positive second derivative gives underestimates.\nC: Increasing and strictly convex here, so it supports the proposed direction.\n\nAPSTEMOS classification: Reject overestimate claims based solely on increasing/decreasing behavior. Primary CED 4.6; skill 3.E.",
    "representation": "Symbolic / verbal"
  },
  {
    "key": "U4.T2.F7.TY3.Q027",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [
      "2.7",
      "3.1"
    ],
    "difficulty": "medium",
    "calculator": true,
    "prompt": "Let $f(x)=\\exp (-x^{2})$. Using the tangent at $1.30$, estimate $f(1.34)$ to four decimal places.",
    "choices": [
      {
        "label": "A",
        "text": "$0.1845$"
      },
      {
        "label": "B",
        "text": "$0.2037$"
      },
      {
        "label": "C",
        "text": "$0.1660$"
      },
      {
        "label": "D",
        "text": "$0.1653$"
      }
    ],
    "answer_label": "D",
    "explanation": "Evaluate $\\exp (-1.3^{2})[1-2(1.3)(0.04)]=0.16532949$… before rounding.\n\nA: Reports the anchor height alone.\nB: Uses a positive slope.\nC: Evaluates the original function at $1.34$.\n\nAPSTEMOS classification: Select a valid setup and interpret calculator output. Primary CED 4.6; skill 1.E.",
    "representation": "Symbolic / verbal"
  },
  {
    "key": "U4.T2.F1.TY2.Q028",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [
      "2.7"
    ],
    "difficulty": "easy",
    "calculator": false,
    "prompt": "Use the tangent to $f(x)=e^x$ at zero to estimate $e^{-0.06}$.",
    "choices": [
      {
        "label": "A",
        "text": "$-0.06$"
      },
      {
        "label": "B",
        "text": "$0.94$"
      },
      {
        "label": "C",
        "text": "$1.06$"
      },
      {
        "label": "D",
        "text": "$0.06$"
      }
    ],
    "answer_label": "B",
    "explanation": "At zero the function value and slope are both 1. Thus $L(-0.06)=1-0.06=0.94$.\n\nA: Omits the anchor height.\nC: Reverses the displacement.\nD: Reports the magnitude of the change.\n\nAPSTEMOS classification: Choose a convenient nearby anchor for a radical, exponential or logarithm. Primary CED 4.6; skill 1.E.",
    "representation": "Symbolic / verbal"
  },
  {
    "key": "U4.T2.F1.TY3.Q029",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [
      "2.5"
    ],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Using a linear model, estimate the percentage change in the volume of a sphere when its radius increases by $0.8$ percent.",
    "choices": [
      {
        "label": "A",
        "text": "$2.4$ percent"
      },
      {
        "label": "B",
        "text": "$0.8$ percent"
      },
      {
        "label": "C",
        "text": "$1.6$ percent"
      },
      {
        "label": "D",
        "text": "$0.512$ percent"
      }
    ],
    "answer_label": "A",
    "explanation": "Since $V$ is proportional to $r^{3}$, the relative differential is $dV/V=3$ $dr/r$. Thus the estimated volume increase is $3(0.8)=2.4$ percent.\n\nB: Treats volume as proportional to radius.\nC: Uses the surface-area exponent.\nD: Cubes the percentage instead of linearizing.\n\nAPSTEMOS classification: Distinguish estimated function value from estimated change. Primary CED 4.6; skill 1.E.",
    "representation": "Symbolic / verbal"
  },
  {
    "key": "U4.T2.F2.TY1.Q030",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [
      "2.2"
    ],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Suppose $f(2)=7$ and $\\lim_{h\\to 0}\\frac{f(2+h)-f(2)}{h}=-4$. Use the tangent at 2 to estimate $f(1.98)$.",
    "choices": [
      {
        "label": "A",
        "text": "$7.08$"
      },
      {
        "label": "B",
        "text": "$7.02$"
      },
      {
        "label": "C",
        "text": "$-0.08$"
      },
      {
        "label": "D",
        "text": "$6.92$"
      }
    ],
    "answer_label": "A",
    "explanation": "The limit is $f'(2)=-4$. The increment is $-0.02$, so the estimate is $7+(-4)(-0.02)=7.08$.\n\nB: Assumes the derivative is 1 in magnitude.\nC: Omits the base value and reverses the sign.\nD: Uses a positive increment.\n\nAPSTEMOS classification: Use supplied f(a) and f'(a). Primary CED 4.6; skill 1.E.",
    "representation": "Symbolic / verbal"
  },
  {
    "key": "U4.T2.F2.TY2.Q031",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The table lists $f'$. Given $f(4)=9$, use the tangent at 4 to estimate $f(4.1)$.",
    "choices": [
      {
        "label": "A",
        "text": "$8.5$"
      },
      {
        "label": "B",
        "text": "$8.8$"
      },
      {
        "label": "C",
        "text": "$9.2$"
      },
      {
        "label": "D",
        "text": "$8.65$"
      }
    ],
    "answer_label": "B",
    "explanation": "The derivative at the anchor is $-2$, so the estimate is $9-2(0.1)=8.8$.\n\nA: Uses the derivative at the target.\nC: Reverses the sign of the slope.\nD: Averages two slopes, which is a different approximation.\n\nAPSTEMOS classification: Read a table of values and derivatives. Primary CED 4.6; skill 2.B.",
    "representation": "Tabular",
    "figure": {
      "kind": "table",
      "headers": [
        "$x$",
        "$f'(x)$"
      ],
      "rows": [
        [
          "4",
          "−2"
        ],
        [
          "4.1",
          "−5"
        ]
      ]
    }
  },
  {
    "key": "U4.T2.F2.TY3.Q032",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [
      "2.2"
    ],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The graph shows $f'$. Given $f(1)=5$, use the tangent to $f$ at 1 to estimate $f(1.2)$.",
    "choices": [
      {
        "label": "A",
        "text": "$3.4$"
      },
      {
        "label": "B",
        "text": "$5.6$"
      },
      {
        "label": "C",
        "text": "$0.6$"
      },
      {
        "label": "D",
        "text": "$5.4$"
      }
    ],
    "answer_label": "B",
    "explanation": "Read $f'(1)=3$ from the vertical coordinate of the graph. The estimate is $5+3(0.2)=5.6$.\n\nA: Predicts the derivative rather than the function.\nC: Reports only the estimated change.\nD: Uses the slope of the derivative graph, 2.\n\nAPSTEMOS classification: Read a graph's tangent line or labeled slope; distinguish secants from tangents. Primary CED 4.6; skill 2.B.",
    "representation": "Graphical",
    "figure": {
      "kind": "graph",
      "window": {
        "xMin": 0,
        "xMax": 2,
        "yMin": 0,
        "yMax": 6
      },
      "curves": [
        {
          "points": [
            [
              0.0,
              1.0
            ],
            [
              0.025,
              1.05
            ],
            [
              0.05,
              1.1
            ],
            [
              0.075,
              1.15
            ],
            [
              0.1,
              1.2
            ],
            [
              0.125,
              1.25
            ],
            [
              0.15,
              1.3
            ],
            [
              0.175,
              1.35
            ],
            [
              0.2,
              1.4
            ],
            [
              0.225,
              1.45
            ],
            [
              0.25,
              1.5
            ],
            [
              0.275,
              1.55
            ],
            [
              0.3,
              1.6
            ],
            [
              0.325,
              1.65
            ],
            [
              0.35,
              1.7
            ],
            [
              0.375,
              1.75
            ],
            [
              0.4,
              1.8
            ],
            [
              0.425,
              1.85
            ],
            [
              0.45,
              1.9
            ],
            [
              0.475,
              1.95
            ],
            [
              0.5,
              2.0
            ],
            [
              0.525,
              2.05
            ],
            [
              0.55,
              2.1
            ],
            [
              0.575,
              2.15
            ],
            [
              0.6,
              2.2
            ],
            [
              0.625,
              2.25
            ],
            [
              0.65,
              2.3
            ],
            [
              0.675,
              2.35
            ],
            [
              0.7,
              2.4
            ],
            [
              0.725,
              2.45
            ],
            [
              0.75,
              2.5
            ],
            [
              0.775,
              2.55
            ],
            [
              0.8,
              2.6
            ],
            [
              0.825,
              2.65
            ],
            [
              0.85,
              2.7
            ],
            [
              0.875,
              2.75
            ],
            [
              0.9,
              2.8
            ],
            [
              0.925,
              2.85
            ],
            [
              0.95,
              2.9
            ],
            [
              0.975,
              2.95
            ],
            [
              1.0,
              3.0
            ],
            [
              1.025,
              3.05
            ],
            [
              1.05,
              3.1
            ],
            [
              1.075,
              3.15
            ],
            [
              1.1,
              3.2
            ],
            [
              1.125,
              3.25
            ],
            [
              1.15,
              3.3
            ],
            [
              1.175,
              3.35
            ],
            [
              1.2,
              3.4
            ],
            [
              1.225,
              3.45
            ],
            [
              1.25,
              3.5
            ],
            [
              1.275,
              3.55
            ],
            [
              1.3,
              3.6
            ],
            [
              1.325,
              3.65
            ],
            [
              1.35,
              3.7
            ],
            [
              1.375,
              3.75
            ],
            [
              1.4,
              3.8
            ],
            [
              1.425,
              3.85
            ],
            [
              1.45,
              3.9
            ],
            [
              1.475,
              3.95
            ],
            [
              1.5,
              4.0
            ],
            [
              1.525,
              4.05
            ],
            [
              1.55,
              4.1
            ],
            [
              1.575,
              4.15
            ],
            [
              1.6,
              4.2
            ],
            [
              1.625,
              4.25
            ],
            [
              1.65,
              4.3
            ],
            [
              1.675,
              4.35
            ],
            [
              1.7,
              4.4
            ],
            [
              1.725,
              4.45
            ],
            [
              1.75,
              4.5
            ],
            [
              1.775,
              4.55
            ],
            [
              1.8,
              4.6
            ],
            [
              1.825,
              4.65
            ],
            [
              1.85,
              4.7
            ],
            [
              1.875,
              4.75
            ],
            [
              1.9,
              4.8
            ],
            [
              1.925,
              4.85
            ],
            [
              1.95,
              4.9
            ],
            [
              1.975,
              4.95
            ],
            [
              2.0,
              5.0
            ]
          ],
          "smooth": true,
          "label": "f′(x)"
        }
      ],
      "xLabel": "x",
      "yLabel": "f′(x)"
    }
  },
  {
    "key": "U4.T2.F2.TY3.Q033",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [
      "2.2"
    ],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The dashed line is tangent to $f$ at $x=2$. Use it to estimate $f(1.8)$.",
    "choices": [
      {
        "label": "A",
        "text": "$0.6$"
      },
      {
        "label": "B",
        "text": "$5.4$"
      },
      {
        "label": "C",
        "text": "$3.6$"
      },
      {
        "label": "D",
        "text": "$4.6$"
      }
    ],
    "answer_label": "D",
    "explanation": "The tangent passes through $(0,1)$ and $(2,5)$, so its equation is $L(x)=1+2x$. Hence $L(1.8)=4.6$.\n\nA: Uses the intercept as the anchor height.\nB: Reverses the signed increment.\nC: Omits the line intercept.\n\nAPSTEMOS classification: Read a graph's tangent line or labeled slope; distinguish secants from tangents. Primary CED 4.6; skill 2.B.",
    "representation": "Graphical",
    "figure": {
      "kind": "graph",
      "window": {
        "xMin": 0,
        "xMax": 3,
        "yMin": 0,
        "yMax": 8
      },
      "curves": [
        {
          "points": [
            [
              0.0,
              3.0
            ],
            [
              0.0375,
              3.000703125
            ],
            [
              0.075,
              3.0028125
            ],
            [
              0.1125,
              3.006328125
            ],
            [
              0.15,
              3.0112500000000004
            ],
            [
              0.1875,
              3.017578125
            ],
            [
              0.225,
              3.0253125
            ],
            [
              0.2625,
              3.0344531249999998
            ],
            [
              0.3,
              3.045
            ],
            [
              0.3375,
              3.056953125
            ],
            [
              0.375,
              3.0703125
            ],
            [
              0.4125,
              3.085078125
            ],
            [
              0.45,
              3.1012500000000003
            ],
            [
              0.4875,
              3.1188281250000003
            ],
            [
              0.525,
              3.1378125
            ],
            [
              0.5625,
              3.158203125
            ],
            [
              0.6,
              3.18
            ],
            [
              0.6375,
              3.203203125
            ],
            [
              0.675,
              3.2278125
            ],
            [
              0.7125,
              3.253828125
            ],
            [
              0.75,
              3.28125
            ],
            [
              0.7875,
              3.310078125
            ],
            [
              0.825,
              3.3403125
            ],
            [
              0.8625,
              3.371953125
            ],
            [
              0.9,
              3.405
            ],
            [
              0.9375,
              3.439453125
            ],
            [
              0.975,
              3.4753125000000002
            ],
            [
              1.0125,
              3.512578125
            ],
            [
              1.05,
              3.55125
            ],
            [
              1.0875,
              3.591328125
            ],
            [
              1.125,
              3.6328125
            ],
            [
              1.1625,
              3.675703125
            ],
            [
              1.2,
              3.7199999999999998
            ],
            [
              1.2375,
              3.765703125
            ],
            [
              1.275,
              3.8128124999999997
            ],
            [
              1.3125,
              3.861328125
            ],
            [
              1.35,
              3.91125
            ],
            [
              1.3875,
              3.962578125
            ],
            [
              1.425,
              4.0153125
            ],
            [
              1.4625,
              4.069453125
            ],
            [
              1.5,
              4.125
            ],
            [
              1.5375,
              4.181953125
            ],
            [
              1.575,
              4.2403125
            ],
            [
              1.6125,
              4.300078125
            ],
            [
              1.65,
              4.36125
            ],
            [
              1.6875,
              4.423828125
            ],
            [
              1.725,
              4.4878125
            ],
            [
              1.7625,
              4.5532031250000005
            ],
            [
              1.8,
              4.619999999999999
            ],
            [
              1.8375,
              4.688203125
            ],
            [
              1.875,
              4.7578125
            ],
            [
              1.9125,
              4.828828125
            ],
            [
              1.95,
              4.90125
            ],
            [
              1.9875,
              4.975078125
            ],
            [
              2.025,
              5.0503124999999995
            ],
            [
              2.0625,
              5.126953125
            ],
            [
              2.1,
              5.205
            ],
            [
              2.1375,
              5.284453125000001
            ],
            [
              2.175,
              5.3653125
            ],
            [
              2.2125,
              5.447578125
            ],
            [
              2.25,
              5.53125
            ],
            [
              2.2875,
              5.616328125
            ],
            [
              2.325,
              5.7028125
            ],
            [
              2.3625,
              5.790703124999999
            ],
            [
              2.4,
              5.88
            ],
            [
              2.4375,
              5.970703125
            ],
            [
              2.475,
              6.062812500000001
            ],
            [
              2.5125,
              6.156328125000001
            ],
            [
              2.55,
              6.25125
            ],
            [
              2.5875,
              6.347578125
            ],
            [
              2.625,
              6.4453125
            ],
            [
              2.6625,
              6.544453125
            ],
            [
              2.7,
              6.6450000000000005
            ],
            [
              2.7375,
              6.746953124999999
            ],
            [
              2.775,
              6.850312499999999
            ],
            [
              2.8125,
              6.955078125
            ],
            [
              2.85,
              7.06125
            ],
            [
              2.8875,
              7.168828125
            ],
            [
              2.925,
              7.2778125
            ],
            [
              2.9625,
              7.3882031249999995
            ],
            [
              3.0,
              7.5
            ]
          ],
          "smooth": true,
          "label": "f(x)"
        },
        {
          "points": [
            [
              0,
              1
            ],
            [
              3,
              7
            ]
          ],
          "dashed": true,
          "label": "tangent line",
          "tone": 1
        }
      ],
      "xLabel": "x",
      "yLabel": "f(x)",
      "markers": [
        {
          "x": 2,
          "y": 5,
          "kind": "closed"
        }
      ]
    }
  },
  {
    "key": "U4.T2.F3.TY1.Q034",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [
      "5.6"
    ],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "A function is strictly concave up on $[2,2.2]$. Compare its tangent prediction $f'(2)(0.2)$ with the actual change $f(2.2)-f(2)$.",
    "choices": [
      {
        "label": "A",
        "text": "The predicted change is larger."
      },
      {
        "label": "B",
        "text": "The sign of $f'(2)$ is required."
      },
      {
        "label": "C",
        "text": "The predicted change is smaller."
      },
      {
        "label": "D",
        "text": "They are equal."
      }
    ],
    "answer_label": "C",
    "explanation": "The tangent value is below $f(2.2)$. Subtracting the same anchor height from each preserves that inequality.\n\nA: Reverses the effect of concavity.\nB: Subtracting the common anchor height works for either sign.\nD: Treats the tangent prediction as exact over an interval.\n\nAPSTEMOS classification: Use concavity up or down over the relevant interval. Primary CED 4.6; skill 1.F.",
    "representation": "Symbolic / verbal"
  },
  {
    "key": "U4.T2.F3.TY2.Q035",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [
      "5.6"
    ],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The graph shows a strictly decreasing $f'$ on $[0,2]$. How does the tangent to $f$ at 1 estimate $f(1.5)$?",
    "choices": [
      {
        "label": "A",
        "text": "It is exact because the derivative graph is a line."
      },
      {
        "label": "B",
        "text": "No conclusion is possible without $f(1)$."
      },
      {
        "label": "C",
        "text": "It overestimates."
      },
      {
        "label": "D",
        "text": "It underestimates because $f'$ is positive."
      }
    ],
    "answer_label": "C",
    "explanation": "A decreasing derivative makes $f$ strictly concave down, so its tangent lies above the curve.\n\nA: A nonconstant linear derivative gives a quadratic function.\nB: The anchor height affects the value, but not this error direction.\nD: Uses increasing behavior instead of concavity.\n\nAPSTEMOS classification: Infer concavity from monotonicity of f' or the sign of f''. Primary CED 4.6; skill 1.F.",
    "representation": "Graphical",
    "figure": {
      "kind": "graph",
      "window": {
        "xMin": 0,
        "xMax": 2,
        "yMin": 0,
        "yMax": 5
      },
      "curves": [
        {
          "points": [
            [
              0.0,
              4.0
            ],
            [
              0.025,
              3.975
            ],
            [
              0.05,
              3.95
            ],
            [
              0.075,
              3.925
            ],
            [
              0.1,
              3.9
            ],
            [
              0.125,
              3.875
            ],
            [
              0.15,
              3.85
            ],
            [
              0.175,
              3.825
            ],
            [
              0.2,
              3.8
            ],
            [
              0.225,
              3.775
            ],
            [
              0.25,
              3.75
            ],
            [
              0.275,
              3.725
            ],
            [
              0.3,
              3.7
            ],
            [
              0.325,
              3.675
            ],
            [
              0.35,
              3.65
            ],
            [
              0.375,
              3.625
            ],
            [
              0.4,
              3.6
            ],
            [
              0.425,
              3.575
            ],
            [
              0.45,
              3.55
            ],
            [
              0.475,
              3.525
            ],
            [
              0.5,
              3.5
            ],
            [
              0.525,
              3.475
            ],
            [
              0.55,
              3.45
            ],
            [
              0.575,
              3.425
            ],
            [
              0.6,
              3.4
            ],
            [
              0.625,
              3.375
            ],
            [
              0.65,
              3.35
            ],
            [
              0.675,
              3.325
            ],
            [
              0.7,
              3.3
            ],
            [
              0.725,
              3.275
            ],
            [
              0.75,
              3.25
            ],
            [
              0.775,
              3.225
            ],
            [
              0.8,
              3.2
            ],
            [
              0.825,
              3.175
            ],
            [
              0.85,
              3.15
            ],
            [
              0.875,
              3.125
            ],
            [
              0.9,
              3.1
            ],
            [
              0.925,
              3.075
            ],
            [
              0.95,
              3.05
            ],
            [
              0.975,
              3.025
            ],
            [
              1.0,
              3.0
            ],
            [
              1.025,
              2.975
            ],
            [
              1.05,
              2.95
            ],
            [
              1.075,
              2.925
            ],
            [
              1.1,
              2.9
            ],
            [
              1.125,
              2.875
            ],
            [
              1.15,
              2.85
            ],
            [
              1.175,
              2.825
            ],
            [
              1.2,
              2.8
            ],
            [
              1.225,
              2.775
            ],
            [
              1.25,
              2.75
            ],
            [
              1.275,
              2.725
            ],
            [
              1.3,
              2.7
            ],
            [
              1.325,
              2.675
            ],
            [
              1.35,
              2.65
            ],
            [
              1.375,
              2.625
            ],
            [
              1.4,
              2.6
            ],
            [
              1.425,
              2.575
            ],
            [
              1.45,
              2.55
            ],
            [
              1.475,
              2.525
            ],
            [
              1.5,
              2.5
            ],
            [
              1.525,
              2.475
            ],
            [
              1.55,
              2.45
            ],
            [
              1.575,
              2.425
            ],
            [
              1.6,
              2.4
            ],
            [
              1.625,
              2.375
            ],
            [
              1.65,
              2.35
            ],
            [
              1.675,
              2.325
            ],
            [
              1.7,
              2.3
            ],
            [
              1.725,
              2.275
            ],
            [
              1.75,
              2.25
            ],
            [
              1.775,
              2.225
            ],
            [
              1.8,
              2.2
            ],
            [
              1.825,
              2.175
            ],
            [
              1.85,
              2.15
            ],
            [
              1.875,
              2.125
            ],
            [
              1.9,
              2.1
            ],
            [
              1.925,
              2.075
            ],
            [
              1.95,
              2.05
            ],
            [
              1.975,
              2.025
            ],
            [
              2.0,
              2.0
            ]
          ],
          "smooth": true,
          "label": "f′(x)"
        }
      ],
      "xLabel": "x",
      "yLabel": "f′(x)"
    }
  },
  {
    "key": "U4.T2.F3.TY3.Q036",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [
      "5.6"
    ],
    "difficulty": "hard",
    "calculator": false,
    "prompt": "A smooth function has the derivative samples shown. What can be concluded about its tangent estimate based at 1 for $f(1.4)$?",
    "choices": [
      {
        "label": "A",
        "text": "It must be exact."
      },
      {
        "label": "B",
        "text": "It must underestimate."
      },
      {
        "label": "C",
        "text": "The samples alone do not determine the error direction."
      },
      {
        "label": "D",
        "text": "It must overestimate."
      }
    ],
    "answer_label": "C",
    "explanation": "Increasing samples at three points do not guarantee an increasing derivative between them. Smooth bumps between sampled inputs can alter the accumulated change.\n\nA: The samples do not force a constant derivative.\nB: Assumes monotonicity throughout the interval from three samples.\nD: The samples do not establish concavity down.\n\nAPSTEMOS classification: Determine when information is insufficient, including changing concavity. Primary CED 4.6; skill 1.F.",
    "representation": "Tabular",
    "figure": {
      "kind": "table",
      "headers": [
        "$x$",
        "$f'(x)$"
      ],
      "rows": [
        [
          "1",
          "1"
        ],
        [
          "1.2",
          "2"
        ],
        [
          "1.4",
          "3"
        ]
      ]
    }
  },
  {
    "key": "U4.T2.F4.TY1.Q037",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The table lists values of the same tangent model $L$ centered at $x=2$. Find $f'(2)$.",
    "choices": [
      {
        "label": "A",
        "text": "$6.2$"
      },
      {
        "label": "B",
        "text": "$-1.2$"
      },
      {
        "label": "C",
        "text": "4"
      },
      {
        "label": "D",
        "text": "$-4$"
      }
    ],
    "answer_label": "D",
    "explanation": "The tangent model has constant slope $(6.2-7.4)/(2.2-1.9)=-4$.\n\nA: Uses one model value as the slope.\nB: Gives the output difference alone.\nC: Drops the negative sign.\n\nAPSTEMOS classification: Recover the derivative from a stated linear approximation. Primary CED 4.6; skill 2.B.",
    "representation": "Tabular",
    "figure": {
      "kind": "table",
      "headers": [
        "$x$",
        "$L(x)$"
      ],
      "rows": [
        [
          "1.9",
          "7.4"
        ],
        [
          "2.2",
          "6.2"
        ]
      ]
    }
  },
  {
    "key": "U4.T2.F4.TY3.Q038",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [
      "2.7",
      "3.1"
    ],
    "difficulty": "hard",
    "calculator": false,
    "prompt": "For $f(x)=\\exp (kx)$, the tangent at $x=0$ passes through $(0.2,1.6)$. Find $k$.",
    "choices": [
      {
        "label": "A",
        "text": "$0.12$"
      },
      {
        "label": "B",
        "text": "3"
      },
      {
        "label": "C",
        "text": "$\\ln (1.6)/0.2$"
      },
      {
        "label": "D",
        "text": "8"
      }
    ],
    "answer_label": "B",
    "explanation": "At zero $f=1$ and $f'=k$. Thus $1+0.2k=1.6$, giving $k=3$.\n\nA: Multiplies the rise by the run.\nC: Treats the tangent point $(0.2,1.6)$ as a point on the exponential curve.\nD: Divides the target line value by $0.2$ without subtracting the anchor height.\n\nAPSTEMOS classification: Recover a parameter from a tangent-line equation. Primary CED 4.6; skill 1.E.",
    "representation": "Symbolic / verbal"
  },
  {
    "key": "U4.T2.F5.TY1.Q039",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "At 2 PM an object's temperature is 60 degrees Celsius and is falling at $1.8$ degrees per minute. Using that tangent model, estimate its temperature 20 seconds earlier.",
    "choices": [
      {
        "label": "A",
        "text": "$59.4$ degrees Celsius"
      },
      {
        "label": "B",
        "text": "$0.6$ degrees Celsius"
      },
      {
        "label": "C",
        "text": "96 degrees Celsius"
      },
      {
        "label": "D",
        "text": "$60.6$ degrees Celsius"
      }
    ],
    "answer_label": "D",
    "explanation": "The time change is $\\frac{-1}{3}$ minute. The predicted temperature change is $(-1.8)(-1/3)=0.6$ degree.\n\nA: Uses a positive time increment.\nB: Gives only the change.\nC: Treats 20 seconds as 20 minutes.\n\nAPSTEMOS classification: Predict a nearby measurement from its instantaneous rate. Primary CED 4.6; skill 1.E.",
    "representation": "Contextual"
  },
  {
    "key": "U4.T2.F5.TY3.Q040",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [
      "3.1"
    ],
    "difficulty": "hard",
    "calculator": true,
    "prompt": "An object's speed is $v(t)=\\sqrt{1+t^3}$ m/s. Use the tangent at $t=2.3$ to estimate its speed at $t=2.34$, to three decimals.",
    "choices": [
      {
        "label": "A",
        "text": "$0.087$ m/s"
      },
      {
        "label": "B",
        "text": "$3.541$ m/s"
      },
      {
        "label": "C",
        "text": "$3.716$ m/s"
      },
      {
        "label": "D",
        "text": "$3.629$ m/s"
      }
    ],
    "answer_label": "C",
    "explanation": "The anchor value is $\\sqrt{13.167}$ and the slope is $\\frac{3(2.3)^2}{2\\sqrt{13.167}}$. Adding $0.04$ times that slope gives $3.716106\\ldots$, which rounds to $3.716$.\n\nA: Reports only the predicted increase.\nB: Reverses the sign of the increment.\nD: Reports the anchor speed only.\n\nAPSTEMOS classification: Use derivatives obtained by chain or implicit differentiation. Primary CED 4.6; skill 1.E.",
    "representation": "Contextual"
  },
  {
    "key": "U4.T2.F6.TY1.Q041",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [
      "2.1"
    ],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "For $f(x)=3x-7$, compare the secant through $x=1$ and $x=4$ with the tangent at $x=2$.",
    "choices": [
      {
        "label": "A",
        "text": "They are parallel distinct lines."
      },
      {
        "label": "B",
        "text": "They have different slopes."
      },
      {
        "label": "C",
        "text": "They are the same line and predict every function value exactly."
      },
      {
        "label": "D",
        "text": "They agree only at $x=2$."
      }
    ],
    "answer_label": "C",
    "explanation": "An affine function has constant slope 3, so every secant and tangent is its original graph.\n\nA: Each passes through points on the same affine graph.\nB: Both slopes equal 3.\nD: Their equations are identical.\n\nAPSTEMOS classification: Distinguish tangent from secant approximations. Primary CED 4.6; skill 1.F.",
    "representation": "Symbolic / verbal"
  },
  {
    "key": "U4.T2.F6.TY2.Q042",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [
      "2.7",
      "5.6"
    ],
    "difficulty": "hard",
    "calculator": true,
    "prompt": "For $f(x)=\\ln $ $x$, use a calculator to compare the tangent estimates at 2 and 3 for $\\ln (2.4)$. Which has smaller absolute error, and by how much to four decimals?",
    "choices": [
      {
        "label": "A",
        "text": "They have equal absolute error."
      },
      {
        "label": "B",
        "text": "The tangent at 3, by $0.0055$."
      },
      {
        "label": "C",
        "text": "The tangent at 2, by $0.0408$."
      },
      {
        "label": "D",
        "text": "The tangent at 2, by $0.0055$."
      }
    ],
    "answer_label": "D",
    "explanation": "The two predictions are $\\ln (2)+0.2$ and $\\ln (3)-0.2$. Both exceed $\\ln (2.4)$. Their errors are about $0.017678$ and $0.023144$, a difference of $0.005465$.\n\nA: The asymmetric anchors give distinct errors.\nB: Reverses which error is smaller.\nC: Adds the absolute errors instead of comparing them.\n\nAPSTEMOS classification: Compare approximations when actual values or sufficient curvature data are available. Primary CED 4.6; skill 1.F.",
    "representation": "Symbolic / verbal"
  },
  {
    "key": "U4.T2.F6.TY3.Q043",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "2.2",
    "secondary_ced_topics": [
      "4.6"
    ],
    "difficulty": "hard",
    "calculator": false,
    "prompt": "Extension — differentiability and linearization.\n\nLet $L$ be the tangent model of $f$ at a differentiable point a. Which statement must hold as a nonzero $h$ approaches zero?",
    "choices": [
      {
        "label": "A",
        "text": "$\\frac{f(a+h)-L(a+h)}{h}$ approaches zero."
      },
      {
        "label": "B",
        "text": "$f(a+h)=L(a+h)$ for all small $h$."
      },
      {
        "label": "C",
        "text": "The error divided by $h^{2}$ approaches zero."
      },
      {
        "label": "D",
        "text": "The tangent always underestimates on both sides."
      }
    ],
    "answer_label": "A",
    "explanation": "Substituting $L(a+h)=f(a)+f\\prime(a)h$ gives $\\frac{f(a+h)-L(a+h)}{h}=\\frac{f(a+h)-f(a)}{h}-f\\prime(a)$, which tends to zero by the definition of the derivative.\n\nB: Differentiability does not force a locally straight graph.\nC: For $f(x)=x^{2}$ at zero, that quotient is 1.\nD: Differentiability alone supplies no concavity condition.\n\nAPSTEMOS classification: Recognize limits of local approximation without assuming proximity guarantees a specific error. Primary CED 2.2; skill 3.D. Extension beyond the explicit Topic 4.6 requirements.",
    "representation": "Symbolic / verbal"
  },
  {
    "key": "U4.T2.F7.TY1.Q044",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Given $f(3)=8$ and $f'(3)=-2$, a student estimates $f(3.1)$ as $-2(0.1)=-0.2$. Which correction is needed?",
    "choices": [
      {
        "label": "A",
        "text": "Add the anchor value 8 to obtain $7.8$."
      },
      {
        "label": "B",
        "text": "Change the slope to $+2$."
      },
      {
        "label": "C",
        "text": "Replace $0.1$ with $3.1$."
      },
      {
        "label": "D",
        "text": "Multiply by 8 to obtain $-1.6$."
      }
    ],
    "answer_label": "A",
    "explanation": "The product of slope and displacement estimates the change. Add the known function value to estimate the target value.\n\nB: The derivative is supplied as negative.\nC: The displacement is target minus anchor.\nD: The base height is added, not multiplied.\n\nAPSTEMOS classification: Detect wrong anchor, wrong sign or missing base value. Primary CED 4.6; skill 3.E.",
    "representation": "Symbolic / verbal"
  },
  {
    "key": "U4.T2.F7.TY3.Q045",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "linearization",
    "ced_topic": "4.6",
    "secondary_ced_topics": [],
    "difficulty": "hard",
    "calculator": true,
    "prompt": "For $f(x)=\\sqrt{x}$, use the tangent at $x=7$ to estimate $\\sqrt{7.06}$ to five decimal places, retaining full calculator precision until the final step.",
    "choices": [
      {
        "label": "A",
        "text": "$2.66134$"
      },
      {
        "label": "B",
        "text": "$2.65707$"
      },
      {
        "label": "C",
        "text": "$2.63441$"
      },
      {
        "label": "D",
        "text": "$2.65709$"
      }
    ],
    "answer_label": "D",
    "explanation": "Evaluate $\\sqrt{7}+\\frac{0.06}{2\\sqrt{7}}=2.657090\\ldots$, then round to $2.65709$.\n\nA: Rounds the anchor value to $2.65$ before adding the full-precision increment.\nB: Evaluates the exact target $\\sqrt{7.06}$ instead of its tangent model.\nC: Subtracts the predicted increase instead of adding it.\n\nAPSTEMOS classification: Select a valid setup and interpret calculator output. Primary CED 4.6; skill 1.E.",
    "representation": "Symbolic / verbal"
  }
];
