"use client";
import { newTraining } from "@/types";
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
import { newTrainingSchema } from "@/types/zod/trainingSchema";

interface Prop {
  training: newTraining;
  action: (data: newTraining) => Promise<void>;
}

function EditCategoryForm({ training, action }: Prop) {
  const router = useRouter();
  const [form, setForm] = useState<newTraining>({
    id: training.id ?? "",
    name_en: training.name_en ?? "",
    name_ar: training.name_ar ?? "",
    description_en: training.description_en ?? "",
    description_ar: training.description_ar ?? "",
    slug: training.slug ?? "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof newTraining, string>>>({});
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

 const handleInputChange = (
     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => {
     const { name, value } = e.target;
   
     setForm(prev => {
       const updatedForm = { ...prev, [name]: value };
   
      
       if (name === "name_en") {
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
   

  const handleFormSubmit = () => {
    startTransition(async () => {
      try {
        // Validate the form
        newTrainingSchema.parse(form);
        setErrors({});

        await action(form);

        setToast({ message: "Training updated successfully!", type: "success" });
        setTimeout(() => {
          setToast(null);
          router.replace("/admin/dashboard/training");
        }, 1500);
      } catch (err: unknown) {
        if (err instanceof z.ZodError) {
          const fieldErrors: Partial<Record<keyof newTraining, string>> = {};
          err.issues.forEach((issue) => {
            if (issue.path[0]) fieldErrors[issue.path[0] as keyof newTraining] = issue.message;
          });
          setErrors(fieldErrors);
        } else {
          console.error(err);
          setToast({ message: "Failed to update Training.", type: "error" });
          setTimeout(() => setToast(null), 3000);
        }
      }
    });
  };

  return (
    <main className="ml-3 xl:ml-7 mb-7">
      <div className="flex flex-col justify-start items-start border-b border-gray-500 w-[70vw] mb-7">
        <h1 className="text-lg md:text-2xl font-bold">Edit Training</h1>
        <p className="text-xs md:text-base text-gray-600">ID: {training.id}</p>
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
            <CardTitle>Edit Training Details</CardTitle>
            <CardDescription>Fill out the required fields below to update your Training.</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-start gap-5 mb-7">
            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Slug (Auto Generated)
              </label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                
                className="border px-2 py-1 rounded cursor-not-allowed border-black bg-gray-100 w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[19vw] h-[5vh] text-black"
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
                  className={`border px-2 py-1 rounded w-[80vw] md:w-[75vw] lg:w-[55vw] xl:w-[19vw] h-[5vh] text-black ${errors.name_en ? "border-red-500" : "border-black"}`}
                />
                {errors.name_en && <span className="text-red-500 text-sm mt-1">{errors.name_en}</span>}
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
                  className={`border px-2 py-1 rounded w-[80vw] md:w-[75vw] lg:w-[55vw] xl:w-[19vw] h-[5vh] text-black ${errors.name_ar ? "border-red-500" : "border-black"}`}
                />
                {errors.name_ar && <span className="text-red-500 text-sm mt-1">{errors.name_ar}</span>}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> English Description
              </label>
              <textarea
                name="description_en"
                value={form.description_en}
                onChange={handleInputChange}
                className={`border px-2 py-1 rounded w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[15vh] text-black ${errors.description_en ? "border-red-500" : "border-black"}`}
              />
              {errors.description_en && <span className="text-red-500 text-sm mt-1">{errors.description_en}</span>}
            </div>

            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Arabic Description
              </label>
              <textarea
                name="description_ar"
                value={form.description_ar}
                onChange={handleInputChange}
                className={`border px-2 py-1 rounded w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[15vh] text-black ${errors.description_ar ? "border-red-500" : "border-black"}`}
              />
              {errors.description_ar && <span className="text-red-500 text-sm mt-1">{errors.description_ar}</span>}
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
                  {isPending ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>

      {toast && (
        <div
          className={`fixed bottom-5 right-5 z-50 px-5 py-3 rounded-lg shadow-lg text-white font-medium transition-all duration-300 ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {toast.message}
        </div>
      )}
    </main>
  );
}

export default EditCategoryForm;
