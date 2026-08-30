ALTER TABLE public.profiles ALTER COLUMN exam_date SET DEFAULT '2027-05-10'::date;

UPDATE public.profiles
SET exam_date = '2027-05-10'::date, updated_at = now()
WHERE exam_date < CURRENT_DATE;