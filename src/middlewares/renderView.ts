import { Request, Response, NextFunction } from 'express';

const renderViewMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.renderView = (view: string, data: Record<string, unknown> = {}) => {
    // HTMX AJAX Request: Render only the requested snippet
    if (req.get('HX-Request')) {
      return res.render(view, data);
    }

    // Direct Browser Access: Render view wrapped inside layouts/base.ejs
    res.render(view, data, (err, html) => {
      if (err) return next(err);
      res.render('layouts/base', { ...data, body: html });
    });
  };

  next();
};

export default renderViewMiddleware;
