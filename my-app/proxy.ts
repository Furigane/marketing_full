import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";

import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

function resolveLocale(pathname: string) {
  const [, maybeLocale] = pathname.split("/");
  return routing.locales.includes(maybeLocale as (typeof routing.locales)[number])
    ? maybeLocale
    : routing.defaultLocale;
}

export default function proxy(request: NextRequest) {
  const response = intlMiddleware(request);
  response.headers.set("x-current-locale", resolveLocale(request.nextUrl.pathname));
  return response;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
