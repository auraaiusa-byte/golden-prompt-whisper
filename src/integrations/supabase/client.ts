import { createClient } from '@supabase/supabase-js';
<<<<<<< Updated upstream
import type { Database } from './types';
import { brokeredPreviewStorage } from './previewAuthStorage';
=======
>>>>>>> Stashed changes

const supabaseUrl = 'https://csjywkhhrsiydhjxtstn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzanl3a2hocnNpeWRoanh0c3RuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0OTYwMTAsImV4cCI6MjA5MzA3MjAxMH0.EK3lUjNqV9Pi-s1xW0W0Bjh8eAh9soCm_nT8KdaEYMk';

<<<<<<< Updated upstream
// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: brokeredPreviewStorage(),
    persistSession: true,
    autoRefreshToken: true,
  }
});
=======
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
>>>>>>> Stashed changes
