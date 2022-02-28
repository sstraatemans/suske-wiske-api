import { body, check, ValidationChain, validationResult } from 'express-validator';
import { NextApiRequest, NextApiResponse } from 'next';

export const initValidation = (validations: ValidationChain[]) => {
  return async (req: NextApiRequest, res: NextApiResponse, next: Function) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    const err: string[] = [];
    errors.array().map((error) => err.push(error.msg));

    //status: 400 Bad Request
    res.status(400).json({ success: false, data: null, error: err });
  };
};

export const seriesValidator = initValidation([
  body('name').not().isEmpty().trim().escape(),
  check('name').isLength({ max: 50 }).withMessage('must be at max 5 chars long'),
]);
