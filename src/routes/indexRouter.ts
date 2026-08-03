import { Router } from 'express';
import { renderHomePage } from '../controllers/indexController.js';
import authRouter from './authRouter.js';

const indexRouter = Router();

indexRouter.use('/auth', authRouter);

indexRouter.get('/', renderHomePage);

export default indexRouter;
