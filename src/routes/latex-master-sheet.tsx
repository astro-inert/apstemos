import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { LaTeX } from "@/components/LaTeX";
import { SubjectContentGate } from "@/components/SubjectContentGate";

const PDF_URL = "https://drive.google.com/file/d/1O6iD6MP3R_p4NZzZ4vt-7kVAHrUBYtdJ/view?usp=drive_open";

type Item = { title: string; body: string };
type GuideSection = { id: string; title: string; items: Item[] };

const sections: GuideSection[] = [
  { id: "limits", title: "Limits", items: [
    { title: "Evaluation Techniques", body: "Factorization and cancellation, Rationalization of the denominator, Conjugates" },
    { title: "Limit Existence + Continuity", body: `$$\\lim_{x\\to a}f(x)\\text{ exists if }\\lim_{x\\to a^-}f(x)=\\lim_{x\\to a^+}f(x)$$\nA function is continuous at “a” if\n\n1. $f(a)$ exists\n2. $\\lim_{x\\to a}f(x)$ exists\n3. $\\lim_{x\\to a}f(x)=f(a)$` },
    { title: "Types of Discontinuities", body: `Removable discontinuities, Jump discontinuities, Vertical asymptotes ($\\lim=\\frac{a}{0},\\ a\\ne0$)\n\n*note: removable discontinuities can usually be removed by factoring` },
    { title: "Things that Break Differentiability", body: `differentiable $\\Rightarrow$ continuous (so all of the above break differentiability)\n\ncorners ($|x|$), cusps ($x^{2/3}$) (examples of continuous but not differentiable, continuous $\\nRightarrow$ differentiable)` },
    { title: "Special Trig Limits", body: `$$\\lim_{x\\to0}\\frac{\\sin(ax)}{bx}=\\frac ab$$\n$$\\lim_{x\\to\\infty}\\frac{\\sin(ax)}{bx}=0$$\n$$\\lim_{x\\to0}\\frac{1-\\cos x}{x}=0$$\n*all derived from the squeeze (sandwich) theorem` },
    { title: "Intermediate Value Theorem + Mean Value Theorem", body: `IVT. If $f(x)$ is continuous on $[a,b]$, then $f(x)$ takes on every value between $f(a)$ and $f(b)$.\n\nMVT. If $f(x)$ is continuous on $[a,b]$ and differentiable on $(a,b)$, then there exists a value $c$, where $a<c<b$, such that\n$$f'(c)=\\frac{f(b)-f(a)}{b-a}.$$` },
    { title: "Horizontal Asymptotes", body: `$$\\lim_{x\\to\\infty}\\frac{ax}{\\sqrt{bx^2+c}}=\\frac{a}{\\sqrt b},\\qquad \\lim_{x\\to-\\infty}\\frac{ax}{\\sqrt{bx^2+c}}=-\\frac{a}{\\sqrt b}$$` },
    { title: "L’Hôpital’s Rule", body: `If $\\lim_{x\\to a}\\frac{f(x)}{g(x)}$ is of indeterminate form $\\frac00$ or $\\frac\\infty\\infty$, then\n$$\\lim_{x\\to a}\\frac{f(x)}{g(x)}=\\lim_{x\\to a}\\frac{f'(x)}{g'(x)}$$\n*note: on an FRQ, separately evaluate the limits of the numerator and denominator` },
  ]},
  { id: "derivatives", title: "Derivatives", items: [
    { title: "Limit Definition", body: `$$f'(x)=\\lim_{h\\to0}\\frac{f(x+h)-f(x)}h\\qquad\\text{formal definition}$$\n$$f'(a)=\\lim_{x\\to a}\\frac{f(x)-f(a)}{x-a}\\qquad\\text{alternate definition}$$` },
    { title: "Trig, Inverse Trig, and Exponential/Logarithmic", body: `| Function | Derivative | Function | Derivative |\n|---|---|---|---|\n| $\\sin x$ | $\\cos x$ | $\\arcsin x$ | $\\frac1{\\sqrt{1-x^2}}$ |\n| $\\cos x$ | $-\\sin x$ | $\\arccos x$ | $-\\frac1{\\sqrt{1-x^2}}$ |\n| $\\tan x$ | $\\sec^2x$ | $\\arctan x$ | $\\frac1{1+x^2}$ |\n| $\\cot x$ | $-\\csc^2x$ | $\\cot^{-1}x$ | $-\\frac1{1+x^2}$ |\n| $\\sec x$ | $\\sec x\\tan x$ | $\\sec^{-1}x$ | $\\frac1{|x|\\sqrt{x^2-1}}$ |\n| $\\csc x$ | $-\\csc x\\cot x$ | $\\csc^{-1}x$ | $-\\frac1{|x|\\sqrt{x^2-1}}$ |\n| $e^x$ | $e^x$ | $a^x$ | $a^x\\ln a$ |\n| $\\ln x$ | $\\frac1x$ | $\\log_a x$ | $\\frac1{x\\ln a}$ |\n| $x^n$ | $nx^{n-1}$ | $a$ | $0$ |\n\n*note: for trig integrals, you can memorize sin and cos and derive the rest` },
    { title: "Product / Quotient Rules", body: `$$\\frac d{dx}[f(x)g(x)]=f(x)g'(x)+f'(x)g(x)\\qquad\\text{product rule}$$\n$$\\frac d{dx}\\left[\\frac{f(x)}{g(x)}\\right]=\\frac{f'(x)g(x)-f(x)g'(x)}{[g(x)]^2}\\qquad\\text{quotient rule}$$` },
    { title: "Chain Rule", body: `$$\\frac d{dx}[f(g(x))]=f'(g(x))\\cdot g'(x)$$\n$$\\Rightarrow\\quad \\frac d{dx}[f^{-1}(x)]=\\frac1{f'(f^{-1}(x))}\\qquad\\text{derivative of an inverse function}$$\n*note: use with the formulas above - correctly identify the outer function $f(x)$ and inner function $g(x)$` },
    { title: "Implicit Differentiation", body: `Differentiate both sides w.r.t. $x$, treating $y$ as a function of $x$\n\n*note: this changes in related rates when you’re differentiating w.r.t. $t$ (you have to implicitly differentiate both $y$ and $x$)` },
  ]},
  { id: "applications-derivatives", title: "Applications of Derivatives", items: [
    { title: "Extrema + Derivative Tests", body: `• Critical Points: $f'(x)=0$ or $f'(x)$ is undefined.\n\n• Inflection Points: $f''(x)=0$ or $f''(x)$ is undefined AND $f''(x)$ changes sign.\n\nExtreme Value Theorem: If $f(x)$ is continuous on $[a,b]$, then $f(x)$ has both a max and a min on $[a,b]$.\n\n1st Derivative Test: $f'(x)$ changes $+\\to-$ $\\Rightarrow$ local max; $f'(x)$ changes $-\\to+$ $\\Rightarrow$ local min\n\nConcavity: $f''(x)>0\\Rightarrow$ concave up ($\\cup$); $f''(x)<0\\Rightarrow$ concave down ($\\cap$)\n\n2nd Derivative Test: $f'(c)=0$ and $f''(c)<0\\Rightarrow$ local max; $f'(c)=0$ and $f''(c)>0\\Rightarrow$ local min\n\n*note: you will have to apply the EVT on an FRQ by testing both critical points AND the endpoints of the interval` },
    { title: "Related Rates + Optimization", body: `Related Rates Plan:\n1. Find: identify the rate you are looking for (e.g., $dh/dt$).\n2. Given: identify known values and rates.\n3. Equation: write an equation relating the variables.\n4. Derivative: differentiate with respect to $t$ (Chain Rule).\n\nOptimization Plan:\n1. Equation: find an equation for the quantity to be optimized.\n2. Differentiate: find the derivative and identify critical points.\n3. Verify: use the 1st or 2nd derivative test to confirm the max or min.\n\n*note: you might want to draw a diagram if one is not given to you` },
    { title: "Position, Velocity, Acceleration", body: `$$s(t)=\\text{pos.}\\quad v(t)=s'(t)=\\text{vel.}\\quad a(t)=v'(t)=s''(t)=\\text{accel.}$$\n$$\\text{Speed}=|v(t)|\\qquad \\text{Total Distance}=\\int_a^b|v(t)|dt\\qquad \\text{Displacement}=\\int_a^b v(t)dt$$` },
    { title: "Linearization", body: `$$f(x)\\approx f(a)+f'(a)(x-a)$$\n*note: also called “tangent line approximation”` },
  ]},
  { id: "integrals", title: "Integrals", items: [
    { title: "Riemann Sums", body: `For $\\Delta x=\\frac{b-a}{n}$ and $x_i=a+i\\Delta x$:\n\n$$L_n=\\Delta x[f(x_0)+f(x_1)+\\cdots+f(x_{n-1})]$$\n$$R_n=\\Delta x[f(x_1)+f(x_2)+\\cdots+f(x_n)]$$\n$$M_n=\\Delta x[f(\\bar x_1)+f(\\bar x_2)+\\cdots+f(\\bar x_n)]\\quad\\text{where }\\bar x_i=\\frac{x_{i-1}+x_i}{2}$$\n$$T_n=\\frac{\\Delta x}{2}[f(x_0)+2f(x_1)+2f(x_2)+\\cdots+2f(x_{n-1})+f(x_n)]$$\n$$\\lim_{n\\to\\infty}\\sum_{i=1}^n f(a+i\\Delta x)\\Delta x=\\int_a^b f(x)dx$$\n\n| Function Property | Left Riemann Sum | Right Riemann Sum |\n|---|---|---|\n| Increasing ($f'>0$) | Underestimate | Overestimate |\n| Decreasing ($f'<0$) | Overestimate | Underestimate |\n\n| Function Property | Midpoint Rule | Trapezoidal Rule |\n|---|---|---|\n| Concave Up ($f''>0$) | Underestimate | Overestimate |\n| Concave Down ($f''<0$) | Overestimate | Underestimate |\n\n*note: on FRQs, you’re usually asked to deal with a table with subintervals $\\Delta x$ of unequal length - it’s better to intuitively understand Riemann sums as sums of rectangles / trapezoids and how to calculate that` },
    { title: "Trig, Inverse Trig, and Exponential/Logarithmic", body: `| Integral | Result | Integral | Result |\n|---|---|---|---|\n| $\\int\\sin x\\,dx$ | $-\\cos x+C$ | $\\int\\frac{dx}{\\sqrt{1-x^2}}$ | $\\arcsin x+C$ |\n| $\\int\\cos x\\,dx$ | $\\sin x+C$ | $\\int-\\frac{dx}{\\sqrt{1-x^2}}$ | $\\arccos x+C$ |\n| $\\int\\tan x\\,dx$ | $-\\ln|\\cos x|+C$ | $\\int\\frac{dx}{1+x^2}$ | $\\arctan x+C$ |\n| $\\int\\cot x\\,dx$ | $\\ln|\\sin x|+C$ | $\\int-\\frac{dx}{1+x^2}$ | $\\cot^{-1}x+C$ |\n| $\\int\\sec x\\,dx$ | $\\ln|\\sec x+\\tan x|+C$ | $\\int\\frac{dx}{|x|\\sqrt{x^2-1}}$ | $\\sec^{-1}x+C$ |\n| $\\int\\csc x\\,dx$ | $-\\ln|\\csc x+\\cot x|+C$ | $\\int-\\frac{dx}{|x|\\sqrt{x^2-1}}$ | $\\csc^{-1}x+C$ |\n| $\\int e^x dx$ | $e^x+C$ | $\\int a^x dx$ | $\\frac{a^x}{\\ln a}+C$ |\n| $\\int\\frac1x dx$ | $\\ln|x|+C$ | $\\int\\frac1{x\\ln a}dx$ | $\\log_a x+C$ |\n| $\\int x^n dx$ | $\\frac{x^{n+1}}{n+1}+C,\\ n\\ne-1$ | $\\int0dx$ | $C$ |\n| $\\int\\sec^2x dx$ | $\\tan x+C$ | $\\int\\csc^2x dx$ | $-\\cot x+C$ |\n| $\\int\\sec x\\tan x dx$ | $\\sec x+C$ | $\\int\\csc x\\cot x dx$ | $-\\csc x+C$ |` },
    { title: "Substitution (Reverse Chain Rule)", body: `$$\\int f(g(x))g'(x)dx=\\int f(u)du\\quad\\text{where }u=g(x)$$\n*note: for definite integrals, change the bounds so that $x=a\\to x=b$ becomes $u(a)\\to u(b)$` },
    { title: "Integration by Parts", body: `$$\\int u\\,dv=uv-\\int v\\,du$$` },
    { title: "Fundamental Theorem of Calculus", body: `$$\\frac d{dx}\\int_a^x f(t)dt=f(x)\\qquad\\text{FTC Part 1}$$\n$$\\int_a^b f(x)dx=F(b)-F(a)\\quad\\text{where }F'(x)=f(x)\\qquad\\text{FTC Part 2, a.k.a Integral Evaluation Theorem}$$\n*note: for FTC Part 1, you might have to apply the chain rule if the upper bound is a function of $x$.` },
    { title: "Partial Fractions", body: `$$\\frac{P(x)}{(x-a)(x-b)}=\\frac A{x-a}+\\frac B{x-b}$$\n(cover-up method is optimal)` },
    { title: "Improper Integrals", body: `$$\\int_a^\\infty f(x)dx=\\lim_{b\\to\\infty}\\int_a^b f(x)dx\\qquad\\text{(infinite upper bound)}$$\n$$\\int_{-\\infty}^b f(x)dx=\\lim_{a\\to-\\infty}\\int_a^b f(x)dx\\qquad\\text{(infinite lower bound)}$$\n$$\\int_{-\\infty}^{\\infty}f(x)dx=\\int_{-\\infty}^c f(x)dx+\\int_c^\\infty f(x)dx=\\lim_{a\\to-\\infty}\\int_a^c f(x)dx+\\lim_{b\\to\\infty}\\int_c^b f(x)dx$$\n$$\\int_a^b f(x)dx=\\lim_{t\\to c^-}\\int_a^t f(x)dx+\\lim_{t\\to c^+}\\int_t^b f(x)dx\\qquad\\text{(discontinuity at }c\\text{)}$$\n*note: plugging in $\\infty$ in any part of your response when evaluating an improper integral on an FRQ will cost you points - always present it as a limit` },
  ]},
  { id: "applications-integrals", title: "Applications of Integrals", items: [
    { title: "Average value", body: `$$f_{\\mathrm{avg}}=\\frac1{b-a}\\int_a^b f(x)dx$$\n*note: know what this means for FRQs (same units as original function)` },
    { title: "Area / Volume", body: `$$A=\\int_a^b[f(x)-g(x)]dx\\quad\\text{area between two curves (x-axis)},\\qquad A=\\int_c^d[f(y)-g(y)]dy\\quad\\text{(y-axis)}$$\n$$V=\\pi\\int_a^b[f(x)]^2dx\\quad\\text{disk method (revolving around x-axis)},\\qquad V=\\pi\\int_c^d[f(y)]^2dy\\quad\\text{(around y-axis)}$$\n$$V=\\pi\\int_a^b([f(x)]^2-[g(x)]^2)dx\\quad\\text{washers (revolving around x-axis)},\\qquad V=\\pi\\int_c^d([f(y)]^2-[g(y)]^2)dy\\quad\\text{(y-axis)}$$\n$$V=2\\pi\\int_a^b xf(x)dx\\quad\\text{shells (y-axis)},\\qquad V=2\\pi\\int_c^d yf(y)dy\\quad\\text{(x-axis)}$$\n$$V=\\int_a^b A(x)dx\\quad\\text{if }A(x)\\text{ is the cross-sectional area at }x$$\n*note: cross-sectional is used with squares, $A=s^2$; isosceles triangles, $A=\\frac12s^2$; and semicircles, $A=\\frac12\\pi r^2$\n\n*note: shells is the only method where the function we’re integrating differs from the axis of revolution - it isn’t explicitly tested on the AP exam but can make some questions easier\n\n*note: $f(x)$ (big $R$) is farther from the axis of revolution than $g(x)$ (small $r$)` },
    { title: "Arc Length", body: `$$\\int_a^b\\sqrt{1+\\left(\\frac{dy}{dx}\\right)^2}dx\\qquad\\text{over bounds }x=a\\text{ to }x=b$$\n$$\\int_c^d\\sqrt{1+\\left(\\frac{dx}{dy}\\right)^2}dy\\qquad\\text{over bounds }y=c\\text{ to }y=d$$` },
  ]},
  { id: "differential-equations", title: "Differential Equations", items: [
    { title: "Euler’s Method", body: `Point Slope Linearization\n\n$$(x_0,y_0)\\quad m_0=\\left.\\frac{dy}{dx}\\right|_{(x_0,y_0)}\\quad y_1=y_0+m_0(x_1-x_0)$$\n$$(x_1,y_1)\\quad m_1=\\left.\\frac{dy}{dx}\\right|_{(x_1,y_1)}\\quad y_2=y_1+m_1(x_2-x_1)$$\n$$(x_2,y_2)\\quad m_2=\\left.\\frac{dy}{dx}\\right|_{(x_2,y_2)}\\quad y_3=y_2+m_2(x_3-x_2)$$` },
    { title: "Separable Differential Equations", body: `$$\\frac{dy}{dx}=g(x)h(y)\\Rightarrow\\frac1{h(y)}dy=g(x)dx$$\n*note: don’t forget the $+C$ and keeping track of it\n\n*note: remember separation of variables for an FRQ - this might cost you a lot of points` },
    { title: "Exponential Growth", body: `$$\\frac{dy}{dt}=ky\\Rightarrow y(t)=y_0e^{kt}$$` },
    { title: "Logistic Growth Model", body: `$$\\frac{dP}{dt}=kP\\left(1-\\frac PM\\right)=\\frac{k}{M}P(M-P)\\qquad\\text{maximum growth occurs at }M/2$$\n$$\\lim_{t\\to\\infty}P(t)=M\\qquad\\text{(carrying capacity)}$$\n$$P(t)=\\frac{M}{1+Ae^{-kt}}\\qquad\\text{solution where }A\\text{ depends on }P_0$$` },
    { title: "Newton’s Law of Cooling*", body: `$$T(t)=T_s+(T_0-T_s)e^{-kt}\\Rightarrow\\frac{dT}{dt}=-k(T-T_s)$$\n*note: Newton’s Law of Cooling does not need to be memorized for the AP exam` },
  ]},
  { id: "polar-parametric", title: "Polar/Parametric", items: [
    { title: "Parametric Equations", body: `$$\\frac{dy}{dx}=\\frac{dy/dt}{dx/dt},\\qquad \\frac{d^2y}{dx^2}=\\frac{\\frac d{dt}(dy/dx)}{dx/dt}$$\n$$L=\\int_a^b\\sqrt{\\left(\\frac{dx}{dt}\\right)^2+\\left(\\frac{dy}{dt}\\right)^2}dt\\qquad\\text{(length of a smooth parametric curve)}$$` },
    { title: "Polar Equations", body: `$$x=r\\cos\\theta,\\quad y=r\\sin\\theta,\\quad x^2+y^2=r^2\\qquad\\text{Cartesian to polar conversions}$$\n$$\\frac12\\int_\\alpha^\\beta[r(\\theta)]^2d\\theta\\qquad\\text{area of a polar curve from }\\theta_1=\\alpha\\text{ to }\\theta_2=\\beta$$\n$$\\frac12\\int_\\alpha^\\beta([r_1(\\theta)]^2-[r_2(\\theta)]^2)d\\theta\\qquad\\text{area of a segment bounded by two polar curves}$$\n$$L=\\int_\\alpha^\\beta\\sqrt{r^2+\\left(\\frac{dr}{d\\theta}\\right)^2}d\\theta\\qquad\\text{arc length of a polar curve}$$\n*note: know how to deal with problems involving a limacon with an inner loop (figuring out bounds)` },
    { title: "Position, Velocity, Acceleration", body: `position: $(f(t),g(t))$\n\nvelocity: $\\langle f'(t),g'(t)\\rangle=(f'(t),g'(t))=\\frac{dx}{dt}\\mathbf i+\\frac{dy}{dt}\\mathbf j$\n\nacceleration: $\\langle f''(t),g''(t)\\rangle$\n\n$$\\text{speed}=\\sqrt{(f'(t))^2+(g'(t))^2}\\qquad \\text{distance traveled on }[a,b]=\\int_a^b\\sqrt{(f'(t))^2+(g'(t))^2}dt$$` },
  ]},
  { id: "series", title: "Series", items: [
    { title: "Partial Sums", body: `$$S_1=a_1,\\quad S_2=a_1+a_2,\\quad S_3=a_1+a_2+a_3,\\ldots\\qquad\\text{where }S=S_\\infty=\\sum_{n=1}^\\infty a_n$$` },
    { title: "Geometric Series", body: `$$\\sum_{n=1}^\\infty a_1r^{n-1}=\\frac{a_1}{1-r}\\quad\\text{if }|r|<1,\\text{ and diverges if }|r|\\ge1$$\n*note: problems will often start at a different index, so remember to plug in the first value of $n$ to find $a_1$\n\n*note: generate the first few partial sums to make sure you’re looking at a geometric series` },
    { title: "Power Series, Taylor Series, and Maclaurin Series", body: `Power series:\n$$\\sum_{n=0}^\\infty c_n(x-a)^n=c_0+c_1(x-a)+c_2(x-a)^2+c_3(x-a)^3+\\cdots$$\nTaylor series:\n$$\\sum_{n=0}^\\infty\\frac{f^{(n)}(a)}{n!}(x-a)^n=f(a)+f'(a)(x-a)+\\frac{f''(a)}{2!}(x-a)^2+\\frac{f^{(3)}(a)}{3!}(x-a)^3+\\cdots$$\nMaclaurin series:\n$$\\sum_{n=0}^\\infty\\frac{f^{(n)}(0)}{n!}x^n=f(0)+f'(0)x+\\frac{f''(0)}{2!}x^2+\\frac{f^{(3)}(0)}{3!}x^3+\\cdots$$\n*note: $a$ is the center of the Taylor series, and the Maclaurin series is centered at 0` },
    { title: "Common Maclaurin Series", body: `$$e^x=1+x+\\frac{x^2}{2!}+\\frac{x^3}{3!}+\\cdots=\\sum_{n=0}^\\infty\\frac{x^n}{n!}$$\n$$\\sin x=x-\\frac{x^3}{3!}+\\frac{x^5}{5!}-\\frac{x^7}{7!}+\\cdots=\\sum_{n=0}^\\infty\\frac{(-1)^nx^{2n+1}}{(2n+1)!}$$\n$$\\cos x=1-\\frac{x^2}{2!}+\\frac{x^4}{4!}-\\frac{x^6}{6!}+\\cdots=\\sum_{n=0}^\\infty\\frac{(-1)^nx^{2n}}{(2n)!}$$\n$$\\frac1{1-x}=1+x+x^2+x^3+\\cdots=\\sum_{n=0}^\\infty x^n$$\n$$\\frac1{1+x}=1-x+x^2-x^3+\\cdots=\\sum_{n=0}^\\infty(-1)^nx^n$$\n$$\\ln(1+x)=x-\\frac{x^2}{2}+\\frac{x^3}{3}-\\frac{x^4}{4}+\\cdots=\\sum_{n=1}^\\infty\\frac{(-1)^{n-1}x^n}{n}$$\n$$\\arctan x=x-\\frac{x^3}{3}+\\frac{x^5}{5}-\\frac{x^7}{7}+\\cdots=\\sum_{n=0}^\\infty\\frac{(-1)^nx^{2n+1}}{2n+1}$$` },
    { title: "Lagrange Error Bound", body: `$$|R_n(x)|\\le\\frac{M|x-c|^{n+1}}{(n+1)!},\\qquad M=\\max_{z\\in[c,x]}|f^{(n+1)}(z)|.$$` },
    { title: "Alternating Series Error Bound", body: `If $\\sum_{n=1}^\\infty(-1)^{n+1}a_n$ satisfies the conditions for the Alternating Series Test, then the error satisfies $|S-S_n|\\le a_{n+1}$.` },
    { title: "Manipulating Known Series", body: `substitution (R remains the same), term-by-term differentiation/integration, multiplication/division` },
    { title: "Convergence Tests", body: `n-th Term: $\\sum a_n$ diverges if $\\lim_{n\\to\\infty}a_n\\ne0$ (inconclusive if limit is 0)\n\nGeometric: $\\sum ar^n$ converges if $|r|<1$, diverges if $|r|\\ge1$ $\\left(S=\\frac a{1-r}\\right)$\n\np-Series: $\\sum\\frac1{n^p}$ converges if $p>1$, diverges if $p\\le1$\n\nAST: $\\sum(-1)^na_n$ converges if $a_{n+1}\\le a_n$ and $\\lim_{n\\to\\infty}a_n=0$\n\nIntegral Test: $\\sum a_n$ shares the same behavior as $\\int_1^\\infty f(x)dx$ if $f(x)$ is +, continuous, decreasing on $[1,\\infty)$\n\nDCT: $a_n\\le b_n$, $\\sum b_n$ converges $\\Rightarrow\\sum a_n$ converges; $a_n\\ge b_n$, $\\sum b_n$ diverges $\\Rightarrow\\sum a_n$ diverges\n\nLCT: $\\lim_{n\\to\\infty}\\frac{a_n}{b_n}=L>0\\Rightarrow$ both series share the same behavior\n\nRatio Test: $\\lim_{n\\to\\infty}\\left|\\frac{a_{n+1}}{a_n}\\right|=L\\Rightarrow$ converges if $L<1$, diverges if $L>1$ (inconclusive if $L=1$)` },
    { title: "Absolute vs. Conditional Convergence", body: `$\\sum a_n$ converges absolutely if $\\sum|a_n|$ converges, absolute convergence $\\Rightarrow$ convergence\n\n$\\sum a_n$ converges conditionally if $\\sum a_n$ converges but $\\sum|a_n|$ diverges\n\n*note: the alternating harmonic series is a conditionally convergent series` },
    { title: "Radius and Interval of Convergence", body: `Radius of Convergence\n\nFound using the Ratio Test; series expanded around $R$; the radius is half the length of the interval\n\nInterval of Convergence\n\n1. Go straight to the Ratio Test to figure out the interval where the series converges.\n2. After you’ve found the interval, you must check both endpoints to determine whether each one is included or not (i.e., whether you use $\\le$ or $<$ and $\\ge$ or $>$).` },
  ]},
];

