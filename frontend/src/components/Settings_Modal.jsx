import React, { useState, useEffect } from "react";
import { Save, X } from "lucide-react";

const Settings_Modal = ({ isOpen, onClose, settingsData, setSettingsData }) => {
  // Initialize formData when the component mounts or when settingsData changes
  const [formData, setFormData] = useState({ ...settingsData });
  
  // Update formData if settingsData changes
  useEffect(() => {
    setFormData({ ...settingsData });
  }, [settingsData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSettingsData({ ...formData });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-700 p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Settings</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Theme</label>
            <select
              name="theme"
              value={formData.theme}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
            >
              <option value="dark">Dark Theme</option>
              <option value="light">Light Theme</option>
              <option value="system">System Default</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="notifications"
              name="notifications"
              checked={formData.notifications}
              onChange={handleChange}
              className="mr-3 h-4 w-4"
            />
            <label htmlFor="notifications" className="text-sm">Enable Notifications</label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="emailAlerts"
              name="emailAlerts"
              checked={formData.emailAlerts}
              onChange={handleChange}
              className="mr-3 h-4 w-4"
            />
            <label htmlFor="emailAlerts" className="text-sm">Email Alerts</label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="twoFactorAuth"
              name="twoFactorAuth"
              checked={formData.twoFactorAuth}
              onChange={handleChange}
              className="mr-3 h-4 w-4"
            />
            <label htmlFor="twoFactorAuth" className="text-sm">Two-factor Authentication</label>
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
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings_Modal;