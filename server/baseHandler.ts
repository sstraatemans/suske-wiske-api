import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { authenticate } from './middleware/authenticate';
import '@server/data';

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
  }).use(authenticate);
