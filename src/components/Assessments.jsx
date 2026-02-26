import React from 'react';

const Assessments = () => {
  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Assessments</h1>
        <p className="text-gray-600">Evaluate your skills with comprehensive assessments and tests.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Technical Tests</h3>
          <p className="text-gray-600">Take timed coding assessments to simulate real interview conditions.</p>
        </div>
        
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Skill Evaluation</h3>
          <p className="text-gray-600">Get detailed feedback on your technical and problem-solving abilities.</p>
        </div>
      </div>
    </div>
  );
};

export default Assessments;