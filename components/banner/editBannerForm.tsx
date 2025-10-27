"use client";

import { type newBanner } from "@/types";
import ImageUploader from "@/components/imageUpload";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { bannerSchema } from "@/types/zod/bannerSchema"; // ✅ import schema

interface Props {
  banner: newBanner;
  action: (data: {
    alt: string;
    description_en: string;
    description_ar: string;
    image?: string | null;
    bannerId?: string;
  }) => Promise<void>;
}

export default function EditBannerForm({ banner, action }: Props) {
  const router = useRouter();

  const [form, setForm] = useState<newBanner>({
    alt: banner.alt ?? "",
    description_en: banner.description_en ?? "",
    description_ar: banner.description_ar ?? "",
    image: banner.image ?? null,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof newBanner, string>>>({});
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(
    null
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear field error on change
  };

  const handleUploadComplete = (url: string) => {
    setForm({ ...form, image: url });
  };

  const handleUploadError = (error: Error) => {
    console.error(error);
    setToast({ message: `Upload failed: ${error.message}`, type: "error" });
    setTimeout(() => setToast(null), 3000);
  };

  const handleImageDelete = () => {
    setForm({ ...form, image: null });
  };

  const handleFormSubmit = () => {
    startTransition(async () => {
      try {
        // ✅ Validate form using Zod
        const validatedData = bannerSchema.parse(form);

        await action({ ...validatedData, bannerId: banner.id });
        setToast({ message: "Banner updated successfully!", type: "success" });

        setTimeout(() => {
          setToast(null);
          router.replace("/admin/dashboard/banners");
        }, 1500);
      } catch (error) {
        if (error instanceof z.ZodError) {
          // ✅ Map field-specific errors
          const fieldErrors: Partial<Record<keyof newBanner, string>> = {};
          error.issues.forEach((err) => {
            const path = err.path[0] as keyof newBanner;
            fieldErrors[path] = err.message;
          });
          setErrors(fieldErrors);
          setToast({ message: "Please check the highlighted fields.", type: "error" });
        } else {
          console.error(error);
          setToast({ message: "Failed to update banner.", type: "error" });
        }
        setTimeout(() => setToast(null), 3000);
      }
    });
  };

  return (
    <main className="ml-3 xl:ml-7 mb-7">
      <div className="flex flex-col justify-start items-start border-b border-gray-500 w-[70vw] mb-7">
        <h1 className="text-lg md:text-2xl font-bold">Edit Banner</h1>
        <p className="text-xs md:text-base text-gray-600">ID: {banner.id}</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFormSubmit();
        }}
        className="h-full w-full lg:w-[70vw] flex flex-col gap-5"
      >
        <Card className="w-full h-full">
          <CardHeader>
            <CardTitle>Edit Banner Details</CardTitle>
            <CardDescription>
              Fill out the required fields below to update your banner.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-start gap-5 mb-7">
            {/* Alt Field */}
            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Name
              </label>
              <input
                type="text"
                name="alt"
                value={form.alt}
                onChange={handleInputChange}
                className={`border px-2 py-1 rounded bg-white text-black w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[5vh] ${
                  errors.alt ? "border-red-500" : "border-black"
                }`}
              />
              {errors.alt && (
                <span className="text-red-500 text-sm mt-1">{errors.alt}</span>
              )}
            </div>

            {/* English Description */}
            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> English Description
              </label>
              <textarea
                name="description_en"
                value={form.description_en}
                onChange={handleInputChange}
                className={`border px-2 py-1 rounded bg-white text-black w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[15vh] ${
                  errors.description_en ? "border-red-500" : "border-black"
                }`}
              />
              {errors.description_en && (
                <span className="text-red-500 text-sm mt-1">{errors.description_en}</span>
              )}
            </div>

            {/* Arabic Description */}
            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Arabic Description
              </label>
              <textarea
                name="description_ar"
                value={form.description_ar}
                onChange={handleInputChange}
                className={`border px-2 py-1 rounded bg-white text-black w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[15vh] ${
                  errors.description_ar ? "border-red-500" : "border-black"
                }`}
              />
              {errors.description_ar && (
                <span className="text-red-500 text-sm mt-1">{errors.description_ar}</span>
              )}
            </div>

            {/* Image */}
            <div className="flex flex-col w-full max-w-sm">
              <label className="text-base text-black mb-1">Banner Image</label>
              <ImageUploader
                endpoint="banners"
                initialImageUrl={form.image}
                onUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
                onDelete={handleImageDelete}
              />
            </div>

            {/* Buttons */}
            <div className="w-full flex justify-center mt-5">
              <div className="flex flex-row gap-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                  onClick={() => router.replace("/admin/dashboard/banners")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#125892] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-[#0f4473]"
                  disabled={isPending}
                >
                  {isPending ? "Updating..." : "Save Changes"}
                </button>
              </div>
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
