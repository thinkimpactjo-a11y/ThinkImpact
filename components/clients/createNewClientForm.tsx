"use client";
import { newClient } from "@/types";
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
import { newClientSchema } from "@/types/zod/clientsSchema";

interface Props {
  action: (data: newClient) => Promise<void>;
}

export default function AddClientForm({ action }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<newClient>({
    name: "",
    logo: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear field error
  };

  const handleUploadComplete = (url: string) => {
    setForm({ ...form, logo: url });
    setErrors({ ...errors, logo: "" });
  };

  const handleUploadError = (error: Error) => {
    setToast({ message: `Upload failed: ${error.message}`, type: "error" });
    setTimeout(() => setToast(null), 3000);
  };

  const handleImageDelete = () => {
    setForm({ ...form, logo: "" });
  };

  const handleFormSubmit = () => {
    startTransition(true);
    try {
      // Validate with Zod
      newClientSchema.parse(form);
      setErrors({}); // clear previous errors

      action({ ...form })
        .then(() => {
          setToast({ message: "Client added successfully!", type: "success" });
          setTimeout(() => {
            setToast(null);
            router.replace("/admin/dashboard/clients");
          }, 1500);
        })
        .catch(() => {
          setToast({ message: "Failed to add Client.", type: "error" });
          setTimeout(() => setToast(null), 3000);
        })
        .finally(() => startTransition(false));
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        setToast({ message: "Failed to add Client.", type: "error" });
      }
      setTimeout(() => setToast(null), 3000);
      startTransition(false);
    }
  };

  return (
    <main className="ml-3 xl:ml-7 mb-7">
      <div className="flex flex-col justify-start items-start border-b border-gray-500 w-[70vw] mb-7">
        <h1 className="text-lg md:text-2xl font-bold">Add New Client</h1>
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
            <CardTitle>New Client Details</CardTitle>
            <CardDescription>
              Fill out the required fields below to create a new Client.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-start gap-5 mb-7">
            {/* Name Field */}
            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                className={`border px-2 py-1 rounded w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[20vw] h-[5vh] text-black ${
                  errors.name ? "border-red-600" : "border-black"
                }`}
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Logo Field */}
            <div className="flex flex-col w-full max-w-sm">
              <label className="text-base text-black mb-1">Client Logo</label>
              <ImageUploader
                endpoint="ourClients"
                initialImageUrl={form.logo}
                onUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
                onDelete={handleImageDelete}
              />
              {errors.logo && <p className="text-red-600 text-sm mt-1">{errors.logo}</p>}
            </div>

            {/* Buttons */}
            <div className="w-full flex justify-center mt-5">
              <div className="flex flex-row gap-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                  onClick={() => router.replace("/admin/dashboard/clients")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#125892] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-[#0f4473]"
                  disabled={isPending}
                >
                  {isPending ? "Adding..." : "Add Client"}
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
