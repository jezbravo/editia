"use client";
import { useLocale } from "next-intl";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "@/src/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/src/lib/utils";

export const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const locale = useLocale();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        const newUrl = formUrlQuery({
          searchParams: searchParams.toString(),
          key: "query",
          value: query,
        });

        router.push(newUrl, { scroll: false });
      } else {
        const newUrl = removeKeysFromQuery({
          searchParams: searchParams.toString(),
          keysToRemove: ["query"],
        });

        router.push(newUrl, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [router, searchParams, query]);

  return (
    <>
      <div className="search">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
        />

        <Input
          className="search-field"
          placeholder={locale === "en" ? "Search" : "Buscar"}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </>
  );
};
