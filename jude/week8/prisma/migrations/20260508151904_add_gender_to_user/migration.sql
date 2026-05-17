/*
  Warnings:

  - You are about to alter the column `status` on the `member_mission` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `member_mission` MODIFY `status` ENUM('CHALLENGING', 'COMPLETE') NOT NULL;
