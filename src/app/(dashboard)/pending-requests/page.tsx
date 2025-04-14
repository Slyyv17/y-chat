// app/pending-requests/page.tsx
import PendingRequestsComponent from "@/components/PendingRequestsComponent";
import Sidebar from "@/components/sidebar";

export default function PendingRequestsPage() {
  return (
    <main className="w-full h-screen flex items-start justify-center gap-4 bg-gray-50">
      <Sidebar />
      {/* Pending Requests Component */}
      <PendingRequestsComponent />
    </main>
  );
}