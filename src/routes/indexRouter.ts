import { Router } from 'express';
import { renderArchivePage, renderHomePage } from '../controllers/indexController.js';
import authRouter from './authRouter.js';

const indexRouter = Router();

indexRouter.use('/auth', authRouter);

indexRouter.get('/archive', renderArchivePage);
indexRouter.get('/', renderHomePage);

export default indexRouter;
