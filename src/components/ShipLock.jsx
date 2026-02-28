import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTestSummary, isShippingLocked } from '../utils/testChecklist';

const ShipLock = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [summary, setSummary] = useState({ total: 0, completed: 0, percentage: 0, isComplete: false });

  useEffect(() => {
    const locked = isShippingLocked();
    const testSummary = getTestSummary();
    setIsLocked(locked);
    setSummary(testSummary);
  }, []);

  if (!isLocked) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center py-12">
          <div className="text-green-500 mb-6">
            <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Ready for Shipping!</h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            All tests passed successfully. The platform is ready for production deployment.
          </p>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <div className="text-2xl font-bold text-green-700 mb-2">
              {summary.completed} / {summary.total} Tests Passed
            </div>
            <div className="text-green-600 font-medium">
              {summary.percentage}% Complete
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/analysis" 
              className="btn-primary px-8 py-3 text-lg"
            >
              Start New Analysis
            </Link>
            <Link 
              to="/history" 
              className="btn-secondary px-8 py-3 text-lg"
            >
              View History
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card text-center py-12">
        <div className="text-amber-500 mb-6">
          <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Shipping Locked</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Complete all required tests before shipping the platform to production.
        </p>
        
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
          <div className="text-2xl font-bold text-amber-700 mb-2">
            {summary.completed} / {summary.total} Tests Passed
          </div>
          <div className="text-amber-600 font-medium mb-4">
            {summary.percentage}% Complete
          </div>
          <div className="text-amber-800">
            {summary.total - summary.completed} tests remaining
          </div>
        </div>
        
        <div className="space-y-4">
          <Link 
            to="/prp/07-test" 
            className="btn-primary px-8 py-3 text-lg inline-block"
          >
            Complete Test Checklist
          </Link>
          
          <div className="text-sm text-gray-500 mt-4">
            <p>Return here after completing all tests to unlock shipping.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipLock;