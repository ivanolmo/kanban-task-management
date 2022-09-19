import { createRouter } from '../createRouter';
import userRouter from './user.router';
import boardRouter from './board.router';

const appRouter = createRouter()
  .merge('users.', userRouter)
  .merge('boards.', boardRouter);

export type AppRouter = typeof appRouter;
export default appRouter;
