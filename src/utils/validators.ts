// validators.ts
import { body, ValidationChain } from 'express-validator';
import { getUserByUsername } from '../models/UserRepository.js';
import bcrypt from 'bcrypt';

export const validateUsername = () =>
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be 3-30 characters long')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers and underscores')
    .custom((value) => {
      if (value.startsWith('_')) {
        throw new Error('Username cannot start with a special character');
      }
      return true;
    })
    .toLowerCase()
    .custom(async (normalizedUsername) => {
      const user = await getUserByUsername(normalizedUsername);
      if (user) {
        throw new Error('Username already exists');
      }
      return true;
    });

export const validatePassword = () =>
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long');

export const validateAdminSecretKey = () =>
  body('adminSecretKey')
    .trim()
    .optional({ checkFalsy: true })
    .custom(async (value) => {
      const adminSecretKey = process.env.ADMIN_SECRET_KEY;

      if (!adminSecretKey) {
        throw new Error('Admin registration is currently unavailable');
      }

      const isMatch = await bcrypt.compare(value, adminSecretKey);
      if (!isMatch) {
        throw new Error('Incorrect admin secret key');
      }

      return true;
    });

export const fieldValidators: Record<string, () => ValidationChain> = {
  username: validateUsername,
  password: validatePassword,
  adminSecretKey: validateAdminSecretKey,
} as const;

export const loginValidators = [
  body('username').trim().notEmpty().withMessage('Username is required').toLowerCase(),
  body('password').trim().notEmpty().withMessage('Password is required'),
];
