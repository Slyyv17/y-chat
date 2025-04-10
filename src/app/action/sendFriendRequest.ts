// app/actions/sendFriendRequest.ts
"use server";

import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { RequestStatus } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");

type DecodedToken = {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
};

function verifyToken(): DecodedToken {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  
  if (!token) {
    throw new Error("Not authenticated");
  }

  try {
    const secret = JWT_SECRET as string;
    const decoded = jwt.verify(token, secret);
    
    if (typeof decoded === "string" || !decoded.userId) {
      throw new Error("Invalid token structure");
    }

    return decoded as unknown as DecodedToken;
  } catch (error) {
    console.error("Token verification failed:", error);
    throw new Error("Invalid or expired token");
  }
}

export async function sendFriendRequest(receiverId: string) {
  try {
    const { userId: senderId } = verifyToken();

    // Validation checks
    if (senderId === receiverId) {
      throw new Error("Cannot send friend request to yourself");
    }

    const [sender, receiver] = await Promise.all([
      prisma.user.findUnique({ where: { id: senderId } }),
      prisma.user.findUnique({ where: { id: receiverId } }),
    ]);

    if (!sender || !receiver) {
      throw new Error("User not found");
    }

    // Check for existing requests
    const [existingRequest, reverseRequest] = await Promise.all([
      prisma.friendRequest.findUnique({
        where: { senderId_receiverId: { senderId, receiverId } }
      }),
      prisma.friendRequest.findUnique({
        where: { senderId_receiverId: { senderId: receiverId, receiverId: senderId } }
      })
    ]);

    if (existingRequest) {
      throw new Error("Friend request already sent!");
    }

    if (reverseRequest) {
      throw new Error("This user already sent you a friend request!");
    }

    // Create new request
    await prisma.friendRequest.create({
      data: {
        senderId,
        receiverId,
        status: RequestStatus.PENDING,
      },
    });

    return { success: true, message: "Friend request sent!" };
  } catch (error) {
    console.error(error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to send friend request."
    );
  }
}