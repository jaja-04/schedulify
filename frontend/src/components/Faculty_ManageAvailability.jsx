import React, { useState } from "react";

const Faculty_ManageAvailability = ({ onSave }) => {
  const [preferredDays, setPreferredDays] = useState("");
  const [dayOffs, setDayOffs] = useState("");

  // Save availability
  const handleSave = () => {
    if (!preferredDays || !dayOffs) return;

    onSave(preferredDays, dayOffs); // Pass data back to the parent component

    // Reset fields after saving
    setPreferredDays("");
    setDayOffs("");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-white">Availability</h1>

      {/* Preferred Working Days/Times */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <label className="block text-sm text-gray-400 mb-2">Preferred Working Days/Times</label>
        <select
          value={preferredDays}
          onChange={(e) => setPreferredDays(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
        >
          <option value="">Select Preferred Working Days/Times</option>
          <option value="monday">Sunday</option>
          <option value="monday">Monday</option>
          <option value="tuesday">Tuesday</option>
          <option value="wednesday">Wednesday</option>
          <option value="thursday">Thursday</option>
          <option value="friday">Friday</option>
          <option value="monday">Saturday</option>
        </select>
      </div>

      {/* Day-offs and Unavailable Slots */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <label className="block text-sm text-gray-400 mb-2">Day-offs and Unavailable Slots</label>
        <select
          value={dayOffs}
          onChange={(e) => setDayOffs(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
        >
          <option value="">Select Day-offs and Unavailable Slots</option>
          <option value="monday">Sunday</option>
          <option value="monday">Monday</option>
          <option value="tuesday">Tuesday</option>
          <option value="wednesday">Wednesday</option>
          <option value="thursday">Thursday</option>
          <option value="friday">Friday</option>
          <option value="monday">Saturday</option>
        </select>
      </div>

      {/* Save Availability */}
      <div className="flex justify-center mt-4">
        <div
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 text-white cursor-pointer"
        >
          Save Availability
        </div>
      </div>
    </div>
  );
};

export default Faculty_ManageAvailability;
