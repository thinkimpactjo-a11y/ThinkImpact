import { z } from "zod";

export const newTrainingSchema = z.object({
  id: z.string().optional(),
  name_en: z
    .string()
    .min(1, "English name is required")
    .max(100, "English name must be at most 100 characters"),
  name_ar: z
    .string()
    .min(1, "Arabic name is required")
    .max(100, "Arabic name must be at most 100 characters"),
  description_en: z
    .string()
    .min(1, "English description is required")
    .max(2000, "English description must be at most 2000 characters"),
  description_ar: z
    .string()
    .min(1, "Arabic description is required")
    .max(2000, "Arabic description must be at most 2000 characters"),
});

export type NewTrainingSchema = z.infer<typeof newTrainingSchema>;
