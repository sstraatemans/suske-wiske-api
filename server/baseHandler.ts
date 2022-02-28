import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { authenticate } from './middleware/authenticate';
import { normalizeUpdateData } from './middleware/normalizeUpdateData';
import '@server/data';
import { validateData } from './middleware/validateData';
import { post, put } from './middleware/post';
import NextCors from 'nextjs-cors';

const innerCors = async (req: NextApiRequest, res: NextApiResponse, next: Function) => {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  req.headers['access-control-allow-origin'] = '*';
  next();
};

export const baseHandler = () =>
  nc<NextApiRequest, NextApiResponse>({
    // 404 error handler
    onNoMatch: (req, res) =>
      res.status(404).send({
        message: `API route not found: ${req.url}`,
      }),

    // 500 error handler
    onError: (err, req, res) =>
      res.status(500).send({
        message: `Unexpected error.`,
        error: err.toString(),
      }),
  })
    .use(innerCors)
    .use(authenticate)
    .use(post(normalizeUpdateData))
    .use(put(normalizeUpdateData))
    .use(post(validateData))
    .use(put(validateData));
