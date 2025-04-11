"use client";

import Link from "next/link";
import { UserPlus, Users, Settings, MessageCircle, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/app/action/getUsers";

interface User {
  id: string;
  name: string;
  profileImage?: string;
}

export default function Sidebar() {
    const pathname = usePathname();
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const links = [
        { href: "/profile", icon: "/assets/imgs/default.jpeg", alt: "Profile" },
        { href: "/messages", icon: <MessageCircle size={22} />, alt: "Messages" },
        { href: "/add-friends", icon: <UserPlus size={22} />, alt: "Add Friends" },
        { href: "/friends", icon: <Users size={22} />, alt: "Friends" },
        { href: "/settings", icon: <Settings size={22} />, alt: "Settings" },
    ];

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const user = await getCurrentUser();
                if (user) {
                    setCurrentUser({
                        id: user.id,
                        name: user.name,
                        profileImage: user.profileImage
                    });
                }
            } catch (error) {
                console.error("Failed to fetch current user:", error);
            }
        };

        fetchCurrentUser();
    }, []);

    return (
        <aside className="h-screen w-64 flex flex-col items-center justify-between px-5 py-8 bg-gray-900 text-gray-200 shadow-md">
            {/* Profile Section */}
            <div className="flex flex-col items-center gap-3 w-full">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-600 shadow-lg">
                    <Image
                        src={currentUser?.profileImage || "/assets/imgs/default.jpeg"}
                        alt="Profile"
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                        priority
                    />
                </div>
                {currentUser?.name && (
                    <p className="text-sm font-medium text-center text-gray-300 truncate max-w-[130px]">
                        {currentUser.name}
                    </p>
                )}
            </div>

            {/* Navigation Links */}
            <nav className="w-full flex flex-col gap-2 mt-6">
                {links.map(({ href, icon, alt }) => (
                    <Link
                        key={href}
                        href={href}
                        className={`flex items-center gap-3 px-4 py-3 w-full rounded-md transition duration-300 
                        ${
                          pathname === href
                            ? "bg-gray-700 text-white font-semibold"
                            : "text-gray-400 hover:bg-gray-700 hover:text-white"
                        }`}
                    >
                        {typeof icon === "string" ? (
                            <Image 
                                src={icon} 
                                alt={alt} 
                                width={22} 
                                height={22} 
                                className="w-6 h-6 object-cover rounded-full" 
                                unoptimized 
                            />
                        ) : (
                            icon
                        )}
                        <span className="text-sm capitalize">{alt}</span>
                    </Link>
                ))}
            </nav>

            {/* Logout Button */}
            <button className="flex items-center w-full gap-3 bg-red-500 text-white font-semibold p-3 rounded-md hover:bg-red-700 transition duration-300 ease-in-out">
                <LogOut size={18} /> Logout
            </button>
        </aside>
    );
}
