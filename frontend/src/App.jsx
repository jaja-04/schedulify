import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Student from "./components/Student";
import Faculty from "./components/Faculty";
import Admin from "./components/Admin";
import Student_login from "./components/Student_login";
import Faculty_login from "./components/Faculty_login";
import Admin_login from "./components/Admin_login";
import Student_dashboard from "./components/Student_dashboard";
import Student_ManageCourse from "./components/Student_ManageCourses";
import Student_schedule from "./components/Student_schedule";
import Student_account from "./components/Student_ManageCourses";
import HelpSection from "./components/Student_help";
import Edit_Profile_Modal from "./components/Edit_Profile_Modal";
import Settings_Modal from "./components/Settings_Modal";
import FacultyDashboard from "./components/FacultyDashboard";
import FacultySchedule from "./components/FacultySchedule";
import Faculty_ManageCourses from "./components/Faculty_ManageCourses";
import Faculty_ManageAvailability from "./components/Faculty_ManageAvailability";
import AdminDashboard from "./components/AdminDashboard";
import Admin_ManageSchedule from "./components/Admin_ManageSchedule";
import Login from "./components/sign-in/Login";





const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="rolebase-register" element={<Login />} />
        <Route path="student-register" element={<Student />} />
        <Route path="student-login" element={<Student_login />} />
        <Route path="Faculty-register" element={<Faculty />} />
        <Route path="faculty-login" element={<Faculty_login />} />
        <Route path="Admin-register" element={<Admin />} />
        <Route path="admin-login" element={<Admin_login />} />
        <Route path="student-dashboard" element={<Student_dashboard />} />
        <Route path="student-help" element={<HelpSection/>}/>
        <Route path="student-manage" element={<Student_ManageCourse/>}/>
        <Route path="student-schedule" element={<Student_schedule/>}/>
        <Route path="student-account" element={<Student_account/>}/>
        <Route path="edit-account" element={<Edit_Profile_Modal/>}/>
        <Route path="Settings" element={<Settings_Modal/>}/>
        <Route path="faculty-dashboard" element={<FacultyDashboard />} />
        <Route path="/schedule" element={<FacultySchedule />} />
        <Route path="/manage-courses" element={<Faculty_ManageCourses />} />
        <Route path="/manage-availability" element={<Faculty_ManageAvailability />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-manage-schedule" element={<Admin_ManageSchedule />} />
      
        
        
        
      </Routes>
    </Router>
  );
};

export default App;
