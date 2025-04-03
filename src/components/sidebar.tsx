"use client";

import Link from "next/link";
import { UserPlus, Users, Settings, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Sidebar() {
    const pathname = usePathname();

    const links = [
        { href: "/profile", icon: "/assets/imgs/default.jpeg", alt: "Profile" }, // Profile image fallback
        { href: "/messages", icon: <MessageCircle size={20} />, alt: "Messages" },
        { href: "/add-friends", icon: <UserPlus size={20} />, alt: "Add Friends" },
        { href: "/friends", icon: <Users size={20} />, alt: "Friends" },
        { href: "/settings", icon: <Settings size={20} />, alt: "Settings" },
    ];

    return (
        <aside className="h-screen w-60 bg-[var(--color-primary)] flex flex-col items-start px-4 py-6 gap-6">
            {/* Profile image and logo */}
            <div className="w-14 h-14 rounded-full overflow-hidden shadow-lg flex items-center justify-center mb-4">
                {/* Displaying default image until the user uploads their profile picture */}
                <Image
                    src="/assets/imgs/default.jpeg"
                    alt="Profile"
                    width={56} 
                    height={56}
                    className="object-cover"
                />
            </div>

            {/* Links */}
            {links.map(({ href, icon, alt }) => (
                <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-md transition duration-300 ${
                        pathname === href
                            ? "bg-[var(--color-bg)] text-[var(--color-primary)] font-semibold"
                            : "text-[var(--color-secondary)] hover:bg-[var(--color-bg)]"
                    }`}>
                    {/* Display either profile image or icon */}
                    {typeof icon === "string" ? (
                        <Image src={icon} alt={alt} width={20} height={20} className="w-5 h-5 object-cover rounded-full" />
                    ) : (
                        icon
                    )}
                    <span className="text-sm capitalize">{alt}</span>
                </Link>
            ))}
        </aside>
    );
}
