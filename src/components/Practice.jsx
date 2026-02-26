import React from 'react';

const Practice = () => {
  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Practice Problems</h1>
        <p className="text-gray-600">Sharpen your coding skills with our curated problem sets.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Coding Challenges</h3>
          <p className="text-gray-600">Practice data structures and algorithms with step-by-step solutions.</p>
        </div>
        
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">System Design</h3>
          <p className="text-gray-600">Work on real-world system design problems and architectures.</p>
        </div>
      </div>
    </div>
  );
};

export default Practice;