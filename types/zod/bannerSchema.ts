import { z } from "zod";

export const bannerSchema = z.object({
  alt: z
    .string()
    .min(1, { message: "Alt text is required" })
    .max(100, { message: "Alt text must be less than 100 characters" }),

  description_en: z
    .string()
    .min(1, { message: "English description is required" })
    .max(150, { message: "Description too long (should be less than 150)" }),

  description_ar: z
    .string()
    .min(1, { message: "Arabic description is required" })
    .max(150, { message: "Description too long (should be less than 150)" }),

  image: z
    .string()
    .url({ message: "Invalid image URL" })
    .optional()
    .or(z.literal("").optional())
    .or(z.null())
});

export type BannerSchema = z.infer<typeof bannerSchema>;
