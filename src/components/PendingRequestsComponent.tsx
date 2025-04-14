// app/components/PendingRequestsComponent.tsx
"use client";

import { useState, useEffect } from "react";
import { getPendingRequests } from "@/app/action/getPendingRequests";
import { rejectFriendRequest } from "@/app/action/rejectFriendRequest";
import { acceptFriendRequest } from "@/app/action/acceptFriendRequest";

interface PendingRequest {
  id: string;
  sender: { id: string; name: string; profileImage?: string };
}

export default function PendingRequestsComponent() {
  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        setLoading(true);
        const requests = await getPendingRequests();
        setPendingRequests(requests);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPendingRequests();
  }, []);

  const handleAccept = async (requestId: string) => {
    try {
      const result = await acceptFriendRequest(requestId);
      alert(result.message);
      setPendingRequests((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.error(error);
      alert("Failed to accept friend request.");
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      const result = await rejectFriendRequest(requestId);
      alert(result.message);
      setPendingRequests((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.error(error);
      alert("Failed to reject friend request.");
    }
  };

  if (loading) return <p>Loading pending requests...</p>;

  return (
    <main className="w-full min-h-screen flex flex-col gap-6 p-6 bg-gray-50">
      <h1 className="text-2xl font-semibold text-center text-gray-800">Pending Friend Requests</h1>
      {pendingRequests.length > 0 ? (
        pendingRequests.map((request) => (
          <div key={request.id} className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img
                src={request.sender.profileImage || "/assets/imgs/default.jpeg"}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <h2 className="text-lg font-medium">{request.sender.name}</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleAccept(request.id)}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Accept
              </button>
              <button
                onClick={() => handleReject(request.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No pending friend requests.</p>
      )}
    </main>
  );
}