"use client";

import { HiOutlineMenu } from "react-icons/hi";
import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
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

import ModeToggle from "./modetoggle";
import LanguageSwitcher from "./languageSwitcher";
import type { newCategory, newTraining } from "@/types";

type Props = {
  categories: newCategory[];
  trainingData: newTraining[];
  locale:string
};

export default function Menu({ categories, trainingData }: Props) {
  const t = useTranslations("Navbar");
  const locale = useLocale();
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
          <SheetHeader>
            <VisuallyHidden>
              <SheetTitle>{t("menu")}</SheetTitle>
            </VisuallyHidden>

            <div className="flex items-center mb-6 gap-3 w-full">
              {isArabic ? (
                <>
                  <ModeToggle />
                  <LanguageSwitcher />
                </>
              ) : (
                <>
                  <LanguageSwitcher />
                  <ModeToggle />
                </>
              )}
            </div>

            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => navigate("/")}
                className="text-lg font-semibold text-left"
              >
                {t("home")}
              </button>

              <div>
                <div className="font-semibold">{t("consulting")}</div>
                <div className="mt-2 flex flex-col space-y-2">
                  {categories.map((item) => (
                    <button
                      key={item.slug}
                      onClick={() => navigate(`/Consulting/${item.slug}`)}
                      className="pl-4 text-left"
                    >
                      {getCategoryName(item)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-semibold">{t("training")}</div>
                <div className="mt-2 flex flex-col space-y-2">
                  {trainingData.map((item) => (
                    <button
                      key={item.slug}
                      onClick={() => navigate(`/Training/${item.slug}`)}
                      className="pl-4 text-left"
                    >
                      {getTrainingName(item)}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => navigate("/about")}
                className="text-lg font-semibold text-left"
              >
                {t("about")}
              </button>

              <button
                onClick={() => navigate("/ourTeam")}
                className="text-lg font-semibold text-left"
              >
                {t("ourTeam")}
              </button>

              <button
                onClick={() => navigate("/newApplication")}
                className="text-lg font-semibold text-left"
              >
                {t("newApplication")}
              </button>

              {isLoggedIn && (
                <div>
                  <div className="font-semibold">{t("myAccount")}</div>
                  <div className="mt-2 flex flex-col space-y-2">
                    {isAdmin && (
                      <button
                        onClick={() => navigate("/admin/dashboard")}
                        className="pl-4 text-left"
                      >
                        {t("dashboard")}
                      </button>
                    )}
                    <button
                      onClick={() => navigate("/change-password")}
                      className="pl-4 text-left"
                    >
                      {t("changePassword")}
                    </button>
                    <button
                      onClick={() => {
                        signOut();
                        setOpen(false);
                      }}
                      className="pl-4 cursor-pointer text-left"
                    >
                      {t("logout")}
                    </button>
                  </div>
                </div>
              )}
            </nav>

            <SheetDescription className="mt-6">{t("menuDescription")}</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
