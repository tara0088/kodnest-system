import React, { useState } from 'react';
import OverallReadiness from './OverallReadiness';
import SkillBreakdown from './SkillBreakdown';
import ContinuePractice from './ContinuePractice';
import WeeklyGoals from './WeeklyGoals';
import UpcomingAssessments from './UpcomingAssessments';
import AnalysisForm from './AnalysisForm';

const Dashboard = () => {
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleAnalysisComplete = (analysisData) => {
    // Redirect to results page or show results in modal
    console.log('Analysis completed:', analysisData);
    // For now, we'll just show a success message
    alert(`Analysis complete! Readiness Score: ${analysisData.readinessScore}/100`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Track your progress and continue your placement preparation journey.</p>
        </div>
        <button 
          onClick={() => setShowAnalysis(!showAnalysis)}
          className="btn-primary"
        >
          {showAnalysis ? 'Hide Analysis' : 'Analyze Job' }
        </button>
      </div>
      
      {showAnalysis && (
        <AnalysisForm onAnalysisComplete={handleAnalysisComplete} />
      )}
      
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