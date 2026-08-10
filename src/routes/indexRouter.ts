import { Request, Response, Router } from 'express';
import authRouter from './authRouter.js';
import archiveRouter from './archiveRouter.js';
import genreRouter from './genreRouter.js';
import submitRouter from './submitRouter.js';
import collectionRouter from './collectionRouter.js';
import { NotFoundError } from '../errors/AppError.js';

const indexRouter = Router();

indexRouter.use('/auth', authRouter);

indexRouter.use('/genres', genreRouter);

indexRouter.use('/submit', submitRouter);

indexRouter.use('/collection', collectionRouter);

indexRouter.use('/', archiveRouter);

indexRouter.use((req: Request, _res: Response) => {
  throw new NotFoundError(`The page '${req.originalUrl}' does not exist.`);
});

export default indexRouter;
