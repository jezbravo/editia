import { authMiddleware } from "@clerk/nextjs";

import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["en", "es", "br"],

  defaultLocale: "en",
});

export default authMiddleware({
  beforeAuth: (req) => {
    // Execute next-intl middleware before Clerk's auth middleware
    return intlMiddleware(req);
  },

  // Ensure that locale specific sign-in pages are public
  publicRoutes: [
    "/:locale(sign-in)?",
    "/api/webhooks/clerk",
    "/api/webhooks/mp_validation",
    "/:locale(api/webhooks/mp_validation)?",
  ],
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/(es|en|br)/:path*",
  ],
};
