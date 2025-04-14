// app/utils/authUtils.ts
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");

export type DecodedToken = {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
};

// Function to retrieve the token from cookies
export async function getToken(): Promise<string | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    return token || null;
  } catch (error) {
    console.error("Cookie access error:", error);
    return null;
  }
}

// Function to verify the token and decode its payload
export async function verifyToken(): Promise<DecodedToken> {
  try {
    const token = await getToken(); // Use the getToken function defined above
    if (!token) {
      throw new Error("Not authenticated");
    }

    const decoded = jwt.verify(token, JWT_SECRET as string);
    if (typeof decoded === "string" || !decoded.userId) {
      throw new Error("Invalid token structure");
    }

    return decoded as unknown as DecodedToken;
  } catch (error) {
    console.error("Token verification failed:", error);
    throw new Error("Invalid or expired token");
  }
}