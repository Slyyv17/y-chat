"use client";

import Link from "next/link";
import { Shield, Users, Settings, MessageCircle, BarChart, Bell, Group } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function AdminSidebar(){
    const pathname = usePathname();

    const links = [
        { href: "/users", icon: <Users size={20} />, alt: "User Management" },
        { href: "/chat", icon: <MessageCircle size={20} />, alt: "Chat Management" },
        { href: "/groups", icon: <Group size={20} />, alt: "Group Management" },
        { href: "/report", icon: <Shield size={20} />, alt: "Reports" },
        { href: "/analytics", icon: <BarChart size={20} />, alt: "Analytics" },
        { href: "/notifications", icon: <Bell size={20} />, alt: "Notification" },
        { href: "/setting", icon: <Settings size={20} />, alt: "Settings" },
    ];

    return (
        <aside className="h-screen w-60 flex flex-col items-start px-4 py-6 gap-6 bg-gray-900 text-gray-200">
            {/* Profile Image */}
            <div className="w-14 h-14 rounded-full overflow-hidden shadow-lg flex items-center justify-center mb-4">
                <Image
                    src="/assets/imgs/default.jpeg"
                    alt="Profile"
                    width={56} 
                    height={56}
                    className="object-cover"
                    priority
                />
            </div>

            {/* Navigation Links */}
            <nav className="w-full">
                {links.map(({ href, icon, alt }) => (
                    <Link
                        key={href}
                        href={href}
                        className={`flex items-center gap-3 w-full px-4 py-3 rounded-md transition duration-300 
                        ${pathname === href ? "bg-gray-200 text-[var(--color-primary)] font-semibold" : "text-gray-400 hover:bg-gray-600 hover:text-white"}`}
                    >
                        {typeof icon === "string" ? (
                            <Image 
                                src={icon} 
                                alt={alt} 
                                width={20} 
                                height={20} 
                                className="w-5 h-5 object-cover rounded-full" 
                                unoptimized 
                            />
                        ) : (
                            icon
                        )}
                        <span className="text-sm capitalize">{alt}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
