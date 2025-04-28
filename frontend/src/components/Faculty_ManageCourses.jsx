import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

const ManageCourses = ({ courses, setCourses }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCourseName, setNewCourseName] = useState("");

  // Add new course
  const handleAdd = () => {
    const name = newCourseName.trim();
    if (!name) return;

    const newCourse = {
      id: courses.length + 1,
      name,
    };
    setCourses(prev => [...prev, newCourse]);
    setNewCourseName("");
    setIsAddModalOpen(false);
  };

  // Delete course by id
  const handleDelete = (id) => {
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="p-6">
      {/* Header: Search & Add */}
      <div className="flex justify-between mb-6">
        <div className="relative flex-1 max-w-md mr-4">
          <input
            type="text"
            placeholder="Search Course"
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center text-white"
        >
          <Plus className="mr-2 w-4 h-4" />
          Add Course
        </button>
      </div>

      {/* Courses Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-3 text-left text-xs text-gray-300">Course</th>
              <th className="p-3 text-left text-xs text-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id} className="border-b border-gray-700">
                <td className="p-3 text-sm text-white">{course.name}</td>
                <td className="p-3 text-sm text-center">
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash2 className="w-5 h-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
            {courses.length === 0 && (
              <tr>
                <td colSpan={2} className="p-4 text-center text-gray-400">
                  No courses available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Course Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-700 p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Course</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Course Name</label>
                <input
                  type="text"
                  value={newCourseName}
                  onChange={e => setNewCourseName(e.target.value)}
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAdd}
                  className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
                >
                  Add Course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCourses;
