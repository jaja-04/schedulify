import React, { useState } from "react";
import { Home, List, Layers, User, HelpCircle, LogOut } from "lucide-react";

import CourseSchedule from "./Student_schedule";
import ManageCourses from "./Student_ManageCourses";
import HelpSection from "./Student_help";
import AccountModal from "./Student_account";

const Student_dashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const menuItems = [
    { icon: Home, label: "Dashboard" },
    { icon: List, label: "My Schedule" },
    { icon: Layers, label: "Manage Courses" },
    { icon: HelpCircle, label: "Help" },
  ];

  // Mock data for courses
  const [courses, setCourses] = useState([
    { 
      id: 1, 
      name: "Introduction to Computer Science", 
      instructor: "Dr. Jane Smith", 
      time: "Mon/Wed 10:00 AM", 
      room: "Tech Building 305",
      credits: 3,
      block: "A",
      yearLevel: 1,
      conflicts: "None"
    },
    { 
      id: 2, 
      name: "Data Structures", 
      instructor: "Prof. John Doe", 
      time: "Tue/Thu 2:00 PM", 
      room: "Science Hall 202",
      credits: 4,
      block: "B", 
      yearLevel: 2,
      conflicts: "None"
    }
  ]);

  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-4 border-r border-gray-700 flex flex-col">
        <div className="flex items-center mb-8">
          <img 
            src="/api/placeholder/40/40" 
            alt="Student Icon" 
            className="w-10 h-10 mr-3 rounded-lg"
          />
          <div>
            <h2 className="font-semibold">Student</h2>
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
                  : 'hover:bg-gray-700 text-gray-300'}
              `}
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
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
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
                <h3 className="text-lg font-semibold mb-4">Upcoming Class</h3>
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
          <CourseSchedule courses={courses} />
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

export default Student_dashboard;