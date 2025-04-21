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


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="student-register" element={<Student />} />
        <Route path="student-login" element={<Student_login />} />
        <Route path="Faculty-register" element={<Faculty />} />
        <Route path="faculty-login" element={<Faculty_login />} />
        <Route path="Admin-register" element={<Admin />} />
        <Route path="admin-login" element={<Admin_login />} />
        <Route path="student-dashboard" element={<Student_dashboard />} />
        <Route path="student-help" element={<Student_help/>}/>
        <Route path="student-manage" element={<Student_ManageCourse/>}/>
        <Route path="student-schedule" element={<Student_schedule/>}/>
        <Route path="student-account" element={<Student_account/>}/>
      </Routes>
    </Router>
  );
};

export default App;
