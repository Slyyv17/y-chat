'use client';

import { useState } from 'react';
import { updateUser } from '@/app/action/updateUser'; // Adjust the path as necessary

interface ProfilePageProps {
  userId: string;
  currentName: string;
  currentProfileImage: string; // Add type for currentProfileImage
}

const ProfilePage = ({ userId, currentName = '', currentProfileImage }: ProfilePageProps) => {
  const [name, setName] = useState(currentName);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle image input change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);

      // Create an object URL to display the image preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
    }
  };

  // Handle form submit
const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
  setLoading(true);

  const formData = new FormData();
  formData.append('name', name);

  // Append the profile image if it exists
  if (profileImage) {
    formData.append('profileImage', profileImage);
  }

  try {
    const updatedUser = await updateUser(userId, formData);
    console.log('User updated:', updatedUser);
    setLoading(false);
  } catch (err) {
    setLoading(false);
    setError('Failed to update profile. Please try again.');
    console.error(err);
  }
};

  // Default image path (assuming it's in the public folder)
  const defaultImage = '/assets/imgs/default.jpeg';

  // Determine the image to display
  const imageToDisplay = previewImage || currentProfileImage || defaultImage;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-6">Update Profile</h1>
      <form onSubmit={handleSubmit}>
        {/* Display image preview or default image */}
        <div className="mb-4 text-center">
          <img
            src={imageToDisplay}
            alt="Selected Profile"
            className="w-32 h-32 object-cover rounded-full mx-auto"
          />
        </div>

        {/* Name input */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter new name"
            required
          />
        </div>

        {/* Profile Image upload */}
        <div className="mb-6">
          <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">Profile Image</label>
          <input
            type="file"
            id="profileImage"
            onChange={handleImageChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Submit button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </div>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default ProfilePage;