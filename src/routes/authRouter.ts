import { Router } from 'express';

import dynamicFieldValidator from '../middlewares/dynamicFieldValidator.js';
import handleValidationErrors from '../middlewares/handleValidationErrors.js';
import { validateAdminSecretKey, validatePassword, validateUsername } from '../utils/validators.js';
import { createUser } from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/validate/:field', dynamicFieldValidator, handleValidationErrors);

authRouter.post(
  '/sign-up',
  [validateUsername(), validatePassword(), validateAdminSecretKey()],
  handleValidationErrors,
  createUser
);

export default authRouter;
