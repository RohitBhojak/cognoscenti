import { Request, Response } from 'express';
import { getAllMoviesPaginated } from '../models/MovieRepository.js';

export const renderHomePage = async (req: Request, res: Response) => {
  const page = Number(req.query.page ?? 0);
  const movies = await getAllMoviesPaginated(page, 10);
  res.renderView('pages/archive', { title: 'Archive', list: movies });
};

export const renderArchiveDetail = () => {};
