import type { SubjectId } from "./subjects";

/**
 * Illustrative content for the homepage instrument visuals. Signed-in users with
 * logged attempts see their real data instead; these values are always labeled
 * as an example preview.
 */

export interface DemoSubtopic {
  name: string;
  mastery: number;
}

export interface DemoMove {
  name: string;
  mastery: number;
  action: string;
  cta: "Practice" | "Review";
}

export interface DemoQuestion {
  id: string;
  meta: string;
  prompt: string;
  choices: string[];
  /** index of the choice the demo student selects (incorrect) */
  chosen: number;
  correct: number;
  concept: string;
  mistake: string;
  pattern: string;
  next: string;
}

export interface DemoMistake {
  title: string;
  whatHappens: string;
  howToAvoid: string[];
  tagged: number;
}

export interface DemoNavigator {
  unitLabel: string;
  subtopics: string[];
  activeIndex: number;
  mcq: string[];
  frq: string[];
}

export interface HomeDemo {
  predicted: number;
  subtopics: DemoSubtopic[];
  moves: DemoMove[];
  /** mastery % per unit, aligned with the subject's unit list order */
  unitMastery: number[];
  question: DemoQuestion;
  mistake: DemoMistake;
  navigator: DemoNavigator;
  questionCount: string;
}

const calcBC: HomeDemo = {
  predicted: 4,
  questionCount: "1,700+",
  subtopics: [
    { name: "Integration by Parts", mastery: 86 },
    { name: "Related Rates", mastery: 81 },
    { name: "Taylor Series", mastery: 72 },
    { name: "Polar Area", mastery: 58 },
    { name: "Series Convergence", mastery: 43 },
  ],
  moves: [
    { name: "Series Convergence", mastery: 43, action: "Review Question Type Navigator", cta: "Practice" },
    { name: "Polar Area", mastery: 58, action: "Complete targeted practice", cta: "Review" },
    { name: "Differential Equations", mastery: 64, action: "Complete 5 more questions", cta: "Practice" },
  ],
  unitMastery: [84, 91, 76, 68, 82, 59, 73, 61, 47, 52],
  question: {
    id: "MCQ · 04127",
    meta: "Unit 3 · Composite functions · Medium",
    prompt: String.raw`If $f(x)=\sin(3x^{2})$, what is $f'(x)$?`,
    choices: [
      String.raw`$\cos(3x^{2})$`,
      String.raw`$6x\cos(3x^{2})$`,
      String.raw`$3x^{2}\cos(3x^{2})$`,
      String.raw`$-6x\cos(3x^{2})$`,
    ],
    chosen: 0,
    correct: 1,
    concept: "Chain Rule",
    mistake: "Forgot the inner derivative",
    pattern: "3 similar mistakes",
    next: "Targeted Practice",
  },
  mistake: {
    title: "Using velocity when asked for displacement",
    whatHappens:
      "You calculate instantaneous velocity instead of integrating velocity over the requested interval.",
    howToAvoid: ["position", "velocity", "acceleration", "displacement", "distance"],
    tagged: 3,
  },
  navigator: {
    unitLabel: "UNIT 6 · INTEGRATION & ACCUMULATION",
    subtopics: [
      "Accumulation Functions",
      "Area & Net Change",
      "Differential Equations",
      "Definite Integrals",
      "Fundamental Theorem of Calculus",
    ],
    activeIndex: 0,
    mcq: [
      "Identify the quantity being accumulated.",
      "Determine the interval.",
      "Translate the wording into an integral.",
      "Check units and sign.",
    ],
    frq: [
      "State the relevant relationship.",
      "Set up the integral.",
      "Evaluate or interpret.",
      "Include units when appropriate.",
    ],
  },
};

