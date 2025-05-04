import React, { useState, useEffect } from "react";
import { PanelLeftOpen, User, HelpCircle, Calendar } from "lucide-react";
import HelpSection from "./AdminHelp";
import AccountModal from "./AdminAccount";
import AdminRequest from "./AdminRequest";
import { useNavigate } from "react-router-dom";
import Admin_GenerateSchedule from "./Admin_GenerateSchedule";
import Admin_ScheduleViewer from "./Admin_ScheduleViewer";
import axios from "axios"; // make sure axios is installed

const Admin_dashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("1st Year");
  const [expandedMenu, setExpandedMenu] = useState("Year Level");
  const navigate = useNavigate();

  const blocks = {
    "1st Year": ["1201", "1202", "1203", "1204", "1205"],
    "2nd Year": ["2201", "2202", "2203", "2204", "2205"],
    "3rd Year": ["3201", "3202", "3203", "3204", "3205"],
    "4th Year": ["4201", "4202", "4203", "4204", "4205"],
  };
  const [selectedBlock, setSelectedBlock] = useState(blocks["1st Year"][0]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [courses, setCourses] = useState([]);

  // Fetch courses from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/courseRoutes") // Adjust to your actual API URL
      .then((response) => setCourses(response.data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  const menuItems = [
    {
      icon: PanelLeftOpen,
      label: "Year Level",
      subItems: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
    },
    { icon: HelpCircle, label: "Help" },
    { icon: HelpCircle, label: "Day-off Request" },
    { icon: Calendar, label: "Generate Schedule" },
    { icon: Calendar, label: "View Schedules" },
  ];

  const handleYearLevelClick = (yearLevel) => {
    setSelectedMenu(yearLevel);
    setSelectedCourse(null);
    setSelectedBlock(blocks[yearLevel][0]);
  };

  return (
    <div className="flex h-screen bg-[#0F172A] text-white">
      {/* SIDEBAR */}
      <div className="w-64 bg-[#0F172A] p-6 flex flex-col border-r border-gray-700">
        <div className="flex items-center mb-10">
          <div className="w-10 h-10 mr-3 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
            A
          </div>
          <div>
            <h2 className="font-semibold text-white text-lg">Administrator</h2>
            <p className="text-xs text-gray-400">Computer Engineering</p>
          </div>
        </div>

        <nav className="flex-1">
          {menuItems.map((item) => (
            <div key={item.label}>
              <div
                className={`
                  flex items-center p-3 rounded-lg cursor-pointer mb-1
                  ${
                    selectedMenu === item.label || expandedMenu === item.label
                      ? "bg-white text-black font-semibold"
                      : "hover:bg-gray-700 text-gray-300"
                  }
                `}
                onClick={() => {
                  if (item.label === "Generate Schedule") {
                    setSelectedMenu("Generate Schedule");
                    setExpandedMenu(null);
                  } else if (item.label === "View Schedules") {
                    setSelectedMenu("View Schedules");
                    setExpandedMenu(null);
                  } else if (item.subItems) {
                    setExpandedMenu(
                      expandedMenu === item.label ? null : item.label
                    );
                  } else {
                    setSelectedMenu(item.label);
                    setExpandedMenu(null);
                  }
                }}
              >
                <item.icon
                  className={`mr-3 w-5 h-5 transition-transform duration-200 ${
                    item.subItems && expandedMenu === item.label
                      ? "rotate-90"
                      : ""
                  }`}
                />
                <span className="text-sm">{item.label}</span>
              </div>

              {item.subItems && expandedMenu === item.label && (
                <div className="ml-8">
                  {item.subItems.map((sub) => (
                    <div
                      key={sub}
                      className={`text-sm p-2 pl-5 rounded-md cursor-pointer mb-1 ${
                        selectedMenu === sub
                          ? "bg-blue-600 text-white"
                          : "text-gray-400 hover:bg-gray-700"
                      }`}
                      onClick={() => handleYearLevelClick(sub)}
                    >
                      {sub}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div
          className="flex-1 items-center p-3 rounded-lg cursor-pointer hover:bg-gray-700 text-gray-300"
          onClick={() => setIsAccountModalOpen(true)}
        >
          <User className="mr-3 w-5 h-5" />
          <span className="text-sm">Account</span>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto p-8">
        {/* Block Tabs */}
        <div className="flex overflow-hidden mb-10 max-w-lg">
          {blocks[selectedMenu]?.map((b) => (
            <div
              key={b}
              onClick={() => {
                setSelectedBlock(b);
                setSelectedCourse(null);
              }}
              className={`flex-1 text-center py-2 cursor-pointer border ${
                selectedBlock === b
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-[#0F172A] text-white border-white"
              }`}
            >
              {b}
            </div>
          ))}
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-2 gap-6">
          {courses
            .filter(
              (c) =>
                c.yearLevel === parseInt(selectedMenu[0]) &&
                c.block === selectedBlock
            )
            .map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedCourse(c)}
                className="bg-[#1E293B] p-4 rounded-lg text-center font-semibold text-lg cursor-pointer hover:bg-blue-700 transition"
              >
                {c.name}
              </div>
            ))}
        </div>

        {/* Selected Course Details */}
        {selectedCourse && (
          <div className="mt-8 bg-[#334155] p-6 rounded-lg max-w-md">
            <h2 className="text-2xl font-semibold mb-2">
              {selectedCourse.name}
            </h2>
            <p className="mb-1">
              <span className="font-semibold">Room:</span> {selectedCourse.room}
            </p>
            <p>
              <span className="font-semibold">Professor:</span>{" "}
              {selectedCourse.professor}
            </p>
          </div>
        )}
      </div>

      {/* Conditional Panels */}
      {selectedMenu === "Help" && <HelpSection />}
      {selectedMenu === "Day-off Request" && <AdminRequest />}
      {selectedMenu === "Generate Schedule" && <Admin_GenerateSchedule />}
      {selectedMenu === "View Schedules" && <Admin_ScheduleViewer />}

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

export default Admin_dashboard;
