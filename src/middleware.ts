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
    "/en/sign-in",
    "/es/sign-in",
    "/br/sign-in",
    "/en/sign-up",
    "/es/sign-up",
    "/br/sign-up",
    "/en/api/webhooks/clerk",
    "/es/api/webhooks/clerk",
    "/br/api/webhooks/clerk",
    "/en/api/webhooks/mp_validation",
    "/es/api/webhooks/mp_validation",
    "/br/api/webhooks/mp_validation",
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
