import { NextApiRequest, NextApiResponse } from 'next';
import { getFireBaseAdmin } from '@server/data';

const labels = ['series', 'albums', 'characters', 'devices', 'artists', 'test'];

export const checkLabel = async (req: NextApiRequest, res: NextApiResponse, next: Function) => {
  const {
    method,
    headers: { authorization },
  } = req;

  const label = req.query.label as LabelTypes;

  console.log(222, label);
  if (!labels.includes(label) && label)
    return res.status(404).send({ message: 'type does not exist' });

  next();
};
