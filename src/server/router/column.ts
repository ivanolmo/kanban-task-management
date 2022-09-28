import { z } from 'zod';

import { createProtectedRouter } from './utils/protected-procedure';

const createColumnSchema = z.object({
  columns: z.array(z.object({ boardId: z.string(), columnName: z.string() })),
});

export const columnRouter = createProtectedRouter()
  .mutation('create-columns', {
    input: createColumnSchema,
    resolve: async ({ ctx, input }) => {
      const columns = await ctx.prisma.board.update({
        where: {
          id: input?.columns[0]?.boardId,
        },
        data: {
          columns: {
            createMany: {
              data: input?.columns?.map((column) => ({
                columnName: column.columnName,
              })),
            },
          },
        },
      });

      return columns;
    },
  })
  .query('get-columns', {
    resolve: async ({ ctx }) => {
      const columns = await ctx.prisma.column.findMany({
        where: {
          board: {
            userId: ctx?.session?.user?.id,
          },
        },
      });

      return columns;
    },
  });
