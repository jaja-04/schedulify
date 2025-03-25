import bgImage from "../assets/1.png";
import React, { useState } from "react";

const Student = () => {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    email: "",
    srCode: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log(formData);
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

        <div className="relative z-10 w-full max-w-2xl bg-white/60 rounded-xl shadow-lg p-8 m-15 ">
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
                className="w-full  bg-[#043b64]/20 focus:bg-[#043b64]/10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#db6d00]"
                required
              />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full bg-[#043b64]/20 focus:bg-[#043b64]/10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#db6d00]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="middleName"
                placeholder="Middle Name (Optional)"
                value={formData.middleName}
                onChange={handleChange}
                className="w-full  bg-[#043b64]/20 focus:bg-[#043b64]/10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#db6d00]"
              />
              <input
                type="text"
                name="srCode"
                placeholder="SR Code"
                value={formData.srCode}
                onChange={handleChange}
                className="w-full  bg-[#043b64]/20 focus:bg-[#043b64]/10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#db6d00]"
                required
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full  bg-[#043b64]/20 focus:bg-[#043b64]/10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#db6d00]"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="password"
                name="password"
                placeholder="Enter your Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full  bg-[#043b64]/20 focus:bg-[#043b64]/10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#db6d00]"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full  bg-[#043b64]/20 focus:bg-[#043b64]/10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#db6d00]"
                required
              />
            </div>

            <div className="flex mt-10 justify-center mb-6 items-center">
              <input type="checkbox" id="terms" className="mr-2" required />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I have read and agreed to the 
                <span className="text-[#db6d00] ml-1 hover:underline cursor-pointer">Terms and Conditions</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300"
            >
              Sign Up
            </button>

            <div className="text-center mt-4">
              <span className="text-gray-600">
                Already Registered?
                <a
                  href="/login"
                  className="text-[#db6d00] ml-1 hover:underline"
                >
                  Login
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Student;
