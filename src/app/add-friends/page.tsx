"use client";

import { useState } from "react";
import { useEffect } from "react";
import { getUsers, sendFriendRequest } from "../action/getUsers";

export default function FriendPage() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    interface User {
        id: string;
        name: string;
        email: string;
        profileImage?: string | null;
    }

    const [users, setUsers] = useState<User[]>([]);

    // Fetch users when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await getUsers(); // Call the server action
                setUsers(fetchedUsers);
            } catch (error) {
                console.error(error);
                setErrorMessage("Failed to fetch users.");
            }
        };

        fetchUsers();
    }, []);

    const handleAddFriend = async (receiverId: string) => {
        try {
            const senderId = "currentUserId"; // Replace with the current user's ID (from session or context)

            const result = await sendFriendRequest(senderId, receiverId); // Call the server action
            alert(result.message);
            setErrorMessage(null); // Clear any previous error messages
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <main className="w-full h-screen flex flex-col gap-4 p-6">
            <h1 className="text-xl font-semibold">Registered Users</h1>

            {/* Display error message */}
            {errorMessage && (
                <div className="text-red-500 font-semibold">{errorMessage}</div>
            )}

            <div className="space-y-4">
                {/* Render each user */}
                {users.map((user) => (
                    <div key={user.id} className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
                        <h2 className="font-medium text-lg">{user.name}</h2>
                        {user.profileImage && (
                            <img src={user.profileImage} alt="Profile Image" className="w-12 h-12 rounded-full" />
                        )}

                        <button
                            className="mt-2 p-2 bg-[var(--color-bg)] text-[var(--color-primary)] rounded-lg"
                            onClick={() => handleAddFriend(user.id)}
                        >
                            Add Friend
                        </button>
                    </div>
                ))}
            </div>
        </main>
    );
}