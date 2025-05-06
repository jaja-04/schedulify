import React, { useState, useEffect } from "react";
import { Printer } from "lucide-react";

const CourseSchedule = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
    '4:00 PM', '5:00 PM'
  ];

  const getSectionName = (id) => {
    const mapping = {
      1: '3201',
      2: '3202',
      3: '3203',
      4: '3204',
      5: '3205'
    };
    return mapping[id] || 'Unknown';
  };

  const getDayAbbreviation = (day) => {
    return day ? day.slice(0, 3) : '';
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hourNum = parseInt(hours, 10);
    const period = hourNum >= 12 ? 'PM' : 'AM';
    const hour12 = hourNum % 12 || 12;
    return `${hour12}:${minutes}${period}`;
  };

  const convertToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const courseInTimeSlot = (course, slotTime) => {
    const slotParts = slotTime.split(/[: ]/);
    let slotHour = parseInt(slotParts[0], 10);
    const slotMinute = parseInt(slotParts[1], 10);
    const isPM = slotParts[2] === 'PM';

    if (isPM && slotHour !== 12) slotHour += 12;
    if (!isPM && slotHour === 12) slotHour = 0;

    const slotStart = slotHour * 60 + slotMinute;
    const slotEnd = slotStart + 60;

    const courseStart = convertToMinutes(course.startTime);
    const courseEnd = convertToMinutes(course.endTime);

    return courseStart < slotEnd && courseEnd > slotStart;
  };

  const getCoursesForSlot = (day, time) => {
    return courses.filter(course =>
      course.day === day && courseInTimeSlot(course, time)
    );
  };

  const fetchSchedule = async () => {
    if (!currentUser) return;
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found');

      const response = await fetch('http://localhost:5000/api/schedule', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch schedule data');

      const data = await response.json();
      if (!data || !Array.isArray(data) || data.length === 0) {
        setCourses([]);
        return;
      }

      let userSchedule = [];
      if (currentUser.role === 'student') {
        userSchedule = data.filter(course => course.sectionId === currentUser.sectionId);
      } else if (currentUser.role === 'faculty') {
        userSchedule = data.filter(course =>
          course.faculty === currentUser.id ||
          course.faculty === currentUser.name
        );
      } else {
        userSchedule = data;
      }

      const formattedCourses = userSchedule.map(course => ({
        name: course.courseName || course.courseId,
        room: course.room,
        instructor: course.faculty,
        section: getSectionName(course.sectionId),
        time: `${getDayAbbreviation(course.day)} ${formatTime(course.startTime)}-${formatTime(course.endTime)}`,
        startTime: course.startTime,
        endTime: course.endTime,
        day: course.day
      }));

      setCourses(formattedCourses);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getCurrentUser = () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please log in to view your schedule');
          setLoading(false);
          return;
        }

        const userData = localStorage.getItem('user');
        if (userData) {
          setCurrentUser(JSON.parse(userData));
        } else {
          verifyToken(token);
        }
      } catch (err) {
        setError('Authentication error: ' + err.message);
        setLoading(false);
      }
    };

    const verifyToken = async (token) => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error('Invalid token');

        const data = await response.json();
        if (data.success && data.user) {
          setCurrentUser(data.user);
        } else {
          throw new Error('User verification failed');
        }
      } catch (err) {
        setError('Authentication error: ' + err.message);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchSchedule();
    }
  }, [currentUser]);

  // Re-fetch schedule when tab becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchSchedule();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentUser]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-900 p-6 rounded-lg">
        <div className="text-white">Loading schedule...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-900 p-6 rounded-lg">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-900 p-6 rounded-lg">
        <div className="text-amber-400">Please log in to view your schedule</div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-900 p-6 rounded-lg">
        <div className="text-white">No courses assigned to you</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Course Schedule</h2>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center text-white"
        >
          <Printer className="mr-2 w-4 h-4" />
          Export/Print
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-3 text-sm text-white border border-gray-700 font-semibold">Time</th>
              {days.map(day => (
                <th key={day} className="p-3 text-gray-300 border border-gray-700">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map(time => (
              <tr key={time} className="bg-gray-800 hover:bg-gray-700">
                <td className="p-3 text-sm text-white border border-gray-700 font-semibold">{time}</td>
                {days.map(day => {
                  const slotCourses = getCoursesForSlot(day, time);
                  return (
                    <td key={day} className="p-3 border border-gray-700 text-center">
                      {slotCourses.length > 0 ? (
                        slotCourses.map((course, index) => (
                          <div key={index} className="bg-blue-600 text-white rounded p-2 mb-1">
                            <div className="font-bold text-sm">{course.name}</div>
                            <div className="text-xs">{course.room}</div>
                            <div className="text-xs">{course.instructor}</div>
                            <div className="text-xs">Sec: {course.section}</div>
                          </div>
                        ))
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

export default CourseSchedule;
