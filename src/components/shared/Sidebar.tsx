"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLinks } from "@/src/constants-2";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const cleanPathname =
    pathname.startsWith("/en") ||
    pathname.startsWith("/es") ||
    pathname.startsWith("/br")
      ? pathname.slice(3)
      : pathname;

  const [navLinks, setNavLinks] = useState<
    { label: string; route: string; icon: string }[]
  >([]);

  const [otherLinks, setOtherLinks] = useState<
    { label: string; route: string; icon: string }[]
  >([]);

  // Superior part of the navbar
  useEffect(() => {
    async function fetchNavLinks() {
      const navLinks = await NavLinks();
      // Update the status with the links obtained
      setNavLinks(navLinks.slice(0, 6));
    }
    fetchNavLinks();
  }, []);

  // Inferior part of the navbar
  useEffect(() => {
    async function fetchOtherLinks() {
      const otherLinks = await NavLinks();
      // Update the status with the links obtained
      setOtherLinks(otherLinks.slice(6));
    }
    fetchOtherLinks();
  }, []);

  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className="sidebar-logo">
          <Image
            src="/assets/images/logo-text.svg"
            alt="logo"
            width={180}
            height={28}
          />
        </Link>
        <nav className="sidebar-nav">
          <SignedIn>
            <ul className="sidebar-nav_elements">
              {navLinks.map((link) => {
                const isActive = link.route === cleanPathname;
                return (
                  <li
                    key={link.route}
                    className={`sidebar-nav_element group ${
                      isActive
                        ? "bg-green-gradient text-white"
                        : "text-gray-700"
                    }`}
                  >
                    <Link className="sidebar-link" href={link.route}>
                      <Image
                        src={link.icon}
                        alt="logo"
                        width={24}
                        height={24}
                        className={`${isActive && "brightness-200"}`}
                      />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <ul className="sidebar-nav_elements">
              {otherLinks.map((link) => {
                const isActive = link.route === cleanPathname;
                return (
                  <li
                    key={link.route}
                    className={`sidebar-nav_element group ${
                      isActive
                        ? "bg-green-gradient text-white"
                        : "text-gray-700"
                    }`}
                  >
                    <Link className="sidebar-link" href={link.route}>
                      <Image
                        src={link.icon}
                        alt="logo"
                        width={24}
                        height={24}
                        className={`${isActive && "brightness-200"}`}
                      />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="flex-center cursor-pointer gap-2 p-4">
                <UserButton afterSignOutUrl="/en/sign-in" showName />
              </li>
            </ul>
          </SignedIn>

          <SignedOut>
            <Button asChild className="button bg-green-gradient bg-cover">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
