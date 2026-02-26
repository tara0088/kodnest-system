import React from 'react';

const UpcomingAssessments = () => {
  const assessments = [
    {
      title: "DSA Mock Test",
      date: "Tomorrow",
      time: "10:00 AM",
      type: "Technical"
    },
    {
      title: "System Design Review",
      date: "Wed",
      time: "2:00 PM",
      type: "Design"
    },
    {
      title: "HR Interview Prep",
      date: "Friday",
      time: "11:00 AM",
      type: "Behavioral"
    }
  ];

  return (
    <div className="card p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Assessments</h3>
      
      <div className="space-y-4">
        {assessments.map((assessment, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{assessment.title}</h4>
              <p className="text-sm text-gray-600">{assessment.type}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">{assessment.date}</p>
              <p className="text-sm text-gray-600">{assessment.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingAssessments;