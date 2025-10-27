import { z } from "zod";

export const newMemberSchema = z.object({
  id: z.string().optional(),
  name_en: z.string().min(1, "English name is required"),
  name_ar: z.string().min(1, "Arabic name is required"),
  position_en: z.string().min(1, "English position is required"),
  position_ar: z.string().min(1, "Arabic position is required"),
  description_en: z.string().min(1, "English description is required"),
  description_ar: z.string().min(1, "Arabic description is required"),
  image: z.string().min(1, "Member image is required"),
  display_order: z.number().optional(),
  main: z.boolean(),
});
