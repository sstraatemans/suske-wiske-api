import { NextApiRequest, NextApiResponse } from 'next';
import { findLabel } from '@server/data/utils';
import { seriesValidator, initValidation } from './validators/seriesValidator';

export const validateData = async (req: NextApiRequest, res: NextApiResponse, next: Function) => {
  switch (findLabel(req.url)) {
    case 'series':
      return seriesValidator(req, res, next);
      break;

    case 'artists':
      break;

    case 'inventions':
      break;

    case 'characters':
      break;

    case 'albums':
      break;
    case 'users':
      break;
    default:
      return res.status(404).send({ message: 'not found' });
  }

  next();
};
