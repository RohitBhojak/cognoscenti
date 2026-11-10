import { Request, Response } from 'express';
import { getAllGenres } from '../models/GenreRepository.js';

export const renderGenrePage = async (req: Request, res: Response) => {
  const genres = await getAllGenres();
  return res.renderView('pages/genres', { title: 'Genres', genres });
};
