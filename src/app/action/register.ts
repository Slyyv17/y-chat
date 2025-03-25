
"use server";

import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!name || !email || !password) {
            return { error: "Please fill in all fields" };
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return { error: "User already exists" };
        }

        // for encrypted password
        const hashPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword,
            },
        });
        return { success: "User registered successfully" };
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong" };
    }
}