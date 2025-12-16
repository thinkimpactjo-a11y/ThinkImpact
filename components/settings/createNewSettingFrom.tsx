"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import ImageUploader from "@/components/imageUpload";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { newSetting } from "@/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { newSettingSchema } from "@/types/zod/settingsSchema";
import { ArrowLeft } from "lucide-react";

import { signOut } from "next-auth/react";

function getErrorMessage(error: unknown): string | null {
  if (typeof error === "object" && error !== null && "message" in error) {
    const msg = (error as { message?: unknown }).message;
    return typeof msg === "string" ? msg : null;
  }
  return null;
}

const formSchema = z
  .object({ id: z.string().optional() })
  .merge(newSettingSchema);

export type FormSchema = z.infer<typeof formSchema>;

interface Option {
  value: string;
  label: string;
  type: "text" | "number" | "textarea" | "image" | "video";
  placeholder?: string;
}

interface Props {
  action: (data: newSetting) => Promise<void>;
  existingKeys?: string[];
  options?: Option[];
}

export default function CreateNewSetting({
  action,
  existingKeys = [],
  options,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [isUploadingEn, setIsUploadingEn] = useState(false);
  const [isUploadingAr, setIsUploadingAr] = useState(false);

  const defaultOptions: Option[] = [
    {
      value: "number_of_clients",
      label: "Number Of Clients",
      type: "number",
      placeholder: "e.g. 42",
    },
    {
      value: "number_of_projects",
      label: "Number Of Projects",
      type: "number",
      placeholder: "e.g. 120",
    },
    { value: "home_video", label: "Video In Home Page", type: "video" },
    {
      value: "text_home_video",
      label: "Text On Video In Home Page",
      type: "text",
    },
    { value: "part_one_header", label: "Header In Part One", type: "text" },
    {
      value: "part_one_description",
      label: "Description In Part One",
      type: "textarea",
    },
    { value: "part_one_image", label: "Image In Part One", type: "image" },
    { value: "part_two_header", label: "Header In Part Two", type: "text" },
    {
      value: "part_two_description",
      label: "Description In Part Two",
      type: "textarea",
    },
    { value: "part_two_image", label: "Image In Part Two", type: "image" },
    { value: "about_page_text", label: "Text In About Page", type: "textarea" },
    { value: "vision_in_about", label: "Vision", type: "textarea" },
    { value: "mission_in_about", label: "Mission", type: "textarea" },

    {
      value: "value_one_in_about",
      label: "First Value (About Page)",
      type: "textarea",
    },
    {
      value: "value_two_in_about",
      label: "Second Value (About Page)",
      type: "textarea",
    },
    {
      value: "value_three_in_about",
      label: "Third Value (About Page)",
      type: "textarea",
    },

    { value: "our_methodology", label: "Our Methodology", type: "textarea" },
    {
      value: "what_we_stand_for",
      label: "What We Stand For",
      type: "textarea",
    },
    { value: "what_we_value", label: "What We Value", type: "textarea" },
    { value: "why_we_are_here", label: "Why We’re Here", type: "textarea" },
  ];

  const availableOptions = options ?? defaultOptions;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      key_name_en: "",
      key_name_ar: "",
      value_en: "",
      value_ar: "",
    },
  });

   const watchedKey = watch("key_name_en");
  const watchedValueEn = watch("value_en");

  useEffect(() => {
    setValue("value_en", "");
    setValue("value_ar", "");
    setValue("key_name_ar", "");
    clearErrors();
  }, [watchedKey, setValue, clearErrors]);


  const remainingOptions = availableOptions.filter(
    (opt) => !existingKeys.includes(opt.value)
  );

  if (remainingOptions.length === 0) {
    return (
      <main className="ml-3 xl:ml-7 mb-7">
        <div className="flex flex-col justify-start items-start w-[70vw] mb-7">
          <h1 className="text-lg md:text-2xl font-bold">Add New Setting</h1>
        </div>

        <div className="text-gray-600 text-lg font-medium">
          ✅ All settings have already been added. There are no more fields
          available to create.
        </div>

       <div className="w-full flex justify-center my-5">
  <button
    onClick={() => router.push("/admin/dashboard/settings")}
    className="bg-[#125892] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-[#0f4473] transition mt-28"
  >
    Back to Settings
  </button>
</div>


      </main>
    );
  }
 
  const handleImageUploadedEn = (url: string) => {
    setIsUploadingEn(false);
    setValue("value_en", url, { shouldValidate: true });
  };

  const handleImageUploadErrorEn = () => {
    setIsUploadingEn(false);
    setToast({
      message: "Image upload failed. Please try again.",
      type: "error",
    });
    setTimeout(() => setToast(null), 3000);
  };

  const handleVideoUploadCompleteEn = (res: { url: string }[]) => {
    setIsUploadingEn(false);
    if (res && res[0]) {
      setValue("value_en", res[0].url, { shouldValidate: true });
    } else {
      setToast({
        message: "Video upload failed. No file returned.",
        type: "error",
      });
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleVideoUploadErrorEn = () => {
    setIsUploadingEn(false);
    setToast({
      message: "Video upload failed. Please try again.",
      type: "error",
    });
    setTimeout(() => setToast(null), 3000);
  };

  const onSubmit = async (data: FormSchema) => {
    if (existingKeys.includes(data.key_name_en)) {
      setError("key_name_en", { message: "This key already exists" });
      return;
    }

    startTransition(async () => {
      try {
        const payload: newSetting = {
          id: data.id ?? "",
          key_name_en: String(data.key_name_en ?? ""),
          key_name_ar: String(data.key_name_ar ?? ""),
          value_en: String(data.value_en ?? ""),
          value_ar: String(data.value_ar ?? ""),
        };

        await action(payload);
        setToast({ message: "Setting added successfully!", type: "success" });
        setTimeout(() => {
          setToast(null);
          router.replace("/admin/dashboard/settings");
        }, 1500);
      } catch (err) {
         const message = getErrorMessage(err);
                                if (message === "SESSION_EXPIRED" || message === "UNAUTHENTICATED") {
                                  setToast({ message: "Expired Session, Please Login", type: "error" });
                        
                                  setTimeout(() => {
                                    signOut({ callbackUrl: "/login?reason=expired" });
                                  }, 500);
                        
                                  return;
                                }
        console.error(err);
        setToast({ message: "Failed to add Setting.", type: "error" });
        setTimeout(() => setToast(null), 3000);
      }
    });
  };

  const selected = availableOptions.find((o) => o.value === watchedKey);
  const inputWidthClass = "w-[90vw] md:w-[75vw] lg:w-[55vw] xl:w-[30vw]";
  const textareaWidthClass = "w-[90vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw]";

  const renderValueInput = () => {
    if (!selected)
      return (
        <div className="text-sm text-gray-500">
          Choose a key above to enter the appropriate value.
        </div>
      );

    switch (selected.type) {
      case "text":
        return (
          <>
            <input
              type="text"
              {...register("value_en")}
              className={`border px-2 py-1 rounded border-black bg-white ${inputWidthClass} h-[5vh] text-black`}
              placeholder={selected.placeholder ?? ""}
            />
            {errors.value_en && (
              <p className="text-red-500 text-sm mt-1">
                {errors.value_en.message}
              </p>
            )}
          </>
        );

      case "number":
        return (
          <>
            <input
              type="number"
              {...register("value_en")}
              className={`border px-2 py-1 rounded border-black bg-white ${inputWidthClass} h-[5vh] text-black`}
              placeholder={selected.placeholder ?? ""}
            />
            {errors.value_en && (
              <p className="text-red-500 text-sm mt-1">
                {errors.value_en.message}
              </p>
            )}
          </>
        );

      case "textarea":
        return (
          <>
            <textarea
              {...register("value_en")}
              className={`border px-2 py-1 rounded border-black bg-white ${textareaWidthClass} h-[15vh] text-black`}
            />
            {errors.value_en && (
              <p className="text-red-500 text-sm mt-1">
                {errors.value_en.message}
              </p>
            )}
          </>
        );

      case "image":
        return (
          <div className="flex flex-col gap-2">
            <ImageUploader
              endpoint="banners"
              initialImageUrl={watchedValueEn ?? null}
              onUploadComplete={handleImageUploadedEn}
              onUploadError={handleImageUploadErrorEn}
              onDelete={() =>
                setValue("value_en", "", { shouldValidate: true })
              }
            />
            {watchedValueEn && (
              <div className="mt-2">
                <Image
                  src={watchedValueEn}
                  alt="preview"
                  width={400}
                  height={220}
                  className="object-cover rounded-lg border border-gray-300"
                />
              </div>
            )}
            {errors.value_en && (
              <p className="text-red-500 text-sm mt-1">
                {errors.value_en.message}
              </p>
            )}
          </div>
        );

      case "video":
        return (
          <div className="flex flex-col gap-2">
            <UploadDropzone<OurFileRouter, "settings">
              endpoint="settings"
              onUploadBegin={() => {
                setIsUploadingEn(true);
                setToast(null);
              }}
              onClientUploadComplete={handleVideoUploadCompleteEn}
              onUploadError={handleVideoUploadErrorEn}
              appearance={{
                container: `flex flex-col items-center justify-center h-64 ${inputWidthClass} text-center p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors`,
                button: "bg-[#125892] text-white rounded-md px-4 py-2 mt-3",
                label: "text-gray-500",
              }}
              content={{
                label: ({ isDragActive }) => (
                  <div className="flex flex-col items-center">
                    <div className="text-sm font-semibold">
                      {isDragActive
                        ? "Drop the video"
                        : "Drop video or click to browse"}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Allowed: video files (Max Size: 64MB)
                    </div>
                  </div>
                ),
                allowedContent: null,
              }}
            />
            {watchedValueEn && (
              <div className="mt-2">
                <video
                  controls
                  src={watchedValueEn as string}
                  className={`rounded-lg border border-gray-300 ${inputWidthClass}`}
                />
              </div>
            )}

            {errors.value_en && (
              <p className="text-red-500 text-sm mt-1">
                {errors.value_en.message}
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const renderArabicInput = () => {
    if (!selected) {
      return (
        <div className="text-sm text-gray-500">
          Choose a key above to enter the appropriate value for Arabic.
        </div>
      );
    }

    if (selected.type === "text") {
      return (
        <>
          <input
            type="text"
            dir="rtl"
            {...register("value_ar")}
            className={`border px-2 py-1 rounded border-black bg-white ${inputWidthClass} h-[5vh] text-right`}
            placeholder={selected.placeholder ?? ""}
          />
          {errors.value_ar && (
            <p className="text-red-500 text-sm mt-1">
              {errors.value_ar.message}
            </p>
          )}
        </>
      );
    }

    if (selected.type === "textarea") {
      return (
        <>
          <textarea
            dir="rtl"
            {...register("value_ar")}
            className={`border px-2 py-1 rounded border-black bg-white ${textareaWidthClass} h-[15vh] text-right`}
          />
          {errors.value_ar && (
            <p className="text-red-500 text-sm mt-1">
              {errors.value_ar.message}
            </p>
          )}
        </>
      );
    }

    return null;
  };

  return (
    <main className="ml-3 xl:ml-7 mb-7">
      <div className="flex flex-col justify-start items-start border-b border-gray-500 w-[70vw] mb-7">
        <h1 className="text-lg md:text-2xl font-bold">Add New Setting</h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full w-full lg:w-[70vw] flex flex-col gap-5"
      >
        <Card className="w-full h-full">
          <CardHeader>
            <CardTitle>New Setting Details</CardTitle>
            <CardDescription>
              Pick a setting key and provide its value (all values stored as
              strings).
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-start gap-5 mb-7">
            {/* Select key */}
            <div className="flex flex-col gap-3">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Setting Key
              </label>

              <Select
                value={watchedKey}
                onValueChange={(v) => {
                  setValue("key_name_en", v);
                  setValue("key_name_ar", "");
                  setValue("value_en", "");
                  setValue("value_ar", "");
                  clearErrors();
                }}
              >
                <SelectTrigger className="w-[90vw] md:w-[70vw] lg:w-[50vw] xl:w-[30vw] border border-black text-black">
                  <SelectValue placeholder="Select setting key" />
                </SelectTrigger>

                <SelectContent>
                  {remainingOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.key_name_en && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.key_name_en.message}
                </p>
              )}
            </div>

            {/* English value input */}
            <div className="flex flex-col mt-2">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Value (English)
              </label>
              <div className="mt-1">{renderValueInput()}</div>
            </div>

            {/* Arabic value input */}
            {selected &&
              (selected.type === "text" || selected.type === "textarea") && (
                <div className="flex flex-col mt-2">
                  <label className="text-base text-black mb-1">
                    <span className="text-red-500 text-sm">*</span> Value
                    (Arabic)
                  </label>
                  <div className="mt-1">{renderArabicInput()}</div>
                </div>
              )}

            <div className="w-full flex justify-center mt-5">
              <div className="flex flex-row gap-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                  onClick={() => router.replace("/admin/dashboard/settings")}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-[#125892] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-[#0f4473]"
                  disabled={
                    isSubmitting || isPending || isUploadingEn || isUploadingAr
                  }
                >
                  {isPending
                    ? "Adding..."
                    : isUploadingEn || isUploadingAr
                    ? "Uploading..."
                    : "Add Setting"}
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
