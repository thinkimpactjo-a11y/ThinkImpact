"use client";
import { type newTraining } from "@/types";
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

// Zod schema for validation
const newTrainingSchema = z.object({
  id: z.string().optional(),
  name_en: z
    .string()
    .min(1, "English name is required")
    .max(100, "English name is too long"),
  name_ar: z
    .string()
    .min(1, "Arabic name is required")
    .max(100, "Arabic name is too long"),
  description_en: z
    .string()
    .min(1, "English description is required")
    .max(1000, "English description is too long"),
  description_ar: z
    .string()
    .min(1, "Arabic description is required")
    .max(1000, "Arabic description is too long"),
});

interface Props {
  action: (data: newTraining) => Promise<void>;
}

export default function CreateNewTraining({ action }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<newTraining>({
    id: "",
    name_en: "",
    name_ar: "",
    description_en: "",
    description_ar: "",
    slug: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof newTraining, string>>
  >({});
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on input change
  };

  const handleFormSubmit = () => {
    startTransition(async () => {
      try {
        // Validate the form
        newTrainingSchema.parse(form);
        setErrors({}); // clear previous errors

        await action({ ...form });

        setToast({ message: "Training added successfully!", type: "success" });
        setTimeout(() => {
          setToast(null);
          router.replace("/admin/dashboard/training");
        }, 1500);
      } catch (err: any) {
        if (err instanceof z.ZodError) {
          const zodError = err as z.ZodError<typeof form>;
          const fieldErrors: Partial<Record<keyof newTraining, string>> = {};

          zodError.issues.forEach((e) => {
            if (e.path[0])
              fieldErrors[e.path[0] as keyof newTraining] = e.message;
          });

          setErrors(fieldErrors);
        } else {
          console.error(err);
          setToast({ message: "Failed to add Training.", type: "error" });
          setTimeout(() => setToast(null), 3000);
        }
      }
    });
  };

  return (
    <main className="ml-3 xl:ml-7 mb-7">
      <div className="flex flex-col justify-start items-start border-b border-gray-500 w-[70vw] mb-7">
        <h1 className="text-lg md:text-2xl font-bold">Add New Training</h1>
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
            <CardTitle>New Training Details</CardTitle>
            <CardDescription>
              Fill out the required fields below to create a new Training.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-start gap-5 mb-7">
            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Slug (Auto
                Generated)
              </label>
              <input
                type="text"
                name="slug"
                value={form.name_en
                  .toLowerCase()
                  .replace(/&/g, "and")
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-+|-+$/g, "")}
                onChange={handleInputChange}
                readOnly
                className="border px-2 py-1 rounded border-black bg-gray-100 w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[19vw] h-[5vh] text-black"
              />
            </div>
            <div className="flex flex-col lg:flex lg:flex-row lg:justify-start gap-7">
              <div className="flex flex-col">
                <label className="text-base text-black mb-1">
                  <span className="text-red-500 text-sm">*</span> English Name
                </label>
                <input
                  type="text"
                  name="name_en"
                  value={form.name_en}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded border-black bg-white w-[80vw] md:w-[75vw] lg:w-[55vw] xl:w-[19vw] h-[5vh] text-black"
                />
                {errors.name_en && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.name_en}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-base text-black mb-1">
                  <span className="text-red-500 text-sm">*</span> Arabic Name
                </label>
                <input
                  type="text"
                  name="name_ar"
                  value={form.name_ar}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded border-black bg-white w-[80vw] md:w-[75vw] lg:w-[55vw] xl:w-[19vw] h-[5vh] text-black"
                />
                {errors.name_ar && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.name_ar}
                  </span>
                )}
              </div>
            </div>

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
                <span className="text-red-500 text-sm mt-1">
                  {errors.description_en}
                </span>
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
                <span className="text-red-500 text-sm mt-1">
                  {errors.description_ar}
                </span>
              )}
            </div>

            <div className="w-full flex justify-center mt-5">
              <div className="flex flex-row gap-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                  onClick={() => router.replace("/admin/dashboard/training")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#125892] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-[#0f4473]"
                  disabled={isPending}
                >
                  {isPending ? "Adding..." : "Add Training"}
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
