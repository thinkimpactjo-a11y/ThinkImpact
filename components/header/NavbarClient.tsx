"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { newCategory, newTraining } from "@/types";
import { Link } from "@/i18n/navigation";

type NavbarClientProps = {
  categories: newCategory[];
  trainingData: newTraining[];
  translations: Record<string, string>;
  locale: string;
};

export default function NavbarClient({
  categories,
  trainingData,
  translations,
  locale,
}: NavbarClientProps) {
  const { data: session } = useSession(); 
  const isLoggedIn = !!session;
  const isAdmin = session?.user?.role === "admin";
  const isArabic = locale === "ar";

  const menuItems = [
    { type: "link", href: `/`, label: translations.home, key: "home" },
    {
      type: "dropdown",
      label: translations.consulting,
      key: "consulting",
      content: categories.map((item) => (
        <NavigationMenuLink asChild key={item.slug}>
          <Link href={`/Consulting/${item.slug}`}>
            {isArabic ? item.category_name_ar : item.category_name_en}
          </Link>
        </NavigationMenuLink>
      )),
    },
    {
      type: "dropdown",
      label: translations.training,
      key: "training",
      content: trainingData.map((item) => (
        <NavigationMenuLink asChild key={item.slug}>
          <Link href={`/Training/${item.slug}`}>
            {isArabic ? item.name_ar : item.name_en}
          </Link>
        </NavigationMenuLink>
      )),
    },
    { type: "link", href: `/about`, label: translations.about, key: "about" },
    { type: "link", href: `/ourTeam`, label: translations.ourTeam, key: "ourTeam" },
    { type: "link", href: `/newApplication`, label: translations.newApplication, key: "newApplication" },
  ];

  // ACCOUNT ITEMS
  const accountContent = [];

  if (isAdmin) {
    accountContent.push(
      <NavigationMenuLink asChild key="dashboard">
        <Link href={`/admin/dashboard`}>{translations.dashboard}</Link>
      </NavigationMenuLink>
    );
  }

  accountContent.push(
    <NavigationMenuLink asChild key="changePassword">
      <Link href={`/${locale}/change-password`}>{translations.changePassword}</Link>
    </NavigationMenuLink>,
    <NavigationMenuLink asChild key="logout">
      <button
        onClick={() => signOut()}
        className={`w-full px-2 py-1 cursor-pointer ${isArabic ? "text-right" : "text-left"}`}
      >
        {translations.logout}
      </button>
    </NavigationMenuLink>
  );

  // Add My Account dynamically
  if (isLoggedIn) {
    menuItems.push({
      type: "dropdown",
      label: translations.myAccount,
      key: "myAccount",
      content: accountContent,
    });
  }

  const finalMenu = isArabic ? [...menuItems].reverse() : menuItems;

  return (
    <NavigationMenu
      viewport={false}
      className="text-[#00ADEE]"
      style={{ direction: isArabic ? "rtl" : "ltr" }}
    >
      <NavigationMenuList className="flex-row">
        {finalMenu.map((item) => {
          if (item.type === "link") {
            return (
              <NavigationMenuItem key={item.key}>
                <NavigationMenuLink asChild>
                  <Link className={navigationMenuTriggerStyle()} href={item.href??""}>
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          }

          if (item.type === "dropdown") {
            return (
              <NavigationMenuItem key={item.key}>
                <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                <NavigationMenuContent className={`grid gap-3 p-4 md:w-[400px] lg:w-[250px] ${isArabic ? "text-right" : "text-left"}`}>
                  {item.content}
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }

          return null;
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
