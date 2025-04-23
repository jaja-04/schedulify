import React from "react";
import { HelpCircle } from "lucide-react";

const Faculty_help = () => {
  const helpTopics = [
    {
      title: "Schedule Management",
      description: "Guidance on viewing, updating, and managing your teaching schedules."
    },
    {
      title: "Classroom Resources",
      description: "Learn how to access and utilize digital and physical classroom tools effectively."
    },
    {
      title: "Grading & Evaluation",
      description: "Instructions on entering grades, evaluating student performance, and providing feedback."
    },
    {
      title: "Faculty Portal Assistance",
      description: "Get support with accessing the faculty portal, uploading materials, and other technical issues."
    }
  ];

  const contactInfo = [
    { label: "Academic Affairs", phone: "(555) 321-0001" },
    { label: "IT Faculty Support", phone: "(555) 654-7890" },
    { label: "HR Department", phone: "(555) 111-2233" }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <HelpCircle className="mr-4 w-10 h-10 text-blue-500" />
        <h1 className="text-2xl font-bold">Faculty Help Center</h1>
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

export default Faculty_help;
