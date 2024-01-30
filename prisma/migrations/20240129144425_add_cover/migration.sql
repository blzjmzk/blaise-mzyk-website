/*
  Warnings:

  - Added the required column `cover` to the `BookNote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookNote" ADD COLUMN     "cover" VARCHAR(255) NOT NULL;
