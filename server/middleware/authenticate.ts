import { NextApiRequest, NextApiResponse } from 'next';
import * as firebaseAdmin from 'firebase-admin';

export const authenticate = async (req: NextApiRequest, res: NextApiResponse, next: Function) => {
  const {
    method,
    headers: { authorization },
  } = req;

  const [, token] = authorization?.split(' ') as string[];

  if (method === 'POST' || method === 'PUT' || method === 'DELETE' || method === 'PATCH') {
    firebaseAdmin
      .auth()
      .verifyIdToken(token)
      .then((result) => {
        if (!result.uid) {
          res.statusCode = 401;
          return res.send({});
        }
        next();
      })
      .catch((error) => {
        res.statusCode = 401;
        return res.send({ error });
      });
  } else {
    next();
  }
};
