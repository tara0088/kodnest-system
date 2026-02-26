import React from 'react';

const ContinuePractice = () => {
  const progress = 3;
  const total = 10;
  const percentage = (progress / total) * 100;

  return (
    <div className="card p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Continue Practice</h3>
      
      <div className="space-y-4">
        <div>
          <p className="text-gray-900 font-medium">Current Topic</p>
          <p className="text-2xl font-bold text-primary-600">Dynamic Programming</p>
        </div>
        
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{progress}/{total} completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-primary-500 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
        
        <button className="btn-primary w-full py-3">
          Continue
        </button>
      </div>
    </div>
  );
};

export default ContinuePractice;