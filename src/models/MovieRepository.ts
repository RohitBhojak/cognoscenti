import { Movie } from '../types/database.js';
import pool from './pool.js';

export const getAllMoviesPaginated = async (page: number = 0, size: number = 10) => {
  const { rows } = await pool.query<Movie>('SELECT * FROM movies ORDER BY id OFFSET $1 LIMIT $2', [
    page * size,
    size,
  ]);
  return rows;
};

export const getMovieById = async (id: number): Promise<Movie | null> => {
  const { rows } = await pool.query<Movie>('SELECT * FROM movies WHERE id = $1', [id]);
  return rows[0] ?? null;
};

export const getAllDirectors = async () => {
  const { rows } = await pool.query<Pick<Movie, 'director'>>(
    'SELECT DISTINCT director FROM movies ORDER BY director ASC'
  );
  return rows;
};
