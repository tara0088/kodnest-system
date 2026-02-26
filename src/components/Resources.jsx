import React from 'react';

const Resources = () => {
  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Resources</h1>
        <p className="text-gray-600">Access curated study materials and preparation guides.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Study Guides</h3>
          <p className="text-gray-600">Comprehensive guides for technical interview preparation.</p>
        </div>
        
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Video Tutorials</h3>
          <p className="text-gray-600">Learn from expert instructors and industry professionals.</p>
        </div>
        
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Interview Tips</h3>
          <p className="text-gray-600">Proven strategies and best practices for success.</p>
        </div>
      </div>
    </div>
  );
};

export default Resources;