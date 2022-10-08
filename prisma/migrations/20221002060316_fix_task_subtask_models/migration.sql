/*
  Warnings:

  - You are about to drop the column `subtaskName` on the `Subtask` table. All the data in the column will be lost.
  - You are about to drop the column `taskName` on the `Task` table. All the data in the column will be lost.
  - Made the column `userId` on table `Board` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `title` to the `Subtask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Board" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Subtask" DROP COLUMN "subtaskName",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "taskName",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;
