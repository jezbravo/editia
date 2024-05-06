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
    "/en/profile",
    "/es/profile",
    "/br/profile",
    "https://editia.vercel.app/en/api/webhooks/clerk",
    "https://editia.vercel.app/es/api/webhooks/clerk",
    "https://editia.vercel.app/br/api/webhooks/clerk",
    "https://editia.vercel.app/en/api/webhooks/mp_validation",
    "https://editia.vercel.app/es/api/webhooks/mp_validation",
    "https://editia.vercel.app/br/api/webhooks/mp_validation",
    "https://editia.vercel.app/en/profile",
    "https://editia.vercel.app/es/profile",
    "https://editia.vercel.app/br/profile",
    "https://editia.vercel.app/en/credits",
    "https://editia.vercel.app/es/credits",
    "https://editia.vercel.app/br/credits",
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
