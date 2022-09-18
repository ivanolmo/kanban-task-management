import { router } from '@trpc/server';
import superjson from 'superjson';

import { Context } from './createContext';

export const createRouter = () => {
  return router<Context>().transformer(superjson);
};
