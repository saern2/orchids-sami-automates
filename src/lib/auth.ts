import "server-only";

import type { User } from "@supabase/supabase-js";
import { isAllowedAdminEmail } from "@/lib/admin-email";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Returns the signed-in user only if the session is valid (verified against
 * Supabase Auth, not just the cookie) AND the email is the allowed admin.
 */
export async function getAdminUser(): Promise<User | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !isAllowedAdminEmail(user.email)) return null;
  return user;
}

export class NotAuthorizedError extends Error {
  constructor() {
    super("Not authorized");
    this.name = "NotAuthorizedError";
  }
}

/** For server actions and route handlers: throws when the caller is not the admin. */
export async function requireAdminUser(): Promise<User> {
  const user = await getAdminUser();
  if (!user) throw new NotAuthorizedError();
  return user;
}
