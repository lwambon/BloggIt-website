/*
  Warnings:

  - Added the required column `visibility` to the `Blogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blogs" ADD COLUMN     "visibility" TEXT NOT NULL;
