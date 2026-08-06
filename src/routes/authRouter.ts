import { Router } from 'express';

import dynamicFieldValidator from '../middlewares/dynamicFieldValidator.js';
import handleValidationErrors from '../middlewares/handleValidationErrors.js';
import {
  loginValidators,
  validateAdminSecretKey,
  validatePassword,
  validateUsername,
} from '../utils/validators.js';
import {
  createUser,
  login,
  renderLoginPage,
  renderSignUpPage,
  logout,
} from '../controllers/authController.js';

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

authRouter.get('/login', renderLoginPage);

authRouter.post(
  '/login',
  loginValidators,
  handleValidationErrors({ pageView: 'pages/login' }),
  login
);

authRouter.get('/logout', logout);

export default authRouter;
