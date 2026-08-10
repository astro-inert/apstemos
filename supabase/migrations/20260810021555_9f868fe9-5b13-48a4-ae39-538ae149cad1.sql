CREATE TABLE IF NOT EXISTS public.user_mistakes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  code text NOT NULL,
  title text NOT NULL,
  category text NOT NULL DEFAULT 'Personal',
  description text NOT NULL DEFAULT '',
  example text,
  how_to_avoid text NOT NULL DEFAULT '',
  est_point_loss numeric NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, code)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_mistakes TO authenticated;
GRANT ALL ON public.user_mistakes TO service_role;

ALTER TABLE public.user_mistakes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage their own mistakes" ON public.user_mistakes;
CREATE POLICY "Users manage their own mistakes"
ON public.user_mistakes FOR ALL TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);