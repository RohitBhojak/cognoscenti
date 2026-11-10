import { Request, Response } from 'express';

export const renderGenrePage = (req: Request, res: Response) => {
  return res.renderView('pages/genres', { title: 'Genres' });
};
