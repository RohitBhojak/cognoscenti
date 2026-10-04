import { Movie } from '../types/database.js';
import pool from './pool.js';

type MovieFilters = {
  title?: string;
  genre?: string;
  director?: string;
  year?: number;
};

export const getMoviesPaginated = async (page = 0, size = 10, filters: MovieFilters = {}) => {
  const conditions: string[] = [];
  const values: Array<string | number> = [];

  const addValue = (value: string | number) => {
    values.push(value);
    return `$${values.length}`;
  };

  if (filters.title) {
    const param = addValue(`%${filters.title}%`);
    conditions.push(`m.title ILIKE ${param}`);
  }

  if (filters.director) {
    const param = addValue(`%${filters.director}%`);
    conditions.push(`m.director ILIKE ${param}`);
  }

  if (filters.year !== undefined) {
    const param = addValue(filters.year);
    conditions.push(`m.release_year = ${param}`);
  }

  if (filters.genre) {
    const param = addValue(`%${filters.genre}%`);

    conditions.push(`
        EXISTS (
          SELECT 1
          FROM movies_genres mg
          JOIN genres g ON g.id = mg.genre_id
          WHERE mg.movie_id = m.id
            AND g.name ILIKE ${param}
        )
      `);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const offset = addValue(page * size);
  const limit = addValue(size + 1);

  const { rows } = await pool.query<Movie>(
    `
        SELECT m.*
        FROM movies m
        ${where}
        ORDER BY m.id ASC
        OFFSET ${offset}
        LIMIT ${limit}
      `,
    values
  );

  return {
    list: rows.slice(0, size),
    hasMore: rows.length > size,
  };
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
