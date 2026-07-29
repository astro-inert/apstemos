CREATE POLICY "admins read exam pdfs" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'exam-pdfs' AND has_role(auth.uid(), 'admin'));
CREATE POLICY "admins upload exam pdfs" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'exam-pdfs' AND has_role(auth.uid(), 'admin'));
CREATE POLICY "admins update exam pdfs" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'exam-pdfs' AND has_role(auth.uid(), 'admin'));
CREATE POLICY "admins delete exam pdfs" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'exam-pdfs' AND has_role(auth.uid(), 'admin'));