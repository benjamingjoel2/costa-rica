import { NextResponse, type NextRequest } from "next/server";

// English is served at the unprefixed URLs (/journeys) from the [locale] = "en" pages;
// French, German and Spanish live under /fr, /de and /es. No automatic redirects by
// browser language: visitors choose with the header's language selector.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (/^\/(fr|de|es)(\/|$)/.test(pathname)) return NextResponse.next();
  const url = request.nextUrl.clone();
  if (/^\/en(\/|$)/.test(pathname)) {
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip API routes, Next internals and files (images, icon, robots.txt, sitemap.xml).
  matcher: ["/((?!api|_next|images|.*\\.).*)"],
};
