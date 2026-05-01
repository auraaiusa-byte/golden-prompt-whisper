
DROP POLICY "Anyone can insert leads" ON public.leads;

CREATE POLICY "Anyone can submit a valid lead"
  ON public.leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND length(email) <= 255
    AND lead_status IN ('new','contacted','qualified','converted','archived')
    AND length(source) <= 100
  );
