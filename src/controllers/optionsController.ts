import { Request, Response } from 'express';
import { getAllGenres } from '../models/GenreRepository.js';

export const getGenreOptions = async (req: Request, res: Response) => {
  try {
    const genres = await getAllGenres();
    const optionsHtml = genres
      .map((genre) => `<option value="${genre.name}">${genre.name}</option>`)
      .join('');

    res.send(optionsHtml);
  } catch {
    return res.status(500).send('<option value="">Error loading genres</option>');
  }
};
