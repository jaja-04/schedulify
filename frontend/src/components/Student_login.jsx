import bgImage from "../assets/1.png";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 

const Student_login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login attempted with:", { email, password });

    try {
      const response = await fetch('http://localhost:4000/api/student/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and student info in localStorage for future authenticated requests
        localStorage.setItem('token', data.token);
        localStorage.setItem('studentInfo', JSON.stringify(data.student));
        
        alert('Login successful!');
        navigate('/student-dashboard'); // Redirect to student dashboard
      } else {
        alert(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
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

        <div className="relative z-10 w-full max-w-2xl bg-white/60 rounded-xl shadow-lg ml-[800px] p-8 m-15">
          <h2 className="text-3xl custom-text font-extrabold text-[#db6d00] mb-6 text-center leading-none">
            Login
          </h2>

          <p className="text-center custom-text text-sm text-gray-600 -mt-4 mb-10">
            Welcome Student!
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-center custom-text text-sm text-gray-600 -mt-4 mb-10"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full  bg-[#043b64]/20 focus:bg-[#043b64]/10 px-3 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#db6d00]"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-center custom-text text-sm text-gray-600 -mt-4 mb-10"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full  bg-[#043b64]/20 focus:bg-[#043b64]/10 px-3 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#db6d00]"
                required
              />
            </div>

            <div className="text-center">
              <a
                href="#"
                className="text-center custom-text text-sm text-gray-600 -mt-4 mb-10 cursor-pointer hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              onClick={() => navigate("/student-dashboard")}
              className="w-full cursor-pointer bg-black text-white py-2 rounded-3xl hover:bg-gray-800 transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Student_login;
