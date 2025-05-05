import React, { useEffect, useState } from 'react';
import axios from 'axios';

const sectionMapping = {
  '3201': 1,
  '3202': 2,
  '3203': 3,
  '3204': 4,
  '3205': 5,
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const timeSlots = [
  '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
];

function Admin_ScheduleViewer() {
  const [schedules, setSchedules] = useState([]);
  const [selectedSection, setSelectedSection] = useState('3201');
  const [conflicts, setConflicts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = () => {
    axios
      .get('http://localhost:5000/api/schedule')
      .then((res) => setSchedules(res.data))
      .catch((err) => console.error('Error fetching schedules:', err));
  };

  const checkConflicts = () => {
    const issues = [];
    const map = {};

    for (const s of schedules) {
      const key = `${s.day}_${s.startTime}_${s.endTime}`;
      const facultyKey = `${key}_F_${s.faculty}`;
      const roomKey = `${key}_R_${s.room}`;

      if (map[facultyKey]) {
        issues.push(`Conflict: Faculty "${s.faculty}" has multiple classes at ${s.day} ${s.startTime}–${s.endTime}`);
      } else {
        map[facultyKey] = true;
      }

      if (map[roomKey]) {
        issues.push(`Conflict: Room "${s.room}" is double-booked at ${s.day} ${s.startTime}–${s.endTime}`);
      } else {
        map[roomKey] = true;
      }
    }

    setConflicts(issues);
    if (issues.length > 0) {
      setModalMessage(issues.join('\n'));
    } else {
      setModalMessage('✅ No scheduling conflicts found.');
    }
    setIsModalOpen(true);
  };

  const filteredSchedules = schedules.filter(
    (s) => s.sectionId === sectionMapping[selectedSection]
  );

  const getSlotKey = (time) => time.slice(0, 5); // '08:00:00' -> '08:00'

  const grid = {};
  for (const slot of timeSlots) {
    grid[slot] = {};
    for (const day of days) {
      grid[slot][day] = null;
    }
  }

  for (const sched of filteredSchedules) {
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
    <div className="p-6 bg-slate-900 min-h-screen -ml-10 text-white">
      <h1 className="text-2xl font-bold mb-6">Schedule Viewer</h1>

      {/* Section Selector */}
      <div className="flex space-x-4 mb-6">
        {Object.keys(sectionMapping).map((section) => (
          <button
            key={section}
            onClick={() => setSelectedSection(section)}
            className={`px-4 py-2 rounded-md font-semibold transition ${
              selectedSection === section
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            {section}
          </button>
        ))}

        <button
          onClick={checkConflicts}
          className="ml-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
        >
          Check Conflicts
        </button>
      </div>

      {/* Schedule Grid */}
      <div className="overflow-auto h-[75vh] w-[80vw]">
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
                          <span className="font-semibold">{cell.courseId}</span><br />
                          <span className="text-sm">{cell.room}</span><br />
                          <span className="italic text-xs text-gray-300">{cell.faculty}</span>
                        </>
                      ) : (
                        <span className="text-gray-500">-do-</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded shadow-md w-[90%] max-w-lg">
            <h2 className="text-lg font-bold mb-4">Schedule Conflict Check</h2>
            {conflicts.length > 0 ? (
              <ul className="list-disc pl-5 text-sm">
                {conflicts.map((conflict, idx) => (
                  <li key={idx}>{conflict}</li>
                ))}
              </ul>
            ) : (
              <p className="text-green-600">{modalMessage}</p>
            )}
            <div className="mt-6 text-right">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin_ScheduleViewer;
