/*
  Warnings:

  - Added the required column `REPLACE(title, ' ', '-')` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Post` ADD COLUMN `REPLACE(title, ' ', '-')` VARCHAR(255) NOT NULL;
