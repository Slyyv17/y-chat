// app/actions/updateUser.ts
'use server';

import { prisma } from '@/lib/db';

export const updateUser = async (userId: string, formData: FormData) => {
  try {
    console.log('Updating user with ID:', userId);

    // Extract fields from FormData
    const name = formData.get('name') as string;
    const profileImageFile = formData.get('profileImage') as File | null;

    if (!name || typeof name !== 'string') {
      throw new Error('Invalid or missing name');
    }

    let profileImageUrl: string | null = null;

    // Handle file upload (if applicable)
    if (profileImageFile) {
      try {
        profileImageUrl = await uploadFileToStorage(profileImageFile);
        console.log('Uploaded profile image URL:', profileImageUrl);
      } catch (uploadError) {
        console.error('Error uploading profile image:', uploadError);
        throw new Error('Failed to upload profile image');
      }
    }

    // Update the user in the database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        profileImage: profileImageUrl || undefined, // Use existing image if no new file is uploaded
      },
    });

    console.log('User updated successfully:', updatedUser);
    return updatedUser;
  } catch (error) {
    console.error('Error updating user profile:', error);

    // Rethrow the error with a more specific message
    if (error instanceof Error) {
      throw new Error(`Failed to update profile: ${error.message}`);
    } else {
      throw new Error('An unexpected error occurred while updating the profile');
    }
  }
};

// Example function to upload file to storage (replace with your actual implementation)
async function uploadFileToStorage(file: File): Promise<string> {
  // Implement your file upload logic here (e.g., using AWS S3, Cloudinary, etc.)
  // For now, return a placeholder URL
  return `/uploads/${file.name}`;
}