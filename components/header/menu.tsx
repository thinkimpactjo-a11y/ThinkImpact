"use client";
import { HiOutlineMenu } from "react-icons/hi";

import React from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useSession, signOut } from "next-auth/react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ModeToggle from "./modetoggle";
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

  const getCategoryName = (item: newCategory) =>
    isArabic ? item.category_name_ar ?? item.category_name_en : item.category_name_en;

  const getTrainingName = (item: newTraining) =>
    isArabic ? item.name_ar ?? item.name_en : item.name_en;

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger className="p-2">
          <HiOutlineMenu className="w-6 h-6 text-gray-800 dark:text-white" />
        </SheetTrigger>

        <SheetContent className="p-4 overflow-y-auto" style={{ direction: isArabic ? "rtl" : "ltr" }}>
          <SheetHeader>
ئ
            <SheetTitle>{t("menu")}</SheetTitle>

            <div className="my-4">
              <ModeToggle />
            </div>

            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-lg font-semibold">{t("home")}</Link>

              <div>
                <div className="font-semibold">{t("consulting")}</div>
                <div className="mt-2 flex flex-col space-y-2">
                  {categories.map((item) => (
                    <Link key={item.slug} href={`/Consulting/${item.slug}`} className="pl-4">
                      {getCategoryName(item)}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-semibold">{t("training")}</div>
                <div className="mt-2 flex flex-col space-y-2">
                  {trainingData.map((item) => (
                    <Link key={item.slug} href={`/Training/${item.slug}`} className="pl-4">
                      {getTrainingName(item)}
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/about" className="text-lg font-semibold">{t("about")}</Link>
              <Link href="/ourTeam" className="text-lg font-semibold">{t("ourTeam")}</Link>
              <Link href="/newApplication" className="text-lg font-semibold">{t("newApplication")}</Link>

              {isLoggedIn && (
                <div>
                  <div className="font-semibold">{t("myAccount")}</div>
                  <div className="mt-2 flex flex-col space-y-2">
                    {isAdmin && (
                      <Link href="/admin/dashboard" className="pl-4">{t("dashboard")}</Link>
                    )}
                    <Link href="/change-password" className="pl-4">{t("changePassword")}</Link>
                    <button
                      onClick={() => signOut()}
                      className={`pl-4 text-left cursor-pointer ${isArabic ? "text-right" : "text-left"}`}
                      type="button"
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
