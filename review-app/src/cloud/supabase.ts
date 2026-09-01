import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const url = import.meta.env.VITE_SUPABASE_URL?.trim();
const key = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY)?.trim();

export const cloudConfigured = Boolean(url && key);
export const supabase = cloudConfigured ? createClient<Database>(url!, key!, {
  // This is a browser-only SPA. The implicit callback carries the session in
  // the URL fragment, so opening a magic link from an email app does not depend
  // on a PKCE verifier stored in the tab that requested the email.
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, flowType: "implicit" },
}) : null;
