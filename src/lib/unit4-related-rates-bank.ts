import type { StaticUnit2Question } from "./unit2-bank-types";

export const RELATED_RATES_BANK: StaticUnit2Question[] = [
  {
    "key": "U4.T1.F1.TY2.Q001",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.4",
    "secondary_ced_topics": [
      "3.5"
    ],
    "difficulty": "easy",
    "calculator": false,
    "prompt": "A circle has radius $r(t)$ and area $A(t)$. Which equation relates their instantaneous rates?",
    "choices": [
      {
        "label": "A",
        "text": "$A'=2\\pi r$"
      },
      {
        "label": "B",
        "text": "$A'=2\\pi rr'$"
      },
      {
        "label": "C",
        "text": "$A'=\\pi(r')^2$"
      },
      {
        "label": "D",
        "text": "$A'=\\pi r^2r'$"
      }
    ],
    "answer_label": "B",
    "explanation": "$A=\\pi r^2$. Differentiating with respect to time gives $A\\prime=2\\pi r r\\prime$. The chain-rule factor $r\\prime$ is essential.\n\nA: Leaves out the chain-rule factor $r\\prime$.\nC: Squares $r\\prime$ instead of differentiating $r^2$.\nD: Retains an extra factor of $r$.",
    "representation": "Contextual"
  },
  {
    "key": "U4.T1.F1.TY1.Q002",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.4",
    "secondary_ced_topics": [],
    "difficulty": "easy",
    "calculator": false,
    "prompt": "A cube has side $s$ and volume $V$. Which information is sufficient to determine $dV/dt$ at an instant?",
    "choices": [
      {
        "label": "A",
        "text": "$s$ and $ds/dt$"
      },
      {
        "label": "B",
        "text": "$ds/dt$ only"
      },
      {
        "label": "C",
        "text": "$V$ and surface area only"
      },
      {
        "label": "D",
        "text": "$s$ only"
      }
    ],
    "answer_label": "A",
    "explanation": "$V=s^3$, so $V\\prime=3s^2s\\prime$. A numerical volume rate requires both the instantaneous side $s$ and the instantaneous side rate $s\\prime$.\n\nB: Omits the instantaneous size $s$.\nC: Measurements alone do not supply an instantaneous time rate.\nD: Omits the rate $s\\prime$.",
    "representation": "Contextual"
  },
  {
    "key": "U4.T1.F1.TY3.Q003",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.4",
    "secondary_ced_topics": [
      "3.5"
    ],
    "difficulty": "easy",
    "calculator": false,
    "prompt": "A tank has constant cross-sectional area $12\\,\\mathrm{m}^2$. Which statement is true?",
    "choices": [
      {
        "label": "A",
        "text": "$V'=12(h')^2$"
      },
      {
        "label": "B",
        "text": "$V'=12h'$"
      },
      {
        "label": "C",
        "text": "$V'=12h$"
      },
      {
        "label": "D",
        "text": "$V'=h'/12$"
      }
    ],
    "answer_label": "B",
    "explanation": "The cross-sectional area is fixed, so $V=12h$ and $V\\prime=12h\\prime$. The $12$ has units of area and is not itself a rate.\n\nA: Incorrectly squares the height rate.\nC: Is the volume $V$, not $V\\prime$.\nD: Inverts the proportionality.",
    "representation": "Contextual"
  },
  {
    "key": "U4.T1.F1.TY1.Q004",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.4",
    "secondary_ced_topics": [],
    "difficulty": "easy",
    "calculator": false,
    "prompt": "Two quantities satisfy $xy=20$ with $x,y>0$. If $x$ increases, what must happen to $y$?",
    "choices": [
      {
        "label": "A",
        "text": "The sign of its rate cannot be determined"
      },
      {
        "label": "B",
        "text": "$y$ decreases"
      },
      {
        "label": "C",
        "text": "$y$ is constant"
      },
      {
        "label": "D",
        "text": "$y$ increases"
      }
    ],
    "answer_label": "B",
    "explanation": "Differentiate $xy=20$ to get $x\\prime y+xy\\prime=0$, so $y\\prime=-(y/x)x\\prime$. Because $x,y,x\\prime$ are positive, $y\\prime<0$.\n\nA: The positivity assumptions determine the sign.\nC: A changing $x$ forces the reciprocal quantity to change.\nD: Has the wrong sign.",
    "representation": "Contextual"
  },
  {
    "key": "U4.T1.F1.TY3.Q005",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.4",
    "secondary_ced_topics": [
      "3.5"
    ],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "A tank has fixed radius $r=3$ m and changing water depth $h$. Which statement correctly identifies the constants and rates?",
    "choices": [
      {
        "label": "A",
        "text": "$r\\prime=0$, but $h\\prime$ need not be zero."
      },
      {
        "label": "B",
        "text": "$r\\prime=3$"
      },
      {
        "label": "C",
        "text": "$h\\prime=0$"
      },
      {
        "label": "D",
        "text": "$V\\prime=0$ always."
      }
    ],
    "answer_label": "A",
    "explanation": "A fixed radius has $r\\prime=0$ even though $r=3$ m. With $V=\\pi(3)^2h=9\\pi h$, $V\\prime=9\\pi h\\prime$, which may be nonzero.\n\nB: Confuses the radius value $3$ with its derivative.\nC: No condition says water depth is constant.\nD: Volume varies if the water depth changes.",
    "representation": "Contextual"
  },
  {
    "key": "U4.T1.F2.TY1.Q006",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.5",
    "secondary_ced_topics": [],
    "difficulty": "easy",
    "calculator": false,
    "prompt": "A spherical balloon has radius 3 cm and is expanding at 2 cm/s. Find its volume rate (cm$^3$/s).",
    "choices": [
      {
        "label": "A",
        "text": "$18\\pi$"
      },
      {
        "label": "B",
        "text": "$36\\pi$"
      },
      {
        "label": "C",
        "text": "$72\\pi$"
      },
      {
        "label": "D",
        "text": "$24\\pi$"
      }
    ],
    "answer_label": "C",
    "explanation": "$V=\\tfrac43\\pi r^3$ implies $V\\prime=4\\pi r^2r\\prime=4\\pi(3)^2(2)=72\\pi$ cm$^3$/s.\n\nA: Uses $\\pi r^2r\\prime$ instead of $4\\pi r^2r\\prime$.\nB: Omits the factor $r\\prime=2$.\nD: Misuses the geometric coefficient in the sphere formula.",
    "representation": "Contextual"
  },
  {
    "key": "U4.T1.F2.TY2.Q007",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.5",
    "secondary_ced_topics": [
      "3.5"
    ],
    "difficulty": "easy",
    "calculator": false,
    "prompt": "A rectangle has length 8 m and width 3 m. The length increases at 2 m/s and width decreases at 1 m/s. Find its area rate.",
    "choices": [
      {
        "label": "A",
        "text": "$14$ m$^2$/s"
      },
      {
        "label": "B",
        "text": "$-8$ m$^2$/s"
      },
      {
        "label": "C",
        "text": "$6$ m$^2$/s"
      },
      {
        "label": "D",
        "text": "$-2$ m$^2$/s"
      }
    ],
    "answer_label": "D",
    "explanation": "$A=lw$ implies $A\\prime=l\\prime w+lw\\prime=(2)(3)+(8)(-1)=-2$ m$^2$/s. The area is decreasing.\n\nA: Treats decreasing width as increasing width.\nB: Omits the increasing-length contribution.\nC: Omits the decreasing-width contribution.",
    "representation": "Contextual"
  },
  {
    "key": "U4.T1.F2.TY2.Q008",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.5",
    "secondary_ced_topics": [],
    "difficulty": "easy",
    "calculator": false,
    "prompt": "A cylinder has radius $2$ m and height $5$ m. Its radius is increasing at $1$ m/min while its volume is increasing at $12\\pi$ m$^3$/min. What is $h\\prime$ (m/min) at that instant?",
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
        "text": "$-5$"
      },
      {
        "label": "D",
        "text": "$3$"
      }
    ],
    "answer_label": "B",
    "explanation": "$V=\\pi r^2h$ gives $V\\prime=\\pi(2rr\\prime h+r^2h\\prime)$. Substituting $r=2$, $r\\prime=1$, $h=5$, and $V\\prime=12\\pi$, we obtain $12=20+4h\\prime$, hence $h\\prime=-2$ m/min. Volume can grow while height falls because the radius grows.\n\nA: Loses the negative sign when solving the rate equation.\nC: Assumes volume is constant, which would yield $h\\prime=-5$.\nD: Ignores the contribution of the increasing radius and solves $12=4h\\prime$.",
    "representation": "Contextual"
  },
  {
    "key": "U4.T1.F2.TY2.Q009",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.5",
    "secondary_ced_topics": [
      "3.5"
    ],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "A cylinder has $r=2$ m, $h=5$ m, $r\\prime=1$ m/min, and $h\\prime=-2$ m/min. Find $V\\prime$ (m$^3$/min).",
    "choices": [
      {
        "label": "A",
        "text": "$-8\\pi$"
      },
      {
        "label": "B",
        "text": "$28\\pi$"
      },
      {
        "label": "C",
        "text": "$20\\pi$"
      },
      {
        "label": "D",
        "text": "$12\\pi$"
      }
    ],
    "answer_label": "D",
    "explanation": "$V=\\pi r^2h$; the product and chain rules give $V\\prime=\\pi(2rr\\prime h+r^2h\\prime)=\\pi(2\\cdot2\\cdot1\\cdot5+4(-2))=12\\pi$ m$^3$/min.\n\nA: Includes the negative height contribution but omits the positive radius contribution.\nB: Reverses the sign of $h\\prime$.\nC: Omits the height-rate term.",
    "representation": "Contextual"
  },
  {
    "key": "U4.T1.F2.TY3.Q010",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.5",
    "secondary_ced_topics": [
      "3.5"
    ],
    "difficulty": "hard",
    "calculator": true,
    "prompt": "Two points move along perpendicular axes. Their distances from the origin are $x(t)=2+e^{0.3t}$ and $y(t)=5+\\sin t$ meters. Find their separation rate at $t=2$ (m/s), rounded to three decimals.",
    "choices": [
      {
        "label": "A",
        "text": "$0.130$"
      },
      {
        "label": "B",
        "text": "$-0.053$"
      },
      {
        "label": "C",
        "text": "$0.646$"
      },
      {
        "label": "D",
        "text": "$-0.370$"
      }
    ],
    "answer_label": "B",
    "explanation": "$z=\\sqrt{x^2+y^2}$. Differentiate: $z\\prime=(xx\\prime+yy\\prime)/z$. At $t=2$, $x=2+e^{0.6}$, $x\\prime=0.3e^{0.6}$, $y=5+\\sin2$, $y\\prime=\\cos2$. Hence $z\\prime\\approx-0.052550$, or $-0.053$ m/s.\n\nA: Adds coordinate rates rather than projecting onto the separation direction.\nC: Neglects the negative contribution of the decreasing $y$.\nD: Omits the separation factor in the denominator.",
    "representation": "Symbolic / contextual",
    "figure": {
      "kind": "illustration",
      "src": "/figures/related-rates/q10.png",
      "alt": "Points on perpendicular axes connected by segment z."
    }
  },
  {
    "key": "U4.T1.F2.TY1.Q011",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.5",
    "secondary_ced_topics": [],
    "difficulty": "easy",
    "calculator": false,
    "prompt": "A sphere loses volume at $16\\pi$ cm$^3$/s. At radius 2 cm, find its radius rate.",
    "choices": [
      {
        "label": "A",
        "text": "$1$ cm/s"
      },
      {
        "label": "B",
        "text": "$-2$ cm/s"
      },
      {
        "label": "C",
        "text": "$-4$ cm/s"
      },
      {
        "label": "D",
        "text": "$-1$ cm/s"
      }
    ],
    "answer_label": "D",
    "explanation": "$V\\prime=4\\pi r^2r\\prime$. The volume is decreasing, so $V\\prime=-16\\pi$ and $r=2$; therefore $r\\prime=-16\\pi/(4\\pi\\cdot4)=-1$ cm/s.\n\nA: Loses the sign of the shrinking volume.\nB: Divides by $4\\pi r$ instead of $4\\pi r^2$.\nC: Omits the sphere-formula coefficient.",
    "representation": "Contextual"
  },
  {
    "key": "U4.T1.F2.TY2.Q012",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.5",
    "secondary_ced_topics": [],
    "difficulty": "easy",
    "calculator": false,
    "prompt": "A rectangular box has fixed height $4$ m and a square base of side $s$ m. Its volume increases at $48$ m$^3$/s when $s=3$ m. Find $s\\prime$ (m/s).",
    "choices": [
      {
        "label": "A",
        "text": "$6$"
      },
      {
        "label": "B",
        "text": "$12$"
      },
      {
        "label": "C",
        "text": "$2$"
      },
      {
        "label": "D",
        "text": "$4$"
      }
    ],
    "answer_label": "C",
    "explanation": "$V=4s^2$; hence $V\\prime=8ss\\prime$. At $s=3$, $48=24s\\prime$ and $s\\prime=2$ m/s.\n\nA: Omits the fixed height when solving for $s\\prime$.\nB: Divides volume rate only by the height.\nD: Drops the factor $2$ from differentiating $s^2$.",
    "representation": "Contextual"
  },
  {
    "key": "U4.T1.F3.TY1.Q013",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.5",
    "secondary_ced_topics": [],
    "difficulty": "easy",
    "calculator": false,
    "prompt": "A 10 m ladder rests against a wall. Its foot is 6 m from the wall and moves away at 2 m/s. Find the height rate.",
    "choices": [
      {
        "label": "A",
        "text": "$3/2$"
      },
      {
        "label": "B",
        "text": "$-2$"
      },
      {
        "label": "C",
        "text": "$-3/2$"
      },
      {
        "label": "D",
        "text": "$-8/3$"
      }
    ],
    "answer_label": "C",
    "explanation": "With foot distance $x$ and top height $y$, $x^2+y^2=100$. At $x=6$, $y=8$. Differentiating gives $xx\\prime+yy\\prime=0$, so $y\\prime=-6(2)/8=-3/2$ m/s.\n\nA: Ignores the fact that height decreases.\nB: Assumes equal leg rates.\nD: Reverses the ratio of the two legs.",
    "representation": "Contextual",
    "figure": {
      "kind": "illustration",
      "src": "/figures/related-rates/q13.png",
      "alt": "A ladder of length 10 m forms a right triangle with legs x and y."
    }
  },
  {
    "key": "U4.T1.F3.TY2.Q014",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.4",
    "secondary_ced_topics": [
      "3.5"
    ],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Two changing perpendicular legs have lengths 3 and 4 km and rates 2 and 1 km/h. Which equation correctly relates the separation rate $z\\prime$?",
    "choices": [
      {
        "label": "A",
        "text": "$z\\prime=3$"
      },
      {
        "label": "B",
        "text": "$5z\\prime=10$"
      },
      {
        "label": "C",
        "text": "$z\\prime=10$"
      },
      {
        "label": "D",
        "text": "$5z\\prime=2$"
      }
    ],
    "answer_label": "B",
    "explanation": "$z^2=x^2+y^2$ and $z=\\sqrt{3^2+4^2}=5$. Differentiating gives $zz\\prime=xx\\prime+yy\\prime=3(2)+4(1)=10$, so $5z\\prime=10$.\n\nA: Adds the two leg rates as though they were collinear.\nC: Omits the factor $z=5$.\nD: Subtracts one positive contribution.",
    "representation": "Contextual"
  },
  {
    "key": "U4.T1.F3.TY3.Q015",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.5",
    "secondary_ced_topics": [],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "A camera is 20 m from a vertical tower. An object rises along the tower at 5 m/s. At height 20 m, find the elevation angle rate in rad/s.",
    "choices": [
      {
        "label": "A",
        "text": "$1/20$"
      },
      {
        "label": "B",
        "text": "$1/8$"
      },
      {
        "label": "C",
        "text": "$1/4$"
      },
      {
        "label": "D",
        "text": "$5$"
      }
    ],
    "answer_label": "B",
    "explanation": "$\\tan\\theta=y/20$. Thus $\\sec^2\\theta\\,\\theta\\prime=y\\prime/20=1/4$. At $y=20$, $\\tan\\theta=1$ and $\\sec^2\\theta=2$. Hence $\\theta\\prime=1/8$ rad/s.\n\nA: Uses a distance-based denominator instead of the chain rule.\nC: Omits the factor $\\sec^2\theta=2$.\nD: Confuses vertical speed with angular speed.",
    "representation": "Contextual",
    "figure": {
      "kind": "illustration",
      "src": "/figures/related-rates/q15.png",
      "alt": "Camera 20 m from the tower with elevation angle θ."
    }
  },
  {
    "key": "U4.T1.F3.TY3.Q016",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.5",
    "secondary_ced_topics": [
      "3.5"
    ],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "A ladder of length 13 m makes angle $\\theta$ with the ground. Its top is descending at 2 m/s when the foot is 5 m from the wall. Find $\\theta\\prime$.",
    "choices": [
      {
        "label": "A",
        "text": "$-2/12$"
      },
      {
        "label": "B",
        "text": "$-2/13$"
      },
      {
        "label": "C",
        "text": "$2/5$"
      },
      {
        "label": "D",
        "text": "$-2/5$"
      }
    ],
    "answer_label": "D",
    "explanation": "$y=13\\sin\\theta$. At the instant the foot is $5$ m from the wall, $13\\cos\\theta=5$. With top rate $y\\prime=-2$, differentiate to obtain $-2=5\\theta\\prime$, so $\\theta\\prime=-2/5$ rad/s.\n\nA: Uses the vertical leg $12$ instead of the horizontal projection $5$.\nB: Omits the cosine factor.\nC: Drops the negative sign of the descending top.",
    "representation": "Contextual"
  },
  {
    "key": "U4.T1.F3.TY3.Q017",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.5",
    "secondary_ced_topics": [
      "3.5"
    ],
    "difficulty": "hard",
    "calculator": true,
    "prompt": "A camera is 30 m east of a dock. A boat travels north from the dock with $y(t)=10t+2\\sin t$ meters. Let $\\theta$ be the angle between the westward horizontal direction and the camera's line of sight to the boat. Find $\\theta\\prime(3)$ in rad/s, rounded to three decimals.",
    "choices": [
      {
        "label": "A",
        "text": "$0.267$"
      },
      {
        "label": "B",
        "text": "$0.004$"
      },
      {
        "label": "C",
        "text": "$0.132$"
      },
      {
        "label": "D",
        "text": "$5.697$"
      }
    ],
    "answer_label": "C",
    "explanation": "$\\tan\\theta=y/30$, with $y=10t+2\\sin t$. Differentiating yields $\\theta\\prime=30y\\prime/(900+y^2)$. At $t=3$, $y\\approx30.28224$ and $y\\prime=10+2\\cos3\\approx8.02002$. Thus $\\theta\\prime\\approx0.132415$, or $0.132$ rad/s.\n\nA: Uses $y\\prime/30$, omitting $\\sec^2\theta$.\nB: Omits the factor $30$ from the correct derivative.\nD: Gives the distance rate, not the angle rate.",
    "representation": "Symbolic / contextual",
    "figure": {
      "kind": "illustration",
      "src": "/figures/related-rates/q17.png",
      "alt": "The boat is north of the dock and the camera is 30 m east of the dock."
    }
  },
  {
    "key": "U4.T1.F4.TY1.Q018",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.4",
    "secondary_ced_topics": [],
    "difficulty": "easy",
    "calculator": false,
    "prompt": "A cone has height 12 m and top radius 6 m. Water depth is $h$. Which volume formula is valid?",
    "choices": [
      {
        "label": "A",
        "text": "$V=\\pi h^3/3$"
      },
      {
        "label": "B",
        "text": "$V=12\\pi h$"
      },
      {
        "label": "C",
        "text": "$V=\\pi h^3/12$"
      },
      {
        "label": "D",
        "text": "$V=\\pi h^2/12$"
      }
    ],
    "answer_label": "C",
    "explanation": "For similar cones $r/h=6/12=1/2$, so $r=h/2$. Then $V=\\pi r^2h/3=\\pi(h/2)^2h/3=\\pi h^3/12$.\n\nA: Assumes radius equals depth.\nB: Incorrectly treats the changing water cross section as fixed.\nD: Loses one power of height.",
    "representation": "Contextual",
    "figure": {
      "kind": "illustration",
      "src": "/figures/related-rates/q18.png",
      "alt": "Cone cross section with water depth h and top radius 6."
    }
  },
  {
    "key": "U4.T1.F4.TY1.Q019",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.5",
    "secondary_ced_topics": [
      "3.5"
    ],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "In a conical tank with $r=h/2$ (meters), water enters at $9\\pi$ m$^3$/min. Find $h\\prime$ (m/min) when $h=6$ m.",
    "choices": [
      {
        "label": "A",
        "text": "$3$"
      },
      {
        "label": "B",
        "text": "$1/3$"
      },
      {
        "label": "C",
        "text": "$9$"
      },
      {
        "label": "D",
        "text": "$1$"
      }
    ],
    "answer_label": "D",
    "explanation": "$V=\\pi h^3/12$ because $r=h/2$. Thus $V\\prime=(\\pi h^2/4)h\\prime$. At $h=6$, $9\\pi=9\\pi h\\prime$, so $h\\prime=1$ m/min.\n\nA: Omits the factor from differentiating $h^3$.\nB: Introduces an extra factor of three.\nC: Omits division by the depth-dependent coefficient.",
    "representation": "Contextual"
  },
  {
    "key": "U4.T1.F4.TY2.Q020",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.5",
    "secondary_ced_topics": [],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "A 2 m person walks away from a 6 m lamp at 3 m/s. Find the rate of increase of the shadow length.",
    "choices": [
      {
        "label": "A",
        "text": "$1.5$"
      },
      {
        "label": "B",
        "text": "$3$"
      },
      {
        "label": "C",
        "text": "$4.5$"
      },
      {
        "label": "D",
        "text": "$6$"
      }
    ],
    "answer_label": "A",
    "explanation": "Let $x$ be the walker\\'s distance from the lamp and $s$ the shadow length. Similar triangles give $6/(x+s)=2/s$. Hence $6s=2x+2s$, so $s=x/2$ and $s\\prime=x\\prime/2=3/2$ m/s.\n\nB: Gives the walker's speed instead of the shadow-length rate.\nC: Gives the shadow-tip speed instead.\nD: Uses a reversed similarity proportion.",
    "representation": "Contextual",
    "figure": {
      "kind": "illustration",
      "src": "/figures/related-rates/q20.png",
      "alt": "A 6 m lamp casts the shadow of a 2 m person."
    }
  },
  {
    "key": "U4.T1.F4.TY2.Q021",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.5",
    "secondary_ced_topics": [],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "A 1.5 m person walks away from a 4.5 m lamp at 2 m/s. Find the speed of the shadow tip relative to the lamp.",
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
        "text": "$2$"
      },
      {
        "label": "D",
        "text": "$4$"
      }
    ],
    "answer_label": "A",
    "explanation": "With walker distance $x$ and shadow $s$, similarity gives $4.5/(x+s)=1.5/s$, whence $s=x/2$. Therefore tip distance $x+s=3x/2$ and tip rate $(x+s)\\prime=(3/2)(2)=3$ m/s.\n\nB: Gives only the shadow-length rate.\nC: Gives only the walker's speed.\nD: Incorrectly doubles the walking speed.",
    "representation": "Contextual",
    "figure": {
      "kind": "illustration",
      "src": "/figures/related-rates/q21.png",
      "alt": "A 4.5 m lamp casts the shadow of a 1.5 m person."
    }
  },
  {
    "key": "U4.T1.F4.TY3.Q022",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.4",
    "secondary_ced_topics": [],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "A trough has triangular ends 4 m wide at depth 2 m. The water surface width is $w$ at depth $h$. Which condition justifies $w=2h$ throughout filling?",
    "choices": [
      {
        "label": "A",
        "text": "The water volume is constant."
      },
      {
        "label": "B",
        "text": "The inflow rate is constant."
      },
      {
        "label": "C",
        "text": "The trough length is 10 m."
      },
      {
        "label": "D",
        "text": "The triangular ends have straight sides meeting at the bottom and the water surface is parallel to the top."
      }
    ],
    "answer_label": "D",
    "explanation": "Straight edges meeting at the bottom and parallel horizontal cross sections make the submerged triangular cross section similar to the full triangular end. Therefore $w/h=4/2=2$, giving $w=2h$.\n\nA: A volume condition does not establish triangle similarity.\nB: Inflow constancy does not determine width-to-depth ratios.\nC: Trough length does not establish the triangular cross-section geometry.",
    "representation": "Contextual"
  },
  {
    "key": "U4.T1.F4.TY1.Q023",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.5",
    "secondary_ced_topics": [
      "3.5"
    ],
    "difficulty": "hard",
    "calculator": true,
    "prompt": "A conical pile maintains $h=3r$. Its volume is $V(t)=20+5e^{0.4t}$ cubic meters. Find $h\\prime$ at $t=2$ (m/min), to three decimals.",
    "choices": [
      {
        "label": "A",
        "text": "$0.102$"
      },
      {
        "label": "B",
        "text": "$0.034$"
      },
      {
        "label": "C",
        "text": "$0.307$"
      },
      {
        "label": "D",
        "text": "$0.921$"
      }
    ],
    "answer_label": "C",
    "explanation": "Given $h=3r$, $V=\\pi r^2h=\\pi r^3$, and $V\\prime=3\\pi r^2r\\prime$. Hence $h\\prime=3r\\prime=V\\prime/(\\pi r^2)$ with $r=(V/\\pi)^{1/3}$. At $t=2$, $V=20+5e^{0.8}$ and $V\\prime=2e^{0.8}$, giving $h\\prime\\approx0.307127$ m/min.\n\nA: Gives the radius rate $r\\prime$, not the height rate.\nB: Uses the $h:r$ ratio in the wrong direction.\nD: Applies the factor $3$ twice.",
    "representation": "Symbolic / contextual"
  },
  {
    "key": "U4.T1.F5.TY1.Q024",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.5",
    "secondary_ced_topics": [
      "3.5"
    ],
    "difficulty": "hard",
    "calculator": false,
    "prompt": "At an instant $x=2$, $y=3$, $x\\prime=4$, and $x^2+xy+y^2=19$. Find $y\\prime$.",
    "choices": [
      {
        "label": "A",
        "text": "$-7$"
      },
      {
        "label": "B",
        "text": "$7/2$"
      },
      {
        "label": "C",
        "text": "$-2/7$"
      },
      {
        "label": "D",
        "text": "$-7/2$"
      }
    ],
    "answer_label": "D",
    "explanation": "Differentiate $x^2+xy+y^2=19$ with respect to time: $(2x+y)x\\prime+(x+2y)y\\prime=0$. Insert $(x,y,x\\prime)=(2,3,4)$: $7(4)+8y\\prime=0$, so $y\\prime=-7/2$.\n\nA: Drops the factor $x+2y=8$ in the second term.\nB: Ignores the negative sign required to balance the first term.\nC: Takes a reciprocal rather than solving the linear rate equation.",
    "representation": "Contextual"
  },
  {
    "key": "U4.T1.F5.TY1.Q025",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.5",
    "secondary_ced_topics": [
      "3.5"
    ],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Quantities $x$ and $y$ satisfy $e^y+x=5$. At $y=\\ln 2$ with $x\\prime=-6$, find $y\\prime$.",
    "choices": [
      {
        "label": "A",
        "text": "$-3$"
      },
      {
        "label": "B",
        "text": "$12$"
      },
      {
        "label": "C",
        "text": "$6$"
      },
      {
        "label": "D",
        "text": "$3$"
      }
    ],
    "answer_label": "D",
    "explanation": "Differentiating $e^y+x=5$ gives $e^y y\\prime+x\\prime=0$. Here $e^y=2$ and $x\\prime=-6$, so $2y\\prime-6=0$ and $y\\prime=3$.\n\nA: Incorrectly keeps the sign of the negative $x\\prime$.\nB: Multiplies rather than divides by $e^y=2$.\nC: Omits the exponential chain factor.",
    "representation": "Contextual"
  },
  {
    "key": "U4.T1.F5.TY2.Q026",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.5",
    "secondary_ced_topics": [
      "3.5"
    ],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "Positive quantities satisfy $\\ln(xy)=t$. At an instant $x=2$, $y=4$ and $x\\prime=1$. Find $y\\prime$.",
    "choices": [
      {
        "label": "A",
        "text": "$4$"
      },
      {
        "label": "B",
        "text": "$2$"
      },
      {
        "label": "C",
        "text": "$-2$"
      },
      {
        "label": "D",
        "text": "$1/2$"
      }
    ],
    "answer_label": "B",
    "explanation": "Since $x,y>0$, differentiate $\\ln(xy)=t$ to obtain $x\\prime/x+y\\prime/y=1$. Then $1/2+y\\prime/4=1$ and $y\\prime=2$.\n\nA: Drops the contribution $x\\prime/x=1/2$.\nC: Treats the derivative of $t$ as zero.\nD: Confuses $y\\prime/y$ with $y\\prime$.",
    "representation": "Contextual"
  },
  {
    "key": "U4.T1.F5.TY3.Q027",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.4",
    "secondary_ced_topics": [
      "3.5"
    ],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "At an instant $x=0$, $y=4$ and $x^2+y^2=16$. If $y\\prime=0$, what does the differentiated equation alone establish about $x\\prime$?",
    "choices": [
      {
        "label": "A",
        "text": "It equals zero."
      },
      {
        "label": "B",
        "text": "It is undetermined."
      },
      {
        "label": "C",
        "text": "It equals 4."
      },
      {
        "label": "D",
        "text": "It is undefined."
      }
    ],
    "answer_label": "B",
    "explanation": "Differentiating $x^2+y^2=16$ gives $xx\\prime+yy\\prime=0$. At $(x,y)=(0,4)$ with $y\\prime=0$, this reduces to $0=0$. The differentiated equation alone places no numerical restriction on $x\\prime$; it does not imply that $x\\prime$ fails to exist.\n\nA: Dividing by $x=0$ or equating the rate to zero is invalid.\nC: Confuses the measured height $4$ with a rate.\nD: Undetermined from this equation does not mean nonexistent.",
    "representation": "Contextual"
  },
  {
    "key": "U4.T1.F5.TY2.Q028",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.5",
    "secondary_ced_topics": [
      "3.5"
    ],
    "difficulty": "hard",
    "calculator": true,
    "prompt": "Positive quantities satisfy $x/y=2+\\sin t$. At $t=1$, $y=3$ and $x\\prime=4$. Find $y\\prime$ to three decimals.",
    "choices": [
      {
        "label": "A",
        "text": "$1.408$"
      },
      {
        "label": "B",
        "text": "$1.978$"
      },
      {
        "label": "C",
        "text": "$0.837$"
      },
      {
        "label": "D",
        "text": "$2.379$"
      }
    ],
    "answer_label": "C",
    "explanation": "Write $x=y(2+\\sin t)$. Then $x\\prime=y\\prime(2+\\sin t)+y\\cos t$. At $t=1$, $y\\prime=[4-3\\cos1]/[2+\\sin1]\\approx0.837275$, so $0.837$.\n\nA: Omits the derivative term $y\\cos t$.\nB: Adds instead of subtracting $y\\cos t$.\nD: Fails to divide by $2+\\sin t$.",
    "representation": "Symbolic"
  },
  {
    "key": "U4.T1.F6.TY3.Q029",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.5",
    "secondary_ced_topics": [
      "4.1"
    ],
    "difficulty": "easy",
    "calculator": false,
    "prompt": "A circle has area decreasing at 10 cm$^2$/s. Which statement must hold at positive radius?",
    "choices": [
      {
        "label": "A",
        "text": "$r'<0$"
      },
      {
        "label": "B",
        "text": "$r'>0$"
      },
      {
        "label": "C",
        "text": "$r'=0$"
      },
      {
        "label": "D",
        "text": "$r'=-10$"
      }
    ],
    "answer_label": "A",
    "explanation": "$A=\\pi r^2$ gives $r\\prime=A\\prime/(2\\pi r)$. At $r>0$, the denominator is positive, and $A\\prime=-10$ cm$^2$/s is negative; therefore $r\\prime<0$.\n\nB: Reverses the sign.\nC: An area rate of $-10$ rules out zero radius rate.\nD: Equates rates with different units and scaling.",
    "representation": "Contextual"
  },
  {
    "key": "U4.T1.F6.TY1.Q030",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.5",
    "secondary_ced_topics": [
      "4.1"
    ],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "A cube has volume increasing at 24 cm$^3$/s and side increasing at 2 cm/s. Find its side length.",
    "choices": [
      {
        "label": "A",
        "text": "$\\sqrt{12}$ cm"
      },
      {
        "label": "B",
        "text": "$2$ cm"
      },
      {
        "label": "C",
        "text": "$4$ cm"
      },
      {
        "label": "D",
        "text": "$12$ cm"
      }
    ],
    "answer_label": "B",
    "explanation": "$V=s^3$, so $V\\prime=3s^2s\\prime$. With $24=3s^2(2)$, $s^2=4$; a physical side length is positive, so $s=2$ cm.\n\nA: Omits the factor $3$ in $V\\prime=3s^2s\\prime$.\nC: Confuses the side length with $s^2$.\nD: Divides only by the side rate.",
    "representation": "Contextual"
  },
  {
    "key": "U4.T1.F6.TY2.Q031",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.5",
    "secondary_ced_topics": [
      "4.1"
    ],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "For a ladder of fixed length, when the foot is twice as far from the wall as the top is above ground, how do the horizontal foot rate $x\\prime$ and vertical top rate $y\\prime$ compare?",
    "choices": [
      {
        "label": "A",
        "text": "$y'=-x'/2$"
      },
      {
        "label": "B",
        "text": "$y'=-2x'$"
      },
      {
        "label": "C",
        "text": "$y'=x'$"
      },
      {
        "label": "D",
        "text": "$y'=2x'$"
      }
    ],
    "answer_label": "B",
    "explanation": "$x^2+y^2=L^2$ for fixed ladder length. Differentiating yields $xx\\prime+yy\\prime=0$, or $y\\prime=-(x/y)x\\prime$. Since $x=2y$, $y\\prime=-2x\\prime$.\n\nA: Uses $y/x$ instead of $x/y$.\nC: Ignores the geometry and sign.\nD: Loses the negative sign.",
    "representation": "Contextual"
  },
  {
    "key": "U4.T1.F6.TY3.Q032",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.4",
    "secondary_ced_topics": [
      "4.1"
    ],
    "difficulty": "easy",
    "calculator": false,
    "prompt": "Volume is measured in liters and time in minutes. What are the units of $dV/dt$?",
    "choices": [
      {
        "label": "A",
        "text": "liters/minute"
      },
      {
        "label": "B",
        "text": "liters"
      },
      {
        "label": "C",
        "text": "liters/minute$^2$"
      },
      {
        "label": "D",
        "text": "minutes/liter"
      }
    ],
    "answer_label": "A",
    "explanation": "By definition $dV/dt$ is volume divided by elapsed time, so its units are liters per minute (L/min).\n\nB: Represents volume, not its time derivative.\nC: Has units of a second time derivative.\nD: Reverses numerator and denominator.",
    "representation": "Contextual"
  },
  {
    "key": "U4.T1.F6.TY1.Q033",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.5",
    "secondary_ced_topics": [
      "4.1"
    ],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "A sphere expands at constant radius rate 2 cm/s. Its volume rate is $128\\pi$ cm$^3$/s. Find its radius.",
    "choices": [
      {
        "label": "A",
        "text": "$4$ cm"
      },
      {
        "label": "B",
        "text": "$4\\sqrt{2}$ cm"
      },
      {
        "label": "C",
        "text": "$16$ cm"
      },
      {
        "label": "D",
        "text": "$2$ cm"
      }
    ],
    "answer_label": "A",
    "explanation": "For a sphere, $V\\prime=4\\pi r^2r\\prime$. Thus $128\\pi=4\\pi r^2(2)$, giving $r^2=16$ and, since $r>0$, $r=4$ cm.\n\nB: Omits the given radius-rate factor of $2$ and solves $128\\pi=4\\pi r^2$.\nC: Reports $r^2$ instead of $r$.\nD: Confuses radius with the given radial speed.",
    "representation": "Contextual"
  },
  {
    "key": "U4.T1.F6.TY2.Q034",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.5",
    "secondary_ced_topics": [
      "4.1"
    ],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "A rectangle has $l=6$ m, $w=4$ m, and $l\\prime=3$ m/s. Its area is instantaneously constant. Find $w\\prime$ (m/s).",
    "choices": [
      {
        "label": "A",
        "text": "$0$"
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
        "text": "$-9/2$"
      }
    ],
    "answer_label": "B",
    "explanation": "$A=lw$, hence $A\\prime=l\\prime w+lw\\prime=3(4)+6w\\prime$. Instantaneously constant area means $A\\prime=0$, so $w\\prime=-12/6=-2$ m/s.\n\nA: Would make area increase because length is increasing.\nC: Has the wrong sign.\nD: Swaps the coefficients of the product-rule terms.",
    "representation": "Contextual"
  },
  {
    "key": "U4.T1.F7.TY1.Q035",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.5",
    "secondary_ced_topics": [
      "4.1"
    ],
    "difficulty": "easy",
    "calculator": false,
    "prompt": "The table gives the instantaneous radius and radial rate of a sphere. Find the volume rate at $t=2$ (cm$^3$/s).",
    "choices": [
      {
        "label": "A",
        "text": "$100\\pi$"
      },
      {
        "label": "B",
        "text": "$72\\pi$"
      },
      {
        "label": "C",
        "text": "$48\\pi$"
      },
      {
        "label": "D",
        "text": "$36\\pi$"
      }
    ],
    "answer_label": "B",
    "explanation": "At $t=2$ the same column gives $r=3$ and $r\\prime=2$. For a sphere, $V\\prime=4\\pi r^2r\\prime=4\\pi(9)(2)=72\\pi$.\n\nA: Uses the measurement at the wrong time.\nC: Omits or misuses the correct product of $r^2$ and $r\\prime$.\nD: Omits the radius-rate factor $2$.",
    "representation": "Tabular",
    "figure": {
      "kind": "table",
      "headers": [
        "$t$ (s)",
        "$r$ (cm)",
        "$r\\prime$ (cm/s)"
      ],
      "rows": [
        [
          "1",
          "2",
          "1"
        ],
        [
          "2",
          "3",
          "2"
        ],
        [
          "3",
          "5",
          "1"
        ]
      ]
    }
  },
  {
    "key": "U4.T1.F7.TY2.Q036",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.5",
    "secondary_ced_topics": [
      "4.1"
    ],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The graph shows radius $r$ versus time. At $t=2$, find the circle area rate.",
    "choices": [
      {
        "label": "A",
        "text": "$18\\pi$"
      },
      {
        "label": "B",
        "text": "$4\\pi$"
      },
      {
        "label": "C",
        "text": "$12\\pi$"
      },
      {
        "label": "D",
        "text": "$6\\pi$"
      }
    ],
    "answer_label": "C",
    "explanation": "The graph is the line $r=2t-1$, so at $t=2$ it gives $r=3$ and $r\\prime=2$ (tangent slope). Since $A\\prime=2\\pi rr\\prime$, the area rate is $12\\pi$.\n\nA: Confuses radius-based and area-rate scaling.\nB: Uses the graph slope alone without radius.\nD: Omits the slope factor.",
    "representation": "Graphical",
    "figure": {
      "kind": "illustration",
      "src": "/figures/related-rates/q36.png",
      "alt": "Radius versus time, with a line through (1, 1) and (2, 3)."
    }
  },
  {
    "key": "U4.T1.F7.TY1.Q037",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.5",
    "secondary_ced_topics": [
      "4.1"
    ],
    "difficulty": "hard",
    "calculator": false,
    "prompt": "The table gives the horizontal cross-sectional area $A(h)$ of a tank and its volume inflow rate $V\\prime$ at several depths. At an instant when $h=2$ m, find $h\\prime$ (m/min).",
    "choices": [
      {
        "label": "A",
        "text": "$2/3$"
      },
      {
        "label": "B",
        "text": "$1.5$"
      },
      {
        "label": "C",
        "text": "$4$"
      },
      {
        "label": "D",
        "text": "$96$"
      }
    ],
    "answer_label": "B",
    "explanation": "At depth $h=2$, the table gives $A(h)=8$ m$^2$ and $V\\prime=12$ m$^3$/min. Since $dV/dh=A(h)$, $V\\prime=A(h)h\\prime$, giving $h\\prime=12/8=1.5$ m/min.\n\nA: Inverts the division $V\\prime/A(h)$.\nC: Does not follow from the matching row.\nD: Multiplies rather than divides the flow by area.",
    "representation": "Tabular / contextual",
    "figure": {
      "kind": "table",
      "headers": [
        "$h$ (m)",
        "$A(h)$ (m$^2$)",
        "$V\\prime$ (m$^3$/min)"
      ],
      "rows": [
        [
          "1",
          "5",
          "6"
        ],
        [
          "2",
          "8",
          "12"
        ],
        [
          "3",
          "10",
          "16"
        ]
      ]
    }
  },
  {
    "key": "U4.T1.F7.TY3.Q038",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.5",
    "secondary_ced_topics": [
      "4.1"
    ],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The table gives radius measurements of a circle. Estimate its area rate at $t=2$ seconds using a centered difference for the radius rate (cm$^2$/s).",
    "choices": [
      {
        "label": "A",
        "text": "$24\\pi$"
      },
      {
        "label": "B",
        "text": "$4\\pi$"
      },
      {
        "label": "C",
        "text": "$-24\\pi$"
      },
      {
        "label": "D",
        "text": "$12\\pi$"
      }
    ],
    "answer_label": "A",
    "explanation": "The centered difference gives $r\\prime(2)\\approx[r(2.1)-r(1.9)]/0.2=(3.5-2.7)/0.2=4$ cm/s. With $r(2)=3$, $A\\prime(2)\\approx2\\pi(3)(4)=24\\pi$ cm$^2$/s. This is an estimate, not an exact derivative.\n\nB: Omits the factors from converting radius rate into area rate.\nC: Reverses the time difference, giving the wrong sign.\nD: Introduces an unjustified factor $1/2$.",
    "representation": "Tabular",
    "figure": {
      "kind": "table",
      "headers": [
        "$t$ (s)",
        "$r$ (cm)"
      ],
      "rows": [
        [
          "1.9",
          "2.7"
        ],
        [
          "2",
          "3"
        ],
        [
          "2.1",
          "3.5"
        ]
      ]
    }
  },
  {
    "key": "U4.T1.F7.TY2.Q039",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.5",
    "secondary_ced_topics": [
      "4.1"
    ],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "The graph shows the water depth $h$ in a cylindrical tank of radius 2 m. The dashed line is tangent at $t=2$. Find the volume rate there (m$^3$/min).",
    "choices": [
      {
        "label": "A",
        "text": "$12\\pi$"
      },
      {
        "label": "B",
        "text": "$8\\pi$"
      },
      {
        "label": "C",
        "text": "$4\\pi$"
      },
      {
        "label": "D",
        "text": "$-8\\pi$"
      }
    ],
    "answer_label": "B",
    "explanation": "The dashed line is tangent to the depth graph at $(2,3)$ and passes through $(1,1)$, so $h\\prime(2)=(3-1)/(2-1)=2$ m/min. With fixed radius $2$ m, $V=4\\pi h$ and $V\\prime=4\\pi(2)=8\\pi$ m$^3$/min.\n\nA: Uses the height $h(2)=3$ instead of slope $h\\prime(2)=2$.\nC: Omits the factor from the graph slope.\nD: Reverses the sign of the positive tangent slope.",
    "representation": "Graphical",
    "figure": {
      "kind": "illustration",
      "src": "/figures/related-rates/q39.png",
      "alt": "Depth versus time with a tangent through (1, 1) and (2, 3)."
    }
  },
  {
    "key": "U4.T1.F7.TY1.Q040",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.5",
    "secondary_ced_topics": [
      "4.1"
    ],
    "difficulty": "hard",
    "calculator": true,
    "prompt": "A spherical balloon has volume $V(t)=100+7t^2$ cm$^3$. Use a calculator to find its radius rate at $t=3$ to three decimals.",
    "choices": [
      {
        "label": "A",
        "text": "$3.389$"
      },
      {
        "label": "B",
        "text": "$0.291$"
      },
      {
        "label": "C",
        "text": "$42.000$"
      },
      {
        "label": "D",
        "text": "$0.097$"
      }
    ],
    "answer_label": "B",
    "explanation": "$V(t)=100+7t^2$ implies $V\\prime(3)=42$ cm$^3$/s and $V(3)=163$ cm$^3$. For a sphere $r=(3V/(4\\pi))^{1/3}\\approx3.38870$ cm. Thus $r\\prime=42/(4\\pi r^2)\\approx0.291054$, or $0.291$ cm/s.\n\nA: Gives the radius rather than the radius rate.\nC: Gives $V\\prime(3)$ rather than $r\\prime(3)$.\nD: Introduces an extra factor of $3$.",
    "representation": "Contextual"
  },
  {
    "key": "U4.T1.F8.TY1.Q041",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.4",
    "secondary_ced_topics": [
      "3.5"
    ],
    "difficulty": "easy",
    "calculator": false,
    "prompt": "A student substitutes $r=3$ into $V=4\\pi r^3/3$ before differentiating and gets zero. What is the error?",
    "choices": [
      {
        "label": "A",
        "text": "The sphere volume formula is incorrect."
      },
      {
        "label": "B",
        "text": "The radius is variable; differentiate before substituting its instantaneous value."
      },
      {
        "label": "C",
        "text": "The radius must be squared before substitution."
      },
      {
        "label": "D",
        "text": "Volume is always constant at an instant."
      }
    ],
    "answer_label": "B",
    "explanation": "The equation $V=(4/3)\\pi r(t)^3$ holds over time. Replacing $r(t)$ with its value $3$ before differentiating incorrectly treats the radius as permanently constant. First differentiate $V\\prime=4\\pi r^2r\\prime$, then insert $r=3$.\n\nA: The sphere volume formula is correct.\nC: Squaring radius before substitution does not fix freezing its time dependence.\nD: A function need not be constant merely because we evaluate it at one instant.",
    "representation": "Contextual"
  },
  {
    "key": "U4.T1.F8.TY1.Q042",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.4",
    "secondary_ced_topics": [
      "3.5"
    ],
    "difficulty": "easy",
    "calculator": false,
    "prompt": "A student writes $d(xy)/dt=x\\prime y\\prime$. Which correction is valid?",
    "choices": [
      {
        "label": "A",
        "text": "$x'y+xy'$"
      },
      {
        "label": "B",
        "text": "$xy'$"
      },
      {
        "label": "C",
        "text": "$x'+y'$"
      },
      {
        "label": "D",
        "text": "$x'y$"
      }
    ],
    "answer_label": "A",
    "explanation": "Both $x(t)$ and $y(t)$ vary, so the product rule gives $d(xy)/dt=x\\prime y+xy\\prime$, not $x\\prime y\\prime$.\n\nB: Omits the $x\\prime y$ term.\nC: Drops the original factors.\nD: Omits the $xy\\prime$ term.",
    "representation": "Contextual"
  },
  {
    "key": "U4.T1.F8.TY2.Q043",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.4",
    "secondary_ced_topics": [
      "3.5"
    ],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "A cone has changing radius and height with $r=h/3$. Which procedure is valid for finding its volume rate?",
    "choices": [
      {
        "label": "A",
        "text": "Differentiate volume with respect to radius only and ignore height."
      },
      {
        "label": "B",
        "text": "Substitute $r=h/3$ before differentiating, or differentiate both variables and use $r\\prime=h\\prime/3$."
      },
      {
        "label": "C",
        "text": "Treat radius as constant."
      },
      {
        "label": "D",
        "text": "Substitute the instantaneous height before differentiating."
      }
    ],
    "answer_label": "B",
    "explanation": "Because $r=h/3$ holds throughout the motion, either substitute it into $V=\\pi r^2h/3$ before differentiating or differentiate both variables and then use $r\\prime=h\\prime/3$. These procedures are equivalent.\n\nA: Leaves out the rate of the changing height.\nC: Contradicts $r=h/3$ as $h$ changes.\nD: Freezes the height at one instant before differentiation.",
    "representation": "Contextual"
  },
  {
    "key": "U4.T1.F8.TY3.Q044",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.4",
    "secondary_ced_topics": [],
    "difficulty": "hard",
    "calculator": false,
    "prompt": "A student finds $y\\prime=-xx\\prime/y$ for a ladder. At $y=0$, the student concludes $y\\prime=0$. Which is correct?",
    "choices": [
      {
        "label": "A",
        "text": "The rate equals $x\\prime/y$ at every point."
      },
      {
        "label": "B",
        "text": "The formula is undefined there; a finite vertical rate cannot be inferred from it."
      },
      {
        "label": "C",
        "text": "The rate is always $-x\\prime$."
      },
      {
        "label": "D",
        "text": "The conclusion is correct because height is zero."
      }
    ],
    "answer_label": "B",
    "explanation": "For a fixed-length ladder, $xx\\prime+yy\\prime=0$. Isolating $y\\prime=-xx\\prime/y$ requires $y\\ne0$. At $y=0$ the quotient is undefined; a finite value of $y\\prime$ cannot be inferred from that formula.\n\nA: Drops a factor and the sign.\nC: Assumes leg rates have equal magnitude without justification.\nD: Confuses zero height with zero vertical velocity.",
    "representation": "Contextual"
  },
  {
    "key": "U4.T1.F8.TY3.Q045",
    "unit_slug": "unit-4-contextual-applications-of-differentiation",
    "topic_slug": "related-rates",
    "ced_topic": "4.4",
    "secondary_ced_topics": [],
    "difficulty": "medium",
    "calculator": false,
    "prompt": "For a circle with $r>0$, a student knows $A\\prime=6$ but not $r$. Which claim is justified?",
    "choices": [
      {
        "label": "A",
        "text": "The radius rate is constant."
      },
      {
        "label": "B",
        "text": "The radius is increasing, but its numerical rate is undetermined."
      },
      {
        "label": "C",
        "text": "The radius is decreasing."
      },
      {
        "label": "D",
        "text": "The radius rate is 6."
      }
    ],
    "answer_label": "B",
    "explanation": "From $A=\\pi r^2$ and $A\\prime=6$, $r\\prime=6/(2\\pi r)$. Because $r>0$, the radius is increasing, but the numerical rate depends on the unknown radius $r$.\n\nA: A constant area rate does not imply constant radius rate.\nC: Reverses the sign of the radius rate.\nD: Equates rates with unlike units and omits radius dependence.",
    "representation": "Contextual"
  }
];
