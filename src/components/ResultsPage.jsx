import React from 'react';
import { useLocation } from 'react-router-dom';
import { SkillAnalyzer } from '../utils/skillAnalyzer';

const ResultsPage = ({ analysisData, onBackToHistory }) => {
  const location = useLocation();
  const routeAnalysisData = location.state?.analysisData;
  
  // Use route data if available, otherwise use prop data
  const finalAnalysisData = routeAnalysisData || analysisData;
  
  if (!finalAnalysisData) {
    return (
      <div className="card p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No Analysis Data</h2>
        <p className="text-gray-600 mb-6">Please perform a job analysis first.</p>
        <button 
          onClick={onBackToHistory}
          className="btn-primary"
        >
          View History
        </button>
      </div>
    );
  }

  const { 
    company, 
    role, 
    extractedSkills, 
    readinessScore, 
    checklist, 
    plan, 
    questions 
  } = finalAnalysisData;

  // Count skills by category
  const skillsByCategory = Object.entries(extractedSkills).filter(([_, skills]) => skills.length > 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analysis Results</h1>
            <div className="flex flex-wrap gap-4 text-gray-600">
              {company && <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full">🏢 {company}</span>}
              {role && <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">💼 {role}</span>}
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">📊 {readinessScore}/100 Readiness</span>
            </div>
          </div>
          <button 
            onClick={onBackToHistory}
            className="btn-primary"
          >
            View History
          </button>
        </div>
      </div>

      {/* Key Skills Extracted */}
      <div className="card p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Skills Extracted</h2>
        {skillsByCategory.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillsByCategory.map(([category, skills]) => (
              <div key={category} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="bg-white border border-gray-200 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">No specific technical skills detected. General fresher stack recommended.</p>
          </div>
        )}
      </div>

      {/* Readiness Score */}
      <div className="card p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Readiness Assessment</h2>
        <div className="flex items-center justify-center">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#818cf8"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 45}
                strokeDashoffset={2 * Math.PI * 45 * (1 - readinessScore / 100)}
                transform="rotate(-90 50 50)"
                className="transition-all duration-1000 ease-in-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-gray-900">{readinessScore}</span>
              <span className="text-sm text-gray-600">/100</span>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="text-gray-600">
            {readinessScore >= 80 ? 'Excellent preparation level!' : 
             readinessScore >= 60 ? 'Good preparation with room for improvement.' : 
             'Needs focused preparation in key areas.'}
          </p>
        </div>
      </div>

      {/* Preparation Checklist */}
      <div className="card p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Round-wise Preparation Checklist</h2>
        <div className="space-y-6">
          {Object.entries(checklist).map(([round, items]) => (
            <div key={round} className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{round}</h3>
              <ul className="space-y-2">
                {items.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 mt-0.5 mr-3 text-primary-500">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Plan */}
      <div className="card p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">7-Day Preparation Plan</h2>
        <div className="space-y-4">
          {plan.map((dayPlan, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{dayPlan.day}</h3>
                <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
                  {dayPlan.focus}
                </span>
              </div>
              <ul className="space-y-1">
                {dayPlan.tasks.map((task, taskIndex) => (
                  <li key={taskIndex} className="flex items-start text-gray-700">
                    <span className="flex-shrink-0 w-4 h-4 mt-1 mr-2 text-primary-400">→</span>
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Interview Questions */}
      <div className="card p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Likely Interview Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {questions.map((q, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">
                  {q.category}
                </span>
                <span className="text-xs text-gray-600">
                  {q.skills.join(', ')}
                </span>
              </div>
              <p className="text-gray-800">{q.question}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;