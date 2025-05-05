import React, { useEffect, useState } from "react";
import axios from "axios";

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const timeSlots = [
  '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
];

const StudentSchedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/schedule", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = Array.isArray(res.data) ? res.data : res.data.data || [];
        if (Array.isArray(data)) {
          setSchedule(data);
        } else {
          throw new Error("Invalid schedule format");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load schedule.");
        setSchedule([]);
      }
    };

    fetchSchedule();
  }, []);

  const getSlotKey = (time) => time.slice(0, 5);

  const grid = {};
  for (const slot of timeSlots) {
    grid[slot] = {};
    for (const day of days) {
      grid[slot][day] = null;
    }
  }

  for (const sched of schedule) {
    const start = getSlotKey(sched.startTime);
    const end = getSlotKey(sched.endTime);
    const startIdx = timeSlots.indexOf(start);
    const endIdx = timeSlots.indexOf(end);
    const span = endIdx - startIdx;

    if (startIdx !== -1 && endIdx !== -1 && span > 0) {
      grid[timeSlots[startIdx]][sched.day] = { ...sched, rowSpan: span };
      for (let i = startIdx + 1; i < endIdx; i++) {
        grid[timeSlots[i]][sched.day] = 'skip';
      }
    }
  }

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-6">My Weekly Schedule</h2>
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-auto">
        <table className="table-fixed border-collapse border border-slate-600 w-full text-sm">
          <thead className="bg-slate-800 text-gray-200">
            <tr>
              <th className="w-36 p-2 border border-slate-600">Time</th>
              {days.map((day) => (
                <th key={day} className="w-40 p-2 border border-slate-600">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot) => (
              <tr key={slot} className="border-t border-slate-600">
                <td className="p-2 border border-slate-600">
                  {slot} - {timeSlots[timeSlots.indexOf(slot) + 1] || 'End'}
                </td>
                {days.map((day) => {
                  const cell = grid[slot][day];
                  if (cell === 'skip') return null;
                  return (
                    <td
                      key={`${slot}-${day}`}
                      rowSpan={cell?.rowSpan || 1}
                      className="p-2 border border-slate-600 text-center align-top"
                    >
                      {cell ? (
                        <>
                          <span className="font-semibold">{cell.courseName}</span><br />
                          <span className="text-sm">Room: {cell.room}</span><br />
                          <span className="italic text-xs text-gray-300">
                            {cell.faculty}
                          </span>
                        </>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentSchedule;
