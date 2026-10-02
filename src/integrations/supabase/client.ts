import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";
import { brokeredPreviewStorage } from "./previewAuthStorage";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
function resolveSupabaseKey(): string {
  const pub = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;
  const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

  const extractRef = (token?: string) => {
    if (!token) return null;
    try {
      const parts = token.split(".");
      if (parts.length < 2) return null;
      const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
      const decoded = typeof atob === "function"
        ? atob(base64)
        : Buffer.from(base64, "base64").toString("binary");
      const parsed = JSON.parse(decoded);
      return parsed.ref || null;
    } catch {
      return null;
    }
  };

  const urlMatch = supabaseUrl?.match(/https:\/\/([^.]+)\.supabase\.co/);
  const targetRef = urlMatch ? urlMatch[1] : null;

  if (targetRef) {
    if (extractRef(pub) === targetRef) return pub!;
    if (extractRef(anon) === targetRef) return anon!;
  }

  return (pub || anon || "") as string;
}

const supabaseAnonKey = resolveSupabaseKey();

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: brokeredPreviewStorage(),
    persistSession: true,
    autoRefreshToken: true,
  },
});
