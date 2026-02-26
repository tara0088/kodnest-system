// Skill extraction and analysis utilities

const SKILL_CATEGORIES = {
  'Core CS': ['DSA', 'OOP', 'DBMS', 'OS', 'Networks', 'Computer Science', 'Data Structures', 'Algorithms'],
  'Languages': ['Java', 'Python', 'JavaScript', 'TypeScript', 'C', 'C++', 'C#', 'Go', 'PHP', 'Ruby'],
  'Web': ['React', 'Next.js', 'Node.js', 'Express', 'REST', 'GraphQL', 'HTML', 'CSS', 'Frontend', 'Backend'],
  'Data': ['SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Database', 'Data Analysis', 'ETL'],
  'Cloud/DevOps': ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Jenkins', 'Git'],
  'Testing': ['Selenium', 'Cypress', 'Playwright', 'JUnit', 'PyTest', 'Testing', 'QA', 'Quality Assurance']
};

const CHECKLIST_TEMPLATES = {
  'Round 1': [
    'Review aptitude and quantitative reasoning concepts',
    'Brush up on basic computer fundamentals',
    'Practice logical reasoning and puzzle solving',
    'Prepare introduction and basic HR questions',
    'Review resume thoroughly and be ready to explain everything',
    'Research company background and values',
    'Prepare questions to ask the interviewer',
    'Practice communication and presentation skills'
  ],
  'Round 2': [
    'Practice data structures and algorithms daily',
    'Solve 3-5 coding problems per day',
    'Review time and space complexity analysis',
    'Study system design basics (for experienced roles)',
    'Practice explaining your approach clearly',
    'Review core computer science concepts (OOP, DBMS, OS)',
    'Work on coding interview patterns and techniques',
    'Time yourself while solving problems'
  ],
  'Round 3': [
    'Prepare detailed explanations of your projects',
    'Review technologies mentioned in your resume',
    'Practice system design discussions (if applicable)',
    'Prepare for technical deep-dive questions',
    'Review your GitHub/portfolio if applicable',
    'Practice explaining technical decisions made',
    'Prepare for scenario-based technical questions',
    'Review latest trends in your tech stack'
  ],
  'Round 4': [
    'Prepare for behavioral and situational questions',
    'Practice STAR method for experience-based questions',
    'Research company culture and values alignment',
    'Prepare salary and negotiation discussion points',
    'Think about long-term career goals and aspirations',
    'Prepare questions about team dynamics and growth',
    'Review company news and recent developments',
    'Practice discussing weaknesses and learning experiences'
  ]
};

const DAY_PLAN_TEMPLATES = {
  'Basics': [
    'Review computer fundamentals and basic concepts',
    'Practice aptitude and logical reasoning',
    'Study core CS subjects (OOP, DBMS basics)',
    'Review resume and prepare explanations'
  ],
  'DSA': [
    'Solve array and string problems',
    'Practice linked lists and trees',
    'Work on dynamic programming concepts',
    'Review graph algorithms and problems'
  ],
  'Projects': [
    'Review and test your projects thoroughly',
    'Prepare project explanations and architecture',
    'Align projects with job requirements',
    'Practice demoing your work'
  ],
  'Interview': [
    'Take full-length mock interviews',
    'Practice common interview questions',
    'Work on communication and presentation',
    'Review weak areas identified'
  ],
  'Revision': [
    'Quick review of all topics covered',
    'Focus on previously identified weak areas',
    'Practice speed and accuracy',
    'Final preparation and confidence building'
  ]
};

const QUESTION_TEMPLATES = {
  'DSA': [
    'How would you optimize search in sorted data?',
    'Explain the difference between arrays and linked lists.',
    'What is the time complexity of merge sort?',
    'How would you detect a cycle in a linked list?',
    'Explain hash table implementation and collision resolution.',
    'What are the different approaches to solve dynamic programming problems?',
    'How would you design a data structure for LRU cache?',
    'Explain the difference between BFS and DFS.'
  ],
  'Core CS': [
    'Explain the difference between process and thread.',
    'What is deadlock and how can it be prevented?',
    'Explain normalization in databases.',
    'What are the different types of database indexes?',
    'How does garbage collection work in programming languages?',
    'Explain the OSI model and TCP/IP stack.',
    'What is virtual memory and how does it work?',
    'Explain the concept of polymorphism in OOP.'
  ],
  'Web': [
    'Explain state management options in React.',
    'What is the difference between REST and GraphQL?',
    'How does React hooks work internally?',
    'Explain the event loop in JavaScript.',
    'What are the different ways to optimize web performance?',
    'How would you implement authentication in a web application?',
    'Explain the difference between client-side and server-side rendering.',
    'What are the security best practices for web development?'
  ],
  'Database': [
    'Explain indexing and when it helps.',
    'What are the ACID properties in databases?',
    'How would you optimize a slow SQL query?',
    'Explain the difference between SQL and NoSQL databases.',
    'What is database normalization and why is it important?',
    'How would you handle database transactions?',
    'Explain the concept of database sharding.',
    'What are the different types of database relationships?'
  ],
  'Cloud/DevOps': [
    'Explain the difference between Docker and virtual machines.',
    'How would you deploy a web application to AWS?',
    'What are the benefits of using containerization?',
    'Explain the CI/CD pipeline process.',
    'How would you monitor application performance in production?',
    'What are the different types of cloud deployment models?',
    'Explain the concept of Infrastructure as Code.',
    'How would you handle scaling applications in the cloud?'
  ],
  'Testing': [
    'What is the difference between unit testing and integration testing?',
    'How would you write effective test cases?',
    'Explain the concept of test-driven development.',
    'What are the different types of testing methodologies?',
    'How would you handle testing in a continuous integration environment?',
    'Explain the concept of mocking in testing.',
    'What are the best practices for writing maintainable tests?',
    'How would you measure test coverage and why is it important?'
  ]
};

