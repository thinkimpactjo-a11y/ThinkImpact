import { getTranslations, getLocale } from "next-intl/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/models/db/authOptions";
import NavbarClient from "./NavbarClient";
import { getAllcategories } from "@/app/models/db/lib/services/consulting";
import { getAllTraining } from "@/app/models/db/lib/services/training";

export default async function Navbar() {
  const [categories, trainingData] = await Promise.all([
    getAllcategories(),
    getAllTraining(),
  ]);

  const session = await getServerSession(authOptions);
  const t = await getTranslations("Navbar");
  const locale = await getLocale();

  const isLoggedIn = !!session?.user;
  const isAdmin = session?.user?.role === "admin";

  // ⚠️ هنا نحضر كل الترجمات ونحولها لنصوص جاهزة
  const translations = {
    home: t("home"),
    consulting: t("consulting"),
    training: t("training"),
    about: t("about"),
    ourTeam: t("ourTeam"),
    newApplication: t("newApplication"),
    dashboard: t("dashboard"),
    changePassword: t("changePassword"),
    logout: t("logout"),
    myAccount: t("myAccount"),
  };

  return (
    <NavbarClient
      categories={categories}
      trainingData={trainingData}
      isLoggedIn={isLoggedIn}
      isAdmin={isAdmin}
      translations={translations}
      locale={locale}
    />
  );
}
