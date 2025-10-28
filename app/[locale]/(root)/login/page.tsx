"use client";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Head from "next/head";
import { getLoginSchema } from "@/types/zod/loginSchema";
import { useLocale } from "next-intl";

type loginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const router = useRouter();
  const [form, setForm] = useState<loginForm>({ password: "", email: "" });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const loginSchema = getLoginSchema(isArabic);
    const result = loginSchema.safeParse(form);

    if (!result.success) {
      setError(result.error.issues [0].message);
      setLoading(false);
      setTimeout(() => setError(""), 3000);
      return;
    }

    const valid = await signIn("credentials", {
      password: form.password,
      email: form.email,
      redirect: false,
    });

    if (valid?.ok === true) {
      router.push("/");
    } else {
      setError(
        isArabic
          ? "البريد الإلكتروني أو كلمة المرور غير صحيحة."
          : "Invalid email or password. Please try again."
      );
      setLoading(false);
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <>
      <Head>
        <title>{isArabic ? "تسجيل الدخول - ثينك إمباكت" : "Login - Think Impact"}</title>
        <meta
          name="description"
          content={
            isArabic
              ? "سجل الدخول إلى حسابك في ثينك إمباكت لإدارة لوحة التحكم والوصول إلى الميزات."
              : "Login to your Think Impact account to manage dashboard and access features."
          }
        />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_APP_URL + "/login"} />
        <meta
          property="og:title"
          content={isArabic ? "تسجيل الدخول - ثينك إمباكت" : "Login - Think Impact"}
        />
        <meta
          property="og:description"
          content={
            isArabic
              ? "سجل الدخول إلى حسابك في ثينك إمباكت لإدارة لوحة التحكم والوصول إلى الميزات."
              : "Login to your Think Impact account to manage dashboard and access features."
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_APP_URL + "/login"} />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_APP_URL + "/images/logo.png"}
        />
        <meta property="og:site_name" content="Think Impact" />
      </Head>

      <main>
        <form
          className="max-w-sm mx-auto shadow-lg shadow-slate-500/50 p-7 rounded-lg bg-white dark:bg-gray-300 h-1/2 sm:w-11/12 md:w-1/2 lg:w-1/2 mt-28 mb-12"
          onSubmit={onSubmit}
          dir={isArabic ? "rtl" : "ltr"}
        >
          <h1 className="text-2xl flex justify-center border-b-2 border-[#00ADEE] mb-4 pb-2 dark:text-black">
            {isArabic ? "تسجيل الدخول" : "Login"}
          </h1>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              {isArabic ? "البريد الإلكتروني" : "Email"}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-300 dark:border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="relative mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              {isArabic ? "كلمة المرور" : "Password"}
            </label>
            <input
              type={!showPassword ? "password" : "text"}
              id="password"
              name="password"
              className="bg-gray-50 border border-gray-300 dark:border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={form.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-8/12 end-3 -translate-y-1/2 text-gray-500"
            >
              {!showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          {error && (
            <div className="text-red-500 mt-1 p-2.5 bg-red-50 mb-2 rounded-lg flex justify-center">
              {error}
            </div>
          )}

          <button
            disabled={loading}
            type="submit"
            className="text-white bg-[#00ADEE] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center cursor-pointer"
          >
            {loading
              ? isArabic
                ? "جاري تسجيل الدخول..."
                : "Logging in..."
              : isArabic
              ? "تسجيل الدخول"
              : "Login"}
          </button>

          <Link
            href="/forgot-password"
            className="block pt-4 text-center text-sm text-primary underline-offset-4 hover:underline m-2 dark:text-black"
          >
            {isArabic ? "نسيت كلمة المرور؟" : "Forgot your password?"}
          </Link>

          <Link
            href="/"
            className="block pt-4 text-center text-sm underline-offset-4 hover:underline m-2 text-[#125892]"
          >
            {isArabic ? "العودة إلى الصفحة الرئيسية" : "Back To Home Page"}
          </Link>
        </form>
      </main>
    </>
  );
};

export default Login;
