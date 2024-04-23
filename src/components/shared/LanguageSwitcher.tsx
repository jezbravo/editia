"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import Image from "next/image";

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();

  const onSelectChange = (nextLocale: string) => {
    startTransition(() => {
      router.replace(`/${nextLocale}`);
      // router.refresh();
    });
  };

  return (
    <div className="mr-6 flex justify-end">
      <Select
        onValueChange={onSelectChange}
        defaultValue={localActive}
        disabled={isPending}
      >
        <SelectTrigger className="w-[auto]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">
            <div className="flex items-center hover:cursor-pointer">
              <Image
                src="/assets/icons/gb.svg"
                alt="UK flag"
                className="mr-2 h-auto w-7"
                width={5}
                height={5}
              />
              <span>English</span>
            </div>
          </SelectItem>
          <SelectItem value="es">
            <div className="flex items-center hover:cursor-pointer">
              <Image
                src="/assets/icons/es.svg"
                alt="UK flag"
                className="mr-2 h-auto w-7"
                width={5}
                height={5}
              />
              <span>Español</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
