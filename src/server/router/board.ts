import { z } from 'zod';

import { createProtectedRouter } from './utils/protected-procedure';

const createBoardSchema = z.object({
  boardName: z.string(),
  columns: z.array(z.object({ columnName: z.string() })),
});

const createColumnSchema = z.object({
  columns: z.array(z.object({ boardId: z.string(), columnName: z.string() })),
});

export type CreateBoardInput = z.TypeOf<typeof createBoardSchema>;
export type CreateColumnInput = z.TypeOf<typeof createColumnSchema>;

export const boardRouter = createProtectedRouter()
  .mutation('create-board', {
    input: createBoardSchema,
    resolve: async ({ ctx, input }) => {
      const board = await ctx.prisma.board.create({
        data: {
          boardName: input.boardName,
          columns: {
            createMany: {
              data: input.columns.map((column) => ({
                columnName: column.columnName,
              })),
            },
          },
          user: {
            connect: {
              id: ctx?.session?.user?.id,
            },
          },
        },
      });

      return board;
    },
  })
  .mutation('add-columns', {
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
  .query('get-board-columns', {
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
  })
  .query('get-boards', {
    resolve: async ({ ctx }) => {
      const boards = await ctx.prisma.board.findMany({
        where: {
          userId: ctx?.session?.user?.id,
        },
        include: {
          columns: true,
        },
      });

      return boards;
    },
  })
  .query('get-board-names', {
    resolve: async ({ ctx }) => {
      const boardNames = await ctx.prisma.board.findMany({
        where: {
          userId: ctx?.session?.user?.id,
        },
        select: {
          boardName: true,
        },
      });

      return boardNames;
    },
  });
