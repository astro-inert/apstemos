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
  guidanceBySubtopic?: Record<string, { mcq: string[]; frq: string[] }>;
}

export interface DemoLoop {
  /** three practice topics; index 1 is the one the demo student answers */
  practiceTopics: [string, string, string];
  diagnose: { topic: string; from: number; to: number };
  mistake: { label: string; count: number };
  target: { topic: string; questions: number };
  next: { label: string; note: string };
}

export interface HomeDemo {
  predicted: number;
  completedQuestions: number;
  loop: DemoLoop;
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
  completedQuestions: 186,
  loop: {
    practiceTopics: ["Limits from Graphs and Tables", "Chain Rule", "Accumulation Functions"],
    diagnose: { topic: "Chain Rule", from: 72, to: 76 },
    mistake: { label: "Forgot the inner derivative", count: 3 },
    target: { topic: "Chain Rule", questions: 8 },
    next: { label: "MCQ · Unit 3 · Hard", note: "chosen from 2 weak topics" },
  },
  questionCount: "2,000+",
  subtopics: [
    { name: "Limits from Graphs and Tables", mastery: 82 },
    { name: "Chain Rule", mastery: 76 },
    { name: "Differential Equations", mastery: 64 },
    { name: "Polar Area", mastery: 58 },
    { name: "Series Convergence", mastery: 43 },
  ],
  moves: [
    { name: "Series Convergence", mastery: 43, action: "Review Question Type Navigator", cta: "Practice" },
    { name: "Polar Area", mastery: 58, action: "Complete targeted practice", cta: "Review" },
    { name: "Differential Equations", mastery: 64, action: "Complete 5 more questions", cta: "Practice" },
  ],
  unitMastery: [82, 78, 76, 68, 69, 71, 64, 59, 58, 43],
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
    title: "Forgetting the inner derivative",
    whatHappens:
      "You differentiate the outer function correctly but omit the derivative of its inner function, losing the chain-rule factor.",
    howToAvoid: ["identify the outer function", "identify the inner function", "differentiate both", "multiply the factors"],
    tagged: 3,
  },
  navigator: {
    unitLabel: "UNIT 1 · LIMITS AND CONTINUITY",
    subtopics: [
      "Evaluating Limits Algebraically",
      "Limits from Graphs and Tables",
      "Squeeze Theorem",
      "Continuity & Discontinuity Types",
      "Intermediate Value Theorem",
    ],
    activeIndex: 0,
    mcq: [
      "Try direct substitution first.",
      "Decide whether the result is determinate or indeterminate.",
      "If needed, factor, rationalize, or combine fractions.",
      "Substitute again and check one-sided behavior when relevant.",
    ],
    frq: [
      "Show the algebra used to remove the indeterminate form.",
      "State when continuity permits direct substitution.",
      "Evaluate the simplified expression at the limiting value.",
      "Compare one-sided limits when the two-sided limit is in question.",
    ],
    guidanceBySubtopic: {
      "Limits from Graphs and Tables": {
        mcq: ["Approach the input from the required side.", "Track the function's output, not the plotted point.", "Compare left- and right-hand behavior.", "Conclude a two-sided limit exists only when both sides agree."],
        frq: ["Report each one-sided limit separately when needed.", "Distinguish the limit from the function value.", "Cite the table or graph behavior that supports the value.", "State that the limit does not exist when the sides disagree."],
      },
      "Squeeze Theorem": {
        mcq: ["Identify lower and upper bounding functions.", "Evaluate both bounding limits.", "Confirm the bounds approach the same value.", "Conclude the trapped function has that limit."],
        frq: ["Write the bounding inequality near the target input.", "Evaluate the outer limits.", "Name the Squeeze Theorem explicitly.", "State the resulting limit of the middle function."],
      },
      "Continuity & Discontinuity Types": {
        mcq: ["Check that the function value is defined.", "Find the two-sided limit at the point.", "Compare the limit with the function value.", "Classify any removable, jump, or infinite discontinuity."],
        frq: ["State the three conditions for continuity.", "Evaluate one-sided limits when a piece changes.", "Solve for any parameter that makes limit and value agree.", "Justify the discontinuity type from the failed condition."],
      },
      "Intermediate Value Theorem": {
        mcq: ["Confirm continuity on the closed interval.", "Evaluate the function at both endpoints.", "Check that the target value lies between those outputs.", "Conclude existence, not uniqueness, of a solution."],
        frq: ["State that the function is continuous on the interval.", "Show the endpoint values bracket the target.", "Invoke the Intermediate Value Theorem by name.", "Conclude at least one solution exists in the open interval."],
      },
    },
  },
};

const physics1: HomeDemo = {
  predicted: 3,
  completedQuestions: 142,
  loop: {
    practiceTopics: ["Kinematics graphs", "Newton's second law", "Energy bar charts"],
    diagnose: { topic: "Newton's Second Law", from: 64, to: 71 },
    mistake: { label: "Missing force on the free-body diagram", count: 3 },
    target: { topic: "Newton's Second Law", questions: 8 },
    next: { label: "MCQ · Unit 2 · Hard", note: "chosen from 2 weak topics" },
  },
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
    title: "Omitting a force from the free-body diagram",
    whatHappens:
      "You write the net-force equation from an incomplete free-body diagram, so the calculated acceleration does not represent the system.",
    howToAvoid: ["isolate the object", "identify every interaction", "draw one vector per force", "choose axes", "sum by component"],
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
  completedQuestions: 128,
  loop: {
    practiceTopics: ["Fluid pressure", "Parallel circuits", "Thermal processes"],
    diagnose: { topic: "Parallel Circuits", from: 61, to: 70 },
    mistake: { label: "Added parallel resistances directly", count: 3 },
    target: { topic: "Parallel Circuits", questions: 8 },
    next: { label: "MCQ · Circuits · Hard", note: "chosen from 2 weak topics" },
  },
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
  completedQuestions: 154,
  loop: {
    practiceTopics: ["Rotational inertia", "Work by a variable force", "Oscillations"],
    diagnose: { topic: "Work by a Variable Force", from: 66, to: 74 },
    mistake: { label: "Skipped the work integral and used $Fd$", count: 3 },
    target: { topic: "Work by a Variable Force", questions: 8 },
    next: { label: "MCQ · Energy · Hard", note: "chosen from 2 weak topics" },
  },
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
  completedQuestions: 119,
  loop: {
    practiceTopics: ["Electric flux", "Gauss's law symmetry", "RC circuits"],
    diagnose: { topic: "Gauss's Law", from: 62, to: 69 },
    mistake: { label: "Used total charge instead of enclosed charge", count: 3 },
    target: { topic: "Gauss's Law", questions: 8 },
    next: { label: "MCQ · Unit 2 · Hard", note: "chosen from 2 weak topics" },
  },
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
    unitLabel: "UNIT 1 · ELECTROSTATICS & GAUSS'S LAW",
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
  completedQuestions: 167,
  loop: {
    practiceTopics: ["Sampling methods", "Confidence intervals", "Chi-square tests"],
    diagnose: { topic: "Confidence Intervals", from: 66, to: 73 },
    mistake: { label: "Interpreted the interval as a probability", count: 3 },
    target: { topic: "Confidence Intervals", questions: 8 },
    next: { label: "MCQ · Inference · Hard", note: "chosen from 2 weak topics" },
  },
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
    activeIndex: 0,
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
