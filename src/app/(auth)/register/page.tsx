"use client";

import { Mail, Eye, EyeOff, User } from "lucide-react";
import { useState } from "react";
import { registerUser } from "../../action/register";
import Link from "next/link";

export default function RegisterUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("password", formData.password);

    const res = await registerUser(form);
    setMessage(res.error ?? res.success ?? "");

    setLoading(false);

    if (res.success) {
      setFormData({ name: "", email: "", password: "" });
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-6 w-full max-w-md p-6 bg-[var(--color-primary)] shadow-md rounded-lg"
      >
        <h1 className="text-lg font-semibold text-center text-[var(--color-bg)] font-body">
          <span className="text-[var(--color-secondary)]">Hello!</span> New user, sign up to use the app
        </h1>

        {/* Name Input */}
        <div className="relative w-full font-display">
          <input
            type="text"
            name="name"
            placeholder="Username"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border-b border-[var(--color-bg)] pr-10 focus:outline-none"
          />
          <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--color-secondary)]" size={18} />
        </div>

        {/* Email Input */}
        <div className="relative w-full font-display">
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border-b border-[var(--color-bg)] pr-10 focus:outline-none"
          />
          <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--color-secondary)]" size={18} />
        </div>

        {/* Password Input */}
        <div className="relative w-full font-display">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border-b border-[var(--color-bg)] pr-10 focus:outline-none"
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[var(--color-bg)] font-display text-[var(--color-primary)] font-semibold rounded-md hover:bg-opacity-90 transition cursor-pointer"
        >
          {loading ? "Registering..." : "Sign Up"}
        </button>

        {/* Message */}
        {message && <p className="text-sm text-center text-black">{message}</p>}
        <div className="w-full flex justify-between items-center font-display">
          <p className="text-gray-500"> Already have an account?</p>
          <Link className="text-gray-500 font-semibold capitalize hover:underline duration-300 transition-all" href="/login"> login</Link>
        </div>
      </form>
    </div>
  );
}
