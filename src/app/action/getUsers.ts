// ../action/getUsers.ts
"use server";

import { prisma } from "@/lib/db";

export async function getUsers() {
    try {
        const users = await prisma.user.findMany();
        return users;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch users.");
    }
}

export async function sendFriendRequest(senderId: string, receiverId: string) {
    try {
        // Check if sender and receiver exist
        const sender = await prisma.user.findUnique({ where: { id: senderId } });
        const receiver = await prisma.user.findUnique({ where: { id: receiverId } });

        if (senderId === receiverId) {
            throw new Error("Cannot send friend request to yourself");
        }

        if (!sender || !receiver) {
            throw new Error("Sender or receiver does not exist.");
        }

        // Check if a friend request already exists
        const existingRequest = await prisma.friendRequest.findUnique({
            where: {
                senderId_receiverId: {
                    senderId,
                    receiverId,
                },
            },
        });

        if (existingRequest) {
            throw new Error("Friend request already sent!");
        }

        // Create a new friend request
        await prisma.friendRequest.create({
            data: {
                senderId,
                receiverId,
                status: "PENDING",
            },
        });

        return { success: true, message: "Friend request sent!" };
    } catch (error) {
        console.error(error);
        throw new Error("Failed to send friend request.");
    }
}