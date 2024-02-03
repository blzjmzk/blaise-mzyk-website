/*
  Warnings:

  - The `isOnline` column on the `Talk` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Talk" DROP COLUMN "isOnline",
ADD COLUMN     "isOnline" BOOLEAN NOT NULL DEFAULT false;
