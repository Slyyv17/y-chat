"use client";

import { useState, useEffect } from "react";
import { getUsers, getCurrentUser } from "@/app/action/getUsers";
import { sendFriendRequest } from "@/app/action/sendFriendRequest";
import { MessageCircle } from "lucide-react";

interface User {
    id: string;
    name: string;
    email: string;
    profileImage?: string;
}

export default function AddFriendComponent() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                // Get logged-in user
                const user = await getCurrentUser();
                if (!user) {
                    setErrorMessage("Please login to view users");
                    setLoading(false);
                    return;
                }
                setCurrentUser(user);

                // Get all users (server already excludes current user)
                const fetchedUsers = await getUsers();
                setUsers(fetchedUsers.map(user => ({
                    ...user,
                    profileImage: user.profileImage || "/assets/imgs/default.jpeg",
                })));

            } catch (error) {
                console.error(error);
                setErrorMessage("Failed to load users");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddFriend = async (receiverId: string) => {
        if (!currentUser) {
            setErrorMessage("You must be logged in to send friend requests");
            return;
        }

        try {
            setErrorMessage(null);
            const result = await sendFriendRequest(receiverId);
            alert(result.message);
        } catch (error: unknown) {
            console.error(error);
            setErrorMessage(
                error instanceof Error ? error.message : "Failed to send friend request"
            );
        }
    };

    if (loading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Loading users...</p>
            </div>
        );
    }

    return (
        <main className="w-full min-h-screen flex flex-col gap-6 p-6 bg-gray-50">
            <h1 className="text-2xl font-semibold text-center text-gray-800 font-body">
                Registered Users {currentUser && `(Logged in as ${currentUser.name})`}
            </h1>

            {errorMessage && (
                <div className="text-red-500 font-semibold text-center mt-2">
                    {errorMessage}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center text-center"
                    >
                        <img
                            src={user.profileImage}
                            alt="Profile"
                            className="w-20 h-20 rounded-full object-cover border-4 border-[var(--color-primary)]"
                        />
                        <h2 className="mt-3 text-lg font-medium text-gray-800 font-display">
                            {user.name}
                        </h2>
                        
                        <div className="flex justify-center gap-3 mt-4">
                            <button
                                onClick={() => handleAddFriend(user.id)}
                                className="py-1 px-4 bg-[var(--color-bg)] text-white text-sm rounded-md 
                                           transition-transform hover:scale-105 disabled:opacity-50"
                                disabled={!currentUser}
                            >
                                Add Friend
                            </button>
                            <button className="p-3 bg-gray-700 text-white text-sm rounded-md 
                                              transition-transform hover:scale-105">
                                <MessageCircle size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {!loading && users.length === 0 && (
                <p className="text-center text-gray-600">No other users found</p>
            )}
        </main>
    );
}