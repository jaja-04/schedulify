import bgImage from "../assets/1.png";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 


const Admin_login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();  // Use the useNavigate hook to navigate after login

  const handleLogin = (e) => {
    e.preventDefault();
    // Here you can add your authentication logic. For example:
    if (email === "admin@example.com" && password === "admin123") {
      // If login is successful, navigate to the admin dashboard
      navigate("/admin-dashboard");
    } else {
      // If login fails, you could show an error message or alert
      alert("Invalid credentials, please try again.");
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
              Welcome Admin!
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
                onClick={() => navigate("/admin-dashboard")}
                className="w-full cursor-pointer bg-black text-white py-2 rounded-3xl hover:bg-gray-800 transition duration-300"
              >
                Login
              </button>
  
              <div className="text-center mt-4 text-gray-600">
                Don't have an account?
                <Link
                    to="/admin-register"
                    className="text-[#db6d00] cursor-pointer ml-1 hover:underline"
                  >
                    Register
                  </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
export default Admin_login