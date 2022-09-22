import { unstable_getServerSession } from 'next-auth';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { inferAsyncReturnType } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { prisma } from './db/client';

export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;

  const session =
    req && res && (await unstable_getServerSession(req, res, authOptions));

  return { req, res, prisma, session };
};

export type Context = inferAsyncReturnType<typeof createContext>;
