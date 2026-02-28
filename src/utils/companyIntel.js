// Company Intelligence and Round Mapping Utility
const knownEnterprises = [
  'Amazon', 'Microsoft', 'Google', 'Apple', 'Meta', 'Facebook', 'Netflix', 
  'IBM', 'Oracle', 'Salesforce', 'Adobe', 'Intel', 'Cisco', 'Qualcomm',
  'Infosys', 'TCS', 'Wipro', 'HCL', 'Tech Mahindra', 'Cognizant',
  'Accenture', 'Deloitte', 'PwC', 'EY', 'KPMG', 'Capgemini'
];

const industryKeywords = {
  'FinTech': ['bank', 'finance', 'payment', 'wallet', 'trading', 'investment'],
  'E-commerce': ['shop', 'cart', 'retail', 'marketplace', 'online store'],
  'HealthTech': ['health', 'medical', 'hospital', 'patient', 'doctor', 'clinic'],
  'EdTech': ['education', 'learning', 'school', 'university', 'student'],
  'Gaming': ['game', 'gaming', 'play', 'entertainment', 'vr', 'ar'],
  'AI/ML': ['ai', 'ml', 'artificial intelligence', 'machine learning', 'data science'],
  'Cloud': ['cloud', 'aws', 'azure', 'gcp', 'server', 'infrastructure'],
  'Cybersecurity': ['security', 'cyber', 'protection', 'encryption', 'firewall']
};

const sizeCategories = {
  'Startup': { min: 0, max: 199, label: 'Startup (<200 employees)' },
  'Mid-size': { min: 200, max: 1999, label: 'Mid-size (200-2000 employees)' },
  'Enterprise': { min: 2000, max: Infinity, label: 'Enterprise (2000+ employees)' }
};

const hiringFocusTemplates = {
  'Enterprise': {
    'DSA': 'Structured DSA rounds, core CS fundamentals, system design',
    'Languages': 'Language-specific technical rounds, coding standards',
    'Web': 'Full-stack architecture, scalability, best practices',
    'Data': 'Database design, optimization, distributed systems',
    'Cloud/DevOps': 'Infrastructure, deployment, monitoring, security',
    'Testing': 'QA processes, automation frameworks, testing strategies'
  },
  'Startup': {
    'DSA': 'Practical problem solving, real-world scenarios',
    'Languages': 'Hands-on coding, framework expertise, quick learning',
    'Web': 'Full-stack development, rapid prototyping, product focus',
    'Data': 'Database design for scale, query optimization',
    'Cloud/DevOps': 'Practical deployment, cost optimization, agility',
    'Testing': 'Practical testing, automation, quality assurance'
  },
  'Mid-size': {
    'DSA': 'Balanced approach: fundamentals + practical application',
    'Languages': 'Technical depth with business context',
    'Web': 'Scalable development with product ownership',
    'Data': 'Database management with growth considerations',
    'Cloud/DevOps': 'Infrastructure with business impact focus',
    'Testing': 'Quality assurance with time-to-market balance'
  }
};

const roundMappingTemplates = {
  'Enterprise-DSA': {
    rounds: [
      { 
        name: 'Online Assessment', 
        focus: 'DSA + Aptitude Test',
        description: 'Algorithmic problem solving and logical reasoning'
      },
      { 
        name: 'Technical Round 1', 
        focus: 'DSA + Core CS Fundamentals',
        description: 'Data structures, algorithms, and computer science concepts'
      },
      { 
        name: 'Technical Round 2', 
        focus: 'System Design + Projects',
        description: 'Architecture discussion and project deep dive'
      },
      { 
        name: 'HR/Managerial', 
        focus: 'Culture Fit + Leadership',
        description: 'Behavioral assessment and team alignment'
      }
    ]
  },
  'Enterprise-Web': {
    rounds: [
      { 
        name: 'Online Coding Test', 
        focus: 'Web Technologies + DSA',
        description: 'Frontend/backend coding and algorithmic challenges'
      },
      { 
        name: 'Technical Round 1', 
        focus: 'Full-stack Architecture',
        description: 'System design and web application architecture'
      },
      { 
        name: 'Technical Round 2', 
        focus: 'Projects + Problem Solving',
        description: 'Project discussion and technical problem solving'
      },
      { 
        name: 'HR/Managerial', 
        focus: 'Leadership + Culture',
        description: 'Behavioral and leadership assessment'
      }
    ]
  },
  'Startup-DSA': {
    rounds: [
      { 
        name: 'Practical Coding Round', 
        focus: 'Real-world Problem Solving',
        description: 'Hands-on coding with practical business scenarios'
      },
      { 
        name: 'System Discussion', 
        focus: 'Architecture & Scalability',
        description: 'System design and scaling discussions'
      },
      { 
        name: 'Culture Fit', 
        focus: 'Team Alignment + Growth Mindset',
        description: 'Behavioral and cultural alignment assessment'
      }
    ]
  },
  'Startup-Web': {
    rounds: [
      { 
        name: 'Hands-on Coding', 
        focus: 'Full-stack Development',
        description: 'Building real features and solving practical problems'
      },
      { 
        name: 'System Design Chat', 
        focus: 'Architecture Discussion',
        description: 'Informal system design and technical discussion'
      },
      { 
        name: 'Team & Culture Fit', 
        focus: 'Collaboration + Learning',
        description: 'Team dynamics and growth potential discussion'
      }
    ]
  }
};

