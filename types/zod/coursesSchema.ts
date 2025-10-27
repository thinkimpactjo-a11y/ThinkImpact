import { z } from "zod";

// Zod schema for newCourse
export const newCourseSchema = z.object({
  id: z.string().optional(),

  title_en: z.string().min(1, "English title is required").max(200, "English title is too long"),
  title_ar: z.string().min(1, "Arabic title is required").max(200, "Arabic title is too long"),

  description_en: z.string().min(1, "English description is required").max(1000, "English description is too long"),
  description_ar: z.string().min(1, "Arabic description is required").max(1000, "Arabic description is too long"),

  target_audience_en: z.array(z.string().min(1, "Target audience item cannot be empty")).min(1, "At least one target audience required"),
  target_audience_ar: z.array(z.string().min(1, "Target audience item cannot be empty")).min(1, "At least one target audience required"),

  delivery_method_en: z.array(z.string().min(1, "Delivery method item cannot be empty")).min(1, "At least one delivery method required"),
  delivery_method_ar: z.array(z.string().min(1, "Delivery method item cannot be empty")).min(1, "At least one delivery method required"),

  duration_en: z.string().min(1, "English duration is required"),
  duration_ar: z.string().min(1, "Arabic duration is required"),

  training_id: z.string().min(1, "Training must be selected"),
  image: z.string().url("Image must be a valid URL"), // if image is optional, otherwise remove .optional()
});

// Type-safe inference
export type newCourseType = z.infer<typeof newCourseSchema>;
