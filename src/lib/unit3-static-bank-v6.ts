import type { StaticUnit2Question } from "./unit2-bank-types";
// Unit 3: five primary topics; CED 3.5 is a secondary procedural alignment.
export const UNIT3_STATIC_BANK: StaticUnit2Question[] = [
  {
    "key": "U3.T1.F1.TY1.Q001",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "For $h(x)=\\cos((3x-1)^2)$, which is the outermost function?",
    "choices": [
      {
        "label": "A",
        "text": "$u\\mapsto u^2$"
      },
      {
        "label": "B",
        "text": "$u\\mapsto\\cos(u^2)$"
      },
      {
        "label": "C",
        "text": "$u\\mapsto\\cos u$"
      },
      {
        "label": "D",
        "text": "$u\\mapsto 3u-1$"
      }
    ],
    "answer_label": "C",
    "explanation": "The last operation applied is cosine; $h=F\\circ G$ with $F(u)=\\cos u$ and $G(x)=(3x-1)^2$.\n\nA: This is the middle layer, not the outermost one.\nB: This groups two layers and does not isolate the outermost operation.\nD: This is the innermost layer.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T1.F1.TY1.Q002",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "If $h(x)=f(g(2x))$, which expression equals $h^{\\prime}(x)$ wherever the functions are differentiable?",
    "choices": [
      {
        "label": "A",
        "text": "$2f^{\\prime}(2x)g^{\\prime}(2x)$"
      },
      {
        "label": "B",
        "text": "$2f^{\\prime}(g(2x))g^{\\prime}(2x)$"
      },
      {
        "label": "C",
        "text": "$f^{\\prime}(g(2x))+2g^{\\prime}(2x)$"
      },
      {
        "label": "D",
        "text": "$f^{\\prime}(g(2x))g^{\\prime}(2x)$"
      }
    ],
    "answer_label": "B",
    "explanation": "Differentiate the outer $f$, the middle $g$, and the inner $2x$: $f^{\\prime}(g(2x))g^{\\prime}(2x)\\cdot2$.\n\nA: Evaluates $f^{\\prime}$ at $2x$ rather than at $g(2x)$.\nC: Adds the two derivative factors instead of multiplying.\nD: Omits the factor 2 from differentiating $2x$.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T1.F1.TY2.Q003",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "Which expression correctly applies the chain rule to $y=(f(x))^5$?",
    "choices": [
      {
        "label": "A",
        "text": "$5(f(x))^4f^{\\prime}(x)$"
      },
      {
        "label": "B",
        "text": "$5(f(x))^4$"
      },
      {
        "label": "C",
        "text": "$5(f^{\\prime}(x))^4$"
      },
      {
        "label": "D",
        "text": "$(f(x))^4f^{\\prime}(x)$"
      }
    ],
    "answer_label": "A",
    "explanation": "Use $u=f(x)$ and $d(u^5)/dx=5u^4u^{\\prime}$.\n\nB: Does not differentiate the inner function.\nC: Differentiates the inner expression before raising it to the fourth power.\nD: Omits the outer coefficient 5.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T1.F1.TY2.Q004",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "For $y=\\ln(1+f(x)^2)$, which factor necessarily appears in $y^{\\prime}$?",
    "choices": [
      {
        "label": "A",
        "text": "$2f(x)f^{\\prime}(x)$"
      },
      {
        "label": "B",
        "text": "$1+f(x)^2$"
      },
      {
        "label": "C",
        "text": "$\\ln(2f(x))$"
      },
      {
        "label": "D",
        "text": "$2f^{\\prime}(x)$"
      }
    ],
    "answer_label": "A",
    "explanation": "The derivative of the logarithm divides the derivative $2f(x)f^{\\prime}(x)$ by $1+f(x)^2$.\n\nB: This is the logarithm input, not its derivative.\nC: Differentiation does not put the derivative inside a logarithm.\nD: Drops the factor $f(x)$ from differentiating its square.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T1.F1.TY3.Q005",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "Which function is a nontrivial composition that requires the chain rule for a direct differentiation?",
    "choices": [
      {
        "label": "A",
        "text": "$\\sin(x^2+1)$"
      },
      {
        "label": "B",
        "text": "$x\\sin x$"
      },
      {
        "label": "C",
        "text": "$\\sin x+x^2$"
      },
      {
        "label": "D",
        "text": "$3x^2-\\cos x$"
      }
    ],
    "answer_label": "A",
    "explanation": "$\\sin(x^2+1)$ applies sine to a nonlinear inner expression.\n\nB: The main operation is a product, not a nested function.\nC: Each summand can be differentiated separately without composition.\nD: This is a difference of basic terms.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T1.F1.TY3.Q006",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Which is the correct decomposition of $h(x)=e^{\\sqrt{5-x}}$?",
    "choices": [
      {
        "label": "A",
        "text": "$F(u)=\\sqrt u,\\ G(v)=e^v,\\ H(x)=5-x$"
      },
      {
        "label": "B",
        "text": "$F(u)=5-u,\\ G(v)=\\sqrt v,\\ H(x)=e^x$"
      },
      {
        "label": "C",
        "text": "$F(u)=e^u,\\ G(v)=\\sqrt v,\\ H(x)=5-x$"
      },
      {
        "label": "D",
        "text": "$F(u)=e^u,\\ G(v)=5-v,\\ H(x)=\\sqrt x$"
      }
    ],
    "answer_label": "C",
    "explanation": "From inside out, compute $5-x$, take a square root, then exponentiate.\n\nA: Reverses the order of exponential and square root.\nB: Places subtraction outermost rather than innermost.\nD: Puts the subtraction outside the square root.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T1.F2.TY1.Q007",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "Find $\\frac{d}{dx}(x^3-2x)^4$.",
    "choices": [
      {
        "label": "A",
        "text": "$(x^3-2x)^3(3x^2-2)$"
      },
      {
        "label": "B",
        "text": "$4(3x^2-2)^3$"
      },
      {
        "label": "C",
        "text": "$4(x^3-2x)^3(3x^2-2)$"
      },
      {
        "label": "D",
        "text": "$4(x^3-2x)^3$"
      }
    ],
    "answer_label": "C",
    "explanation": "Outer power derivative times derivative of $x^3-2x$.\n\nA: Omits the coefficient 4.\nB: Replaces the inner function with its derivative.\nD: Omits the inner derivative.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T1.F2.TY1.Q008",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Find $\\frac{d}{dx}(2-5x^2)^{-2}$.",
    "choices": [
      {
        "label": "A",
        "text": "$20x(2-5x^2)^{-3}$"
      },
      {
        "label": "B",
        "text": "$-20x(2-5x^2)^{-3}$"
      },
      {
        "label": "C",
        "text": "$20x(2-5x^2)^{-2}$"
      },
      {
        "label": "D",
        "text": "$-2(2-5x^2)^{-3}$"
      }
    ],
    "answer_label": "A",
    "explanation": "$-2(2-5x^2)^{-3}\\cdot(-10x)=20x(2-5x^2)^{-3}$.\n\nB: Uses the wrong sign; two negative factors yield a positive.\nC: Fails to reduce the exponent from $-2$ to $-3$.\nD: Omits the factor $-10x$.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T1.F2.TY2.Q009",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "Find $\\frac{d}{dx}\\sqrt{1+4x^3}$.",
    "choices": [
      {
        "label": "A",
        "text": "$6x^2\\sqrt{1+4x^3}$"
      },
      {
        "label": "B",
        "text": "$\\frac{6x^2}{\\sqrt{1+4x^3}}$"
      },
      {
        "label": "C",
        "text": "$\\frac{1}{2\\sqrt{1+4x^3}}$"
      },
      {
        "label": "D",
        "text": "$\\frac{12x^2}{\\sqrt{1+4x^3}}$"
      }
    ],
    "answer_label": "B",
    "explanation": "Use $(u^{1/2})^{\\prime}=u^{\\prime}/(2\\sqrt u)$, with $u^{\\prime}=12x^2$.\n\nA: Multiplies by the square root rather than dividing.\nC: Omits the inner derivative $12x^2$.\nD: Misses the factor $\\frac12$ from the square root.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T1.F2.TY2.Q010",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "For $x>1$, differentiate $y=\\frac{1}{\\sqrt{\\ln x}}$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\frac{1}{2x\\sqrt{\\ln x}}$"
      },
      {
        "label": "B",
        "text": "$-\\frac{1}{2(\\ln x)^{3/2}}$"
      },
      {
        "label": "C",
        "text": "$-\\frac{1}{x(\\ln x)^{3/2}}$"
      },
      {
        "label": "D",
        "text": "$-\\frac{1}{2x(\\ln x)^{3/2}}$"
      }
    ],
    "answer_label": "D",
    "explanation": "Write $y=(\\ln x)^{-1/2}$, so $y^{\\prime}=-\\frac12(\\ln x)^{-3/2}/x$.\n\nA: Loses the negative sign and uses the wrong power.\nB: Omits the derivative $1/x$ of $\\ln x$.\nC: Omits the outer factor $1/2$.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T1.F2.TY3.Q011",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Differentiate $y=\\sin^3(2x)$.",
    "choices": [
      {
        "label": "A",
        "text": "$6\\sin^2(2x)$"
      },
      {
        "label": "B",
        "text": "$6\\sin^2(2x)\\cos(2x)$"
      },
      {
        "label": "C",
        "text": "$3\\cos^2(2x)\\sin(2x)$"
      },
      {
        "label": "D",
        "text": "$3\\sin^2(2x)\\cos(2x)$"
      }
    ],
    "answer_label": "B",
    "explanation": "Treat $(\\sin(2x))^3$ as the outer power followed by sine and then $2x$.\n\nA: Omits the cosine factor from differentiating sine.\nC: Confuses which factor is differentiated.\nD: Misses the factor 2 from the inner argument.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T1.F2.TY3.Q012",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "Find $\\frac{d}{dx}\\cos(\\pi x^2)$.",
    "choices": [
      {
        "label": "A",
        "text": "$2\\pi x\\sin(\\pi x^2)$"
      },
      {
        "label": "B",
        "text": "$-2\\pi x\\sin(\\pi x^2)$"
      },
      {
        "label": "C",
        "text": "$-\\pi x^2\\sin(\\pi x^2)$"
      },
      {
        "label": "D",
        "text": "$-\\sin(\\pi x^2)$"
      }
    ],
    "answer_label": "B",
    "explanation": "$\\frac{d}{dx}\\cos u=-\\sin u\\cdot u^{\\prime}$ and $u^{\\prime}=2\\pi x$.\n\nA: Uses the wrong sign for the cosine derivative.\nC: Multiplies by the inner function rather than its derivative.\nD: Omits the inner derivative $2\\pi x$.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T1.F2.TY4.Q013",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "Differentiate $y=e^{x^2-3x}$.",
    "choices": [
      {
        "label": "A",
        "text": "$(2x-3)e^{x^2-3x}$"
      },
      {
        "label": "B",
        "text": "$(x^2-3x)e^{x^2-3x}$"
      },
      {
        "label": "C",
        "text": "$e^{2x-3}$"
      },
      {
        "label": "D",
        "text": "$e^{x^2-3x}$"
      }
    ],
    "answer_label": "A",
    "explanation": "For $e^{u(x)}$, the derivative is $e^{u(x)}u^{\\prime}(x)$.\n\nB: Multiplies by the exponent rather than its derivative.\nC: Differentiates the exponent inside the exponential instead of multiplying.\nD: Omits the derivative of the exponent.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T1.F2.TY4.Q014",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "medium",
    "calculator": true,
    "prompt": "For $y=\\ln(4+\\cos x)$, use a calculator to approximate $y^{^{\\prime}}(1.3)$ to three decimal places (angles in radians).",
    "choices": [
      {
        "label": "A",
        "text": "$0.226$"
      },
      {
        "label": "B",
        "text": "$-0.241$"
      },
      {
        "label": "C",
        "text": "$-0.964$"
      },
      {
        "label": "D",
        "text": "$-0.226$"
      }
    ],
    "answer_label": "D",
    "explanation": "$y^{^{\\prime}}(x)=-\\sin x/(4+\\cos x)$, so $y^{^{\\prime}}(1.3)\\approx-0.2257899\\approx-0.226$.\n\nA: Drops the negative sign from $-\\sin(1.3)$.\nB: Incorrectly divides by 4 rather than $4+\\cos(1.3)$.\nC: Omits division by $4+\\cos(1.3)$.",
    "representation": "Context",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T1.F2.TY5.Q015",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "For $h(x)=x^2\\sin(x^3)$, which procedure correctly produces $h'(x)$?",
    "choices": [
      {
        "label": "A",
        "text": "Product rule with chain rule on the sine: $2x\\sin(x^3)+3x^4\\cos(x^3)$"
      },
      {
        "label": "B",
        "text": "Chain rule alone: $3x^4\\cos(x^3)$"
      },
      {
        "label": "C",
        "text": "Product of derivatives: $6x^3\\cos(x^3)$"
      },
      {
        "label": "D",
        "text": "Product rule without the inner derivative: $2x\\sin(x^3)+x^2\\cos(x^3)$"
      }
    ],
    "answer_label": "A",
    "explanation": "The outer structure is a product; the sine factor is composite. B omits the first product term, C multiplies derivatives, and D omits the inner derivative.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T1.F2.TY5.Q016",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Let $h(x)=(x+1)e^{x^2}$. What is $h^{\\prime}(0)$?",
    "choices": [
      {
        "label": "A",
        "text": "$e$"
      },
      {
        "label": "B",
        "text": "$1$"
      },
      {
        "label": "C",
        "text": "$2$"
      },
      {
        "label": "D",
        "text": "$0$"
      }
    ],
    "answer_label": "B",
    "explanation": "$h^{\\prime}=e^{x^2}+(x+1)2xe^{x^2}$; setting $x=0$ gives 1.\n\nA: Evaluates at $x=1$ rather than at $x=0$.\nC: Adds an extra contribution from the exponential, whose derivative is zero at $x=0$.\nD: Incorrectly drops the derivative of the first factor.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T1.F2.TY6.Q017",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "Find $\\frac{d}{dx}\\frac{\\sin(x^2)}{x}$, $x\\ne0$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\frac{2x\\cos(x^2)-\\sin(x^2)}{x}$"
      },
      {
        "label": "B",
        "text": "$\\frac{2x^2\\cos(x^2)-\\sin(x^2)}{x^2}$"
      },
      {
        "label": "C",
        "text": "$\\frac{2x^2\\cos(x^2)+\\sin(x^2)}{x^2}$"
      },
      {
        "label": "D",
        "text": "$\\frac{\\cos(x^2)-\\sin(x^2)}{x^2}$"
      }
    ],
    "answer_label": "B",
    "explanation": "Use $(u/v)^{\\prime}=(u^{\\prime} v-uv^{\\prime})/v^2$ with $u^{\\prime}=2x\\cos(x^2)$.\n\nA: Subtracts an undivided term and fails to use the quotient denominator $x^2$.\nC: Uses a plus sign where the quotient rule requires subtraction.\nD: Omits the factor $2x$ in the numerator derivative.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T1.F2.TY6.Q018",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "Differentiate $y=\\frac{1}{1+e^{-x}}$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\frac{e^{-x}}{(1+e^{-x})^2}$"
      },
      {
        "label": "B",
        "text": "$-\\frac{e^{-x}}{(1+e^{-x})^2}$"
      },
      {
        "label": "C",
        "text": "$\\frac{e^{-x}}{1+e^{-x}}$"
      },
      {
        "label": "D",
        "text": "$-\\frac{1}{(1+e^{-x})^2}$"
      }
    ],
    "answer_label": "A",
    "explanation": "Write $(1+e^{-x})^{-1}$, differentiate, and simplify the two negatives.\n\nB: Misses cancellation of the two negative signs.\nC: Does not differentiate the reciprocal power correctly.\nD: Omits the derivative of the exponential inside.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T1.F3.TY1.Q019",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The table gives values of differentiable functions.  Find $(f\\circ g)^{\\prime}(1)$.",
    "choices": [
      {
        "label": "A",
        "text": "$-5$"
      },
      {
        "label": "B",
        "text": "$5$"
      },
      {
        "label": "C",
        "text": "$10$"
      },
      {
        "label": "D",
        "text": "$2$"
      }
    ],
    "answer_label": "C",
    "explanation": "$g(1)=3$, so $f^{\\prime}(g(1))g^{\\prime}(1)=f^{\\prime}(3)\\cdot5=2\\cdot5=10$.\n\nA: Uses $f^{\\prime}(1)$ instead of $f^{\\prime}(g(1))$.\nB: Uses $g^{\\prime}(1)$ alone and omits the outer derivative.\nD: Multiplies $f^{\\prime}(3)$ by $g^{\\prime}(3)$ rather than $g^{\\prime}(1)$.",
    "representation": "Tabular",
    "figure": {
      "kind": "table",
      "headers": [
        "$x$",
        "$1$",
        "$2$",
        "$3$"
      ],
      "rows": [
        [
          "$f(x)$",
          "$2$",
          "$3$",
          "$1$"
        ],
        [
          "$f^{\\prime}(x)$",
          "$-1$",
          "$4$",
          "$2$"
        ],
        [
          "$g(x)$",
          "$3$",
          "$1$",
          "$2$"
        ],
        [
          "$g^{\\prime}(x)$",
          "$5$",
          "$-2$",
          "$3$"
        ]
      ]
    },
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T1.F3.TY1.Q020",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Values are listed below.  Find $(f\\circ g)^{\\prime}(2)$.",
    "choices": [
      {
        "label": "A",
        "text": "$-8$"
      },
      {
        "label": "B",
        "text": "$-2$"
      },
      {
        "label": "C",
        "text": "$2$"
      },
      {
        "label": "D",
        "text": "$-4$"
      }
    ],
    "answer_label": "C",
    "explanation": "$g(2)=1$; $f^{\\prime}(1)g^{\\prime}(2)=(-1)(-2)=2$.\n\nA: Uses $f^{\\prime}(2)$ instead of $f^{\\prime}(g(2))$.\nB: Uses only $g^{\\prime}(2)$ instead of multiplying by $f^{\\prime}(1)$.\nD: Uses the wrong outer-derivative table entry.",
    "representation": "Tabular",
    "figure": {
      "kind": "table",
      "headers": [
        "$x$",
        "$1$",
        "$2$",
        "$3$"
      ],
      "rows": [
        [
          "$f(x)$",
          "$2$",
          "$3$",
          "$1$"
        ],
        [
          "$f^{\\prime}(x)$",
          "$-1$",
          "$4$",
          "$2$"
        ],
        [
          "$g(x)$",
          "$3$",
          "$1$",
          "$2$"
        ],
        [
          "$g^{\\prime}(x)$",
          "$5$",
          "$-2$",
          "$3$"
        ]
      ]
    },
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T1.F3.TY2.Q021",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Use the table.  Find $(g\\circ f)^{\\prime}(1)$.",
    "choices": [
      {
        "label": "A",
        "text": "$-3$"
      },
      {
        "label": "B",
        "text": "$3$"
      },
      {
        "label": "C",
        "text": "$2$"
      },
      {
        "label": "D",
        "text": "$-2$"
      }
    ],
    "answer_label": "C",
    "explanation": "$f(1)=2$, so $(g\\circ f)^{\\prime}(1)=g^{\\prime}(2)f^{\\prime}(1)=(-2)(-1)=2$.\n\nA: This does not use the required entries g-prime(2) and f-prime(1).\nB: Uses the magnitude of g-prime(3) rather than g-prime(2).\nD: Omits the negative multiplier f-prime(1).",
    "representation": "Tabular",
    "figure": {
      "kind": "table",
      "headers": [
        "$x$",
        "$1$",
        "$2$",
        "$3$"
      ],
      "rows": [
        [
          "$f(x)$",
          "$2$",
          "$3$",
          "$1$"
        ],
        [
          "$f^{\\prime}(x)$",
          "$-1$",
          "$4$",
          "$2$"
        ],
        [
          "$g(x)$",
          "$3$",
          "$1$",
          "$2$"
        ],
        [
          "$g^{\\prime}(x)$",
          "$5$",
          "$-2$",
          "$3$"
        ]
      ]
    },
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T1.F3.TY2.Q022",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Using the same table,  find $(g\\circ f)^{\\prime}(3)$.",
    "choices": [
      {
        "label": "A",
        "text": "$5$"
      },
      {
        "label": "B",
        "text": "$-4$"
      },
      {
        "label": "C",
        "text": "$10$"
      },
      {
        "label": "D",
        "text": "$2$"
      }
    ],
    "answer_label": "C",
    "explanation": "$f(3)=1$, so $g^{\\prime}(f(3))f^{\\prime}(3)=g^{\\prime}(1)\\cdot2=10$.\n\nA: Omits the multiplier f-prime(3)=2.\nB: Uses g-prime(2) although f(3)=1.\nD: Uses f-prime(3) alone.",
    "representation": "Tabular",
    "figure": {
      "kind": "table",
      "headers": [
        "$x$",
        "$1$",
        "$2$",
        "$3$"
      ],
      "rows": [
        [
          "$f(x)$",
          "$2$",
          "$3$",
          "$1$"
        ],
        [
          "$f^{\\prime}(x)$",
          "$-1$",
          "$4$",
          "$2$"
        ],
        [
          "$g(x)$",
          "$3$",
          "$1$",
          "$2$"
        ],
        [
          "$g^{\\prime}(x)$",
          "$5$",
          "$-2$",
          "$3$"
        ]
      ]
    },
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T1.F3.TY3.Q023",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "Let $h(x)=p(q(p(x)))$. Use the table:  Find $h^{\\prime}(0)$.",
    "choices": [
      {
        "label": "A",
        "text": "$45$"
      },
      {
        "label": "B",
        "text": "$-45$"
      },
      {
        "label": "C",
        "text": "$15$"
      },
      {
        "label": "D",
        "text": "$-15$"
      }
    ],
    "answer_label": "A",
    "explanation": "$p(0)=1$, $q(1)=0$, so $h^{\\prime}(0)=p^{\\prime}(0)q^{\\prime}(1)p^{\\prime}(0)=3\\cdot5\\cdot3=45$.\n\nB: Introduces a negative sign absent from all three derivative entries.\nC: Omits a factor p-prime(0)=3.\nD: Omits a factor and introduces a negative sign.",
    "representation": "Tabular",
    "figure": {
      "kind": "table",
      "headers": [
        "$x$",
        "$0$",
        "$1$",
        "$2$"
      ],
      "rows": [
        [
          "$p(x)$",
          "$1$",
          "$2$",
          "$0$"
        ],
        [
          "$p^{\\prime}(x)$",
          "$3$",
          "$-1$",
          "$4$"
        ],
        [
          "$q(x)$",
          "$2$",
          "$0$",
          "$1$"
        ],
        [
          "$q^{\\prime}(x)$",
          "$-2$",
          "$5$",
          "$-3$"
        ]
      ]
    },
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T1.F3.TY3.Q024",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "Let $h(x)=q(p(q(x)))$. Use the table:  Find $h^{\\prime}(1)$.",
    "choices": [
      {
        "label": "A",
        "text": "$30$"
      },
      {
        "label": "B",
        "text": "$-30$"
      },
      {
        "label": "C",
        "text": "$75$"
      },
      {
        "label": "D",
        "text": "$-6$"
      }
    ],
    "answer_label": "C",
    "explanation": "$q(1)=0$, $p(0)=1$, so $q^{\\prime}(p(q(1)))p^{\\prime}(q(1))q^{\\prime}(1)=q^{\\prime}(1)p^{\\prime}(0)q^{\\prime}(1)=5\\cdot3\\cdot5=75$.\n\nA: Multiplies a wrong table entry.\nB: The required derivative factors are all positive.\nD: Substitutes function values for derivative values.",
    "representation": "Tabular",
    "figure": {
      "kind": "table",
      "headers": [
        "$x$",
        "$0$",
        "$1$",
        "$2$"
      ],
      "rows": [
        [
          "$p(x)$",
          "$1$",
          "$2$",
          "$0$"
        ],
        [
          "$p^{\\prime}(x)$",
          "$3$",
          "$-1$",
          "$4$"
        ],
        [
          "$q(x)$",
          "$2$",
          "$0$",
          "$1$"
        ],
        [
          "$q^{\\prime}(x)$",
          "$-2$",
          "$5$",
          "$-3$"
        ]
      ]
    },
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T1.F3.TY4.Q025",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Suppose $(f\\circ g)^{\\prime}(2)=12$, $g(2)=4$, and $g^{\\prime}(2)=-3$. What is $f^{\\prime}(4)$?",
    "choices": [
      {
        "label": "A",
        "text": "$4$"
      },
      {
        "label": "B",
        "text": "$-36$"
      },
      {
        "label": "C",
        "text": "$9$"
      },
      {
        "label": "D",
        "text": "$-4$"
      }
    ],
    "answer_label": "D",
    "explanation": "$12=f^{\\prime}(4)(-3)$, so $f^{\\prime}(4)=-4$.\n\nA: Forgets to divide by the negative inner derivative.\nB: Multiplies instead of dividing by $g^{\\prime}(2)$.\nC: Subtracts rather than using the product identity.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T1.F3.TY4.Q026",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The derivative of $h(x)=f(g(x))$ at $x=1$ is zero. The table shows $g(1)=2$ and $g^{\\prime}(1)=7$. What must be true?",
    "choices": [
      {
        "label": "A",
        "text": "$f(2)=0$"
      },
      {
        "label": "B",
        "text": "$f^{\\prime}(1)=0$"
      },
      {
        "label": "C",
        "text": "$f^{\\prime}(2)=0$"
      },
      {
        "label": "D",
        "text": "$g^{\\prime}(2)=0$"
      }
    ],
    "answer_label": "C",
    "explanation": "$0=h^{\\prime}(1)=f^{\\prime}(2)\\cdot7$, hence $f^{\\prime}(2)=0$.\n\nA: The chain rule concerns $f^{\\prime}(2)$, not the value $f(2)$.\nB: Uses the wrong input for the outer derivative.\nD: The given $g^{\\prime}(1)=7$, and no statement about $g^{\\prime}(2)$ is implied.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T1.F4.TY1.Q027",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The plotted lines are $f$ and $g$. The indicated points show $g(1)=2$, $g^{\\prime}(1)=1$, and $f^{\\prime}(2)=-2$. Find $(f\\circ g)^{\\prime}(1)$.",
    "choices": [
      {
        "label": "A",
        "text": "$2$"
      },
      {
        "label": "B",
        "text": "$-2$"
      },
      {
        "label": "C",
        "text": "$-1$"
      },
      {
        "label": "D",
        "text": "$-4$"
      }
    ],
    "answer_label": "B",
    "explanation": "$f^{\\prime}(g(1))g^{\\prime}(1)=f^{\\prime}(2)(1)=-2$.\n\nA: Loses the negative slope of $f$.\nC: Omits the factor $f^{\\prime}(2)=-2$.\nD: Multiplies by the function value $g(1)$ instead of its derivative.",
    "representation": "Graph",
    "figure": {
      "kind": "graph",
      "window": {
        "xMin": -1,
        "xMax": 5,
        "yMin": -3,
        "yMax": 7
      },
      "curves": [
        {
          "label": "f",
          "points": [
            [
              -1,
              9
            ],
            [
              -0.95,
              8.9
            ],
            [
              -0.9,
              8.8
            ],
            [
              -0.85,
              8.7
            ],
            [
              -0.8,
              8.6
            ],
            [
              -0.75,
              8.5
            ],
            [
              -0.7,
              8.4
            ],
            [
              -0.65,
              8.3
            ],
            [
              -0.6,
              8.2
            ],
            [
              -0.55,
              8.1
            ],
            [
              -0.5,
              8
            ],
            [
              -0.45,
              7.9
            ],
            [
              -0.4,
              7.8
            ],
            [
              -0.35,
              7.7
            ],
            [
              -0.3,
              7.6
            ],
            [
              -0.25,
              7.5
            ],
            [
              -0.2,
              7.4
            ],
            [
              -0.15,
              7.3
            ],
            [
              -0.1,
              7.2
            ],
            [
              -0.05,
              7.1
            ],
            [
              0,
              7
            ],
            [
              0.05,
              6.9
            ],
            [
              0.1,
              6.8
            ],
            [
              0.15,
              6.7
            ],
            [
              0.2,
              6.6
            ],
            [
              0.25,
              6.5
            ],
            [
              0.3,
              6.4
            ],
            [
              0.35,
              6.3
            ],
            [
              0.4,
              6.2
            ],
            [
              0.45,
              6.1
            ],
            [
              0.5,
              6
            ],
            [
              0.55,
              5.9
            ],
            [
              0.6,
              5.8
            ],
            [
              0.65,
              5.7
            ],
            [
              0.7,
              5.6
            ],
            [
              0.75,
              5.5
            ],
            [
              0.8,
              5.4
            ],
            [
              0.85,
              5.3
            ],
            [
              0.9,
              5.2
            ],
            [
              0.95,
              5.1
            ],
            [
              1,
              5
            ],
            [
              1.05,
              4.9
            ],
            [
              1.1,
              4.8
            ],
            [
              1.15,
              4.7
            ],
            [
              1.2,
              4.6
            ],
            [
              1.25,
              4.5
            ],
            [
              1.3,
              4.4
            ],
            [
              1.35,
              4.3
            ],
            [
              1.4,
              4.2
            ],
            [
              1.45,
              4.1
            ],
            [
              1.5,
              4
            ],
            [
              1.55,
              3.9
            ],
            [
              1.6,
              3.8
            ],
            [
              1.65,
              3.7
            ],
            [
              1.7,
              3.6
            ],
            [
              1.75,
              3.5
            ],
            [
              1.8,
              3.4
            ],
            [
              1.85,
              3.3
            ],
            [
              1.9,
              3.2
            ],
            [
              1.95,
              3.1
            ],
            [
              2,
              3
            ],
            [
              2.05,
              2.9
            ],
            [
              2.1,
              2.8
            ],
            [
              2.15,
              2.7
            ],
            [
              2.2,
              2.6
            ],
            [
              2.25,
              2.5
            ],
            [
              2.3,
              2.4
            ],
            [
              2.35,
              2.3
            ],
            [
              2.4,
              2.2
            ],
            [
              2.45,
              2.1
            ],
            [
              2.5,
              2
            ],
            [
              2.55,
              1.9
            ],
            [
              2.6,
              1.8
            ],
            [
              2.65,
              1.7
            ],
            [
              2.7,
              1.6
            ],
            [
              2.75,
              1.5
            ],
            [
              2.8,
              1.4
            ],
            [
              2.85,
              1.3
            ],
            [
              2.9,
              1.2
            ],
            [
              2.95,
              1.1
            ],
            [
              3,
              1
            ],
            [
              3.05,
              0.9
            ],
            [
              3.1,
              0.8
            ],
            [
              3.15,
              0.7
            ],
            [
              3.2,
              0.6
            ],
            [
              3.25,
              0.5
            ],
            [
              3.3,
              0.4
            ],
            [
              3.35,
              0.3
            ],
            [
              3.4,
              0.2
            ],
            [
              3.45,
              0.1
            ],
            [
              3.5,
              0
            ],
            [
              3.55,
              -0.1
            ],
            [
              3.6,
              -0.2
            ],
            [
              3.65,
              -0.3
            ],
            [
              3.7,
              -0.4
            ],
            [
              3.75,
              -0.5
            ],
            [
              3.8,
              -0.6
            ],
            [
              3.85,
              -0.7
            ],
            [
              3.9,
              -0.8
            ],
            [
              3.95,
              -0.9
            ],
            [
              4,
              -1
            ],
            [
              4.05,
              -1.1
            ],
            [
              4.1,
              -1.2
            ],
            [
              4.15,
              -1.3
            ],
            [
              4.2,
              -1.4
            ],
            [
              4.25,
              -1.5
            ],
            [
              4.3,
              -1.6
            ],
            [
              4.35,
              -1.7
            ],
            [
              4.4,
              -1.8
            ],
            [
              4.45,
              -1.9
            ],
            [
              4.5,
              -2
            ],
            [
              4.55,
              -2.1
            ],
            [
              4.6,
              -2.2
            ],
            [
              4.65,
              -2.3
            ],
            [
              4.7,
              -2.4
            ],
            [
              4.75,
              -2.5
            ],
            [
              4.8,
              -2.6
            ],
            [
              4.85,
              -2.7
            ],
            [
              4.9,
              -2.8
            ],
            [
              4.95,
              -2.9
            ],
            [
              5,
              -3
            ]
          ],
          "smooth": false
        },
        {
          "label": "g",
          "points": [
            [
              -1,
              0
            ],
            [
              -0.95,
              0.05
            ],
            [
              -0.9,
              0.1
            ],
            [
              -0.85,
              0.15
            ],
            [
              -0.8,
              0.2
            ],
            [
              -0.75,
              0.25
            ],
            [
              -0.7,
              0.3
            ],
            [
              -0.65,
              0.35
            ],
            [
              -0.6,
              0.4
            ],
            [
              -0.55,
              0.45
            ],
            [
              -0.5,
              0.5
            ],
            [
              -0.45,
              0.55
            ],
            [
              -0.4,
              0.6
            ],
            [
              -0.35,
              0.65
            ],
            [
              -0.3,
              0.7
            ],
            [
              -0.25,
              0.75
            ],
            [
              -0.2,
              0.8
            ],
            [
              -0.15,
              0.85
            ],
            [
              -0.1,
              0.9
            ],
            [
              -0.05,
              0.95
            ],
            [
              0,
              1
            ],
            [
              0.05,
              1.05
            ],
            [
              0.1,
              1.1
            ],
            [
              0.15,
              1.15
            ],
            [
              0.2,
              1.2
            ],
            [
              0.25,
              1.25
            ],
            [
              0.3,
              1.3
            ],
            [
              0.35,
              1.35
            ],
            [
              0.4,
              1.4
            ],
            [
              0.45,
              1.45
            ],
            [
              0.5,
              1.5
            ],
            [
              0.55,
              1.55
            ],
            [
              0.6,
              1.6
            ],
            [
              0.65,
              1.65
            ],
            [
              0.7,
              1.7
            ],
            [
              0.75,
              1.75
            ],
            [
              0.8,
              1.8
            ],
            [
              0.85,
              1.85
            ],
            [
              0.9,
              1.9
            ],
            [
              0.95,
              1.95
            ],
            [
              1,
              2
            ],
            [
              1.05,
              2.05
            ],
            [
              1.1,
              2.1
            ],
            [
              1.15,
              2.15
            ],
            [
              1.2,
              2.2
            ],
            [
              1.25,
              2.25
            ],
            [
              1.3,
              2.3
            ],
            [
              1.35,
              2.35
            ],
            [
              1.4,
              2.4
            ],
            [
              1.45,
              2.45
            ],
            [
              1.5,
              2.5
            ],
            [
              1.55,
              2.55
            ],
            [
              1.6,
              2.6
            ],
            [
              1.65,
              2.65
            ],
            [
              1.7,
              2.7
            ],
            [
              1.75,
              2.75
            ],
            [
              1.8,
              2.8
            ],
            [
              1.85,
              2.85
            ],
            [
              1.9,
              2.9
            ],
            [
              1.95,
              2.95
            ],
            [
              2,
              3
            ],
            [
              2.05,
              3.05
            ],
            [
              2.1,
              3.1
            ],
            [
              2.15,
              3.15
            ],
            [
              2.2,
              3.2
            ],
            [
              2.25,
              3.25
            ],
            [
              2.3,
              3.3
            ],
            [
              2.35,
              3.35
            ],
            [
              2.4,
              3.4
            ],
            [
              2.45,
              3.45
            ],
            [
              2.5,
              3.5
            ],
            [
              2.55,
              3.55
            ],
            [
              2.6,
              3.6
            ],
            [
              2.65,
              3.65
            ],
            [
              2.7,
              3.7
            ],
            [
              2.75,
              3.75
            ],
            [
              2.8,
              3.8
            ],
            [
              2.85,
              3.85
            ],
            [
              2.9,
              3.9
            ],
            [
              2.95,
              3.95
            ],
            [
              3,
              4
            ],
            [
              3.05,
              4.05
            ],
            [
              3.1,
              4.1
            ],
            [
              3.15,
              4.15
            ],
            [
              3.2,
              4.2
            ],
            [
              3.25,
              4.25
            ],
            [
              3.3,
              4.3
            ],
            [
              3.35,
              4.35
            ],
            [
              3.4,
              4.4
            ],
            [
              3.45,
              4.45
            ],
            [
              3.5,
              4.5
            ],
            [
              3.55,
              4.55
            ],
            [
              3.6,
              4.6
            ],
            [
              3.65,
              4.65
            ],
            [
              3.7,
              4.7
            ],
            [
              3.75,
              4.75
            ],
            [
              3.8,
              4.8
            ],
            [
              3.85,
              4.85
            ],
            [
              3.9,
              4.9
            ],
            [
              3.95,
              4.95
            ],
            [
              4,
              5
            ],
            [
              4.05,
              5.05
            ],
            [
              4.1,
              5.1
            ],
            [
              4.15,
              5.15
            ],
            [
              4.2,
              5.2
            ],
            [
              4.25,
              5.25
            ],
            [
              4.3,
              5.3
            ],
            [
              4.35,
              5.35
            ],
            [
              4.4,
              5.4
            ],
            [
              4.45,
              5.45
            ],
            [
              4.5,
              5.5
            ],
            [
              4.55,
              5.55
            ],
            [
              4.6,
              5.6
            ],
            [
              4.65,
              5.65
            ],
            [
              4.7,
              5.7
            ],
            [
              4.75,
              5.75
            ],
            [
              4.8,
              5.8
            ],
            [
              4.85,
              5.85
            ],
            [
              4.9,
              5.9
            ],
            [
              4.95,
              5.95
            ],
            [
              5,
              6
            ]
          ],
          "smooth": false
        }
      ],
      "markers": [
        {
          "x": 2,
          "y": 3,
          "label": "f(2)",
          "kind": "closed"
        },
        {
          "x": 1,
          "y": 2,
          "label": "g(1)",
          "kind": "closed"
        }
      ]
    },
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T1.F4.TY1.Q028",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "In the graph, $f$ has a horizontal tangent at $x=3$ and $g(2)=3$. If $g^{\\prime}(2)=4$, what is $(f\\circ g)^{\\prime}(2)$?",
    "choices": [
      {
        "label": "A",
        "text": "$3$"
      },
      {
        "label": "B",
        "text": "$12$"
      },
      {
        "label": "C",
        "text": "$0$"
      },
      {
        "label": "D",
        "text": "$4$"
      }
    ],
    "answer_label": "C",
    "explanation": "Because $f^{\\prime}(3)=0$, the chain rule gives $0\\cdot4=0$.\n\nA: Uses $g(2)$ rather than derivative information.\nB: Uses the input 3 as a derivative.\nD: Multiplies the inner derivative by 1 instead of the zero outer derivative.",
    "representation": "Graph",
    "figure": {
      "kind": "graph",
      "window": {
        "xMin": 0,
        "xMax": 6,
        "yMin": 0,
        "yMax": 9
      },
      "curves": [
        {
          "label": "f",
          "points": [
            [
              0,
              11
            ],
            [
              0.05,
              10.7025
            ],
            [
              0.1,
              10.41
            ],
            [
              0.15,
              10.1225
            ],
            [
              0.2,
              9.84
            ],
            [
              0.25,
              9.5625
            ],
            [
              0.3,
              9.29
            ],
            [
              0.35,
              9.0225
            ],
            [
              0.4,
              8.76
            ],
            [
              0.45,
              8.5025
            ],
            [
              0.5,
              8.25
            ],
            [
              0.55,
              8.0025
            ],
            [
              0.6,
              7.76
            ],
            [
              0.65,
              7.5225
            ],
            [
              0.7,
              7.29
            ],
            [
              0.75,
              7.0625
            ],
            [
              0.8,
              6.84
            ],
            [
              0.85,
              6.6225
            ],
            [
              0.9,
              6.41
            ],
            [
              0.95,
              6.2025
            ],
            [
              1,
              6
            ],
            [
              1.05,
              5.8025
            ],
            [
              1.1,
              5.61
            ],
            [
              1.15,
              5.4225
            ],
            [
              1.2,
              5.24
            ],
            [
              1.25,
              5.0625
            ],
            [
              1.3,
              4.89
            ],
            [
              1.35,
              4.7225
            ],
            [
              1.4,
              4.56
            ],
            [
              1.45,
              4.4025
            ],
            [
              1.5,
              4.25
            ],
            [
              1.55,
              4.1025
            ],
            [
              1.6,
              3.96
            ],
            [
              1.65,
              3.8225
            ],
            [
              1.7,
              3.69
            ],
            [
              1.75,
              3.5625
            ],
            [
              1.8,
              3.44
            ],
            [
              1.85,
              3.3225
            ],
            [
              1.9,
              3.21
            ],
            [
              1.95,
              3.1025
            ],
            [
              2,
              3
            ],
            [
              2.05,
              2.9025
            ],
            [
              2.1,
              2.81
            ],
            [
              2.15,
              2.7225
            ],
            [
              2.2,
              2.64
            ],
            [
              2.25,
              2.5625
            ],
            [
              2.3,
              2.49
            ],
            [
              2.35,
              2.4225
            ],
            [
              2.4,
              2.36
            ],
            [
              2.45,
              2.3025
            ],
            [
              2.5,
              2.25
            ],
            [
              2.55,
              2.2025
            ],
            [
              2.6,
              2.16
            ],
            [
              2.65,
              2.1225
            ],
            [
              2.7,
              2.09
            ],
            [
              2.75,
              2.0625
            ],
            [
              2.8,
              2.04
            ],
            [
              2.85,
              2.0225
            ],
            [
              2.9,
              2.01
            ],
            [
              2.95,
              2.0025
            ],
            [
              3,
              2
            ],
            [
              3.05,
              2.0025
            ],
            [
              3.1,
              2.01
            ],
            [
              3.15,
              2.0225
            ],
            [
              3.2,
              2.04
            ],
            [
              3.25,
              2.0625
            ],
            [
              3.3,
              2.09
            ],
            [
              3.35,
              2.1225
            ],
            [
              3.4,
              2.16
            ],
            [
              3.45,
              2.2025
            ],
            [
              3.5,
              2.25
            ],
            [
              3.55,
              2.3025
            ],
            [
              3.6,
              2.36
            ],
            [
              3.65,
              2.4225
            ],
            [
              3.7,
              2.49
            ],
            [
              3.75,
              2.5625
            ],
            [
              3.8,
              2.64
            ],
            [
              3.85,
              2.7225
            ],
            [
              3.9,
              2.81
            ],
            [
              3.95,
              2.9025
            ],
            [
              4,
              3
            ],
            [
              4.05,
              3.1025
            ],
            [
              4.1,
              3.21
            ],
            [
              4.15,
              3.3225
            ],
            [
              4.2,
              3.44
            ],
            [
              4.25,
              3.5625
            ],
            [
              4.3,
              3.69
            ],
            [
              4.35,
              3.8225
            ],
            [
              4.4,
              3.96
            ],
            [
              4.45,
              4.1025
            ],
            [
              4.5,
              4.25
            ],
            [
              4.55,
              4.4025
            ],
            [
              4.6,
              4.56
            ],
            [
              4.65,
              4.7225
            ],
            [
              4.7,
              4.89
            ],
            [
              4.75,
              5.0625
            ],
            [
              4.8,
              5.24
            ],
            [
              4.85,
              5.4225
            ],
            [
              4.9,
              5.61
            ],
            [
              4.95,
              5.8025
            ],
            [
              5,
              6
            ],
            [
              5.05,
              6.2025
            ],
            [
              5.1,
              6.41
            ],
            [
              5.15,
              6.6225
            ],
            [
              5.2,
              6.84
            ],
            [
              5.25,
              7.0625
            ],
            [
              5.3,
              7.29
            ],
            [
              5.35,
              7.5225
            ],
            [
              5.4,
              7.76
            ],
            [
              5.45,
              8.0025
            ],
            [
              5.5,
              8.25
            ],
            [
              5.55,
              8.5025
            ],
            [
              5.6,
              8.76
            ],
            [
              5.65,
              9.0225
            ],
            [
              5.7,
              9.29
            ],
            [
              5.75,
              9.5625
            ],
            [
              5.8,
              9.84
            ],
            [
              5.85,
              10.1225
            ],
            [
              5.9,
              10.41
            ],
            [
              5.95,
              10.7025
            ],
            [
              6,
              11
            ]
          ],
          "smooth": false
        }
      ],
      "markers": [
        {
          "x": 3,
          "y": 2,
          "label": "(3,2)",
          "kind": "closed"
        }
      ]
    },
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T1.F4.TY2.Q029",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The graph shows $f(2)=1$, $f^{\\prime}(2)=2$, and a line $g$ of slope $-3$. What is $(g\\circ f)^{\\prime}(2)$?",
    "choices": [
      {
        "label": "A",
        "text": "$6$"
      },
      {
        "label": "B",
        "text": "$-9$"
      },
      {
        "label": "C",
        "text": "$-3$"
      },
      {
        "label": "D",
        "text": "$-6$"
      }
    ],
    "answer_label": "D",
    "explanation": "$g^{\\prime}(f(2))f^{\\prime}(2)=(-3)(2)=-6$.\n\nA: Omits the negative sign of $g^{\\prime}$.\nB: Uses the value $f(2)$ as a slope multiplier.\nC: Uses only the outer derivative.",
    "representation": "Graph",
    "figure": {
      "kind": "graph",
      "window": {
        "xMin": -1,
        "xMax": 4,
        "yMin": -3,
        "yMax": 9
      },
      "curves": [
        {
          "label": "f",
          "points": [
            [
              -1,
              -5
            ],
            [
              -0.958333,
              -4.916667
            ],
            [
              -0.916667,
              -4.833333
            ],
            [
              -0.875,
              -4.75
            ],
            [
              -0.833333,
              -4.666667
            ],
            [
              -0.791667,
              -4.583333
            ],
            [
              -0.75,
              -4.5
            ],
            [
              -0.708333,
              -4.416667
            ],
            [
              -0.666667,
              -4.333333
            ],
            [
              -0.625,
              -4.25
            ],
            [
              -0.583333,
              -4.166667
            ],
            [
              -0.541667,
              -4.083333
            ],
            [
              -0.5,
              -4
            ],
            [
              -0.458333,
              -3.916667
            ],
            [
              -0.416667,
              -3.833333
            ],
            [
              -0.375,
              -3.75
            ],
            [
              -0.333333,
              -3.666667
            ],
            [
              -0.291667,
              -3.583333
            ],
            [
              -0.25,
              -3.5
            ],
            [
              -0.208333,
              -3.416667
            ],
            [
              -0.166667,
              -3.333333
            ],
            [
              -0.125,
              -3.25
            ],
            [
              -0.083333,
              -3.166667
            ],
            [
              -0.041667,
              -3.083333
            ],
            [
              0,
              -3
            ],
            [
              0.041667,
              -2.916667
            ],
            [
              0.083333,
              -2.833333
            ],
            [
              0.125,
              -2.75
            ],
            [
              0.166667,
              -2.666667
            ],
            [
              0.208333,
              -2.583333
            ],
            [
              0.25,
              -2.5
            ],
            [
              0.291667,
              -2.416667
            ],
            [
              0.333333,
              -2.333333
            ],
            [
              0.375,
              -2.25
            ],
            [
              0.416667,
              -2.166667
            ],
            [
              0.458333,
              -2.083333
            ],
            [
              0.5,
              -2
            ],
            [
              0.541667,
              -1.916667
            ],
            [
              0.583333,
              -1.833333
            ],
            [
              0.625,
              -1.75
            ],
            [
              0.666667,
              -1.666667
            ],
            [
              0.708333,
              -1.583333
            ],
            [
              0.75,
              -1.5
            ],
            [
              0.791667,
              -1.416667
            ],
            [
              0.833333,
              -1.333333
            ],
            [
              0.875,
              -1.25
            ],
            [
              0.916667,
              -1.166667
            ],
            [
              0.958333,
              -1.083333
            ],
            [
              1,
              -1
            ],
            [
              1.041667,
              -0.916667
            ],
            [
              1.083333,
              -0.833333
            ],
            [
              1.125,
              -0.75
            ],
            [
              1.166667,
              -0.666667
            ],
            [
              1.208333,
              -0.583333
            ],
            [
              1.25,
              -0.5
            ],
            [
              1.291667,
              -0.416667
            ],
            [
              1.333333,
              -0.333333
            ],
            [
              1.375,
              -0.25
            ],
            [
              1.416667,
              -0.166667
            ],
            [
              1.458333,
              -0.083333
            ],
            [
              1.5,
              0
            ],
            [
              1.541667,
              0.083333
            ],
            [
              1.583333,
              0.166667
            ],
            [
              1.625,
              0.25
            ],
            [
              1.666667,
              0.333333
            ],
            [
              1.708333,
              0.416667
            ],
            [
              1.75,
              0.5
            ],
            [
              1.791667,
              0.583333
            ],
            [
              1.833333,
              0.666667
            ],
            [
              1.875,
              0.75
            ],
            [
              1.916667,
              0.833333
            ],
            [
              1.958333,
              0.916667
            ],
            [
              2,
              1
            ],
            [
              2.041667,
              1.083333
            ],
            [
              2.083333,
              1.166667
            ],
            [
              2.125,
              1.25
            ],
            [
              2.166667,
              1.333333
            ],
            [
              2.208333,
              1.416667
            ],
            [
              2.25,
              1.5
            ],
            [
              2.291667,
              1.583333
            ],
            [
              2.333333,
              1.666667
            ],
            [
              2.375,
              1.75
            ],
            [
              2.416667,
              1.833333
            ],
            [
              2.458333,
              1.916667
            ],
            [
              2.5,
              2
            ],
            [
              2.541667,
              2.083333
            ],
            [
              2.583333,
              2.166667
            ],
            [
              2.625,
              2.25
            ],
            [
              2.666667,
              2.333333
            ],
            [
              2.708333,
              2.416667
            ],
            [
              2.75,
              2.5
            ],
            [
              2.791667,
              2.583333
            ],
            [
              2.833333,
              2.666667
            ],
            [
              2.875,
              2.75
            ],
            [
              2.916667,
              2.833333
            ],
            [
              2.958333,
              2.916667
            ],
            [
              3,
              3
            ],
            [
              3.041667,
              3.083333
            ],
            [
              3.083333,
              3.166667
            ],
            [
              3.125,
              3.25
            ],
            [
              3.166667,
              3.333333
            ],
            [
              3.208333,
              3.416667
            ],
            [
              3.25,
              3.5
            ],
            [
              3.291667,
              3.583333
            ],
            [
              3.333333,
              3.666667
            ],
            [
              3.375,
              3.75
            ],
            [
              3.416667,
              3.833333
            ],
            [
              3.458333,
              3.916667
            ],
            [
              3.5,
              4
            ],
            [
              3.541667,
              4.083333
            ],
            [
              3.583333,
              4.166667
            ],
            [
              3.625,
              4.25
            ],
            [
              3.666667,
              4.333333
            ],
            [
              3.708333,
              4.416667
            ],
            [
              3.75,
              4.5
            ],
            [
              3.791667,
              4.583333
            ],
            [
              3.833333,
              4.666667
            ],
            [
              3.875,
              4.75
            ],
            [
              3.916667,
              4.833333
            ],
            [
              3.958333,
              4.916667
            ],
            [
              4,
              5
            ]
          ],
          "smooth": false
        },
        {
          "label": "g",
          "points": [
            [
              -1,
              10
            ],
            [
              -0.958333,
              9.875
            ],
            [
              -0.916667,
              9.75
            ],
            [
              -0.875,
              9.625
            ],
            [
              -0.833333,
              9.5
            ],
            [
              -0.791667,
              9.375
            ],
            [
              -0.75,
              9.25
            ],
            [
              -0.708333,
              9.125
            ],
            [
              -0.666667,
              9
            ],
            [
              -0.625,
              8.875
            ],
            [
              -0.583333,
              8.75
            ],
            [
              -0.541667,
              8.625
            ],
            [
              -0.5,
              8.5
            ],
            [
              -0.458333,
              8.375
            ],
            [
              -0.416667,
              8.25
            ],
            [
              -0.375,
              8.125
            ],
            [
              -0.333333,
              8
            ],
            [
              -0.291667,
              7.875
            ],
            [
              -0.25,
              7.75
            ],
            [
              -0.208333,
              7.625
            ],
            [
              -0.166667,
              7.5
            ],
            [
              -0.125,
              7.375
            ],
            [
              -0.083333,
              7.25
            ],
            [
              -0.041667,
              7.125
            ],
            [
              0,
              7
            ],
            [
              0.041667,
              6.875
            ],
            [
              0.083333,
              6.75
            ],
            [
              0.125,
              6.625
            ],
            [
              0.166667,
              6.5
            ],
            [
              0.208333,
              6.375
            ],
            [
              0.25,
              6.25
            ],
            [
              0.291667,
              6.125
            ],
            [
              0.333333,
              6
            ],
            [
              0.375,
              5.875
            ],
            [
              0.416667,
              5.75
            ],
            [
              0.458333,
              5.625
            ],
            [
              0.5,
              5.5
            ],
            [
              0.541667,
              5.375
            ],
            [
              0.583333,
              5.25
            ],
            [
              0.625,
              5.125
            ],
            [
              0.666667,
              5
            ],
            [
              0.708333,
              4.875
            ],
            [
              0.75,
              4.75
            ],
            [
              0.791667,
              4.625
            ],
            [
              0.833333,
              4.5
            ],
            [
              0.875,
              4.375
            ],
            [
              0.916667,
              4.25
            ],
            [
              0.958333,
              4.125
            ],
            [
              1,
              4
            ],
            [
              1.041667,
              3.875
            ],
            [
              1.083333,
              3.75
            ],
            [
              1.125,
              3.625
            ],
            [
              1.166667,
              3.5
            ],
            [
              1.208333,
              3.375
            ],
            [
              1.25,
              3.25
            ],
            [
              1.291667,
              3.125
            ],
            [
              1.333333,
              3
            ],
            [
              1.375,
              2.875
            ],
            [
              1.416667,
              2.75
            ],
            [
              1.458333,
              2.625
            ],
            [
              1.5,
              2.5
            ],
            [
              1.541667,
              2.375
            ],
            [
              1.583333,
              2.25
            ],
            [
              1.625,
              2.125
            ],
            [
              1.666667,
              2
            ],
            [
              1.708333,
              1.875
            ],
            [
              1.75,
              1.75
            ],
            [
              1.791667,
              1.625
            ],
            [
              1.833333,
              1.5
            ],
            [
              1.875,
              1.375
            ],
            [
              1.916667,
              1.25
            ],
            [
              1.958333,
              1.125
            ],
            [
              2,
              1
            ],
            [
              2.041667,
              0.875
            ],
            [
              2.083333,
              0.75
            ],
            [
              2.125,
              0.625
            ],
            [
              2.166667,
              0.5
            ],
            [
              2.208333,
              0.375
            ],
            [
              2.25,
              0.25
            ],
            [
              2.291667,
              0.125
            ],
            [
              2.333333,
              0
            ],
            [
              2.375,
              -0.125
            ],
            [
              2.416667,
              -0.25
            ],
            [
              2.458333,
              -0.375
            ],
            [
              2.5,
              -0.5
            ],
            [
              2.541667,
              -0.625
            ],
            [
              2.583333,
              -0.75
            ],
            [
              2.625,
              -0.875
            ],
            [
              2.666667,
              -1
            ],
            [
              2.708333,
              -1.125
            ],
            [
              2.75,
              -1.25
            ],
            [
              2.791667,
              -1.375
            ],
            [
              2.833333,
              -1.5
            ],
            [
              2.875,
              -1.625
            ],
            [
              2.916667,
              -1.75
            ],
            [
              2.958333,
              -1.875
            ],
            [
              3,
              -2
            ],
            [
              3.041667,
              -2.125
            ],
            [
              3.083333,
              -2.25
            ],
            [
              3.125,
              -2.375
            ],
            [
              3.166667,
              -2.5
            ],
            [
              3.208333,
              -2.625
            ],
            [
              3.25,
              -2.75
            ],
            [
              3.291667,
              -2.875
            ],
            [
              3.333333,
              -3
            ],
            [
              3.375,
              -3.125
            ],
            [
              3.416667,
              -3.25
            ],
            [
              3.458333,
              -3.375
            ],
            [
              3.5,
              -3.5
            ],
            [
              3.541667,
              -3.625
            ],
            [
              3.583333,
              -3.75
            ],
            [
              3.625,
              -3.875
            ],
            [
              3.666667,
              -4
            ],
            [
              3.708333,
              -4.125
            ],
            [
              3.75,
              -4.25
            ],
            [
              3.791667,
              -4.375
            ],
            [
              3.833333,
              -4.5
            ],
            [
              3.875,
              -4.625
            ],
            [
              3.916667,
              -4.75
            ],
            [
              3.958333,
              -4.875
            ],
            [
              4,
              -5
            ]
          ],
          "smooth": false
        }
      ],
      "markers": [
        {
          "x": 2,
          "y": 1,
          "label": "f(2)",
          "kind": "closed"
        }
      ]
    },
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T1.F4.TY2.Q030",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The graph of $g$ is a line of slope $\\frac12$. The graph of $f$ has tangent slope $-4$ at $x=-1$. What is $(g\\circ f)^{\\prime}(-1)$?",
    "choices": [
      {
        "label": "A",
        "text": "$-2$"
      },
      {
        "label": "B",
        "text": "$-\\frac{1}{8}$"
      },
      {
        "label": "C",
        "text": "$-4$"
      },
      {
        "label": "D",
        "text": "$2$"
      }
    ],
    "answer_label": "A",
    "explanation": "$g^{\\prime}(f(-1))=\\frac12$ for a line, hence $(g\\circ f)^{\\prime}(-1)=\\frac12(-4)=-2$.\n\nB: Takes reciprocals rather than multiplying derivatives.\nC: Ignores the derivative of $g$.\nD: Drops the negative tangent slope of $f$.",
    "representation": "Graph",
    "figure": {
      "kind": "graph",
      "window": {
        "xMin": -3,
        "xMax": 4,
        "yMin": -4,
        "yMax": 8
      },
      "curves": [
        {
          "label": "f",
          "points": [
            [
              -3,
              11
            ],
            [
              -2.941667,
              10.766667
            ],
            [
              -2.883333,
              10.533333
            ],
            [
              -2.825,
              10.3
            ],
            [
              -2.766667,
              10.066667
            ],
            [
              -2.708333,
              9.833333
            ],
            [
              -2.65,
              9.6
            ],
            [
              -2.591667,
              9.366667
            ],
            [
              -2.533333,
              9.133333
            ],
            [
              -2.475,
              8.9
            ],
            [
              -2.416667,
              8.666667
            ],
            [
              -2.358333,
              8.433333
            ],
            [
              -2.3,
              8.2
            ],
            [
              -2.241667,
              7.966667
            ],
            [
              -2.183333,
              7.733333
            ],
            [
              -2.125,
              7.5
            ],
            [
              -2.066667,
              7.266667
            ],
            [
              -2.008333,
              7.033333
            ],
            [
              -1.95,
              6.8
            ],
            [
              -1.891667,
              6.566667
            ],
            [
              -1.833333,
              6.333333
            ],
            [
              -1.775,
              6.1
            ],
            [
              -1.716667,
              5.866667
            ],
            [
              -1.658333,
              5.633333
            ],
            [
              -1.6,
              5.4
            ],
            [
              -1.541667,
              5.166667
            ],
            [
              -1.483333,
              4.933333
            ],
            [
              -1.425,
              4.7
            ],
            [
              -1.366667,
              4.466667
            ],
            [
              -1.308333,
              4.233333
            ],
            [
              -1.25,
              4
            ],
            [
              -1.191667,
              3.766667
            ],
            [
              -1.133333,
              3.533333
            ],
            [
              -1.075,
              3.3
            ],
            [
              -1.016667,
              3.066667
            ],
            [
              -0.958333,
              2.833333
            ],
            [
              -0.9,
              2.6
            ],
            [
              -0.841667,
              2.366667
            ],
            [
              -0.783333,
              2.133333
            ],
            [
              -0.725,
              1.9
            ],
            [
              -0.666667,
              1.666667
            ],
            [
              -0.608333,
              1.433333
            ],
            [
              -0.55,
              1.2
            ],
            [
              -0.491667,
              0.966667
            ],
            [
              -0.433333,
              0.733333
            ],
            [
              -0.375,
              0.5
            ],
            [
              -0.316667,
              0.266667
            ],
            [
              -0.258333,
              0.033333
            ],
            [
              -0.2,
              -0.2
            ],
            [
              -0.141667,
              -0.433333
            ],
            [
              -0.083333,
              -0.666667
            ],
            [
              -0.025,
              -0.9
            ],
            [
              0.033333,
              -1.133333
            ],
            [
              0.091667,
              -1.366667
            ],
            [
              0.15,
              -1.6
            ],
            [
              0.208333,
              -1.833333
            ],
            [
              0.266667,
              -2.066667
            ],
            [
              0.325,
              -2.3
            ],
            [
              0.383333,
              -2.533333
            ],
            [
              0.441667,
              -2.766667
            ],
            [
              0.5,
              -3
            ],
            [
              0.558333,
              -3.233333
            ],
            [
              0.616667,
              -3.466667
            ],
            [
              0.675,
              -3.7
            ],
            [
              0.733333,
              -3.933333
            ],
            [
              0.791667,
              -4.166667
            ],
            [
              0.85,
              -4.4
            ],
            [
              0.908333,
              -4.633333
            ],
            [
              0.966667,
              -4.866667
            ],
            [
              1.025,
              -5.1
            ],
            [
              1.083333,
              -5.333333
            ],
            [
              1.141667,
              -5.566667
            ],
            [
              1.2,
              -5.8
            ],
            [
              1.258333,
              -6.033333
            ],
            [
              1.316667,
              -6.266667
            ],
            [
              1.375,
              -6.5
            ],
            [
              1.433333,
              -6.733333
            ],
            [
              1.491667,
              -6.966667
            ],
            [
              1.55,
              -7.2
            ],
            [
              1.608333,
              -7.433333
            ],
            [
              1.666667,
              -7.666667
            ],
            [
              1.725,
              -7.9
            ],
            [
              1.783333,
              -8.133333
            ],
            [
              1.841667,
              -8.366667
            ],
            [
              1.9,
              -8.6
            ],
            [
              1.958333,
              -8.833333
            ],
            [
              2.016667,
              -9.066667
            ],
            [
              2.075,
              -9.3
            ],
            [
              2.133333,
              -9.533333
            ],
            [
              2.191667,
              -9.766667
            ],
            [
              2.25,
              -10
            ],
            [
              2.308333,
              -10.233333
            ],
            [
              2.366667,
              -10.466667
            ],
            [
              2.425,
              -10.7
            ],
            [
              2.483333,
              -10.933333
            ],
            [
              2.541667,
              -11.166667
            ],
            [
              2.6,
              -11.4
            ],
            [
              2.658333,
              -11.633333
            ],
            [
              2.716667,
              -11.866667
            ],
            [
              2.775,
              -12.1
            ],
            [
              2.833333,
              -12.333333
            ],
            [
              2.891667,
              -12.566667
            ],
            [
              2.95,
              -12.8
            ],
            [
              3.008333,
              -13.033333
            ],
            [
              3.066667,
              -13.266667
            ],
            [
              3.125,
              -13.5
            ],
            [
              3.183333,
              -13.733333
            ],
            [
              3.241667,
              -13.966667
            ],
            [
              3.3,
              -14.2
            ],
            [
              3.358333,
              -14.433333
            ],
            [
              3.416667,
              -14.666667
            ],
            [
              3.475,
              -14.9
            ],
            [
              3.533333,
              -15.133333
            ],
            [
              3.591667,
              -15.366667
            ],
            [
              3.65,
              -15.6
            ],
            [
              3.708333,
              -15.833333
            ],
            [
              3.766667,
              -16.066667
            ],
            [
              3.825,
              -16.3
            ],
            [
              3.883333,
              -16.533333
            ],
            [
              3.941667,
              -16.766667
            ],
            [
              4,
              -17
            ]
          ],
          "smooth": false
        },
        {
          "label": "g",
          "points": [
            [
              -3,
              -0.5
            ],
            [
              -2.941667,
              -0.470833
            ],
            [
              -2.883333,
              -0.441667
            ],
            [
              -2.825,
              -0.4125
            ],
            [
              -2.766667,
              -0.383333
            ],
            [
              -2.708333,
              -0.354167
            ],
            [
              -2.65,
              -0.325
            ],
            [
              -2.591667,
              -0.295833
            ],
            [
              -2.533333,
              -0.266667
            ],
            [
              -2.475,
              -0.2375
            ],
            [
              -2.416667,
              -0.208333
            ],
            [
              -2.358333,
              -0.179167
            ],
            [
              -2.3,
              -0.15
            ],
            [
              -2.241667,
              -0.120833
            ],
            [
              -2.183333,
              -0.091667
            ],
            [
              -2.125,
              -0.0625
            ],
            [
              -2.066667,
              -0.033333
            ],
            [
              -2.008333,
              -0.004167
            ],
            [
              -1.95,
              0.025
            ],
            [
              -1.891667,
              0.054167
            ],
            [
              -1.833333,
              0.083333
            ],
            [
              -1.775,
              0.1125
            ],
            [
              -1.716667,
              0.141667
            ],
            [
              -1.658333,
              0.170833
            ],
            [
              -1.6,
              0.2
            ],
            [
              -1.541667,
              0.229167
            ],
            [
              -1.483333,
              0.258333
            ],
            [
              -1.425,
              0.2875
            ],
            [
              -1.366667,
              0.316667
            ],
            [
              -1.308333,
              0.345833
            ],
            [
              -1.25,
              0.375
            ],
            [
              -1.191667,
              0.404167
            ],
            [
              -1.133333,
              0.433333
            ],
            [
              -1.075,
              0.4625
            ],
            [
              -1.016667,
              0.491667
            ],
            [
              -0.958333,
              0.520833
            ],
            [
              -0.9,
              0.55
            ],
            [
              -0.841667,
              0.579167
            ],
            [
              -0.783333,
              0.608333
            ],
            [
              -0.725,
              0.6375
            ],
            [
              -0.666667,
              0.666667
            ],
            [
              -0.608333,
              0.695833
            ],
            [
              -0.55,
              0.725
            ],
            [
              -0.491667,
              0.754167
            ],
            [
              -0.433333,
              0.783333
            ],
            [
              -0.375,
              0.8125
            ],
            [
              -0.316667,
              0.841667
            ],
            [
              -0.258333,
              0.870833
            ],
            [
              -0.2,
              0.9
            ],
            [
              -0.141667,
              0.929167
            ],
            [
              -0.083333,
              0.958333
            ],
            [
              -0.025,
              0.9875
            ],
            [
              0.033333,
              1.016667
            ],
            [
              0.091667,
              1.045833
            ],
            [
              0.15,
              1.075
            ],
            [
              0.208333,
              1.104167
            ],
            [
              0.266667,
              1.133333
            ],
            [
              0.325,
              1.1625
            ],
            [
              0.383333,
              1.191667
            ],
            [
              0.441667,
              1.220833
            ],
            [
              0.5,
              1.25
            ],
            [
              0.558333,
              1.279167
            ],
            [
              0.616667,
              1.308333
            ],
            [
              0.675,
              1.3375
            ],
            [
              0.733333,
              1.366667
            ],
            [
              0.791667,
              1.395833
            ],
            [
              0.85,
              1.425
            ],
            [
              0.908333,
              1.454167
            ],
            [
              0.966667,
              1.483333
            ],
            [
              1.025,
              1.5125
            ],
            [
              1.083333,
              1.541667
            ],
            [
              1.141667,
              1.570833
            ],
            [
              1.2,
              1.6
            ],
            [
              1.258333,
              1.629167
            ],
            [
              1.316667,
              1.658333
            ],
            [
              1.375,
              1.6875
            ],
            [
              1.433333,
              1.716667
            ],
            [
              1.491667,
              1.745833
            ],
            [
              1.55,
              1.775
            ],
            [
              1.608333,
              1.804167
            ],
            [
              1.666667,
              1.833333
            ],
            [
              1.725,
              1.8625
            ],
            [
              1.783333,
              1.891667
            ],
            [
              1.841667,
              1.920833
            ],
            [
              1.9,
              1.95
            ],
            [
              1.958333,
              1.979167
            ],
            [
              2.016667,
              2.008333
            ],
            [
              2.075,
              2.0375
            ],
            [
              2.133333,
              2.066667
            ],
            [
              2.191667,
              2.095833
            ],
            [
              2.25,
              2.125
            ],
            [
              2.308333,
              2.154167
            ],
            [
              2.366667,
              2.183333
            ],
            [
              2.425,
              2.2125
            ],
            [
              2.483333,
              2.241667
            ],
            [
              2.541667,
              2.270833
            ],
            [
              2.6,
              2.3
            ],
            [
              2.658333,
              2.329167
            ],
            [
              2.716667,
              2.358333
            ],
            [
              2.775,
              2.3875
            ],
            [
              2.833333,
              2.416667
            ],
            [
              2.891667,
              2.445833
            ],
            [
              2.95,
              2.475
            ],
            [
              3.008333,
              2.504167
            ],
            [
              3.066667,
              2.533333
            ],
            [
              3.125,
              2.5625
            ],
            [
              3.183333,
              2.591667
            ],
            [
              3.241667,
              2.620833
            ],
            [
              3.3,
              2.65
            ],
            [
              3.358333,
              2.679167
            ],
            [
              3.416667,
              2.708333
            ],
            [
              3.475,
              2.7375
            ],
            [
              3.533333,
              2.766667
            ],
            [
              3.591667,
              2.795833
            ],
            [
              3.65,
              2.825
            ],
            [
              3.708333,
              2.854167
            ],
            [
              3.766667,
              2.883333
            ],
            [
              3.825,
              2.9125
            ],
            [
              3.883333,
              2.941667
            ],
            [
              3.941667,
              2.970833
            ],
            [
              4,
              3
            ]
          ],
          "smooth": false
        }
      ],
      "markers": [
        {
          "x": -1,
          "y": 3,
          "label": "f(-1)",
          "kind": "closed"
        }
      ]
    },
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T1.F4.TY3.Q031",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The parabola is $f(x)=(x-1)^2+2$ and $g(x)=x+1$. At what $x$ does $(f\\circ g)^{\\prime}(x)=0$?",
    "choices": [
      {
        "label": "A",
        "text": "$1$"
      },
      {
        "label": "B",
        "text": "$-1$"
      },
      {
        "label": "C",
        "text": "$2$"
      },
      {
        "label": "D",
        "text": "$0$"
      }
    ],
    "answer_label": "D",
    "explanation": "$(f\\circ g)(x)=x^2+2$, whose derivative vanishes at $x=0$.\n\nA: Uses the critical point of $f$ without accounting for $g(x)$.\nB: Confuses the shift in the inner function.\nC: Uses the vertical shift of the parabola as an input.",
    "representation": "Graph",
    "figure": {
      "kind": "graph",
      "window": {
        "xMin": -2,
        "xMax": 4,
        "yMin": 0,
        "yMax": 9
      },
      "curves": [
        {
          "label": "f",
          "points": [
            [
              -2,
              11
            ],
            [
              -1.95,
              10.7025
            ],
            [
              -1.9,
              10.41
            ],
            [
              -1.85,
              10.1225
            ],
            [
              -1.8,
              9.84
            ],
            [
              -1.75,
              9.5625
            ],
            [
              -1.7,
              9.29
            ],
            [
              -1.65,
              9.0225
            ],
            [
              -1.6,
              8.76
            ],
            [
              -1.55,
              8.5025
            ],
            [
              -1.5,
              8.25
            ],
            [
              -1.45,
              8.0025
            ],
            [
              -1.4,
              7.76
            ],
            [
              -1.35,
              7.5225
            ],
            [
              -1.3,
              7.29
            ],
            [
              -1.25,
              7.0625
            ],
            [
              -1.2,
              6.84
            ],
            [
              -1.15,
              6.6225
            ],
            [
              -1.1,
              6.41
            ],
            [
              -1.05,
              6.2025
            ],
            [
              -1,
              6
            ],
            [
              -0.95,
              5.8025
            ],
            [
              -0.9,
              5.61
            ],
            [
              -0.85,
              5.4225
            ],
            [
              -0.8,
              5.24
            ],
            [
              -0.75,
              5.0625
            ],
            [
              -0.7,
              4.89
            ],
            [
              -0.65,
              4.7225
            ],
            [
              -0.6,
              4.56
            ],
            [
              -0.55,
              4.4025
            ],
            [
              -0.5,
              4.25
            ],
            [
              -0.45,
              4.1025
            ],
            [
              -0.4,
              3.96
            ],
            [
              -0.35,
              3.8225
            ],
            [
              -0.3,
              3.69
            ],
            [
              -0.25,
              3.5625
            ],
            [
              -0.2,
              3.44
            ],
            [
              -0.15,
              3.3225
            ],
            [
              -0.1,
              3.21
            ],
            [
              -0.05,
              3.1025
            ],
            [
              0,
              3
            ],
            [
              0.05,
              2.9025
            ],
            [
              0.1,
              2.81
            ],
            [
              0.15,
              2.7225
            ],
            [
              0.2,
              2.64
            ],
            [
              0.25,
              2.5625
            ],
            [
              0.3,
              2.49
            ],
            [
              0.35,
              2.4225
            ],
            [
              0.4,
              2.36
            ],
            [
              0.45,
              2.3025
            ],
            [
              0.5,
              2.25
            ],
            [
              0.55,
              2.2025
            ],
            [
              0.6,
              2.16
            ],
            [
              0.65,
              2.1225
            ],
            [
              0.7,
              2.09
            ],
            [
              0.75,
              2.0625
            ],
            [
              0.8,
              2.04
            ],
            [
              0.85,
              2.0225
            ],
            [
              0.9,
              2.01
            ],
            [
              0.95,
              2.0025
            ],
            [
              1,
              2
            ],
            [
              1.05,
              2.0025
            ],
            [
              1.1,
              2.01
            ],
            [
              1.15,
              2.0225
            ],
            [
              1.2,
              2.04
            ],
            [
              1.25,
              2.0625
            ],
            [
              1.3,
              2.09
            ],
            [
              1.35,
              2.1225
            ],
            [
              1.4,
              2.16
            ],
            [
              1.45,
              2.2025
            ],
            [
              1.5,
              2.25
            ],
            [
              1.55,
              2.3025
            ],
            [
              1.6,
              2.36
            ],
            [
              1.65,
              2.4225
            ],
            [
              1.7,
              2.49
            ],
            [
              1.75,
              2.5625
            ],
            [
              1.8,
              2.64
            ],
            [
              1.85,
              2.7225
            ],
            [
              1.9,
              2.81
            ],
            [
              1.95,
              2.9025
            ],
            [
              2,
              3
            ],
            [
              2.05,
              3.1025
            ],
            [
              2.1,
              3.21
            ],
            [
              2.15,
              3.3225
            ],
            [
              2.2,
              3.44
            ],
            [
              2.25,
              3.5625
            ],
            [
              2.3,
              3.69
            ],
            [
              2.35,
              3.8225
            ],
            [
              2.4,
              3.96
            ],
            [
              2.45,
              4.1025
            ],
            [
              2.5,
              4.25
            ],
            [
              2.55,
              4.4025
            ],
            [
              2.6,
              4.56
            ],
            [
              2.65,
              4.7225
            ],
            [
              2.7,
              4.89
            ],
            [
              2.75,
              5.0625
            ],
            [
              2.8,
              5.24
            ],
            [
              2.85,
              5.4225
            ],
            [
              2.9,
              5.61
            ],
            [
              2.95,
              5.8025
            ],
            [
              3,
              6
            ],
            [
              3.05,
              6.2025
            ],
            [
              3.1,
              6.41
            ],
            [
              3.15,
              6.6225
            ],
            [
              3.2,
              6.84
            ],
            [
              3.25,
              7.0625
            ],
            [
              3.3,
              7.29
            ],
            [
              3.35,
              7.5225
            ],
            [
              3.4,
              7.76
            ],
            [
              3.45,
              8.0025
            ],
            [
              3.5,
              8.25
            ],
            [
              3.55,
              8.5025
            ],
            [
              3.6,
              8.76
            ],
            [
              3.65,
              9.0225
            ],
            [
              3.7,
              9.29
            ],
            [
              3.75,
              9.5625
            ],
            [
              3.8,
              9.84
            ],
            [
              3.85,
              10.1225
            ],
            [
              3.9,
              10.41
            ],
            [
              3.95,
              10.7025
            ],
            [
              4,
              11
            ]
          ],
          "smooth": false
        }
      ],
      "markers": [
        {
          "x": 1,
          "y": 2,
          "label": "(1,2)",
          "kind": "closed"
        }
      ]
    },
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T1.F4.TY3.Q032",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The graph shows $f(x)=x^2-2x+2$. For $h(x)=f(2x)$, which is the $x$-coordinate where $h$ has a horizontal tangent?",
    "choices": [
      {
        "label": "A",
        "text": "$\\frac12$"
      },
      {
        "label": "B",
        "text": "$0$"
      },
      {
        "label": "C",
        "text": "$1$"
      },
      {
        "label": "D",
        "text": "$2$"
      }
    ],
    "answer_label": "A",
    "explanation": "$f^{\\prime}(u)=2u-2$, so $h^{\\prime}(x)=2(4x-2)=8x-4=0$ at $x=\\frac12$.\n\nB: Assumes the critical point occurs at the origin.\nC: Uses the critical input of $f$ without scaling the argument.\nD: Doubles the critical input instead of halving it.",
    "representation": "Graph",
    "figure": {
      "kind": "graph",
      "window": {
        "xMin": -2,
        "xMax": 4,
        "yMin": 0,
        "yMax": 9
      },
      "curves": [
        {
          "label": "f",
          "points": [
            [
              -2,
              10
            ],
            [
              -1.95,
              9.7025
            ],
            [
              -1.9,
              9.41
            ],
            [
              -1.85,
              9.1225
            ],
            [
              -1.8,
              8.84
            ],
            [
              -1.75,
              8.5625
            ],
            [
              -1.7,
              8.29
            ],
            [
              -1.65,
              8.0225
            ],
            [
              -1.6,
              7.76
            ],
            [
              -1.55,
              7.5025
            ],
            [
              -1.5,
              7.25
            ],
            [
              -1.45,
              7.0025
            ],
            [
              -1.4,
              6.76
            ],
            [
              -1.35,
              6.5225
            ],
            [
              -1.3,
              6.29
            ],
            [
              -1.25,
              6.0625
            ],
            [
              -1.2,
              5.84
            ],
            [
              -1.15,
              5.6225
            ],
            [
              -1.1,
              5.41
            ],
            [
              -1.05,
              5.2025
            ],
            [
              -1,
              5
            ],
            [
              -0.95,
              4.8025
            ],
            [
              -0.9,
              4.61
            ],
            [
              -0.85,
              4.4225
            ],
            [
              -0.8,
              4.24
            ],
            [
              -0.75,
              4.0625
            ],
            [
              -0.7,
              3.89
            ],
            [
              -0.65,
              3.7225
            ],
            [
              -0.6,
              3.56
            ],
            [
              -0.55,
              3.4025
            ],
            [
              -0.5,
              3.25
            ],
            [
              -0.45,
              3.1025
            ],
            [
              -0.4,
              2.96
            ],
            [
              -0.35,
              2.8225
            ],
            [
              -0.3,
              2.69
            ],
            [
              -0.25,
              2.5625
            ],
            [
              -0.2,
              2.44
            ],
            [
              -0.15,
              2.3225
            ],
            [
              -0.1,
              2.21
            ],
            [
              -0.05,
              2.1025
            ],
            [
              0,
              2
            ],
            [
              0.05,
              1.9025
            ],
            [
              0.1,
              1.81
            ],
            [
              0.15,
              1.7225
            ],
            [
              0.2,
              1.64
            ],
            [
              0.25,
              1.5625
            ],
            [
              0.3,
              1.49
            ],
            [
              0.35,
              1.4225
            ],
            [
              0.4,
              1.36
            ],
            [
              0.45,
              1.3025
            ],
            [
              0.5,
              1.25
            ],
            [
              0.55,
              1.2025
            ],
            [
              0.6,
              1.16
            ],
            [
              0.65,
              1.1225
            ],
            [
              0.7,
              1.09
            ],
            [
              0.75,
              1.0625
            ],
            [
              0.8,
              1.04
            ],
            [
              0.85,
              1.0225
            ],
            [
              0.9,
              1.01
            ],
            [
              0.95,
              1.0025
            ],
            [
              1,
              1
            ],
            [
              1.05,
              1.0025
            ],
            [
              1.1,
              1.01
            ],
            [
              1.15,
              1.0225
            ],
            [
              1.2,
              1.04
            ],
            [
              1.25,
              1.0625
            ],
            [
              1.3,
              1.09
            ],
            [
              1.35,
              1.1225
            ],
            [
              1.4,
              1.16
            ],
            [
              1.45,
              1.2025
            ],
            [
              1.5,
              1.25
            ],
            [
              1.55,
              1.3025
            ],
            [
              1.6,
              1.36
            ],
            [
              1.65,
              1.4225
            ],
            [
              1.7,
              1.49
            ],
            [
              1.75,
              1.5625
            ],
            [
              1.8,
              1.64
            ],
            [
              1.85,
              1.7225
            ],
            [
              1.9,
              1.81
            ],
            [
              1.95,
              1.9025
            ],
            [
              2,
              2
            ],
            [
              2.05,
              2.1025
            ],
            [
              2.1,
              2.21
            ],
            [
              2.15,
              2.3225
            ],
            [
              2.2,
              2.44
            ],
            [
              2.25,
              2.5625
            ],
            [
              2.3,
              2.69
            ],
            [
              2.35,
              2.8225
            ],
            [
              2.4,
              2.96
            ],
            [
              2.45,
              3.1025
            ],
            [
              2.5,
              3.25
            ],
            [
              2.55,
              3.4025
            ],
            [
              2.6,
              3.56
            ],
            [
              2.65,
              3.7225
            ],
            [
              2.7,
              3.89
            ],
            [
              2.75,
              4.0625
            ],
            [
              2.8,
              4.24
            ],
            [
              2.85,
              4.4225
            ],
            [
              2.9,
              4.61
            ],
            [
              2.95,
              4.8025
            ],
            [
              3,
              5
            ],
            [
              3.05,
              5.2025
            ],
            [
              3.1,
              5.41
            ],
            [
              3.15,
              5.6225
            ],
            [
              3.2,
              5.84
            ],
            [
              3.25,
              6.0625
            ],
            [
              3.3,
              6.29
            ],
            [
              3.35,
              6.5225
            ],
            [
              3.4,
              6.76
            ],
            [
              3.45,
              7.0025
            ],
            [
              3.5,
              7.25
            ],
            [
              3.55,
              7.5025
            ],
            [
              3.6,
              7.76
            ],
            [
              3.65,
              8.0225
            ],
            [
              3.7,
              8.29
            ],
            [
              3.75,
              8.5625
            ],
            [
              3.8,
              8.84
            ],
            [
              3.85,
              9.1225
            ],
            [
              3.9,
              9.41
            ],
            [
              3.95,
              9.7025
            ],
            [
              4,
              10
            ]
          ],
          "smooth": false
        }
      ],
      "markers": [
        {
          "x": 1,
          "y": 1,
          "label": "(1,1)",
          "kind": "closed"
        }
      ]
    },
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T1.F5.TY1.Q033",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "A student writes $\\frac{d}{dx}\\sin(x^4)=\\cos(x^4)$. Which explanation identifies the mistake?",
    "choices": [
      {
        "label": "A",
        "text": "The factor $4x^3$ from the inner derivative is missing."
      },
      {
        "label": "B",
        "text": "The derivative of sine should be negative cosine."
      },
      {
        "label": "C",
        "text": "The exponent 4 should become 3 outside the cosine only."
      },
      {
        "label": "D",
        "text": "The function should be differentiated with the product rule."
      }
    ],
    "answer_label": "A",
    "explanation": "The derivative is $4x^3\\cos(x^4)$.\n\nB: The derivative of sine is positive cosine.\nC: The chain rule requires multiplication by the full derivative $4x^3$.\nD: A nested sine is a composition, not a product of two functions.",
    "representation": "Verbal",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T1.F5.TY1.Q034",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "A student differentiates $e^{5x}$ as $5e^{5x-1}$. Which statement best explains the error?",
    "choices": [
      {
        "label": "A",
        "text": "The derivative must have a logarithm factor."
      },
      {
        "label": "B",
        "text": "The derivative of $e^u$ is always zero."
      },
      {
        "label": "C",
        "text": "The inside derivative should be $5x$."
      },
      {
        "label": "D",
        "text": "The power rule was applied to an exponential function instead of using its chain rule."
      }
    ],
    "answer_label": "D",
    "explanation": "$d(e^{5x})/dx=5e^{5x}$, not $5e^{5x-1}$.\n\nA: Logarithmic differentiation is not needed for $e^{5x}$.\nB: The exponential function is not constant.\nC: The derivative of $5x$ is 5.",
    "representation": "Verbal",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T1.F5.TY2.Q035",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "Let $h(x)=|x^2|$. What is $h^{\\prime}(0)$?",
    "choices": [
      {
        "label": "A",
        "text": "$1$"
      },
      {
        "label": "B",
        "text": "$2$"
      },
      {
        "label": "C",
        "text": "$0$"
      },
      {
        "label": "D",
        "text": "Does not exist"
      }
    ],
    "answer_label": "C",
    "explanation": "$|x^2|=x^2$ for all real $x$; therefore $h^{\\prime}(0)=0$.\n\nA: The derivative of $x^2$ at 0 is not 1.\nB: The derivative is $2x$, whose value at 0 is zero.\nD: Because $x^2\\ge0$, $|x^2|=x^2$ is differentiable at 0.",
    "representation": "Verbal",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T1.F5.TY2.Q036",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "Let $h(x)=|\\sin x|$. Which statement is true at $x=0$?",
    "choices": [
      {
        "label": "A",
        "text": "$h^{\\prime}(0)=0$."
      },
      {
        "label": "B",
        "text": "$h$ is not continuous at $0$."
      },
      {
        "label": "C",
        "text": "$h^{\\prime}(0)=1$."
      },
      {
        "label": "D",
        "text": "$h$ is continuous but not differentiable at $0$."
      }
    ],
    "answer_label": "D",
    "explanation": "Near zero, $|\\sin x|$ has left derivative $-1$ and right derivative $1$.\n\nA: Unequal one-sided derivatives mean no derivative exists.\nB: Absolute value and sine are continuous.\nC: The right derivative is 1 but the left derivative is -1.",
    "representation": "Verbal",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T1.F5.TY3.Q037",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "If $f^{\\prime}(2)=0$ and $g(1)=2$, which statement must be true provided $g$ is differentiable at 1?",
    "choices": [
      {
        "label": "A",
        "text": "$g^{\\prime}(1)=0$"
      },
      {
        "label": "B",
        "text": "$(f\\circ g)^{\\prime}(1)=0$"
      },
      {
        "label": "C",
        "text": "$(g\\circ f)^{\\prime}(1)=0$"
      },
      {
        "label": "D",
        "text": "$f(2)=0$"
      }
    ],
    "answer_label": "B",
    "explanation": "$f^{\\prime}(g(1))g^{\\prime}(1)=f^{\\prime}(2)g^{\\prime}(1)=0$.\n\nA: No information forces the derivative of $g$ to vanish.\nC: Requires information about $f(1)$ and other derivatives.\nD: A horizontal tangent does not force a function value to be zero.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T1.F5.TY3.Q038",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "If $f^{\\prime}(g(a))=-3$ and $(f\\circ g)^{\\prime}(a)=12$, what is $g^{\\prime}(a)$?",
    "choices": [
      {
        "label": "A",
        "text": "$4$"
      },
      {
        "label": "B",
        "text": "$-4$"
      },
      {
        "label": "C",
        "text": "$9$"
      },
      {
        "label": "D",
        "text": "$-36$"
      }
    ],
    "answer_label": "B",
    "explanation": "$12=(-3)g^{\\prime}(a)$; divide to get $-4$.\n\nA: Drops the negative sign of the outer derivative.\nC: Subtracts derivative values instead of using their product.\nD: Multiplies rather than divides.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T1.F5.TY4.Q039",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Which derivative calculation necessarily uses both the quotient rule and the chain rule in its natural form?",
    "choices": [
      {
        "label": "A",
        "text": "$\\frac{d}{dx}(x\\sin x)$"
      },
      {
        "label": "B",
        "text": "$\\frac{d}{dx}\\left(\\frac{x}{\\sin(x^2)}\\right)$"
      },
      {
        "label": "C",
        "text": "$\\frac{d}{dx}\\sin(x^2)$"
      },
      {
        "label": "D",
        "text": "$\\frac{d}{dx}(x+\\sin x)$"
      }
    ],
    "answer_label": "B",
    "explanation": "The denominator is a composition and the complete expression is a quotient.\n\nA: Uses the product rule, but neither factor is a nontrivial composition.\nC: Uses the chain rule but not the quotient rule.\nD: Only the sum rule is required.",
    "representation": "Verbal",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T1.F5.TY4.Q040",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "Which is a valid reason NOT to claim $h^{\\prime}(a)=f^{\\prime}(g(a))g^{\\prime}(a)$?",
    "choices": [
      {
        "label": "A",
        "text": "$f$ is decreasing at $g(a)$."
      },
      {
        "label": "B",
        "text": "$g^{\\prime}(a)$ is zero."
      },
      {
        "label": "C",
        "text": "$g$ is not differentiable at $a$ and the hypotheses of the chain rule are not established."
      },
      {
        "label": "D",
        "text": "$f(g(a))$ is negative."
      }
    ],
    "answer_label": "C",
    "explanation": "The usual chain-rule theorem requires $g$ differentiable at $a$ and $f$ differentiable at $g(a)$.\n\nA: The sign of $f^{\\prime}$ does not affect validity of the formula.\nB: A zero inner derivative is permitted and produces zero when both derivatives exist.\nD: A negative function value does not invalidate the rule.",
    "representation": "Verbal",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T1.F5.TY5.Q041",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "Which statement about $h(x)=f(g(x))$ is always true when both required derivatives exist?",
    "choices": [
      {
        "label": "A",
        "text": "$h^{\\prime}(x)=f^{\\prime}(x)g^{\\prime}(x)$."
      },
      {
        "label": "B",
        "text": "The sign of $h^{\\prime}(x)$ is the sign of the product $f^{\\prime}(g(x))g^{\\prime}(x)$."
      },
      {
        "label": "C",
        "text": "$h^{\\prime}(x)$ has the same sign as $g^{\\prime}(x)$ in every case."
      },
      {
        "label": "D",
        "text": "$h$ increases whenever $f$ increases."
      }
    ],
    "answer_label": "B",
    "explanation": "The derivative of a composition is the product of its outer and inner derivatives, evaluated at the appropriate inputs.\n\nA: The outer derivative must be evaluated at $g(x)$.\nC: A negative outer derivative reverses the sign.\nD: A decreasing $g$ reverses the sign of the rate of change.",
    "representation": "Verbal",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T1.F6.TY1.Q042",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Let $h(x)=(ax+1)^4$. If $h^{\\prime}(0)=20$, what is $a$?",
    "choices": [
      {
        "label": "A",
        "text": "$4$"
      },
      {
        "label": "B",
        "text": "$\\frac15$"
      },
      {
        "label": "C",
        "text": "$20$"
      },
      {
        "label": "D",
        "text": "$5$"
      }
    ],
    "answer_label": "D",
    "explanation": "$h^{\\prime}(0)=4a(1)^3=4a=20$, so $a=5$.\n\nA: Mistakes the known derivative for the inner parameter.\nB: Takes a reciprocal when division by 4 is required.\nC: Omits the factor 4 from the outer derivative.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T1.F6.TY1.Q043",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "For $f(x)=\\sin(kx)$, where $k>0$, suppose $f^{\\prime}(0)=7$. Find $k$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\frac17$"
      },
      {
        "label": "B",
        "text": "$14$"
      },
      {
        "label": "C",
        "text": "$0$"
      },
      {
        "label": "D",
        "text": "$7$"
      }
    ],
    "answer_label": "D",
    "explanation": "$f^{\\prime}(x)=k\\cos(kx)$ and $\\cos0=1$.\n\nA: Takes an unnecessary reciprocal.\nB: Inserts an extra factor of 2.\nC: Confuses $f(0)=0$ with $f^{\\prime}(0)$.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T1.F6.TY2.Q044",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The temperature is $T(d)=5+2d^2$ degrees Celsius at depth $d$ meters, and a diver\\textquotesingle s depth is $d(t)=3t$ meters. What is $dT/dt$ at $t=2$ seconds?",
    "choices": [
      {
        "label": "A",
        "text": "$36\\ \\mathrm{^\\circ C/s}$"
      },
      {
        "label": "B",
        "text": "$12\\ \\mathrm{^\\circ C/s}$"
      },
      {
        "label": "C",
        "text": "$24\\ \\mathrm{^\\circ C/s}$"
      },
      {
        "label": "D",
        "text": "$72\\ \\mathrm{^\\circ C/s}$"
      }
    ],
    "answer_label": "D",
    "explanation": "$T^{\\prime}(d)=4d$, $d(2)=6$, $d^{\\prime}=3$, hence $dT/dt=4(6)(3)=72$ degrees Celsius per second.\n\nA: Misses a factor 2 in the temperature derivative.\nB: Uses depth in place of the complete derivative.\nC: Uses $T^{\\prime}(d)=4d$ but omits $d^{\\prime}(t)=3$.",
    "representation": "Context",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T1.F6.TY2.Q045",
    "topic_slug": "chain-rule",
    "ced_topic": "3.1",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "A sensor records $P(v)=v^2+3$ pascals and $v(t)=\\sqrt{t+1}$ meters per second. What is $dP/dt$ at $t=3$?",
    "choices": [
      {
        "label": "A",
        "text": "$\\frac12\\ \\mathrm{Pa/s}$"
      },
      {
        "label": "B",
        "text": "$4\\ \\mathrm{Pa/s}$"
      },
      {
        "label": "C",
        "text": "$2\\ \\mathrm{Pa/s}$"
      },
      {
        "label": "D",
        "text": "$1\\ \\mathrm{Pa/s}$"
      }
    ],
    "answer_label": "D",
    "explanation": "$P(v(t))=t+4$, so the rate is $1\\ \\mathrm{Pa/s}$.\n\nA: Does not multiply by the outer derivative $2v$.\nB: Uses $dP/dv=2v$ but omits the velocity derivative $dv/dt=1/(2\\sqrt{t+1})$.\nC: Omits the inner $1/2$ factor.",
    "representation": "Context",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T2.F1.TY1.Q001",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "If $x^2+y^2=25$, what is $dy/dx$ at a point where $y\\ne0$?",
    "choices": [
      {
        "label": "A",
        "text": "$-\\frac{x}{y}$"
      },
      {
        "label": "B",
        "text": "$\\frac{x}{y}$"
      },
      {
        "label": "C",
        "text": "$-\\frac{x}{2y}$"
      },
      {
        "label": "D",
        "text": "$-\\frac{y}{x}$"
      }
    ],
    "answer_label": "A",
    "explanation": "$2x+2yy^{\\prime}=0$, hence $y^{\\prime}=-x/y$.\n\nB: Drops the negative sign when isolating $y^{\\prime}$.\nC: Misses the factor 2 in $d(x^2)/dx$.\nD: Reverses the numerator and denominator.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T2.F1.TY1.Q002",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "For $3x^2+4y^2=12$, find $dy/dx$.",
    "choices": [
      {
        "label": "A",
        "text": "$-\\frac{4y}{3x}$"
      },
      {
        "label": "B",
        "text": "$\\frac{3x}{4y}$"
      },
      {
        "label": "C",
        "text": "$-\\frac{6x}{4y}$"
      },
      {
        "label": "D",
        "text": "$-\\frac{3x}{4y}$"
      }
    ],
    "answer_label": "D",
    "explanation": "$6x+8yy^{\\prime}=0$, so $y^{\\prime}=-6x/(8y)=-3x/(4y)$.\n\nA: Interchanges the numerator and denominator.\nB: Loses the negative sign.\nC: Omits the 2 from $d(4y^2)/dx=8yy^{\\prime}$.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T2.F1.TY1.Q003",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "If $x^3+y^3=6xy$, which expression is $dy/dx$ wherever the denominator is nonzero?",
    "choices": [
      {
        "label": "A",
        "text": "$\\frac{6y-3x^2}{3y^2-6x}$"
      },
      {
        "label": "B",
        "text": "$\\frac{6y-3x^2}{3y^2}$"
      },
      {
        "label": "C",
        "text": "$\\frac{6y-3x^2}{3y^2+6x}$"
      },
      {
        "label": "D",
        "text": "$\\frac{6x-3y^2}{3x^2-6y}$"
      }
    ],
    "answer_label": "A",
    "explanation": "$3x^2+3y^2y^{\\prime}=6y+6xy^{\\prime}$, so $(3y^2-6x)y^{\\prime}=6y-3x^2$.\n\nB: Omits the $6xy^{\\prime}$ term from differentiating the right-hand side.\nC: Moves the $6xy^{\\prime}$ term with the wrong sign.\nD: Interchanges $x$ and $y$ roles in the derivative.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T2.F1.TY2.Q004",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "For $\\sin x+\\sin y=1$, find $dy/dx$ where $\\cos y\\ne0$.",
    "choices": [
      {
        "label": "A",
        "text": "$-\\frac{\\cos y}{\\cos x}$"
      },
      {
        "label": "B",
        "text": "$-\\frac{\\sin x}{\\sin y}$"
      },
      {
        "label": "C",
        "text": "$\\frac{\\cos x}{\\cos y}$"
      },
      {
        "label": "D",
        "text": "$-\\frac{\\cos x}{\\cos y}$"
      }
    ],
    "answer_label": "D",
    "explanation": "$\\cos x+\\cos y\\,y^{\\prime}=0$.\n\nA: Reverses the ratio.\nB: Differentiates sine incorrectly.\nC: Loses the negative sign.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T2.F1.TY2.Q005",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "If $\\cos(x+y)=x$, what is $dy/dx$ where $\\sin(x+y)\\ne0$?",
    "choices": [
      {
        "label": "A",
        "text": "$-\\frac{1}{\\sin(x+y)}$"
      },
      {
        "label": "B",
        "text": "$1-\\frac{1}{\\sin(x+y)}$"
      },
      {
        "label": "C",
        "text": "$\\frac{1}{\\sin(x+y)}-1$"
      },
      {
        "label": "D",
        "text": "$-1-\\frac{1}{\\sin(x+y)}$"
      }
    ],
    "answer_label": "D",
    "explanation": "$-\\sin(x+y)(1+y^{\\prime})=1$, hence $y^{\\prime}=-1-1/\\sin(x+y)$.\n\nA: Omits the derivative of the explicit $x$ within $x+y$.\nB: Rearranges the $1+y^{\\prime}$ factor incorrectly.\nC: Loses the sign from differentiating cosine.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T2.F1.TY3.Q006",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "If $xy=10$, find $dy/dx$.",
    "choices": [
      {
        "label": "A",
        "text": "$-\\frac{1}{x}$"
      },
      {
        "label": "B",
        "text": "$-\\frac{x}{y}$"
      },
      {
        "label": "C",
        "text": "$-\\frac{y}{x}$"
      },
      {
        "label": "D",
        "text": "$\\frac{y}{x}$"
      }
    ],
    "answer_label": "C",
    "explanation": "$xy^{\\prime}+y=0$, so $y^{\\prime}=-y/x$.\n\nA: Drops the factor $y$ from differentiating $xy$.\nB: Interchanges the product-rule terms.\nD: Omits the negative sign.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T2.F1.TY3.Q007",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "If $x^2y+xy^2=6$, find $dy/dx$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\frac{2xy+y^2}{x^2+2xy}$"
      },
      {
        "label": "B",
        "text": "$-\\frac{2xy+y^2}{x^2}$"
      },
      {
        "label": "C",
        "text": "$-\\frac{2xy}{x^2+2xy}$"
      },
      {
        "label": "D",
        "text": "$-\\frac{2xy+y^2}{x^2+2xy}$"
      }
    ],
    "answer_label": "D",
    "explanation": "Differentiate both products: $2xy+x^2y^{\\prime}+y^2+2xyy^{\\prime}=0$.\n\nA: Loses the negative sign when solving.\nB: Omits the $2xyy^{\\prime}$ term.\nC: Omits the $y^2$ term from differentiating $xy^2$.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T2.F1.TY4.Q008",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The relation $y^2=x^2+1$ defines positive and negative branches. What is $dy/dx$ on either branch where $y\\ne0$?",
    "choices": [
      {
        "label": "A",
        "text": "$\\frac{2x}{y}$"
      },
      {
        "label": "B",
        "text": "$\\frac{y}{x}$"
      },
      {
        "label": "C",
        "text": "$\\frac{x}{|y|}$"
      },
      {
        "label": "D",
        "text": "$\\frac{x}{y}$"
      }
    ],
    "answer_label": "D",
    "explanation": "$2yy^{\\prime}=2x$ gives $y^{\\prime}=x/y$, which works on both differentiable branches.\n\nA: Omits the factor 2 from differentiating $y^2$.\nB: Inverts the derivative.\nC: Ignores the negative branch, for which the derivative has opposite sign.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T2.F1.TY4.Q009",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "If $y^3=8x$, find the value of $dy/dx$ at $(1,2)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\frac43$"
      },
      {
        "label": "B",
        "text": "$\\frac13$"
      },
      {
        "label": "C",
        "text": "$\\frac83$"
      },
      {
        "label": "D",
        "text": "$\\frac23$"
      }
    ],
    "answer_label": "D",
    "explanation": "$3y^2y^{\\prime}=8$; at $y=2$, $y^{\\prime}=8/12=2/3$.\n\nA: Uses $3y$ instead of $3y^2$.\nB: Differentiates the right-hand side as 4 instead of 8.\nC: Forgets to evaluate $y^2=4$.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T2.F2.TY1.Q010",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "For $\\ln(xy)=x$ with $x,y>0$, which procedure gives the correct $dy/dx$?",
    "choices": [
      {
        "label": "A",
        "text": "Differentiate $xy$ as $xy'$ only, giving $y'=y$"
      },
      {
        "label": "B",
        "text": "Expand $\\ln(xy)=\\ln x+\\ln y$, then differentiate implicitly: $y'=y(1-1/x)$"
      },
      {
        "label": "C",
        "text": "Differentiate $\\ln y$ as $1/y$, giving $1/x+1/y=1$"
      },
      {
        "label": "D",
        "text": "Treat $y$ as constant, giving $y'=0$"
      }
    ],
    "answer_label": "B",
    "explanation": "The logarithm identity is valid for positive x and y; implicit differentiation gives $1/x+y'/y=1$. A omits the derivative of x, C omits the chain factor, and D treats y as constant.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T2.F2.TY1.Q011",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "If $\\ln(x+y)=xy$, find $dy/dx$ wherever the needed denominators are nonzero.",
    "choices": [
      {
        "label": "A",
        "text": "$\\frac{y(x+y)+1}{1-x(x+y)}$"
      },
      {
        "label": "B",
        "text": "$\\frac{y(x+y)-1}{1-x(x+y)}$"
      },
      {
        "label": "C",
        "text": "$\\frac{y(x+y)-1}{1+x(x+y)}$"
      },
      {
        "label": "D",
        "text": "$\\frac{y-1}{1-x}$"
      }
    ],
    "answer_label": "B",
    "explanation": "$(1+y^{\\prime})/(x+y)=y+xy^{\\prime}$, so $y^{\\prime}[1-x(x+y)]=y(x+y)-1$.\n\nA: Moves the constant derivative with the wrong sign.\nC: Moves the $xy^{\\prime}$ term with the wrong sign.\nD: Fails to multiply through by $x+y$.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T2.F2.TY1.Q012",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "For $\\ln y=x^2+y$ with $y>0$, what is $dy/dx$?",
    "choices": [
      {
        "label": "A",
        "text": "$\\frac{2x}{y-1}$"
      },
      {
        "label": "B",
        "text": "$\\frac{2x}{y}$"
      },
      {
        "label": "C",
        "text": "$\\frac{2xy}{1+y}$"
      },
      {
        "label": "D",
        "text": "$\\frac{2xy}{1-y}$"
      }
    ],
    "answer_label": "D",
    "explanation": "$y^{\\prime}/y=2x+y^{\\prime}$, giving $y^{\\prime}(1/y-1)=2x$.\n\nA: Confuses the reciprocal factor $1/y$ when solving.\nB: Omits the implicit $y^{\\prime}$ on the right-hand side.\nC: Uses the wrong sign for the $y^{\\prime}$ term on the right.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T2.F2.TY2.Q013",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "If $e^y+x=4$, express $dy/dx$ using $y$.",
    "choices": [
      {
        "label": "A",
        "text": "$-1$"
      },
      {
        "label": "B",
        "text": "$-e^{-y}$"
      },
      {
        "label": "C",
        "text": "$-e^y$"
      },
      {
        "label": "D",
        "text": "$e^{-y}$"
      }
    ],
    "answer_label": "B",
    "explanation": "$e^yy^{\\prime}+1=0$ so $y^{\\prime}=-1/e^y$.\n\nA: Treats $e^y$ as if its derivative were $y^{\\prime}$.\nC: Fails to divide by $e^y$.\nD: Drops the negative sign.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T2.F2.TY2.Q014",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "If $e^{xy}=x+y$, which equation correctly results from differentiating both sides?",
    "choices": [
      {
        "label": "A",
        "text": "$e^{xy}(y+xy^{\\prime})=1+y^{\\prime}$"
      },
      {
        "label": "B",
        "text": "$e^{xy}=1+y^{\\prime}$"
      },
      {
        "label": "C",
        "text": "$e^{xy}(y+x)=1+y^{\\prime}$"
      },
      {
        "label": "D",
        "text": "$e^{xy}(1+y^{\\prime})=1+y^{\\prime}$"
      }
    ],
    "answer_label": "A",
    "explanation": "Apply the chain rule to $e^{xy}$ and the product rule to $xy$.\n\nB: Omits the derivative of the exponent $xy$.\nC: Replaces $xy^{\\prime}$ with $x$.\nD: Differentiates the inner product $xy$ incorrectly.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T2.F2.TY2.Q015",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "Given $e^{x+y}=xy$, find $dy/dx$ in terms of $x,y$ where possible.",
    "choices": [
      {
        "label": "A",
        "text": "$\\frac{y-e^{x+y}}{e^{x+y}+x}$"
      },
      {
        "label": "B",
        "text": "$\\frac{y-e^{x+y}}{e^{x+y}}$"
      },
      {
        "label": "C",
        "text": "$\\frac{x-e^{x+y}}{e^{x+y}-y}$"
      },
      {
        "label": "D",
        "text": "$\\frac{y-e^{x+y}}{e^{x+y}-x}$"
      }
    ],
    "answer_label": "D",
    "explanation": "$e^{x+y}(1+y^{\\prime})=y+xy^{\\prime}$; isolate $y^{\\prime}$.\n\nA: Moves the $xy^{\\prime}$ term with the wrong sign.\nB: Omits the $xy^{\\prime}$ term on the right.\nC: Interchanges the product-rule coefficients.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T2.F2.TY3.Q016",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "For $x^2+(\\sin y)^2=2$, find $dy/dx$ where $\\sin y\\cos y\\ne0$.",
    "choices": [
      {
        "label": "A",
        "text": "$-\\frac{x}{\\sin y\\cos y}$"
      },
      {
        "label": "B",
        "text": "$\\frac{x}{\\sin y\\cos y}$"
      },
      {
        "label": "C",
        "text": "$-\\frac{x}{\\cos y}$"
      },
      {
        "label": "D",
        "text": "$-\\frac{2x}{\\sin y\\cos y}$"
      }
    ],
    "answer_label": "A",
    "explanation": "$2x+2\\sin y\\cos y\\,y^{\\prime}=0$.\n\nB: Loses the negative sign.\nC: Omits the outer derivative of $(\\sin y)^2$.\nD: Forgets to cancel a factor 2.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T2.F2.TY3.Q017",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "If $(x+y)^3=8x$, what is $dy/dx$?",
    "choices": [
      {
        "label": "A",
        "text": "$\\frac{8}{3(x+y)^2}-1$"
      },
      {
        "label": "B",
        "text": "$\\frac{8}{(x+y)^2}-1$"
      },
      {
        "label": "C",
        "text": "$\\frac{8}{3(x+y)^2}+1$"
      },
      {
        "label": "D",
        "text": "$\\frac{8}{3(x+y)^2}$"
      }
    ],
    "answer_label": "A",
    "explanation": "$3(x+y)^2(1+y^{\\prime})=8$, giving the answer.\n\nB: Omits the factor 3 from the power rule.\nC: Uses the wrong sign when moving the constant 1.\nD: Omits the $-1$ after solving for $y^{\\prime}$.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T2.F2.TY3.Q018",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "If $\\sqrt{x+y}=xy$, which equation is the correct differentiated relation?",
    "choices": [
      {
        "label": "A",
        "text": "$\\frac{1}{2\\sqrt{x+y}}=y+xy^{\\prime}$"
      },
      {
        "label": "B",
        "text": "$\\frac{1+y^{\\prime}}{2\\sqrt{x+y}}=xy^{\\prime}$"
      },
      {
        "label": "C",
        "text": "$\\frac{1+y^{\\prime}}{\\sqrt{x+y}}=y+xy^{\\prime}$"
      },
      {
        "label": "D",
        "text": "$\\frac{1+y^{\\prime}}{2\\sqrt{x+y}}=y+xy^{\\prime}$"
      }
    ],
    "answer_label": "D",
    "explanation": "Apply the chain rule to the square root and the product rule to $xy$.\n\nA: Omits $y^{\\prime}$ from differentiating $x+y$.\nB: Omits the $y$ term from the product rule.\nC: Omits the factor 2 from the square-root derivative.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T2.F3.TY1.Q019",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "easy",
    "calculator": true,
    "prompt": "On the upper semicircle $x^2+y^2=25$, use a calculator to approximate $dy/dx$ when $x=2.7$ to three decimal places.",
    "choices": [
      {
        "label": "A",
        "text": "$-0.642$"
      },
      {
        "label": "B",
        "text": "$-1.559$"
      },
      {
        "label": "C",
        "text": "$-0.540$"
      },
      {
        "label": "D",
        "text": "$0.642$"
      }
    ],
    "answer_label": "A",
    "explanation": "$y=\\sqrt{25-2.7^2}$, and $y^{^{\\prime}}=-x/y=-2.7/\\sqrt{25-2.7^2}\\approx-0.642$.\n\nB: Uses the reciprocal of the tangent slope.\nC: Divides $-2.7$ by the circle radius 5 rather than the y-coordinate.\nD: Omits the negative sign from the derivative.",
    "representation": "Context",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T2.F3.TY1.Q020",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "On $xy=12$, find the slope of the tangent at $(3,4)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\frac43$"
      },
      {
        "label": "B",
        "text": "$-\\frac34$"
      },
      {
        "label": "C",
        "text": "$-\\frac43$"
      },
      {
        "label": "D",
        "text": "$-\\frac1{12}$"
      }
    ],
    "answer_label": "C",
    "explanation": "$y+xy^{\\prime}=0$, so $y^{\\prime}=-4/3$.\n\nA: Omits the negative sign.\nB: Uses $-x/y$ rather than $-y/x$.\nD: Differentiates the constant incorrectly or divides by the product.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T2.F3.TY1.Q021",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "For $x^2+xy+y^2=7$, what is $dy/dx$ at $(1,2)$?",
    "choices": [
      {
        "label": "A",
        "text": "$-\\frac23$"
      },
      {
        "label": "B",
        "text": "$-\\frac54$"
      },
      {
        "label": "C",
        "text": "$\\frac45$"
      },
      {
        "label": "D",
        "text": "$-\\frac45$"
      }
    ],
    "answer_label": "D",
    "explanation": "$y^{\\prime}=-(2x+y)/(x+2y)$; at $(1,2)$ this is $-4/5$.\n\nA: Omits the $y$ contribution in the numerator.\nB: Interchanges numerator and denominator.\nC: Omits the minus sign.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T2.F3.TY2.Q022",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "Find the tangent line at $(3,4)$ on $x^2+y^2=25$.",
    "choices": [
      {
        "label": "A",
        "text": "$y-4=-\\frac34(x-3)$"
      },
      {
        "label": "B",
        "text": "$y-4=\\frac43(x-3)$"
      },
      {
        "label": "C",
        "text": "$y-3=-\\frac34(x-4)$"
      },
      {
        "label": "D",
        "text": "$y-4=\\frac34(x-3)$"
      }
    ],
    "answer_label": "A",
    "explanation": "The slope is $-3/4$. Apply point-slope form through $(3,4)$.\n\nB: Uses the negative reciprocal, which is the normal slope.\nC: Swaps the point coordinates.\nD: Uses the wrong sign for the tangent slope.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T2.F3.TY2.Q023",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "For $x^2+xy=6$ at $(2,1)$, which is the tangent line?",
    "choices": [
      {
        "label": "A",
        "text": "$y-1=-\\frac52(x-2)$"
      },
      {
        "label": "B",
        "text": "$y-1=-\\frac25(x-2)$"
      },
      {
        "label": "C",
        "text": "$y-2=-\\frac52(x-1)$"
      },
      {
        "label": "D",
        "text": "$y-1=\\frac52(x-2)$"
      }
    ],
    "answer_label": "A",
    "explanation": "$2x+y+xy^{\\prime}=0$, so at $(2,1)$ the slope is $-(4+1)/2=-5/2$.\n\nB: Uses the negative reciprocal (normal) slope.\nC: Swaps point coordinates.\nD: Drops the negative sign.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T2.F3.TY2.Q024",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "The curve $x^2-y^2=3$ passes through $(2,1)$. What is its tangent line there?",
    "choices": [
      {
        "label": "A",
        "text": "$y-2=2(x-1)$"
      },
      {
        "label": "B",
        "text": "$y-1=2(x-2)$"
      },
      {
        "label": "C",
        "text": "$y-1=\\frac12(x-2)$"
      },
      {
        "label": "D",
        "text": "$y-1=-2(x-2)$"
      }
    ],
    "answer_label": "B",
    "explanation": "$2x-2yy^{\\prime}=0$, so the slope is $x/y=2$.\n\nA: Swaps the coordinates of the specified point.\nC: Inverts the tangent slope.\nD: Loses the sign produced when differentiating $-y^2$.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T2.F3.TY3.Q025",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "On the circle $x^2+y^2=9$, where are tangent lines vertical?",
    "choices": [
      {
        "label": "A",
        "text": "$(3,0)$ and $(-3,0)$"
      },
      {
        "label": "B",
        "text": "Nowhere on the circle"
      },
      {
        "label": "C",
        "text": "Only $(3,0)$"
      },
      {
        "label": "D",
        "text": "$(0,3)$ and $(0,-3)$"
      }
    ],
    "answer_label": "A",
    "explanation": "For a vertical tangent, $y=0$ and $x\\ne0$; the circle gives $x=\\pm3$.\n\nB: At $y=0$, the tangent slope formula $-x/y$ has a zero denominator.\nC: Omits the symmetric point on the circle.\nD: These points have horizontal rather than vertical tangents.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T2.F3.TY3.Q026",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "For a smooth curve $F(x,y)=0$ with local formula $y^{\\prime}=-F_x/F_y$, a point has $F_y=0$ and $F_x\\ne0$. What is expected at that point?",
    "choices": [
      {
        "label": "A",
        "text": "The slope is zero"
      },
      {
        "label": "B",
        "text": "The curve has no tangent of any kind"
      },
      {
        "label": "C",
        "text": "A horizontal tangent"
      },
      {
        "label": "D",
        "text": "A vertical tangent (if the curve is regular there)."
      }
    ],
    "answer_label": "D",
    "explanation": "The tangent vector is perpendicular to $(F_x,F_y)$. A nonzero $F_x$ and zero $F_y$ imply a vertical tangent.\n\nA: A zero denominator does not give zero slope.\nB: A vertical tangent can exist even though $dy/dx$ is not finite.\nC: That normally requires $F_x=0$ with $F_y\ne0$.",
    "representation": "Verbal",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T2.F4.TY1.Q027",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The plotted circle is $x^2+y^2=25$, with $P=(3,4)$ in the first quadrant. Which slope matches the tangent at $P$?",
    "choices": [
      {
        "label": "A",
        "text": "$\\frac43$"
      },
      {
        "label": "B",
        "text": "$\\frac34$"
      },
      {
        "label": "C",
        "text": "$-\\frac34$"
      },
      {
        "label": "D",
        "text": "$-\\frac43$"
      }
    ],
    "answer_label": "C",
    "explanation": "Radius $OP$ has slope $4/3$; the tangent is perpendicular and has slope $-3/4$.\n\nA: Uses the normal slope.\nB: Loses the negative sign.\nD: Interchanges the coordinates.",
    "representation": "Graph",
    "figure": {
      "kind": "graph",
      "window": {
        "xMin": -6,
        "xMax": 6,
        "yMin": -6,
        "yMax": 6
      },
      "curves": [
        {
          "label": "circle",
          "points": [
            [
              5,
              0
            ],
            [
              4.993148,
              0.26168
            ],
            [
              4.972609,
              0.522642
            ],
            [
              4.938442,
              0.782172
            ],
            [
              4.890738,
              1.039558
            ],
            [
              4.829629,
              1.294095
            ],
            [
              4.755283,
              1.545085
            ],
            [
              4.667902,
              1.79184
            ],
            [
              4.567727,
              2.033683
            ],
            [
              4.455033,
              2.269952
            ],
            [
              4.330127,
              2.5
            ],
            [
              4.193353,
              2.723195
            ],
            [
              4.045085,
              2.938926
            ],
            [
              3.88573,
              3.146602
            ],
            [
              3.715724,
              3.345653
            ],
            [
              3.535534,
              3.535534
            ],
            [
              3.345653,
              3.715724
            ],
            [
              3.146602,
              3.88573
            ],
            [
              2.938926,
              4.045085
            ],
            [
              2.723195,
              4.193353
            ],
            [
              2.5,
              4.330127
            ],
            [
              2.269952,
              4.455033
            ],
            [
              2.033683,
              4.567727
            ],
            [
              1.79184,
              4.667902
            ],
            [
              1.545085,
              4.755283
            ],
            [
              1.294095,
              4.829629
            ],
            [
              1.039558,
              4.890738
            ],
            [
              0.782172,
              4.938442
            ],
            [
              0.522642,
              4.972609
            ],
            [
              0.26168,
              4.993148
            ],
            [
              0,
              5
            ],
            [
              -0.26168,
              4.993148
            ],
            [
              -0.522642,
              4.972609
            ],
            [
              -0.782172,
              4.938442
            ],
            [
              -1.039558,
              4.890738
            ],
            [
              -1.294095,
              4.829629
            ],
            [
              -1.545085,
              4.755283
            ],
            [
              -1.79184,
              4.667902
            ],
            [
              -2.033683,
              4.567727
            ],
            [
              -2.269952,
              4.455033
            ],
            [
              -2.5,
              4.330127
            ],
            [
              -2.723195,
              4.193353
            ],
            [
              -2.938926,
              4.045085
            ],
            [
              -3.146602,
              3.88573
            ],
            [
              -3.345653,
              3.715724
            ],
            [
              -3.535534,
              3.535534
            ],
            [
              -3.715724,
              3.345653
            ],
            [
              -3.88573,
              3.146602
            ],
            [
              -4.045085,
              2.938926
            ],
            [
              -4.193353,
              2.723195
            ],
            [
              -4.330127,
              2.5
            ],
            [
              -4.455033,
              2.269952
            ],
            [
              -4.567727,
              2.033683
            ],
            [
              -4.667902,
              1.79184
            ],
            [
              -4.755283,
              1.545085
            ],
            [
              -4.829629,
              1.294095
            ],
            [
              -4.890738,
              1.039558
            ],
            [
              -4.938442,
              0.782172
            ],
            [
              -4.972609,
              0.522642
            ],
            [
              -4.993148,
              0.26168
            ],
            [
              -5,
              0
            ],
            [
              -4.993148,
              -0.26168
            ],
            [
              -4.972609,
              -0.522642
            ],
            [
              -4.938442,
              -0.782172
            ],
            [
              -4.890738,
              -1.039558
            ],
            [
              -4.829629,
              -1.294095
            ],
            [
              -4.755283,
              -1.545085
            ],
            [
              -4.667902,
              -1.79184
            ],
            [
              -4.567727,
              -2.033683
            ],
            [
              -4.455033,
              -2.269952
            ],
            [
              -4.330127,
              -2.5
            ],
            [
              -4.193353,
              -2.723195
            ],
            [
              -4.045085,
              -2.938926
            ],
            [
              -3.88573,
              -3.146602
            ],
            [
              -3.715724,
              -3.345653
            ],
            [
              -3.535534,
              -3.535534
            ],
            [
              -3.345653,
              -3.715724
            ],
            [
              -3.146602,
              -3.88573
            ],
            [
              -2.938926,
              -4.045085
            ],
            [
              -2.723195,
              -4.193353
            ],
            [
              -2.5,
              -4.330127
            ],
            [
              -2.269952,
              -4.455033
            ],
            [
              -2.033683,
              -4.567727
            ],
            [
              -1.79184,
              -4.667902
            ],
            [
              -1.545085,
              -4.755283
            ],
            [
              -1.294095,
              -4.829629
            ],
            [
              -1.039558,
              -4.890738
            ],
            [
              -0.782172,
              -4.938442
            ],
            [
              -0.522642,
              -4.972609
            ],
            [
              -0.26168,
              -4.993148
            ],
            [
              0,
              -5
            ],
            [
              0.26168,
              -4.993148
            ],
            [
              0.522642,
              -4.972609
            ],
            [
              0.782172,
              -4.938442
            ],
            [
              1.039558,
              -4.890738
            ],
            [
              1.294095,
              -4.829629
            ],
            [
              1.545085,
              -4.755283
            ],
            [
              1.79184,
              -4.667902
            ],
            [
              2.033683,
              -4.567727
            ],
            [
              2.269952,
              -4.455033
            ],
            [
              2.5,
              -4.330127
            ],
            [
              2.723195,
              -4.193353
            ],
            [
              2.938926,
              -4.045085
            ],
            [
              3.146602,
              -3.88573
            ],
            [
              3.345653,
              -3.715724
            ],
            [
              3.535534,
              -3.535534
            ],
            [
              3.715724,
              -3.345653
            ],
            [
              3.88573,
              -3.146602
            ],
            [
              4.045085,
              -2.938926
            ],
            [
              4.193353,
              -2.723195
            ],
            [
              4.330127,
              -2.5
            ],
            [
              4.455033,
              -2.269952
            ],
            [
              4.567727,
              -2.033683
            ],
            [
              4.667902,
              -1.79184
            ],
            [
              4.755283,
              -1.545085
            ],
            [
              4.829629,
              -1.294095
            ],
            [
              4.890738,
              -1.039558
            ],
            [
              4.938442,
              -0.782172
            ],
            [
              4.972609,
              -0.522642
            ],
            [
              4.993148,
              -0.26168
            ],
            [
              5,
              0
            ]
          ],
          "smooth": false
        }
      ],
      "markers": [
        {
          "x": 3,
          "y": 4,
          "label": "P",
          "kind": "closed"
        }
      ]
    },
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T2.F4.TY1.Q028",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The graph depicts the ellipse $4x^2+y^2=16$. At $(1,2\\sqrt3)$, which derivative is correct?",
    "choices": [
      {
        "label": "A",
        "text": "$-\\frac{\\sqrt3}{2}$"
      },
      {
        "label": "B",
        "text": "$\\frac2{\\sqrt3}$"
      },
      {
        "label": "C",
        "text": "$-\\frac1{\\sqrt3}$"
      },
      {
        "label": "D",
        "text": "$-\\frac{2}{\\sqrt3}$"
      }
    ],
    "answer_label": "D",
    "explanation": "$8x+2yy^{\\prime}=0\\Rightarrow y^{\\prime}=-4x/y=-2/\\sqrt3$ at the given point.\n\nA: Inverts the derivative ratio.\nB: Omits the negative sign.\nC: Omits a factor 2 from differentiating $4x^2$.",
    "representation": "Graph",
    "figure": {
      "kind": "graph",
      "window": {
        "xMin": -3,
        "xMax": 3,
        "yMin": -5,
        "yMax": 5
      },
      "curves": [
        {
          "label": "ellipse",
          "points": [
            [
              2,
              0
            ],
            [
              1.997259,
              0.209344
            ],
            [
              1.989044,
              0.418114
            ],
            [
              1.975377,
              0.625738
            ],
            [
              1.956295,
              0.831647
            ],
            [
              1.931852,
              1.035276
            ],
            [
              1.902113,
              1.236068
            ],
            [
              1.867161,
              1.433472
            ],
            [
              1.827091,
              1.626947
            ],
            [
              1.782013,
              1.815962
            ],
            [
              1.732051,
              2
            ],
            [
              1.677341,
              2.178556
            ],
            [
              1.618034,
              2.351141
            ],
            [
              1.554292,
              2.517282
            ],
            [
              1.48629,
              2.676522
            ],
            [
              1.414214,
              2.828427
            ],
            [
              1.338261,
              2.972579
            ],
            [
              1.258641,
              3.108584
            ],
            [
              1.175571,
              3.236068
            ],
            [
              1.089278,
              3.354682
            ],
            [
              1,
              3.464102
            ],
            [
              0.907981,
              3.564026
            ],
            [
              0.813473,
              3.654182
            ],
            [
              0.716736,
              3.734322
            ],
            [
              0.618034,
              3.804226
            ],
            [
              0.517638,
              3.863703
            ],
            [
              0.415823,
              3.91259
            ],
            [
              0.312869,
              3.950753
            ],
            [
              0.209057,
              3.978088
            ],
            [
              0.104672,
              3.994518
            ],
            [
              0,
              4
            ],
            [
              -0.104672,
              3.994518
            ],
            [
              -0.209057,
              3.978088
            ],
            [
              -0.312869,
              3.950753
            ],
            [
              -0.415823,
              3.91259
            ],
            [
              -0.517638,
              3.863703
            ],
            [
              -0.618034,
              3.804226
            ],
            [
              -0.716736,
              3.734322
            ],
            [
              -0.813473,
              3.654182
            ],
            [
              -0.907981,
              3.564026
            ],
            [
              -1,
              3.464102
            ],
            [
              -1.089278,
              3.354682
            ],
            [
              -1.175571,
              3.236068
            ],
            [
              -1.258641,
              3.108584
            ],
            [
              -1.338261,
              2.972579
            ],
            [
              -1.414214,
              2.828427
            ],
            [
              -1.48629,
              2.676522
            ],
            [
              -1.554292,
              2.517282
            ],
            [
              -1.618034,
              2.351141
            ],
            [
              -1.677341,
              2.178556
            ],
            [
              -1.732051,
              2
            ],
            [
              -1.782013,
              1.815962
            ],
            [
              -1.827091,
              1.626947
            ],
            [
              -1.867161,
              1.433472
            ],
            [
              -1.902113,
              1.236068
            ],
            [
              -1.931852,
              1.035276
            ],
            [
              -1.956295,
              0.831647
            ],
            [
              -1.975377,
              0.625738
            ],
            [
              -1.989044,
              0.418114
            ],
            [
              -1.997259,
              0.209344
            ],
            [
              -2,
              0
            ],
            [
              -1.997259,
              -0.209344
            ],
            [
              -1.989044,
              -0.418114
            ],
            [
              -1.975377,
              -0.625738
            ],
            [
              -1.956295,
              -0.831647
            ],
            [
              -1.931852,
              -1.035276
            ],
            [
              -1.902113,
              -1.236068
            ],
            [
              -1.867161,
              -1.433472
            ],
            [
              -1.827091,
              -1.626947
            ],
            [
              -1.782013,
              -1.815962
            ],
            [
              -1.732051,
              -2
            ],
            [
              -1.677341,
              -2.178556
            ],
            [
              -1.618034,
              -2.351141
            ],
            [
              -1.554292,
              -2.517282
            ],
            [
              -1.48629,
              -2.676522
            ],
            [
              -1.414214,
              -2.828427
            ],
            [
              -1.338261,
              -2.972579
            ],
            [
              -1.258641,
              -3.108584
            ],
            [
              -1.175571,
              -3.236068
            ],
            [
              -1.089278,
              -3.354682
            ],
            [
              -1,
              -3.464102
            ],
            [
              -0.907981,
              -3.564026
            ],
            [
              -0.813473,
              -3.654182
            ],
            [
              -0.716736,
              -3.734322
            ],
            [
              -0.618034,
              -3.804226
            ],
            [
              -0.517638,
              -3.863703
            ],
            [
              -0.415823,
              -3.91259
            ],
            [
              -0.312869,
              -3.950753
            ],
            [
              -0.209057,
              -3.978088
            ],
            [
              -0.104672,
              -3.994518
            ],
            [
              0,
              -4
            ],
            [
              0.104672,
              -3.994518
            ],
            [
              0.209057,
              -3.978088
            ],
            [
              0.312869,
              -3.950753
            ],
            [
              0.415823,
              -3.91259
            ],
            [
              0.517638,
              -3.863703
            ],
            [
              0.618034,
              -3.804226
            ],
            [
              0.716736,
              -3.734322
            ],
            [
              0.813473,
              -3.654182
            ],
            [
              0.907981,
              -3.564026
            ],
            [
              1,
              -3.464102
            ],
            [
              1.089278,
              -3.354682
            ],
            [
              1.175571,
              -3.236068
            ],
            [
              1.258641,
              -3.108584
            ],
            [
              1.338261,
              -2.972579
            ],
            [
              1.414214,
              -2.828427
            ],
            [
              1.48629,
              -2.676522
            ],
            [
              1.554292,
              -2.517282
            ],
            [
              1.618034,
              -2.351141
            ],
            [
              1.677341,
              -2.178556
            ],
            [
              1.732051,
              -2
            ],
            [
              1.782013,
              -1.815962
            ],
            [
              1.827091,
              -1.626947
            ],
            [
              1.867161,
              -1.433472
            ],
            [
              1.902113,
              -1.236068
            ],
            [
              1.931852,
              -1.035276
            ],
            [
              1.956295,
              -0.831647
            ],
            [
              1.975377,
              -0.625738
            ],
            [
              1.989044,
              -0.418114
            ],
            [
              1.997259,
              -0.209344
            ],
            [
              2,
              0
            ]
          ],
          "smooth": false
        }
      ],
      "markers": [
        {
          "x": 1,
          "y": 3.464101615,
          "label": "P",
          "kind": "closed"
        }
      ]
    },
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T2.F4.TY2.Q029",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The table specifies a point on $F(x,y)=x^2+xy+y^2-7=0$:  Find $dy/dx$ at $P$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\frac45$"
      },
      {
        "label": "B",
        "text": "$-\\frac25$"
      },
      {
        "label": "C",
        "text": "$-\\frac45$"
      },
      {
        "label": "D",
        "text": "$-\\frac54$"
      }
    ],
    "answer_label": "C",
    "explanation": "$2x+y+(x+2y)y^{\\prime}=0$; evaluate $-(2+2)/(1+4)=-4/5$.\n\nA: Drops the negative sign.\nB: Omits the $y$ term in the numerator.\nD: Uses the negative reciprocal instead of the derivative.",
    "representation": "Tabular",
    "figure": {
      "kind": "table",
      "headers": [
        "$\\text{point}$",
        "$x$",
        "$y$"
      ],
      "rows": [
        [
          "$P$",
          "$1$",
          "$2$"
        ]
      ]
    },
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T2.F4.TY2.Q030",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "The table gives a point on $x^3+y^3=6xy$:  What is the tangent slope at $P$?",
    "choices": [
      {
        "label": "A",
        "text": "$0$"
      },
      {
        "label": "B",
        "text": "$1$"
      },
      {
        "label": "C",
        "text": "$-1$"
      },
      {
        "label": "D",
        "text": "Undefined because the derivative denominator vanishes"
      }
    ],
    "answer_label": "C",
    "explanation": "$y^{\\prime}=(6y-3x^2)/(3y^2-6x)$, so at $(3,3)$ the value is $(18-27)/(27-18)=-1$.\n\nA: The differentiated numerator is -9, not zero.\nB: Misses the negative sign in -9/9.\nD: The denominator equals 9, not zero.",
    "representation": "Tabular",
    "figure": {
      "kind": "table",
      "headers": [
        "$\\text{point}$",
        "$x$",
        "$y$"
      ],
      "rows": [
        [
          "$P$",
          "$3$",
          "$3$"
        ]
      ]
    },
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T2.F4.TY3.Q031",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "The plot shows the circle $x^2+y^2=16$. At its top point $(0,4)$, what is the tangent-line slope?",
    "choices": [
      {
        "label": "A",
        "text": "$1$"
      },
      {
        "label": "B",
        "text": "Undefined"
      },
      {
        "label": "C",
        "text": "$-1$"
      },
      {
        "label": "D",
        "text": "$0$"
      }
    ],
    "answer_label": "D",
    "explanation": "$y^{\\prime}=-x/y=0$ at $(0,4)$.\n\nA: No factor in the circle equation produces slope 1 at the top.\nB: The tangent is horizontal, not vertical.\nC: No factor in the circle equation produces slope -1 at the top.",
    "representation": "Graph",
    "figure": {
      "kind": "graph",
      "window": {
        "xMin": -5,
        "xMax": 5,
        "yMin": -5,
        "yMax": 5
      },
      "curves": [
        {
          "label": "circle",
          "points": [
            [
              4,
              0
            ],
            [
              3.994518,
              0.209344
            ],
            [
              3.978088,
              0.418114
            ],
            [
              3.950753,
              0.625738
            ],
            [
              3.91259,
              0.831647
            ],
            [
              3.863703,
              1.035276
            ],
            [
              3.804226,
              1.236068
            ],
            [
              3.734322,
              1.433472
            ],
            [
              3.654182,
              1.626947
            ],
            [
              3.564026,
              1.815962
            ],
            [
              3.464102,
              2
            ],
            [
              3.354682,
              2.178556
            ],
            [
              3.236068,
              2.351141
            ],
            [
              3.108584,
              2.517282
            ],
            [
              2.972579,
              2.676522
            ],
            [
              2.828427,
              2.828427
            ],
            [
              2.676522,
              2.972579
            ],
            [
              2.517282,
              3.108584
            ],
            [
              2.351141,
              3.236068
            ],
            [
              2.178556,
              3.354682
            ],
            [
              2,
              3.464102
            ],
            [
              1.815962,
              3.564026
            ],
            [
              1.626947,
              3.654182
            ],
            [
              1.433472,
              3.734322
            ],
            [
              1.236068,
              3.804226
            ],
            [
              1.035276,
              3.863703
            ],
            [
              0.831647,
              3.91259
            ],
            [
              0.625738,
              3.950753
            ],
            [
              0.418114,
              3.978088
            ],
            [
              0.209344,
              3.994518
            ],
            [
              0,
              4
            ],
            [
              -0.209344,
              3.994518
            ],
            [
              -0.418114,
              3.978088
            ],
            [
              -0.625738,
              3.950753
            ],
            [
              -0.831647,
              3.91259
            ],
            [
              -1.035276,
              3.863703
            ],
            [
              -1.236068,
              3.804226
            ],
            [
              -1.433472,
              3.734322
            ],
            [
              -1.626947,
              3.654182
            ],
            [
              -1.815962,
              3.564026
            ],
            [
              -2,
              3.464102
            ],
            [
              -2.178556,
              3.354682
            ],
            [
              -2.351141,
              3.236068
            ],
            [
              -2.517282,
              3.108584
            ],
            [
              -2.676522,
              2.972579
            ],
            [
              -2.828427,
              2.828427
            ],
            [
              -2.972579,
              2.676522
            ],
            [
              -3.108584,
              2.517282
            ],
            [
              -3.236068,
              2.351141
            ],
            [
              -3.354682,
              2.178556
            ],
            [
              -3.464102,
              2
            ],
            [
              -3.564026,
              1.815962
            ],
            [
              -3.654182,
              1.626947
            ],
            [
              -3.734322,
              1.433472
            ],
            [
              -3.804226,
              1.236068
            ],
            [
              -3.863703,
              1.035276
            ],
            [
              -3.91259,
              0.831647
            ],
            [
              -3.950753,
              0.625738
            ],
            [
              -3.978088,
              0.418114
            ],
            [
              -3.994518,
              0.209344
            ],
            [
              -4,
              0
            ],
            [
              -3.994518,
              -0.209344
            ],
            [
              -3.978088,
              -0.418114
            ],
            [
              -3.950753,
              -0.625738
            ],
            [
              -3.91259,
              -0.831647
            ],
            [
              -3.863703,
              -1.035276
            ],
            [
              -3.804226,
              -1.236068
            ],
            [
              -3.734322,
              -1.433472
            ],
            [
              -3.654182,
              -1.626947
            ],
            [
              -3.564026,
              -1.815962
            ],
            [
              -3.464102,
              -2
            ],
            [
              -3.354682,
              -2.178556
            ],
            [
              -3.236068,
              -2.351141
            ],
            [
              -3.108584,
              -2.517282
            ],
            [
              -2.972579,
              -2.676522
            ],
            [
              -2.828427,
              -2.828427
            ],
            [
              -2.676522,
              -2.972579
            ],
            [
              -2.517282,
              -3.108584
            ],
            [
              -2.351141,
              -3.236068
            ],
            [
              -2.178556,
              -3.354682
            ],
            [
              -2,
              -3.464102
            ],
            [
              -1.815962,
              -3.564026
            ],
            [
              -1.626947,
              -3.654182
            ],
            [
              -1.433472,
              -3.734322
            ],
            [
              -1.236068,
              -3.804226
            ],
            [
              -1.035276,
              -3.863703
            ],
            [
              -0.831647,
              -3.91259
            ],
            [
              -0.625738,
              -3.950753
            ],
            [
              -0.418114,
              -3.978088
            ],
            [
              -0.209344,
              -3.994518
            ],
            [
              0,
              -4
            ],
            [
              0.209344,
              -3.994518
            ],
            [
              0.418114,
              -3.978088
            ],
            [
              0.625738,
              -3.950753
            ],
            [
              0.831647,
              -3.91259
            ],
            [
              1.035276,
              -3.863703
            ],
            [
              1.236068,
              -3.804226
            ],
            [
              1.433472,
              -3.734322
            ],
            [
              1.626947,
              -3.654182
            ],
            [
              1.815962,
              -3.564026
            ],
            [
              2,
              -3.464102
            ],
            [
              2.178556,
              -3.354682
            ],
            [
              2.351141,
              -3.236068
            ],
            [
              2.517282,
              -3.108584
            ],
            [
              2.676522,
              -2.972579
            ],
            [
              2.828427,
              -2.828427
            ],
            [
              2.972579,
              -2.676522
            ],
            [
              3.108584,
              -2.517282
            ],
            [
              3.236068,
              -2.351141
            ],
            [
              3.354682,
              -2.178556
            ],
            [
              3.464102,
              -2
            ],
            [
              3.564026,
              -1.815962
            ],
            [
              3.654182,
              -1.626947
            ],
            [
              3.734322,
              -1.433472
            ],
            [
              3.804226,
              -1.236068
            ],
            [
              3.863703,
              -1.035276
            ],
            [
              3.91259,
              -0.831647
            ],
            [
              3.950753,
              -0.625738
            ],
            [
              3.978088,
              -0.418114
            ],
            [
              3.994518,
              -0.209344
            ],
            [
              4,
              0
            ]
          ],
          "smooth": false
        }
      ],
      "markers": [
        {
          "x": 0,
          "y": 4,
          "label": "top",
          "kind": "closed"
        }
      ]
    },
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T2.F4.TY3.Q032",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "A plotted branch satisfies $y^2=x+1$, with $(3,2)$ labeled. Is the tangent slope at that point positive or negative, and what is its value?",
    "choices": [
      {
        "label": "A",
        "text": "Positive, $\\frac14$"
      },
      {
        "label": "B",
        "text": "Negative, $-\\frac14$"
      },
      {
        "label": "C",
        "text": "Positive, $\\frac12$"
      },
      {
        "label": "D",
        "text": "Positive, $4$"
      }
    ],
    "answer_label": "A",
    "explanation": "$2yy^{\\prime}=1$, so $y^{\\prime}=1/(2\\cdot2)=1/4$.\n\nB: Loses the sign when differentiating $y^2=x+1$.\nC: Uses $y=1$ instead of $y=2$.\nD: Inverts $y^{\\prime}=1/(2y)$.",
    "representation": "Graph",
    "figure": {
      "kind": "graph",
      "window": {
        "xMin": -2,
        "xMax": 6,
        "yMin": -3,
        "yMax": 3
      },
      "curves": [
        {
          "label": "upper branch",
          "points": [
            [
              -1,
              0
            ],
            [
              -0.933333,
              0.258199
            ],
            [
              -0.866667,
              0.365148
            ],
            [
              -0.8,
              0.447214
            ],
            [
              -0.733333,
              0.516398
            ],
            [
              -0.666667,
              0.57735
            ],
            [
              -0.6,
              0.632456
            ],
            [
              -0.533333,
              0.68313
            ],
            [
              -0.466667,
              0.730297
            ],
            [
              -0.4,
              0.774597
            ],
            [
              -0.333333,
              0.816497
            ],
            [
              -0.266667,
              0.856349
            ],
            [
              -0.2,
              0.894427
            ],
            [
              -0.133333,
              0.930949
            ],
            [
              -0.066667,
              0.966092
            ],
            [
              0,
              1
            ],
            [
              0.066667,
              1.032796
            ],
            [
              0.133333,
              1.064581
            ],
            [
              0.2,
              1.095445
            ],
            [
              0.266667,
              1.125463
            ],
            [
              0.333333,
              1.154701
            ],
            [
              0.4,
              1.183216
            ],
            [
              0.466667,
              1.21106
            ],
            [
              0.533333,
              1.238278
            ],
            [
              0.6,
              1.264911
            ],
            [
              0.666667,
              1.290994
            ],
            [
              0.733333,
              1.316561
            ],
            [
              0.8,
              1.341641
            ],
            [
              0.866667,
              1.36626
            ],
            [
              0.933333,
              1.390444
            ],
            [
              1,
              1.414214
            ],
            [
              1.066667,
              1.437591
            ],
            [
              1.133333,
              1.460593
            ],
            [
              1.2,
              1.48324
            ],
            [
              1.266667,
              1.505545
            ],
            [
              1.333333,
              1.527525
            ],
            [
              1.4,
              1.549193
            ],
            [
              1.466667,
              1.570563
            ],
            [
              1.533333,
              1.591645
            ],
            [
              1.6,
              1.612452
            ],
            [
              1.666667,
              1.632993
            ],
            [
              1.733333,
              1.65328
            ],
            [
              1.8,
              1.67332
            ],
            [
              1.866667,
              1.693123
            ],
            [
              1.933333,
              1.712698
            ],
            [
              2,
              1.732051
            ],
            [
              2.066667,
              1.75119
            ],
            [
              2.133333,
              1.770122
            ],
            [
              2.2,
              1.788854
            ],
            [
              2.266667,
              1.807392
            ],
            [
              2.333333,
              1.825742
            ],
            [
              2.4,
              1.843909
            ],
            [
              2.466667,
              1.861899
            ],
            [
              2.533333,
              1.879716
            ],
            [
              2.6,
              1.897367
            ],
            [
              2.666667,
              1.914854
            ],
            [
              2.733333,
              1.932184
            ],
            [
              2.8,
              1.949359
            ],
            [
              2.866667,
              1.966384
            ],
            [
              2.933333,
              1.983263
            ],
            [
              3,
              2
            ],
            [
              3.066667,
              2.016598
            ],
            [
              3.133333,
              2.03306
            ],
            [
              3.2,
              2.04939
            ],
            [
              3.266667,
              2.065591
            ],
            [
              3.333333,
              2.081666
            ],
            [
              3.4,
              2.097618
            ],
            [
              3.466667,
              2.113449
            ],
            [
              3.533333,
              2.129163
            ],
            [
              3.6,
              2.144761
            ],
            [
              3.666667,
              2.160247
            ],
            [
              3.733333,
              2.175623
            ],
            [
              3.8,
              2.19089
            ],
            [
              3.866667,
              2.206052
            ],
            [
              3.933333,
              2.221111
            ],
            [
              4,
              2.236068
            ],
            [
              4.066667,
              2.250926
            ],
            [
              4.133333,
              2.265686
            ],
            [
              4.2,
              2.280351
            ],
            [
              4.266667,
              2.294922
            ],
            [
              4.333333,
              2.309401
            ],
            [
              4.4,
              2.32379
            ],
            [
              4.466667,
              2.33809
            ],
            [
              4.533333,
              2.352304
            ],
            [
              4.6,
              2.366432
            ],
            [
              4.666667,
              2.380476
            ],
            [
              4.733333,
              2.394438
            ],
            [
              4.8,
              2.408319
            ],
            [
              4.866667,
              2.42212
            ],
            [
              4.933333,
              2.435843
            ],
            [
              5,
              2.44949
            ],
            [
              5.066667,
              2.46306
            ],
            [
              5.133333,
              2.476557
            ],
            [
              5.2,
              2.48998
            ],
            [
              5.266667,
              2.503331
            ],
            [
              5.333333,
              2.516611
            ],
            [
              5.4,
              2.529822
            ],
            [
              5.466667,
              2.542964
            ],
            [
              5.533333,
              2.556039
            ],
            [
              5.6,
              2.569047
            ],
            [
              5.666667,
              2.581989
            ],
            [
              5.733333,
              2.594867
            ],
            [
              5.8,
              2.607681
            ],
            [
              5.866667,
              2.620433
            ],
            [
              5.933333,
              2.633122
            ],
            [
              6,
              2.645751
            ]
          ],
          "smooth": false
        },
        {
          "label": "lower branch",
          "points": [
            [
              -1,
              0
            ],
            [
              -0.933333,
              -0.258199
            ],
            [
              -0.866667,
              -0.365148
            ],
            [
              -0.8,
              -0.447214
            ],
            [
              -0.733333,
              -0.516398
            ],
            [
              -0.666667,
              -0.57735
            ],
            [
              -0.6,
              -0.632456
            ],
            [
              -0.533333,
              -0.68313
            ],
            [
              -0.466667,
              -0.730297
            ],
            [
              -0.4,
              -0.774597
            ],
            [
              -0.333333,
              -0.816497
            ],
            [
              -0.266667,
              -0.856349
            ],
            [
              -0.2,
              -0.894427
            ],
            [
              -0.133333,
              -0.930949
            ],
            [
              -0.066667,
              -0.966092
            ],
            [
              0,
              -1
            ],
            [
              0.066667,
              -1.032796
            ],
            [
              0.133333,
              -1.064581
            ],
            [
              0.2,
              -1.095445
            ],
            [
              0.266667,
              -1.125463
            ],
            [
              0.333333,
              -1.154701
            ],
            [
              0.4,
              -1.183216
            ],
            [
              0.466667,
              -1.21106
            ],
            [
              0.533333,
              -1.238278
            ],
            [
              0.6,
              -1.264911
            ],
            [
              0.666667,
              -1.290994
            ],
            [
              0.733333,
              -1.316561
            ],
            [
              0.8,
              -1.341641
            ],
            [
              0.866667,
              -1.36626
            ],
            [
              0.933333,
              -1.390444
            ],
            [
              1,
              -1.414214
            ],
            [
              1.066667,
              -1.437591
            ],
            [
              1.133333,
              -1.460593
            ],
            [
              1.2,
              -1.48324
            ],
            [
              1.266667,
              -1.505545
            ],
            [
              1.333333,
              -1.527525
            ],
            [
              1.4,
              -1.549193
            ],
            [
              1.466667,
              -1.570563
            ],
            [
              1.533333,
              -1.591645
            ],
            [
              1.6,
              -1.612452
            ],
            [
              1.666667,
              -1.632993
            ],
            [
              1.733333,
              -1.65328
            ],
            [
              1.8,
              -1.67332
            ],
            [
              1.866667,
              -1.693123
            ],
            [
              1.933333,
              -1.712698
            ],
            [
              2,
              -1.732051
            ],
            [
              2.066667,
              -1.75119
            ],
            [
              2.133333,
              -1.770122
            ],
            [
              2.2,
              -1.788854
            ],
            [
              2.266667,
              -1.807392
            ],
            [
              2.333333,
              -1.825742
            ],
            [
              2.4,
              -1.843909
            ],
            [
              2.466667,
              -1.861899
            ],
            [
              2.533333,
              -1.879716
            ],
            [
              2.6,
              -1.897367
            ],
            [
              2.666667,
              -1.914854
            ],
            [
              2.733333,
              -1.932184
            ],
            [
              2.8,
              -1.949359
            ],
            [
              2.866667,
              -1.966384
            ],
            [
              2.933333,
              -1.983263
            ],
            [
              3,
              -2
            ],
            [
              3.066667,
              -2.016598
            ],
            [
              3.133333,
              -2.03306
            ],
            [
              3.2,
              -2.04939
            ],
            [
              3.266667,
              -2.065591
            ],
            [
              3.333333,
              -2.081666
            ],
            [
              3.4,
              -2.097618
            ],
            [
              3.466667,
              -2.113449
            ],
            [
              3.533333,
              -2.129163
            ],
            [
              3.6,
              -2.144761
            ],
            [
              3.666667,
              -2.160247
            ],
            [
              3.733333,
              -2.175623
            ],
            [
              3.8,
              -2.19089
            ],
            [
              3.866667,
              -2.206052
            ],
            [
              3.933333,
              -2.221111
            ],
            [
              4,
              -2.236068
            ],
            [
              4.066667,
              -2.250926
            ],
            [
              4.133333,
              -2.265686
            ],
            [
              4.2,
              -2.280351
            ],
            [
              4.266667,
              -2.294922
            ],
            [
              4.333333,
              -2.309401
            ],
            [
              4.4,
              -2.32379
            ],
            [
              4.466667,
              -2.33809
            ],
            [
              4.533333,
              -2.352304
            ],
            [
              4.6,
              -2.366432
            ],
            [
              4.666667,
              -2.380476
            ],
            [
              4.733333,
              -2.394438
            ],
            [
              4.8,
              -2.408319
            ],
            [
              4.866667,
              -2.42212
            ],
            [
              4.933333,
              -2.435843
            ],
            [
              5,
              -2.44949
            ],
            [
              5.066667,
              -2.46306
            ],
            [
              5.133333,
              -2.476557
            ],
            [
              5.2,
              -2.48998
            ],
            [
              5.266667,
              -2.503331
            ],
            [
              5.333333,
              -2.516611
            ],
            [
              5.4,
              -2.529822
            ],
            [
              5.466667,
              -2.542964
            ],
            [
              5.533333,
              -2.556039
            ],
            [
              5.6,
              -2.569047
            ],
            [
              5.666667,
              -2.581989
            ],
            [
              5.733333,
              -2.594867
            ],
            [
              5.8,
              -2.607681
            ],
            [
              5.866667,
              -2.620433
            ],
            [
              5.933333,
              -2.633122
            ],
            [
              6,
              -2.645751
            ]
          ],
          "smooth": false
        }
      ],
      "markers": [
        {
          "x": 3,
          "y": 2,
          "label": "P",
          "kind": "closed"
        }
      ]
    },
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T2.F4.TY3.Q033",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The graph shows a circle $x^2+y^2=9$. At $(-3,0)$, which statement is accurate?",
    "choices": [
      {
        "label": "A",
        "text": "The tangent is vertical, so $dy/dx$ is not a finite real number."
      },
      {
        "label": "B",
        "text": "The tangent has slope $-1$."
      },
      {
        "label": "C",
        "text": "The curve is discontinuous there."
      },
      {
        "label": "D",
        "text": "The tangent is horizontal with slope 0."
      }
    ],
    "answer_label": "A",
    "explanation": "$y^{\\prime}=-x/y$ has denominator zero at $y=0$, with $x\\ne0$.\n\nB: No finite slope describes a vertical tangent.\nC: The circle is a continuous curve, but $y$ cannot be a differentiable function of $x$ through that point.\nD: At the leftmost point, the radius is horizontal and the tangent is vertical.",
    "representation": "Graph",
    "figure": {
      "kind": "graph",
      "window": {
        "xMin": -4,
        "xMax": 4,
        "yMin": -4,
        "yMax": 4
      },
      "curves": [
        {
          "label": "circle",
          "points": [
            [
              3,
              0
            ],
            [
              2.995889,
              0.157008
            ],
            [
              2.983566,
              0.313585
            ],
            [
              2.963065,
              0.469303
            ],
            [
              2.934443,
              0.623735
            ],
            [
              2.897777,
              0.776457
            ],
            [
              2.85317,
              0.927051
            ],
            [
              2.800741,
              1.075104
            ],
            [
              2.740636,
              1.22021
            ],
            [
              2.67302,
              1.361971
            ],
            [
              2.598076,
              1.5
            ],
            [
              2.516012,
              1.633917
            ],
            [
              2.427051,
              1.763356
            ],
            [
              2.331438,
              1.887961
            ],
            [
              2.229434,
              2.007392
            ],
            [
              2.12132,
              2.12132
            ],
            [
              2.007392,
              2.229434
            ],
            [
              1.887961,
              2.331438
            ],
            [
              1.763356,
              2.427051
            ],
            [
              1.633917,
              2.516012
            ],
            [
              1.5,
              2.598076
            ],
            [
              1.361971,
              2.67302
            ],
            [
              1.22021,
              2.740636
            ],
            [
              1.075104,
              2.800741
            ],
            [
              0.927051,
              2.85317
            ],
            [
              0.776457,
              2.897777
            ],
            [
              0.623735,
              2.934443
            ],
            [
              0.469303,
              2.963065
            ],
            [
              0.313585,
              2.983566
            ],
            [
              0.157008,
              2.995889
            ],
            [
              0,
              3
            ],
            [
              -0.157008,
              2.995889
            ],
            [
              -0.313585,
              2.983566
            ],
            [
              -0.469303,
              2.963065
            ],
            [
              -0.623735,
              2.934443
            ],
            [
              -0.776457,
              2.897777
            ],
            [
              -0.927051,
              2.85317
            ],
            [
              -1.075104,
              2.800741
            ],
            [
              -1.22021,
              2.740636
            ],
            [
              -1.361971,
              2.67302
            ],
            [
              -1.5,
              2.598076
            ],
            [
              -1.633917,
              2.516012
            ],
            [
              -1.763356,
              2.427051
            ],
            [
              -1.887961,
              2.331438
            ],
            [
              -2.007392,
              2.229434
            ],
            [
              -2.12132,
              2.12132
            ],
            [
              -2.229434,
              2.007392
            ],
            [
              -2.331438,
              1.887961
            ],
            [
              -2.427051,
              1.763356
            ],
            [
              -2.516012,
              1.633917
            ],
            [
              -2.598076,
              1.5
            ],
            [
              -2.67302,
              1.361971
            ],
            [
              -2.740636,
              1.22021
            ],
            [
              -2.800741,
              1.075104
            ],
            [
              -2.85317,
              0.927051
            ],
            [
              -2.897777,
              0.776457
            ],
            [
              -2.934443,
              0.623735
            ],
            [
              -2.963065,
              0.469303
            ],
            [
              -2.983566,
              0.313585
            ],
            [
              -2.995889,
              0.157008
            ],
            [
              -3,
              0
            ],
            [
              -2.995889,
              -0.157008
            ],
            [
              -2.983566,
              -0.313585
            ],
            [
              -2.963065,
              -0.469303
            ],
            [
              -2.934443,
              -0.623735
            ],
            [
              -2.897777,
              -0.776457
            ],
            [
              -2.85317,
              -0.927051
            ],
            [
              -2.800741,
              -1.075104
            ],
            [
              -2.740636,
              -1.22021
            ],
            [
              -2.67302,
              -1.361971
            ],
            [
              -2.598076,
              -1.5
            ],
            [
              -2.516012,
              -1.633917
            ],
            [
              -2.427051,
              -1.763356
            ],
            [
              -2.331438,
              -1.887961
            ],
            [
              -2.229434,
              -2.007392
            ],
            [
              -2.12132,
              -2.12132
            ],
            [
              -2.007392,
              -2.229434
            ],
            [
              -1.887961,
              -2.331438
            ],
            [
              -1.763356,
              -2.427051
            ],
            [
              -1.633917,
              -2.516012
            ],
            [
              -1.5,
              -2.598076
            ],
            [
              -1.361971,
              -2.67302
            ],
            [
              -1.22021,
              -2.740636
            ],
            [
              -1.075104,
              -2.800741
            ],
            [
              -0.927051,
              -2.85317
            ],
            [
              -0.776457,
              -2.897777
            ],
            [
              -0.623735,
              -2.934443
            ],
            [
              -0.469303,
              -2.963065
            ],
            [
              -0.313585,
              -2.983566
            ],
            [
              -0.157008,
              -2.995889
            ],
            [
              0,
              -3
            ],
            [
              0.157008,
              -2.995889
            ],
            [
              0.313585,
              -2.983566
            ],
            [
              0.469303,
              -2.963065
            ],
            [
              0.623735,
              -2.934443
            ],
            [
              0.776457,
              -2.897777
            ],
            [
              0.927051,
              -2.85317
            ],
            [
              1.075104,
              -2.800741
            ],
            [
              1.22021,
              -2.740636
            ],
            [
              1.361971,
              -2.67302
            ],
            [
              1.5,
              -2.598076
            ],
            [
              1.633917,
              -2.516012
            ],
            [
              1.763356,
              -2.427051
            ],
            [
              1.887961,
              -2.331438
            ],
            [
              2.007392,
              -2.229434
            ],
            [
              2.12132,
              -2.12132
            ],
            [
              2.229434,
              -2.007392
            ],
            [
              2.331438,
              -1.887961
            ],
            [
              2.427051,
              -1.763356
            ],
            [
              2.516012,
              -1.633917
            ],
            [
              2.598076,
              -1.5
            ],
            [
              2.67302,
              -1.361971
            ],
            [
              2.740636,
              -1.22021
            ],
            [
              2.800741,
              -1.075104
            ],
            [
              2.85317,
              -0.927051
            ],
            [
              2.897777,
              -0.776457
            ],
            [
              2.934443,
              -0.623735
            ],
            [
              2.963065,
              -0.469303
            ],
            [
              2.983566,
              -0.313585
            ],
            [
              2.995889,
              -0.157008
            ],
            [
              3,
              0
            ]
          ],
          "smooth": false
        }
      ],
      "markers": [
        {
          "x": -3,
          "y": 0,
          "label": "left",
          "kind": "closed"
        }
      ]
    },
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T2.F5.TY1.Q034",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "A student differentiates $y^4+x^2=9$ as $4y^3+2x=0$. What factor is missing?",
    "choices": [
      {
        "label": "A",
        "text": "$y$ multiplying $2x$"
      },
      {
        "label": "B",
        "text": "$x^{\\prime}$ multiplying $2x$"
      },
      {
        "label": "C",
        "text": "$4$ multiplying $2x$"
      },
      {
        "label": "D",
        "text": "$y^{\\prime}$ multiplying $4y^3$"
      }
    ],
    "answer_label": "D",
    "explanation": "Implicitly differentiating $y^4$ gives $4y^3y^{\\prime}$.\n\nA: The $x^2$ derivative does not require a factor of $y$.\nB: Here $x$ is the independent variable and $dx/dx=1$.\nC: The missing operation is the chain rule on $y^4$, not an additional constant on $x^2$.",
    "representation": "Verbal",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T2.F5.TY1.Q035",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "A student finds $d(xy)/dx=xy^{\\prime}$ for $xy=5$. Why is that incomplete?",
    "choices": [
      {
        "label": "A",
        "text": "It should be $x^{\\prime} y^{\\prime}$."
      },
      {
        "label": "B",
        "text": "The derivative is always $x+y$."
      },
      {
        "label": "C",
        "text": "The product rule also contributes a $y$ term."
      },
      {
        "label": "D",
        "text": "$dy/dx$ must never appear when differentiating a product."
      }
    ],
    "answer_label": "C",
    "explanation": "$d(xy)/dx=y+xy^{\\prime}$.\n\nA: Product derivatives add two terms, not multiply two derivatives.\nB: That is not the product rule and omits $y^{\\prime}$.\nD: The factor $y$ is a function of $x$, so its derivative must appear.",
    "representation": "Verbal",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T2.F5.TY2.Q036",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "A student differentiates $x^2+y^2=25$ and writes $2x+2y=0$. Which statement identifies the error?",
    "choices": [
      {
        "label": "A",
        "text": "The derivative of $x^2$ should be $x$."
      },
      {
        "label": "B",
        "text": "The derivative of $y^2$ is $2y\\,dy/dx$, not just $2y$."
      },
      {
        "label": "C",
        "text": "The derivative of $y^2$ is $(dy/dx)^2$."
      },
      {
        "label": "D",
        "text": "The constant 25 should differentiate to 25."
      }
    ],
    "answer_label": "B",
    "explanation": "Treat $y$ as a function of $x$, so $d(y^2)/dx=2y\\,dy/dx$.\n\nA: The power rule gives $2x$.\nC: The chain rule gives $2y\\,dy/dx$.\nD: The derivative of a constant is zero.",
    "representation": "Verbal",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T2.F5.TY2.Q037",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Why is $y^{\\prime}=-x/y$ not a valid finite slope formula at $(5,0)$ on $x^2+y^2=25$?",
    "choices": [
      {
        "label": "A",
        "text": "The curve has a removable hole there."
      },
      {
        "label": "B",
        "text": "The point is not on the circle."
      },
      {
        "label": "C",
        "text": "The tangent slope is automatically zero."
      },
      {
        "label": "D",
        "text": "The circle has a vertical tangent there."
      }
    ],
    "answer_label": "D",
    "explanation": "The radius is horizontal at $(5,0)$, so the perpendicular tangent is vertical.\n\nA: The circle has no hole at the point.\nB: $25+0=25$, so the point is on the curve.\nC: A zero denominator does not give zero slope.",
    "representation": "Verbal",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T2.F5.TY3.Q038",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "For the curve $x^2+xy+y^2=7$, suppose $y^{^{\\prime}}=-(2x+y)/(x+2y)$. Which condition identifies a horizontal tangent at a regular point?",
    "choices": [
      {
        "label": "A",
        "text": "$2x+y=0$ and $x+2y=0$"
      },
      {
        "label": "B",
        "text": "$2x+y=0$ and $x+2y\\ne0$"
      },
      {
        "label": "C",
        "text": "$x+2y=0$ and $2x+y\\ne0$"
      },
      {
        "label": "D",
        "text": "$2x+y\\ne0$ and $x+2y\\ne0$"
      }
    ],
    "answer_label": "B",
    "explanation": "The rational expression for $y^{^{\\prime}}$ equals zero when its numerator is zero and its denominator is nonzero.\n\nA: The expression is indeterminate at such a point rather than a finite zero slope.\nC: This gives an undefined slope, suggesting a vertical tangent.\nD: The nonzero numerator gives a nonzero finite slope.",
    "representation": "Verbal",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T2.F5.TY3.Q039",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "On the ellipse $x^2+4y^2=16$, which points have horizontal tangent lines?",
    "choices": [
      {
        "label": "A",
        "text": "$(2,0)$ and $(-2,0)$"
      },
      {
        "label": "B",
        "text": "$(0,2)$ and $(0,-2)$"
      },
      {
        "label": "C",
        "text": "Only $(0,2)$"
      },
      {
        "label": "D",
        "text": "$(4,0)$ and $(-4,0)$"
      }
    ],
    "answer_label": "B",
    "explanation": "Differentiating gives $2x+8y y^{^{\\prime}}=0$, so $y^{^{\\prime}}=-x/(4y)$. A horizontal tangent requires $x=0$, $y\\ne0$, giving $y=\\pm2$.\n\nA: These are not points on the ellipse.\nC: The lower point $(0,-2)$ also has horizontal tangent.\nD: These have vertical tangents, because $y=0$.",
    "representation": "Verbal",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T2.F5.TY4.Q040",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "Which conclusion about the curve $x^2+y^2=1$ is true?",
    "choices": [
      {
        "label": "A",
        "text": "It cannot be represented by a single function $y=f(x)$ over $-1<x<1$ without choosing a branch."
      },
      {
        "label": "B",
        "text": "Implicit differentiation is invalid for circles."
      },
      {
        "label": "C",
        "text": "Every point has two different tangent slopes."
      },
      {
        "label": "D",
        "text": "No part of the circle defines a differentiable function."
      }
    ],
    "answer_label": "A",
    "explanation": "For a typical $x$ in $(-1,1)$, the circle has two possible values $y=\\pm\\sqrt{1-x^2}$.\n\nB: Implicit differentiation works on circle branches wherever the slope is finite.\nC: At many points there are two different $y$ values, but a given point has one tangent line.\nD: Each upper/lower semicircle branch is differentiable away from endpoints.",
    "representation": "Verbal",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T2.F5.TY4.Q041",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "On $y^2=x$, the curve contains $(0,0)$. Which statement is correct at that point?",
    "choices": [
      {
        "label": "A",
        "text": "The origin is not on the curve."
      },
      {
        "label": "B",
        "text": "There is a horizontal tangent with slope 0."
      },
      {
        "label": "C",
        "text": "$dy/dx=0$ at the origin."
      },
      {
        "label": "D",
        "text": "Neither branch has a finite derivative $dy/dx$ at the origin."
      }
    ],
    "answer_label": "D",
    "explanation": "$2yy^{\\prime}=1$, which cannot give a finite $y^{\\prime}$ at $y=0$.\n\nA: $0^2=0$ verifies it lies on the curve.\nB: The tangent is vertical at the origin.\nC: The slope formula $1/(2y)$ has zero denominator there.",
    "representation": "Verbal",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T2.F6.TY1.Q042",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "The curve $x^2+kxy+y^2=7$ passes through $(1,2)$. What is $k$?",
    "choices": [
      {
        "label": "A",
        "text": "$3$"
      },
      {
        "label": "B",
        "text": "$2$"
      },
      {
        "label": "C",
        "text": "$-1$"
      },
      {
        "label": "D",
        "text": "$1$"
      }
    ],
    "answer_label": "D",
    "explanation": "$1+2k+4=7$, so $k=1$.\n\nA: Adds rather than subtracts the other squared terms.\nB: Forgets the coefficient $xy=2$.\nC: Uses the wrong sign when solving $1+2k+4=7$.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T2.F6.TY1.Q043",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "On $x^2+ay^2=20$, the point $(2,2)$ lies on the curve. What is the tangent slope there?",
    "choices": [
      {
        "label": "A",
        "text": "$-\\frac14$"
      },
      {
        "label": "B",
        "text": "$\\frac14$"
      },
      {
        "label": "C",
        "text": "$-4$"
      },
      {
        "label": "D",
        "text": "$-1$"
      }
    ],
    "answer_label": "A",
    "explanation": "$4+4a=20$ gives $a=4$. Then $2x+8yy^{\\prime}=0$, so at $(2,2)$ the slope is $-4/16=-1/4$.\n\nB: Omits the negative sign.\nC: Uses the reciprocal slope.\nD: Treats $a$ as 1.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T2.F6.TY2.Q044",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "A contour on a map satisfies $x^2+4y^2=100$, with $x$ and $y$ in kilometers. At $(6,4)$, how does $y$ change per kilometer increase in $x$ along the contour?",
    "choices": [
      {
        "label": "A",
        "text": "$-\\frac38\\ \\mathrm{km/km}$"
      },
      {
        "label": "B",
        "text": "$\\frac38\\ \\mathrm{km/km}$"
      },
      {
        "label": "C",
        "text": "$-\\frac83\\ \\mathrm{km/km}$"
      },
      {
        "label": "D",
        "text": "$-\\frac34\\ \\mathrm{km/km}$"
      }
    ],
    "answer_label": "A",
    "explanation": "$2x+8yy^{\\prime}=0$ gives $y^{\\prime}=-x/(4y)=-6/16=-3/8$.\n\nB: Omits the negative sign: $y$ decreases as $x$ increases here.\nC: Inverts the slope.\nD: Omits a factor 2 in differentiating $4y^2$.",
    "representation": "Context",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T2.F6.TY2.Q045",
    "topic_slug": "implicit-differentiation",
    "ced_topic": "3.2",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The position pairs $(x,y)$ of a robot satisfy $xy=24$ (in square meters). At $(6,4)$, what is the instantaneous change in $y$ with respect to $x$?",
    "choices": [
      {
        "label": "A",
        "text": "$-\\frac23\\ \\mathrm{m/m}$"
      },
      {
        "label": "B",
        "text": "$\\frac23\\ \\mathrm{m/m}$"
      },
      {
        "label": "C",
        "text": "$-\\frac32\\ \\mathrm{m/m}$"
      },
      {
        "label": "D",
        "text": "$-4\\ \\mathrm{m/m}$"
      }
    ],
    "answer_label": "A",
    "explanation": "$xy=24$ implies $y^{\\prime}=-y/x=-4/6=-2/3$.\n\nB: Omits the negative sign.\nC: Interchanges $x$ and $y$.\nD: Uses the coordinate $y$ rather than $-y/x$.",
    "representation": "Context",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T3.F1.TY1.Q001",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "If $f(2)=7$ and $f^{\\prime}(2)=5$, with $f$ locally invertible, what is $(f^{-1})^{\\prime}(7)$?",
    "choices": [
      {
        "label": "A",
        "text": "$\\frac17$"
      },
      {
        "label": "B",
        "text": "$5$"
      },
      {
        "label": "C",
        "text": "$\\frac15$"
      },
      {
        "label": "D",
        "text": "$\\frac12$"
      }
    ],
    "answer_label": "C",
    "explanation": "$(f^{-1})^{\\prime}(f(2))=1/f^{\\prime}(2)=1/5$.\n\nA: Takes the reciprocal of the output value instead of $f^{\\prime}(2)$.\nB: Uses the original slope rather than its reciprocal.\nD: Takes the reciprocal of the input rather than of the derivative.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T3.F1.TY1.Q002",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "Suppose $f(-1)=4$, $f^{\\prime}(-1)=-3$, and $f^{-1}$ is differentiable at 4. Find $(f^{-1})^{\\prime}(4)$.",
    "choices": [
      {
        "label": "A",
        "text": "$-\\frac14$"
      },
      {
        "label": "B",
        "text": "$-\\frac13$"
      },
      {
        "label": "C",
        "text": "$-3$"
      },
      {
        "label": "D",
        "text": "$\\frac13$"
      }
    ],
    "answer_label": "B",
    "explanation": "The inverse slope at 4 is $1/f^{\\prime}(-1)=-1/3$.\n\nA: Uses the output value 4 instead of the derivative.\nC: Fails to take the reciprocal of the derivative.\nD: Drops the negative sign.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T3.F1.TY2.Q003",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "If $(f^{-1})^{\\prime}(6)=\\frac14$ and $f(3)=6$, what is $f^{\\prime}(3)$?",
    "choices": [
      {
        "label": "A",
        "text": "$3$"
      },
      {
        "label": "B",
        "text": "$4$"
      },
      {
        "label": "C",
        "text": "$6$"
      },
      {
        "label": "D",
        "text": "$\\frac14$"
      }
    ],
    "answer_label": "B",
    "explanation": "$(f^{-1})^{\\prime}(6)=1/f^{\\prime}(3)$, so $f^{\\prime}(3)=4$.\n\nA: Uses the preimage rather than the derivative.\nC: Uses the output value instead of the reciprocal derivative.\nD: Leaves the inverse derivative unchanged.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T3.F1.TY2.Q004",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "If $f(a)=b$ and $(f^{-1})^{\\prime}(b)=-2$, what is $f^{\\prime}(a)$?",
    "choices": [
      {
        "label": "A",
        "text": "$\\frac12$"
      },
      {
        "label": "B",
        "text": "$-2$"
      },
      {
        "label": "C",
        "text": "$2$"
      },
      {
        "label": "D",
        "text": "$-\\frac12$"
      }
    ],
    "answer_label": "D",
    "explanation": "By inverse differentiation, $f^{\\prime}(a)=1/(-2)=-1/2$.\n\nA: Drops the negative sign.\nB: Does not take the reciprocal.\nC: Drops the sign and fails to take a reciprocal.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T3.F1.TY3.Q005",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "If $f(1)=2$, $f^{\\prime}(1)=3$, and $g(x)=f^{-1}(x)+4$, find $g^{\\prime}(2)$.",
    "choices": [
      {
        "label": "A",
        "text": "$3$"
      },
      {
        "label": "B",
        "text": "$\\frac13$"
      },
      {
        "label": "C",
        "text": "$\\frac17$"
      },
      {
        "label": "D",
        "text": "$\\frac12$"
      }
    ],
    "answer_label": "B",
    "explanation": "The constant 4 differentiates to zero, and $(f^{-1})^{\\prime}(2)=1/3$.\n\nA: Fails to take the reciprocal derivative.\nC: Mistakes the added constant 4 for a derivative factor.\nD: Uses the inverse input 2 instead of the original slope.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T3.F1.TY3.Q006",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "If $f(4)=-2$ and $f^{\\prime}(4)=-\\frac12$, what is $(f^{-1})^{\\prime}(-2)$?",
    "choices": [
      {
        "label": "A",
        "text": "$-2$"
      },
      {
        "label": "B",
        "text": "$-\\frac12$"
      },
      {
        "label": "C",
        "text": "$2$"
      },
      {
        "label": "D",
        "text": "$-\\frac14$"
      }
    ],
    "answer_label": "A",
    "explanation": "Invert the slope $-1/2$ to get $-2$.\n\nB: Leaves the derivative unchanged.\nC: Drops the negative sign.\nD: Uses the original input 4 rather than the derivative.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T3.F1.TY4.Q007",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "If $f(0)=5$ and $f^{\\prime}(0)=8$, what is the tangent slope to the graph of $y=f^{-1}(x)$ at $(5,0)$?",
    "choices": [
      {
        "label": "A",
        "text": "$\\frac15$"
      },
      {
        "label": "B",
        "text": "$\\frac18$"
      },
      {
        "label": "C",
        "text": "$8$"
      },
      {
        "label": "D",
        "text": "$0$"
      }
    ],
    "answer_label": "B",
    "explanation": "The inverse swaps coordinates and reciprocates nonzero slopes.\n\nA: Uses the inverse input 5 instead of a derivative.\nC: This is the original tangent slope, not the inverse slope.\nD: Uses the inverse function value 0 as its derivative.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T3.F1.TY4.Q008",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "If $f(2)=3$ and $f^{\\prime}(2)=-4$, what is the slope of the line normal to $y=f^{-1}(x)$ at $(3,2)$?",
    "choices": [
      {
        "label": "A",
        "text": "$-\\frac14$"
      },
      {
        "label": "B",
        "text": "$4$"
      },
      {
        "label": "C",
        "text": "$-4$"
      },
      {
        "label": "D",
        "text": "$\\frac14$"
      }
    ],
    "answer_label": "B",
    "explanation": "The inverse tangent slope is $-1/4$; its perpendicular normal slope is $4$.\n\nA: This is the tangent slope, not the normal slope.\nC: Uses the original slope instead of the inverse normal slope.\nD: Loses the sign and fails to take the normal reciprocal.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T3.F2.TY1.Q009",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Use this table for a strictly decreasing differentiable function.  Find $(f^{-1})^{\\prime}(4)$.",
    "choices": [
      {
        "label": "A",
        "text": "$-\\frac15$"
      },
      {
        "label": "B",
        "text": "$\\frac15$"
      },
      {
        "label": "C",
        "text": "$-\\frac14$"
      },
      {
        "label": "D",
        "text": "$-5$"
      }
    ],
    "answer_label": "A",
    "explanation": "$f(0)=4$ and $f^{\\prime}(0)=-5$, so the inverse derivative at 4 is $-1/5$.\n\nB: Drops the negative sign.\nC: Uses $f^{\\prime}(1)$ instead of $f^{\\prime}(0)$.\nD: Does not reciprocate $f^{\\prime}(0)=-5$.",
    "representation": "Tabular",
    "figure": {
      "kind": "table",
      "headers": [
        "$x$",
        "$-1$",
        "$0$",
        "$1$",
        "$2$"
      ],
      "rows": [
        [
          "$f(x)$",
          "$7$",
          "$4$",
          "$2$",
          "$-1$"
        ],
        [
          "$f^{\\prime}(x)$",
          "$-2$",
          "$-5$",
          "$-4$",
          "$-3$"
        ]
      ]
    },
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T3.F2.TY1.Q010",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Use the table for a one-to-one differentiable function.  What is $(f^{-1})^{\\prime}(-1)$?",
    "choices": [
      {
        "label": "A",
        "text": "$-3$"
      },
      {
        "label": "B",
        "text": "$-\\frac13$"
      },
      {
        "label": "C",
        "text": "$-\\frac15$"
      },
      {
        "label": "D",
        "text": "$\\frac13$"
      }
    ],
    "answer_label": "B",
    "explanation": "$f(2)=-1$ and $f^{\\prime}(2)=-3$, so the inverse slope at $-1$ is $-1/3$.\n\nA: Uses the original derivative without reciprocating.\nC: Uses the derivative at input 0 rather than input 2.\nD: Omits the negative sign.",
    "representation": "Tabular",
    "figure": {
      "kind": "table",
      "headers": [
        "$x$",
        "$-1$",
        "$0$",
        "$1$",
        "$2$"
      ],
      "rows": [
        [
          "$f(x)$",
          "$7$",
          "$4$",
          "$2$",
          "$-1$"
        ],
        [
          "$f^{\\prime}(x)$",
          "$-2$",
          "$-5$",
          "$-4$",
          "$-3$"
        ]
      ]
    },
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T3.F2.TY2.Q011",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The table gives $y=f(x)$:  What is $\\left.\\frac{dx}{dy}\\right|_{y=7}$?",
    "choices": [
      {
        "label": "A",
        "text": "$-2$"
      },
      {
        "label": "B",
        "text": "$-\\frac12$"
      },
      {
        "label": "C",
        "text": "$\\frac17$"
      },
      {
        "label": "D",
        "text": "$\\frac12$"
      }
    ],
    "answer_label": "B",
    "explanation": "$f(-1)=7$ and $f^{\\prime}(-1)=-2$; hence $dx/dy=-1/2$.\n\nA: Does not take the reciprocal of $dy/dx$.\nC: Uses the output 7 instead of the slope.\nD: Drops the negative sign.",
    "representation": "Tabular",
    "figure": {
      "kind": "table",
      "headers": [
        "$x$",
        "$-1$",
        "$0$",
        "$1$",
        "$2$"
      ],
      "rows": [
        [
          "$f(x)$",
          "$7$",
          "$4$",
          "$2$",
          "$-1$"
        ],
        [
          "$f^{\\prime}(x)$",
          "$-2$",
          "$-5$",
          "$-4$",
          "$-3$"
        ]
      ]
    },
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T3.F2.TY2.Q012",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "The table gives $f$:  Which point lies on $y=f^{-1}(x)$?",
    "choices": [
      {
        "label": "A",
        "text": "$(2,1)$"
      },
      {
        "label": "B",
        "text": "$(7,1)$"
      },
      {
        "label": "C",
        "text": "$(-1,-1)$"
      },
      {
        "label": "D",
        "text": "$(1,2)$"
      }
    ],
    "answer_label": "A",
    "explanation": "Because $f(1)=2$, the inverse passes through $(2,1)$.\n\nB: The table has $f(-1)=7$, not $f(1)=7$.\nC: Because $f(2)=-1$, the inverse point is $(-1,2)$.\nD: This reverses the inverse coordinate order.",
    "representation": "Tabular",
    "figure": {
      "kind": "table",
      "headers": [
        "$x$",
        "$-1$",
        "$0$",
        "$1$",
        "$2$"
      ],
      "rows": [
        [
          "$f(x)$",
          "$7$",
          "$4$",
          "$2$",
          "$-1$"
        ],
        [
          "$f^{\\prime}(x)$",
          "$-2$",
          "$-5$",
          "$-4$",
          "$-3$"
        ]
      ]
    },
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T3.F2.TY3.Q013",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "For the increasing function $g$ and decreasing function $h$, use  Find $(g^{-1})^{\\prime}(6)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\frac12$"
      },
      {
        "label": "B",
        "text": "$\\frac16$"
      },
      {
        "label": "C",
        "text": "$\\frac15$"
      },
      {
        "label": "D",
        "text": "$5$"
      }
    ],
    "answer_label": "C",
    "explanation": "$g(4)=6$ and $g^{\\prime}(4)=5$, so inverse derivative at 6 is $1/5$.\n\nA: Uses $g^{\\prime}(2)$ rather than $g^{\\prime}(4)$.\nB: Uses output 6 rather than the derivative.\nD: Fails to reciprocate the slope.",
    "representation": "Tabular",
    "figure": {
      "kind": "table",
      "headers": [
        "$x$",
        "$1$",
        "$2$",
        "$4$"
      ],
      "rows": [
        [
          "$g(x)$",
          "$1$",
          "$3$",
          "$6$"
        ],
        [
          "$g^{\\prime}(x)$",
          "$3$",
          "$2$",
          "$5$"
        ],
        [
          "$h(x)$",
          "$6$",
          "$4$",
          "$1$"
        ],
        [
          "$h^{\\prime}(x)$",
          "$-1$",
          "$-6$",
          "$-2$"
        ]
      ]
    },
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T3.F2.TY3.Q014",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "For the table  Find $(h^{-1})^{\\prime}(4)$.",
    "choices": [
      {
        "label": "A",
        "text": "$-6$"
      },
      {
        "label": "B",
        "text": "$\\frac16$"
      },
      {
        "label": "C",
        "text": "$-\\frac16$"
      },
      {
        "label": "D",
        "text": "$-\\frac14$"
      }
    ],
    "answer_label": "C",
    "explanation": "$h(2)=4$ and $h^{\\prime}(2)=-6$, hence the inverse slope is $-1/6$.\n\nA: Uses the original derivative rather than its reciprocal.\nB: Drops the negative sign of $h^{\\prime}(2)$.\nD: Uses the output value 4 rather than the derivative.",
    "representation": "Tabular",
    "figure": {
      "kind": "table",
      "headers": [
        "$x$",
        "$1$",
        "$2$",
        "$4$"
      ],
      "rows": [
        [
          "$g(x)$",
          "$1$",
          "$3$",
          "$6$"
        ],
        [
          "$g^{\\prime}(x)$",
          "$3$",
          "$2$",
          "$5$"
        ],
        [
          "$h(x)$",
          "$6$",
          "$4$",
          "$1$"
        ],
        [
          "$h^{\\prime}(x)$",
          "$-1$",
          "$-6$",
          "$-2$"
        ]
      ]
    },
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T3.F2.TY4.Q015",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "The values are given in the table . What is the slope of the tangent to $y=f^{-1}(x)$ at $x=9$?",
    "choices": [
      {
        "label": "A",
        "text": "$7$"
      },
      {
        "label": "B",
        "text": "$\\frac19$"
      },
      {
        "label": "C",
        "text": "$\\frac17$"
      },
      {
        "label": "D",
        "text": "$\\frac12$"
      }
    ],
    "answer_label": "C",
    "explanation": "The preimage of 9 is 2; reciprocal derivative is $1/7$.\n\nA: Uses the derivative of $f$ rather than its inverse.\nB: Takes a reciprocal of the output value rather than the derivative.\nD: Takes a reciprocal of the original input.",
    "representation": "Tabular",
    "figure": {
      "kind": "table",
      "headers": [
        "$x$",
        "$f(x)$",
        "$f^{\\prime}(x)$"
      ],
      "rows": [
        [
          "$2$",
          "$9$",
          "$7$"
        ]
      ]
    },
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T3.F2.TY4.Q016",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The function is one-to-one and its values are . Find $(f^{-1})^{\\prime}(3)+(f^{-1})^{\\prime}(5)$. ",
    "choices": [
      {
        "label": "A",
        "text": "$6$"
      },
      {
        "label": "B",
        "text": "$\\frac12$"
      },
      {
        "label": "C",
        "text": "$\\frac16$"
      },
      {
        "label": "D",
        "text": "$\\frac34$"
      }
    ],
    "answer_label": "D",
    "explanation": "Since $f(1)=3$ and $f(2)=5$, the two inverse slopes are $1/f^{^{\\prime}}(1)=1/2$ and $1/f^{^{\\prime}}(2)=1/4$, which add to $3/4$. \n\nA: Adds the original derivatives instead of their reciprocals.\nB: Uses only the first term.\nC: Uses the reciprocal of the sum instead of the sum of reciprocals.",
    "representation": "Tabular",
    "figure": {
      "kind": "table",
      "headers": [
        "$x$",
        "$f(x)$",
        "$f^{\\prime}(x)$"
      ],
      "rows": [
        [
          "$1$",
          "$3$",
          "$2$"
        ],
        [
          "$2$",
          "$5$",
          "$4$"
        ]
      ]
    },
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T3.F3.TY1.Q017",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "The graph is the line $y=f(x)=2x+1$. What is the slope of $y=f^{-1}(x)$ at $x=3$?",
    "choices": [
      {
        "label": "A",
        "text": "$3$"
      },
      {
        "label": "B",
        "text": "$2$"
      },
      {
        "label": "C",
        "text": "$\\frac12$"
      },
      {
        "label": "D",
        "text": "$\\frac13$"
      }
    ],
    "answer_label": "C",
    "explanation": "$f(1)=3$, $f^{\\prime}(1)=2$, so inverse slope is $1/2$.\n\nA: Uses the inverse input as the slope.\nB: Uses the slope of the original line.\nD: Takes a reciprocal of the output value rather than the derivative.",
    "representation": "Graph",
    "figure": {
      "kind": "graph",
      "window": {
        "xMin": -1,
        "xMax": 4,
        "yMin": -2,
        "yMax": 9
      },
      "curves": [
        {
          "label": "f",
          "points": [
            [
              -1,
              -1
            ],
            [
              -0.958333,
              -0.916667
            ],
            [
              -0.916667,
              -0.833333
            ],
            [
              -0.875,
              -0.75
            ],
            [
              -0.833333,
              -0.666667
            ],
            [
              -0.791667,
              -0.583333
            ],
            [
              -0.75,
              -0.5
            ],
            [
              -0.708333,
              -0.416667
            ],
            [
              -0.666667,
              -0.333333
            ],
            [
              -0.625,
              -0.25
            ],
            [
              -0.583333,
              -0.166667
            ],
            [
              -0.541667,
              -0.083333
            ],
            [
              -0.5,
              0
            ],
            [
              -0.458333,
              0.083333
            ],
            [
              -0.416667,
              0.166667
            ],
            [
              -0.375,
              0.25
            ],
            [
              -0.333333,
              0.333333
            ],
            [
              -0.291667,
              0.416667
            ],
            [
              -0.25,
              0.5
            ],
            [
              -0.208333,
              0.583333
            ],
            [
              -0.166667,
              0.666667
            ],
            [
              -0.125,
              0.75
            ],
            [
              -0.083333,
              0.833333
            ],
            [
              -0.041667,
              0.916667
            ],
            [
              0,
              1
            ],
            [
              0.041667,
              1.083333
            ],
            [
              0.083333,
              1.166667
            ],
            [
              0.125,
              1.25
            ],
            [
              0.166667,
              1.333333
            ],
            [
              0.208333,
              1.416667
            ],
            [
              0.25,
              1.5
            ],
            [
              0.291667,
              1.583333
            ],
            [
              0.333333,
              1.666667
            ],
            [
              0.375,
              1.75
            ],
            [
              0.416667,
              1.833333
            ],
            [
              0.458333,
              1.916667
            ],
            [
              0.5,
              2
            ],
            [
              0.541667,
              2.083333
            ],
            [
              0.583333,
              2.166667
            ],
            [
              0.625,
              2.25
            ],
            [
              0.666667,
              2.333333
            ],
            [
              0.708333,
              2.416667
            ],
            [
              0.75,
              2.5
            ],
            [
              0.791667,
              2.583333
            ],
            [
              0.833333,
              2.666667
            ],
            [
              0.875,
              2.75
            ],
            [
              0.916667,
              2.833333
            ],
            [
              0.958333,
              2.916667
            ],
            [
              1,
              3
            ],
            [
              1.041667,
              3.083333
            ],
            [
              1.083333,
              3.166667
            ],
            [
              1.125,
              3.25
            ],
            [
              1.166667,
              3.333333
            ],
            [
              1.208333,
              3.416667
            ],
            [
              1.25,
              3.5
            ],
            [
              1.291667,
              3.583333
            ],
            [
              1.333333,
              3.666667
            ],
            [
              1.375,
              3.75
            ],
            [
              1.416667,
              3.833333
            ],
            [
              1.458333,
              3.916667
            ],
            [
              1.5,
              4
            ],
            [
              1.541667,
              4.083333
            ],
            [
              1.583333,
              4.166667
            ],
            [
              1.625,
              4.25
            ],
            [
              1.666667,
              4.333333
            ],
            [
              1.708333,
              4.416667
            ],
            [
              1.75,
              4.5
            ],
            [
              1.791667,
              4.583333
            ],
            [
              1.833333,
              4.666667
            ],
            [
              1.875,
              4.75
            ],
            [
              1.916667,
              4.833333
            ],
            [
              1.958333,
              4.916667
            ],
            [
              2,
              5
            ],
            [
              2.041667,
              5.083333
            ],
            [
              2.083333,
              5.166667
            ],
            [
              2.125,
              5.25
            ],
            [
              2.166667,
              5.333333
            ],
            [
              2.208333,
              5.416667
            ],
            [
              2.25,
              5.5
            ],
            [
              2.291667,
              5.583333
            ],
            [
              2.333333,
              5.666667
            ],
            [
              2.375,
              5.75
            ],
            [
              2.416667,
              5.833333
            ],
            [
              2.458333,
              5.916667
            ],
            [
              2.5,
              6
            ],
            [
              2.541667,
              6.083333
            ],
            [
              2.583333,
              6.166667
            ],
            [
              2.625,
              6.25
            ],
            [
              2.666667,
              6.333333
            ],
            [
              2.708333,
              6.416667
            ],
            [
              2.75,
              6.5
            ],
            [
              2.791667,
              6.583333
            ],
            [
              2.833333,
              6.666667
            ],
            [
              2.875,
              6.75
            ],
            [
              2.916667,
              6.833333
            ],
            [
              2.958333,
              6.916667
            ],
            [
              3,
              7
            ],
            [
              3.041667,
              7.083333
            ],
            [
              3.083333,
              7.166667
            ],
            [
              3.125,
              7.25
            ],
            [
              3.166667,
              7.333333
            ],
            [
              3.208333,
              7.416667
            ],
            [
              3.25,
              7.5
            ],
            [
              3.291667,
              7.583333
            ],
            [
              3.333333,
              7.666667
            ],
            [
              3.375,
              7.75
            ],
            [
              3.416667,
              7.833333
            ],
            [
              3.458333,
              7.916667
            ],
            [
              3.5,
              8
            ],
            [
              3.541667,
              8.083333
            ],
            [
              3.583333,
              8.166667
            ],
            [
              3.625,
              8.25
            ],
            [
              3.666667,
              8.333333
            ],
            [
              3.708333,
              8.416667
            ],
            [
              3.75,
              8.5
            ],
            [
              3.791667,
              8.583333
            ],
            [
              3.833333,
              8.666667
            ],
            [
              3.875,
              8.75
            ],
            [
              3.916667,
              8.833333
            ],
            [
              3.958333,
              8.916667
            ],
            [
              4,
              9
            ]
          ],
          "smooth": false
        }
      ],
      "markers": [
        {
          "x": 1,
          "y": 3,
          "label": "f(1)",
          "kind": "closed"
        }
      ]
    },
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T3.F3.TY1.Q018",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The graph shows the line $f(x)=-3x+5$. At which slope does its reflected inverse graph cross the point $(2,1)$?",
    "choices": [
      {
        "label": "A",
        "text": "$-3$"
      },
      {
        "label": "B",
        "text": "$-\\frac13$"
      },
      {
        "label": "C",
        "text": "$3$"
      },
      {
        "label": "D",
        "text": "$\\frac13$"
      }
    ],
    "answer_label": "B",
    "explanation": "$f(1)=2$, so the inverse passes through $(2,1)$; its slope is $1/(-3)=-1/3$.\n\nA: Uses the original slope without reciprocating.\nC: Both fails to reciprocate and loses the negative sign.\nD: Omits the negative sign.",
    "representation": "Graph",
    "figure": {
      "kind": "graph",
      "window": {
        "xMin": -1,
        "xMax": 4,
        "yMin": -6,
        "yMax": 8
      },
      "curves": [
        {
          "label": "f",
          "points": [
            [
              -1,
              8
            ],
            [
              -0.958333,
              7.875
            ],
            [
              -0.916667,
              7.75
            ],
            [
              -0.875,
              7.625
            ],
            [
              -0.833333,
              7.5
            ],
            [
              -0.791667,
              7.375
            ],
            [
              -0.75,
              7.25
            ],
            [
              -0.708333,
              7.125
            ],
            [
              -0.666667,
              7
            ],
            [
              -0.625,
              6.875
            ],
            [
              -0.583333,
              6.75
            ],
            [
              -0.541667,
              6.625
            ],
            [
              -0.5,
              6.5
            ],
            [
              -0.458333,
              6.375
            ],
            [
              -0.416667,
              6.25
            ],
            [
              -0.375,
              6.125
            ],
            [
              -0.333333,
              6
            ],
            [
              -0.291667,
              5.875
            ],
            [
              -0.25,
              5.75
            ],
            [
              -0.208333,
              5.625
            ],
            [
              -0.166667,
              5.5
            ],
            [
              -0.125,
              5.375
            ],
            [
              -0.083333,
              5.25
            ],
            [
              -0.041667,
              5.125
            ],
            [
              0,
              5
            ],
            [
              0.041667,
              4.875
            ],
            [
              0.083333,
              4.75
            ],
            [
              0.125,
              4.625
            ],
            [
              0.166667,
              4.5
            ],
            [
              0.208333,
              4.375
            ],
            [
              0.25,
              4.25
            ],
            [
              0.291667,
              4.125
            ],
            [
              0.333333,
              4
            ],
            [
              0.375,
              3.875
            ],
            [
              0.416667,
              3.75
            ],
            [
              0.458333,
              3.625
            ],
            [
              0.5,
              3.5
            ],
            [
              0.541667,
              3.375
            ],
            [
              0.583333,
              3.25
            ],
            [
              0.625,
              3.125
            ],
            [
              0.666667,
              3
            ],
            [
              0.708333,
              2.875
            ],
            [
              0.75,
              2.75
            ],
            [
              0.791667,
              2.625
            ],
            [
              0.833333,
              2.5
            ],
            [
              0.875,
              2.375
            ],
            [
              0.916667,
              2.25
            ],
            [
              0.958333,
              2.125
            ],
            [
              1,
              2
            ],
            [
              1.041667,
              1.875
            ],
            [
              1.083333,
              1.75
            ],
            [
              1.125,
              1.625
            ],
            [
              1.166667,
              1.5
            ],
            [
              1.208333,
              1.375
            ],
            [
              1.25,
              1.25
            ],
            [
              1.291667,
              1.125
            ],
            [
              1.333333,
              1
            ],
            [
              1.375,
              0.875
            ],
            [
              1.416667,
              0.75
            ],
            [
              1.458333,
              0.625
            ],
            [
              1.5,
              0.5
            ],
            [
              1.541667,
              0.375
            ],
            [
              1.583333,
              0.25
            ],
            [
              1.625,
              0.125
            ],
            [
              1.666667,
              0
            ],
            [
              1.708333,
              -0.125
            ],
            [
              1.75,
              -0.25
            ],
            [
              1.791667,
              -0.375
            ],
            [
              1.833333,
              -0.5
            ],
            [
              1.875,
              -0.625
            ],
            [
              1.916667,
              -0.75
            ],
            [
              1.958333,
              -0.875
            ],
            [
              2,
              -1
            ],
            [
              2.041667,
              -1.125
            ],
            [
              2.083333,
              -1.25
            ],
            [
              2.125,
              -1.375
            ],
            [
              2.166667,
              -1.5
            ],
            [
              2.208333,
              -1.625
            ],
            [
              2.25,
              -1.75
            ],
            [
              2.291667,
              -1.875
            ],
            [
              2.333333,
              -2
            ],
            [
              2.375,
              -2.125
            ],
            [
              2.416667,
              -2.25
            ],
            [
              2.458333,
              -2.375
            ],
            [
              2.5,
              -2.5
            ],
            [
              2.541667,
              -2.625
            ],
            [
              2.583333,
              -2.75
            ],
            [
              2.625,
              -2.875
            ],
            [
              2.666667,
              -3
            ],
            [
              2.708333,
              -3.125
            ],
            [
              2.75,
              -3.25
            ],
            [
              2.791667,
              -3.375
            ],
            [
              2.833333,
              -3.5
            ],
            [
              2.875,
              -3.625
            ],
            [
              2.916667,
              -3.75
            ],
            [
              2.958333,
              -3.875
            ],
            [
              3,
              -4
            ],
            [
              3.041667,
              -4.125
            ],
            [
              3.083333,
              -4.25
            ],
            [
              3.125,
              -4.375
            ],
            [
              3.166667,
              -4.5
            ],
            [
              3.208333,
              -4.625
            ],
            [
              3.25,
              -4.75
            ],
            [
              3.291667,
              -4.875
            ],
            [
              3.333333,
              -5
            ],
            [
              3.375,
              -5.125
            ],
            [
              3.416667,
              -5.25
            ],
            [
              3.458333,
              -5.375
            ],
            [
              3.5,
              -5.5
            ],
            [
              3.541667,
              -5.625
            ],
            [
              3.583333,
              -5.75
            ],
            [
              3.625,
              -5.875
            ],
            [
              3.666667,
              -6
            ],
            [
              3.708333,
              -6.125
            ],
            [
              3.75,
              -6.25
            ],
            [
              3.791667,
              -6.375
            ],
            [
              3.833333,
              -6.5
            ],
            [
              3.875,
              -6.625
            ],
            [
              3.916667,
              -6.75
            ],
            [
              3.958333,
              -6.875
            ],
            [
              4,
              -7
            ]
          ],
          "smooth": false
        }
      ],
      "markers": [
        {
          "x": 1,
          "y": 2,
          "label": "f(1)",
          "kind": "closed"
        }
      ]
    },
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T3.F3.TY2.Q019",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The graph of $f(x)=x^3+x$ passes through $(1,2)$. What is the slope of $f^{-1}$ at $(2,1)$?",
    "choices": [
      {
        "label": "A",
        "text": "$\\frac13$"
      },
      {
        "label": "B",
        "text": "$\\frac14$"
      },
      {
        "label": "C",
        "text": "$4$"
      },
      {
        "label": "D",
        "text": "$\\frac12$"
      }
    ],
    "answer_label": "B",
    "explanation": "$f^{\\prime}(1)=3(1)^2+1=4$. The inverse tangent slope is $1/4$.\n\nA: Differentiates only the $x^3$ term and ignores $x$.\nC: Uses $f^{\\prime}(1)=4$ without reciprocating.\nD: Uses the output $f(1)=2$ instead of the derivative.",
    "representation": "Graph",
    "figure": {
      "kind": "graph",
      "window": {
        "xMin": -2,
        "xMax": 2,
        "yMin": -5,
        "yMax": 5
      },
      "curves": [
        {
          "label": "f",
          "points": [
            [
              -2,
              -10
            ],
            [
              -1.966667,
              -9.573296
            ],
            [
              -1.933333,
              -9.159704
            ],
            [
              -1.9,
              -8.759
            ],
            [
              -1.866667,
              -8.370963
            ],
            [
              -1.833333,
              -7.99537
            ],
            [
              -1.8,
              -7.632
            ],
            [
              -1.766667,
              -7.28063
            ],
            [
              -1.733333,
              -6.941037
            ],
            [
              -1.7,
              -6.613
            ],
            [
              -1.666667,
              -6.296296
            ],
            [
              -1.633333,
              -5.990704
            ],
            [
              -1.6,
              -5.696
            ],
            [
              -1.566667,
              -5.411963
            ],
            [
              -1.533333,
              -5.13837
            ],
            [
              -1.5,
              -4.875
            ],
            [
              -1.466667,
              -4.62163
            ],
            [
              -1.433333,
              -4.378037
            ],
            [
              -1.4,
              -4.144
            ],
            [
              -1.366667,
              -3.919296
            ],
            [
              -1.333333,
              -3.703704
            ],
            [
              -1.3,
              -3.497
            ],
            [
              -1.266667,
              -3.298963
            ],
            [
              -1.233333,
              -3.10937
            ],
            [
              -1.2,
              -2.928
            ],
            [
              -1.166667,
              -2.75463
            ],
            [
              -1.133333,
              -2.589037
            ],
            [
              -1.1,
              -2.431
            ],
            [
              -1.066667,
              -2.280296
            ],
            [
              -1.033333,
              -2.136704
            ],
            [
              -1,
              -2
            ],
            [
              -0.966667,
              -1.869963
            ],
            [
              -0.933333,
              -1.74637
            ],
            [
              -0.9,
              -1.629
            ],
            [
              -0.866667,
              -1.51763
            ],
            [
              -0.833333,
              -1.412037
            ],
            [
              -0.8,
              -1.312
            ],
            [
              -0.766667,
              -1.217296
            ],
            [
              -0.733333,
              -1.127704
            ],
            [
              -0.7,
              -1.043
            ],
            [
              -0.666667,
              -0.962963
            ],
            [
              -0.633333,
              -0.88737
            ],
            [
              -0.6,
              -0.816
            ],
            [
              -0.566667,
              -0.74863
            ],
            [
              -0.533333,
              -0.685037
            ],
            [
              -0.5,
              -0.625
            ],
            [
              -0.466667,
              -0.568296
            ],
            [
              -0.433333,
              -0.514704
            ],
            [
              -0.4,
              -0.464
            ],
            [
              -0.366667,
              -0.415963
            ],
            [
              -0.333333,
              -0.37037
            ],
            [
              -0.3,
              -0.327
            ],
            [
              -0.266667,
              -0.28563
            ],
            [
              -0.233333,
              -0.246037
            ],
            [
              -0.2,
              -0.208
            ],
            [
              -0.166667,
              -0.171296
            ],
            [
              -0.133333,
              -0.135704
            ],
            [
              -0.1,
              -0.101
            ],
            [
              -0.066667,
              -0.066963
            ],
            [
              -0.033333,
              -0.03337
            ],
            [
              0,
              0
            ],
            [
              0.033333,
              0.03337
            ],
            [
              0.066667,
              0.066963
            ],
            [
              0.1,
              0.101
            ],
            [
              0.133333,
              0.135704
            ],
            [
              0.166667,
              0.171296
            ],
            [
              0.2,
              0.208
            ],
            [
              0.233333,
              0.246037
            ],
            [
              0.266667,
              0.28563
            ],
            [
              0.3,
              0.327
            ],
            [
              0.333333,
              0.37037
            ],
            [
              0.366667,
              0.415963
            ],
            [
              0.4,
              0.464
            ],
            [
              0.433333,
              0.514704
            ],
            [
              0.466667,
              0.568296
            ],
            [
              0.5,
              0.625
            ],
            [
              0.533333,
              0.685037
            ],
            [
              0.566667,
              0.74863
            ],
            [
              0.6,
              0.816
            ],
            [
              0.633333,
              0.88737
            ],
            [
              0.666667,
              0.962963
            ],
            [
              0.7,
              1.043
            ],
            [
              0.733333,
              1.127704
            ],
            [
              0.766667,
              1.217296
            ],
            [
              0.8,
              1.312
            ],
            [
              0.833333,
              1.412037
            ],
            [
              0.866667,
              1.51763
            ],
            [
              0.9,
              1.629
            ],
            [
              0.933333,
              1.74637
            ],
            [
              0.966667,
              1.869963
            ],
            [
              1,
              2
            ],
            [
              1.033333,
              2.136704
            ],
            [
              1.066667,
              2.280296
            ],
            [
              1.1,
              2.431
            ],
            [
              1.133333,
              2.589037
            ],
            [
              1.166667,
              2.75463
            ],
            [
              1.2,
              2.928
            ],
            [
              1.233333,
              3.10937
            ],
            [
              1.266667,
              3.298963
            ],
            [
              1.3,
              3.497
            ],
            [
              1.333333,
              3.703704
            ],
            [
              1.366667,
              3.919296
            ],
            [
              1.4,
              4.144
            ],
            [
              1.433333,
              4.378037
            ],
            [
              1.466667,
              4.62163
            ],
            [
              1.5,
              4.875
            ],
            [
              1.533333,
              5.13837
            ],
            [
              1.566667,
              5.411963
            ],
            [
              1.6,
              5.696
            ],
            [
              1.633333,
              5.990704
            ],
            [
              1.666667,
              6.296296
            ],
            [
              1.7,
              6.613
            ],
            [
              1.733333,
              6.941037
            ],
            [
              1.766667,
              7.28063
            ],
            [
              1.8,
              7.632
            ],
            [
              1.833333,
              7.99537
            ],
            [
              1.866667,
              8.370963
            ],
            [
              1.9,
              8.759
            ],
            [
              1.933333,
              9.159704
            ],
            [
              1.966667,
              9.573296
            ],
            [
              2,
              10
            ]
          ],
          "smooth": false
        }
      ],
      "markers": [
        {
          "x": 1,
          "y": 2,
          "label": "(1,2)",
          "kind": "closed"
        }
      ]
    },
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T3.F3.TY2.Q020",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The graph is $f(x)=x^3$, passing through $(2,8)$. Find the tangent slope of $f^{-1}$ at $(8,2)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\frac18$"
      },
      {
        "label": "B",
        "text": "$\\frac13$"
      },
      {
        "label": "C",
        "text": "$12$"
      },
      {
        "label": "D",
        "text": "$\\frac1{12}$"
      }
    ],
    "answer_label": "D",
    "explanation": "$f^{\\prime}(2)=12$ and $f^{-1}(8)=2$.\n\nA: Uses the output 8 instead of the derivative.\nB: Omits the factor $x^2$ in the derivative of $x^3$.\nC: Uses the original derivative $3(2)^2$.",
    "representation": "Graph",
    "figure": {
      "kind": "graph",
      "window": {
        "xMin": -2.5,
        "xMax": 2.5,
        "yMin": -10,
        "yMax": 10
      },
      "curves": [
        {
          "label": "f",
          "points": [
            [
              -2.5,
              -15.625
            ],
            [
              -2.458333,
              -14.856698
            ],
            [
              -2.416667,
              -14.114005
            ],
            [
              -2.375,
              -13.396484
            ],
            [
              -2.333333,
              -12.703704
            ],
            [
              -2.291667,
              -12.035229
            ],
            [
              -2.25,
              -11.390625
            ],
            [
              -2.208333,
              -10.769459
            ],
            [
              -2.166667,
              -10.171296
            ],
            [
              -2.125,
              -9.595703
            ],
            [
              -2.083333,
              -9.042245
            ],
            [
              -2.041667,
              -8.510489
            ],
            [
              -2,
              -8
            ],
            [
              -1.958333,
              -7.510344
            ],
            [
              -1.916667,
              -7.041088
            ],
            [
              -1.875,
              -6.591797
            ],
            [
              -1.833333,
              -6.162037
            ],
            [
              -1.791667,
              -5.751374
            ],
            [
              -1.75,
              -5.359375
            ],
            [
              -1.708333,
              -4.985605
            ],
            [
              -1.666667,
              -4.62963
            ],
            [
              -1.625,
              -4.291016
            ],
            [
              -1.583333,
              -3.969329
            ],
            [
              -1.541667,
              -3.664135
            ],
            [
              -1.5,
              -3.375
            ],
            [
              -1.458333,
              -3.10149
            ],
            [
              -1.416667,
              -2.843171
            ],
            [
              -1.375,
              -2.599609
            ],
            [
              -1.333333,
              -2.37037
            ],
            [
              -1.291667,
              -2.15502
            ],
            [
              -1.25,
              -1.953125
            ],
            [
              -1.208333,
              -1.764251
            ],
            [
              -1.166667,
              -1.587963
            ],
            [
              -1.125,
              -1.423828
            ],
            [
              -1.083333,
              -1.271412
            ],
            [
              -1.041667,
              -1.130281
            ],
            [
              -1,
              -1
            ],
            [
              -0.958333,
              -0.880136
            ],
            [
              -0.916667,
              -0.770255
            ],
            [
              -0.875,
              -0.669922
            ],
            [
              -0.833333,
              -0.578704
            ],
            [
              -0.791667,
              -0.496166
            ],
            [
              -0.75,
              -0.421875
            ],
            [
              -0.708333,
              -0.355396
            ],
            [
              -0.666667,
              -0.296296
            ],
            [
              -0.625,
              -0.244141
            ],
            [
              -0.583333,
              -0.198495
            ],
            [
              -0.541667,
              -0.158927
            ],
            [
              -0.5,
              -0.125
            ],
            [
              -0.458333,
              -0.096282
            ],
            [
              -0.416667,
              -0.072338
            ],
            [
              -0.375,
              -0.052734
            ],
            [
              -0.333333,
              -0.037037
            ],
            [
              -0.291667,
              -0.024812
            ],
            [
              -0.25,
              -0.015625
            ],
            [
              -0.208333,
              -0.009042
            ],
            [
              -0.166667,
              -0.00463
            ],
            [
              -0.125,
              -0.001953
            ],
            [
              -0.083333,
              -0.000579
            ],
            [
              -0.041667,
              -0.000072
            ],
            [
              0,
              0
            ],
            [
              0.041667,
              0.000072
            ],
            [
              0.083333,
              0.000579
            ],
            [
              0.125,
              0.001953
            ],
            [
              0.166667,
              0.00463
            ],
            [
              0.208333,
              0.009042
            ],
            [
              0.25,
              0.015625
            ],
            [
              0.291667,
              0.024812
            ],
            [
              0.333333,
              0.037037
            ],
            [
              0.375,
              0.052734
            ],
            [
              0.416667,
              0.072338
            ],
            [
              0.458333,
              0.096282
            ],
            [
              0.5,
              0.125
            ],
            [
              0.541667,
              0.158927
            ],
            [
              0.583333,
              0.198495
            ],
            [
              0.625,
              0.244141
            ],
            [
              0.666667,
              0.296296
            ],
            [
              0.708333,
              0.355396
            ],
            [
              0.75,
              0.421875
            ],
            [
              0.791667,
              0.496166
            ],
            [
              0.833333,
              0.578704
            ],
            [
              0.875,
              0.669922
            ],
            [
              0.916667,
              0.770255
            ],
            [
              0.958333,
              0.880136
            ],
            [
              1,
              1
            ],
            [
              1.041667,
              1.130281
            ],
            [
              1.083333,
              1.271412
            ],
            [
              1.125,
              1.423828
            ],
            [
              1.166667,
              1.587963
            ],
            [
              1.208333,
              1.764251
            ],
            [
              1.25,
              1.953125
            ],
            [
              1.291667,
              2.15502
            ],
            [
              1.333333,
              2.37037
            ],
            [
              1.375,
              2.599609
            ],
            [
              1.416667,
              2.843171
            ],
            [
              1.458333,
              3.10149
            ],
            [
              1.5,
              3.375
            ],
            [
              1.541667,
              3.664135
            ],
            [
              1.583333,
              3.969329
            ],
            [
              1.625,
              4.291016
            ],
            [
              1.666667,
              4.62963
            ],
            [
              1.708333,
              4.985605
            ],
            [
              1.75,
              5.359375
            ],
            [
              1.791667,
              5.751374
            ],
            [
              1.833333,
              6.162037
            ],
            [
              1.875,
              6.591797
            ],
            [
              1.916667,
              7.041088
            ],
            [
              1.958333,
              7.510344
            ],
            [
              2,
              8
            ],
            [
              2.041667,
              8.510489
            ],
            [
              2.083333,
              9.042245
            ],
            [
              2.125,
              9.595703
            ],
            [
              2.166667,
              10.171296
            ],
            [
              2.208333,
              10.769459
            ],
            [
              2.25,
              11.390625
            ],
            [
              2.291667,
              12.035229
            ],
            [
              2.333333,
              12.703704
            ],
            [
              2.375,
              13.396484
            ],
            [
              2.416667,
              14.114005
            ],
            [
              2.458333,
              14.856698
            ],
            [
              2.5,
              15.625
            ]
          ],
          "smooth": false
        }
      ],
      "markers": [
        {
          "x": 2,
          "y": 8,
          "label": "(2,8)",
          "kind": "closed"
        }
      ]
    },
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T3.F3.TY3.Q021",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "On the graph of $f(x)=x^3$, the tangent is horizontal at the origin. What happens to the slope of the inverse graph $y=\\sqrt[3]{x}$ at the origin?",
    "choices": [
      {
        "label": "A",
        "text": "The inverse graph is discontinuous at the origin."
      },
      {
        "label": "B",
        "text": "It is vertical; the inverse derivative is not finite there."
      },
      {
        "label": "C",
        "text": "It is one because both graphs pass through the origin."
      },
      {
        "label": "D",
        "text": "It is zero because the original slope is zero."
      }
    ],
    "answer_label": "B",
    "explanation": "The inverse swaps horizontal and vertical tangents: $(x^3)^{\\prime}(0)=0$ and $(\\sqrt[3]{x})^{\\prime}(0)$ is not finite.\n\nA: The cube-root function is continuous at 0.\nC: Passing through the origin does not imply slope 1.\nD: A reciprocal of a zero slope is not zero.",
    "representation": "Graph",
    "figure": {
      "kind": "graph",
      "window": {
        "xMin": -2,
        "xMax": 2,
        "yMin": -6,
        "yMax": 6
      },
      "curves": [
        {
          "label": "f",
          "points": [
            [
              -2,
              -8
            ],
            [
              -1.966667,
              -7.60663
            ],
            [
              -1.933333,
              -7.22637
            ],
            [
              -1.9,
              -6.859
            ],
            [
              -1.866667,
              -6.504296
            ],
            [
              -1.833333,
              -6.162037
            ],
            [
              -1.8,
              -5.832
            ],
            [
              -1.766667,
              -5.513963
            ],
            [
              -1.733333,
              -5.207704
            ],
            [
              -1.7,
              -4.913
            ],
            [
              -1.666667,
              -4.62963
            ],
            [
              -1.633333,
              -4.35737
            ],
            [
              -1.6,
              -4.096
            ],
            [
              -1.566667,
              -3.845296
            ],
            [
              -1.533333,
              -3.605037
            ],
            [
              -1.5,
              -3.375
            ],
            [
              -1.466667,
              -3.154963
            ],
            [
              -1.433333,
              -2.944704
            ],
            [
              -1.4,
              -2.744
            ],
            [
              -1.366667,
              -2.55263
            ],
            [
              -1.333333,
              -2.37037
            ],
            [
              -1.3,
              -2.197
            ],
            [
              -1.266667,
              -2.032296
            ],
            [
              -1.233333,
              -1.876037
            ],
            [
              -1.2,
              -1.728
            ],
            [
              -1.166667,
              -1.587963
            ],
            [
              -1.133333,
              -1.455704
            ],
            [
              -1.1,
              -1.331
            ],
            [
              -1.066667,
              -1.21363
            ],
            [
              -1.033333,
              -1.10337
            ],
            [
              -1,
              -1
            ],
            [
              -0.966667,
              -0.903296
            ],
            [
              -0.933333,
              -0.813037
            ],
            [
              -0.9,
              -0.729
            ],
            [
              -0.866667,
              -0.650963
            ],
            [
              -0.833333,
              -0.578704
            ],
            [
              -0.8,
              -0.512
            ],
            [
              -0.766667,
              -0.45063
            ],
            [
              -0.733333,
              -0.39437
            ],
            [
              -0.7,
              -0.343
            ],
            [
              -0.666667,
              -0.296296
            ],
            [
              -0.633333,
              -0.254037
            ],
            [
              -0.6,
              -0.216
            ],
            [
              -0.566667,
              -0.181963
            ],
            [
              -0.533333,
              -0.151704
            ],
            [
              -0.5,
              -0.125
            ],
            [
              -0.466667,
              -0.10163
            ],
            [
              -0.433333,
              -0.08137
            ],
            [
              -0.4,
              -0.064
            ],
            [
              -0.366667,
              -0.049296
            ],
            [
              -0.333333,
              -0.037037
            ],
            [
              -0.3,
              -0.027
            ],
            [
              -0.266667,
              -0.018963
            ],
            [
              -0.233333,
              -0.012704
            ],
            [
              -0.2,
              -0.008
            ],
            [
              -0.166667,
              -0.00463
            ],
            [
              -0.133333,
              -0.00237
            ],
            [
              -0.1,
              -0.001
            ],
            [
              -0.066667,
              -0.000296
            ],
            [
              -0.033333,
              -0.000037
            ],
            [
              0,
              0
            ],
            [
              0.033333,
              0.000037
            ],
            [
              0.066667,
              0.000296
            ],
            [
              0.1,
              0.001
            ],
            [
              0.133333,
              0.00237
            ],
            [
              0.166667,
              0.00463
            ],
            [
              0.2,
              0.008
            ],
            [
              0.233333,
              0.012704
            ],
            [
              0.266667,
              0.018963
            ],
            [
              0.3,
              0.027
            ],
            [
              0.333333,
              0.037037
            ],
            [
              0.366667,
              0.049296
            ],
            [
              0.4,
              0.064
            ],
            [
              0.433333,
              0.08137
            ],
            [
              0.466667,
              0.10163
            ],
            [
              0.5,
              0.125
            ],
            [
              0.533333,
              0.151704
            ],
            [
              0.566667,
              0.181963
            ],
            [
              0.6,
              0.216
            ],
            [
              0.633333,
              0.254037
            ],
            [
              0.666667,
              0.296296
            ],
            [
              0.7,
              0.343
            ],
            [
              0.733333,
              0.39437
            ],
            [
              0.766667,
              0.45063
            ],
            [
              0.8,
              0.512
            ],
            [
              0.833333,
              0.578704
            ],
            [
              0.866667,
              0.650963
            ],
            [
              0.9,
              0.729
            ],
            [
              0.933333,
              0.813037
            ],
            [
              0.966667,
              0.903296
            ],
            [
              1,
              1
            ],
            [
              1.033333,
              1.10337
            ],
            [
              1.066667,
              1.21363
            ],
            [
              1.1,
              1.331
            ],
            [
              1.133333,
              1.455704
            ],
            [
              1.166667,
              1.587963
            ],
            [
              1.2,
              1.728
            ],
            [
              1.233333,
              1.876037
            ],
            [
              1.266667,
              2.032296
            ],
            [
              1.3,
              2.197
            ],
            [
              1.333333,
              2.37037
            ],
            [
              1.366667,
              2.55263
            ],
            [
              1.4,
              2.744
            ],
            [
              1.433333,
              2.944704
            ],
            [
              1.466667,
              3.154963
            ],
            [
              1.5,
              3.375
            ],
            [
              1.533333,
              3.605037
            ],
            [
              1.566667,
              3.845296
            ],
            [
              1.6,
              4.096
            ],
            [
              1.633333,
              4.35737
            ],
            [
              1.666667,
              4.62963
            ],
            [
              1.7,
              4.913
            ],
            [
              1.733333,
              5.207704
            ],
            [
              1.766667,
              5.513963
            ],
            [
              1.8,
              5.832
            ],
            [
              1.833333,
              6.162037
            ],
            [
              1.866667,
              6.504296
            ],
            [
              1.9,
              6.859
            ],
            [
              1.933333,
              7.22637
            ],
            [
              1.966667,
              7.60663
            ],
            [
              2,
              8
            ]
          ],
          "smooth": false
        }
      ],
      "markers": [
        {
          "x": 0,
          "y": 0,
          "label": "O",
          "kind": "closed"
        }
      ]
    },
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T3.F3.TY3.Q022",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The strictly decreasing graph $f(x)=5-x^3$ passes through $(1,4)$. What is the inverse derivative at $x=4$?",
    "choices": [
      {
        "label": "A",
        "text": "$-\\frac14$"
      },
      {
        "label": "B",
        "text": "$-3$"
      },
      {
        "label": "C",
        "text": "$-\\frac13$"
      },
      {
        "label": "D",
        "text": "$\\frac13$"
      }
    ],
    "answer_label": "C",
    "explanation": "$f^{\\prime}(1)=-3$, so $(f^{-1})^{\\prime}(4)=-1/3$.\n\nA: Uses the inverse input 4 instead of $f^{\\prime}(1)$.\nB: Uses the original slope without taking a reciprocal.\nD: Omits the negative sign of $f^{\\prime}(1)$.",
    "representation": "Graph",
    "figure": {
      "kind": "graph",
      "window": {
        "xMin": -1,
        "xMax": 3,
        "yMin": -5,
        "yMax": 10
      },
      "curves": [
        {
          "label": "f",
          "points": [
            [
              -1,
              6
            ],
            [
              -0.966667,
              5.903296
            ],
            [
              -0.933333,
              5.813037
            ],
            [
              -0.9,
              5.729
            ],
            [
              -0.866667,
              5.650963
            ],
            [
              -0.833333,
              5.578704
            ],
            [
              -0.8,
              5.512
            ],
            [
              -0.766667,
              5.45063
            ],
            [
              -0.733333,
              5.39437
            ],
            [
              -0.7,
              5.343
            ],
            [
              -0.666667,
              5.296296
            ],
            [
              -0.633333,
              5.254037
            ],
            [
              -0.6,
              5.216
            ],
            [
              -0.566667,
              5.181963
            ],
            [
              -0.533333,
              5.151704
            ],
            [
              -0.5,
              5.125
            ],
            [
              -0.466667,
              5.10163
            ],
            [
              -0.433333,
              5.08137
            ],
            [
              -0.4,
              5.064
            ],
            [
              -0.366667,
              5.049296
            ],
            [
              -0.333333,
              5.037037
            ],
            [
              -0.3,
              5.027
            ],
            [
              -0.266667,
              5.018963
            ],
            [
              -0.233333,
              5.012704
            ],
            [
              -0.2,
              5.008
            ],
            [
              -0.166667,
              5.00463
            ],
            [
              -0.133333,
              5.00237
            ],
            [
              -0.1,
              5.001
            ],
            [
              -0.066667,
              5.000296
            ],
            [
              -0.033333,
              5.000037
            ],
            [
              0,
              5
            ],
            [
              0.033333,
              4.999963
            ],
            [
              0.066667,
              4.999704
            ],
            [
              0.1,
              4.999
            ],
            [
              0.133333,
              4.99763
            ],
            [
              0.166667,
              4.99537
            ],
            [
              0.2,
              4.992
            ],
            [
              0.233333,
              4.987296
            ],
            [
              0.266667,
              4.981037
            ],
            [
              0.3,
              4.973
            ],
            [
              0.333333,
              4.962963
            ],
            [
              0.366667,
              4.950704
            ],
            [
              0.4,
              4.936
            ],
            [
              0.433333,
              4.91863
            ],
            [
              0.466667,
              4.89837
            ],
            [
              0.5,
              4.875
            ],
            [
              0.533333,
              4.848296
            ],
            [
              0.566667,
              4.818037
            ],
            [
              0.6,
              4.784
            ],
            [
              0.633333,
              4.745963
            ],
            [
              0.666667,
              4.703704
            ],
            [
              0.7,
              4.657
            ],
            [
              0.733333,
              4.60563
            ],
            [
              0.766667,
              4.54937
            ],
            [
              0.8,
              4.488
            ],
            [
              0.833333,
              4.421296
            ],
            [
              0.866667,
              4.349037
            ],
            [
              0.9,
              4.271
            ],
            [
              0.933333,
              4.186963
            ],
            [
              0.966667,
              4.096704
            ],
            [
              1,
              4
            ],
            [
              1.033333,
              3.89663
            ],
            [
              1.066667,
              3.78637
            ],
            [
              1.1,
              3.669
            ],
            [
              1.133333,
              3.544296
            ],
            [
              1.166667,
              3.412037
            ],
            [
              1.2,
              3.272
            ],
            [
              1.233333,
              3.123963
            ],
            [
              1.266667,
              2.967704
            ],
            [
              1.3,
              2.803
            ],
            [
              1.333333,
              2.62963
            ],
            [
              1.366667,
              2.44737
            ],
            [
              1.4,
              2.256
            ],
            [
              1.433333,
              2.055296
            ],
            [
              1.466667,
              1.845037
            ],
            [
              1.5,
              1.625
            ],
            [
              1.533333,
              1.394963
            ],
            [
              1.566667,
              1.154704
            ],
            [
              1.6,
              0.904
            ],
            [
              1.633333,
              0.64263
            ],
            [
              1.666667,
              0.37037
            ],
            [
              1.7,
              0.087
            ],
            [
              1.733333,
              -0.207704
            ],
            [
              1.766667,
              -0.513963
            ],
            [
              1.8,
              -0.832
            ],
            [
              1.833333,
              -1.162037
            ],
            [
              1.866667,
              -1.504296
            ],
            [
              1.9,
              -1.859
            ],
            [
              1.933333,
              -2.22637
            ],
            [
              1.966667,
              -2.60663
            ],
            [
              2,
              -3
            ],
            [
              2.033333,
              -3.406704
            ],
            [
              2.066667,
              -3.826963
            ],
            [
              2.1,
              -4.261
            ],
            [
              2.133333,
              -4.709037
            ],
            [
              2.166667,
              -5.171296
            ],
            [
              2.2,
              -5.648
            ],
            [
              2.233333,
              -6.13937
            ],
            [
              2.266667,
              -6.64563
            ],
            [
              2.3,
              -7.167
            ],
            [
              2.333333,
              -7.703704
            ],
            [
              2.366667,
              -8.255963
            ],
            [
              2.4,
              -8.824
            ],
            [
              2.433333,
              -9.408037
            ],
            [
              2.466667,
              -10.008296
            ],
            [
              2.5,
              -10.625
            ],
            [
              2.533333,
              -11.25837
            ],
            [
              2.566667,
              -11.90863
            ],
            [
              2.6,
              -12.576
            ],
            [
              2.633333,
              -13.260704
            ],
            [
              2.666667,
              -13.962963
            ],
            [
              2.7,
              -14.683
            ],
            [
              2.733333,
              -15.421037
            ],
            [
              2.766667,
              -16.177296
            ],
            [
              2.8,
              -16.952
            ],
            [
              2.833333,
              -17.74537
            ],
            [
              2.866667,
              -18.55763
            ],
            [
              2.9,
              -19.389
            ],
            [
              2.933333,
              -20.239704
            ],
            [
              2.966667,
              -21.109963
            ],
            [
              3,
              -22
            ]
          ],
          "smooth": false
        }
      ],
      "markers": [
        {
          "x": 1,
          "y": 4,
          "label": "(1,4)",
          "kind": "closed"
        }
      ]
    },
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T3.F4.TY1.Q023",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "If $f(x)=3x+2$, find $(f^{-1})^{\\prime}(11)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\frac13$"
      },
      {
        "label": "B",
        "text": "$\\frac1{11}$"
      },
      {
        "label": "C",
        "text": "$\\frac19$"
      },
      {
        "label": "D",
        "text": "$3$"
      }
    ],
    "answer_label": "A",
    "explanation": "For an affine function of slope 3, the inverse slope is $1/3$ everywhere.\n\nB: Uses the inverse input rather than the original slope.\nC: Takes the reciprocal of the preimage $f^{-1}(11)=3$.\nD: Uses the original linear slope.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T3.F4.TY1.Q024",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "If $f(x)=x^3+1$, find $(f^{-1})^{\\prime}(9)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\frac1{12}$"
      },
      {
        "label": "B",
        "text": "$\\frac19$"
      },
      {
        "label": "C",
        "text": "$12$"
      },
      {
        "label": "D",
        "text": "$\\frac13$"
      }
    ],
    "answer_label": "A",
    "explanation": "$f(2)=9$ and $f^{\\prime}(2)=3(2)^2=12$.\n\nB: Uses the output 9 rather than $f^{\\prime}(2)$.\nC: Uses the original derivative.\nD: Forgets to evaluate $3x^2$ at $x=2$.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T3.F4.TY2.Q025",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "medium",
    "calculator": true,
    "prompt": "Let $f(x)=x^3+x$. Using numerical methods, approximate $(f^{-1})^{^{\\prime}}(7)$ to three decimal places.",
    "choices": [
      {
        "label": "A",
        "text": "$0.333$"
      },
      {
        "label": "B",
        "text": "$0.099$"
      },
      {
        "label": "C",
        "text": "$10.074$"
      },
      {
        "label": "D",
        "text": "$0.143$"
      }
    ],
    "answer_label": "B",
    "explanation": "Solve $a^3+a=7$ numerically to obtain $a\\approx1.739204$. Then $(f^{-1})^{^{\\prime}}(7)=1/(3a^2+1)\\approx0.099261\\approx0.099$.\n\nA: Uses the exponent 3 instead of solving for the preimage.\nC: Uses the original slope rather than its reciprocal.\nD: Takes the reciprocal of the inverse input 7 rather than the derivative.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T3.F4.TY2.Q026",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "For $f(x)=e^x+2$, what is $(f^{-1})^{\\prime}(3)$?",
    "choices": [
      {
        "label": "A",
        "text": "$\\frac13$"
      },
      {
        "label": "B",
        "text": "$e^3$"
      },
      {
        "label": "C",
        "text": "$0$"
      },
      {
        "label": "D",
        "text": "$1$"
      }
    ],
    "answer_label": "D",
    "explanation": "$f(0)=3$, $f^{\\prime}(0)=1$, so inverse derivative is 1.\n\nA: Takes the reciprocal of the target output 3.\nB: Differentiates an exponential at the inverse input instead of its preimage.\nC: Uses the preimage $f^{-1}(3)=0$ as a derivative.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T3.F4.TY3.Q027",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "For $f(x)=\\ln x+4$ with $x>0$, find $(f^{-1})^{\\prime}(4)$.",
    "choices": [
      {
        "label": "A",
        "text": "$e^4$"
      },
      {
        "label": "B",
        "text": "$0$"
      },
      {
        "label": "C",
        "text": "$1$"
      },
      {
        "label": "D",
        "text": "$\\frac14$"
      }
    ],
    "answer_label": "C",
    "explanation": "$f(1)=4$, $f^{\\prime}(1)=1$, so the inverse derivative is 1.\n\nA: Incorrectly treats the inverse as $e^x$ instead of $e^{x-4}$.\nB: Assumes a logarithm derivative at $x=0$ rather than preimage $x=1$.\nD: Reciprocates the target output 4.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T3.F4.TY3.Q028",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Let $f(x)=x^2+1$ for $x\\ge0$. Find $(f^{-1})^{\\prime}(10)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\frac16$"
      },
      {
        "label": "B",
        "text": "$\\frac13$"
      },
      {
        "label": "C",
        "text": "$6$"
      },
      {
        "label": "D",
        "text": "$\\frac1{10}$"
      }
    ],
    "answer_label": "A",
    "explanation": "$f(3)=10$ and $f^{\\prime}(3)=6$.\n\nB: Forgets the 2 in $f^{\\prime}(x)=2x$.\nC: Uses $f^{\\prime}(3)$ without reciprocating.\nD: Uses the output rather than the derivative.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T3.F4.TY4.Q029",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "For $f(x)=1/x$ on $x>0$, find $(f^{-1})^{\\prime}(2)$.",
    "choices": [
      {
        "label": "A",
        "text": "$-\\frac14$"
      },
      {
        "label": "B",
        "text": "$-4$"
      },
      {
        "label": "C",
        "text": "$-\\frac12$"
      },
      {
        "label": "D",
        "text": "$\\frac14$"
      }
    ],
    "answer_label": "A",
    "explanation": "Since $f^{-1}(x)=1/x$, its derivative at 2 is $-1/4$.\n\nB: Uses the derivative at the preimage without inversion.\nC: Differentiates $1/x$ as $-1/x$ rather than $-1/x^2$.\nD: Loses the negative sign.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T3.F5.TY1.Q030",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Let $g(x)=f^{-1}(2x+1)$, where $f(3)=5$ and $f'(3)=4$. Which procedure correctly finds $g'(2)$?",
    "choices": [
      {
        "label": "A",
        "text": "Use the reciprocal of $f'(3)$ alone: $1/4$"
      },
      {
        "label": "B",
        "text": "Multiply $f'(3)$ by 2: $8$"
      },
      {
        "label": "C",
        "text": "Apply the inverse derivative rule at 5 and then the chain rule: $2/4=1/2$"
      },
      {
        "label": "D",
        "text": "Take the reciprocal of $2f'(3)$: $1/8$"
      }
    ],
    "answer_label": "C",
    "explanation": "The inner input is 5, corresponding to original input 3. Multiply the reciprocal slope by the inner derivative 2. A omits that factor, B omits reciprocation, and D puts the chain factor in the denominator.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T3.F5.TY1.Q031",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "Let $g(x)=f^{-1}(x^2)$, with $f(2)=9$ and $f^{\\prime}(2)=3$. Find $g^{\\prime}(3)$.",
    "choices": [
      {
        "label": "A",
        "text": "$6$"
      },
      {
        "label": "B",
        "text": "$\\frac23$"
      },
      {
        "label": "C",
        "text": "$2$"
      },
      {
        "label": "D",
        "text": "$\\frac13$"
      }
    ],
    "answer_label": "C",
    "explanation": "$g^{\\prime}(x)=2x/f^{\\prime}(f^{-1}(x^2))$; at 3 this equals $6/3=2$.\n\nA: Omits the division by $f^{\\prime}(2)=3$.\nB: Evaluates the inner derivative at the inverse preimage 2 instead of input 3.\nD: Omits the inner derivative $2x=6$ at $x=3$.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T3.F5.TY2.Q032",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "Let $h(x)=(f^{-1}(x))^2$ and suppose $f(3)=4$, $f^{\\prime}(3)=6$. Find $h^{\\prime}(4)$.",
    "choices": [
      {
        "label": "A",
        "text": "$3$"
      },
      {
        "label": "B",
        "text": "$1$"
      },
      {
        "label": "C",
        "text": "$\\frac16$"
      },
      {
        "label": "D",
        "text": "$6$"
      }
    ],
    "answer_label": "B",
    "explanation": "$h^{\\prime}(4)=2f^{-1}(4)(f^{-1})^{\\prime}(4)=2(3)(1/6)=1$.\n\nA: Forgets the outer factor 2.\nC: Differentiates the inverse but forgets the outer square.\nD: Uses $f^{\\prime}(3)$ instead of its reciprocal.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T3.F5.TY2.Q033",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "Let $h(x)=\\ln(f^{-1}(x))$ and suppose $f(2)=5$, $f^{\\prime}(2)=3$. What is $h^{\\prime}(5)$?",
    "choices": [
      {
        "label": "A",
        "text": "$\\frac12$"
      },
      {
        "label": "B",
        "text": "$\\frac13$"
      },
      {
        "label": "C",
        "text": "$6$"
      },
      {
        "label": "D",
        "text": "$\\frac16$"
      }
    ],
    "answer_label": "D",
    "explanation": "$h^{\\prime}(5)=[1/f^{-1}(5)]\\cdot(f^{-1})^{\\prime}(5)=(1/2)(1/3)=1/6$.\n\nA: Omits the inverse-derivative factor $1/3$.\nB: Forgets the outer logarithmic derivative $1/f^{-1}(5)=1/2$.\nC: Multiplies the original preimage and derivative instead of taking reciprocals.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T3.F5.TY3.Q034",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "If $f$ is differentiable and one-to-one with $f^{\\prime}(x)\\ne0$, what is $\\frac{d}{dx}[f(f^{-1}(x))]$?",
    "choices": [
      {
        "label": "A",
        "text": "$f^{\\prime}(x)$"
      },
      {
        "label": "B",
        "text": "$1$"
      },
      {
        "label": "C",
        "text": "$1/f^{\\prime}(x)$"
      },
      {
        "label": "D",
        "text": "$0$"
      }
    ],
    "answer_label": "B",
    "explanation": "$f(f^{-1}(x))=x$, whose derivative is 1.\n\nA: Ignores the inverse composition identity.\nC: Applies only the inverse derivative rule, not the entire composition.\nD: Mistakes the identity function $x$ for a constant.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T3.F5.TY3.Q035",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Let $f$ be strictly monotonic and differentiable with $f^{\\prime}\\ne0$. Find $\\frac{d}{dx}f^{-1}(f(x))$.",
    "choices": [
      {
        "label": "A",
        "text": "$f^{\\prime}(x)$"
      },
      {
        "label": "B",
        "text": "$0$"
      },
      {
        "label": "C",
        "text": "$\\frac{1}{f^{\\prime}(x)}$"
      },
      {
        "label": "D",
        "text": "$1$"
      }
    ],
    "answer_label": "D",
    "explanation": "$f^{-1}(f(x))=x$ on the relevant domain.\n\nA: Differentiates only the inner $f$.\nB: Treats $f^{-1}(f(x))=x$ as a constant.\nC: Differentiates only the outer inverse without applying the chain rule.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T3.F5.TY4.Q036",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "Let $h(x)=\\sin(f^{-1}(x))$. If $f(\\pi/2)=4$ and $f^{\\prime}(\\pi/2)=2$, what is $h^{\\prime}(4)$?",
    "choices": [
      {
        "label": "A",
        "text": "$0$"
      },
      {
        "label": "B",
        "text": "$1$"
      },
      {
        "label": "C",
        "text": "$\\frac12$"
      },
      {
        "label": "D",
        "text": "$2$"
      }
    ],
    "answer_label": "A",
    "explanation": "$h^{\\prime}(4)=\\cos(f^{-1}(4))(f^{-1})^{\\prime}(4)=\\cos(\\pi/2)(1/2)=0$.\n\nB: Assumes sine differentiates to one rather than cosine.\nC: Differentiates the inverse but omits the cosine factor, which is zero.\nD: Uses the original derivative and omits the cosine factor.",
    "representation": "Symbolic",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T3.F5.TY4.Q037",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "Given $f(1)=3$, $f^{\\prime}(1)=2$, $g(2)=3$, and $g^{\\prime}(2)=-4$, find the derivative of $h(x)=f^{-1}(g(x))$ at $x=2$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\frac12$"
      },
      {
        "label": "B",
        "text": "$-\\frac14$"
      },
      {
        "label": "C",
        "text": "$-8$"
      },
      {
        "label": "D",
        "text": "$-2$"
      }
    ],
    "answer_label": "D",
    "explanation": "$h^{\\prime}(2)=g^{\\prime}(2)/f^{\\prime}(f^{-1}(g(2)))=-4/f^{\\prime}(1)=-4/2=-2$.\n\nA: Omits the inner derivative $-4$.\nB: Uses only $g^{\\prime}(2)$ as a denominator instead of the inner multiplier.\nC: Multiplies by the original derivative instead of its reciprocal.",
    "representation": "Mixed",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T3.F6.TY1.Q038",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "A student knows $f(2)=5$ and $f^{\\prime}(2)=4$ but claims $(f^{-1})^{\\prime}(2)=1/4$. What is the mistake?",
    "choices": [
      {
        "label": "A",
        "text": "The inverse derivative is always negative."
      },
      {
        "label": "B",
        "text": "The inverse derivative $1/4$ is at input $5$, not input $2$."
      },
      {
        "label": "C",
        "text": "The inverse derivative must equal 4."
      },
      {
        "label": "D",
        "text": "It is impossible for an inverse function to have derivative $1/4$."
      }
    ],
    "answer_label": "B",
    "explanation": "Only $(f^{-1})^{\\prime}(5)=1/f^{\\prime}(2)=1/4$ follows.\n\nA: The slope sign is preserved under nonzero reciprocation.\nC: Inverse slopes are reciprocals of the original derivative.\nD: It can when the original slope is 4 at the corresponding preimage.",
    "representation": "Verbal",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T3.F6.TY1.Q039",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "Which relation correctly connects the derivatives of a differentiable invertible $f$ and its inverse at corresponding inputs?",
    "choices": [
      {
        "label": "A",
        "text": "$(f^{-1})^{\\prime}(a)f^{\\prime}(a)=1$ for every $a$."
      },
      {
        "label": "B",
        "text": "$(f^{-1})^{\\prime}(f(a))+f^{\\prime}(a)=1$"
      },
      {
        "label": "C",
        "text": "$(f^{-1})^{\\prime}(f(a))=f^{\\prime}(a)$"
      },
      {
        "label": "D",
        "text": "$(f^{-1})^{\\prime}(f(a))f^{\\prime}(a)=1$"
      }
    ],
    "answer_label": "D",
    "explanation": "Differentiate $f^{-1}(f(x))=x$ and apply the chain rule.\n\nA: The inverse derivative must be evaluated at $f(a)$.\nB: Derivative factors multiply, not add.\nC: Inverse slopes are reciprocal, not generally equal.",
    "representation": "Verbal",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T3.F6.TY2.Q040",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "If $f^{\\prime}(a)=0$ and $f$ is one-to-one near $a$, which conclusion about $(f^{-1})^{\\prime}(f(a))$ is justified?",
    "choices": [
      {
        "label": "A",
        "text": "The usual reciprocal formula does not give a finite inverse derivative there."
      },
      {
        "label": "B",
        "text": "$(f^{-1})^{\\prime}(f(a))=0$"
      },
      {
        "label": "C",
        "text": "$f$ has no inverse in any neighborhood."
      },
      {
        "label": "D",
        "text": "$(f^{-1})^{\\prime}(f(a))=1$"
      }
    ],
    "answer_label": "A",
    "explanation": "At a zero original slope the inverse can have a vertical tangent; it need not have a finite derivative.\n\nB: The reciprocal of zero is not zero.\nC: A function can be one-to-one with zero derivative, as $x^3$ is near 0.\nD: A horizontal tangent does not become unit slope on reflection.",
    "representation": "Verbal",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T3.F6.TY2.Q041",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "For $f(x)=x^3$ on $\\mathbb R$, which is true about the inverse at the origin?",
    "choices": [
      {
        "label": "A",
        "text": "Its derivative at 0 equals 0."
      },
      {
        "label": "B",
        "text": "It has no inverse because $f^{\\prime}(0)=0$."
      },
      {
        "label": "C",
        "text": "It is not continuous there."
      },
      {
        "label": "D",
        "text": "It is continuous there but not differentiable with a finite slope."
      }
    ],
    "answer_label": "D",
    "explanation": "The inverse is $x^{1/3}$, whose difference quotient at 0 has unbounded magnitude.\n\nA: The inverse graph has a vertical tangent there.\nB: The cubic is one-to-one globally despite its zero derivative at 0.\nC: $x^{1/3}$ is continuous at 0.",
    "representation": "Verbal",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T3.F6.TY3.Q042",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "If $f$ is strictly decreasing and differentiable with $f^{\\prime}(a)=-5$, what is the sign of $(f^{-1})^{\\prime}(f(a))$?",
    "choices": [
      {
        "label": "A",
        "text": "Positive"
      },
      {
        "label": "B",
        "text": "Zero"
      },
      {
        "label": "C",
        "text": "Negative"
      },
      {
        "label": "D",
        "text": "It is not determined from $f^{\\prime}(a)$"
      }
    ],
    "answer_label": "C",
    "explanation": "Inverse slope $1/(-5)=-1/5$ retains the sign.\n\nA: The reciprocal of a negative number is negative.\nB: A nonzero reciprocal cannot equal zero.\nD: The inverse slope is exactly $-1/5$.",
    "representation": "Verbal",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T3.F6.TY3.Q043",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Suppose $f$ and $g$ are inverses and $f^{\\prime}(2)=\\frac13$ with $f(2)=7$. Which statement must hold?",
    "choices": [
      {
        "label": "A",
        "text": "$g^{\\prime}(7)=3$"
      },
      {
        "label": "B",
        "text": "$g^{\\prime}(2)=3$"
      },
      {
        "label": "C",
        "text": "$g(7)=7$"
      },
      {
        "label": "D",
        "text": "$g^{\\prime}(7)=\\frac13$"
      }
    ],
    "answer_label": "A",
    "explanation": "$g^{\\prime}(f(2))=1/f^{\\prime}(2)=3$.\n\nB: Uses the original input rather than the inverse input 7.\nC: An inverse swaps coordinates, so $g(7)=2$.\nD: Fails to take the reciprocal.",
    "representation": "Verbal",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T3.F6.TY4.Q044",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The graphs of $f$ and $f^{-1}$ reflect over $y=x$. A tangent to $f$ has slope $-2$ at $(3,4)$. What is the corresponding tangent to the inverse?",
    "choices": [
      {
        "label": "A",
        "text": "At $(4,3)$ with slope $-2$"
      },
      {
        "label": "B",
        "text": "At $(4,3)$ with slope $\\frac12$"
      },
      {
        "label": "C",
        "text": "At $(3,4)$ with slope $-\\frac12$"
      },
      {
        "label": "D",
        "text": "At $(4,3)$ with slope $-\\frac12$"
      }
    ],
    "answer_label": "D",
    "explanation": "Reflection swaps $(3,4)$ to $(4,3)$ and slope $-2$ to $-1/2$.\n\nA: Swaps coordinates but fails to reciprocate the slope.\nB: Loses the negative sign.\nC: Fails to swap the point coordinates.",
    "representation": "Verbal",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T3.F6.TY4.Q045",
    "topic_slug": "derivatives-of-inverse-functions",
    "ced_topic": "3.3",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "Which is the correct interpretation of the domain of $f^{-1}$ when $f$ is one-to-one?",
    "choices": [
      {
        "label": "A",
        "text": "The domain of $f^{-1}$ always equals the domain of $f$."
      },
      {
        "label": "B",
        "text": "The domain of $f^{-1}$ is always all real numbers."
      },
      {
        "label": "C",
        "text": "The domain of $f^{-1}$ is the set of slopes of $f$."
      },
      {
        "label": "D",
        "text": "The domain of $f^{-1}$ is the range of $f$."
      }
    ],
    "answer_label": "D",
    "explanation": "The inverse reverses the mapping $x\\mapsto f(x)$ and therefore swaps input/output sets.\n\nA: Inverting swaps domain and range.\nB: An inverse can be defined only at outputs attained by $f$.\nC: A derivative is not the definition of the inverse domain.",
    "representation": "Verbal",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse"
  },
  {
    "key": "U3.T4.F1.TY1.Q001",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "Let $f(x)=\\sin^{-1}x$ (inverse sine) and $g(x)=(\\sin x)^{-1}$. Which derivatives are correct on their common differentiability domain?",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle \\frac1{\\cos x},\\ -\\frac1{\\sin^2x}$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle  -\\csc x\\cot x,\\ \\frac1{\\sqrt{1-x^2}}$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle \\frac1{\\sqrt{1-x^2}},\\ -\\csc x\\cot x$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle \\cos x,\\ -\\sin x$"
      }
    ],
    "answer_label": "C",
    "explanation": "Inverse sine and reciprocal sine have different derivative rules. B swaps them; A uses incorrect reciprocal rules; D differentiates ordinary trig functions.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T4.F1.TY2.Q002",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "Differentiate $\\arccos x$ on $(-1,1)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle -\\frac1{1+x^2}$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle \\frac1{\\sqrt{1-x^2}}$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle -\\frac1{\\sqrt{1-x^2}}$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle -\\frac{\\sqrt{1-x^2}}x$"
      }
    ],
    "answer_label": "C",
    "explanation": "Differentiate $\\cos y=x$: $-\\sin y\\,y'=1$. B loses the sign; A uses arctan; D fails to reciprocate correctly.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T4.F1.TY2.Q013",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "Which statement is true throughout the indicated domain?",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle (\\arctan x)'>0$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle  (\\arccos x)'>0\\text{ wherever defined}$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle (\\arcsin x)'<0\\text{ for }-1<x<0$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle (\\arctan x)'<0\\text{ for }x>0$"
      }
    ],
    "answer_label": "A",
    "explanation": "$1/(1+x^2)>0$. B reverses arccos; C and D confuse input sign with slope.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T4.F1.TY2.Q015",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "For $-1<x<1$, let $f(x)=\\arcsin x$ and $g(x)=\\arccos x$. Which holds?",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle f'=g'$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle f'+g'=1$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle f'=-g'$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle f'g'=1$"
      }
    ],
    "answer_label": "C",
    "explanation": "The derivatives are opposite. A ignores sign; D gives positive product; B gives nonzero sum.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T4.F1.TY3.Q003",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "If $f(x)=\\arcsin x$, find $f'(-3/5)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle \\frac{5}{4}$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle \\frac{4}{5}$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle \\frac{-4}{5}$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle \\frac{-5}{4}$"
      }
    ],
    "answer_label": "A",
    "explanation": "$1/\\sqrt{1-9/25}=5/4$. D gives wrong sign; B uses denominator; C makes both errors.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T4.F1.TY3.Q014",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "If $f(x)=\\arctan x$, find $f'(0)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle \\pi/2$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle 1$"
      },
      {
        "label": "C",
        "text": "Does not exist."
      },
      {
        "label": "D",
        "text": "$\\displaystyle 0$"
      }
    ],
    "answer_label": "B",
    "explanation": "$1/(1+0^2)=1$. D uses function value; A uses asymptotic value; C wrongly excludes zero.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T4.F2.TY1.Q004",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Find $\\frac{d}{dx}\\arctan(x^2+1)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle \\frac1{1+(x^2+1)^2}$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle \\frac{2x}{1+x^2+1}$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle \\frac{2x}{1+(x^2+1)^2}$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle \\frac{2x}{1+x^2}$"
      }
    ],
    "answer_label": "C",
    "explanation": "Use $u=x^2+1$, $u'=2x$ and $u'/(1+u^2)$. A omits chain factor; D uses wrong argument; B fails to square the argument.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T4.F2.TY1.Q005",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Let $f(x)=\\arctan(\\ln x)$ for $x>0$. Find $f'(e)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle 1/(2e)$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle 1/e$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle \\frac{1}{2}$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle e/2$"
      }
    ],
    "answer_label": "A",
    "explanation": "$f'(x)=\\frac{1}{x(1+(\\ln x)^2)}$. C omits $1/x$; B omits outer denominator; D reverses inner factor.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T4.F2.TY1.Q016",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "For $0<x<1$, differentiate $\\arccos(1-2x)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle -\\frac2{\\sqrt{1-(1-2x)^2}}$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle \\frac2{\\sqrt{1-(1-2x)^2}}$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle \\frac1{\\sqrt{1-(1-2x)^2}}$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle \\frac2{1+(1-2x)^2}$"
      }
    ],
    "answer_label": "B",
    "explanation": "Outer and inner minus signs cancel. A loses one minus; C omits factor 2; D uses arctan.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T4.F2.TY1.Q017",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "For $x>0$, differentiate $\\arctan(\\sqrt x)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle \\frac1{1+x}$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle \\frac1{2\\sqrt x(1+x)}$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle \\frac1{2\\sqrt x(1+\\sqrt x)}$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle \\frac{\\sqrt x}{1+x}$"
      }
    ],
    "answer_label": "B",
    "explanation": "$u'=1/(2\\sqrt x)$ and $1+u^2=1+x$. A omits inner derivative; C omits square; D uses inner value.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T4.F2.TY1.Q018",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "For $x\\ne-1$, which procedure correctly differentiates $\\arctan(x/(x+1))$?",
    "choices": [
      {
        "label": "A",
        "text": "Use only the arctangent rule: $\\frac{1}{1+(x/(x+1))^2}$"
      },
      {
        "label": "B",
        "text": "Use only the quotient rule: $\\frac1{(x+1)^2}$"
      },
      {
        "label": "C",
        "text": "Multiply the two derivatives evaluated at $x$: $\\frac1{(1+x^2)(x+1)^2}$"
      },
      {
        "label": "D",
        "text": "Use the chain rule with the quotient rule for the inner function: $\\frac1{(x+1)^2+x^2}$"
      }
    ],
    "answer_label": "D",
    "explanation": "The inner derivative is $1/(x+1)^2$; the outer derivative is evaluated at the quotient. A and B omit a factor, and C evaluates the outer derivative at the wrong input.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T4.F2.TY1.Q019",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Differentiate $\\arctan(e^x)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle \\frac{e^x}{1+e^x}$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle \\frac1{1+e^{2x}}$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle \\frac{e^x}{\\sqrt{1+e^{2x}}}$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle \\frac{e^x}{1+e^{2x}}$"
      }
    ],
    "answer_label": "D",
    "explanation": "$u'=e^x$, $u^2=e^{2x}$. B omits inner derivative; A omits square; C incorrectly uses a square-root denominator.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T4.F2.TY1.Q021",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "For $f(x)=\\arctan(\\arcsin x)$, find $f'(0)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle 2$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle 1$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle 0$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle \\pi/2$"
      }
    ],
    "answer_label": "B",
    "explanation": "Both chain factors equal 1 at zero. C uses function value; A adds factors; D uses angle value.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T4.F2.TY2.Q006",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The table gives values of differentiable $g$.  If $h(x)=\\arcsin(g(x))$, find $h'(2)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle -3$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle -3/\\sqrt2$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle 6/\\sqrt3$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle -2\\sqrt3$"
      }
    ],
    "answer_label": "D",
    "explanation": "$-3/\\sqrt{1-1/4}=-2\\sqrt3$. A omits denominator; C loses sign; B computes radicand incorrectly.",
    "representation": "tabular",
    "figure": {
      "kind": "table",
      "headers": [
        "$x$",
        "$g(x)$",
        "$g'(x)$"
      ],
      "rows": [
        [
          "$0$",
          "$1/2$",
          "$5$"
        ],
        [
          "$1$",
          "$0$",
          "$2$"
        ],
        [
          "$2$",
          "$-1/2$",
          "$-3$"
        ]
      ]
    }
  },
  {
    "key": "U3.T4.F2.TY2.Q022",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The table gives values of differentiable $g$.  If $h(x)=\\arccos(g(x))$, find $h'(2)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle 4/\\sqrt3$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle -2/\\sqrt3$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle -4/\\sqrt3$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle 2$"
      }
    ],
    "answer_label": "A",
    "explanation": "$-(-2)/\\sqrt{3/4}=4/\\sqrt3$. C misses outer minus; B misses sign and factor; D omits denominator.",
    "representation": "tabular",
    "figure": {
      "kind": "table",
      "headers": [
        "$x$",
        "$g(x)$",
        "$g'(x)$"
      ],
      "rows": [
        [
          "$1$",
          "$0$",
          "$3$"
        ],
        [
          "$2$",
          "$1/2$",
          "$-2$"
        ],
        [
          "$3$",
          "$-1/2$",
          "$4$"
        ]
      ]
    }
  },
  {
    "key": "U3.T4.F2.TY3.Q020",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "If $f(x)=\\arcsin(\\sin x)$, find $f'(2\\pi/3)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle \\frac{1}{2}$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle 0$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle 1$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle -1$"
      }
    ],
    "answer_label": "D",
    "explanation": "Locally $f(x)=\\pi-x$. C assumes global cancellation; A confuses ordinary trig slope with composite slope; B misreads local slope.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T4.F3.TY1.Q007",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Differentiate $x^2\\arctan x$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle \\frac{2x}{1+x^2}$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle 2x\\arctan x+\\frac1{1+x^2}$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle \\frac{x^2}{1+x^2}$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle 2x\\arctan x+\\frac{x^2}{1+x^2}$"
      }
    ],
    "answer_label": "D",
    "explanation": "Product rule. $f\\prime=2x\\arctan x+x^2/(1+x^2)$. A multiplies the two derivatives; B drops $x^2$ from the second term; C omits the first term.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T4.F3.TY1.Q023",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "If $f(x)=\\frac{\\arctan x}{x}$ for $x>0$, find $f'(1)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle \\frac12+\\frac\\pi4$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle \\frac\\pi4-\\frac12$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle \\frac12$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle \\frac12-\\frac\\pi4$"
      }
    ],
    "answer_label": "D",
    "explanation": "Quotient rule gives $[x/(1+x^2)-\\arctan x]/x^2$. A adds terms; B reverses numerator; C omits denominator derivative.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T4.F3.TY1.Q026",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Differentiate $\\sqrt{1-x^2}\\arcsin x$ for $-1<x<1$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle -\\frac{x}{\\sqrt{1-x^2}}$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle 1+\\frac{x\\arcsin x}{\\sqrt{1-x^2}}$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle \\frac1{\\sqrt{1-x^2}}$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle 1-\\frac{x\\arcsin x}{\\sqrt{1-x^2}}$"
      }
    ],
    "answer_label": "D",
    "explanation": "Product rule gives $1-x\\arcsin x/\\sqrt{1-x^2}$. B loses minus; C and A differentiate only one factor.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T4.F3.TY1.Q027",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Let $f(x)=\\frac{\\arccos x}{1+x^2}$. Find $f'(0)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle 1$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle \\pi/2$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle 0$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle -1$"
      }
    ],
    "answer_label": "D",
    "explanation": "At zero numerator derivative is $-1$ and denominator derivative is 0. B uses function value; C ignores numerator derivative; A loses minus.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T4.F3.TY2.Q008",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "For $0<x<1$, differentiate $\\ln(\\arcsin x)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle \\frac1{x\\arcsin x}$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle \\frac1{\\sqrt{1-x^2}}$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle \\frac1{(\\arcsin x)\\sqrt{1-x^2}}$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle \\frac{\\arcsin x}{\\sqrt{1-x^2}}$"
      }
    ],
    "answer_label": "C",
    "explanation": "Use $v'/v$ with $v=\\arcsin x$. B omits outer log; D multiplies by $v$; A uses wrong inner derivative.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T4.F3.TY2.Q024",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Let $f(x)=e^{\\arctan(2x)}$. Find $f'(0)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle 0$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle 2$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle e$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle 1$"
      }
    ],
    "answer_label": "B",
    "explanation": "$e^{\\arctan(2x)}\\frac2{1+4x^2}$ equals 2 at zero. D misses factor 2; C mis-evaluates exponential; A uses inner value.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T4.F3.TY2.Q025",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Differentiate $(\\arcsin x)^2$ for $-1<x<1$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle \\frac{2\\arcsin x}{1-x^2}$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle \\frac{2\\arcsin x}{\\sqrt{1-x^2}}$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle \\frac{2x}{\\sqrt{1-x^2}}$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle \\frac1{1-x^2}$"
      }
    ],
    "answer_label": "B",
    "explanation": "Outer derivative is $2\\arcsin x$. C uses $x$; A drops radical; D squares derivative.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T4.F4.TY1.Q009",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The graph of $f(x)=\\arctan x$ is shown. Let $p$ and $q$ be the $x$-coordinates of $P$ and $Q$, respectively. What is $f\\prime(q)/f\\prime(p)$?",
    "choices": [
      {
        "label": "A",
        "text": "$2/5$"
      },
      {
        "label": "B",
        "text": "$-5/2$"
      },
      {
        "label": "C",
        "text": "$5/2$"
      },
      {
        "label": "D",
        "text": "$1$"
      }
    ],
    "answer_label": "C",
    "explanation": "The graph gives $p=-2$ and $q=1$. Thus $f\\prime(p)=1/5$ and $f\\prime(q)=1/2$, so the ratio is $5/2$. A reverses the ratio; B introduces a negative sign; D assumes equal slopes.",
    "representation": "graphical",
    "figure": {
      "kind": "graph",
      "window": {
        "xMin": -3,
        "xMax": 3,
        "yMin": -1.6,
        "yMax": 1.6
      },
      "curves": [
        {
          "points": [
            [
              -3,
              -1.2490457723982544
            ],
            [
              -2.9625,
              -1.2452531230736055
            ],
            [
              -2.925,
              -1.241373288682749
            ],
            [
              -2.8875,
              -1.237403348907632
            ],
            [
              -2.85,
              -1.233340257567115
            ],
            [
              -2.8125,
              -1.2291808361470895
            ],
            [
              -2.775,
              -1.2249217669576553
            ],
            [
              -2.7375,
              -1.2205595858949452
            ],
            [
              -2.7,
              -1.2160906747839564
            ],
            [
              -2.6625,
              -1.2115112532775156
            ],
            [
              -2.625,
              -1.2068173702852525
            ],
            [
              -2.5875,
              -1.2020048949051925
            ],
            [
              -2.55,
              -1.197069506829343
            ],
            [
              -2.5125,
              -1.1920066861934417
            ],
            [
              -2.475,
              -1.1868117028398777
            ],
            [
              -2.4375,
              -1.1814796049617557
            ],
            [
              -2.4,
              -1.176005207095135
            ],
            [
              -2.3625,
              -1.170383077425736
            ],
            [
              -2.325,
              -1.1646075243758967
            ],
            [
              -2.2875,
              -1.1586725824373607
            ],
            [
              -2.25,
              -1.1525719972156676
            ],
            [
              -2.2125,
              -1.1462992096526086
            ],
            [
              -2.175,
              -1.13984733939452
            ],
            [
              -2.1375,
              -1.1332091672762672
            ],
            [
              -2.1,
              -1.1263771168937977
            ],
            [
              -2.0625,
              -1.1193432352423422
            ],
            [
              -2.025,
              -1.1120991724029339
            ],
            [
              -1.9875,
              -1.1046361602672463
            ],
            [
              -1.95,
              -1.0969449903001363
            ],
            [
              -1.9125,
              -1.089015990351157
            ],
            [
              -1.875,
              -1.0808390005411683
            ],
            [
              -1.8375,
              -1.072403348268597
            ],
            [
              -1.8,
              -1.0636978224025597
            ],
            [
              -1.7625,
              -1.0547106467577454
            ],
            [
              -1.725,
              -1.0454294529795805
            ],
            [
              -1.6875,
              -1.0358412530088001
            ],
            [
              -1.65,
              -1.025932411343353
            ],
            [
              -1.6125,
              -1.0156886173739113
            ],
            [
              -1.575,
              -1.005094858138719
            ],
            [
              -1.5375,
              -0.9941353919257733
            ],
            [
              -1.5,
              -0.982793723247329
            ],
            [
              -1.4625,
              -0.971052579825473
            ],
            [
              -1.425,
              -0.9588938923602299
            ],
            [
              -1.3875,
              -0.9462987780055887
            ],
            [
              -1.35,
              -0.9332475286562039
            ],
            [
              -1.3125,
              -0.9197196053504169
            ],
            [
              -1.275,
              -0.9056936403254024
            ],
            [
              -1.2375,
              -0.8911474485187877
            ],
            [
              -1.2,
              -0.8760580505981934
            ],
            [
              -1.1625,
              -0.860401709914526
            ],
            [
              -1.125,
              -0.844153986113171
            ],
            [
              -1.0875,
              -0.8272898084933772
            ],
            [
              -1.05,
              -0.8097835725701669
            ],
            [
              -1.0125,
              -0.7916092636503146
            ],
            [
              -0.9750000000000001,
              -0.7727406115633964
            ],
            [
              -0.9375,
              -0.7531512809621944
            ],
            [
              -0.8999999999999999,
              -0.7328151017865066
            ],
            [
              -0.8624999999999998,
              -0.7117063445230993
            ],
            [
              -0.8250000000000002,
              -0.689800044733608
            ],
            [
              -0.7875000000000001,
              -0.6670723808919153
            ],
            [
              -0.75,
              -0.6435011087932844
            ],
            [
              -0.7124999999999999,
              -0.6190660545826281
            ],
            [
              -0.6749999999999998,
              -0.593749666710771
            ],
            [
              -0.6375000000000002,
              -0.5675376247847508
            ],
            [
              -0.6000000000000001,
              -0.5404195002705843
            ],
            [
              -0.5625,
              -0.5123894603107377
            ],
            [
              -0.5249999999999999,
              -0.4834470015671989
            ],
            [
              -0.4874999999999998,
              -0.4535976961077716
            ],
            [
              -0.4500000000000002,
              -0.42285392613294087
            ],
            [
              -0.4125000000000001,
              -0.3912355791271742
            ],
            [
              -0.375,
              -0.35877067027057225
            ],
            [
              -0.3374999999999999,
              -0.32549585523647795
            ],
            [
              -0.2999999999999998,
              -0.29145679447786693
            ],
            [
              -0.2625000000000002,
              -0.25670833043338587
            ],
            [
              -0.2250000000000001,
              -0.22131444234779138
            ],
            [
              -0.1875,
              -0.18534794999569476
            ],
            [
              -0.1499999999999999,
              -0.14888994760949717
            ],
            [
              -0.11249999999999982,
              -0.1120289624259877
            ],
            [
              -0.07500000000000018,
              -0.07485984771076704
            ],
            [
              -0.03750000000000009,
              -0.037482436691661576
            ],
            [
              0,
              0
            ],
            [
              0.03750000000000009,
              0.037482436691661576
            ],
            [
              0.07500000000000018,
              0.07485984771076704
            ],
            [
              0.11249999999999982,
              0.1120289624259877
            ],
            [
              0.1499999999999999,
              0.14888994760949717
            ],
            [
              0.1875,
              0.18534794999569476
            ],
            [
              0.2250000000000001,
              0.22131444234779138
            ],
            [
              0.2625000000000002,
              0.25670833043338587
            ],
            [
              0.2999999999999998,
              0.29145679447786693
            ],
            [
              0.3374999999999999,
              0.32549585523647795
            ],
            [
              0.375,
              0.35877067027057225
            ],
            [
              0.4125000000000001,
              0.3912355791271742
            ],
            [
              0.4500000000000002,
              0.42285392613294087
            ],
            [
              0.4874999999999998,
              0.4535976961077716
            ],
            [
              0.5249999999999999,
              0.4834470015671989
            ],
            [
              0.5625,
              0.5123894603107377
            ],
            [
              0.6000000000000001,
              0.5404195002705843
            ],
            [
              0.6375000000000002,
              0.5675376247847508
            ],
            [
              0.6749999999999998,
              0.593749666710771
            ],
            [
              0.7124999999999999,
              0.6190660545826281
            ],
            [
              0.75,
              0.6435011087932844
            ],
            [
              0.7875000000000001,
              0.6670723808919153
            ],
            [
              0.8250000000000002,
              0.689800044733608
            ],
            [
              0.8624999999999998,
              0.7117063445230993
            ],
            [
              0.8999999999999999,
              0.7328151017865066
            ],
            [
              0.9375,
              0.7531512809621944
            ],
            [
              0.9750000000000001,
              0.7727406115633964
            ],
            [
              1.0125000000000002,
              0.7916092636503147
            ],
            [
              1.0499999999999998,
              0.8097835725701668
            ],
            [
              1.0875000000000004,
              0.8272898084933774
            ],
            [
              1.125,
              0.844153986113171
            ],
            [
              1.1624999999999996,
              0.8604017099145258
            ],
            [
              1.2000000000000002,
              0.8760580505981935
            ],
            [
              1.2374999999999998,
              0.8911474485187876
            ],
            [
              1.2750000000000004,
              0.9056936403254026
            ],
            [
              1.3125,
              0.9197196053504169
            ],
            [
              1.3499999999999996,
              0.9332475286562038
            ],
            [
              1.3875000000000002,
              0.9462987780055888
            ],
            [
              1.4249999999999998,
              0.9588938923602298
            ],
            [
              1.4625000000000004,
              0.9710525798254732
            ],
            [
              1.5,
              0.982793723247329
            ],
            [
              1.5374999999999996,
              0.994135391925773
            ],
            [
              1.5750000000000002,
              1.005094858138719
            ],
            [
              1.6124999999999998,
              1.0156886173739113
            ],
            [
              1.6500000000000004,
              1.025932411343353
            ],
            [
              1.6875,
              1.0358412530088001
            ],
            [
              1.7249999999999996,
              1.0454294529795802
            ],
            [
              1.7625000000000002,
              1.0547106467577454
            ],
            [
              1.7999999999999998,
              1.0636978224025597
            ],
            [
              1.8375000000000004,
              1.072403348268597
            ],
            [
              1.875,
              1.0808390005411683
            ],
            [
              1.9124999999999996,
              1.089015990351157
            ],
            [
              1.9500000000000002,
              1.0969449903001363
            ],
            [
              1.9874999999999998,
              1.1046361602672463
            ],
            [
              2.0250000000000004,
              1.112099172402934
            ],
            [
              2.0625,
              1.1193432352423422
            ],
            [
              2.0999999999999996,
              1.1263771168937977
            ],
            [
              2.1375,
              1.1332091672762672
            ],
            [
              2.175,
              1.13984733939452
            ],
            [
              2.2125000000000004,
              1.1462992096526086
            ],
            [
              2.25,
              1.1525719972156676
            ],
            [
              2.2874999999999996,
              1.1586725824373607
            ],
            [
              2.325,
              1.1646075243758967
            ],
            [
              2.3625,
              1.170383077425736
            ],
            [
              2.4000000000000004,
              1.1760052070951352
            ],
            [
              2.4375,
              1.1814796049617557
            ],
            [
              2.4749999999999996,
              1.1868117028398777
            ],
            [
              2.5125,
              1.1920066861934417
            ],
            [
              2.55,
              1.197069506829343
            ],
            [
              2.5875000000000004,
              1.2020048949051925
            ],
            [
              2.625,
              1.2068173702852525
            ],
            [
              2.6624999999999996,
              1.2115112532775154
            ],
            [
              2.7,
              1.2160906747839564
            ],
            [
              2.7375,
              1.2205595858949452
            ],
            [
              2.7750000000000004,
              1.2249217669576553
            ],
            [
              2.8125,
              1.2291808361470895
            ],
            [
              2.8499999999999996,
              1.233340257567115
            ],
            [
              2.8875,
              1.237403348907632
            ],
            [
              2.925,
              1.241373288682749
            ],
            [
              2.9625000000000004,
              1.2452531230736055
            ],
            [
              3,
              1.2490457723982544
            ]
          ],
          "smooth": false
        }
      ],
      "markers": [
        {
          "x": -2,
          "y": -1.1071487177940904,
          "kind": "closed",
          "label": "P"
        },
        {
          "x": 1,
          "y": 0.7853981633974483,
          "kind": "closed",
          "label": "Q"
        }
      ],
      "xLabel": "x",
      "yLabel": "y"
    }
  },
  {
    "key": "U3.T4.F4.TY1.Q029",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Which line is tangent to $y=\\arcsin x$ at $x=1/2$?",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle y-\\frac\\pi6=-\\frac2{\\sqrt3}(x-\\frac12)$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle y-\\frac\\pi6=\\frac2{\\sqrt3}(x-\\frac12)$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle y-\\frac12=\\frac2{\\sqrt3}(x-\\frac\\pi6)$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle y-\\frac\\pi6=\\frac{\\sqrt3}2(x-\\frac12)$"
      }
    ],
    "answer_label": "B",
    "explanation": "Point $(1/2,\\pi/6)$ and slope $2/\\sqrt3$. D uses reciprocal slope; A wrong sign; C swaps coordinates.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T4.F4.TY1.Q030",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The graph of $f(x)=\\arcsin x$ is shown. If $p$ is the $x$-coordinate of $P$, what is the slope of the tangent to $g(x)=f(2x)$ at $x=p/2$?",
    "choices": [
      {
        "label": "A",
        "text": "$1/\\sqrt3$"
      },
      {
        "label": "B",
        "text": "$2/\\sqrt3$"
      },
      {
        "label": "C",
        "text": "$-4/\\sqrt3$"
      },
      {
        "label": "D",
        "text": "$4/\\sqrt3$"
      }
    ],
    "answer_label": "D",
    "explanation": "Read $p=-1/2$ from the graph. The chain rule gives $g\\prime(p/2)=2f\\prime(p)=2/\\sqrt{1-1/4}=4/\\sqrt3$. A divides by the chain factor; B omits it; C reverses the sign.",
    "representation": "graphical",
    "figure": {
      "kind": "graph",
      "window": {
        "xMin": -1.1,
        "xMax": 1.1,
        "yMin": -1.8,
        "yMax": 1.8
      },
      "curves": [
        {
          "points": [
            [
              -1,
              -1.5707963267948966
            ],
            [
              -0.9875,
              -1.4125172768700758
            ],
            [
              -0.975,
              -1.3467210414930773
            ],
            [
              -0.9625,
              -1.2960719289607647
            ],
            [
              -0.95,
              -1.253235897503375
            ],
            [
              -0.9375,
              -1.2153751251046732
            ],
            [
              -0.925,
              -1.181035593997422
            ],
            [
              -0.9125,
              -1.1493543252773337
            ],
            [
              -0.9,
              -1.1197695149986342
            ],
            [
              -0.8875,
              -1.0918912419200864
            ],
            [
              -0.875,
              -1.0654358165107394
            ],
            [
              -0.8625,
              -1.0401892223693177
            ],
            [
              -0.85,
              -1.015985293814825
            ],
            [
              -0.8375,
              -0.992691962228553
            ],
            [
              -0.825,
              -0.9702021999288456
            ],
            [
              -0.8125,
              -0.948427838239876
            ],
            [
              -0.8,
              -0.9272952180016123
            ],
            [
              -0.7875,
              -0.9067420495521463
            ],
            [
              -0.775,
              -0.8867150949995675
            ],
            [
              -0.7625,
              -0.8671684240537588
            ],
            [
              -0.75,
              -0.848062078981481
            ],
            [
              -0.7375,
              -0.8293610372072463
            ],
            [
              -0.725,
              -0.8110343942875815
            ],
            [
              -0.7125,
              -0.7930547126259009
            ],
            [
              -0.7,
              -0.775397496610753
            ],
            [
              -0.6875,
              -0.758040765426236
            ],
            [
              -0.675,
              -0.74096470220302
            ],
            [
              -0.6625,
              -0.7241513634730852
            ],
            [
              -0.65,
              -0.7075844367253556
            ],
            [
              -0.6375,
              -0.6912490366733696
            ],
            [
              -0.625,
              -0.6751315329370317
            ],
            [
              -0.6125,
              -0.659219403411933
            ],
            [
              -0.6,
              -0.6435011087932844
            ],
            [
              -0.5875,
              -0.6279659846369483
            ],
            [
              -0.575,
              -0.6126041480486224
            ],
            [
              -0.5625,
              -0.5974064166453502
            ],
            [
              -0.55,
              -0.5823642378687435
            ],
            [
              -0.5375,
              -0.5674696270743214
            ],
            [
              -0.525,
              -0.5527151130967832
            ],
            [
              -0.5125,
              -0.5380936902123546
            ],
            [
              -0.5,
              -0.5235987755982989
            ],
            [
              -0.48750000000000004,
              -0.5092241715352289
            ],
            [
              -0.475,
              -0.49496403171689457
            ],
            [
              -0.4625,
              -0.4808128311299785
            ],
            [
              -0.44999999999999996,
              -0.46676533904729633
            ],
            [
              -0.4375,
              -0.4528165947449256
            ],
            [
              -0.42500000000000004,
              -0.43896188560976074
            ],
            [
              -0.4125,
              -0.4251967273508751
            ],
            [
              -0.4,
              -0.41151684606748806
            ],
            [
              -0.38749999999999996,
              -0.3979181619596102
            ],
            [
              -0.375,
              -0.3843967744956391
            ],
            [
              -0.36250000000000004,
              -0.37094894887514035
            ],
            [
              -0.35,
              -0.35757110364551026
            ],
            [
              -0.3375,
              -0.34425979934871065
            ],
            [
              -0.32499999999999996,
              -0.33101172808929447
            ],
            [
              -0.3125,
              -0.31782370392788073
            ],
            [
              -0.30000000000000004,
              -0.3046926540153976
            ],
            [
              -0.2875,
              -0.29161561039308725
            ],
            [
              -0.275,
              -0.2785897023916506
            ],
            [
              -0.26249999999999996,
              -0.26561214957020307
            ],
            [
              -0.25,
              -0.25268025514207865
            ],
            [
              -0.23750000000000004,
              -0.23979139984006526
            ],
            [
              -0.22499999999999998,
              -0.22694303617851994
            ],
            [
              -0.21250000000000002,
              -0.21413268307406838
            ],
            [
              -0.19999999999999996,
              -0.20135792079033074
            ],
            [
              -0.1875,
              -0.1886163861754041
            ],
            [
              -0.17500000000000004,
              -0.17590576816371634
            ],
            [
              -0.16249999999999998,
              -0.16322380351641444
            ],
            [
              -0.15000000000000002,
              -0.15056827277668605
            ],
            [
              -0.13749999999999996,
              -0.13793699641838453
            ],
            [
              -0.125,
              -0.1253278311680654
            ],
            [
              -0.11250000000000004,
              -0.11273866648206078
            ],
            [
              -0.09999999999999998,
              -0.10016742116155977
            ],
            [
              -0.08750000000000002,
              -0.0876120400898281
            ],
            [
              -0.07499999999999996,
              -0.0750704910767165
            ],
            [
              -0.0625,
              -0.06254076179649139
            ],
            [
              -0.050000000000000044,
              -0.05002085680577006
            ],
            [
              -0.03749999999999998,
              -0.0375087946289886
            ],
            [
              -0.025000000000000022,
              -0.02500260489936116
            ],
            [
              -0.012499999999999956,
              -0.012500325543723602
            ],
            [
              0,
              0
            ],
            [
              0.012499999999999956,
              0.012500325543723602
            ],
            [
              0.02499999999999991,
              0.02500260489936105
            ],
            [
              0.03750000000000009,
              0.03750879462898871
            ],
            [
              0.050000000000000044,
              0.05002085680577006
            ],
            [
              0.0625,
              0.06254076179649139
            ],
            [
              0.07499999999999996,
              0.0750704910767165
            ],
            [
              0.08749999999999991,
              0.087612040089828
            ],
            [
              0.10000000000000009,
              0.10016742116155988
            ],
            [
              0.11250000000000004,
              0.11273866648206078
            ],
            [
              0.125,
              0.1253278311680654
            ],
            [
              0.13749999999999996,
              0.13793699641838453
            ],
            [
              0.1499999999999999,
              0.15056827277668594
            ],
            [
              0.1625000000000001,
              0.16322380351641455
            ],
            [
              0.17500000000000004,
              0.17590576816371634
            ],
            [
              0.1875,
              0.1886163861754041
            ],
            [
              0.19999999999999996,
              0.20135792079033074
            ],
            [
              0.2124999999999999,
              0.21413268307406827
            ],
            [
              0.2250000000000001,
              0.22694303617852005
            ],
            [
              0.23750000000000004,
              0.23979139984006526
            ],
            [
              0.25,
              0.25268025514207865
            ],
            [
              0.26249999999999996,
              0.26561214957020307
            ],
            [
              0.2749999999999999,
              0.2785897023916505
            ],
            [
              0.2875000000000001,
              0.29161561039308737
            ],
            [
              0.30000000000000004,
              0.3046926540153976
            ],
            [
              0.3125,
              0.31782370392788073
            ],
            [
              0.32499999999999996,
              0.33101172808929447
            ],
            [
              0.3374999999999999,
              0.34425979934871054
            ],
            [
              0.3500000000000001,
              0.35757110364551037
            ],
            [
              0.36250000000000004,
              0.37094894887514035
            ],
            [
              0.375,
              0.3843967744956391
            ],
            [
              0.38749999999999996,
              0.3979181619596102
            ],
            [
              0.3999999999999999,
              0.4115168460674879
            ],
            [
              0.4125000000000001,
              0.4251967273508752
            ],
            [
              0.42500000000000004,
              0.43896188560976074
            ],
            [
              0.4375,
              0.4528165947449256
            ],
            [
              0.44999999999999996,
              0.46676533904729633
            ],
            [
              0.4624999999999999,
              0.4808128311299784
            ],
            [
              0.4750000000000001,
              0.49496403171689474
            ],
            [
              0.48750000000000004,
              0.5092241715352289
            ],
            [
              0.5,
              0.5235987755982989
            ],
            [
              0.5125,
              0.5380936902123546
            ],
            [
              0.5249999999999999,
              0.5527151130967831
            ],
            [
              0.5375000000000001,
              0.5674696270743215
            ],
            [
              0.55,
              0.5823642378687435
            ],
            [
              0.5625,
              0.5974064166453502
            ],
            [
              0.575,
              0.6126041480486224
            ],
            [
              0.5874999999999999,
              0.6279659846369481
            ],
            [
              0.6000000000000001,
              0.6435011087932845
            ],
            [
              0.6125,
              0.659219403411933
            ],
            [
              0.625,
              0.6751315329370317
            ],
            [
              0.6375,
              0.6912490366733696
            ],
            [
              0.6499999999999999,
              0.7075844367253554
            ],
            [
              0.6625000000000001,
              0.7241513634730853
            ],
            [
              0.675,
              0.74096470220302
            ],
            [
              0.6875,
              0.758040765426236
            ],
            [
              0.7,
              0.775397496610753
            ],
            [
              0.7124999999999999,
              0.7930547126259008
            ],
            [
              0.7250000000000001,
              0.8110343942875817
            ],
            [
              0.7375,
              0.8293610372072463
            ],
            [
              0.75,
              0.848062078981481
            ],
            [
              0.7625,
              0.8671684240537588
            ],
            [
              0.7749999999999999,
              0.8867150949995672
            ],
            [
              0.7875000000000001,
              0.9067420495521465
            ],
            [
              0.8,
              0.9272952180016123
            ],
            [
              0.8125,
              0.948427838239876
            ],
            [
              0.825,
              0.9702021999288456
            ],
            [
              0.8374999999999999,
              0.9926919622285528
            ],
            [
              0.8500000000000001,
              1.0159852938148253
            ],
            [
              0.8625,
              1.0401892223693177
            ],
            [
              0.875,
              1.0654358165107394
            ],
            [
              0.8875,
              1.0918912419200864
            ],
            [
              0.8999999999999999,
              1.119769514998634
            ],
            [
              0.9125000000000001,
              1.149354325277334
            ],
            [
              0.925,
              1.181035593997422
            ],
            [
              0.9375,
              1.2153751251046732
            ],
            [
              0.95,
              1.253235897503375
            ],
            [
              0.9624999999999999,
              1.2960719289607643
            ],
            [
              0.9750000000000001,
              1.3467210414930777
            ],
            [
              0.9875,
              1.4125172768700758
            ],
            [
              1,
              1.5707963267948966
            ]
          ],
          "smooth": false
        }
      ],
      "markers": [
        {
          "x": -0.5,
          "y": -0.5235987755982989,
          "kind": "closed",
          "label": "P"
        }
      ],
      "xLabel": "x",
      "yLabel": "y"
    }
  },
  {
    "key": "U3.T4.F4.TY1.Q031",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Let $f(x)=\\arccos(2x-1)$ on $0<x<1$. Find the tangent at $x=1/2$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle y-\\frac\\pi2=-2(x-\\frac12)$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle y-\\frac12=-2(x-\\frac\\pi2)$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle y-\\frac\\pi2=2(x-\\frac12)$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle y-\\frac\\pi2=-(x-\\frac12)$"
      }
    ],
    "answer_label": "A",
    "explanation": "Point $(1/2,\\pi/2)$, slope $-2$. C loses minus; B swaps coordinates; D omits factor 2.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T4.F4.TY2.Q010",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Suppose $y=\\arccos x$ for $-1<x<1$. Which reasoning is correct?",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle \\cos y=x,\\ y'=-\\sqrt{1-x^2}$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle \\sin y=-\\sqrt{1-x^2},\\ y'=\\frac1{\\sqrt{1-x^2}}$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle \\cos y=x,\\ \\sin y=-\\sqrt{1-x^2},\\ y'=-\\frac1{\\sqrt{1-x^2}}$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle \\cos y=x,\\ \\sin y=\\sqrt{1-x^2},\\ y'=-\\frac1{\\sqrt{1-x^2}}$"
      }
    ],
    "answer_label": "D",
    "explanation": "$0<y<\\pi$, so sine is positive. B and C use wrong branch; A fails to reciprocate.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T4.F4.TY2.Q028",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Suppose $y=\\arctan x$. Which derivation is correct?",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle \\sin y=x,\\ y'=1/\\cos y$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle \\tan y=x,\\ \\tan y\\,y'=1,\\ y'=1/x$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle \\tan y=x,\\ \\sec^2y\\,y'=1,\\ y'=\\frac1{1+x^2}$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle \\tan y=x,\\ y'=1+\\tan^2y$"
      }
    ],
    "answer_label": "C",
    "explanation": "Implicit differentiation yields $\\sec^2y\\,y'=1$. B misdifferentiates tangent; A uses sine; D fails to reciprocate.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T4.F4.TY2.Q032",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "On $[-\\pi/2,\\pi/2]$, let $g(t)=\\sin t$ and $h=g^{-1}$. Find $h'(\\sqrt3/2)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle 2$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle \\frac{1}{2}$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle \\frac{-1}{2}$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle -2$"
      }
    ],
    "answer_label": "A",
    "explanation": "$g(\\pi/3)=\\sqrt3/2$, $g'(\\pi/3)=1/2$, so inverse slope is 2. B fails to reciprocate; C and D change sign incorrectly.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T4.F5.TY1.Q011",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Where does $\\arctan x$ have derivative $1/10$?",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle x=3\\text{ only}$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle x=\\pm3$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle x=\\pm\\sqrt{10}$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle x=-3\\text{ only}$"
      }
    ],
    "answer_label": "B",
    "explanation": "$1+x^2=10$. A and D discard one root; C fails to subtract 1.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T4.F5.TY1.Q034",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Where does $\\arccos x$ have derivative $-2$?",
    "choices": [
      {
        "label": "A",
        "text": "No real values."
      },
      {
        "label": "B",
        "text": "$\\displaystyle \\pm1/2$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle \\pm\\sqrt3/2$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle 0\\text{ only}$"
      }
    ],
    "answer_label": "C",
    "explanation": "$\\sqrt{1-x^2}=1/2$, so $x^2=3/4$. D gives slope $-1$; B confuses radical and input; A ignores valid roots.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T4.F5.TY2.Q033",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Let $f(x)=\\arctan(kx)$. If $f'(0)=5$, find $k$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle 5$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle 25$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle -5$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle \\frac{1}{5}$"
      }
    ],
    "answer_label": "A",
    "explanation": "$f'(0)=k$. D reciprocates; C changes sign; B squares slope.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T4.F5.TY2.Q035",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "For $c>0$, let $f(x)=\\arctan(cx)$. If $f'(1)=1/2$, find $c$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle 1$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle \\frac{1}{2}$"
      },
      {
        "label": "C",
        "text": "No positive solution."
      },
      {
        "label": "D",
        "text": "$\\displaystyle 2$"
      }
    ],
    "answer_label": "A",
    "explanation": "$c/(1+c^2)=1/2$ gives $(c-1)^2=0$. B and D fail equation; C overlooks repeated root.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T4.F6.TY1.Q036",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Where does $\\arcsin(2x-1)$ have a finite derivative?",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle [0,1]$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle \\mathbb R$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle (-\\infty,0)\\cup(1,\\infty)$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle (0,1)$"
      }
    ],
    "answer_label": "D",
    "explanation": "Require $-1<2x-1<1$. A includes endpoints; B ignores domain; C is outside domain.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T4.F6.TY1.Q038",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "For $f(x)=\\arcsin x$ and $g(x)=\\arccos x$, what is true at $x=1$?",
    "choices": [
      {
        "label": "A",
        "text": "Only f is defined."
      },
      {
        "label": "B",
        "text": "Neither is defined."
      },
      {
        "label": "C",
        "text": "Both have derivative zero."
      },
      {
        "label": "D",
        "text": "Both defined, neither has a finite two-sided derivative."
      }
    ],
    "answer_label": "D",
    "explanation": "Values are $\\pi/2$ and 0; neither has finite endpoint slope. C confuses continuity and differentiability; A and B misstate domains.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T4.F6.TY2.Q012",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "Let $f(x)=\\arcsin(1-x^4)$. What is true of $f'(0)$?",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle f'(0)=0$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle f'(0)=1$"
      },
      {
        "label": "C",
        "text": "No derivative because the outer derivative is not finite at 1."
      },
      {
        "label": "D",
        "text": "No derivative because negative inputs are outside the domain."
      }
    ],
    "answer_label": "A",
    "explanation": "Near zero, $f(x)=\\pi/2-2\\arcsin(x^2/\\sqrt2)$. Since $\\arcsin z/z\\to1$, the difference quotient tends to zero. B gives wrong slope; C misuses chain rule; D ignores two-sided domain.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T4.F6.TY2.Q037",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "For $f(x)=\\arccos(1-x^2)$, what is true of $f'(0)$?",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle 0$"
      },
      {
        "label": "B",
        "text": "Does not exist."
      },
      {
        "label": "C",
        "text": "$\\displaystyle \\sqrt2$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle -\\sqrt2$"
      }
    ],
    "answer_label": "B",
    "explanation": "Locally $f(x)=2\\arcsin(\\lvert x\\rvert/\\sqrt2)$. Right and left slopes are $\\sqrt2$ and $-\\sqrt2$. A misuses chain rule; C and D use only one side.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T4.F6.TY2.Q039",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "Let $f(x)=\\arcsin(1-2x^2)$ for $-1\\le x\\le1$. Which expression equals $f\\prime(x)$ for $0<x<1$?",
    "choices": [
      {
        "label": "A",
        "text": "$-4x/\\sqrt{1-x^2}$"
      },
      {
        "label": "B",
        "text": "$-2/\\sqrt{1-x^2}$"
      },
      {
        "label": "C",
        "text": "$2/\\sqrt{1-x^2}$"
      },
      {
        "label": "D",
        "text": "$-2x/\\sqrt{1-x^2}$"
      }
    ],
    "answer_label": "B",
    "explanation": "For $0<x<1$, $\\sqrt{1-(1-2x^2)^2}=2x\\sqrt{1-x^2}$. Cancel $x$ in $-4x/(2x\\sqrt{1-x^2})$. A misses the denominator factor; C loses the sign; D fails to cancel $x$.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T4.F7.TY1.Q040",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "For $|x|<1/3$, a student writes $(\\arcsin(3x))'=1/\\sqrt{1-9x^2}$. Identify the error.",
    "choices": [
      {
        "label": "A",
        "text": "No error."
      },
      {
        "label": "B",
        "text": "Use arctan rule."
      },
      {
        "label": "C",
        "text": "Missing factor 3."
      },
      {
        "label": "D",
        "text": "Radicand should be $1-3x^2$."
      }
    ],
    "answer_label": "C",
    "explanation": "Correct derivative is $3/\\sqrt{1-9x^2}$. D squares incorrectly; B selects wrong rule; A misses chain factor.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T4.F7.TY1.Q041",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "A student writes $(\\arccos x)'=1/\\sqrt{1-x^2}$. Correct the expression.",
    "choices": [
      {
        "label": "A",
        "text": "Insert a negative sign."
      },
      {
        "label": "B",
        "text": "Use denominator $1+x^2$."
      },
      {
        "label": "C",
        "text": "Replace with zero."
      },
      {
        "label": "D",
        "text": "No correction."
      }
    ],
    "answer_label": "A",
    "explanation": "Arccos decreases. B uses arctan; C treats inverse as constant; D ignores missing minus.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T4.F7.TY1.Q042",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "A student differentiates $\\arctan(x^2)$ as $2x/(1+x^2)$. Correct it.",
    "choices": [
      {
        "label": "A",
        "text": "Replace denominator by $1+x^4$."
      },
      {
        "label": "B",
        "text": "Insert a minus sign."
      },
      {
        "label": "C",
        "text": "Replace denominator by $\\sqrt{1-x^4}$."
      },
      {
        "label": "D",
        "text": "Replace $2x$ by 1."
      }
    ],
    "answer_label": "A",
    "explanation": "Square the entire argument. D changes correct inner derivative; C uses arcsin; B adds unjustified sign.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T4.F7.TY2.Q043",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "A student says continuity of arccos at 1 implies differentiability there. What is the flaw?",
    "choices": [
      {
        "label": "A",
        "text": "Arccos is discontinuous at 1."
      },
      {
        "label": "B",
        "text": "Continuity does not guarantee differentiability; 1 is a domain endpoint."
      },
      {
        "label": "C",
        "text": "Endpoint derivative must be zero."
      },
      {
        "label": "D",
        "text": "Continuity and monotonicity imply differentiability."
      }
    ],
    "answer_label": "B",
    "explanation": "Differentiability implies continuity, not conversely. A is false; D is false even for monotone functions; C has no basis.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T4.F8.TY1.Q044",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "A camera angle is $\\theta(t)=\\arctan(t/3)$ radians, with $t$ in seconds. Find $\\theta'(3)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle \\frac12\\ \\mathrm{rad/s}$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle \\frac16\\ \\mathrm{deg/s}$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle \\frac16\\ \\mathrm{rad/s}$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle \\frac13\\ \\mathrm{rad/s}$"
      }
    ],
    "answer_label": "C",
    "explanation": "$(1/3)/(1+3^2/9)=1/6$ rad/s. D omits outer factor; A omits inner factor; B uses incorrect units.",
    "representation": "contextual"
  },
  {
    "key": "U3.T4.F8.TY2.Q045",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "inverse-trig-derivatives",
    "ced_topic": "3.4",
    "difficulty": "medium",
    "calculator": true,
    "prompt": "Let $f(x)=\\arctan x$ and $f(a)=0.9$ radians. Find $f'(a)$ to two decimal places.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle 0.39$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle 1.61$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle 0.62$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle 2.59$"
      }
    ],
    "answer_label": "A",
    "explanation": "$a=\\tan(0.9)$, so $f'(a)=\\cos^2(0.9)\\approx0.3864$. C uses $\\cos(0.9)$ instead of its square; B approximates $1/\\cos(0.9)$; D approximates $1/\\cos^2(0.9)$.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T5.F1.TY1.Q001",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "What does $f''(x)$ represent?",
    "choices": [
      {
        "label": "A",
        "text": "The derivative of $f'$."
      },
      {
        "label": "B",
        "text": "The reciprocal of $f'$."
      },
      {
        "label": "C",
        "text": "The derivative of $x^2f$."
      },
      {
        "label": "D",
        "text": "The square of $f'$."
      }
    ],
    "answer_label": "A",
    "explanation": "Differentiate $f'$ once more. B reciprocates; D squares; C differentiates a different function.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T5.F1.TY2.Q002",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "$f(x)=3x^4-2x^2+7$. Find $f''(x)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle 12x^3-4x$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle 72x$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle 36x^2-4$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle 36x^2-2$"
      }
    ],
    "answer_label": "C",
    "explanation": "Differentiate twice: $12x^3-4x$, then $36x^2-4$. D misses factor 2; B takes third derivative; A stops early.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T5.F1.TY2.Q003",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "$f(x)=x^{-2}$, $x>0$. Find $f'''(x)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle 24x^{-5}$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle -6x^{-5}$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle -24x^{-5}$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle 6x^{-4}$"
      }
    ],
    "answer_label": "C",
    "explanation": "Successive coefficients are $-2,6,-24$. D stops at order two; B misses factor 4; A loses sign.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T5.F1.TY2.Q004",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "$f(x)=\\sqrt x$, $x>0$. Find $f''(4)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle \\frac{-1}{16}$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle \\frac{1}{32}$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle \\frac{-1}{32}$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle \\frac{1}{4}$"
      }
    ],
    "answer_label": "C",
    "explanation": "$f''=-1/(4x^{3/2})$; at 4 this is $-1/32$. D uses first derivative; B loses sign; A miscomputes power.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T5.F1.TY2.Q005",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "$f(x)=\\ln x$. Find $f'''(x)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle 2/x^3$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle 1/x^3$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle -2/x^3$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle -1/x^2$"
      }
    ],
    "answer_label": "A",
    "explanation": "The derivatives are $1/x,-1/x^2,2/x^3$. C loses sign; B misses coefficient; D stops early.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T5.F1.TY2.Q006",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "$f(x)=e^{-2x}$. Find $f''(0)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle 4$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle 1$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle -4$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle -2$"
      }
    ],
    "answer_label": "A",
    "explanation": "$f''=4e^{-2x}$. C loses sign; D uses first derivative; B uses original value.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T5.F1.TY2.Q007",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "$f(x)=\\arctan x$. Find $f''(1)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle 0$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle \\frac{-1}{2}$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle \\frac{1}{2}$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle -1$"
      }
    ],
    "answer_label": "B",
    "explanation": "$f'=1/(1+x^2)$; $f''=-2x/(1+x^2)^2$. C loses the negative sign; A incorrectly assumes a horizontal tangent to the first derivative; D misses a factor of 2 in the denominator.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T5.F2.TY1.Q008",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "$f(x)=\\sin(3x)$. Find $f''(x)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle 3\\cos(3x)$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle -3\\sin(3x)$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle -9\\sin(3x)$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle 9\\cos(3x)$"
      }
    ],
    "answer_label": "C",
    "explanation": "Two chain factors of 3 and the cosine derivative give $-9\\sin(3x)$. B misses factor; A stops early; D uses wrong trig function.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T5.F2.TY1.Q009",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "$f(x)=e^{x^2}$. Find $f''(x)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle (2+4x^2)e^{x^2}$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle (2+2x)e^{x^2}$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle 4x^2e^{x^2}$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle 2e^{x^2}$"
      }
    ],
    "answer_label": "A",
    "explanation": "Differentiate $2xe^{x^2}$ by product rule. C omits first term; D omits second; B misses chain factor.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T5.F2.TY1.Q013",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "Let $h=F\\circ g$. At $x=1$, $g(1)=2$, $g'(1)=3$, $g''(1)=-1$; $F'(2)=4$, $F''(2)=5$. Find $h''(1)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle 49$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle 45$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle 11$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle 41$"
      }
    ],
    "answer_label": "D",
    "explanation": "$h''=F''(g)(g')^2+F'(g)g''=45-4$. C omits square; A reverses sign; B omits second term.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T5.F2.TY1.Q015",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "$f(x)=\\cos(x^2)$. Find $f''(0)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle -2$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle -4$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle 0$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle 1$"
      }
    ],
    "answer_label": "C",
    "explanation": "$f''=-2\\sin(x^2)-4x^2\\cos(x^2)$, zero at 0. B ignores $x^2$; A mis-evaluates sine; D uses $f(0)$.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T5.F2.TY2.Q010",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "$f(x)=x\\sin x$. Find $f''(x)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle \\cos x-x\\sin x$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle 2\\cos x+x\\sin x$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle -x\\sin x$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle 2\\cos x-x\\sin x$"
      }
    ],
    "answer_label": "D",
    "explanation": "$f'=\\sin x+x\\cos x$. A misses one cosine; B loses negative sign; C misses both cosine terms.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T5.F2.TY2.Q011",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "For $f(x)=x/(x+1)$, $x\\ne-1$, which procedure correctly obtains $f''(x)$?",
    "choices": [
      {
        "label": "A",
        "text": "Rewrite as $1-(x+1)^{-1}$, then differentiate twice: $-2/(x+1)^3$"
      },
      {
        "label": "B",
        "text": "Rewrite as $1+(x+1)^{-1}$, then differentiate twice: $2/(x+1)^3$"
      },
      {
        "label": "C",
        "text": "Differentiate numerator and denominator separately twice: $0$"
      },
      {
        "label": "D",
        "text": "Apply the quotient rule once: $1/(x+1)^2$"
      }
    ],
    "answer_label": "A",
    "explanation": "Algebraic rewriting makes repeated power and chain differentiation efficient. B changes the original function, C is not a quotient rule, and D gives only the first derivative.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T5.F2.TY2.Q012",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "$f(x)=\\ln(1+x^2)$. Find $f''(0)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle -2$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle 2$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle 1$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle 0$"
      }
    ],
    "answer_label": "B",
    "explanation": "$f'=2x/(1+x^2)$, so $f''=2(1-x^2)/(1+x^2)^2$. C misses factor 2; D uses $f'(0)$; A reverses sign.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T5.F2.TY2.Q014",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "$f(x)=x^2e^x$. Find $f'''(0)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle 6$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle 3$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle 0$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle 2$"
      }
    ],
    "answer_label": "A",
    "explanation": "$f''=(x^2+4x+2)e^x$; $f'''=(x^2+6x+6)e^x$. B misses product contributions; C uses first derivative; D uses second derivative.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T5.F3.TY1.Q016",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "$x^2+y^2=13$. Find $y''$ at $(2,3)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle \\frac{13}{27}$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle \\frac{-1}{3}$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle \\frac{-2}{3}$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle \\frac{-13}{27}$"
      }
    ],
    "answer_label": "D",
    "explanation": "$y'=-x/y$; $1+(y')^2+yy''=0$. Substitute $-2/3$. B omits squared term; C uses first derivative; A loses sign.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T5.F3.TY1.Q017",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "A differentiable curve satisfies $xg(y)=6$. At $(2,1)$, $g(1)=3$, $g\\prime(1)=2$, and $g\\prime\\prime(1)=-1$. Find $y\\prime\\prime$ at this point.",
    "choices": [
      {
        "label": "A",
        "text": "$3/8$"
      },
      {
        "label": "B",
        "text": "$-3/4$"
      },
      {
        "label": "C",
        "text": "$9/32$"
      },
      {
        "label": "D",
        "text": "$33/32$"
      }
    ],
    "answer_label": "D",
    "explanation": "Differentiate: $g(y)+xg\\prime(y)y\\prime=0$, giving $y\\prime=-3/4$. Differentiate again: $2g\\prime(y)y\\prime+xg\\prime\\prime(y)(y\\prime)^2+xg\\prime(y)y\\prime\\prime=0$. Hence $4y\\prime\\prime=3+9/8=33/8$. A retains only one product contribution and omits curvature; B uses the first derivative; C retains only the curvature contribution.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T5.F3.TY1.Q018",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "$y^2=x^3$. Find $y''$ at $(1,1)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle \\frac{3}{2}$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle 3$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle \\frac{3}{4}$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle \\frac{-3}{4}$"
      }
    ],
    "answer_label": "C",
    "explanation": "$2yy'=3x^2$; $2(y')^2+2yy''=6x$. Substitute $y'=3/2$. D reverses sign; A uses first derivative; B omits square.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T5.F3.TY1.Q019",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "$e^y=x+1$. Find $y''$ at $(0,0)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle 0$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle -2$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle -1$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle 1$"
      }
    ],
    "answer_label": "C",
    "explanation": "$e^yy'=1$; $e^y[(y')^2+y'']=0$. At point $y'=1$. D uses first derivative; A omits square; B doubles it.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T5.F3.TY1.Q020",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "$x+y+\\sin y=0$. Find $y''$ at $(0,0)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle \\frac{-1}{4}$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle \\frac{-1}{2}$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle 0$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle \\frac{1}{4}$"
      }
    ],
    "answer_label": "C",
    "explanation": "$(1+\\cos y)y'=-1$; $(1+\\cos y)y''=\\sin y(y')^2$. At $y=0$ RHS is zero. D uses square of first derivative; B uses first derivative; A negates its square.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T5.F3.TY2.Q021",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "For $x^2+xy+y^2=7$, which equation follows after differentiating twice?",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle 2+2y'+2(y')^2=0$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle 2+y'+xy''+2yy''=0$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle 2+2y'+xy''+2yy''=0$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle 2+2y'+xy''+2(y')^2+2yy''=0$"
      }
    ],
    "answer_label": "D",
    "explanation": "Differentiate $2x+y+xy'+2yy'=0$. C omits square; B omits square and product contribution; A omits second derivative terms.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T5.F3.TY3.Q022",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "For $x^2+y^2=4$ at $(2,0)$, what can be concluded about $y''$ as a function of $x$?",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle y''=\\frac{-1}{2}$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle y''=2$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle y''=0$"
      },
      {
        "label": "D",
        "text": "No ordinary finite second derivative of a differentiable local branch exists there."
      }
    ],
    "answer_label": "D",
    "explanation": "The circle has a vertical tangent there, and no finite $y'$. C, B and A all assume a valid differentiable branch.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T5.F4.TY1.Q023",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Find the 38th derivative of $\\sin x$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle \\sin x$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle -\\cos x$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle -\\sin x$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle \\cos x$"
      }
    ],
    "answer_label": "C",
    "explanation": "38 leaves remainder 2 modulo 4. B corresponds to remainder 3; D to 1; A to 0.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T5.F4.TY1.Q024",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "For $f(x)=\\sin(2x)$, find $f^{(21)}(0)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle 0$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle 2^{21}$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle -2^{21}$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle 2^{20}$"
      }
    ],
    "answer_label": "B",
    "explanation": "Each derivative contributes a factor 2. Order 21 has remainder 1 modulo 4, so cosine at zero is 1. A uses sine; C reverses sign; D misses factor 2.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T5.F4.TY2.Q025",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "For $f(x)=x^7$, which is $f^{(8)}(x)$?",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle 7!x^{-1}$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle 0$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle 5040x$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle 5040$"
      }
    ],
    "answer_label": "B",
    "explanation": "Seventh derivative is constant $7!$, eighth is zero. D stops at seventh; C retains variable; A continues power rule incorrectly.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T5.F4.TY2.Q026",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "For $f(x)=1/x$, $x>0$, find $f^{(n)}(x)$, $n\\ge1$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle \\frac{(-1)^n n!}{x^{n+1}}$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle \\frac{(-1)^n n!}{x^n}$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle \\frac{(-1)^{n+1}n!}{x^{n+1}}$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle \\frac{n!}{x^{n+1}}$"
      }
    ],
    "answer_label": "A",
    "explanation": "Each derivative increases denominator power and multiplies by negative exponent. B shifts power; D misses alternating signs; C shifts sign.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T5.F4.TY2.Q028",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "For $f(x)=x^2e^x$, which expression equals $f^{(n)}(x)$ for every integer $n\\ge2$?",
    "choices": [
      {
        "label": "A",
        "text": "$e^x(x^2+nx+n(n-1))$"
      },
      {
        "label": "B",
        "text": "$e^x(x^2+2nx+n(n-1))$"
      },
      {
        "label": "C",
        "text": "$e^x(x^2+2nx+n^2)$"
      },
      {
        "label": "D",
        "text": "$e^x(x^2+2x+2)$"
      }
    ],
    "answer_label": "B",
    "explanation": "Each differentiation replaces the polynomial factor $P$ by $P+P\\prime$. Starting with $x^2$, the coefficient of $x$ increases by 2 each time, and the constant increases by $2(n-1)$ at step $n$. Thus the constant is $n(n-1)$. A misses a factor of 2; C adds $n$ too much; D freezes the polynomial at an incorrect fixed form.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T5.F4.TY3.Q027",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "For $f(x)=e^{4x}$, find $f^{(n)}(x)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle 4^ne^x$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle e^{4nx}$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle 4ne^{4x}$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle 4^ne^{4x}$"
      }
    ],
    "answer_label": "D",
    "explanation": "Each differentiation contributes factor 4 without changing exponent. A changes exponent; C adds factors; B changes exponent instead of coefficient.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T5.F5.TY1.Q029",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The graph of $f'$ is shown. Find $f''(1)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle 1$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle 2$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle -2$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle -1$"
      }
    ],
    "answer_label": "C",
    "explanation": "Slope is $(-1-3)/2=-2$. A reads height; D uses wrong change; B reverses sign.",
    "representation": "graphical",
    "figure": {
      "kind": "graph",
      "window": {
        "xMin": -0.5,
        "xMax": 2.5,
        "yMin": -2.5,
        "yMax": 4
      },
      "curves": [
        {
          "points": [
            [
              -0.5,
              4
            ],
            [
              -0.48125,
              3.9625
            ],
            [
              -0.4625,
              3.925
            ],
            [
              -0.44375,
              3.8875
            ],
            [
              -0.425,
              3.85
            ],
            [
              -0.40625,
              3.8125
            ],
            [
              -0.3875,
              3.775
            ],
            [
              -0.36875,
              3.7375
            ],
            [
              -0.35,
              3.7
            ],
            [
              -0.33125,
              3.6625
            ],
            [
              -0.3125,
              3.625
            ],
            [
              -0.29375,
              3.5875
            ],
            [
              -0.275,
              3.55
            ],
            [
              -0.25625,
              3.5125
            ],
            [
              -0.2375,
              3.475
            ],
            [
              -0.21875,
              3.4375
            ],
            [
              -0.2,
              3.4
            ],
            [
              -0.18125000000000002,
              3.3625
            ],
            [
              -0.16249999999999998,
              3.325
            ],
            [
              -0.14375,
              3.2875
            ],
            [
              -0.125,
              3.25
            ],
            [
              -0.10625000000000001,
              3.2125
            ],
            [
              -0.08750000000000002,
              3.175
            ],
            [
              -0.06874999999999998,
              3.1375
            ],
            [
              -0.04999999999999999,
              3.1
            ],
            [
              -0.03125,
              3.0625
            ],
            [
              -0.012500000000000011,
              3.025
            ],
            [
              0.006249999999999978,
              2.9875
            ],
            [
              0.025000000000000022,
              2.95
            ],
            [
              0.043749999999999956,
              2.9125
            ],
            [
              0.0625,
              2.875
            ],
            [
              0.08125000000000004,
              2.8375
            ],
            [
              0.09999999999999998,
              2.8
            ],
            [
              0.11875000000000002,
              2.7625
            ],
            [
              0.13749999999999996,
              2.725
            ],
            [
              0.15625,
              2.6875
            ],
            [
              0.17500000000000004,
              2.65
            ],
            [
              0.19374999999999998,
              2.6125
            ],
            [
              0.21250000000000002,
              2.575
            ],
            [
              0.23124999999999996,
              2.5375
            ],
            [
              0.25,
              2.5
            ],
            [
              0.26875000000000004,
              2.4625
            ],
            [
              0.2875,
              2.425
            ],
            [
              0.30625,
              2.3875
            ],
            [
              0.32499999999999996,
              2.35
            ],
            [
              0.34375,
              2.3125
            ],
            [
              0.36250000000000004,
              2.275
            ],
            [
              0.38125,
              2.2375
            ],
            [
              0.4,
              2.2
            ],
            [
              0.41874999999999996,
              2.1625
            ],
            [
              0.4375,
              2.125
            ],
            [
              0.45625000000000004,
              2.0875
            ],
            [
              0.475,
              2.05
            ],
            [
              0.49375,
              2.0125
            ],
            [
              0.5125,
              1.975
            ],
            [
              0.53125,
              1.9375
            ],
            [
              0.55,
              1.9
            ],
            [
              0.5687500000000001,
              1.8624999999999998
            ],
            [
              0.5874999999999999,
              1.8250000000000002
            ],
            [
              0.60625,
              1.7875
            ],
            [
              0.625,
              1.75
            ],
            [
              0.64375,
              1.7125
            ],
            [
              0.6625000000000001,
              1.6749999999999998
            ],
            [
              0.6812499999999999,
              1.6375000000000002
            ],
            [
              0.7,
              1.6
            ],
            [
              0.71875,
              1.5625
            ],
            [
              0.7375,
              1.525
            ],
            [
              0.7562500000000001,
              1.4874999999999998
            ],
            [
              0.7749999999999999,
              1.4500000000000002
            ],
            [
              0.79375,
              1.4125
            ],
            [
              0.8125,
              1.375
            ],
            [
              0.83125,
              1.3375
            ],
            [
              0.8500000000000001,
              1.2999999999999998
            ],
            [
              0.8687499999999999,
              1.2625000000000002
            ],
            [
              0.8875,
              1.225
            ],
            [
              0.90625,
              1.1875
            ],
            [
              0.925,
              1.15
            ],
            [
              0.9437500000000001,
              1.1124999999999998
            ],
            [
              0.9624999999999999,
              1.0750000000000002
            ],
            [
              0.98125,
              1.0375
            ],
            [
              1,
              1
            ],
            [
              1.01875,
              0.9624999999999999
            ],
            [
              1.0375,
              0.9249999999999998
            ],
            [
              1.05625,
              0.8875000000000002
            ],
            [
              1.075,
              0.8500000000000001
            ],
            [
              1.09375,
              0.8125
            ],
            [
              1.1125,
              0.7749999999999999
            ],
            [
              1.13125,
              0.7374999999999998
            ],
            [
              1.15,
              0.7000000000000002
            ],
            [
              1.16875,
              0.6625000000000001
            ],
            [
              1.1875,
              0.625
            ],
            [
              1.20625,
              0.5874999999999999
            ],
            [
              1.225,
              0.5499999999999998
            ],
            [
              1.24375,
              0.5125000000000002
            ],
            [
              1.2625,
              0.4750000000000001
            ],
            [
              1.28125,
              0.4375
            ],
            [
              1.3,
              0.3999999999999999
            ],
            [
              1.31875,
              0.3624999999999998
            ],
            [
              1.3375,
              0.3250000000000002
            ],
            [
              1.35625,
              0.2875000000000001
            ],
            [
              1.375,
              0.25
            ],
            [
              1.39375,
              0.2124999999999999
            ],
            [
              1.4125,
              0.17499999999999982
            ],
            [
              1.43125,
              0.13750000000000018
            ],
            [
              1.45,
              0.10000000000000009
            ],
            [
              1.46875,
              0.0625
            ],
            [
              1.4875,
              0.02499999999999991
            ],
            [
              1.50625,
              -0.012500000000000178
            ],
            [
              1.525,
              -0.04999999999999982
            ],
            [
              1.5437500000000002,
              -0.08750000000000036
            ],
            [
              1.5625,
              -0.125
            ],
            [
              1.5812499999999998,
              -0.16249999999999964
            ],
            [
              1.6,
              -0.20000000000000018
            ],
            [
              1.61875,
              -0.23749999999999982
            ],
            [
              1.6375000000000002,
              -0.27500000000000036
            ],
            [
              1.65625,
              -0.3125
            ],
            [
              1.6749999999999998,
              -0.34999999999999964
            ],
            [
              1.69375,
              -0.3875000000000002
            ],
            [
              1.7125,
              -0.4249999999999998
            ],
            [
              1.7312500000000002,
              -0.46250000000000036
            ],
            [
              1.75,
              -0.5
            ],
            [
              1.7687499999999998,
              -0.5374999999999996
            ],
            [
              1.7875,
              -0.5750000000000002
            ],
            [
              1.80625,
              -0.6124999999999998
            ],
            [
              1.8250000000000002,
              -0.6500000000000004
            ],
            [
              1.84375,
              -0.6875
            ],
            [
              1.8624999999999998,
              -0.7249999999999996
            ],
            [
              1.88125,
              -0.7625000000000002
            ],
            [
              1.9,
              -0.7999999999999998
            ],
            [
              1.9187500000000002,
              -0.8375000000000004
            ],
            [
              1.9375,
              -0.875
            ],
            [
              1.9562499999999998,
              -0.9124999999999996
            ],
            [
              1.975,
              -0.9500000000000002
            ],
            [
              1.99375,
              -0.9874999999999998
            ],
            [
              2.0125,
              -1.0250000000000004
            ],
            [
              2.03125,
              -1.0625
            ],
            [
              2.05,
              -1.0999999999999996
            ],
            [
              2.06875,
              -1.1375000000000002
            ],
            [
              2.0875,
              -1.1749999999999998
            ],
            [
              2.10625,
              -1.2125000000000004
            ],
            [
              2.125,
              -1.25
            ],
            [
              2.14375,
              -1.2874999999999996
            ],
            [
              2.1625,
              -1.3250000000000002
            ],
            [
              2.18125,
              -1.3624999999999998
            ],
            [
              2.2,
              -1.4000000000000004
            ],
            [
              2.21875,
              -1.4375
            ],
            [
              2.2375,
              -1.4749999999999996
            ],
            [
              2.25625,
              -1.5125000000000002
            ],
            [
              2.275,
              -1.5499999999999998
            ],
            [
              2.29375,
              -1.5875000000000004
            ],
            [
              2.3125,
              -1.625
            ],
            [
              2.33125,
              -1.6624999999999996
            ],
            [
              2.35,
              -1.7000000000000002
            ],
            [
              2.36875,
              -1.7374999999999998
            ],
            [
              2.3875,
              -1.7750000000000004
            ],
            [
              2.40625,
              -1.8125
            ],
            [
              2.425,
              -1.8499999999999996
            ],
            [
              2.44375,
              -1.8875000000000002
            ],
            [
              2.4625,
              -1.9249999999999998
            ],
            [
              2.48125,
              -1.9625000000000004
            ],
            [
              2.5,
              -2
            ]
          ],
          "smooth": false
        }
      ],
      "markers": [
        {
          "x": 0,
          "y": 3,
          "kind": "closed"
        },
        {
          "x": 2,
          "y": -1,
          "kind": "closed"
        }
      ],
      "xLabel": "x",
      "yLabel": "f'(x)"
    }
  },
  {
    "key": "U3.T5.F5.TY1.Q030",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The graph of $f\\prime$ is a parabola, as shown. Which expression represents $f\\prime\\prime(x)$ on $(0,4)$?",
    "choices": [
      {
        "label": "A",
        "text": "$2x-2$"
      },
      {
        "label": "B",
        "text": "$2x-4$"
      },
      {
        "label": "C",
        "text": "$(x-2)^2-1$"
      },
      {
        "label": "D",
        "text": "$4-2x$"
      }
    ],
    "answer_label": "B",
    "explanation": "The graph has vertex $(2,-1)$ and passes through $(0,3)$, so $f\\prime(x)=(x-2)^2-1$. Differentiating gives $2x-4$. A shifts the zero of the derivative; C copies the plotted first derivative; D reverses its slope.",
    "representation": "graphical",
    "figure": {
      "kind": "graph",
      "window": {
        "xMin": -1,
        "xMax": 4,
        "yMin": -2,
        "yMax": 5
      },
      "curves": [
        {
          "points": [
            [
              0,
              3
            ],
            [
              0.025,
              2.9006250000000002
            ],
            [
              0.05,
              2.8024999999999998
            ],
            [
              0.075,
              2.7056250000000004
            ],
            [
              0.1,
              2.61
            ],
            [
              0.125,
              2.515625
            ],
            [
              0.15,
              2.4225000000000003
            ],
            [
              0.175,
              2.330625
            ],
            [
              0.2,
              2.24
            ],
            [
              0.225,
              2.150625
            ],
            [
              0.25,
              2.0625
            ],
            [
              0.275,
              1.9756250000000004
            ],
            [
              0.3,
              1.8899999999999997
            ],
            [
              0.325,
              1.805625
            ],
            [
              0.35,
              1.7224999999999997
            ],
            [
              0.375,
              1.640625
            ],
            [
              0.4,
              1.5600000000000005
            ],
            [
              0.425,
              1.4806249999999999
            ],
            [
              0.45,
              1.4025000000000003
            ],
            [
              0.475,
              1.3256249999999996
            ],
            [
              0.5,
              1.25
            ],
            [
              0.525,
              1.1756250000000001
            ],
            [
              0.55,
              1.1025
            ],
            [
              0.575,
              1.0306250000000001
            ],
            [
              0.6,
              0.9599999999999997
            ],
            [
              0.625,
              0.890625
            ],
            [
              0.65,
              0.8225000000000002
            ],
            [
              0.675,
              0.755625
            ],
            [
              0.7,
              0.6900000000000002
            ],
            [
              0.725,
              0.6256249999999999
            ],
            [
              0.75,
              0.5625
            ],
            [
              0.775,
              0.5006250000000003
            ],
            [
              0.8,
              0.43999999999999995
            ],
            [
              0.825,
              0.3806250000000002
            ],
            [
              0.85,
              0.3224999999999998
            ],
            [
              0.875,
              0.265625
            ],
            [
              0.9,
              0.2100000000000002
            ],
            [
              0.925,
              0.1556249999999999
            ],
            [
              0.95,
              0.10250000000000004
            ],
            [
              0.975,
              0.05062499999999992
            ],
            [
              1,
              0
            ],
            [
              1.025,
              -0.049374999999999836
            ],
            [
              1.05,
              -0.09750000000000003
            ],
            [
              1.075,
              -0.14437499999999992
            ],
            [
              1.1,
              -0.19000000000000017
            ],
            [
              1.125,
              -0.234375
            ],
            [
              1.15,
              -0.27749999999999986
            ],
            [
              1.175,
              -0.3193750000000001
            ],
            [
              1.2,
              -0.3599999999999999
            ],
            [
              1.225,
              -0.39937500000000015
            ],
            [
              1.25,
              -0.4375
            ],
            [
              1.275,
              -0.4743749999999999
            ],
            [
              1.3,
              -0.51
            ],
            [
              1.325,
              -0.5443749999999999
            ],
            [
              1.35,
              -0.5775000000000001
            ],
            [
              1.375,
              -0.609375
            ],
            [
              1.4,
              -0.6399999999999999
            ],
            [
              1.425,
              -0.669375
            ],
            [
              1.45,
              -0.6975
            ],
            [
              1.475,
              -0.7243750000000001
            ],
            [
              1.5,
              -0.75
            ],
            [
              1.525,
              -0.7743749999999999
            ],
            [
              1.55,
              -0.7975000000000001
            ],
            [
              1.575,
              -0.819375
            ],
            [
              1.6,
              -0.8400000000000001
            ],
            [
              1.625,
              -0.859375
            ],
            [
              1.65,
              -0.8775
            ],
            [
              1.675,
              -0.894375
            ],
            [
              1.7,
              -0.9099999999999999
            ],
            [
              1.725,
              -0.9243750000000001
            ],
            [
              1.75,
              -0.9375
            ],
            [
              1.775,
              -0.949375
            ],
            [
              1.8,
              -0.96
            ],
            [
              1.825,
              -0.969375
            ],
            [
              1.85,
              -0.9775
            ],
            [
              1.875,
              -0.984375
            ],
            [
              1.9,
              -0.99
            ],
            [
              1.925,
              -0.994375
            ],
            [
              1.95,
              -0.9974999999999999
            ],
            [
              1.975,
              -0.999375
            ],
            [
              2,
              -1
            ],
            [
              2.025,
              -0.999375
            ],
            [
              2.05,
              -0.9975
            ],
            [
              2.075,
              -0.994375
            ],
            [
              2.1,
              -0.99
            ],
            [
              2.125,
              -0.984375
            ],
            [
              2.15,
              -0.9775
            ],
            [
              2.175,
              -0.9693750000000001
            ],
            [
              2.2,
              -0.96
            ],
            [
              2.225,
              -0.949375
            ],
            [
              2.25,
              -0.9375
            ],
            [
              2.275,
              -0.9243750000000001
            ],
            [
              2.3,
              -0.9100000000000001
            ],
            [
              2.325,
              -0.8943749999999999
            ],
            [
              2.35,
              -0.8775
            ],
            [
              2.375,
              -0.859375
            ],
            [
              2.4,
              -0.8400000000000001
            ],
            [
              2.425,
              -0.8193750000000002
            ],
            [
              2.45,
              -0.7974999999999999
            ],
            [
              2.475,
              -0.7743749999999999
            ],
            [
              2.5,
              -0.75
            ],
            [
              2.525,
              -0.7243750000000001
            ],
            [
              2.55,
              -0.6975000000000002
            ],
            [
              2.575,
              -0.6693749999999998
            ],
            [
              2.6,
              -0.6399999999999999
            ],
            [
              2.625,
              -0.609375
            ],
            [
              2.65,
              -0.5775000000000001
            ],
            [
              2.675,
              -0.5443750000000003
            ],
            [
              2.7,
              -0.5099999999999998
            ],
            [
              2.725,
              -0.4743749999999999
            ],
            [
              2.75,
              -0.4375
            ],
            [
              2.775,
              -0.39937500000000015
            ],
            [
              2.8,
              -0.3600000000000003
            ],
            [
              2.825,
              -0.31937499999999974
            ],
            [
              2.85,
              -0.27749999999999986
            ],
            [
              2.875,
              -0.234375
            ],
            [
              2.9,
              -0.19000000000000017
            ],
            [
              2.925,
              -0.14437500000000036
            ],
            [
              2.95,
              -0.0974999999999997
            ],
            [
              2.975,
              -0.049374999999999836
            ],
            [
              3,
              0
            ],
            [
              3.025,
              0.05062499999999992
            ],
            [
              3.05,
              0.10249999999999959
            ],
            [
              3.075,
              0.15562500000000035
            ],
            [
              3.1,
              0.2100000000000002
            ],
            [
              3.125,
              0.265625
            ],
            [
              3.15,
              0.3224999999999998
            ],
            [
              3.175,
              0.38062499999999955
            ],
            [
              3.2,
              0.4400000000000004
            ],
            [
              3.225,
              0.5006250000000003
            ],
            [
              3.25,
              0.5625
            ],
            [
              3.275,
              0.6256249999999999
            ],
            [
              3.3,
              0.6899999999999995
            ],
            [
              3.325,
              0.7556250000000004
            ],
            [
              3.35,
              0.8225000000000002
            ],
            [
              3.375,
              0.890625
            ],
            [
              3.4,
              0.9599999999999997
            ],
            [
              3.425,
              1.0306249999999997
            ],
            [
              3.45,
              1.1025000000000005
            ],
            [
              3.475,
              1.1756250000000001
            ],
            [
              3.5,
              1.25
            ],
            [
              3.525,
              1.3256249999999996
            ],
            [
              3.55,
              1.4024999999999994
            ],
            [
              3.575,
              1.4806250000000007
            ],
            [
              3.6,
              1.5600000000000005
            ],
            [
              3.625,
              1.640625
            ],
            [
              3.65,
              1.7224999999999997
            ],
            [
              3.675,
              1.8056249999999996
            ],
            [
              3.7,
              1.8900000000000006
            ],
            [
              3.725,
              1.9756250000000004
            ],
            [
              3.75,
              2.0625
            ],
            [
              3.775,
              2.150625
            ],
            [
              3.8,
              2.2399999999999993
            ],
            [
              3.825,
              2.330625000000001
            ],
            [
              3.85,
              2.4225000000000003
            ],
            [
              3.875,
              2.515625
            ],
            [
              3.9,
              2.61
            ],
            [
              3.925,
              2.7056249999999995
            ],
            [
              3.95,
              2.8025000000000007
            ],
            [
              3.975,
              2.9006250000000002
            ],
            [
              4,
              3
            ]
          ],
          "smooth": false
        }
      ],
      "markers": [],
      "xLabel": "x",
      "yLabel": "f'(x)"
    }
  },
  {
    "key": "U3.T5.F5.TY1.Q033",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The graph of $f'$ is shown. What is $f''(0)$?",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle 2$"
      },
      {
        "label": "B",
        "text": "Does not exist."
      },
      {
        "label": "C",
        "text": "$\\displaystyle 0$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle -1$"
      }
    ],
    "answer_label": "B",
    "explanation": "Unequal one-sided slopes prevent differentiability of $f'$. A uses right slope; C assumes a horizontal tangent; D uses left slope.",
    "representation": "graphical",
    "figure": {
      "kind": "graph",
      "window": {
        "xMin": -2,
        "xMax": 2,
        "yMin": -1,
        "yMax": 4.5
      },
      "curves": [
        {
          "points": [
            [
              -2,
              2
            ],
            [
              -1.975,
              1.975
            ],
            [
              -1.95,
              1.95
            ],
            [
              -1.925,
              1.925
            ],
            [
              -1.9,
              1.9
            ],
            [
              -1.875,
              1.875
            ],
            [
              -1.85,
              1.85
            ],
            [
              -1.825,
              1.825
            ],
            [
              -1.8,
              1.8
            ],
            [
              -1.775,
              1.775
            ],
            [
              -1.75,
              1.75
            ],
            [
              -1.725,
              1.725
            ],
            [
              -1.7,
              1.7
            ],
            [
              -1.675,
              1.675
            ],
            [
              -1.65,
              1.65
            ],
            [
              -1.625,
              1.625
            ],
            [
              -1.6,
              1.6
            ],
            [
              -1.575,
              1.575
            ],
            [
              -1.55,
              1.55
            ],
            [
              -1.525,
              1.525
            ],
            [
              -1.5,
              1.5
            ],
            [
              -1.475,
              1.475
            ],
            [
              -1.45,
              1.45
            ],
            [
              -1.425,
              1.425
            ],
            [
              -1.4,
              1.4
            ],
            [
              -1.375,
              1.375
            ],
            [
              -1.35,
              1.35
            ],
            [
              -1.325,
              1.325
            ],
            [
              -1.3,
              1.3
            ],
            [
              -1.275,
              1.275
            ],
            [
              -1.25,
              1.25
            ],
            [
              -1.225,
              1.225
            ],
            [
              -1.2,
              1.2
            ],
            [
              -1.175,
              1.175
            ],
            [
              -1.15,
              1.15
            ],
            [
              -1.125,
              1.125
            ],
            [
              -1.1,
              1.1
            ],
            [
              -1.075,
              1.075
            ],
            [
              -1.05,
              1.05
            ],
            [
              -1.025,
              1.025
            ],
            [
              -1,
              1
            ],
            [
              -0.9750000000000001,
              0.9750000000000001
            ],
            [
              -0.95,
              0.95
            ],
            [
              -0.925,
              0.925
            ],
            [
              -0.8999999999999999,
              0.8999999999999999
            ],
            [
              -0.875,
              0.875
            ],
            [
              -0.8500000000000001,
              0.8500000000000001
            ],
            [
              -0.825,
              0.825
            ],
            [
              -0.8,
              0.8
            ],
            [
              -0.7749999999999999,
              0.7749999999999999
            ],
            [
              -0.75,
              0.75
            ],
            [
              -0.7250000000000001,
              0.7250000000000001
            ],
            [
              -0.7,
              0.7
            ],
            [
              -0.675,
              0.675
            ],
            [
              -0.6499999999999999,
              0.6499999999999999
            ],
            [
              -0.625,
              0.625
            ],
            [
              -0.6000000000000001,
              0.6000000000000001
            ],
            [
              -0.575,
              0.575
            ],
            [
              -0.55,
              0.55
            ],
            [
              -0.5249999999999999,
              0.5249999999999999
            ],
            [
              -0.5,
              0.5
            ],
            [
              -0.4750000000000001,
              0.4750000000000001
            ],
            [
              -0.44999999999999996,
              0.44999999999999996
            ],
            [
              -0.42500000000000004,
              0.42500000000000004
            ],
            [
              -0.3999999999999999,
              0.3999999999999999
            ],
            [
              -0.375,
              0.375
            ],
            [
              -0.3500000000000001,
              0.3500000000000001
            ],
            [
              -0.32499999999999996,
              0.32499999999999996
            ],
            [
              -0.30000000000000004,
              0.30000000000000004
            ],
            [
              -0.2749999999999999,
              0.2749999999999999
            ],
            [
              -0.25,
              0.25
            ],
            [
              -0.2250000000000001,
              0.2250000000000001
            ],
            [
              -0.19999999999999996,
              0.19999999999999996
            ],
            [
              -0.17500000000000004,
              0.17500000000000004
            ],
            [
              -0.1499999999999999,
              0.1499999999999999
            ],
            [
              -0.125,
              0.125
            ],
            [
              -0.10000000000000009,
              0.10000000000000009
            ],
            [
              -0.07499999999999996,
              0.07499999999999996
            ],
            [
              -0.050000000000000044,
              0.050000000000000044
            ],
            [
              -0.02499999999999991,
              0.02499999999999991
            ],
            [
              0,
              0
            ],
            [
              0.02499999999999991,
              0.04999999999999982
            ],
            [
              0.04999999999999982,
              0.09999999999999964
            ],
            [
              0.07500000000000018,
              0.15000000000000036
            ],
            [
              0.10000000000000009,
              0.20000000000000018
            ],
            [
              0.125,
              0.25
            ],
            [
              0.1499999999999999,
              0.2999999999999998
            ],
            [
              0.17499999999999982,
              0.34999999999999964
            ],
            [
              0.20000000000000018,
              0.40000000000000036
            ],
            [
              0.2250000000000001,
              0.4500000000000002
            ],
            [
              0.25,
              0.5
            ],
            [
              0.2749999999999999,
              0.5499999999999998
            ],
            [
              0.2999999999999998,
              0.5999999999999996
            ],
            [
              0.3250000000000002,
              0.6500000000000004
            ],
            [
              0.3500000000000001,
              0.7000000000000002
            ],
            [
              0.375,
              0.75
            ],
            [
              0.3999999999999999,
              0.7999999999999998
            ],
            [
              0.4249999999999998,
              0.8499999999999996
            ],
            [
              0.4500000000000002,
              0.9000000000000004
            ],
            [
              0.4750000000000001,
              0.9500000000000002
            ],
            [
              0.5,
              1
            ],
            [
              0.5249999999999999,
              1.0499999999999998
            ],
            [
              0.5499999999999998,
              1.0999999999999996
            ],
            [
              0.5750000000000002,
              1.1500000000000004
            ],
            [
              0.6000000000000001,
              1.2000000000000002
            ],
            [
              0.625,
              1.25
            ],
            [
              0.6499999999999999,
              1.2999999999999998
            ],
            [
              0.6749999999999998,
              1.3499999999999996
            ],
            [
              0.7000000000000002,
              1.4000000000000004
            ],
            [
              0.7250000000000001,
              1.4500000000000002
            ],
            [
              0.75,
              1.5
            ],
            [
              0.7749999999999999,
              1.5499999999999998
            ],
            [
              0.7999999999999998,
              1.5999999999999996
            ],
            [
              0.8250000000000002,
              1.6500000000000004
            ],
            [
              0.8500000000000001,
              1.7000000000000002
            ],
            [
              0.875,
              1.75
            ],
            [
              0.8999999999999999,
              1.7999999999999998
            ],
            [
              0.9249999999999998,
              1.8499999999999996
            ],
            [
              0.9500000000000002,
              1.9000000000000004
            ],
            [
              0.9750000000000001,
              1.9500000000000002
            ],
            [
              1,
              2
            ],
            [
              1.025,
              2.05
            ],
            [
              1.0499999999999998,
              2.0999999999999996
            ],
            [
              1.0750000000000002,
              2.1500000000000004
            ],
            [
              1.1,
              2.2
            ],
            [
              1.125,
              2.25
            ],
            [
              1.15,
              2.3
            ],
            [
              1.1749999999999998,
              2.3499999999999996
            ],
            [
              1.2000000000000002,
              2.4000000000000004
            ],
            [
              1.225,
              2.45
            ],
            [
              1.25,
              2.5
            ],
            [
              1.275,
              2.55
            ],
            [
              1.2999999999999998,
              2.5999999999999996
            ],
            [
              1.3250000000000002,
              2.6500000000000004
            ],
            [
              1.35,
              2.7
            ],
            [
              1.375,
              2.75
            ],
            [
              1.4,
              2.8
            ],
            [
              1.4249999999999998,
              2.8499999999999996
            ],
            [
              1.4500000000000002,
              2.9000000000000004
            ],
            [
              1.475,
              2.95
            ],
            [
              1.5,
              3
            ],
            [
              1.525,
              3.05
            ],
            [
              1.5499999999999998,
              3.0999999999999996
            ],
            [
              1.5750000000000002,
              3.1500000000000004
            ],
            [
              1.6,
              3.2
            ],
            [
              1.625,
              3.25
            ],
            [
              1.65,
              3.3
            ],
            [
              1.6749999999999998,
              3.3499999999999996
            ],
            [
              1.7000000000000002,
              3.4000000000000004
            ],
            [
              1.725,
              3.45
            ],
            [
              1.75,
              3.5
            ],
            [
              1.775,
              3.55
            ],
            [
              1.7999999999999998,
              3.5999999999999996
            ],
            [
              1.8250000000000002,
              3.6500000000000004
            ],
            [
              1.85,
              3.7
            ],
            [
              1.875,
              3.75
            ],
            [
              1.9,
              3.8
            ],
            [
              1.9249999999999998,
              3.8499999999999996
            ],
            [
              1.9500000000000002,
              3.9000000000000004
            ],
            [
              1.975,
              3.95
            ],
            [
              2,
              4
            ]
          ],
          "smooth": false
        }
      ],
      "markers": [],
      "xLabel": "x",
      "yLabel": "f'(x)"
    }
  },
  {
    "key": "U3.T5.F5.TY2.Q031",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The table gives values of $f'$. Use the centered secant to estimate $f''(2)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle -1.2$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle 3$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle -3$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle 4.5$"
      }
    ],
    "answer_label": "C",
    "explanation": "Centered secant slope is $-1.2/0.4=-3$. A omits denominator; B reverses sign; D averages heights.",
    "representation": "tabular",
    "figure": {
      "kind": "table",
      "headers": [
        "$x$",
        "$1.8$",
        "$2.2$"
      ],
      "rows": [
        [
          "$f'(x)$",
          "$5.1$",
          "$3.9$"
        ]
      ]
    }
  },
  {
    "key": "U3.T5.F5.TY2.Q032",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Use the centered second difference from the table to estimate $f''(1)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle 4$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle -2$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle 8$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle 2$"
      }
    ],
    "answer_label": "D",
    "explanation": "Subtract adjacent secant slopes: $(10-5)-(5-2)=2$, with unit spacing. A averages slopes; B reverses order; C sums slopes.",
    "representation": "tabular",
    "figure": {
      "kind": "table",
      "headers": [
        "$x$",
        "$0$",
        "$1$",
        "$2$"
      ],
      "rows": [
        [
          "$f(x)$",
          "$2$",
          "$5$",
          "$10$"
        ]
      ]
    }
  },
  {
    "key": "U3.T5.F5.TY3.Q034",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "$f'$ is strictly decreasing on $(0,3)$, and $f''$ exists there. Which must hold?",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle f''\\le0\\text{ throughout}$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle f''<0\\text{ throughout}$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle f''>0\\text{ throughout}$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle f'<0\\text{ throughout}$"
      }
    ],
    "answer_label": "A",
    "explanation": "A differentiable decreasing function has nonpositive derivative; it may be zero at isolated points. B overstates strictness (for example, $f\\prime(x)=-(x-1)^3$); C reverses sign; D confuses height and slope.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T5.F6.TY1.Q035",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "$f(x)=ax^4+x^2$. If $f''(1)=26$, find $a$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle 6$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle 2$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle 3$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle 24$"
      }
    ],
    "answer_label": "B",
    "explanation": "$f''(1)=12a+2=26$. A uses coefficient 4 instead of 12; D fails to divide 24 by 12; C uses coefficient 8 instead of 12.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T5.F6.TY1.Q036",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "$f(x)=ax^3+bx^2$. If $f''(0)=8$ and $f'''(0)=18$, find $(a,b)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle (3,4)$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle (4,3)$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle (6,8)$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle (18,8)$"
      }
    ],
    "answer_label": "A",
    "explanation": "$f''(0)=2b$ and $f'''=6a$. C uses wrong factors; B swaps coefficients; D omits factors.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T5.F6.TY1.Q038",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "$f(x)=e^{kx}$, $k<0$, and $f''(0)=9$. Find $k$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle -3$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle 3$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle -9$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle 9$"
      }
    ],
    "answer_label": "A",
    "explanation": "$k^2=9$ and $k<0$. B ignores sign; D and C confuse square with coefficient.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T5.F6.TY2.Q037",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "hard",
    "calculator": false,
    "prompt": "If $f''(x)=g''(x)$ on an interval, which must be true?",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle f=g$"
      },
      {
        "label": "B",
        "text": "$f+g$ is affine."
      },
      {
        "label": "C",
        "text": "$f-g$ is constant."
      },
      {
        "label": "D",
        "text": "$f-g$ is affine (of the form $ax+b$)."
      }
    ],
    "answer_label": "D",
    "explanation": "Difference has zero second derivative, hence constant first derivative. A and C are special cases; B need not hold.",
    "representation": "symbolic"
  },
  {
    "key": "U3.T5.F7.TY1.Q039",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "Temperature is modeled by $T(t)=2t^3-5t^2$ degrees Celsius, with $t$ in minutes. At $t=2$, what is the instantaneous rate of change of the temperature rate $T\\prime(t)$?",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle 14\\ {}^\\circ\\mathrm C/\\mathrm{min}^2$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle 4\\ {}^\\circ\\mathrm C/\\mathrm{min}$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle 24\\ {}^\\circ\\mathrm C/\\mathrm{min}^2$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle -10\\ {}^\\circ\\mathrm C/\\mathrm{min}^2$"
      }
    ],
    "answer_label": "A",
    "explanation": "$T\\prime=6t^2-10t$ and $T\\prime\\prime=12t-10$, so $T\\prime\\prime(2)=14\\ {}^\\circ\\mathrm C/\\mathrm{min}^2$. B uses first-derivative units; C forgets the $-10$ term; D ignores the cubic contribution.",
    "representation": "contextual"
  },
  {
    "key": "U3.T5.F7.TY1.Q041",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "A cooling material has $T\\prime(3)=-4\\ {}^\\circ\\mathrm C/\\mathrm{min}$ and $T\\prime\\prime(3)=2\\ {}^\\circ\\mathrm C/\\mathrm{min}^2$. Which statement is correct at that instant?",
    "choices": [
      {
        "label": "A",
        "text": "The temperature rate is constant at that instant."
      },
      {
        "label": "B",
        "text": "Temperature is decreasing, but its rate of decrease is slowing."
      },
      {
        "label": "C",
        "text": "Temperature is decreasing faster at that instant."
      },
      {
        "label": "D",
        "text": "Temperature is $-4\\ {}^\\circ\\mathrm C$."
      }
    ],
    "answer_label": "B",
    "explanation": "Since $T\\prime(3)<0$, temperature is decreasing; since $T\\prime\\prime(3)>0$, the negative slope is becoming less negative, so cooling is slowing. D mistakes rate for temperature; C reverses the interpretation of $T\\prime\\prime$; A contradicts $T\\prime\\prime(3)=2$.",
    "representation": "contextual"
  },
  {
    "key": "U3.T5.F7.TY2.Q040",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "easy",
    "calculator": false,
    "prompt": "Temperature $T(t)$ is measured in degrees Celsius, $t$ in minutes. What are the units of $T''$?",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle {}^\\circ\\mathrm C^2/\\mathrm{min}^2$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle {}^\\circ\\mathrm C/\\mathrm{min}^2$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle {}^\\circ\\mathrm C/\\mathrm{min}$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle \\mathrm{min}^2/{}^\\circ\\mathrm C$"
      }
    ],
    "answer_label": "B",
    "explanation": "Each time derivative divides units by minutes. C uses first derivative; D inverts units; A squares numerator.",
    "representation": "contextual"
  },
  {
    "key": "U3.T5.F8.TY1.Q042",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "A student computes $f'(2)=5$, then differentiates 5 to conclude $f''(2)=0$. What is wrong?",
    "choices": [
      {
        "label": "A",
        "text": "Second derivatives always equal first derivatives."
      },
      {
        "label": "B",
        "text": "The student substituted before differentiating $f'$."
      },
      {
        "label": "C",
        "text": "The student should square 5."
      },
      {
        "label": "D",
        "text": "The derivative of 5 is 5."
      }
    ],
    "answer_label": "B",
    "explanation": "Value at one point does not determine local change. C confuses derivative and square; D misstates constant differentiation; A falsely equates orders.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T5.F8.TY1.Q043",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "A student writes $(\\sin(x^2))''=-4x^2\\sin(x^2)$. What term is missing?",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle 2\\cos(x^2)$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle -2\\cos(x^2)$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle 2\\sin(x^2)$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle 4x\\cos(x^2)$"
      }
    ],
    "answer_label": "A",
    "explanation": "Differentiate $2x\\cos(x^2)$ by product rule. Derivative of $2x$ contributes $2\\cos(x^2)$. B wrong sign; D wrong factor; C wrong trig function.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T5.F8.TY2.Q044",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "medium",
    "calculator": true,
    "prompt": "Calculator active. For $f(x)=\\sin(x^2)+e^{-x}$, approximate $f''(1.3)$ to three decimals.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle -6.950$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle 6.677$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle 0.035$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle -6.677$"
      }
    ],
    "answer_label": "D",
    "explanation": "$f''=2\\cos(x^2)-4x^2\\sin(x^2)+e^{-x}$. Evaluate in radians. C omits squared chain term; A omits exponential; B reverses sign.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  },
  {
    "key": "U3.T5.F8.TY2.Q045",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "hard",
    "calculator": true,
    "prompt": "For $f(x)=e^{-x^2}+x^2/10$, use a calculator to find the smallest positive solution of $f''(x)=0$, to three decimals.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle 0.651$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle 0.707$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle 1.414$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle 0.500$"
      }
    ],
    "answer_label": "A",
    "explanation": "$f''=(4x^2-2)e^{-x^2}+0.2$. Numerical root is 0.650865. B solves the equation without the added quadratic; C incorrectly uses $x=\\sqrt2$; D substitutes $x=1/2$, where the second derivative is still negative. On $(0,1/\\sqrt2)$, $f''$ is strictly increasing, so this is first positive root.",
    "representation": "symbolic",
    "secondary_ced_topics": [
      "3.5"
    ]
  }
];
export const UNIT3_STATIC_BY_KEY = new Map(UNIT3_STATIC_BANK.map(q=>[q.key,q]));
if (UNIT3_STATIC_BANK.length !== 225 || UNIT3_STATIC_BY_KEY.size !== 225) throw new Error("Unit 3 bank audit failed");