export const Route = createFileRoute("/latex-master-sheet")({
  head: () => ({ meta: [
    { title: "Formula and Strategy Guide — AP STEM OS" },
    { name: "description", content: "A navigable web-native AP Calculus BC master guide with the complete printable guide preserved alongside it." },
    { property: "og:title", content: "Formula and Strategy Guide — AP STEM OS" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: () => <SubjectContentGate><FormulaGuide /></SubjectContentGate>,
});

function FormulaGuide() {
  return (
    <PageShell eyebrow="cram" title="Formula and Strategy Guide" description="The complete AP Calculus BC Master Guide, rendered natively for the web and organized for fast navigation. The printable LaTeX version is still available.">
      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
            <div className="micro-label mb-3">contents</div>
            <nav aria-label="Guide sections" className="space-y-1">
              {sections.map((section, i) => <a key={section.id} href={`#${section.id}`} className="group flex items-center gap-2 rounded-lg px-2.5 py-2 text-[13px] text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground"><span className="num text-[10px] text-subtle">{String(i + 1).padStart(2, "0")}</span><span>{section.title}</span></a>)}
            </nav>
            <a href={PDF_URL} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center gap-2 border-t border-border px-2.5 pt-4 text-[12px] font-medium text-primary"><Download className="h-3.5 w-3.5" />Printable PDF</a>
          </div>
        </aside>

        <main data-formula-guide-main className="min-w-0 max-w-full space-y-10 overflow-hidden">
          {sections.map((section, sectionIndex) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <div className="mb-5 flex items-baseline gap-3 border-b border-border pb-3"><span className="num text-[11px] text-primary">{String(sectionIndex + 1).padStart(2, "0")}</span><h2 className="font-display text-2xl font-semibold tracking-tight">{section.title}</h2></div>
              <div className="space-y-4">
                {section.items.map((item) => <article key={item.title} className="min-w-0 max-w-full overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-card sm:p-7"><h3 className="font-display text-[17px] font-semibold">{item.title}</h3><div className="formula-guide-card-body mt-4 min-w-0 max-w-full whitespace-pre-line text-[14px] leading-7 text-secondary-foreground"><LaTeX>{item.body}</LaTeX></div></article>)}
              </div>
            </section>
          ))}
        </main>
      </div>
    </PageShell>
  );
}
