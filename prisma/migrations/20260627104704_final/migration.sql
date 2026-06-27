-- AlterEnum
ALTER TYPE "ApplicationStatus" ADD VALUE 'SAVED';

-- AlterTable
ALTER TABLE "JobApplication" ALTER COLUMN "appliedAt" DROP NOT NULL,
ALTER COLUMN "appliedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "JobListing" ADD COLUMN     "employmentType" TEXT,
ADD COLUMN     "experienceLevel" TEXT,
ADD COLUMN     "tags" TEXT[];

-- AlterTable
ALTER TABLE "UserPreference" ADD COLUMN     "autoApplyThreshold" INTEGER NOT NULL DEFAULT 90,
ADD COLUMN     "enableSmtp" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "outreachTemplate" TEXT;

-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "currentJobTitle" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "profileImageUrl" TEXT;

-- CreateTable
CREATE TABLE "PlatformIntegration" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "platformName" TEXT NOT NULL,
    "isConnected" BOOLEAN NOT NULL DEFAULT false,
    "sessionCookie" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlatformIntegration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VoiceTranscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rawTranscript" TEXT NOT NULL,
    "insightGenerated" TEXT,
    "confidenceScore" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VoiceTranscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlatformIntegration_userId_platformName_key" ON "PlatformIntegration"("userId", "platformName");

-- CreateIndex
CREATE INDEX "VoiceTranscription_userId_idx" ON "VoiceTranscription"("userId");

-- AddForeignKey
ALTER TABLE "PlatformIntegration" ADD CONSTRAINT "PlatformIntegration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoiceTranscription" ADD CONSTRAINT "VoiceTranscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
