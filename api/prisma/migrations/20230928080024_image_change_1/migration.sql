/*
  Warnings:

  - The primary key for the `image` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `image` table. All the data in the column will be lost.
  - You are about to drop the `_imagetopost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_imagetopost` DROP FOREIGN KEY `_ImageToPost_A_fkey`;

-- DropForeignKey
ALTER TABLE `_imagetopost` DROP FOREIGN KEY `_ImageToPost_B_fkey`;

-- AlterTable
ALTER TABLE `image` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`url`);

-- DropTable
DROP TABLE `_imagetopost`;
