import { createRouter } from '../context';
import { boardRouter } from './board';

export const appRouter = createRouter().merge('boards.', boardRouter);

export type AppRouter = typeof appRouter;
