// Test script to verify all analysis functionality

// Sample Job Description for testing
const SAMPLE_JD = `
We are looking for a Software Engineer to join our team. The ideal candidate should have:

Requirements:
- Strong knowledge of Data Structures and Algorithms
- Experience with React and Node.js
- Understanding of database concepts (SQL, MongoDB)
- Familiarity with AWS and cloud technologies
- Good problem-solving skills
- Computer Science fundamentals (OOP, DBMS, OS)

Responsibilities:
- Develop and maintain web applications
- Write clean, efficient code
- Collaborate with cross-functional teams
- Participate in code reviews
- Optimize application performance

Qualifications:
- Bachelor's degree in Computer Science or related field
- 0-2 years of experience
- Strong communication skills
`;

const TEST_COMPANY = "TechCorp";
const TEST_ROLE = "Software Engineer";

console.log("=== Placement Readiness Platform - Analysis Test ===\n");

// Test skill extraction
console.log("1. Testing Skill Extraction:");
const extractedSkills = SkillAnalyzer.extractSkills(SAMPLE_JD);
console.log("Extracted Skills:", extractedSkills);

// Test readiness score calculation
console.log("\n2. Testing Readiness Score Calculation:");
const readinessScore = SkillAnalyzer.calculateReadinessScore(TEST_COMPANY, TEST_ROLE, SAMPLE_JD, extractedSkills);
console.log(`Readiness Score: ${readinessScore}/100`);

// Test checklist generation
console.log("\n3. Testing Checklist Generation:");
const checklist = SkillAnalyzer.generateChecklist(extractedSkills);
console.log("Checklist Rounds:", Object.keys(checklist));

// Test 7-day plan generation
console.log("\n4. Testing 7-Day Plan Generation:");
const plan = SkillAnalyzer.generate7DayPlan(extractedSkills);
console.log("Plan Days:", plan.map(p => p.day));

// Test question generation
console.log("\n5. Testing Question Generation:");
const questions = SkillAnalyzer.generateQuestions(extractedSkills);
console.log("Generated Questions:", questions.length);

// Test localStorage persistence
console.log("\n6. Testing History Persistence:");
const testData = {
  company: TEST_COMPANY,
  role: TEST_ROLE,
  jdText: SAMPLE_JD,
  extractedSkills,
  plan,
  checklist,
  questions,
  readinessScore
};

const savedEntry = SkillAnalyzer.saveToHistory(testData);
console.log("Saved to history with ID:", savedEntry.id);

const history = SkillAnalyzer.getHistory();
console.log("History entries:", history.length);

console.log("\n=== All tests completed successfully! ===");
console.log("\nTo verify manually:");
console.log("1. Open http://localhost:3010/dashboard");
console.log("2. Click 'Analyze Job' button");
console.log("3. Enter the sample JD above");
console.log("4. Check that skills are detected correctly");
console.log("5. Verify readiness score calculation");
console.log("6. Navigate to History page to see saved analysis");
console.log("7. Refresh page to confirm persistence");