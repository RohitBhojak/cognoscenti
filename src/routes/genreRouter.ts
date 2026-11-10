import { Router } from 'express';
import { renderGenrePage } from '../controllers/genreController.js';

const genreRouter = Router();

genreRouter.get('/', renderGenrePage);

export default genreRouter;
