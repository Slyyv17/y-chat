"use server";

import { prisma } from "@/lib/db";

export async function updateProfile(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const profileImage = formData.get("profileImage") as string;

        await prisma.user.update({
            where: { id: formData.get("id") as string },
            data: {
                name,
                profileImage,
            }
        })
    } catch (error) {
        console.error(error);
        return { error: "Failed to update profile." };
    }
}