"use server";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { NavLinks } from "@/src/constants-2";
import { Button } from "../ui/button";

export default async function Sidebar() {
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
              {(await NavLinks()).slice(0, 6).map((link) => {
                // const isActive = cleanPathname === link.route;
                return (
                  <li
                    key={link.route}
                    className={`sidebar-nav_element group`}
                    // ${
                    //   isActive
                    //     ? "bg-green-gradient text-white"
                    //     : "text-gray-700"
                    // }`}
                  >
                    <Link
                      className="sidebar-link transition-transform duration-150 ease-in-out hover:scale-105"
                      href={link.route}
                    >
                      <Image
                        src={link.icon}
                        alt="logo"
                        width={24}
                        height={24}
                        // className={`${isActive && "brightness-200"}`}
                      />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <ul className="sidebar-nav_elements pb-4">
              {(await NavLinks()).slice(6, 8).map((link) => {
                // const isActive = cleanPathname === link.route;
                return (
                  <li
                    key={link.route}
                    className={`sidebar-nav_element group`}
                    // {
                    // ${
                    //   isActive
                    //     ? "bg-green-gradient text-white"
                    //     : "text-gray-700"
                    // }`}
                  >
                    <Link
                      className="sidebar-link transition-transform duration-150 ease-in-out hover:scale-105"
                      href={link.route}
                    >
                      <Image
                        src={link.icon}
                        alt="logo"
                        width={24}
                        height={24}
                        // className={`${isActive && "brightness-200"}`}
                      />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="flex-center cursor-pointer gap-2 p-4 pb-4">
                <UserButton afterSignOutUrl="/" showName />
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
}

// export default Sidebar;
