"use client";

import { Mail, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { loginUser } from "@/app/action/login";

export default function LoginUser() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formDataObj = new FormData(e.currentTarget);
      const response = await loginUser(formDataObj);

      if (response?.error) {
        setError(response.error);
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-6 w-full max-w-md p-6 bg-[var(--color-primary)] shadow-md rounded-lg"
      >
        <h1 className="text-lg font-semibold text-center text-[var(--color-bg)] font-body">
          <span className="text-[var(--color-secondary)]">Welcome Back!</span> Connect with friends.
        </h1>

        <div className="relative w-full font-display">
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border-b border-[var(--color-bg)] pr-10 focus:outline-none bg-transparent text-[var(--color-bg)]"
            required
          />
          <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--color-secondary)]" size={18} />
        </div>

        <div className="relative w-full font-display">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border-b border-[var(--color-bg)] pr-10 focus:outline-none bg-transparent text-[var(--color-bg)]"
            required
          />
          {showPassword ? (
            <EyeOff
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--color-secondary)] cursor-pointer"
              size={18}
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <Eye
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--color-secondary)] cursor-pointer"
              size={18}
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        {error && (
          <div className="w-full p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            <p className="font-semibold">Error Details:</p>
            <p className="text-sm">{error}</p>
            <p className="text-xs mt-2">
              Check browser console (F12) for more information
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 font-display bg-[var(--color-bg)] text-[var(--color-primary)] font-semibold rounded-md hover:bg-opacity-90 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <div className="flex justify-between w-full text-sm font-display">
          <p className="text-gray-500">Don&apos;t have an account?</p>
          <Link
            className="text-gray-500 font-semibold transition-all duration-300 hover:underline hover:text-[var(--color-secondary)]"
            href="/register"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}