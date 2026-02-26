// Skill extraction utility for Placement Readiness Platform
const skillCategories = {
  'Core CS': ['DSA', 'OOP', 'DBMS', 'OS', 'Networks', 'Computer Science', 'Data Structures', 'Algorithms', 'Operating System', 'Database'],
  'Languages': ['Java', 'Python', 'JavaScript', 'TypeScript', 'C', 'C++', 'C#', 'Go', 'PHP', 'Ruby'],
  'Web': ['React', 'Next.js', 'Node.js', 'Express', 'REST', 'GraphQL', 'HTML', 'CSS', 'Frontend', 'Backend', 'Vue.js', 'Angular'],
  'Data': ['SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Database', 'NoSQL', 'Oracle'],
  'Cloud/DevOps': ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Jenkins', 'Git', 'Terraform'],
  'Testing': ['Selenium', 'Cypress', 'Playwright', 'JUnit', 'PyTest', 'Testing', 'QA', 'Test Automation']
};

const questionTemplates = {
  'Core CS': [
    "Explain the difference between stack and heap memory",
    "What is a deadlock and how can it be prevented?",
    "Describe the ACID properties of database transactions",
    "Explain the OSI model and its layers",
    "What are the different types of sorting algorithms?"
  ],
  'Languages': [
    "What is the difference between pass by value and pass by reference?",
    "Explain memory management in your preferred language",
    "What are design patterns and give examples?",
    "How do you handle exceptions in your language?",
    "Explain the concept of polymorphism"
  ],
  'Web': [
    "Explain the difference between React and Next.js",
    "How does React's virtual DOM work?",
    "Explain REST API principles and design",
    "What is the event loop in JavaScript?",
    "How do you optimize web application performance?"
  ],
  'Data': [
    "Explain database indexing and when it helps",
    "What are the differences between SQL and NoSQL?",
    "How would you optimize a slow database query?",
    "Explain ACID vs BASE consistency models",
    "What are database normalization forms?"
  ],
  'Cloud/DevOps': [
    "Explain the difference between Docker and Kubernetes",
    "What are the benefits of containerization?",
    "How do you implement CI/CD pipelines?",
    "Explain cloud deployment strategies",
    "What is Infrastructure as Code?"
  ],
  'Testing': [
    "What is the difference between unit and integration testing?",
    "Explain test-driven development (TDD)",
    "How do you handle test data management?",
    "What are the different types of testing?",
    "Explain mocking in unit testing"
  ]
};

const checklistTemplates = {
  'Round 1': [
    "Review aptitude and quantitative reasoning concepts",
    "Brush up on basic computer fundamentals",
    "Practice logical reasoning questions",
    "Review basic mathematics for aptitude tests",
    "Prepare introduction and basic HR questions"
  ],
  'Round 2': [
    "Practice data structures and algorithms",
    "Review time and space complexity analysis",
    "Solve coding problems on platforms like LeetCode",
    "Prepare for system design basics",
    "Review object-oriented programming concepts"
  ],
  'Round 3': [
    "Prepare detailed explanation of your projects",
    "Review technical stack used in your projects",
    "Practice explaining your problem-solving approach",
    "Prepare for deep dive into your resume",
    "Review domain-specific technical questions"
  ],
  'Round 4': [
    "Prepare answers for behavioral questions",
    "Practice situational and scenario-based questions",
    "Review company values and culture alignment",
    "Prepare questions to ask the interviewer",
    "Practice communication and presentation skills"
  ]
};

const planTemplates = {
  'Day 1-2': [
    "Review core computer science fundamentals",
    "Brush up on basic programming concepts",
    "Study data structures basics (arrays, linked lists)",
    "Review time complexity analysis",
    "Practice simple coding problems"
  ],
  'Day 3-4': [
    "Focus on algorithms and problem-solving",
    "Practice DSA problems (sorting, searching)",
    "Work on coding challenges and puzzles",
    "Review tree and graph algorithms",
    "Solve medium difficulty problems"
  ],
  'Day 5': [
    "Align projects with job requirements",
    "Update resume with relevant skills",
    "Prepare project explanations and demos",
    "Review system design basics",
    "Practice technical communication"
  ],
  'Day 6': [
    "Take mock interviews with friends/mentors",
    "Practice answering technical questions",
    "Work on interview presentation skills",
    "Review common interview scenarios",
    "Get feedback on performance"
  ],
  'Day 7': [
    "Revise weak areas identified",
    "Final review of all topics",
    "Practice stress interviews",
    "Prepare for company-specific questions",
    "Mental preparation and confidence building"
  ]
};

