// app/actions/friendActions.ts
"use server";
import { prisma } from "@/lib/db";
import { RequestStatus } from "@prisma/client";
import { getToken, verifyToken } from "./getUsers"; // Import verifyToken

export async function acceptFriendRequest(requestId: string) {
  try {
    const token = await getToken(); // Await getToken
    if (!token) throw new Error("Not authenticated");
    const { userId } = await verifyToken(token); // Await verifyToken
    const request = await prisma.friendRequest.findUnique({
      where: { id: requestId },
      include: { sender: true, receiver: true },
    });
    if (!request || request.receiverId !== userId) {
      throw new Error("Invalid friend request");
    }
    // Sort IDs to prevent duplicate friendships
    const [user1Id, user2Id] = [request.senderId, request.receiverId].sort();
    await prisma.$transaction([
      prisma.friendRequest.update({
        where: { id: requestId },
        data: { status: RequestStatus.ACCEPTED },
      }),
      prisma.friends.create({
        data: {
          user1Id,
          user2Id,
        },
      }),
    ]);
    return { success: true, message: "Friend request accepted!" };
  } catch (error) {
    console.error(error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to accept request"
    );
  }
}

// Similarly update other functions (rejectFriendRequest, getFriends, etc.)

export async function getFriends() {
  try {
    const token = getToken();
    if (!token) return [];
    const { userId } = verifyToken(token);
    const friendships = await prisma.friends.findMany({
      where: {
        OR: [{ user1Id: userId }, { user2Id: userId }],
      },
      include: {
        user1: true,
        user2: true,
      },
    });
    return friendships.map((f) =>
      f.user1Id === userId ? f.user2 : f.user1
    );
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function rejectFriendRequest(requestId: string) {
  try {
    const token = getToken();
    if (!token) throw new Error("Not authenticated");
    const { userId } = verifyToken(token);
    const request = await prisma.friendRequest.findUnique({
      where: { id: requestId },
    });
    if (!request || request.receiverId !== userId) {
      throw new Error("Invalid friend request");
    }
    await prisma.friendRequest.delete({
      where: { id: requestId },
    });
    return { success: true, message: "Friend request rejected!" };
  } catch (error) {
    console.error(error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to reject request"
    );
  }
}

// Add this export for sendFriendRequest
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
        where: { senderId_receiverId: { senderId, receiverId } },
      }),
      prisma.friendRequest.findUnique({
        where: { senderId_receiverId: { senderId: receiverId, receiverId: senderId } },
      }),
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