import { Router } from 'express';
import { getGenreOptions } from '../controllers/optionsController.js';

const optionsRouter = Router();

optionsRouter.get('/genres', getGenreOptions);

export default optionsRouter;
