import { Request, Response } from 'express';
import { getUserByUsername } from '../models/UserRepository.js';

export const validateUsername = async (req: Request, res: Response) => {
  const username = (req.body.username || '').trim().toLowerCase();

  let error = '';

  if (username.length < 3) {
    error = 'Username must be at least 3 characters';
  } else if (username.length > 50) {
    error = 'Username must be smaller than 50 characters';
  } else {
    const user = await getUserByUsername(username);
    if (user) {
      error = 'Username already exists';
    }
  }
  res.render('partials/formError', { error });
};
