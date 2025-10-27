"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "ar" : "en";


    const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, "");

 
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <button
      onClick={toggleLocale}
      className="px-3 py-1 rounded-lg border text-black dark:text-white  hover:bg-gray-100 dark:hover:bg-[#125892] cursor-pointer"
    >
      {locale === "en" ? "العربية" : "English"}
    </button>
  );
}
