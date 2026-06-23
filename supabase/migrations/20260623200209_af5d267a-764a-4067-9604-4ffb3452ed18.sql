
-- Re-seed common_mistakes with LaTeX-delimited math so KaTeX renders formulas.
UPDATE public.common_mistakes SET
  description = 'Trig functions return wrong values because the calculator is set to degrees.',
  example = '$\sin(\pi/2)$ returns $0.0274$ instead of $1$.',
  ap_consequence = 'Every trig computation on the test is wrong.',
  how_to_avoid = 'Set the calculator to RADIAN mode before the exam. Verify on the first calculator FRQ.'
WHERE code = 'calc-mode-radians';

UPDATE public.common_mistakes SET
  description = 'Saying "converges by ratio test" with no work shown.',
  example = 'Writing "converges by ratio test" without computing $\lim_{n\to\infty} \left|\dfrac{a_{n+1}}{a_n}\right|$.',
  ap_consequence = 'Loses both the test point and the justification point.',
  how_to_avoid = 'Always compute the limit explicitly and state the comparison value (e.g., $L < 1$).'
WHERE code = 'series-test-justify';

UPDATE public.common_mistakes SET
  description = 'Solving for $\dfrac{dx}{dt}$ when the prompt asks for $\dfrac{dV}{dt}$.',
  example = 'Computing rate of radius when asked for rate of volume.',
  ap_consequence = 'Zero on the FRQ sub-part.',
  how_to_avoid = 'Write the goal: "Find $\dfrac{dV}{dt}$ when $r = 3$." Circle the rate you need.'
WHERE code = 'related-rates-units';

UPDATE public.common_mistakes SET
  description = 'Using $\int r\,d\theta$ instead of $\dfrac{1}{2}\int r^{2}\,d\theta$.',
  example = 'The $\dfrac{1}{2}$ factor dropped on a polar region FRQ.',
  ap_consequence = 'Wrong final answer; setup point lost.',
  how_to_avoid = 'Write $\text{Area} = \dfrac{1}{2}\int r^{2}\,d\theta$ as a template before plugging in.'
WHERE code = 'polar-area-formula';

UPDATE public.common_mistakes SET
  description = 'Using $\sqrt{1 + (dy/dx)^{2}}$ instead of $\sqrt{(dx/dt)^{2} + (dy/dt)^{2}}$.',
  example = 'Switching to the Cartesian formula on a parametric arc-length problem.',
  ap_consequence = 'Wrong setup, wrong answer.',
  how_to_avoid = 'Memorize: parametric uses $(dx/dt)^{2} + (dy/dt)^{2}$ under the radical.'
WHERE code = 'parametric-arc-length';

UPDATE public.common_mistakes SET
  description = 'Using $\Delta x = 1$ when the problem says step size $0.5$.',
  example = 'Two-step Euler approximation done with one step.',
  ap_consequence = 'Wrong approximate value.',
  how_to_avoid = 'Write "step size $h = \_\_\_$" at the top of work. Tabulate $(x, y, \text{slope})$ explicitly.'
WHERE code = 'eulers-method-step';

UPDATE public.common_mistakes SET
  description = 'Using $x$-bounds when integrating in terms of $y$, or forgetting to convert bounds after a $u$-substitution.',
  example = 'After $u = x^{2}$, integrating from $x = 0$ to $x = 2$ instead of $u = 0$ to $u = 4$.',
  ap_consequence = 'Loses the setup and the answer point.',
  how_to_avoid = 'Rewrite bounds explicitly in the new variable before integrating.'
WHERE code = 'wrong-bounds';

UPDATE public.common_mistakes SET
  description = 'Differentiating $y^{2}$ as $2y$ instead of $2y\cdot\dfrac{dy}{dx}$.',
  example = 'On $x^{2} + y^{2} = 25$, getting $2x + 2y = 0$.',
  ap_consequence = 'Wrong slope, wrong tangent line, wrong answer.',
  how_to_avoid = 'Every time you differentiate a $y$-term, attach $\dfrac{dy}{dx}$ immediately.'
WHERE code = 'implicit-y-prime';

UPDATE public.common_mistakes SET
  description = 'Trying to integrate before moving all $y$-terms to one side.',
  example = 'Integrating $\dfrac{dy}{dx} = xy$ as $\int xy\,dx$.',
  ap_consequence = 'Wrong solution.',
  how_to_avoid = 'Always rearrange to $\dfrac{1}{g(y)}\,dy = f(x)\,dx$ before integrating.'
WHERE code = 'diffeq-separate-vars';

UPDATE public.common_mistakes SET
  description = 'Dropping or flipping a negative sign during chain rule, integration by parts, or $u$-substitution.',
  example = '$\dfrac{d}{dx}[\cos(x)]$ written as $\sin(x)$ instead of $-\sin(x)$.',
  ap_consequence = '1 point per FRQ sub-part; can cascade through later parts.',
  how_to_avoid = 'Write the negative explicitly the moment it appears. Box it.'
WHERE code = 'sign-error';

UPDATE public.common_mistakes SET
  description = 'Applying a theorem without stating the function is continuous on $[a,b]$ or differentiable on $(a,b)$.',
  example = 'Using MVT on $|x|$ over $[-1,1]$ without noting non-differentiability at $0$.',
  ap_consequence = 'Loses the justification point.',
  how_to_avoid = 'Write: "$f$ is continuous on $[a,b]$ and differentiable on $(a,b)$ because..." every time.'
WHERE code = 'mvt-conditions';

UPDATE public.common_mistakes SET
  description = 'Differentiating $x\sin(x)$ as $\cos(x)$ by treating the product as one function.',
  example = '$\dfrac{d}{dx}[x\sin x]$ written as $\cos(x)$.',
  ap_consequence = 'Wrong derivative cascades into wrong critical points and wrong answer.',
  how_to_avoid = 'Whenever you see two functions multiplied, write $u\cdot v$ and apply the rule explicitly.'
WHERE code = 'product-quotient-skip';

UPDATE public.common_mistakes SET
  description = 'Differentiating $\sin(3x)$ as $\cos(3x)$ without multiplying by $3$.',
  example = '$\sin(x^{2})$ differentiated as $\cos(x^{2})$ instead of $2x\cos(x^{2})$.',
  ap_consequence = 'Wrong derivative across the whole problem.',
  how_to_avoid = 'Underline the inside function. Write its derivative as a multiplier before simplifying.'
WHERE code = 'chain-rule-skip';

UPDATE public.common_mistakes SET
  description = 'Forgetting to verify that $|a_n|$ is decreasing and that $\lim_{n\to\infty} a_n = 0$.',
  example = 'Concluding $\sum (-1)^{n}/n$ converges without verifying both conditions.',
  ap_consequence = 'Wrong conclusion, lost justification point.',
  how_to_avoid = 'Write both conditions as a checklist before concluding convergence.'
WHERE code = 'alternating-series-error';

-- Generic pass: wrap any remaining rows' common ASCII math fragments.
-- Safe no-op if a row already contains $.
