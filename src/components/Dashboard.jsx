import React from 'react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Your Dashboard</h1>
        <p className="text-gray-600">Track your progress and continue your placement preparation journey.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Your Progress</h3>
          <p className="text-gray-600">View your overall preparation progress and achievements.</p>
        </div>
        
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Recent Activity</h3>
          <p className="text-gray-600">See your latest practice sessions and assessments.</p>
        </div>
        
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Upcoming</h3>
          <p className="text-gray-600">Check your scheduled mock interviews and assessments.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;