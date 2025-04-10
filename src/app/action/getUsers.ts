// app/actions/getUsers.ts
"use server";

import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");

// Type for decoded token
type DecodedToken = {
  userId: string;
  email: string;
  iat: number;
  exp: number;
};

// Get token with proper Next.js cookie handling
function getToken() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    return token || null;
  } catch (error) {
    console.error("Cookie access error:", error);
    return null;
  }
}

// JWT verification with proper secret handling
function verifyToken(token: string): DecodedToken {
  try {
    // Explicit type assertion for secret
    const secret = JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as DecodedToken;
    
    if (!decoded.userId) {
      throw new Error("Invalid token payload");
    }
    
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error);
    throw new Error("Authentication failed");
  }
}

export async function getUsers() {
  try {
    const token = getToken();
    if (!token) return [];

    const { userId } = verifyToken(token);
    
    const users = await prisma.user.findMany({
      where: {
        NOT: { id: userId },
        receivedRequests: {
          none: {
            senderId: userId,
            status: "PENDING"
          }
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        profileImage: true
      }
    });

    return users;
  } catch (error) {
    console.error("Get users error:", error);
    return [];
  }
}

export async function getCurrentUser() {
  try {
    const token = getToken();
    if (!token) return null;

    const { userId } = verifyToken(token);
    
    return await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        profileImage: true
      }
    });
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
}