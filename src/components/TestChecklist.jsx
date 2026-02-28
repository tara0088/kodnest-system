import React, { useState, useEffect } from 'react';
import { 
  TEST_ITEMS, 
  getTestChecklist, 
  updateTestItem, 
  resetTestChecklist, 
  getTestSummary 
} from '../utils/testChecklist';

const TestChecklist = () => {
  const [checklist, setChecklist] = useState({});
  const [showHints, setShowHints] = useState({});
  const [summary, setSummary] = useState({ total: 0, completed: 0, percentage: 0, isComplete: false });

  useEffect(() => {
    const initialChecklist = getTestChecklist();
    const initialSummary = getTestSummary();
    setChecklist(initialChecklist);
    setSummary(initialSummary);
  }, []);

  const handleCheckboxChange = (itemId, checked) => {
    const updatedChecklist = updateTestItem(itemId, checked);
    const updatedSummary = getTestSummary();
    setChecklist(updatedChecklist);
    setSummary(updatedSummary);
  };

  const handleReset = () => {
    const resetChecklist = resetTestChecklist();
    const resetSummary = getTestSummary();
    setChecklist(resetChecklist);
    setSummary(resetSummary);
    setShowHints({});
  };

  const toggleHint = (itemId) => {
    setShowHints(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Checklist</h1>
            <p className="text-gray-600">Verify all critical functionality before shipping</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">
                {summary.completed} / {summary.total}
              </div>
              <div className="text-gray-600">Tests Passed</div>
              <div className="text-lg font-semibold mt-1">
                {summary.percentage}%
              </div>
            </div>
          </div>
        </div>
        
        {summary.completed < summary.total && (
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-amber-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-amber-800 font-medium">Fix issues before shipping.</p>
            </div>
          </div>
        )}
        
        {summary.isComplete && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-green-800 font-medium">All tests passed! Ready for shipping.</p>
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <div className="space-y-6">
          {TEST_ITEMS.map((item) => {
            const isChecked = checklist[item.id]?.checked || false;
            const showHint = showHints[item.id] || false;
            
            return (
              <div key={item.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-sm transition-shadow">
                <div className="flex items-start">
                  <div className="flex items-center h-5 mt-0.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
                      className="h-5 w-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <label className="block text-lg font-medium text-gray-900 cursor-pointer">
                      {item.title}
                    </label>
                    
                    <div className="mt-3">
                      <button
                        onClick={() => toggleHint(item.id)}
                        className="text-sm text-primary-600 hover:text-primary-800 font-medium flex items-center"
                      >
                        {showHint ? 'Hide' : 'Show'} testing instructions
                        <svg 
                          className={`ml-1 w-4 h-4 transform transition-transform ${showHint ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {showHint && (
                        <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <p className="text-gray-700 text-sm">
                            <span className="font-medium">How to test:</span> {item.howToTest}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset checklist
          </button>
          
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestChecklist;