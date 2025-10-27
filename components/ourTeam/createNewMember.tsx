"use client";
import { type newMember } from "@/types";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@radix-ui/react-dropdown-menu";
import { z } from "zod";
import { newMemberSchema } from "@/types/zod/ourTeamSchema";

interface Props {
  action: (data: newMember) => Promise<void>;
}

export default function AddMemberForm({ action }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<newMember>({
    name_en: "",
    name_ar: "",
    position_en: "",
    position_ar: "",
    description_en: "",
    description_ar: "",
    image: "",
    main: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear field error on change
  };

  const handleUploadComplete = (url: string) => {
    setForm({ ...form, image: url });
    setErrors({ ...errors, image: "" });
  };

  const handleUploadError = (error: Error) => {
    console.error(error);
    setToast({ message: `Upload failed: ${error.message}`, type: "error" });
    setTimeout(() => setToast(null), 3000);
  };

  const handleImageDelete = () => {
    setForm({ ...form, image: "" });
  };

  const handleFormSubmit = () => {
    startTransition(async () => {
      try {
        // Validate form with Zod
        newMemberSchema.parse(form);

        // Clear errors if validation passes
        setErrors({});

        await action({ ...form });
        setToast({ message: "Member added successfully!", type: "success" });

        setTimeout(() => {
          setToast(null);
          router.replace("/admin/dashboard/ourTeam");
        }, 1500);
      } catch (error) {
        console.error(error);

       if (error instanceof z.ZodError) {
  // Map Zod errors to a field -> message object
  const fieldErrors: Record<string, string> = {};
  error.issues.forEach(err => {
    if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
  });
  setErrors(fieldErrors);
} else {
  setToast({ message: "Failed to add Member.", type: "error" });
}


        setTimeout(() => setToast(null), 3000);
      }
    });
  };

  return (
    <main className="ml-3 xl:ml-7 mb-7">
      <div className="flex flex-col justify-start items-start border-b border-gray-500 w-[70vw] mb-7">
        <h1 className="text-lg md:text-2xl font-bold">Add New Member</h1>
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
            <CardTitle>New Member Details</CardTitle>
            <CardDescription>
              Fill out the required fields below to create a new Member.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-start gap-5 mb-7">
            {/* Name Fields */}
            <div className="flex flex-col lg:flex lg:flex-row lg:justify-start gap-7 ">
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
                {errors.name_en && <p className="text-red-600 text-sm mt-1">{errors.name_en}</p>}
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
                {errors.name_ar && <p className="text-red-600 text-sm mt-1">{errors.name_ar}</p>}
              </div>
            </div>

            {/* Position Fields */}
            <div className="flex flex-col lg:flex lg:flex-row lg:justify-start gap-7 ">
              <div className="flex flex-col">
                <label className="text-base text-black mb-1">
                  <span className="text-red-500 text-sm">*</span> Position (English)
                </label>
                <input
                  type="text"
                  name="position_en"
                  value={form.position_en}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded border-black bg-white w-[80vw] md:w-[75vw] lg:w-[55vw] xl:w-[19vw] h-[5vh] text-black"
                />
                {errors.position_en && <p className="text-red-600 text-sm mt-1">{errors.position_en}</p>}
              </div>

              <div className="flex flex-col">
                <label className="text-base text-black mb-1">
                  <span className="text-red-500 text-sm">*</span> Position (Arabic)
                </label>
                <input
                  type="text"
                  name="position_ar"
                  value={form.position_ar}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded border-black bg-white w-[80vw] md:w-[75vw] lg:w-[55vw] xl:w-[19vw] h-[5vh] text-black"
                />
                {errors.position_ar && <p className="text-red-600 text-sm mt-1">{errors.position_ar}</p>}
              </div>
            </div>

            {/* Description Fields */}
            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> English Description
              </label>
              <textarea
                name="description_en"
                value={form.description_en}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded border-black bg-white w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[15vh] text-black"
              />
              {errors.description_en && <p className="text-red-600 text-sm mt-1">{errors.description_en}</p>}
            </div>

            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Arabic Description
              </label>
              <textarea
                name="description_ar"
                value={form.description_ar}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded border-black bg-white w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[15vh] text-black"
              />
              {errors.description_ar && <p className="text-red-600 text-sm mt-1">{errors.description_ar}</p>}
            </div>

            {/* Image Uploader */}
            <div className="flex flex-col w-full max-w-sm">
              <label className="text-base text-black mb-1">Member Image</label>
              <ImageUploader
                endpoint="ourTeam"
                initialImageUrl={form.image}
                onUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
                onDelete={handleImageDelete}
              />
              {errors.image && <p className="text-red-600 text-sm mt-1">{errors.image}</p>}
            </div>

            {/* Main Checkbox */}
            <div className="flex items-center gap-3 mb-6 border border-gray-400 p-4 bg-gray-100 rounded">
              <Checkbox
                id="main"
                name="main"
                checked={form.main}
                onCheckedChange={(checked) => setForm({ ...form, main: checked === true })}
                className="shadow-black cursor-pointer"
              />
              <Label className="text-sm font-medium text-gray-800 cursor-pointer select-none">
                Main Member
              </Label>
            </div>

            {/* Buttons */}
            <div className="w-full flex justify-center mt-5">
              <div className="flex flex-row gap-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                  onClick={() => router.replace("/admin/dashboard/ourTeam")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#125892] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-[#0f4473]"
                  disabled={isPending}
                >
                  {isPending ? "Adding..." : "Add Member"}
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
