import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from '../createRouter';

const boardColumnSchema = z.object({
  status: z.string(),
});

const createBoardSchema = z.object({
  title: z.string(),
  boardColumns: z.array(boardColumnSchema),
});

export type CreateBoardInput = z.infer<typeof createBoardSchema>;

const boardRouter = createRouter()
  .mutation('create-board', {
    input: createBoardSchema,
    resolve: async ({ ctx, input }) => {
      if (!ctx.user) {
        return new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to create a board',
        });
      }

      const board = await ctx.prisma.board.create({
        data: {
          ...input,
          user: {
            connect: {
              id: ctx.user.id,
            },
          },
        },
      });

      return board;
    },
  })
  .query('boards', {
    resolve: async ({ ctx }) => {
      if (!ctx.user) {
        return new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to view boards',
        });
      }

      const boards = await ctx.prisma.board.findMany({
        where: {
          userId: ctx.user.id,
        },
      });

      return boards;
    },
  });

export default boardRouter;
