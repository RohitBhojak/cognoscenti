import { Request, Response } from 'express';

export const renderSubmitPage = (req: Request, res: Response) => {
  res.renderView('pages/submit', { title: 'Submit' });
};
