import { router, TRPCError } from '@trpc/server';
import { Context } from '@/server/context';

export function createProtectedRouter() {
  return router<Context>().middleware(({ ctx, next }) => {
    if (!ctx.session?.user) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next({
      ctx: {
        ...ctx,
        // infers that `user` is non-nullable to downstream procedures
        session: { ...ctx.session, user: ctx.session.user },
      },
    });
  });
}
