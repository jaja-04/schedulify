import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentSchedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/student/schedule", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSchedule(res.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load schedule.");
      }
    };

    fetchSchedule();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Weekly Schedule</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid gap-4">
        {schedule.map((entry) => (
          <div key={entry.id} className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-lg font-semibold">{entry.subject?.courseName}</h3>
            <p>{entry.day}, {entry.startTime} - {entry.endTime}</p>
            <p>Room: {entry.room?.name}</p>
            <p>Instructor: {entry.faculty?.fullName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentSchedule;
