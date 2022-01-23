import { NextApiRequest, NextApiResponse } from 'next';
import * as firebaseAdmin from 'firebase-admin';

export const authenticate = async (req: NextApiRequest, res: NextApiResponse, next: Function) => {
  const {
    method,
    headers: { authorization },
  } = req;

  const authArray = authorization?.split(' ') as string[];

  if (!authorization || !authorization.startsWith('Bearer') || authArray.length !== 2)
    return res.status(401).send({ message: 'Unauthorized' });

  if (method === 'POST' || method === 'PUT' || method === 'DELETE' || method === 'PATCH') {
    firebaseAdmin
      .auth()
      .verifyIdToken(authArray[1])
      .then((result) => {
        if (!result.uid || !result.admin) {
          return res.status(401).send({ message: 'Unauthorized' });
        }
        next();
      })
      .catch(() => {
        return res.status(401).send({ message: 'Unauthorized' });
      });
  } else {
    next();
  }
};
