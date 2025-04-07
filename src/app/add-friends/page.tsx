import AddFriendComponent from "./addFriendComp"
import Sidebar from "@/components/sidebar"

export default function AddFriendPage() {
    return (
        <main className="w-full h-screen flex items-start justify-center gap-4 bg-gray-50">
            <Sidebar />
            {/* Add Friend Component */}
            <AddFriendComponent />
        </main>
    )
}