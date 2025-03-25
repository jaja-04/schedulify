import React, { useState } from "react";
import { Plus, Edit } from "lucide-react";

const ManageCourses = ({ courses, setCourses }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Edit Course Modal
  const EditCourseModal = () => {
    const [editedCourse, setEditedCourse] = useState(selectedCourse);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedCourse(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleSave = () => {
      setCourses(prev => 
        prev.map(course => 
          course.id === editedCourse.id ? editedCourse : course
        )
      );
      setIsEditModalOpen(false);
    };

    if (!isEditModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-gray-700 p-6 rounded-lg w-96">
          <h2 className="text-xl font-bold mb-4">Edit Course</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Course Name</label>
              <input
                type="text"
                name="name"
                value={editedCourse.name}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Block</label>
              <input
                type="text"
                name="block"
                value={editedCourse.block}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Year Level</label>
              <input
                type="number"
                name="yearLevel"
                value={editedCourse.yearLevel}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Credits</label>
              <input
                type="number"
                name="credits"
                value={editedCourse.credits}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Add Course Modal
  const AddCourseModal = () => {
    const [newCourse, setNewCourse] = useState({
      id: courses.length + 1,
      name: '',
      instructor: '',
      time: '',
      room: '',
      credits: 0,
      block: '',
      yearLevel: 0,
      conflicts: 'None'
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewCourse(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleSave = () => {
      setCourses(prev => [...prev, newCourse]);
      setIsAddModalOpen(false);
    };

    if (!isAddModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-gray-700 p-6 rounded-lg w-96">
          <h2 className="text-xl font-bold mb-4">Add New Course</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Course Name</label>
              <input
                type="text"
                name="name"
                value={newCourse.name}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Block</label>
              <input
                type="text"
                name="block"
                value={newCourse.block}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Year Level</label>
              <input
                type="number"
                name="yearLevel"
                value={newCourse.yearLevel}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Credits</label>
              <input
                type="number"
                name="credits"
                value={newCourse.credits}
                onChange={handleInputChange}
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
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
              >
                Add Course
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
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
        <div className="flex space-x-4">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <Plus className="mr-2 w-4 h-4" />
            Add Course
          </button>
          {selectedCourse && (
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 flex items-center"
            >
              <Edit className="mr-2 w-4 h-4" />
              Edit Course
            </button>
          )}
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-700">
              {['Course', 'Block', 'Year Level', 'Credits'].map((header) => (
                <th key={header} className="p-3 text-left text-xs text-gray-300">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr 
                key={course.id} 
                className={`
                  border-b border-gray-700 hover:bg-gray-700/50 cursor-pointer
                  ${selectedCourse?.id === course.id ? 'bg-blue-900/50' : ''}
                `}
                onClick={() => setSelectedCourse(course)}
              >
                <td className="p-3 text-sm">{course.name}</td>
                <td className="p-3 text-sm">{course.block}</td>
                <td className="p-3 text-sm">{course.yearLevel}</td>
                <td className="p-3 text-sm">{course.credits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <EditCourseModal />
      <AddCourseModal />
    </div>
  );
};

export default ManageCourses;