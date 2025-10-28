"use client";

import { newSetting } from "@/types";
import Image from "next/image";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

interface prop {
  setting: newSetting;
  action: (data: newSetting) => Promise<void>;
}

interface Option {
  value: string;
  label: string;
  type: "text" | "textarea" | "number" | "image" | "video";
  placeholder?: string;
}

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
  { value: "text_home_video", label: "Text In Home Page", type: "text" },
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
];

function EditSettingForm({ setting, action }: prop) {
  const router = useRouter();
  const [form, setForm] = useState<newSetting>({
    id: setting.id ?? "",
    key_name_en: setting.key_name_en ?? "",
    key_name_ar: setting.key_name_ar,
    value_en: setting.value_en ?? "",
    value_ar: setting.value_ar ?? "",
  });

  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(
    null
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUploadComplete = (url: string) => {
    setForm({ ...form, value_en: url });
    setIsUploading(false);
  };

  const handleUploadError = (type: "image" | "video") => {
    setIsUploading(false);
    setToast({
      message: `${type === "image" ? "Image" : "Video"} upload failed. Please try again.`,
      type: "error",
    });
    setTimeout(() => setToast(null), 3000);
  };

  const handleVideoUploadComplete = (res: { url: string }[] | null) => {
    setIsUploading(false);
    if (res && res[0]) {
      setForm({ ...form, value_en: res[0].url });
    } else {
      handleUploadError("video");
    }
  };

  const handleFormSubmit = () => {
    startTransition(async () => {
      try {
        await action(form);
        setToast({ message: "Setting updated successfully!", type: "success" });
        setTimeout(() => {
          setToast(null);
          router.replace("/admin/dashboard/settings");
        }, 1500);
      } catch (error) {
        console.error(error);
        setToast({ message: "Failed to update Setting.", type: "error" });
        setTimeout(() => setToast(null), 3000);
      }
    });
  };

  const selectedOption = defaultOptions.find((opt) => opt.value === form.key_name_en);

  const renderValueInput = () => {
    if (!selectedOption) return null;

    const commonClass =
      "border px-3 py-2 rounded border-gray-300 bg-white w-full md:w-[70vw] lg:w-[50vw] text-black";

    if (selectedOption.type === "text" || selectedOption.type === "textarea") {
      const InputComponent = selectedOption.type === "textarea" ? "textarea" : "input";
      const extraStyles = selectedOption.type === "textarea" ? "h-24 resize-none" : "";

      return (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-base font-medium text-gray-700">
              English Value <span className="text-red-500">*</span>
            </label>
            <InputComponent
              type={selectedOption.type === "text" ? "text" : undefined}
              name="value_en"
              value={form.value_en}
              onChange={handleInputChange}
              className={`${commonClass} ${extraStyles}`}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base font-medium text-gray-700">
              Arabic Value <span className="text-red-500">*</span>
            </label>
            <InputComponent
              type={selectedOption.type === "text" ? "text" : undefined}
              name="value_ar"
              value={form.value_ar}
              onChange={handleInputChange}
              className={`${commonClass} ${extraStyles}`}
              dir="rtl"
              required
            />
          </div>
        </div>
      );
    }

    if (selectedOption.type === "number") {
      return (
        <input
          type="number"
          name="value_en"
          value={form.value_en}
          onChange={handleInputChange}
          className={commonClass}
          placeholder={selectedOption.placeholder || "Enter number"}
          required
        />
      );
    }

    if (selectedOption.type === "image") {
      return (
        <div className="flex flex-col gap-2 w-full md:w-[70vw] lg:w-[50vw]">
          <label className="text-base font-medium text-gray-700">
            Upload Image <span className="text-red-500">*</span>
          </label>
          <ImageUploader
            endpoint="banners"
            initialImageUrl={form.value_en}
            onUploadComplete={handleImageUploadComplete}
            onUploadError={() => handleUploadError("image")}
            onDelete={() => setForm({ ...form, value_en: "" })}
          />
          {form.value_en && (
         
            
      
            <Image   src={form.value_en}
            alt="Uploaded image"
            className="mt-2 max-h-[200px] object-contain"/>
          )}
        </div>
      );
    }

    if (selectedOption.type === "video") {
      return (
        <div className="flex flex-col gap-2 w-full md:w-[70vw] lg:w-[50vw]">
          <label className="text-base font-medium text-gray-700">
            Upload Video <span className="text-red-500">*</span>
          </label>
          <UploadDropzone<OurFileRouter, "settings">
            endpoint="settings"
            onUploadBegin={() => {
              setIsUploading(true);
              setToast(null);
            }}
            onClientUploadComplete={handleVideoUploadComplete}
            onUploadError={() => handleUploadError("video")}
            appearance={{
              container:
                "flex flex-col items-center justify-center h-64 w-full text-center p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors",
              button:
                "bg-[#0f4473] hover:bg-[#236dae] text-white rounded-md px-4 py-2 mt-3 transition-colors",
              label: "text-gray-500",
            }}
            content={{
              label: ({ isDragActive }) => (
                <div className="flex flex-col items-center">
                  <div className="text-sm font-semibold">
                    {isDragActive ? "Drop the video" : "Drop video or click to browse"}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Allowed: video files (Max Size: 64MB)
                  </div>
                </div>
              ),
              allowedContent: null,
            }}
          />
          {form.value_en && (
            <video
              controls
              src={form.value_en}
              className="w-full rounded-lg border border-gray-300 mt-2"
            />
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <main className="ml-3 xl:ml-7 mb-7">
      <div className="flex flex-col justify-start items-start border-b border-gray-300 w-full md:w-[70vw] mb-7">
        <h1 className="text-lg md:text-2xl font-bold">Edit Setting</h1>
        <p className="text-sm md:text-base text-gray-500">ID: {setting.id}</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFormSubmit();
        }}
        className="flex flex-col gap-6 w-full md:w-[70vw]"
      >
        <Card>
          <CardHeader>
            <CardTitle>Edit Setting Details</CardTitle>
            <CardDescription>Update the fields below.</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-base font-medium text-gray-700">Setting Key</label>
              <Select value={form.key_name_en} disabled>
                <SelectTrigger className="w-full md:w-[70vw] lg:w-[50vw] border border-gray-300 text-black">
                  <SelectValue placeholder={form.key_name_en} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={form.key_name_en ?? ""}>{form.key_name_en}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-base font-medium text-gray-700">Value</label>
              {renderValueInput()}
            </div>

            <div className="flex gap-3 mt-4 justify-end">
              <button
                type="button"
                onClick={() => router.replace("/admin/dashboard/settings")}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#0f4473] text-white rounded hover:bg-[#236dae] cursor-pointer"
                disabled={isPending || isUploading}
              >
                {isPending ? "Updating..." : isUploading ? "Uploading..." : "Save Changes"}
              </button>
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

export default EditSettingForm;
