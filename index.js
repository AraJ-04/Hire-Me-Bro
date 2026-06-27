require("dotenv").config();

const express = require("express");
const cors = require("cors");
const prisma = require("./config/prisma");

const app = express();

app.use(cors());
app.use(express.json());

const APPLICATION_STATUSES = [
  "SAVED",
  "PENDING",
  "APPLIED",
  "RECRUITER_CONTACT",
  "INTERVIEWING",
  "OFFER",
  "REJECTED",
];

const FEEDBACK_SEVERITIES = ["SUCCESS", "INFO", "WARNING", "ERROR"];
const SYNC_STATUSES = ["IDLE", "SCANNING", "COMPLETED", "FAILED"];
const MILESTONE_STATUSES = ["LOCKED", "IN_PROGRESS", "COMPLETED"];
const COURSE_STATUSES = ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"];

const toArray = (value) => (Array.isArray(value) ? value : []);
const toOptionalNumber = (value) => (value === undefined || value === null ? undefined : Number(value));
const clampProgress = (value) => Math.min(100, Math.max(0, Number(value) || 0));
const getAppliedAtForStatus = (status, appliedAt) => {
  if (appliedAt) return new Date(appliedAt);
  return status && status !== "SAVED" && status !== "PENDING" ? new Date() : null;
};

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
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Hire Me Bro server running smoothly" });
});

// ==========================================
// 1. USER & PROFILE ENDPOINTS
// ==========================================

// Create or sync user profile
app.post("/api/users", async (req, res) => {
  const {
    email,
    name,
    passwordHash,
    authProvider,
    profileImageUrl,
    currentJobTitle,
    location,
    bio,
    skills,
    experience,
    education,
    roleTypes,
    locations,
    minSalary,
    autoApply,
    autoApplyThreshold,
    enableSmtp,
    outreachTemplate,
  } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        name,
        ...(passwordHash ? { passwordHash } : {}),
        ...(authProvider ? { authProvider } : {}),
        profile: {
          upsert: {
            create: {
              profileImageUrl,
              currentJobTitle,
              location,
              bio,
              skills: toArray(skills),
              experience,
              education,
            },
            update: {
              ...(profileImageUrl !== undefined ? { profileImageUrl } : {}),
              ...(currentJobTitle !== undefined ? { currentJobTitle } : {}),
              ...(location !== undefined ? { location } : {}),
              ...(bio !== undefined ? { bio } : {}),
              ...(skills !== undefined ? { skills: toArray(skills) } : {}),
              ...(experience !== undefined ? { experience } : {}),
              ...(education !== undefined ? { education } : {}),
            },
          },
        },
        preferences: {
          upsert: {
            create: {
              roleTypes: toArray(roleTypes),
              locations: toArray(locations),
              minSalary,
              autoApply: Boolean(autoApply),
              autoApplyThreshold: autoApplyThreshold !== undefined ? Number(autoApplyThreshold) : 90,
              enableSmtp: Boolean(enableSmtp),
              outreachTemplate,
            },
            update: {
              roleTypes: toArray(roleTypes),
              locations: toArray(locations),
              minSalary,
              ...(autoApply !== undefined ? { autoApply: Boolean(autoApply) } : {}),
              ...(autoApplyThreshold !== undefined ? { autoApplyThreshold: Number(autoApplyThreshold) } : {}),
              ...(enableSmtp !== undefined ? { enableSmtp: Boolean(enableSmtp) } : {}),
              ...(outreachTemplate !== undefined ? { outreachTemplate } : {}),
            },
          },
        },
      },
      create: {
        email,
        name,
        passwordHash,
        authProvider,
        profile: {
          create: {
            profileImageUrl,
            currentJobTitle,
            location,
            bio,
            skills: toArray(skills),
            experience,
            education,
          },
        },
        preferences: {
          create: {
            roleTypes: toArray(roleTypes),
            locations: toArray(locations),
            minSalary,
            autoApply: Boolean(autoApply),
            autoApplyThreshold: autoApplyThreshold !== undefined ? Number(autoApplyThreshold) : 90,
            enableSmtp: Boolean(enableSmtp),
            outreachTemplate,
          },
        },
      },
      include: { profile: true, preferences: true, integrations: true },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("[User Creation Error]:", error);
    res.status(400).json({ error: "User registration failed", details: error.message });
  }
});

