import bgImage from "../assets/1.png";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const FacultyLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();   // ⭐ useNavigate hook

  const handleLogin = (e) => {
    e.preventDefault();

    // 🔒 very simple, client‑side credential check (for demo purposes only!)
    if (email === "faculty@example.com" && password === "faculty123") {
      navigate("/faculty-dashboard");   // ✅ go to dashboard
    } else {
      alert("Invalid credentials, please try again.");  // ❌ fail
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
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url("/api/placeholder/1200/800")',
            filter: "blur(4px)",
          }}
        />

        <div className="relative z-10 w-full max-w-2xl bg-white/60 rounded-xl shadow-lg ml-[800px] p-8 m-15">
          <h2 className="text-3xl font-extrabold text-[#db6d00] mb-6 text-center">
            Login
          </h2>
          <p className="text-center text-sm text-gray-600 mb-8">
            Welcome Faculty!
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block">
              <span className="text-sm">Email</span>
              <input
                type="email"
                className="w-full bg-[#043b64]/20 px-3 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#db6d00]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label className="block">
              <span className="text-sm">Password</span>
              <input
                type="password"
                className="w-full bg-[#043b64]/20 px-3 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#db6d00]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-3xl hover:bg-gray-800 transition"
            >
              Login
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default FacultyLogin;
