// app/actions/getPendingRequests.ts
"use server";

import { prisma } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function getPendingRequests() {
  try {
    const { userId } = verifyToken();

    const pendingRequests = await prisma.friendRequest.findMany({
      where: { receiverId: userId, status: "PENDING" },
      include: { sender: true }, // Include sender details for display
    });

    return pendingRequests;
  } catch (error) {
    console.error(error);
    return [];
  }
}