"use client";
import { NextIntlClientProvider, useLocale, useTranslations } from "next-intl";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog";

export const InsufficientCreditsModal = () => {
  const router = useRouter();

  const t = useTranslations("InsufficientCreditsModal");
  const locale = useLocale();

  // Redirection for the case when the user presses the "escape" key
  const handleKeyDown = (event: KeyboardEvent) => {
    // Check if the key pressed is "Escape"
    if (event.key === "Escape") {
      router.push("/profile");
    }
  };

  useEffect(() => {
    // Add the event listener when the component is mounted
    window.addEventListener("keydown", handleKeyDown);
    // Remove event listener when component is unmounted
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // The empty array as the second argument ensures that this effect is only executed once, when mounting the component.

  return (
    <NextIntlClientProvider locale={locale}>
      <AlertDialog defaultOpen>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex-between">
              <p className="p-16-semibold text-dark-400">
                {t("dialog-header")}
              </p>
              <AlertDialogCancel
                className="border-0 p-0 hover:bg-transparent"
                onClick={() => router.push("/profile")}
              >
                <Image
                  src="/assets/icons/close.svg"
                  alt="credit coins"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                />
              </AlertDialogCancel>
            </div>

            <Image
              src="/assets/images/stacked-coins.jpg"
              alt="credit coins"
              width={462}
              height={122}
            />

            <AlertDialogTitle className="p-24-bold text-dark-600">
              {t("dialog-title")}
            </AlertDialogTitle>

            <AlertDialogDescription className="p-16-regular py-3">
              {t("dialog-description")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="button w-full bg-purple-100 text-dark-400"
              onClick={() => router.push("/profile")}
            >
              {t("dialog-cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              className="button w-full bg-green-gradient  bg-cover"
              onClick={() => router.push("/credits")}
            >
              {t("dialog-action")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </NextIntlClientProvider>
  );
};
