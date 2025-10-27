import { z } from "zod";

export const categorySchema = z.object({
  id: z.string().optional(),

 slug: z.string().optional(), 

  category_name_en: z
    .string()
    .min(2, "English name must be at least 2 characters long")
    .max(100, "English name is too long"),

  category_name_ar: z
    .string()
    .min(2, "Arabic name must be at least 2 characters long")
    .max(100, "Arabic name is too long"),

  description_en: z
    .string()
    .min(10, "English description must be at least 10 characters long")
    .max(1000, "English description is too long"),

  description_ar: z
    .string()
    .min(10, "Arabic description must be at least 10 characters long")
    .max(1000, "Arabic description is too long"),

  category_logo: z
    .string()
    .url("Category logo must be a valid URL")
    .nullable()
    .or(z.literal("")), 
});

export type CategorySchema = z.infer<typeof categorySchema>;
