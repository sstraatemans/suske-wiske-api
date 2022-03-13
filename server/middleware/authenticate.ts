import { NextApiRequest, NextApiResponse } from 'next';
import { getFireBaseAdmin } from '@server/data';

export const authenticate = async (req: NextApiRequest, res: NextApiResponse, next: Function) => {
  const {
    method,
    headers: { authorization },
  } = req;

  const authArray = authorization?.split(' ') as string[];

  if (method === 'POST' || method === 'PUT' || method === 'DELETE' || method === 'PATCH') {
    if (!authorization || !authorization.startsWith('Bearer') || authArray.length !== 2)
      return res.status(401).send({ message: 'Unauthorized' });
    console.log(0);
    const admin = getFireBaseAdmin();
    console.log(6);
    admin
      .auth()
      .verifyIdToken(authArray[1])
      .then((result) => {
        if (!result.uid || !result.admin) {
          return res.status(401).send({ message: 'Unauthorized' });
        }
        req.body = { ...req.body, uid: result.uid };
        next();
      })
      .catch(() => {
        return res.status(401).send({ message: 'Unauthorized' });
      });
  } else {
    next();
  }
};
