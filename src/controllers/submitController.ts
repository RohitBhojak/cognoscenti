import { Request, Response } from 'express';
import { getAllGenres } from '../models/GenreRepository.js';

export const renderSubmitPage = async (req: Request, res: Response) => {
  const genres = await getAllGenres();
  return res.renderView('pages/submit', { title: 'Submit', genres });
};
