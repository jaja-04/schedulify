import React from "react";
import { LogOut, User } from "lucide-react";

const AccountModal = ({ isOpen, onClose, isLoggedIn, setIsLoggedIn }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);

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
                setIsLoggedIn(false);
                setIsLogoutModalOpen(false);
                onClose();
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

  if (!isOpen || !isLoggedIn) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-700 p-6 rounded-lg w-96">
        <div className="flex items-center mb-6">
          <img 
            src="/api/placeholder/100/100" 
            alt="User Profile" 
            className="w-20 h-20 rounded-full mr-4 object-cover"
          />
          <div>
            <h2 className="text-xl font-bold">John Doe</h2>
            <p className="text-sm text-gray-400">Computer Engineering</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              type="email"
              value="john.doe@university.edu"
              readOnly
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded opacity-75"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Student ID</label>
            <input
              type="text"
              value="CE2024-1234"
              readOnly
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded opacity-75"
            />
          </div>
          <button 
            onClick={() => setIsLogoutModalOpen(true)}
            className="w-full px-4 py-2 bg-red-600 rounded hover:bg-red-700 flex items-center justify-center"
          >
            <LogOut className="mr-2 w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutModal />
    </div>
  );
};

export default AccountModal;