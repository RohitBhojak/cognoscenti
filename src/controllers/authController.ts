import { NextFunction, Request, Response } from 'express';
import { matchedData } from 'express-validator';
import bcrypt from 'bcrypt';
import { insertUser } from '../models/UserRepository.js';
import passport from 'passport';
import { User } from '../types/database.js';
import { IVerifyOptions } from 'passport-local';

export const renderSignUpPage = (req: Request, res: Response) => {
  res.renderView('pages/signUp', { title: 'Sign Up' });
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password, adminSecretKey } = matchedData<{
    username: string;
    password: string;
    adminSecretKey: string;
  }>(req);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await insertUser({
    username,
    password: hashedPassword,
    is_admin: Boolean(adminSecretKey),
  });

  req.logIn(user, (err) => {
    if (err) return next(err);

    res.redirectHtmx('/', true);
  });
};

export const renderLoginPage = (req: Request, res: Response) => {
  res.renderView('pages/login', { title: 'Login' });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err: Error | null, user: User | false, info: IVerifyOptions) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      const errorMessage = info?.message || 'Incorrect credentials';
      const errorField = info?.field || 'password';

      const errors = { [errorField]: { msg: errorMessage } };

      res.status(401);
      if (req.get('hx-request')) {
        return res.render('partials/loginForm', { errors, values: req.body });
      }

      return res.renderView('pages/login', { title: 'Login', errors, values: req.body });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      res.redirectHtmx('/', true);
    });
  })(req, res, next);
};

const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirectHtmx('/', true);
  });
};
