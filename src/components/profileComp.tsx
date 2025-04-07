"use client"

import { PencilIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProfileComponent() {
    return (
        <main className="w-full h-screen flex items-center justify-start gap-4 bg-gray-50 flex-col px-4">
            <div className="w-full flex items-start justify-start mt-2">
                <button className="text-[var(--color-bg)] bg-transparent p-2">
                    <Link href="/chat-room">
                        <ArrowLeft size={24} />
                    </Link>
                </button>
            </div>
            {/* Profile Title Section */}
            <div className="w-full flex items-start justify-center mb-6">
                <h1 className="text-3xl font-semibold text-gray-800 font-body">Profile</h1>
            </div>

            {/* Profile Image Upload Section */}
            <section className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden shadow-lg mb-4">
                    <img
                        src="/assets/imgs/default.jpeg" // Use a default image or dynamic image
                        alt="Profile Image"
                        className="w-full h-full object-cover"
                    />
                </div>
                <button className="bg-[var(--color-bg)] text-[var(--color-primary)] font-semibold text-lg py-2 px-4 rounded-md font-display">
                    Upload Image
                </button>
            </section>

            {/* Name Edit Section */}
            <section className="flex items-center gap-2">
                <span className="text-lg text-gray-700 font-display">Edit Name</span>
                <button className="p-2 bg-transparent hover:bg-[var(--color-bg)] duration-300 ease-in-out cursor-pointer transition rounded-full">
                    <PencilIcon size={20} className="text-[var(--color-accent)]" />
                </button>
            </section>
        </main>
    );
}


