"use client";

import { newCareer } from "@/types";
import React, { useState, useTransition } from "react";
import FileUploader from "@/components/fileUploadForApplication";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { z } from "zod";
import { getNewCareerSchema } from "@/types/zod/newCareerSchema";

interface prop {
  action: (data: newCareer) => Promise<void>;
  locale: string;
}

function NewApplicationForm({ action, locale }: prop) {
  const isArabic = locale === "ar";
  const schema = getNewCareerSchema(isArabic);

  const [form, setForm] = useState<newCareer>({
    first_name: "",
    last_name: "",
    email: "",
    city: "",
    phone_number: "",
    cv: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
const isDark = document.documentElement.classList.contains("dark");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleFormSubmit = () => {
    const validation = schema.safeParse(form);

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    startTransition(async () => {
      try {
        await action({ ...form });
        setToast({
          message: isArabic
            ? "تم إرسال الطلب بنجاح!"
            : "Application Submitted Successfully!",
          type: "success",
        });

        setTimeout(() => {
          setToast(null);
          router.replace("/");
        }, 1000);
      } catch (error) {
        console.error(error);
        setToast({
          message: isArabic
            ? "فشل في إرسال الطلب."
            : "Failed to Submit The Application.",
          type: "error",
        });
        setTimeout(() => setToast(null), 3000);
      }
    });
  };

  return (
    <main
      className="min-h-screen bg-gradient-to-b flex flex-col items-center py-16 px-5 lg:px-10 mt-10"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="text-center mb-10">
        {isArabic ? (
          <h1 className="text-4xl lg:text-5xl font-bold text-[#125892]">
            إنضم إلى فريقنا
          </h1>
        ) : (
          <h1 className="text-4xl lg:text-6xl font-bold text-[#125892]">
            Join Think <span className="text-[#00ADEE]">Impact</span> Team
          </h1>
        )}

        <p className="text-gray-600 mt-3 text-base lg:text-lg max-w-2xl mx-auto dark:text-white">
          {isArabic
            ? "قدّم طلبك للانضمام إلى فريقنا وكن جزءًا من إحداث تأثير معنا."
            : "Submit your application to join our passionate team and make an impact with us."}
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFormSubmit();
        }}
        className="w-full max-w-3xl "
      >
        <Card className="shadow-sm rounded-2xl gap-0 dark:bg-gray-800">
          <CardHeader className="bg-[#125892] text-white rounded-t-2xl py-5 relative bottom-6 ">
            <CardTitle className="text-2xl">
              {isArabic ? "المعلومات الشخصية" : "Personal Details"}
            </CardTitle>
            <CardDescription className="text-white/80">
              {isArabic
                ? "املأ الحقول المطلوبة أدناه لتقديم طلبك"
                : "Fill out the required fields below to submit your application."}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 lg:p-10 space-y-6">
            {/* Names */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1 dark:text-white">
                  <span className="text-red-500">*</span>{" "}
                  {isArabic ? "الإسم الأول" : "First Name"}
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={form.first_name ?? ""}
                  onChange={handleInputChange}
                  className={`border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00ADEE] dark:border-gray-500 dark:bg-gray-200 dark:text-black dark:border bg-white ${
                    errors.first_name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.first_name && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.first_name}
                  </span>
                )}
              </div>

              {/* Last Name */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1 dark:text-white">
                  <span className="text-red-500">*</span>{" "}
                  {isArabic ? "الإسم الثاني" : "Last Name"}
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={form.last_name ?? ""}
                  onChange={handleInputChange}
                  className={`border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00ADEE] dark:border-gray-500 dark:bg-gray-200 dark:text-black dark:border bg-white ${
                    errors.last_name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.last_name && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.last_name}
                  </span>
                )}
              </div>
            </div>

            {/* Email + Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1 dark:text-white">
                  <span className="text-red-500">*</span>{" "}
                  {isArabic ? "البريد الإلكتروني" : "Email"}
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email ?? ""}
                  onChange={handleInputChange}
                  className={`border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00ADEE] dark:border-gray-500 dark:bg-gray-200 dark:text-black dark:border bg-white ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Country */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1 dark:text-white">
                  <span className="text-red-500">*</span>{" "}
                  {isArabic ? "الدولة" : "Country"}
                </label>
                <input
                  type="text"
                  name="city"
                  value={form.city ?? ""}
                  onChange={handleInputChange}
                  className={`border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00ADEE] dark:border-gray-500 dark:bg-gray-200 dark:text-black dark:border bg-white ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.city && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.city}
                  </span>
                )}
              </div>
            </div>

             {/* Phone Number */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1 dark:text-white">
                <span className="text-red-500">*</span>{" "}
                {isArabic ? "رقم الهاتف" : "Phone Number"}
              </label>
          <PhoneInput
  country={"jo"}
  value={form.phone_number ?? ""}
  onChange={(value: string) =>
    setForm({ ...form, phone_number: value })
  }
  inputStyle={{
    width: "100%",
    padding: "0.5rem 0.75rem 0.5rem 3rem",
    borderRadius: "0.375rem",
    border: isDark ? "1px solid #6B7280" : "1px solid #D1D5DB",
    outline: "none",
    textAlign: "left",
    height: "2.5rem",
    backgroundColor: isDark ? "#E5E7EB" : "#fff",
    color: isDark ? "#000" : "#000", // ensures dark text even if empty
  }}
  buttonStyle={{
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    borderRadius: "0.375rem 0 0 0.375rem",
    border: isDark ? "1px solid #6B7280" : "1px solid #D1D5DB",
    backgroundColor: isDark ? "#E5E7EB" : "#fff",
  }}
  containerStyle={{
    width: "100%",
    direction: "ltr",
  }}
  enableSearch
/>

              {errors.phone_number && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.phone_number}
                </span>
              )}
            </div>
 </div>
           
          

            {/* CV Upload */}
            <div className="flex flex-col w-full max-w-md">
              <label className="text-sm font-semibold text-gray-700 mb-1 dark:text-white">
                <span className="text-red-500">*</span>{" "}
                {isArabic ? "تحميل السيرة الذاتية" : "Upload Your CV (PDF)"}
              </label>
              <FileUploader
                endpoint="cvUpload"
                initialFileUrl={form.cv}
                onUploadComplete={(url) => setForm({ ...form, cv: url })}
                onUploadError={(err) => console.error(err)}
                onDelete={() => setForm({ ...form, cv: "" })}
                locale={locale}
              />
              {errors.cv && (
                <span className="text-red-500 text-sm mt-1">{errors.cv}</span>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                type="button"
                onClick={() => router.replace("/")}
                className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-all"
              >
                {isArabic ? "إلغاء" : "Cancel"}
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#125892] hover:bg-[#0f4473] text-white rounded-lg font-semibold transition-all shadow-md"
                disabled={isPending}
              >
                {isPending
                  ? isArabic
                    ? "جاري الإرسال..."
                    : "Submitting..."
                  : isArabic
                  ? "إرسال"
                  : "Submit"}
              </button>
            </div>
          </CardContent>
        </Card>
      </form>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-5 right-5 z-50 px-5 py-3 rounded-lg shadow-lg text-white font-medium transition-all duration-300 ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}
    </main>
  );
}

export default NewApplicationForm;
