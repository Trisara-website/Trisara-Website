import { NextResponse } from "next/server";

// The API handlers perform the authoritative signed-session check. Middleware
// only provides a fast route gate so /admin is not publicly indexed/rendered.
export function middleware(request) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login" || pathname === "/api/admin/login") return NextResponse.next();
  const hasSessionCookie = Boolean(request.cookies.get("trisara_admin_session")?.value);
  if (hasSessionCookie) return NextResponse.next();

  if (pathname.startsWith("/api/admin/")) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const url = request.nextUrl.clone();
  url.pathname = "/admin/login";
  return NextResponse.redirect(url);
}

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };
