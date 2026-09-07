import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login", "/auth/callback"];

/**
 * Refreshes the Supabase session on every request and redirects
 * unauthenticated users away from protected /dashboard/* routes.
 * A request without Supabase configuration fails closed instead of exposing
 * the admin dashboard. Fixtures are not an authentication mode.
 */
export async function middleware(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const response = NextResponse.next({ request });
  const isPublic = PUBLIC_PATHS.some((p) => request.nextUrl.pathname.startsWith(p));

  if (!url || !key) {
    if (isPublic) return response;

    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("reason", "configuration");
    return NextResponse.redirect(redirectUrl);
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet) => {
        for (const { name, value } of cookiesToSet) {
          response.cookies.set(name, value);
        }
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isPublic && request.nextUrl.pathname.startsWith("/dashboard")) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp)$).*)",
  ],
};
