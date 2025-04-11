import FriendComponent from "@/components/friendComp";
import Sidebar from "@/components/sidebar";

export default function FriendPage() {
    return (
        <main className="w-full h-screen flex items-start justify-start">
            <Sidebar />
            {/* Friend Component */}
            <FriendComponent />
        </main>
    )
}