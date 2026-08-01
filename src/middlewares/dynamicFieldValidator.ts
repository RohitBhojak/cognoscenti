import { NextFunction, Request, Response } from 'express';
import { fieldValidators } from '../utils/validators.js';

// Middleware to dynamically select and run the validator for single fields
const dynamicFieldValidator = async (req: Request, res: Response, next: NextFunction) => {
  const field = Array.isArray(req.params.field) ? req.params.field[0] : req.params.field;
  const getValidator = fieldValidators[field];

  if (!getValidator) {
    return res.status(404).send('Invalid field validation endpoint');
  }

  await getValidator().run(req);
  next();
};

export default dynamicFieldValidator;
