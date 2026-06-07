require("dotenv").config();

const express = require("express");
const cors = require("cors");
const prisma = require("./config/prisma");

const app = express();

app.use(cors());
app.use(express.json());

// app.use((req, res, next) => {
//   console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
//   if(req.body.password === "password123") {
//     next()
//   }else{
//     res.status(401).json({ error: "Unauthorized: Invalid password" });
//   }

// });

// ==========================================
// HEALTH CHECK & TEST ROUTE
// ==========================================
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Hire Me Bro server running smoothly' });
});

// ==========================================
// 1. USER & PROFILE ENDPOINTS
// ==========================================

// Create or sync user profile
app.post('/api/users', async (req, res) => {
  const { email, name, bio, skills } = req.body;
  try {
    // WAITING ON SCHEMA: Ensure 'profile' and 'preferences' relations match the new schema
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        profile: {
          create: {
            bio,
            skills,
          },
        },
        preferences: {
          create: {}, 
        },
      },
      include: { profile: true, preferences: true },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("[User Creation Error]:", error);
    res.status(400).json({ error: 'User registration failed', details: error.message });
  }
});

// ==========================================
// 2. RESUME & ATS DIAGNOSTIC ENDPOINTS
// ==========================================

// Save parsed resume text and trigger an ATS assessment log
app.post('/api/resumes/scan', async (req, res) => {
  const { userId, fileUrl, parsedText, targetJobRole } = req.body;
  try {
    // WAITING ON SCHEMA: Verify 'resume' model fields
    const resume = await prisma.resume.create({
      data: { userId, fileUrl, parsedText },
    });

    // Mocking the AI Orchestration layer score generation
    const mockAtsScore = Math.floor(Math.random() * 40) + 60; 

    // WAITING ON SCHEMA: Verify 'atsScan' model fields and JSON structures
    const scanResult = await prisma.atsScan.create({
      data: {
        resumeId: resume.id,
        targetJobRole,
        overallScore: mockAtsScore,
        keywordGaps: ['Docker', 'Prisma', 'Redis'],
        projectFixes: { fix: 'Quantify metrics in project 1. Change "worked on backend" to "optimized backend latency by 20%"' },
        rawFeedback: { formatting: 'Good', impact: 'Needs metrics boost' },
      },
    });

    res.status(201).json({ resume, scanResult });
  } catch (error) {
    console.error("[ATS Scan Error]:", error);
    res.status(500).json({ error: 'Failed to process ATS diagnostic', details: error.message });
  }
});

// ==========================================
// 3. AUTOMATION & JOB APPLICATION ENDPOINTS
// ==========================================

// Log a job listing 
app.post('/api/jobs', async (req, res) => {
  const { title, company, location, sourcePlatform, externalUrl, description, requiredSkills } = req.body;
  try {
    // WAITING ON SCHEMA: Verify 'jobListing' model fields
    const job = await prisma.jobListing.create({
      data: { title, company, location, sourcePlatform, externalUrl, description, requiredSkills, postedAt: new Date() },
    });
    res.status(201).json(job);
  } catch (error) {
    console.error("[Job Logging Error]:", error);
    res.status(400).json({ error: 'Failed to log scraped job', details: error.message });
  }
});

// Update Application Status 
app.patch('/api/applications/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; 
  try {
    // WAITING ON SCHEMA: Verify 'jobApplication' update logic
    const updatedApplication = await prisma.jobApplication.update({
      where: { id },
      data: { status },
    });
    res.status(200).json(updatedApplication);
  } catch (error) {
    console.error("[Application Update Error]:", error);
    res.status(400).json({ error: 'Failed to update application tracker', details: error.message });
  }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});