import React from 'react';
import { Printer } from 'lucide-react';

const Admin_ManageSchedule = () => {
  // Handle the print functionality
  const handlePrint = () => {
    window.print(); // Trigger the browser's print dialog
  };

  return (
    <div className="p-6 relative">
      {/* Title */}
      <h1 className="text-2xl font-bold text-white mb-6">Manage Courses</h1>

      {/* Container to Align to the Left */}
      <div className="flex justify-start">
        <div className="w-full max-w-2xl">
          {/* Schedule Summary Card */}
          <div className="bg-gray-800 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Schedule Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-white">
                <span>Total schedules generated:</span>
                <span className="font-bold">10</span> {/* Example data */}
              </div>
              <div className="flex justify-between text-white">
                <span>Pending conflicts to resolve:</span>
                <span className="font-bold">3</span> {/* Example data */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Button Group (Positioned to Top Right) */}
      <div className="absolute top-4 right-4 space-x-4 flex">
        <div
          onClick={handlePrint}  // Handle the print functionality
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 text-white cursor-pointer flex items-center"
        >
          <Printer className="mr-2 w-4 h-4" />
          <span>Export/Print</span>
        </div>
        <div
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-yellow-700 text-white cursor-pointer"
        >
          Fix Conflict
        </div>
      </div>
    </div>
  );
};

export default Admin_ManageSchedule;
