import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isAllowedAdminEmail } from "@/lib/admin-email";

/**
 * Guards /admin/*. Refreshes the Supabase session cookie on every matched
 * request (per @supabase/ssr) and redirects anyone who is not signed in as
 * ADMIN_EMAIL to /admin/login. Server actions re-check the allowlist; this
 * is the first gate, not the only one.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          response = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  // getUser() validates the token with Supabase Auth and refreshes it if needed.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAdmin = !!user && isAllowedAdminEmail(user.email);
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    if (isAdmin) {
      return NextResponse.redirect(new URL("/admin/projects", request.url));
    }
    return response;
  }

  if (!isAdmin) {
    const loginUrl = new URL("/admin/login", request.url);
    if (user) loginUrl.searchParams.set("error", "not_allowed");
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
  // Node.js middleware is stable since Next 15.5; keeps everything off the edge runtime.
  runtime: "nodejs",
};
