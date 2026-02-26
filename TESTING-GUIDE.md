# Placement Readiness Platform - Analysis Logic Testing

## Sample Job Description for Testing

**Company:** TechCorp Solutions
**Role:** Software Development Engineer - Backend

**Job Description:**
We are looking for a talented Software Development Engineer to join our backend team. The ideal candidate should have strong experience with Python, Django, and REST APIs. Knowledge of database design and optimization is essential. Experience with PostgreSQL and Redis is preferred. Familiarity with AWS cloud services and Docker containerization is a plus. Understanding of data structures and algorithms is required for technical problem-solving. Experience with testing frameworks like PyTest is beneficial. The role involves designing scalable backend systems, API development, and working with cross-functional teams.

**Key Requirements:**
- Proficient in Python and Django framework
- Strong understanding of REST API design principles
- Experience with PostgreSQL database management
- Knowledge of Redis caching mechanisms
- Familiarity with AWS services (EC2, S3, Lambda)
- Containerization experience with Docker
- Solid foundation in Data Structures and Algorithms
- Experience with testing frameworks (PyTest preferred)
- Understanding of system design concepts
- Good problem-solving and analytical skills

## Testing Steps:

1. **Navigate to Analysis Page**
   - Go to http://localhost:3011/analysis
   - Fill in company: "TechCorp Solutions"
   - Fill in role: "Software Development Engineer - Backend"
   - Paste the sample JD above

2. **Verify Skill Extraction**
   - Should detect: Python, Django, REST, PostgreSQL, Redis, AWS, Docker, DSA, PyTest
   - Categories: Languages, Web, Data, Cloud/DevOps, Core CS, Testing

3. **Check Readiness Score**
   - Base: 35
   - +30 (6 categories × 5)
   - +10 (company provided)
   - +10 (role provided)
   - +10 (JD > 800 chars)
   - Total: 95/100

4. **Verify Outputs**
   - Key skills displayed in categories
   - Round-wise checklist (4 rounds, 5-8 items each)
   - 7-day plan with skill-specific additions
   - 10 interview questions based on detected skills

5. **Test History Persistence**
   - After analysis, go to http://localhost:3011/history
   - Verify entry appears with correct score and details
   - Refresh browser - history should persist
   - Click "View Details" to see saved analysis

6. **Multiple Analyses**
   - Perform 2-3 different analyses
   - Verify all are saved in history
   - Test search functionality in history page

## Expected Results:

✅ Skill extraction works across all 6 categories
✅ Readiness score calculation is accurate (0-100)
✅ All 4 output types are generated correctly
✅ localStorage persistence works after refresh
✅ History page shows all saved analyses
✅ Navigation between pages works smoothly
✅ Premium design is maintained throughout