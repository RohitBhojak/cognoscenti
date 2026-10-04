import { Router } from 'express';
import {
  renderArchiveDetail,
  renderArchiveList,
  renderHomePage,
} from '../controllers/archiveController.js';

const archiveRouter = Router();

archiveRouter.get('/', renderHomePage);

archiveRouter.get('/archive', renderArchiveList);

archiveRouter.get('/archive/:id', renderArchiveDetail);

export default archiveRouter;
