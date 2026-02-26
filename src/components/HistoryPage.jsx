import React, { useState, useEffect } from 'react';
import { SkillAnalyzer } from '../utils/skillAnalyzer';

const HistoryPage = ({ onViewAnalysis }) => {
  const [history, setHistory] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const historyData = SkillAnalyzer.getHistory();
    setHistory(historyData);
  };

  const handleViewAnalysis = (entry) => {
    setSelectedEntry(entry);
    if (onViewAnalysis) {
      onViewAnalysis(entry);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (selectedEntry) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Analysis Results</h1>
          <button 
            onClick={() => setSelectedEntry(null)}
            className="btn-primary"
          >
            ← Back to History
          </button>
        </div>
        <div className="card p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {selectedEntry.company || 'Unknown Company'}
            </h2>
            <p className="text-gray-600">
              {selectedEntry.role || 'Unknown Role'} • {formatDate(selectedEntry.createdAt)}
            </p>
            <div className="mt-2">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                📊 {selectedEntry.readinessScore}/100 Readiness
              </span>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Extracted Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {Object.entries(selectedEntry.extractedSkills)
                .filter(([_, skills]) => skills.length > 0)
                .map(([category, skills]) => (
                  <div key={category} className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">{category}</h4>
                    <div className="flex flex-wrap gap-1">
                      {skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="bg-white border border-gray-200 px-2 py-1 rounded text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">7-Day Plan Overview</h3>
                <ul className="space-y-2">
                  {selectedEntry.plan.slice(0, 3).map((dayPlan, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                      <span><strong>{dayPlan.day}:</strong> {dayPlan.focus}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Questions</h3>
                <ul className="space-y-2">
                  {selectedEntry.questions.slice(0, 3).map((q, index) => (
                    <li key={index} className="text-gray-700">
                      <span className="text-primary-600 font-medium">{q.category}:</span> {q.question}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <button 
                onClick={() => handleViewAnalysis(selectedEntry)}
                className="btn-primary px-8 py-3"
              >
                View Full Analysis
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Analysis History</h1>
        <div className="text-gray-600">
          {history.length} {history.length === 1 ? 'analysis' : 'analyses'} saved
        </div>
      </div>
      
      {history.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="text-6xl mb-4">📊</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Analysis History</h2>
          <p className="text-gray-600 mb-6">Perform your first job analysis to see it here.</p>
          <button 
            onClick={() => window.location.href = '/dashboard'}
            className="btn-primary"
          >
            Go to Dashboard
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {history.map((entry) => (
            <div 
              key={entry.id} 
              className="card p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onClick={() => handleViewAnalysis(entry)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {entry.company || 'Unknown Company'}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {entry.role || 'Unknown Role'}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {Object.entries(entry.extractedSkills)
                      .filter(([_, skills]) => skills.length > 0)
                      .slice(0, 3)
                      .map(([category, skills]) => (
                        <span 
                          key={category} 
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                        >
                          {skills[0]}{skills.length > 1 ? ` +${skills.length - 1}` : ''}
                        </span>
                      ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    Analyzed on {formatDate(entry.createdAt)}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary-600 mb-1">
                    {entry.readinessScore}
                  </div>
                  <div className="text-sm text-gray-500">/100</div>
                  <div className="mt-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      entry.readinessScore >= 80 ? 'bg-green-100 text-green-800' :
                      entry.readinessScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {entry.readinessScore >= 80 ? 'Excellent' : 
                       entry.readinessScore >= 60 ? 'Good' : 'Needs Work'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;