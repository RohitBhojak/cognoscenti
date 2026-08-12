import { Genre } from '../types/database.js';
import pool from './pool.js';

export const getAllGenres = async () => {
  const { rows } = await pool.query<Genre>('SELECT * FROM genres ORDER BY name ASC');
  return rows;
};
