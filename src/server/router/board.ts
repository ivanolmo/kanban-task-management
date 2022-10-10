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
      const createBoard = await ctx.prisma.board.create({
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

      return createBoard;
    },
  })
  .mutation('edit-board', {
    input: editBoardSchema,
    resolve: async ({ ctx, input }) => {
      // update board name
      const boardName = await ctx.prisma.board.update({
        where: {
          id: input.id,
        },
        data: {
          boardName: input.boardName,
        },
      });

      // get existing columns from db
      const existingColumns = await ctx.prisma.column.findMany({
        where: {
          boardId: input.id,
        },
      });

      // filter existing columns out of the input from client
      const filteredColumns = input.columns.filter(
        (column) =>
          !existingColumns.find((c) => c.columnName === column.columnName)
      );

      // delete columns removed from edit modal
      const deletedColumns = await ctx.prisma.column.deleteMany({
        where: {
          boardId: input.id,
          columnName: {
            notIn: input.columns.map((column) => column.columnName),
          },
        },
      });

      // create columns added to edit modal
      const createdColumns = await ctx.prisma.column.createMany({
        data: filteredColumns.map((column) => ({
          columnName: column.columnName,
          boardId: input.id,
        })),
      });

      return { boardName, deletedColumns, createdColumns };
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
  });