// Save voice input transcripts and the generated insight shown in the live transcription UI
app.post("/api/voice-transcriptions", async (req, res) => {
  const { userId, rawTranscript, insightGenerated, confidenceScore } = req.body;

  if (!userId || !rawTranscript) {
    return res.status(400).json({ error: "userId and rawTranscript are required" });
  }

  try {
    const transcription = await prisma.voiceTranscription.create({
      data: {
        userId,
        rawTranscript,
        insightGenerated,
        confidenceScore: clampProgress(confidenceScore),
      },
    });

    res.status(201).json(transcription);
  } catch (error) {
    console.error("[Voice Transcription Error]:", error);
    res.status(400).json({ error: "Failed to save voice transcription", details: error.message });
  }
});

app.get("/api/users/:userId/voice-transcriptions", async (req, res) => {
  const { userId } = req.params;

  try {
    const transcriptions = await prisma.voiceTranscription.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(transcriptions);
  } catch (error) {
    console.error("[Voice Transcription Fetch Error]:", error);
    res.status(400).json({ error: "Failed to fetch voice transcriptions", details: error.message });
  }
});

// ==========================================
// 2. PLATFORM INTEGRATION ENDPOINTS
// ==========================================

app.post("/api/integrations", async (req, res) => {
  const { userId, platformName, isConnected, sessionCookie } = req.body;

  if (!userId || !platformName) {
    return res.status(400).json({ error: "userId and platformName are required" });
  }

  try {
    const integration = await prisma.platformIntegration.upsert({
      where: {
        userId_platformName: {
          userId,
          platformName,
        },
      },
      update: {
        ...(isConnected !== undefined ? { isConnected: Boolean(isConnected) } : {}),
        ...(sessionCookie !== undefined ? { sessionCookie } : {}),
      },
      create: {
        userId,
        platformName,
        isConnected: Boolean(isConnected),
        sessionCookie,
      },
    });

    res.status(200).json(integration);
  } catch (error) {
    console.error("[Platform Integration Error]:", error);
    res.status(400).json({ error: "Failed to save platform integration", details: error.message });
  }
});

app.get("/api/users/:userId/integrations", async (req, res) => {
  const { userId } = req.params;

  try {
    const integrations = await prisma.platformIntegration.findMany({
      where: { userId },
      orderBy: { platformName: "asc" },
    });

    res.status(200).json(integrations);
  } catch (error) {
    console.error("[Platform Integration Fetch Error]:", error);
    res.status(400).json({ error: "Failed to fetch platform integrations", details: error.message });
  }
});

// ==========================================
// 3. RESUME & ATS DIAGNOSTIC ENDPOINTS
// ==========================================

