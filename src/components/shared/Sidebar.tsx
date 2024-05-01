"use client";
import { NextIntlClientProvider, useLocale, useTranslations } from "next-intl";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const Sidebar = () => {
  const pathname = usePathname();
  const cleanPathname =
    pathname.startsWith("/en") ||
    pathname.startsWith("/es") ||
    pathname.startsWith("/br")
      ? pathname.slice(3)
      : pathname;

  const t = useTranslations("navLinks");
  const locale = useLocale();

  return (
    <NextIntlClientProvider locale={locale}>
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
                {/* HOME */}
                <li
                  className={`sidebar-nav_element group ${
                    cleanPathname === "/home"
                      ? "bg-green-gradient text-white"
                      : "text-gray-700"
                  }`}
                >
                  <Link className="sidebar-link" href={"/home"}>
                    <Image
                      src={"/assets/icons/home.svg"}
                      alt="logo"
                      width={24}
                      height={24}
                      className={`${cleanPathname === "/home" && "brightness-200"}`}
                    />
                    {t("Home")}
                  </Link>
                </li>

                {/* IMAGE RESTORE */}
                <li
                  className={`sidebar-nav_element group ${
                    cleanPathname === "/transformations/add/restore"
                      ? "bg-green-gradient text-white"
                      : "text-gray-700"
                  }`}
                >
                  <Link
                    className="sidebar-link"
                    href={"/transformations/add/restore"}
                  >
                    <Image
                      src={"/assets/icons/image.svg"}
                      alt="logo"
                      width={24}
                      height={24}
                      className={`${cleanPathname === "/transformations/add/restore" && "brightness-200"}`}
                    />
                    {t("Image Restore")}
                  </Link>
                </li>

                {/* GENERATIVE FILL */}
                <li
                  className={`sidebar-nav_element group ${
                    cleanPathname === "/transformations/add/fill"
                      ? "bg-green-gradient text-white"
                      : "text-gray-700"
                  }`}
                >
                  <Link
                    className="sidebar-link"
                    href={"/transformations/add/fill"}
                  >
                    <Image
                      src={"/assets/icons/stars.svg"}
                      alt="logo"
                      width={24}
                      height={24}
                      className={`${cleanPathname === "/transformations/add/fill" && "brightness-200"}`}
                    />
                    {t("Generative Fill")}
                  </Link>
                </li>

                {/* OBJECT REMOVE */}
                <li
                  className={`sidebar-nav_element group ${
                    cleanPathname === "/transformations/add/remove"
                      ? "bg-green-gradient text-white"
                      : "text-gray-700"
                  }`}
                >
                  <Link
                    className="sidebar-link"
                    href={"/transformations/add/remove"}
                  >
                    <Image
                      src={"/assets/icons/scan.svg"}
                      alt="logo"
                      width={24}
                      height={24}
                      className={`${cleanPathname === "/transformations/add/remove" && "brightness-200"}`}
                    />
                    {t("Object Remove")}
                  </Link>
                </li>

                {/* OBJECT RECOLOR */}
                <li
                  className={`sidebar-nav_element group ${
                    cleanPathname === "/transformations/add/recolor"
                      ? "bg-green-gradient text-white"
                      : "text-gray-700"
                  }`}
                >
                  <Link
                    className="sidebar-link"
                    href={"/transformations/add/recolor"}
                  >
                    <Image
                      src={"/assets/icons/filter.svg"}
                      alt="logo"
                      width={24}
                      height={24}
                      className={`${cleanPathname === "/transformations/add/recolor" && "brightness-200"}`}
                    />
                    {t("Object Recolor")}
                  </Link>
                </li>

                {/* BACKGROUND REMOVE */}
                <li
                  className={`sidebar-nav_element group ${
                    cleanPathname === "/transformations/add/removeBackground"
                      ? "bg-green-gradient text-white"
                      : "text-gray-700"
                  }`}
                >
                  <Link
                    className="sidebar-link"
                    href={"/transformations/add/removeBackground"}
                  >
                    <Image
                      src={"/assets/icons/camera.svg"}
                      alt="logo"
                      width={24}
                      height={24}
                      className={`${cleanPathname === "/transformations/add/removeBackground" && "brightness-200"}`}
                    />
                    {t("Background Remove")}
                  </Link>
                </li>
              </ul>

              <ul className="sidebar-nav_elements">
                {/* PROFILE */}
                <li
                  className={`sidebar-nav_element group ${
                    cleanPathname === "/profile"
                      ? "bg-green-gradient text-white"
                      : "text-gray-700"
                  }`}
                >
                  <Link className="sidebar-link" href={"/profile"}>
                    <Image
                      src={"/assets/icons/profile.svg"}
                      alt="logo"
                      width={24}
                      height={24}
                      className={`${cleanPathname === "/profile" && "brightness-200"}`}
                    />
                    {t("Profile")}
                  </Link>
                </li>

                {/* BUY CREDITS */}
                <li
                  className={`sidebar-nav_element group ${
                    cleanPathname === "/credits"
                      ? "bg-green-gradient text-white"
                      : "text-gray-700"
                  }`}
                >
                  <Link className="sidebar-link" href={"/credits"}>
                    <Image
                      src={"/assets/icons/bag.svg"}
                      alt="logo"
                      width={24}
                      height={24}
                      className={`${cleanPathname === "/credits" && "brightness-200"}`}
                    />
                    {t("Buy Credits")}
                  </Link>
                </li>
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
    </NextIntlClientProvider>
  );
};

export default Sidebar;
