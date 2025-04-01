import Sidebar from "@/components/sidebar"
import Messages from "@/components/messages"

export default function Chat() {
    return (
        <main className="w-full h-screen flex items-start justify-center">
            <Sidebar />
            <Messages />
        </main>
    )
}