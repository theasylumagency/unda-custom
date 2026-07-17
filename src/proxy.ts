import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getBrowserLocale, getRequestCountry, isLocale, type Locale } from "@/lib/i18n";

const localeCookie = "unda_locale";

function persistedLocale(request: NextRequest): Locale | null {
  const value = request.cookies.get(localeCookie)?.value;
  return value && isLocale(value) ? value : null;
}

function resolveLocale(request: NextRequest): Locale {
  const persisted = persistedLocale(request);
  if (persisted) return persisted;
  if (getRequestCountry(request) === "GE") return "ka";
  return getBrowserLocale(request.headers.get("accept-language"));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/").filter(Boolean)[0];

  if (firstSegment && isLocale(firstSegment)) {
    const response = NextResponse.next();
    response.cookies.set(localeCookie, firstSegment, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
      secure: request.nextUrl.protocol === "https:",
    });
    return response;
  }

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${resolveLocale(request)}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