export class SkillAnalyzer {
  static extractSkills(jdText) {
    const skills = {};
    const text = jdText.toLowerCase();
    
    Object.keys(SKILL_CATEGORIES).forEach(category => {
      skills[category] = [];
      SKILL_CATEGORIES[category].forEach(skill => {
        if (text.includes(skill.toLowerCase())) {
          skills[category].push(skill);
        }
      });
    });
    
    return skills;
  }
  
  static calculateReadinessScore(company, role, jdText, extractedSkills) {
    let score = 35; // Base score
    
    // +5 per detected category (max 30)
    const categoriesWithSkills = Object.values(extractedSkills).filter(skills => skills.length > 0).length;
    score += Math.min(categoriesWithSkills * 5, 30);
    
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
    
    return Math.min(score, 100); // Cap at 100
  }
  
  static generateChecklist(extractedSkills) {
    const checklist = {};
    
    Object.keys(CHECKLIST_TEMPLATES).forEach(round => {
      checklist[round] = [...CHECKLIST_TEMPLATES[round]];
    });
    
    return checklist;
  }
  
  static generate7DayPlan(extractedSkills) {
    const plan = [
      { day: 'Day 1-2', focus: 'Basics + Core CS', tasks: [...DAY_PLAN_TEMPLATES.Basics] },
      { day: 'Day 3-4', focus: 'DSA + Coding Practice', tasks: [...DAY_PLAN_TEMPLATES.DSA] },
      { day: 'Day 5', focus: 'Project + Resume Alignment', tasks: [...DAY_PLAN_TEMPLATES.Projects] },
      { day: 'Day 6', focus: 'Mock Interview Questions', tasks: [...DAY_PLAN_TEMPLATES.Interview] },
      { day: 'Day 7', focus: 'Revision + Weak Areas', tasks: [...DAY_PLAN_TEMPLATES.Revision] }
    ];
    
    // Adapt plan based on detected skills
    const hasWebSkills = extractedSkills['Web'] && extractedSkills['Web'].length > 0;
    const hasDataSkills = extractedSkills['Data'] && extractedSkills['Data'].length > 0;
    
    if (hasWebSkills) {
      plan[4].tasks.push('Review frontend/backend technologies mentioned in JD');
    }
    
    if (hasDataSkills) {
      plan[1].tasks.push('Practice database design and SQL queries');
      plan[4].tasks.push('Review database concepts and optimization');
    }
    
    return plan;
  }
  
  static generateQuestions(extractedSkills) {
    const questions = [];
    const categories = Object.keys(extractedSkills);
    
    categories.forEach(category => {
      if (extractedSkills[category].length > 0 && QUESTION_TEMPLATES[category]) {
        const categoryQuestions = [...QUESTION_TEMPLATES[category]];
        // Add 2-3 questions per category with skills
        const questionsToAdd = Math.min(3, categoryQuestions.length);
        for (let i = 0; i < questionsToAdd; i++) {
          questions.push({
            category: category,
            question: categoryQuestions[i],
            skills: extractedSkills[category]
          });
        }
      }
    });
    
    // If no specific skills, add general fresher questions
    if (questions.length === 0) {
      questions.push({
        category: 'General',
        question: 'Tell me about yourself and your background',
        skills: ['General fresher stack']
      });
      questions.push({
        category: 'General',
        question: 'Why do you want to work for this company?',
        skills: ['General fresher stack']
      });
      questions.push({
        category: 'General',
        question: 'Where do you see yourself in 5 years?',
        skills: ['General fresher stack']
      });
    }
    
    // Limit to 10 questions
    return questions.slice(0, 10);
  }
  
  static saveToHistory(analysisData) {
    const history = this.getHistory();
    const newEntry = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...analysisData
    };
    
    history.unshift(newEntry);
    localStorage.setItem('placementAnalysisHistory', JSON.stringify(history));
    return newEntry;
  }
  
  static getHistory() {
    const history = localStorage.getItem('placementAnalysisHistory');
    return history ? JSON.parse(history) : [];
  }
  
  static getHistoryEntry(id) {
    const history = this.getHistory();
    return history.find(entry => entry.id === id);
  }
}