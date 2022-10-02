-- AlterTable
ALTER TABLE "Subtask" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false;
