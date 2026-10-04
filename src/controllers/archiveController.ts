import { Request, Response } from 'express';
import { getMoviesPaginated } from '../models/MovieRepository.js';

export const renderHomePage = async (req: Request, res: Response) => {
  const page = Number(req.query.page ?? 0);
  const size = 10;
  const filters = {
    title: req.query.title?.toString().trim() || undefined,
    genre: req.query.genre?.toString().trim() || undefined,
    director: req.query.director?.toString().trim() || undefined,
    year: req.query.year ? Number(req.query.year) : undefined,
  };

  const { list, hasMore } = await getMoviesPaginated(page, size, filters);

  if (req.get('HX-Request')) {
    return res.render('partials/archiveList', {
      list,
      nextPage: page + 1,
      hasMore,
    });
  }

  return res.renderView('pages/archive', {
    title: 'Archive',
    list,
    nextPage: 1,
    hasMore,
  });
};

export const renderArchiveDetail = () => {};
