import React, { useState, useEffect } from 'react';
import { getCompanyIntel, saveCompanyIntel, getRoundExplanation } from '../utils/companyIntel';

const CompanyIntel = ({ companyName, extractedSkills, analysisId }) => {
  const [companyIntel, setCompanyIntel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (companyName && extractedSkills) {
      // Check if we already have company intel for this analysis
      const existingIntel = getCompanyIntelForAnalysis(analysisId);
      
      if (existingIntel) {
        setCompanyIntel(existingIntel);
      } else {
        // Generate new company intel
        const intel = getCompanyIntel(companyName, extractedSkills);
        setCompanyIntel(intel);
        // Save to history
        saveCompanyIntel(analysisId, intel);
      }
    }
    setIsLoading(false);
  }, [companyName, extractedSkills, analysisId]);

  if (isLoading || !companyIntel) {
    return (
      <div className="card animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Company Intel Card */}
      <div className="card">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Company Intelligence</h3>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            Demo Mode
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Company</h4>
            <p className="text-blue-600 font-semibold">{companyIntel.companyName}</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-medium text-purple-800 mb-2">Industry</h4>
            <p className="text-purple-600 font-semibold">{companyIntel.industry}</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">Size</h4>
            <p className="text-green-600 font-semibold">{companyIntel.sizeLabel}</p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-medium text-gray-800 mb-3">Typical Hiring Focus</h4>
          <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
            {companyIntel.hiringFocus}
          </p>
        </div>
      </div>

      {/* Round Mapping Timeline */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Interview Process Timeline</h3>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          <div className="space-y-8">
            {companyIntel.roundMapping.map((round, index) => (
              <div key={index} className="relative pl-12">
                {/* Timeline dot */}
                <div className="absolute left-2.5 top-2 w-3 h-3 bg-primary-500 rounded-full border-4 border-white shadow"></div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <h4 className="text-lg font-semibold text-gray-900">{round.name}</h4>
                    <span className="text-sm text-primary-600 bg-primary-50 px-3 py-1 rounded-full mt-2 md:mt-0">
                      {round.focus}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{round.description}</p>
                  
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <p className="text-sm text-yellow-800">
                      <span className="font-medium">Why this round matters:</span> {getRoundExplanation(round.name, companyIntel.sizeCategory)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Note:</span> This interview process is generated based on company size and role requirements. 
            Actual process may vary.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyIntel;