import React, { useState } from "react";
import Logo from "../assets/Schedulify.png";
import bgImage from "../assets/1.png";

const Admin_GenerateSchedule = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("http://localhost:5000/api/schedule/generate", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        setStatus(data.message || "Schedule generated successfully.");
      } else {
        setStatus(data.message || "Schedule generation failed.");
      }
    } catch (error) {
      setStatus("Server Error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  console.log("admin_generate");

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
      <div className="min-h-screen flex items-center justify-center relative">
        {/* Blur background */}
        <div className="absolute inset-0 w-full h-full bg-cover bg-center opacity-60 filter blur-sm"
          style={{ backgroundImage: 'url("/api/placeholder/1200/800")', filter: "blur(4px)" }}
        />
        <div className="absolute inset-0 w-full h-full bg-white opacity-20" />

        {/* Content */}
        <div className="flex flex-col justify-center items-center z-10">
          <img src={Logo} alt="Schedulify" className="w-115 -mt-40 mb-8" />
          <div className="bg-gray-300/30 rounded-xl shadow-lg p-8 text-center w-[30rem]">
            <h2 className="text-3xl font-bold text-[#0d1a29] mb-6">Generate Weekly Schedule</h2>
            
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="bg-[#db6d00] text-white py-3 px-6 rounded-3xl w-full text-lg hover:bg-[#bf5f00] transition"
            >
              {loading ? "Generating..." : "Generate Schedule"}
            </button>

            {status && (
              <p className="mt-4 text-sm text-gray-800 font-medium">
                {status}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_GenerateSchedule;
