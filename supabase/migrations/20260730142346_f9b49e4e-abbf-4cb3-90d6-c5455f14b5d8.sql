REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;

CREATE POLICY "own uploads read" ON public.question_uploads
FOR SELECT TO authenticated
USING (auth.uid() = user_id);