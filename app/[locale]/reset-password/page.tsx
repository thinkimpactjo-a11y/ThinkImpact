"use client";
import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { useSearchParams, useRouter } from "next/navigation";

type ResetPasswordForm = {
  password: string;
  confirmPassword: string;
};

function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [form, setForm] = useState<ResetPasswordForm>({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (form.password !== form.confirmPassword) {
      setError("*Passwords Don't Match");
      return;
    }

    if (!token) {
      setError("Invalid or expired token.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/reset-password`, {
        token,
        newPassword: form.password,
      });
      setMessage("Password updated successfully. Redirecting to Login Page...");
      setTimeout(() => router.push("/admin/login"), 2000);
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      setError(axiosError.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <form
        className="max-w-lg mx-auto shadow-lg shadow-slate-500/50 p-7 rounded-lg bg-white dark:bg-gray-300 sm:w-11/12 md:w-1/2 lg:w-full mt-14"
        onSubmit={onSubmit}
      >
        <h1 className="text-2xl flex justify-center border-b-2 border-[#00ADEE] dark:text-black mb-4 pb-2">
          Reset Your Password
        </h1>

        <div className="relative mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            disabled={loading}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-8/12 right-3 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}
          </button>
        </div>

        <div className="relative mb-5">
          <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">
            Confirm Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            disabled={loading}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        {error && (
          <div className="text-red-500 mt-1 p-2.5 bg-red-50 mb-2 rounded-lg text-center">
            {error}
          </div>
        )}

        {message && (
          <div className="text-green-500 mt-1 p-2.5 bg-green-50 mb-2 rounded-lg text-center">
            {message}
          </div>
        )}

        <button
          disabled={loading}
          type="submit"
          className="text-white bg-[#00ADEE] hover:bg-[#125892] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center cursor-pointer"
        >
          {loading ? "Resetting..." : "Reset"}
        </button>

        <Link
          href="/admin/login"
          className="block pt-4 text-center text-sm text-[#125892] underline-offset-4 hover:underline m-2"
        >
          Back To Login
        </Link>
      </form>
    </main>
  );
}

export default ResetPasswordPage;