// Save parsed resume text and trigger an ATS assessment log
app.post("/api/resumes/scan", async (req, res) => {
  const {
    userId,
    fileName,
    fileUrl,
    parsedText,
    targetJobRole,
    summaryText,
    keywordGaps,
    feedback,
  } = req.body;

  if (!userId || !fileName || !fileUrl || !targetJobRole) {
    return res.status(400).json({ error: "userId, fileName, fileUrl, and targetJobRole are required" });
  }

  try {
    const resume = await prisma.resume.create({
      data: { userId, fileName, fileUrl, parsedText },
    });

    // Mocking the AI Orchestration layer score generation
    const mockAtsScore = Math.floor(Math.random() * 40) + 60; 
    const feedbackItems = toArray(feedback).length
      ? toArray(feedback)
      : [
          {
            severity: "WARNING",
            category: "Keywords",
            title: "Add missing backend keywords",
            description: "Mention Docker, Prisma, and Redis in project bullets where they accurately match your work.",
            boundingBox: { page: 1, x: 80, y: 240, width: 420, height: 90 },
          },
          {
            severity: "INFO",
            category: "Impact",
            title: "Quantify project outcomes",
            description: 'Change "worked on backend" to a measurable result like "optimized backend latency by 20%".',
            boundingBox: { page: 1, x: 80, y: 360, width: 420, height: 80 },
          },
        ];

    const scanResult = await prisma.atsScan.create({
      data: {
        resumeId: resume.id,
        targetJobRole,
        overallScore: mockAtsScore,
        summaryText: summaryText || "Resume has a solid base, but needs stronger keyword coverage and measurable impact.",
        keywordGaps: toArray(keywordGaps).length ? toArray(keywordGaps) : ["Docker", "Prisma", "Redis"],
        feedback: {
          create: feedbackItems.map((item) => ({
            severity: FEEDBACK_SEVERITIES.includes(item.severity) ? item.severity : "INFO",
            category: item.category || "General",
            title: item.title || "Resume feedback",
            description: item.description || "Improve this section to better match the target role.",
            boundingBox: item.boundingBox,
          })),
        },
      },
      include: { feedback: true },
    });

    res.status(201).json({ resume, scanResult });
  } catch (error) {
    console.error("[ATS Scan Error]:", error);
    res.status(500).json({ error: "Failed to process ATS diagnostic", details: error.message });
  }
});

// ==========================================
// 4. GITHUB PROFILE & REPOSITORY ENDPOINTS
// ==========================================

// Create or update a user's GitHub sync profile and repository scan list
app.post("/api/github/profile", async (req, res) => {
  const {
    userId,
    username,
    encryptedToken,
    syncStatus,
    syncProgress,
    totalCommits,
    topLanguages,
    commitFrequency,
    relevancyScore,
    activityData,
    repositories,
  } = req.body;

  if (!userId || !username) {
    return res.status(400).json({ error: "userId and username are required" });
  }

  if (syncStatus && !SYNC_STATUSES.includes(syncStatus)) {
    return res.status(400).json({ error: "Invalid sync status", allowedStatuses: SYNC_STATUSES });
  }

  try {
    const githubProfile = await prisma.$transaction(async (tx) => {
      const profile = await tx.githubProfile.upsert({
        where: { userId },
        update: {
          username,
          ...(encryptedToken !== undefined ? { encryptedToken } : {}),
          ...(syncStatus ? { syncStatus } : {}),
          ...(syncProgress !== undefined ? { syncProgress: Number(syncProgress) } : {}),
          ...(totalCommits !== undefined ? { totalCommits: Number(totalCommits) } : {}),
          topLanguages: toArray(topLanguages),
          ...(commitFrequency !== undefined ? { commitFrequency } : {}),
          ...(relevancyScore !== undefined ? { relevancyScore: toOptionalNumber(relevancyScore) } : {}),
          ...(activityData !== undefined ? { activityData } : {}),
          lastSyncedAt: new Date(),
        },
        create: {
          userId,
          username,
          encryptedToken,
          syncStatus: syncStatus || "IDLE",
          syncProgress: syncProgress !== undefined ? Number(syncProgress) : 0,
          totalCommits: totalCommits !== undefined ? Number(totalCommits) : 0,
          topLanguages: toArray(topLanguages),
          commitFrequency,
          relevancyScore: toOptionalNumber(relevancyScore),
          activityData,
        },
      });

      if (Array.isArray(repositories)) {
        await tx.githubRepository.deleteMany({ where: { profileId: profile.id } });

        if (repositories.length) {
          await tx.githubRepository.createMany({
            data: repositories.map((repo) => ({
              profileId: profile.id,
              repoName: repo.repoName || repo.name,
              description: repo.description,
              primaryLanguage: repo.primaryLanguage || repo.language,
              stars: repo.stars !== undefined ? Number(repo.stars) : 0,
              isPrivate: Boolean(repo.isPrivate),
              isIncludedInScan: repo.isIncludedInScan !== undefined ? Boolean(repo.isIncludedInScan) : true,
            })),
          });
        }
      }

      return tx.githubProfile.findUnique({
        where: { id: profile.id },
        include: { repositories: { orderBy: { stars: "desc" } } },
      });
    });

    res.status(200).json(githubProfile);
  } catch (error) {
    console.error("[GitHub Profile Sync Error]:", error);
    res.status(400).json({ error: "Failed to sync GitHub profile", details: error.message });
  }
});

