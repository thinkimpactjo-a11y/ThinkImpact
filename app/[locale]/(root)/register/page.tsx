"use client";
import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Head from "next/head";
import { getRegisterSchema, type RegisterFormType } from "@/types/zod/registerSchema";
import { useLocale } from "next-intl";

const RegisterPage = () => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const router = useRouter();
  const registerSchema = getRegisterSchema(isArabic);
  const [form, setForm] = useState<RegisterFormType>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const result = registerSchema.safeParse(form);

    if (!result.success) {
      setError(result.error.errors[0].message);
      setLoading(false);
      setTimeout(() => setError(""), 3000);
      return;
    }

    setError("");

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/users/register`, {
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        password: form.password,
      });

      const loginResult = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (loginResult?.ok) {
        router.push("/");
      } else {
        setError(isArabic ? "فشل تسجيل الدخول بعد التسجيل." : "Failed to login after registration.");
        setLoading(false);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || (isArabic ? "فشل التسجيل." : "Registration failed."));
      } else {
        setError(isArabic ? "حدث خطأ غير متوقع." : "An unexpected error occurred.");
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{isArabic ? "تسجيل حساب جديد - ثينك إمباكت" : "Register - Think Impact"}</title>
        <meta
          name="description"
          content={
            isArabic
              ? "سجل حساب جديد في ثينك إمباكت لإدارة لوحة التحكم والوصول إلى الميزات."
              : "Register a new account on Think Impact to manage dashboard and access features."
          }
        />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_APP_URL + "/register"} />
      </Head>

      <main className="flex justify-center items-center mt-24 mb-14" dir={isArabic ? "rtl" : "ltr"}>
        <form
          className="max-w-sm w-full sm:w-11/12 md:w-1/2 lg:w-1/2 p-7 rounded-lg bg-white shadow-lg shadow-slate-500/50 dark:bg-gray-300"
          onSubmit={onSubmit}
        >
          <h1 className="text-2xl flex justify-center border-b-2 border-[#00ADEE] mb-4 pb-2 dark:text-black">
            {isArabic ? "إنشاء حساب" : "Register"}
          </h1>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              {isArabic ? "الاسم الأول" : "First Name"}
            </label>
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              {isArabic ? "اسم العائلة" : "Last Name"}
            </label>
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              {isArabic ? "البريد الإلكتروني" : "Email"}
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="relative mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              {isArabic ? "كلمة المرور" : "Password"}
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-8/12 end-3 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeIcon className="h-5 w-5 cursor-pointer" /> : <EyeSlashIcon className="h-5 w-5 cursor-pointer" />}
            </button>
          </div>

          <div className="relative mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              {isArabic ? "تأكيد كلمة المرور" : "Confirm Password"}
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-8/12 end-3 -translate-y-1/2 text-gray-500 cursor-pointer"
            >
              {showPassword ? <EyeIcon className="h-5 w-5 cursor-pointer" /> : <EyeSlashIcon className="h-5 w-5 cursor-pointer" />}
            </button>
          </div>

          {error && (
            <div className="text-red-500 mt-1 p-2.5 bg-red-50 mb-2 rounded-lg">
              {error}
            </div>
          )}

          <button
            disabled={loading}
            type="submit"
            className="w-full px-5 py-2.5 cursor-pointer text-sm font-medium text-white bg-[#125892] rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            {loading ? (isArabic ? "جارٍ إنشاء الحساب..." : "Creating account...") : isArabic ? "إنشاء" : "Create"}
          </button>

          <Link
            href="/"
            className="block pt-4 text-center text-sm text-[#125892] cursor-pointer underline-offset-4 hover:underline m-2"
          >
            {isArabic ? "العودة إلى الصفحة الرئيسية" : "Back To Home Page"}
          </Link>
        </form>
      </main>
    </>
  );
};

export default RegisterPage;
