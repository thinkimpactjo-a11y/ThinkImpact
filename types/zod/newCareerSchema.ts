import { z } from "zod";

export const getNewCareerSchema = (isArabic: boolean) => {
  return z.object({
    first_name: z
      .string()
      .min(1, isArabic ? "الاسم الأول مطلوب" : "First name is required"),

    last_name: z
      .string()
      .min(1, isArabic ? "الاسم الأخير مطلوب" : "Last name is required"),

    email: z
      .string()
      .min(1, isArabic ? "البريد الإلكتروني مطلوب" : "Email is required")
      .email(isArabic ? "الرجاء إدخال بريد إلكتروني صالح" : "Please enter a valid email"),

    city: z
      .string()
      .min(1, isArabic ? "الدولة مطلوبة" : "Country is required"),

    phone_number: z
      .string()
      .min(8, isArabic ? "رقم الهاتف غير صالح" : "Invalid phone number"),

    cv: z
      .string()
      .min(1, isArabic ? "تحميل السيرة الذاتية مطلوب" : "CV upload is required")
      .refine(
        (val) => val.endsWith(".pdf") || val.startsWith("http"),
        isArabic
          ? "يجب أن تكون السيرة الذاتية ملف PDF أو رابط صالح"
          : "CV must be a PDF file or a valid URL"
      ),
  });
};

export type NewCareerFormType = z.infer<ReturnType<typeof getNewCareerSchema>>;
