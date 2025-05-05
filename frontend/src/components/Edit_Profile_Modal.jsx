import React, { useState, useEffect } from "react";
import { Save, X } from "lucide-react";

const Edit_Profile_Modal = ({ isOpen, onClose, profileData, setProfileData }) => {
  // Initialize formData when the component mounts or when profileData changes
  const [formData, setFormData] = useState({ ...profileData });
  
  // Update formData if profileData changes
  useEffect(() => {
    setFormData({ ...profileData });
  }, [profileData]);

  // Always render the component but control visibility with CSS
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfileData({ ...formData });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-700 p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Edit Profile</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
            />
          </div>
          
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 flex items-center"
            >
              <Save className="mr-2 w-4 h-4" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit_Profile_Modal;