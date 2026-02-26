import React from 'react';
import OverallReadiness from './OverallReadiness';
import SkillBreakdown from './SkillBreakdown';
import ContinuePractice from './ContinuePractice';
import WeeklyGoals from './WeeklyGoals';
import UpcomingAssessments from './UpcomingAssessments';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Track your progress and continue your placement preparation journey.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <OverallReadiness />
          <SkillBreakdown />
          <WeeklyGoals />
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          <ContinuePractice />
          <UpcomingAssessments />
        </div>
      </div>
    </div>
  );
};


export default Dashboard;