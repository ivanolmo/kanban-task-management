/*
  Warnings:

  - You are about to drop the column `name` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Column` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Subtask` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Task` table. All the data in the column will be lost.
  - Added the required column `boardName` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `columnName` to the `Column` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtaskName` to the `Subtask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskName` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Board_ownerId_key";

-- AlterTable
ALTER TABLE "Board" DROP COLUMN "name",
DROP COLUMN "ownerId",
ADD COLUMN     "boardName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Column" DROP COLUMN "name",
ADD COLUMN     "columnName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Subtask" DROP COLUMN "name",
ADD COLUMN     "subtaskName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "name",
ADD COLUMN     "taskName" TEXT NOT NULL;
