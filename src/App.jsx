import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './components/Dashboard';
import Practice from './components/Practice';
import Assessments from './components/Assessments';
import Resources from './components/Resources';
import Profile from './components/Profile';
import HistoryPage from './components/HistoryPage';
import ResultsPage from './components/ResultsPage';

function App() {
  const [currentAnalysis, setCurrentAnalysis] = useState(null);

  const handleViewAnalysis = (analysisData) => {
    setCurrentAnalysis(analysisData);
  };

  const handleBackToHistory = () => {
    setCurrentAnalysis(null);
  };

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="practice" element={<Practice />} />
            <Route path="assessments" element={<Assessments />} />
            <Route path="resources" element={<Resources />} />
            <Route path="profile" element={<Profile />} />
            <Route 
              path="history" 
              element={<HistoryPage onViewAnalysis={handleViewAnalysis} />} 
            />
            <Route 
              path="results" 
              element={<ResultsPage 
                analysisData={currentAnalysis} 
                onBackToHistory={handleBackToHistory} 
              />} 
            />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;