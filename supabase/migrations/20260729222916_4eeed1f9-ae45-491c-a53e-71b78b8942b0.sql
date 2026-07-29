CREATE TABLE public.question_uploads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  filename text NOT NULL,
  storage_path text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  page_count integer,
  extracted_count integer NOT NULL DEFAULT 0,
  error text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.question_uploads TO authenticated;
GRANT ALL ON public.question_uploads TO service_role;
ALTER TABLE public.question_uploads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage uploads" ON public.question_uploads FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));

ALTER TABLE public.questions
  ADD COLUMN upload_id uuid REFERENCES public.question_uploads(id) ON DELETE SET NULL,
  ADD COLUMN question_number integer,
  ADD COLUMN part text,
  ADD COLUMN unit_slug text,
  ADD COLUMN topic_slug text,
  ADD COLUMN choices jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN rubric jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN page_start integer,
  ADD COLUMN page_end integer,
  ADD COLUMN page_image_url text,
  ADD COLUMN review_status text NOT NULL DEFAULT 'approved',
  ADD COLUMN created_by uuid,
  ADD COLUMN updated_at timestamptz NOT NULL DEFAULT now();

CREATE INDEX IF NOT EXISTS questions_unit_slug_idx ON public.questions (unit_slug);
CREATE INDEX IF NOT EXISTS questions_topic_slug_idx ON public.questions (topic_slug);
CREATE INDEX IF NOT EXISTS questions_review_status_idx ON public.questions (review_status);

ALTER TABLE public.attempts
  ADD COLUMN unit_slug text,
  ADD COLUMN topic_slug text,
  ADD COLUMN selected_answer text;

CREATE INDEX IF NOT EXISTS attempts_user_topic_slug_idx ON public.attempts (user_id, topic_slug);

CREATE TABLE public.starred_mistakes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  code text NOT NULL REFERENCES public.common_mistakes(code) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, code)
);
GRANT SELECT, INSERT, DELETE ON public.starred_mistakes TO authenticated;
GRANT ALL ON public.starred_mistakes TO service_role;
ALTER TABLE public.starred_mistakes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own starred read" ON public.starred_mistakes FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own starred insert" ON public.starred_mistakes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own starred delete" ON public.starred_mistakes FOR DELETE TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "published questions readable" ON public.questions;
CREATE POLICY "published questions readable" ON public.questions FOR SELECT TO authenticated
  USING (is_published = true AND review_status = 'approved');

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $fn$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$fn$;

CREATE TRIGGER update_question_uploads_updated_at BEFORE UPDATE ON public.question_uploads
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER update_questions_updated_at BEFORE UPDATE ON public.questions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();