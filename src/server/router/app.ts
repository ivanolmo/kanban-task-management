import { createRouter } from '../context';
import { boardRouter } from './board';
import { columnRouter } from './column';
import { taskRouter } from './task';

export const appRouter = createRouter()
  .merge('boards.', boardRouter)
  .merge('columns.', columnRouter)
  .merge('tasks.', taskRouter);

export type AppRouter = typeof appRouter;
