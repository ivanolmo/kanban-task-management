import { TRPCError } from '@trpc/server';

import { createRouter } from '../createRouter';

const authRouter = createRouter()
  .query('getSession', {
    resolve: async ({ ctx }) => {
      return ctx.session;
    },
  })
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You must be logged in to view boards',
      });
    }

    return next();
  });

export default authRouter;
