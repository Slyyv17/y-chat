"use client";

import { useState, useEffect } from "react";
import { getUsers, sendFriendRequest } from "../action/getUsers";

export default function AddFriendComponent() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    interface User {
        id: string;
        name: string;
        email: string;
        profileImage?: string; // Optional property for profile image
    }

    const [users, setUsers] = useState<User[]>([]);

    // Fetch users when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await getUsers(); // Call the server action
                setUsers(
                    fetchedUsers.map((user) => ({
                        ...user,
                        profileImage: user.profileImage ?? "/assets/imgs/default.jpeg",
                    }))
                );
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
        <main className="w-full h-screen flex flex-col gap-4 p-6 bg-gray-50">
            <h1 className="text-2xl font-semibold text-center text-gray-800 font-body">Registered Users</h1>

            {/* Display error message */}
            {errorMessage && (
                <div className="text-red-500 font-semibold text-center mt-4">{errorMessage}</div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                {/* Render each user */}
                {users.map((user) => (
                    <div key={user.id} className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center">
                        <div className="relative">
                            <img
                                src={user.profileImage}
                                alt="Profile Image"
                                className="w-24 h-24 rounded-full object-cover border-4 border-[var(--color-primary)]"
                            />
                        </div>
                        <h2 className="mt-4 text-xl font-medium text-gray-800">{user.name}</h2>

                        <button
                            className="mt-4 py-2 px-6 bg-[var(--color-bg)] text-white rounded-lg transition-transform transform hover:scale-105"
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
