import React from "react";
import { HelpCircle } from "lucide-react";

const AdminHelp = () => {
  const helpTopics = [
    {
      title: "Schedule Management",
      description: "Learn how to manage and resolve scheduling conflicts, generate schedules, and modify course assignments."
    },
    {
      title: "System Configuration",
      description: "Understand how to configure the system settings, manage users, and monitor system performance."
    },
    {
      title: "User Management",
      description: "Get guidance on managing user roles, permissions, and troubleshooting user-related issues."
    },
    {
      title: "Reporting and Analytics",
      description: "Find out how to generate reports on schedules, student enrollment, and system usage."
    }
  ];

  const contactInfo = [
    { label: "Admin Support", phone: "(555) 123-4567" },
    { label: "IT Support", phone: "(555) 987-6543" },
    { label: "Help Desk", phone: "(555) 246-8101" }
  ];

  return (
    <div className="p-6">
      {/* Updated header section - removing the "He" text */}
      <div className="flex items-center mb-6">
        <div className="flex items-center">
          <HelpCircle className="mr-4 w-10 h-10 text-blue-500" />
          <h1 className="text-2xl font-bold">Admin Help Center</h1>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Help Topics */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Help Topics</h2>
          <div className="space-y-4">
            {helpTopics.map((topic, index) => (
              <div key={index} className="border-b border-gray-700 pb-4 last:border-b-0">
                <h3 className="font-bold text-blue-400 mb-2">{topic.title}</h3>
                <p className="text-gray-400 text-sm">{topic.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Contact Support</h2>
          <div className="space-y-4">
            {contactInfo.map((contact, index) => (
              <div 
                key={index} 
                className="flex justify-between items-center p-3 bg-gray-700 rounded-lg"
              >
                <span className="font-medium">{contact.label}</span>
                <span className="text-blue-400">{contact.phone}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm mb-2">Need more help?</p>
            <button 
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHelp;