CREATE TABLE public.concierge_leads (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), full_name text NOT NULL, phone text NOT NULL, email text NOT NULL, business_type text NOT NULL, service_interest text NOT NULL, source text NOT NULL DEFAULT 'Aura AI Guide', created_at timestamptz NOT NULL DEFAULT now());
GRANT ALL ON public.concierge_leads TO service_role;
ALTER TABLE public.concierge_leads ENABLE ROW LEVEL SECURITY;
CREATE TABLE public.guide_ai_access_state (id text PRIMARY KEY, paused boolean NOT NULL DEFAULT false, status integer, message text, updated_at timestamptz NOT NULL DEFAULT now());
GRANT ALL ON public.guide_ai_access_state TO service_role;
ALTER TABLE public.guide_ai_access_state ENABLE ROW LEVEL SECURITY;