const physics1: HomeDemo = {
  predicted: 3,
  questionCount: "1,700+",
  subtopics: [
    { name: "Kinematics Graphs", mastery: 88 },
    { name: "Newton's Second Law", mastery: 79 },
    { name: "Energy Conservation", mastery: 71 },
    { name: "Rotational Dynamics", mastery: 55 },
    { name: "Simple Harmonic Motion", mastery: 41 },
  ],
  moves: [
    { name: "Simple Harmonic Motion", mastery: 41, action: "Review Question Type Navigator", cta: "Practice" },
    { name: "Rotational Dynamics", mastery: 55, action: "Complete targeted practice", cta: "Review" },
    { name: "Momentum & Collisions", mastery: 66, action: "Complete 5 more questions", cta: "Practice" },
  ],
  unitMastery: [86, 74, 69, 63, 58, 71, 52, 47],
  question: {
    id: "MCQ · 02318",
    meta: "Dynamics · Free-body reasoning · Medium",
    prompt: String.raw`A $2.0\ \mathrm{kg}$ block is pulled along a frictionless surface by a horizontal force of $8.0\ \mathrm{N}$. What is its acceleration?`,
    choices: [
      String.raw`$0.25\ \mathrm{m/s^2}$`,
      String.raw`$4.0\ \mathrm{m/s^2}$`,
      String.raw`$16\ \mathrm{m/s^2}$`,
      String.raw`$8.0\ \mathrm{m/s^2}$`,
    ],
    chosen: 0,
    correct: 1,
    concept: "Newton's Second Law",
    mistake: "Inverted the mass and force ratio",
    pattern: "3 similar mistakes",
    next: "Targeted Practice",
  },
  mistake: {
    title: "Using speed when asked for displacement",
    whatHappens:
      "You report total distance traveled instead of the change in position over the requested interval.",
    howToAvoid: ["position", "velocity", "acceleration", "displacement", "distance"],
    tagged: 3,
  },
  navigator: {
    unitLabel: "UNIT 4 · ENERGY",
    subtopics: [
      "Work & Work-Energy Theorem",
      "Kinetic Energy",
      "Potential Energy",
      "Conservation of Energy",
      "Power",
    ],
    activeIndex: 3,
    mcq: [
      "Define the system and the interval.",
      "Identify which energies change.",
      "Decide whether external work enters the system.",
      "Set initial energy equal to final energy plus losses.",
    ],
    frq: [
      "State the conservation principle being applied.",
      "Write the energy equation for the chosen system.",
      "Solve symbolically before substituting.",
      "Justify with a sentence and include units.",
    ],
  },
};

const physics2: HomeDemo = {
  predicted: 3,
  questionCount: "1,700+",
  subtopics: [
    { name: "Fluid Statics", mastery: 87 },
    { name: "Electrostatics", mastery: 78 },
    { name: "Circuits", mastery: 70 },
    { name: "Thermodynamics", mastery: 56 },
    { name: "Optics", mastery: 44 },
  ],
  moves: [
    { name: "Optics", mastery: 44, action: "Review Question Type Navigator", cta: "Practice" },
    { name: "Thermodynamics", mastery: 56, action: "Complete targeted practice", cta: "Review" },
    { name: "Magnetism", mastery: 65, action: "Complete 5 more questions", cta: "Practice" },
  ],
  unitMastery: [84, 72, 68, 61, 57, 49, 53],
  question: {
    id: "MCQ · 03044",
    meta: "Circuits · Resistors in parallel · Medium",
    prompt: String.raw`Two $6.0\ \Omega$ resistors are connected in parallel. What is the equivalent resistance?`,
    choices: [
      String.raw`$12\ \Omega$`,
      String.raw`$3.0\ \Omega$`,
      String.raw`$6.0\ \Omega$`,
      String.raw`$0.33\ \Omega$`,
    ],
    chosen: 0,
    correct: 1,
    concept: "Equivalent Resistance",
    mistake: "Added parallel resistances directly",
    pattern: "3 similar mistakes",
    next: "Targeted Practice",
  },
  mistake: {
    title: "Adding parallel resistances in series",
    whatHappens: "You sum the resistances directly instead of summing their reciprocals.",
    howToAvoid: ["series", "parallel", "junction", "loop", "equivalent resistance"],
    tagged: 3,
  },
  navigator: {
    unitLabel: "UNIT 4 · ELECTRIC CIRCUITS",
    subtopics: [
      "Current & Resistance",
      "Series Circuits",
      "Parallel Circuits",
      "Kirchhoff's Rules",
      "Capacitors in Circuits",
    ],
    activeIndex: 2,
    mcq: [
      "Redraw the circuit and label junctions.",
      "Collapse series and parallel groups one step at a time.",
      "Apply Ohm's law to the reduced circuit.",
      "Expand back out to find the requested branch quantity.",
    ],
    frq: [
      "State which rule you are applying and why.",
      "Write the junction or loop equation explicitly.",
      "Solve for the requested quantity.",
      "Check the sign convention and include units.",
    ],
  },
};

