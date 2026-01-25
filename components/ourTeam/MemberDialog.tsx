"use client";

import React from "react";
import { newMember } from "@/types";
import Image from "next/image";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  member: newMember;
  locale: string;
};

export default function MemberDialog({ member, locale }: Props) {
  const isArabic = locale === "ar";

  const name = isArabic ? member.name_ar : member.name_en;
  const position = isArabic ? member.position_ar : member.position_en;
  const description = isArabic
    ? member.description_ar || ""
    : member.description_en || "";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`p-0 underline text-black dark:text-white underline-offset-2 cursor-pointer ${
            isArabic
              ? "font-semibold text-sm"
              : " font-semibold text-xs"
          }`}
        >
          {isArabic ? "اعرف المزيد" : "See More"}
        </Button>
      </DialogTrigger>

      <DialogContent
        className="max-w-[80%] max-h-[80vh] overflow-y-auto bg-white dark:bg-[#020618] rounded-lg shadow-lg 
             [&>button]:text-black dark:[&>button]:text-white"
      >
        <DialogHeader>
          <div
            className={`flex items-center ${
              isArabic ? "flex-row-reverse space-x-reverse space-x-4" : "space-x-4"
            }`}
          >
            <Image
              src={member.image}
              alt={name}
              width={400}
              height={400}
              className="w-20 h-20 rounded-full object-cover border-2 border-[#125892]"
            />

            <div
              dir={isArabic ? "rtl" : "ltr"}
              className={`flex flex-col ${isArabic ? "text-right" : "text-left"}`}
            >
              <DialogTitle className="text-lg font-bold text-[#125892]">
                {name}
              </DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-200">
                {position}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div
          dir={isArabic ? "rtl" : "ltr"}
          className={`mt-4 whitespace-pre-line ${
            isArabic ? "text-right" : "text-left"
          } text-gray-700 text-sm dark:text-gray-200`}
        >
          {description}
        </div>
      </DialogContent>
    </Dialog>
  );
}
