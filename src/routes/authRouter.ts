import { Router } from 'express';
import { validateUsername } from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/validate-username', validateUsername);

export default authRouter;
