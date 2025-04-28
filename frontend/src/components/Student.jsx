import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import bgImage from "../assets/1.png";

const Student = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    email: "",
    srCode: "",
    school:"",
    yearandSection: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...dataToSubmit } = formData;
      
      const response = await fetch('http://localhost:4000/api/student/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('Registration successful!');
        navigate('/student-login'); // Redirect to login
      } else {
        alert(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Network error. Please try again later.');
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <div className="min-h-screen flex relative">
        {/* Background image effect */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url("/api/placeholder/1200/800")',
            filter: "blur(4px)",
          }}
        />

        <div className="relative z-10 w-full max-w-2xl bg-white/60 rounded-xl shadow-lg p-8 m-10 ">
          <h2 className="text-3xl custom-text font-extrabold text-[#db6d00] mb-6 text-center leading-none">
            Register
          </h2>
          <p className="text-center custom-text text-sm text-gray-600 -mt-4 mb-10">
            New Student Registration
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full  bg-[#043b64]/20 focus:bg-[#043b64]/10 px-3 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#db6d00]"
                //required
              />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full  bg-[#043b64]/20 focus:bg-[#043b64]/10 px-3 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#db6d00]"
                //required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="middleName"
                placeholder="Middle Name (Optional)"
                value={formData.middleName}
                onChange={handleChange}
                className="w-full  bg-[#043b64]/20 focus:bg-[#043b64]/10 px-3 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#db6d00]"
              />
              <input
                type="text"
                name="srCode"
                placeholder="SR Code"
                value={formData.srCode}
                onChange={handleChange}
                className="w-full  bg-[#043b64]/20 focus:bg-[#043b64]/10 px-3 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#db6d00]"
                //required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="school"
                placeholder="School"
                value={formData.school}
                onChange={handleChange}
                className="w-full  bg-[#043b64]/20 focus:bg-[#043b64]/10 px-3 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#db6d00]"
                //required
              />
              <input
                type="text"
                name="yearandSection"
                placeholder="Year/Section"
                value={formData.yearandSection}
                onChange={handleChange}
                className="w-full  bg-[#043b64]/20 focus:bg-[#043b64]/10 px-3 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#db6d00]"
                //required
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full  bg-[#043b64]/20 focus:bg-[#043b64]/10 px-3 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#db6d00]"
              //required
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="password"
                name="password"
                placeholder="Enter your Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full  bg-[#043b64]/20 focus:bg-[#043b64]/10 px-3 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#db6d00]"
                //required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full  bg-[#043b64]/20 focus:bg-[#043b64]/10 px-3 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#db6d00]"
                //required
              />
            </div>

            <div className="flex mt-10 justify-center mb-6 items-center">
              <input type="checkbox" id="terms" className="mr-2" />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I have read and agreed to the 
                <span className="text-[#db6d00] ml-1 hover:underline cursor-pointer">Terms and Conditions</span>
              </label>
            </div>

            <button
              type="submit"
              onClick={() => navigate("/student-dashboard")}
              className="w-full cursor-pointer bg-black text-white py-2 rounded-3xl hover:bg-gray-800 transition duration-300"
            >
              Sign Up
            </button>

            <div className="text-center mt-4">
              <span className="text-gray-600">
                Already Registered?
                <Link
                  to="/student-login"
                  className="text-[#db6d00] cursor-pointer ml-1 hover:underline"
                >
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Student;