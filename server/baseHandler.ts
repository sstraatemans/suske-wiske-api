import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import cors, { CorsOptions, CorsRequest } from 'cors';

const corsOptionsDelegate = (
  req: CorsRequest,
  callback: (error: Error | null, options: CorsOptions) => any
) => {
  callback(null, { origin: true }); // callback expects two parameters: error and options
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
  }).use(cors(corsOptionsDelegate));
