import {
  Activity,
  Atom,
  BarChart3,
  Calculator,
  Compass,
  FlaskConical,
  Gauge,
  ListChecks,
  Magnet,
  Map as MapIcon,
  Ruler,
  Sigma,
  Waves,
  type LucideIcon,
} from "lucide-react";

export type SubjectId =
  | "calc-bc"
  | "physics-1"
  | "physics-2"
  | "physics-c-mech"
  | "physics-c-em"
  | "stats";

export interface SubjectTool {
  icon: LucideIcon;
  title: string;
  description: string;
  to?: string;
  href?: string;
  accent: "primary" | "emerald" | "amber" | "rose" | "violet" | "sky" | "blue";
}

export interface SubjectMistake {
  title: string;
  category: string;
  points: number;
}

export interface SubjectConfig {
  id: SubjectId;
  /** Short label shown in the switcher */
  label: string;
  /** Full label shown in the navbar */
  navLabel: string;
  brand: string;
  path: string;
  icon: LucideIcon;
  examDate: string;
  examLabel: string;
  heroTitle: [string, string];
  heroSub: string;
  stats: { v: string; l: string }[];
  /** Score Command Center numbers */
  score: {
    predicted: number;
    confidence: string;
    raw: number;
    total: number;
    target: number;
    engineLabel: string;
  };
  recommendations: { t: string; g: number }[];
  toolsHeading: string;
  tools: SubjectTool[];
  mistakesHeading: string;
  mistakesSub: string;
  mistakes: SubjectMistake[];
  /** Real College Board units with approximate exam weighting, for the Score Command Center */
  units: { number: number; name: string; weightPct: number; points: number }[];
  ctaTitle: string;

  ctaSub: string;
  meta: { title: string; description: string };
}

const FORMULA_SHEET_URL =
  "https://drive.google.com/file/d/1O6iD6MP3R_p4NZzZ4vt-7kVAHrUBYtdJ/view?usp=drive_open";

const sharedTool = (
  icon: LucideIcon,
  title: string,
  description: string,
  accent: SubjectTool["accent"],
  to?: string,
): SubjectTool => ({ icon, title, description, accent, to });

