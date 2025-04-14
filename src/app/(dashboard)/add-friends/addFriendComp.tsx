// app/components/AddFriendComponent.tsx
"use client";

import { useState, useEffect } from "react";
import { getUsers, getCurrentUser } from "@/app/action/getUsers";
import { sendFriendRequest } from "@/app/action/sendFriendRequest";
// import { MessageCircle } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
}

export default function AddFriendComponent() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getCurrentUser();
        if (!user) return;
        setCurrentUser(user);
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddFriend = async (receiverId: string) => {
    if (!currentUser) return;
    try {
      const result = await sendFriendRequest(receiverId);
      alert(result.message);
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : "Failed to send friend request.");
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <main className="w-full min-h-screen flex flex-col gap-6 p-6 bg-gray-50">
      <h1 className="text-2xl font-semibold text-center text-gray-800">Registered Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.id} className="p-4 bg-white rounded-lg shadow-md text-center">
            <img
              src={user.profileImage || "/assets/imgs/default.jpeg"}
              alt="Profile"
              className="w-20 h-20 rounded-full mx-auto mb-2"
            />
            <h2 className="text-lg font-medium">{user.name}</h2>
            <button
              onClick={() => handleAddFriend(user.id)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Friend
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}