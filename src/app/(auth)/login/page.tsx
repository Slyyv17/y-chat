"use client";

import { Mail, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/action/login";

export default function LoginUser() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formDataObj = new FormData(e.currentTarget); // Correctly use FormData
      const response = await loginUser(formDataObj); // Call server action properly

      if (response.error) {
        setError(response.error);
      } else {
        router.push("/dashboard"); // Redirect after successful login
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
            className="w-full p-3 border-b border-[var(--color-bg)] pr-10 focus:outline-none"
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
            className="w-full p-3 border-b border-[var(--color-bg)] pr-10 focus:outline-none"
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

        {error && <p className="text-red-500 text-sm font-display">{error}</p>}

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
            className="text-gray-500 font-semibold transition-all duration-300 hover:underline"
            href="/register"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
