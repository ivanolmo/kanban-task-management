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
      // fetch random colors for columns
      const randomColors = await fetch(
        'https://www.colr.org/json/colors/random/10'
      ).then((res) => res.json());

      const createBoard = await ctx.prisma.board.create({
        data: {
          boardName: input.boardName,
          columns: {
            createMany: {
              data: input.columns.map((column, index) => ({
                columnName: column.columnName,
                accentColor: randomColors.colors[index].hex,
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

      return createBoard;
    },
  })
  .mutation('edit-board', {
    input: editBoardSchema,
    resolve: async ({ ctx, input }) => {
      // fetch random colors for columns
      const randomColors = await fetch(
        'https://www.colr.org/json/colors/random/10'
      ).then((res) => res.json());

      // get existing board and columns to compare
      const board = await ctx.prisma.board.findUnique({
        where: {
          id: input.id,
        },
        include: {
          columns: true,
        },
      });

      // update board name if it has changed
      if (board?.boardName !== input.boardName) {
        await ctx.prisma.board.update({
          where: {
            id: input.id,
          },
          data: {
            boardName: input.boardName,
          },
        });
      }

      // filter new columns from input
      const columnsToCreate = input.columns.filter(
        (column) =>
          !board?.columns?.some((c) => c.columnName === column.columnName)
      );

      // filter existing columns from input
      const columnsToDelete = board?.columns?.filter(
        (column) =>
          !input.columns?.some((c) => c.columnName === column.columnName)
      );

      // create new columns
      if (columnsToCreate && columnsToCreate?.length > 0) {
        await ctx.prisma.column.createMany({
          data: columnsToCreate.map((column, index) => ({
            columnName: column.columnName,
            accentColor: randomColors.colors[index].hex,
            boardId: input.id,
          })),
        });
      }

      // delete columns
      if (columnsToDelete && columnsToDelete?.length > 0) {
        await ctx.prisma.column.deleteMany({
          where: {
            id: {
              in: columnsToDelete?.map((column) => column.id),
            },
          },
        });
      }
    },
  })
  .mutation('delete-board', {
    input: z.string(),
    resolve: async ({ ctx, input }) => {
      const deleteBoard = await ctx.prisma.board.delete({
        where: {
          id: input,
        },
      });

      return deleteBoard;
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
            orderBy: {
              createdAt: 'asc',
            },
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
  })
  .query('get-board', {
    input: z.string(),
    resolve: async ({ ctx, input }) => {
      const board = await ctx.prisma.board.findUnique({
        where: {
          id: input,
        },
        include: {
          columns: {
            orderBy: {
              createdAt: 'asc',
            },
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

      return board;
    },
  });
