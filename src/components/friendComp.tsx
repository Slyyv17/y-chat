// app/components/FriendList.tsx
"use client";

import { useEffect, useState } from "react";
import { getFriends } from "@/app/action/getFriends";

interface User {
  id: string;
  name: string;
  profileImage?: string;
}

export default function FriendList() {
  const [friends, setFriends] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        setLoading(true);
        const friendsList = await getFriends();
        setFriends(friendsList);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFriends();
  }, []);

  if (loading) return <p>Loading friends...</p>;

  return (
    <main className="w-full min-h-screen flex flex-col items-center p-6 bg-gray-50">
      <h1 className="text-2xl font-semibold text-gray-800">Friend List</h1>
      <div className="mt-6 space-y-4">
        {friends.length > 0 ? (
          friends.map((friend) => (
            <div key={friend.id} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md">
              <img
                src={friend.profileImage || "/assets/imgs/default.jpeg"}
                alt="Friend"
                className="w-12 h-12 rounded-full"
              />
              <h2 className="text-lg font-medium">{friend.name}</h2>
            </div>
          ))
        ) : (
          <p>No friends found.</p>
        )}
      </div>
    </main>
  );
}