const physicsCMech: HomeDemo = {
  predicted: 4,
  questionCount: "1,700+",
  subtopics: [
    { name: "Kinematics with Calculus", mastery: 85 },
    { name: "Work & Energy", mastery: 80 },
    { name: "Momentum", mastery: 72 },
    { name: "Rotational Kinematics", mastery: 57 },
    { name: "Oscillations", mastery: 42 },
  ],
  moves: [
    { name: "Oscillations", mastery: 42, action: "Review Question Type Navigator", cta: "Practice" },
    { name: "Rotational Kinematics", mastery: 57, action: "Complete targeted practice", cta: "Review" },
    { name: "Gravitation", mastery: 63, action: "Complete 5 more questions", cta: "Practice" },
  ],
  unitMastery: [88, 79, 74, 66, 58, 46, 51],
  question: {
    id: "MCQ · 05512",
    meta: "Kinematics · Calculus methods · Medium",
    prompt: String.raw`A particle moves with $v(t)=3t^{2}$. What is its acceleration at $t=2$?`,
    choices: [
      String.raw`$12$`,
      String.raw`$6t$ evaluated as $12$`,
      String.raw`$8$`,
      String.raw`$3$`,
    ],
    chosen: 2,
    correct: 1,
    concept: "Derivative of Velocity",
    mistake: "Evaluated velocity instead of differentiating it",
    pattern: "3 similar mistakes",
    next: "Targeted Practice",
  },
  mistake: {
    title: "Using velocity when asked for acceleration",
    whatHappens: "You evaluate the velocity function instead of differentiating it before substituting.",
    howToAvoid: ["position", "velocity", "acceleration", "displacement", "distance"],
    tagged: 3,
  },
  navigator: {
    unitLabel: "UNIT 3 · WORK, ENERGY & POWER",
    subtopics: [
      "Work by a Variable Force",
      "Work-Energy Theorem",
      "Conservative Forces",
      "Potential Energy Functions",
      "Power",
    ],
    activeIndex: 0,
    mcq: [
      "Identify the force as a function of position.",
      "Set up the work integral over the given path.",
      "Evaluate the integral.",
      "Check the sign against the direction of motion.",
    ],
    frq: [
      "State the definition of work you are using.",
      "Set up the integral with limits.",
      "Evaluate or interpret the result.",
      "Include units and a justifying sentence.",
    ],
  },
};

const physicsCEM: HomeDemo = {
  predicted: 3,
  questionCount: "1,700+",
  subtopics: [
    { name: "Coulomb's Law", mastery: 84 },
    { name: "Electric Fields", mastery: 77 },
    { name: "Gauss's Law", mastery: 69 },
    { name: "Capacitance", mastery: 55 },
    { name: "Inductance", mastery: 40 },
  ],
  moves: [
    { name: "Inductance", mastery: 40, action: "Review Question Type Navigator", cta: "Practice" },
    { name: "Capacitance", mastery: 55, action: "Complete targeted practice", cta: "Review" },
    { name: "Magnetic Fields", mastery: 62, action: "Complete 5 more questions", cta: "Practice" },
  ],
  unitMastery: [83, 71, 66, 58, 44],
  question: {
    id: "MCQ · 07219",
    meta: "Gauss's Law · Symmetry · Medium",
    prompt: String.raw`A spherical shell of radius $R$ carries charge $Q$. What is the field magnitude at $r<R$?`,
    choices: [
      String.raw`$\dfrac{kQ}{r^{2}}$`,
      String.raw`$0$`,
      String.raw`$\dfrac{kQ}{R^{2}}$`,
      String.raw`$\dfrac{kQr}{R^{3}}$`,
    ],
    chosen: 0,
    correct: 1,
    concept: "Gauss's Law",
    mistake: "Enclosed no charge but still applied the point-charge field",
    pattern: "3 similar mistakes",
    next: "Targeted Practice",
  },
  mistake: {
    title: "Using total charge instead of enclosed charge",
    whatHappens:
      "You apply Gauss's law with the full charge of the object rather than only the charge inside your chosen surface.",
    howToAvoid: ["surface choice", "symmetry", "enclosed charge", "flux", "field direction"],
    tagged: 3,
  },
  navigator: {
    unitLabel: "UNIT 2 · GAUSS'S LAW",
    subtopics: [
      "Electric Flux",
      "Spherical Symmetry",
      "Cylindrical Symmetry",
      "Planar Symmetry",
      "Conductors in Equilibrium",
    ],
    activeIndex: 1,
    mcq: [
      "Identify the symmetry of the charge distribution.",
      "Choose a Gaussian surface matching that symmetry.",
      "Determine the charge enclosed by that surface.",
      "Solve for the field and check the direction.",
    ],
    frq: [
      "State Gauss's law and your surface choice.",
      "Write the enclosed charge explicitly.",
      "Solve for the field symbolically.",
      "Interpret the limiting cases and include units.",
    ],
  },
};

