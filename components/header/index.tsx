import React from "react";
import Logo from '@/components/Logo/Logo';
import ModeToggle from "./modetoggle";
import Menu from "./menu";
import LanguageSwitcher from "./languageSwitcher";
import Navbar from "./navbar";

import { getAllcategories } from "@/app/models/db/lib/services/consulting";
import { getAllTraining } from "@/app/models/db/lib/services/training";

export default async function Header() {
  const categories = await getAllcategories();
  const trainingData = await getAllTraining();

  return (
    <header className="  w-full h-20 flex items-center justify-between px-4 border-b ">
      <Logo />
      <div className="hidden md:block">

        <Navbar categories={categories} trainingData={trainingData} />
      </div>
      <div className="hidden md:flex">
        <ModeToggle />
        <LanguageSwitcher />
      </div>
      <Menu  categories={categories} trainingData={trainingData} />
    </header>
  );
}
