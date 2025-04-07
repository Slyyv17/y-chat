import ProfileComponent from "@/components/profileComp";
import Sidebar from "@/components/sidebar"

export default function ProfilePage() {
    return (
        <main className="w-full h-screen flex items-start justify-center">
            <Sidebar />
            <ProfileComponent />
        </main>
    );
}