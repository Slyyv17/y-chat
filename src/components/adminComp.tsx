"use client";

import { User } from "@prisma/client";
import { getUsers } from "@/app/action/getUsers"; 
import { useEffect, useState } from "react";

export default function AdminComponent() {
    const [users, setUsers] = useState<User[]>([]);

    // Fetch users when the component mounts
    useEffect(() => {
        (async () => {
            try {
                const fetchedUsers = await getUsers(); // Fetch users from API
                setUsers(fetchedUsers); // Set state directly
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        })();
    }, []); // Added empty dependency array to avoid infinite loop

    return (
        <main className="p-6">
            <h1 className="text-3xl font-bold font-body">Admin Page</h1>
            <p className="mt-2 text-lg text-gray-600 font-display">Manage users and friend requests here.</p>

            {/* Admin functionalities */}
            <section className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
                {/* Display number of registered users */}
                <div className="p-4 bg-[var(--color-bg)] text-[var(--color-primary)] font-display rounded-md shadow-md w-fit">
                    <span className="text-lg font-semibold">Users: {users.length}</span>
                </div>

                {/* Registered Users List */}
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold font-body">Registered Users</h2>
                    {users.length > 0 ? (
                        <ul className="mt-4 space-y-4 grid grid-cols-1 md:grid-cols-3 gap-4 font-display">
                            {users.map((user) => (
                                <li
                                    key={user.id}
                                    className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center"
                                >
                                    <img
                                        src={user.profileImage ?? "/assets/imgs/default.jpeg"}
                                        alt="Profile"
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div className="mt-4 text-center">
                                        <h3 className="text-lg font-semibold">{user.name}</h3>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                        <p className="text-sm text-gray-500">
                                            {/* Convert the Date object to a readable string */}
                                            Account created: {new Date(user.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="mt-4 text-gray-500">No users found.</p>
                    )}
                </div>
            </section>
        </main>
    );
}
