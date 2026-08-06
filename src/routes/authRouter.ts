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
import { preventCache, requireGuest } from '../middlewares/accessGuard.js';

const authRouter = Router();

authRouter.get('/sign-up', preventCache, requireGuest, renderSignUpPage);

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

authRouter.get('/login', preventCache, requireGuest, renderLoginPage);

authRouter.post(
  '/login',
  loginValidators,
  handleValidationErrors({ pageView: 'pages/login' }),
  login
);

authRouter.post('/logout', logout);

export default authRouter;
