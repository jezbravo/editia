"use client";

import { usePathname } from "next/navigation";

export function RouteChecker(): string {
  const pathname = usePathname();
  const cleanPathname =
    pathname.startsWith("/en") ||
    pathname.startsWith("/es") ||
    pathname.startsWith("/br")
      ? pathname.slice(3)
      : pathname;
  return cleanPathname;
}
