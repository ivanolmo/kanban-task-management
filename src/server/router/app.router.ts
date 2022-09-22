import { createRouter } from '../createRouter';
import boardRouter from './board.router';
import authRouter from './auth.router';

const appRouter = createRouter()
  .merge('auth.', authRouter)
  .merge('boards.', boardRouter);

export type AppRouter = typeof appRouter;
export default appRouter;
