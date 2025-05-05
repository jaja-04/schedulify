import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Mail, IdCard, Book, Calendar, Edit, Settings } from "lucide-react";
// Importing modal components
import Edit_Profile_Modal from "./Edit_Profile_Modal.jsx";
import Settings_Modal from "./Settings_Modal.jsx";
import { useAuth } from "../context/authContext.jsx";

const Admin_account = ({ isOpen, onClose, isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isEdit_Profile_Modal, setisEdit_Profile_Modal] = useState(false);
  const [isSettings_Modal, setisSettings_Modal] = useState(false);

  const { logout } = useAuth();

  // Admin profile data
  const [profileData, setProfileData] = useState({
    name: "Admin",
    department: "Computer Engineering",
    email: "admin@gmail.com",
    role: "System Administrator",
    joinDate: "January 2021",
    phone: "555-987-6543",
    address: "456 Admin St"
  });

  // Settings data
  const [settingsData, setSettingsData] = useState({
    theme: "dark",
    notifications: true,
    emailAlerts: true,
    twoFactorAuth: true
  });

  // Logout Confirmation Modal
  const LogoutModal = () => {
    if (!isLogoutModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-gray-700 p-6 rounded-lg w-96 text-center">
          <LogOut className="mx-auto mb-4 w-12 h-12 text-red-500" />
          <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
          <p className="text-gray-400 mb-6">Are you sure you want to log out?</p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => setIsLogoutModalOpen(false)}
              className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                logout(); // from context
                setIsLogoutModalOpen(false);
                onClose();
                navigate('/');
              }}              
              className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Functions to handle modal open/close
  const handleOpenEditProfile = () => {
    setisEdit_Profile_Modal(true);
  };

  const handleCloseEditProfile = () => {
    setisEdit_Profile_Modal(false);
  };

  const handleOpenSettings = () => {
    setisSettings_Modal(true);
  };

  const handleCloseSettings = () => {
    setisSettings_Modal(false);
  };

  // Update profile function
  const updateProfile = (newProfileData) => {
    setProfileData(newProfileData);
  };

  // Update settings function
  const updateSettings = (newSettingsData) => {
    setSettingsData(newSettingsData);
  };

  if (!isOpen || !isLoggedIn) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 rounded-lg w-full max-w-md overflow-hidden">
        {/* Header with cover photo and close button */}
        <div className="relative h-32 bg-gradient-to-r from-blue-600 to-blue-400">
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 bg-gray-800 p-1 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Profile section */}
        <div className="relative px-6 pb-6">
          {/* Profile picture */}
          <div className="absolute -top-16 left-6">
          </div>
          
          {/* Name and department */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold">{profileData.name}</h2>
            <p className="text-gray-400">{profileData.department}</p>
          </div>
          
          {/* Profile info */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-3 text-gray-400" />
              <span>{profileData.email}</span>
            </div>
            <div className="flex items-center">
              <Book className="w-5 h-5 mr-3 text-gray-400" />
              <span>{profileData.role}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-3 text-gray-400" />
              <span>Joined {profileData.joinDate}</span>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <button 
              onClick={handleOpenEditProfile}
              className="flex items-center justify-center px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
            >
              <Edit className="mr-2 w-4 h-4" />
              Edit Profile
            </button>
            <button 
              onClick={handleOpenSettings}
              className="flex items-center justify-center px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
            >
              <Settings className="mr-2 w-4 h-4" />
              Settings
            </button>
          </div>
          
          {/* Logout button */}
          <button 
            onClick={() => setIsLogoutModalOpen(true)}
            className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700"
          >
            <LogOut className="mr-2 w-4 h-4 text-red-500" />
            <span className="text-red-500">Logout</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      <LogoutModal />
      
      {/* Render Modals explicitly */}
      {isEdit_Profile_Modal && (
        <Edit_Profile_Modal 
          isOpen={isEdit_Profile_Modal} 
          onClose={handleCloseEditProfile} 
          profileData={profileData} 
          setProfileData={updateProfile} 
        />
      )}
      
      {isSettings_Modal && (
        <Settings_Modal 
          isOpen={isSettings_Modal} 
          onClose={handleCloseSettings} 
          settingsData={settingsData} 
          setSettingsData={updateSettings} 
        />
      )}
    </div>
  );
};

export default Admin_account;