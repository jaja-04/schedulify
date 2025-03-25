import React from "react";
import { Printer } from "lucide-react";

const CourseSchedule = ({ courses }) => {
  // Define days of the week
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  // Time slots
  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', 
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', 
    '4:00 PM', '5:00 PM'
  ];

  // Helper function to get course for a specific day and time
  const getCourseForSlot = (day, time) => {
    return courses.find(course => {
      return course.time.includes(day.slice(0,3)) && course.time.includes(time.split(' ')[0]);
    });
  };

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
              <th className="p-3 text-gray-300 border border-gray-700">Time</th>
              {days.map(day => (
                <th 
                  key={day} 
                  className="p-3 text-gray-300 border border-gray-700"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map(time => (
              <tr key={time} className="bg-gray-800 hover:bg-gray-700/50">
                <td className="p-3 text-sm text-white border border-gray-700 font-semibold">
                  {time}
                </td>
                {days.map(day => {
                  const course = getCourseForSlot(day, time);
                  return (
                    <td 
                      key={day} 
                      className="p-3 border border-gray-700 text-center"
                    >
                      {course ? (
                        <div className="bg-blue-600 text-white rounded p-2">
                          <div className="font-bold text-sm">{course.name}</div>
                          <div className="text-xs">{course.room}</div>
                          <div className="text-xs">{course.instructor}</div>
                        </div>
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