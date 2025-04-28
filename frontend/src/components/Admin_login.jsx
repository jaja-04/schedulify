import bgImage from "../assets/1.png";
import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../../src/context/authContext";
import { useNavigate } from "react-router-dom";

const Admin_login = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userRole", response.data.user.role);

        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else if (response.data.user.role === "faculty") {
          navigate("/faculty-dashboard");
        } else {
          navigate("/student-dashboard");
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Server Error");
      }
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

        <div className="relative z-10 w-full max-w-3xl bg-white/60 rounded-xl shadow-lg ml-[800px] p-8 m-15">
          <h2 className="text-5xl custom-text font-extrabold text-[#db6d00] mb-6 text-center leading-none">
            Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm text-gray-600 font-medium"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full bg-[#043b64]/20 px-4 py-3.5 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#db6d00] custom-text text-sm text-gray-600"
                placeholder={isEmailFocused ? "" : "Enter Email"}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm text-gray-600 font-medium"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full bg-[#043b64]/20 px-4 py-3.5 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#db6d00] custom-text text-sm text-gray-600"
                placeholder={isPasswordFocused ? "" : "Enter Password"}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            <div className="flex flex-col items-center space-y-4 space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                  className="mr-2"
                />
                <span>Remember me</span>
              </label>

              <a
                href="#"
                className="custom-text text-sm text-gray-600 cursor-pointer hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-black text-white py-4 rounded-3xl hover:bg-gray-800 transition duration-300 mt-6"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin_login;
