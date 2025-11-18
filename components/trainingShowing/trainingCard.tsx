"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CardsWrapper from "@/components/wrappers/card-wrapper";
import { getCourses } from "@/types";
import { useLocale } from "next-intl";
import Image from "next/image";
import CourseDialog from "@/components/trainingShowing/CourseDialog";
interface TrainingCardProps {
  courses: getCourses[];
}

function TrainingCard({ courses }: TrainingCardProps) {
  const locale = useLocale();
  return (
    <div>
      <CardsWrapper>
        {courses.map((course) => {
          const title = locale === "ar" ? course.title_ar : course.title_en;
          const description =
            locale === "ar" ? course.description_ar : course.description_en;
          const duration =
            locale === "ar" ? course.duration_ar : course.duration_en;
          const audience =
            locale === "ar"
              ? course.target_audience_ar
              : course.target_audience_en;
          const delivery =
            locale === "ar"
              ? course.delivery_method_ar
              : course.delivery_method_en;
          const image = course.image || "/default-course.jpg";

          return (
            <Card
              key={course.id}
              className={`shadow-xl bg-white border border-gray-200 dark:border-black dark:bg-[#125892] rounded-xl hover:shadow-2xl transition-shadow min-h-[440px] flex flex-col relative overflow-hidden group ${
                locale === "ar" ? "text-right" : "text-left"
              }`}
              dir={locale === "ar" ? "rtl" : "ltr"}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#125892]/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 z-0" />
              <div className="w-full h-48 relative bottom-6">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover h-full w-full"
                />
              </div>

              <div className="flex flex-col justify-between flex-1 p-6">
                <CardHeader className="p-0">
                  <CardTitle className="text-xl font-bold text-[#125892] -mt-10 dark:text-white dark:font-semibold">
                    {title}
                  </CardTitle>
                  <CardContent className="text-gray-600 line-clamp-3 text-justify p-0 text-sm dark:text-gray-100">
                    {description.slice(0, 150) + "..."}
                  </CardContent>
                  <CourseDialog course={course} locale={locale} />
                </CardHeader>

                <CardContent className="p-0 mt-4 space-y-2 text-sm text-gray-700">
                  {audience?.length > 0 && (
                    <p className="dark:text-gray-200">
                      <span className="font-semibold text-gray-800 dark:text-white">
                        {locale === "ar" ? "الفئة المستهدفة" : "Audience"}:
                      </span>{" "}
                      {audience.join(", ")}
                    </p>
                  )}
                  {delivery?.length > 0 && (
                    <p className="dark:text-gray-200">
                      <span className="font-semibold text-gray-800 dark:text-white">
                        {locale === "ar" ? "طريقة التقديم" : "Delivery"}:
                      </span>{" "}
                      {delivery.join(", ")}
                    </p>
                  )}
                  {duration && (
                    <p className="dark:text-gray-200">
                      <span className="font-semibold text-gray-800 dark:text-white">
                        {locale === "ar" ? "المدة" : "Duration"}:
                      </span>{" "}
                      {duration}
                    </p>
                  )}
                </CardContent>
              </div>
            </Card>
          );
        })}
      </CardsWrapper>
    </div>
  );
}

export default TrainingCard;
