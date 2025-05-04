import React, { useEffect, useState } from "react";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const Faculty_ManageAvailability = ({ userId }) => {
  const [selectedDay, setSelectedDay] = useState("");
  const [requests, setRequests] = useState([]);  // Store all requests
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  console.log("Token retrieved from localStorage:", token); // Check this in console

  const fetchMyRequest = async () => {
    setLoading(true); // Start loading when fetching the request
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found in localStorage");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/requests/mine', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.error("Failed to fetch data:", res.status, await res.json());
        setLoading(false);
        return;
      }

      const data = await res.json();
      console.log('Fetched Data:', data);  // Log the fetched data to inspect the response

      setLoading(false); // Stop loading once data is fetched

      if (data.length === 0) {
        alert("No requests found.");
      } else {
        setRequests(data);  // Store all requests in state
      }
    } catch (err) {
      console.error("Failed to fetch request:", err);
      setLoading(false); // Stop loading in case of an error
      alert("Error fetching data.");
    }
  };

  const handleSubmit = async () => {
    if (!selectedDay) return alert("Please select a day.");

    try {
      const token = localStorage.getItem("token");
      console.log("Submitting token:", token);

      if (!token) {
        return alert("No authentication token found.");
      }

      const res = await fetch("http://localhost:5000/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ selectedDate: selectedDay }),
      });

      const data = await res.json();
      console.log("Submission response:", data);

      if (res.ok) {
        setSelectedDay("");
        alert("Day-off request submitted!");
        fetchMyRequest(); // Refresh current request
      } else {
        alert("Failed to submit request: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Submission error.");
    }
  };

  useEffect(() => {
    fetchMyRequest();
  }, [userId]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-white">Day-Off Request</h1>

      <div className="bg-gray-800 p-4 rounded-lg text-white space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Select Your Day-Off
          </label>
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          >
            <option value="">-- Choose a Day --</option>
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 text-white"
          >
            Submit Request
          </button>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading your requests...</p>
        ) : requests.length === 0 ? (
          <p className="text-gray-400">You haven't submitted any requests yet.</p>
        ) : (
          <div className="mt-4 space-y-4">
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
                    {request.status?.toUpperCase() || "UNKNOWN"}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Faculty_ManageAvailability;
