import React from "react";
import Logo from '@/components/Logo/Logo';
import ModeToggle from "./modetoggle";
import Menu from "./menu";
import LanguageSwitcher from "./languageSwitcher";
import Navbar from "./navbar";

import { getAllcategories } from "@/app/models/db/lib/services/consulting";
import { getAllTraining } from "@/app/models/db/lib/services/training";
import { newCategory, newTraining } from "@/types";

type Props = {
  locale: string;
};

export default async function Header({ locale }: Props) {
  const categories: newCategory[] = await getAllcategories();
  const trainingData: newTraining[] = await getAllTraining();

  return (
    <header className="w-full h-20 flex items-center justify-between px-4 border-b">
      <Logo />
      <div className="hidden md:block">
        <Navbar categories={categories} trainingData={trainingData} locale={locale} />
      </div>
      <div className="hidden md:flex">
        <ModeToggle />
        <LanguageSwitcher />
      </div>
      <Menu categories={categories} trainingData={trainingData} locale={locale} />
    </header>
  );
}
