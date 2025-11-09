import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const handleI18nRouting = createMiddleware(routing);

const protectedRoutes = ["/admin/dashboard", "/change-password"];
const adminRoutes = ["/admin/dashboard"];
const authRoutes = ["/login", "/register", "/forgot-password"];

export async function middleware(req: NextRequest) {
  // ✅ أولاً: خلي الـ i18n يحدد اللغة
  const i18nResponse = handleI18nRouting(req);

  // نستخدم nextUrl من الـ request مباشرة
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { nextUrl } = req;
  const pathWithoutLocale = nextUrl.pathname.replace(/^\/(en|ar)/, "");

  const isLoggedIn = !!token;
  const role = token?.role;

  const isOnProtectedRoute = protectedRoutes.some(route =>
    pathWithoutLocale.startsWith(route)
  );
  const isAdminRoutes = adminRoutes.some(route =>
    pathWithoutLocale.startsWith(route)
  );
  const isOnAuthRoute = authRoutes.some(route =>
    pathWithoutLocale.startsWith(route)
  );

  let response = i18nResponse ?? NextResponse.next();

  if (isOnProtectedRoute && !isLoggedIn) {
    let callbackURL = nextUrl.pathname;
    if (nextUrl.search) callbackURL += nextUrl.search;
    const encodedCallbackURL = encodeURIComponent(callbackURL);

    response = NextResponse.redirect(
      new URL(`/?callbackURL=${encodedCallbackURL}`, req.url)
    );
  } else if (isOnAuthRoute && isLoggedIn) {
    response = NextResponse.redirect(new URL("/", req.url));
  } else if (isAdminRoutes && isLoggedIn && role !== "admin") {
    response = NextResponse.redirect(new URL("/", req.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|trpc|.*\\..*).*)",
  ],
};
