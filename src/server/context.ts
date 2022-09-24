import { inferAsyncReturnType, router } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import superjson from 'superjson';

import { getKanbanServerAuthSession } from './common/get-server-session';
import { prisma } from './db/client';

export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;

  const session = await getKanbanServerAuthSession({ req, res });

  return { session, prisma };
};

export type Context = inferAsyncReturnType<typeof createContext>;

export const createRouter = () => {
  return router<Context>().transformer(superjson);
};
