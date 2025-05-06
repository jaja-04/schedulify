import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminInstructors = () => {
  const [faculties, setFaculties] = useState([]);
  const [courses, setCourses] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [assignments, setAssignments] = useState({});
  const [loading, setLoading] = useState(true);

  // Function to fetch all data
  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [facultiesRes, coursesRes, schedulesRes] = await Promise.all([
        axios.get("http://localhost:5000/api/users/role/faculty"),
        axios.get("http://localhost:5000/api/courses"),
        axios.get("http://localhost:5000/api/schedule"),
      ]);

      setFaculties(facultiesRes.data);
      setCourses(coursesRes.data);
      setSchedules(schedulesRes.data);

      const initialAssignments = {};
      coursesRes.data.forEach(course => {
        if (course.facultyId) {
          initialAssignments[course.courseId] = course.facultyId;
        }
      });
      setAssignments(initialAssignments);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const courseIdsWithSchedule = React.useMemo(() => {
    return [...new Set(schedules.map(schedule => schedule.courseId))];
  }, [schedules]);

  const handleAssign = async (courseId, facultyId) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/courses/${courseId}/assign-instructor`,
        { facultyId }
      );
      await fetchAllData(); // Re-fetch data to show latest assignments
    } catch (err) {
      console.error("Assignment error:", err);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-white bg-slate-900 min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 text-white overflow-auto bg-slate-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Assign Instructors to Courses</h1>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mr-4 md:mr-20">
        {courses.map((course) => {
          const hasSchedule = courseIdsWithSchedule.includes(course.courseId);
          return (
            <div
              key={course.courseId}
              className="bg-slate-800 p-4 rounded-lg shadow-md"
            >
              <div className="mb-2">
                <span className="font-semibold text-lg">{course.courseId}</span> -{" "}
                {course.courseName}
              </div>

              {hasSchedule ? (
                <select
                  className="w-full p-2 rounded bg-slate-700 text-white"
                  value={assignments[course.courseId] || ""}
                  onChange={(e) =>
                    handleAssign(course.courseId, e.target.value)
                  }
                >
                  <option value="">-- Select Instructor --</option>
                  {faculties.map((faculty) => (
                    <option key={faculty.id} value={faculty.id}>
                      {faculty.name} ({faculty.email})
                    </option>
                  ))}
                </select>
              ) : (
                <span className="block p-2 text-amber-400 bg-slate-700 rounded w-full">
                  No schedule has been generated
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminInstructors;
