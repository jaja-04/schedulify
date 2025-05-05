import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Admin_ScheduleViewer() {
  const [students, setStudents] = useState([]); // Ensure students is an array
  const [professors, setProfessors] = useState([]);
  const [selectedUser, setSelectedUser] = useState({ type: '', id: '' });
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch students and professors once on component mount
  useEffect(() => {
    axios
      .get('/api/students')
      .then((res) => {
        if (Array.isArray(res.data)) {
          setStudents(res.data);
        } else {
          console.error('Invalid response format for students:', res.data);
        }
      })
      .catch((err) => {
        console.error('Error fetching students:', err);
        setError('Failed to load students.');
      });

    axios
      .get('/api/professors')
      .then((res) => {
        if (Array.isArray(res.data)) {
          setProfessors(res.data);
        } else {
          console.error('Invalid response format for professors:', res.data);
        }
      })
      .catch((err) => {
        console.error('Error fetching professors:', err);
        setError('Failed to load professors.');
      });
  }, []);

  // Handle user type selection (student or professor)
  const handleUserSelect = async () => {
    if (selectedUser.type && selectedUser.id) {
      const endpoint =
        selectedUser.type === 'student'
          ? `/api/schedules/student/${selectedUser.id}`
          : `/api/schedules/professor/${selectedUser.id}`;
      
      setLoading(true);
      setError(null); // Reset error

      try {
        const res = await axios.get(endpoint);
        setSchedule(res.data);
      } catch (err) {
        setError('Failed to load schedule.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      setError('Please select a user type and user.');
    }
  };

  return (
    <div className="schedule-viewer-container">
      <h2 className="header">View User Schedule (Admin)</h2>

      {/* Select the user type (student or professor) */}
      <div className="user-selection">
        <label>Select User Type: </label>
        <button
          onClick={() => setSelectedUser({ type: 'student', id: '' })}
          disabled={selectedUser.type === 'student'}
          className={`user-button ${selectedUser.type === 'student' ? 'active' : ''}`}
        >
          Student
        </button>
        <button
          onClick={() => setSelectedUser({ type: 'professor', id: '' })}
          disabled={selectedUser.type === 'professor'}
          className={`user-button ${selectedUser.type === 'professor' ? 'active' : ''}`}
        >
          Professor
        </button>
      </div>

      {/* Conditionally render the select dropdown for students or professors */}
      {selectedUser.type && (
        <div className="select-container">
          <select
            onChange={(e) =>
              setSelectedUser({ type: selectedUser.type, id: e.target.value })
            }
            value={selectedUser.id}
            className="select-dropdown"
          >
            <option value="" disabled>Select a {selectedUser.type}</option>
            {selectedUser.type === 'student' ? (
              Array.isArray(students) && students.length > 0 ? (
                students.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))
              ) : (
                <option>No students available</option>
              )
            ) : (
              Array.isArray(professors) && professors.length > 0 ? (
                professors.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))
              ) : (
                <option>No professors available</option>
              )
            )}
          </select>
        </div>
      )}

      <button
        onClick={handleUserSelect}
        disabled={!selectedUser.type || !selectedUser.id}
        className="view-schedule-button"
      >
        {loading ? 'Loading...' : 'View Schedule'}
      </button>

      {/* Error message */}
      {error && <p className="error-message">{error}</p>}

      {/* Render schedule if available */}
      {schedule.length > 0 && (
        <div className="schedule-table-container">
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Section</th>
                <th>Classroom</th>
                <th>Day</th>
                <th>Time Slot</th>
                {selectedUser.type === 'student' && <th>Professor</th>}
              </tr>
            </thead>
            <tbody>
              {schedule.map((item, i) => (
                <tr key={i}>
                  <td>{item.subject.name}</td>
                  <td>{item.section.name}</td>
                  <td>{item.classroom.name}</td>
                  <td>{item.day}</td>
                  <td>{item.timeSlot}</td>
                  {selectedUser.type === 'student' && (
                    <td>{item.professor.name}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Admin_ScheduleViewer;
