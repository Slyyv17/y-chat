// app/actions/rejectFriendRequest.ts
"use server";

import { prisma } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function rejectFriendRequest(requestId: string) {
  try {
    const { userId: receiverId } = verifyToken();

    const request = await prisma.friendRequest.findUnique({ where: { id: requestId } });
    if (!request || request.receiverId !== receiverId) throw new Error("Invalid friend request.");

    await prisma.friendRequest.delete({ where: { id: requestId } });

    return { success: true, message: "Friend request rejected successfully." };
  } catch (error) {
    console.error(error);
    throw new Error(error instanceof Error ? error.message : "Failed to reject request.");
  }
}