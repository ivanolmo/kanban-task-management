import { z } from 'zod';

import { createProtectedRouter } from './utils/protected-procedure';

const createBoardSchema = z.object({
  boardName: z.string(),
  columns: z.array(z.object({ columnName: z.string() })),
});

const createColumnSchema = z.object({
  columns: z.array(z.object({ boardId: z.string(), columnName: z.string() })),
});

const editBoardSchema = z.object({
  id: z.string(),
  boardName: z.string(),
  columns: z.array(z.object({ columnName: z.string() })),
});

export type CreateBoardInput = z.TypeOf<typeof createBoardSchema>;
export type CreateColumnInput = z.TypeOf<typeof createColumnSchema>;
export type EditBoardInput = z.TypeOf<typeof editBoardSchema>;

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
  .mutation('edit-board', {
    input: editBoardSchema,
    resolve: async ({ ctx, input }) => {
      const board = await ctx.prisma.board.update({
        where: {
          id: input.id,
        },
        data: {
          boardName: input.boardName,
          columns: {
            createMany: {
              data: input.columns.map((column) => ({
                columnName: column.columnName,
              })),
            },
          },
        },
      });

      return board;
    },
  })
  .mutation('delete-board', {
    input: z.string(),
    resolve: async ({ ctx, input }) => {
      const board = await ctx.prisma.board.delete({
        where: {
          id: input,
        },
      });
      return board;
    },
  })
  .query('get-boards', {
    resolve: async ({ ctx }) => {
      const boards = await ctx.prisma.board.findMany({
        where: {
          userId: ctx?.session?.user?.id,
        },
        orderBy: {
          createdAt: 'asc',
        },
        include: {
          columns: {
            include: {
              tasks: {
                include: {
                  subtasks: true,
                },
              },
            },
          },
        },
      });

      return boards;
    },
  });
