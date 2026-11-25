import type { StaticUnit2Question } from "./unit2-bank-types";
// Imported from approved APSTEMOS Topic 3.4 and 3.5 Review v6 LaTeX sources.
export const UNIT3_STATIC_BANK: StaticUnit2Question[] = [
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
    "representation": "symbolic"
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
    "prompt": "For $x\\ne-1$, differentiate $\\arctan\\left(\\frac{x}{x+1}\\right)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle \\frac{x+1}{(x+1)^2+x^2}$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle \\frac1{(x+1)^2}$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle \\frac1{(x+1)^2+x^2}$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle \\frac1{1+x^2}$"
      }
    ],
    "answer_label": "C",
    "explanation": "$u'=1/(x+1)^2$; divide by $1+u^2$. A has extra factor; D uses wrong argument; B differentiates only inner quotient.",
    "representation": "symbolic"
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
    "representation": "symbolic"
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
    "representation": "symbolic"
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
    "representation": "symbolic"
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
    "representation": "symbolic"
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
    "representation": "symbolic"
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
    "representation": "symbolic"
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
    "representation": "symbolic"
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
    "representation": "symbolic"
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
    "representation": "symbolic"
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
    "representation": "symbolic"
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
    "representation": "symbolic"
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
    "representation": "symbolic"
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
    "representation": "symbolic"
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
    "representation": "symbolic"
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
    "representation": "symbolic"
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
    "representation": "symbolic"
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
    "representation": "symbolic"
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
    "representation": "symbolic"
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
    "representation": "symbolic"
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
    "representation": "symbolic"
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
    "representation": "symbolic"
  },
  {
    "key": "U3.T5.F2.TY2.Q011",
    "unit_slug": "unit-3-differentiation-composite-implicit-inverse",
    "topic_slug": "higher-order-derivatives",
    "ced_topic": "3.6",
    "difficulty": "medium",
    "calculator": false,
    "prompt": "$f(x)=\\frac{x}{x+1}$, $x\\ne-1$. Find $f''(x)$.",
    "choices": [
      {
        "label": "A",
        "text": "$\\displaystyle \\frac2{(x+1)^3}$"
      },
      {
        "label": "B",
        "text": "$\\displaystyle \\frac1{(x+1)^2}$"
      },
      {
        "label": "C",
        "text": "$\\displaystyle -\\frac2{(x+1)^2}$"
      },
      {
        "label": "D",
        "text": "$\\displaystyle -\\frac2{(x+1)^3}$"
      }
    ],
    "answer_label": "D",
    "explanation": "$f'=(x+1)^{-2}$, so $f''=-2(x+1)^{-3}$. B stops early; C fails to reduce exponent; A loses sign.",
    "representation": "symbolic"
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
    "representation": "symbolic"
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
    "representation": "symbolic"
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
    "representation": "symbolic"
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
    "representation": "symbolic"
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
    "representation": "symbolic"
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
    "representation": "symbolic"
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
    "representation": "symbolic"
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
    "representation": "symbolic"
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
    "representation": "symbolic"
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
    "representation": "symbolic"
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
    "representation": "symbolic"
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
    "representation": "symbolic"
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
    "representation": "symbolic"
  }
];
export const UNIT3_STATIC_BY_KEY = new Map(UNIT3_STATIC_BANK.map(q=>[q.key,q]));
if (UNIT3_STATIC_BANK.length !== 90 || UNIT3_STATIC_BY_KEY.size !== 90) throw new Error("Unit 3 static bank audit failed");
