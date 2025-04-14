// app/actions/getFriends.ts
"use server";

import { prisma } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function getFriends() {
  try {
    const { userId } = verifyToken();

    const friendships = await prisma.friends.findMany({
      where: { OR: [{ user1Id: userId }, { user2Id: userId }] },
      include: { user1: true, user2: true },
    });

    return friendships.map((f) => (f.user1Id === userId ? f.user2 : f.user1));
  } catch (error) {
    console.error(error);
    return [];
  }
}