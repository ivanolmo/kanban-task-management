import { verifyJwt } from '@/utils/jwt';
import * as trpc from '@trpc/server';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from './db/client';

interface CtxUser {
  id: string;
  email: string;
  name: string;
  iat: string;
  exp: number;
}

const getUserFromRequest = (req: NextApiRequest) => {
  const token = req.cookies.token;

  if (!token) {
    return null;
  }

  try {
    const verified = verifyJwt<CtxUser>(token);
    return verified;
  } catch (error) {
    return null;
  }
};

export const createContext = ({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  const user = getUserFromRequest(req);

  return { req, res, prisma, user };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
