import { getTranslations } from "next-intl/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/models/db/authOptions";
import NavbarClient from "./NavbarClient";
import { newCategory, newTraining } from "@/types";

type Props = {
  categories: newCategory[];
  trainingData: newTraining[];
  locale: string;
};

export default async function Navbar({ categories, trainingData, locale }: Props) {
  const session = await getServerSession(authOptions);
  const t = await getTranslations("Navbar");

  const isLoggedIn = !!session?.user;
  const isAdmin = session?.user?.role === "admin";

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
