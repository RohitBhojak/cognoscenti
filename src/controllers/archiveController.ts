import { Request, Response } from 'express';
import { getMoviesPaginated } from '../models/MovieRepository.js';

const getArchiveUrl = (req: Request) => {
  const params = new URLSearchParams();

  for (const key of ['title', 'genre', 'director', 'year']) {
    const value = req.query[key];

    if (typeof value === 'string' && value.trim()) {
      params.set(key, value.trim());
    }
  }

  const query = params.toString();
  return query ? `/?${query}` : '/';
};

const getArchiveData = async (req: Request) => {
  const page = Number(req.query.page ?? 0);
  const size = 10;
  const filters = {
    title: req.query.title?.toString().trim() || undefined,
    genre: req.query.genre?.toString().trim() || undefined,
    director: req.query.director?.toString().trim() || undefined,
    year: req.query.year ? Number(req.query.year) : undefined,
  };

  const { list, hasMore } = await getMoviesPaginated(page, size, filters);

  return { list, nextPage: page + 1, hasMore, values: filters };
};

export const renderHomePage = async (req: Request, res: Response) => {
  const archiveData = await getArchiveData(req);

  return res.renderView('pages/archive', {
    title: 'Archive',
    ...archiveData,
  });
};

export const renderArchiveList = async (req: Request, res: Response) => {
  const archiveData = await getArchiveData(req);

  if (req.query.page === undefined) {
    res.set('HX-Push-Url', getArchiveUrl(req));
  }

  return res.render('partials/archiveList', archiveData);
};

export const renderArchiveDetail = () => {};
