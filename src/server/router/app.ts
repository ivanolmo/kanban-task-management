import { createRouter } from '../context';
import { boardRouter } from './board';
import { columnRouter } from './column';

export const appRouter = createRouter()
  .merge('boards.', boardRouter)
  .merge('columns.', columnRouter);

export type AppRouter = typeof appRouter;
