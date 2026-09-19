import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { publicSupabaseEnv } from "./env";

/**
 * Anon client bound to the request cookies. Reads respect RLS (published rows
 * only) and the session, if any, is the visitor's own. Use in server
 * components, route handlers and server actions.
 */
export async function createSupabaseServerClient() {
  const { url, anonKey } = publicSupabaseEnv();
  const cookieStore = await cookies();
  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Called from a Server Component: cookies are read-only there. The
          // middleware refreshes sessions, so this is safe to ignore.
        }
      },
    },
  });
}
