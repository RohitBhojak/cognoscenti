import { Router } from 'express';
import authRouter from './authRouter.js';
import archiveRouter from './archiveRouter.js';
import genreRouter from './genreRouter.js';
import submitRouter from './submitRouter.js';
import collectionRouter from './collectionRouter.js';

const indexRouter = Router();

indexRouter.use('/auth', authRouter);

indexRouter.use('/genres', genreRouter);

indexRouter.use('/submit', submitRouter);

indexRouter.use('/collection', collectionRouter);

indexRouter.use('/', archiveRouter);

export default indexRouter;
