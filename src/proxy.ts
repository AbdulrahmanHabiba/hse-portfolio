import createIntlMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { SESSION_COOKIE, verifySession } from "./lib/session-core";

const handleI18n = createIntlMiddleware(routing);

/** /ar/dashboard/... or /en/dashboard/...  (but not the login page) */
const PROTECTED = /^\/(ar|en)\/dashboard(?!\/login)(\/.*)?$/;

/**
 * Next.js 16 renamed `middleware.ts` to `proxy.ts`.
 * 1) Optimistic auth redirect for the dashboard  2) locale negotiation/redirects.
 */
export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const match = PROTECTED.exec(pathname);

  if (match) {
    const session = await verifySession(request.cookies.get(SESSION_COOKIE)?.value);
    if (!session) {
      const url = request.nextUrl.clone();
      url.pathname = `/${match[1]}/dashboard/login`;
      return NextResponse.redirect(url);
    }
  }

  return handleI18n(request);
}

export const config = {
  // Everything except API routes, Next internals and files with an extension.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
