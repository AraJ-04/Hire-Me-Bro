-- CreateEnum
CREATE TYPE "MilestoneStatus" AS ENUM ('LOCKED', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "CourseStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED');

-- AlterTable
ALTER TABLE "Roadmap"
ADD COLUMN "targetCompany" TEXT,
ADD COLUMN "deadlineMonths" INTEGER NOT NULL DEFAULT 6,
ADD COLUMN "remindersEnabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN "competitionLevel" TEXT,
ADD COLUMN "estimatedSalaryRange" TEXT,
ADD COLUMN "aiOptimizationNotes" TEXT;

-- AlterTable
ALTER TABLE "Milestone"
ADD COLUMN "status" "MilestoneStatus" NOT NULL DEFAULT 'LOCKED',
ADD COLUMN "progress" INTEGER NOT NULL DEFAULT 0;

UPDATE "Milestone"
SET
  "status" = CASE WHEN "isCompleted" THEN 'COMPLETED'::"MilestoneStatus" ELSE 'LOCKED'::"MilestoneStatus" END,
  "progress" = CASE WHEN "isCompleted" THEN 100 ELSE 0 END;

ALTER TABLE "Milestone" DROP COLUMN "isCompleted";

-- AlterTable
ALTER TABLE "Course"
ADD COLUMN "duration" TEXT,
ADD COLUMN "price" TEXT,
ADD COLUMN "status" "CourseStatus" NOT NULL DEFAULT 'NOT_STARTED';

UPDATE "Course"
SET "status" = CASE WHEN "isCompleted" THEN 'COMPLETED'::"CourseStatus" ELSE 'NOT_STARTED'::"CourseStatus" END;

ALTER TABLE "Course" DROP COLUMN "isCompleted";
