
-- =====================================================================
-- AP Calculus BC Performance OS — schema
-- =====================================================================

-- ---------- enums ----------
CREATE TYPE public.app_role AS ENUM ('admin', 'user');
CREATE TYPE public.ap_track AS ENUM ('AB', 'BC');
CREATE TYPE public.question_type AS ENUM ('MCQ', 'FRQ');
CREATE TYPE public.difficulty AS ENUM ('easy', 'medium', 'hard');

-- ---------- subjects (forward-compat) ----------
CREATE TABLE public.subjects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  total_points INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.subjects TO anon, authenticated;
GRANT ALL ON public.subjects TO service_role;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "subjects readable" ON public.subjects FOR SELECT USING (true);

INSERT INTO public.subjects (id, name, total_points) VALUES
  ('ap-calc-bc', 'AP Calculus BC', 108),
  ('ap-calc-ab', 'AP Calculus AB', 108);

-- ---------- units ----------
CREATE TABLE public.units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id TEXT NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  number INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  ap_weight_pct NUMERIC(4,1) NOT NULL,
  ap_points INTEGER NOT NULL,
  track public.ap_track NOT NULL DEFAULT 'BC',
  UNIQUE(subject_id, number)
);
GRANT SELECT ON public.units TO anon, authenticated;
GRANT ALL ON public.units TO service_role;
ALTER TABLE public.units ENABLE ROW LEVEL SECURITY;
CREATE POLICY "units readable" ON public.units FOR SELECT USING (true);

-- ---------- topics ----------
CREATE TABLE public.topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id UUID NOT NULL REFERENCES public.units(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  UNIQUE(unit_id, code)
);
GRANT SELECT ON public.topics TO anon, authenticated;
GRANT ALL ON public.topics TO service_role;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "topics readable" ON public.topics FOR SELECT USING (true);

-- ---------- profiles ----------
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  track public.ap_track NOT NULL DEFAULT 'BC',
  target_score INTEGER NOT NULL DEFAULT 5 CHECK (target_score BETWEEN 1 AND 5),
  exam_date DATE NOT NULL DEFAULT '2026-05-12',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile read" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "own profile write" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- ---------- user_roles ----------
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE(user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own roles read" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS(SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- ---------- questions ----------
CREATE TABLE public.questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type public.question_type NOT NULL,
  unit_id UUID REFERENCES public.units(id) ON DELETE SET NULL,
  topic_id UUID REFERENCES public.topics(id) ON DELETE SET NULL,
  difficulty public.difficulty NOT NULL DEFAULT 'medium',
  calculator BOOLEAN NOT NULL DEFAULT false,
  skills TEXT[] NOT NULL DEFAULT '{}',
  common_mistake_codes TEXT[] NOT NULL DEFAULT '{}',
  ap_value NUMERIC(4,1) NOT NULL DEFAULT 1,
  prompt TEXT NOT NULL,
  answer TEXT,
  explanation TEXT,
  source TEXT,
  year INTEGER,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.questions TO authenticated;
GRANT ALL ON public.questions TO service_role;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "published questions readable" ON public.questions FOR SELECT TO authenticated USING (is_published = true);
CREATE POLICY "admins manage questions" ON public.questions FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ---------- common_mistakes catalog ----------
CREATE TABLE public.common_mistakes (
  code TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  example TEXT,
  ap_consequence TEXT,
  how_to_avoid TEXT NOT NULL,
  est_point_loss NUMERIC(3,1) NOT NULL DEFAULT 1
);
GRANT SELECT ON public.common_mistakes TO anon, authenticated;
GRANT ALL ON public.common_mistakes TO service_role;
ALTER TABLE public.common_mistakes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "mistakes readable" ON public.common_mistakes FOR SELECT USING (true);

-- ---------- attempts ----------
CREATE TABLE public.attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  topic_id UUID REFERENCES public.topics(id) ON DELETE SET NULL,
  unit_id UUID REFERENCES public.units(id) ON DELETE SET NULL,
  correct BOOLEAN NOT NULL,
  points_earned NUMERIC(4,1) NOT NULL DEFAULT 0,
  points_possible NUMERIC(4,1) NOT NULL DEFAULT 1,
  time_spent_seconds INTEGER,
  mistake_codes TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX attempts_user_idx ON public.attempts(user_id, created_at DESC);
CREATE INDEX attempts_user_topic_idx ON public.attempts(user_id, topic_id);
GRANT SELECT, INSERT ON public.attempts TO authenticated;
GRANT ALL ON public.attempts TO service_role;
ALTER TABLE public.attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own attempts read" ON public.attempts FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own attempts insert" ON public.attempts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- ---------- profile auto-create trigger ----------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ---------- seed BC units (College Board AP Calc BC) ----------
INSERT INTO public.units (subject_id, number, name, ap_weight_pct, ap_points, track) VALUES
  ('ap-calc-bc', 1, 'Limits and Continuity', 5, 5, 'BC'),
  ('ap-calc-bc', 2, 'Differentiation: Definition and Fundamental Properties', 5, 5, 'BC'),
  ('ap-calc-bc', 3, 'Differentiation: Composite, Implicit, and Inverse Functions', 5, 5, 'BC'),
  ('ap-calc-bc', 4, 'Contextual Applications of Differentiation', 7, 8, 'BC'),
  ('ap-calc-bc', 5, 'Analytical Applications of Differentiation', 8, 9, 'BC'),
  ('ap-calc-bc', 6, 'Integration and Accumulation of Change', 18, 19, 'BC'),
  ('ap-calc-bc', 7, 'Differential Equations', 8, 9, 'BC'),
  ('ap-calc-bc', 8, 'Applications of Integration', 13, 14, 'BC'),
  ('ap-calc-bc', 9, 'Parametric, Polar, and Vector Functions', 12, 13, 'BC'),
  ('ap-calc-bc', 10, 'Infinite Sequences and Series', 19, 21, 'BC');
