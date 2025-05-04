import React, { useState } from "react";
import { Calendar, CheckCircle, Loader2 } from "lucide-react";

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

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-gray-100">
      <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 p-12 w-full max-w-3xl mx-4">
        
        {/* Logo and Branding */}
        <div className="flex items-center justify-center mb-10">
          <div className="bg-slate-700/70 p-4 rounded-2xl">
            <Calendar size={40} className="text-orange-500" />
          </div>
          <div className="ml-4">
            <h1 className="font-extrabold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              SCHEDULIFY
            </h1>
            <p className="text-slate-400 text-sm mt-1">Your Courses, Your Time, Your Way!</p>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="space-y-10 text-center">
          <h2 className="text-4xl font-bold tracking-tight">
            Generate Weekly Schedule
          </h2>
          
          <div className="flex justify-center">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className={`group relative flex items-center justify-center py-4 px-8 text-lg font-semibold rounded-xl transition-all duration-300 w-full max-w-sm overflow-hidden
                ${loading 
                  ? "bg-slate-600 cursor-not-allowed" 
                  : "bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-lg hover:shadow-orange-500/30"
                }`}
            >
              <span className="relative flex items-center">
                {loading ? (
                  <>
                    <Loader2 size={22} className="mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Schedule
                  </>
                )}
              </span>
              {!loading && <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-300/20 to-transparent transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>}
            </button>
          </div>
          
          {status && (
            <div className={`py-4 px-6 rounded-xl ${status.includes("failed") || status.includes("Error") ? "bg-red-500/20 text-red-200" : "bg-green-500/20 text-green-200"} flex items-center justify-center transition-all duration-500 animate-fadeIn`}>
              <span className="mr-2">
                {status.includes("failed") || status.includes("Error") ? (
                  <span className="text-red-400">⚠️</span>
                ) : (
                  <CheckCircle size={20} className="text-green-400" />
                )}
              </span>
              <p className="font-medium">{status}</p>
            </div>
          )}
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl -z-10"></div>
      </div>
    </div>
  );
};

export default Admin_GenerateSchedule;