import React, { useState } from "react";

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Faculty_ManageAvailability = ({ userId }) => {
  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSave = async () => {
    if (selectedDays.length === 0 || !userId) return;

    try {
      for (const day of selectedDays) {
        await fetch("http://localhost:5000/api/requests", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // if you're using cookies
          body: JSON.stringify({
            selectedDate: day, // might want to use actual date instead
            userId
          }),
        });
      }

      alert("Day-off requests submitted!");
      setSelectedDays([]);
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-white">Availability</h1>

      <div className="bg-gray-800 p-4 rounded-lg">
        <label className="block text-sm text-gray-400 mb-4">Select Your Day-off</label>
        <div className="grid grid-cols-2 gap-2 text-white">
          {daysOfWeek.map((day) => (
            <label key={day} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedDays.includes(day)}
                onChange={() => toggleDay(day)}
                className="form-checkbox text-blue-500"
              />
              <span>{day}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 text-white"
        >
          Save Availability
        </button>
      </div>
    </div>
  );
};

export default Faculty_ManageAvailability;
