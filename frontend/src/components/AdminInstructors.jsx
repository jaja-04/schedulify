import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminInstructors = () => {
  const [faculties, setFaculties] = useState([]);
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState({});

  useEffect(() => {
    // Fetch faculty users
    axios.get('http://localhost:5000/api/users/role/faculty')
      .then((res) => setFaculties(res.data))
      .catch((err) => console.error("Error fetching faculties", err));

    // Fetch all courses
    axios.get('http://localhost:5000/api/courses')
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Error fetching courses", err));
  }, []);

  const handleAssign = async (courseId, facultyId) => {
    console.log("Assigning faculty", facultyId, "to course", courseId);
    try {
      await axios.patch(`http://localhost:5000/api/courses/${courseId}/assign-instructor`, { facultyId });
      setAssignments(prev => ({ ...prev, [courseId]: facultyId }));
    } catch (err) {
      console.error("Assignment error:", err);
    }
  };
  

  return (
    <div className="p-6 text-white bg-slate-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Assign Instructors to Courses</h1>

      <div className="space-y-4">
      {courses.map((course) => (
          <div key={course.courseId} className="bg-slate-800 p-4 rounded-lg shadow-md">

            <div className="mb-2">
              <span className="font-semibold text-lg">{course.courseId}</span> - {course.courseName}
            </div>
            <select
              className="w-full p-2 rounded bg-slate-700 text-white"
              value={assignments[course.courseId] || course.facultyId || ''}
              onChange={(e) => handleAssign(course.courseId, e.target.value)}

            >
              <option value="">-- Select Instructor --</option>
              {faculties.map((faculty) => (
                <option key={faculty.id} value={faculty.id}>
                  {faculty.name} ({faculty.email})
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminInstructors;
