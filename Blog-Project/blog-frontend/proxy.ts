import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Next.js 16 renamed middleware.ts -> proxy.ts (same request-interception role).
export function proxy(request: NextRequest) {
  const token = request.cookies.get("token");
  const role = request.cookies.get("role")?.value;
  const { pathname } = request.nextUrl;

  if (!token) {
    const loginUrl = new URL("/auth/signIn", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (pathname.startsWith("/dashboard") && role !== "author") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/profile/:path*"],
};
