import SocialIcons from "@/components/ui/social-icons";
import Link from "next/link";
export default function StartUp() {
    return (
        <section className="flex items-center justify-center w-full h-screen p-6">
            <article className="custom-gradient flex flex-col items-center justify-center gap-3.5 w-fit h-fit p-4">
                
                {/* Header */}
                <div>
                    <p className="text-[var(--color-primary)] text-lg text-center">Y Chat</p>
                </div>

                {/* Main Heading */}
                <div className="w-full">
                    <h1 className="text-5xl text-[var(--color-primary)] leading-tight text-left font-body">
                        Connect <br /> friends <br /> easily & <br /> quickly
                    </h1>
                </div>

                {/* Subtext */}
                <div className="w-full">
                    <p className="text-[var(--color-accent)] text-base text-left max-w-xs font-display">
                        Our chat is the perfect way to stay connected with friends and family.
                    </p>
                </div>

                {/* Social Icons */}
                <SocialIcons />

                {/* Separator */}
                <div className="flex items-center justify-center w-full gap-2">
                    <hr className="border-t border-gray-400 w-24" />
                    <p className="text-gray-500 font-display">OR</p>
                    <hr className="border-t border-gray-400 w-24" />
                </div>

                {/* Email Signup Button */}
                <button className="bg-white text-black px-6 py-2 rounded-full w-64 shadow-md font-display cursor-pointer">
                    <Link href="/register">Sign up with email</Link>
                </button>

                {/* Login Link */}
                <p className="text-sm text-gray-500 font-display flex justify-between items-start w-fit gap-2">
                    <span className="text-gray-500 cursor-pointer">Existing account?</span> <Link href="/login" className="text-white cursor-pointer hover:underline transition-all duration-300">Login</Link>
                </p>

            </article>
        </section>
    );
}