import { CreateUserInput, User } from '../types/database.js';
import pool from './pool.js';

export const getUserById = async (userId: number): Promise<User | null> => {
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
  return rows[0] ?? null;
};

export const getUserByUsername = async (username: string): Promise<User | null> => {
  const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  return rows[0] ?? null;
};

export const insertUser = async (input: CreateUserInput): Promise<User> => {
  const { rows } = await pool.query<User>(
    'INSERT INTO users (username, password, is_admin) VALUES ($1, $2, $3) RETURNING *',
    [input.username, input.password, input.is_admin]
  );
  return rows[0];
};
