// Test Checklist Utility for Placement Readiness Platform

export const TEST_CHECKLIST_KEY = 'prpTestChecklist';

export const TEST_ITEMS = [
  {
    id: 'jd-validation',
    title: 'JD required validation works',
    howToTest: 'Try submitting form without entering job description. Should show validation error and prevent submission.'
  },
  {
    id: 'short-jd-warning',
    title: 'Short JD warning shows for <200 chars',
    howToTest: 'Enter job description with less than 200 characters. Should show amber warning message.'
  },
  {
    id: 'skills-extraction',
    title: 'Skills extraction groups correctly',
    howToTest: 'Enter JD with various technical skills. Verify skills are properly categorized in results.'
  },
  {
    id: 'round-mapping',
    title: 'Round mapping changes based on company + skills',
    howToTest: 'Test with different company sizes (Enterprise vs Startup) and skill sets. Verify different interview processes.'
  },
  {
    id: 'score-calculation',
    title: 'Score calculation is deterministic',
    howToTest: 'Perform same analysis multiple times. Score should be consistent across identical inputs.'
  },
  {
    id: 'skill-toggles',
    title: 'Skill toggles update score live',
    howToTest: 'In results page, toggle skills between "I know" and "Need practice". Score should update immediately (+2/-2).'
  },
  {
    id: 'persistence-refresh',
    title: 'Changes persist after refresh',
    howTo4: 'Toggle several skills, note the score, refresh browser. All changes should be preserved.'
  },
  {
    id: 'history-storage',
    title: 'History saves and loads correctly',
    howToTest: 'Complete analysis, go to history page, reopen saved analysis. All data should load correctly.'
  },
  {
    id: 'export-functionality',
    title: 'Export buttons copy the correct content',
    howToTest: 'Click each export button in results page. Verify correct content is copied to clipboard.'
  },
  {
    id: 'console-errors',
    title: 'No console errors on core pages',
    howToTest: 'Navigate all pages, check browser console. Should have no errors or warnings.'
  }
];

export const initializeTestChecklist = () => {
  const existing = localStorage.getItem(TEST_CHECKLIST_KEY);
  if (!existing) {
    const initialState = TEST_ITEMS.reduce((acc, item) => {
      acc[item.id] = {
        checked: false,
        timestamp: null
      };
      return acc;
    }, {});
    
    localStorage.setItem(TEST_CHECKLIST_KEY, JSON.stringify(initialState));
    return initialState;
  }
  return JSON.parse(existing);
};

export const getTestChecklist = () => {
  try {
    const data = localStorage.getItem(TEST_CHECKLIST_KEY);
    return data ? JSON.parse(data) : initializeTestChecklist();
  } catch (error) {
    console.error('Error reading test checklist:', error);
    return initializeTestChecklist();
  }
};

export const updateTestItem = (itemId, checked) => {
  try {
    const checklist = getTestChecklist();
    checklist[itemId] = {
      checked,
      timestamp: checked ? new Date().toISOString() : null
    };
    
    localStorage.setItem(TEST_CHECKLIST_KEY, JSON.stringify(checklist));
    return checklist;
  } catch (error) {
    console.error('Error updating test item:', error);
    return getTestChecklist();
  }
};

export const resetTestChecklist = () => {
  try {
    const resetState = TEST_ITEMS.reduce((acc, item) => {
      acc[item.id] = {
        checked: false,
        timestamp: null
      };
      return acc;
    }, {});
    
    localStorage.setItem(TEST_CHECKLIST_KEY, JSON.stringify(resetState));
    return resetState;
  } catch (error) {
    console.error('Error resetting test checklist:', error);
    return getTestChecklist();
  }
};

export const getTestSummary = () => {
  const checklist = getTestChecklist();
  const total = TEST_ITEMS.length;
  const completed = Object.values(checklist).filter(item => item.checked).length;
  
  return {
    total,
    completed,
    percentage: Math.round((completed / total) * 100),
    isComplete: completed === total
  };
};

export const isShippingLocked = () => {
  return !getTestSummary().isComplete;
};