import React, { useState } from 'react';
import { 
  extractSkills, 
  calculateReadinessScore, 
  generateChecklist, 
  generatePlan, 
  generateQuestions, 
  saveToHistory 
} from '../utils/skillAnalyzer';
import { validateJdInput, createDefaultAnalysisEntry } from '../utils/dataValidation';

const AnalysisForm = () => {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [jdText, setJdText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate input
    const validation = validateJdInput(jdText);
    if (!validation.isValid) {
      setValidationError(validation.errors[0]);
      return;
    }
    
    setValidationError('');
    setIsAnalyzing(true);
    
    // Simulate processing time for better UX
    setTimeout(() => {
      try {
        // Extract skills
        const extractedSkills = extractSkills(jdText);
        
        // Calculate readiness score
        const baseScore = calculateReadinessScore(extractedSkills, company, role, jdText);
        
        // Generate outputs
        const checklist = generateChecklist(extractedSkills);
        const plan = generatePlan(extractedSkills);
        const questions = generateQuestions(extractedSkills);
        
        // Prepare analysis data with standardized schema
        const analysisData = createDefaultAnalysisEntry({
          company,
          role,
          jdText,
          extractedSkills,
          checklist: Object.entries(checklist).map(([roundTitle, items]) => ({ roundTitle, items })),
          plan7Days: Object.entries(plan).map(([day, tasks]) => ({ day, tasks })),
          questions,
          baseScore,
          finalScore: baseScore
        });
        
        // Save to history
        const savedEntry = saveToHistory(analysisData);
        
        // Set result
        setAnalysisResult(savedEntry);
        
      } catch (error) {
        console.error('Analysis failed:', error);
      } finally {
        setIsAnalyzing(false);
      }
    }, 1500);
  };

  const resetForm = () => {
    setCompany('');
    setRole('');
    setJdText('');
    setAnalysisResult(null);
  };

  if (analysisResult) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-green-800">Analysis Complete!</h2>
              <p className="text-green-700 mt-1">Your readiness score: <span className="font-bold text-3xl">{analysisResult.readinessScore}/100</span></p>
            </div>
            <button 
              onClick={resetForm}
              className="btn-primary bg-green-600 hover:bg-green-700"
            >
              Analyze Another JD
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Skills Extracted</h3>
            <div className="space-y-3">
              {Object.entries(analysisResult.extractedSkills).map(([category, skills]) => (
                <div key={category} className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <span key={index} className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Next Steps</h3>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-blue-800">View detailed checklist and 7-day plan</span>
              </div>
              <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                <span className="text-purple-800">Review interview questions</span>
              </div>
              <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                <span className="text-yellow-800">Check your analysis history</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Description Analysis</h2>
        <p className="text-gray-600 mb-6">
          Paste a job description to get personalized preparation recommendations, 
          readiness score, and study plan.
        </p>
        
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
                placeholder="e.g., Software Engineer, SDE-1"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description *
            </label>
            <textarea
              value={jdText}
              onChange={(e) => {
                setJdText(e.target.value);
                if (validationError) setValidationError('');
              }}
              rows={12}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                validationError ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Paste the complete job description here..."
              required
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-500">
                {jdText.length} characters
              </p>
              {validationError && (
                <p className="text-sm text-amber-600 bg-amber-50 px-2 py-1 rounded">
                  {validationError}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <p>• Skill extraction across 6 categories</p>
              <p>• Personalized readiness score (0-100)</p>
              <p>• Round-wise preparation checklist</p>
              <p>• 7-day study plan</p>
              <p>• Interview questions based on skills</p>
            </div>
            
            <button
              type="submit"
              disabled={isAnalyzing || !jdText.trim()}
              className="btn-primary flex items-center"
            >
              {isAnalyzing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </>
              ) : (
                'Analyze JD'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnalysisForm;