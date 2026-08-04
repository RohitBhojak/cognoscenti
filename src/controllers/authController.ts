import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import bcrypt from 'bcrypt';
import { insertUser } from '../models/UserRepository.js';

export const renderSignUpPage = (req: Request, res: Response) => {
  res.renderView('pages/signUp', { title: 'Sign Up | Cognoscenti' });
};

export const createUser = async (req: Request, res: Response) => {
  const { username, password, adminSecretKey } = matchedData<{
    username: string;
    password: string;
    adminSecretKey: string;
  }>(req);

  const hashedPassword = await bcrypt.hash(password, 10);

  await insertUser({ username, password: hashedPassword, is_admin: Boolean(adminSecretKey) });

  // HTMX redirect for HTMX requests
  if (req.get('hx-request')) {
    res.setHeader('HX-Location', '/');
    return res.status(200).end();
  }

  // Fallback to normal redirect
  return res.redirect('/archive');
};
