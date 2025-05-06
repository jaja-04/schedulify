import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext"; // Make sure to import useAuth from your correct path

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
  const [studentSection, setStudentSection] = useState(null);
  const [manualSectionInput, setManualSectionInput] = useState("");
  const [needsManualSection, setNeedsManualSection] = useState(false);
  const { user } = useAuth(); // Get the current user from auth context

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");
        
        if (!user || !user.name) {
          console.warn("No user data available from context");
          setNeedsManualSection(true);
          return;
        }
        
        console.log("Current user from context:", user);
        
        // Get student data by matching name
        const studentRes = await axios.get("http://localhost:5000/api/student/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        const allStudents = studentRes.data.data || [];
        console.log("All students count:", allStudents.length);
        
        // Try to find student by name (case insensitive)
        const studentData = allStudents.find(
          s => s.name && s.name.trim().toLowerCase() === user.name.trim().toLowerCase()
        );
        
        console.log("Matched student by name:", studentData);
        
        if (!studentData) {
          console.warn("Could not find student with name:", user.name);
          setError(`Could not find your student record. Please enter your section manually.`);
          setNeedsManualSection(true);
          return;
        }
        
        if (!studentData.section) {
          console.warn("Student found but no section assigned");
          setError("Your profile doesn't have a section assigned. Please enter it manually.");
          setNeedsManualSection(true);
          return;
        }
        
        console.log("Student section from DB:", studentData.section);
        setStudentSection(studentData.section);
        
        // Map section code to section ID
        const sectionMap = {
          "3201": 1,
          "3202": 2,
          "3203": 3,
          "3204": 4,
          "3205": 5,
        };
        
        const sectionId = sectionMap[studentData.section];
        console.log("Mapped Section ID:", sectionId);
        
        if (!sectionId) {
          console.warn(`Invalid section: ${studentData.section}`);
          setError(`Unknown section format: ${studentData.section}. Using it directly.`);
          // Try using the section directly as the ID
          loadScheduleBySection(studentData.section);
          return;
        }
        
        // Load schedule with the mapped section ID
        loadScheduleBySection(sectionId);
        
      } catch (err) {
        console.error("Error loading schedule:", err);
        setError("Failed to load schedule: " + (err.message || "Unknown error"));
        setNeedsManualSection(true);
      }
    };
    
    fetchSchedule();
  }, [user]); // Re-run when user changes

  // Separate function to load schedule by section ID
  const loadScheduleBySection = async (sectionId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
      
      const scheduleRes = await axios.get("http://localhost:5000/api/schedule", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const allSchedules = Array.isArray(scheduleRes.data)
        ? scheduleRes.data
        : scheduleRes.data.data || [];
      
      console.log("All schedule entries:", allSchedules.length);
      console.log("Looking for section ID:", sectionId);
      
      // Try multiple approaches to compare sections
      const filteredSchedule = allSchedules.filter(s => {
        const match = 
          s.sectionId === sectionId || 
          String(s.sectionId) === String(sectionId) ||
          (typeof s.section !== 'undefined' && s.section === sectionId);
        
        if (match) {
          console.log("Matched schedule entry:", s);
        }
        return match;
      });
      
      console.log("Filtered schedule count:", filteredSchedule.length);
      
      setSchedule(filteredSchedule);
      
      if (filteredSchedule.length === 0) {
        console.warn("No schedule found for section:", sectionId);
        setError(`No schedule found for your section. Please verify your section or try again later.`);
      } else {
        setError("");
      }
    } catch (err) {
      console.error("Error loading schedule by section:", err);
      setError("Failed to load schedule: " + (err.message || "Unknown error"));
    }
  };

  // Handle manual section submission
  const handleManualSectionSubmit = async (e) => {
    e.preventDefault();
    
    if (!manualSectionInput.trim()) {
      setError("Please enter a valid section");
      return;
    }
    
    setStudentSection(manualSectionInput);
    setNeedsManualSection(false);
    
    // Map section code to section ID
    const sectionMap = {
      "3201": 1,
      "3202": 2,
      "3203": 3,
      "3204": 4,
      "3205": 5,
    };
    
    const sectionId = sectionMap[manualSectionInput] || manualSectionInput;
    console.log("Using manual section ID:", sectionId);
    
    // Load schedule with the section ID
    loadScheduleBySection(sectionId);
  };

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
      
      {user && (
        <p className="mb-4">Student: <span className="font-bold">{user.name}</span></p>
      )}
      
      {needsManualSection ? (
        <div className="mb-6 p-4 bg-slate-800 rounded-lg">
          <p className="mb-2">Please enter your section:</p>
          <form onSubmit={handleManualSectionSubmit} className="flex gap-2">
            <input
              type="text"
              value={manualSectionInput}
              onChange={(e) => setManualSectionInput(e.target.value)}
              placeholder="e.g. 3201"
              className="px-3 py-2 bg-slate-700 rounded text-white border border-slate-600 focus:border-blue-500 outline-none"
            />
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white">
              Load Schedule
            </button>
          </form>
        </div>
      ) : (
        studentSection && (
          <p className="mb-4">Section: <span className="font-bold">{studentSection}</span></p>
        )
      )}
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      {!studentSection && !needsManualSection && (
        <button 
          onClick={() => setNeedsManualSection(true)}
          className="mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white">
          Enter Section Manually
        </button>
      )}

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