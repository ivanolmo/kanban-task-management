import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createRouter } from '../createRouter';

const createBoardSchema = z.object({
  boardName: z.string(),
  columns: z.array(z.object({ columnName: z.string() })),
});

export type CreateBoardInput = z.TypeOf<typeof createBoardSchema>;

const boardRouter = createRouter().mutation('create-board', {
  input: createBoardSchema,
  resolve: async ({ ctx, input }) => {
    if (!ctx || !ctx.session?.user) {
      return new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You must be logged in to create a board',
      });
    }

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
            id: ctx.session.user.id,
          },
        },
      },
    });

    return board;
  },
});

export default boardRouter;
