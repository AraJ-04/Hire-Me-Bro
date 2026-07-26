/*
  Warnings:

  - You are about to drop the column `projectFixes` on the `AtsScan` table. All the data in the column will be lost.
  - You are about to drop the column `rawFeedback` on the `AtsScan` table. All the data in the column will be lost.
  - Added the required column `fileName` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FeedbackSeverity" AS ENUM ('SUCCESS', 'INFO', 'WARNING', 'ERROR');

-- AlterTable
ALTER TABLE "AtsScan" DROP COLUMN "projectFixes",
DROP COLUMN "rawFeedback",
ADD COLUMN     "summaryText" TEXT;

-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "fileName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ResumeFeedback" (
    "id" TEXT NOT NULL,
    "scanId" TEXT NOT NULL,
    "severity" "FeedbackSeverity" NOT NULL,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "boundingBox" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResumeFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ResumeFeedback_scanId_idx" ON "ResumeFeedback"("scanId");

-- AddForeignKey
ALTER TABLE "ResumeFeedback" ADD CONSTRAINT "ResumeFeedback_scanId_fkey" FOREIGN KEY ("scanId") REFERENCES "AtsScan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
