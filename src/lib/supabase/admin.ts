import "server-only";

import { createClient } from "@supabase/supabase-js";
import { publicSupabaseEnv } from "./env";

/**
 * Service-role client. Bypasses RLS, so it must only be used from server code
 * that has already verified the caller (see src/lib/auth.ts). Never import
 * from a client component: the "server-only" import makes that a build error.
 */
export function createSupabaseAdminClient() {
  const { url } = publicSupabaseEnv();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    throw new Error("Missing required environment variable: SUPABASE_SERVICE_ROLE_KEY");
  }
  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}
