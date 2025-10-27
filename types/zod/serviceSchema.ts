// zodSchemas.ts
import { z } from "zod";

export const newServiceSchema = z.object({
  id: z.string().optional(),
  name_en: z.string().min(1, "English name is required"),
  name_ar: z.string().min(1, "Arabic name is required"),
  description_en: z.string().min(1, "English description is required"),
  description_ar: z.string().min(1, "Arabic description is required"),
  category_id: z.string().min(1, "Category is required"),
  image: z.string().optional(), // optional or empty string
});

