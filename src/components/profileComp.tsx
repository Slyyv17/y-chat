"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProfileComponent() {
  const [username, setUsername] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  // Handle form submission (name & image update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", username || "");
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("/api/updateUser", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const updatedUser = await response.json();
      setUsername(updatedUser.name);
      // Do something else after the update (e.g., success notification)
    } catch (error) {
      console.error("Error updating user:", error);
      setErrorMessage("Failed to update profile.");
    }
  };

  return (
    <main className="w-full h-screen flex items-center justify-start gap-4 bg-gray-50 flex-col px-4">
      <div className="w-full flex items-start justify-start mt-2">
        <button className="text-[var(--color-bg)] bg-transparent p-2">
          <Link href="/chat-room">
            <ArrowLeft size={24} />
          </Link>
        </button>
      </div>

      {/* Profile Title Section */}
      <div className="w-full flex items-start justify-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800 font-body">Profile</h1>
      </div>

      {/* Profile Image Upload Section */}
      <section className="flex flex-col items-center mb-6 justify-center">
        <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden shadow-lg mb-4">
          <img
            src={image ? URL.createObjectURL(image) : "/assets/imgs/default.jpeg"}
            alt="Profile Image"
            className="w-full h-full object-cover"
          />
        </div>
        <input type="file" onChange={handleImageChange} />
      </section>

      {/* Name Edit Section */}
      <section className="flex flex-col items-center gap-2">
        <input
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
        />
        <span className="text-lg text-gray-700 font-display">Edit Name</span>
      </section>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="bg-[var(--color-bg)] text-[var(--color-primary)] font-semibold text-lg py-2 px-4 rounded-md font-display mt-4"
      >
        Update Profile
      </button>

      {/* Error Message Section */}
      {errorMessage && (
        <div className="mt-4 text-red-500">
          <p>{errorMessage}</p>
        </div>
      )}
    </main>
  );
}
