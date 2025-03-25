import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Student from "./components/Student";
import Faculty from "./components/Faculty";
import Student_login from "./components/Student_login";
import Faculty_login from "./components/Faculty_login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="student-register" element={<Student />} />
        <Route path="student-login" element={<Student_login />} />
        <Route path="Faculty-register" element={<Faculty />} />
        <Route path="faculty-login" element={<Faculty_login />} />
      </Routes>
    </Router>
  );
};

export default App;
