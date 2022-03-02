import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { authenticate } from './middleware/authenticate';
import { normalizeUpdateData } from './middleware/normalizeUpdateData';
import '@server/data';
import { validateData } from './middleware/validateData';
import { post, put } from './middleware/post';

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
    .use(authenticate)
    .use(post(normalizeUpdateData))
    .use(put(normalizeUpdateData))
    .use(post(validateData))
    .use(put(validateData));
