import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './components/Dashboard';
import Practice from './components/Practice';
import Assessments from './components/Assessments';
import Resources from './components/Resources';
import Profile from './components/Profile';
import AnalysisForm from './components/AnalysisForm';
import ResultsPage from './components/ResultsPage';
import HistoryPage from './components/HistoryPage';
import TestChecklist from './components/TestChecklist';
import ShipLock from './components/ShipLock';

function App() {
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
          </Route>
          <Route path="/analysis" element={<AnalysisForm />} />
          <Route path="/results/:id" element={<ResultsPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/prp/07-test" element={<TestChecklist />} />
          <Route path="/prp/08-ship" element={<ShipLock />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;