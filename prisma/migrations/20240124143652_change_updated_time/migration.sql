/*
  Warnings:

  - Made the column `updatedAt` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Post` MODIFY `updatedAt` DATETIME(3) NOT NULL;