export const extractSkills = (jdText) => {
  const detectedSkills = {};
  const text = jdText.toLowerCase();
  
  Object.keys(skillCategories).forEach(category => {
    const skills = skillCategories[category];
    const foundSkills = skills.filter(skill => {
      const skillPattern = skill.toLowerCase();
      return text.includes(skillPattern);
    });
    
    if (foundSkills.length > 0) {
      detectedSkills[category] = foundSkills;
    }
  });
  
  // If no skills detected, show general fresher stack
  if (Object.keys(detectedSkills).length === 0) {
    detectedSkills['General'] = ['Basic Programming', 'Problem Solving', 'Communication'];
  }
  
  return detectedSkills;
};

export const calculateReadinessScore = (detectedSkills, company, role, jdText) => {
  let score = 35; // Base score
  
  // +5 per detected category (max 30)
  const categoriesCount = Math.min(Object.keys(detectedSkills).length, 6);
  score += categoriesCount * 5;
  
  // +10 if company provided
  if (company && company.trim() !== '') {
    score += 10;
  }
  
  // +10 if role provided
  if (role && role.trim() !== '') {
    score += 10;
  }
  
  // +10 if JD length > 800 chars
  if (jdText && jdText.length > 800) {
    score += 10;
  }
  
  // Cap at 100
  return Math.min(score, 100);
};

export const generateChecklist = (detectedSkills) => {
  const checklist = {};
  
  Object.keys(checklistTemplates).forEach(round => {
    const baseItems = [...checklistTemplates[round]];
    
    // Add skill-specific items
    Object.keys(detectedSkills).forEach(category => {
      if (category !== 'General' && baseItems.length < 8) {
        baseItems.push(`Review ${category} concepts and best practices`);
      }
    });
    
    checklist[round] = baseItems.slice(0, 8);
  });
  
  return checklist;
};

export const generatePlan = (detectedSkills) => {
  const plan = {};
  
  Object.keys(planTemplates).forEach(day => {
    const baseItems = [...planTemplates[day]];
    
    // Add skill-specific items
    Object.keys(detectedSkills).forEach(category => {
      if (category !== 'General') {
        const skillAdditions = {
          'Web': ['Review frontend frameworks and libraries'],
          'Data': ['Practice database design and queries'],
          'Cloud/DevOps': ['Study deployment and infrastructure'],
          'Testing': ['Practice test automation frameworks']
        };
        
        if (skillAdditions[category] && baseItems.length < 7) {
          baseItems.push(...skillAdditions[category]);
        }
      }
    });
    
    plan[day] = baseItems.slice(0, 7);
  });
  
  return plan;
};

export const generateQuestions = (detectedSkills) => {
  const questions = [];
  
  // Get questions from detected skill categories
  Object.keys(detectedSkills).forEach(category => {
    if (category !== 'General' && questionTemplates[category]) {
      const categoryQuestions = [...questionTemplates[category]];
      questions.push(...categoryQuestions.slice(0, 3));
    }
  });
  
  // Fill remaining slots with general questions
  const generalQuestions = [
    "Tell me about yourself and your background",
    "Why do you want to work for this company?",
    "Where do you see yourself in 5 years?",
    "What are your strengths and weaknesses?",
    "How do you handle pressure and deadlines?"
  ];
  
  while (questions.length < 10 && generalQuestions.length > 0) {
    questions.push(generalQuestions.shift());
  }
  
  return questions.slice(0, 10);
};

export const saveToHistory = (analysisData) => {
  const history = JSON.parse(localStorage.getItem('analysisHistory') || '[]');
  const newEntry = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    ...analysisData
  };
  
  history.unshift(newEntry);
  localStorage.setItem('analysisHistory', JSON.stringify(history));
  return newEntry;
};

export const getHistory = () => {
  return JSON.parse(localStorage.getItem('analysisHistory') || '[]');
};

export const getHistoryItem = (id) => {
  const history = getHistory();
  return history.find(item => item.id === id);
};