export const SUBJECTS: Record<SubjectId, SubjectConfig> = {
  "calc-bc": {
    id: "calc-bc",
    label: "AP Calculus BC",
    navLabel: "AP Calculus BC",
    brand: "APCalc",
    path: "/",
    icon: Sigma,
    examDate: "2027-05-11T08:00:00",
    examLabel: "2027 AP Calculus BC exam",
    heroTitle: ["Everything you need", "for a 5 in AP Calculus"],
    heroSub:
      "Master every unit, drill categorized FRQs and MCQs, eliminate score-killing mistakes, and watch your predicted AP score climb in real time.",
    stats: [
      { v: "108", l: "exam points modeled" },
      { v: "10/10", l: "BC units covered" },
      { v: "22+", l: "tracked mistakes" },
    ],
    score: {
      predicted: 4,
      confidence: "medium conf.",
      raw: 62,
      total: 108,
      target: 75,
      engineLabel: "108-point engine",
    },
    recommendations: [
      { t: "Master Polar FRQs", g: 3 },
      { t: "Drill Series convergence", g: 3 },
      { t: "Fix unit-context mistakes", g: 2 },
      { t: "Review differential equations", g: 1 },
    ],
    toolsHeading: "Every tool, one system",
    tools: [
      sharedTool(Activity, "Score Command Center", "Your predicted AP score, point gap, and ranked next moves.", "primary", "/command-center"),
      sharedTool(MapIcon, "Topic Rundowns", "All 10 units distilled — limits through series.", "sky", "/topic-rundown"),
      sharedTool(ListChecks, "FRQ Library", "Every FRQ since 2000, organized by topic and year.", "emerald", "/frqs-by-type"),
      sharedTool(Gauge, "Exam Strategy", "Pacing, calculator tricks, time triage.", "amber", "/exam-strategy"),
      sharedTool(Compass, "Question Type Navigator", "Unit → topic → the exact MCQ & FRQ patterns College Board asks.", "blue", "/question-navigator"),
      { icon: Calculator, title: "Formula Sheet", description: "10-page LaTeX master sheet — one click to PDF.", accent: "rose", href: FORMULA_SHEET_URL },
    ],
    mistakesHeading: "The Common Mistakes Database",
    mistakesSub: "22+ ways AP Calc students lose points — described, exampled, and fixed.",
    mistakes: [
      { title: "Calculator in degree mode", category: "Calculator", points: 4 },
      { title: "Missing units in context", category: "Context", points: 1 },
      { title: "Wrong polar area formula", category: "Polar", points: 2 },
      { title: "Sign error in derivative", category: "Algebra", points: 1.5 },
    ],
        units: [
      { number: 1, name: "Limits and Continuity", weightPct: 6, points: 6 },
      { number: 2, name: "Differentiation: Definition and Fundamental Properties", weightPct: 6, points: 6 },
      { number: 3, name: "Differentiation: Composite, Implicit, and Inverse Functions", weightPct: 6, points: 6 },
      { number: 4, name: "Contextual Applications of Differentiation", weightPct: 8, points: 9 },
      { number: 5, name: "Analytical Applications of Differentiation", weightPct: 10, points: 11 },
      { number: 6, name: "Integration and Accumulation of Change", weightPct: 18, points: 19 },
      { number: 7, name: "Differential Equations", weightPct: 8, points: 9 },
      { number: 8, name: "Applications of Integration", weightPct: 8, points: 9 },
      { number: 9, name: "Parametric Equations, Polar Coordinates, and Vector-Valued Functions", weightPct: 12, points: 13 },
      { number: 10, name: "Infinite Sequences and Series", weightPct: 18, points: 19 },
    ],
    ctaTitle: "Stop studying. Start optimizing.",
    ctaSub: "Free to start. No credit card. Your predicted AP score updates with every question you answer.",
    meta: {
      title: "AP Calc Performance OS — Everything you need for a 5",
      description:
        "Diagnose weaknesses, drill what matters, and watch your predicted AP score climb. The performance OS for AP Calculus BC and AB.",
    },
  },

  "physics-1": {
    id: "physics-1",
    label: "Physics 1",
    navLabel: "AP Physics 1",
    brand: "APPhysics1",
    path: "/physics-1",
    icon: Atom,
    examDate: "2027-05-12T08:00:00",
    examLabel: "2027 AP Physics 1 exam",
    heroTitle: ["Everything you need", "for a 5 in AP Physics 1"],
    heroSub:
      "Build real conceptual reasoning, drill kinematics through simple harmonic motion, and turn qualitative-quantitative translation into free points.",
    stats: [
      { v: "100", l: "exam points modeled" },
      { v: "8/8", l: "Physics 1 units" },
      { v: "24+", l: "tracked mistakes" },
    ],
    score: {
      predicted: 3,
      confidence: "medium conf.",
      raw: 54,
      total: 100,
      target: 70,
      engineLabel: "100-point engine",
    },
    recommendations: [
      { t: "Drill rotational dynamics", g: 4 },
      { t: "Master free-body diagrams", g: 3 },
      { t: "Fix vector sign conventions", g: 2 },
      { t: "Review energy bar charts", g: 2 },
    ],
    toolsHeading: "Every tool, one system",
    tools: [
      sharedTool(Activity, "Score Command Center", "Your predicted AP score, point gap, and ranked next moves.", "primary", "/command-center"),
      sharedTool(MapIcon, "Unit Rundowns", "All 8 units distilled — kinematics through SHM.", "sky"),
      sharedTool(ListChecks, "FRQ Library", "Experimental design, QQT, and paragraph responses by year.", "emerald"),
      sharedTool(Gauge, "Exam Strategy", "Pacing, when to symbol-solve, and paragraph-argument templates.", "amber"),
      sharedTool(Compass, "Question Type Navigator", "Unit → topic → the exact MCQ & FRQ patterns College Board asks.", "blue"),
      sharedTool(Ruler, "Equation Sheet", "The official table, annotated with when each relation actually applies.", "rose"),
    ],
    mistakesHeading: "The Common Mistakes Database",
    mistakesSub: "24+ ways AP Physics 1 students lose points — described, exampled, and fixed.",
    mistakes: [
      { title: "Forgetting normal force ≠ mg on inclines", category: "Dynamics", points: 3 },
      { title: "Mixing up velocity and acceleration signs", category: "Kinematics", points: 2 },
      { title: "Using linear equations for rotation", category: "Rotation", points: 3 },
      { title: "Claim without physics justification", category: "Paragraph", points: 2 },
    ],
        units: [
      { number: 1, name: "Kinematics", weightPct: 12, points: 12 },
      { number: 2, name: "Dynamics", weightPct: 18, points: 18 },
      { number: 3, name: "Circular Motion and Gravitation", weightPct: 8, points: 8 },
      { number: 4, name: "Energy", weightPct: 20, points: 20 },
      { number: 5, name: "Momentum", weightPct: 13, points: 13 },
      { number: 6, name: "Simple Harmonic Motion", weightPct: 5, points: 5 },
      { number: 7, name: "Torque and Rotational Motion", weightPct: 13, points: 13 },
      { number: 8, name: "Electric Charges and Electric Force", weightPct: 11, points: 11 },
    ],
    ctaTitle: "Stop memorizing. Start reasoning.",
    ctaSub: "Free to start. No credit card. Your predicted AP score updates with every question you answer.",
    meta: {
      title: "AP Physics 1 Performance OS — Everything you need for a 5",
      description:
        "Diagnose weak units, drill kinematics through simple harmonic motion, and watch your predicted AP Physics 1 score climb in real time.",
    },
  },

  "physics-2": {
    id: "physics-2",
    label: "Physics 2",
    navLabel: "AP Physics 2",
    brand: "APPhysics2",
    path: "/physics-2",
    icon: Waves,
    examDate: "2027-05-13T08:00:00",
    examLabel: "2027 AP Physics 2 exam",
    heroTitle: ["Everything you need", "for a 5 in AP Physics 2"],
    heroSub:
      "Fluids, thermodynamics, circuits, optics, and modern physics — modeled point by point, with the reasoning chains graders actually reward.",
    stats: [
      { v: "100", l: "exam points modeled" },
      { v: "7/7", l: "Physics 2 units" },
      { v: "21+", l: "tracked mistakes" },
    ],
    score: {
      predicted: 4,
      confidence: "low conf.",
      raw: 58,
      total: 100,
      target: 72,
      engineLabel: "100-point engine",
    },
    recommendations: [
      { t: "Drill thermodynamic PV cycles", g: 4 },
      { t: "Master circuit reasoning", g: 3 },
      { t: "Fix fluid pressure setups", g: 2 },
      { t: "Review interference conditions", g: 2 },
    ],
    toolsHeading: "Every tool, one system",
    tools: [
      sharedTool(Activity, "Score Command Center", "Your predicted AP score, point gap, and ranked next moves.", "primary", "/command-center"),
      sharedTool(MapIcon, "Unit Rundowns", "All 7 units distilled — fluids through modern physics.", "sky"),
      sharedTool(ListChecks, "FRQ Library", "Lab design, translation, and quantitative FRQs by topic.", "emerald"),
      sharedTool(Gauge, "Exam Strategy", "Pacing, unit-check habits, and partial-credit harvesting.", "amber"),
      sharedTool(Compass, "Question Type Navigator", "Unit → topic → the exact MCQ & FRQ patterns College Board asks.", "blue"),
      sharedTool(Ruler, "Equation Sheet", "The official table, annotated with assumptions and limits.", "rose"),
    ],
    mistakesHeading: "The Common Mistakes Database",
    mistakesSub: "21+ ways AP Physics 2 students lose points — described, exampled, and fixed.",
    mistakes: [
      { title: "Gauge vs. absolute pressure", category: "Fluids", points: 3 },
      { title: "Sign errors in ΔU = Q − W", category: "Thermo", points: 2 },
      { title: "Treating capacitors like resistors", category: "Circuits", points: 3 },
      { title: "Wrong path-difference condition", category: "Optics", points: 2 },
    ],
        units: [
      { number: 1, name: "Fluids", weightPct: 12, points: 12 },
      { number: 2, name: "Thermodynamics", weightPct: 16, points: 16 },
      { number: 3, name: "Electric Force, Field, and Potential", weightPct: 16, points: 16 },
      { number: 4, name: "Electric Circuits", weightPct: 12, points: 12 },
      { number: 5, name: "Magnetism and Electromagnetic Induction", weightPct: 12, points: 12 },
      { number: 6, name: "Geometric and Physical Optics", weightPct: 18, points: 18 },
      { number: 7, name: "Quantum, Atomic, and Nuclear Physics", weightPct: 14, points: 14 },
    ],
    ctaTitle: "Stop memorizing. Start reasoning.",
    ctaSub: "Free to start. No credit card. Your predicted AP score updates with every question you answer.",
    meta: {
      title: "AP Physics 2 Performance OS — Everything you need for a 5",
      description:
        "Fluids, thermodynamics, circuits, optics, and modern physics — diagnosed, drilled, and scored in real time.",
    },
  },

  "physics-c-mech": {
    id: "physics-c-mech",
    label: "Physics C: Mechanics",
    navLabel: "AP Physics C: Mechanics",
    brand: "APPhysicsC",
    path: "/physics-c-mechanics",
    icon: FlaskConical,
    examDate: "2027-05-10T08:00:00",
    examLabel: "2027 AP Physics C: Mechanics exam",
    heroTitle: ["Everything you need", "for a 5 in Physics C: Mechanics"],
    heroSub:
      "Calculus-based mechanics without the guesswork. Derive instead of memorize, and turn integrals of motion into automatic points.",
    stats: [
      { v: "90", l: "exam points modeled" },
      { v: "7/7", l: "Mechanics units" },
      { v: "18+", l: "tracked mistakes" },
    ],
    score: {
      predicted: 4,
      confidence: "high conf.",
      raw: 56,
      total: 90,
      target: 68,
      engineLabel: "90-point engine",
    },
    recommendations: [
      { t: "Drill variable-mass & drag ODEs", g: 4 },
      { t: "Master moment-of-inertia integrals", g: 3 },
      { t: "Fix rolling-without-slipping setups", g: 2 },
      { t: "Review orbital energy", g: 2 },
    ],
    toolsHeading: "Every tool, one system",
    tools: [
      sharedTool(Activity, "Score Command Center", "Your predicted AP score, point gap, and ranked next moves.", "primary", "/command-center"),
      sharedTool(MapIcon, "Unit Rundowns", "All 7 units distilled — kinematics through oscillations.", "sky"),
      sharedTool(ListChecks, "FRQ Library", "Every Mechanics FRQ organized by derivation type.", "emerald"),
      sharedTool(Gauge, "Exam Strategy", "45-minute FRQ pacing and symbolic-answer discipline.", "amber"),
      sharedTool(Compass, "Question Type Navigator", "Unit → topic → the exact MCQ & FRQ patterns College Board asks.", "blue"),
      sharedTool(Calculator, "Derivation Sheet", "Every core mechanics derivation on one reference page.", "rose"),
    ],
    mistakesHeading: "The Common Mistakes Database",
    mistakesSub: "18+ ways Physics C: Mechanics students lose points — described, exampled, and fixed.",
    mistakes: [
      { title: "Separating variables incorrectly", category: "Calculus", points: 3 },
      { title: "Wrong axis for parallel-axis theorem", category: "Rotation", points: 2 },
      { title: "Dropping the constant of integration", category: "Calculus", points: 2 },
      { title: "Numeric answer where symbolic required", category: "Format", points: 1 },
    ],
        units: [
      { number: 1, name: "Kinematics", weightPct: 12, points: 11 },
      { number: 2, name: "Newton's Laws of Motion", weightPct: 25, points: 23 },
      { number: 3, name: "Work, Energy, and Power", weightPct: 18, points: 16 },
      { number: 4, name: "Systems of Particles and Linear Momentum", weightPct: 11, points: 10 },
      { number: 5, name: "Rotation", weightPct: 16, points: 14 },
      { number: 6, name: "Oscillations", weightPct: 10, points: 9 },
      { number: 7, name: "Gravitation", weightPct: 8, points: 7 },
    ],
    ctaTitle: "Stop memorizing. Start deriving.",
    ctaSub: "Free to start. No credit card. Your predicted AP score updates with every question you answer.",
    meta: {
      title: "AP Physics C: Mechanics Performance OS — Everything you need for a 5",
      description:
        "Calculus-based mechanics: diagnose weak derivations, drill FRQ patterns, and track your predicted AP score in real time.",
    },
  },

  "physics-c-em": {
    id: "physics-c-em",
    label: "Physics C: Electricity & Magnetism",
    navLabel: "AP Physics C: E&M",
    brand: "APPhysicsC",
    path: "/physics-c-electricity-magnetism",
    icon: Magnet,
    examDate: "2027-05-10T14:00:00",
    examLabel: "2027 AP Physics C: E&M exam",
    heroTitle: ["Everything you need", "for a 5 in Physics C: E&M"],
    heroSub:
      "Gauss, Ampère, and Faraday — drilled until symmetry arguments and flux integrals feel routine instead of terrifying.",
    stats: [
      { v: "90", l: "exam points modeled" },
      { v: "5/5", l: "E&M units" },
      { v: "17+", l: "tracked mistakes" },
    ],
    score: {
      predicted: 3,
      confidence: "medium conf.",
      raw: 48,
      total: 90,
      target: 66,
      engineLabel: "90-point engine",
    },
    recommendations: [
      { t: "Drill Gauss's law symmetry cases", g: 4 },
      { t: "Master RC & RL transients", g: 3 },
      { t: "Fix induced-EMF sign errors", g: 3 },
      { t: "Review Ampère loop choices", g: 2 },
    ],
    toolsHeading: "Every tool, one system",
    tools: [
      sharedTool(Activity, "Score Command Center", "Your predicted AP score, point gap, and ranked next moves.", "primary", "/command-center"),
      sharedTool(MapIcon, "Unit Rundowns", "All 5 units distilled — electrostatics through induction.", "sky"),
      sharedTool(ListChecks, "FRQ Library", "Every E&M FRQ organized by field, circuit, or induction type.", "emerald"),
      sharedTool(Gauge, "Exam Strategy", "Flux setup checklists and limiting-case sanity checks.", "amber"),
      sharedTool(Compass, "Question Type Navigator", "Unit → topic → the exact MCQ & FRQ patterns College Board asks.", "blue"),
      sharedTool(Calculator, "Derivation Sheet", "Maxwell-adjacent derivations on one reference page.", "rose"),
    ],
    mistakesHeading: "The Common Mistakes Database",
    mistakesSub: "17+ ways Physics C: E&M students lose points — described, exampled, and fixed.",
    mistakes: [
      { title: "Wrong Gaussian surface symmetry", category: "Electrostatics", points: 3 },
      { title: "Lenz's law sign flipped", category: "Induction", points: 3 },
      { title: "Confusing potential and field", category: "Potential", points: 2 },
      { title: "Wrong initial condition in RC", category: "Circuits", points: 2 },
    ],
        units: [
      { number: 1, name: "Electrostatics: Charges, Fields, and Gauss's Law", weightPct: 31, points: 28 },
      { number: 2, name: "Conductors, Capacitors, and Dielectrics", weightPct: 13, points: 12 },
      { number: 3, name: "Electric Circuits", weightPct: 20, points: 18 },
      { number: 4, name: "Magnetic Fields", weightPct: 14, points: 13 },
      { number: 5, name: "Electromagnetic Induction", weightPct: 17, points: 15 },
    ],
    ctaTitle: "Stop memorizing. Start deriving.",
    ctaSub: "Free to start. No credit card. Your predicted AP score updates with every question you answer.",
    meta: {
      title: "AP Physics C: E&M Performance OS — Everything you need for a 5",
      description:
        "Gauss, Ampère, and Faraday drilled to mastery, with a predicted AP score that updates with every question.",
    },
  },

  stats: {
    id: "stats",
    label: "AP Statistics",
    navLabel: "AP Statistics",
    brand: "APStats",
    path: "/statistics",
    icon: BarChart3,
    examDate: "2027-05-06T12:00:00",
    examLabel: "2027 AP Statistics exam",
    heroTitle: ["Everything you need", "for a 5 in AP Statistics"],
    heroSub:
      "Nail inference conditions, write conclusions in context, and stop leaking rubric points on the investigative task.",
    stats: [
      { v: "100", l: "exam points modeled" },
      { v: "9/9", l: "AP Stats units" },
      { v: "20+", l: "tracked mistakes" },
    ],
    score: {
      predicted: 4,
      confidence: "medium conf.",
      raw: 61,
      total: 100,
      target: 74,
      engineLabel: "100-point engine",
    },
    recommendations: [
      { t: "Master inference conditions", g: 4 },
      { t: "Drill the investigative task", g: 3 },
      { t: "Fix conclusions without context", g: 2 },
      { t: "Review sampling distributions", g: 2 },
    ],
    toolsHeading: "Every tool, one system",
    tools: [
      sharedTool(Activity, "Score Command Center", "Your predicted AP score, point gap, and ranked next moves.", "primary", "/command-center"),
      sharedTool(MapIcon, "Unit Rundowns", "All 9 units distilled — exploring data through inference.", "sky"),
      sharedTool(ListChecks, "FRQ Library", "FRQs 1–6 by type, including the investigative task.", "emerald"),
      sharedTool(Gauge, "Exam Strategy", "Pacing, calculator output, and rubric-first writing.", "amber"),
      sharedTool(Compass, "Question Type Navigator", "Unit → topic → the exact MCQ & FRQ patterns College Board asks.", "blue"),
      sharedTool(Ruler, "Formula & Table Sheet", "Every formula and table, annotated with when to use it.", "rose"),
    ],
    mistakesHeading: "The Common Mistakes Database",
    mistakesSub: "20+ ways AP Stats students lose points — described, exampled, and fixed.",
    mistakes: [
      { title: "Conclusion without context", category: "Inference", points: 2 },
      { title: "Skipping condition checks", category: "Inference", points: 3 },
      { title: "Confusing causation and association", category: "Design", points: 2 },
      { title: "Interpreting the p-value as P(H₀)", category: "Testing", points: 2 },
    ],
    units: [
      { number: 1, name: "Exploring One-Variable Data", weightPct: 20, points: 20 },
      { number: 2, name: "Exploring Two-Variable Data", weightPct: 6, points: 6 },
      { number: 3, name: "Collecting Data", weightPct: 14, points: 14 },
      { number: 4, name: "Probability, Random Variables, and Probability Distributions", weightPct: 15, points: 15 },
      { number: 5, name: "Sampling Distributions", weightPct: 9, points: 9 },
      { number: 6, name: "Inference for Categorical Data: Proportions", weightPct: 13, points: 13 },
      { number: 7, name: "Inference for Quantitative Data: Means", weightPct: 14, points: 14 },
      { number: 8, name: "Inference for Categorical Data: Chi-Square", weightPct: 4, points: 4 },
      { number: 9, name: "Inference for Quantitative Data: Slopes", weightPct: 5, points: 5 },
    ],
    ctaTitle: "Stop guessing. Start justifying.",
    ctaSub: "Free to start. No credit card. Your predicted AP score updates with every question you answer.",

    meta: {
      title: "AP Statistics Performance OS — Everything you need for a 5",
      description:
        "Inference conditions, contextual conclusions, and the investigative task — diagnosed, drilled, and scored in real time.",
    },
  },
};

export interface SubjectMenuGroup {
  id: string;
  label: string;
  icon: LucideIcon;
  /** Direct subject when there is no submenu */
  subjectId?: SubjectId;
  /** Nested courses, optionally divided with a separator before an entry */
  children?: { subjectId: SubjectId; dividerBefore?: boolean }[];
}

/** Data-driven menu — add a subject here and the switcher picks it up. */
export const SUBJECT_MENU: SubjectMenuGroup[] = [
  {
    id: "physics",
    label: "AP Physics",
    icon: Atom,
    children: [
      { subjectId: "physics-1" },
      { subjectId: "physics-2" },
      { subjectId: "physics-c-mech", dividerBefore: true },
      { subjectId: "physics-c-em" },
    ],
  },
  { id: "calc-bc", label: "AP Calculus BC", icon: Sigma, subjectId: "calc-bc" },
  { id: "stats", label: "AP Statistics", icon: BarChart3, subjectId: "stats" },
];

export const PHYSICS_STORAGE_KEY = "ap-os:last-physics-course";

export function getSubject(id: SubjectId): SubjectConfig {
  return SUBJECTS[id];
}
