-- AlterTable
ALTER TABLE "GithubProfile" ADD COLUMN     "encryptedToken" TEXT;

-- AlterTable
ALTER TABLE "JobApplication" ADD COLUMN     "rejectionReason" TEXT;

-- AlterTable
ALTER TABLE "JobListing" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "isMain" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "authProvider" TEXT NOT NULL DEFAULT 'LOCAL',
ADD COLUMN     "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "passwordHash" TEXT;

-- CreateTable
CREATE TABLE "ApplicationHistory" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "oldStatus" "ApplicationStatus",
    "newStatus" "ApplicationStatus" NOT NULL,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApplicationHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ApplicationHistory_applicationId_idx" ON "ApplicationHistory"("applicationId");

-- CreateIndex
CREATE INDEX "AtsScan_resumeId_idx" ON "AtsScan"("resumeId");

-- CreateIndex
CREATE INDEX "Course_milestoneId_idx" ON "Course"("milestoneId");

-- CreateIndex
CREATE INDEX "JobApplication_userId_idx" ON "JobApplication"("userId");

-- CreateIndex
CREATE INDEX "JobApplication_jobListingId_idx" ON "JobApplication"("jobListingId");

-- CreateIndex
CREATE INDEX "JobListing_sourcePlatform_idx" ON "JobListing"("sourcePlatform");

-- CreateIndex
CREATE INDEX "Milestone_roadmapId_idx" ON "Milestone"("roadmapId");

-- CreateIndex
CREATE INDEX "Resume_userId_idx" ON "Resume"("userId");

-- CreateIndex
CREATE INDEX "Roadmap_userId_idx" ON "Roadmap"("userId");

-- AddForeignKey
ALTER TABLE "ApplicationHistory" ADD CONSTRAINT "ApplicationHistory_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "JobApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
