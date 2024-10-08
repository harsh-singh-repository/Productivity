/*
  Warnings:

  - You are about to drop the `orgLimit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "orgLimit";

-- CreateTable
CREATE TABLE "OrgLimit" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrgLimit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrgLimit_orgId_key" ON "OrgLimit"("orgId");
