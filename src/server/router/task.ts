import { z } from 'zod';

import { createProtectedRouter } from './utils/protected-procedure';

const createTaskSchema = z.object({
  columnId: z.object({ id: z.string() }),
  title: z.string(),
  description: z.string(),
  subtasks: z.array(z.object({ title: z.string() })),
});

const editTaskSchema = z.object({
  id: z.string(),
  columnId: z.object({ id: z.string() }),
  title: z.string(),
  description: z.string(),
  subtasks: z.array(z.object({ title: z.string() })),
});

export type CreateTaskInput = z.TypeOf<typeof createTaskSchema>;
export type EditTaskInput = z.TypeOf<typeof editTaskSchema>;

export const taskRouter = createProtectedRouter()
  .mutation('add-task', {
    input: createTaskSchema,
    resolve: async ({ ctx, input }) => {
      const task = await ctx.prisma.task.create({
        data: {
          columnId: input.columnId.id,
          title: input.title,
          description: input.description,
          subtasks: {
            createMany: {
              data: input?.subtasks?.map((subtask) => ({
                title: subtask.title,
              })),
            },
          },
        },
      });

      return task;
    },
  })
  .mutation('edit-task', {
    input: editTaskSchema,
    resolve: async ({ ctx, input }) => {
      // get existing task and subtasks to compare
      const task = await ctx.prisma.task.findUnique({
        where: {
          id: input.id,
        },
        include: {
          subtasks: true,
        },
      });

      // update task title if it has changed
      if (task?.title !== input.title) {
        await ctx.prisma.task.update({
          where: {
            id: input.id,
          },
          data: {
            title: input.title,
          },
        });
      }

      // update task description if it has changed
      if (task?.description !== input.description) {
        await ctx.prisma.task.update({
          where: {
            id: input.id,
          },
          data: {
            description: input.description,
          },
        });
      }

      // update task column if it has changed
      if (task?.columnId !== input.columnId.id) {
        await ctx.prisma.task.update({
          where: {
            id: input.id,
          },
          data: {
            columnId: input.columnId.id,
          },
        });
      }

      // filter new subtasks from input
      const subtasksToCreate = input.subtasks.filter(
        (subtask) => !task?.subtasks.some((s) => s.title === subtask.title)
      );

      // filter existing subtasks from input
      const subtasksToDelete = task?.subtasks.filter(
        (subtask) => !input.subtasks.some((s) => s.title === subtask.title)
      );

      // create new subtasks
      if (subtasksToCreate && subtasksToCreate?.length > 0) {
        await ctx.prisma.subtask.createMany({
          data: subtasksToCreate.map((subtask) => ({
            title: subtask.title,
            taskId: input.id,
          })),
        });
      }

      // delete subtasks
      if (subtasksToDelete && subtasksToDelete?.length > 0) {
        await ctx.prisma.subtask.deleteMany({
          where: {
            id: {
              in: subtasksToDelete?.map((subtask) => subtask.id),
            },
          },
        });
      }
    },
  })
  .mutation('delete-task', {
    input: z.string(),
    resolve: async ({ ctx, input }) => {
      const task = await ctx.prisma.task.delete({
        where: {
          id: input,
        },
      });

      return task;
    },
  })
  .mutation('complete-subtask', {
    input: z.object({
      taskId: z.string(),
      subtaskId: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      const subtask = await ctx.prisma.subtask.update({
        where: {
          id: input.subtaskId,
        },
        data: {
          completed: true,
        },
      });

      return subtask;
    },
  })
  .mutation('move-task', {
    input: z.object({
      columnId: z.string(),
      taskId: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      const task = await ctx.prisma.task.update({
        where: {
          id: input.taskId,
        },
        data: {
          columnId: input.columnId,
        },
      });

      return task;
    },
  });
