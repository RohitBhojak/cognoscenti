import { Request, Response } from 'express';

export const renderHomePage = (req: Request, res: Response) => {
  res.render('signUp');
};

export const renderArchivePage = (req: Request, res: Response) => {
  res.render('archive');
};
