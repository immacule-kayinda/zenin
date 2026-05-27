import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { ADMIN_COOKIE } from "@/lib/admin/constants";
import { getAdminSessionToken } from "@/lib/admin/token";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const expected = await getAdminSessionToken();
  const session = request.cookies.get(ADMIN_COOKIE)?.value;

  if (!expected || session !== expected) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set(
      "from",
      pathname + request.nextUrl.search,
    );
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/((?!login).*)"],
};
