import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getHistoryItem } from '../utils/skillAnalyzer';

const ResultsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [analysisData, setAnalysisData] = useState(null);
  const [activeTab, setActiveTab] = useState('skills');

  useEffect(() => {
    if (id) {
      // Load from history
      const historyItem = getHistoryItem(id);
      if (historyItem) {
        setAnalysisData(historyItem);
      } else {
        navigate('/analysis');
      }
    }
  }, [id, navigate]);

  if (!analysisData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analysis...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'skills', label: 'Key Skills' },
    { id: 'checklist', label: 'Preparation Checklist' },
    { id: 'plan', label: '7-Day Plan' },
    { id: 'questions', label: 'Interview Questions' }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analysis Results</h1>
            <p className="text-gray-600 mt-2">
              {analysisData.company} • {analysisData.role} • {new Date(analysisData.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary-600">
                {analysisData.readinessScore}
              </div>
              <div className="text-gray-600">Readiness Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="card">
        {activeTab === 'skills' && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Key Skills Extracted</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(analysisData.extractedSkills).map(([category, skills]) => (
                <div key={category} className="bg-gray-50 p-5 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3 text-lg">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'checklist' && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Round-wise Preparation Checklist</h3>
            <div className="space-y-6">
              {Object.entries(analysisData.checklist).map(([round, items]) => (
                <div key={round} className="border border-gray-200 rounded-lg p-5">
                  <h4 className="font-semibold text-gray-800 mb-4 text-lg">{round}</h4>
                  <ul className="space-y-2">
                    {items.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                        </div>
                        <p className="ml-3 text-gray-700">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'plan' && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">7-Day Preparation Plan</h3>
            <div className="space-y-6">
              {Object.entries(analysisData.plan).map(([day, items]) => (
                <div key={day} className="border border-gray-200 rounded-lg p-5">
                  <h4 className="font-semibold text-gray-800 mb-4 text-lg">{day}</h4>
                  <ul className="space-y-2">
                    {items.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                        </div>
                        <p className="ml-3 text-gray-700">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'questions' && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Likely Interview Questions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {analysisData.questions.map((question, index) => (
                <div key={index} className="bg-gray-50 p-5 rounded-lg">
                  <div className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-800 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                      {index + 1}
                    </span>
                    <p className="text-gray-800">{question}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;