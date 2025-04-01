"use client";

import Link from "next/link";
import { User, UserPlus, Users, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Sidebar() {
    const pathname = usePathname();

    const links = [
        { href: "/profile", icon: <User size={20} /> },
        { href: "/add-friends", icon: <UserPlus size={20} /> },
        { href: "/friends", icon: <Users size={20} /> },
        { href: "/settings", icon: <Settings size={20} /> },
    ];

    return (
        <aside className="h-screen w-60 bg-[var(--color-primary)] flex flex-col items-start px-2 py-6 gap-6">
            {/* Fix: Ensure the logo is properly sized */}
            <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm flex items-center justify-center mb-4">
                <Image
                    src="/assets/imgs/y-chat.png"
                    alt="logo"
                    width={48} // Adjust width
                    height={48} // Adjust height
                    className="object-cover"
                />
            </div>

            {links.map(({ href, icon }) => (
                <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-md transition ${
                        pathname === href
                            ? "bg-[var(--color-bg)] text-[var(--color-primary)] font-semibold"
                            : "text-[var(--color-secondary)] hover:bg-[var(--color-bg)]"
                    }`}>
                    {icon}
                    <span className="text-sm capitalize">{href.replace("/", "").replace("-", " ")}</span>
                </Link>
            ))}
        </aside>
    );
}
