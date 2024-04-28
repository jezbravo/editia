"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const cleanPathname =
    pathname.startsWith("/en") ||
    pathname.startsWith("/es") ||
    pathname.startsWith("/br")
      ? pathname.slice(3)
      : pathname;
  const localActive = useLocale();

  const onSelectChange = (nextLocale: string) => {
    startTransition(() => {
      router.replace(`/${nextLocale}/${cleanPathname}`);
    });
  };

  return (
    <div className="mb-2 mr-6 flex justify-end">
      <Select
        onValueChange={onSelectChange}
        defaultValue={localActive}
        disabled={isPending}
      >
        <SelectTrigger className="w-16 md:w-[auto]">
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
              <span>en</span>
            </div>
          </SelectItem>
          <SelectItem value="es">
            <div className="flex items-center hover:cursor-pointer">
              <Image
                src="/assets/icons/es.svg"
                alt="ES flag"
                className="mr-2 h-auto w-7"
                width={5}
                height={5}
              />
              <span>es</span>
            </div>
          </SelectItem>
          <SelectItem value="br">
            <div className="flex items-center hover:cursor-pointer">
              <Image
                src="/assets/icons/br.svg"
                alt="BR flag"
                className="mr-2 h-auto w-7"
                width={5}
                height={5}
              />
              <span>pt-BR</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
