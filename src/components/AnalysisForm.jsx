import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SkillAnalyzer } from '../utils/skillAnalyzer';

const AnalysisForm = ({ onAnalysisComplete }) => {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [jdText, setJdText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jdText.trim()) return;

    setIsAnalyzing(true);

    try {
      // Extract skills
      const extractedSkills = SkillAnalyzer.extractSkills(jdText);
      
      // Calculate readiness score
      const readinessScore = SkillAnalyzer.calculateReadinessScore(company, role, jdText, extractedSkills);
      
      // Generate checklist
      const checklist = SkillAnalyzer.generateChecklist(extractedSkills);
      
      // Generate 7-day plan
      const plan = SkillAnalyzer.generate7DayPlan(extractedSkills);
      
      // Generate interview questions
      const questions = SkillAnalyzer.generateQuestions(extractedSkills);
      
      // Prepare analysis data
      const analysisData = {
        company,
        role,
        jdText,
        extractedSkills,
        plan,
        checklist,
        questions,
        readinessScore
      };
      
      // Save to history
      const savedEntry = SkillAnalyzer.saveToHistory(analysisData);
      
      // Navigate to results page
      navigate('/dashboard/results', { state: { analysisData: savedEntry } });
      
      // Also pass to parent component if provided
      if (onAnalysisComplete) {
        onAnalysisComplete(savedEntry);
      }
      
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="card p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Analysis</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., Google, Microsoft"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role/Position
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., Software Engineer, Frontend Developer"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Description *
          </label>
          <textarea
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            rows={12}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Paste the complete job description here..."
            required
          />
          <p className="text-sm text-gray-500 mt-2">
            {jdText.length} characters
          </p>
        </div>
        
        <button
          type="submit"
          disabled={isAnalyzing || !jdText.trim()}
          className="btn-primary w-full py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Job Requirements'}
        </button>
      </form>
    </div>
  );
};

export default AnalysisForm;