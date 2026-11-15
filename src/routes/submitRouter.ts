import { Router } from 'express';
import { renderSubmitPage } from '../controllers/submitController.js';

const submitRouter = Router();

submitRouter.get('/', renderSubmitPage);

export default submitRouter;
