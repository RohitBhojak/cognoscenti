import { Router } from 'express';

import dynamicFieldValidator from '../middlewares/dynamicFieldValidator.js';
import handleValidationErrors from '../middlewares/handleValidationErrors.js';
import { validateAdminSecretKey, validatePassword, validateUsername } from '../utils/validators.js';
import { createUser, renderSignUpPage } from '../controllers/authController.js';

const authRouter = Router();

authRouter.get('/sign-up', renderSignUpPage);

authRouter.post(
  '/sign-up',
  [validateUsername(), validatePassword(), validateAdminSecretKey()],
  handleValidationErrors({ pageView: 'pages/signUp', partialView: 'partials/signUpForm' }),
  createUser
);

authRouter.post(
  '/validate/:field',
  dynamicFieldValidator,
  handleValidationErrors({ pageView: 'pages/signUp' })
);

export default authRouter;
