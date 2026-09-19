/**
 * The single email allowed into /admin. Compared case-insensitively.
 * Shared by the middleware and by every server action (which re-checks it).
 */
export function isAllowedAdminEmail(email: string | null | undefined): boolean {
  const allowed = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!allowed || !email) return false;
  return email.trim().toLowerCase() === allowed;
}