app.get("/api/users/:userId/github", async (req, res) => {
  const { userId } = req.params;

  try {
    const githubProfile = await prisma.githubProfile.findUnique({
      where: { userId },
      include: { repositories: { orderBy: { stars: "desc" } } },
    });

    if (!githubProfile) {
      return res.status(404).json({ error: "GitHub profile not found" });
    }

    res.status(200).json(githubProfile);
  } catch (error) {
    console.error("[GitHub Profile Fetch Error]:", error);
    res.status(400).json({ error: "Failed to fetch GitHub profile", details: error.message });
  }
});

app.patch("/api/github/repositories/:id", async (req, res) => {
  const { id } = req.params;
  const { isIncludedInScan } = req.body;

  if (isIncludedInScan === undefined) {
    return res.status(400).json({ error: "isIncludedInScan is required" });
  }

  try {
    const repository = await prisma.githubRepository.update({
      where: { id },
      data: { isIncludedInScan: Boolean(isIncludedInScan) },
    });

    res.status(200).json(repository);
  } catch (error) {
    console.error("[GitHub Repository Update Error]:", error);
    res.status(400).json({ error: "Failed to update repository", details: error.message });
  }
});

// ==========================================
// 5. ROADMAP & UPSKILLING ENDPOINTS
// ==========================================

app.post("/api/roadmaps", async (req, res) => {
  const {
    userId,
    targetRole,
    targetCompany,
    deadlineMonths,
    remindersEnabled,
    competitionLevel,
    estimatedSalaryRange,
    aiOptimizationNotes,
    milestones,
  } = req.body;

  if (!userId || !targetRole) {
    return res.status(400).json({ error: "userId and targetRole are required" });
  }

  try {
    const roadmap = await prisma.roadmap.create({
      data: {
        userId,
        targetRole,
        targetCompany,
        deadlineMonths: deadlineMonths !== undefined ? Number(deadlineMonths) : 6,
        remindersEnabled: remindersEnabled !== undefined ? Boolean(remindersEnabled) : true,
        competitionLevel,
        estimatedSalaryRange,
        aiOptimizationNotes,
        milestones: {
          create: toArray(milestones).map((milestone, index) => ({
            title: milestone.title,
            description: milestone.description,
            order: milestone.order !== undefined ? Number(milestone.order) : index + 1,
            status: MILESTONE_STATUSES.includes(milestone.status) ? milestone.status : "LOCKED",
            progress: clampProgress(milestone.progress),
            courses: {
              create: toArray(milestone.courses).map((course) => ({
                title: course.title,
                platform: course.platform,
                url: course.url,
                duration: course.duration,
                price: course.price,
                status: COURSE_STATUSES.includes(course.status) ? course.status : "NOT_STARTED",
              })),
            },
          })),
        },
      },
      include: { milestones: { include: { courses: true }, orderBy: { order: "asc" } } },
    });

    res.status(201).json(roadmap);
  } catch (error) {
    console.error("[Roadmap Creation Error]:", error);
    res.status(400).json({ error: "Failed to create roadmap", details: error.message });
  }
});

