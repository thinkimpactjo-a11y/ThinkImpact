"use client";

import { HiOutlineMenu } from "react-icons/hi";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useSession, signOut } from "next-auth/react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useRouter } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import ModeToggle from "@/components/header/modetoggle";
import FontSwitcher from "@/components/fontswitcher/FontSwitcher";
import LanguageSwitcher from "@/components/header/languageSwitcher"; 
import type { newCategory, newTraining } from "@/types";

type Props = {
  categories: newCategory[];
  trainingData: newTraining[];
  locale: string;
};

export default function Menu({ categories, trainingData, locale }: Props) {
  const t = useTranslations("Navbar");
  const isArabic = locale === "ar";

  const session = useSession();
  const isLoggedIn = !!session.data?.user;
  const isAdmin = session.data?.user?.role === "admin";

  const [open, setOpen] = useState(false);
  const router = useRouter();

  const getCategoryName = (item: newCategory) =>
    isArabic ? item.category_name_ar ?? item.category_name_en : item.category_name_en;

  const getTrainingName = (item: newTraining) =>
    isArabic ? item.name_ar ?? item.name_en : item.name_en;

  const navigate = (href: string) => {
    setOpen(false);
    const localizedHref = isArabic ? `/ar${href}` : href;
    router.push(localizedHref);
  };

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="p-2">
          <HiOutlineMenu className="w-6 h-6 text-gray-800 dark:text-white" />
        </SheetTrigger>

        <SheetContent
          className="p-4 overflow-y-auto"
          style={{ direction: isArabic ? "rtl" : "ltr" }}
        >
          <FontSwitcher locale={locale}>
            <SheetHeader>
              <VisuallyHidden>
                <SheetTitle>{t("menu")}</SheetTitle>
              </VisuallyHidden>

              {/* رأس المنيو: الوضع الليلي + اختيار اللغة */}
              <div className="flex items-center mb-6 gap-3 w-full justify-between">
                <ModeToggle />
                <LanguageSwitcher />
              </div>

              {/* القوائم */}
              <nav className="flex flex-col space-y-4">

                {/* الصفحة الرئيسية */}
                <button
                  onClick={() => navigate("/")}
                  className={`text-lg font-semibold ${isArabic ? "text-right" : "text-left"}`}
                >
                  {t("home")}
                </button>

                {/* قائمة الاستشارات */}
                <div>
                  <div className={`font-semibold ${isArabic ? "text-right" : "text-left"}`}>
                    {t("consulting")}
                  </div>
                  <div className="mt-2 flex flex-col space-y-2">
                    {categories.map((item) => (
                      <button
                        key={item.slug}
                        onClick={() => navigate(`/Consulting/${item.slug}`)}
                        className={`text-sm text-gray-600 hover:text-gray-800 transition ${isArabic ? "pr-6 text-right" : "pl-6 text-left"}`}
                      >
                        {getCategoryName(item)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* قائمة التدريب */}
                <div>
                  <div className={`font-semibold ${isArabic ? "text-right" : "text-left"}`}>
                    {t("training")}
                  </div>
                  <div className="mt-2 flex flex-col space-y-2">
                    {trainingData.map((item) => (
                      <button
                        key={item.slug}
                        onClick={() => navigate(`/Training/${item.slug}`)}
                        className={`text-sm text-gray-600 hover:text-gray-800 transition ${isArabic ? "pr-6 text-right" : "pl-6 text-left"}`}
                      >
                        {getTrainingName(item)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* صفحات إضافية */}
                <button
                  onClick={() => navigate("/about")}
                  className={`text-lg font-semibold ${isArabic ? "text-right" : "text-left"}`}
                >
                  {t("about")}
                </button>

                <button
                  onClick={() => navigate("/ourTeam")}
                  className={`text-lg font-semibold ${isArabic ? "text-right" : "text-left"}`}
                >
                  {t("ourTeam")}
                </button>

                <button
                  onClick={() => navigate("/newApplication")}
                  className={`text-lg font-semibold ${isArabic ? "text-right" : "text-left"}`}
                >
                  {t("newApplication")}
                </button>

                {/* حساب المستخدم */}
                {isLoggedIn && (
                  <div>
                    <div className={`font-semibold ${isArabic ? "text-right" : "text-left"}`}>
                      {t("myAccount")}
                    </div>
                    <div className="mt-2 flex flex-col space-y-2">
                      {isAdmin && (
                        <button
                          onClick={() => navigate("/admin/dashboard")}
                          className={`text-sm text-gray-600 hover:text-gray-800 transition ${isArabic ? "pr-6 text-right" : "pl-6 text-left"}`}
                        >
                          {t("dashboard")}
                        </button>
                      )}
                      <button
                        onClick={() => navigate("/change-password")}
                        className={`text-sm text-gray-600 hover:text-gray-800 transition ${isArabic ? "pr-6 text-right" : "pl-6 text-left"}`}
                      >
                        {t("changePassword")}
                      </button>
                      <button
                        onClick={() => { signOut(); setOpen(false); }}
                        className={`text-sm text-gray-600 hover:text-gray-800 transition cursor-pointer ${isArabic ? "pr-6 text-right" : "pl-6 text-left"}`}
                      >
                        {t("logout")}
                      </button>
                    </div>
                  </div>
                )}
              </nav>

              <SheetDescription className="mt-6">{t("menuDescription")}</SheetDescription>
            </SheetHeader>
          </FontSwitcher>
        </SheetContent>
      </Sheet>
    </div>
  );
}
