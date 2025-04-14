// app/utils/authUtils.ts
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET not configured");

export type DecodedToken = {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
};

export function verifyToken(): DecodedToken {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) throw new Error("Not authenticated");

    const decoded = jwt.verify(token, JWT_SECRET as string);
    if (typeof decoded === "string" || !decoded.userId) {
      throw new Error("Invalid token structure");
    }

    return decoded as unknown as DecodedToken;
  } catch (error) {
    console.error("[AUTH] Token verification failed:", error);
    throw new Error("Invalid or expired token");
  }
}