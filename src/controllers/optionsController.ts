import { Request, Response } from 'express';
import { getAllGenres } from '../models/GenreRepository.js';

export const getGenreOptions = async (req: Request, res: Response) => {
  try {
    const genres = await getAllGenres();
    const options = genres.map((genre) => genre.name);
    return res.renderView('components/options', { options });
  } catch {
    return res.status(500).render('components/options', { options: [] });
  }
};
