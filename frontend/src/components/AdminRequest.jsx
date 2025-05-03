import React, { useEffect, useState } from "react";

const AdminRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  // Fetching requests on component mount
  useEffect(() => {
    const fetchRequests = async () => {
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/requests', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch requests. Please check your permissions.");
        }

        const data = await res.json();
        setRequests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [token]);

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/requests/${requestId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update request status.");
      }

      const updatedRequest = await res.json();
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === updatedRequest.id ? updatedRequest : request
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p className="text-gray-400">Loading requests...</p>;
  }

  if (error) {
    return <p className="text-red-400">{error}</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-white">Admin - Day-Off Requests</h1>

      <div className="bg-gray-800 p-4 rounded-lg text-white space-y-4">
        {requests.length === 0 ? (
          <p className="text-gray-400">No day-off requests found.</p>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="p-3 bg-gray-700 rounded">
                <p>
                  <strong>Requester:</strong> {request.requester?.name || "Unknown"}
                </p>
                <p>
                  <strong>Requested Day-Off:</strong> {request.selectedDate}
                </p>
                <p>
                  <strong>Status:</strong>
                  <span
                    className={`ml-2 font-semibold ${
                      request.status === "accepted"
                        ? "text-green-400"
                        : request.status === "rejected"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {request.status?.toUpperCase() || "PENDING"}
                  </span>
                </p>
                <p>
                  <strong>Requested At:</strong> {new Date(request.createdAt).toLocaleString()}
                </p>

                {/* Action Buttons (Approve / Reject) */}
                <div className="flex mt-4 space-x-4">
                  {request.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleStatusChange(request.id, "accepted")}
                        className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 text-white"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(request.id, "rejected")}
                        className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 text-white"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminRequest;
