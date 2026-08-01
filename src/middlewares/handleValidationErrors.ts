import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    // Single field validation
    if (req.params.field) {
      res.render('partials/formError');
    }
    // Form sign up validation
    return next();
  }

  // Render single error
  if (req.params.field) {
    const firstError = errors.array()[0].msg;
    res.render('partials/formError', { error: firstError });
  }

  // Re-render sign up form
  return res.status(422).render('signUp', {
    errors: errors.mapped(),
    values: req.body(),
  });
};

export default handleValidationErrors;
