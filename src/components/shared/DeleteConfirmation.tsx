"use client";
import { NextIntlClientProvider, useLocale, useTranslations } from "next-intl";

import { useTransition } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog";
import { deleteImage } from "@/src/lib/actions/image.actions";

import { Button } from "../ui/button";

export const DeleteConfirmation = ({ imageId }: { imageId: string }) => {
  const [isPending, startTransition] = useTransition();

  const t = useTranslations("DeleteConfirmation");
  const locale = useLocale();

  return (
    <NextIntlClientProvider locale={locale}>
      <AlertDialog>
        <AlertDialogTrigger asChild className="w-full rounded-full">
          <Button
            type="button"
            className="button h-[44px] w-full md:h-[54px]"
            variant="destructive"
          >
            {t("delete")}
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent className="flex flex-col gap-10">
          <AlertDialogHeader>
            <AlertDialogTitle>{t("sure")}</AlertDialogTitle>
            <AlertDialogDescription className="p-16-regular">
              {t("advice")}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction
              className="border bg-red-500 text-white hover:bg-red-600"
              onClick={() =>
                startTransition(async () => {
                  await deleteImage(imageId);
                })
              }
            >
              {isPending ? t("deleting") : t("delete-2")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </NextIntlClientProvider>
  );
};
