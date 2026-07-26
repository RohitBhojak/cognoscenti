import pool from './pool.js';

export const getUserByUsername = async (username: string) => {
  const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  return rows[0];
};

export const insertUser = async (username: string, password: string, isAdmin: boolean) => {
  await pool.query('INSERT INTO users (username, password, isAdmin) VALUES ($1, $2, $3)', [
    username,
    password,
    isAdmin,
  ]);
};
