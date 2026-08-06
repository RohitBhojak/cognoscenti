import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

interface ValidationConfig {
  pageView: string;
  partialView?: string;
  fieldErrorView?: string;
}

const handleValidationErrors = (config: ValidationConfig) => {
  const { pageView, partialView = pageView, fieldErrorView = 'components/formError' } = config;
  return (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      // Remove validation error for validate request
      if (req.params.field) {
        return res.send('');
      }
      // Move on to next middleware for form submit request
      return next();
    }

    res.status(422);
    // Render single error
    if (req.params.field) {
      const firstError = errors.array()[0].msg;
      return res.render(fieldErrorView, { error: firstError });
    }

    // Re-render form with errors
    if (req.get('hx-request')) {
      return res.render(partialView, {
        errors: errors.mapped(),
        values: req.body,
      });
    }

    return res.renderView(pageView, {
      errors: errors.mapped(),
      values: req.body,
    });
  };
};

export default handleValidationErrors;
