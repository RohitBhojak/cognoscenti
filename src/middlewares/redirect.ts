import { NextFunction, Request, Response } from 'express';

const redirectMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.redirectHtmx = (url: string, redirect?: boolean) => {
    if (req.get('hx-request')) {
      if (redirect) {
        res.setHeader('HX-Redirect', url);
      } else {
        res.setHeader('HX-Location', url);
      }
      return res.status(200).end();
    }

    return res.redirect(url);
  };

  next();
};

export default redirectMiddleware;
