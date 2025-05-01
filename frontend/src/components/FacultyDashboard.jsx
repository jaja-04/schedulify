import React, { useState } from "react";
import { Home, List, Layers, User, HelpCircle, Plus, CheckCircle } from "lucide-react";

import FacultySchedule from "./FacultySchedule"; // This will be the schedule component

import HelpSection from "./Faculty_help"; // Help section for faculty
import AccountModal from "./Faculty_account"; // Account settings modal
import Faculty_ManageAvailability from "./Faculty_ManageAvailability"; // Manage Availability component

const FacultyDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const menuItems = [
    { icon: Home, label: "Dashboard" },
    { icon: List, label: "My Schedule" },

    { icon: CheckCircle, label: "Availability" }, // Added the "Availability" menu item
    { icon: HelpCircle, label: "Help" },
    
  ];

  const [courses, setCourses] = useState([
    { 
      id: 1, 
      name: "Computer Science 101", 
      instructor: "Prof. John Doe", 
      time: "Mon/Wed 10:00 AM", 
      room: "Room 204",
      credits: 3,
      yearLevel: 1
    },
    { 
      id: 2, 
      name: "Advanced Algorithms", 
      instructor: "Dr. Alice Smith", 
      time: "Tue/Thu 2:00 PM", 
      room: "Room 305",
      credits: 4,
      yearLevel: 2
    }
  ]);

  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  // Manage the availability state
  const [availability, setAvailability] = useState({
    preferredDays: "",
    dayOffs: "",
  });

  const handleAvailabilitySave = (preferredDays, dayOffs) => {
    setAvailability({ preferredDays, dayOffs });
    // You can also save this to your backend
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-4 border-r border-gray-700 flex flex-col">
        <div className="flex items-center mb-8">
          <img 
            src="/api/placeholder/40/40" 
            alt="Faculty Icon" 
            className="w-10 h-10 mr-3 rounded-lg"
          />
          <div>
            <h2 className="font-semibold">Faculty Member</h2>
            <p className="text-xs text-gray-400">Computer Engineering</p>
          </div>
        </div>

        <nav className="flex-1">
          {menuItems.map((item) => (
            <div 
              key={item.label}
              className={`
                flex items-center p-3 rounded-lg cursor-pointer mb-2
                ${selectedMenu === item.label 
                  ? 'bg-blue-600 text-white' 
                  : 'hover:bg-gray-700 text-gray-300'}`}
              onClick={() => setSelectedMenu(item.label)}
            >
              <item.icon className="mr-3 w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </nav>

        <div 
          className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-700 text-gray-300"
          onClick={() => setIsAccountModalOpen(true)}
        >
          <User className="mr-3 w-5 h-5" />
          <span className="text-sm">Account</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {/* Dashboard */}
        {selectedMenu === "Dashboard" && (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Faculty Dashboard</h1>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Course Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Courses</span>
                    <span className="font-bold">{courses.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Credits</span>
                    <span className="font-bold">
                      {courses.reduce((sum, course) => sum + course.credits, 0)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Upcoming Classes</h3>
                {courses.length > 0 ? (
                  <div>
                    <div className="font-bold">{courses[0].name}</div>
                    <div className="text-gray-400">{courses[0].time}</div>
                    <div className="text-gray-400">{courses[0].room}</div>
                  </div>
                ) : (
                  <p className="text-gray-400">No upcoming classes</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* My Schedule */}
        {selectedMenu === "My Schedule" && (
          <FacultySchedule courses={courses} />
        )}

        {/* Manage Courses */}
        {selectedMenu === "Manage Courses" && (
          <ManageCourses 
            courses={courses} 
            setCourses={setCourses} 
          />
        )}

        {/* Help */}
        {selectedMenu === "Help" && (
          <HelpSection />
        )}

        {/* Availability */}
        {selectedMenu === "Availability" && (
          <Faculty_ManageAvailability onSave={handleAvailabilitySave} />
        )}
      </div>

      {/* Account Modal */}
      <AccountModal 
        isOpen={isAccountModalOpen} 
        onClose={() => setIsAccountModalOpen(false)} 
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
    </div>
  );
};

export default FacultyDashboard;
