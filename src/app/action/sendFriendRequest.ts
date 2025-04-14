// app/actions/sendFriendRequest.ts
"use server";

import { prisma } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { RequestStatus } from "@prisma/client";

export async function sendFriendRequest(receiverId: string) {
  try {
    const { userId: senderId } = await verifyToken();

    // Validation checks
    if (senderId === receiverId) {
      throw new Error("Cannot send friend request to yourself");
    }

    const [existingRequest, reverseRequest] = await Promise.all([
      prisma.friendRequest.findUnique({
        where: { senderId_receiverId: { senderId, receiverId } },
      }),
      prisma.friendRequest.findUnique({
        where: { senderId_receiverId: { senderId: receiverId, receiverId: senderId } },
      }),
    ]);

    if (existingRequest) throw new Error("Friend request already sent.");
    if (reverseRequest) throw new Error("This user already sent you a friend request.");

    await prisma.friendRequest.create({
      data: { senderId, receiverId, status: RequestStatus.PENDING },
    });

    return { success: true, message: "Friend request sent successfully." };
  } catch (error) {
    console.error(error);
    throw new Error(error instanceof Error ? error.message : "Failed to send friend request.");
  }
}