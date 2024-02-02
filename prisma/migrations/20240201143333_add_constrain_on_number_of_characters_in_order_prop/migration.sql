/*
  Warnings:

  - You are about to alter the column `order` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(2)`.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "order" SET DATA TYPE VARCHAR(2);
