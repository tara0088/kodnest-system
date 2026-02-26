import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHistory } from '../utils/skillAnalyzer';

const HistoryPage = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const filteredHistory = history.filter(item =>
    item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    new Date(item.createdAt).toLocaleDateString().includes(searchTerm)
  );

  const handleViewAnalysis = (id) => {
    navigate(`/results/${id}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analysis History</h1>
            <p className="text-gray-600 mt-2">
              {history.length} analysis{history.length !== 1 ? 'es' : ''} saved
            </p>
          </div>
          <button
            onClick={() => navigate('/analysis')}
            className="btn-primary mt-4 md:mt-0"
          >
            New Analysis
          </button>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No analysis history yet</h3>
          <p className="text-gray-600 mb-6">Start by analyzing a job description to see your preparation insights.</p>
          <button
            onClick={() => navigate('/analysis')}
            className="btn-primary"
          >
            Analyze Your First JD
          </button>
        </div>
      ) : (
        <>
          {/* Search */}
          <div className="card mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by company, role, or date..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* History List */}
          <div className="space-y-4">
            {filteredHistory.map((item) => (
              <div key={item.id} className="card hover:shadow-md transition-shadow duration-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{item.company}</h3>
                      <span className="mx-3 text-gray-300">•</span>
                      <span className="text-gray-600">{item.role}</span>
                    </div>
                    <p className="text-gray-500 text-sm mb-3">
                      Analyzed on {formatDate(item.createdAt)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(item.extractedSkills).slice(0, 3).map(([category, skills]) => (
                        <span key={category} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                          {category}: {skills.length} skills
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-4 md:mt-0">
                    <div className={`px-4 py-2 rounded-full font-semibold mr-4 ${getScoreColor(item.readinessScore)}`}>
                      {item.readinessScore}/100
                    </div>
                    <button
                      onClick={() => handleViewAnalysis(item.id)}
                      className="btn-primary py-2 px-4"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {searchTerm && filteredHistory.length === 0 && (
            <div className="card text-center py-8">
              <p className="text-gray-600">No matching analyses found.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HistoryPage;