app.get("/api/users/:userId/roadmaps", async (req, res) => {
  const { userId } = req.params;

  try {
    const roadmaps = await prisma.roadmap.findMany({
      where: { userId },
      include: { milestones: { include: { courses: true }, orderBy: { order: "asc" } } },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(roadmaps);
  } catch (error) {
    console.error("[Roadmap Fetch Error]:", error);
    res.status(400).json({ error: "Failed to fetch roadmaps", details: error.message });
  }
});

app.patch("/api/roadmaps/:id", async (req, res) => {
  const { id } = req.params;
  const {
    targetRole,
    targetCompany,
    deadlineMonths,
    remindersEnabled,
    competitionLevel,
    estimatedSalaryRange,
    aiOptimizationNotes,
  } = req.body;

  try {
    const roadmap = await prisma.roadmap.update({
      where: { id },
      data: {
        ...(targetRole !== undefined ? { targetRole } : {}),
        ...(targetCompany !== undefined ? { targetCompany } : {}),
        ...(deadlineMonths !== undefined ? { deadlineMonths: Number(deadlineMonths) } : {}),
        ...(remindersEnabled !== undefined ? { remindersEnabled: Boolean(remindersEnabled) } : {}),
        ...(competitionLevel !== undefined ? { competitionLevel } : {}),
        ...(estimatedSalaryRange !== undefined ? { estimatedSalaryRange } : {}),
        ...(aiOptimizationNotes !== undefined ? { aiOptimizationNotes } : {}),
      },
      include: { milestones: { include: { courses: true }, orderBy: { order: "asc" } } },
    });

    res.status(200).json(roadmap);
  } catch (error) {
    console.error("[Roadmap Update Error]:", error);
    res.status(400).json({ error: "Failed to update roadmap", details: error.message });
  }
});

app.patch("/api/milestones/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, order, status, progress } = req.body;

  if (status && !MILESTONE_STATUSES.includes(status)) {
    return res.status(400).json({ error: "Invalid milestone status", allowedStatuses: MILESTONE_STATUSES });
  }

  try {
    const milestone = await prisma.milestone.update({
      where: { id },
      data: {
        ...(title !== undefined ? { title } : {}),
        ...(description !== undefined ? { description } : {}),
        ...(order !== undefined ? { order: Number(order) } : {}),
        ...(status ? { status } : {}),
        ...(progress !== undefined ? { progress: clampProgress(progress) } : {}),
      },
      include: { courses: true },
    });

    res.status(200).json(milestone);
  } catch (error) {
    console.error("[Milestone Update Error]:", error);
    res.status(400).json({ error: "Failed to update milestone", details: error.message });
  }
});

app.patch("/api/courses/:id", async (req, res) => {
  const { id } = req.params;
  const { title, platform, url, duration, price, status } = req.body;

  if (status && !COURSE_STATUSES.includes(status)) {
    return res.status(400).json({ error: "Invalid course status", allowedStatuses: COURSE_STATUSES });
  }

  try {
    const course = await prisma.course.update({
      where: { id },
      data: {
        ...(title !== undefined ? { title } : {}),
        ...(platform !== undefined ? { platform } : {}),
        ...(url !== undefined ? { url } : {}),
        ...(duration !== undefined ? { duration } : {}),
        ...(price !== undefined ? { price } : {}),
        ...(status ? { status } : {}),
      },
    });

    res.status(200).json(course);
  } catch (error) {
    console.error("[Course Update Error]:", error);
    res.status(400).json({ error: "Failed to update course", details: error.message });
  }
});

// ==========================================
// 6. AUTOMATION & JOB APPLICATION ENDPOINTS
// ==========================================

// Log a job listing 
app.post("/api/jobs", async (req, res) => {
  const {
    title,
    company,
    location,
    sourcePlatform,
    externalUrl,
    description,
    requiredSkills,
    salaryRange,
    employmentType,
    experienceLevel,
    tags,
    postedAt,
  } = req.body;

  if (!title || !company || !location || !sourcePlatform || !externalUrl || !description) {
    return res.status(400).json({
      error: "title, company, location, sourcePlatform, externalUrl, and description are required",
    });
  }

  try {
    const job = await prisma.jobListing.upsert({
      where: { externalUrl },
      update: {
        title,
        company,
        location,
        sourcePlatform,
        description,
        requiredSkills: toArray(requiredSkills),
        salaryRange,
        employmentType,
        experienceLevel,
        tags: toArray(tags),
        postedAt: postedAt ? new Date(postedAt) : new Date(),
      },
      create: {
        title,
        company,
        location,
        sourcePlatform,
        externalUrl,
        description,
        requiredSkills: toArray(requiredSkills),
        salaryRange,
        employmentType,
        experienceLevel,
        tags: toArray(tags),
        postedAt: postedAt ? new Date(postedAt) : new Date(),
      },
    });
    res.status(201).json(job);
  } catch (error) {
    console.error("[Job Logging Error]:", error);
    res.status(400).json({ error: "Failed to log scraped job", details: error.message });
  }
});

// Create a tracked application for a saved job listing
app.post("/api/applications", async (req, res) => {
  const { userId, jobListingId, status, coverLetter, isAutonomous, appliedAt } = req.body;

  if (!userId || !jobListingId) {
    return res.status(400).json({ error: "userId and jobListingId are required" });
  }

  if (status && !APPLICATION_STATUSES.includes(status)) {
    return res.status(400).json({ error: "Invalid application status", allowedStatuses: APPLICATION_STATUSES });
  }

  try {
    const nextStatus = status || "SAVED";
    const application = await prisma.jobApplication.create({
      data: {
        userId,
        jobListingId,
        status: nextStatus,
        coverLetter,
        isAutonomous: Boolean(isAutonomous),
        appliedAt: getAppliedAtForStatus(nextStatus, appliedAt),
        history: {
          create: {
            newStatus: nextStatus,
          },
        },
      },
      include: {
        jobListing: true,
        history: true,
      },
    });

    res.status(201).json(application);
  } catch (error) {
    console.error("[Application Creation Error]:", error);
    res.status(400).json({ error: "Failed to create application tracker", details: error.message });
  }
});

// Update Application Status 
app.patch("/api/applications/:id", async (req, res) => {
  const { id } = req.params;
  const { status, rejectionReason, coverLetter, isAutonomous, appliedAt } = req.body;

  if (status && !APPLICATION_STATUSES.includes(status)) {
    return res.status(400).json({ error: "Invalid application status", allowedStatuses: APPLICATION_STATUSES });
  }

  try {
    const updatedApplication = await prisma.$transaction(async (tx) => {
      const currentApplication = await tx.jobApplication.findUnique({
        where: { id },
        select: { status: true, appliedAt: true },
      });

      if (!currentApplication) {
        return null;
      }

      await tx.jobApplication.update({
        where: { id },
        data: {
          ...(status ? { status } : {}),
          ...(rejectionReason !== undefined ? { rejectionReason } : {}),
          ...(coverLetter !== undefined ? { coverLetter } : {}),
          ...(isAutonomous !== undefined ? { isAutonomous: Boolean(isAutonomous) } : {}),
          ...(appliedAt !== undefined ? { appliedAt: appliedAt ? new Date(appliedAt) : null } : {}),
          ...(status && status !== "SAVED" && status !== "PENDING" && !currentApplication.appliedAt
            ? { appliedAt: new Date() }
            : {}),
        },
      });

      if (status && status !== currentApplication.status) {
        await tx.applicationHistory.create({
          data: {
            applicationId: id,
            oldStatus: currentApplication.status,
            newStatus: status,
          },
        });
      }

      return tx.jobApplication.findUnique({
        where: { id },
        include: {
          jobListing: true,
          history: { orderBy: { changedAt: "desc" } },
          interviews: true,
          automationLogs: { orderBy: { createdAt: "desc" } },
        },
      });
    });

    if (!updatedApplication) {
      return res.status(404).json({ error: "Application not found" });
    }

    res.status(200).json(updatedApplication);
  } catch (error) {
    console.error("[Application Update Error]:", error);
    res.status(400).json({ error: "Failed to update application tracker", details: error.message });
  }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
