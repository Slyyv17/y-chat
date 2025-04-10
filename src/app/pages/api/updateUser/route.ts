// pages/api/updateUser.ts

import { prisma } from "@/lib/db"; // Import your Prisma client
import type { NextApiRequest, NextApiResponse } from "next";

// API route to handle user update
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { name, image } = req.body; // Get the name and image from the request body
      const userId = "user-id"; // Replace with the actual user's ID from session or JWT token

      let profileImage = "/assets/imgs/default.jpeg"; // Default image
      if (image) {
        // Handle image upload logic (e.g., upload to cloud storage, save URL)
        profileImage = "/uploads/" + image.name; // Replace with actual upload logic
      }

      // Update user in the database
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          name: name || undefined,
          profileImage,
        },
      });

      res.status(200).json(updatedUser); // Send back the updated user
    } catch (error) {
      console.error("Failed to update user:", error);
      res.status(500).json({ error: "Failed to update user" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
