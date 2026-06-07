require("dotenv").config();

const express = require("express");
const cors = require("cors");
const prisma = require("./config/prisma");

const app = express();

app.use(cors());
app.use(express.json());

// Middleware
app.use(express.json());

// ==========================================
// HEALTH CHECK & TEST ROUTE
// ==========================================
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Hire Me Bro server running smoothly' });
});

// ==========================================
// 1. USER & PROFILE ENDPOINTS
// ==========================================

// Create or sync user profile (e.g., after onboarding or Whisper AI transcription entry)
app.post('/api/users', async (req, res) => {
  const { email, name, bio, skills } = req.body;
  try {
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
          create: {}, // Initialize empty preferences layer
        },
      },
      include: { profile: true, preferences: true },
    });
    res.status(201).json(newUser);
  } catch (error) {
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
    // 1. Save the resume instance
    const resume = await prisma.resume.create({
      data: { userId, fileUrl, parsedText },
    });

    // Mocking the AI Orchestration layer score generation for testing schema
    // In production, insert your Gemini/GPT parsing logic here
    const mockAtsScore = Math.floor(Math.random() * 40) + 60; 

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
    res.status(500).json({ error: 'Failed to process ATS diagnostic', details: error.message });
  }
});

// ==========================================
// 3. AUTOMATION & JOB APPLICATION ENDPOINTS
// ==========================================

// Log a job listing (Populated via your Java-based scraping ingestion)
app.post('/api/jobs', async (req, res) => {
  const { title, company, location, sourcePlatform, externalUrl, description, requiredSkills } = req.body;
  try {
    const job = await prisma.jobListing.create({
      data: { title, company, location, sourcePlatform, externalUrl, description, requiredSkills, postedAt: new Date() },
    });
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ error: 'Failed to log scraped job', details: error.message });
  }
});

// Update Application Status (Essential for your Interview Conversion metric)
app.patch('/api/applications/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // e.g., "RECRUITER_CONTACT", "INTERVIEWING"
  try {
    const updatedApplication = await prisma.jobApplication.update({
      where: { id },
      data: { status },
    });
    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update application tracker', details: error.message });
  }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});