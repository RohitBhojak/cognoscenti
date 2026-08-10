import { Router } from 'express';
import { renderArchiveDetail, renderHomePage } from '../controllers/archiveController.js';

const archiveRouter = Router();

archiveRouter.get('/', renderHomePage);

archiveRouter.get('/archive/:id', renderArchiveDetail);

export default archiveRouter;
