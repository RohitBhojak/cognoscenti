import { Router } from 'express';
import { getDirectorOptions, getGenreOptions } from '../controllers/optionsController.js';

const optionsRouter = Router();

optionsRouter.get('/genres', getGenreOptions);

optionsRouter.get('/directors', getDirectorOptions);

export default optionsRouter;
