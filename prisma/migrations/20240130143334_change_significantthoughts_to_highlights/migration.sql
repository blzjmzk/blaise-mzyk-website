/*
  Warnings:

  - You are about to drop the column `significantThoughts` on the `BookNote` table. All the data in the column will be lost.
  - Added the required column `highlights` to the `BookNote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookNote" DROP COLUMN "significantThoughts",
ADD COLUMN     "highlights" TEXT NOT NULL;
