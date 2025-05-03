import React, { useEffect, useState } from "react";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const Faculty_ManageAvailability = ({ userId }) => {
  const [selectedDay, setSelectedDay] = useState("");
  const [currentRequest, setCurrentRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMyRequest = async () => {
    if (!userId) return;

    try {
      const token = localStorage.getItem('token');

      const res = await fetch(`http://localhost:5000/api/requests/mine`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (res.ok && data.length > 0) {
        setCurrentRequest(data[0]); // only allow one, so get the first/latest
        setSelectedDay(data[0].selectedDate);
      } else {
        setCurrentRequest(null);
        setSelectedDay("");
      }
    } catch (err) {
      console.error("Failed to fetch request:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedDay) return alert("Please select a day.");
  
    try {
      const token = localStorage.getItem('token'); // Ensure you store this after login
  
      const res = await fetch("http://localhost:5000/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ selectedDate: selectedDay })
      });
  
      const data = await res.json();
  
      if (res.ok) {
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

  const handleSave = async () => {
    if (!selectedDay || !userId) return;

    try {
      const response = await fetch("http://localhost:5000/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ selectedDate: selectedDay, userId }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Day-off request submitted!");
        fetchMyRequest(); // Refresh status
      } else {
        alert(data.error || "Failed to submit request.");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-white">Day-Off Request</h1>

      <div className="bg-gray-800 p-4 rounded-lg text-white space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Select Your Day-Off</label>
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          >
            <option value="">-- Choose a Day --</option>
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 text-white"
            disabled={loading || !!currentRequest}
          >
            Submit Request
          </button>z
        </div>

        {loading ? (
          <p className="text-gray-400">Loading your request...</p>
        ) : currentRequest ? (
          <div className="mt-4 p-3 bg-gray-700 rounded">
            <p><strong>Requested Day-Off:</strong> {currentRequest.selectedDate}</p>
            <p><strong>Status:</strong> 
              <span className={`ml-2 font-semibold ${
                currentRequest.status === 'approved' ? 'text-green-400' :
                currentRequest.status === 'rejected' ? 'text-red-400' :
                'text-yellow-400'
              }`}>
                {currentRequest.status.toUpperCase()}
              </span>
            </p>
          </div>
        ) : (
          <p className="text-gray-400">You haven't submitted a request yet.</p>
        )}
      </div>
    </div>
  );
};

export default Faculty_ManageAvailability;
