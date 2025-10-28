"use client";

import { HiOutlineMenu } from "react-icons/hi";
import React, { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useSession, signOut } from "next-auth/react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import ModeToggle from "./modetoggle";
import LanguageSwitcher from "@/components/header/languageSwitcher";
import type { newCategory, newTraining } from "@/types";

type Props = {
  categories: newCategory[];
  trainingData: newTraining[];
};

export default function Menu({ categories, trainingData }: Props) {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const session = useSession();
  const isLoggedIn = !!session.data?.user;
  const isAdmin = session.data?.user?.role === "admin";

  const [open, setOpen] = useState(false);

  const getCategoryName = (item: newCategory) =>
    isArabic ? item.category_name_ar ?? item.category_name_en : item.category_name_en;

  const getTrainingName = (item: newTraining) =>
    isArabic ? item.name_ar ?? item.name_en : item.name_en;

  const handleLinkClick = () => setOpen(false);

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
                  <ModeToggle  />
                  <LanguageSwitcher />
                </>
              ) : (
                <>
                  <LanguageSwitcher />
                  <ModeToggle  />
                </>
              )}
            </div>

            <nav className="flex flex-col space-y-4">
              <Link href="/" onClick={handleLinkClick} className="text-lg font-semibold">
                {t("home")}
              </Link>

              <div>
                <div className="font-semibold">{t("consulting")}</div>
                <div className="mt-2 flex flex-col space-y-2">
                  {categories.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/Consulting/${item.slug}`}
                      onClick={handleLinkClick}
                      className="pl-4"
                    >
                      {getCategoryName(item)}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-semibold">{t("training")}</div>
                <div className="mt-2 flex flex-col space-y-2">
                  {trainingData.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/Training/${item.slug}`}
                      onClick={handleLinkClick}
                      className="pl-4"
                    >
                      {getTrainingName(item)}
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/about" onClick={handleLinkClick} className="text-lg font-semibold">
                {t("about")}
              </Link>
              <Link
                href="/ourTeam"
                onClick={handleLinkClick}
                className="text-lg font-semibold"
              >
                {t("ourTeam")}
              </Link>
              <Link
                href="/newApplication"
                onClick={handleLinkClick}
                className="text-lg font-semibold"
              >
                {t("newApplication")}
              </Link>

              {isLoggedIn && (
                <div>
                  <div className="font-semibold">{t("myAccount")}</div>
                  <div className="mt-2 flex flex-col space-y-2">
                    {isAdmin && (
                      <Link
                        href="/admin/dashboard"
                        onClick={handleLinkClick}
                        className="pl-4"
                      >
                        {t("dashboard")}
                      </Link>
                    )}
                    <Link
                      href="/change-password"
                      onClick={handleLinkClick}
                      className="pl-4"
                    >
                      {t("changePassword")}
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setOpen(false);
                      }}
                      className={`pl-4 cursor-pointer ${
                        isArabic ? "text-right" : "text-left"
                      }`}
                      type="button"
                    >
                      {t("logout")}
                    </button>
                  </div>
                </div>
              )}
            </nav>

            <SheetDescription className="mt-6">
              {t("menuDescription")}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
