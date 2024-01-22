/*
  Warnings:

  - You are about to drop the column `REPLACE(title, ' ', '-')` on the `Post` table. All the data in the column will be lost.
  - Added the required column `slug` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Post` DROP COLUMN `REPLACE(title, ' ', '-')`,
    ADD COLUMN `slug` VARCHAR(255) NOT NULL;
