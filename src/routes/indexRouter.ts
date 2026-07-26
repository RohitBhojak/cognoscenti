import { Router } from 'express';
import { renderHomePage } from '../controllers/indexController.js';

const indexRouter = Router();

indexRouter.get('/', renderHomePage);

export default indexRouter;
