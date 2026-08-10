-- attempt provenance on existing answer log
DO $$ BEGIN
  CREATE TYPE public.attempt_kind AS ENUM ('first_attempt','previously_seen','previously_answered','repeat_attempt');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

ALTER TABLE public.attempts
  ADD COLUMN IF NOT EXISTS attempt_kind public.attempt_kind NOT NULL DEFAULT 'first_attempt',
  ADD COLUMN IF NOT EXISTS question_key text,
  ADD COLUMN IF NOT EXISTS difficulty public.difficulty,
  ADD COLUMN IF NOT EXISTS diagnostic_id uuid;

-- item statistics (provisional vs empirically calibrated)
CREATE TABLE public.item_stats (
  question_key text PRIMARY KEY,
  unit_slug text,
  topic_slug text,
  difficulty_label public.difficulty NOT NULL DEFAULT 'medium',
  provisional_difficulty numeric NOT NULL DEFAULT 0,
  empirical_difficulty numeric,
  discrimination numeric,
  n_first_attempts integer NOT NULL DEFAULT 0,
  n_first_correct integer NOT NULL DEFAULT 0,
  calibrated boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.item_stats TO authenticated;
GRANT ALL ON public.item_stats TO service_role;
ALTER TABLE public.item_stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "item stats readable" ON public.item_stats FOR SELECT TO authenticated USING (true);
CREATE POLICY "admins manage item stats" ON public.item_stats FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER update_item_stats_updated_at BEFORE UPDATE ON public.item_stats
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- per-user exposure to each question
CREATE TABLE public.question_exposure (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_key text NOT NULL,
  unit_slug text,
  topic_slug text,
  first_seen_at timestamptz NOT NULL DEFAULT now(),
  first_attempt_correct boolean,
  first_attempt_at timestamptz,
  attempt_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, question_key)
);
GRANT SELECT, INSERT, UPDATE ON public.question_exposure TO authenticated;
GRANT ALL ON public.question_exposure TO service_role;
ALTER TABLE public.question_exposure ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own exposure read" ON public.question_exposure FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own exposure insert" ON public.question_exposure FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own exposure update" ON public.question_exposure FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER update_question_exposure_updated_at BEFORE UPDATE ON public.question_exposure
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- timed diagnostic sessions
CREATE TABLE public.diagnostics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_id text NOT NULL DEFAULT 'ap-calc-bc',
  question_keys text[] NOT NULL DEFAULT '{}'::text[],
  time_limit_seconds integer NOT NULL DEFAULT 2700,
  unseen_share numeric NOT NULL DEFAULT 1,
  started_at timestamptz NOT NULL DEFAULT now(),
  submitted_at timestamptz,
  locked boolean NOT NULL DEFAULT false,
  correct_count integer NOT NULL DEFAULT 0,
  item_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.diagnostics TO authenticated;
GRANT ALL ON public.diagnostics TO service_role;
ALTER TABLE public.diagnostics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own diagnostics read" ON public.diagnostics FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own diagnostics insert" ON public.diagnostics FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own diagnostics update" ON public.diagnostics FOR UPDATE TO authenticated USING (auth.uid() = user_id AND locked = false) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "admins read diagnostics" ON public.diagnostics FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER update_diagnostics_updated_at BEFORE UPDATE ON public.diagnostics
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.diagnostic_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  diagnostic_id uuid NOT NULL REFERENCES public.diagnostics(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_key text NOT NULL,
  unit_slug text,
  topic_slug text,
  difficulty public.difficulty,
  selected_answer text,
  correct boolean,
  was_unseen boolean NOT NULL DEFAULT true,
  time_spent_ms integer,
  answered_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (diagnostic_id, question_key)
);
GRANT SELECT, INSERT ON public.diagnostic_responses TO authenticated;
GRANT ALL ON public.diagnostic_responses TO service_role;
ALTER TABLE public.diagnostic_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own diagnostic responses read" ON public.diagnostic_responses FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own diagnostic responses insert" ON public.diagnostic_responses FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "admins read diagnostic responses" ON public.diagnostic_responses FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));

-- stored predictions for validation
CREATE TABLE public.predictions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_id text NOT NULL DEFAULT 'ap-calc-bc',
  model_version text NOT NULL,
  estimated_score integer,
  score_low integer,
  score_high integer,
  distribution jsonb NOT NULL DEFAULT '{}'::jsonb,
  ability numeric,
  standard_error numeric,
  confidence_state text NOT NULL,
  coverage_score numeric NOT NULL DEFAULT 0,
  question_count integer NOT NULL DEFAULT 0,
  unique_question_count integer NOT NULL DEFAULT 0,
  provisional_share numeric NOT NULL DEFAULT 1,
  diagnostic_id uuid REFERENCES public.diagnostics(id) ON DELETE SET NULL,
  diagnostic_score numeric,
  actual_ap_score integer,
  actual_reported_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.predictions TO authenticated;
GRANT ALL ON public.predictions TO service_role;
ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own predictions read" ON public.predictions FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own predictions insert" ON public.predictions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own predictions update" ON public.predictions FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "admins read predictions" ON public.predictions FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER update_predictions_updated_at BEFORE UPDATE ON public.predictions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_predictions_user ON public.predictions (user_id, created_at DESC);
CREATE INDEX idx_exposure_user ON public.question_exposure (user_id);
CREATE INDEX idx_attempts_user_kind ON public.attempts (user_id, attempt_kind);
CREATE INDEX idx_diag_resp_diag ON public.diagnostic_responses (diagnostic_id);

-- validation constraints that must tolerate NULL until reported
ALTER TABLE public.predictions ADD CONSTRAINT predictions_actual_range
  CHECK (actual_ap_score IS NULL OR (actual_ap_score BETWEEN 1 AND 5));
ALTER TABLE public.predictions ADD CONSTRAINT predictions_estimate_range
  CHECK (estimated_score IS NULL OR (estimated_score BETWEEN 1 AND 5));