const stats: HomeDemo = {
  predicted: 4,
  questionCount: "1,700+",
  subtopics: [
    { name: "Describing Distributions", mastery: 89 },
    { name: "Sampling Methods", mastery: 80 },
    { name: "Confidence Intervals", mastery: 73 },
    { name: "Type I & II Errors", mastery: 57 },
    { name: "Chi-Square Tests", mastery: 45 },
  ],
  moves: [
    { name: "Chi-Square Tests", mastery: 45, action: "Review Question Type Navigator", cta: "Practice" },
    { name: "Type I & II Errors", mastery: 57, action: "Complete targeted practice", cta: "Review" },
    { name: "Regression Inference", mastery: 64, action: "Complete 5 more questions", cta: "Practice" },
  ],
  unitMastery: [90, 82, 76, 71, 65, 58, 62, 49, 53],
  question: {
    id: "MCQ · 01887",
    meta: "Inference · Interpreting intervals · Medium",
    prompt:
      "A 95% confidence interval for a population mean is $(12.4,\\ 15.6)$. Which interpretation is correct?",
    choices: [
      "95% of sample means fall in this interval.",
      "We are 95% confident the population mean lies in this interval.",
      "There is a 95% probability the population mean is 14.0.",
      "95% of the data values fall in this interval.",
    ],
    chosen: 0,
    correct: 1,
    concept: "Confidence Interval Interpretation",
    mistake: "Described the sampling distribution instead of the parameter",
    pattern: "3 similar mistakes",
    next: "Targeted Practice",
  },
  mistake: {
    title: "Interpreting a confidence level as a probability about the parameter",
    whatHappens:
      "You describe the chance that the parameter falls in one specific interval rather than the long-run capture rate of the method.",
    howToAvoid: ["parameter", "statistic", "sampling distribution", "confidence level", "interval"],
    tagged: 3,
  },
  navigator: {
    unitLabel: "UNIT 6 · INFERENCE FOR PROPORTIONS",
    subtopics: [
      "One-Sample Proportion Intervals",
      "One-Sample Proportion Tests",
      "Two-Sample Proportion Intervals",
      "Two-Sample Proportion Tests",
      "Errors & Power",
    ],
    activeIndex: 1,
    mcq: [
      "Identify the parameter in context.",
      "Check the conditions for the procedure.",
      "Match the wording to the correct test.",
      "Read the conclusion against the significance level.",
    ],
    frq: [
      "State the hypotheses in context.",
      "Name the procedure and verify conditions.",
      "Report the test statistic and p-value.",
      "Write a conclusion tied to the context.",
    ],
  },
};

export const HOME_DEMO: Record<SubjectId, HomeDemo> = {
  "calc-bc": calcBC,
  "physics-1": physics1,
  "physics-2": physics2,
  "physics-c-mech": physicsCMech,
  "physics-c-em": physicsCEM,
  stats,
};
