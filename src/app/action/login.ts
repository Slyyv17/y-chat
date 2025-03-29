"use server";

import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");

export async function loginUser(formData: FormData) {
  try {
    console.log("[LOGIN] Starting login process");
    
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is undefined in environment variables");
    }

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log("[LOGIN] Received credentials:", { email, password: password ? "*****" : "empty" });

    if (!email || !password) {
      console.log("[LOGIN] Missing credentials");
      return { error: "Email and password are required" };
    }

    console.log("[LOGIN] Searching user in database");
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      console.log("[LOGIN] No user found for email:", email);
      return { error: "Invalid credentials" };
    }

    console.log("[LOGIN] Comparing passwords");
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
      console.log("[LOGIN] Password mismatch for user:", user.id);
      return { error: "Invalid credentials" };
    }

    console.log("[LOGIN] Generating JWT token");
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    console.log("[LOGIN] Setting cookie");
    // In login.ts
    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 15,
      path: "/",
      domain: "localhost" // Add for local development
    });

    console.log("[LOGIN] Redirecting to /chat-room");
    return redirect("/chat-room");
  } catch (error) {
    console.error("[LOGIN ERROR]", error);
  
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error; // Allow Next.js to handle redirects
    }
  
    return { error: "Invalid credentials" }; // Generic message
  }
}
