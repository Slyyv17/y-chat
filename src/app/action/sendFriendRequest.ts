// app/actions/sendFriendRequest.ts
"use server";

import { prisma } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { RequestStatus } from "@prisma/client";

export async function sendFriendRequest(receiverId: string) {
  try {
    const { userId: senderId } = verifyToken();

    // Validation checks
    if (senderId === receiverId) throw new Error("Cannot send friend request to yourself.");

    // Check if users exist
    const [sender, receiver] = await Promise.all([
      prisma.user.findUnique({ where: { id: senderId } }),
      prisma.user.findUnique({ where: { id: receiverId } }),
    ]);
    if (!sender || !receiver) throw new Error("User not found.");

    // Check for existing requests
    const [existingRequest, reverseRequest] = await Promise.all([
      prisma.friendRequest.findUnique({
        where: { senderId_receiverId: { senderId, receiverId } },
      }),
      prisma.friendRequest.findUnique({
        where: { senderId_receiverId: { senderId: receiverId, receiverId: senderId } },
      }),
    ]);

    if (existingRequest) throw new Error("Friend request already sent.");
    if (reverseRequest) throw new Error("This user has already sent you a friend request.");

    // Create new request
    await prisma.friendRequest.create({
      data: { senderId, receiverId, status: RequestStatus.PENDING },
    });

    return { success: true, message: "Friend request sent successfully." };
  } catch (error) {
    console.error(error);
    throw new Error(error instanceof Error ? error.message : "Failed to send friend request.");
  }
}