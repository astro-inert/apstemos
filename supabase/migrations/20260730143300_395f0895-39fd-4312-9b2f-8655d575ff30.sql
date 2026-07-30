UPDATE public.common_mistakes SET
  description = 'Computing $\int_a^b f(x)\,dx$ but not dividing by the length of the interval.',
  example = 'Average value of $f$ on $[1,5]$ given as $\int_1^5 f(x)\,dx$ instead of $\dfrac{1}{4}\int_1^5 f(x)\,dx$.',
  how_to_avoid = 'Write $\text{Avg} = \dfrac{1}{b-a}\int_a^b f(x)\,dx$ as a template every time.',
  title = 'Forgetting $\dfrac{1}{b-a}$ for average value'
WHERE code = 'average-value-skip-divide';

UPDATE public.common_mistakes SET
  description = 'Leaving $+C$ on a definite integral, or evaluating an indefinite integral without $+C$.',
  example = '$\int_0^2 2x\,dx$ written as $x^{2} + C$.',
  how_to_avoid = 'Definite: no $+C$, plug in the bounds. Indefinite: always $+C$.',
  title = 'Forgetting $+C$ / evaluating a definite integral as indefinite'
WHERE code = 'fundamental-thm-skip-c';

UPDATE public.common_mistakes SET
  example = 'Writing $\int_0^3 v(t)\,dt$ instead of $8.241$.'
WHERE code = 'numerical-vs-expression';

UPDATE public.common_mistakes SET
  example = 'Reporting a rate as $12.4$ instead of $12.4$ gallons per minute.'
WHERE code = 'missing-units';

UPDATE public.common_mistakes SET
  example = 'Prompt asks "is the particle speeding up?" — the student writes $4$ but never says yes or no with justification.'
WHERE code = 'answer-not-in-context';

UPDATE public.common_mistakes SET
  example = '$\sin(\pi/2)$ returns $0.0274$ instead of $1$.'
WHERE code = 'calc-mode-radians';

UPDATE public.common_mistakes SET
  example = 'Two-step Euler approximation done with a single step.',
  description = 'Using $\Delta x = 1$ when the problem says step size $h = 0.5$.'
WHERE code = 'eulers-method-step';