export const getCompanyIntel = (companyName, extractedSkills) => {
  // Determine company size category
  const sizeCategory = knownEnterprises.includes(companyName) ? 'Enterprise' : 'Startup';
  
  // Determine industry
  const companyLower = companyName.toLowerCase();
  let industry = 'Technology Services';
  
  Object.entries(industryKeywords).forEach(([industryName, keywords]) => {
    if (keywords.some(keyword => companyLower.includes(keyword))) {
      industry = industryName;
    }
  });
  
  // Determine primary skill category
  const primarySkillCategory = Object.keys(extractedSkills)[0] || 'DSA';
  
  // Generate hiring focus
  const hiringFocus = hiringFocusTemplates[sizeCategory][primarySkillCategory] || 
                     'Technical assessment with focus on problem solving';
  
  // Generate round mapping
  const mappingKey = `${sizeCategory}-${primarySkillCategory.includes('Web') ? 'Web' : 'DSA'}`;
  const roundMapping = roundMappingTemplates[mappingKey] || roundMappingTemplates['Startup-DSA'];
  
  return {
    companyName,
    sizeCategory,
    sizeLabel: sizeCategories[sizeCategory].label,
    industry,
    hiringFocus,
    roundMapping: roundMapping.rounds,
    intelGenerated: new Date().toISOString()
  };
};

export const getRoundExplanation = (roundName, sizeCategory) => {
  const explanations = {
    'Online Assessment': 'Initial screening to evaluate basic technical aptitude and problem-solving skills',
    'Technical Round 1': 'Deep dive into core technical concepts and hands-on coding ability',
    'Technical Round 2': 'Advanced technical discussion focusing on system design and architecture',
    'HR/Managerial': 'Cultural fit assessment and discussion of team dynamics',
    'Online Coding Test': 'Practical coding assessment to evaluate real-world development skills',
    'Practical Coding Round': 'Hands-on coding with business-relevant problems',
    'System Discussion': 'Architecture and scalability discussion in a collaborative setting',
    'Culture Fit': 'Team alignment and growth mindset assessment',
    'Hands-on Coding': 'Building actual features and solving practical development challenges',
    'System Design Chat': 'Informal architecture discussion to understand technical thinking',
    'Team & Culture Fit': 'Discussion about collaboration, learning, and team dynamics'
  };
  
  return explanations[roundName] || 'Assessment round to evaluate technical and cultural fit';
};

export const saveCompanyIntel = (analysisId, companyIntel) => {
  const history = JSON.parse(localStorage.getItem('analysisHistory') || '[]');
  const itemIndex = history.findIndex(item => item.id === analysisId);
  
  if (itemIndex !== -1) {
    history[itemIndex].companyIntel = companyIntel;
    localStorage.setItem('analysisHistory', JSON.stringify(history));
    return history[itemIndex];
  }
  return null;
};

export const getCompanyIntelForAnalysis = (analysisId) => {
  const history = JSON.parse(localStorage.getItem('analysisHistory') || '[]');
  const item = history.find(item => item.id === analysisId);
  return item?.companyIntel || null;
};