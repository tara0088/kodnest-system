// Data Validation and Schema Management Utility

export const ANALYSIS_SCHEMA = {
  required: ['id', 'createdAt', 'jdText', 'extractedSkills', 'baseScore', 'finalScore', 'updatedAt'],
  optional: ['company', 'role', 'roundMapping', 'checklist', 'plan7Days', 'questions', 'skillConfidenceMap'],
  skillCategories: ['coreCS', 'languages', 'web', 'data', 'cloud', 'testing', 'other'],
  defaultSkills: ["Communication", "Problem solving", "Basic coding", "Projects"]
};

export const validateAnalysisEntry = (entry) => {
  const errors = [];
  
  // Check required fields
  ANALYSIS_SCHEMA.required.forEach(field => {
    if (entry[field] === undefined || entry[field] === null) {
      errors.push(`Missing required field: ${field}`);
    }
  });
  
  // Validate extractedSkills structure
  if (entry.extractedSkills) {
    const skillKeys = Object.keys(entry.extractedSkills);
    const validCategories = ANALYSIS_SCHEMA.skillCategories;
    
    // Check for invalid categories
    const invalidCategories = skillKeys.filter(key => !validCategories.includes(key));
    if (invalidCategories.length > 0) {
      errors.push(`Invalid skill categories: ${invalidCategories.join(', ')}`);
    }
    
    // Ensure all categories are arrays
    validCategories.forEach(category => {
      if (entry.extractedSkills[category] && !Array.isArray(entry.extractedSkills[category])) {
        errors.push(`Skill category ${category} must be an array`);
      }
    });
  }
  
  // Validate baseScore and finalScore are numbers
  if (typeof entry.baseScore !== 'number' || entry.baseScore < 0 || entry.baseScore > 100) {
    errors.push('baseScore must be a number between 0-100');
  }
  
  if (typeof entry.finalScore !== 'number' || entry.finalScore < 0 || entry.finalScore > 100) {
    errors.push('finalScore must be a number between 0-100');
  }
  
  // Validate timestamps
  if (entry.createdAt && isNaN(Date.parse(entry.createdAt))) {
    errors.push('createdAt must be a valid ISO date string');
  }
  
  if (entry.updatedAt && isNaN(Date.parse(entry.updatedAt))) {
    errors.push('updatedAt must be a valid ISO date string');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const createDefaultAnalysisEntry = (overrides = {}) => {
  const defaultEntry = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    company: "",
    role: "",
    jdText: "",
    extractedSkills: {
      coreCS: [],
      languages: [],
      web: [],
      data: [],
      cloud: [],
      testing: [],
      other: []
    },
    roundMapping: [],
    checklist: [],
    plan7Days: [],
    questions: [],
    baseScore: 35,
    skillConfidenceMap: {},
    finalScore: 35,
    updatedAt: new Date().toISOString()
  };
  
  return { ...defaultEntry, ...overrides };
};

export const sanitizeAnalysisEntry = (entry) => {
  try {
    // Create default entry
    const sanitized = createDefaultAnalysisEntry();
    
    // Copy valid fields
    Object.keys(entry).forEach(key => {
      if (sanitized.hasOwnProperty(key)) {
        sanitized[key] = entry[key];
      }
    });
    
    // Ensure proper data types
    if (typeof sanitized.baseScore !== 'number') sanitized.baseScore = 35;
    if (typeof sanitized.finalScore !== 'number') sanitized.finalScore = sanitized.baseScore;
    if (!sanitized.createdAt) sanitized.createdAt = new Date().toISOString();
    if (!sanitized.updatedAt) sanitized.updatedAt = sanitized.createdAt;
    
    // Validate and fix extractedSkills
    if (!sanitized.extractedSkills || typeof sanitized.extractedSkills !== 'object') {
      sanitized.extractedSkills = createDefaultAnalysisEntry().extractedSkills;
    }
    
    // Ensure all skill categories exist
    ANALYSIS_SCHEMA.skillCategories.forEach(category => {
      if (!Array.isArray(sanitized.extractedSkills[category])) {
        sanitized.extractedSkills[category] = [];
      }
    });
    
    // Add default skills if no skills detected
    const totalSkills = Object.values(sanitized.extractedSkills).flat().length;
    if (totalSkills === 0) {
      sanitized.extractedSkills.other = [...ANALYSIS_SCHEMA.defaultSkills];
    }
    
    return sanitized;
  } catch (error) {
    console.error('Error sanitizing analysis entry:', error);
    return createDefaultAnalysisEntry();
  }
};

export const validateJdInput = (jdText) => {
  const errors = [];
  
  if (!jdText || jdText.trim() === '') {
    errors.push('Job description is required');
  } else if (jdText.length < 200) {
    errors.push('This JD is too short to analyze deeply. Paste full JD for better output.');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const getHistoryWithValidation = () => {
  try {
    const history = JSON.parse(localStorage.getItem('analysisHistory') || '[]');
    const validEntries = [];
    const corruptedEntries = [];
    
    history.forEach((entry, index) => {
      try {
        const validation = validateAnalysisEntry(entry);
        if (validation.isValid) {
          validEntries.push(sanitizeAnalysisEntry(entry));
        } else {
          corruptedEntries.push({ index, entry, errors: validation.errors });
        }
      } catch (error) {
        corruptedEntries.push({ index, entry, error: error.message });
      }
    });
    
    // Log corrupted entries for debugging
    if (corruptedEntries.length > 0) {
      console.warn('Corrupted history entries found:', corruptedEntries.length);
    }
    
    return {
      validEntries,
      corruptedCount: corruptedEntries.length,
      hasCorrupted: corruptedEntries.length > 0
    };
  } catch (error) {
    console.error('Error reading history from localStorage:', error);
    return {
      validEntries: [],
      corruptedCount: 0,
      hasCorrupted: false
    };
  }
};

export const updateHistoryEntry = (id, updates) => {
  try {
    const historyResult = getHistoryWithValidation();
    const entryIndex = historyResult.validEntries.findIndex(entry => entry.id === id);
    
    if (entryIndex !== -1) {
      // Apply updates
      const updatedEntry = {
        ...historyResult.validEntries[entryIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      // Validate updated entry
      const validation = validateAnalysisEntry(updatedEntry);
      if (validation.isValid) {
        historyResult.validEntries[entryIndex] = updatedEntry;
        localStorage.setItem('analysisHistory', JSON.stringify(historyResult.validEntries));
        return updatedEntry;
      } else {
        console.error('Invalid entry after update:', validation.errors);
        return null;
      }
    }
    return null;
  } catch (error) {
    console.error('Error updating history entry:', error);
    return null;
  }
};