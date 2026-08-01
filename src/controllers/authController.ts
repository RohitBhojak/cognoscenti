import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import bcrypt from 'bcrypt';
import { insertUser } from '../models/UserRepository.js';

export const createUser = async (req: Request, res: Response) => {
  const { username, password, adminSecretKey } = matchedData<{
    username: string;
    password: string;
    adminSecretKey: string;
  }>(req);

  const hashedPassword = await bcrypt.hash(password, 10);

  await insertUser(username, hashedPassword, Boolean(adminSecretKey));

  if (req.headers['hx-request']) {
    res.setHeader('HX-Location', '/archive');
    return res.status(200).end();
  }

  return res.redirect('/archive');
};
