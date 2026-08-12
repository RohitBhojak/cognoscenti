import { Request, Response } from 'express';

export const renderHomePage = (req: Request, res: Response) => {
  res.renderView('pages/archive', { title: 'Archive' });
};

export const renderArchiveDetail = () => {};
