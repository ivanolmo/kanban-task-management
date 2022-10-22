import { createRouter } from '../context';
import { boardRouter } from './board';
import { taskRouter } from './task';

export const appRouter = createRouter()
  .merge('boards.', boardRouter)
  .merge('tasks.', taskRouter);

export type AppRouter = typeof appRouter;
