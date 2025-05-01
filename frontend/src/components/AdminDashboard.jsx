import React, { useState } from "react";
import { PanelLeftOpen, User, HelpCircle } from "lucide-react";
import HelpSection from "./AdminHelp";
import AccountModal from "./AdminAccount";

const Admin_dashboard = () => {
  // ─── top‑level menu state ──────────────────────────
  const [selectedMenu, setSelectedMenu] = useState("1st Year");
  const [expandedMenu, setExpandedMenu] = useState("Year Level");

  // ─── block tabs for each year ──────────────────────
  const blocks = {
    "1st Year": ["1201", "1202", "1203", "1204", "1205"],
    "2nd Year": ["2201", "2202", "2203", "2204", "2205"],
    "3rd Year": ["3201", "3202", "3203", "3204", "3205"],
    "4th Year": ["4201", "4202", "4203", "4204", "4205"],
  };
  const [selectedBlock, setSelectedBlock] = useState(blocks["1st Year"][0]);

  // ─── which course is clicked? ────────────────────
  const [selectedCourse, setSelectedCourse] = useState(null);

  // ─── account modal/login state ───────────────────
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  // ─── logout handler ───────────────────────────────
  const handleLogout = () => {
    setIsLoggedIn(false);
    window.location.href = "/login"; // Redirect to login page
  };
  

  // ─── mock courses with room + professor ──────────
  const [courses] = useState([
    // 1st Year Block 1201
    { id: 1, name: "Art Appreciation", yearLevel: 1, block: "1201", room: "Bldg A, Rm 101", professor: "Dr. Jane Smith" },
    { id: 2, name: "Engineering Drawing", yearLevel: 1, block: "1202", room: "Bldg A, Rm 102", professor: "Prof. John Doe" },
    // Add similar data for other blocks, like 1202, 1203, etc.
    { id: 3, name: "Art Appreciation", yearLevel: 1, block: "1203", room: "Bldg A, Rm 101", professor: "Dr. Jane Smith" },
    { id: 4, name: "Art Appreciation", yearLevel: 1, block: "1204", room: "Bldg A, Rm 101", professor: "Dr. Jane Smith" },
    { id: 5, name: "Art Appreciation", yearLevel: 1, block: "1205", room: "Bldg A, Rm 101", professor: "Dr. Jane Smith" },
    { id: 6, name: "Art Appreciation", yearLevel: 2, block: "2201", room: "Bldg A, Rm 101", professor: "Dr. Jane Smith" },
    { id: 7, name: "Art Appreciation", yearLevel: 2, block: "2202", room: "Bldg A, Rm 101", professor: "Dr. Jane Smith" },
    { id: 8, name: "Art Appreciation", yearLevel: 2, block: "2203", room: "Bldg A, Rm 101", professor: "Dr. Jane Smith" },
    { id: 9, name: "Art Appreciation", yearLevel: 2, block: "2204", room: "Bldg A, Rm 101", professor: "Dr. Jane Smith" },
    { id: 10, name: "Art Appreciation", yearLevel: 2, block: "2205", room: "Bldg A, Rm 101", professor: "Dr. Jane Smith" },
    { id: 11, name: "Art Appreciation", yearLevel: 3, block: "3201", room: "Bldg A, Rm 101", professor: "Dr. Jane Smith" },
    { id: 12, name: "Art Appreciation", yearLevel: 3, block: "3202", room: "Bldg A, Rm 101", professor: "Dr. Jane Smith" },
    { id: 13, name: "Art Appreciation", yearLevel: 3, block: "3203", room: "Bldg A, Rm 101", professor: "Dr. Jane Smith" },
    { id: 14, name: "Art Appreciation", yearLevel: 3, block: "3204", room: "Bldg A, Rm 101", professor: "Dr. Jane Smith" },
    { id: 15, name: "Art Appreciation", yearLevel: 3, block: "3205", room: "Bldg A, Rm 101", professor: "Dr. Jane Smith" },
    { id: 16, name: "Art Appreciation", yearLevel: 4, block: "4201", room: "Bldg A, Rm 101", professor: "Dr. Jane Smith" },
    { id: 17, name: "Art Appreciation", yearLevel: 4, block: "4202", room: "Bldg A, Rm 101", professor: "Dr. Jane Smith" },
    { id: 18, name: "Art Appreciation", yearLevel: 4, block: "4203", room: "Bldg A, Rm 101", professor: "Dr. Jane Smith" },
    { id: 19, name: "Art Appreciation", yearLevel: 4, block: "4204", room: "Bldg A, Rm 101", professor: "Dr. Jane Smith" },
    { id: 20, name: "Art Appreciation", yearLevel: 4, block: "4205", room: "Bldg A, Rm 101", professor: "Dr. Jane Smith" },
    { id: 21, name: "Art Appreciation", yearLevel: 4, block: "4205", room: "Bldg A, Rm 101", professor: "Dr. Jane Smith" },


    // Continue with other year-level blocks...
  ]);

  const menuItems = [
    {
      icon: PanelLeftOpen,
      label: "Year Level",
      subItems: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
    },
    { icon: HelpCircle, label: "Help" },
  ];

  // ───────────────────────────────────────────────────────────────────
  if (!isLoggedIn) {
    window.location.href = "/login";
    return null;
  }

  // ───────────────────────────────────────────────────────────────────
  return (
    <div className="flex h-screen bg-[#0F172A] text-white">

      {/* SIDEBAR */}
      <div className="w-64 bg-[#0F172A] p-6 flex flex-col border-r border-gray-700">
        <div className="flex items-center mb-10">
          <img
            src="/api/placeholder/40/40"
            alt="Admin Icon"
            className="w-10 h-10 mr-3 rounded-lg"
          />
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
                  ${selectedMenu === item.label || expandedMenu === item.label
                  ? "bg-white text-black font-semibold"
                  : "hover:bg-gray-700 text-gray-300"
                  }
                `}
                onClick={() => {
                  if (item.subItems) {
                    setExpandedMenu(
                      expandedMenu === item.label ? null : item.label
                    );
                  } else {
                    setSelectedMenu(item.label);
                    setExpandedMenu(null);
                  }
                  setSelectedCourse(null); // clear any selected course when changing menu
                }}
              >
                <item.icon
                  className={`mr-3 w-5 h-5 transition-transform duration-200 ${item.subItems && expandedMenu === item.label ? "rotate-90" : ""}`}
                />
                <span className="text-sm">{item.label}</span>
              </div>

              {item.subItems && expandedMenu === item.label && (
                <div className="ml-8">
                  {item.subItems.map((sub) => (
                    <div
                      key={sub}
                      className={`text-sm p-2 pl-5 rounded-md cursor-pointer mb-1
                        ${selectedMenu === sub ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-700"}`}
                      onClick={() => {
                        setSelectedMenu(sub);
                        setExpandedMenu(null);
                        setSelectedCourse(null);
                        setSelectedBlock(blocks[sub][0]); // reset to the first block
                      }}
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
          className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-700 text-gray-300"
          onClick={() => setIsAccountModalOpen(true)}
        >
          <User className="mr-3 w-5 h-5" />
          <span className="text-sm">Account</span>
        </div>

        {/* LOGOUT BUTTON */}
        <div
          className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-red-700 text-gray-300 mt-4"
          onClick={handleLogout}
        >
          <span className="text-sm">Logout</span>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto p-8">

        {/* Render Blocks based on selected Year Level */}
        <h1 className="text-3xl font-bold mb-6">{selectedMenu}</h1>

        {/* Block Tabs */}
        <div className="flex border border-white rounded-lg overflow-hidden mb-8 max-w-lg">
          {blocks[selectedMenu]?.map((b) => (
            <div
              key={b}
              onClick={() => {
                setSelectedBlock(b);
                setSelectedCourse(null); // Reset course on block change
              }}
              className={`flex-1 text-center py-2 cursor-pointer ${selectedBlock === b ? "bg-blue-600 text-white" : "bg-[#0F172A] text-white"}`}
            >
              {b}
            </div>
          ))}
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-2 gap-6">
          {courses
            .filter((c) => c.yearLevel === parseInt(selectedMenu[0]) && c.block === selectedBlock)
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
            <h2 className="text-2xl font-semibold mb-2">{selectedCourse.name}</h2>
            <p className="mb-1"><span className="font-semibold">Room:</span> {selectedCourse.room}</p>
            <p><span className="font-semibold">Professor:</span> {selectedCourse.professor}</p>
          </div>
        )}
      </div>

      {/* HELP SECTION */}
      {selectedMenu === "Help" && <HelpSection />}

      {/* ACCOUNT MODAL */}
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
