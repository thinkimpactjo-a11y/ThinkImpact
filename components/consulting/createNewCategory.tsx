"use client";

import { newCategory } from "@/types";
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
import { categorySchema } from "@/types/zod/consultingSchema"; // ✅ imported schema
import { signOut } from "next-auth/react";

interface Props {
  action: (data: newCategory) => Promise<void>;
}

function getErrorMessage(error: unknown): string | null {
  if (typeof error === "object" && error !== null && "message" in error) {
    const msg = (error as { message?: unknown }).message;
    return typeof msg === "string" ? msg : null;
  }
  return null;
}

export default function CreateNewCategory({ action }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<newCategory>({
    id: "",
    slug: "",
    category_name_en: "",
    category_name_ar: "",
    description_en: "",
    description_ar: "",
    category_logo: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => {
      const updatedForm = { ...prev, [name]: value };

      if (name === "category_name_en") {
        updatedForm.slug = value
          .toLowerCase()
          .replace(/&/g, "and")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
      }

      return updatedForm;
    });

    setErrors({ ...errors, [name]: "" });
  };

  const handleUploadComplete = (url: string) => {
    setForm({ ...form, category_logo: url });
  };

  const handleUploadError = (error: Error) => {
    console.error(error);
    setToast({ message: `Upload failed: ${error.message}`, type: "error" });
    setTimeout(() => setToast(null), 3000);
  };

  const handleImageDelete = () => {
    setForm({ ...form, category_logo: null });
  };

  const handleFormSubmit = () => {
    startTransition(async () => {
      // ✅ validate using imported Zod schema
      const validation = categorySchema.safeParse(form);

      if (!validation.success) {
        const fieldErrors: Record<string, string> = {};
        validation.error.issues.forEach((err) => {
          if (err.path[0]) fieldErrors[String(err.path[0])] = err.message;
        });
        setErrors(fieldErrors);
        setToast({ message: "Please fix the form errors.", type: "error" });
        setTimeout(() => setToast(null), 3000);
        return;
      }

      try {
        await action({ ...form });
        setToast({ message: "Category added successfully!", type: "success" });
        setTimeout(() => {
          setToast(null);
          router.replace("/admin/dashboard/consulting");
        }, 1500);
      } catch (error) {
        const message = getErrorMessage(error);
        if (message === "SESSION_EXPIRED" || message === "UNAUTHENTICATED") {
          setToast({ message: "Expired Session, Please Login", type: "error" });

          setTimeout(() => {
            signOut({ callbackUrl: "/login?reason=expired" });
          }, 500);

          return;
        }
        console.error(error);
        setToast({ message: "Failed to add category.", type: "error" });
        setTimeout(() => setToast(null), 3000);
      }
    });
  };

  return (
    <main className="ml-3 xl:ml-7 mb-7">
      <div className="flex flex-col justify-start items-start border-b border-gray-500 w-[70vw] mb-7">
        <h1 className="text-lg md:text-2xl font-bold">Add New Category</h1>
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
            <CardTitle>New Category Details</CardTitle>
            <CardDescription>
              Fill out the required fields below to create a new category.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-start gap-5 mb-7">
            {/* Slug */}
            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Slug (Auto
                Generated)
              </label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded cursor-not-allowed border-black bg-gray-100 w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[19vw] h-[5vh] text-black"
              />
            </div>
            {/* English and Arabic Names */}
            <div className="flex flex-col lg:flex-row gap-7">
              <div className="flex flex-col">
                <label className="text-base text-black mb-1">
                  <span className="text-red-500 text-sm">*</span> English Name
                </label>
                <input
                  type="text"
                  name="category_name_en"
                  value={form.category_name_en}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded border-black bg-white w-[80vw] md:w-[75vw] lg:w-[55vw] xl:w-[19vw] h-[5vh] text-black"
                />
                {errors.category_name_en && (
                  <p className="text-red-500 text-sm">
                    {errors.category_name_en}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-base text-black mb-1">
                  <span className="text-red-500 text-sm">*</span> Arabic Name
                </label>
                <input
                  type="text"
                  name="category_name_ar"
                  value={form.category_name_ar}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded border-black bg-white w-[80vw] md:w-[75vw] lg:w-[55vw] xl:w-[19vw] h-[5vh] text-black"
                />
                {errors.category_name_ar && (
                  <p className="text-red-500 text-sm">
                    {errors.category_name_ar}
                  </p>
                )}
              </div>
            </div>

            {/* Descriptions */}
            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> English
                Description
              </label>
              <textarea
                name="description_en"
                value={form.description_en}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded border-black bg-white w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[15vh] text-black"
              />
              {errors.description_en && (
                <p className="text-red-500 text-sm">{errors.description_en}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Arabic
                Description
              </label>
              <textarea
                name="description_ar"
                value={form.description_ar}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded border-black bg-white w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[15vh] text-black"
              />
              {errors.description_ar && (
                <p className="text-red-500 text-sm">{errors.description_ar}</p>
              )}
            </div>

            {/* Image uploader */}
            <div className="flex flex-col w-full max-w-sm">
              <label className="text-base text-black mb-1">Category Logo</label>
              <ImageUploader
                endpoint="consulting"
                initialImageUrl={form.category_logo}
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
                  onClick={() => router.replace("/admin/dashboard/consulting")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#125892] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-[#0f4473]"
                  disabled={isPending}
                >
                  {isPending ? "Adding..." : "Add Category"}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>

      {/* Toast Notification */}
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
