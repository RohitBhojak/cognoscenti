import { Request, Response } from 'express';

export const renderHomePage = (req: Request, res: Response) => {
  res.renderView('partials/archive', { activePage: 'archive' });
};
