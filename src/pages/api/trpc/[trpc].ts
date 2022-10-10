import { createNextApiHandler } from '@trpc/server/adapters/next';

import { appRouter } from '@/server/router/app';
import { createContext } from '@/server/context';

export default createNextApiHandler({
  router: appRouter,
  createContext: createContext,
  onError({ error }) {
    console.error('tRPC error -> ', error);
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    }
  },
});
