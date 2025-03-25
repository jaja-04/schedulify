import React from "react";
import { HelpCircle } from "lucide-react";

const HelpSection = () => {
  const helpTopics = [
    {
      title: "Course Registration",
      description: "Learn how to register for courses, add or drop classes, and manage your academic schedule."
    },
    {
      title: "Academic Advising",
      description: "Find guidance on selecting courses, understanding degree requirements, and academic planning."
    },
    {
      title: "Technical Support",
      description: "Get help with student portal access, email, and other technical issues."
    },
    {
      title: "Financial Aid",
      description: "Information about scholarships, grants, loans, and financial assistance."
    }
  ];

  const contactInfo = [
    { label: "Student Services", phone: "(555) 123-4567" },
    { label: "IT Help Desk", phone: "(555) 987-6543" },
    { label: "Financial Aid Office", phone: "(555) 246-8101" }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <HelpCircle className="mr-4 w-10 h-10 text-blue-500" />
        <h1 className="text-2xl font-bold">Student Help Center</h1>
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

export default HelpSection;