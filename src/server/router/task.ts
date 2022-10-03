import { z } from 'zod';

import { createProtectedRouter } from './utils/protected-procedure';

const createTaskSchema = z.object({
  columnId: z.object({ id: z.string() }),
  title: z.string(),
  description: z.string(),
  subtasks: z.array(z.object({ title: z.string() })),
});

export type CreateTaskInput = z.TypeOf<typeof createTaskSchema>;

export const taskRouter = createProtectedRouter().mutation('add-task', {
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
});
