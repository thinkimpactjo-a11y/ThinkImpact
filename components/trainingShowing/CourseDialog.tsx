// app/components/CourseDialog.tsx
"use client";

import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { getCourses } from "@/types";
import { Mail, Phone } from "lucide-react";

type Props = {
  course: getCourses;
  locale: string;
};

export default function CourseDialog({ course, locale }: Props) {
  const isArabic = locale === "ar";
  const title = isArabic ? course.title_ar : course.title_en;
  const description = isArabic
    ? course.description_ar || ""
    : course.description_en || "";
  const duration = isArabic ? course.duration_ar : course.duration_en;
  const audience = isArabic
    ? course.target_audience_ar
    : course.target_audience_en;
  const delivery = isArabic
    ? course.delivery_method_ar
    : course.delivery_method_en;

  return (
    <div
      className={`   relative  ${locale === "ar" ? "text-right" : "text-left"}`}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <Dialog>
        <DialogTrigger asChild>
          <button
            className={`p-0 underline underline-offset-2 cursor-pointer ${
              isArabic
                ? "text-[#125892] font-semibold text-sm"
                : "text-[#125892] font-semibold text-sm"
            }`}
          >
            {isArabic ? "اعرف المزيد" : "See More"}
          </button>
        </DialogTrigger>

        <DialogContent
          className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg z-[9999] p-4 ${
            isArabic ? "text-right" : "text-left"
          }`}
          style={{
            width: "80vw",
            maxWidth: "80vw",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <DialogHeader>
            <div
              className={`flex items-center gap-2 ${
                isArabic ? "flex-row-reverse" : ""
              }`}
            >
              <div>
                <DialogTitle className="text-[#125892]  mt-6 font-bold text-justify text-base sm:text-lg md:text-2xl">
                  {title}
                </DialogTitle>
              </div>
            </div>
          </DialogHeader>

          <div className="text-gray-700  text-sm sm:text-base " dir={isArabic?"rtl":"ltr"}>
            {description}
            {audience?.length > 0 && (
              <p className="mt-3 text-sm sm:text-base">
                <span className="font-semibold">
                  {isArabic ? "الفئة المستهدفة: " : "Audience: "}
                </span>
                {audience.join(", ")}
              </p>
            )}
            {delivery?.length > 0 && (
              <p className="mt-2 text-sm sm:text-base">
                <span className="font-semibold">
                  {isArabic ? "طريقة التقديم: " : "Delivery: "}
                </span>
                {delivery.join(", ")}
              </p>
            )}
            {duration && (
              <p className="mt-2 text-sm sm:text-base">
                <span className="font-semibold">
                  {isArabic ? "المدة: " : "Duration: "}
                </span>
                {duration}
              </p>
            )}
          </div>
          {/* Contact us section */}
          <div
            className={`mt-4 border-t border-gray-200 pt-3  ${
              isArabic ? "text-right" : "text-left"
            }`}
          >
            <p className={` ${
              isArabic ? "text-right!" : "text-left!"
            }    font-semibold mb-2 text-[#125892]`}>
              {isArabic
                ? ":للمزيد من المعلومات، يرجى التواصل معنا"
                : "For more information, please contact us:"}
            </p>

            <div
              className={`flex items-center gap-2 ${
                isArabic ? "flex-row-reverse text-right" : "flex-row text-left"
              }`}
            >
              <Phone className="w-4 h-4 text-gray-600" />
              <a
                dir="ltr"
                href={`tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE}`}
                className="hover:text-gray-600 transition-colors"
              >
                {process.env.NEXT_PUBLIC_CONTACT_PHONE}
              </a>
            </div>

            <div
              className={`flex items-center gap-2 mt-1 hover:text-gray-600 ${
                isArabic ? "flex-row-reverse text-right" : "flex-row text-left"
              }`}
            >
              <Mail className="w-4 h-4 text-gray-600" />
              <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}>
                {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
