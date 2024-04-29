"use client";

import { usePathname } from "next/navigation";

function RouteChecker() {
  const pathname = usePathname();
  const cleanPathname =
    pathname.startsWith("/en") ||
    pathname.startsWith("/es") ||
    pathname.startsWith("/br")
      ? pathname.slice(3)
      : pathname;
  return cleanPathname;
}

export default RouteChecker;
