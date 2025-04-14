// app/actions/acceptFriendRequest.ts
"use server";

import { prisma } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { RequestStatus } from "@prisma/client";

export async function acceptFriendRequest(requestId: string) {
  try {
    const { userId: receiverId } = verifyToken();

    const request = await prisma.friendRequest.findUnique({
      where: { id: requestId },
      include: { sender: true, receiver: true },
    });

    if (!request || request.receiverId !== receiverId) throw new Error("Invalid friend request.");

    // Sort IDs to prevent duplicate friendships
    const [user1Id, user2Id] = [request.senderId, request.receiverId].sort();

    await prisma.$transaction([
      prisma.friendRequest.update({
        where: { id: requestId },
        data: { status: RequestStatus.ACCEPTED },
      }),
      prisma.friends.create({
        data: { user1Id, user2Id },
      }),
    ]);

    return { success: true, message: "Friend request accepted successfully." };
  } catch (error) {
    console.error(error);
    throw new Error(error instanceof Error ? error.message : "Failed to accept request.");
  }
}