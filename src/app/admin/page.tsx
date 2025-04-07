import AdminComponent from "@/components/adminComp";
import Sidebar from "../admin/side-bar";

export default function AdminPage() {
    return (
        <main className="w-full h-screen flex items-start justify-between gap-4 bg-gray-50">
            <Sidebar />
            <AdminComponent />
        </main>
    )
}
