import React from 'react';

const OverallReadiness = () => {
  const score = 72;
  const circumference = 2 * Math.PI * 45; // 45 is the radius
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="card flex flex-col items-center p-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Overall Readiness</h3>
      
      <div className="relative w-48 h-48">
        {/* Background circle */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#818cf8"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 50 50)"
            className="transition-all duration-1000 ease-in-out"
          />
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-gray-900">{score}</span>
          <span className="text-sm text-gray-600">/100</span>
        </div>
      </div>
      
      <p className="text-center text-gray-600 mt-4">Readiness Score</p>
    </div>
  );
};

export default OverallReadiness;