import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError.js';

const errorHandler = (err: AppError, req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Something went wrong on our end';

  res.status(statusCode);

  return res.renderView('pages/error', { statusCode, message, title: 'Error' });
};

export default errorHandler;
