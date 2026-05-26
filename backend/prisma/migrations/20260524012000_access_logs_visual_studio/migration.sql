-- CreateEnum
CREATE TYPE "VisualExportFormat" AS ENUM ('PNG', 'SVG', 'PDF');

-- AlterTable
ALTER TABLE "AccessCode" ADD COLUMN "revokedAt" TIMESTAMP(3),
ADD COLUMN "maxUses" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN "useCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "AccessCodeLog" (
    "id" TEXT NOT NULL,
    "accessCodeId" TEXT NOT NULL,
    "userId" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccessCodeLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisualProject" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "template" TEXT NOT NULL,
    "sceneJson" JSONB NOT NULL,
    "exportFormat" "VisualExportFormat" NOT NULL DEFAULT 'PNG',
    "isWatermarked" BOOLEAN NOT NULL DEFAULT true,
    "exportedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VisualProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisualCredit" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "freeExportsUsed" INTEGER NOT NULL DEFAULT 0,
    "freeExportsLimit" INTEGER NOT NULL DEFAULT 3,
    "isPro" BOOLEAN NOT NULL DEFAULT false,
    "proExpiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VisualCredit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VisualCredit_userId_key" ON "VisualCredit"("userId");

-- AddForeignKey
ALTER TABLE "AccessCodeLog" ADD CONSTRAINT "AccessCodeLog_accessCodeId_fkey" FOREIGN KEY ("accessCodeId") REFERENCES "AccessCode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessCodeLog" ADD CONSTRAINT "AccessCodeLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisualProject" ADD CONSTRAINT "VisualProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisualCredit" ADD CONSTRAINT "VisualCredit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
