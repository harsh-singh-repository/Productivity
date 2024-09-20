/*
  Warnings:

  - You are about to drop the `OrgLimit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "OrgLimit";

-- CreateTable
CREATE TABLE "orgLimit" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orgLimit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orgLimit_orgId_key" ON "orgLimit"("orgId");
