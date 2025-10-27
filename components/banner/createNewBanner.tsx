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
  action: (data: {
    alt: string;
    description_en: string;
    description_ar: string;
    image?: string | null;
  }) => Promise<void>;
}

export default function AddBannerForm({ action }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<newBanner>({
    alt: "",
    description_en: "",
    description_ar: "",
    image: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({}); // ✅ store validation errors
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error when user types
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
        // ✅ Validate form using Zod schema
        const validatedData = bannerSchema.parse(form);
        setErrors({}); // clear previous errors if validation passes

        await action(validatedData);
        setToast({ message: "Banner added successfully!", type: "success" });

        setTimeout(() => {
          setToast(null);
          router.replace("/admin/dashboard/banners");
        }, 1500);
      } catch (error) {
        if (error instanceof z.ZodError) {
          // ✅ Collect Zod errors and map to state
          const fieldErrors: Record<string, string> = {};
          error.issues.forEach((err) => {
            if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
          });
          setErrors(fieldErrors);
          setToast({ message: "Please check the input fields.", type: "error" });
        } else {
          console.error(error);
          setToast({ message: "Failed to add banner.", type: "error" });
        }
        setTimeout(() => setToast(null), 3000);
      }
    });
  };

  return (
    <main className="ml-3 xl:ml-7 mb-7">
      <div className="flex flex-col justify-start items-start border-b border-gray-500 w-[70vw] mb-7">
        <h1 className="text-lg md:text-2xl font-bold">Add New Banner</h1>
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
            <CardTitle>New Banner Details</CardTitle>
            <CardDescription>
              Fill out the required fields below to create a new banner.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-start gap-5 mb-7">
            {/* Alt Text */}
            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Name 
              </label>
              <input
                type="text"
                name="alt"
                value={form.alt}
                onChange={handleInputChange}
                className={`border px-2 py-1 rounded w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[5vh] text-black ${
                  errors.alt ? "border-red-500" : "border-black"
                }`}
                required
              />
              {errors.alt && <p className="text-red-500 text-sm mt-1">{errors.alt}</p>}
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
                className={`border px-2 py-1 rounded w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[15vh] text-black ${
                  errors.description_en ? "border-red-500" : "border-black"
                }`}
                required
              />
              {errors.description_en && (
                <p className="text-red-500 text-sm mt-1">{errors.description_en}</p>
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
                className={`border px-2 py-1 rounded w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[15vh] text-black ${
                  errors.description_ar ? "border-red-500" : "border-black"
                }`}
                required
              />
              {errors.description_ar && (
                <p className="text-red-500 text-sm mt-1">{errors.description_ar}</p>
              )}
            </div>

            {/* Image Uploader */}
            <div className="flex flex-col w-full max-w-sm">
              <label className="text-base text-black mb-1">Banner Image</label>
              <ImageUploader
                endpoint="banners"
                initialImageUrl={form.image}
                onUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
                onDelete={handleImageDelete}
              />
              {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
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
                  {isPending ? "Adding..." : "Add Banner"}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>

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
