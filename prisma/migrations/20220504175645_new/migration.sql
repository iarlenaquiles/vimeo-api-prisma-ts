/*
  Warnings:

  - A unique constraint covering the columns `[postId]` on the table `Video` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Video_postId_key" ON "Video"("postId");
