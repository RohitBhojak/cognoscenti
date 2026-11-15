import { Request, Response } from 'express';
import { getAllGenres } from '../models/GenreRepository.js';
import { getAllDirectors } from '../models/MovieRepository.js';

export const getGenreOptions = async (req: Request, res: Response) => {
  try {
    const genres = await getAllGenres();
    return res.renderView('components/options', { options: genres });
  } catch {
    return res.status(500).render('components/options', { options: [] });
  }
};

export const getDirectorOptions = async (req: Request, res: Response) => {
  try {
    const directors = await getAllDirectors();
    const options = directors.map(({ director }) => {
      return { name: director };
    });
    return res.renderView('components/options', { options });
  } catch {
    return res.status(500).render('components/options', { options: [] });
  }
};
