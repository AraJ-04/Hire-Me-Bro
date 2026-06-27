-- CreateEnum
CREATE TYPE "SyncStatus" AS ENUM ('IDLE', 'SCANNING', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "GithubProfile"
ADD COLUMN "syncStatus" "SyncStatus" NOT NULL DEFAULT 'IDLE',
ADD COLUMN "syncProgress" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "commitFrequency" TEXT,
ADD COLUMN "relevancyScore" INTEGER;

-- CreateTable
CREATE TABLE "GithubRepository" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "repoName" TEXT NOT NULL,
    "description" TEXT,
    "primaryLanguage" TEXT,
    "stars" INTEGER NOT NULL DEFAULT 0,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "isIncludedInScan" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GithubRepository_pkey" PRIMARY KEY ("id")
);

-- Backfill old GithubProfile.repositories JSON entries into GithubRepository.
INSERT INTO "GithubRepository" (
    "id",
    "profileId",
    "repoName",
    "description",
    "primaryLanguage",
    "stars",
    "isPrivate",
    "isIncludedInScan",
    "createdAt",
    "updatedAt"
)
SELECT
    md5(gp."id" || '-' || repo."ordinality") AS "id",
    gp."id" AS "profileId",
    COALESCE(repo."value"->>'repoName', repo."value"->>'name', 'unknown-repo') AS "repoName",
    repo."value"->>'description' AS "description",
    COALESCE(repo."value"->>'primaryLanguage', repo."value"->>'language') AS "primaryLanguage",
    COALESCE((repo."value"->>'stars')::INTEGER, 0) AS "stars",
    COALESCE((repo."value"->>'isPrivate')::BOOLEAN, false) AS "isPrivate",
    COALESCE((repo."value"->>'isIncludedInScan')::BOOLEAN, true) AS "isIncludedInScan",
    CURRENT_TIMESTAMP AS "createdAt",
    CURRENT_TIMESTAMP AS "updatedAt"
FROM "GithubProfile" gp
CROSS JOIN LATERAL jsonb_array_elements(gp."repositories") WITH ORDINALITY AS repo("value", "ordinality")
WHERE jsonb_typeof(gp."repositories") = 'array';

-- AlterTable
ALTER TABLE "GithubProfile" DROP COLUMN "repositories";

-- CreateIndex
CREATE INDEX "GithubRepository_profileId_idx" ON "GithubRepository"("profileId");

-- AddForeignKey
ALTER TABLE "GithubRepository" ADD CONSTRAINT "GithubRepository_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "GithubProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
