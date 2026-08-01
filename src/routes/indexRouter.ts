import { Router } from 'express';
import { renderHomePage } from '../controllers/indexController.js';
import authRouter from './authRouter.js';

const indexRouter = Router();

indexRouter.get('/', renderHomePage);
indexRouter.use('/auth', authRouter);

export default indexRouter;
