import { NextFunction, Request, Response } from 'express';

export const requireGuest = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated?.()) {
    return res.redirectHtmx('/');
  }
  next();
};

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated?.()) {
    next();
  }
  return res.redirectHtmx('/');
};

export const preventCache = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
};
