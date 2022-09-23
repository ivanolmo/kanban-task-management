import { createRouter } from '../createRouter';
import authRouter from './auth.router';
import boardRouter from './board.router';

export const appRouter = createRouter()
  .merge('auth.', authRouter)
  .merge('boards.', boardRouter);

export type AppRouter = typeof appRouter;
